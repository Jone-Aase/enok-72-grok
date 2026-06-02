# GROK START HER — enok-72-grok

Velkommen, Grok. Dette er din arbeidskopi av Norgeskart-instrumentet.

## Hva dette repoet er

Dette er en **kopi** av `enok-72-norge-tilt` per 2. juni 2026 ~14:30 UTC.
Hovedrepoet (`Jone-Aase/enok-72-norge`) er frosset for deg — du jobber HER,
i `Jone-Aase/enok-72-grok`.

Du har skrivetilgang via PAT som er gitt deg av prosjekteier Jone Aase.

## Aktiv URL

- Live (deployes fra hovedrepoet, ikke dette): https://enok-72-norge-tilt.vercel.app
- Hovedinstrument (FRYST): https://enok-72-norge-kalibrering.vercel.app

## Regler (overholdes strengt)

1. **Det sanne arealet er ukrenkelig.** Ingen Mercator-matematikk, ingen omprojisering, ingen rutenett-transformasjon, ingen kode og ingen algoritme som endrer det sanne arealet, den sanne avstanden eller den sanne formen skal inn i Instrumentet eller brukes noe sted i dette prosjektet. Tiles fra Kartverket brukes som sanne lokale utklipp og plasseres uendret i AE-rammen via 3-anker-kalibreringen. Brytes denne regelen, brytes hele grunnlaget for Instrumentet.
2. **Lengdegrader = GE-grid eksakt. Breddegrader = kun Solens 5 ringer.** Norge = sann form, festes til 3 ankerpunkter, IKKE strekkes.
3. **Ikke programmer noe før du har sett siste versjon av filen og arket T.**
4. **Kun Perplexity committer til GitHub.**
5. **Ved tvil — SPØR, ikke gjett.**
6. **Solen er passeren som brukes til å fastslå breddegradene.**
7. **Norsk mellom oss i utviklingsfasen. All dokumentasjon skrives både på engelsk og norsk. Tekst inne i Instrumentet er på engelsk.**
8. **Ikke ramme inn teksten.**

Hovedinstrumentet er FRYST. Denne kopien (enok-72-grok) kan endres.

## Status per 2. juni 2026

### Hva er gjort

- v6-motoren (Three.js-tiles) erstatter Leaflet-overlegget.
- 3 ankerpunkter på polarsirkelen styrer plasseringen:
  - Selsøy: 66.5502°N, 12.8462°Ø
  - Kveitanosen: 66.5500°N, 12.6383°Ø
  - Arctic Circle Center: 66.5500°N, 15.3266°Ø
- Anker-matrise M = T2·Ry·S·T1 (similarity-transform fra Mercator til AE).
- Rotasjons-tegn: `rotRad = +lonSenter * Math.PI / 180` (verifisert).
- Viewport-culling i v6-stil: stråler fra kamera ned på Y=0, AE-bbox-test.
- Multi-zoom: permanent z=5 base-lag + dynamisk z=6–11 oppå.
- Kamera-target settes til Norges senter (etter anker-transform) når
  Norgeskart-modus aktiveres, slik at scroll-zoom faktisk zoomer mot Norge.

### Verifiserte residualer (i live)

- Selsøy 0.6 km
- Kveitanosen 0.3 km
- Arctic Center 0.9 km
- Oslo 111 km
- Bergen 156 km
- Tromsø 64 km
- Nordkapp 181 km

Residualene utenfor ankerlinjen er den iboende kostnaden ved similarity-transform.

## Tekniske fakta

### Konstanter

```js
R_EQUATOR_KM = 10001.47
R_OUTER_KM   = 31420.55
SCALE = 1 / 1000
latToR(lat) = R_OUTER * (90 - lat) / 180
```

### Tile-URL (Kartverket)

```
https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png
```

**NB:** y/x-rekkefølge (ikke x/y).

### Zoom-tabell (`chooseNorgeZoom`)

| dist (camera Y) | zoom |
|---|---|
| > 80 | 5 |
| > 40 | 6 |
| > 18 | 7 |
| > 8 | 8 |
| > 3 | 10 |
| ellers | 11 |

### AE-projeksjon (lat,lon → x,z i AE-rom)

```js
compassDeg = (180 - signedLon) mod 360
x = sin(a) * r
z = -cos(a) * r
a = compassDeg * π / 180
r = R_OUTER * (90 - lat) / 180

// lon=0°    → +Z (bunn av disken)
// lon=90°E  → +X (høyre)
// nordpolen → origo
```

### Anker-matrise

`computeAnchorMatrix(zoom)` returnerer M som transformerer tile-koord (z,x,y) til AE-rom.

```js
M = T2 · Ry · S · T1
```

- T1: flytter tile-koord til lokal opprinnelse i tile-rom (ankerpunkt-tile-senter)
- S: skalering (basert på avstand mellom ankerpunkter i tile-rom vs AE-rom)
- Ry: rotasjon om Y-aksen, θ = +lon_senter * π / 180
- T2: flytter til ankerpunkt i AE-rom

## Mappe-struktur

```
/
├── app.js              ← Hovedlogikk (~240 KB, ~4400 linjer)
├── index.html          ← UI
├── style.css           ← Stylesheet
├── api/                ← Vercel-funksjoner (proxy, etc.)
├── arkiv/              ← Tidligere versjoner
├── README.md
├── STATUS-NA.md
├── AGENT-START-HER.md  ← Original agent-onboarding
└── GROK-START-HER.md   ← Denne filen
```

## Hva du kan jobbe med

Spør prosjekteier før du starter — han prioriterer oppgaver fra hovedtråden.

Vanlige områder:

- Forbedre tile-loading (forhåndslast, prioritering)
- Justere zoom-tabell for jevnere overganger
- Optimalisere viewport-culling
- Legge til nye Norgeskart-lag (sjøkart, historisk topografi, etc.)
- Forbedre status-rapportering i UI

## Workflow

1. Lag en branch for hver oppgave: `git checkout -b grok/<kort-navn>`
2. Test lokalt: `node --check app.js`
3. Commit med klar melding på norsk
4. Push og opprett PR mot main i `Jone-Aase/enok-72-grok`
5. Prosjekteier reviewer og merger

## Kontakt

Hovedkoordinator: Jone Aase. Bruker Perplexity som primær-agent for review og merge.

---

Sist oppdatert: 2. juni 2026
