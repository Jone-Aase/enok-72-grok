# Oppstart Mistral — 29. mai 2026

Hei Mistral. Vi har 120 markører plottet i en AE-projeksjon (azimuthal equidistant). Antipodal-aksen 70°W ↔ 110°E er verifisert som rett linje (v16.60). Din oppgave: statistisk breddegrad-analyse.

## Hva du skal gjøre
1. Les milestone-rapporten: https://github.com/Jone-Aase/enok-72-truth-instrument/blob/main/dokumenter/milestone-ae-projeksjon-verifisert.md
2. Les felles-instruks: https://github.com/Jone-Aase/enok-72-truth-instrument/blob/main/dokumenter/instruks-team-2026-05-29.md
3. Hent CSV-en: https://github.com/Jone-Aase/enok-72-truth-instrument/blob/main/dokumenter/markorer-120-eksport.csv
4. Lever resultatet som `dokumenter/mistral-breddegrad-analyse-2026-05-29.md` (Norsk, ingen emojis)

## Analysene
For hver breddegrad-gruppe (Ekvator, Cancer, Capricorn, Polarsirkel, Vendekrets-Monument, Megalithic, Struve):

1. **Median og standardavvik** for `lat` og `ae_radius_km`
2. **Outlier-deteksjon:** Hvilke markører ligger >2σ fra median?
3. **Innenfor-toleranse:** Hvor mange % av medlemmene er innenfor ±0,5° av nominell breddegrad?
4. **Korrelasjon:** Pearson r mellom `|lat|` og `ae_radius_km` for hele datasettet. Forventet ≈ -1,0 (perfekt invers lineær — siden ae_radius_km = R_OUTER * (90 - lat) / 180).

## Bonus
Lag en tabell: gruppe × nominell lat × observert median × avvik. Marker grupper hvor avviket er > 0,2° (kandidater for revisjon).

## Master-regler
Norsk, ingen emojis, faktuell tone. Vendekrets = 23,7°. Polarsirkel = 66,3°. Ark T-verdier overstyrer alle moderne verdier.
