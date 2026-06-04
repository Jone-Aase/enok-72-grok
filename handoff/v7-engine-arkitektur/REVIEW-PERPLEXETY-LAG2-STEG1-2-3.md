# Review av Perplexety Lag 2 — Steg 1, 2 og 3

Til: Jone
Fra: systemutvikler
Dato: 2026-06-04
Status: Innholdsmessig godkjent, betinget av to forhold før merge

## Hva som er levert

Tre commits på tre branches, alle ut fra codex/v7-next-dev-source @ dc95a08, alle rører kun app.js.

| Steg | Branch | SHA | Mot forrige | Default |
| - | - | - | - | - |
| 1 | perplexety/v7-lag2-cache-prefetch-patch-steg1 | d1ea88dc1c50059f79acb40f4c2c116030c3bdc1 | +417 / -0 mot dc95a08 | cache='shadow' |
| 2 | perplexety/v7-lag2-cache-prefetch-patch-steg2 | 7964cf40a543cb0f1319bae475152947897f9ec4 | +341 / -6 mot steg 1 | cache='on' |
| 3 | perplexety/v7-lag2-cache-prefetch-patch-steg3 | 90d94451bb5fb16805c4f755a6e4b2819c44f092 | +320 / -1 mot steg 2 | prefetch='on' |

## Verifisert av systemutvikler

- Kun app.js rørt på alle tre commits (git diff-tree --name-only bekreftet)
- Steg 1: 0 linjer fjernet, ren shadow-modus. Pikselidentisk garantert.
- Steg 2 og 3: alle Lag 2-greiner gated på lag2State.enabled && mode === 'on'
- Hard kill-switch ?lag2=off overstyrer alt og returnerer til V0/dc95a08-atferd
- Lag 1-symboler urørt: anker, aeProject, transform, solveCleanSimilarity, withNorgeNorthShift, NORGE_SURFACE_META, NORGE_SURFACE_CONTROL_POINTS, solsirkler, GE-grid, skala, rotasjon, tile-posisjon
- F-rekkefølgen fulgt: shadow → cache on → prefetch on, én commit per steg, egne branches
- Bakoverkompatibel signatur for queueNorgeCleanTile (meta default null)
- CORS-attributt settes kun når Lag 2 er aktivt på — Lag 1 alene er beskyttet
- Prefetch er ren bakgrunns-pipeline (fetch → blob → IDB), ingen DOM-mutasjon
- Tre påfølgende prefetch-feil slår av prefetch for resten av sesjonen (universell fallback, V2 §E.4)

## To forhold som må adresseres

### Forhold 1: CORS-verifikasjon før Steg 2 merges

V2-planen §A.2 spesifiserer at CORS-headere fra Kartverket, Iceland og OSM må verifiseres manuelt i DevTools Network før Steg 2 merges til codex/v7-next-dev-source. NIB er allerede ekskludert i koden. Hvis en kilde mangler Access-Control-Allow-Origin, vil bilder fra den kilden ikke laste når Lag 2 er på — men ?lag2=off vil fortsatt fungere.

Dette er en betingelse Perplexety selv flagget i commit-meldingen og i sin leveranserapport. Det er ikke en feil i patchen, men en avhengighet til ekstern verifikasjon.

### Forhold 2: Delt flagg-mekanisme for Lag 3-koordinering

Tilleggsavtalen om window.__enok72__.lag2Exporting (boolean, settes rundt canvas-eksport med try/finally) ble sendt til Perplexety etter at hun hadde pushet alle tre commits. Flagget er ikke implementert i noen av de tre branches.

Dette er ikke kritisk for Lag 2 alene — alle tre steg fungerer uten det. Men det må være på plass før Lag 3 (Grok, Three.js snapshot-bro) kobles inn, ellers risikerer vi at html2canvas i Lag 3 og canvas-eksport i Lag 2 kjører på samme rAF-frame.

Foreslått løsning: et lite Steg 2b-commit på branch perplexety/v7-lag2-cache-prefetch-patch-steg2b ut fra steg2, som initialiserer window.__enok72__ og setter/rydder flagget rundt canvas-eksporten med try/finally.

## Innstilling til Jone

Alle tre steg er klare for merge til codex/v7-next-dev-source i F-rekkefølge, betinget av:

1. CORS-verifikasjon for Kartverket, Iceland og OSM i DevTools Network før Steg 2 merges
2. Steg 2b-commit med det delte flagget før Lag 3 kobles inn (kan komme parallelt med Steg 2-merge)

Anbefalt merge-rekkefølge:
- Steg 1 (shadow) kan merges nå uten betingelser
- Steg 2 (cache on) merges etter CORS-verifikasjon
- Steg 2b (flagg) merges parallelt med eller rett etter Steg 2
- Steg 3 (prefetch on) merges etter Steg 2

Måle-modus er pikselidentisk i alle tilstander, garantert av at Lag 1-symboler er urørt og at hard kill-switch eksisterer.
