# Sjokart-grid og hoydeoverganger

Status: plan og malearbeid. Ingen app-kode, kartflate, anker, GE-grid, aeProject, transform, skala, rotasjon eller tile-posisjon skal endres i dette steget.

## Mal

Lage et eget firkantet/kvadratisk arbeidsgrid som stemmer med skalaen og rutenettet som allerede finnes i Kartverkets sjokart-raster.

Gridet skal ikke baseres pa dagens GE-grid, og det skal ikke erstatte eller endre GE-gridet. GE-gridet forblir referanse for nord, lengdegrader og Instrumentet.

## Fasiter

1. Kartverkets sjokart-raster er fasit for synlig kart-rutenett.
2. Vart eksisterende `Geografisk grid` er kun midlertidig arbeidsreferanse.
3. Hoydene der sjokartmotoren bytter fra ett kart-/detaljniva til et annet skal registreres for samme omrade.
4. Kartblad-inndelingen skal bygges fra et basisblad pa 6400 x 4800 m.

## Kartblad-grid som skal brukes

Jone har fastlagt folgende kartblad-inndeling som arbeidsfasit for vart firkant-/kartbladnett:

| Niva | Bredde | Hoyde | Kommentar |
| --- | ---: | ---: | --- |
| Basisblad | 6400 m | 4800 m | Ett nedlastet kartblad |
| 1/4-blad | 3200 m | 2400 m | Basisblad delt i fire like deler |

Delingen skjer ved a halvere kartbladet i begge retninger. Samme prinsipp kan repeteres nedover:

| Underinndeling | Bredde | Hoyde |
| --- | ---: | ---: |
| 1/16-blad | 1600 m | 1200 m |
| 1/64-blad | 800 m | 600 m |
| 1/256-blad | 400 m | 300 m |
| 1/1024-blad | 200 m | 150 m |
| 1/4096-blad | 100 m | 75 m |

Dette er gridet vi skal dele vare egne kartflater inn etter. Sjokart og landkart skal kontrolleres mot samme kartbladlogikk der kilden bruker tilsvarende kartblad.

Merk: dette er ikke GE-grid. GE-grid forblir separat referanse for nord/lengdegrad i Instrumentet.

## Kontroll mot Instrumentets na lastede kartbiter

Status 2026-06-05: Instrumentet laster Kartverkets `sjokartraster` som WMTS/web-tiles:

`https://cache.kartverket.no/v1/wmts/1.0.0/sjokartraster/default/webmercator/{z}/{y}/{x}.png`

Dette er leveranse-/tile-gridet til webtjenesten. Det er ikke det samme som Kartverkets kartblad-grid pa 6400 x 4800 m.

Observert i Instrumentet ved startvisning:

| Pane | Kilde | WMTS z | Antall DOM-tiles | Pixel-pane |
| --- | --- | ---: | ---: | --- |
| Overview | sjokartraster | z4 | 224 | 4096 x 3584 px |
| Detail | sjokartraster | z7 | 1462 | 8704 x 11008 px |

Estimert bakkestorrelse per WMTS tile ved Selsøya-breddegrad lat 66.5506:

| WMTS z | Ca. lokal tile-bredde |
| ---: | ---: |
| z7 | 124589 m |
| z8 | 62295 m |
| z9 | 31147 m |
| z10 | 15574 m |
| z11 | 7787 m |
| z12 | 3893 m |
| z13 | 1947 m |
| z14 | 973 m |
| z15 | 487 m |
| z16 | 243 m |
| z17 | 122 m |
| z18 | 61 m |

Konklusjon: Instrumentets WMTS-tiles er 256 x 256 leveransebiter og matcher ikke kartbladfasiten 6400 x 4800 m. Derfor skal nytt kartblad-grid ikke avledes fra WMTS tile-grensene. Det ma bygges som eget grid fra 6400 x 4800 m-kartbladlogikken og deretter kontrolleres visuelt mot sjokart-rasteret.

