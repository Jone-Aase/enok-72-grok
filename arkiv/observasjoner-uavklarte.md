# Uavklarte observasjoner — å følge opp senere

## OBS-001: GE rute-nett "bølger" nær ekvator

**Dato observert**: 19. mai 2026
**Sted**: Aranuka Island, Kiribati (0°08'52"N, 173°36'50"E)
**Eye altitude**: 16.04 mi (25.81 km)
**Cursor-elev vist i status**: 3294 ft (1004 m) — rart for atoll på havnivå

### Brukerens beskrivelse
"Det er som om du har en fulenetting (firkantet) som er blitt bøyd og tråkket på i mange steder."

"Lengdegradene er bølge formet som om det var en person som sto på et nett."

### Tilknyttet måling
- Aranuka havn → ekvator:
  - Map Length: 16.93 km
  - Ground Length: 17.24 km
  - Heading: 178.71° (ikke 180° — bruker målte parallelt med bølge-nettet)
- WGS84 fra oppgitt koord: 16.36 km
- WGS84 fra havn på nordkysten: ~16.93 km — matcher Map Length

### Mulige forklaringer (ikke verifisert)
1. GE Pro 3D-globe rendering med terrain-mesh fra havbunns-bathymetri
2. Rendering-bug ved spesifikk zoom/breddegrad
3. Noe ekte i overflate-geometrien som vi ikke forstår ennu

### Status
**IKKE konkludert.** Noterer for senere oppfølging.

### Trigger for re-test
- Hvis lignende mønster dukker opp på andre breddegrader
- Hvis lignende mønster dukker opp over land (ikke bare hav)
- Hvis lignende mønster dukker opp på andre kart-plattformer
- Når vi har målt flere ekvator- og Capricorn-punkter

### Tester vi kan kjøre senere
1. Slå av Terrain-laget i GE → ser om bølgene forsvinner
2. Sammenligne med ESRI World Imagery, OpenStreetMap, NASA WorldWind
3. Måle samme strekning på ulike zoom-nivåer
4. Sjekke over kontinent (ørken) på samme breddegrad
