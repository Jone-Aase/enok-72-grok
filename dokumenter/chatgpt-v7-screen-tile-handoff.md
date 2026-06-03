# ChatGPT handoff: v7 screen-tile motor

Dato: 2. juni 2026

Dette er en lokal arbeidskopi av Norgeskart-motoren der Leaflet fortsatt er fjernet, men hvor den nye motoren er endret til aa tenke mer som Leaflet: hoyopploste tiles tegnes som skjermtiles i instrumentvinduet, ikke som smaa biter inni en enorm oppskalert AE-bildeflate.

## Hva som er gjort

- Lagt inn nytt DOM-lag: `#norge-screen-detail-layer`.
- Dynamiske z/x/y-tiles tegnes naa i skjermrom.
- Tile-posisjon beregnes slik:
  - `tile x/y/z -> tile-bounds lat/lon`
  - `lat/lon -> aeProject`
  - `AE world -> kamera -> skjermpunkt`
  - tile tegnes som `img` med CSS `translate + scale`
- Det gamle interne `#norge-surface-detail-layer` tommes og brukes ikke lenger til synlige detaljtiles.
- Synlig utsnitt beregnes fra kamera-rays ned paa AE-planen, ikke fra DOM-flaten. Dette fikset svart skjerm ved ekstrem zoom.
- Leaflet er ikke startet og skal ikke brukes i denne motoren.

## Viktige filer

- `index.html`
  - nytt `#norge-screen-detail-layer`
  - CSS for skjermbasert tile-pane
- `app.js`
  - `visibleNorgeSourceBounds()` bruker kamera-rays for synlig utsnitt
  - `updateNorgeDetailTiles()` bygger skjermtiles
  - z18-tiles lastes for valgt bakgrunnslag og eventuelt sjokart-overlay
- `dokumenter/v7-plan-CHATGPT.md` finnes ikke i denne ZIP-en med mindre den legges inn senere av Perplexity. Planen ble levert som markdown i chat.

## Testet lokalt

URL brukt:

```text
http://127.0.0.1:8091/index.html?bust=screen-detail-blackfix-2
```

Testresultater:

- OSM ved Bergen: z18, 140 synlige tiles, 0 brutt.
- Kartverket topo + sjokart: z18, 275 synlige tiles, 0 brutt.
- Ekstrem zoom 40 000 000 prosent: z18, synlige tiles, ingen svart skjerm.
- Leaflet-kontroll:
  - `window.L = false`
  - `.leaflet-container` og `.leaflet-tile` = 0

## Kjente svakheter

- Dette er fortsatt en lokal eksperimentversjon, ikke endelig v7.
- Tile-pane er DOM-basert og prototypepreget.
- Ved meget hoy zoom vises bare faa tiles. Det er riktig for ytelse, men krever god cache/overgangslogikk i endelig v7.
- Gamle lavopploste AE-rastere brukes fortsatt som grov bakgrunn/placeholder.
- NIB/flyfoto er ikke loest. WMS svarte tidligere med autentiseringsfeil.
- Sjoekart-overlay kan bli visuelt dominerende paa innland, fordi det legges over basiskartet.
- Kalibreringsstatus viser `AE-laast` for screen-tile-pane; endelig v7 boer ha en mer formell numerisk kontroll mot ankerpunktene.

## Hva Claude/Grok boer se paa

1. Er `visibleNorgeSourceBounds()` riktig og robust nok naar kamera zoomer/panner?
2. Boor tile-pane bruke DOM videre, eller canvas/WebGL etter prototype?
3. Boor tile-plassering gaa via axis-aligned bounding box, eller CSS affine matrix per tile?
4. Hvordan boer cache og zoom-overganger bygges slik at gamle tiles beholdes mens nye lastes?
5. Hvordan kobles 3-anker similarity-transformen mest ryddig inn i tile-pane-motoren?
6. Hvordan holder vi GE-grid, polarsirkler, solringer og markorer over kartet uten at kartet dekker instrumentlag?

## Arbeidsregel

Hovedinstrumentet er ikke ment aa patches videre fra denne kopien uten ny godkjenning. Bruk dette som sammenligningsgrunnlag mot Claude/Grok sin versjon, og samle beste loesning i en ny v7-branch.
