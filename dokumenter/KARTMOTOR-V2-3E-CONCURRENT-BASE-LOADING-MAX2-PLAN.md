# Kartmotor V2 3E - Concurrent Base Loading Max 2 Plan

## Status

Dette er en review-only plan.

Ingen `app.js`-endring skal gjøres i denne fasen.
Ingen loader-utvidelse skal åpnes før planen er reviewet og godkjent.

Utgangspunkt:

- 3D er implementert og browser-verifisert.
- 3D laster 16 `base:visible` + 8 `base:keep`.
- Totalt 24 base-tiles.
- `maxConcurrent=1`.
- Clean-motor er fortsatt synlig backup.

## Mål

Teste én ny mekanisme:

> kontrollert parallell tile-loading med `maxConcurrent=2`.

3E skal ikke innføre retry, fallback, overlay, cache, prune eller parent-placeholder.

## Scope

Tillatt:

- Egen 3E-testgate.
- Vanlig V2-toggle starter ikke 3E-loading.
- Kun basekart.
- Samme tile-scope som 3D:
  - maks 16 `base:visible`
  - maks 8 `base:keep`
  - maks 24 totalt
- `base:visible` skal fortsatt fullføres før `base:keep` får starte.
- `maxConcurrent=2`.
- Append kun etter `img.onload`.
- Cancel-guard som 3D:
  - stopp hvis 3E-gate lukkes
  - stopp hvis `pendingRegistry.has(key)` ikke lenger stemmer
- Clean-motor skal være synlig backup.
- V2 skal fortsatt ha `pointer-events: none`.

Ikke tillatt:

- Ingen overlay.
- Ingen Se Eiendom/Matrikkel.
- Ingen retry/backoff.
- Ingen OSM fallback.
- Ingen parent-tile placeholder.
- Ingen crossfade.
- Ingen prune.
- Ingen retiring.
- Ingen cache/IDB/local server.
- Ingen `fetch()`.
- Ingen endring av clean-motor.
- Ingen endring av Core/sannhetsgeometri.

## Låste grenser

3E må ikke endre:

- anker
- GE-grid
- solsirklene
- `aeProject`
- transform
- skala
- rotasjon
- tile-posisjon som er låst av Core
- kartproporsjoner
- clean-motorens DOM eller state

## Foreslått runtime-kontrakt

Nye felt:

```javascript
threeEMaxVisibleTiles: 16
threeEMaxKeepTiles: 8
threeEMaxTotalTiles: 24
threeEMaxConcurrent: 2
threeEExplicitlyOpened: false
```

Ny gate:

```javascript
window.__openKartmotorV2ThreeETestGate()
window.__closeKartmotorV2ThreeETestGate()
```

URL-param:

```text
kartmotorV2ThreeETest=1
```

## Stoppkriterier før 3E-loading

Stop hvis:

- `cleanDisplay !== "block"`
- V2 `pointer-events !== "none"`
- 3E-gate ikke er eksplisitt åpnet
- 3A/3B/3C/3D-gate også er åpen
- valgt kandidat ikke er `role=base`
- valgt kandidat ikke er `band=visible` eller `band=keep`
- en `keep`-tile prøver å starte før alle `visible` er ferdig
- `validTile !== true`
- `validUrl !== true`
- `sourceKind === "se-eiendom"`
- `sourceId` matcher Se Eiendom/Matrikkel/Eiendom
- `visibleCandidates > 16`
- `keepCandidates > 8`
- `totalCandidates > 24`
- `maxConcurrent > 2`
- `inflightCount > 2`
- `pendingRegistry.size > 24`
- `tileRegistry.size > 24`
- `actualLoaded > 24`
- `actualAppended > 24`
- append skjer før `img.onload`
- append-target ikke er V2-pane

## Statusfelt

3E bør vise:

Feltnavnene under er kontraktfelt. De skal kopieres eksakt i kode, `dataset`
og `publicState`, slik at automatiske smoke-sjekker ikke leser feil felt.

```javascript
threeEVisibleRequested
threeEKeepRequested
threeETotalRequested
threeEPending
threeEInflight
threeEMaxInflightObserved
threeEVisibleLoaded
threeEKeepLoaded
threeELoaded
threeEFailed
threeEAppended
threeERejectedByGate
threeERejectedOverlay
threeERejectedNonVisible
threeERejectedInvalid
threeEFirstSourceId
threeELoadedZXY
threeELoadedBands
threeELastError
```

## Akseptkriterier

Lukket gate:

- `threeELoaded=0`
- `threeEAppended=0`
- `tileCount3E=0`
- clean-motor `display=block`

Åpen gate:

- `threeEVisibleRequested=16`
- `threeEKeepRequested=8`
- `threeETotalRequested=24`
- `threeEVisibleLoaded=16`
- `threeEKeepLoaded=8`
- `threeELoaded=24`
- `threeEAppended=24`
- `threeEFailed=0`
- `threeEPending=0`
- `threeEMaxInflightObserved <= 2`
- `registrySize=24`
- første 16 loaded bands er `visible`
- siste 8 loaded bands er `keep`
- `overlayLoaded=0`
- Se Eiendom/Matrikkel loaded = 0
- clean-motor `display=block`
- V2 `pointer-events=none`
- `pendingRegistry` og `tileRegistry` endres bare av aktiv 3E-testløype.
- 3A/3B/3C/3D skal ikke mutere `pendingRegistry` eller `tileRegistry` mens 3E-gate er åpen.

## Browser smoke

Lukket gate:

```text
index.html?bust=3e-closed
```

Åpen gate:

```text
index.html?bust=3e-open&kartmotorV2ThreeETest=1
```

Forventet:

```text
visible 16/16
keep 8/8
loaded 24
failed 0
pending 0
maxInflightObserved <= 2
```

Ekstra isolasjonssjekk:

```text
3A/3B/3C/3D gates closed
registry mutations from 3E only
pending mutations from 3E only
```

## Neste steg etter 3E

Ikke gå direkte til overlay eller Se Eiendom.

Anbefalt rekkefølge:

1. 3F: `maxConcurrent=4`, fortsatt base-only.
2. 3G: enkel backpressure-observasjon.
3. 3H: retry/error classification.
4. 3I: parent/old LOD fallback.
5. 4A: første kontrollerte overlay/Se Eiendom-test.
