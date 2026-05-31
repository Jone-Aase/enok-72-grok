"""
Laster ned Kartverket WMTS topograatone-fliser (samme som norge.html bruker)
og syr dem sammen til en flat Mercator-mosaikk.

Ingen reprojeksjon. Resultatet er en PNG som dekker Norge i Mercator-projeksjon.
Skal legges inn som tekstur i 3D-scenen, plassert over Norge paa AE-disken.
Posisjonering finjusteres senere etter Jone-Aases instruksjoner.

Output: norge-mercator.png
"""
import math
import urllib.request
from PIL import Image
from concurrent.futures import ThreadPoolExecutor

# Norge fastland bbox
LAT_MIN, LAT_MAX = 57.5, 71.5
LON_MIN, LON_MAX = 4.0, 32.0

ZOOM = 7  # samme som forrige build, 156 fliser dekker fastlandet

TILE_URL = "https://cache.kartverket.no/v1/wmts/1.0.0/topograatone/default/webmercator/{z}/{y}/{x}.png"

def lon_to_x(lon, z):
    return int((lon + 180.0) / 360.0 * (1 << z))

def lat_to_y(lat, z):
    return int((1.0 - math.log(math.tan(math.radians(lat)) + 1.0 / math.cos(math.radians(lat))) / math.pi) / 2.0 * (1 << z))

def x_to_lon(x, z):
    return x / (1 << z) * 360.0 - 180.0

def y_to_lat(y, z):
    n = math.pi - 2.0 * math.pi * y / (1 << z)
    return math.degrees(math.atan(0.5 * (math.exp(n) - math.exp(-n))))

def fetch_tile(z, x, y):
    url = TILE_URL.format(z=z, x=x, y=y)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'enok-72-norge/1.0'})
        with urllib.request.urlopen(req, timeout=30) as r:
            return Image.open(__import__('io').BytesIO(r.read())).convert('RGBA')
    except Exception as e:
        print(f"FEIL flis {z}/{x}/{y}: {e}")
        return Image.new('RGBA', (256, 256), (0, 0, 0, 0))

def main():
    x_min = lon_to_x(LON_MIN, ZOOM)
    x_max = lon_to_x(LON_MAX, ZOOM)
    y_min = lat_to_y(LAT_MAX, ZOOM)  # nord = lav y
    y_max = lat_to_y(LAT_MIN, ZOOM)
    
    cols = x_max - x_min + 1
    rows = y_max - y_min + 1
    print(f"Henter {cols}x{rows} = {cols*rows} fliser fra Kartverket zoom {ZOOM}")
    
    mosaic = Image.new('RGBA', (cols * 256, rows * 256), (0, 0, 0, 0))
    
    tasks = [(ZOOM, x, y) for x in range(x_min, x_max+1) for y in range(y_min, y_max+1)]
    
    with ThreadPoolExecutor(max_workers=8) as ex:
        results = list(ex.map(lambda t: (t[1], t[2], fetch_tile(*t)), tasks))
    
    for x, y, tile in results:
        mosaic.paste(tile, ((x - x_min) * 256, (y - y_min) * 256))
    
    # Lagre Mercator-mosaikken som den er
    mosaic.save('norge-mercator.png', optimize=True)
    print(f"Lagret norge-mercator.png ({mosaic.size[0]}x{mosaic.size[1]})")
    
    # Lagre bbox-info som vi trenger for plassering i 3D
    actual_lon_min = x_to_lon(x_min, ZOOM)
    actual_lon_max = x_to_lon(x_max + 1, ZOOM)
    actual_lat_max = y_to_lat(y_min, ZOOM)
    actual_lat_min = y_to_lat(y_max + 1, ZOOM)
    
    with open('norge-mercator-bbox.json', 'w') as f:
        import json
        json.dump({
            'lon_min': actual_lon_min,
            'lon_max': actual_lon_max,
            'lat_min': actual_lat_min,
            'lat_max': actual_lat_max,
            'width': mosaic.size[0],
            'height': mosaic.size[1],
            'zoom': ZOOM,
            'tile_x_min': x_min,
            'tile_x_max': x_max,
            'tile_y_min': y_min,
            'tile_y_max': y_max,
        }, f, indent=2)
    print(f"Bbox: lon {actual_lon_min:.4f}..{actual_lon_max:.4f}, lat {actual_lat_min:.4f}..{actual_lat_max:.4f}")

if __name__ == '__main__':
    main()
