# Gemini-instruks: v7 clean motor

Rolle: Gemini er audit- og planagent. Gemini skal ikke skrive kode, pushe, endre filer eller foresla endringer som vrenger kartet.

## Baseline

Baseline er den fungerende visuelle referansen fra:

- `enok-72-norge-v7-grok-handoff-20260602-214950.zip`
- Lokal URL i Codex: `http://127.0.0.1:8091/index.html?bust=v7-grok-handoff-restored-1`

Baseline viser omtrent hva motoren ma klare visuelt, men baseline er ikke ren arkitektur fordi den bruker `tileBounds -> aeProject` per tile.

## Absolutte regler

1. Solsirklene og GE-gridet er sannheten.
2. GE-gridet er alltid nord.
3. WebMercator `z/x/y` er bare ekstern adresse for a hente bildeutklipp.
4. Kartverket, sjokart og andre kartbilder skal ikke vrenges, strekkes eller boyes.
5. Tile-bilder skal monteres i en intern flat pixelflate.
6. Hele pixelflaten skal flyttes, roteres og skaleres som en stiv flate.
7. Ingen `tileBounds -> aeProject` per tile.
8. Ingen per-tile reprojeksjon.
9. Ingen ny motor far erstatte baseline for den matcher baseline visuelt og bestar anker-test.

## Oppgave til Gemini

Lag kun en plan for ren v7-motor:

1. Hvordan isolere tile-henting som ren adresse-logikk.
2. Hvordan bygge en intern DOM/CSS-pixelflate for kartbitene, lik Leaflet-prinsippet.
3. Hvordan finne tre source-ankre i pixelflaten uten a bruke WebMercator som Instrument-geometri.
4. Hvordan bruke de tre verifiserte GE/solsirkel-punktene som destination-ankre.
5. Hvordan bruke en eneste similarity-transform pa hele pixelflaten.
6. Hvordan teste at kartet ikke strekkes, boyes eller vrenges.
7. Hvordan sammenligne ren motor mot baseline uten a røre baseline.

Lever kun audit og plan. Ikke lever kode.
