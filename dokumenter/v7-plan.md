# v7 — 2D tile-pane med 3-anker-kalibrering

Fase 1 — arkitekturplan

Levert av: Grok
Dato: 2026-06-02
Status: Til review (revisjon 2 etter Perplexity review)

Denne planen er Groks uavhengige svar på oppgave-1-v7-plan.md. Den er levert som markdown i Perplexity-tråden av Grok og pushet av Perplexity.

## 1. Pane-arkitektur

Velger WebGL-quad inne i Three.js-scenen som tekstureres med tile-mosaikk. Dette gir høyest oppløsning (z18/z19), ingen DOM-overhead, full kontroll over AE-transform og perfekt synkronisering med 3D-scenen. DOM-overlay ville gi lavere oppløsning og render-forsinkelse. Eget 2D canvas ville kreve ekstra kopi av pikseldata.

## 2. Anker-til-pane-transform

3-anker-similarity-transformen M = T2·Ry·S·T1 oversettes direkte til en mat4 for quad-mesh. Quad er en flat mesh på Y=0-plan med texture coordinates som matcher tile-grid. Transformen brukes i vertex-shaderen.

Residual-akseptkriterium: ≤ 0.9 km på de 3 ankerne (samme som v6).

## 3. Kamera-synkronisering

Kamera-events (wheel, drag) oppdaterer både Three.js-camera og pane-ens transform. Zoom-nivå velges med `chooseNorgeZoom` basert på `camera.position.y`. Pan og rotasjon følger anker-matrise.

Zoom-mapping-tabell:

- camera.position.y > 80 → z=5
- camera.position.y > 40 → z=6
- camera.position.y > 18 → z=7
- camera.position.y > 8 → z=8
- camera.position.y > 3 → z=10
- ellers → z=11

## 4. Tile-loading-strategi

Viewport-culling i screen space: 256px tiles, z18/z19, base/overlay lag. Frustum fra kamera ned til Y=0. Prioritering: sentrum først, cache med LRU.

Cache-størrelse: maks 512 tiles i memory.

Fade-tid ved zoom-overgang: 300 ms.

## 5. Synkronisering mellom 3D og 2D

Pane-en ligger OVER 3D-lagene (sol-ringer, GE-grid, polarsirkler). Z-rekkefølge håndteres med Three.js render order. Sol og grid beholder original posisjon.

## 6. Filer som påvirkes

- `app.js` (erstatte Leaflet-delen med WebGL-pane)
- `index.html` (fjerne Leaflet, beholde canvas)
- Ny fil: `ScreenTilePane.js`
- Ny fil: `TileAtlas.js`
- Ny fil: `TileScreenMapping.js` (tidligere foreslått som `KartverketReprojection.js`, omdøpt fordi filen kun gjør koordinat-mapping fra AE-verdenskoordinater til tile-skjermposisjon uten å resample tile-piksler — innenfor Regel 1)

## 7. Risiko-vurdering

Risiko: høyere GPU-belastning ved z19. Fallback: begrense max zoom til z16. Estimat Fase 2: 4-6 timer etter plan-godkjenning.

## D6. Gjensidig eksklusivitet UN AE versus Norgeskart

Pane-en erstatter UN AE-kartet når Norgeskart-modus aktiveres. Begge kan ikke vises samtidig. Overgangs-animasjon: fade 300 ms når lag byttes. UN AE-kartet deaktiveres visuelt og i Three.js-scenen når Norgeskart-pane aktiveres.

---

Plan godkjent av prosjekteier før Fase 2 startes.
