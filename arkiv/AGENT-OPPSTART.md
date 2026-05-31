# AGENT-OPPSTART — Enok 72 Truth Instrument

**LES DENNE FILEN FØRST. Ikke gjør noe annet før du har gjort alle 5 stegene under.**

Dette dokumentet eksisterer slik at enhver agent (Perplexity Computer, Grok, ChatGPT, Mistral, ny sesjon etter compaction, eller deg selv etter minnetap) kan komme opp på fullt kunnskaps-nivå på under 5 minutter.

---

## Hvem du jobber for

**Bruker**: Jone-Aase. Norsk-talende. Bor i Oslo.

**Regler som ALDRI brytes**:
1. **Norsk i all kommunikasjon og kommentar.** Engelsk UI-meny er OK.
2. **Ingen emojis** — i kode, UI, dokumenter, svar.
3. **"Oscar-nivå kvalitet"** — premien er sannheten. Ikke shortcuts.
4. **Ikke programmer noe før du har sett siste versjon av filen og arket T.** Verifiser kilden FØR du endrer kode.
5. **Solen slutter ikke å lyse en eneste dag.** `sunMesh.visible` skal ALDRI settes til `false`.
6. **Høyre museknapp** er reservert til å klikke på objekter i modellen — egen meny for hvert objekt.
7. **Pan går motsatt vei** av musen, og rotasjonen beholdes.
8. **Grok Heavy = minne-lag, du = utførelse.**

---

## STEG 1 — Les masterfilen

```
read /home/user/workspace/simulator-master-referanse.md
```

Denne fila inneholder:
- §1 Kjernekonstanter (R_EQUATOR_KM, R_OUTER_KM, SCALE)
- §2 AE-projeksjonen (Azimuthal Equidistant, buestreng-uretting)
- §3 Enok 72 port-system (12 segmenter, 13 ankerpunkter, dag/natt-deler)
- §4 Kalender (Enok-året 5676 AM, 364 dager)
- §5 Månen (RESERVERT for eget instrument — IKKE rør)
- §6 Lag-struktur (Three.js)
- §7-10 Kamera, FN-emblem, bevisgrunnlag, deploy-prosedyre
- §11 IKKE-LØST-liste (prioritert)
- §12 + §17 Endringslogg
- §13 Regler for alt fremtidig arbeid
- §14 Sjekkliste for ny agent
- **§16 De fire ekstrarundene** ← MEST KRITISK for v16.30+

Ved konflikt mellom denne fila og agent-hukommelsen: **fila gjelder**.

---

## STEG 2 — Forstå hvor sannheten ligger

| Type sannhet | Kilde | Filplassering |
|---|---|---|
| Geometri og port-system | Enoks bok 72 (Charles-oversettelsen) | `enok-72-truth-instrument/enok-himmel-vers.json` |
| 364-dagers kalender | Enok 74:10, 75, 82 + Jubileene 6:18 | `enok-72-truth-instrument/calendar.json` |
| Master-Excel (autoritativ) | `One-voice-740-Perplexity-V6.xlsx` (26. mai 2026) | `/home/user/workspace/` |
| Sol-bane per dag (ark T) | V6 ark T radene 27-227 | `enok-72-truth-instrument/sol-bane-arkT.json` |
| Live instrument | Three.js-app | `enok-72-truth-instrument/` |
| Master-bruksanvisning | Denne agentens hukommelse-på-disk | `simulator-master-referanse.md` |

**Hvis ark T og koden er i konflikt**: ark T vinner. Hvis ark T og Enoks bok 72 er i konflikt: Enoks bok 72 vinner. Hvis bok 72 og Jone-Aase er i konflikt: spør Jone-Aase, ikke gjett.

---

## STEG 3 — De 4 ekstrarundene (modellens hjerte)

Solen tar **4 ekstrarunder per år** i tillegg til de 364 kalenderdagene. Dette er Enoks intercalary days (Enok 75:1-2, 82:4-6, 82:13-14):

| Sol-dag | Port | Bane | Hendelse | Enok-vers | Ark T-rad |
|---|---|---|---|---|---|
| 91 | Port 6 (innerst) | +23,7° (Krepsen, zenit) | Sommersolverv | 72:13 | 222 |
| 182 | Port 4 (ekvator) | 0° | Vårjevndøgn-start | 72:19 | 125 (H2-side) |
| 273 | Port 1 (ytterst) | -23,7° (Steinbukken) | Vintersolverv | 72:25 | 30 |
| 364 | Port 3 (ekvator) | 0° | Vårjevndøgn-slutt | 72:31 | 125 (H1-side) |

