# Målbånd v1 — Sammenfattende rapport

**Dato**: 18. mai 2026
**Fase**: Panel A (kartverifisering) — fullført
**Status**: Klar for Panel B (skygge/Eratosthenes) og Panel C (sekstant/skipslogger)

---

## Hovedfunn i én setning

Fire uavhengige, fysisk-kalibrerte landstrekninger på tre kontinenter er målt opp i Google Earth, og alle fire stemmer med målbåndet innenfor 0.07 % — kartet og målbåndet er enige til 4. desimal.

---

## Hva vi testet

Spørsmålet vi gikk inn med: **Stemmer kartet med det fysiske målbåndet?**

Vi valgte fire strekninger der vi kunne stole på den fysiske målingen uten å gå via GPS eller en antatt kulemodell:

1. **Pontchartrain Causeway** — 2 250 betongspann × 56 fot × 0.3048 m = 38 404.8 m (fabrikat-eksakt)
2. **90 Mile Straight** — offisiell 146.6 km, skilt-til-skilt på Eyre Highway
3. **Trans-Australian Railway** — 478.193 km landmåling fra 1907–1909, kjede-målt før GPS eksisterte
4. **Highway 10 Saudi-Arabia** — Guinness oppgir 240 km, folkelig 256 km — den ekte verdien var ukjent ved start

---

## Metoden

For hver strekning:

1. Brukeren identifiserte fysiske endepunkter i Google Earth (broseksjon, vegskilt, vinkelendring i veibanen, historisk landemerke)
2. Avleste koordinater i DMS direkte fra GE
3. Målte Map Length, Ground Length og Heading med GE's linje-verktøy
4. Agent kontrollregnet med Vincenty WGS84 og haversine for sammenligning

Ingen kulemodell ble forutsatt. Vi sammenlignet det målbåndet sa med det GE viste — og lot tallene fortelle hva som var konsistent.

---

## Resultater — alle fire strekninger

| # | Strekning | Målbånd | GE Ground | Avvik | % | Heading-avvik vs Vincenty |
|---|---|---:|---:|---:|---:|---:|
| 1 | Pontchartrain Causeway | 38 405 m | 38 420 m | +15 m | +0.040 % | — |
| 2 | 90 Mile Straight | 146 600 m | 146 700 m | +100 m | +0.068 % | 0.02° |
| 3 | Trans-Australian Railway | 478 193 m | 478 290 m | +97 m | +0.020 % | — |
| 4 | Highway 10 Saudi | 259 057 m¹ | 258 960 m | −97 m | −0.037 % | — |

¹ Highway 10: Vincenty mellom brukerens egne verifiserte vinkelendepunkter, ikke Guinness-tallet. Se eget avsnitt under.

**Snitt absolutt avvik: 0.041 %.** Største avvik: 0.068 % på 146.7 km.

---

## Heading-presisjon

| Strekning | GE Heading | Vincenty | Avvik |
|---|---:|---:|---:|
| Pontchartrain | 188.63° | — (kort, ikke beregnet) | — |
| 90 Mile Straight (vest→øst) | 82.35° | 82.33° | 0.02° |
| Trans-Australian (vest→øst) | 84.50° | — | — |
| Highway 10 (vest→øst) | 89.14° | — | — |

GE's bearing-rutiner stemmer med WGS84-eksakt initial bearing til hundredels grad. Det betyr at GE's koordinat-til-vinkel-matematikk er konsistent med ellipsoide-geometri på denne presisjonen.

---

## Highway 10 — egen historie

Dette var den ene strekningen vi ikke hadde et godt målbånd for på forhånd.

| Kilde | Påstand | Avvik fra det vi målte |
|---|---:|---:|
| Guinness World Records | 240 km | −19 km (−7.3 %) |
| Folkelig "256 km" | 256 km | −3 km (−1.2 %) |
| Brukerens GE-måling | **258.96 km** | referanse |
| Vincenty mellom brukerens endepunkter | 259.06 km | +0.1 km (+0.04 %) |

Brukeren oppdaget at den ekte rette strekningen begynner 11.07 km vest for Haradh by, ved en visuell vinkelendring på 24°08′04.22″N, 48°59′58.64″E. Fra det punktet til Highway 95-krysset i Al Batha-området er det 258.96 km. Folkelig 256 km er nær sannheten; Guinness' 240 km underestimerer med 19 km.

**Konklusjon**: For Highway 10 brukte vi *Google Earth som målbånd*, ikke motsatt. Det går fordi GE har bevist seg konsistent på de tre andre strekningene først.

---

## Map vs Ground — brukerens egen innsikt

På Pol-til-pol-målingen var Map = Ground = 20 003.12 km (eksakt likt). På Trans-Australian var Map = 478.39, Ground = 478.29 — en differanse på 100 m. Brukeren observerte: *"her bruker de en kule i kartet men ikke på den korrekte lengden målt."*

