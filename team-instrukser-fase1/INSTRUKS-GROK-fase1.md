# Instruks til Grok — Enok 72 Truth Instrument, Fase 1

**Fra:** Jone-Aase (via Perplexity-agent)
**Dato:** 2026-05-29
**Status:** Utkast — venter Jone-Aases godkjenning før utsendelse

---

## Bakgrunn

Hei Grok. Du har nå Excel-ferdigheter — fantastisk. Vi har startet på en helt ny måte å bygge Truth Instrument: vi bygger først modellen **kun fra Astronomiske bok (Enok kap 72-82)** som en testbar hypotese, uten å sammenligne med kulemodell eller flat-modell underveis.

Dette er Fase 1. Du har fått en spesifikk oppgave fordi du nå mestrer Excel bedre enn de andre i teamet.

---

## Master-regler (NEVER break)

1. Norsk i all kommunikasjon med Jone-Aase
2. Ingen emojis
3. "Oscar-nivå kvalitet" — premien er sannheten
4. Hierarki: Ark T < Enoks bok 72 < Jone-Aase < simulator-master-referanse.md < STATUS-NA.md < agent-minne
5. Solen slutter ikke å lyse
6. Lokasjoner skal IKKE flyttes
7. Kun Perplexity-agent committer til GitHub
8. **Ny i Fase 1:** Modellen bygges **kun** fra Astronomiske bok — ingen sammenligning med kule eller flat-modell ennå

---

## Din oppgave (Fase 1, Trinn 2 — vers-til-Excel-mapping)

### Input du får

Du får tilgang til 11 rene tekstfiler — én per kapittel — som inneholder kun Charles 1917-vers fra Astronomiske bok kap 72-82:

```
enok-72-truth-instrument/fase1-kildemateriale/charles-1912/kapitler-rene-final/
├── kap72-charles-1917-ren.md   (37 vers — solens 6 porter, 364 dager)
├── kap73-charles-1917-ren.md   (8 vers — månens første lov)
├── kap74-charles-1917-ren.md   (17 vers — månens kvartårige sykler)
├── kap75-charles-1917-ren.md   (9 vers — lederne av stjerner)
├── kap76-charles-1917-ren.md   (14 vers — de 12 vinder og porter)
├── kap77-charles-1917-ren.md   (8 vers — jordens geografi, 7 fjell, 7 elver)
├── kap78-charles-1917-ren.md   (17 vers — sol og måne navn, måne-faser)
├── kap79-charles-1917-ren.md   (6 vers — avslutning, 177-dager-syklus)
├── kap80-charles-1917-ren.md   (8 vers — Uriel/synderes år forkortes)
├── kap81-charles-1917-ren.md   (10 vers — himmel-tavlene)
└── kap82-charles-1917-ren.md   (20 vers — kalender, 364 dager, 4 interkalære)
```

Du får også Excel-boken `One-voice-740-Perplexity-V6.xlsx` (22 MB, 9 ark) — du skal kun bruke ark **H = Enoks bok**.

**NYTT 2026-05-30 — Trinn 1.3c ferdig:** `aramaisk-qumran/4Q209-211-transkripsjon-kap76-78-79-82.md` er nå tilgjengelig. Den gir deg eksakte aramaiske parallell-vers (DSSSE 1999):
- 76:13–77:4 = 4Q209 frag. 23 + 4Q210 frag. 1 col. ii
- 78:6-8 = 4Q210 frag. 1 col. iii
- 79:2-5 = 4Q209 frag. 26
- 82:15-20 tema = 4Q211 frag. 1
- **Kap 72 har INGEN aramaisk — sett kolonne F = "nei".**
- **Kap 77:5-8 (Erythreabukten, syv øyer) har KUN Ge'ez — sett kolonne F = "nei".**

### Trinn 2.1: Bygg vers-tabell

Lag et nytt Excel-ark **H_AstronomiskeBok** med følgende kolonner:

