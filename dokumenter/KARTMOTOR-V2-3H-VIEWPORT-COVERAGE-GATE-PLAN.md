# Kartmotor V2 3H - viewport coverage gate plan

Status: review-only plan. No `app.js` change in this step.

## Purpose

3H shall define the function that detects whether the actual transformed map surface covers the visible viewport.

This is the next required step before more loading/lifecycle work.

The current dark wedge problem appears when the old motor thinks the map covers the viewport because the transformed pane bounding box covers the screen, while the actual rotated/skewed map polygon still leaves a visible gap.

Known observed failure point:

```text
Approx zoom/readout: 71876%
Visual symptom: darkness starts creeping in from the left side of the viewport
```

3H must make this measurable and reproducible.

## Core rule

The motor must not treat a map level as safe just because its axis-aligned bounding box covers the viewport.

The future rule is:

```text
detail layer may be considered coverage-ready only when the actual transformed map polygon covers the viewport.
```

For 3H, this is diagnostic only. Do not use it to hide/show layers yet.

## Locked scope

Allowed:

- compute actual transformed map pane polygon in screen coordinates
- compute viewport rectangle in screen coordinates
- report whether viewport corners are inside the polygon
- report per-side missing coverage
- report `coverageReady`
- report camera/zoom readout, especially around 71876%
- compare old AABB coverage against polygon coverage
- expose diagnostics in `publicState` and dataset if implemented later

Not allowed:

- no tile loading changes
- no tile unloading/dumping
- no layer switching
- no Se Eiendom / Matrikkel
- no overlay
- no retry
- no fallback
- no parent placeholder
- no prune
- no cache / IndexedDB / local proxy
- no change to clean-motor geometry
- no change to Instrument geometry, anchors, GE-grid, `aeProject`, transform, scale, rotation, tile positions, or map proportions

## Why AABB is not enough

Current V1-style diagnostic uses a pane screen rectangle similar to:

```text
left = min(transformed corner x)
right = max(transformed corner x)
top = min(transformed corner y)
bottom = max(transformed corner y)
```

This axis-aligned bounding box can cover the viewport even when the rotated/skewed quadrilateral itself does not.

Expected diagnostic mismatch:

```text
aabbMissingTotal = 0
polygonMissingLeft > 0
coverageReady = false
```

This mismatch is the suspected source of the dark wedge.

## Proposed 3H function names

Suggested functions for later implementation:

- `norgeCleanPaneScreenPolygonForRange(range, zoom, anchorMode)`
- `norgeViewportScreenRect()`
- `pointInConvexPolygon(point, polygon)`
- `segmentIntersectsViewportEdge(...)` if needed later
- `norgePolygonViewportCoverage(polygon, viewport)`
- `norgeCoverageGateDiagnostics(range, zoom, anchorMode)`

Names may change during implementation, but responsibilities should stay separate.

## Minimum diagnostic model

The first implementation does not need perfect computational geometry.

Minimum sufficient diagnostic:

1. Transform the four pane corners to screen coordinates.
2. Treat them as the actual quadrilateral/polygon.
3. Test these viewport points:
   - top-left
   - top-center
   - top-right
   - center-left
   - center
   - center-right
   - bottom-left
   - bottom-center
   - bottom-right
4. Count which points are outside the polygon.
5. Report missing sides based on outside points.

This is enough to catch the observed left-side darkness.

## Future stronger model

If point sampling is not enough, later phases can add:

- polygon/rectangle intersection
- signed distance from viewport corners to polygon edges
- exact visible-area coverage percentage
- tile-level coverage union

Do not implement the stronger model in 3H unless the simple model cannot detect the 71876% dark wedge.

## 3H diagnostic fields

If implemented after review, expose these exact diagnostic fields where practical:

- `coverageGateZoomPercent`
- `coverageGateZoom`
- `coverageGateReady`
- `coverageGateAabbReady`
- `coverageGatePolygonReady`
- `coverageGateAabbMissingLeft`
- `coverageGateAabbMissingRight`
- `coverageGateAabbMissingTop`
- `coverageGateAabbMissingBottom`
- `coverageGatePolygonMissingLeft`
- `coverageGatePolygonMissingRight`
- `coverageGatePolygonMissingTop`
- `coverageGatePolygonMissingBottom`
- `coverageGateOutsideSampleCount`
- `coverageGateOutsideSamples`
- `coverageGateAnchorMode`
- `coverageGateRange`
- `coverageGateReason`

The field names above are proposed contract names for review.

## Meaning of coverageReady

For 3H diagnostics:

```text
coverageGateReady = coverageGatePolygonReady
```

But the engine must not yet use this to change rendering.

Later, LOD/layer visibility can use:

```text
detailVisibleAllowed = heightAllowed && coverageGateReady
```

## Height / zoom rule

3H shall not implement full height/LOD switching.

It should only report the current zoom/readout so we can verify the known threshold:

```text
around 71876% -> left-side polygon coverage begins to fail
```

Later phase:

```text
height/zoom selects candidate detail level
coverage gate decides whether candidate level is safe to show
```

## Expected smoke observations

At safe zoom before dark wedge:

```text
coverageGateAabbReady = true
coverageGatePolygonReady = true
coverageGateReady = true
coverageGateOutsideSampleCount = 0
```

At the observed dark wedge around 71876%:

```text
coverageGateAabbReady = true
coverageGatePolygonReady = false
coverageGateReady = false
coverageGatePolygonMissingLeft > 0
coverageGateOutsideSampleCount > 0
```

At deeper zoom where whole map disappears:

```text
coverageGatePolygonReady = false
coverageGateOutsideSampleCount increases
coverageGateReason includes polygon-miss or viewport-not-covered
```

## Acceptance criteria

3H implementation may be considered successful only when:

- it does not change any map geometry
- it does not change tile loading
- it reports old AABB readiness separately from polygon readiness
- it detects left-side coverage failure around the observed 71876% zoom/readout
- it keeps clean-motor and V2 loading behavior unchanged
- it gives enough telemetry to prove why darkness appears

## Review questions

1. Is the diagnosis correct that AABB coverage can hide actual rotated-polygon gaps?
2. Is point-sampling sufficient for 3H, or should exact polygon/rectangle intersection be required immediately?
3. Are the proposed diagnostic field names sufficient?
4. Should 71876% be treated as an explicit smoke-test threshold?
5. Is it correct that 3H must not alter loading/layer visibility yet?

## Next step after approval

If approved, implement 3H as a diagnostic-only patch.

Do not implement tile lifecycle changes, LOD switching, overlay loading, Se Eiendom loading, retry, fallback, prune, or cache in 3H.
