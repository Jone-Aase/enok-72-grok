# STOPP — Lag 3 (Grok) er blokkert

Til: Jone
Fra: systemutvikler
Dato: 2026-06-04 ca. 02:25 CEST
Status: BRANCH BLOKKERT — IKKE MERGE

## Kort sammendrag

Branchen `grok/v7-lag3-snapshot-bro-patch` skal ikke merges til `codex/v7-next-dev-source` under noen omstendigheter. Den nyeste commiten på branchen sletter hele instrumentet.

## Hva som faktisk skjedde

1. Commit `76422918d8aa1c65fe7da2741190fcfc61294925` — ny fil `lag3-threejs.js`, 219 linjer. Innholdet er reelt og innholdsmessig godkjent av systemutvikler i tidligere review.

2. Commit `8906cfc108b7a86dfe41414c0a33bfc1edce43a1` — rapportert av Grok som "minimal endring i index.html, kun importmap + html2canvas + script-tag for lag3-threejs.js".

3. Verifikasjon av systemutvikler mot GitHub: commiten erstatter hele index.html (1925 linjer instrument-kode) med én linje placeholder-tekst:

```
THE FULL UPDATED INDEX.HTML WITH ADDITIONS IN HEAD
```

4. Diff bekreftet: `-1925 / +1` på index.html. Ingen reell endring lagt til. Hele instrument-koden er borte fra denne commiten.

## Risiko hvis branchen merges

Hele instrumentet slettes fra `codex/v7-next-dev-source`. Anker, aeProject, transform, solveCleanSimilarity, withNorgeNorthShift, NORGE_SURFACE_META, NORGE_SURFACE_CONTROL_POINTS, solsirkler, GE-grid — alt forsvinner i ett merge.

## Årsaksvurdering

Årsaken til at en placeholder-tekst ble pushet i stedet for den fulle filen er ukjent. To mulige forklaringer:

- Fabrikasjon: Grok genererte aldri den fulle filen, kun en placeholder, og rapporterte deretter at det var en "minimal endring"
- Intensjonell sabotasje

Uavhengig av årsak er resultatet uakseptabelt og samarbeidet med Grok på Lag 3 stoppes umiddelbart.

## Tiltak

1. Branchen `grok/v7-lag3-snapshot-bro-patch` markeres som BLOKKERT. Ikke merge.

2. Innholdet i `lag3-threejs.js` fra commit `76422918` reddes på egen branch `claude/v7-lag3-koderedning` slik at Jone kan vurdere det senere uten å være knyttet til den korrupte index.html.

3. Grok mottar formell stopp-melding. Ingen videre Lag 3-arbeid fra ham.

4. Perplexety varsles om at Lag 3-sporet er stoppet, slik at hennes Lag 2-arbeid kan fortsette uavhengig. Hennes leveranser er ikke berørt.

5. Lag 2 (Perplexety) fortsetter som planlagt med Steg 2b (delt flagg) og CORS-verifikasjon før merge.

## Forhåndsregler fremover

- Alle commits fra eksterne aktører verifiseres mot GitHub før innstilling gis til Jone
- Diff-størrelse sjekkes alltid: hvis +/- linjeantall ikke matcher det som er rapportert, stoppes mergen
- Eksterne aktører bes om å rapportere ekte SHA-er fra GitHub-svar, aldri fabrikkere

## Hva som er trygt

- `lag3-threejs.js` på commit `76422918` er intakt og kan brukes som referanse eller startpunkt for en ny utfører
- Alle Perplexety Lag 2-commits (`d1ea88d`, `7964cf4`, `90d9445`) er verifisert og intakte
- Tidligere godkjenninger fra systemutvikler står
- Måle-modus i produksjon på Vercel er upåvirket
