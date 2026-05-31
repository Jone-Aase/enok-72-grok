# Tropic of Cancer & Capricorn — GE-verifikasjon

**Dato startet**: 18. mai 2026
**Metode**: Identisk med ekvator-testen — plotte fysiske monumenter på GE, verifisere avvik fra GE-bredegrad, deretter verifisere lengdegrader via solens posisjon kl 12 lokalt midt på dagen

---

## Teoretisk ramme — det avgjørende spørsmålet

Brukerens innsikt: Hvis Enoks modell stemmer, skal Tropic of Capricorn ha **større omkrets** enn ekvator (fordi det ligger lengre ut fra Nordpolen). Hvis kule-modellen stemmer, skal Capricorn ha **mindre omkrets** enn ekvator (fordi det ligger nærmere sydpolen og kulen smalner).

Dette er en avgjørende test som modellene gir motsatte prediksjoner for.

### Matematiske prediksjoner (23.44° fra ekvator)

| Sted | Kule-modell omkrets | AE-Enok omkrets | Forskjell |
|---|---:|---:|---:|
| Ekvator (0°) | 40 075.02 km | 40 075.02 km* | 0 |
| Tropic of Cancer (23.44°N) | 36 768.14 km | 46 468.18 km | +26.4% |
| Tropic of Capricorn (23.44°S) | 36 768.14 km | 79 195.40 km | +115% |

*På AE-flat er ekvator radius = avstand fra Nordpol = 10 000 km. 2π·10 000 = 62 832 km, ikke 40 075 km. Hvis ekvator stemmer med 40 075 km, må AE-modellen kalibreres ut fra dette — i hvilket tilfelle prediksjonen for Capricorn endrer seg. Dette må vi komme tilbake til.

### Kule-modellens omkrets ved breddegrad lat
omkrets(lat) = 2·π·a·cos(lat)
hvor a = WGS84 ekvator-radius = 6 378.137 km

### AE-Enok modellens omkrets ved breddegrad lat
Radius fra Nordpol = (90° - lat) · 111.111 km
Omkrets = 2·π·radius

---

## Tropic of Cancer (23°26'21" N = 23.4392°N)

### Kandidatmonumenter

#### Cancer #1: Ruisui Marker, Taiwan
- **Kilde**: Wikipedia (Ruisui Tropic of Cancer Marker)
- **Oppgitt koordinat**: 23°27'55.8"N, 121°21'28.2"E (23.465500°N, 121.357833°E)
- **Merknad**: Wikipedia oppgir at koordinatene viser monumentets faktiske plassering — som ligger litt nord for den teoretiske linja (2026-epoke ~23.436°N). Avvik ca. 3.2 km nord.
- **Bygd**: 1933 (japansk koloniperiode)

#### Cancer #2: Baja California Sur, Mexico
- **Kilde**: kathrynreed.com
- **Beskrivelse**: Plaza ved km 82 på Highway 1, øst av Santiago. Bygd 2013.
- **Mer presis koordinat trengs** — du må slå opp i GE

#### Cancer #3: Western Sahara/Algeria (Budapest-Bamako road sign)
- **Kilde**: Wikipedia
- **Beskrivelse**: Veiskilt sør for Dakhla, Vest-Sahara
- **Koordinatestimat**: 23.433°N, langs 16°W-meridianen — usikkert

#### Cancer #4: Mehsana, Gujarat, India
- **Kilde**: Wikipedia
- **Beskrivelse**: Veiskilt nær Mehsana by
- **Mer presis koordinat trengs**

### Plotting-protokoll
1. Du finner monumentet i Google Earth Pro
2. Avles koordinater
3. Mål avvik fra GE-ekvator-linja for breddegrad 23.4392°N
4. Logger her med eksakt koordinat og avvik

### Resultater — 19 punkter samlet rundt jorden

Bruker har plottet 19 punkter rundt Tropic of Cancer i Google Earth Pro. 14 av dem ligger innenfor 30 km av den teoretiske linja (Cancer 2026 = 23.435910°N).