Praktisk test 2026-06-05: et forste visuelt `World chart square grid` er lagt over clean-pixelflaten. Dette gridet er forelopig ikke kartbladfasiten, men et kontrollnett som folger Instrumentets faktiske kartbit-rytme:

- hovedrute: 256 x 256 px i clean-pixelflaten
- underdeling: 64 x 64 px
- styres av Norgeskart-panelets `World chart square grid`-bryter
- ligger som visuelt overlay pa pixelflaten
- flytter ikke kart, anker, GE-grid, aeProject, transform, skala, rotasjon eller tile-posisjon

Formalet er a se og male om dette firkantnettet stemmer med kartbitene Instrumentet faktisk viser i dag. Senere kan kartbladfasiten 6400 x 4800 m legges inn som neste gridlogikk dersom denne kontrollen viser riktig retning.

## Males for kode

For hvert valgt testomrade skal vi registrere:

- omrade/navn
- kamerahoyde der kartet bytter detaljniva
- aktiv kilde/layer hvis synlig i status
- synlig sjokart-rutenett: stor rute, mindre ruter, eventuell minutt-/sekundmerking
- skjermbilde eller crop som viser rutenettet
- om gridet er tydelig nok til a male offset og spacing

## Offisielt grunnlag: nautisk gradnett

Kartverket oppgir at norske sjokart er laget i WGS84 gradnett, og at presentasjonen folger IHO S-4. For praktisk sjokartmaling er 1 minutt breddegrad lik 1 nautisk mil.

Arbeidskonstanter:

- 1 nautisk mil = 1852 m
- 1' breddegrad = 1852 m
- 0.5' breddegrad = 926 m
- 0.1' breddegrad = 185.2 m
- 0.01' breddegrad = 18.52 m

Ved 1:5000 gir dette pa originalkart:

| Gradnett-intervall | Terrengavstand | Kartavstand ved 1:5000 |
| --- | ---: | ---: |
| 5' | 9260 m | 1852.0 mm |
| 2' | 3704 m | 740.8 mm |
| 1' | 1852 m | 370.4 mm |
| 0.5' | 926 m | 185.2 mm |
| 0.2' | 370.4 m | 74.08 mm |
| 0.1' | 185.2 m | 37.04 mm |
| 0.05' | 92.6 m | 18.52 mm |
| 0.01' | 18.52 m | 3.704 mm |

Forelopig tolkning for 1:5000: den storste praktiske gridruten pa selve kartbladet vil sannsynligvis ligge rundt 0.5' (185.2 mm) dersom IHO-avstandskravet for meridianer/paralleller brukes direkte. Mindre underinndelinger kan ligge pa 0.1', 0.05' eller 0.01' avhengig av kartets graduering.

Dette ma bekreftes mot faktisk Kartverket-havnekart/spesialutsnitt for det aktuelle omradet for verdiene brukes som fasit i motoren.

## Kartverket-kontroll: Norgeskart/Se eiendom

Kartverkets egen Norgeskart-visning skal brukes som kontrollflate for skala og avstand, ikke skjermkopi fra vart Instrument.

Forste kontrollpunkt:

- Omrade: Selsøya / Selsøygarden
- Koordinat brukt i Norgeskart: lat 66.5506, lon 12.8472
- Norgeskart konverterte til EUREF89 UTM-33 i URL
- Observert malestokk i Norgeskart: 1 : 1 177
- Observert skalalinje: 50 m
- `Tegne og male`-panelet viser maleenheter: Meter [m] og Nautisk mil [NM]

Andre kontrollpunkt:

- Samme omrade i Norgeskart
- Valgt malestokk direkte fra Kartverkets malestokkvelger: 1 : 5 000
- Observert skalalinje: 200 m
- Konsekvens ved 1 : 5 000:
  - 1 mm pa kartet = 5 m i terrenget
  - 0.1 mm pa kartet = 0.5 m i terrenget
  - 200 m i terrenget = 40 mm pa kartet

