# OPPSTART-INSTRUKS: Enoks posisjon i flat AE-modell

**For:** Alle AI-agenter (Claude, Grok, Gemini, ChatGPT, Mistral, Llama m.fl.)
**Status:** OBLIGATORISK LESNING — sentral kalibrering for Enok 72-Instrumentet
**Versjon:** 1.0 (27. mai 2026)
**Hovedrapport:** `enok-posisjon-flat-modell.md`

---

## Hvorfor du må lese dette først

Hvis du skal bidra til Enok 72-Truth Instrument-prosjektet, må du forstå **én sentral ting** før du regner, koder eller foreslår endringer:

> **Vi tester Enoks system på Enoks egne premisser — flat AE-projeksjon. Vi blander IKKE inn sfærisk geometri.**

Dette er en hypotese-test, ikke et religiøst standpunkt. Vi sjekker om Enoks tall danner et internt konsistent geometrisk system når vi anvender plan AE-geometri på dem. Foreløpig svar: **JA**, med ett unntak (~5 % avvik på Krepsens vendekrets, se hovedrapport).

---

## De tre ankerpunktene du må kjenne

**Sommersolverv** (en dag i året):

1. **Krepsens vendekrets (23,44°N):** Solen står i zenit kl 12 lokal tid. Dag = natt (9/9 parts).
2. **Polarsirkelen (66,56°N):** Midnattsol. Dag = 18 parts, natt = 0.
3. **Enoks posisjon (54,13°N):** Dag = 12 parts, natt = 6 (Enok 72:14).

---

## Geometriske konstanter du MÅ bruke

| Konstant | Verdi | Hva det er |
|---|---|---|
| **R** | **10 001,47 km** | Gull-konstanten — radius til ekvator på AE-kartet, også lyssirkel-radius L |
| **r_Polarsirkelen** | **2 604,17 km** | Avstand Nordpolen → Polarsirkelen |
| **r_Enok** | **3 986,08 km** | Avstand Nordpolen → Enoks observatør (NY — fra denne rapporten) |
| **r_Krepsen** | **7 393,80 km** | Avstand Nordpolen → Krepsens vendekrets (innerste sol-bane) |
| **r_Steinbukken** | **12 608,67 km** | Avstand Nordpolen → Steinbukken (ytterste sol-bane) |
| **r_Ytterring** | **31 420,55 km** | Avstand Nordpolen → ytterring (Antarktis-grense) |

**MERK:** Bruk disse tallene NØYAKTIG. Avrund IKKE før i final visning. Gull-konstanten 10 001,47 km kommer fra Google Earth-målinger (Pontchartrain Causeway 38,4048 km baselinjen) og er ankerverdien for hele Instrumentet.

---

## Den ENE formelen du trenger

Cosinus-setningen på trekanten (Nordpolen, Sol-fotpunkt, Observatør):

\[ L^2 = r_E^2 + r_{sol}^2 - 2 \cdot r_E \cdot r_{sol} \cdot \cos(α) \]

der:
- **L = 10 001,47 km** (lyssirkel-radius, lik R)
- **r_sol** = radius til solens fotpunkt på den dagen (Krepsens vendekrets på sommersolverv, ekvator på jevndøgn, Steinbukken på vintersolverv)
- **r_E** = radius til observatørens posisjon
- **α** = halv lys-bue sett fra Nordpolen = (dag_parts/18) · 180°

---

## Regler for AI-agenter som arbeider på dette prosjektet

### Du SKAL:

1. ✓ Bruke flat AE-projeksjon-geometri i alle beregninger
2. ✓ Anvende cosinus-setningen på (Nordpolen, Sol-fotpunkt, Observatør)-trekanter
3. ✓ Behandle R = 10 001,47 km som gull-konstanten — ikke avrund
4. ✓ Plassere Enok på r = 3 986,08 km (54,13°N AE) som standard referansepunkt
5. ✓ Notere åpne avvik (f.eks. 8,51/9,49 vs Enoks 9/9) som hypoteser til videre test
6. ✓ Sjekke hovedrapporten `enok-posisjon-flat-modell.md` før du gjør antagelser

### Du SKAL IKKE:

1. ✗ Bruke sfærisk trigonometri (cos(H) = -tan(φ)·tan(δ)) i Enoks system
2. ✗ Anta at moderne astronomiske formler gjelder uten å først teste mot Enok-tekst
3. ✗ Avrunde gull-konstantene (R = 10 001,47, Pontchartrain = 38,4048)
4. ✗ Plassere Enok på Babylon (32,5°N) eller Jerusalem (31,8°N) — disse stedene kan IKKE produsere Enok 72:14 sin 12/6
5. ✗ Anbefale endringer i `dagNattForDay()` eller `calendar.json` uten å verifisere mot Ark T
6. ✗ Endre `sunMesh.visible` til false — solen skal ALLTID lyse (master-regel)

