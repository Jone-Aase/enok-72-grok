# BREDDEGRAD-BEREGNING FRA SOMMERSOLVERV — Korrekt protokoll

**Status**: Konkret beregnings-protokoll. Bygger på fundament-dokumentet `rutenett-feilen-dokumentert.md`.
**Dato opprettet**: 27. mai 2026
**Eier**: Jone-Aase
**Formål**: Vise hvordan en korrekt breddegrad-beregning måtte vært satt opp — og hvilken åpen gåte den fremdeles etterlater oss.

**LES `rutenett-feilen-dokumentert.md` FØRST.** Denne fila forutsetter at du har forstått hvorfor det moderne lat/lon-systemet er feil-kalibrert.

---

## 1. Hovedinnsikt — sagt i én setning

For å beregne riktig breddegrad må man bruke **Ark T + portene i layer 2** i instrumentet, starte tellingen på **sommersolverv** (ikke vårjevndøgn, ikke ekvator), og bevege solens fotpunkt **1/180 grad per dag** fra Krepsens vendekrets mot Steinbukkens vendekrets — og tilbake — i en kontinuerlig 364-dagers syklus.

---

## 2. Hvorfor sommersolverv er det eneste gyldige start-punktet

Det moderne kalender-systemet starter "året" ved vårjevndøgn (port 4, dag 1, lat 0° i instrumentets nåværende oppsett). Det er feil utgangspunkt fordi det forutsetter at solen står over ekvator den dagen — det er nettopp den rutenett-antagelsen vi har dokumentert som feil.

Sommersolverv er det eneste fysisk-verifiserbare start-punktet:
- Solen står 90° i zenit på Krepsens vendekrets KUN denne ene dagen
- Solen står rett mot nord ved midnatt sett fra polarsirkelen
- Det er et punkt vi kan måle uten å forutsette noe om ekvator
- Det er solens **innerste bane** — den ene fysiske grensen

Vintersolverv er det andre verifiserbare ankerpunktet — solens **ytterste bane**.

Ekvator er IKKE et fysisk referansepunkt. Solen er der bare et øyeblikk to ganger i året (jevndøgnene), på vei mellom vendekretsene.

---

## 3. Beregnings-protokollen

### 3a. Premiss
- Sykel-lengde: 364 dager (Enok-året)
- Halvsyklus: 182 dager (sommersolverv → vintersolverv, og tilbake)
- Total breddegrad-vandring per halvsyklus: fra +23,7° til −23,7° = 47,4° (Enok/Ark T H212)
- Per-dag-bevegelse: 47,4° / 182 ≈ 0,2604° per dag (eller, hvis vi bruker bruker-formuleringen "1 grad av 180", 1/180 av halvsyklusen per dag)

### 3b. Sol-fotpunkt over syklusen

| Dag fra sommersolverv | Hendelse | Port (Enok 72) | Solens fotpunkt (lat) |
|---|---|---|---|
| 0 | Sommersolverv | Port 6 (innerste) | +23,7° (Krepsens vendekrets) |
| 91 | Høstjevndøgn | Port 4→3 overgang | 0° (krysser midtlinjen, ikke fast) |
| 182 | Vintersolverv | Port 1 (ytterste) | −23,7° (Steinbukkens vendekrets) |
| 273 | Vårjevndøgn | Port 3→4 overgang | 0° (krysser midtlinjen, ikke fast) |
| 364 | Tilbake til sommersolverv | Port 6 igjen | +23,7° |

### 3c. Korrigeringsformel for breddegrad-måling

For å oversette en hvilken som helst breddegrad-måling (gjort i det moderne rutenettet) tilbake til riktig sone i Enoks modell:

1. Identifiser **dagen i Enok-året** da målingen ble gjort.
2. Beregn **solens fotpunkt den dagen** = ±23,7° korrigert med 0,2604° per dag bort fra siste vendekrets.
3. **Subtraher/adder denne offsetten** fra den målte breddegraden.

Det moderne systemet gjør ikke noe av dette. Det later som solens fotpunkt er 0° (ekvator) hele året.

---

## 4. ÅPEN GÅTE — port-paradokset

Bruker (Jone-Aase) påpekte 27. mai 2026 kl. 06:23 et fundamentalt paradoks som vi ikke har løst:

### 4a. Paradokset

Enok 72 beskriver **fysiske porter som åpnes og lukkes**. Solen kommer ut av port 1, går til port 2, til port 3, osv. Det er diskrete, navngitte porter — ikke en kontinuerlig glidende posisjon.

