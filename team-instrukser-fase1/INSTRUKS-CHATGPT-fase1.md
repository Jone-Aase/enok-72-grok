# Instruks til ChatGPT — Enok 72 Truth Instrument, Fase 1

**Fra:** Jone-Aase (via Perplexity-agent)
**Dato:** 2026-05-29
**Status:** Utkast — venter Jone-Aases godkjenning før utsendelse

---

## Bakgrunn

Hei ChatGPT. Din rolle i teamet er **kvalitetskontroll (QA)** — du leser nøye, finner feil, og sier ifra. I Fase 1 bygger vi modellen kun fra Astronomiske bok (Enok kap 72-82), uten sammenligning med kulemodell eller flat-modell.

Du har vist deg som teamets mest nøyaktige lesemaskin. Vi trenger deg her.

---

## Master-regler

1. Norsk i kommunikasjon med Jone-Aase
2. Ingen emojis
3. Oscar-nivå kvalitet
4. Hierarki: Ark T < Enoks bok 72 < Jone-Aase < simulator-master-referanse.md < STATUS-NA.md < agent-minne
5. Kun Perplexity-agent committer til GitHub
6. Modellen bygges kun fra Astronomiske bok i Fase 1

---

## Din oppgave (Fase 1, Trinn 2 — QA av renset Charles 1917)

### Input du får

11 rene .md-filer hentet fra Sacred Texts Archive (https://sacred-texts.com/bib/boe/boe075-085.htm):

```
enok-72-truth-instrument/fase1-kildemateriale/charles-1912/kapitler-rene-final/
├── kap72-charles-1917-ren.md   (37 vers)
├── kap73-charles-1917-ren.md   (8 vers)
├── kap74-charles-1917-ren.md   (17 vers)
├── kap75-charles-1917-ren.md   (9 vers)
├── kap76-charles-1917-ren.md   (14 vers — 13 mangler, anerkjent av Charles)
├── kap77-charles-1917-ren.md   (8 vers)
├── kap78-charles-1917-ren.md   (17 vers)
├── kap79-charles-1917-ren.md   (6 vers)
├── kap80-charles-1917-ren.md   (8 vers)
├── kap81-charles-1917-ren.md   (10 vers)
└── kap82-charles-1917-ren.md   (20 vers)
```

Totalt: **154 vers**.

### Trinn QA.1: Verifiser mot Sacred Texts original

For hvert kapittel, gå til den originale HTML-siden:

- kap 72 → https://sacred-texts.com/bib/boe/boe075.htm
- kap 73 → https://sacred-texts.com/bib/boe/boe076.htm
- kap 74 → https://sacred-texts.com/bib/boe/boe077.htm
- kap 75 → https://sacred-texts.com/bib/boe/boe078.htm
- kap 76 → https://sacred-texts.com/bib/boe/boe079.htm
- kap 77 → https://sacred-texts.com/bib/boe/boe080.htm
- kap 78 → https://sacred-texts.com/bib/boe/boe081.htm
- kap 79 → https://sacred-texts.com/bib/boe/boe082.htm
- kap 80 → https://sacred-texts.com/bib/boe/boe083.htm
- kap 81 → https://sacred-texts.com/bib/boe/boe084.htm
- kap 82 → https://sacred-texts.com/bib/boe/boe085.htm

Sammenlign **ord for ord** og rapporter **alle** avvik:

- Manglende ord eller setninger
- Endrede ord (f.eks. "sun" vs "Sun", "portal" vs "gate")
- Manglende tekstkritiske tegn (†, ⌈⌉, ⌊⌋, [], 〈〉)
- Endret versnummerering
- Tegnsetting-forskjeller som påvirker meningen

### Trinn QA.2: Sjekk tekstkritiske tegn

Charles 1917 bruker en konvensjonell notasjon:

- `†ord†` — tekst Charles mener er **korrupt** eller usikker
- `⌈ord⌉` eller `[ord]` — Charles' **forslag til retting**, ikke i originalen
- `〈ord〉` — tekst Charles **legger til** basert på parallelle manuskripter
- `(ord)` — Charles' parantetiske **forklaring**, ikke en del av teksten

Lag en oversikt over **alle** slike tegn i de 11 filene, kapittel for kapittel. Mange av disse er kritiske markører for hvor teksten er usikker og hvor vi må være forsiktige med tolkning.

### Trinn QA.3: Sjekk tall

Astronomiske bok inneholder mange **tall** (parts, dager, måneder, porter). Lag en liste over **alle** numeriske referanser per vers, og kontroller:

- At tallene står likt i vår .md-fil og i Sacred Texts original
- Om tallene har konsistent matematisk relasjon (f.eks. dag + natt = 18 i alle kapittel 72 vers)
- Hvilke tall som er **skrevet** ("ten parts") vs **siffer** ("10 parts") — dette kan gi hint om hva som er tekstkritisk usikkert

### Trinn QA.4: Final report

Lever en strukturert rapport i Norsk med tre seksjoner:

1. **Avvik fra original** (rene tekst-forskjeller)
2. **Tekstkritiske tegn** (oversikt over †⌈⌉[]〈〉 med vers-referanse)
3. **Numeriske inkonsistenser** (hvis noen)

---

## Det du IKKE skal gjøre

- IKKE sammenligne med Knibb, Charles 1906, eller Neugebauer — kun Charles 1917 / Sacred Texts
- IKKE legge til egne tolkninger eller forklaringer
- IKKE foreslå rettinger uten å markere dem som "forslag"
- IKKE bruke aramaiske eller etiopiske kilder ennå
- IKKE committe til GitHub

---

## Leveranse

En ren markdown-rapport, gjerne strukturert med kapittel-overskrifter, der hver feil/avvik er en kort linje med:

```
Kap X vers Y: [feil-type] forventet "..." vs funnet "..."
```

---

**Når du er ferdig:** Lever rapporten til Perplexity-agent. Vi går så gjennom funnene med Jone-Aase og bestemmer hvordan vi håndterer hvert avvik.

**Spør** hvis noe er uklart.

**God arbeidslyst, ChatGPT.**
