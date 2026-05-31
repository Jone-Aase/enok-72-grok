# Tropic of Cancer — fire parallelle spor

## Spor A: Old Weather (åpne transkriberte logger)

**Hovedportal**: https://www.oldweather.org og naval-history.net (tekst-utgaver)

**Funn**:
- **USS Concord 1891-92** og **USS Vicksburg 1900-02** — begge har full transkribert logg med skanninger på Amazon S3 (`oldweather.s3.amazonaws.com`)
- USS Vicksburg-loggen viser eksplisitt **havne-anløp i Havana** (23.11°N)
- Hver loggside er lenket til skannet original-bilde
- Old Weather: Whaling-prosjektet har 19. århundres hvalfangerlogger fra Stillehavet (inkluderer Hawaii)

**Format**: Naval-History.net publiserer transkribert tekst + lenker til original-skannet side. Loggene gir middags-posisjon "Lat 23.x, Long -82.y" for hver dag i havn.

**Hvor finner vi observert breddegrad i havn?**
Loggsidens øvre del har en kolonne "Latitude observed at noon". I havn er det noen ganger utelatt ("Moored to dock, no observation"), men ved ankomst og avgang skal det stå.

**Hvor verifiserer vi mot dagens havn?**
- Havana havn ligger på 23°08'30" N, 82°21'27" W (Castillo del Morro)
- USS Vicksburg-loggen har spesifikk inngang: "stopped engines, government tug Havana came alongside and towed this vessel to dock"

**Status**: Konkret rute klar — gå inn i USS Vicksburg 1900-02 og finn Havana-anløpene.

---

## Spor B: Nationaal Archief Den Haag (de tre nederlandske gull-kandidatene)

**Hovedportal**: https://www.nationaalarchief.nl/onderzoeken (norsk-tysk: archieven.nl)

**Funn**:
- Den nederlandske scheepsjournalen-katalogen (toegang 2.12.03) lister marine-logger 1813-1995
- VOC-katalogen (1.04.02) dekker handelsskips-logger 1594-1814
- Den interne API-tjenesten `service.archief.nl/gaf/api/mets/v1/...` leverer METS-XML for digitaliserte stykker — som kan inneholde de skannede sidene

**Veien til skanningen av MAR_D23905_1306 (22.12.1815)**:
1. Søk i scheepsjournalen-inventaret etter referanse D23905_1306
2. Hver loggbok-post har et inventar-nummer som peker til en eller flere skannede ruller (METS-pakker)
3. Bilde-nummer 0038 = arkivside 38 i den digitaliserte pakken

**Status**: API-endepunkt og inventarnummer kjent. Krever direkte søk i NAN-katalogen for D23905-serien — sannsynligvis må vi navigere via portalen for å finne den eksakte URLen til det skannede oppslaget.

---

## Spor C: Archivo General de Indias (Manila-galleon, Sevilla)

**Hovedportal**: https://pares.cultura.gob.es (PARES — Portal de Archivos Españoles)

**Funn**:
- **Manila-galleon-ruten** (1565-1815): seilte fra Manila (14.6°N) via 30-tallet °N tilbake til **Acapulco (16.86°N)** og **Cabo San Lucas (22.89°N — du har målt denne i GE)**
- AGI har gallen-loggene, gradvis digitalisert med "lite kamera-ikon" i søkeresultatene
- Forskere (Garcia-Herrera et al. 2008, NOAA) har gjennomgått Sevilla-arkivet og rekonstruert reisevarigheter
- Cabo San Lucas var et regulært stoppested for galleoner som ventet på pilotering inn til Acapulco

**Reisen krysset Cancer to ganger per år**:
- Vest-mot-øst-leg (juli-januar): krysset Cancer ned mot Acapulco via Cabo San Lucas
- Galleonen tok middagshøyde for å justere breddekurs ("seilte på breddegraden")

**Status**: PARES-portalen er åpen og søkbar. Manila-galleon-logger er katalogisert under AGI Contratación og Filipinas-seksjonene.

---

## Spor D: Live web-kameraer på Cancer-bredden

**Konkrete kameraer funnet** (i rekkefølge etter nærhet til 23.44°N):

| Sted | Lat | Kamera-URL | Type |
|---|---:|---|---|
| **Hotel Playa Mazatlán** (Mexico) | 23.25°N | https://www.hotelplayamazatlan.com/en/webcam/ | To live-stream nord/sør av Gaviotas-stranden |
| **El Cid Mazatlán** | 23.22°N | https://worldcam.eu/webcams/north-america/mexico/19417-mazatlan-panoramic-view | Panorama med klokke i bildet |
| **Canton Tower Guangzhou** (Kina) | 23.11°N | https://www.cantontower.com/en/ + https://www.webcamgalore.com/webcam/China/Guangzhou/34898.html | Tårn-view, vest-mot-Haixin |
| **Havana Malecón / Castillo del Morro** | 23.11°N | https://www.livebeaches.com/caribbean/cuba/ | Strand- og fortskamera |
| **Waikiki Beach Hawaii** | 21.27°N | https://www.earthcam.com/usa/hawaii/waikiki/ | (For sør, 240 km — men nyttig som sammenligningspunkt) |

**Testmetode for live web-kamera**:
1. Velg dag og klokkeslett der vi vet sann sol-i-sør (lokal soltid 12:00)
2. Bruk NOAA Solar Calculator for å fastslå solens **altitude** (høyde over horisonten) på den breddegraden og dato
3. Hent screenshot fra live-cam på det klokkeslettet
4. Mål skyggevinkelen på en kjent vertikal gjenstand (lyktestolpe, palme, bygning)
5. Sammenlign målt altitude med beregnet

**For Mazatlán 23.22°N på vintersolverv (21.12)**:
- Solens midthøyde: ca **43.4°** (altitude)
- Skygge er like lang som høyden ganger cot(43.4°) ≈ **1.06 × høyden**

**Status**: Klar til å eksekvere. Trenger valgt dato og time fra brukeren.

---

## Anbefalt rekkefølge

1. **Spor D først** (raskest): Hent en live-screenshot fra Mazatlán-kameraet akkurat nå (lokaltid Mazatlán = CEST minus 7 = 19:45 forrige kveld — solen er allerede gått ned, mørkt). **Vente til lokalt middag.**
2. **Spor A parallelt**: Bore inn i USS Vicksburg 1900-02-loggen, finne første Havana-anløp og notere observert middagsbredde.
3. **Spor B**: Navigere NAN-portalen direkte for D23905_1306.
4. **Spor C**: Søke PARES etter "derrotero galeon Cabo San Lucas" — siden brukeren allerede har målt Cabo med GE.