---

## Hvordan bidra konstruktivt

Hvis du finner avvik mellom Enok-tekst, Ark T og Instrumentet, list opp:
- **Hva** avviket er (vers, rad, kode-linje)
- **Hvor mye** (i parts, km, grader, sekunder)
- **Hvorfor** du tror det skjer (refraksjon? avrundingsfeil? feil i kode?)
- **Forslag** til løsning (med presise tall)

Send det til Jone-Aase som kan ta diskusjonen videre. Aldri endre kode uten godkjenning.

---

## Den ene gåten du må vite om

**På Krepsens vendekrets gir vår modell 8,51/9,49 parts, men Enok 72 sier 9/9.**

Dette er en åpen post. Mulige forklaringer:
- Atmosfærisk refraksjon ved horisont
- Lyssirkel-radius L er ikke nøyaktig R, men kanskje R · 1,025
- Lyssirkelen har "myk" kant (lysspredning), ikke skarp grense
- Enoks 9/9 på vendekrets er en idealisering, ikke en observasjon

Vi noterer dette, men bruker R = 10 001,47 km som lyssirkel-radius inntil videre.

---

## Sjekkliste — har du forstått?

Før du gjør noe på Instrumentet, sjekk at du kan svare ja på alle disse:

- [ ] Jeg vet at Enok står på 54,13°N (AE), r = 3 986,08 km fra Nordpolen
- [ ] Jeg vet at solens fotpunkt på sommersolverv er på Krepsens vendekrets (r = 7 393,80 km)
- [ ] Jeg vet at lyssirkel-radius L = R = 10 001,47 km
- [ ] Jeg vet at vi bruker FLAT AE-geometri, IKKE sfærisk
- [ ] Jeg vet at Polarsirkelen har midnattsol fordi r_sol + r_Polarsirkelen ≤ L
- [ ] Jeg vet at Enok 72:14 sier 12/6 parts, og vi bruker dette som ankerpunkt
- [ ] Jeg vet at avviket på Krepsens vendekrets (8,51 vs 9 parts) er en åpen gåte
- [ ] Jeg har lest hovedrapporten `enok-posisjon-flat-modell.md` i sin helhet
- [ ] Jeg vet at gull-konstanten R = 10 001,47 km IKKE skal avrundes
- [ ] Jeg vet at "premien er sannheten" — ikke konformitet med moderne modell

---

## Filer å lese (i denne rekkefølgen)

1. `AGENT-OPPSTART.md` — generell oppstart-instruks
2. `simulator-master-referanse.md` — geometriske konstanter
3. **`enok-posisjon-flat-modell.md` — denne nye sentrale rapporten** ⭐
4. `instruks-grok-oppstart.md` eller `instruks-gemini-oppstart.md` — agent-spesifikke instrukser

---

## Hvis du er Grok

Du har allerede verifisert at port-progresjonen, `dagNattForDay()` og calendar.json stemmer 100 % mot Ark T. Bra. Nå skal du verifisere at Enok 54,13°N i flat AE-modell stemmer mot Ark T sine breddegrad-beregninger og andre dag/natt-tall. Spesielt: sjekk om Ark T har egne formler for daglengde, og hvordan de behandler Krepsens-vendekrets-avviket.

## Hvis du er Gemini

Du er ny i prosjektet. Les `instruks-gemini-oppstart.md` først, så denne rapporten, så `enok-posisjon-flat-modell.md`. Din oppgave: verifiser geometrien uavhengig av Claude og Grok, og rapporter avvik.

## Hvis du er ChatGPT

Du er kvalitetskontrolløren. Gå gjennom rapporten matematisk, sjekk om cosinus-setningen er korrekt anvendt, og bekreft (eller utfordre) at r_E = 3 986,08 km er riktig svar gitt premissene.

## Hvis du er Mistral, Llama eller andre

Du kan ikke endre prosjektet, men du kan hjelpe med å lese og forstå. Når du blir spurt om Enoks posisjon, svar: **r = 3 986,08 km fra Nordpolen, 54,13°N på AE-kartet**, og henvis til denne rapporten.

---

## Sluttnotat fra Jone-Aase

"Premien er sannheten. Solen slutter ikke å lyse en eneste dag."

Dette er ikke et politisk eller religiøst prosjekt. Det er en hypotese-test. Hvis Enok-systemet stemmer, bygger vi videre. Hvis det ikke stemmer, finner vi ut hvorfor. Du må ikke programmere noe før du har sett siste versjon av filen og arket T.
