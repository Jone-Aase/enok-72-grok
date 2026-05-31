#!/usr/bin/env python3
"""
Bygger en AE-projisert versjon av Kartverket sitt Norge-kart.

Trinn:
1. Last ned Kartverket WMTS-fliser (topograatone, zoom 7) som dekker Norge
2. Sy sammen til ett stort Web Mercator-bilde
3. Reprojiser pixel-for-pixel til AE (azimuthal equidistant fra Nordpolen)
4. Lagre som norge-kartverket-ae.webp

AE-konvensjon:
  r = R_AE_PX * (90 - lat) / 180   (pixel-radius fra senter)
  theta = lon_rad                  (vinkel: lon=0 -> -Z, lon=90E -> +X)
  Senter av output-bildet = Nordpolen
  Output-bildet er kvadratisk, dekker Norge-bbox med litt margin

Forfatter: Perplexity Agent / Norge-fork
Dato: 2026-05-31
"""
import math
import os
import io
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image
import requests

# ============================================================
# KONFIG
# ============================================================
ZOOM = 7
LAYER = "topograatone"   # Kartverket: gråtone-topokart (lyst, fungerer godt som bakgrunn)
# Norge fastland bbox (ekskluderer Jan Mayen og Svalbard)
LAT_MIN, LAT_MAX = 57.9, 71.3
LON_MIN, LON_MAX = 4.0, 32.0

OUT_AE_RADIUS_PX = 4096  # output-bildet er 2*R x 2*R = 8192x8192 px... eller mindre
# Vi gjør 4096 i radius = 8192x8192 output. Stort men håndterbart.
# Vi maskerer ut alt utenfor Norge-omrisset slik at det er transparent ellers.

OUT_PATH = "/home/user/workspace/enok-72-norge/norge-kartverket-ae.webp"
TILE_DIR = "/tmp/kv_tiles"
os.makedirs(TILE_DIR, exist_ok=True)

URL_TEMPLATE = "https://cache.kartverket.no/v1/wmts/1.0.0/{layer}/default/webmercator/{z}/{y}/{x}.png"

# ============================================================
# TILE-MATEMATIKK (Web Mercator standard)
# ============================================================
def deg2tile(lat, lon, zoom):
    lat_rad = math.radians(lat)
    n = 2.0 ** zoom
    xtile = (lon + 180.0) / 360.0 * n
    ytile = (1.0 - math.asinh(math.tan(lat_rad)) / math.pi) / 2.0 * n
    return xtile, ytile

def tile2deg(x, y, zoom):
    n = 2.0 ** zoom
    lon = x / n * 360.0 - 180.0
    lat_rad = math.atan(math.sinh(math.pi * (1 - 2 * y / n)))
    lat = math.degrees(lat_rad)
    return lat, lon

# ============================================================
# 1) LAST NED FLISER (parallelt)
# ============================================================
print(f"Beregner flise-omraade for zoom={ZOOM}...")
x_sw, y_sw = deg2tile(LAT_MIN, LON_MIN, ZOOM)
x_ne, y_ne = deg2tile(LAT_MAX, LON_MAX, ZOOM)
X_MIN = int(min(x_sw, x_ne))
X_MAX = int(max(x_sw, x_ne)) + 1
Y_MIN = int(min(y_sw, y_ne))
Y_MAX = int(max(y_sw, y_ne)) + 1
COLS = X_MAX - X_MIN + 1
ROWS = Y_MAX - Y_MIN + 1
print(f"Fliser: x={X_MIN}..{X_MAX}, y={Y_MIN}..{Y_MAX} = {COLS}x{ROWS} = {COLS*ROWS} fliser")

def fetch_tile(x, y):
    fn = f"{TILE_DIR}/{LAYER}_z{ZOOM}_x{x}_y{y}.png"
    if os.path.exists(fn) and os.path.getsize(fn) > 0:
        return (x, y, fn)
    url = URL_TEMPLATE.format(layer=LAYER, z=ZOOM, x=x, y=y)
    try:
        r = requests.get(url, timeout=30, headers={"User-Agent": "Enok72-Norge-Fork/1.0"})
        if r.status_code == 200 and len(r.content) > 100:
            with open(fn, "wb") as f:
                f.write(r.content)
            return (x, y, fn)
        else:
            return (x, y, None)
    except Exception as e:
        print(f"FEIL {x},{y}: {e}")
        return (x, y, None)

