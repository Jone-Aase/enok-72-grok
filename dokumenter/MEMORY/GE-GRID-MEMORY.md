# GE-GRID MEMORY

Sist oppdatert: 2026-06-09

## Fundament

GE-nettet er prosjektets posisjonsfasit.

Kartverket, Se Eiendom og andre kartlag skal senere legges oppå GE-nettet. Kartbildene skal ikke definere breddegrad/lengdegrad.

## GE-GRID-0A

Eksisterende meridianer/lengdegrader er låst.

Greenwich, 0 grader og 180 grader er låst som hovedreferanser.

## GE-GRID-0B

Eksisterende breddegrad-ringer og polarsirkel-ankre er låst/målt.

Låste polarsirkel-ankre:

- Selsøygården: `66°33'0.01"N`, `12°50'54.28"E`
- Kveitanosen: `66°32'60.00"N`, `12°38'17.89"E`
- Nordskarven Hammervika: `66°33'0.02"N`, `12°15'28.76"E`
- Grímsey: `66°33'0.04"N`, `18°1'4.76"W`
- Arctic Circle Center: `66°33'0.02"N`, `15°19'37.21"E`

Matematisk polarsirkel er låst til:

```text
66°33'0.00"N = 66.55°
```

## GE-GRID-0C

Implementert i commit:

```text
1654a96 Lock GE grid latitude spacing
```

Regel:

```text
radiusUnits = 90 - latitudeDegrees
```

Verifisert:

```text
minDeltaUnits = 5
maxDeltaUnits = 5
variationUnits = 0
polarCircleRadiusUnits = 23.45
```

Instrumentet viser:

```text
GE grid latitude spacing: locked 5 deg, var 0.000000 units
```

## Ikke gjort ennå

- Fineste lengdegrad-inndeling er ikke ferdigstilt.
- GE-nett for solbasert navigasjon/plotting er ikke ferdigstilt.
- GE-nettet skal ikke blandes inn i 3I/3F tile-loaderlogikk.
