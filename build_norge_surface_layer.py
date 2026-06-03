#!/usr/bin/env python3
"""
Build one AE-aligned Norway surface raster from Kartverket WMTS.

This follows the existing `build_norge_kartverket.py` geometry:
- output is 2048x2048
- center pixel is the North Pole
- output radius is lat 56.0
- pixel reprojection uses the same AE convention as the instrument
"""
import argparse
import json
import math
import os
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

from PIL import Image

ZOOM = 7
LAT_MIN, LAT_MAX = 57.9, 71.3
LON_MIN, LON_MAX = 4.0, 32.0
LAT_AT_OUT_EDGE = 56.0
OUT_W = OUT_H = 2048
CENTER_X = CENTER_Y = 1024
R_OUT_PX = 1024
KARTVERKET_URL_TEMPLATE = "https://cache.kartverket.no/v1/wmts/1.0.0/{layer}/default/webmercator/{z}/{y}/{x}.png"
OSM_URL_TEMPLATE = "https://tile.openstreetmap.org/{z}/{x}/{y}.png"


def deg2tile(lat, lon, zoom):
    lat_rad = math.radians(lat)
    n = 2.0 ** zoom
    xtile = (lon + 180.0) / 360.0 * n
    ytile = (1.0 - math.asinh(math.tan(lat_rad)) / math.pi) / 2.0 * n
    return xtile, ytile


def fetch_tile(layer, tile_dir, x, y):
    fn = os.path.join(tile_dir, f"{layer}_z{ZOOM}_x{x}_y{y}.png")
    if os.path.exists(fn) and os.path.getsize(fn) > 0:
        return x, y, fn

    template = OSM_URL_TEMPLATE if layer == "osm" else KARTVERKET_URL_TEMPLATE
    url = template.format(layer=layer, z=ZOOM, x=x, y=y)
    request = urllib.request.Request(url, headers={"User-Agent": "Enok72-Norge-Fork/1.0"})
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            content = response.read()
            status = response.status
    except Exception as exc:
        print(f"Tile missing {layer} z{ZOOM}/{y}/{x}: {exc}")
        return x, y, None
    if status == 200 and len(content) > 100:
        with open(fn, "wb") as f:
            f.write(content)
        return x, y, fn
    print(f"Tile missing {layer} z{ZOOM}/{y}/{x}: HTTP {status}")
    return x, y, None


def build_layer(layer, output):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    tile_dir = os.path.join(script_dir, ".kartverket_tiles")
    os.makedirs(tile_dir, exist_ok=True)

    x_sw, y_sw = deg2tile(LAT_MIN, LON_MIN, ZOOM)
    x_ne, y_ne = deg2tile(LAT_MAX, LON_MAX, ZOOM)
    x_min = int(min(x_sw, x_ne))
    x_max = int(max(x_sw, x_ne)) + 1
    y_min = int(min(y_sw, y_ne))
    y_max = int(max(y_sw, y_ne)) + 1
    cols = x_max - x_min + 1
    rows = y_max - y_min + 1
    print(f"{layer}: tiles x={x_min}..{x_max}, y={y_min}..{y_max} ({cols}x{rows})")

    tiles = {}
    with ThreadPoolExecutor(max_workers=12) as executor:
        futures = [
            executor.submit(fetch_tile, layer, tile_dir, x, y)
            for x in range(x_min, x_max + 1)
            for y in range(y_min, y_max + 1)
        ]
        for future in as_completed(futures):
            x, y, fn = future.result()
            if fn:
                tiles[(x, y)] = fn

    mosaic = Image.new("RGBA", (cols * 256, rows * 256), (255, 255, 255, 0))
    for (x, y), fn in tiles.items():
        tile = Image.open(fn).convert("RGBA")
        mosaic.paste(tile, ((x - x_min) * 256, (y - y_min) * 256))

    mosaic_px = mosaic.load()
    mosaic_w, mosaic_h = mosaic.size
    out_img = Image.new("RGBA", (OUT_W, OUT_H), (255, 255, 255, 0))
    out_px = out_img.load()

    r_norm_edge = (90 - LAT_AT_OUT_EDGE) / 180.0
    n = 2.0 ** ZOOM
    written = 0
    for py in range(OUT_H):
        if py % 256 == 0:
            print(f"  row {py}/{OUT_H}")
        dy = py - CENTER_Y
        for px in range(OUT_W):
            dx = px - CENTER_X
            r_norm = math.hypot(dx, dy) / R_OUT_PX
            if r_norm > 1.0:
                continue
            lat = 90 - 180 * (r_norm * r_norm_edge)
            if lat < LAT_MIN or lat > LAT_MAX:
                continue
            lon = math.degrees(math.atan2(dx, -dy))
            if lon < LON_MIN or lon > LON_MAX:
                continue

            lat_rad = math.radians(lat)
            xtile_f = (lon + 180.0) / 360.0 * n
            ytile_f = (1.0 - math.asinh(math.tan(lat_rad)) / math.pi) / 2.0 * n
            mx = int((xtile_f - x_min) * 256)
            my = int((ytile_f - y_min) * 256)
            if 0 <= mx < mosaic_w and 0 <= my < mosaic_h:
                rgba = mosaic_px[mx, my]
                if rgba[3] > 10:
                    out_px[px, py] = rgba
                    written += 1

    print(f"  written pixels: {written}")
    out_path = os.path.join(script_dir, output)
    out_img.save(out_path, "WEBP", quality=88, method=6)
    meta_path = out_path.replace(".webp", ".metadata.json")
    with open(meta_path, "w", encoding="utf-8") as f:
      json.dump({
          "source": "OpenStreetMap XYZ" if layer == "osm" else "Kartverket WMTS",
          "layer": layer,
          "zoom": ZOOM,
          "output": {
              "path": output,
              "width_px": OUT_W,
              "height_px": OUT_H,
              "edge_lat": LAT_AT_OUT_EDGE,
              "radius_px": R_OUT_PX,
              "center_px": [CENTER_X, CENTER_Y],
          }
      }, f, ensure_ascii=False, indent=2)
    print(f"Done: {out_path}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--layer", required=True)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()
    build_layer(args.layer, args.output)


if __name__ == "__main__":
    main()
