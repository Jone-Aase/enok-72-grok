# Etiopisk Ge'ez — Astronomiske bok kap 72 og 77

**Dato:** 2026-05-29
**Status:** Fase 1, Trinn 1.3a-b — Ge'ez-tekst for kapitler der aramaisk mangler

---

## Bakgrunn

Som dokumentert i `aramaisk-qumran/4Q208-211-oversikt.md`, har de **mest geografisk-astronomisk sentrale kapitlene 72 og 77 INGEN aramaisk parallell** fra Qumran. Derfor må vi gå direkte til den etiopiske Ge'ez-teksten — som er den eldste komplette overleverte versjonen av Astronomiske bok.

## Kildevalg

### Primær arbeidskilde: Neugebauer 1981

**Otto Neugebauer**, "The 'Astronomical' Chapters of the Ethiopic Book of Enoch (72 to 82): Translation and Commentary", *Matematisk-fysiske Meddelelser* 40:10, Det Kongelige Danske Videnskabernes Selskab, København 1981.

- **PDF i workspace:** `neugebauer-1981-astronomical-chapters-72-82.pdf` (7.5 MB, 48 sider)
- **URL:** https://gymarkiv.sdu.dk/MFM/kdvs/mfm%2040-49/MFM%2040-10.pdf
- **Hvorfor denne kilden:** Neugebauer er verdens fremste historiker for antikk astronomi (kjent for "A History of Ancient Mathematical Astronomy", 1975). Denne PDF-en er hans direkte ny-oversettelse fra Ge'ez med:
  1. Korrekt astronomisk forståelse (han fanger feil i Charles/Dillmann)
  2. Matthew Black's tilleggsnoter på de aramaiske fragmentene
  3. Direkte koblinger Charles ↔ Knibb ↔ Dillmann ↔ Flemming
  4. Eksplisitte Ge'ez-ord der oversettelse er omstridt (f.eks. `kebabu` = "roundness", `netug` = "diminished", `hezabihomu` = "their tribes/populations")

### Sekundær kilde (referanse): Knibb 1978

**Michael A. Knibb**, *The Ethiopic Book of Enoch: A New Edition in the Light of the Aramaic Dead Sea Fragments*, 2 vols., Oxford: Clarendon Press, 1978.

- Knibb baserer sin oversettelse på **Rylands Ethiopic MS 23**
- Brukes som kontrollesning når Neugebauer ikke gir entydig svar
- Tilgjengelig som PDFCoffee-utdrag (ikke lastet ned ennå)

### Hvorfor IKKE Charles 1906 Ge'ez direkte

Charles' 1906-utgave (`https://archive.org/details/ethiopicversiono00charuoft`) er den etiopiske teksten med kritisk apparat på etiopisk og latin, ikke en moderne oversettelse. For verifikasjon av Ge'ez-original kan vi gå dit, men for arbeidstekst er Neugebauer's 1981-oversettelse fra Ge'ez vesentlig mer presis enn Charles' 1912 engelske oversettelse.

---

## Resultatfiler

| Fil | Innhold | Vers |
|---|---|---|
| `kap72-neugebauer-1981-fra-geez.txt` | Kap 72 Neugebauer-oversettelse fra Ge'ez | 1-37 |
| `kap77-neugebauer-1981-fra-geez.txt` | Kap 77 Neugebauer-oversettelse fra Ge'ez | 1-8 |
| `neugebauer-1981.txt` | Hele Neugebauer-PDF som tekst (for søk) | kap 72-82 + noter |
| `neugebauer-1981-astronomical-chapters-72-82.pdf` | Original PDF | — |

## Sentrale forskjeller Neugebauer (fra Ge'ez) vs Charles 1917 (engelsk)

### Kap 72,4

- **Charles 1917:** "his circumference is like the circumference of the heaven"
- **Neugebauer 1981:** "its **roundness** is as the **roundness** of heaven" (Ge'ez: `kebabu`)
- **Neugebauers note:** Verken Dillmanns "Umkreis" eller Knibbs "disc" er dekkende — `kebabu` viser **kuppel-formet**, ikke flat skive, ikke sirkel-omkrets.

### Kap 72,5

- Begge: solen kjøres av vinder, går ned, returnerer "via nord" for å komme østfra igjen.
- **Neugebauer:** Skiller mellom (a) himmelens daglige rotasjon (drevet av vinder, jf. 18,4) og (b) solens og månens egen bevegelse — disse er **uavhengige** av hverandre.

### Kap 72,32 vs 72,33

- **Charles 1917 vers 32:** "the night is equal to the day and the year is exactly as to its days three hundred and sixty-four"
- **Neugebauer:** "[And the year is exactly 364 days (long)]" — markert som **glosse**, sannsynligvis sekundær interpolasjon

### Kap 77,1 — "Most High descends"

- **Charles 1917:** "the south, because the Most High will descend there, yea, there in quite a special sense will He who is blessed for ever descend"
- **Neugebauer:** "the south because there the Most High descends {and there in particular descends the one blessed in eternity}" — andre del markert som **glosse**
- **Amharisk kommentar (uutgitt, kommunisert av prof. Ephraim Isaac):** Henvisning til **Sinai-fjellet**

### Kap 77,4 — "yahalfū"

- **Charles 1917:** "and days, seasons, and years pass away" (følger Dillmann/Flemming "schwinden dahin")
- **Neugebauer:** "days and seasons and years **traverse** (them)" — basert på alternativ Ge'ez-lesning `wayahawer` "and proceed/go"
- **Astronomisk betydning:** Solen, som forårsaker dager, seasons og år, traverserer rommet **over** fjellene — ikke at fjellene forsvinner.

### Kap 77,7 — "Erythraean Sea"

- Begge: Erythraean Sea i øst
- **Neugebauer:** Identifiseres som sannsynligvis **Persiabukten** (der Eufrat og Tigris munner ut) — ikke Rødehavet

---

## Konsekvenser for Truth Instrument

1. **Solen er ikke en disk eller en sirkel-omkrets** — Ge'ez `kebabu` betyr **kuppel-formet rundhet**, samme form som himmelhvelvet. Dette er nytt mot Charles.

2. **De 6 portene + 12 vinduer = 12-måneders-tabell** (Neugebauer Table II) — direkte numerisk struktur fra Ge'ez, ikke fra Charles.

3. **364-dagers-året er muligens en glosse** i v 32. Den primære teksten er **12 × 30/31 dager = symmetrisk struktur**.

4. **Geografi i kap 77:** Fire kvadranter (E-S-W-N), syv fjell, syv elver, syv øyer. Erythreabukten = sannsynligvis Persiabukten.

5. **Sol-bane i kap 72,5:** Solen returnerer "via nord" når den går ned i vest, før den kommer opp igjen i øst. Dette er **eksplisitt** i Ge'ez og bekrefter at Astronomiske bok beskriver en bane som **ikke** går under jorden i sør, men rundt via nord.

---

## Hva venter (Trinn 1.3c)

Hent **transkriberte aramaiske tekster** for de bevarte 4Q-fragmentene (kap 76, 78, 79, 82). Miliks PDF har transkripsjonene men de er OCR-skadet. Mulige løsninger:

1. Hente Miliks PDF-sider som bilder og lese med OCR direkte
2. Vurdere [DSS Digital Library](https://dss.collections.imj.org.il/) for høyoppløslige bilder
3. Vurdere Drawnel 2011 (kjøp)
