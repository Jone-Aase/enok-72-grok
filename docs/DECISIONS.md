# DECISIONS.md — Beslutningslogg

Hver beslutning logges med dato, hva, hvorfor og konsekvens. Eldste først.

---

## 2026-05-26 — Buestreng-uretting implementert (v16)

**Beslutning:** Erstatt v15-formel `R_EQUATOR * (90 - lat) / 90` med `R_OUTER * (90 - lat) / 180`.

**Begrunnelse:** Hele 180° breddegrad skal strekkes til R_OUTER, slik at sør-halvkulen får riktig posisjon i AE-projeksjonen. r(90) = 0, r(0) = 15 710 km, r(−90) = 31 421 km.

**Konsekvens:** UN_MAP_RADIUS justert til `R_OUTER * 150/180 = 26.184`. Alle posisjoner langs buestrengen omberegnet. v16.30 deployet 26. mai 2026.

---

## 2026-05-27 — Masterfil styrer simulatorarbeid

**Beslutning:** `simulator-master-referanse.md` er øverste sannhetskilde for simulatoren. Ved konflikt med agent-minne, gjelder masterfilen.

**Begrunnelse:** Agenter resettes. Dialoghukommelse er ikke pålitelig over tid. Repo-filer må styre kontinuitet.

**Konsekvens:** Ingen AI-agent skal endre geometri, portsystem eller kalender uten først å sjekke masterfilen og få eksplisitt godkjenning fra Jone-Aase.

---

## 2026-05-27 — Komplett arkiv pushet til GitHub

**Beslutning:** Speile hele workspace-rota til `arkiv/`-mappe i repoet (358 filer, ~81 MB).

**Begrunnelse:** Workspace-sandkassen kan resirkuleres. Materialet må eksistere utenfor sandkassen for å overleve.

**Konsekvens:** Tre lag av redundans: workspace-sandkasse, GitHub `arkiv/`, og zip-fil delt med Jone-Aase. Commit b21fd41.

---

## 2026-05-27 — Låst arbeidsmodell etablert

**Beslutning:** Fire roller med klar ansvarsdeling:

- Beslutningstaker: Jone-Aase
- Minne-/utviklerlag: Grok
- Utfører-/deploylag: Perplexity-agent
- Kvalitetskontroll: ChatGPT

**Begrunnelse:** Perplexity-agenten mister hukommelse mellom sesjoner. Grok beholder kontinuitet over dager. Ved å gjøre Grok til minne-bæreren av utviklingsdialogen, blir Perplexity-agentens resett ikke lenger katastrofalt — utfører-laget kan rekonstruere kontekst fra repo-filer.

**Konsekvens:** STATUS-NA.md og DECISIONS.md må alltid være fersk. Grok-dialog arkiveres i `grok-dialog/`. Versjoner i `grok-versjoner/`.

---

## 2026-05-27 — Grok-pipeline mot v17 etablert

**Beslutning:** Hver Grok-endring lages som lokal zip, mottas av Perplexity-agenten, deployes til separat live-URL, og pushes til egen branch. Først når flere endringer er testet og godkjent, samles de til en final v17.

**Begrunnelse:** Inkrementell utvikling med isolert testing. Hver endring kan rulles tilbake uten å påvirke hovedinstrumentet.

**Konsekvens:** Branch `grok-v17-kandidater` etableres. Hovedinstrumentet (main) endres ikke før Jone-Aase godkjenner samlet v17.

---

## 2026-05-27 — Månen holdes utenfor solinstrumentet

**Beslutning:** Ingen måne-implementasjon i Enok 72 Truth Instrument inntil solmodellen er stabil og verifisert.

**Begrunnelse:** Månesystemet i Enok er komplekst (vers 73-82) og må få eget instrument. Sammenblanding ville forurense sol-verifikasjonen.

**Konsekvens:** Månen er senere arbeid. Solmodellen prioriteres.

---

## 2026-05-27 — Fire kjernerapporter etablert som bevisgrunnlag

**Beslutning:** Fire rapporter pushes til `docs/` som referanse-bevis for alt videre arbeid:

1. `omkrets-rapport-v3-1.pdf` (10 sider) — GE-rutenettet kalibrert mot Pontchartrain Causeway, 45°-regelen, 4 breddegrad-målinger.
2. `vendekretser-vitnesbyrd-2.pdf` (6 sider) — 14 monumenter på 4 kontinenter, beviser ingen drift.
3. `rangering-kriterier-zenith-1.pdf` (3 sider) — binært zenith-fenomen, 5 rangeringsnivåer.
4. `meridian-gull-rapport-1.pdf` (8 sider) — CLIWOC 249 649 observasjoner, 15°/time empirisk.

**Begrunnelse:** Tre søyler i instrumentet (fast geometri + målbar grense + empirisk rotasjon) trenger fast referanse-grunnlag som ikke ligger i flyktig dialog.

**Konsekvens:** Alle AI-agenter (Grok, Gemini, ChatGPT, øvrige) skal lese disse fire før arbeid med v17. Tidligere agent-konklusjon "Cancer alene støtter kule" er KORRIGERT — kule-modellen har internt motsigelsesfull radius (omkrets-v3.1).

---

## 2026-05-27 — Korreksjon av tidligere Cancer-tolkning

**Beslutning:** Tidligere konklusjon at "Cancer-test 19 punkter, omkrets 36 548 km, kule −0,60 % vs AE-Enok −21,35 %" støtter kule-modellen er KORRIGERT.

**Begrunnelse:** Per omkrets-rapport v3.1: WGS84 40 075 km krever radius 6 378 km, mens GE selv (kalibrert mot Pontchartrain) oppgir radius 10 001,47 km. Begge kan ikke være riktige samtidig. Cancer-testen kan derfor ikke isolert "støtte kule" når kule-radien er internt motsigelsesfull.

**Konsekvens:** Funnet beholdes i tabellen, men med korrigert tolkning. 15 710,40 km settes som instrumentets falsifiserbare prediksjon (max solstråle-rekkevidde med GE-skalering).

---

## 2026-05-28 — Tre tekniske kjernebeskrivelser etablert

**Beslutning:** Tre dokumenter pushes til `docs/` for å dekke tekniske bestanddeler som tidligere kun lå i kode:

1. `porter-layer-2-beskrivelse.md` — 12 fysiske porter på øst-akse (60°) og vest-akse (300°).
2. `rutenett-feil-deklinasjon.md` — Jone-Aases formulering: ekvator er midtlinje, ikke solens primære akse. Hver dag = 1° av 180-dagers vandring over 47,4°.
3. `solklokken-18-timer.md` — Enok 18-timers urskive, 72 tikk, drevet av sunLonAngle.

**Begrunnelse:** Subagent-gjennomgang (Gemini 3.1 Pro og GPT-5.5) viste at både portsystemet og solklokken eksisterer i kode, men ikke er forklart i prosjektdokumentasjonen. Rutenett-feilen var beskrevet som prinsipp, men ikke som formell mekanisme med daglig deklinasjon.

**Konsekvens:** AI-agenter har nå fast referanse for alle tre systemdelene. Grok, Gemini og ChatGPT kan lese disse før v17-arbeidet starter. STATUS-NA.md utvidet med ny seksjon "Tekniske kjernebeskrivelser i docs/".
