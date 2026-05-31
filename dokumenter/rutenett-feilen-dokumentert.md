# RUTENETT-FEILEN — Dokumentert grunnlag for Enok 72 Truth Instrument

**Status**: Fundamental — dette er PREMISSET for hele test-prosjektet.
**Dato dokumentert**: 27. mai 2026
**Eier**: Jone-Aase
**Formål**: Slå fast hvorfor det eksisterende lat/lon-rutenettet IKKE kan brukes som sannhetsverdi, og hva instrumentet faktisk skal teste.

**LES DENNE FØR du gjør noen som helst beregning eller modell-endring.**

---

## 1. Hovedfeilen — sagt i én setning

Det eksisterende rutenettet (lat/lon slik det brukes i moderne kart og GPS) er bygget på antagelsen om at **solen alltid står over ekvator**. Det gjør den ikke. Solen vandrer mellom Krepsens vendekrets (nord) og Steinbukkens vendekrets (sør). Derfor er hver eneste breddegrad i det eksisterende systemet forskjøvet, og det mangler en uregnet sone tilsvarende halve avstanden mellom de to vendekretsene på begge sider av ekvator.

---

## 2. Premisset rutenettet bygger på (feil)

- Ekvator er null-linjen.
- Solen står over ekvator hele året.
- Breddegrader regnes symmetrisk ut fra ekvator (0° → 90° nord, 0° → 90° sør).
- En grad er en grad — samme avstand uansett breddegrad og uansett dato.

---

## 3. Virkeligheten (det Enoks tekst og observasjoner viser)

- Solen står IKKE over ekvator. Ekvator er en konstruksjon, ikke et fysisk sol-referansepunkt.
- Solen vandrer mellom to fysiske grenser:
  - **Krepsens vendekrets (nord)** — innerste sol-bane. Solen står 90° i zenit der KUN én dag i året (sommersolverv).
  - **Steinbukkens vendekrets (sør)** — ytterste sol-bane. Solen står 90° i zenit der KUN én dag i året (vintersolverv).
- Det er disse to vendekretsene som er de eneste fysisk-verifiserte breddegrad-referansene — fordi solen står rett opp der, målbart, én gang per år.
- Ekvator er IKKE et fysisk referansepunkt på samme måte. Solen passerer over ekvator to ganger i året (jevndøgnene), men befinner seg der bare et øyeblikk — den er på vei mellom vendekretsene.

---

## 4. Den manglende avstanden

Hvis solen vandrer mellom de to vendekretsene, og breddegradene er kalibrert som om solen står over ekvator, så **mangler det en avstand i rutenettet tilsvarende halve avstanden mellom de to vendekretsene** — på hver side:

- **På nordsiden**: avstanden ekvator → Krepsens vendekrets er klemt inn i et rutenett som later som det bare er en jevn gradering ut fra ekvator. I virkeligheten er det sonen der solen faktisk står om sommeren.
- **På sørsiden**: tilsvarende for ekvator → Steinbukkens vendekrets.

Disse to sonene (Krepsen → ekvator og ekvator → Steinbukken) er den uregnede realiteten som rutenettet skjuler. Hver breddegrad-måling i det eksisterende systemet er derfor forskjøvet med en faktor som avhenger av dato og halvkule.

---

## 5. Det dokumenterte fakta-grunnlaget vi tester mot

Disse fenomenene er fysisk målbare og uavhengige av hvilket rutenett vi bruker:

### 5a. Sommersolverv
- **Solen står 90° i zenit på Krepsens vendekrets klokken 12 lokal tid** — KUN denne ene dagen.
- **På Krepsens vendekrets er dag og natt like lange** denne ene dagen.
- **På den nordlige polarsirkelen (Grimsøy, ca. 66,5°N) ser man solen rett mot nord ved midnatt** — solen går ikke ned.
- **Synslinjen fra Grimsøy til Krepsens vendekrets går over Nordpolen** — buestrengen, kuttet og rettet ut, treffer senter nord på midten.

### 5b. Vintersolverv
- Speilbilde av 5a, men over Steinbukkens vendekrets og sørlige polarsirkel.

### 5c. Vår- og høstjevndøgn
- Sollyset er synlig fra begge polarsirklene samtidig, én dag.

### 5d. Polarsirklenes natt-deler (fra Enok 72)
- På polarsirkelen er dagen 18 deler og natten 0 ved sommersolverv (Enok-tekst).
- På Krepsens vendekrets er dagen 9 deler og natten 9 ved sommersolverv (Enok-tekst — der dag og natt er like lange den ene dagen).

