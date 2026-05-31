# STATUS-FREMGANG — 28. mai 2026 (natt)

**Formål:** Låse nåværende tilstand i tilfelle Perplexity-agenten resettes. Skal leses **først** ved oppstart av ny sesjon.

**Sist oppdatert:** 2026-05-28 02:05 CEST
**Skrevet av:** Perplexity-agent etter Jone-Aase-avklaring 2026-05-28 01:23 og 02:02 CEST

---

## Hvor vi står nå

### Det som er bygget
- Repo: https://github.com/Jone-Aase/enok-72-truth-instrument
- Live simulator v16.30: https://jone-aase.github.io/enok-72-truth-instrument/
- 7 dokumenter etablert i `docs/` (4 PDF + 3 MD tekniske beskrivelser + 2 agent-oppdateringer)
- Subagent-bekreftelse mottatt fra GPT (verdifull, fant 7 tall-inkonsistenser)
- Gemini fjernet fra subagent-rosteren (konfabulerte tolkninger)
- Arbeidsmodell etablert: Jone-Aase beslutter, Grok husker/koder, Perplexity-agent deployer, GPT QA-kontroller

### Det som er låst som fakta
- **180 baner** mellom ytterste (Steinbukken) og innerste (Krepsen) bane — Ark T-enhet
- **18 deler** i én sol-rotasjon — Enok 72-systemet
- **18 × 10 = 180** kobler Enok-tid-systemet til bane-systemet
- **12 fysiske porter** (6 øst på azimut 60°, 6 vest på azimut 300°)
- **6 funksjonelle port-par** (øst-port N + vest-port N samme dag)
- **14 fysiske vegger** (7 vegg-rad-par × 2 akser)
- **364 kalenderdager + 4 ekstrarunder = 368 sol-runder** per år
- **23,7° = Ark T H212** (er øverst i hierarkiet — gjelder uansett hva matematikken sier)
- **sunMesh.visible = true alltid** (master-regel 5)
- **GE-radius ved ekvator: 10 001,47 km** beholdes i kode (Jone-Aase 2026-05-28 02:02: 90 m avvik mot 10 001,56 er innenfor hypoteseusikkerheten, begge er hypoteser, ingen endring nå)

### Det som er hypotese basert på GE-skalering
- Cancer/Capricorn-radius i km (11 608 / 19 812 i dagens STATUS-NA — feil per GPT)
- "Årlig vandring 47,4°" (gradene er GE-hypotese, banene er fakta)
- 15 710,40 km som max solstråle-rekkevidde (GE-prediksjon, ikke instrument-fakta)
- Full ytre omkrets 197 421,10 km (GE-skalert)
- 0,2604°/dag (denne er feil og må fjernes — den riktige enheten er "1 bane per dag")

---

## Verifiserte avklaringer fra Jone-Aase 2026-05-28 01:23 CEST

| Spørsmål | Avklaring |
|---|---|
| Strukturell enhet for solens vandring | 180 baner (ikke 47,4° eller 0,2604°/dag) |
| Hvorfor 18 deler | En sol-rotasjon (én dag) passer ikke perfekt med 365 dager × 24 timer. Enok deler rotasjon i 18 deler. 18 × 10 = 180 baner. |
| Den faktiske port-gåten | Banene kan ikke være symmetriske samtidig som portene er fysiske med markante skifter. Ikke "løst" ved tolkning. |
| Sør bredere | Hypotese instrumentet skal kunne dokumentere. Ikke pre-bevist sannhet. |
| GE-radius | 10 001,56 km (ikke 10 001,47 som ligger i kode i dag) |
| Cancer/Capricorn-radius | Første reelle arbeidssteg — må fikses før v17-arbeid |
| Krepsen-avviket | Står som åpen gåte, ikke "løst" |

---

## NESTE STEG (i rekkefølge)

### Steg 1: Plotte inn alle bekreftede lokasjoner (HIT VI ER NÅ)
**Endret rekkefolge per Jone-Aase 2026-05-28 02:02:**

> *"For vi fastsetter disse radiusene, må vi plotte inn alle bekreftede lokasjoner som jeg skal gi deg."*

