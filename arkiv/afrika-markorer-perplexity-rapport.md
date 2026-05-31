# Afrika-markører — Perplexity bidrag

**Dato**: 20. mai 2026
**Bidragsyter**: Perplexity (AI nr. 8 av 8 i Enok 72-teamet)
**Tildelt oppgave**: Kategori C — Arc of the 30th Meridian + relaterte observatorier
**Antall markører**: 36 totalt (27 trianguleringsstasjoner, 6 monumenter, 3 observatorier)

## Sammendrag

| Sirkel | Antall markører | På sirkel (<5km) | Nær sirkel (5-100km) |
|---|---:|---:|---:|
| Cancer 23.44°N | 9 | 0 | 2 |
| Ekvator 0° | 9 | 1 | 5 |
| Capricorn 23.44°S | 5 | 5 | 0 |
| Annen | 13 | — | — |
| **Totalt** | **36** | **6** | **7** |

## Hovedfunn

### 1. Arc of the 30th Meridian dekker hele Afrika fra Cape til Cairo
Britisk geodetisk prosjekt initiert av Sir David Gill 1879, ferdigstilt 1954. Totalt **608 hovedstasjoner, 23 basislinjer, 42 astronomiske stasjoner** gjennom 11 land ([CLGE Hofgartner](https://www.clge.eu/wp-content/uploads/2014/04/hofgartner2.pdf), [FIG Smith 2005](https://www.fig.net/organisation/perm/hsm/history_of/measurements/struve/struve_30arc_smith_2005.pdf)).

**Lengde**: 64°01'15" buegrader = ~7 120 km
**Sør-terminal**: Buffelsfontein near Port Elizabeth
**Nord-terminal**: 30°01'43"N, 31°16'34"E (NE of Cairo)

### 2. Stasjonsfordeling per land
| Land | Hovedstasjoner | Basislinjer |
|---|---:|---:|
| Egypt | 98 | 6 |
| Sudan | 198 | 6 |
| Uganda | 29 | 1 |
| DRC | 10 | 0 |
| Burundi | 4 | 1 |
| Tanzania | 55 | 2 |
| Zambia | 33 | 1 |
| Mosambik | 2 | 1 |
| Zimbabwe | 62 | 2 |
| Botswana | 1 | 1 |
| Sør-Afrika | 116 | 4 |
| **Totalt** | **608** | **23** |

### 3. Stasjoner med dokumenterte pre-WGS84 koordinater (direkte fra Smith 2005)
- **Quleit Base** (Sudan): 13°50'N
- **Abu Qarn Base** (Sudan): 10°N
- **Cairo Station**: 30°N
- **Beni Suleiman Base** (Egypt): 29°N
- **Assiut/Abnub Base**: 27°N
- **Luxor Base**: 25°40'N
- **Aswan Base**: 24°N (offisielt; Eratosthenes-lokasjon i moderne data: 24°05'23"N)
- **Adindan Base**: 22°10'N (origin Adindan-datum, EPSG:4201)

### 4. Adindan-datum (geodetisk referansepunkt for Sør-Sudan/Sudan/Etiopia/Eritrea)
- **Ellipsoide**: Clarke 1880 RGS
- **Semi-major axis**: 6 378 249.145 m
- **Inverse flattening**: 293.465
- **Datakilde**: US Coast and Geodetic Survey, Geophysical Research vol 67 #11, oktober 1962
- **WGS84-transform**: tx=-166, ty=-15, tz=204, derivert ved 22 stasjoner
- Kilde: [EPSG:4201](https://epsg.io/4201)

### 5. Helwan Khedivial Observatory (Egypt) — eksakte koordinater
- **Lat/Lon**: 29°51'31"N, 30°15'5.5"E (= 29.8586°N, 30.2515°E)
- **Elevasjon**: 116 m over havet
- **IAU obs.kode**: 087
- **Etablert**: 1903 (Khedivial fra 1865 i Abbasiya, Cairo)
- **Basislinje målt her**: 7 946.0433 m (1908), 8x24m invar Jäderin wires
- Kilde: [UNESCO Astronomical Heritage](https://web.astronomicalheritage.net/show-entity?identity=127&idsubentity=1)

### 6. Capricorn-monumenter (6 land langs sirkelen)
| Land | Lat | Lon | Notat |
|---|---:|---:|---|
| Namibia | 23°26'13.0"S | ~15.50°E | Skilt langs C14 ved Gaub Pass |
| Botswana | 23°26'S | 20°00'E | Mellom Serowe og Letlhakeng |
| Sør-Afrika | 23°26'S | 27°18'E | Limpopo, langs N1 |
| Mosambik | 23°26'S | 31°33'E | Gaza/Inhambane |
| Madagaskar | 23°26'S | 43°45'E | Toliara/Fianarantsoa |

Alle innen 0.7 km fra sirkelen. Kilde: [Wikipedia Tropic of Capricorn](https://en.wikipedia.org/wiki/Tropic_of_Capricorn).

### 7. Kayabwe Equator Monument (Uganda)
- **Koordinater**: 0°00'02.92"S, 32°02'21.01"E
- Innen **90 m** fra ekvator
- Kilde: [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Uganda_Equator_(Kayabwe).jpg) (OpenStreetMap-bekreftet)

## Hva som mangler / kan ikke verifiseres

1. **Eksakte pre-WGS84 koordinater for ~600 stasjoner**: Smith 2005 og CLGE-rapporten gir kun ~25 navngitte stasjoner med koordinater. De fulle stasjonslistene må hentes fra:
   - Gill: *Geodetic Survey of South Africa* (originalpublikasjon 1896-1907) — ikke fritt tilgjengelig på nett
   - Sudan Survey Department-arkiver
   - Egyptian Survey Authority-arkiver
   - Royal Engineers-arkiver (1931-33)
   - US Army Map Service (AMS) 1952-54 rapporter

2. **Buffelsfontein eksakte koordinater**: Geocaching-side bekrefter eksistens men gir ikke GPS i fetched-tekst. Generelt estimert til 33°59'32"S, 25°30'44"E basert på flere kilder, men bør kryss-verifiseres med Hartebeesthoek94-datum-konvertering.

3. **Insnza og Gwibi basislinjer**: Plassering omtrentlig, eksakte koordinater ikke i de hentede kildene.

4. **Cape Datum vs WGS84**: Sør-Afrika brukte Cape Datum (Modified Clarke 1880) fram til 1999. Konvertering kreves for å sammenligne med moderne GPS.

## Forslag til kryss-verifisering

1. **Gjenta søk på Sør-delen** (Tanzania-Zimbabwe-Sør-Afrika) — Smith 2005 dekker hovedsakelig Nord
2. **Konsulter Gill 1896-rapporten** direkte hvis tilgjengelig via Royal Society eller British Library
3. **Sammenlign med Aslam Parker GISSA 2023** ([PDF](https://gissa.org.za/regions/gissa-gauteng/meetings-1/previous_meetings/virtual-workshop-on-the-national-control-survey-system-of-south-africa-23-february-2023/aslam_parker_presentation.pdf/@@download/file/Aslam_Parker_Presentation.pdf)) som har moderne South African kontroll-koordinater
4. **Bekreft Capricorn-monumentene** ved bruk av Google Earth-måling (de andre AI-ene kan gjøre dette)

## Anbefaling til prosjektleder

For å triangulere senter med høy presisjon trenger vi:

- **Minst 10 markører på Cancer** (vi har 2 nær — Aswan Base og Aswan Eratosthenes)
- **Minst 10 markører på Ekvator** (vi har 6 nær — Semliki, Omunturok, NKenda, Kasunju, Karangora, Kayabwe)
- **Minst 10 markører på Capricorn** (vi har 5 på selve sirkelen)

Andre AI-er bør prioritere:
- **Cancer-monumenter** i Mauritania, Mali, Algerie, Libya (mangler helt)
- **Ekvator-monumenter** i Gabon, São Tomé, Kongo, Kenya, Somalia (mangler)
- **Astronomiske observatorier** Tananarive, Alger, Cairo Abbasiya (eldre Khedivial-lokasjon)

## Kilder

1. [CLGE Hofgartner 2014: 30th Meridian Cape to Cairo (PDF)](https://www.clge.eu/wp-content/uploads/2014/04/hofgartner2.pdf)
2. [FIG Smith 2005: Arc of 30 Meridian North of Equator (PDF)](https://www.fig.net/resources/proceedings/fig_proceedings/cairo/papers/wshs_03/wshs03_01_smith.pdf)
3. [FIG Smith 2005: Struve/30th connection (PDF)](https://www.fig.net/organisation/perm/hsm/history_of/measurements/struve/struve_30arc_smith_2005.pdf)
4. [EPSG:4201 Adindan datum](https://epsg.io/4201)
5. [UNESCO Astronomical Heritage: Helwan Observatory](https://web.astronomicalheritage.net/show-entity?identity=127&idsubentity=1)
6. [Wikipedia: David Gill (astronomer)](https://en.wikipedia.org/wiki/David_Gill_(astronomer))
7. [Wikipedia: 30th meridian east](https://en.wikipedia.org/wiki/30th_meridian_east)
8. [Wikipedia: Tropic of Capricorn](https://en.wikipedia.org/wiki/Tropic_of_Capricorn)
9. [Wikipedia: Aswan](https://en.wikipedia.org/wiki/Aswan)
10. [Wikimedia Commons: Uganda Equator Kayabwe](https://commons.wikimedia.org/wiki/File:Uganda_Equator_(Kayabwe).jpg)
11. [Geocaching: Arc of 30th Meridian #1 Buffelsfontein](https://www.geocaching.com/geocache/GCH35M)
12. [Bweyogerere coordinates](https://en.wikipedia.org/wiki/Bweyogerere)
13. [Datums and Coordinate Systems (PDF)](https://georeference.org/forum/bRTgvMTU3NjcyL0RhdHVtcyBhbmQgQ29vcmRpbmF0ZSBTeXN0ZW1zLnBkZg__)

## Format-bekreftelse

CSV følger standard fra [afrika-test-instruks-til-AI.md](./afrika-test-instruks-til-AI.md). 17 kolonner. UTF-8 encoding. Hver markør har unik ID `PPLX-NNN`.
