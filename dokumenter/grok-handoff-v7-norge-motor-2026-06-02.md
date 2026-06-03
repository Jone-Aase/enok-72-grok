# Grok Handoff - v7 Norgeskart Motor

## Norsk

Dette er siste lokale ChatGPT/Codex-versjon av v7 Norgeskart-motoren, testet av Jone i Instrumentet på:

`http://127.0.0.1:8091/index.html?bust=v7-norge-focused-1`

Status:

- Ny Norgeskart-motor kjører inne i Instrumentet.
- Leaflet er ikke lastet: `window.L === false`.
- Leaflet-DOM er 0.
- Norgeskartet åpner fokusert på Norge.
- Dynamiske Kartverket-tiles ligger synlig oppå Instrumentflaten.
- Sjøkart er koblet inn.
- Norge i bilder er koblet via ny WMS-adresse, men krever gyldig token før flyfoto kan vises.
- UN AE-kartet er av når Norgeskartet er på.

Viktige filer:

- `index.html`
- `app.js`
- `norge.html` som Leaflet-referanse
- `norge-byer.json`
- `norge-kartverket-*.webp` som grove AE-rasterreferanser
- `dokumenter/grok-handoff-v7-norge-motor-2026-06-02.md`

Grok-oppgave:

Gjør en uavhengig Rule 1-audit. Ikke skriv kode først.

Sjekk spesielt:

- Om Mercator/WebMercator brukes til noe annet enn tile-adresse/henting.
- Om tile-plassering, form, skala, avstand eller areal påvirkes av projeksjonsmatematikk.
- Om 3-anker-prinsippet og AE-flaten er beholdt som styrende prinsipp.
- Hvilke funksjoner fra `norge.html` som fortsatt mangler eller bør forbedres.
- Risiko: tile-flimmer, for mange tiles, lagrekkefølge, NIB-token, zoom/pan, måleverktøy.

Rule 1:

Det sanne arealet er ukrenkelig. Kartverket-tiles skal være sanne lokale utklipp og ikke strekkes/reprojiseres som ny sannhet. Norge skal styres av AE + 3 ankere og riktig nord.

## English

This is the latest local ChatGPT/Codex version of the v7 Norway map engine, tested by Jone inside the Instrument at:

`http://127.0.0.1:8091/index.html?bust=v7-norge-focused-1`

Status:

- New Norway map engine runs inside the Instrument.
- Leaflet is not loaded: `window.L === false`.
- Leaflet DOM count is 0.
- The Instrument opens focused on Norway.
- Dynamic Kartverket tiles are visibly rendered over the Instrument surface.
- Sea chart layer is connected.
- Norge i bilder is connected through the newer WMS endpoint, but requires a valid token before imagery can be shown.
- UN AE map is off when the Norway map is on.

Important files:

- `index.html`
- `app.js`
- `norge.html` as the Leaflet reference
- `norge-byer.json`
- `norge-kartverket-*.webp` as coarse AE raster references
- `dokumenter/grok-handoff-v7-norge-motor-2026-06-02.md`

Grok task:

Perform an independent Rule 1 audit. Do not write code first.

Check especially:

- Whether Mercator/WebMercator is used for anything beyond tile addressing/fetching.
- Whether tile placement, form, scale, distance, or area is affected by projection math.
- Whether the 3-anchor principle and AE surface remain the governing principles.
- Which functions from `norge.html` are still missing or need improvement.
- Risks: tile flicker, tile count, layer order, NIB token, zoom/pan, measurement tools.

Rule 1:

True area is inviolable. Kartverket tiles must remain true local cutouts and must not be stretched/reprojected as a new truth. Norway must be governed by AE + 3 anchors and correct north.