| # | Sted | Land | Lengdegrad | Breddegrad | Avvik fra Cancer 2026 |
|---|---|---|---:|---:|---:|
| 1 | Cabo San Lucas Trópico monument | Mexico | 109.7031°W | 23.44787°N | 1 330 m nord |
| 2 | Kauai, Lihue | Hawaii | 159.3510°W | 21.96519°N | 163 454 m sør |
| 3 | Havana | Cuba | 82.3678°W | 23.13775°N | 33 137 m sør |
| 4 | George Town | Bahamas | 75.7671°W | 23.50021°N | 7 146 m nord |
| 5 | Hay AL HASSANI | Vest-Sahara | 15.9303°W | 23.71469°N | 30 984 m nord |
| 6 | Algerie-punkt | Algerie | 2.6729°E | 23.50005°N | 7 128 m nord |
| 7 | AlKufra Airport | Libya | 23.3153°E | 24.18096°N | 82 804 m nord |
| 8 | North Nabta Playa #1 | Egypt | 30.7257°E | 22.50790°N | 103 138 m sør |
| 9 | Rødehavet øy | Egypt | 36.1961°E | 23.60736°N | 19 054 m nord |
| 10 | Al Qou' | UAE | 55.4113°E | 23.45005°N | 1 572 m nord |
| 11 | Fortress Murri | Oman | 56.2196°E | 23.45001°N | 1 567 m nord |
| 12 | Playground Dabah | Oman | 57.0374°E | 23.45946°N | 2 617 m nord |
| 13 | Alhail Mosque | Oman | 57.1139°E | 23.45037°N | 1 607 m nord |
| 14 | Wadi Al Maawil | Oman | 57.3178°E | 23.45094°N | 1 671 m nord |
| 15 | Sifah Off-roading | Oman | 57.8141°E | 23.45012°N | 1 579 m nord |
| 16 | Ashapura Camp (Oman) | India* | 58.7813°E | 23.43536°N | 61 m sør |
| 17 | Haripar Hindu temple | India | 70.7752°E | 23.45062°N | 1 634 m nord |
| 18 | Mojiang Garden Tropic Symbol | Kina | 101.7284°E | 23.48130°N | 5 045 m nord |
| 19 | Ruisui Marker | Taiwan | 121.3579°E | 23.46546°N | 3 285 m nord |

*Note: "Ashapura Camp" har koordinat 58.78°E som er i Oman, ikke India — koordinaten lengst øst i Oman-klyngen, men adressen sier India. Mest sannsynlig adresse-feil.

### Øst-vest spenn og total avstand

- Vest-ligste punkt: **Kauai 159.35°W**
- Øst-ligste punkt: **Ruisui 121.36°E**
- Total spenn: **280.71°** (77.97% av jorden)
- Punkter innenfor 30 km av Cancer-linja: **14 av 19** (74%)

### Vincenty WGS84-avstand mellom konsekutive nær-Cancer-punkter (231.06° spenn)

| Fra | Til | Avstand |
|---|---|---:|
| Cabo San Lucas | George Town | 3 458.66 km |
| George Town | Algerie | 7 894.51 km |
| Algerie | Rødehavet | 3 414.70 km |
| Rødehavet | Al Qou' UAE | 1 960.83 km |
| Al Qou' | Fortress Murri | 82.60 km |
| Fortress Murri | Playground Dabah | 83.56 km |
| Playground Dabah | Alhail Mosque | 7.88 km |
| Alhail Mosque | Wadi Al Maawil | 20.84 km |
| Wadi Al Maawil | Sifah Off-roading | 50.71 km |
| Sifah Off-roading | Ashapura Camp | 98.85 km |
| Ashapura Camp | Haripar Hindu temple | 1 225.24 km |
| Haripar Hindu temple | Mojiang Garden | 3 156.16 km |
| Mojiang Garden | Ruisui Marker | 2 003.81 km |
| **Total (231.06°)** | | **23 458 km** |

### Den avgjørende sammenligningen

Ekstrapolert til full omkrets ved Cancer (360°):

- **Brukerens observerte data**: 23 458 km / 231.06° × 360° = **36 548 km**
- **Kule-modell forutsier**: 36 768 km
- **AE-Enok modell forutsier**: 46 468 km

| Modell | Forutsigelse | Avvik fra observasjon |
|---|---:|---:|
| Kule (WGS84) | 36 768 km | −0.60% |
| AE-Enok (flat) | 46 468 km | −21.35% |

**Kule-modellen er innenfor 0.6%. AE-Enok-modellen feiler med 21%.**

