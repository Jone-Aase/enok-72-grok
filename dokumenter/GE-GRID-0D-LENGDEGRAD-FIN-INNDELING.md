# GE-GRID 0D - lengdegrader med fin 1-graders inndeling

Status: IMPLEMENTERT / KLAR FOR VERIFISERING
Dato: 2026-06-09

## Formål

GE-GRID-0D låser finere lengdegrad-inndeling uten å flytte eksisterende meridianer.

Dette steget skal bare legge til og verifisere finere 1-graders tick-markeringer rundt GE-lengdegrad-ringen.

## Låste referanser

Disse skal ikke flyttes:

- Greenwich / 0 grader
- 180 grader / datolinje
- 90E
- 90W
- eksisterende 5-graders GE-tallring
- eksisterende 10-graders labels
- eksisterende 5-graders/10-graders meridianstruktur

## Lengdegrad-regel

GE-lengdegradene er like vinkelsteg:

```text
1 lengdegrad = 1 grad vinkelsteg
```

Instrumentets kompassplassering bruker allerede låst formel:

```text
compassDeg = (180 - signedLongitude) mod 360
```

Kontrollpunkter:

| GE-lengdegrad | Instrument-retning |
| --- | ---: |
| 0 grader / Greenwich | 180 grader |
| 90E | 90 grader |
| 180 grader | 0 grader |
| 90W | 270 grader |

## Implementering

GE-ringen har nå 360 fine tick-markeringer:

```text
stepDeg = 1
tickCount = 360
```

Eksisterende tall flyttes ikke. 1-graders tickene ligger som visuell fininndeling under/innenfor eksisterende GE-tall.

## Verifisering

Instrumentet eksponerer:

```text
globalThis.__GE_GRID_0D
window.__GE_GRID_0D
```

Høyrepanelet viser:

```text
GE grid longitude spacing: locked 1 deg, ticks 360, var 0.000000 deg
```

Aksept:

- `minDeltaDeg = 1`
- `maxDeltaDeg = 1`
- `variationDeg = 0`
- `tickCount = 360`
- `meridiansMoved = false`

## Ikke del av 0D

- Ingen geometriendring.
- Ingen ankerendring.
- Ingen transformendring.
- Ingen kartmotorendring.
- Ingen endring av clean-motor.
- Ingen flytting av eksisterende meridianer.
