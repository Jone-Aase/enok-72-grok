# Active POC source for agents

Branch: `codex/v7-active-poc-source-for-agents`

Base source branch: `codex/v7-lag1-trinn1-2-3-merged`

Base source SHA: `d5e69f4c966f852087fa25171f87b13839234cf0`

Purpose: read-only source package for agent review of the active clean pixelflate / Lag 1 motor.

This branch combines:

- active POC `app.js` and `index.html` from `codex/v7-lag1-trinn1-2-3-merged`
- handover and rule documents from `codex/v7-agent-handover-docs`

Agents must treat this branch as read-only unless Jone and Codex Koordinator explicitly approve a new task.

## Active motor areas

The active POC motor to inspect is the clean pixelflate / Lag 1 path, including:

- freeze-when-loaded
- priority / qualityGap
- hard frame-budget queue pumping
- parent-tile fallback
- clean detail tile source selection
- clean detail tile queue
- clean status and load diagnostics

Useful search terms in `app.js`:

- `norgeCleanTileManager`
- `visibleNorgeSourceBounds`
- `currentNorgeDetailSources`
- `currentNorgeDetailZoom`
- `expandNorgeTileRange`
- `fitTileRangeToBudget`
- `updateNorgeCleanDetailTiles`
- `queueNorgeCleanTile`
- `processNorgeCleanTileQueue`
- `findNorgeCleanParentFallback`
- `addNorgeCleanParentFallback`
- `checkNorgeFreezeWhenLoaded`
- `norgeCleanLoadLine`

## Do not use as active POC truth

Older Three.js / mesh-oriented functions may still exist in `app.js`. They are not the active POC motor for the current diagnostic task unless Codex Koordinator says otherwise.

## Locked areas

Do not change or propose changes to:

- anchor points
- GE-grid
- solar circles
- `aeProject`
- transform
- scale
- rotation
- tile position
- map proportions
- internal geometry of approved map surfaces

If a task appears to require any of these, stop and ask Jone and Codex Koordinator.
