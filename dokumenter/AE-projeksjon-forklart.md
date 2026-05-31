# Azimuthal Equidistant (AE) projeksjon — forklart

## Hva AE er

**Azimuthal Equidistant** er en kart-projeksjon som plasserer ett valgt punkt (sentrum) i midten av kartet, og lar alle avstander fra det sentrum være **proporsjonale med ekte avstand på bakken**.

Det er den projeksjonen som brukes i:
- **FN-flagget** (sentrert på Nordpolen)
- **ICAO-flagget**
- Flykart for å finne kortest rute fra ett punkt
- Klassiske "flat-jord"-kart (Gleason-stil 1892)

## Slik virker den (matematisk)

For et punkt på jorden med (lat, lon) — hvis vi velger Nordpolen som sentrum:

1. **Avstand fra senter (radius i kartet):**
   ```
   r = 90° - lat
   ```
   - Nordpolen (lat = 90°): r = 0° (i midten)
   - Ekvator (lat = 0°): r = 90° (halvveis ut)
   - Sørpolen (lat = -90°): r = 180° (helt på kanten)

2. **Vinkel fra senter (azimuth i kartet):**
   ```
   θ = lon
   ```
   - 0°E = rett opp
   - 90°E = til høyre
   - 180° = rett ned
   - 90°W = til venstre

3. **Kartesiske koordinater i AE-kartet:**
   ```
   x = r · cos(θ)
   y = r · sin(θ)
   ```

## Hva det betyr visuelt

På et AE-kart med Nordpolen i sentrum:
- Hver breddegrad-linje (parallell) blir en **perfekt sirkel** rundt Nordpolen
- Hver lengdegrad-linje (meridian) blir en **rett linje** ut fra Nordpolen
- Ekvator er en perfekt sirkel halvveis ut
- Sørpolen blir den ytterste sirkelen (kanten)

## Hvorfor dette betyr noe for Enoks modell

Enoks modell beskriver jorden som en flat skive med Nordpolen i sentrum, og solen som beveger seg i sirkler over skiven:
- **Cancer-sirkelen** (innerst): sommerens sol-bane
- **Ekvator-sirkelen** (midten): jevndøgnets sol-bane
- **Capricorn-sirkelen** (ytterst): vinterens sol-bane

I AE-projeksjon ser disse tre nøyaktig ut som beskrevet i Enoks tekst:
- Konsentriske sirkler rundt Nordpolen
- Forskjellige radier

Det er derfor AE-projeksjonen er den **direkte representasjonen** av Enoks geometri.

## Hva som er testen

Hvis Enoks modell beskriver virkeligheten:
- Når vi plotter våre 24 gamle markører på AE-kart med Nordpolen i sentrum,
- så skal Cancer-markørene danne en perfekt sirkel rundt Nordpolen,
- Ekvator-markørene en større perfekt sirkel,
- Capricorn-markørene en enda større perfekt sirkel,
- og alle tre sirkler skal ha **samme senter** (Nordpolen).

Hvis det stemmer, har vi en bekreftelse på Enoks geometri.

## Hva som IKKE er testen i Enok-sporet

Vi blander IKKE inn:
- Kule-modellens cosinusfaktor
- Ortografisk projeksjon
- "Best-fit" som forutsetter krumning
- WGS84 ellipsoide-justeringer

Hvis vi vil sammenligne med kule-modellen senere, gjør vi det i et eget spor — etter at Enok-sporet er ferdig analysert.

## Lat/lon — viktig nyanse

Punktene våre er gitt i (lat, lon)-koordinater. Disse koordinatene ble opprinnelig definert FORDI gamle landmålere antok jorden var en kule (eller ellipsoide). Det er sant.

MEN — i AE-projeksjon med Nordpolen som sentrum, er omregningen `r = 90 - lat, θ = lon` bare en geometrisk transformasjon. Det betyr ikke at vi forutsetter kulen. Vi bruker lat/lon som **etiketter** for punktene, og plotter dem på Enoks AE-kart for å se om de danner Enoks forventede mønster.

Det er ren geometri. Vi tester om punktene faktisk danner sirkler i Enoks geometri.

## Praktisk i Google Earth

GE viser jorden som en kule. For å visualisere Enoks AE-projeksjon trenger vi enten:
- Et eget AE-kart-overlegg, ELLER
- Plotting i et matematikk-program (Python, Mathematica) med AE-formelen

I GE kan vi se rådata (punktene), men ikke AE-projeksjonen direkte.
