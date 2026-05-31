# Fase 1, Trinn 1.1 og 1.2 — Statusrapport

**Dato:** 2026-05-29
**Bygger:** Perplexity-agent
**Status:** FERDIG — venter på Jone-Aases godkjenning før team involveres

---

## Trinn 1.1: Ren verstekst Charles 1912/1917 — FERDIG

### Hva er gjort

Hentet kapittel 72-82 i sin helhet, vers for vers, fra autoritativ kilde:

- **Kilde:** Sacred Texts Archive, R.H. Charles 1917-utgave (identisk tekstkropp med 1912-førsteutgaven)
- **URL-mønster:** https://sacred-texts.com/bib/boe/boe{075-085}.htm
- **Metode:** `pplx content fetch` med streng instruks — kun nummererte vers, ingen kommentar, ingen fotnoter

### Resultatfiler

Mappe: `enok-72-truth-instrument/fase1-kildemateriale/charles-1912/kapitler-rene-final/`

| Kapittel | Filnavn | Antall vers | Sjekk |
|---|---|---|---|
| 72 | kap72-charles-1917-ren.md | 37 | ✓ komplett |
| 73 | kap73-charles-1917-ren.md | 8 | ✓ komplett |
| 74 | kap74-charles-1917-ren.md | 17 | ✓ komplett |
| 75 | kap75-charles-1917-ren.md | 9 | ✓ komplett |
| 76 | kap76-charles-1917-ren.md | 14 | ✓ vers 13 anerkjent fraværende i kilden (Charles' egen note) |
| 77 | kap77-charles-1917-ren.md | 8 | ✓ komplett |
| 78 | kap78-charles-1917-ren.md | 17 | ✓ komplett |
| 79 | kap79-charles-1917-ren.md | 6 | ✓ komplett |
| 80 | kap80-charles-1917-ren.md | 8 | ✓ komplett |
| 81 | kap81-charles-1917-ren.md | 10 | ✓ komplett |
| 82 | kap82-charles-1917-ren.md | 20 | ✓ komplett |

**Totalt: 154 vers** over 11 kapitler, alle rene fra OCR-støy og Charles' kommentar.

### Sammenligning med tidligere råekstrakt

De tidligere `kap{N}-charles-1912-raa.txt`-filene fra arkiv-OCR av archive.org var fulle av OCR-feil, sidetall, blandinger av hovedtekst og kritisk apparat. Vi har dermed byttet kilde fra "ren OCR av PDF" til "redaktørstandardisert digital tekst", som er den **autoritative arbeidsteksten** vi bygger på videre.

---

## Trinn 1.2: Aramaiske 4Q208-211 fragmenter — FERDIG

### Hva er gjort

Identifisert alle bevarte aramaiske passasjer av Astronomiske bok fra Qumran-hule 4, basert på Miliks egen offisielle indeks i *The Books of Enoch: Aramaic Fragments of Qumrân Cave 4* (1976).

### Resultatfil

`enok-72-truth-instrument/fase1-kildemateriale/aramaisk-qumran/4Q208-211-oversikt.md`

### Hovedkonklusjon

Fire manuskripter (Milik: 4QEnastrᵃ⁻ᵈ = moderne 4Q208-4Q211):

| Aramaisk siglum | Tilsvarer Charles-vers | Status |
|---|---|---|
| 4QEnastrᵃ (4Q208) | Synkronistisk kalender (ingen direkte Charles-parallell) | Eldste (sent 3. årh. f.Kr.) |
| 4QEnastrᵇ fr.6,7-9 | (parallell til En. 73:5 / 78:14) | Kortere |
| 4QEnastrᶜ 1 ii 1-10 | **En. 76:3-10** | Bevart |
| 4QEnastrᶜ 1 ii 13-20 + 4QEnastrᵇ 23 | **En. 76:13 – 77:4** | Bevart |
| 4QEnastrᶜ 1 iii 3-9 | **En. 78:6-8** | Bevart |
| 4QEnastrᵇ 25 | **En. 78:9-12** | Bevart |
| 4QEnastrᵇ 26 | **En. 78:17 – 79:5** | Bevart |
| 4QEnastrᵇ 28 | **En. 82:9-13** | Bevart |
| 4QEnastrᵈ 1 iii | **etter En. 82:20** | Bevart (lengre konklusjon) |

### Kritisk for Truth Instrument

De geografisk-astronomisk mest sentrale kapitlene **mangler aramaisk parallell**:

- **Kap 72** (solens 6 porter, dag-natt-forhold, 364 dager) — INGEN aramaisk
- **Kap 77** (jordens geografi, fire kvarterer, syv fjell, syv elver) — INGEN aramaisk

Dette betyr at vi for vår kjernemodell må stole på **Charles 1917 / etiopisk Ge'ez** som primærkilde for kap 72 og 77.

**Hvor vi har aramaisk kontrolltekst:** kap 76 (vinder), 78 (sol-måne), 79 (avslutning), 82 (kalender med 364 dager + fire interkalære dager). Disse blir kritiske valideringspunkter.

---

## Hva venter

### Klargjort for Trinn 1.3 (neste)

1. Hente **etiopisk Ge'ez** for kap 72 og 77 (de aramaisk mangler) — fra Charles 1906 eller annen kilde
2. Hente **transkribert aramaisk tekst** for de bevarte fragmentene — Miliks PDF har transkripsjonene men de er OCR-skadet
3. Vurdere å skaffe Drawnel 2011 (definitiv kritisk utgave) — ikke fritt tilgjengelig

### Forberedelse for team-konsultasjon

Når Jone-Aase godkjenner Trinn 1.1 og 1.2, kan team-instrukser sendes ut. Jeg har **ikke** sendt noe til team ennå. Forslag til arbeidsfordeling:

- **Grok (m/Excel-skills):** Bygge strukturerte vers-tabeller fra de 11 rene .md-filene; matche mot Excel-arket H (Enoks bok)
- **ChatGPT (QA):** Kontroll-lese hver av de 11 .md-filene mot original Sacred Texts HTML
- **Gemini (kritiker):** Identifisere tekstkritiske spørsmål — særlig der Charles bruker †, ⌈⌉, [] (tegn for usikkerhet)
- **Mistral:** Bygge tematisk indeks: hvor i tekstene står "sol", "måne", "porter", "ekvator", "vendekretser", "364", "vinder"

**Master-regel:** Ingen team-instruks sendes uten Jone-Aases godkjenning.

---

## Filer opprettet i denne økten

```
enok-72-truth-instrument/fase1-kildemateriale/
├── charles-1912/
│   ├── extract_clean.py                      (nytt — ekstraktor)
│   └── kapitler-rene-final/                  (NY mappe)
│       ├── kap72-charles-1917-ren.md ...
│       ├── kap82-charles-1917-ren.md
│       └── kap{N}-fetched.json (11 stk, rå pplx-respons)
├── aramaisk-qumran/
│   └── 4Q208-211-oversikt.md                 (nytt — fragmentoversikt)
├── milik-1976/
│   └── extract_aramaic_table.py              (hjelpescript)
└── FASE1-STATUS-TRINN-1.1-OG-1.2.md          (denne fil)
```

**Total tegn ren verstekst:** ca 40 000 tegn fordelt på 154 vers.
