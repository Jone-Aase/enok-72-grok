# Oppdrag til Gemini: Lag 2 — persistent cache og prefetch (kun plan)

Status: oppdrag fra Claude (systemutvikler) til Gemini. Leveranse: én markdown-fil med plan. Ingen kode i denne runden.

Base for analyse: codex/v7-next-dev-source @ dc95a08.

## Hva du skal gjøre

Lese den eksisterende tile-håndteringen i app.js (funksjonene rundt `norgeCleanTileManager`, `cleanDetailTileUrl`, `detailTileUrl`, `queueNorgeCleanTile`, `processNorgeCleanTileQueue`) og foreslå hvordan vi kan legge til to ting uten å røre Lag 1:

1. Persistent cache av tiles i nettleseren (IndexedDB) — slik at samme tile ikke lastes ned på nytt etter reload, og slik at brukeren kan jobbe offline med tiles som er sett før.

2. Prefetch — last tiles som ligger litt utenfor synlig område, slik at pan og zoom føles jevnt. Må respektere prioritet og må aldri kjøre om mot live-tile-køen.

## Hva du skal levere

Én markdown-fil pushet til handoff/v7-engine-arkitektur/RESPONS-GEMINI-LAG2-CACHE-PREFETCH.md i en ny branch ved navn `gemini/v7-lag2-cache-prefetch-plan` ut fra codex/v7-next-dev-source.

Innhold:

- Hva IndexedDB-skjemaet skal være (database-navn, store-navn, key-format, verdi-format, indekser).
- Hvor cache-laget skal kobles inn i eksisterende tile-pipeline (hvilke funksjoner, hvilke linjer omtrentlig).
- Hvordan vi rydder gamle tiles (LRU, alder, kvote).
- Forslag til prefetch-strategi: hvor mange tiles utenfor synlig område, prioritet i forhold til live-kø, når prefetch pauses (for eksempel under aktiv pan).
- Risiko og bivirkninger.
- Hva som ikke endres.

## Hva som er forbudt

- Ikke skrive kode. Bare plan i markdown.
- Ikke endre Lag 1 (anker, aeProject, transform, GE-grid, solsirkler).
- Ikke endre tile-URL-mønstre eller kilder.
- Ikke endre eksisterende tile-loading-logikk (Lag 1 backoff og Lag 3 retire-then-append må stå urørt).
- Ikke foreslå reprojeksjon, ikke foreslå tile-rotasjon, ikke foreslå webgl-kompresjon.
- Ikke foreslå tredjeparts-bibliotek uten å vise hvordan det kan slås av.

## Akseptkriterier for planen

- Tydelig svar på alle punkter over.
- Konkrete hvor-i-koden-referanser (filnavn og omtrentlig linjenummer eller funksjonsnavn).
- Klar liste over hvilke filer som vil bli endret, og hvilke som ikke vil bli rørt.
- Eget avsnitt om hvordan cache og prefetch kan slås helt av (debug-flag i localStorage).

## Når planen er levert

Claude leser den, gir kommentarer eller godkjenner. Jone er endelig beslutter for sammenslåing. Ingen patch før plan er godkjent.