### 5e. Sol-tider og koordinater vi har dokumentert
- Soloppgang og solnedgang ved begge vendekretser og polarsirkler — datoer hvor det er fysisk målt.
- CLIWOC-skipsloggene (1750-1850) — faktiske oppmålte distanser og noon-positions.
- Beagle, Challenger, Wales, Anson, Adventure — skipsloggene med faktisk seilt distanse vs. oppgitt lat/lon.
- Eratosthenes' opprinnelige data fra Aswan-Alexandria.
- Catequilla, Pontianak, Mitad del Mundo, Quitsato — observatorier ved ekvator.
- Modhera, Aswan, Ujjain, Chiayi — markører ved Krepsens vendekrets.

---

## 6. Det instrumentet skal vise

1. **De to vendekretsene som primær-referanse** (ikke ekvator).
2. **Avstanden mellom vendekretsene** som primær-måling.
3. **Sol-tidene** (soloppgang, solnedgang, zenit, midnattssol) ved fire kritiske punkter:
   - Nordlige polarsirkel
   - Krepsens vendekrets
   - Steinbukkens vendekrets
   - Sørlige polarsirkel
4. **Sammenligning** mellom det de sfæriske rutenett-formlene forutsier og det de dokumenterte observasjonene faktisk viser.
5. **Differansen** = den manglende avstanden som beviser at rutenettet er feil-kalibrert.

---

## 7. Hva instrumentet IKKE skal gjøre

- IKKE bland inn sfærisk trigonometri. Dette er en test av flat AE-modell.
- IKKE bruk lat/lon som sannhets-verdi — bruk dem bare som markører for å plotte hvor de dokumenterte observasjonene ble gjort.
- IKKE plasser Enok i modellen før vi har bekreftet de fundamentale avstandene mellom polarsirkel ↔ vendekrets ↔ vendekrets ↔ polarsirkel.
- IKKE regn videre med 23,4367° hvis Enok/Ark T H212 sier 23,7°. Vi tester Enoks tall, ikke moderne.

---

## 8. Rekkefølgen vi følger nå

1. **Bekrefte de dokumenterte sol-tidene** ved de fire kritiske punktene (les `sol-zenith-og-porter-fundamenter.md`, `meridian-gull-rapport.md`, `ekvator-zenith-rapport-v1.md`, `maalband-v1-rapport.md`).
2. **Bekrefte avstandene mellom vendekretsene og polarsirklene** i Enoks flate modell (buestreng-uretting v16).
3. **Plotte de fire kritiske punktene** i instrumentet og kjøre sol-tidene gjennom modellen.
4. **Sammenligne mot rutenett-prediksjonene** og dokumentere avviket.
5. **Først DA** kan vi vurdere hvor Enok stod, og hvor langt unna solen er — fordi vinkelen mellom vendekretsene er 45° (slik bruker beskrev 27. mai 2026 kl. 05:28).

---

## 9. Referanser i prosjektet

- **`solar-noon-verifikasjon.md`** — Trinn 1-b: hva solar noon-tabeller faktisk måler, sivil klokketid = solen rett opp, systematisk 3-min-avvik
- **`hypotese-kontinent-forskyvning.md`** — Brukerens hypotese: lengdegradene er rett, men kontinentene er forskjevet i havområdene
- **`sol-tider-fire-kritiske-punkter.md`** — Trinn 1-rapport: dokumenterte sol-tider for sommersolverv 21. juni 2026 ved de fire kritiske breddegradene + ekvator-referanse
- **`breddegrad-beregning-fra-sommersolverv.md`** — konkret protokoll for korrekt breddegrad-beregning + dokumentert ÅPEN GÅTE om port-paradokset
- `simulator-master-referanse.md` — kjernekonstanter, projeksjon, port-system
- `sol-zenith-og-porter-fundamenter.md` — sol-zenit og port-systemets fundament
- `meridian-gull-rapport.md` — gull-konstantene og målingene
- `ekvator-zenith-rapport-v1.md` — zenit-observasjoner ved ekvator
- `maalband-v1-rapport.md` — målbånd-protokollen og verifisering
- `arkivkatalog-originale-skipslogger.md` — skipsloggene
- `afrika-parallell-linjer-notat.md` — afrika-test
- `rundsor-ekspedisjoner.md` — sør-test
- `vendekretser-vitnesbyrd.pdf` — vendekrets-vitnesbyrd

---

## 10. Endrings-logg

- **2026-05-27**: Fila opprettet etter samtale 27. mai 2026 kl. 05:40-05:45 der bruker (Jone-Aase) presiserte den fundamentale rutenett-feilen og ba om at den ble dokumentert lett-finnbart for både ham selv og alle AI-agenter.
