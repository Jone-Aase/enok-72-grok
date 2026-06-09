# BESLUTNINGSLOGG

Sist oppdatert: 2026-06-09

## 2026-06-09

Beslutning:

GE-nettet er fundamentet og må låses før videre kartmotorutvikling.

Konsekvens:

Kartlag skal senere legges oppå GE-nettet. Kartlag skal ikke definere nettet.

## 2026-06-09

Beslutning:

GE-GRID-0C låser breddegrader som lineær radial inndeling:

```text
radiusUnits = 90 - latitudeDegrees
```

Konsekvens:

Ingen krumningsfaktor, ingen Web Mercator og ingen `cos(lat)`.

## 2026-06-09

Beslutning:

Ollama kan brukes som lokal Memory Keeper, men bare som leser/sekretær.

Konsekvens:

Selve minnet ligger i Markdown-filer i Git. Ollama skal ikke være sannhetslager.

## 2026-06-09

Beslutning:

Solsirklene er nå låst mot GE-nettet.

Punktene/objektene er låst til solsirklene.

Norgeskartet er festet til dette låste systemet.

Konsekvens:

Videre arbeid må behandle hierarkiet som:

```text
GE-nett -> solsirklene -> punkter/objekter -> kartlag
```
