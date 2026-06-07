# Kartmotor V2 3F - Concurrent Base Loading Max 4 Plan

## Status

Dette er en review-only plan.

Ingen `app.js`-endring skal gjores i denne fasen.
Ingen loader-utvidelse skal apnes for planen er reviewet og godkjent.

Utgangspunkt:

- 3E er implementert og browser-verifisert.
- 3E laster 16 `base:visible` + 8 `base:keep`.
- Totalt 24 base-tiles.
- `maxConcurrent=2`.
- Clean-motor er fortsatt synlig backup.

## Maal

Teste en ny mekanisme:

> kontrollert parallell tile-loading med `maxConcurrent=4`.

3F skal ikke innfore retry, fallback, overlay, cache, prune, retiring, parent-placeholder eller backpressure-styring.

## Scope

Tillatt:

- Egen 3F-testgate.
- Vanlig V2-toggle starter ikke 3F-loading.
- Kun basekart.
- Samme tile-scope som 3E:
  - maks 16 `base:visible`
  - maks 8 `base:keep`
  - maks 24 totalt
- `base:visible` skal fortsatt fullfores foer `base:keep` far starte.
- `maxConcurrent=4`.
- Append kun etter `img.onload`.
- Cancel-guard som 3E:
  - stopp hvis 3F-gate lukkes
  - stopp hvis `pendingRegistry.has(key)` ikke lenger stemmer
- Clean-motor skal vare synlig backup.
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

## Lastegrenser

3F skal kun endre parallellitet:

```text
3E: maxConcurrent=2
3F: maxConcurrent=4
```

Alt annet skal vare likt 3E.

## Foreslatt runtime-kontrakt

Nye felt:

```javascript
threeFMaxVisibleTiles: 16
threeFMaxKeepTiles: 8
threeFMaxTotalTiles: 24
threeFMaxConcurrent: 4
threeFExplicitlyOpened: false
```

Ny gate:

```javascript
window.__openKartmotorV2ThreeFTestGate()
window.__closeKartmotorV2ThreeFTestGate()
```

URL-param:

```text
kartmotorV2ThreeFTest=1
```

## Stoppkriterier for 3F-loading

Stop hvis:

- `cleanDisplay !== "block"`
- V2 `pointer-events !== "none"`
- 3F-gate ikke er eksplisitt apnet
- 3A/3B/3C/3D/3E-gate ogsa er apen
- valgt kandidat ikke er `role=base`
- valgt kandidat ikke er `band=visible` eller `band=keep`
- en `keep`-tile prover a starte foer alle `visible` er ferdig
- `validTile !== true`
- `validUrl !== true`
- `sourceKind === "se-eiendom"`
- `sourceId` matcher Se Eiendom/Matrikkel/Eiendom
- `visibleCandidates > 16`
- `keepCandidates > 8`
- `totalCandidates > 24`
- `maxConcurrent > 4`
- `inflightCount > 4`
- `pendingRegistry.size > 24`
- `tileRegistry.size > 24`
- `actualLoaded > 24`
- `actualAppended > 24`
- append skjer foer `img.onload`
- append-target ikke er V2-pane

## Statusfelt

3F bor vise egne felt, med eksakte navn i `dataset` og `publicState.runtime3F`:

```javascript
threeFVisibleRequested
threeFKeepRequested
threeFTotalRequested
threeFPending
threeFInflight
threeFMaxInflightObserved
threeFVisibleLoaded
threeFKeepLoaded
threeFLoaded
threeFFailed
threeFAppended
threeFRejectedByGate
threeFRejectedOverlay
threeFRejectedNonVisible
threeFRejectedInvalid
threeFFirstSourceId
threeFLoadedZXY
threeFLoadedBands
threeFLastError
```

## Akseptkriterier

Lukket gate:

- `threeFLoaded=0`
- `threeFAppended=0`
- `tileCount3F=0`
- clean-motor `display=block`

Apen gate:

- `threeFVisibleRequested=16`
- `threeFKeepRequested=8`
- `threeFTotalRequested=24`
- `threeFVisibleLoaded=16`
- `threeFKeepLoaded=8`
- `threeFLoaded=24`
- `threeFAppended=24`
- `threeFFailed=0`
- `threeFPending=0`
- `threeFMaxInflightObserved <= 4`
- `registrySize=24`
- forste 16 loaded bands er `visible`
- siste 8 loaded bands er `keep`
- `overlayLoaded=0`
- Se Eiendom/Matrikkel loaded = 0
- clean-motor `display=block`
- V2 `pointer-events=none`
- `pendingRegistry` og `tileRegistry` endres bare av aktiv 3F-testlope.
- 3A/3B/3C/3D/3E skal ikke mutere `pendingRegistry` eller `tileRegistry` mens 3F-gate er apen.

## Browser smoke

Lukket gate:

```text
index.html?bust=3f-closed
```

Apen gate:

```text
index.html?bust=3f-open&kartmotorV2ThreeFTest=1
```

Forventet:

```text
visible 16/16
keep 8/8
loaded 24
failed 0
pending 0
maxInflightObserved <= 4
```

Ekstra isolasjonssjekk:

```text
3A/3B/3C/3D/3E gates closed
registry mutations from 3F only
pending mutations from 3F only
```

## Neste steg etter 3F

Ikke ga direkte til overlay eller Se Eiendom.

Anbefalt rekkefolge:

1. 3G: enkel backpressure-observasjon, fortsatt base-only.
2. 3H: retry/error classification.
3. 3I: parent/old LOD fallback.
4. 4A: forste kontrollerte overlay/Se Eiendom-test.
