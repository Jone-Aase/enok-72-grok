# GE-GRID 0C - breddegrader med lik avstand

Status: IMPLEMENTERT / KLAR FOR VERIFISERING
Dato: 2026-06-08

## FormÃ¥l

GE-nettet skal bruke samme breddegrad-inndeling som brukes i dag:

- grader
- minutter
- sekunder
- nord/sÃ¸r-betegnelse

Men i Instrumentet skal avstanden mellom breddegradene vÃ¦re eksakt lik.

Det betyr:

```text
1 breddegrad = samme Instrument-avstand overalt
1 bueminutt = samme Instrument-avstand overalt
1 buesekund = samme Instrument-avstand overalt
```

## Hovedregel

GE-breddegradene skal tegnes som lineÃ¦r radial inndeling fra Nord som senter.

Ingen krumningsfaktor skal legges inn.

Forbudt i GE-GRID-0C:

- Ingen Web Mercator-faktor.
- Ingen sfÃ¦risk cos(lat)-faktor.
- Ingen projeksjonskorrigering som gjÃ¸r avstanden mellom breddegrader ulik.
- Ingen flytting av eksisterende meridianer.
- Ingen flytting av lÃ¥ste polarsirkel-ankre.
- Ingen kartmotor-/tile-regel som overstyrer GE-nettet.

## LineÃ¦r breddegrad-regel

Nordpolen er senter:

```text
90Â°N = radius 0
```

SÃ¸rover Ã¸ker radius lineÃ¦rt:

```text
radiusUnits = 90 - latitudeDegrees
```

Eksempler:

| Breddegrad | radiusUnits fra Nord |
| --- | ---: |
| 90Â°N | 0.000000 |
| 66Â°33'0.00"N | 23.450000 |
| 23Â°27'0.00"N | 66.550000 |
| 0Â° | 90.000000 |
| 23Â°27'0.00"S | 113.450000 |
| 66Â°33'0.00"S | 156.550000 |
| 90Â°S | 180.000000 |

Merk: Tabellen bruker moderne gradsprÃ¥k, men avstanden i Instrumentet er lineÃ¦r.

## LÃ¥st polarsirkel

Nordlig polarsirkel er matematisk lÃ¥st til:

```text
66Â°33'0.00"N
```

Med lineÃ¦r GE-regel gir det:

```text
90Â°00'0.00" - 66Â°33'0.00" = 23Â°27'0.00"
```

AltsÃ¥:

```text
polarsirkelRadiusUnits = 23.45
```

Dette er kontrollpunktet for de lÃ¥ste polarsirkel-ankrene:

- SelsÃ¸ygÃ¥rden
- Kveitanosen
- Nordskarven Hammervika
- GrÃ­msey
- Arctic Circle Center

## Meridianer

GE-GRID-0A er lÃ¥st.

Meridianene/lengdegradene skal ikke endres i 0C.

Breddegrad-ringer legges pÃ¥ eksisterende edderkoppnett.

## Akseptkriterier

0C er godkjent nÃ¥r Instrumentet kan rapportere:

- hver breddegrad-ring har lik radial avstand til neste ring
- 66Â°33'0.00"N ligger pÃ¥ radiusUnits 23.45 fra Nord
- 0Â° ligger pÃ¥ radiusUnits 90.00 fra Nord
- 66Â°33'0.00"S ligger pÃ¥ radiusUnits 156.55 fra Nord
- meridianer er uendret
- lÃ¥ste polarsirkel-ankre er uendret

## Implementering 2026-06-08

Instrumentet eksponerer nÃ¥ GE-GRID-0C som maskinlesbar diagnostikk:

```text
globalThis.__GE_GRID_0C
```

LÃ¥st formel:

```text
radiusUnits = 90 - latitudeDegrees
```

HÃ¸yrepanelet viser:

```text
GE grid latitude spacing: locked, var 0.000000 units
```

Polarsirkel-ringen i Instrumentet bruker nÃ¥ lÃ¥st matematisk verdi:

```text
66Â°33'0.00"N = 66.55Â°
```

Meridianene/lengdegradene er ikke endret i 0C.

## Forhold til kartmotoren

Kartmotoren og Kartverket-tiles skal senere legges oppÃ¥ GE-nettet.

GE-nettet er fasit.

Kartbilder er kun visuelle lag og skal ikke definere breddegrad-avstandene.
