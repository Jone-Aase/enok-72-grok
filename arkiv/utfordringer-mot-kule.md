# Utfordringer mot kulemodellen

**Forfatter**: Brukeren (selvstendig)
**Status**: Bygges parallelt med prosjektet, åpnes etter Panel C

---

## Brukerens liste

### #1 Svalbard/nordpol-midnattssol — rotasjons-paradokset
I følge kule-modellen skal man kunne stå vendt mot nord klokken 00:00 og se solen over horisonten på Svalbard. Og stå låst i denne posisjonen og ikke rotere rundt sin egen akse. Man skal kunne se solen i samme retning 24 timer, fordi man følger jordens rotasjon rundt sin egen akse. Videobevisene fra Svalbard og fra skip nær nordpolen viser det motsatte: man må følge solens rotasjon, og fotografen må rotere rundt sin egen akse for å få solen inn i kameravinkelen.

### #2 Krepsens vendekrets stabilitet
Krepsens vendekrets har ikke forskjøvet seg med målbare breddegrader på 2000 år.

### #3 Strukne landmasser
De store landmassene er strukket og har ikke sine nøyaktige mål.

### #4 GPS-avstandsmålinger uten krumningsfaktorer
GPS-data på verifisert avstandsmåling stemmer ikke når man legger inn faktorer for krumning.

### #5 Navigasjon og våpensystemer bygget på flat modell
All navigasjon og avanserte våpensystemer er bygget på data som er basert på en flat modell.

### #6 47-graders effektiv-pol-forskyvning gjennom året — må inn i beregningene

Kule-modellen sier at Jordens akse-tilt på 23.5° er konstant i rommet, men Jordens posisjon i banen rundt Solen endrer seg. Dette betyr at den "effektive sol-projiserte" nordpolen er forskjøvet i forhold til den geografiske nordpolen på forskjellige tider av året:

| Årstid | Effektiv forskyvning av sol-projisert nordpol |
|---|---|
| Sommersolverv (21. juni) | 23.5° mot Solen, langs hovedmeridianen (0°) |
| Høstjevndøgn (22. september) | 23.5° mot øst (90°E) |
| Vintersolverv (21. desember) | 23.5° bort fra Solen, langs antimeridianen (180°) |
| Vårjevndøgn (20. mars) | 23.5° mot vest (90°W) |

**Total svingning sommer ↔ vinter = 47° (23.5° + 23.5°)**

Konsekvens: Alle sol-høyde-beregninger og pol-relaterte beregninger må korrigeres for denne effektive forskyvningen. Hvis modellen sier solstrålene treffer Jorden vinkelrett på hele halvkulen mellom sydpol og nordpol ved jevndøgnene, må forskyvningen være innebakt i alle beregninger som innebærer pol-til-sol-geometri.

**Brukerens utfordring**: Kule-modellen fremstiller dette ofte gjennom statiske diagrammer (NASA, Britannica, NWS) der man ser sommer- og vinterposisjonene som speilbilder — men den dynamiske vandringen av sub-solar-punktet og effektiv pol-posisjon må testes mot faktiske skyggemålinger over tid. Dette er en testbar påstand som ikke kan tas for gitt.

### #7 Ekvator-test: 3 punkter på 3 kontinenter — ekvator-linja i GE stemmer med fysiske monumenter

**Brukerens GE-verifiserte funn (18. mai 2026)**:

Tre uavhengige ekvator-monumenter på tre forskjellige kontinenter er plottet og avlest i Google Earth Pro:

| Sted | Kontinent | Lengdegrad | Avvik fra GE-ekvator |
|---|---|---:|---:|
| Mitad del Mundo | Sør-Amerika | 78.46°W | 240 m sør (pre-GPS 1936) |
| Kayabwe Uganda | Afrika | 32.04°E | 20 m sør |
| Pontianak Tugu Khatulistiwa | Asia | 109.32°E | 0.3 m (praktisk eksakt) |

**Total spenn: 187.78°** — over halvparten av jordens omkrets dekket. Vincenty WGS84-distanse: 20 903.29 km.

