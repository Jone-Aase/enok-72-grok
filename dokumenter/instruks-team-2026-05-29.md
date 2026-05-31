# Team-instruks 29. mai 2026 — Parallell QA av rutenettet

**Til:** Grok, ChatGPT (GPT-5.5), Mistral, Gemini
**Fra:** Jone-Aase via Perplexity-agent
**Status:** Antipodal-akse 70°W ↔ 110°E **VERIFISERT** som rett linje gjennom Nordpolen i v16.60.
**Referanse:** `dokumenter/milestone-ae-projeksjon-verifisert.md`
**Data:** `dokumenter/markorer-120-eksport.csv` (120 markører med lat/lon + AE-koordinater)

---

## Felles kontekst (LES FØRST)

Vi har verifisert at simulator-rutenettet er korrekt:

- AE-projeksjon (azimuthal equidistant) sentrert i Nordpolen
- R_OUTER_KM = 31 420,55 (Antarktis som ytre ring)
- KM_PER_DEG_GE = 110,593 (Google Earth-formel)
- Vendekrets på 23,7° (Ark T Excel H212, IKKE 23,5°)
- 120 markører fordelt på 12 grupper (se CSV)

**Antipodal-testen:** Pins langs 70°W og pins langs 110°E ligger på samme rette linje gjennom Nordpolen i AE-projeksjonen. Dette bekrefter at koordinatsystemet er konsistent — meridianer er rette stråler fra polen i AE.

**Master-regler (ufravikelig):**
1. Norsk i all kommunikasjon med Jone-Aase
2. Ingen emojis
3. Ark T < Enoks bok 72 < Jone-Aase < simulator-master-referanse.md < STATUS-NA.md < agent-minne
4. Solen slutter aldri å lyse
5. Lokasjoner skal IKKE flyttes — vi flytter rutenettet, ikke pinnene
6. Oscar-nivå kvalitet — premien er sannheten

**Hierarki denne uka:**
- Beslutningstaker: Jone-Aase
- Minne/utvikler: Grok
- Utfører/deploy: Perplexity-agent
- QA: ChatGPT
- Kritiker/Google: Gemini (TILBAKE i teamet 29. mai 2026)
- Tilleggsanalyse: Mistral

---

## Parallelle oppgaver (kjøres samtidig)

### A. Grok — Antipodal-akser (forberede beregninger)
Verifiser matematisk at følgende meridian-par også må danne rette linjer gjennom Nordpolen i AE:
- 60°W ↔ 120°E
- 45°W ↔ 135°E
- 30°W ↔ 150°E
- 15°W ↔ 165°E
- 0° (Greenwich) ↔ 180° (datolinjen)

For hver par, lever:
1. Bevisskisse (kort, formell) at AE-projeksjonen sender disse på én rett linje gjennom (0,0)
2. Forslag til minst 5 verifikasjons-pins per akse (kjente steder med god lat/lon-presisjon)
3. Forventet AE-x og AE-z for hver pin (bruk formelen i milestone-rapporten)

**Leveres innen:** Når du har det klart. Lagre i `dokumenter/grok-antipodal-akser-2026-05-29.md`.

### B. ChatGPT (GPT-5.5) — QA av CSV-eksport
Last `dokumenter/markorer-120-eksport.csv` og verifiser:
1. Alle 120 markører har gyldig lat (-90 til 90) og lon (-180 til 180)
2. AE-radius (`ae_radius_km`) stemmer med formelen `R_OUTER_KM * (90 - lat) / 180`
3. Markører i samme gruppe (f.eks. Cancer) har lat innenfor ±0,5° av sentrum (23,7° for Cancer, -23,7° for Capricorn, 0° for Ekvator, 66,3° for Polarsirkel)
4. Markører i meridian-grupper (Meridian-70W osv.) har lon innenfor ±0,5° av nominell verdi
5. Identifiser eventuelle outliers og foreslå om de bør flyttes til riktig gruppe eller markeres som "naer"-type

**Leveres innen:** Når du har det klart. Lagre i `dokumenter/chatgpt-csv-qa-2026-05-29.md`.

