# Kartmotor V2 3C: base-visible 16 tile plan

Status: plan/review only.

Denne planen definerer neste kontrollerte steg etter godkjent 3B og 3B core-fix.
3C skal ikke innfore overlay, Se Eiendom, keep-buffer, prune, retiring eller cache.
3C skal bare utvide base-visible loading fra fire tiles til inntil seksten tiles.

## Status for 3B

- 3B base-visible 4 tile loader er godkjent.
- 3B core-fix er godkjent.
- 3B har egen eksplisitt gate.
- Vanlig V2-toggle starter ikke 3B-loading.
- 3B laster maks fire `base:visible` tiles.
- 3B bruker `maxConcurrent=1`.
- 3B appender kun etter `img.onload`.
- 3B onload/onerror stopper hvis gate lukkes eller `pendingRegistry.has(key)` ikke lenger stemmer.
- Uten gate: `threeBLoaded=0`, `tileCount=0`, clean-motor er `block`.
- Med gate: `threeBLoaded=4`, `threeBAppended=4`, `threeBFailed=0`.
- Lastet kilde var `kartverket:sjokartraster`.

## 3C skal ikke gjore

- Ikke laste overlay.
- Ikke laste Se Eiendom / Matrikkel.
- Ikke laste `base:keep`.
- Ikke laste `overlay:visible`.
- Ikke laste `overlay:keep`.
- Ikke laste mer enn seksten tiles.
- Ikke apne generell loader.
- Ikke innfore prune.
- Ikke innfore retiring.
- Ikke innfore cache, IndexedDB, local proxy eller offline tile-server.
- Ikke skjule, slette eller endre clean-motor.
- Ikke bruke `replaceChildren` i V2-runtime loading.
- Ikke ror anker, GE-grid, solsirklene, `aeProject`, transform, skala, rotasjon, tile-posisjon eller kartproporsjoner.

## 3C-mal

3C skal prove at V2 kan laste et litt storre synlig basekart-utsnitt uten a miste kontrollen som ble bevist i 3A og 3B.

Forste 3C-runtime skal begrenses slik:

- Kun `base:visible`.
- Maks seksten tiles totalt.
- Center-out rekkefolge fra 2D priority queue.
- Kun descriptors med `validTile=true`.
- Kun URL-kandidater med `validUrl=true`.
- Ingen overlay.
- Ingen Se Eiendom / Matrikkel.
- Ingen keep-buffer loading.
- Append kun etter `img.onload`.
- Append kun til V2-pane.
- Clean-motor skal fortsatt vaere synlig backup.

## Gate

3C ma ha egen eksplisitt testgate og ma ikke gjenbruke 3A- eller 3B-navn som om loaderen var generell.

Foreslatt status/navn:

- `threeCExplicitlyOpened=false` som default.
- `threeCMaxTiles=16`.
- `threeCMaxConcurrent=1` for forste test.
- `loaderMode=3c-base-visible-only`.
- `loaderGateState=open-3c-base-visible-only` nar testen er eksplisitt apnet.
- URL-testparameter: `kartmotorV2ThreeCTest=1`.
- Testfunksjoner:
  - `window.__openKartmotorV2ThreeCTestGate()`
  - `window.__closeKartmotorV2ThreeCTestGate()`

Vanlig V2-toggle skal ikke starte 3C-loading alene.

## Kandidatvalg

3C skal velge kandidater fra eksisterende V2 URL-kandidater / priority queue.

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

- `threeCMaxTiles=16`.
- `maxConcurrent` bor starte med `1`.
- Hvis review og smoke-test godkjenner det senere, kan `maxConcurrent=2` vurderes i en egen 3C-fix eller 3C.1.
- Ikke start med `maxConcurrent=8`; det blander volumtest og concurrencytest.

## Runtime-regler

- Sett pending for hver tile for `img.src`.
- Sett `img.onload` og `img.onerror` for `img.src`.
- Append bare i `img.onload`.
- Hver tile skal ha egen key.
- Ikke append samme key to ganger.
- Ikke append pane til clean-layer.
- Ikke endre eksisterende clean-layer.
- Ikke clear V2-pane under aktiv loading, bortsett fra ved eksplisitt gate close / V2 toggle off.
- `img.onload` skal stoppe hvis 3C-gate er lukket.
- `img.onload` skal stoppe hvis `pendingRegistry.has(key)` ikke lenger stemmer.
- `img.onerror` skal ha samme cancel-guard som `img.onload`.
- `img.onerror` oppdaterer failed status bare hvis tile fortsatt er pending og gate er apen.
- Clean-motor skal sta urort ved alle feil.

