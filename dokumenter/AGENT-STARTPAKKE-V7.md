# Agent-startpakke v7

Prosjekt: Enok 72 / Instrumentet / kartmotor.

Forelopig tilgang: kun lese. Ingen kode, ingen branch, ingen push.

## Les forst

Les disse filene for oppstart:

- `NORGESKART-ARBEIDSREGEL.md`
- `app.js`
- `index.html`
- `dokumenter/PROSJEKTPLAN-TEAM-OG-LOD-ATLAS.md`
- `dokumenter/atlas/HOVEDREGEL-CODEX-INSTRUMENT.md`
- `dokumenter/atlas/SJOKART-GRID-OG-HOYDEOVERGANGER-PLAN.md`
- `dokumenter/atlas/MARINE-2KM-NORDIC-POC-PLAN.md`
- `dokumenter/atlas/MARINE-2KM-TILE-INVENTAR-PLAN.md`
- `dokumenter/atlas/MARINE-2KM-BROWSER-CAPTURE-PLAN.md`

Hvis en fil mangler, rapporter bare hvilken fil som mangler. Ikke gjett.

## Status

Vi har hatt en fungerende POC for kartmotor med sjokart/Norge/Island/Sverige/Danmark/Gronland-spor. Motor og kartflater skal stabiliseres forst.

Firkantnett, 1:5000, NIB/toporaster og malband er satt pa vent til motor/kart er stabile igjen.

## Laste regler

Ingen agent far endre eller foresla endring i:

- ankerpunkter
- GE-grid
- solsirklene
- `aeProject`
- kartflatenes transform
- skala
- rotasjon
- tile-posisjon
- kartproporsjoner
- intern geometri i godkjente kartflater

Hvis en ide krever a flytte, strekke, rotere eller redefinere kartflaten, stopp og spor.

## Arbeidsform

- Plan forst.
- Ingen kode for Jone og Codex Koordinator godkjenner.
- Ingen branch for godkjenning.
- Ingen push for godkjenning.
- Ingen fabrikkert SHA.
- Norsk i utviklingsfasen.
- Svar kort og presist.

## Arkitekturretning

Vi vurderer a dele systemet i delmotorer:

1. Core / Koordinator: eier sann geometri og laste regler.
2. Kartmotor: kartflater, tiles, LOD, cache, freeze, parent fallback, offline kartpakker.
3. Grid/GPS-motor: firkantnett, malband, koordinatvisning, kartbladnivaer.
4. Layer 2 / Himmel-motor: sol, mane, Enoch gates, tid.
5. Rendering/Gaming-motor: visuell ytelse, WebGL/WebGPU, LOD, texture streaming, blending.
6. Diagnostikk/Review: tester, status, avvik, residualer.

Prinsipp: Bare Core eier sannhet. Delmotorer far lese sann geometri, men ikke skrive til den.

## Forste svar

Etter lesing skal du svare med:

- hvilke filer du fant
- hvilke filer du ikke fant
- hvilken branch du leste
- siste commit-SHA
- bekreftelse pa at du ikke vil kode, branche eller pushe uten godkjenning

