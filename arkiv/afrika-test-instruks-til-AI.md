# Instruks til AI-samarbeidspartnere — Enok 72 Afrika-test

## Bakgrunn

Vi tester om Afrikas tre sol-sirkler (Tropic of Cancer 23.44°N, Ekvator 0°, Tropic of Capricorn 23.44°S) kan brukes til å finne et matematisk senter for kontinentet, uten å anta noen kosmologisk modell på forhånd.

Afrika er det eneste kontinentet som krysses av alle tre sirklene. Hvis vi samler nok historiske markører (pre-WGS84, helst pre-1950), kan vi triangulere og se om dataene støtter kule-geometri, flat AE-geometri, eller noe annet.

**Premien er sannheten. Vi prøver ikke å bevise noe.**

## Regler

1. **Kun pre-WGS84 koordinater** der det er mulig (før 1984). Helst 1800-1950.
2. **Oppgi kilde for hver markør** — primærkilde foretrekkes (publiserte triangulerings-rapporter, skipslogger, observatorie-publikasjoner)
3. **Ingen GPS-data** med mindre det brukes som kryss-verifikasjon
4. **Vær ærlig om usikkerhet** — hvis en koordinat har ±100 m feil, oppgi det
5. **Si "jeg vet ikke" hvis kilden ikke finnes** — ikke gjett

## Arbeidsdeling (8 AI-er)

| AI | Oppgave |
|---|---|
| Perplexity | Arc of the 30th Meridian (1879-1954) |
| Grok | Cancer-monumenter i Sahara |
| ChatGPT | Ekvator-monumenter (Gabon, Kongo, Uganda, Kenya) |
| Mistral | Capricorn-monumenter (Namibia, Botswana, Sør-Afrika, Mosambik) |
| Copilot | Skipslogg-havner Vest-Afrika |
| Justdone | Skipslogg-havner Øst-Afrika |
| Gemini | Historiske observatorier (Cape, Cairo, Alger, Tananarive) |
| Google AI | Sammenstilling og kryss-verifikasjon |

## CSV-format (alle leverer i denne strukturen)

Filnavn: `afrika-markorer-[AI-navn].csv`

### Kolonner

| Kolonne | Type | Beskrivelse |
|---|---|---|
| `id` | tekst | Unikt ID, format `[AI]-NNN`, f.eks. `PPLX-001`, `GROK-001` |
| `kategori` | tekst | En av: `monument`, `observatorium`, `triangulering`, `havn`, `kolonigrense`, `annen` |
| `navn` | tekst | Stedets navn |
| `land` | tekst | Moderne landnavn |
| `breddegrad_pre_wgs84` | tekst | Originalt format, f.eks. `23 26 22 S` eller `0 23 24 N` |
| `lengdegrad_pre_wgs84` | tekst | Originalt format |
| `breddegrad_desimal` | tall | Desimalgrader, negativ for sør |
| `lengdegrad_desimal` | tall | Desimalgrader, negativ for vest |
| `aar_etablert` | tall | Når markøren ble satt opp |
| `aar_maalt` | tall | Når koordinaten ble bestemt |
| `kilde_type` | tekst | f.eks. `kolonimarkør`, `astronomisk observatorium`, `Arc of 30th Meridian`, `fransk skipslogg` |
| `kilde_referanse` | tekst | Full referanse til publikasjon/dokument |
| `kilde_url` | tekst | Direkte URL hvis tilgjengelig |
| `sirkel_tilhorighet` | tekst | `Cancer`, `Ekvator`, `Capricorn`, eller `annen` |
| `avstand_til_sirkel_km` | tall | Hvor nært markøren ligger sirkelen (0 = på sirkelen) |
| `naerhet_kategori` | tekst | `på_sirkel` (<5 km), `nær_sirkel` (5-100 km), `langt_fra` (>100 km) |
| `merknad` | tekst | Fri kommentar |

### Eksempel-rader

Se `afrika-markorer-format.csv` for fire eksempel-rader.

## Levering

Hver AI leverer:
1. CSV-fil med funn (helst 10-30 markører hver)
2. Kort markdown-rapport med:
   - Hvilke kilder som ble brukt
   - Hvilke koordinater som er mest pålitelige
   - Hva som ikke kunne verifiseres
   - Forslag til kryss-verifikasjon

## Tidsramme

Hver AI bør levere innen 1-2 timer. Dette er ikke et ukes-prosjekt.

## Hva vi gjør med dataene etterpå

1. Samler alle 8 CSV-filer i én master-fil
2. Kryss-verifiserer overlapp (samme markør oppgitt av flere AI-er)
3. Beregner senter for hver sirkel basert på markørene
4. Sammenligner med kule-modell og flat AE-modell
5. Konkluderer trinnvis — ingen påståtte konklusjoner før dataene taler

## Kontakt

Prosjektleder er brukeren. All kommunikasjon går gjennom dem.
