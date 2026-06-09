# GE-GRID 0E - posisjonspresisjon 200 mm

Status: IMPLEMENTERT / KLAR FOR VERIFISERING
Dato: 2026-06-09

## Formål

GE-GRID-0E legger inn matematisk posisjonskonvertering for GE-nettet.

Målet er at Instrumentet kan konvertere:

```text
lat/lon -> Instrument x/z -> lat/lon
```

med intern roundtrip-feil under 200 mm.

## Viktig avgrensning

0E tegner ikke flere synlige linjer.

0E endrer ikke:

- geometri
- anker
- transform
- `aeProject`
- clean-motor
- kartmotor
- kartlag

## Låst matematikk

Forward:

```text
aeProject(lat, lon)
```

Inverse:

```text
radius = sqrt(x^2 + z^2)
lat = 90 - (radius / R_OUTER) * 180
compassDeg = atan2(x, -z)
lon = 180 - compassDeg
```

Lengdegrad normaliseres til `-180..180`.

## Akseptkriterium

```text
maxErrorMm <= 200
```

Instrumentet rapporterer:

```text
GE grid position precision: target 200 mm, max ... mm, pass
```

Maskinlesbart:

```text
window.__GE_GRID_0E
```

## Testpunkter

0E bruker faste roundtrip-prøver, blant annet:

- Greenwich
- Equator-0
- East-90
- Dateline
- West-90
- Arctic Circle Center
- Grímsey
- Catequilla
- Oslo

## Betydning

Dette betyr ikke at alle GPS-/kartlag er ferdige.

Det betyr at GE-nettets interne matematiske posisjonskonvertering er klar for presis plotting.
