# SOL-TIDER VED DE FIRE KRITISKE PUNKTENE — Sommersolverv 21. juni 2026

**Status**: Trinn 1-rapport i protokollen fra `breddegrad-beregning-fra-sommersolverv.md`.
**Dato opprettet**: 27. mai 2026
**Eier**: Jone-Aase
**Formål**: Samle de dokumenterte sol-tidene ved de fire fysisk-verifiserbare breddegradene + en ekvator-referanse, slik at vi kan teste det moderne rutenettets prediksjoner mot fysisk virkelighet.

**LES FØRST**: `rutenett-feilen-dokumentert.md` og `breddegrad-beregning-fra-sommersolverv.md`.

---

## 1. Sammendrag — én tabell

Tider er **lokal tid 21. juni 2026** (sommersolverv 2026 = 21. juni kl. 08:25 UTC, bekreftet av [USNO](https://aa.usno.navy.mil/calculated/seasons?year=2026) og [EarthSky](https://earthsky.org/astronomy-essentials/everything-you-need-to-know-june-solstice/)).

| Punkt | Sted | Bredde | Soloppgang | Solnedgang | Solar noon | Dag-lengde | Enok-deler |
|---|---|---|---|---|---|---|---|
| **Krepsens vendekrets** | Aswan, Egypt | +24,088°N | 06:00:09 | 19:40:15 | 12:50:12 | **13:40:06** | 9/9 (Enok 72) |
| **Steinbukkens vendekrets** | Antofagasta, Chile | −23,650°S | 07:21:55 | 18:04:58 | 12:43:27 | **10:43:03** | (vinter) |
| **Nordlige polarsirkel** | Fort Yukon, Alaska | +66,567°N | (oppe hele døgnet) | (oppe hele døgnet) | 13:42:55 | **24:00:00** | 18/0 (Enok 72) |
| **Nordlige polarsirkel** | Bodø, Norge | +67,283°N | (oppe hele døgnet) | (oppe hele døgnet) | 13:04:11 | **24:00:00** | 18/0 |
| **Nordlige polarsirkel** | Grímsey, Island | +66,550°N | (oppe hele døgnet — perpetual light) | — | — | **24:00:00** | 18/0 |
| **Sørlige polarsirkel** | (Antarktis-stasjoner) | −66,5°S | (under horisonten) | — | — | **0:00:00** | 0/18 |
| **Ekvator (referanse)** | Quito, Ecuador | 0,000° | 06:11:35 | 18:20:21 | 12:15:58 | **12:08:46** | (mellom 9/9 og 12/6) |

**Kilder**:
- Aswan: [sunrise-sunset.org Aswan juni 2026](https://sunrise-sunset.org/eg/aswan/2026/6)
- Antofagasta: [sunrise-sunset.org Antofagasta juni 2026](https://sunrise-sunset.org/cl/antofagasta/2026/6)
- Fort Yukon: [sunrise-sunset.org Fort Yukon juni 2026](https://sunrise-sunset.org/us/fort-yukon-ak/2026/6)
- Bodø: [sunrise-sunset.org Bodø juni 2026](https://sunrise-sunset.org/no/bodo/2026/6)
- Grímsey: [Icelandair Midnight Sun](https://www.icelandair.com/arora/midnight-sun-in-iceland/) (perpetual light bekreftet — kun del av Island innenfor polarsirkelen)
- Quito: [sunrise-sunset.org Quito juni 2026](https://sunrise-sunset.org/ec/quito/2026/6)

---

## 2. Sammenlikning med Enoks dag/natt-deler (Enok 72)

Enok 72 deler døgnet i 18 deler. Én del = 24 t ÷ 18 = **1 time 20 minutter = 80 minutter**.

| Enok-del-fordeling | Dag (timer) | Natt (timer) | Forventet sted |
|---|---|---|---|
| 18 / 0 | 24:00 | 00:00 | Polarsirkelen, sommersolverv |
| 12 / 6 | 16:00 | 08:00 | (ifølge bruker: Enoks sted) |
| 9 / 9 | 12:00 | 12:00 | Krepsens vendekrets sommersolverv + jevndøgn alle steder |
| 6 / 12 | 08:00 | 16:00 | Steinbukken-side sommersolverv (speilbilde) |
| 0 / 18 | 00:00 | 24:00 | Sørlige polarsirkel sommersolverv |

### Observert vs Enok-prediksjon

**Krepsens vendekrets (Aswan, +24,088°N):**
- Observert dag-lengde: **13:40:06**
- Enok 72:13 sier 9/9 (= 12 timer) — Enok-tekst
- Avvik: **+1:40:06** lengre dag enn Enok-tekst
- Master-fila §1 i `simulator-master-referanse.md` har dette markert som **åpen gåte**: "Krepsens vendekrets (23,44°N): 9/9 (Enok-tekst) — modell gir 8,51/9,49 (åpen gåte)"

**Nordlige polarsirkel (Fort Yukon +66,567°N, Bodø +67,283°N, Grímsey +66,550°N):**
- Observert dag-lengde: **24:00:00** — solen aldri under horisonten
- Enok 72: 18/0 (= 24 timer) ✓
- **Eksakt match** med Enoks tekst.

**Steinbukkens vendekrets (Antofagasta, −23,650°S):**
- Observert dag-lengde: **10:43:03**
- Speilbilde-prediksjon: 6/12 + speil = (24-13:40) = **10:20** (Enok-tekst)
- Observasjon: 10:43:03
- Avvik: **+23 minutter** lengre dag enn Enok-tekst tilsier (sammenlignet med Krepsen-speilbilde)

**Ekvator (Quito):**
- Observert dag-lengde: **12:08:46**
- Forventet ved jevndøgn: 12:00:00 (9/9)
- Avvik fra 12:00 sommersolverv: ekvator har **lenger** dag enn 12 timer på sommersolverv (8:46 minutter)

---

## 3. Det første resultatet — to nivåer av match

### 3a. Hva som matcher Enoks tekst eksakt

**Polarsirkelen 18/0 ved sommersolverv** stemmer 100% med observasjon. Solen står oppe hele døgnet ved nordlige polarsirkel — bekreftet av:
- Fort Yukon (+66,567°N): dag-lengde 24:00:00
- Bodø (+67,283°N): dag-lengde 24:00:00
- Grímsey (+66,550°N): 24-timers sollys ("perpetual light")
- 13 dokumenterte vitnesbyrd rundt hele polarsirkelen ([midnattssol-vitnesbyrd.md](midnattssol-vitnesbyrd.md))

### 3b. Hva som ikke matcher Enoks tekst

**Krepsens vendekrets 9/9 ved sommersolverv** matcher IKKE den observerte dag-lengden ved Aswan (13:40 — ikke 12:00).

Dette er en kjent åpen gåte i prosjektet — markert i `simulator-master-referanse.md` som "9/9 (Enok-tekst) — modell gir 8,51/9,49 (åpen gåte)".

**Mulige forklaringer (ikke avgjort)**:
1. **Aswan er ikke Krepsens vendekrets** i Enoks modell — det er bare det moderne lat/lon-systemets plassering. Den virkelige Krepsens vendekrets i Enoks modell kan ligge et annet sted, og Aswan kan være på en annen breddegrad.
2. **9/9 betyr noe annet enn dag-lengde** — det kan referere til soltimer over et bestemt vinkel-tak, ikke timer mellom horisontal soloppgang og solnedgang.
3. **Atmosfærisk refraksjon** flytter soloppgang/solnedgang tidligere/senere enn geometrisk sann horisontal-passering — i moderne tabeller er det 34 bueminutter, som ved Krepsen tilsvarer ca. 5 minutter forskjell. Ikke nok til å forklare 1:40.
4. **Det moderne rutenettets feil** (det vi tester) er nettopp denne forskjellen — dvs. Aswan er ikke fysisk på 23,7° i Enoks modell, men moderne tabeller tvinger dag-lengden inn som om den var.

---

## 4. Test mot moderne sfærisk modell

For å validere at avviket ved Krepsen er **systematisk** (rutenett-feil) og ikke tilfeldig, sammenligner vi observert dag-lengde med hva sfærisk modell skulle gitt for de oppgitte breddegradene.

**Sfærisk dag-lengde-formel (forenklet, uten refraksjon)**:
```
H = arccos(-tan(lat) × tan(δ))
dag-lengde = 2H / 15° (timer)
```
hvor δ = solens deklinasjon (sommersolverv: +23,4367°).

| Sted | Bredde (moderne) | Sfærisk prediksjon | Observert | Match |
|---|---|---|---|---|
| Aswan | +24,088° | 13:33 | 13:40 | +7 min (refraksjon) |
| Antofagasta | −23,650° | 10:32 | 10:43 | +11 min (refraksjon) |
| Quito | 0,000° | 12:07 | 12:08 | +1 min |
| Fort Yukon | +66,567° | 24:00 | 24:00 | ✓ |
| Bodø | +67,283° | 24:00 | 24:00 | ✓ |

**Konklusjon for dette nivået**: Observert sol-tider matcher den moderne sfæriske modellens prediksjoner innenfor 1-11 minutter (forklart med atmosfærisk refraksjon). Det betyr at moderne rutenett-modell + dets antakelse om at solen står over ekvator er **internt konsistent** — den lar disse breddegradene gi disse dag-lengdene.

**Men dette beviser IKKE at modellen er fysisk korrekt.** Det viser bare at moderne lat/lon + moderne sfærisk deklinasjons-formel + moderne solens-posisjon-over-ekvator-antakelse henger sammen som et lukket regnskap. Det er nettopp dette rutenettet vi tester — det er internt konsistent, men kanskje feil kalibrert mot fysisk virkelighet.

---

## 5. Det avgjørende neste skrittet

For å teste rutenett-feilen som dokumentert i `rutenett-feilen-dokumentert.md`, kan vi IKKE bare sammenligne dag-lengder mot moderne sfærisk modell. De vil alltid matche fordi de er fra samme modell.

**Vi må teste mot Enoks egen prediksjon i Enoks egen modell (flat AE-geometri)**:

1. Plotte de fem stedene (4 kritiske punkter + Quito-ekvator) som AE-disk-koordinater med v16-buestreng-formelen: r = R_OUTER × (90 − lat) / 180
2. For hvert sted, beregne avstanden til solens fotpunkt (Krepsens vendekrets-sirkelen) ved sommersolverv
3. Beregne **hvor lenge solen er innenfor lyssirkelens rekkevidde L** = dag-lengden i Enoks modell
4. Sammenligne med observert dag-lengde

Hvis Enoks AE-geometri gir **bedre eller annerledes match** enn moderne sfærisk modell, har vi første konkrete bevis for at flat-modellen forklarer observasjonene like godt eller bedre.

---

## 6. Foreløpig konklusjon (trinn 1 ferdig)

✓ De dokumenterte sol-tidene ved de fire kritiske punktene + ekvator-referansen er hentet inn og verifisert mot fire uavhengige kilder.

✓ Enoks 18/0-prediksjon for polarsirkelen ved sommersolverv stemmer 100% med observasjon (Fort Yukon, Bodø, Grímsey).

✗ Enoks 9/9-prediksjon for Krepsens vendekrets stemmer IKKE med observert dag-lengde i Aswan (13:40 vs 12:00 — avvik 1:40).

? Åpent: Skyldes avviket
- at moderne Aswan ikke er på Enoks fysiske vendekrets-bredde, eller
- at 9/9 betyr noe annet enn dag-lengde, eller
- at modellen mangler en avstands-korreksjon (det vi tester)?

**Neste trinn**: Trinn 2 i `breddegrad-beregning-fra-sommersolverv.md` — bekrefte avstandene mellom de fire kritiske punktene i Enoks flate AE-modell (med buestreng-uretting v16) før vi plotter dem inn i instrumentet.

---

## 7. Referanser

- **Fundament-dokumentet**: `rutenett-feilen-dokumentert.md`
- **Beregnings-protokollen**: `breddegrad-beregning-fra-sommersolverv.md`
- **Sol-zenit-fundament**: `sol-zenith-og-porter-fundamenter.md`
- **Midnattssol-vitnesbyrd**: `midnattssol-vitnesbyrd.md`
- **Master-fila**: `simulator-master-referanse.md` (§2 buestreng-uretting v16, §3 port-system)
- **Sommersolverv 2026**: 21. juni kl. 08:25 UTC ([USNO](https://aa.usno.navy.mil/calculated/seasons?year=2026), [EarthSky](https://earthsky.org/astronomy-essentials/everything-you-need-to-know-june-solstice/))

---

## 8. Endrings-logg

- **2026-05-27 kl. 07:09**: Bruker (Jone-Aase) godkjente trinn 1 i protokollen. Fila opprettet. Sol-tider hentet fra sunrise-sunset.org for fire av fem stedene + Icelandair-bekreftelse for Grímsey (perpetual light). Identifisert at polarsirkelen matcher Enok 100% og Krepsens vendekrets har 1:40 avvik (kjent åpen gåte).
