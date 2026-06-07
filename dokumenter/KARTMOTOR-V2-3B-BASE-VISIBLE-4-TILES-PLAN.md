# Kartmotor V2 3B: base-visible 4 tile plan

Status: plan/review only.

Denne planen definerer neste kontrollerte steg etter godkjent 3A og 3A-fix.
3B skal ikke innfore bred loading. 3B skal bare utvide den dokumenterte 3A-testen fra en base-visible tile til inntil fire base-visible tiles i center-out rekkefolge.

## Status for 3A

- 3A single-base-tile er godkjent.
- 3A-fix er godkjent.
- `threeAExplicitlyOpened=false` som default.
- Vanlig V2-toggle starter ikke loader.
- Loading krever eksplisitt testgate.
- Uten gate: `actualLoaded=0`, `tileCount=0`, clean-motor er `block`.
- Med gate: `actualLoaded=1`, `actualAppended=1`, `actualFailed=0`.
- Forste lastede tile var `kartverket:sjokartraster`, `7/68/30`.

## 3B skal ikke gjore

- Ikke laste overlay.
- Ikke laste Se Eiendom / Matrikkel.
- Ikke laste `keep` tiles.
- Ikke laste mer enn fire tiles.
- Ikke apne generell loader.
- Ikke innfore prune.
- Ikke innfore retiring.
- Ikke innfore cache, IndexedDB, local proxy eller offline tile-server.
- Ikke skjule, slette eller endre clean-motor.
- Ikke bruke `replaceChildren` i V2-runtime loading.
- Ikke ror anker, GE-grid, solsirklene, `aeProject`, transform, skala, rotasjon, tile-posisjon eller kartproporsjoner.

## 3B-mal

3B skal prove at V2 kan laste flere synlige base-tiles uten a miste kontrollen fra 3A.

Forste 3B-runtime skal begrenses slik:

- Kun `base:visible`.
- Maks fire tiles totalt.
- Center-out rekkefolge fra 2D priority queue.
- Kun descriptors med `validTile=true`.
- Kun URL-kandidater med `validUrl=true`.
- Ingen overlay.
- Ingen Se Eiendom / Matrikkel.
- Ingen `base:keep`.
- Ingen `overlay:visible`.
- Ingen `overlay:keep`.
- Append kun etter `img.onload`.
- Append kun til V2-pane.
- Clean-motor skal fortsatt vaere synlig backup.

## Gate

3B ma ha egen eksplisitt testgate og ma ikke gjenbruke 3A-navn som om loaderen var generell.

Foreslatt status/navn:

- `threeBExplicitlyOpened=false` som default.
- `loaderMode=3b-base-visible-only`.
- `loaderGateState=open-3b-base-visible-only` nar testen er eksplisitt apnet.
- URL-testparameter: `kartmotorV2ThreeBTest=1`.
- Testfunksjoner:
  - `window.__openKartmotorV2ThreeBTestGate()`
  - `window.__closeKartmotorV2ThreeBTestGate()`

Vanlig V2-toggle skal ikke starte 3B-loading alene.

## Kandidatvalg

3B skal velge kandidater fra eksisterende V2 URL-kandidater / priority queue.

Kandidatfilter:

- `candidate.role === 'base'`.
- `candidate.band === 'visible'`.
- `candidate.validTile === true`.
- `candidate.validUrl === true`.
- `candidate.futureLoaderEligible === true`.
- `candidate.sourceKind !== 'se-eiendom'`.
- `candidate.sourceId` matcher ikke `se-eiendom`, `matrikkel` eller `eiendom`.

Sortering:

1. `priorityGroup`.
2. `sourceOrder`.
3. `distanceToCenter`.
4. `y`.
5. `x`.
6. `key`.

Maks antall kandidater:

- `threeBMaxTiles=4`.
- `maxConcurrent` bor starte med `1`.
- Hvis review godkjenner det senere, kan `maxConcurrent=2` vurderes.
- Ikke start med `maxConcurrent=4`; fire tiles totalt er nok for 3B.

## Runtime-regler

