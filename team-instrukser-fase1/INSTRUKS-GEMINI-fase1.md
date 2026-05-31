# Instruks til Gemini — Enok 72 Truth Instrument, Fase 1

**Fra:** Jone-Aase (via Perplexity-agent)
**Dato:** 2026-05-29
**Status:** Utkast — venter Jone-Aases godkjenning før utsendelse

---

## Bakgrunn

Hei Gemini. Du er teamets **kritiker** — du finner svakheter, motsigelser, og spørsmål andre overser. Du har også Google-tilgang som er verdifullt for å verifisere oversettelser og se manuskript-tradisjoner.

I Fase 1 bygger vi modellen **kun fra Astronomiske bok (Enok kap 72-82)** som en testbar hypotese. Ingen sammenligning med kulemodell eller flat-modell ennå.

Din oppgave er å være den som **stiller de vanskelige spørsmålene** før vi bygger videre.

---

## Master-regler

1. Norsk i kommunikasjon med Jone-Aase
2. Ingen emojis
3. Oscar-nivå kvalitet — premien er sannheten
4. Hierarki: Ark T < Enoks bok 72 < Jone-Aase < simulator-master-referanse.md < STATUS-NA.md < agent-minne
5. Kun Perplexity-agent committer til GitHub
6. Modellen bygges kun fra Astronomiske bok i Fase 1

---

## Din oppgave (Fase 1, Trinn 2 — kritisk lesning og oversettelses-spørsmål)

### Input du får

11 rene .md-filer (Charles 1917, Sacred Texts) + tre referansetekster:

```
enok-72-truth-instrument/fase1-kildemateriale/
├── charles-1912/kapitler-rene-final/   (11 kapittel-filer)
├── aramaisk-qumran/4Q208-211-oversikt.md                          (hva er bevart aramaisk)
├── aramaisk-qumran/4Q209-211-transkripsjon-kap76-78-79-82.md      (NYTT 1.3c: DSSSE 1999 transkripsjon + oversettelse)
└── etiopisk-geez/
    ├── README.md                       (kildevalg-begrunnelse)
    ├── kap72-neugebauer-1981-fra-geez.txt   (kap 72 fra Ge'ez)
    ├── kap77-neugebauer-1981-fra-geez.txt   (kap 77 fra Ge'ez)
    └── neugebauer-1981.txt             (hele Neugebauer-PDF som tekst)
```

**NYTT 2026-05-30 — Trinn 1.3c ferdig:** Vi har nå aramaisk transkripsjon (DSSSE 1999) for delene som EKSISTERER på aramaisk: kap 76:13–77:4 (4Q209 frag. 23 + 4Q210 frag. 1 col. ii), 78:6-8 (4Q210 frag. 1 col. iii), 79:2-5 (4Q209 frag. 26), og 82:15-20 tema (4Q211 frag. 1). **Kap 72 har INGEN aramaisk parallell. Kap 77:5-8 (Erythreabukten, syv øyer, navn på elver) har KUN Ge'ez.**

### Trinn K.1: Identifiser oversettelses-konflikter

For hvert vers, sammenlign:

- **Charles 1917** (kapitler-rene-final/)
- **Neugebauer 1981 fra Ge'ez** (kun for kap 72-82; bruk neugebauer-1981.txt for søk)

Hvor de er **uenige om betydningen**, lag en oppføring med:

```
Kap X vers Y:
  Charles 1917: "..."
  Neugebauer 1981 (fra Ge'ez): "..."
  Forskjellen: [beskriv hva som er endret]
  Ge'ez-ord (hvis Neugebauer oppgir det): kebabu / netug / hezabihomu / etc.
  Kritisk betydning for modellen: [høy/middels/lav, og hvorfor]
```

### Trinn K.2: Søk etter manuskript-varianter

Bruk Google-tilgang til å finne:

- **Knibb 1978** — `The Ethiopic Book of Enoch` — er det publiserte utdrag som dekker kap 72 og 77?
- **Charles 1906** etiopisk — `https://archive.org/details/ethiopicversiono00charuoft` — for spesifikke vers vi er usikre på
- **Drawnel 2011** — `The Aramaic Astronomical Book from Qumran` — finnes nedlastbare utdrag?
- **Akademiske artikler** om Enoch 72 eller 77 — finnes nyere lesninger enn Neugebauer 1981?

Lever en kort kildeoversikt med URL-er og hva de tilfører.

### Trinn K.3: Stilling de vanskelige spørsmålene

Som teamets kritiker forventes du å spørre:

1. **Er Charles' versinndeling original eller pålagt senere?** Neugebauer (s. 9) hevder versinndelingen "obscured" den opprinnelige strukturen — er han enig med flere kilder?

2. **Er "364 dager" i kap 72,32 og kap 82,6 sekundær glosse?** Neugebauer markerer kap 72,32 med klammeparenteser. Hva er bevisene fra de aramaiske fragmentene (4QEnastrᵇ 28 = En. 82:9-13 har visstnok 364)?

3. **Hva betyr "gjennom nord" (kap 72,5)?** Vendingen `wayadawer mangala šemå` (Ge'ez, "and turns toward north") — er dette en stativ posisjon eller en bevegelse? Hvilke kommentatorer har drøftet dette?

4. **Hva er "Erythrean Sea" geografisk?** Neugebauer foreslår Persiabukten. Andre identifikasjoner i akademisk litteratur?

5. **Hva er "syv fjell, syv elver, syv øyer" (kap 77)?** Finnes det forsøk på geografisk identifikasjon i Knibb, Nickelsburg, eller andre?

6. **Hva sier 4Q208 om kalenderen?** Den eldste aramaiske manuskript-versjonen — har den noen versjon som motsier 364-dagers-året?

Lever som spørsmål, ikke som påstander. Vår jobb i Fase 1 er å **liste alle åpne spørsmål**, ikke å løse dem.

### Trinn K.4: Final report

Lever en strukturert rapport i Norsk:

1. **Oversettelses-konflikter Charles 1917 vs Neugebauer 1981** (komplett liste)
2. **Nyere kilder funnet via Google** (med URL og kort beskrivelse)
3. **Åpne spørsmål for diskusjon** (de seks ovenfor + dine egne)
4. **Hva du tror er Astronomiske boks "kjernepåstander"** — i ren prosa, basert på de minst usikre versene

---

## Det du IKKE skal gjøre

- IKKE sammenligne med kulemodell, flat-modell, eller noen moderne astronomisk teori
- IKKE foreslå at "Enoks bok er konsistent med X-modell" — vi er ikke der ennå
- IKKE foreslå at "Enoks bok er ukorrekt" — vi tester hypotesen, ikke avviser den
- IKKE committe til GitHub
- IKKE involvere de andre AI-medlemmene direkte — gå via Perplexity-agent

---

## Leveranse

Strukturert markdown-rapport med fire seksjoner som beskrevet over.

**Når du er ferdig:** Lever rapporten til Perplexity-agent. Vi går så gjennom funnene med Jone-Aase.

**God kritisk lesning, Gemini.**