Dette gir praktisk toleransegrunnlag: dersom kartet skal plassere/male pa halvmeteren ved 1 : 5 000, tilsvarer det 0.1 mm pa original kartflate.

Bruk: Norgeskart/Se eiendom brukes til a bekrefte faktiske avstander og malestokk. Sjokart-rasteret brukes etterpa for a bekrefte at synlig grid ligger pa samme fasit. Vi skal ikke kopiere en mulig feil i vart eget rasterbilde uten denne kontrollen.

## Forste testomrader

- Norge: Selsøygarden / polarsirkelen
- Norge: Kveitanosen
- Norge: Arctic Circle Center
- Island: Grimsey
- Overgang Norge-Island der sjokartene matcher
- Sverige/Danmark-omrade kun som senere kontroll

## Akseptkriterier for nytt grid

Forste implementering kan starte bare nar vi har:

1. Minst ett rent rasterutsnitt der sjokart-rutenettet kan males uten gjetting.
2. Bekreftet stor-rute-spacing i kartets egen skala.
3. Bekreftet offset mot et kjent ankeromrade.
4. Liste over hoydeoverganger der kartet skifter detaljniva.
5. Beslutning om hvilke gridnivaer som skal vises ved hvilke hoyder.

## Laste- og LOD-regel

Det nye gridet skal folge samme hovedregel som kartmotoren:

- grove gridnivaer vises hoyt oppe
- finere gridnivaer lastes/vises bare nar kameraet er lavt nok
- synsfeltet prioriteres forst
- ingen gridlinjer skal flytte kart, anker eller transform

## Stoppregel

Hvis gridet ikke kan matches mot sjokart-rasteret uten a flytte, strekke eller rotere kartflaten, stopper vi. Da er feilen i gridforslaget, ikke i kartflaten.

## Maling 2026-06-05: forste hoydeoverganger

Dette er bare observasjon fra eksisterende UI. Ingen kode eller kartflate ble endret.

| Omrade/visning | Hoyde | Sjokart-niva | Kommentar |
| --- | ---: | --- | --- |
| Norge/Sjokart hovedlag | H 4,000 km | z7 | Grov oversikt, 1462 tiles |
| Norge/Sjokart hovedlag | H 587 km | z9 | Forste tydelige innzoomede sjokartniva i denne testen |
| Norge/Sjokart hovedlag | H 264 km | z10 | Videre detaljering |
| Norge/Sjokart hovedlag | H 119 km | z11 | Videre detaljering |
| Norge/Sjokart hovedlag | H 53,291 m | z13 | Hopp fra z11 til z13 observert |
| Norge/Sjokart hovedlag | H 23,953 m | z14 | Videre detaljering |
| Norge/Sjokart hovedlag | H 10,766 m | z15 | Videre detaljering |
| Norge/Sjokart hovedlag | H 4,839 m | z16 | Videre detaljering |
| Sammensatt nordisk flate | H 7,000 m | z15 | Startpunkt fra `Set assembled 7 km` |
| Sammensatt nordisk flate | H 4,884 m | z16 | Overgang fra z15 til z16 |
| Sammensatt nordisk flate | H 3,408 m | z17 | Overgang fra z16 til z17 |
| Sammensatt nordisk flate | H 2,378 m | z17 | Fortsatt z17 |
| Sammensatt nordisk flate | H 1,659 m | z18 | Overgang fra z17 til z18 |
| Sammensatt nordisk flate | H 1,158 m | z18 | Fortsatt z18 |

Forelopig tolkning: i denne visningen ligger z17 -> z18-overgangen mellom H 2,378 m og H 1,659 m. Dette ma males mer presist senere med mindre zoomsteg.

Viktig observasjon: pa z18 ved H 1,158 m viste status 896 feilede tiles og gratt/fallback-preget bilde. Dette nivaet skal ikke brukes som rutenett-fasit for spacing for vi har en komplett eller tydelig sjokartflate.

