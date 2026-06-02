# v7 — 2D tile-pane med 3-anker-kalibrering

Fase 1 — arkitekturplan

Levert av: Grok
Dato: 2026-06-02
Status: Til review

Denne planen er Groks uavhengige svar på oppgave-1-v7-plan.md. Den er levert som markdown i Perplexity-tråden av Grok (Grok har skrivetilgang til repoet, men i denne runden ble planen overført via markdown og pushet av Perplexity).

## 1. Pane-arkitektur

Velger WebGL-quad inne i Three.js-scenen som tekstureres med tile-mosaikk. Dette gir høyest oppløsning (z18/z19), ingen DOM-overhead, full kontroll over AE-transform og perfekt synkronisering med 3D-scenen. DOM-overlay ville gi lavere oppløsning og render-forsinkelse. Eget 2D canvas ville kreve ekstra kopi av pikseldata.

## 2. Anker-til-pane-transform

3-anker-similarity-transformen M = T2·Ry·S·T1 oversettes direkte til en mat4 for quad-mesh. Quad er en flat mesh på Y=0-plan med texture coordinates som matcher tile-grid. Transformen brukes i vertex-shaderen.

## 3. Kamera-synkronisering

Kamera-events (wheel, drag) oppdaterer både Three.js-camera og pane-ens transform. Zoom-nivå velges med `chooseNorgeZoom` basert på `camera.position.y`. Pan og rotasjon følger anker-matrise.

## 4. Tile-loading-strategi

Viewport-culling i screen space: 256px tiles, z18/z19, base/overlay lag. Frustum fra kamera ned til Y=0. Prioritering: sentrum først, cache med LRU. Zoom-overganger med fade.

## 5. Synkronisering mellom 3D og 2D

Pane-en ligger OVER 3D-lagene (sol-ringer, GE-grid, polarsirkler). Z-rekkefølge håndteres med Three.js render order. Sol og grid beholder original posisjon.

## 6. Filer som påvirkes

- `app.js` (erstatte Leaflet-delen med WebGL-pane)
- `index.html` (fjerne Leaflet, beholde canvas)
- Ny fil: `ScreenTilePane.js`
- Ny fil: `TileAtlas.js`
- `KartverketReprojection.js` oppdateres for screen-space

## 7. Risiko-vurdering

Risiko: høyere GPU-belastning ved z19. Fallback: begrense max zoom til z16. Estimat Fase 2: 4-6 timer etter plan-godkjenning.

---

Plan godkjent av prosjekteier før Fase 2 startes.
