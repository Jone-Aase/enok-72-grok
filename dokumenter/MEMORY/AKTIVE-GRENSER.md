# AKTIVE GRENSER

Sist oppdatert: 2026-06-09

## Absolutt låst uten eksplisitt GO

- Ikke endre geometri.
- Ikke endre anker.
- Ikke endre transform.
- Ikke endre `aeProject`.
- Ikke flytt GE-grid.
- Ikke skjul eller fjern clean-motor.
- Ikke koble inn overlay eller Se Eiendom i aktiv loader.
- Ikke legg inn prune/cache/fallback uten egen plan.
- Ikke la Memory Keeper endre `app.js` eller `index.html`.

## GE-grid lås

- GE-nettet er fasit.
- Meridianer/lengdegrader er låst fra GE-GRID-0A.
- Målte breddegrad-ringer og polarsirkel-ankre er låst fra GE-GRID-0B.
- Greenwich, 0 grader og 180 grader er låst som hovedreferanser.
- Breddegrader er lineær radial inndeling fra Nord:

```text
radiusUnits = 90 - latitudeDegrees
```

- Ingen Web Mercator.
- Ingen `cos(lat)`.
- Ingen krumningsfaktor.

## Solsirkel-lås

- Solsirklene er nå låst mot GE-nettet.
- Punktene/objektene på solsirklene er låst til solsirklene.
- Norgeskartet er festet til dette låste systemet.
- Ikke løsne punkter fra solsirklene uten eksplisitt GO.
- Ikke løsne Norgeskartet fra solsirkel/GE-systemet uten eksplisitt GO.

## Kartmotor-lås

Kartmotor V2 skal være parallell motor. Clean-motor forblir backup.

Siste godkjente trygge motorlinje før GE-grid-pause:

- 3I polygon coverage guard.
- Ingen geometriendring.
- Ingen transformendring.
- Ingen overlay.
- Ingen Se Eiendom.
