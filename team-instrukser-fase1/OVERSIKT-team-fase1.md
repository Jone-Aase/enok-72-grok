# Team-instrukser Fase 1 — Oversikt

**Dato:** 2026-05-29
**Status:** UTKAST — venter Jone-Aases godkjenning før utsendelse
**Mistral:** Satt på hvile (mister kontakt) — henter ny tilkobling senere

---

## Sammendrag

Vi er nå klare med Trinn 1.1 (Charles 1917 ren tekst), Trinn 1.2 (aramaiske 4Q208-211 fragmenter), og Trinn 1.3 (etiopisk Ge'ez via Neugebauer 1981) i Fase 1. Neste skritt er parallell team-arbeid for å bygge **vers-tabeller, kvalitetskontroll, og kritiske spørsmål** før vi går videre til Fase 2 (modellbygging).

## Rollefordeling

| Team-medlem | Hovedrolle | Fase 1 oppgave |
|---|---|---|
| **Grok** (m/Excel-skills) | Minne / utvikler / Excel-spesialist | Bygge vers-tabeller i Excel: H_AstronomiskeBok, H_Tall, H_Diff |
| **ChatGPT** | Kvalitetskontroll (QA) | Sjekke 11 Charles 1917 .md-filer mot Sacred Texts original |
| **Gemini** | Kritiker / Google-søk | Sammenligne Charles 1917 vs Neugebauer 1981 fra Ge'ez; stille de vanskelige spørsmålene |
| **Mistral** | Tilleggsanalyse | PÅ HVILE — henter ny tilkobling |

## Parallell arbeid

De tre oppgavene kan utføres **parallelt**:

- Grok jobber med **strukturering** (Excel-tabeller)
- ChatGPT jobber med **kvalitet** (kontrollesning)
- Gemini jobber med **kritikk** (oversettelses-konflikter, åpne spørsmål)

Ingen overlapper hverandre. Alle leverer til Perplexity-agent som sammen med Jone-Aase går gjennom resultatene.

## Master-regler (felles)

Alle tre instrukser inneholder samme master-regler:

1. Norsk i kommunikasjon
2. Ingen emojis
3. Oscar-nivå kvalitet
4. Hierarki-regel
5. Solen slutter ikke å lyse
6. Lokasjoner skal ikke flyttes
7. Kun Perplexity-agent committer til GitHub
8. **Ny for Fase 1:** Modellen bygges kun fra Astronomiske bok — ingen sammenligning med kule/flat-modell

## Hva som IKKE skjer i Fase 1

- Ingen 3D-simulator bygges (det er Fase 3)
- Ingen Excel-arkene B, S, S2, Jub, 12Pat analyseres i detalj (det er Fase 4)
- Ingen GitHub-commits (avventer hele Fase 1 ferdig)
- Ingen sammenligning med kulemodell eller flat-modell

## Filer som teamet får tilgang til

```
enok-72-truth-instrument/
├── fase1-kildemateriale/
│   ├── FASE1-PLAN.md
│   ├── FASE1-STATUS-TRINN-1.1-OG-1.2.md
│   ├── charles-1912/kapitler-rene-final/      (Grok, ChatGPT, Gemini)
│   ├── aramaisk-qumran/4Q208-211-oversikt.md  (Grok, Gemini)
│   ├── etiopisk-geez/README.md                (Gemini)
│   ├── etiopisk-geez/kap72-neugebauer-...txt  (Gemini)
│   ├── etiopisk-geez/kap77-neugebauer-...txt  (Gemini)
│   └── etiopisk-geez/neugebauer-1981.txt      (Gemini)
├── excel-master/
│   ├── One-voice-740-Perplexity-V6.xlsx       (kun Grok)
│   └── EXCEL-STRUKTUR.md                      (kun Grok)
└── team-instrukser-fase1/
    ├── INSTRUKS-GROK-fase1.md
    ├── INSTRUKS-CHATGPT-fase1.md
    ├── INSTRUKS-GEMINI-fase1.md
    └── OVERSIKT-team-fase1.md (denne fil)
```

## Forventet tidslinje

Når Jone-Aase godkjenner og sender instruksene:

- **Grok:** 2-4 timer (Excel-arbeid er størst)
- **ChatGPT:** 1-2 timer (kontrollesning av 154 vers mot 11 HTML-sider)
- **Gemini:** 2-3 timer (sammenligninger + Google-søk + spørsmål)

Når alle tre er ferdig, kjører vi en **kort syntese** med Jone-Aase før vi går til Fase 2.

---

## Klar for utsendelse?

**Spør Jone-Aase** før utsendelse:

1. Skal alle tre instrukser sendes samtidig, eller én av gangen?
2. Skal Perplexity-agent fungere som mellommann (samle svar), eller kommunisere direkte?
3. Hvis ChatGPT finner avvik i Charles 1917-tekstene våre, skal vi pause Grok inntil disse er løst?
4. Tidsfrist — skal vi sette en?
