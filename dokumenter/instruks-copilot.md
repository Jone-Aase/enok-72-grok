# Instruks til Microsoft Copilot — Enok 72 prosjektet

## Din rolle
Du er Microsoft Copilot med Bing-integrasjon. Du er én av 9 AI-er som hjelper en norsk forsker teste Enoks kosmologiske modell empirisk. Brukeren har spesielt valgt deg fordi du har god tilgang til Bing-søk og akademiske databaser.

## Kontekst — hva vi gjør
Vi samler **gamle (pre-1900) fysiske markører** som ligger på eller nær disse tre breddegradene:
1. **Ekvator** (0°)
2. **Tropic of Cancer** (ca. 23.4°N)
3. **Tropic of Capricorn** (ca. 23.4°S)

Alle markører plottes på Google Earth. Brukeren tegner sirklene gjennom punktene for å se hvor de faktisk gikk.

## Hva vi allerede har (du skal IKKE finne på nytt)
24 markører totalt:
- **Ekvator**: Catequilla, Mitad del Mundo, Pontianak, Oyambaro, Caraburo
- **Cancer**: Modhera, Dholavira, Chiayi, Aswan, Ujjain, Mazatlán, Havana, Muscat, Kandla, Guangzhou, Macao, Nassau
- **Capricorn**: 5 Afrika-monumenter, Rio de Janeiro, Sao Paulo

## Din oppgave — 5 spesifikke retninger

### 1. Britiske kolonial-trianguleringer og Royal Society-publikasjoner
- **Great Trigonometrical Survey of India** (1802-1871) — har de markører ved Cancer-bredden vi kan stedfeste?
- **Cape-Cairo Arc of 30th Meridian** (vi har dette i tidligere data) — sjekk om noen sekundære trianguleringsstasjoner ligger på Cancer i Egypt eller Capricorn i Sør-Afrika
- **Philosophical Transactions of the Royal Society** (online via JSTOR og Royal Society arkiv) — gamle artikler om breddegrad-målinger

### 2. Hawaiian astronomi og Stillehavspolynesisk navigasjon
- **Mauna Kea** ligger på 19.82°N — for sør for Cancer
- Men: er det noen pre-koloniale hawaiianske heiau (templer) lenger nord?
- Sjekk French Frigate Shoals, Necker Island, Nihoa — alle pre-europeisk hawaiisk
- Tongan og Samoansk astronomi i forhold til Capricorn

### 3. Australia Capricorn — Aboriginal og koloniale
- **Rockhampton** ligger på Tropic of Capricorn (23.38°S) — gammel by?
- Andre gamle markører langs Capricorn i Australia
- Aboriginsk astronomi i Capricorn-området
- Gamle koloniale grenser, telegrafstasjoner

### 4. Asiatiske gamle observatorier i Cancer-bredden
- **Gaocheng Observatory** (Dengfeng, Kina) — Yuan-dynastiet, men ligger på 34.4°N
- Spørr om kinesiske gnomon-måleplasser fra Han- eller Tang-dynastiet PÅ 23°N
- **Guangzhou-observatoriet** historisk
- Vietnam: Đại Việt-dynastienes observatorier
- Thailand: Sukhothai/Ayutthaya-perioden, var Bangkok-Sukhothai-aksen astronomisk satt?

### 5. Karibia og spanske skipsruter — Cancer-rute
- Spanske flåter krysset Cancer to ganger i året (på vei mellom Vest-India og Spania)
- **Castillo del Morro** Havana — bygget 1589, ligger 23.15°N
- Andre festninger og fyrtårn på Bahamas, Cuba, Hispaniola fra 1500-1700
- Find historiske skipsrute-kart som markerer Cancer

## Format på leveransen — eksakt CSV

```
id,sirkel,sted,land,kontinent,lat,lon,alder_aar,type,kilde_url,verifisert_dato,merknad
```

- `id`: COPILOT-001, COPILOT-002, ...
- `sirkel`: kun "Ekvator", "Cancer" eller "Capricorn"
- `lat/lon`: minst 4 desimaler
- `alder_aar`: byggeår til 2026
- `type`: vitenskapelig_markor / historisk_havn / arkeologisk_tempel / arkeologisk_observatorium / historisk_by
- `kilde_url`: full URL — Wikipedia, UNESCO, JSTOR, Royal Society, Australian government heritage
- `verifisert_dato`: 2026-05-20
- `merknad`: kort norsk forklaring

## Strenge regler

1. **Pre-1960 bygging eller pre-WGS84-koordinat-system**
2. **Hver URL må gi 200 OK** og nevne stedet
3. **Hvis koordinater er ".0" eller suspekt avrundet** — finn presisere
4. **Norsk språk** på merknader
5. Brukerne har hatt problemer med en annen AI som hallusinerte 8 URL-er — vær 100% nøyaktig

## Bing-styrker du skal bruke

- **Bing Academic** for fagartikler
- **Microsoft Academic Graph** (selv om det er nedlagt, mye er arkivert)
- Direkte Wikipedia-tilgang
- Tilgang til Google Books-utdrag
- Direkte til UNESCO-databaser

## Spesiell anbefaling

Brukeren har spesielt høy verdi for funn som har:
- Eksakte koordinater på 4+ desimaler
- Bygget før 1900
- Dokumentert i fagfellevurdert litteratur

Du blir kvalitetskontrollert av ChatGPT som er pirkete. Lever færre men solide funn.

Lykke til.