**Lederne** (Enok 82:13-14): Milki'el, Hel'emmelek, Mel'ejal, Narel.

**Visuell oppførsel på disse 4 dagene**:
1. `sunLat` konstant fra dagen før (2 dager i samme bane)
2. `sunLonAngle` fortsetter normalt (solen tar ekstra runde rundt disken)
3. Bane lyser sterkere (visuell markør for observatør)
4. Port-skifte ved nord-passering bruker glidende lat-interpolering

**Total**: 364 kalenderdager + 4 ekstrarunder = 368 reelle sol-runder per år.

---

## STEG 4 — Port-systemet og nord-passering

**6 sol-porter på øst-aksen (azimut 60°)** og 6 tilsvarende på vest-aksen (azimut 300°). Port 1 = ytterst sør, port 6 = innerst nord.

**Port-sekvens gjennom året**:
```
4 → 5 → 6 → 6 → 5 → 4 → 3 → 2 → 1 → 1 → 2 → 3 → (tilbake til 4)
```

**Port-skifte (Enok 72:5 + Jone-Aases verbatim)**:
> "Solen går ut av porten i vest og kommer inn i en annen i port øst. Så portskiftet skjer når den går rundt nord."

Når solen passerer Polaris-aksen (azimut 0°/360° sett ovenfra), bytter den port. Dette er observerbart for de som vet det og brukes til å vite sol-månedskiftet.

---

## STEG 5 — Sjekk siste status

```
read /home/user/workspace/simulator-master-referanse.md (siste 100 linjer — endringslogg)
glob /home/user/workspace/One-voice-740-Perplexity-V*.xlsx (sjekk om det er en nyere enn V6)
ls /home/user/workspace/enok-72-truth-instrument/
```

Live deployment:
- URL: https://www.perplexity.ai/computer/a/enoch-72-the-truth-instrument-OEcJXJkpSumshIfR5grJWg
- Asset ID: `3847095c-9929-4ae9-ac84-87d1e60ac95a`
- Project path: `/home/user/workspace/enok-72-truth-instrument/`

---

## DEPLOY-KOMMANDO (memorisert)

```bash
pplx-tool deploy_website <<'JSON'
{"project_path":"/home/user/workspace/enok-72-truth-instrument","site_name":"Enoch 72 — The Truth Instrument","entry_point":"index.html","should_validate":false}
JSON
```

Med `api_credentials=["pplx-tool:deploy_website"]`.

---

## VIKTIGE FILER I PROSJEKTET

| Fil | Innhold |
|---|---|
| `app.js` | All JavaScript-logikk (~2967 linjer). Three.js scene, sol-bane, klokke, modaler. |
| `index.html` | UI, kontroll-bar, kalender, knapper. |
| `calendar.json` | 364 dager: enoch_year_day, date, enoch_month, sun_port_east, etc. |
| `enok-himmel-vers.json` | Alle 37 vers fra Enok 72 (Charles-oversettelsen). |
| `sol-bane-arkT.json` | Lat per dag fra V6 ark T + wall_info-blokk. |
| `un-map.png` | FN-emblem AE-tekstur. |
| `Time-364-354-versjon-8.xlsx` | Nedlasting-fil for ↓ Ark T-knappen (25. mai). |

---

## VIKTIGE KNAPPER I INSTRUMENTET

| Knapp | ID | Funksjon |
|---|---|---|
| ✎ Enok 72 | `btn-enok72` | Modal med alle 37 vers, fremhever dagens segment |
| ↓ Ark T | `cal-arkT` | Laster ned master-kalenderen som Excel |
| ⏱ Sann tid | `btn-realtime` | Atomur-takt (24t/runde) |
| ☉ Sol-klokke | `btn-clock-sol` | 12-timers urskive (Enok-tid) |
| ⌚ Klokke | (toggle) | 12-timers urskive Lag 1 |

---

## NÅR DU ER USIKKER

Spør Jone-Aase. Ikke gjett. Ikke programmer.

Han har sagt eksplisitt: **"Du må ikke programmere noe før du har sett siste versjon av filen og arket T."**

Hvis du må velge mellom å spørre eller gjette: SPØR. Hvis du må velge mellom å bryte en regel eller stoppe: STOPP.