## Maling 2026-06-05: rastergrid-status

Et crop av Kartverkets sjokart-raster viser at sjokartets eget rutenett er synlig i bildegrunnlaget. Utsnittet er forelopig ikke rent nok til a lase spacing automatisk, fordi tekst, dybdetall, kystlinje og markeringer forstyrrer linjefinningen.

Neste malebilde bor tas i apent hav med:

- GE-grid av i visningen
- vart `Geografisk grid` av i visningen
- kontrollpunkter/markorer av hvis de dekker linjene
- sjokart-rasterets egne grid-labels eller minst to nabostreker synlige
- minst ett crop der stor-ruten kan males manuelt i pixelavstand

Forelopige bildebevis:

- `work/raster-grid-crop.png`
- `work/raster-grid-crop-enhanced.png`

Disse viser sjokartets trykte rutenettlinjer tydelig nok til a bekrefte at gridet finnes i rasteret, men ikke tydelig nok til a lase offisiell spacing alene. Neste crop ma inkludere kartets egne grad-/minuttmarkeringer langs gridet.

## Maling 2026-06-05: polarsirkelankre for felles kartflate

Jone presiserte at alle kartene ma henge sammen. Grimsey skal derfor ikke justeres separat hvis avviket henger sammen med avvik pa Norge-polarsirkelen.

Eksisterende kontrolldata i motoren:

| Punkt | GE/fasit | Kartpunkt i motor | Omtrentlig differanse |
| --- | --- | --- | ---: |
| Selsøygarden | 66.550003, 12.848411 | 66.5506, 12.8472 | ca. 85 m |
| Kveitanosen | 66.550000, 12.638303 | 66.5500, 12.6384 | ca. 4 m |
| Arctic Circle Center | 66.550008, 15.327011 | 66.5500, 15.3266 | ca. 18 m |
| Grimsey kontrollpunkt mot 66.5500-linje | 66.550000, -18.011092 | 66.545525, -18.011092 | ca. 498 m sør |

Instrumentobservasjon ved Grimsey:

- `Gå til Gråmsey` ga forst z8 ved H 1,113 km.
- Ved innzooming ble z16 observert ved H 7,218 m.
- Status: `Anchor lock: Grimsey, Iceland (66.545525, -18.011092)`.
- Status ved z16 viste fortsatt fallback/gratt bilde, sa punktet skal ikke lases visuelt pa dette nivaet enna.

Konklusjon: for vi laser globalt grid eller sammensatt kartflate ma vi ha hoyopplosning pa alle polarsirkelpunktene og male samme avvikssystem. Grimsey alene skal ikke flyttes.
## Kartblad Maalband V1

Beslutning fra Jone:

- Kartblad-malet brukes som forelopig maalband for hele verdenskartet.
- Startfasit er Norge/Kartverket, fordi vi har offisiell dokumentasjon og kjent hoy noyaktighet.
- GE grid (lat/long + 5 deg fine) er ikke dette laget og skal ikke roeres.
- Kart, ankerpunkter, skala, rotasjon og transform skal ikke flyttes av dette laget.

Offisiell kartblad-struktur som legges inn som kontrollnett:

- Hovedblad: 6400 m ost-vest x 4800 m sor-nord.
- 1:5000-blad: 3200 m x 2400 m.
- Ett hovedblad deles i fire 1:5000-blad (2 x 2).
- Eventuell finere 1600 m x 1200 m deling er en senere intern underdeling, ikke forste fasit.

Implementasjon i lab:

- `Pixelflate tile grid` viser intern 256 px tile/pixelflate-referanse.
- `Kartblad maalband 6400 x 4800 m` viser meterbasert kontrollnett.
- 3200 x 2400 m underdeling vises forst ved hoyere zoom.
- Rutenettet ligger som visuelt overlay paa clean pixelflate og bruker samme pane-transform som kartet.
- Dette er et kontrollnett for maaling og sammenligning, ikke en reprojeksjon av kartet.
