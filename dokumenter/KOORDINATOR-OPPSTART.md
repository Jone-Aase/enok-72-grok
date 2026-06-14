# KOORDINATOR-OPPSTART — E-Earth / Gamingmotor

Dato: 2026-06-14
Repo: Jone-Aase/enok-72-grok
Branch: arbeidsoriginal/ge-nett-0e-2026-06-13

---

## Felles arbeidsmodell for E-Earth / Gamingmotor / GE-GPS

> **Låst: 2026-06-15. Alle agenter plikter å følge denne modellen uten unntak.**

### Kildehierarki

GitHub `arbeidsoriginal/*` = originalen og offisielt sannhetslager.

Vercel = primær arbeidskopi og preview-miljø.

Lokal clone = backup-arbeidskopi og backup-preview.

### Rollefordeling

ChatGPT kontrollerer GitHub-originalen:
- branches
- commits
- PR-er
- diff
- mergebase
- status checks
- merge, kun etter eksplisitt GO fra Jone-Aase

Perplexity kontrollerer Vercel/arbeidskopien:
- lokal og Vercel-testing
- preview
- praktisk kjøring
- rapport tilbake til teamet

Codex kan patche i arbeidskopien:
- kun på én angitt branch
- kun etter eksplisitt instruks
- må vise full diff før eventuell push

Grok fungerer som reviewer:
- ikke skrive
- ikke endre filer
- ikke pushe uten egen eksplisitt godkjenning

### Kritisk regel for store filer

Ingen agent skal bruke avkortet MCP/API-output som bevis for at noe mangler eller er fraværende.

For store filer gjelder:

Vercel / lokal clone = full lesing og patching.

GitHub / MCP = originalkontroll, PR, diff, status, commits og målrettede linjeutdrag.

Dette oppsettet skal gjøre arbeidet tryggere ved å unngå at agenter bruker chat-grensesnittet som arbeidsbenk for store filer, og ved å sørge for at det alltid finnes én klar original på GitHub.

---

## ⛔ OBLIGATORISK REGEL — INGEN UNNTAK

> **Ingen agent, koordinator eller kodeverktøy får arbeide med eller skrive kode for E-Earth**
> **uten at de først har lest denne filen og bekreftet at de har forstått innholdet.**

Dette gjelder uten unntak for:

- **Perplexity**
- **ChatGPT** (alle versjoner)
- **Gemini** (Google)
- **Copilot** (GitHub / Microsoft)
- **Grok** (xAI)
- **Codex** (OpenAI)
- **Claude Opus** (Anthropic)
- Alle andre AI-agenter, koordinatorer eller kodeverktøy som brukes på E-Earth

### Slik bekrefter du

Før du gjør noe som helst — inkludert å svare på spørsmål, foreslå kode eller planlegge noe — svar med følgende setning **ordrett**:

> «Jeg har lest KOORDINATOR-OPPSTART.md og forstår at vi nå jobber med Gamingmotoren.
> Nåværende mål er GE-GPS-1A: read-only hover-posisjon på GE-edderkoppnettet.
> Kartmotoren, Leaflet og ny kartmotor røres ikke.»

Hvis du ikke kan bekrefte dette, skal du **stoppe og be Jone Aase gi deg filen før du fortsetter.**

---

## 1. De to motorene — ikke bland dem

E-Earth har to separate motorer. De skal **aldri** blandes:

| Motor | Teknologi | Status | Rolle |
|---|---|---|---|
| **Kartmotor** | Three.js + Kartverket-fliser | Beta — operativ | Henter og viser kartdata fra Kartverket/OSM |
| **Gamingmotor** | Three.js / WebGL — fri pikselflate | Tidlig alfa | Bygger sin egen pikselflate fra grunnen, uavhengig av kartleverandører |

- **«Kartmotor»** = tidligere kalt «Baseline motor» eller «Leaflet-motor»
- **«Gamingmotor»** = tidligere kalt «Clean motor» eller «Rule 1-flaten»

---

## 2. Hva vi holder på med NÅ

**Vi jobber KUN med Gamingmotoren.**

Kartmotoren, Leaflet, ny kartmotor — **alt dette ligger og røres ikke.**

### Nåværende mål: GE-GPS-1A

Gaming-motoren knyttes til GE-edderkoppnettet og viser posisjoner — slik GPS gjør i dag.