---

## STEG 6 — Kjenn fil-inventaret i workspace

Workspace er en stor arkiv-mappe. Her er hovedkategoriene du må vite om:

### Master-dokumenter (LES FØRST)

| Fil | Innhold |
|---|---|
| `AGENT-OPPSTART.md` | DENNE FILEN — 5-stegs gjennoppvåkning |
| `simulator-master-referanse.md` | Full driftshåndbok for instrumentet (16 seksjoner) |
| `enok-72-full-analyse.md` | Alle 37 vers fra Enok 72 analysert |
| `sol-zenith-og-porter-fundamenter.md` | Fundamentale premisser for sol-geometri |
| `port-geometri-fra-ark-T.md` | Port-geometrien lest fra ark T |
| `AE-projeksjon-forklart.md` | Hvorfor AE-projeksjon er Enoks geometri |

### Master Excel-filer

| Fil | Innhold |
|---|---|
| `One-voice-740-Perplexity-V6.xlsx` | **AUTORITATIV master-Excel** (26. mai 2026, 22 MB, 7 ark: B, S, S2, H, T, Jub, 12Pat) |
| `One-voice-740-Perplexity-V5.xlsx` | Forrige versjon (V6 erstatter) |
| `Time-364-354-versjon-8.xlsx` | Lett uttrekk for ↓ Ark T-knappen (91 KB) |
| `Decoded-Biblical-Chronology-Timeline-Anno-Mundi-0-5700-Enoch-Jubilees-Daniel-V4.xlsx` | Bibelsk kronologi tidslinje |
| `Dyp-Tekst-analyse-av-Enoks-beskrivelse-Av-Manen.xlsx` | Måne-analyse (månen er reservert for eget instrument) |

### Live instrument-prosjekt

`/home/user/workspace/enok-72-truth-instrument/` inneholder:
- `app.js` (~2967 linjer Three.js-logikk)
- `index.html` (UI, bevis-arkiv, modaler)
- `calendar.json` (364 dager)
- `enok-himmel-vers.json` (alle 37 vers Enok 72)
- `sol-bane-arkT.json` (lat per dag fra V6 ark T)
- `un-map.png` (FN-emblem AE-tekstur)
- `Time-364-354-versjon-8.xlsx` (nedlasting for ↓ Ark T-knapp)

### Bevis-arkiv-kategorier (i instrumentet, knapp ★ Bevis-arkiv)

1. **Sol-geometri** (4 bekreftede): Aswan+Fort Yukon, Antofagasta, Catequilla+Pontianak, Pendelbevegelse
2. **Skipslogger** (kommer): Beagle 1832-1836, CLIWOC, Wales 1774, Challenger 1876
3. **Meridian-mål** (kommer): Gull-meridian Afrika, Eratosthenes
4. **Breddegrad-buer** (kommer): Cancer-test, Capricorn-test, Ekvator-omkrets
5. **De fire ekstrarundene** (lagt til v16.30 — fundament, Enok 72:13/19/25/31)

### Team-instruks-filer (9 AI-medlemmer)

| Fil | Mottaker | Rolle |
|---|---|---|
| `team-oversikt.md` | Master | 9 medlemmer + ansvar |
| `instruks-grok-12-agenter.md` | Grok | Bredt-søker (12 sub-agenter) |
| `instruks-grok-heavy-regnemaskin.md` | Grok Heavy | Minne-lag + regnemaskin |
| `instruks-chatgpt-kvalitetskontroll.md` | ChatGPT | Kvalitetskontroll |
| `instruks-mistral.md` | Mistral | Europeisk historisk arkiv |
| `instruks-copilot.md` | Copilot | Britisk-akademisk |
| `instruks-gemini.md` | Gemini | Gamle bøker |
| `instruks-google-ai.md` | Google AI | Kart-validering |
| `instruks-justdone.md` | Justdone | Smal verifisering |
| `forklaring-til-copilot.md` | Copilot | Tilleggs-forklaring |

### Bevis-arkiv kilde-dokumenter

