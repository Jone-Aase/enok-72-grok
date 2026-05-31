# Enok 72 — Team-oversikt (9 medlemmer)

**Prosjektleder**: Jone-Aase  
**Status**: Fase — parallell QA av verifisert rutenett (etter v16.60 antipodal-test)  
**Dato sist oppdatert**: 29. mai 2026

## ENDRING 29. mai 2026
- **Gemini er TILBAKE i teamet** som kritiker og Google-spesialist (var midlertidig ute, nå nødvendig for kritisk gjennomgang)
- Alle andre roller uendret
- Aktiv felles-instruks: `dokumenter/instruks-team-2026-05-29.md`

## COMMIT-DISIPLIN (vedtatt 29. mai 2026, 07:10 CEST av Jone-Aase)

**Kun Perplexity-agenten committer til GitHub.** Ingen andre AI-medlemmer skriver direkte til repoet — hverken Grok, ChatGPT, Mistral, Gemini, Copilot, JustDone eller Google AI.

**Hvorfor:** Master-regel #4 (hierarki):
`Ark T < Enoks bok 72 < Jone-Aase < simulator-master-referanse.md < STATUS-NA.md < agent-minne`

De øvrige AI-ene leverer **innhold** (analyser, beregninger, anbefalinger). Beslutning om hva som går inn i instrumentet ligger hos Jone-Aase (beslutningstaker) og Perplexity-agent (utfører/deploy). Hvis flere AI-er kunne commite direkte, ville instrumentet være sårbart for endringer fra noen som ikke forstår helheten.

**Eksempel som motiverte regelen:** 29. mai 2026 leverte Grok antipodal-akse-rapport med 5 navngitte pins. Han hadde mekanisk blandet sammen akse-lat og stedets faktiske lat, slik at 5 av 25 AE-x/AE-z-verdier ble feil. Perplexity-agent fanget feilen ved å kjøre alle 25 pins gjennom faktisk `aeProject()`, korrigerte de 5 verdiene, og lagret begge rapporter (Groks original + Perplexity-verifikasjon) i repoet. Hvis Grok hadde commitet direkte, ville feilen ligget i koden.

**Workflow:**
1. AI-medlem leverer markdown-tekst i chat (eller deler den med Jone-Aase)
2. Perplexity-agent verifiserer mot `aeProject()`, master-regler og eksisterende data
3. Perplexity-agent committer og deployer
4. Begge versjoner (original + korrigert) lagres for transparens

## Hvem gjør hva

| # | AI | Rolle | Hovedstyrke | Geografisk fokus | Instruks-fil |
|---|---|---|---|---|---|
| 1 | **Grok** | Bredt-søker (12 sub-agenter) | Parallell prosessering | Globalt fordelt 12 retninger | instruks-grok-12-agenter.md |
| 2 | **ChatGPT** | Kvalitetskontroll | Pirkete og nøye | All innkommende data | instruks-chatgpt-kvalitetskontroll.md |
| 3 | **Mistral** | Europeisk historisk | Fransk-portugisisk-spansk arkiver | Frankrike, Sør-Amerika kolonier | instruks-mistral.md |
| 4 | **Copilot** | Britisk-akademisk | Bing + Royal Society | India, Australia, Karibia | instruks-copilot.md |
| 5 | **Justdone** | Smal verifisering (1 ny sjanse) | Enkel oppgave | 20 spesifikke steder | instruks-justdone.md |
| 6 | **Gemini** | Gamle bøker | Google Books + Scholar | Pre-1900 publikasjoner | instruks-gemini.md |
| 7 | **Google AI** | Kart-validerer | Google Earth + GIS | Verifisering + Sahara/Outback/Amazon | instruks-google-ai.md |
| 8 | **Perplexity (meg)** | Datasamler + koordinator | Web-søk via CLI | Synthesis + delegering | (denne agenten) |
| 9 | **Brukeren** | Prosjektleder | Beslutninger + GE-plotting | Endelig dom | — |

## Arbeidsflyt

```
1. Perplexity samler initielt datasett (DONE: 24 markører)
2. De 5 andre AI-ene (Grok, Mistral, Copilot, Justdone, Gemini, Google AI) gjør parallelle søk
3. Hver returnerer CSV med sine funn
4. ChatGPT kvalitetskontrollerer ALT
5. Brukeren og Perplexity konsoliderer master-CSV
6. KML genereres og plottes på Google Earth
7. Brukeren tegner sirkler gjennom punktene
8. Sammenligning med dagens linjer
```

## Strenge regler for alle

- **Norsk språk** på alle merknader
- **Kun pre-1960 markører** (helst pre-1900)
- **Hver URL må eksistere** — vi har hatt 8 hallusinerte URL-er tidligere
- **Eksakt CSV-format** — ID-prefix per AI (GROK-, MISTRAL-, COPILOT-, JD-, GEMINI-, GOOGLE-)
- **Hvis usikker — skriv det i merknad**, ikke gjett

## Tre sirkler — referanse

| Sirkel | Lat (i dag) | Hva som er gull |
|---|---:|---|
| Tropic of Cancer | +23.4394° | Soltempler India, kinesiske observatorier, spanske kolonialfort Karibia |
| Ekvator | 0.0000° | Quitu-Cara, French Geodesic, Pontianak |
| Tropic of Capricorn | -23.4394° | Portugisiske brasilianske byer, australske aboriginal-områder |

## Hva som er gjort

- 24 markører samlet av Perplexity
- KML-fil generert for Google Earth
- 7 instrukser skrevet til de andre AI-ene
- Skipsloggdata fra CLIWOC integrert (Rio de Janeiro 32 logger, Macao 38 logger)

## Hva som gjenstår

1. Brukeren limer instruks-tekstene inn i hver av de 6 andre AI-ene
2. AI-ene returnerer CSV-data
3. ChatGPT kvalitetskontrollerer
4. Perplexity konsoliderer til master
5. Ny KML genereres
6. Plotting på Google Earth
7. Brukeren tegner sirkler
