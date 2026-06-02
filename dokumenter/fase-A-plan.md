# Fase A — plan

Status: levende dokument. Oppdateres ved hver milepæl.
Eier: Jone Aase. Koordinator: Perplexity. Utførende: Grok + ChatGPT.
Opprettet: 2026-06-02. Sist endret: 2026-06-02.

## Mål for Fase A

Få Norgeskart inn i hovedinstrumentet som ett sant kartlag, plassert via 3-anker-similarity, uten Mercator-strekking og uten å bryte Regel 1.

Fase B (alle Norgeskart-funksjoner, måling, lag-velger, m.m.) og Fase C (Island + sjøkart-utvidelse) kommer etter at Fase A er godkjent.

## Tre uavhengige byggesteiner

A1. `norge-original.html` — ren Leaflet referanse med 3 ankerpunkter, ingen bynavn. Live på enok-72-grok.vercel.app/norge-original. Brukes som kontrollkilde, ikke i instrumentflaten.

A2. ChatGPT-leveranse 1, `poc-rule1/` — Three.js POC med én flat kartflate (`NorgeSingleSurface`) som plasseres med similarity-transform fra de 3 ankerne. Bruker midlertidig placeholder-bilde. Prinsippet er rent og matcher Regel 1.

A3. ChatGPT-leveranse 2, screen-tile-motor i `app.js` + `index.html` — Leaflet-lignende DOM-tile-pane (`#norge-screen-detail-layer`) som tegner ekte Kartverket z18-tiles i skjermrom oppå AE-flaten. Testet lokalt: OSM Bergen 140 synlige tiles, Kartverket topo+sjokart 275 synlige tiles, 0 brutt, ingen Leaflet i DOM.

## Arbeidsdeling

Grok: bygger sin egen plan (oppgave-1-v7-plan.md), deretter prototype på branch `grok/v7-tile-pane-prototype`. Leverer markdown og diff, Perplexity committer.

ChatGPT: har levert v7-ZIP (`/tmp/chatgpt-v7/`). Får nå hele vår nåværende versjon (norge-original.html + denne planen) for sammenligning. Skal levere sin uavhengige fase-A-plan som markdown. Perplexity committer.

Perplexity: koordinerer, committer, deployer, holder denne planen oppdatert.

Jone: gir endelig godkjenning før hver milepæl markeres `done`.

## Milepæler

A.M1 Norge-original-kontrollkilde — done 2026-06-02. Live på enok-72-grok.vercel.app/norge-original. Commit f9de4cc.

A.M2 ChatGPT leverer sin uavhengige plan — pågår. Pakke sendt: norge-original.html + fase-A-plan.md.

A.M3 Grok leverer sin uavhengige plan — pågår. Eksisterende oppgavefil: oppgaver/oppgave-1-v7-plan.md.

A.M4 Perplexity sammenligner Grok-plan mot ChatGPT-plan og legger fram beslutningsgrunnlag — pending.

A.M5 Jone velger arkitektur — pending.

A.M6 Grok bygger prototype på branch — pending.

A.M7 Anker-similarity bekreftet med residualer < 1 km på de 3 ankerne — pending.

A.M8 Norgeskart slått av/på i hovedinstrumentet, gjensidig eksklusivt med UN AE — pending.

A.M9 Jone godkjenner Fase A — pending.

## Beslutningspunkter som må avgjøres i A.M4–A.M5

D1. Pane-teknologi: DOM-tiles (ChatGPTs screen-tile motor) eller WebGL-quad (poc-rule1 stil) eller Three.js mesh per tile.

D2. Hvordan 3-anker-similarity kobles til pane-en: matrise-multiplikasjon i CSS, i shader, eller i geometri.

D3. Kamera-synkronisering: hvordan AE-kamera-zoom oversettes til tile-zoom-nivå z=5 til z=18.

D4. Tile-loading: viewport-culling, prioritering fra senter, cache-strategi.

D5. Lag-rekkefølge: hvor pane-en ligger i forhold til sol-ringer, GE-grid, polarsirkler, markører.

D6. Gjensidig eksklusivitet UN AE versus Norgeskart, og overgangs-animasjon.

## Regler som ikke kan brytes i Fase A

R1. Sant areal ukrenkelig. Ingen Mercator-matematikk endrer arealet i instrumentet.

R2. Kun similarity-transform (uniform skala, rotasjon, translasjon) — ingen ikke-uniform skala, ingen affine shear, ingen perspektiv-warp.

R3. Hovedinstrumentet er fryst inntil prototype er godkjent.

R4. Kun Perplexity merger til main. Agenter med skrivetilgang (Grok) committer til egne branches (`grok/*`); main er beskyttet.

R5. Ved tvil — spør Jone.

## Lenker

- Live norge-original: https://enok-72-grok.vercel.app/norge-original
- Hovedinstrument (fryst): https://enok-72-norge-kalibrering.vercel.app
- Tidligere live tilt: https://enok-72-norge-tilt.vercel.app
- Repo: https://github.com/Jone-Aase/enok-72-grok
- Grok oppgave: oppgaver/oppgave-1-v7-plan.md
- ChatGPT oppgave: oppgaver/oppgave-1-v7-plan-CHATGPT.md
- Regler: GROK-START-HER.md

## Endringslogg

2026-06-02 — opprettet. A.M1 done. A.M2 og A.M3 pågår.
