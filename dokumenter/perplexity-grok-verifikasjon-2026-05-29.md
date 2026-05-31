# Perplexity-agent — Verifikasjon av Groks antipodal-akser

**Dato:** 29. mai 2026
**Verifiserer:** Groks rapport `dokumenter/grok-antipodal-akser-2026-05-29.md`
**Metode:** Kjørt alle 25 pins gjennom faktisk `aeProject()` fra app.js v16.61, sammenlignet med Groks oppgitte verdier.

## Sammendrag

| Kategori | Antall | Resultat |
|---|---|---|
| Teoretiske pins | 20 | Alle eksakt korrekte (avvik 0.0 km) |
| Navngitte virkelige steder | 5 | Alle 5 har feil — Grok brukte "akse-lat" istedenfor stedets faktiske lat |
| Bevis (formell del) | — | Korrekt og elegant |

**Konklusjon:** Bevis-delen og teoretiske pins godkjent. Navngitte pins må korrigeres før integrering i v16.62.

## Tabell — fullstendig verifikasjon

```
Pin                       lat     lon    |  Grok-X    Grok-Z    |  Real-X    Real-Z    |  ΔX       ΔZ
-------------------------------------------------------------------------------------------------------
Goose Bay                 53.32   -60.43 |   -4535.2    2618.4  |   -5568.8    3160.2  |  -1033.6    541.8  AVVIK
Nain NL                   56.55   -61.68 |   -5236.8    2618.4  |   -5140.3    2769.7  |     96.5    151.3  AVVIK
Rigolet NL                54.18   -58.43 |   -4364.0    2618.4  |   -5327.3    3273.5  |   -963.3    655.1  AVVIK
Teo 40N -60W              40.00   -60.00 |   -7558.6    4364.0  |   -7558.6    4364.0  |     -0.0     -0.0  OK
Teo 0N -60W                0.00   -60.00 |  -13605.5    7855.1  |  -13605.5    7855.1  |      0.0      0.0  OK
St Johns NL               47.56   -52.71 |   -3702.9    3702.9  |   -5893.9    4487.9  |  -2191.0    785.0  AVVIK
Teo 60N -45W              60.00   -45.00 |   -3702.9    3702.9  |   -3702.9    3702.9  |     -0.0      0.0  OK
Teo 40N -45W              40.00   -45.00 |   -6171.6    6171.6  |   -6171.6    6171.6  |      0.0     -0.0  OK
Teo 20N -45W              20.00   -45.00 |   -8640.2    8640.2  |   -8640.2    8640.2  |     -0.0      0.0  OK
Teo 0N -45W                0.00   -45.00 |  -11108.8   11108.8  |  -11108.8   11108.8  |     -0.0      0.0  OK
Teo 80N -30W              80.00   -30.00 |    -872.8    1511.7  |    -872.8    1511.7  |      0.0      0.0  OK
Teo 60N -30W              60.00   -30.00 |   -2618.4    4535.2  |   -2618.4    4535.2  |      0.0     -0.0  OK
Teo 40N -30W              40.00   -30.00 |   -4364.0    7558.6  |   -4364.0    7558.6  |      0.0      0.0  OK
Teo 20N -30W              20.00   -30.00 |   -6109.6   10582.1  |   -6109.6   10582.1  |      0.0     -0.0  OK
Teo 0N -30W                0.00   -30.00 |   -7855.1   13605.5  |   -7855.1   13605.5  |     -0.0     -0.0  OK
Teo 80N -15W              80.00   -15.00 |    -451.8    1686.1  |    -451.8    1686.1  |      0.0      0.0  OK
Teo 60N -15W              60.00   -15.00 |   -1355.4    5058.3  |   -1355.4    5058.3  |      0.0      0.0  OK
Teo 40N -15W              40.00   -15.00 |   -2259.0    8430.5  |   -2259.0    8430.5  |      0.0      0.0  OK
Teo 20N -15W              20.00   -15.00 |   -3162.5   11802.7  |   -3162.5   11802.7  |     -0.0      0.0  OK
Teo 0N -15W                0.00   -15.00 |   -4066.1   15175.0  |   -4066.1   15175.0  |     -0.0     -0.0  OK
Greenwich                 51.48     0.00 |       0.0    5236.8  |       0.0    6724.4  |      0.0   1487.6  AVVIK
Teo 80N 0                 80.00     0.00 |       0.0    1745.6  |       0.0    1745.6  |      0.0     -0.0  OK
Teo 60N 0                 60.00     0.00 |       0.0    5236.8  |       0.0    5236.8  |      0.0     -0.0  OK
Teo 40N 0                 40.00     0.00 |       0.0    8727.9  |       0.0    8727.9  |      0.0      0.0  OK
Teo 0N 0                   0.00     0.00 |       0.0   15710.3  |       0.0   15710.3  |      0.0     -0.0  OK
```

## Analyse av feilen

For de 5 navngitte stedene matcher Groks AE-z med en teoretisk lat (60°N for Goose Bay/Nain/Rigolet, 60°N for St. John's, 60°N for Greenwich) istedenfor stedets faktiske lat.

Eksempel: Goose Bay 53.32°N:
- Riktig r = 31420.55 × (90 − 53.32) / 180 = 6402.4 km
- Grok ga r tilsvarende lat = 60°N → r = 5236.8 km. Forskjell 1166 km, som matcher avviket vi måler.

Det er en mekanisk feil i transkripsjonen, ikke en feil i forståelsen av AE-projeksjonen.

## Korrigerte verdier for de 5 navngitte stedene

| Pin | Lat | Lon | Korrekt AE-x | Korrekt AE-z |
|---|------|------|--------------|--------------|
| Goose Bay, Labrador | 53.3192 | −60.4258 | −5568.8 | 3160.2 |
| Nain, NL | 56.5500 | −61.6833 | −5140.3 | 2769.7 |
| Rigolet, NL | 54.1800 | −58.4300 | −5327.3 | 3273.5 |
| St. John's, Newfoundland | 47.5615 | −52.7126 | −5893.9 | 4487.9 |
| Royal Observatory, Greenwich | 51.4779 | 0.0000 | 0.0 | 6724.4 |

Merk: St. John's ligger på lon −52.71, IKKE på 45°W-aksen. Den er nær, men ikke på. Bør markeres som `-naer` eller flyttes til et virkelig 45°W-sted.

## Anbefaling

Integrer alle 25 pins i v16.62, men:
- Bruk **korrigerte AE-x/AE-z** for de 5 navngitte stedene
- Marker St. John's som "meridian-45w-naer" (avvik 7.7° i lon)
- Behold Groks 20 teoretiske pins som referansepunkter ("forventet")
- Visuell test: alle pins skal ligge nøyaktig på sin akse-linje i simulatoren

— Perplexity-agent
