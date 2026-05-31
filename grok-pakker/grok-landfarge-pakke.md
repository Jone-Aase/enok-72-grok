# Grok-pakke: Landfarger v16.76 — overgaa Google Earth

Status: v16.75 er live paa GitHub Pages. Havet (v1g-c, GAMMA=1.8) er
godkjent av Jone-Aase. Naa skal vi forbedre landoverflaten og
kystkontrasten med samme ambisjonsniva som havet: overgaa Google Earth.

## Maal

1. Mer mettede, distinkte landfarger enn Natural Earth-defaulten.
2. Tydeligere skille mellom okosystem-soner (regnskog vs steppe vs orken
   vs tundra) ved hjelp av en hoyde- + bredde-basert palett.
3. Bedre kontrast hav/land langs kysten uten kunstige svarte streker.
4. Beholde shaded relief slik at fjell ser tredimensjonale ut.
5. Snofjell og innlandsis skal vaere klart kjoligere/hvitere enn vanlig
   land og klart skilt fra havet.

## Hva v16.75 bruker i dag (kildedata)

Land-rasteret er Natural Earth `HYP_HR_SR_OB_DR.tif`
(21600 x 10800, 700 MB) — Hypsometrisk tinting + Shaded Relief +
Ocean Bottom + Drainages, alle innebakt i en RGB-TIFF. Vi resampler
fra equirectangular til AE-projeksjon (8192 x 8192, Nord-pol i
sentrum) i `build_combo_v1g_optimized.py`.

Havet (v1g-c, godkjent) bygges fra `OB_LR.tif` bathymetri via
`create_ocean_color_lut(V1G_STOPS, gamma=1.8, lut_size=1024)`:

```
V1G_STOPS = [
    (0.00, (2,   6,  18)),   # dypest -> nesten svart-marine
    (0.20, (8,  22,  55)),
    (0.45, (20, 55, 115)),
    (0.70, (38, 95, 165)),
    (0.90, (62,130, 195)),
    (1.00, (95,160, 210)),   # grunnest, mettet
]
GAMMA = 1.8
```

## Problem-observasjoner (se vedlagte crops)

`02-asia-himalaya.png` og `03-africa-sahara.png` viser:

- Sahara er for blass/pastell-beige. GE bruker varmere oker-rod.
- Vegetasjon (Europa, India, Sahel) er groennlig-bla snarere enn
  ekte vegetasjons-groen. Lite forskjell mellom regnskog og steppe.
- Himalaya-snoen er litt graalig — kunne vaert renere hvitt med
  blaaaktig skygge.
- Kystlinjen flyter litt: blass beige -> blass blaa har lav kontrast.
  Med v1g-c-havet er kontrasten bedre, men landet "rommer ikke kysten".
- Shaded relief er bra, ikke ror den, men gjerne forsterk subtilt.

## Hva vi onsker fra deg, Grok

### 1. `create_land_color_lut(stops, gamma, lut_size)`

Analog til havets `create_ocean_color_lut`, men:

- Stops er hoyde-baserte (0 m kyst -> 8848 m Mount Everest).
- Vurder ogsa en valgfri 2D-LUT (hoyde x bredde) for klimasoner:
  ekvator-naer + lav-hoyde = regnskog-groenn,
  midt-bredder + lav-hoyde = tempererte gras-groenn,
  subtropisk + lav-hoyde = oker (Sahara, Australia),
  hoy-hoyde = stein-graa,
  veldig hoy-hoyde = sno-hvit.
- Returner ferdig LUT slik at vi kan np.indexere paa hoyde-array.

### 2. Konkrete palettforslag

Lever minst to varianter, med RGB-stops:

- `ATLAS_STOPS` — som et fysisk skoleatlas, mer mettet enn NE.
- `GE_PLUS_STOPS` — Google Earth-inspirert men mer kontrast og varme.

Ekvivalent gamma-anbefaling for hver.

### 3. Kystlinje-behandling

Tre alternativer, ranger:

a) Hard binaer kant fra `ne_10m_land.shp`.
b) 1-piksel mork kontur (RGB 30,50,70) langs kysten.
c) 2-piksel soft alpha-blend (ingen ekstra kontur).

Som hjelp: havet er n0a (2,6,18)..(95,160,210). Hva gir best
"snappy edge" uten kunstig look paa 8192-projeksjonen?

### 4. Sno-/is-tone

Innlandsis paa Antarktis og Gronland, samt fjell over ~5000 m, boer
ha et eget snow-stop. Forslag til RGB? (Vi bruker (255,255,255) i dag
men det fortjener litt cyan-skygge.)

### 5. Render-pipeline-anbefaling

Vi har valget mellom to vei:

- A: Beholde NE HYP_HR_SR_OB_DR.tif som basis (det inneholder allerede
  hypsometri + relief + drainages), og bare *farge-justere* den med en
  LUT/HSL-omforming i AE-output.
- B: Bygge landet fra bunnen av med ETOPO/SRTM DEM + landmask + en ny
  prosedyral relief-skyggelegging.

Vei A er raskere og bevarer NE sin elv-tegning. Vei B gir total
kontroll men er stor jobb. Anbefal A eller B basert paa malet "overgaa
GE", og hvis A: gi konkrete HSL/curves-instrukser vi kan kjore paa
HYP_HR_SR_OB_DR.tif for a fa farge-loftet vi onsker.

## Format paa svaret

Lever direkte koerbar Python (samme stil som `create_ocean_color_lut`):

```python
def create_land_color_lut(stops, gamma=1.0, lut_size=1024):
    ...

LAND_ATLAS_STOPS = [
    (0.00, (R, G, B)),   # havniva
    (0.05, (R, G, B)),   # lavland vegetasjon
    ...
    (1.00, (R, G, B)),   # snopiggen
]
GAMMA_LAND = ...
```

Hvis du gaar 2D-LUT-veien, lever ogsa en `create_land_color_lut_2d(
elev_stops, lat_modifiers, gamma)`.

Anbefal en gamma og en lut_size. Forklar valgene i 5-10 linjer over
koden.

## Vedlegg (i samme mappe som denne filen)

- `land-sample-overview.png` (full v16.75-disk, 1600 px)
- `land-sample-africa-sahara.png` (Sahara + Middelhavet + Etiopia)
- `land-sample-asia-himalaya.png` (Himalaya + India + Iran)
- `v1g-c havet er live` (referanse for hav-kontrast)

## Hvor levere svar

Commit svaret som `grok-pakker/grok-svar-landfarge.md` paa main-branch.
Inkluder kode-blokker og forklaringer. Jone-Aase tar valget mellom
variantene.