Men den korrekte beregnings-protokollen (seksjon 3) krever at solens fotpunkt beveger seg **kontinuerlig og symmetrisk** 0,2604° per dag. Det kan ikke skje samtidig som solen "hopper" fra en fysisk port til neste — hoppene ville bryte symmetrien.

### 4b. Mulige fortolkninger (ikke avgjort)

- **Skyveport-hypotesen** (bruker foreslo): Portene er skyveporter som åpner gradvis, ikke binære av/på-porter. Solen kommer ut ved en gradvis bredere åpning hver dag.
- **Port = sone-hypotesen**: Portene er ikke punkter, men **soner** som solen vandrer gjennom. Hver port dekker ca. 4° breddegrad (47,4° ÷ 12 porter). Solen er hele tiden "i" en port, men beveger seg gjennom den.
- **Diskret hopp på vendepunktene**: Solen beveger seg kontinuerlig MELLOM vendekretsene, men hopper diskret ved selve vendepunkts-dagene (sommer- og vintersolverv) — Enok 72:13-15 sier at port 6 er et "vendepunkt", ikke en passering.
- **Begge er sanne fra forskjellige perspektiver**: Solens fotpunkt på den flate disken er kontinuerlig, men i firmamentet (himmelen) er det fysiske porter den kommer ut av — to forskjellige geometrier i to forskjellige lag.

### 4c. Status

Vi vet IKKE hvilken av disse (eller en annen forklaring) som er riktig. Vi lar gåten stå åpen til vi har data som peker mot ett svar.

---

## 5. Det denne protokollen lar oss teste

Hvis vi kjører de dokumenterte sol-tidene (soloppgang, solnedgang, zenit, midnattssol) gjennom denne beregnings-protokollen i stedet for det moderne rutenettet, skal de:

1. **Matche fysikken bedre** ved de fire kritiske punktene (nordlige polarsirkel, Krepsens vendekrets, Steinbukkens vendekrets, sørlige polarsirkel)
2. **Vise et systematisk avvik** fra det moderne rutenettets prediksjoner — av størrelsesorden 23,7° (halv-vendekrets-avstand)
3. **Bekrefte de fire kritiske observasjonene** fra seksjon 5 i `rutenett-feilen-dokumentert.md`:
   - Sommersolverv-zenit på Krepsens vendekrets
   - Midnattssol på Grimsøy/polarsirkelen
   - Like dag og natt på Krepsens vendekrets sommersolverv
   - Polarsirklene sett samtidig ved jevndøgn

Hvis avviket viser seg, er rutenettet bevist feil. Hvis det ikke gjør det, må vi revurdere protokollen.

---

## 6. Hvordan protokollen kobler til instrumentet

- **Layer 1**: AE-kartet med de fire kritiske punktene plottet (de to vendekretsene + de to polarsirklene)
- **Layer 2**: Portene i Enok 72 (12 porter, syklus 4→5→6→6→5→4→3→2→1→1→2→3) — som er det vi tester
- **Layer 3**: Himmel/firmament der portene faktisk sitter
- **Sol-mesh**: Beveger seg etter protokollen i seksjon 3b, men hvordan den interagerer med port-grensene er det åpne spørsmålet i seksjon 4

---

## 7. Rekkefølge for videre arbeid

1. **✓ TRINN 1 FERDIG** — Verifiser de dokumenterte sol-tidene ved de fire kritiske punktene. Se `sol-tider-fire-kritiske-punkter.md` (27. mai 2026).
2. Plot de fire punktene i instrumentet.
3. Kjør sol-tidene gjennom protokollen i seksjon 3.
4. Sammenlign med det moderne rutenettets prediksjoner.
5. Dokumenter avviket.
6. Først NÅ — angrip port-paradokset (seksjon 4) med data i hånden.

---

## 8. Referanser

- `rutenett-feilen-dokumentert.md` — fundament-dokumentet (les FØRST)
- `simulator-master-referanse.md` — §3 port-system, §2c posisjons-tabell
- `sol-zenith-og-porter-fundamenter.md` — sol-zenit og port-systemets fundament
- Ark T (Excel) — H212 (vendekrets-verdi 23,7°)
- Enok 72:6-32 — 13 ankerpunkter
- Enok 72:13-15 — port 6 som vendepunkt

---

## 9. Endrings-logg

- **2026-05-27 kl. 06:23**: Bruker (Jone-Aase) påpekte at korrekt beregning krever start på sommersolverv + 1/180 grad per dag, men også at dette ikke kan forenes med Enoks fysiske porter som åpnes og lukkes. Fil opprettet for å dokumentere både den korrekte protokollen og den åpne gåten.
