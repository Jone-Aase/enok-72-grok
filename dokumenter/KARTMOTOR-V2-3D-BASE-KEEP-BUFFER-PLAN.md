# Kartmotor V2 3D: base keep-buffer plan

Status: plan/review only.

Denne planen definerer neste kontrollerte steg etter browser-verifisert 3C.
3D skal ikke innfore overlay, Se Eiendom, prune, retiring eller cache.
3D skal bare prove at V2 kan laste et lite antall `base:keep` tiles etter at `base:visible` fungerer.

## Status for 3C

- 3C er browser-verifisert.
- Commit: `248bbd2`.
- Lukket 3C-gate:
  - V2 er `dry-run`.
  - `threeCLoaded=0`.
  - `threeCAppended=0`.
  - `tileCount3C=0`.
  - clean-motor er `block`.
  - V2 `pointer-events=none`.
- Apen 3C-gate:
  - `threeCRequested=16`.
  - `threeCLoaded=16`.
  - `threeCAppended=16`.
  - `threeCFailed=0`.
  - `pending=0`.
  - `registrySize=16`.
  - kilde: `kartverket:sjokartraster`.
  - ZXY: `7/53/20` til `7/68/20`.
  - clean-motor er fortsatt `block`.

3C har dermed bevist at V2 kan laste 16 `base:visible` tiles kontrollert, center-out, uten a skade clean-motor.

## 3D skal ikke gjore

- Ikke laste overlay.
- Ikke laste Se Eiendom / Matrikkel.
- Ikke laste `overlay:visible`.
- Ikke laste `overlay:keep`.
- Ikke apne generell loader.
- Ikke innfore prune.
- Ikke innfore retiring.
- Ikke innfore cache, IndexedDB, local proxy eller offline tile-server.
- Ikke skjule, slette eller endre clean-motor.
- Ikke bruke `replaceChildren` i V2-runtime loading.
- Ikke ror anker, GE-grid, solsirklene, `aeProject`, transform, skala, rotasjon, tile-posisjon eller kartproporsjoner.

## 3D-mal

3D skal prove Leaflet-prinsippet om buffer/keep rundt viewport, men fortsatt pa lav risiko.
Poenget er ikke full kartdekning enna. Poenget er a verifisere at V2 kan skille:

- `base:visible`: aktivt synlig basekart.
- `base:keep`: base-buffer rundt synlig viewport.

Forste 3D-runtime skal begrenses slik:

- Last forst samme type `base:visible` som 3C.
- Last deretter et lite antall `base:keep` tiles.
- Maks seksten `base:visible` tiles.
- Maks atte `base:keep` tiles i forste test.
- Maks tjuefire tiles totalt.
- `maxConcurrent=1` for forste test.
- Center-out rekkefolge innen hver band.
- `base:visible` skal alltid starte for `base:keep`.
- Ingen overlay.
- Ingen Se Eiendom / Matrikkel.
- Ingen prune, retiring eller cache.
- Append kun etter `img.onload`.
- Append kun til V2-pane.
- Clean-motor skal fortsatt vaere synlig backup.

## Gate

3D ma ha egen eksplisitt testgate og ma ikke gjenbruke 3A/3B/3C-gater som om loaderen var generell.

Foreslatt status/navn:

- `threeDExplicitlyOpened=false` som default.
- `threeDMaxVisibleTiles=16`.
- `threeDMaxKeepTiles=8`.
- `threeDMaxTotalTiles=24`.
- `threeDMaxConcurrent=1`.
- `loaderMode=3d-base-visible-plus-keep`.
- `loaderGateState=open-3d-base-keep-buffer` nar testen er eksplisitt apnet.
- URL-testparameter: `kartmotorV2ThreeDTest=1`.
- Testfunksjoner:
  - `window.__openKartmotorV2ThreeDTestGate()`
  - `window.__closeKartmotorV2ThreeDTestGate()`

Vanlig V2-toggle skal ikke starte 3D-loading alene.

## Kandidatvalg

3D skal velge kandidater fra eksisterende V2 URL-kandidater / priority queue.

Synlig basefilter:

- `candidate.role === 'base'`.
- `candidate.band === 'visible'`.
- `candidate.validTile === true`.
- `candidate.validUrl === true`.
- `candidate.futureLoaderEligible === true`.
- `candidate.sourceKind !== 'se-eiendom'`.
- `candidate.sourceId` matcher ikke `se-eiendom`, `matrikkel` eller `eiendom`.

Keep-basefilter:

- `candidate.role === 'base'`.
- `candidate.band === 'keep'`.
- `candidate.validTile === true`.
- `candidate.validUrl === true`.
- `candidate.futureLoaderEligible === true`.
- `candidate.sourceKind !== 'se-eiendom'`.
- `candidate.sourceId` matcher ikke `se-eiendom`, `matrikkel` eller `eiendom`.

Sortering for begge band:

1. `priorityGroup`.
2. `sourceOrder`.
3. `distanceToCenter`.
4. `y`.
5. `x`.
6. `key`.

Viktig regel:

- `base:visible` skal fortsatt vinne over `base:keep`.
- `base:keep` skal aldri kunne forsinke eller blokkere synlig basekart.
- `base:keep` skal ikke gi `baseReady=true` alene.

## Runtime-regler