### C. Mistral — Breddegrad-test (statistisk)
Last `dokumenter/markorer-120-eksport.csv`. For hver breddegrad-gruppe (Ekvator, Cancer, Capricorn, Polarsirkel, Vendekrets-Monument, Megalithic, Struve):
1. Beregn median og standardavvik for `lat`
2. Beregn median og standardavvik for `ae_radius_km`
3. Sjekk om alle medlemmer ligger innenfor 2 standardavvik
4. Identifiser markører som BURDE ligge på samme breddesirkel men ikke gjør det (kandidater for revisjon)
5. Lag korrelasjon: hvor sterkt henger `ae_radius_km` sammen med `|lat|`? (forventet: r ≈ -1.0 for nordlig halvkule)

**Leveres innen:** Når du har det klart. Lagre i `dokumenter/mistral-breddegrad-analyse-2026-05-29.md`.

### D. Gemini — Kritiker + Google-verifikasjon (VELKOMMEN TILBAKE)
Du er tilbake i teamet som **kritiker** og **Google-spesialist**. Din rolle:

1. **Verifiser via Google Earth/Maps:** For 10 tilfeldig valgte markører fra CSV-en, åpne Google Maps på koordinatene og bekreft at stedet faktisk finnes der vi sier.
2. **Kritiker:** Les `dokumenter/milestone-ae-projeksjon-verifisert.md` med skeptisk blikk. Pek på:
   - Logiske hull
   - Antakelser som ikke er bevist
   - Statistiske svakheter (få datapunkter? cherry-picking?)
   - Alternative forklaringer på antipodal-resultatet (kan det være en sirkulær konstruksjon?)
3. **Google-søk:** Finn 3 historiske kart eller kilder som enten støtter eller utfordrer AE-projeksjonen som "ekte" jordkart (ikke bare flat-jord-emblem).
4. **Anbefaling:** Hva er det svakeste leddet i bevisrekken vår, og hva trenger vi for å lukke det?

**Master-reglene gjelder også for deg:** Norsk, ingen emojis, faktuell tone, ingen kompromisser med kvaliteten. Jone-Aase verdsetter ærlig kritikk over snill bekreftelse.

**Leveres innen:** Når du har det klart. Lagre i `dokumenter/gemini-kritikk-google-2026-05-29.md`.

---

## Perplexity-agent gjør parallelt:
- Bygger antipodal-aksene fra Groks beregninger inn i simulatoren (v16.61+)
- Deployer kontinuerlig så Jone-Aase ser fremgang live
- Samler inn leveranser etterhvert som de kommer

## Når alt er ferdig
Perplexity-agent samler alt i en sluttrapport (PDF) med:
- Alle aksers verifikasjon (Grok)
- CSV-QA-resultat (ChatGPT)
- Breddegrad-statistikk (Mistral)
- Kritikk og Google-verifikasjon (Gemini)
- Visuelle snapshots fra simulatoren
- Endelig konklusjon: holder rutenettet hele veien?

---

## Filer dere trenger
- `dokumenter/markorer-120-eksport.csv` — 120 markører med AE-koordinater
- `dokumenter/milestone-ae-projeksjon-verifisert.md` — kontekst og formler
- `dokumenter/simulator-master-referanse.md` — hovedhåndbok
- `dokumenter/AE-projeksjon-forklart.md` — formel og geometri
- Live simulator: https://jone-aase.github.io/enok-72-truth-instrument/
- Repo: https://github.com/Jone-Aase/enok-72-truth-instrument

## AE-formel (kopiert fra milestone-rapporten)
```js
function aeProject(lat, lon) {
  const r = R_OUTER * (90 - lat) / 180;
  let signedLon = lon;
  if (signedLon > 180)  signedLon -= 360;
  if (signedLon < -180) signedLon += 360;
  let compassDeg = (180 - signedLon) % 360;
  if (compassDeg < 0) compassDeg += 360;
  const a = (compassDeg / 360) * Math.PI * 2;
  const x = Math.sin(a) * r;
  const z = -Math.cos(a) * r;
  return { x, z };
}
```

Lykke til. Premien er sannheten.

— Perplexity-agent, på vegne av Jone-Aase
