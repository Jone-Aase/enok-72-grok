# Skipslogg-test: Stemmer 1700-tallets sol-navigatører med dagens lengdegrader?

## Hva vi tester

Brukerens spørsmål: **"Bruker gamle skipslogger som kun brukte solen — fant de SAMME lengdegradene vi har i dag?"**

Dette er en uavhengig test av lengdegrad-systemet, uten GPS, uten satellitter, uten moderne instrumenter. Bare:
- **Solobservasjon** (middagshøyde for breddegrad)
- **Kronometer** (Harrison H4 fra 1761, vanlig på skip 1780+)
- **Månedistanse** (lunar distance, brukt før kronometeret)
- **Sextant** (etter 1731)

## Data

Kilde: **Cliwoc-databasen** (Climatological Database for the World's Oceans, 1750-1854)
- 287 117 logg-innførsler
- 30 havner med 3+ ankomst-observasjoner
- Spenner 1663-1855 (192 år)

## Resultat

| Havn | Breddegrad | Logg-lon | Moderne | Avvik | Obs | År |
|---|---:|---:|---:|---:|---:|---|
| PORT EGMONT (Falklands) | -51.68° | -57.98° | -60.10° | **+2.12°** | 86 | 1767-1786 |
| TALCAGUANA | -36.75° | -73.17° | -73.11° | -0.06° | 23 | 1786 |
| MONTEVIDEO | -34.89° | -56.20° | -56.16° | -0.04° | 92 | 1768-1850 |
| BUENOS AIRES | -34.63° | -58.33° | -58.38° | +0.05° | 8 | 1794-1845 |
| TAFELBAAI (Cape Town) | -34.24° | 18.20° | 18.43° | -0.23° | 12 | 1786-1852 |
| KAAP DE GOEDE HOOP | -34.28° | 18.25° | 18.47° | -0.22° | 9 | 1677-1850 |
| VALPARAISO | -33.08° | -71.67° | -71.62° | -0.05° | 6 | 1824-1827 |
| FORT DAUPHIN, Madagaskar | -25.03° | 47.00° | 46.99° | +0.01° | 17 | 1751 |
| RIO DE JANEIRO | -23.04° | -43.07° | -43.17° | +0.10° | 32 | 1765-1852 |
| PORT LOUIS, Mauritius | -20.14° | 57.50° | 57.50° | -0.00° | 10 | 1746-1848 |
| ST MARY'S BAY Madagaskar | -16.98° | 49.85° | 49.92° | -0.07° | 72 | 1751 |
| ST HELENA | -16.67° | -2.83° | -5.72° | **+2.89°** | 47 | 1753-1854 |
| BAHIA | -12.96° | -38.51° | -38.51° | +0.00° | 11 | 1833 |
| ASCENSION | -8.05° | -14.11° | -14.36° | +0.25° | 9 | 1752-1850 |
| DIEGO GARCIA | -7.23° | 72.40° | 72.41° | -0.01° | 65 | 1819 |
| **BATAVIA (Jakarta)** | **-6.10°** | **106.86°** | **106.81°** | **+0.05°** | **434** | **1663-1854** |
| MAKASSER | -5.14° | 119.40° | 119.41° | -0.01° | 52 | 1816 |
| PARAMARIBO | 5.87° | -55.06° | -55.17° | +0.11° | 130 | 1757-1853 |
| GALLE | 6.00° | 80.19° | 80.22° | -0.03° | 90 | 1785-1786 |
| MACAO | 22.17° | 113.63° | 113.55° | +0.08° | 38 | 1787-1851 |
| LA CORUÑA | 43.36° | -8.48° | -8.40° | -0.08° | 145 | 1765-1797 |
| HELLEVOETSLUIS | 51.78° | 3.97° | 4.13° | -0.16° | 96 | 1760-1855 |

## Statistikk

**28 av 30 havner innen ±1.0° avvik:**
- Median avvik: **-0.006°** (praktisk talt null)
- Gj.snitt avvik: **+0.023°**
- Standardavvik: **0.189°** (≈ 11 buenuminutter)
- Maks normalt avvik: 0.71° (New York)

## Konklusjon (foreløpig)

Sjømennene fant i praksis **samme lengdegrader som dagens GPS** — over et nettverk
strukket fra Nord-Atlanteren til Indonesia, fra 1663 til 1854.

**Dette betyr at lengdegrad-systemet (rommelig avstand øst-vest fra nullmeridian)
er en KONSISTENT målestokk** — uavhengig om man bruker:
- Solhøyde + kronometer + sextant (1700-tallet)
- GPS (2026)

Begge metodene gir samme tall for samme sted. Lengdegradene er **fysisk reproduserbare**.

## To anomalier som krever forklaring

### PORT EGMONT (Falklands) +2.12°
- 86 observasjoner 1767-1786
- Logg: -57.98°, moderne: -60.10°
- **Hypotese**: Tidlig pre-Harrison-kronometer-feil for sørligste hav (lengst seilingsavstand fra Greenwich uten ny tidsreferanse), eller havnens senter er forskjellig fra historisk anker-plass

### ST HELENA +2.89°
- 47 observasjoner 1753-1854
- Logg: -2.83°, moderne: -5.72°
- **Hypotese sterk**: Pre-Greenwich nullmeridian. Britene brukte Greenwich først fra 1675, men hollandske og franske skip brukte Tenerife/Paris/Ferro til langt utpå 1800-tallet. **St Helena ligger 2.83° vest av Tenerife** (-16.50°W) — det matcher nesten perfekt om Tenerife var antatt 0°.

## Hva dette IKKE tester ennå

- **Avstand** mellom punkter (vi har bare lengdegrad-tall, ikke målt avstand)
- **Hvor stor en grad faktisk er** i kilometer sørover (det er neste test)
- Hvorvidt jorden er kule eller plan/AE — for begge modeller bruker lengdegrad som koordinat. Forskjellen vises **kun i avstand mellom punkter**.

## Neste steg

Bekreft hver havns moderne koordinat manuelt i Google Earth (brukerens målbånd-metode),
deretter mål avstand mellom havne-par på samme breddegrad på forskjellige kontinenter.
Det er DEN testen som skiller modellene.
