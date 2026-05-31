# Kart-referanser for målbåndet — Google Earth-sjekk

**Formål**: Du kan måle disse strekningene i Google Earth og sammenligne mot målbåndets fysisk-kalibrerte verdier. Vi sammenligner Google Earths "Ground Length" mot målbåndet, og analyserer differansene.

---

## Sammendrag av målbåndet

| # | Strekning | Målbånd-verdi | Tier |
|---|---|---:|---|
| 1 | Pontchartrain Causeway | **38.4048 km** | GULL (eksakt fabrikat) |
| 2 | 90 Mile Straight | **146.6 km** | SØLV |
| 3 | Trans-Australian Railway | **478.193 km** | SØLV |
| 4 | Highway 10 Saudi rette segment | **240 km** | BRONSE |

---

## #1 Pontchartrain Causeway (GULL, 38.4048 km) — VERIFISERT

**Det vi måler**: Lake Pontchartrain Causeway, Louisiana — verdens lengste bro over vann.

### Endepunkter (brukerens egne avlesninger fra Google Earth)

| Endepunkt | Beskrivelse | Koordinater (DMS) | Koordinater (desimal) |
|---|---|---|---|
| Tollplaza sør | Tollplaza, ingen betong-elementer | 30°01′05.92″N, 90°09′16.27″W | 30.018311°N, 90.154519°W |
| **Siste betong sør** | Sydligste fysiske bro-element | 30°01′18.01″N, 90°09′14.79″W | 30.021669°N, 90.154108°W |
| **Siste betong nord** | Nordligste fysiske bro-element | 30°21′50.54″N, 90°05′38.69″W | 30.364039°N, 90.094081°W |

### Måleresultat fra Google Earth

| Måling | Verdi |
|---|---:|
| Map Length | 38.42 km |
| Ground Length | 38.42 km (38 420 m) |
| Heading | 188.63° (nord → sør) |

### Sammenligning mot gull-målbåndet

| | Verdi |
|---|---:|
| Gull-målbånd (2 250 spans × 56 ft × 0.3048) | 38 404.8 m |
| Google Earth Ground Length | 38 420.0 m |
| **Differanse** | **+15.2 m (+0.040 %)** |

**Tolkning**: Avviket på 15.2 m er mindre enn én broseksjon (17 m). Det forklares av at brukerens "siste betong-element"-punkter ikke er identisk med produsentens span-tellingsendepunkter. På 38 km gir Google Earth samme svar som det fysiske gull-målbåndet. På denne korte distansen gir kule og flat tilnaerimet identiske tall — målingen tester GE-koordinatkvalitet, ikke modell.

**Mine kontrollregninger** (samme koordinater):
- Haversine (perfekt kule R=6371): 38 504 m
- Vincenty (WGS84 ellipsoide): 38 391 m
- Google Earth: 38 420 m — ligger mellom — forventet for buet flate på WGS84.

---

## #2 90 Mile Straight på Eyre Highway (SØLV, 146.6 km) — VERIFISERT

### Endepunkter (riktig: skilt-til-skilt, ikke roadhouse-til-roadhouse)

| Endepunkt | Sted | Koordinater (DMS) | Koordinater (desimal) |
|---|---|---|---|
| **Øst** | Caiguna roadhouse | 32°16′08″S, 125°29′24″E | 32.26889°S, 125.49000°E |
| **Vest** | 90 Mile Straight West End-skilt | 32°27′15.76″S, 123°56′39.97″E | 32.45438°S, 123.94444°E |

MERK: Balladonia roadhouse ligger 7.9 km vest for skiltet, etter en sving. Den er IKKE en del av 90 Mile Straight.

### Måleresultat fra Google Earth

| Måling | Verdi |
|---|---:|
| Map Length | 146.70 km |
| Ground Length | 146.70 km |
| Heading | 82.35° (West End → Caiguna, mot øst) |

### Sammenligning mot målbåndet

| | Verdi |
|---|---:|
| Målbånd (offisiell 90 Mile = 146.6 km) | 146 600 m |
| Google Earth Ground Length | 146 700 m |
| **Differanse** | **+100 m (+0.068 %)** |

Vincenty-kontroll WGS84: 146 915 m. GE ligger 215 m under Vincenty — sannsynligvis fordi GE bruker en litt annen ellipsoide-bue.

