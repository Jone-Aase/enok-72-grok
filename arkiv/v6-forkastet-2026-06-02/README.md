# v6 — Forkastet 2026-06-02

Dette er v6 POC-en for Enok-72 Norge slik den så ut da Jone besluttet å forkaste tile-reprojeksjonen.

## Hvorfor forkastet

v6 brukte Mercator-formel (`lat = atan(sinh(y))`) for å gå fra tile-Y til lat, og reprojiserte deretter hvert tile-hjørne gjennom `aeProject`. Dette bryter Rule 1:

- Lengdegrader: eksakt som GE-grid (oppfylt)
- Breddegrader: KUN Solens 5 ringer (BRUTT — Mercator-matematikk er ikke tillatt)
- Norgeskartet skal ha sann form, festes til ankerpunkter, ikke strekkes per tile-hjørne (BRUTT)

Tester gikk matematisk gjennom (0.0001 px pikselavvik, alle bestått), men premisset var feil.

## Hengelås

`poc-main.js` har `TILE_REPROJECTION_LOCKED = true` og `window.__TILE_REPROJECTION_LOCKED` non-writable. Filene `KartverketAdaptive.js` og `KartverketReprojection.js` ligger urørt på disk men er IKKE KALT fra render-løypa.

**Hengelåsen skal IKKE åpnes uten Jones direkte godkjenning. Hverken Grok, ChatGPT eller Perplexity kan endre dette.**

## Filer i denne mappen

- `OVERFORING-TIL-CHATGPT-OG-GROK.md` — full kontekstoverføring til de andre AI-systemene
- `enok-engine-v2-poc-v6/` — selve POC-koden (uendret etter hengelås-implementering)
- `v6-etter-hengelaas.png` — skjermbilde av v6 i dag (tom 3D-scene med AE-grid + ringer)
- `melding-chatgpt-tilereprojeksjon-forkastet.md` — varsel som ble sendt til ChatGPT
- `melding-grok-tilereprojeksjon-forkastet.md` — varsel som ble sendt til Grok

## Hva som ikke finnes

v6 har INGEN fungerende Leaflet-erstatning. Det ble aldri skrevet. v6 i dag viser tom 3D-scene utover AE-grid og polarpunkter. Planen om å lage Norgeskartet som flat Three.js-mesh festet med similarity-transform var på planleggingsstadiet da kontekst-vinduet ble komprimert.

Se OVERFORING-TIL-CHATGPT-OG-GROK.md for full status og åpne spørsmål.
