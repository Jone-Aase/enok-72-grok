# KARTMOTOR V2 STATUS

Sist oppdatert: 2026-06-09

## Siste stabile linje før GE-grid-pause

Kartmotor V2 ble utviklet trinnvis:

- 2A passivt shell
- 2B wanted/keep dry-run
- 2C priority queue
- 2D center-out
- 2E passive descriptors
- 2F no-op loader gate
- 2G URL-builder dry-run
- 2H URL validation hardening
- 3A single base tile
- 3B 4 base tiles
- 3C 16 base visible tiles
- 3D base keep buffer
- 3E maxConcurrent 2
- 3F maxConcurrent 4
- 3H coverage diagnostics
- 3I polygon coverage guard

## Viktig status

3I ble godkjent som polygon coverage guard:

```text
1ca6fc4 Implement 3I polygon coverage guard
```

Men bruker observerte senere at mørket fortsatt kom inn og at en senere eksperimentell endring flyttet ankerpunkter og låste/hoppet zoom. Den eksperimentelle endringen ble revertet.

## Nåværende beslutning

Kartmotor-arbeidet er satt på pause mens GE-grid fundamentet låses.

Ikke fortsett med tile-livssyklus, overlay, Se Eiendom, cache eller fallback før GE-nettets grunnregler er gjennomgått.