Heading-presisjon: Vincenty initial bearing West End → Caiguna er 82.33° — GE rapporterer 82.35°, avvik 0.02°. Det betyr GE's koordinat-til-bearing-rutiner er WGS84-eksakte.

---

## #2 GAMMEL VERSJON (utdatert — for historikk)

**Det vi måler**: Den rette strekningen mellom Caiguna og Balladonia roadhouses, Vest-Australia.

### Endepunkter

| Endepunkt | Sted | Koordinater (desimal) | Koordinater (DMS) |
|---|---|---|---|
| **Vest** | Caiguna roadhouse | **32.26889°S, 125.49000°E** | 32°16′08″S, 125°29′24″E |
| **Øst** | Balladonia roadhouse | **32.45806°S, 123.86611°E** | 32°27′29″S, 123°51′58″E |

**Forventet Ground Length**: ~146.6 km

**NB om geografisk retning**: Eyre Highway går øst-vest. Caiguna ligger ØST for Balladonia (høyere lengdegrad). Forventet heading fra Caiguna til Balladonia: cirka 260° (vest-sydvest).

---

## #3 Trans-Australian Railway rette seksjon (SØLV, 478.193 km) — VERIFISERT

**Det vi måler**: Verdens lengste rette jernbanestrekning, mellom Mile 496 (mellom Ooldea og Watson, South Australia) og Mile 793 (mellom Loongana og Nurina, Western Australia).

### Endepunkter (brukerens egne avlesninger fra Google Earth)

| Endepunkt | Beskrivelse | Koordinater (DMS) | Koordinater (desimal) |
|---|---|---|---|
| **Øst** | "Longest Straight Historical Landmark" Nullarbor SA 5690 | 30°28′09.90″S, 131°37′40.18″E | 30.469417°S, 131.627828°E |
| **Vest** | Første visuelle vinkelendring | 30°58′33.53″S, 126°40′00.99″E | 30.975981°S, 126.666942°E |

Vest-endepunktet matcher Vincenty-prediksjon (30.97970°S, 126.66971°E) med kun 490 m visuell forskjell — landmåler-presisjon på 1907-1909 målingen.

### Måleresultat fra Google Earth

| Måling | Verdi |
|---|---:|
| Map Length | 478.39 km |
| Ground Length | 478.29 km (478 290 m) |
| Heading | 84.50° (vest → øst) |

### Sammenligning mot målbåndet

| | Verdi |
|---|---:|
| Målbånd (offisiell 478.193 km, 1907-1909 landmåling) | 478 193 m |
| Google Earth Ground Length | 478 290 m |
| **Differanse** | **+97 m (+0.020 %)** |

Map-Ground delta på 100 m matcher teoretisk chord-vs-arc differanse for WGS84 på denne avstanden (cirka 112 m teoretisk). Dette er den første strekningen hvor Map og Ground skiller seg fra hverandre — viktig kontrast mot pol-til-pol-målingen som viste Map=Ground=20003.12 km.

---

## #4 Highway 10 Saudi rette segment — VERIFISERT (259 km, ikke 240)

**Det vi måler**: Den ekte rette strekningen i Saudi-Arabia mellom første vinkelendring vest for Haradh og Highway 95-krysset i Al Batha-området.

### Endepunkter (brukerens egne avlesninger fra Google Earth)

| Endepunkt | Beskrivelse | Koordinater (DMS) | Koordinater (desimal) |
|---|---|---|---|
| **Vest** | Første visuelle vinkelendring (11.07 km vest for Haradh by) | 24°08′04.22″N, 48°59′58.64″E | 24.134506°N, 48.999622°E |
| **Øst** | Highway 95-krysset (Al Batha-området) | 24°08′53.88″N, 51°32′54.14″E | 24.148300°N, 51.548372°E |

### Måleresultat fra Google Earth

| Måling | Verdi |
|---|---:|
| Map Length | 258.97 km |
| Ground Length | 258.96 km (258 960 m) |
| Heading | 89.14° (vest → øst, nesten ren øst) |

### Sammenligning mot Vincenty-målbånd

| | Verdi |
|---|---:|
| Vincenty WGS84 (mellom de to endepunktene) | 259 057 m |
| Google Earth Ground Length | 258 960 m |
| **Differanse** | **−97 m (−0.037 %)** |

### Sammenligning mot tidligere oppgitte verdier