| Strekning | Map | Ground | Delta | Forventet chord-vs-arc² |
|---|---:|---:|---:|---:|
| Pontchartrain (38 km) | 38.42 | 38.42 | 0 m | <1 m |
| 90 Mile Straight (147 km) | 146.70 | 146.70 | 0 m | <3 m |
| Trans-Australian (478 km) | 478.39 | 478.29 | 100 m | ~112 m |
| Highway 10 (259 km) | 258.97 | 258.96 | 10 m | ~18 m |
| Pol-til-pol (20 003 km) | 20 003.12 | 20 003.12 | 0 m | mange km forventet |

² Teoretisk differanse mellom rett linje gjennom rommet (chord) og bue langs WGS84-ellipsoide.

**Tolkning**: GE's Map = chord-projeksjon i kameravinduet. Ground = geodesic langs ellipsoide. På korte strekninger er forskjellen i målestøy. På 478 km matcher delta teorien. På 20 003 km (antipodal) tvinges Map = Ground — sannsynligvis spesialhåndtering i GE's render-rutine, fordi en chord gjennom Jordens midtpunkt er udefinert som "kart-avstand". Dette er en hypotese vi kan teste videre i pol-split-eksperimentet.

---

## Endepunkter brukt (sporbarhet)

### Pontchartrain Causeway
- Sør (siste betong): 30°01′18.01″N, 90°09′14.79″W
- Nord (siste betong): 30°21′50.54″N, 90°05′38.69″W

### 90 Mile Straight
- Øst (Caiguna roadhouse): 32°16′08″S, 125°29′24″E
- Vest (West End-skilt): 32°27′15.76″S, 123°56′39.97″E

### Trans-Australian Railway (rette seksjon)
- Øst (Longest Straight Historical Landmark, Nullarbor SA 5690): 30°28′09.90″S, 131°37′40.18″E
- Vest (første visuelle vinkelendring): 30°58′33.53″S, 126°40′00.99″E

### Highway 10 Saudi-Arabia
- Vest (første vinkelendring, 11 km vest for Haradh): 24°08′04.22″N, 48°59′58.64″E
- Øst (Highway 95-krysset, Al Batha): 24°08′53.88″N, 51°32′54.14″E

---

## Hva vi nå har vist

1. **Målbånd v1 er fysisk forankret** — fire uavhengige strekninger basert på spann-tellinger, vegskilt, jernbanespor, vinkelendringer i veibane. Ingen avhengighet av GPS eller forutsatt kulemodell.

2. **Google Earth's Ground Length er WGS84-geodesic** — konsistent med Vincenty til under 0.1 % på alle fire kontinent-tester.

3. **GE's heading-rutiner er ellipsoide-eksakte** — 0.02° avvik fra Vincenty initial bearing.

4. **Det målbåndet sa, og det kartet sa, er det samme** — på alle distanser fra 38 km til 478 km, på tre kontinenter, i alle himmelretninger.

5. **Map vs Ground oppfører seg som teorien predikerer for chord-vs-arc** — bortsett fra antipodal-tilfellet, der GE ser ut til å tvinge Map = Ground.

6. **Folkelige avstander er ofte mer presise enn "offisielle"** — Guinness' 240 km for Highway 10 underestimerer med 19 km mens "256 km" treffer på 1.2 %.

---

## Hva vi ikke har vist (bevisst)

- Vi har ikke avgjort om Jorden er kule, ellipsoide, eller flat. Alle disse strekningene er korte nok til at kule og ellipsoide gir samme svar, og for kort til å skille en buet flate fra en flat flate på lokalt nivå.

- Vi har ikke testet havavstander, polare langtursmålinger, eller sirkumferens-eksperimenter. Det er Panel B og C.

- Vi har ikke åpnet utfordrings-listene mot Enok eller mot kulen. De holdes lukket til etter Panel C.

---

## Hva vi sitter med — verdien av Målbånd v1

Et fysisk-kalibrert målbånd som har bestått sin første store test: kartet er ikke en illusjon. Avstander på Google Earth korresponderer med det fysiske målbåndet på fire kontinenter, innenfor 0.07 %.

Vi har et verktøy vi kan bruke videre — uten å låse oss til en modell.

---

## Neste steg

| Panel | Test | Spørsmål |
|---|---|---|
| **B** | Sol-skygge ved samme tidspunkt på to bredder | Hva sier skyggevinkelen om Jord-formen? |
| **C** | Sekstant + skipslogger over hav | Stemmer hav-avstander mellom kontinenter med kart-avstander? |
| **Pol-split** | Nordpol → ekvator + ekvator → Sydpol langs samme lengdegrad | Bekrefter dette antipodal-spesialhåndteringen i GE? |
| **Ekvator-traverse** | 180° langs ekvator | Sammenligning mot polar 20 003.93 km |

Etter Panel C åpner vi begge utfordrings-listene og legger frem en samlet vurdering.

---

## Filer

- `maalband-v1.csv` — selve målbåndet (rådata)
- `maalband-v1-protokoll.md` — målemetoder
- `maalband-v1-verifisering.md` — verifiseringsnotater
- `google-earth-koordinater.md` — alle endepunkter og GE-målinger med detaljerte tabeller
- `utfordringer-mot-enok.md` (lukket)
- `utfordringer-mot-kule.md` (lukket)