- Sett pending for hver tile for `img.src`.
- Sett `img.onload` og `img.onerror` for `img.src`.
- Append bare i `img.onload`.
- Hver tile skal ha egen key.
- Ikke append samme key to ganger.
- Ikke append pane til clean-layer.
- Ikke endre eksisterende clean-layer.
- Ikke clear V2-pane under aktiv loading, bortsett fra ved eksplisitt gate close / V2 toggle off.
- `img.onerror` oppdaterer failed status og lar clean-motor sta urort.

## Harde stoppkriterier for 3B-kode

3B-kode skal stoppe hvis ett eneste av disse kriteriene ikke kan handheves:

- Stopp hvis `cleanDisplay` ikke er `block`.
- Stopp hvis V2 `pointer-events` ikke er `none`.
- Stopp hvis 3B testgate ikke er eksplisitt apnet.
- Stopp hvis kandidatlisten er tom.
- Stopp hvis noen kandidat ikke er `base:visible`.
- Stopp hvis noen kandidat har `validTile !== true`.
- Stopp hvis noen kandidat har `validUrl !== true`.
- Stopp hvis noen kandidat er Se Eiendom / Matrikkel / eiendom.
- Stopp hvis kandidat-antall overstiger 4.
- Stopp hvis `maxConcurrent > 1` i forste 3B-test.
- Stopp hvis V2 prover a append for `img.onload`.
- Stopp hvis append-target ikke er V2-pane.
- Stopp hvis V2 prover a skrive til clean-motor.

## Statusfelt for 3B

Legg til status som beviser kontrollert oppforsel:

- `loaderMode`.
- `threeBTestGateOpen`.
- `threeBRequested`.
- `threeBPending`.
- `threeBLoaded`.
- `threeBFailed`.
- `threeBAppended`.
- `threeBRejectedByGate`.
- `threeBRejectedOverlay`.
- `threeBRejectedNonVisible`.
- `threeBRejectedInvalid`.
- `threeBFirstSourceId`.
- `threeBLoadedZXY`.
- `threeBLastError`.

Eksisterende 3A-status skal ikke fjernes. 3B kan bygge videre, men 3A skal fortsatt vaere lesbar som forste baseline.

## Verifikasjon

Browser-test for 3B skal ha to deler:

1. Uten 3B-testgate:
   - V2-toggle pa.
   - `threeBLoaded=0`.
   - `tileCount` for 3B er 0.
   - clean-motor er `block`.

2. Med `kartmotorV2ThreeBTest=1`:
   - Maks fire base-visible tiles lastes.
   - `threeBLoaded <= 4`.
   - `threeBAppended === threeBLoaded`.
   - `threeBFailed === 0` for godkjent smoke-test.
   - Alle loaded tiles er base.
   - Ingen loaded tiles er Se Eiendom / Matrikkel.
   - clean-motor er fortsatt `block`.
   - V2 `pointer-events` er fortsatt `none`.

Kodekontroll:

- `git diff --check`.
- `node --check app.js` med vanlig Node:
  - `$env:PATH = 'C:\Program Files\nodejs;' + $env:PATH`
  - `node --check app.js`
- Side-effect scan skal bare vise forventede 3B-operasjoner i V2-blokken.

## Rollback

- V2 toggle av skal kunne stoppe/clear V2 runtime.
- 3B close gate skal clear V2 runtime tiles og registries.
- Clean-motor skal fortsatt sta synlig og urort.
- Ingen geometri-rollback skal vaere nodvendig.

## Review-sporsmal

1. Er maks fire tiles riktig for 3B?
2. Skal `maxConcurrent` vaere 1 i forste 3B-test, eller 2?
3. Skal 3B bruke samme basekilde som 3A (`kartverket:sjokartraster`)?
4. Skal 3B kun velge `base:visible`, eller ogsa tillate `base:keep` senere i en egen 3C?
5. Mangler noen stoppkriterier for a sikre at clean-motor fortsatt er komplett backup?

## Forelopig anbefaling

3B bor implementeres som maks fire `base:visible` tiles, `maxConcurrent=1`, center-out rekkefolge, egen eksplisitt 3B-testgate, og ingen overlay eller Se Eiendom. Hvis dette er stabilt, kan neste planfase bli enten:

- 3C: base-visible flere tiles / maxConcurrent 2.
- 3D: base keep-buffer.
- 3E: Se Eiendom overlay, fortsatt etter base.