- Sett pending for hver tile for `img.src`.
- Sett `img.onload` og `img.onerror` for `img.src`.
- Append bare i `img.onload`.
- Hver tile skal ha egen key.
- Ikke append samme key to ganger.
- Ikke append pane til clean-layer.
- Ikke endre eksisterende clean-layer.
- Ikke clear V2-pane under aktiv loading, bortsett fra ved eksplisitt gate close / V2 toggle off.
- `img.onload` skal stoppe hvis 3D-gate er lukket.
- `img.onload` skal stoppe hvis `pendingRegistry.has(key)` ikke lenger stemmer.
- `img.onerror` skal ha samme cancel-guard som `img.onload`.
- `img.onerror` oppdaterer failed status bare hvis tile fortsatt er pending og gate er apen.
- Clean-motor skal sta urort ved alle feil.

## Harde stoppkriterier for 3D-kode

3D-kode skal stoppe hvis ett eneste av disse kriteriene ikke kan handheves:

- Stopp hvis `cleanDisplay` ikke er `block`.
- Stopp hvis V2 `pointer-events` ikke er `none`.
- Stopp hvis 3D testgate ikke er eksplisitt apnet.
- Stopp hvis 3A-, 3B- eller 3C-gate ogsa er apen.
- Stopp hvis kandidatlisten for `base:visible` er tom.
- Stopp hvis noen kandidat ikke er base.
- Stopp hvis noen kandidat ikke er `visible` eller `keep`.
- Stopp hvis noen kandidat har `validTile !== true`.
- Stopp hvis noen kandidat har `validUrl !== true`.
- Stopp hvis noen kandidat er Se Eiendom / Matrikkel / eiendom.
- Stopp hvis `base:visible` kandidat-antall overstiger 16.
- Stopp hvis `base:keep` kandidat-antall overstiger 8.
- Stopp hvis total kandidat-antall overstiger 24.
- Stopp hvis `maxConcurrent > 1` i forste 3D-test.
- Stopp hvis `actualLoaded > 24`.
- Stopp hvis `actualAppended > 24`.
- Stopp hvis `pendingRegistry.size > 24`.
- Stopp hvis V2 prover a append for `img.onload`.
- Stopp hvis append-target ikke er V2-pane.
- Stopp hvis V2 prover a skrive til clean-motor.

## Statusfelt for 3D

Legg til status som beviser kontrollert oppforsel:

- `loaderMode`.
- `threeDTestGateOpen`.
- `threeDVisibleRequested`.
- `threeDKeepRequested`.
- `threeDTotalRequested`.
- `threeDPending`.
- `threeDVisibleLoaded`.
- `threeDKeepLoaded`.
- `threeDLoaded`.
- `threeDFailed`.
- `threeDAppended`.
- `threeDRejectedByGate`.
- `threeDRejectedOverlay`.
- `threeDRejectedInvalid`.
- `threeDFirstSourceId`.
- `threeDLoadedZXY`.
- `threeDLoadedBands`.
- `threeDLastError`.

Eksisterende 3A-, 3B- og 3C-status skal ikke fjernes.

## Verifikasjon

Browser-test for 3D skal ha to deler:

1. Uten 3D-testgate:
   - V2-toggle pa.
   - `threeDLoaded=0`.
   - `tileCount` for 3D er 0.
   - clean-motor er `block`.

2. Med `kartmotorV2ThreeDTest=1`:
   - Maks seksten `base:visible` tiles lastes.
   - Maks atte `base:keep` tiles lastes.
   - `threeDLoaded <= 24`.
   - `threeDAppended === threeDLoaded`.
   - `threeDFailed === 0` for godkjent smoke-test.
   - Alle loaded tiles er base.
   - Loaded tiles inneholder bade `visible` og `keep` hvis keep-kandidater finnes.
   - Ingen loaded tiles er Se Eiendom / Matrikkel.
   - Ingen overlay lastes.
   - clean-motor er fortsatt `block`.
   - V2 `pointer-events` er fortsatt `none`.

Kodekontroll:

- `git diff --check`.
- `node --check app.js` med vanlig Node:
  - `$env:PATH = 'C:\Program Files\nodejs;' + $env:PATH`
  - `node --check app.js`
- Side-effect scan skal bare vise forventede 3D-operasjoner i V2-blokken.

## Rollback

- V2 toggle av skal kunne stoppe/clear V2 runtime.
- 3D close gate skal clear V2 runtime tiles og registries.
- Late `img.onload` / `img.onerror` etter close gate skal ikke append'e eller telle som loaded/failed.
- Clean-motor skal fortsatt sta synlig og urort.
- Ingen geometri-rollback skal vaere nodvendig.

## Review-sporsmal

1. Er 16 visible + 8 keep riktig for forste 3D?
2. Skal `maxConcurrent` fortsatt vaere 1?
3. Skal 3D forst laste alle `base:visible`, deretter `base:keep`?
4. Skal `base:keep` kunne appendes i egne panes med `data-band=keep`, men uten a paverke `baseReady`?
5. Mangler noen stoppkriterier for a sikre at clean-motor fortsatt er komplett backup?

## Forelopig anbefaling

3D bor implementeres som maks seksten `base:visible` tiles pluss maks atte `base:keep` tiles, `maxConcurrent=1`, egen eksplisitt 3D-testgate, og ingen overlay eller Se Eiendom.

Hvis dette er stabilt, kan neste planfase bli:

- 3E: parent/old LOD fallback for base.
- 3F: kontrollert prune/retiring for V2-only tiles.
- 4A: Se Eiendom overlay, fortsatt etter base.