print("Laster ned fliser parallelt...")
t0 = time.time()
tiles_meta = {}
with ThreadPoolExecutor(max_workers=12) as ex:
    futures = [ex.submit(fetch_tile, x, y) for x in range(X_MIN, X_MAX+1) for y in range(Y_MIN, Y_MAX+1)]
    for i, fut in enumerate(as_completed(futures), 1):
        x, y, fn = fut.result()
        if fn:
            tiles_meta[(x, y)] = fn
        if i % 20 == 0:
            print(f"  {i}/{len(futures)} ({time.time()-t0:.1f}s)")
print(f"Ferdig: {len(tiles_meta)} av {COLS*ROWS} fliser lastet ({time.time()-t0:.1f}s)")

# ============================================================
# 2) SY SAMMEN TIL ETT STORT MERCATOR-BILDE
# ============================================================
print("Syr sammen Mercator-mosaikk...")
MOSAIC_W = COLS * 256
MOSAIC_H = ROWS * 256
mosaic = Image.new("RGBA", (MOSAIC_W, MOSAIC_H), (255, 255, 255, 0))
for (x, y), fn in tiles_meta.items():
    try:
        tile = Image.open(fn).convert("RGBA")
        px = (x - X_MIN) * 256
        py = (y - Y_MIN) * 256
        mosaic.paste(tile, (px, py))
    except Exception as e:
        print(f"FEIL paste {x},{y}: {e}")
print(f"Mosaikk: {MOSAIC_W}x{MOSAIC_H} px")

# Lagre debug-versjon av Mercator-mosaikk
mosaic.save("/tmp/norge-mercator-mosaic.webp", "WEBP", quality=80)
print(f"Debug: /tmp/norge-mercator-mosaic.webp ({os.path.getsize('/tmp/norge-mercator-mosaic.webp')//1024} KB)")

# ============================================================
# 3) REPROJISER MERCATOR -> AE
# Output-bildet: kvadratisk, senter = Nordpolen, radius = OUT_AE_RADIUS_PX.
# For hver output-pixel: regn ut (lat, lon), slå opp i Mercator-mosaikk.
# Lat på AE: r/OUT_AE_RADIUS_PX * 180 grader fra nordpolen -> lat = 90 - 180*r/OUT_AE_RADIUS_PX
# Men vi vil bare ha Norge-området (lat 57.9-71.3). Output dekker dette området med litt margin.
# Strategi: output-bildet representerer en del av AE-disken (en delsirkel) som inneholder Norge.
# For å gjøre det enkelt: bygg output som "tror" det er hele AE-disken, men maskerer alt utenfor lat-spennet.
# ============================================================
print("Reprojiserer Mercator -> AE...")

# Vi lager et output-bilde som bare dekker Norge-sektoren. 
# Norge ligger på AE r=2073 km (lat 71.3°) til r=5605 km (lat 57.9°).
# Sirkulært utsnitt: senter = Nordpolen, output dekker fra r=0 til r=5605/31420.55*4096 px = 731 px.
# For å unngå at output blir for stor: lag et 4096x4096 output der senter = nordpolen og 
# yttergrensen = lat 57° (litt utenfor sør-Norge), så hele Norge får plass.

# AE-skala for output: la output-radius = lat 57° avstand fra Nordpolen
LAT_AT_OUT_EDGE = 56.0   # litt utenfor sørligste punkt
R_NORM_OUT_EDGE = (90 - LAT_AT_OUT_EDGE) / 180.0  # = 0.189 av AE-full-radius
OUT_W = OUT_AE_RADIUS_PX  # 4096
OUT_H = OUT_AE_RADIUS_PX
CENTER_X = OUT_W // 2
CENTER_Y = OUT_H // 2
# Output-radius i pixels: hele halve siden av bildet
R_OUT_PX = OUT_W // 2

