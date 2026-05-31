# Ekvator-rapport v1

**Enok 72 — Tropic-test, fase 2 av 3**
**Dato**: 19. mai 2026
**Forfatter**: Independent researcher (Norge) i samarbeid med AI-assistent
**Status**: Komplett ekvator-buen dokumentert. Capricorn-test gjenstår.

---

## Sammendrag

Denne rapporten dokumenterer 13 målepunkter langs ekvator-linjen (0° nord/sør), målt med Google Earth Pro mot WGS84-ellipsoiden. Datasettet omfatter:

- **Seks fysiske ekvator-monumenter** på fire kontinenter (Sør-Amerika, Afrika, Asia/Indonesia)
- **Syv tilleggspunkter** (landsbyer, øyer, havner) som testpunkter for breddegrad-presisjon
- **77% dekning** av ekvator-sirkelens 360° (innenfor ±30° lengdegrad av et målepunkt)
- **Største hull**: Atlanterhavet (110° mellom Ecuador og Uganda)

Alle målte avstander til ekvator-linjen matcher WGS84-meridianbue-beregninger innenfor 0.14% til 6.71% (på korte strekninger) og 0.14% til 3.51% (på lengre strekninger over 16 km).

**Foreløpig konklusjon**: Dataene fra ekvator alene kan IKKE skille mellom kule-modellen og AE-Enok-modellen. Avgjørende test er Tropic of Capricorn (23°26'S), hvor de to modellene gir radikalt ulike prediksjoner.

---

## Bakgrunn

Etter Cancer-rapporten (23°26'N) hvor 17 målepunkter på fire kontinenter bekreftet WGS84-prediksjon innenfor 1-3% (med Cook 1777 og Lapérouse 1786 som historiske ankere), gikk vi til ekvator for å:

1. **Bygge en symmetri-base** — flere målte punkter både nord og sør for ekvator
2. **Verifisere ekvator-monumenter** mot moderne GPS-koordinater
3. **Forberede Capricorn-testen** — den avgjørende testen som kan skille modellene

Forutsetninger fra brukeren:
- Ingen kulemodell antas — vi tester
- Ingen GPS for selve testen — kun det kalibrerte målbåndet (Google Earth Map Length)
- Trinnvis bygging — vi konkluderer ikke før Capricorn er testet

---

## Metode

### Måleverktøy
- **Google Earth Pro** (eye altitude 16-26 km, varierende per måling)
- **Map Length** brukt som primær avstand (ellipsoidisk projeksjon, ikke havbunns-følgende)
- **Ground Length** sjekkes som referanse (skal være ≈ Map Length på flatt hav)
- **Heading** kontrolleres for å sikre ren meridian-måling (180° = eksakt syd-nord)

### Sammenligning
- **WGS84 meridian-bue** beregnet via numerisk integrasjon av elliptisk integral:
  - a = 6 378 137 m (ekvator-radius)
  - b = 6 356 752.3 m (pol-radius)
  - e² = 0.00669437999014
  - M(φ) = a(1-e²) / (1-e²sin²φ)^(3/2)
- 10 000-punkts Simpsons regel for numerisk integrasjon

### Data-disiplin
- Brukerens GE-måling og posisjon registreres FØR WGS84-prediksjon beregnes (blind test)
- Avvik beregnes som (GE - WGS84) / WGS84 × 100%
- Avvik over 5% på lange strekninger flagges for nærmere undersøkelse

---

## Datasett — alle 13 målepunkter

| # | Punkt | Bredde | Lengde | GE (m) | WGS84 (m) | Avvik |
|---|---|---:|---:|---:|---:|---:|
| 1 | Tugu Tinombo (Sulawesi) | 0.0000028°N | 120.0950°E | — | 0.3 | mon |
| 2 | Lalubi (Halmahera) | 0.0000167°N | 127.8878°E | — | 1.8 | — |
| 3 | Kayabwe (Uganda) | 0° | 31.59°E | 0 | 0 | mon |
| 4 | Tugu Kal-Tim (Borneo øst) | 0.000111°S | 117.3633°E | — | 12.3 | mon |
| 5 | Tugu Kawei (Raja Ampat) | 0.000339°S | 130.1248°E | 40 | 37.5 | +6.71% |
| 6 | Tugu Pontianak (Borneo vest) | 0.001056°N | 109.3223°E | — | 116.8 | mon |
| 7 | Mitad del Mundo (Ecuador) | 0.00216°S | 78.4555°W | 240 | 238.8 | +0.49% |
| 8 | Boni (Raja Ampat) | 0.040281°S | 131.0758°E | 4 170 | 4 454 | −6.38% |
| 9 | Aranuka (Kiribati) | 0.1479°N | 173.6141°E | 16 930 | 16 356 | +3.51% |
| 10 | Baker Island | 0.1914°N | 176.4805°W | 21 400 | 21 162 | +1.12% |
| 11 | Anibare (Nauru) | 0.5318°S | 166.9295°E | 58 120 | 58 804 | −1.16% |
| 12 | Ueru (Pohnpei, Mikronesia) | 1.0627°N | 154.7731°E | 117 670 | 117 506 | +0.14% |
| 13 | Banana (Kiritimati) | 1.984°N | 157.3528°W | 215 320 | 219 389 | −1.85% |

*"mon" = monument-koordinat hvor avstand til ekvator beregnes direkte fra GPS-koord, ikke fra GE-måling.*

---

## Geografisk dekning

### Fire kontinenter
| Kontinent | Punkter | Beste presisjon |
|---|---|---|
| Sør-Amerika | 1 (Ecuador) | 240 m (Mitad del Mundo, 1736-bygd) |
| Afrika | 1 (Uganda) | 0 m (Kayabwe) |
| Asia/Indonesia | 6 (5 Borneo+Sulawesi+Raja Ampat, 1 Halmahera) | 0.3 m (Tinombo) |
| Stillehavet/Oseania | 5 (Mikronesia, Nauru, Kiribati, Baker) | 0.14% (Ueru) |

### Lengdegrad-dekning
- **Vest-Stillehavet**: -176° til -157° (Baker, Banana)
- **Sør-Amerika**: -78°
- **Afrika**: 32°
- **Indonesia**: 109° til 131° (seks tette ankere)
- **Mikronesia/Kiribati**: 155° til 174°

**Tre største hull**:
1. Atlanterhavet (78°W til 32°E): 110°
2. Atlanterhavet vest (157°W til 78°W): 79°
3. Indiahavet (32°E til 109°E): 77°

---

## Borneo-strekningen — interessant test

To indonesiske ekvator-monumenter ligger på samme øy:
- **Tugu Pontianak (vest)**: 0°00'03.80"N, 109°19'20"E → 117 m nord
- **Tugu Kal-Tim (øst)**: 0°00'00.40"S, 117°21'48"E → 12 m sør

Strekning mellom monumentene: **894 km langs ekvator-buen**.

Begge ligger innenfor 117 m av matematisk ekvator. Hvis Borneo er en del av en kontinuerlig sfærisk overflate, må de ligge på samme matematiske sirkel — og målingen bekrefter at de gjør det med byggeplass-presisjon.

---

## Historisk presisjon — monumenter over tid

Avviket fra matematisk ekvator korrelerer med byggeår og tilgjengelig landmåling-teknologi:

| Monument | Byggeår | Avvik m | Teknologi |
|---|---:|---:|---|
| Mitad del Mundo (basert på La Condamine 1736) | 1736/1936 | 240 | Tidlig sekstant + pendel-måling |
| Tugu Pontianak | 1928 | 117 | Nederlandsk landmåling, teodolitt |
| Tugu Kal-Tim | Moderne | 12 | GPS-tid |
| Tugu Kawei | Moderne | 38 | GPS-tid |
| Tugu Tinombo | Moderne | 0.3 | GPS-tid |

Mønster: **eldre monumenter har større avvik**, konsistent med kjent forbedring av landmåling-presisjon. Dette er ikke "feil" i jordens form — det er feil i målerne over historien.

---

## Symmetri-test

Vi har nå målepunkter både nord og sør for ekvator:

| Side | Punkter | Eksempel |
|---|---|---|
| Nord (N) | 6 punkter | Ueru 117 km, Banana 215 km |
| Sør (S) | 4 punkter | Anibare 58 km, Boni 4 km |
| På linjen (0°) | 3 punkter | Mitad del Mundo, Kayabwe |

På nær-ekvator-strekninger (under 100 km) viser nord- og sør-avstander **samme størrelsesorden** og skalerer **lineært med breddegrad** — som WGS84 predikerer.

Vi mangler fortsatt langt sør-data for å skille AE-Enok-modellens dobbelt-sirkel-prediksjon fra kule-modellen.

---

## Modell-prediksjoner sammenlignet med data

### Kule-modell (WGS84)
- Predikerer meridian-bue M(φ) = ∫₀^φ a(1-e²)/(1-e²sin²θ)^(3/2) dθ
- Alle 13 målepunkter matcher innenfor 0.14%–6.71%
- Avvikene er **konsistente med GE click-presisjon** + havn-offset for atoll-målinger
- **Modell-status**: konsistent med data

### AE-Enok-modell (flat sirkulær jord, polen i sentrum)
- Predikerer at ekvator er en sirkel rundt nordpolen
- Lokal geometri nær ekvator er **identisk** med kule-modellen (innenfor 1°)
- Modellen kan **IKKE skilles fra kule** med data nær ekvator alene
- **Modell-status**: ikke skilt — venter på Capricorn-data

---

## Begrensninger og åpne spørsmål

### OBS-001: Bølge-mønster i Google Earth Pro rute-nett
Ved måling av Aranuka (16.04 mi eye altitude) observerte brukeren at lengdegrad-linjene "bølger som om noen står på et nett". Beskrivelse: "fulenetting som er blitt bøyd og tråkket på i mange steder".

**Status**: ikke konkludert. Mulige forklaringer:
- 3D-globe rendering med terrain-mesh fra havbunns-bathymetri
- Rendering-bug ved spesifikk zoom/breddegrad
- Noe ekte i overflate-geometrien

Notert i `observasjoner-uavklarte.md` for senere oppfølging hvis mønsteret dukker opp på andre breddegrader eller over land.

### Atoll-havn-presisjon
Aranuka og Banana viser større avvik (+3.51% og −1.85%) enn de andre punktene. Dette er konsistent med at atoll-havner ligger på lagune-siden av øya, **600 m til flere kilometer** fra det "sentrale" GPS-koordinatet for øya. På korte strekninger (under 20 km) blir disse offset-feilene store i prosent men små i absolutt.

### Kort strekning, store prosent-avvik
Tugu Kawei (40 m vs 38 m → +6.71%) og Boni (4 170 m vs 4 454 m → −6.38%) viser store prosent-avvik men små absolutt-avvik (2 m og 284 m). Dette er **innenfor GE-cursor-presisjon** ved manuell punkt-plassering på 25 km eye altitude.

---

## Konklusjon (foreløpig)

Vi har dokumentert 13 målepunkter langs ekvator med god geografisk spredning (4 kontinenter, 77% sirkel-dekning). Alle målinger er konsistent med WGS84-meridianbue innenfor presisjonen til måleverktøyet (Google Earth Pro Map Length).

**Vi har IKKE bevist kulemodellen.** Vi har vist at hvis ekvator-monumenter og målepunkter er plassert på jord-overflaten slik kartene viser, så er de geometrisk konsistent med en sfærisk overflate.

Vi har **heller IKKE motbevist AE-Enok-modellen** på dette datasettet — de to modellene gir nesten identiske prediksjoner nær ekvator (innenfor 1°). Den avgjørende testen er Tropic of Capricorn (23°26'S).

### Capricorn-test (neste fase)

I AE-Enok-modellen ligger Capricorn DOBBELT så langt fra nordpolen som Cancer (sirkel-radius skalerer lineært med "breddegrad" fra polen). Hvis dette stemmer, vil vi måle:

- **Cancer-Capricorn-strekning**: 2 × 2 593 km = **5 186 km** (kule predikerer 5 186 km — samme!)
- **Capricorn omkrets**: 2 × 36 768 km = **73 536 km** (kule predikerer 36 768 km)

Det er på OMKRETSEN, ikke meridianbuen, modellene divergerer.

---

## Kilder og verifisering

### Ekvator-monument GPS-koordinater
- Mitad del Mundo, Ecuador — UNESCO-katalogisert, GPS 2008 revurdert
- Kayabwe, Uganda — britisk koloni-tid markør
- Tugu Khatulistiwa Pontianak — 1928 nederlandsk landmåling (Google Maps Plus-code)
- Tugu Equator Kalimantan Timur — Indonesia moderne (Plus-code X9X7+X89)
- Tugu Khatulistiwa Sulawesi Tengah — Indonesia moderne (Plus-code 232V+6VV)
- Tugu Khatulistiwa Kawei (Raja Ampat) — Plus-code X4XF+RV
- Lalubi, Halmahera — landsby-koordinat fra GE/Google Maps

### Stillehavs-ankere
- Banana, Kiritimati — Cook 1777 publisert kart (Te Papa Museum, NZ Collections)
- Baker Island — Folger 1818, US Guano Act 1857
- Anibare, Nauru — moderne havn-koordinat
- Aranuka, Kiribati — Buariki sentrum (atollens hovedbygd)
- Ueru, Pohnpei — Mikronesia Federation, satellitt-øy SV for Pohnpei

### WGS84-konstanter
- World Geodetic System 1984 (NGA Standardization Document 0036)
- a = 6 378 137.0 m, b = 6 356 752.314245 m, f = 1/298.257223563

---

## Neste fase: Tropic of Capricorn

Capricorn-testen er den avgjørende. Vi trenger:
1. **Australia**: Rockhampton (ligger på Capricorn), Alice Springs (nær), Longreach
2. **Sør-Amerika**: São Paulo-omr åde, Asunción (Paraguay), Antofagasta (Chile)
3. **Afrika**: Mozambique (Inhambane-området), Madagaskar
4. **Capricorn-monumenter**: Australia har Tropic of Capricorn Marker ved Highway 1

Mål: Bygg en målbar bue rundt Capricorn-sirkelen, og sammenlign med både:
- Kule WGS84-omkrets: 36 768 km
- AE-Enok-prediksjon: 73 536 km

---

*Slutten av Ekvator-rapport v1. Cancer-rapport v1 og denne rapporten utgjør grunnlaget for Capricorn-testen som starter nå.*