| Kilde | Verdi | Avvik fra GE 258.96 km |
|---|---:|---:|
| Guinness World Records ("240 km") | 240 000 m | −18 960 m (−7.3 %) |
| Folkelig ("256 km") | 256 000 m | −2 960 m (−1.2 %) |
| Vincenty (brukerens GE-endepunkter) | 259 057 m | +97 m (+0.04 %) |

**Tolkning**: Guinness' 240 km ser ut til å underestimere med 19 km. Folkelig 256 km er langt nærmere. Den ekte rette strekningen mellom brukerens to verifiserte vinkelendepunkter er 258.96 km. Heading 89.14° viser at veien går nesten perfekt øst-vest på 24°N.

---

## Foreslått måleprotokoll

For hver strekning:

1. **Sett startpunkt** ved Google Earths rette-linje-måleverktøy
2. **Sett endepunkt** ved motsatt ende
3. **Noter ned tre tall**:
   - Map Length (rett-linje-projeksjon)
   - Ground Length (langs jordoverflaten)
   - Heading (kompass-vinkel)
4. **Sammenlign mot målbåndet**:
   - Differanse i kilometer
   - Differanse i prosent
   - Antall Pontchartrain-er (km / 38.4048)

Jeg gjør beregningen når du gir meg tallene.

---

## Hva vi forventer å finne

**Pontchartrain (38 km)**: Google Earth bør gi cirka 38.40 km. Differanse mot målbåndet bør være under 100 m. Hvis ikke, er endepunktene ikke korrekt plassert.

**90 Mile Straight (146 km)**: Google Earth bør gi cirka 146.6 km. Differanse bør være under 1 km.

**Trans-Australian (478 km)**: Google Earth bør gi cirka 478 km på 'Ground Length'. Hvis Google Earth bruker WGS84-buet vei mens målbåndet er kjede-målt langs bakken, kan det være en differanse på noen hundre meter til noen km. Dette er den interessante testen — om kulemodellens "buet vei langs WGS84" gir samme tall som pre-GPS kjedemåling fra 1907-1909.

**Highway 10 (240 km)**: Google Earth vil sannsynligvis gi samme tall som Guinness fordi begge sannsynligvis er WGS84-baserte. Ikke en uavhengig test.

---

## Google Earth referansemålinger (samlet)

Disse er målt av brukeren i Google Earth og holdes som faste referansepunkter for senere analyse.

### Nordpol → polarsirkel (langs lengdegrad)

| Måling | Verdi |
|---|---:|
| Map Length | 2 618.60 km |
| Ground Length | 2 617.06 km |
| Heading | 351.91° |

### Polarsirkelen (sirkel-egenskaper i Google Earth)

| Egenskap | Verdi |
|---|---:|
| Radius | 2 618.45 km |
| Areal | 21 050 953 km² |
| Omkrets | 15 992.42 km |

### Nordpol → Sydpol (langs lengdegrad, halv meridian)

| Måling | Verdi |
|---|---:|
| Map Length | 20 003.12 km |
| Ground Length | 20 003.12 km (bekreftet) |
| Heading | 190° |

**Notater til pol-til-pol-målingen**:
- 20 003.12 km matcher WGS84 halv polar-omkrets (20 003.93 km) med 0.81 km avvik — cirka 40 ppm.
- Meteren ble opprinnelig definert (1791) slik at avstanden fra Nordpolen til ekvator skulle være eksakt 10 000 km. Dobbel verdi = 20 000 km. Google Earths 20 003.12 km ligger 3.12 km over denne definisjonen, fordi WGS84-ellipsoiden er litt avplattet ved polene.
- En flat skive med R = 10 000 km predikerer eksakt 20 000.00 km mellom polene (hvis Sydpolen tolkes som ytre kant på AE-skiven). Avvik mot Google Earth: 3.12 km / 156 ppm.
- Begge modeller treffer innenfor under én promille — denne målingen alene skiller ikke modellene.

### Polarsirkel-radius i tre tolkninger

| Tolkning | Verdi | Hva det betyr |
|---|---:|---|
| Bue langs jorden (Google Earth Ground) | 2 617.06 km | Slik et målbånd langs bakken ville målt på en buet flate |
| Rett linje gjennom rommet (chord) | ca. 2 600 km | Tunnel under bakken på kule |
| Top-down projeksjon (skive sett ovenfra) | ca. 2 537 km | Som AE-projeksjon viser fra rommet |

Vi venter med samlet tolkning til vi har målbåndets fire strekninger sjekket på Google Earth — da har vi flere datapunkter å analysere sammen.
