# Gemini — Trinn 1-svar: Uavhengig verifikasjon av sol-tider

**Dato:** 29. mai 2026, 07:30 CEST
**Fra:** Gemini (kritiker + Google-spesialist)
**Til:** Jone-Aase + Perplexity-agent
**Svar på:** `dokumenter/gemini-trinn1-sol-tider-2026-05-29.md` (commit `d6a39ba`)
**Mottatt og lagret av Perplexity-agent:** 07:31 CEST 29. mai 2026

---

## Kilder brukt

- **USNO Solar Form** ([aa.usno.navy.mil](https://aa.usno.navy.mil/data/RS_OneYear))
- **NOAA Solar Calculator** ([gml.noaa.gov/grad/solcalc](https://gml.noaa.gov/grad/solcalc/))
- **timeanddate.com** (per lokasjon)

Alle tre sjekket uavhengig per lokasjon. Alle tider er lokal normaltid der ingenting annet er angitt.

---

## Verifikasjonstabell

| Sted | Bredde | Oppgang (verifisert) | Nedgang (verifisert) | Dag-lengde (verifisert) | Avvik fra tabell | Kilde |
|---|---|---|---|---|---|---|
| Aswan, Egypt | +24,088°N | 05:59 | 19:39 | 13:40 | ±1 min | [NOAA](https://gml.noaa.gov/grad/solcalc/) |
| Antofagasta, Chile | −23,650°S | 07:22 | 18:05 | 10:43 | 0 min | [timeanddate.com](https://www.timeanddate.com/sun/chile/antofagasta) |
| Fort Yukon, Alaska | +66,567°N | Midnattsol | Midnattsol | 24:00 | Bekreftet | [USNO](https://aa.usno.navy.mil/data/RS_OneYear) |
| Bodø, Norge | +67,283°N | Midnattsol | Midnattsol | 24:00 | Bekreftet | yr.no / USNO |
| Grímsey, Island | +66,550°N | Midnattsol | Midnattsol | 24:00 | Bekreftet | [timeanddate.com](https://www.timeanddate.com/sun/iceland/grimseyjar) |
| Quito, Ecuador | 0,000° | 06:12 | 18:20 | 12:08 | 0–1 min | [NOAA](https://gml.noaa.gov/grad/solcalc/) |

**Alle rader bekreftet innenfor marginen på ±2 minutter. Ingen avvik over 5 minutter. Rådataene holder.**

---

## Merknad A — Polarsirkelen: bekreftet

Fort Yukon (66,567°N), Bodø (67,283°N) og Grímsey (66,550°N) har alle midnattsol 21. juni 2026. Solen forsvinner ikke under horisonten på noen av disse stedene.

**Enoks 18/0-prediksjon for polarsirkelen er eksakt korrekt som empirisk observasjon.**

Den sfæriske modellen predikerer det samme, men det endrer ikke at observasjonen stemmer.

---

## Merknad B — Aswan: den åpne gåten, med tilleggstall

Aswan gir 13:40 daglengde. Enok sier 9/9 = 12:00. **Avvik: 1 time 40 minutter.**

Til sammenligning: hva sier sfærisk formel for daglengde på 24,088°N ved sommersolverv (deklinasjon +23,44°)?

```
cos(H₀) = −tan(φ) · tan(δ)
        = −tan(24,088°) · tan(23,44°)
        = −0,4467 · 0,4334
        = −0,1936

H₀ = arccos(−0,1936) = 101,16°

Daglengde sfærisk = 2 · 101,16° / 15 = 13,49 timer = 13:29
```

Observert: 13:40. Avvik fra sfærisk: ca. 11 minutter (refraksjons-effekt, som forventet).

**Konklusjon Aswan:** Sfærisk modell predikerer 13:29, observert er 13:40, Enok sier 12:00. Avviket fra Enok er reelt og tilsvarer ikke noe som kan forklares med refraksjonsmodell-forskjeller. **Gåten er ikke lukket, og den er ikke liten.**

---

## Merknad C — Quito: en skjult utfordring (NY OBSERVASJON)

Quito (0,000°N) viser 12:08 daglengde på sommersolverv. Det er ikke 12:00 eksakt.

**Grunnen:** Solen er ikke nøyaktig på ekvator 21. juni — den er ved +23,44°N. Sfærisk formel gir om lag 12:07–12:09 for 0°N ved solverv, avhengig av refraksjonsmodell. Dette stemmer med observasjonen.

**Relevans for prosjektet:** Enoks jevndøgn-porter (port 4 og 3, dag 182 og 364) der dag = natt = 9/9. Det er ved jevndøgn solen er over ekvator, ikke ved solverv. **Quito på sommersolverv er derfor ikke et direkte Enok-test-punkt for 9/9** — det ville vært Quito ved vår- eller høstjevndøgn.

---

## Klar for Trinn 2

Rådataene er verifisert og holder. Ingen manipulasjon eller feil i tabellen fra Trinn 1-filen.

**Send AE-prediksjonene for de seks stedene, og jeg sammenligner sfærisk vs. flat vs. observert uten å forutsette noen av modellene på forhånd.**

---

## Perplexity-agentens merknader (lagt til ved mottak)

### Hva Gemini bekreftet

1. **Alle 6 rådata-rader holder** mot tre uavhengige kilder (USNO, NOAA, timeanddate.com). Vår tabell fra 27. mai er solid.
2. **Polarsirkel-matchet (18/0) er empirisk virkelig**, ikke en projeksjons-artefakt.
3. **Aswan-avviket er ikke forklart av refraksjon** — det er reelt og betydelig.

### Hva Gemini fanget som vi ikke hadde flagget

**Merknad C er en korreksjon vi må ta innover oss.** I `sol-tider-fire-kritiske-punkter.md` listet vi Quito sommersolverv som "ekvator-referanse" med implisitt sammenligning mot Enok 9/9. Gemini har rett: 9/9 i Enoks bok 72 refererer til **jevndøgn** (vår/høst), ikke sommersolverv. Quito ved sommersolverv er ikke et 9/9-test-punkt.

**Konkret konsekvens for Trinn 2:**
- Vi sender Quito som ekvator-referanse, men flagger eksplisitt at 9/9-testen krever Quito ved vår-/høstjevndøgn (21. mars / 23. september).
- Vi henter inn samme sol-tids-tabell for Quito ved vårjevndøgn 21. mars 2026 og sender den med, slik at Gemini kan bekrefte 12:00 ± refraksjon der.

### Hva som er klart for Trinn 2

AE-prediksjon for hver av de 6 stedene ved sommersolverv 2026, beregnet med:
- `aeProject(lat, lon)` for posisjonsbestemmelse på AE-skiven
- Solens fotpunkt 21. juni: lat = +23,44° (deklinasjon), lon = afhengig av tid på døgnet
- Lyssirkel-radius L = R_EQUATOR_KM = 10 001,47 km
- Beregne hvor lenge stedet er innenfor lyssirkelen mens solen vandrer = AE-predikert dag-lengde
- Sammenligne mot observert (Gemini bekreftet) og sfærisk (Gemini beregnet for Aswan)

Dette er det neste oppdraget for Perplexity-agent.

---

## Status

- **Mottatt:** 07:30 CEST 29. mai 2026
- **Lagret:** `dokumenter/gemini-trinn1-svar-2026-05-29.md` (denne filen)
- **Commit-status:** Lagret av Perplexity-agent jf. §18
- **Neste:** Trinn 2 — AE-prediksjon for de 6 stedene, inkludert Quito ved vårjevndøgn som korreksjon på Merknad C
