# Grok-svar: Landfarger v16.76

Lagret av Perplexity-agenten fra Grok-melding 2026-05-31 02:43 CEST.
Grok rapporterte commit men filen var ikke i repoet, sa vi lagrer her.

## 1. create_land_color_lut (analog til ocean)

```python
import numpy as np

def create_land_color_lut(stops, gamma=0.85, lut_size=1024):
    """Precomputes LUT for landfarge med gamma (hoyere gamma = mer mettet hoyland/relieff)."""
    positions = np.array([p for p, _ in stops])
    rgb = np.array([rgb for _, rgb in stops], dtype=float) / 255.0

    heights = np.linspace(0.0, 1.0, lut_size)           # 0 = lavest, 1 = hoyest
    heights_gamma = np.power(heights, gamma)

    r = np.interp(heights_gamma, positions, rgb[:, 0])
    g = np.interp(heights_gamma, positions, rgb[:, 1])
    b = np.interp(heights_gamma, positions, rgb[:, 2])

    lut = (np.stack([r, g, b], axis=-1) * 255).round().astype(np.uint8)
    return lut
```

## 2. To palett-varianter

### ATLAS_STOPS (mettet skoleatlas-stil)

```python
ATLAS_STOPS = [
    (0.0,   (210, 195, 160)),  # lavland / varm orken (Sahara)
    (0.25,  (140, 175, 105)),  # vegetasjon (Europa)
    (0.50,  (165, 145, 115)),  # steppe / lavt fjell
    (0.75,  (185, 175, 155)),  # hoyland (Etiopia / Iran)
    (1.0,   (245, 248, 255)),  # sno / is-platå (Himalaya)
]
```

### GE_PLUS_STOPS (Google Earth-inspirert + mer kontrast/varme)

```python
GE_PLUS_STOPS = [
    (0.0,   (225, 205, 170)),  # orken (varmere enn original GE)
    (0.25,  (120, 165,  90)),  # dypere vegetasjon
    (0.50,  (155, 135, 110)),  # fjell / steppe
    (0.75,  (190, 180, 160)),  # hoyland
    (1.0,   (240, 245, 255)),  # sno / is
]
```

## 3. Kystlinje-behandling (rangert)

1. 1px mork kontur (RGB 30,50,70) — beste valg
2. 2px soft blend — naturlig look, mindre punch
3. Hard kant — for enkelt, ser flat ut

## 4. Sno-stop

(235, 242, 255) med lett blaaskygge, paafort der DEM > 5000 m.

## 5. Vei A vs B

Vei A (LUT paa eksisterende NE HYP_HR_SR_OB_DR.tif): anbefalt for v16.76,
raskt. Vei B (bygge fra ETOPO/SRTM DEM): vent til v16.77 hvis vi vil ha
total kontroll over relieff.

## Bruksanvisning

```python
land_lut = create_land_color_lut(ATLAS_STOPS, gamma=0.85)
# Apply paa hypso-channel + 1px kyst-kontur + snow-mask
```

## 6. Kystlinje-funksjon (Grok-tillegg 02:48 CEST)

```python
import numpy as np
from scipy.ndimage import binary_erosion, binary_dilation

def add_coastline_contour(image_np, land_mask=None,
                          contour_color=(30, 50, 70), thickness=1):
    """Legger til 1px mork kystlinje paa ferdig land+hav-bilde.
    - image_np: numpy array (H, W, 3) uint8
    - land_mask: bool array (True = land). Hvis None, estimeres fra
      ikke-hav-farge.
    """
    if land_mask is None:
        ocean_mask = np.all(image_np < [80, 120, 160], axis=-1)
        land_mask = ~ocean_mask

    land_bin = land_mask.astype(bool)
    eroded = binary_erosion(land_bin, iterations=thickness)
    contour_mask = land_bin & ~eroded

    if thickness > 1:
        contour_mask = binary_dilation(contour_mask, iterations=thickness-1)

    image_np[contour_mask] = contour_color
    return image_np
```

Merknad: Vi sender land_mask eksplisitt (fra ETOPO1 elev > 0), ikke
auto-detect, for praesis kant.

