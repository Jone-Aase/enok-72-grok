# Instruks til Grok (12-agent oppsett) — Enok 72 prosjektet

## Konteksten din
Du er en del av et team på 9 AI-er som hjelper en uavhengig norsk forsker med å teste Enoks kosmologiske modell empirisk. Lederen for prosjektet er **brukeren selv**. Datasamleren er Perplexity (har web-søk). Du er én av flere kritikere og bred-søkere.

**Du har 12 sub-agenter** — bruk dem til parallelle søk på forskjellige kontinenter samtidig.

## Hva vi gjør akkurat nå

Vi samler **gamle, pre-WGS84 (helst pre-1900) fysiske markører** som ligger på eller nær disse tre breddegradene:

1. **Ekvator** (0° breddegrad)
2. **Tropic of Cancer** (ca. 23.4°N)
3. **Tropic of Capricorn** (ca. 23.4°S)

Vi skal plotte alle inn på Google Earth og se hvor sirklene faktisk gikk i gammel tid.

## Hva vi allerede har funnet (du skal IKKE finne disse på nytt)

### Ekvator (5 punkter)
- Catequilla, Ecuador (pre-columbiansk år 800, 0.00000°N)
- Pyramid Oyambaro & Caraburo, Ecuador (1736)
- Mitad del Mundo monument (1936)
- Pontianak Equator Monument, Indonesia (1928)

### Cancer (12 punkter)
- Modhera Sun Temple, India (1026 e.Kr.)
- Dholavira, India (Harappan 2650 f.Kr.)
- Chiayi Monument, Taiwan (1908)
- Aswan/Syene, Egypt (Eratosthenes 240 f.Kr.)
- Ujjain Jantar Mantar, India (1719)
- Havner: Mazatlán, Havana, Muscat, Kandla, Guangzhou, Macao, Nassau

### Capricorn (7 punkter)
- 5 monumenter Afrika (Namibia, Botswana, Sør-Afrika, Mosambik, Madagaskar)
- Rio de Janeiro havn (Portugisisk koloni 1565)
- Sao Paulo (1554)

## Din oppgave — finn FLERE gamle markører i disse 12 retningene

Hver av dine 12 agenter får én av disse:

### Agent 1: Sør-Amerika Ekvator (Brasilien, Colombia, Gabon)
Søk: gamle markører, kolonialfort, jesuittmisjoner, urfolks-observatorier i Brasil og Colombia langs 0° breddegrad. Karibiske byer.

### Agent 2: Sør-Amerika Capricorn (Brasilien, Paraguay, Argentina, Chile)
Søk: kolonialhavner, gamle jesuittmisjoner, Inka-arv langs 23-24°S. Iguazu, Asunción, Antofagasta.

### Agent 3: Afrika Cancer (Marokko, Mauritania, Vest-Sahara, Mali)
Søk: gamle berber-byer, oasis-byer, trans-saharansk handelsruter langs 23-24°N. Tindouf, Bir Anzarane.

### Agent 4: Afrika Capricorn (gamle steder før 1960)
Søk: hva visste portugisiske, britiske og tyske landmålere om Capricorn-linjen før 1960? Trianguleringsstasjoner.

### Agent 5: Asia Cancer-bredde (Bangladesh, Burma, Thailand, Vietnam, Laos, Hong Kong)
Søk: gamle pagoder, templer, festninger langs 23°N. Mandalay, Sa Pa, Lampang.

### Agent 6: Kina/Taiwan Cancer (gamle astronomiske)
Søk: kinesiske gnomon-observatorier, Yuan-dynastiet, Yixing-måling. Spørr om Han-dynastiets astronomi.

### Agent 7: Midtøsten Cancer (Saudi-Arabia, Oman, Iran, India)
Søk: gamle stjernetårn, observatorier, Hejaz-jernbanen, Mada'in Saleh, Hegra, Quseir.

### Agent 8: India Cancer (mer enn vi har)
Søk: alle Surya-templer (soltempler), Mahakaleshwar Ujjain-tradisjon, Modhera-områdets parallelle templer.

### Agent 9: Mexico Cancer (Mayariket, pre-spansk)
Søk: hvilke pre-spanske Maya-byer ligger nær 23°N? Selv om de fleste er sør for Cancer, sjekk pre-Aztek nordlige grense.

### Agent 10: Sør-Stillehavet Capricorn (Polynesia, Cook-øyene, Norfolk Island)
Søk: gamle polynesiske navigasjonspunkter, marae, kapteinslogger fra Cook, Bligh, Bougainville.

### Agent 11: Australia Capricorn
Søk: hva finnes av aboriginsk astronomi, gamle mineralforekomster med kjente koordinater. Rockhampton ligger på Capricorn.

### Agent 12: Pacific Ekvator (Galapagos, Gilbert-øyer, Sumatra)
Søk: pre-WGS84 markører, gamle whalers-logger, Hawaiisk astronomi nord for ekvator.

## Format på leveransen (KRITISK — følg eksakt)

For hvert funn, returner én rad i CSV-format med disse 12 kolonnene:

```
id,sirkel,sted,land,kontinent,lat,lon,alder_aar,type,kilde_url,verifisert_dato,merknad
```

**Felt-regler:**
- `id`: GROK-001, GROK-002, ... (du nummererer)
- `sirkel`: kun "Ekvator", "Cancer" eller "Capricorn"
- `lat/lon`: minst 4 desimaler. Hvis du bare har 1-2 desimaler skriv det i merknaden
- `alder_aar`: omtrentlig alder (eldre = bedre). 2026 minus byggeår
- `type`: arkeologisk_observatorium, arkeologisk_tempel, arkeologisk_by, historisk_havn, vitenskapelig_markor, historisk_by
- `kilde_url`: FULL URL — Wikipedia, UNESCO, akademisk artikkel. **IKKE OPPDIKT URL**
- `verifisert_dato`: 2026-05-20
- `merknad`: hvor sikre er koordinatene? hva er kilden for byggeår?

## Strenge regler

1. **Ingen WGS84-monumenter satt opp etter 1960** (med mindre det er bygget på et eldre kjent sted)
2. **Hver URL må eksistere** — vi har hatt problemer med en annen AI som hallusinerte URL-er
3. **Hvis du er usikker** på alder eller koordinat, sett det i merknad — IKKE gjett
4. **Returner CSV som tekst** i svaret ditt, ikke som vedlegg
5. **Norsk språk** på merknader (brukeren er norsk)
6. **Hvis et land ikke har noen kvalifiserte funn**, returner én rad med "NULL_FUNN" som id og forklaring i merknad

## Kvalitet over kvantitet

5 godt verifiserte funn er bedre enn 50 dårlige. ChatGPT er pirkete og vil finne hver feil i ditt arbeid — vær grundig.

Lykke til.
