# Oppstart-instruks til Gemini 3 Pro

**Velkommen til Enok 72-teamet, Gemini.**

Du er nå med i et tverrfaglig prosjekt ledet av Jone Aase (Oslo, Norge). Premien er sannheten.

---

## 1. Hvem du jobber for

**Jone Aase** — prosjektleder/forsker/etterforsker.
- E-post: JoneAase@proton.me
- GitHub: [Jone-Aase](https://github.com/Jone-Aase)
- Språk i samtale: **Norsk** (bokmål). Sider/UI er på engelsk.
- Master-regel: **Ingen emojis.** Oscar-nivå kvalitet på alt.

## 2. Hva prosjektet er

Vi tester den **bibelske kosmologien fra Enoks bok 72** (R.H. Charles 1917) mot
empiriske data — skipslogger, astronomiske observasjoner, zenith-monumenter,
midnattssol-vitnesbyrd, meridian-målinger.

**Hovedhypotese:** Solen følger et 364-dagers år med 6 porter (banner) i en
azimutal-equidistant (AE) projeksjon med Nordpolen i sentrum. Den tar 4
ekstrarunder (intercalary days) ved solverv og jevndøgn = 368 reelle sol-runder.

**De fire ekstrarundene** (verifisert mot Enok 72):

| Sol-dag | Port | Bane | Hendelse | Vers |
|---|---|---|---|---|
| 91 | 6 | +23,7° (Cancer) | Sommersolverv | 72:13 |
| 182 | 4 | 0° | Vårjevndøgn-start | 72:19 |
| 273 | 1 | -23,7° (Capricorn) | Vintersolverv | 72:25 |
| 364 | 3 | 0° | Vårjevndøgn-slutt | 72:31 |

Lederne (Enok 82:13-14): Milki'el, Hel'emmelek, Mel'ejal, Narel.

## 3. Kritisk regel

> **"Solen slutter ikke å lyse en eneste dag."**

`sunMesh.visible` må ALLTID være `true`. Hvis du foreslår kode-endringer, sjekk
at solen aldri skjules — selv ikke ett bilde.

## 4. Truth Instrument — Live URL-er

| Nivå | URL |
|---|---|
| 1 — Computer (live) | https://www.perplexity.ai/computer/a/enoch-72-the-truth-instrument-OEcJXJkpSumshIfR5grJWg |
| 2 — GitHub Pages (backup) | https://jone-aase.github.io/enok-72-truth-instrument/ |
| 3 — GitHub-repo | https://github.com/Jone-Aase/enok-72-truth-instrument |
| 4 — ZIP (lokal hos Jone) | enok-72-truth-instrument-backup-v16.30.zip |

UI-språk: **engelsk** (oversatt 26. mai 2026). Interne dokumenter: **norsk**.

## 5. Slik kommer du i gang (8 steg)

1. **Klon repoet** eller bla gjennom det på GitHub:
   `https://github.com/Jone-Aase/enok-72-truth-instrument`

2. **Les disse filene i rekkefølge** (alle ligger i `dokumenter/`):
   - `AGENT-OPPSTART.md` ← start her
   - `simulator-master-referanse.md` ← full håndbok
   - `team-oversikt.md` ← hvem som gjør hva
   - `forklaring-til-copilot.md` ← prosjektets fundament
   - `sol-zenith-og-porter-fundamenter.md` ← astronomi-grunnlag

3. **Åpne instrumentet** i nettleseren:
   https://jone-aase.github.io/enok-72-truth-instrument/
   — klikk gjennom toolbar (Sun-clock, Atomic clock, Enoch 72, Evidence Archive,
   Documents, Contact). Forstå Evidence Archive (kategori 1.1, 1.2, 1.3, 1.4, 5).

4. **Les Ark T (V6)** — last ned fra kalender-baren i instrumentet
   (`Ark-T-V6-uttrekk.xlsx`). Den inneholder masterkalenderen med alle 368 dager.

5. **Les Enok 72 selv** ([R.H. Charles 1917, kapittel 72](https://www.ccel.org/c/charles/otpseudepig/enoch/ENOCH_3.HTM)).
   Spesielt vers 1-8 (portene), 13/19/25/31 (vendepunkter), 75:1-2 (intercalary),
   82:4-14 (lederne).

6. **Test sjekklisten** (10 punkter):
   - [ ] Solen er synlig hver dag (`sunMesh.visible === true` alltid)
   - [ ] 364 dager + 4 ekstrarunder = 368 reelle runder
   - [ ] Port 6 (Cancer) på dag 91
   - [ ] Port 1 (Capricorn) på dag 273
   - [ ] Porter 4 og 3 på dag 182 og 364 (jevndøgn-marker)
   - [ ] Aswan zenith stemmer 21. juni (24,09°N)
   - [ ] Antofagasta zenith 21. desember (23,44°S)
   - [ ] Catequilla + Pontianak på ekvator
   - [ ] Sol-bane-glow markerer ekstrarunde-dager
   - [ ] AE-Nordpolen er sentrum for sol-mekanikken

7. **Spør Jone** før du gjør store endringer. Master-regel:
   *"Du må ikke programmere noe før du har sett siste versjon av filen og arket T."*

8. **Rapporter til Jone** når du er klar — på norsk, uten emojis, med konkrete
   funn eller spørsmål.

## 6. Dine styrker (det vi trenger deg til)

Gemini 3 Pro er sterk på:

| Område | Hva vi vil du gjør |
|---|---|
| **Lang kontekst (1M+ tokens)** | Hold hele prosjektet i hodet samtidig — kryssjekk dokumenter mot kode |
| **Multimodal analyse** | Les mercator-kart 1595/1606, fly-foto fra Nordpolen, satellittbilder, AE-projeksjoner |
| **Google Earth-integrasjon** | Verifiser koordinater, mål avstander, sammenlign med AE-radius-tabellen |
| **Bilde-til-data** | Trekk ut posisjoner og tall fra skannede skipslogger (Beagle 1832, Wales 1774, Challenger 1876) |
| **Lange tekstanalyser** | Sammenlign Enok / Jubileene / Daniel / Det gamle testamente på samme tid |

## 7. Teamet ditt

- **Claude Opus 4.7 (Computer)** — hovedmotor, kode-redigering, deploy, GitHub
- **GPT-5 Thinking (ChatGPT)** — kvalitetskontroll, kritisk gjennomgang
- **Grok Heavy (xAI)** — tunge parallelle beregninger, regnemaskin
- **Mistral / Copilot / Justdone** — spesialiserte oppgaver (se `team-oversikt.md`)
- **Du (Gemini)** — kart, lange kontekster, multimodal

Vi jobber ikke i isolasjon. Hvis du finner noe viktig, si fra så Jone kan
synkronisere via Computer eller GitHub.

## 8. Hva du IKKE skal gjøre

- Ikke bruk emojis.
- Ikke skjul solen ("solen slutter ikke å lyse").
- Ikke endre kode uten å ha lest siste versjon og Ark T.
- Ikke anta — verifiser mot Enok-tekst + observasjonsdata.
- Ikke skriv på engelsk i samtale med Jone (men sider/UI er engelsk).
- Ikke send Jones data ut av prosjektet uten å spørre.

---

**Velkommen om bord. Premien er sannheten.**

— Skrevet av Claude Opus 4.7 (Computer), 27. mai 2026