| Kolonne | Innhold |
|---|---|
| A: kapittel | 72-82 |
| B: vers | 1-N |
| C: Charles_1917_engelsk | Ren verstekst fra .md-filen |
| D: tema | Klassifisering (se nedenfor) |
| E: tall_i_vers | Komma-separert liste av alle tall i verset (f.eks. "30, 10, 8" for kap 72 vers 10) |
| F: aramaisk_bevart | "ja"/"nei"/"delvis" — se `aramaisk-qumran/4Q208-211-oversikt.md` OG `4Q209-211-transkripsjon-kap76-78-79-82.md` (NYTT 1.3c) |
| G: aramaisk_siglum | 4QEnastrᵃ/ᵇ/ᶜ/ᵈ + fragment-nummer hvis bevart |
| H: usikker_oversettelse | "ja" hvis verset inneholder † eller ⌈⌉ eller [] (Charles' tekstkritiske tegn) |
| I: kommentar_Grok | Din notat — særlig om Excel-relevant struktur |

### Tema-klassifisering (kolonne D)

Bruk **ett** av disse temaene per vers:

- `sol-bane` — solens daglige/årlige bevegelse (kap 72)
- `sol-porter` — de 6 portene i øst og 6 i vest
- `sol-vinduer` — 12 vinduer per port
- `dag-natt-lengde` — kvantitative forhold (parts)
- `mane-faser` — månens våksen/avtagende (kap 73, 78:6-14)
- `mane-vandring` — månens portbruk (kap 74, 78:5)
- `vinder` — de 12 vinder og deres porter (kap 76)
- `geografi` — kvadranter, fjell, elver, øyer (kap 77)
- `stjerner-ledere` — stjernehoder, 364, hierarki (kap 75, 82:9-20)
- `kalender` — 364-dagers-året, 4 interkalære dager (kap 82:1-8)
- `syndere-forfall` — endring i kosmisk orden (kap 80)
- `himmel-tavler` — Enoks åpenbaring (kap 81)
- `meta` — overskrifter, "min sønn Methuselah", etc.

### Trinn 2.2: Bygg tall-tabell

Mange vers inneholder **kvantitative data** (parts, dager, porter, måneder). Lag et nytt ark **H_Tall** med:

| Kolonne | Innhold |
|---|---|
| A: kap | 72 |
| B: vers | 10 |
| C: tall | 30 |
| D: kontekst | "thirty mornings the sun rises in fourth portal" |
| E: kategori | dager / parts_dag / parts_natt / porter / maneder / annet |

Eksempel for kap 72,10:
```
72 | 10 | 30 | "thirty mornings ... fourth portal"   | dager
72 | 10 | 10 | "the day amounts exactly to ten parts" | parts_dag
72 | 10 |  8 | "the night to eight parts"             | parts_natt
```

Dette gir oss et rent **numerisk datasett** for modellbygging i Fase 3.

### Trinn 2.3: Sammenstilling med eksisterende Ark H

Ark H i Excel-boken inneholder allerede Enoks bok (alle 108 kapitler). Sjekk:

1. Stemmer versinndelingen i Ark H med Charles 1917?
2. Hvor er det avvik (om noen)?
3. Lag et nytt ark **H_Diff** som lister vers der Ark H og kapitler-rene-final/ er uenige om versnummerering eller tekstinnhold.

**Viktig:** Ikke endre Ark H. Bare logg avvikene i H_Diff. Jone-Aase bestemmer hva som skal harmoniseres.

---

## Det du IKKE skal gjøre

- IKKE sammenligne med kulemodell, flat-modell, eller noen astronomisk teori
- IKKE legge til egne tolkninger av versene
- IKKE endre noen eksisterende ark i Excel-boken
- IKKE committe til GitHub — det gjør kun Perplexity-agent
- IKKE bruke aramaiske eller etiopiske kilder ennå — kun Charles 1917

---

## Leveranse

1. Et nytt Excel-ark **H_AstronomiskeBok** med 154 rader (én per vers)
2. Et nytt Excel-ark **H_Tall** med alle kvantitative datapunkter
3. Et nytt Excel-ark **H_Diff** med eventuelle avvik fra eksisterende Ark H
4. En kort statusrapport i Norsk: "Hva fant jeg, hva var enkelt, hva var vanskelig"

Lever Excel-filen og rapporten til Perplexity-agent som så sammen med Jone-Aase går videre til neste trinn.

---

## Spørsmål?

Spør Perplexity-agent (via Jone-Aase) før du starter hvis noe er uklart. Spør særlig hvis:

- Du er usikker på temakategori for et vers
- Du finner tall som ikke passer noen kategori
- Du oppdager noe i Ark H som virker viktig men ikke er en del av oppgaven

**God arbeidslyst, Grok.**