### #7b Sol-zenit på ekvator ved jevndøgn — 90° rett opp, ikke 23.5°

**Det viktigste poenget fra ekvator-funnet**:

Alle tre ekvator-monumentene (Mitad del Mundo, Kayabwe, Pontianak Tugu Khatulistiwa) er bygget på steder hvor solen står **i zenit — 90° rett over hodet — ved vårjevndøgn og høstjevndøgn**. Dette er observert, dokumentert og er hele begrunnelsen for at monumentene står akkurat der de står.

Dette er en direkte empirisk test som faller ut til fordel for følgende geometri:

- Ved vårjevndøgn (20. mars) og høstjevndøgn (22. september) treffer solstrålene ekvator i 90°
- Sub-solar-punktet ligger på ekvator disse dagene
- Ingen 23.5° tilt-effekt sees ved ekvator på jevndøgn — den observeres bare som forskyvning av sub-solar-punktet nord (sommer) og sør (vinter)

**Hvordan dette utfordrer en del flat-jord-fremstillinger** (som hevder solen er en lokal disk i en sirkulær bane over en flat skive):

- En lokal sol-disk over en flat skive kan ikke samtidig stå i zenit over Quito, Kayabwe og Pontianak på samme dato — geometrien tillater det ikke uten parallelle stråler fra svært stor avstand
- Tre samtidige zenit-observasjoner 90° fra hverandre langs ekvator krever enten: (a) parallelle stråler over en kuleformet jord, eller (b) en modell vi ennå ikke har sett presentert

**Hvordan dette utfordrer kule-modellen** (rettferdig motstand):