# For hver output-pixel (px, py):
#   r_norm = sqrt((px-cx)^2 + (py-cy)^2) / R_OUT_PX  (0..1)
#   r_abs_norm = r_norm * R_NORM_OUT_EDGE  (0..0.189 av full AE)
#   lat = 90 - 180 * r_abs_norm  (= 90 ned til 56°)
#   theta = atan2(px-cx, -(py-cy))   (vinkel der opp på skjerm = -y = lon 0)
#   lon = degrees(theta)

# Last mosaic som numpy for rask oppslag
import numpy as np
mosaic_arr = np.array(mosaic)
M_H, M_W = mosaic_arr.shape[:2]
print(f"Mosaic shape: {mosaic_arr.shape}")

# Output-array
out_arr = np.zeros((OUT_H, OUT_W, 4), dtype=np.uint8)

# Vektorisert reprojisering med numpy
print("Bygger pixel-koordinater (vektorisert)...")
ys, xs = np.indices((OUT_H, OUT_W))
dx = xs - CENTER_X
dy = ys - CENTER_Y
r_pix = np.sqrt(dx*dx + dy*dy)
r_norm = r_pix / R_OUT_PX
mask_in_disk = r_norm <= 1.0

# Lat (kun gyldig der mask_in_disk er True)
r_abs_norm = r_norm * R_NORM_OUT_EDGE  # 0..0.189
lat = 90 - 180 * r_abs_norm

# Theta (lon i radianer): konvensjon - lon=0 peker mot -y (opp på skjerm)
# atan2(x, -y): når dx=0, dy=-r -> atan2(0, +r) = 0 (rett opp = lon 0)
#               når dx=+r, dy=0  -> atan2(r, 0) = pi/2 (høyre = lon 90E)
theta = np.arctan2(dx, -dy)
lon = np.degrees(theta)

# Maskering: Norge fastland bbox
mask_norge = mask_in_disk & (lat >= LAT_MIN) & (lat <= LAT_MAX) & (lon >= LON_MIN) & (lon <= LON_MAX)
print(f"Pixels innenfor Norge bbox: {mask_norge.sum()} av {OUT_W*OUT_H}")

# For hver pixel innenfor Norge bbox: regn ut Mercator-tile-pixel
lat_sel = lat[mask_norge]
lon_sel = lon[mask_norge]

# Mercator-pixel-konvertering
lat_rad_sel = np.radians(lat_sel)
n = 2.0 ** ZOOM
xtile_f = (lon_sel + 180.0) / 360.0 * n
ytile_f = (1.0 - np.arcsinh(np.tan(lat_rad_sel)) / np.pi) / 2.0 * n
# Konverter til mosaikk-pixel
mx = ((xtile_f - X_MIN) * 256).astype(np.int32)
my = ((ytile_f - Y_MIN) * 256).astype(np.int32)
# Klipp til mosaikk-grenser
valid = (mx >= 0) & (mx < M_W) & (my >= 0) & (my < M_H)
mx = np.clip(mx, 0, M_W-1)
my = np.clip(my, 0, M_H-1)

# Slå opp og skriv til out_arr
rgba = mosaic_arr[my, mx]
# Sett alpha=0 der det ikke er valid eller original tile har alpha=0
valid_full = valid & (rgba[:, 3] > 10)
final_rgba = np.zeros_like(rgba)
final_rgba[valid_full] = rgba[valid_full]

out_arr[mask_norge] = final_rgba

# Lagre
print("Lagrer output...")
out_img = Image.fromarray(out_arr, "RGBA")
out_img.save(OUT_PATH, "WEBP", quality=88, method=6)
print(f"FERDIG: {OUT_PATH} ({os.path.getsize(OUT_PATH)//1024} KB, {OUT_W}x{OUT_H} px)")
print(f"AE-projeksjon: senter = Nordpolen, ytre radius = lat {LAT_AT_OUT_EDGE}° (r_norm={R_NORM_OUT_EDGE:.4f} av full AE)")
