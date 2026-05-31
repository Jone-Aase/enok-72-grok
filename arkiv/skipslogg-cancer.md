# Skipslogger på Tropic of Cancer — kildesporing

## Hva vi leter etter

Skipsloggers middags-solhøyde tatt ved sol-i-sør på Cancer-bredden (23.30°-23.60°N), helst rundt vintersolverv (17.-26. desember), der vi kan lese den observerte breddegraden direkte fra navigatørens egen håndskrift.

## CLIWOC-databasen — første sortering

**Kilde**: CLIWOC 2.1 (Climatological Database for the World's Oceans, 1750-1854).
287 116 loggføringer. Lastet ned 167 MB TSV til `/home/user/workspace/cliwoc21.tsv`.

**Første feilspor**: Den normaliserte kolonnen `LAT` runder alt til hele grader (alle 40 "treff" var 23.000°).
**Korrigert spor**: Rå-kolonnene `LatDeg`, `LatMin`, `LatSec`, `LatHem` viser hva navigatøren faktisk skrev. Presisjon: bueminutt-nivå (1' ≈ 1.85 km).

## Funn

| Bånd | Antall observasjoner |
|---|---:|
| Cancer-bandet bredt (22.5-24.0°N), alle år/måneder | 1 862 |
| Snevert (23.30-23.60°N), alle år/måneder | 436 |
| Snevert, vintermåneder (nov-jan) | 98 |
| Snevert, vintermåneder, med arkivbilde-peker | 16 |
| **Snevert, vintersolverv-vindu (17.-26. des), med arkivbilde** | **3** |

## Tre gull-kandidater (vintersolverv på Cancer)

### Kandidat A — 22. desember 1815, kl 13:00
- Bredde: **23°32' N** (23.5333°)
- Lengde: ca 2°46' W (Atlanterhavet, ute fra Marokko-kysten)
- Logg-ident: **MAR_D23905_1306**, arkivbilde 0038
- Språk: nederlandsk
- Arkiv: D23905 (NAN, Den Haag — Nationaal Archief Nederland)
- **Selve vintersolverv-dagen.** Dette er den sterkeste kandidaten.

### Kandidat B — 17. desember 1815, kl 14:00
- Bredde: **23°23' N** (23.3833°)
- Lengde: ca 14°19' W (Atlanterhavet, ut fra Vest-Sahara)
- Logg-ident: MAR_D23905_3475, arkivbilde 0027
- Språk: nederlandsk
- Arkiv: D23905 (NAN, Den Haag)
- 4 dager før vintersolverv.

### Kandidat C — 24. desember 1780, kl 14:00
- Bredde: **23°18' N** (23.3°)
- Lengde: ikke registrert
- Logg-ident: ADM_177_1189, arkivbilde 0075
- Språk: nederlandsk
- Arkiv: 177 (NAN, Den Haag)
- 2 dager etter vintersolverv.

## Hva trengs for å hente arkivbildene

- Nationaal Archief Nederland (Den Haag) digital portal: https://www.nationaalarchief.nl/
- Arkivset D23905 og 177 er kjente serier av VOC- og marine-loggbøker.
- Bildene er skanninger av selve håndskriftet, sannsynligvis tilgjengelig via deres "Index op de Schepen" eller direkte arkivsøk på logbook-ident.

## Status

3 verifiserbare kandidater identifisert. Neste skritt: faktisk hente de skannede sidene fra det nederlandske riksarkivet og lese navigatørens egen middagssol-måling.
