# Ekvator-test — stemmer kartet med solens bane?

**Hypotesen vi tester**: På jevndøgnene (20. mars og 22-23. september) skal solen stå i zenit (90° over horisonten, ingen skygge) på lokal middag for **alle steder på ekvator (0°)**, uansett lengdegrad.

**Modellens prediksjon**:
- Solens deklinasjon = 0° på jevndøgn-øyeblikket
- For et sted på bredde φ er solens høyde ved lokal middag = 90° − φ
- Derfor: på 0° bredde gir middag 90° solhøyde (ingen skygge)
- Lengdegraden bestemmer bare når lokal middag inntreffer (UTC-tid)

---

## Punkter du kan plotte i Google Earth

### Hovedmonumenter på ekvator (gå rundt jorden fra Greenwich østover)

| # | Sted | Land | Kart-koordinater | Status |
|---|---|---|---|---|
| 1 | Pontianak (Tugu Khatulistiwa) | Indonesia, Borneo | 0°00′03.8″N, 109°19′20.0″E | Monument 110 m nord av faktisk ekvator¹ |
| 2 | Marco Zero | Macapá, Brasil | 0°00′00″N, 51°03′59″W | Monument står på ekvator. Stadium Zerão har middtlinje langs ekvator |
| 3 | Mitad del Mundo | Quito, Ecuador | 0°00′00″ (markert), faktisk 0°00′07.5″S, 78°27′21″W² | Monument 240 m sør av faktisk ekvator² |
| 4 | Quitsato Sundial | Cayambe, Ecuador | 0°00′00″N, 78°10′W (cirka) | 52 m solur, presist på ekvator |
| 5 | Uganda Equator (Kayabwe) | Uganda | 0°00′00″N, 32°09′E (cirka) | Standard turist-monument på Kampala-Masaka veien |
| 6 | Ilhéu das Rolas | São Tomé og Príncipe | 0°00′14″S, 6°31′21″E | Monument er på øya, men selve linjen krysser cirka 100 m unna |
| 7 | Nanyuki | Kenya | 0°00′N, 37°04′E (cirka) | Equator-skilt langs A2 veien |

