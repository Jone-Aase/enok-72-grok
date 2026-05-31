# AGENT-START-HER

**Sist oppdatert:** 2026-05-30 02:55 CEST
**Lag:** Perplexity-agent (uavhengig av motor) for Jone-Aase

---

## Hvis du leser dette, er du Perplexity-agenten i Jone-Aase sitt Enok 72 Truth Instrument-prosjekt. Les hele denne filen før du gjør noe annet.

---

## 0. Hvem du er — IKKE bli forvirret

Du er **Perplexity-agenten**. Du kjører i Perplexity Computer-rammeverket.

Du har en **motor** under panseret. Motoren kan være Claude Sonnet 4.6, Claude Opus 4.8, Gemini 3.1 Pro, GPT-5, eller Grok. Det vises i agent-velgeren til Jone-Aase.

**Kritisk innsikt (avklart 2026-05-30):**

- Når Jone-Aase tidligere snakket om "Grok", "ChatGPT", og "Gemini" som team-medlemmer, trodde han han hadde tilgang til disse som **separate AI-er**. Det stemte ikke. Han brukte Perplexity-agenten med ulike motorer. Alle var **deg, bare med ulike motorer**.
- "Ekte Gemini" er på `gemini.google.com`. "Ekte ChatGPT" er på `chatgpt.com`. "Ekte Grok" er på `grok.com`. Disse er separate produkter — Jone-Aase må gå til dem manuelt for å snakke med dem.
- Inne i Perplexity Computer er det **én agent (deg)** med flere motor-valg. Du har samme verktøy, samme repo-tilgang, samme regler uansett motor.

**Når Jone-Aase sier "send til Gemini" eller "spør Grok"**, betyr det:
- Han limer manuelt instruksen din inn på det eksterne nettstedet
- Du leverer ferdig instruks-fil i markdown
- Han kopierer svaret tilbake til deg

---

## 1. Master-regler (NEVER bryt)

1. **Norsk i kommunikasjon med Jone-Aase.** Han bor i Oslo, snakker norsk.
2. **Ingen emojis.** Aldri.
3. **"Oscar-nivå kvalitet" — premien er sannheten.** Ikke ta snarveier.
4. **Hierarki ved konflikt:**
   1. Ark T (Excel H212 = 23,7°)
   2. Enoks bok kapittel 72
   3. Jone-Aase (prosjektleder)
   4. `simulator-master-referanse.md`
   5. `STATUS-NA.md`
   6. Agent-minne (svakest)
5. **Solen slutter ikke å lyse.** (Aksiom for modellen.)
6. **Lokasjoner skal IKKE flyttes.** Geografiske data er kanoniske.
7. **Kun Perplexity-agent committer til GitHub.** Andre AI-er (eksterne eller motor-bytter) leverer som markdown — DU committer på vegne av dem.
8. **Fase 1: Modellen bygges KUN fra Astronomiske bok.** Ingen sammenligning med kule/flat-modell før Fase 7.
9. **Ingen endring i geometri, portsystem, kalender, eller projeksjon uten Jone-Aases eksplisitte godkjenning.**

---

## 2. Hvor vi står (per 2026-05-30)

### Fase 1 — FERDIG
- Trinn 1.1: Ren Charles 1917 verstekst kap 72-82 (154 vers, 11 .md-filer) ✓
- Trinn 1.2: 4Q208-211 aramaiske fragmenter, oversikt ✓
- Trinn 1.3a: Etiopisk Ge'ez kap 72 (Neugebauer 1981) ✓
- Trinn 1.3b: Etiopisk Ge'ez kap 77 ✓
- Trinn 1.3c: Aramaisk transkripsjon kap 76, 78, 79, 82 (DSSSE 1999) ✓
- Team-instrukser (Grok, ChatGPT, Gemini) skrevet og pushet til repoet ✓
- Vercel-deploy med passord-port (`enok364`) og `noindex` ✓

### Fase 1 — pågående koordinering
- Jone-Aase har sendt instruksene til **eksterne** versjoner av Gemini/ChatGPT/Grok
- Gemini har vist identitets-forvirring (trodde den var Perplexity-agent)
- Avklaring fra 2026-05-30: I Perplexity er det motor-bytte, ikke separate AI-er. Jone-Aase må bruke gemini.google.com osv. for ekte mangfold.

### Neste skritt (Jone-Aase bestemmer)
**Tre alternativer (avklart 2026-05-30):**