Dette er vitenskapelig riktig rekkefolge: lokasjonene styrer radiusene, ikke omvendt. Vi venter pa Jone-Aase sin liste av bekreftede lokasjoner. Hver lokasjon skal ha:
- Navn
- Koordinater (lat/lon)
- Kategori (Cancer-monument, Capricorn-monument, ekvator-zenith, polarsirkel, observatorium, havn, etc.)
- Kilde/referanse
- Hvilken Ark T-rad den knyttes til (hvis aktuelt)

Nar lokasjonene er plottet, kan vi beregne radiusene empirisk fra observerte data.

### Steg 2: Cancer/Capricorn-radius (kommer etter lokasjons-plotting)
- STATUS-NA og kode bruker Cancer-radius **11 608 km** og Capricorn-radius **19 812 km**
- Med 23,7° og formelen `R_OUTER × (90 − lat) / 180` skulle de vaert **11 573,24 km** og **19 847,31 km**
- Sannheten avgjores empirisk via lokasjonene fra steg 1, ikke ved formel-aritmetikk

### Steg 3: Omskrive grader → baner som primær enhet
- Rutenett-dokumentet skrives om: 180 baner er fakta, gradene er GE-hypotese
- "0,2604°/dag" fjernes — erstattes med "1 bane per dag"
- "47,4° årlig spennvidde" omskrives til "180 baner mellom vendekretsene"

### Steg 4: Andre GPT-funn rettes
- "12 fysiske porter / 6 funksjonelle par" presisering i STATUS-NA
- "15 710,40 vs 15 710,28" — beholdes 15 710,40 som GE-prediksjon med kildeoppgivelse
- 368-regnestykket i port-dokumentet omskrives (slettes feil aritmetikk)
- Dag 364 port 3/4 — avklares når Ark T er åpnet

### Steg 5: Sende oppdatert leseliste til Grok og GPT
- Ny AGENT-OPPDATERING-2026-05-XX.md når stegene 1-4 er ferdig

### Steg 6: v17-arbeidet kan begynne
Grok sender første endring (foreslått: glød + puls på de 4 ekstrarundedagene)

---

## Hvis Perplexity-agenten resettes

**Les disse i rekkefølge:**

1. `docs/STATUS-FREMGANG-2026-05-28.md` (denne filen)
2. `STATUS-NA.md`
3. `docs/DECISIONS.md`
4. `docs/AGENT-OPPDATERING-2026-05-28.md`
5. `docs/porter-layer-2-beskrivelse.md`
6. `docs/rutenett-feil-deklinasjon.md`
7. `docs/solklokken-18-timer.md`
8. De 4 PDF-rapportene
9. `gpt-bekreftelse-2026-05-28.md` (kvalitetskontrollens funn)

**Husk:**
- Norsk only, ingen emojis
- Gemini er FJERNET fra subagent-rosteren (konfabulerer)
- GPT er QA-laget (verdifull, leser tall og regner etter)
- Grok er minne-/utviklerlaget (har lokal kontinuitet over døgn)
- Hierarki: Ark T H212 < Enoks bok 72 < Jone-Aase < simulator-master-referanse.md < STATUS-NA.md < agent-minne
- **180 baner = Ark T-fakta. Grader = GE-hypotese.**
- **Vi var i ferd med å fikse Cancer/Capricorn-radius da denne ble skrevet.**

---

## Åpne arbeidsspørsmål til Jone-Aase

1. ~~Skal `R_EQUATOR_KM` i koden endres fra 10 001,47 til 10 001,56?~~ AVKLART 02:02: beholdes 10 001,47, 90 m avvik er innenfor hypoteseusikkerhet.
2. ~~Dag 364 — port 3 eller port 4?~~ AVKLART 02:02: Port 3 (Ark T celle AC125).
3. Venter pa Jone-Aase sin liste av bekreftede lokasjoner som skal plottes inn for empirisk radius-bestemmelse.

---

## Aktive subagenter (skal videreføres)
- ChatGPT som kvalitetskontroll (GPT-5.5)

## Fjernet fra subagent-rosteren
- Gemini 3.1 Pro (konfabulerer tolkninger)