```text
musens skjermposisjon
→ X/Z-posisjon på Layer 1-plane
→ geGridLatLonFromPosition(x, z)
→ lat/lon
→ visning i UI (statusbar)
```

Dette er **read-only**. Ingen kode skal flytte objekter, endre geometri eller påvirke kartmotor.

---

## 3. Lagstruktur — låst

```text
[Øverste del av Layer 1]  ← Kartlag (kontinenter, kanter) — røres ikke nå
[Underste del av Layer 1] ← GE-edderkoppnett + solbaner + plottede punkter  ← GAMING-MOTOREN ER HER
[Layer 2]                  ← Sol / måne / bevegelige objekter — røres ikke nå
```

GE-edderkoppnettet ligger **underst i Layer 1** — det er posisjonsgrunnlaget alt annet bygges oppå.

---

## 4. Utviklingsrekkefølge

| Fase | Navn | Status | Beskrivelse |
|---|---|---|---|
| ✅ | **GE-GPS-1A** | Klar for merge (PR #8) | Read-only hover-posisjon på GE-nettet |
| 🔜 | **GE-GPS-1B** | Neste | Kamera-siktepunkt → lat/lon |
| ⏳ | **GE-GPS-1C** | Senere | Kamera-høyde / zoom / LOD |
| ⏳ | **GE-GPS-1D** | Senere | Kartmotor tile-valg via LOD + kamera-pos |
| ⏳ | **SOL-SIRKLER-1A** | Etter GPS | Solens 5 hovedbaner som låste ankerpunkter |
| ⏳ | **KART-/KANT-FESTE** | Etter sol-ankre | Kontinenter/kanter festes mot GE-nett + solbaner |

---

## 5. Hva som IKKE skal røres nå

- Kartmotor
- Leaflet / ny kartmotor
- app.js (annet enn GE-GPS-1A-kode)
- index.html (annet enn GE-GPS-1A-kode)
- aeProject / latToR / geGridLatLonFromPosition / geGridPositionFromLatLon
- GE_GRID-konstanter
- Solbaner
- Punkter / objekter / MARKERS-data
- Layer 2-dynamikk
- Geometri / anker / transform

---

## 6. Fullt plandokument

Full teknisk plan ligger her:
`dokumenter/GAMING-MOTOR-LAYER1-GE-EDDERKOPPNETT-GPS-PLAN.md`

Les dette dokumentet for alle tekniske detaljer, koordinatlogikk og debug-objekter.

---

## 7. Koordinatorenes ansvar

Følgende koordinatorer er eksplisitt navngitt og pålagt dette ansvaret:

| Koordinator | Leverandør | Plikt |
|---|---|---|
| **Perplexity** | Perplexity AI | Les og bekreft ved oppstart av hver ny samtale |
| **ChatGPT** | OpenAI | Les og bekreft ved oppstart av hver ny samtale |
| **Gemini** | Google | Les og bekreft ved oppstart av hver ny samtale |
| **Copilot** | GitHub / Microsoft | Les og bekreft før du foreslår eller skriver kode |
| **Grok** | xAI | Les og bekreft ved oppstart av hver ny samtale |
| **Codex** | OpenAI | Les og bekreft før du genererer kode |
| **Claude Opus** | Anthropic | Les og bekreft ved oppstart av hver ny samtale |

### Felles regler for alle

- **Les denne filen ved oppstart av hver ny samtale om E-Earth.**
- **Bekreft ordrett at du har lest og forstått før du svarer på noe som helst.**
- Hvis du er usikker på om noe gjelder Gamingmotoren eller Kartmotoren — **spør før du gjør noe.**
- Du skal aldri anta at kontekst fra forrige samtale sitter i minnet ditt — **les alltid denne filen først.**
- Du skal aldri begynne å kode uten at Jone Aase eksplisitt har gitt GO på oppdraget.

---

*Opprettet: 2026-06-14 av Perplexity på vegne av Jone Aase.*
*Oppdatert: 2026-06-14 — Grok, Codex og Claude Opus lagt til i obligatorisk koordinatorliste.*
*Oppdatert: 2026-06-15 — Felles arbeidsmodell (låst) lagt inn øverst av Perplexity.*
*Formål: Forhindre at arbeid går tapt fordi koordinatorer starter uten kontekst.*
