# Kartmotor V2 3I - polygon coverage guard plan

Status: review-only plan. No `app.js` change in this step.

## Purpose

3I shall convert the 3H diagnostic finding into a narrow, safe coverage rule.

3H proved that the dark wedge can appear while the old AABB coverage guard still reports success:

```text
AABB coverage: ok
Polygon point-sampling: miss
Left-side polygon missing: > 0
```

This means the current guard can stop expanding tile coverage too early. 3I should make the guard continue when the actual transformed map polygon does not cover the viewport.

## 3H evidence

Observed browser samples after 3H:

```text
~76015%:
  3H AABB ok 100%
  poly ok 100%
  miss L0/R0/T0/B0

~83671%:
  3H AABB ok 100%
  poly miss 55.6%
  miss L1/R2/T1/B3
  dark-left? true

~87783%:
  3H AABB ok 100%
  poly miss 55.6%
  miss L1/R2/T1/B3
  dark-left? true
```

Interpretation:

- The AABB/bounding-box guard is not sufficient.
- The transformed/skewed map polygon can fail while the bounding box still covers the viewport.
- The first practical failure band is still around the user-observed `>41066%` / `71876%` region, with a clear reproduced signal above it.

## Locked scope

Allowed:

- use the existing 3H point-sampling diagnostics as a guard signal
- keep using the existing tile-range expansion mechanism
- continue expanding range when AABB is ready but polygon sample is not ready
- prefer the side(s) where polygon-sampling reports missing coverage
- report before/after AABB and polygon-sample status
- expose status/dataset fields for review

Not allowed:

- no change to Instrument geometry
- no change to map anchors
- no change to GE-grid
- no change to `aeProject`
- no change to transform, scale, rotation, tile-position or map proportions
- no overlay
- no Se Eiendom / Matrikkel
- no retry
- no fallback
- no parent placeholder
- no prune
- no cache / IndexedDB / local proxy
- no layer visibility switch
- no new loading phase
- no change to clean-motor backup behavior

## Core rule

For 3I, AABB-ready is no longer enough for the coverage guard.

The guard may stop only when:

```text
coverageGateAabbReady === true
coverageGatePolygonSampleReady === true
```

If:

```text
coverageGateAabbReady === true
coverageGatePolygonSampleReady === false
```

then the guard must keep expanding the tile range, within the existing tile budget and safety limits.

## Expansion direction rule

3I should stay conservative.

Suggested expansion priority:

1. If polygon sample reports left-side miss, try expanding `xMin`.
2. If polygon sample reports right-side miss, try expanding `xMax`.
3. If polygon sample reports top-side miss, try expanding `yMin`.
4. If polygon sample reports bottom-side miss, try expanding `yMax`.
5. If multiple sides miss, evaluate candidate expansions and choose the one that improves polygon-sample coverage most.

Do not assume left is the only possible failure. The current reproduced problem is left-side darkness, but the rule should report all sides.

## Stop conditions

3I must stop expansion if any of these are true:

- range hits tile limit bounds
- range would exceed existing max tile budget
- polygon sample cannot improve after candidate expansion
- expansion reaches existing guard iteration cap
- coverage diagnostics cannot be computed

If stopped while polygon sample still fails, report:

```text
coverageGatePolygonBlocked = true
coverageGatePolygonBlockedReason = ...
```

Do not hide the clean-motor or change layer visibility as a response.

## Suggested status fields

Expose these fields where practical:

- `coverageGateAabbReady`
- `coverageGatePolygonSampleReady`
- `coverageGateAabbPercent`
- `coverageGatePolygonSamplePercent`
- `coverageGatePolygonSampleMissingLeft`
- `coverageGatePolygonSampleMissingRight`
- `coverageGatePolygonSampleMissingTop`
- `coverageGatePolygonSampleMissingBottom`
- `coverageGatePolygonExpansionActive`
- `coverageGatePolygonExpanded`
- `coverageGatePolygonExpansionSide`
- `coverageGatePolygonBeforePercent`
- `coverageGatePolygonAfterPercent`
- `coverageGatePolygonBlocked`
- `coverageGatePolygonBlockedReason`
- `coverageGateExpectedDarkWedgeSignal`

## Expected smoke result

At the dark wedge band, before 3I fix:

```text
AABB ok
poly miss
missLeft > 0
dark-left? true
```

After 3I fix:

```text
AABB ok
poly ok
missLeft = 0
dark-left? false
```

or, if tile budget prevents full correction:

```text
AABB ok
poly miss
coverageGatePolygonBlocked = true
coverageGatePolygonBlockedReason = budget-or-limit
```

The second outcome is still valuable because it proves the guard is no longer silently lying.

## Browser smoke points

Use these points:

```text
safe reference: ~56000% - 76000%
failure band:  ~83000% - 92000%
deep failure:  >200000%
```

The earlier user observation remains important:

```text
critical ladder starts after ~41066%
71876% remains a practical manual smoke target
```

## GE-net note

GE-nettet is not part of 3I.

Later, when the GE-net / square-grid position model is ready, it can become an authoritative rule for where the camera is located over the map surface. That is a separate precision layer:

```text
phase later: GE-net position rule
phase now: viewport polygon coverage rule
```

Do not mix GE-net navigation/plotting with 3I coverage expansion.

## Acceptance criteria

3I implementation can be considered successful only when:

- it changes no locked geometry
- it changes no layer selection
- it changes no overlay / Se Eiendom behavior
- it keeps clean-motor visible as backup
- it preserves existing tile budget limits
- it uses polygon-sample readiness as a coverage guard condition
- it fixes or explicitly reports the dark wedge failure mode
- it reports enough telemetry for Core/Game/Vibe to review

## Review questions

1. Is it correct that the guard may stop only when both AABB and polygon sample are ready?
2. Should expansion direction be side-prioritized from polygon missing counts?
3. Are the proposed blocked-status fields enough when budget prevents full coverage?
4. Should 3I remain point-sampling only, with exact polygon/viewport intersection saved for a later mini-fix if needed?
5. Is it correct that GE-net position rules must wait until after this coverage fix?

## Next step after approval

If approved, implement 3I as a minimal `app.js` patch.

Do not implement overlay loading, Se Eiendom loading, LOD switching, retry, fallback, prune, cache, parent placeholder, or GE-net camera rules in 3I.
