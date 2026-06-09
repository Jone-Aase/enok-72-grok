# SOLSIRKLER - låst mot GE-nettet

Status: LÅST BESLUTNING
Dato: 2026-06-09

## Beslutning

GE-nettet er låst først og er nå koordinatfundamentet.

Solsirklene skal nå regnes som låst mot GE-nettet.

Punktene/objektene på solsirklene skal ligge låst til solsirklene.

Norgeskartet er festet til dette låste systemet.

## Hierarki

```text
GE-nett
  -> solsirklene
      -> solsirkel-punkter / objekter
          -> kartlag festet mot systemet
```

## Solsirkler

De fem hovedsirklene er:

- Nordlig polarsirkel
- Krepsens vendekrets
- Ekvator
- Steinbukkens vendekrets
- Sørlig polarsirkel

## Viktig presisering

Punktene er objekter på solsirklene.

Fra nå av skal solsirklene forstås som låst mot GE-nettet, slik at punktene indirekte følger det låste GE-fundamentet via sin solsirkel.

## Ikke endre uten eksplisitt GO

- Ikke flytt GE-nettet.
- Ikke flytt solsirklene.
- Ikke løsne punktene fra solsirklene.
- Ikke løsne Norgeskartet fra dette låste systemet.
- Ikke endre geometri, anker, transform eller `aeProject`.

## Neste tryggeste arbeid

Lag en inventar-/verifikasjonsfase som viser:

- hvilke punkter ligger på hver solsirkel
- hvilken solsirkel hvert punkt er låst til
- avvik/toleranse mot solsirkel
- at Norgeskartet fortsatt er festet riktig