## Harde stoppkriterier for 3C-kode

3C-kode skal stoppe hvis ett eneste av disse kriteriene ikke kan handheves:

- Stopp hvis `cleanDisplay` ikke er `block`.
- Stopp hvis V2 `pointer-events` ikke er `none`.
- Stopp hvis 3C testgate ikke er eksplisitt apnet.
- Stopp hvis 3A- eller 3B-gate ogsa er apen.
- Stopp hvis kandidatlisten er tom.
- Stopp hvis noen kandidat ikke er `base:visible`.
- Stopp hvis noen kandidat har `validTile !== true`.
- Stopp hvis noen kandidat har `validUrl !== true`.
- Stopp hvis noen kandidat er Se Eiendom / Matrikkel / eiendom.
- Stopp hvis kandidat-antall overstiger 16.
- Stopp hvis `maxConcurrent > 1` i forste 3C-test.
- Stopp hvis `actualLoaded > 16`.
- Stopp hvis `actualAppended > 16`.
- Stopp hvis `pendingRegistry.size > 16`.
- Stopp hvis V2 prover a append for `img.onload`.
- Stopp hvis append-target ikke er V2-pane.
- Stopp hvis V2 prover a skrive til clean-motor.

## Statusfelt for 3C

Legg til status som beviser kontrollert oppforsel:

- `loaderMode`.
- `threeCTestGateOpen`.
- `threeCRequested`.
- `threeCPending`.
- `threeCLoaded`.
- `threeCFailed`.
- `threeCAppended`.
- `threeCRejectedByGate`.
- `threeCRejectedOverlay`.
- `threeCRejectedNonVisible`.
- `threeCRejectedInvalid`.
- `threeCFirstSourceId`.
- `threeCLoadedZXY`.
- `threeCLastError`.

Eksisterende 3A- og 3B-status skal ikke fjernes. 3C kan bygge videre, men tidligere baselines skal fortsatt vaere lesbare.

## Verifikasjon

Browser-test for 3C skal ha to deler:

1. Uten 3C-testgate:
   - V2-toggle pa.
   - `threeCLoaded=0`.
   - `tileCount` for 3C er 0.
   - clean-motor er `block`.

2. Med `kartmotorV2ThreeCTest=1`:
   - Maks seksten base-visible tiles lastes.
   - `threeCLoaded <= 16`.
   - `threeCAppended === threeCLoaded`.
   - `threeCFailed === 0` for godkjent smoke-test.
   - Alle loaded tiles er base.
   - Ingen loaded tiles er Se Eiendom / Matrikkel.
   - Ingen loaded tiles er `keep`.
   - clean-motor er fortsatt `block`.
   - V2 `pointer-events` er fortsatt `none`.

Kodekontroll:

- `git diff --check`.
- `node --check app.js` med vanlig Node:
  - `$env:PATH = 'C:\Program Files\nodejs;' + $env:PATH`
  - `node --check app.js`
- Side-effect scan skal bare vise forventede 3C-operasjoner i V2-blokken.

## Rollback

- V2 toggle av skal kunne stoppe/clear V2 runtime.
- 3C close gate skal clear V2 runtime tiles og registries.
- Late `img.onload` / `img.onerror` etter close gate skal ikke append'e eller telle som loaded/failed.
- Clean-motor skal fortsatt sta synlig og urort.
- Ingen geometri-rollback skal vaere nodvendig.

## Review-sporsmal

1. Er maks seksten tiles riktig for 3C?
2. Skal `maxConcurrent` vaere 1 i forste 3C-test, eller kan 2 vurderes etter smoke?
3. Skal 3C bruke samme basekilde som 3A/3B (`kartverket:sjokartraster`)?
4. Skal 3C fortsatt bare velge `base:visible`, og vente med `base:keep` til 3D?
5. Mangler noen stoppkriterier for a sikre at clean-motor fortsatt er komplett backup?

## Forelopig anbefaling

3C bor implementeres som maks seksten `base:visible` tiles, `maxConcurrent=1`, center-out rekkefolge, egen eksplisitt 3C-testgate, og ingen overlay eller Se Eiendom. Hvis dette er stabilt, kan neste planfase bli:

- 3D: base keep-buffer.
- 3E: parent/old LOD fallback.
- 4A: Se Eiendom overlay, fortsatt etter base.
