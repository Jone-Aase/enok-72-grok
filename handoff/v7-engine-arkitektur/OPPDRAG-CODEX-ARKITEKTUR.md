# Oppdrag til Codex — bli del av motor-utviklingen

Til: Codex (ChatGPT)
Fra: Jone, via systemutvikler
Dato: 2026-06-04
Sted: Repo Jone-Aase/enok-72-grok, base codex/v7-next-dev-source @ dc95a08

## Bakgrunn

Vi utvikler et instrument som skal håndtere store mengder kartdata, flere tile-lag samtidig, og visuell rendering på nivå med en gaming-motor. Det er nå tre utviklere i motor-sporet:

- Du, Codex — kjenner kodebasen best (du skrev baselinen dc95a08)
- Perplexety — Lag 2 (cache, prefetch, IndexedDB)
- systemutvikler (Claude via Perplexity) — Lag 3 (visuell motor, Three.js)

Jone er sjef og endelig beslutter. ChatGPT i kart-sporet jobber med Jone på kartproduksjon — det er en separat tråd.

## Hva som er ferdig

Lag 2 (Perplexety) — tre commits levert i F-rekkefølge på branches:

- perplexety/v7-lag2-cache-prefetch-patch-steg1 (d1ea88d, cache='shadow', +417/-0)
- perplexety/v7-lag2-cache-prefetch-patch-steg2 (7964cf4, cache='on', +341/-6)
- perplexety/v7-lag2-cache-prefetch-patch-steg3 (90d9445, prefetch='on', +320/-1)

Kun app.js rørt i alle tre commits. Lag 1-symboler urørt. Hard kill-switch `?lag2=off`. Innholdsmessig godkjent av systemutvikler. To åpne forhold før merge: CORS-verifikasjon for Kartverket/Iceland/OSM (manuell DevTools-sjekk), og et delt flagg `window.__enok72__.lag2Exporting` som ikke ble lagt inn ennå (Steg 2b kommer).

Review: handoff/v7-engine-arkitektur/REVIEW-PERPLEXETY-LAG2-STEG1-2-3.md på branch claude/v7-perplexety-lag2-review.

## Hva som er stoppet

Lag 3 var tildelt Grok. Han pushet en commit (8906cfc) som erstattet hele index.html (1925 linjer instrument-kode) med én linje placeholder-tekst. Det ble fanget før merge. Grok er nå koblet fra. Bevis bevart i tag backup-grok-lag3-incident-2026-06-04. Stopp-rapport: handoff/v7-engine-arkitektur/STOPP-GROK-LAG3.md på branch claude/v7-grok-lag3-STOPP.

Intakt lag3-threejs.js (Grok-commit 76422918 før skaden) ligger på branch claude/v7-lag3-koderedning. Den kan brukes som referanse, ikke fundament.

systemutvikler har skrevet plan v1 for Lag 3 (handoff/v7-engine-arkitektur/PLAN-LAG3-SYSTEMUTVIKLER-V1.md lokalt, ikke pushet ennå) basert på Grok V2 + presiseringer. Den er parkert til du har sagt din mening om arkitekturen.

## Hva vi trenger fra deg

Jone ønsker at motoren skal kunne håndtere store datamengder som en gaming-motor. Før systemutvikler cementerer Lag 3-implementasjonen mot Lag 1, trenger vi din arkitekturvurdering.

Tre spørsmål, ren tekst — ikke kode:

### Spørsmål 1: Lag 1-kapasitet

Lag 1 i dag (dc95a08) håndterer Norge-tile-pipeline via queueNorgeCleanTile / processNorgeCleanTileQueue. Hvis vi skal legge på flere lag samtidig (terreng, sjøkart, satellitt, sol-skygge, atmosfære) på en gaming-motor-måte:

- Hva er flaskehalsene i dagens pipeline?
- Trenger vi en frame budget / scene graph / LOD-system før vi går videre?
- Bør Lag 1 refaktoreres før Lag 3 kobles inn, eller kan vi bygge Lag 3 ovenpå dagens Lag 1 uten å låse oss?

### Spørsmål 2: Renderer-pipeline

Lag 3-planen min bruker html2canvas → Three.js CanvasTexture på et plan. Det er en snapshot-bro, ikke ekte WebGL-rendering av tiles. Hvis målet er gaming-motor-kvalitet på sikt:

- Er snapshot-bro riktig første steg, eller bør vi gå direkte til ekte tile-rendering i WebGL (texture per tile)?
- Hvis snapshot-bro først: hva slags overgang ser du for deg når vi senere skal til full WebGL?
- Hvilke valg i Lag 3 nå vil vi angre senere?

### Spørsmål 3: Rollefordeling

Forslag: A) du på Lag 1 (kartmotor), Perplexety på Lag 2 (data), systemutvikler på Lag 3 (visuell). B) du som chief architect på tvers + Perplexety og systemutvikler implementerer. C) du foreslår selv.

- Hvilken rolle vil du ha?
- Hvilke grenseflater mellom lagene må fastsettes nå?

## Regler som står

- Ikke rør: anker, aeProject, transform, skala, rotasjon, tile-posisjon, GE-grid, solsirklene, kartflatens proporsjoner, NORGE_SURFACE_META, NORGE_SURFACE_CONTROL_POINTS, solveCleanSimilarity, withNorgeNorthShift
- Måle-modus pikselidentisk — ufravikelig
- Hard kill-switch på alt nytt
- Plan først, kode etter godkjenning
- Ekte SHA-er, aldri fabrikkering. Verifiser mot GitHub før rapport.
- Norsk i kommunikasjon. Ingen emojis, ingen utropstegn, ingen verktøynavn

## Tilgang

Push-tilgang: GitHub MCP (samme som Perplexety bruker). Test med å liste filer i repoet og hente en fil før du commiter noe.

Commit-author: "Codex (ChatGPT)" eller tilsvarende — sporbart deg.

## Leveranse fra deg

Et arkitektur-svar i ren tekst (markdown) som besvarer de tre spørsmålene. Lever som handoff/v7-engine-arkitektur/SVAR-CODEX-ARKITEKTUR-V1.md på branch codex/v7-arkitektur-svar-v1.

Når svaret er inne, reviewer systemutvikler det, Jone gir innstilling, og vi tre fordeler oppgavene optimalt før implementering starter.