- Kule-modellen forutsier nettopp dette og består testen. Det er ingen utfordring her mot kule-modellen som sådan
- Utfordringen ligger i at brukerens tidligere hypotese om "effektiv 47°-forskyvning" (punkt #6) **ikke gjelder ekvator ved jevndøgn** — der er forskyvningen 0°. Dette må presiseres i alle videre beregninger

**Det 47°-forskyvningen faktisk handler om** (presisering basert på dette funnet):

47°-svingningen er sub-solar-punktets vandring **nord–sør gjennom året** (fra 23.5°N ved sommersolverv til 23.5°S ved vintersolverv). På jevndøgnene står sub-solar-punktet på ekvator — 0°. Dette må vi ha klart før vi tester Tropic of Cancer- og Capricorn-zenit-observasjonene.

**Hva dette betyr for kart-kalibreringen**:

Dette er en **delvis** verifikasjon av kart-kalibreringen. Det viser at:
- Ekvator-linja som GE viser samsvarer med fysiske monumenter på 3 kontinenter
- Avvikene er små og forklarlige (0.3 m, 20 m, 240 m)
- Litteraturens påstand om at Pontianak-monumentet er 110 m feilplassert er feil — selve monumentet står 0.3 m fra ekvator, det er park-inngangen 120 m nord som er forvekslet
- Sol-zenit-observasjonen er den uavhengige fysiske begrunnelsen for hvor monumentene står — ikke GPS, ikke GE, men skyggemålingen ved lokal middag på jevndøgn

**Det dette IKKE beviser** (må tas høyde for):
- Avstandene mellom punktene er ikke verifisert i GE ennå (Mitad → Kayabwe forventet 12 300.32 km, Kayabwe → Pontianak 8 602.97 km)
- Stillehavet (172.22°) er ikke testet ennå
- Sol-zenit-observasjoner ved jevndøgn er litteraturreferanser foreløpig — brukeren har ikke målt skygge personlig

**Status på utfordringen**: Brukerens tidligere påstand om at "krepsens vendekrets ikke har forskjøvet seg på 2000 år" (punkt #2) må nyanseres i lys av at ekvator-monumentene fra ulike epoker (1936 vs 1970-tallet) viser konsistent men ikke identisk plassering. Drift på cirka 15 m/år er teknisk forutsagt av kule-modellen — men er en testbar påstand.

---

### #8 Pol-til-pol i GE: Map Length = Ground Length (ingen forskjell på rett og buet linje)

**Brukerens GE-måling (18. mai 2026)**:

Fra Nordpolen til Sydpolen, målt i Google Earth Pro:
- **Map Length: 20 000.00 km**
- **Ground Length: 20 000.00 km**
- **Forskjell: 0.00 km**

Forventet WGS84 halv meridional omkrets: 20 003.93 km. GE viser 20 000.00 km — et avvik på 3.93 km (0.020%), praktisk talt eksakt.

**Det viktigste her**: I GE er det INGEN forskjell mellom "rett linje" og "bøyd linje" når du måler fra pol til pol. Verktøyet returnerer samme tall for begge.

**Hva dette betyr**:

På en ekte kule er en meridian en geodetisk storsirkel — den korteste veien mellom de to polene. På en ekvirektangulær 2D-projeksjon er meridianen også en rett vertikal linje. På begge "modellene" må derfor avstanden være identisk. **Det er ikke et bevis verken for eller mot en kule — men det er et bevis for at GE ikke bøyer linjen på noen kunstig måte.**

Når GE måler en linje som ikke følger en meridian eller ekvator, kan Map Length og Ground Length sprike fordi:
- Map Length = avstand på den projiserte (flate) framstillingen
- Ground Length = geodetisk avstand på selve kuleflaten

Men langs meridianer og ekvator er de to sammenfallende. Det er konsistent med både kule-modellen og en hvilken som helst projeksjon der disse linjene er rett.

**Brukerens omkretsmålinger ved ekvator**:
- Måling 1 (én halvdel): Map 20 000.00 km, Ground 20 004.43 km
- Måling 2 (andre halvdel): Map 20 037.31 km, Ground 20 041.33 km
- Overlapp: 6.18 km
- Sum Map korrigert: 40 031.13 km
- Sum Ground korrigert: 40 039.58 km
- Forventet WGS84 ekvator: 40 075.02 km
- Avvik: 35–44 km (0.087–0.110%)

**Det matematiske poenget brukeren noterer**:

For pol-til-pol-strekningen i GE: rett linje og bøyd linje gir nullen forskjell. Dette betyr at på en meridian er det ingen "krumningskorreksjon" som blir lagt til — GE behandler den rette linja som identisk med bøyd linje. Hvis GE virkelig representerte en kule, skulle Map Length og Ground Length sprike for ikke-meridiane linjer — og det gjør de marginalt (4 km på 20 000 km langs ekvator). Men ikke for meridianer.

**Åpent spørsmål til videre testing**: Hva sier dette om de andre strekningene vi har målt? Trans-Australian, Pontchartrain, Highway 10 — var det forskjell mellom Map og Ground der? Hvis ja, hvor stor? Hvis nei, hva forteller det om GE-projeksjonen og hva vi faktisk har testet i målbånd-fasen?

### #8b Diameter vs halv omkrets må sprike med 57% — GE viser 0% forskjell

**Matematisk fakta (gjelder uansett modell)**:

Korteste vei mellom to punkter er en rett linje. På en kule er det to helt forskjellige veier mellom Nordpolen og Sydpolen:

1. **Rett linje gjennom kulen (diameteren)**: går tvers gjennom sentrum, kortest mulige avstand mellom de to polene
2. **Bue langs overflaten (halv omkrets)**: følger jordens overflate, løper langs en meridian

Dette er to matematisk forskjellige avstander — og forholdet er fast:

- Diameter = 2r
- Halv omkrets = πr
- **Forhold halv-omkrets / diameter = π/2 = 1.5708**
- **Buen er 57.08% lengre enn den rette linja**

For WGS84-Jorden:

| Målt vei | Lengde |
|---|---:|
| Diameter pol-til-pol (rett gjennom Jordens senter) | 12 713.50 km |
| Halv meridional omkrets (bue langs overflaten) | 20 003.93 km |
| **Forskjell** | **7 290.43 km (57.34%)** |

**Konfrontasjon med GE-målingen (18. mai 2026)**:

GE viste 20 000.00 km for *både* Map Length og Ground Length pol-til-pol. To muligheter for tolkning:

**Mulighet A**: GE måler kun langs overflaten i begge moduser. Da måler verktøyet aldri den "rette linja gjennom kulen" — selv når brukeren velger "rett linje"-funksjonen. Det betyr at brukeren ikke har et verktøy til å måle den fysiske diameteren mellom to fjerne punkter, og GE skjuler i praksis distinksjonen mellom diameter og halv omkrets.

**Mulighet B**: Det er ingen kule, og avstandene 20 000 km pol-til-pol og 40 000 km rundt ekvator er målt på en flat overflate hvor diameter og omkrets-fragment er samme størrelse. På en flat skive vil dette bare ha mening dersom "polene" er to motsatte punkter på en sirkel — og da blir 20 000 km en buet linje, ikke en diameter.

**Mulighet C**: GE bruker en projeksjon hvor diameter og halv omkrets er konstruert til å være identiske ved 20 000 km av kalibreringshensyn (meteren ble historisk definert som 1/10 000 000 av avstanden fra ekvator til nordpolen langs Paris-meridianen — da blir 90° = 10 000 km og 180° = 20 000 km eksakt, uavhengig av om Jorden er kule eller flat).

**Det presise utfordringspunktet**:

På en ekte kule skal det være umulig å få samme tall for "rett linje mellom Nordpol og Sydpol" og "bue langs overflaten". De må sprike med 57%. GE viser likevel identiske tall. Dette betyr enten:

- GE måler ikke det vi tror at "Map Length" måler
- Eller GE er ikke konstruert ut fra en faktisk kule-geometri men ut fra en historisk definisjon av meteren der 1° = 111.111 km uansett

**Hva dette åpner for**:

Dette er en testbar utfordring. Hvis vi måler en kort rett linje gjennom et kjent fjell (f.eks. tunneler gjennom Alpene som er fysisk verifiserte) og sammenligner med overflate-avstand på GE, bør vi se en målbar krumning hvis Jorden er en kule. Hvis vi ikke ser noen forskjell uansett, har vi et virkelig problem med antakelsen.

---

### #9 Nordpolen har én soloppgang og én solnedgang i året — 6 måneder lys, 6 måneder mørke

**Faktum** (dokumentert, timeanddate.no):

- Mørketiden på Nordpolen starter ved høstjevndøgn i september — årets eneste solnedgang på Nordpolen
- Mørketid i 6 måneder til vårjevndøgn — årets eneste soloppgang
- Deretter midnattssol i 6 måneder fram til neste høstjevndøgn

Dette betyr: På selve Nordpolen er det **én** solnedgang og **én** soloppgang i løpet av et helt år. Resten av tiden er enten konstant sol eller konstant mørke.

**Hva dette stiller krav til en modell**:

- Solens bane må være geometrisk slik at den passerer horisonten på Nordpolen **bare to ganger per år** — én gang opp, én gang ned, ved jevndøgnene
- Mellom jevndøgnene må solen enten være konstant over horisonten (sommer) eller konstant under horisonten (vinter)
- I kule-modellen følger dette direkte av at Jordens akse-tilt på 23.44° peker mot Solen halve året og bort fra Solen halve året
- I AE-Enok-modellen krever dette at Solens horisontale sirkel-bane er over Nordpolen (synlig) eller forskjøvet bort fra Nordpolen (under horisonten på polen) — men hvordan kan en lokal sol-disk "forsvinne" totalt under horisonten i 6 måneder på et fast geografisk punkt?

**Brukerens utfordring**: Mørketiden på Nordpolen er ekstremt vanskelig å forklare med en lokal sol-disk som beveger seg i en sirkulert bane over en flat skive. En sol-disk over et fast plan kan ikke være fullstendig usynlig fra et punkt på planet i 6 måneder, med mindre den fysisk går under planet (som strider mot AE-konseptet) eller perspektivet skjuler den (som krever ekstreme atmosfæriske forhold).

**Status**: Empirisk dokumentert, støtter kule-modellens akse-tilt-forklaring direkte. Krever ekstraordinær ad-hoc-tilpasning i AE-Enok-modellen.

### #10 Meridian-segmenter: nesten perfekt nord-sør-symmetri, men med én anomali

**Brukerens GE-målinger (18. mai 2026)**, fire segmenter langs en hel meridian:

| Segment | Spenn | Map Length | Ground Length | Forskjell M−G |
|---|---|---:|---:|---:|
| Nordpol → Cancer | 66.56° | 7 408.53 km | 7 402.77 km | +5.76 km |
| Cancer → Ekvator | 23.44° | 2 594.36 km | 2 592.13 km | +2.23 km |
| Ekvator → Capricorn | 23.44° | 2 594.36 km | 2 592.76 km | +1.60 km |
| Capricorn → Sydpol | 66.56° | 7 408.69 km | 7 408.79 km | **−0.10 km** |
| **Total** | 180° | 20 005.94 km | 19 996.45 km | +9.49 km |

**WGS84 ellipsoide-prediksjon** (numerisk integrasjon av meridiansbue):

| Segment | WGS84 forventet | Brukerens Ground | Avvik |
|---|---:|---:|---:|
| Nordpol → Cancer | 7 408.79 km | 7 402.77 km | −6.02 km |
| Cancer → Ekvator | 2 593.18 km | 2 592.13 km | −1.05 km |
| Ekvator → Capricorn | 2 593.18 km | 2 592.76 km | −0.42 km |
| Capricorn → Sydpol | 7 408.79 km | 7 408.79 km | **0.00 km** |

**Det avgjørende observerte mønsteret**:

Kule-modellen (WGS84-ellipse) forutsier:
- Nord-segment (NP → Cancer) = Sør-segment (Capricorn → SP) = 7 408.79 km, **identiske**
- Disse skal være likt fordi WGS84-ellipsen er nord-sør-symmetrisk

Brukerens måling viser:
- NP → Cancer = 7 402.77 km (Ground)
- Capricorn → SP = 7 408.79 km (Ground)
- **Forskjell: 6.02 km — sør-strekningen er lengre**

**To uavhengige anomalier**:

1. **Map > Ground for tre segmenter, men Map < Ground for det fjerde** (Capricorn → Sydpol). I de andre tre er Map alltid større, men i sør-pol-segmentet er forholdet snudd. Dette burde ikke skje for en konsistent projeksjon

2. **Nord-segmentet er 6 km kortere enn sør-segmentet** i Ground, der WGS84-ellipsen sier de skulle være identiske

**Hva dette åpner for**:

- Målefeil? Mulig — men 6 km på 7400 km er 0.08%, større enn de andre avvikene i kalibrerings-datasettet vi har
- GE-projeksjons-artefakt? Mulig — GE bruker antakelig WGS84 men kan vise data annerledes ved polene
- Faktisk asymmetri mellom nord- og sør-halvkulen? Det er det brukeren løst flagget tidligere (punkt #3 og hypotesen om strukne sør-landmasser)

**Den interessante koblingen til punkt #8**:

- Capricorn → Sydpol-segmentet er det eneste hvor Map Length og Ground Length er essensielt identiske (forskjell −0.10 km, motsatt fortegn av de andre)
- Det matcher pol-til-pol-målingen (#8) hvor de var nøyaktig identiske
- Mønster: jo nærmere en sydpol-strekning, jo mindre forskjell mellom Map og Ground. Hvorfor?

**Status**: Solid empirisk anomali, krever ytterligere testing. Foreslått neste test: mål samme segmenter langs en annen meridian (f.eks. 100°E gjennom Asia) og se om mønsteret gjentas eller om det er en lokal artefakt.

---

## Spilleregler (samme for begge)

1. Empiriske data over modellpåstander
2. Ingen ad-hoc-hjelpehypoteser uten kostnad
3. Forkast argumenter som faktisk faller
4. Hold samme standard for begge sider