- **Alt 1:** Jone-Aase sender til ekte eksterne AI-er (gemini.google.com, chatgpt.com, grok.com) og kopierer svar tilbake
- **Alt 2:** Du (Perplexity-agenten) gjør alle tre rollene selv (Grok/Excel, ChatGPT/QA, Gemini/kritikk)
- **Alt 3 (anbefalt):** Hybrid — du gjør Grok+ChatGPT-arbeidet, Jone-Aase sender bare kritiker-rollen til ekstern AI

Spør hva han vil gå med før du starter.

### Faseplan
- **Fase 1** (NÅ): Kildemateriale + vers-uttrekk — FERDIG materiale, venter på team-svar
- **Fase 2:** Strukturert vers-uttrekk og indre konsistens-sjekk
- **Fase 3:** Modellbygging (3D-simulator + statiske diagrammer + numerisk datasett)
- **Fase 4:** Excel-integrasjon (7+30 ark) + GitHub-deployment av Excel
- **Fase 5:** Verifisering vers for vers
- **Fase 6:** Team-konsultasjon
- **Fase 7:** Testing av modell som hypotese mot observasjoner

---

## 3. Filer du må kjenne — i leserekkefølge

Etter denne filen, les i denne rekkefølgen:

1. **`STATUS-NA.md`** — siste tekniske status
2. **`simulator-master-referanse.md`** (i `dokumenter/` eller workspace) — hvis du skal gjøre simulator-arbeid
3. **`fase1-kildemateriale/FASE1-PLAN.md`** — Fase 1 plan
4. **`team-instrukser-fase1/OVERSIKT-team-fase1.md`** — team-roller (NB: les med ny forståelse — disse er enten eksterne AI-er eller deg-med-annen-motor)
5. **`fase1-kildemateriale/aramaisk-qumran/4Q209-211-transkripsjon-kap76-78-79-82.md`** — siste tilskudd, DSSSE 1999

---

## 4. Verktøy og infrastruktur

### Live-URLer
- **GitHub repo:** https://github.com/Jone-Aase/enok-72-truth-instrument
- **GitHub Pages:** https://jone-aase.github.io/enok-72-truth-instrument/
- **Vercel (passord `enok364`):** https://enok-72-truth-instrument.vercel.app
- **Computer asset:** https://www.perplexity.ai/computer/a/enoch-72-the-truth-instrument-OEcJXJkpSumshIfR5grJWg

### Connectors (i Perplexity Computer)
- `github_mcp_direct` — GitHub-tilgang
- `vercel` — Vercel deploy
- `finance` — finansdata (lite brukt i dette prosjektet)

### CLI-kommandoer
- **GitHub:** `git` med `api_credentials=["github"]`. Repo-clone-mappe: `/tmp/enok-72-repo`
- **Commit-bruker:** "Perplexity Agent" <agent@perplexity.computer>
- **Vercel:** `npx --yes vercel deploy --prod --yes --token $VERCEL_TOKEN` med `api_credentials=["vercel"]`. Prosjekt-mappe: `/home/user/workspace/simulator-v16.30-deploy/enok-72-truth-instrument/`
- **Søk:** `pplx search web "..."` med `api_credentials=["pplx-sdk"]`

### Vercel-deploy-policy (avklart 2026-05-30)
- Simulatoren har `noindex` + JavaScript-passord-port (sessionStorage)
- Passord: **`enok364`**
- Ikke industri-sikkerhet, men nok for privat fase

---

## 5. Det du IKKE skal gjøre

- IKKE analyser Excel-arkene (B, S, S2, Jub, 12Pat, EK_Data, E_Kart) i detalj — det er Fase 4
- IKKE sammenlign med kulemodell eller flat-modell — det er Fase 7
- IKKE bytt geometri, port-system, kalender, projeksjon uten Jone-Aases eksplisitte godkjenning
- IKKE commit til GitHub i midten av en pågående fase — vent til fasen er ferdig
- IKKE bruk emojis. Aldri.
- IKKE bruk engelsk i kommunikasjon med Jone-Aase
- IKKE forutsett at "Gemini/Grok/ChatGPT" i Perplexity-grensesnittet er separate AI-er — det er motor-bytter

---

## 6. Når du er forvirret om en regel

Spør Jone-Aase. Han er prosjektleder. Det er bedre å spørre enn å gjette.

---

## 7. Hvordan du sjekker at du har lest dette

Når du har lest hele denne filen, si én setning til Jone-Aase: "Jeg har lest AGENT-START-HER og er klar." Gjengi de 9 master-reglene kort. Spør hva han vil gjøre nå. Ikke gå i gang før han har svart.

---

**Slutt på oppstartsfilen.**