| Tema | Filer |
|---|---|
| Sol-zenith | `sol-zenith-og-porter-fundamenter.md`, `ekvator-zenith-rapport-v1.md`, `zenith-objekter-*.png`, `rangering-kriterier-zenith.md` |
| Vendekretsene | `cancer-rapport-v1.md`, `cancer-oppsummering-v2.md`, `cancer-fire-spor.md`, `vendekretser-vitnesbyrd.pdf` |
| Ekvator | `ekvator-test.md`, `ekvator-punkter.md`, `ekvator-rapport-v1.md` |
| Skipslogger | `skipslogg-*.md`, `cook_*.md`, `arkivkatalog-originale-skipslogger.md`, `10-skip-tierra-del-fuego-observasjoner.md`, `cliwoc21.tsv` (167 MB) |
| Meridian | `meridian-gull-rapport.md`, `meridian-gull-analyse.csv` |
| Måleband | `maalband-v1-*.md`, `maalband-v1.csv`, `kalibreringsdata-v*.csv` |
| Sol-logger | `sol-logger-master*.{md,csv}`, `sol-logger-oversikt-5sirkler.md` |
| Afrika | `afrika-*.md`, `afrika-markorer-*.csv` |
| Tre sirkler / KML | `master-tre-sirkler.csv`, `enok72-tre-sirkler-kml`, `enok72-tre-sirkler-kmz` |
| Punta Arenas | `punta-arenas-*.{md,pdf,png}` |
| Omkrets | `omkrets-rapport.pdf`, `earth-circumference-report.pdf` |
| Onevoice-analyse | `analyse-onevoice/` (RAPPORT.md, cross_analysis.py, enok-komplett.json) |

### Andre web-prosjekter (separate fra Truth Instrument)

| Mappe | Innhold |
|---|---|
| `kronos-site/` | Tidlig kronos-prosjekt |
| `enoch-sketch-site/` | Tidlig Enoch-skisse |
| `enok-72-simulator/` | Tidligere simulator-versjon |
| `enok-kart/` | Enok-kart-prototype |
| `enok-skjelett-v1/` | Skjelett-fase |
| `map-candidates/` | Kart-kandidater (Mercator, Robinson, etc.) |

### Versjons-numre du må huske

- **V6** = nyeste master-Excel (One-voice-740)
- **v16.30** = nyeste instrument-versjon (de 4 ekstrarundene + wall-invisibility fjernet + Bevis-arkiv kategori 5)
- **v16.29** = forrige (wall-invisibility — ble korrigert vekk)

---

## OPPSTART-SJEKKLISTE (sett kryss i hodet)

- [ ] Lest `simulator-master-referanse.md` helt
- [ ] Vet at solen lyser ALLTID
- [ ] Vet at de 4 ekstrarundene er dag 91, 182, 273, 364
- [ ] Vet at port-skifte skjer ved nord-passering, ikke i veggene
- [ ] Vet at månen er reservert for eget instrument senere
- [ ] Vet hvor V6-Excel ligger og hvilke ark T-rader (30, 125, 222) som er kritiske
- [ ] Vet deploy-kommandoen utenat
- [ ] Vet at jeg skal spørre, ikke gjette, ved tvil
- [ ] Vet at Bevis-arkivet i instrumentet har 5 kategorier (sol-geometri, skipslogger, meridian-mål, breddegrad-buer, de 4 ekstrarundene)
- [ ] Kjenner workspace fil-inventaret (steg 6)

Når alle 10 er huket av: du er klar til å fortsette der vi slapp.

---

## REGEL FOR NESTE COMPACTION

Når ny agent eller compaction starter en sesjon på Enok 72-prosjektet:

1. **LES `AGENT-OPPSTART.md` (denne fila) FØRST** — alltid, uten unntak
2. **Gjør alle 6 stegene i rekkefølge** — ikke hopp over noen
3. **Bekreft overfor brukeren at du har gjort gjennomgangen** ved å si: "Jeg har lest AGENT-OPPSTART og er klar til å fortsette."
4. **Hvis du må endre denne fila** — spar oppdateringen til etter at brukeren har bekreftet at det er greit. Endringer skal helst legges til som nye seksjoner, ikke ved å omskrive eksisterende innhold.
5. **Når du lærer noe nytt om prosjektet i en sesjon**, oppdater både `AGENT-OPPSTART.md` OG `simulator-master-referanse.md` i samme runde — ikke la dem komme ut av synk.

---

**Sist oppdatert**: 26. mai 2026 — etter v16.30 (de 4 ekstrarundene verifisert mot Enoks bok 72, Bevis-arkiv kategori 5 lagt til, fil-inventar lagt til som steg 6)
**Versjon**: 1.1
