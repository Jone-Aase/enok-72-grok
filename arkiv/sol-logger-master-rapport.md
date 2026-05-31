# Sol-logger master — første innsamling

**Dato**: 21. mai 2026
**Status**: 66 sol-logger samlet fra alle tidligere sesjoner

## Hva jeg fant

| Kategori | Antall | Geografisk dekning |
|---|---:|---|
| Ekvator zenith-bevis | 5 | Ecuador (Catequilla, Mitad del Mundo, Quitsato), Indonesia (Pontianak), Uganda (Kayabwe) |
| Ekvator-monumenter (andre) | 5 | São Tomé, Kenya, Brasil (Macapá), 4 Indonesia, Singapore |
| Ekvator Stillehavet-punkter | 5 | Aranuka, Baker, Anibare, Ueru, Banana (Kiritimati) |
| Cancer-monumenter og obs | 21 | Mexico, Bahamas, Cuba, Vest-Sahara, Algerie, Libya, Egypt, UAE, Oman (8), India, Kina, Taiwan, Hawaii, Lapérouse 1786 |
| Cancer historisk (skipslogg) | 4 | Lapérouse 1786, USS Vicksburg 1900-1902 (3 punkter) |
| Sør-skipslogger (Cliwoc) | 5 | Cook 1774 (53°S start+slutt), Malaspina 1790, Lapérouse 1786, Port Egmont Falklands |
| Sør-Amerika-havner (Cliwoc) | 7 | Talcahuano, Montevideo, Buenos Aires, Valparaíso, Rio de Janeiro, Bahia, Paramaribo |
| Afrika-havner (sør for ekvator) | 5 | St Helena, Ascension, Fort Dauphin (Madagaskar), Cape Town, Batavia (Jakarta) |
| Midnattssol polar | 4 (av 15 dokumentert tidligere) | Toolik Alaska, Bodø, Murmansk, Tiksi Yakutia |

**Totalt**: 66 sol-logger fra fire kontinenter, 12 land, 1663-2026 (363 års spenn).

## Hva jeg IKKE fant

**Jamaika** — jeg fant ingen sol-logger fra Jamaika i noen av de tidligere sesjonsmappene. Du nevnte at vi hadde nye funn fra Sør-Amerika OG Jamaika, men i de filene jeg har gjennomgått:

- `skipslogg-53S-test.md` — Cook, Lapérouse, Malaspina på 53°S (Cape Horn-området)
- `skipslogg-lengdegrad-test.md` — 30 havner inkludert Sør-Amerika, men ingen Jamaika
- `cancer-rapport-v1.md` — Cancer-monumenter (Karibien er dekket via Bahamas + Cuba men ikke Jamaika)
- `ekvator-rapport-v1.md` — 13 ekvator-punkter (4 kontinenter)
- `tropic-test.md` — Cancer/Capricorn
- `midnattssol-vitnesbyrd.md` — 15 polar-steder

**Tre muligheter:**

1. Vi har Jamaika-data i en **annen sesjon** jeg ikke har sett (mulig — det er sesjoner jeg ikke har lastet)
2. Du tenker på **Havana + George Town (Bahamas)** som "Jamaika-området" (begge ligger i Karibien, nær Cancer-bredden)
3. Jamaika-undersøkelsen ble **diskutert men ikke utført** — kanskje vi planla å hente Cliwoc-data fra Port Royal/Kingston men aldri kom dit

## Det jeg har fra "Sør-Amerika" som du sannsynligvis husker

Sterkeste Sør-Amerika-sol-logger:

| Sted | Lat | Type | Hvorfor det er sterkt |
|---|---:|---|---|
| Catequilla (Ecuador) | 0.0000°N | Ekvator zenith | Pre-Inka huaca ~800 e.Kr., dokumentert ingen-skygge ved jevndøgn |
| Mitad del Mundo (Ecuador) | -0.0019° | Ekvator | 240 m sør, fransk geodetisk ekspedisjon 1736 |
| Quitsato Sundial (Ecuador) | 0.0000° | Ekvator | 52 m solur post-GPS bygget med 1 mm presisjon |
| Marco Zero Macapá (Brasil) | 0.0000° | Ekvator | Sol langs Avenida Equatorial ved jevndøgn |
| Cook RESOLUTION 53°S | -53.27° | Sør-skipslogg | 34 dager kontinuerlig 53°S, vest for Cape Horn 1774 |
| Malaspina Cape Horn | -50.90° | Sør-skipslogg | Spansk 1790 (55 obs) |
| Lapérouse Cape Horn | -48.30° | Sør-skipslogg | Fransk 1786 (78 obs) |
| Talcahuano (Chile) | -36.75° | Sør-havn | 23 obs 1786 (0.06° avvik vs moderne) |
| Valparaíso (Chile) | -33.08° | Sør-havn | 6 obs 1824-1827 |
| Montevideo (Uruguay) | -34.89° | Sør-havn | 92 obs 1768-1850 |
| Buenos Aires (Argentina) | -34.63° | Sør-havn | 8 obs 1794-1845 |
| Rio de Janeiro (Brasil) | -23.04° | Sør-havn | 32 obs 1765-1852 |
| Bahia (Brasil) | -12.96° | Sør-havn | 11 obs 1833 (perfekt match) |
| Paramaribo (Suriname) | 5.87° | Nord-havn | 130 obs 1757-1853 |
| Port Egmont Falklands | -51.68° | Sør-havn (anomali) | 86 obs 1767-1786 (+2.12° avvik — pre-Harrison) |

## Hva er neste steg

1. **Bekrefte med deg**: Jamaika — har du data jeg ikke kjenner, eller skal jeg søke nettet etter Port Royal Cliwoc-data?
2. **Plotte alle 66 sol-logger på simulator-laget** (AE-projeksjon — markører fargekodet etter sirkel)
3. **Legge til kontinent-skissen** så vi ser at sirklene treffer kontinentene riktig
4. **Excel-rad bug-fix** (am+2 → am+51) i v2.4

## Filer

- `sol-logger-master.csv` — alle 66 punkter med lat/lon/kilde/verifisering
- `sol-logger-master-rapport.md` — denne filen
