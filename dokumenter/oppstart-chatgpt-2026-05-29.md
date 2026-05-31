# Oppstart ChatGPT (GPT-5.5) — 29. mai 2026

Hei. Rutenettet er verifisert (v16.60 antipodal-test bestått). Din oppgave: kvalitetskontroll av CSV-eksporten med 120 markører.

## Hva du skal gjøre
1. Les milestone-rapporten: https://github.com/Jone-Aase/enok-72-truth-instrument/blob/main/dokumenter/milestone-ae-projeksjon-verifisert.md
2. Les felles-instruks: https://github.com/Jone-Aase/enok-72-truth-instrument/blob/main/dokumenter/instruks-team-2026-05-29.md
3. Hent CSV-en: https://github.com/Jone-Aase/enok-72-truth-instrument/blob/main/dokumenter/markorer-120-eksport.csv
4. Lever resultatet som `dokumenter/chatgpt-csv-qa-2026-05-29.md` (Norsk, ingen emojis)

## Sjekklisten din
1. **Lat/lon-validitet:** Alle 120 markører — lat ∈ [-90, 90], lon ∈ [-180, 180]
2. **AE-radius:** Verifiser at `ae_radius_km = 31420.55 * (90 - lat) / 180` stemmer for hver rad
3. **Gruppe-konsistens:**
   - Cancer-pins: lat innenfor 23,7° ± 0,5°
   - Capricorn-pins: lat innenfor -23,7° ± 0,5°
   - Ekvator-pins: lat innenfor 0° ± 0,5°
   - Polarsirkel-pins: lat innenfor 66,3° ± 0,5°
4. **Meridian-konsistens:**
   - Meridian-70W: lon innenfor -70° ± 0,5°
   - Meridian-110E: lon innenfor +110° ± 0,5°
   - Meridian-150E: lon innenfor +150° ± 0,5°
   - Meridian-149W: lon innenfor -149° ± 0,5°
5. **Outliers:** Identifiser pins som faller utenfor. Foreslå om de skal:
   - Flyttes til riktig gruppe
   - Markeres som "-naer"-type (allerede en konvensjon vi bruker)
   - Fjernes helt

## Master-regler
Norsk, ingen emojis, faktuell tone. Vendekrets = 23,7° (Ark T H212), IKKE 23,5°. Lokasjoner skal aldri flyttes — bare grupperingen kan endres.
