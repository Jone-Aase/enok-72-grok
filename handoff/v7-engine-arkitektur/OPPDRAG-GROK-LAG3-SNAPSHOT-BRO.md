# Oppdrag til Grok: Lag 3 — Three.js snapshot-bro (kun plan)

Status: oppdrag fra systemutvikler til Grok. Leveranse: én markdown-fil med plan. Ingen kode i denne runden.

Base for analyse: codex/v7-next-dev-source @ dc95a08.

## Hva du skal gjøre

Foreslå hvordan vi kan bygge Lag 3 (visuell motor) som et helt isolert lag oppå dagens kartmotor, uten å røre Lag 1 (anker, aeProject, transform, GE-grid, solsirklene) eller forstyrre Lag 2 (tile-pipeline).

Spesifikt — lag en plan for snapshot-broen:

1. Når brukeren slår på Visuell modus (UI-toggle som bygges i Steg 1 av motor-arkitektur-planen), skal Lag 3 lese nåværende kartflate fra DOM (paner i `#norge-clean-detail-layer` og `#norge-screen-detail-layer`) og legge innholdet som tekstur på et flat-objekt i en Three.js-scene.

2. Måle-modus skal være stille — Three.js-canvas tomt eller skjult. DOM-kartet vises direkte (som i dag). Pikselidentisk med dagens.

3. Toggle skal bytte mellom modusene uten å rive ned tiles eller flytte anker.

## Hva du skal levere

Én markdown-fil pushet til handoff/v7-engine-arkitektur/RESPONS-GROK-LAG3-SNAPSHOT-BRO.md i en ny branch ved navn `grok/v7-lag3-snapshot-bro-plan` ut fra codex/v7-next-dev-source.

Innhold:

- Hvilken Three.js-versjon og hvilke moduler vi importerer (anbefal én ren ESM-import-strategi).
- Hvor i DOM Three.js-canvas plasseres (anbefal container, z-index, pointer-events).
- Hvordan vi snapper DOM til tekstur: html2canvas, native browser API (Document Picture-in-Picture, OffscreenCanvas, CSS Paint API), eller render direkte fra `<img>`-tiles til Three.js-teksturer per pane. Forklar fordeler og ulemper for hver.
- Hvordan flat-objektet i scenen får riktig størrelse og posisjon — uten å bryte sannhetsregelen (planet skal stå urørt, kameraet og lys er det som beveger seg).
- Når og hvordan snapshot oppdateres (ved pan-slutt, ved zoom-slutt, ved manuell trigger, eller kontinuerlig).
- Hvordan vi sikrer at Måle-modus er pikselidentisk med dagens.
- Risiko og bivirkninger.
- Forbudte ting i Lag 3 som du ser kan friste utviklere senere (post-processing som rører kartfarger, automatisk reprojeksjon, lerret-forskyvning ved zoom).

## Hva som er forbudt

- Ikke skrive kode. Bare plan i markdown.
- Ikke endre Lag 1 (anker, aeProject, transform, GE-grid, solsirkler).
- Ikke endre Lag 2 (tile-loading, tile-URL, cache).
- Ikke foreslå Cesium globe-modus eller andre globusprojeksjoner.
- Ikke foreslå Mapbox-GL, OpenLayers, Leaflet som primær motor.
- Ikke foreslå at flat-objektet i scenen bøyes eller wrappes til kule, sylinder eller noe annet enn flat plane.
- Ikke foreslå auto-reprojeksjon basert på lat/lon.
- Ikke foreslå render-effekter som ikke kan slås av i Måle-modus.

## Akseptkriterier for planen

- Tydelig svar på alle punkter over.
- Konkrete hvor-i-DOM-referanser.
- Klar liste over hvilke filer som vil bli endret når patch skrives, og hvilke som ikke vil bli rørt.
- Eget avsnitt om hvordan Lag 3 kan slås helt av med ett klikk og ikke etterlate spor.
- Eget avsnitt om hvordan vi tester pikselidentitet i Måle-modus (anbefal screenshot-diff eller manuell visuell sammenligning).

## Når planen er levert

Systemutvikler leser den, gir kommentarer eller godkjenner. Jone er endelig beslutter. Ingen patch før plan er godkjent.