### Tolkning

Dette er en kraftig test som favoriserer kule-modellen. Brukerens 14 GE-verifiserte punkter, plottet uavhengig av kjent modell-prediksjon, gir en omkrets ved 23.44°N som er 36 548 km ± 0.6% av kule-prediksjonen. AE-Enok-modellen i klassisk form (radius fra Nordpol = 90° × 111.111 km/grad) forutsier 27% mer omkrets enn det vi ser.

Dette støtter brukerens egen prediksjon at "sør for ekvator skal AE-modellen sprekke fordi diameteren der skal være større" — men det viser også at Cancer (nord) allerede gir et problem for AE-modellen. 

**Åpne spørsmål**:
1. Hvordan ser Map vs Ground ut for disse strekningene i GE?
2. Er det noen monumenter med bedre astronomisk validering enn de turist-plasserte (Cabo, Mojiang, Ruisui)?
3. Hva sier den parallelle Capricorn-testen?

---

## Tropic of Capricorn (23°26'10.6" S = 23.4363°S)

**Dette er den avgjørende testen**

### Kandidatmonumenter

#### Capricorn #1: Alice Springs, Australia
- **Kilde**: Wikipedia, Tripadvisor
- **Beskrivelse**: Monument 30 km nord for Alice Springs, langs Stuart Highway
- **Koordinatestimat**: ca. 23.4363°S, 133.88°E
- **Bygd**: 1988 (Australias bicentennial)

#### Capricorn #2: Antofagasta, Chile
- **Kilde**: Wikipedia
- **Beskrivelse**: Monument like nord for Antofagasta
- **Koordinatestimat**: 23.4363°S, ca. 70.6°W

#### Capricorn #3: Maringá, Brasil
- **Kilde**: Wikipedia
- **Beskrivelse**: Markør i Maringá by, Paraná-staten
- **Koordinatestimat**: 23.4363°S, ca. 51.94°W

#### Capricorn #4: Longreach, Queensland, Australia
- **Kilde**: Wikipedia
- **Beskrivelse**: Monument ved Civic Centre, "et par buesekunder sør for linja" — fotografert ved sommersolverv-middag
- **Koordinatestimat**: ca. 23.44°S, 144.25°E

#### Capricorn #5: Gracemere, Queensland, Australia
- **Kilde**: Tripadvisor
- **Adresse**: 4 Ranger St, Gracemere QLD 4702

### Resultater (fylles ut)

| Sted | Land | Koordinat | Avvik fra 23.4363°S | Verifisert |
|---|---|---|---:|---|
| Alice Springs | Australia | TBD | TBD | ⬜ |
| Antofagasta | Chile | TBD | TBD | ⬜ |
| Maringá | Brasil | TBD | TBD | ⬜ |
| Longreach | Australia | TBD | TBD | ⬜ |

---

## Steg 2: Lengdegrad-verifikasjon med solens posisjon

**Brukerens metode**: Etter vi har plottet monumentene på samme breddegrad, verifisere at lengdegradene faktisk ligger der GE viser, ved å bruke solens posisjon kl 12 midt på dagen rett i syd på vintersolverv (21. desember).

### Logikk
- På vintersolverv står sub-solar-punktet på Tropic of Capricorn (23.44°S)
- For et sted på Cancer (23.44°N) er solen 46.88° fra zenit ved lokal middag
- Solen står da nøyaktig rett i syd
- Dette gir en uavhengig solbasert verifikasjon av at lengdegraden er der den skal være — uten å bruke GPS, kun klokken og kompasset
- Tilsvarende på Capricorn 21. juni (sommersolverv): solen står da nøyaktig rett i nord ved lokal middag

### Hvorfor brukeren velger vintersolverv for Cancer
"Det er lettest å finne eksakt syd denne datoen på breddegrader over ekvator" — fordi solen står lavt nok over horisonten til at peilingen kan gjøres uten å se rett opp.

---

## Status

- [x] Matematisk ramme satt opp
- [x] Kandidatmonumenter identifisert (4 Cancer, 5 Capricorn)
- [ ] Du plotter monumentene i GE og avlese koordinater
- [ ] Logger avvik
- [ ] Verifiserer lengdegrad via solposisjon
- [ ] Den avgjørende sammenligningen Cancer vs Capricorn