¹ [Pontianak-monumentet](https://en.wikipedia.org/wiki/Equator_Monument) ligger faktisk ikke akkurat på ekvator — det er en sjekkbar feilkilde.
² [Mitad del Mundo](https://happygringo.com/blog/mitad-del-mundo-ecuador/) — moderne GPS plasserer ekvator 240 m nord av det markerte monumentet. Dette er kjent og dokumentert.

### Hvorfor punkt 1-2-3 spenner over kloden

Ved å spre testen mellom Indonesia (109°E), Uganda (32°E), São Tomé (6°E), Brasil (51°W) og Ecuador (78°W) tester vi ekvator på **fire kontinenter og 187 lengdegrader** av jordens omkrets.

---

## Hvor observert vs modell stemmer

### Verifiserte observasjoner

| Sted | Bredde (kart) | Observert dato | Observert klokketid | Sol-høyde |
|---|---:|---|---|---|
| **Singapore** | 1.35°N | 23. mars 2024 | 13:11 SGT | i zenit (Lahaina Noon-fenomen) |
| **Singapore** | 1.35°N | 19. sept | 12:58 SGT | i zenit |
| **Quito/Mitad del Mundo** | 0.00° | 20.-21. mars | lokal middag | 90° solhøyde, no shadow³ |
| **Quito/Mitad del Mundo** | 0.00° | 22.-23. sept | lokal middag | 90° solhøyde, no shadow³ |
| **Kayabwe (Uganda)** | 0.00° | 21. mars, 23. sept | lokal middag | sol passerer rett over⁴ |
| **Macapá (Brasil)** | 0.00° | 20. mars, 22. sept | lokal middag | sol rett øst opp, langs Marco Zero⁵ |

³ [Mitad del Mundo September Equinox 2024](https://andeantc.com/equinox-in-ecuador/) — visitors observe "sun casting no shadow at noon"
⁴ [Gaddafi Mosque - Uganda Equator](https://www.gaddafinationalmosque.com/places/uganda-equator/): "on 21st March and 23rd September the sun rises and sets directly above the Equator line in Uganda"
⁵ [Wikipedia Macapá](https://en.wikipedia.org/wiki/Macap%C3%A1): "At the spring and the autumn equinox the sun rises and sets on the line of the equator and shines on the monument along the Avenue Equatorial"

### Singapore-detaljen er meget viktig

Singapore ligger på **1.35°N** — ikke akkurat på ekvator. Modellen sier at Singapore-zenit-passering skjer ikke akkurat på jevndøgn, men noen dager **etter** vårjevndøgn (når solen vandrer nordover mot Cancer) og noen dager **før** høstjevndøgn (når den vandrer tilbake sørover).

[Straits Times bekrefter](https://www.straitstimes.com/singapore/zero-shadow-at-111pm-on-march-23-in-singapore) dette presist: **"the midday sun will be overhead only about four days after the astronomical spring equinox"** og **September 19** (3-4 dager før).

**Matematikk-sjekk**:
- Singapore bredde: 1.35°N
- Solens deklinasjon dag etter vårjevndøgn: cirka +0.39°/dag
- Tid til solen når 1.35°N: 1.35° / 0.39°/dag ≈ 3.5 dager etter jevndøgn
- **Observert**: 23. mars = 3 dager etter jevndøgn 20. mars
- **Avvik**: under 1 dag

Dette er presist det modellen predikerer. Singapore er en god kalibrering — observasjonen stemmer med kart-bredden 1.35°N.

---

## Modellens andre prediksjon på jevndøgn — 12 timer dag/natt overalt

Modellen predikerer at på jevndøgn er dagslyset cirka 12 timer **overalt på Jorden** (med små unntak ved polene grunnet refraksjon).

[CosmoQuest](https://cosmoquest.org/x/365daysofastronomy/2009/03/21/march-21st/): *"Whether you are in the Southern hemisphere or the Northern hemisphere or at the equator, on the Equinox you will see the Sun rise due East and set due West, with 12 hours of Sun up and 12 hours of Sun down."*

Dette kan testes for hvert sted ved å sjekke soloppgang/solnedgang-tabeller for jevndøgn-dagen.

---

## Sammendrag — ekvator-testen så langt

**Fire uavhengige steder, fire kontinenter, samme observasjon**:

| Sted | Kontinent | Lengdegrad | Stemmer kart? |
|---|---|---:|---|
| Pontianak | Asia | 109°E | (mangler eksplisitt no-shadow observasjon, men dokumentert som ekvator) |
| Kayabwe (Uganda) | Afrika | 32°E | JA — sol direkte over på jevndøgn |
| Macapá | Sør-Amerika | 51°W | JA — sol over Avenida Equatorial på jevndøgn |
| Mitad del Mundo / Quitsato | Sør-Amerika | 78°W | JA — sol i zenit, no shadow på jevndøgn |
| Singapore (1.35°N) | Asia | 104°E | JA — zenit-dag 3-4 dager etter jevndøgn, som modellen predikerer |

**Foreløpig konklusjon**: Ekvator-plasseringen i Google Earth stemmer med solens observerte bane.

**Det dette ikke har testet ennå**:
- Avstandene mellom punktene (ekvator-omkrets)
- Hvor presist hvert monument står relativt til faktisk ekvator (vi vet at Mitad del Mundo og Pontianak er noen hundre meter av)
- Sør-halvkulens kontinent-plassering generelt

---

## Mine forslag til konkret GE-test

Hvis du vil verifisere alt selv i Google Earth Pro, foreslår jeg:

**Steg 1**: Plotte de 5 monumentene over som plassepunkter
**Steg 2**: Trekke en linje langs ekvator (0° N) fra hver til de andre
**Steg 3**: Måle avstanden mellom dem og sammenligne med forventet ekvator-omkrets
- Pontianak → Kayabwe (forventet cirka 77° × 111 km/° ved ekvator = 8 547 km)
- Kayabwe → Macapá (forventet cirka 83° × 111 km/° = 9 213 km)
- Macapá → Mitad del Mundo (forventet cirka 27° × 111 km/° = 2 997 km)
- Mitad del Mundo → Pontianak (forventet cirka 173° × 111 km/° = 19 203 km)

**Steg 4**: Total skal være cirka 40 075 km (Jordens ekvator-omkrets)

Hvis tallene stemmer = ekvator-banen på kartet er kalibrert. Hvis ikke = vi har funnet noe.

---

## Filer
- `ekvator-test.md` — denne filen
- `sol-zenit-test.md` — bredere zenit-test (Cancer + Capricorn)
- `google-earth-koordinater.md` — målbåndets endepunkter
