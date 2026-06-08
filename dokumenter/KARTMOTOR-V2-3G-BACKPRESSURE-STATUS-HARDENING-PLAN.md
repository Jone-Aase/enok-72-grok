# Kartmotor V2 3G - backpressure/status hardening plan

Status: review-only plan. No `app.js` change in this step.

## Purpose

3G shall harden diagnostics and backpressure visibility for the already verified 3F loading path.

3F proved:

- maxConcurrent = 4
- 16 base:visible + 8 base:keep
- 24 base tiles total
- visible before keep
- no overlay
- no Se Eiendom / Matrikkel
- no retry, fallback, prune, cache, or retiring
- clean-motor remains visible backup

3G must not introduce a new loading scope. It only makes the existing 3F-style base-only path easier to verify and safer to scale later.

## Locked scope

Allowed:

- base-only diagnostics
- same 24-tile scope as 3F
- maxConcurrent remains 4
- visible still completes before keep starts
- explicit 3G test gate
- stricter status fields for queue, pending, inflight, appended, failed, and backpressure
- stop reasons if counters exceed caps
- no-op/diagnostic backpressure state

Not allowed:

- no overlay
- no Se Eiendom / Matrikkel
- no retry
- no fallback
- no parent placeholder
- no prune
- no retiring
- no cache / IndexedDB / local proxy
- no larger tile count
- no change to clean-motor
- no change to Instrument geometry, anchors, GE-grid, `aeProject`, transform, scale, rotation, tile positions, or map proportions

## 3G test gate

3G must use its own gate:

- URL param: `kartmotorV2ThreeGTest=1`
- optional global: `window.__openKartmotorV2ThreeGTestGate()`
- optional close function: `window.__closeKartmotorV2ThreeGTestGate()`

Normal V2 toggle must not start 3G loading.

3G must stop if any earlier loader gate is open:

- 3A
- 3B
- 3C
- 3D
- 3E
- 3F

Only one experiment path may mutate V2 runtime registries at a time.

## Backpressure fields

3G should expose these exact diagnostic fields in both `publicState.runtime3G` and V2 dataset where practical:

- `threeGVisibleRequested`
- `threeGKeepRequested`
- `threeGTotalRequested`
- `threeGPending`
- `threeGInflight`
- `threeGMaxInflightObserved`
- `threeGQueueRemaining`
- `threeGVisibleQueueRemaining`
- `threeGKeepQueueRemaining`
- `threeGBackpressureState`
- `threeGBackpressureReason`
- `threeGBackpressureEvents`
- `threeGLoaded`
- `threeGVisibleLoaded`
- `threeGKeepLoaded`
- `threeGAppended`
- `threeGFailed`
- `threeGRejectedByGate`
- `threeGRejectedBackpressure`
- `threeGRejectedOverlay`
- `threeGRejectedInvalid`
- `threeGFirstSourceId`
- `threeGLoadedZXY`
- `threeGLoadedBands`
- `threeGLastError`

The field names above are contract names. Consumers should copy them exactly.

## Backpressure policy for 3G

3G should not implement dynamic/adaptive backpressure yet.

For this phase, backpressure is diagnostic and cap-based:

- `maxConcurrent = 4`
- `totalRequested <= 24`
- `pendingRegistry.size <= 24`
- `tileRegistry.size <= 24`
- `inflight <= 4`
- `appendQueue` is not introduced in 3G

Backpressure states:

- `idle` - no 3G loading active
- `running` - pump has open capacity and candidates remain
- `capped` - pump is at maxConcurrent
- `complete` - all requested tiles are loaded/appended or failed
- `blocked` - stop criteria prevented loading

Backpressure reasons may include:

- `max-concurrent`
- `total-cap`
- `pending-cap`
- `registry-cap`
- `visible-before-keep`
- `gate-closed`
- `other-gate-open`

## Loading behavior

3G may reuse the same loading behavior as 3F:

- 16 base:visible candidates
- 8 base:keep candidates
- visible candidates are loaded before keep candidates
- maxConcurrent = 4
- append only after `img.onload`
- cancel guard in both `img.onload` and `img.onerror`
- append target must be V2 pane only

3G must not increase tile count or concurrency.

## Hard stop criteria

Stop 3G if:

- clean-motor display is not `block`
- V2 `pointer-events` is not `none`
- 3G gate is not explicitly open
- any 3A/3B/3C/3D/3E/3F gate is open
- any selected candidate is not `role === 'base'`
- any selected candidate band is not `visible` or `keep`
- visible candidate count exceeds 16
- keep candidate count exceeds 8
- total candidate count exceeds 24
- maxConcurrent exceeds 4
- `pendingRegistry.size > 24`
- `tileRegistry.size > 24`
- `threeGInflight > 4`
- `threeGMaxInflightObserved > 4`
- `threeGLoaded > 24`
- `threeGAppended > 24`
- `threeGVisibleLoaded > 16`
- `threeGKeepLoaded > 8`
- sourceKind is `se-eiendom`
- sourceId matches Se Eiendom / Matrikkel / Eiendom
- append is attempted before `img.onload`
- append target is not V2 pane

## Acceptance criteria

Closed gate smoke:

- `threeGLoaded = 0`
- `threeGAppended = 0`
- `threeGFailed = 0`
- `tileCount3G = 0`
- clean-motor remains `block`

Open gate smoke:

- `threeGVisibleRequested = 16`
- `threeGKeepRequested = 8`
- `threeGTotalRequested = 24`
- `threeGLoaded = 24`
- `threeGVisibleLoaded = 16`
- `threeGKeepLoaded = 8`
- `threeGAppended = 24`
- `threeGFailed = 0`
- `threeGMaxInflightObserved <= 4`
- `threeGQueueRemaining = 0`
- `threeGPending = 0`
- `registrySize = 24`
- `overlayLoaded = 0`
- clean-motor remains `block`
- V2 pointer-events remains `none`

Expected successful final backpressure state:

- `threeGBackpressureState = complete`
- `threeGBackpressureReason = none` or empty

## Review questions

1. Is it correct that 3G introduces no new loading capacity beyond 3F?
2. Are the proposed `runtime3G` / dataset field names sufficient and exact enough?
3. Should backpressure remain diagnostic-only in 3G?
4. Are the stop criteria complete enough before implementation?
5. Is it correct to keep overlay and Se Eiendom out of 3G?

## Next step after approval

If this plan is approved, implement 3G as a narrow status/backpressure hardening patch.

Do not proceed to overlay, Se Eiendom, retry, fallback, prune, or cache in 3G.
