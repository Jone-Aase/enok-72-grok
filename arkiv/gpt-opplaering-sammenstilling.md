# GPT full opplæring — Enok 72 Truth Instrument

Denne sammenstillingen bygger på gjennomgang av hovedhåndboken, dokumentmappen, masterdokumenter, rapporter, teaminstrukser, skipslogger/bevisarkiv, PDF-rapporter, app-kode og JSON-data i workspace. Den beskriver ikke en ferdig bevist konklusjon, men prosjektets nåværende struktur, premisser, empiriske funn og åpne problemer slik de ligger i v16.30.

## 1. Prosjektets grunnstruktur

Enok 72 Truth Instrument er et visuelt og analytisk instrument for å teste solens årlige løp, portsystemet i Enok 72, Ark T-kalenderen og empiriske observasjoner mot hverandre. Hovedkilden for agentarbeid er `simulator-master-referanse.md`. Kjerneverdiene i v16.30 er faste: `R_EQUATOR_KM = 10001,47`, `R_OUTER_KM = 31420,55`, `SCALE = 1/1000`, og full ytre omkrets er satt til `197421,10 km`. Instrumentet bruker en azimuthal equidistant-lignende flat modell med Nordpolen i sentrum, men v16 flytter modellen fra tidligere enkel radiusformel til buestreng-uretting: `latToR(lat) = R_OUTER * (90 - lat) / 180`. Det betyr at 90°N er sentrum, ekvator flyttes til halv ytre radius, og -90°S ligger på ytre ring.

Mestermalen er 23,7° for vendekretsen, ikke 23,5° eller moderne 23,4367°. Denne verdien er forankret i Ark T H212 og brukes i koden som `PORT_LAT_MAX = 23.7`. Hierarkiet er eksplisitt: Ark T er lavere enn Enoks bok 72, og begge er lavere enn Jone-Aase ved tolkningskonflikt. Det betyr at instrumentet ikke bare er en teknisk Three.js-modell; det er en arbeidsmodell hvor tekst, kalender, regneark og brukerens beslutninger styrer implementeringen.

## 2. Rutenett-feilen som fundament

Det fundamentale premisset er dokumentert i `rutenett-feilen-dokumentert.md` og videreført i `sol-zenith-og-porter-fundamenter.md`. Prosjektets påstand er at moderne bredde- og lengdegradssystem blir behandlet som fysisk fasit, men egentlig er en kalibrert konvensjon. Feilen oppstår fordi rutenettet antas å være stabilt rundt ekvator mens solen i fysisk observasjon vandrer mellom to vendepunkter: Krepsens vendekrets og Steinbukkens vendekrets. Ekvator blir derfor ikke selve solens primære akse, men midtlinjen mellom to zenitgrenser.

Sextant- og solhøydebasert breddegrad avhenger av deklinasjonstabeller. Hvis tabellene forutsetter et bestemt geometrisk system, blir resultatet internt konsistent, men ikke nødvendigvis uavhengig fysisk bevis. Derfor sier prosjektet at lat/lon skal brukes som markører for plotting, ikke som endelig sannhetsverdi. Dette er også grunnen til at dokumentene skiller mellom modellspesifikke læreboktall og direkte observasjoner. Enok-sporet skal ikke bruke sfærisk trigonometri som premiss; sfærisk modell kan brukes som sammenligning og kontroll, men ikke som grunnlag for å definere hva Enok-modellen må være.

Rutenett-feilen knyttes til solens zenitbevegelse. På vendekretsene står solen 90° rett opp bare én gang per år. Mellom vendekretsene skjer zenit to ganger per år. Utenfor vendekretsene skjer zenit aldri. Dette gir en fysisk testbar struktur som prosjektet bruker: Aswan/Syene for nordlig vendepunkt, Antofagasta/Capricorn for sørlig vendepunkt, ekvatorpunkter som Catequilla og Pontianak for midtlinjen, og polarsirkelpunkter for ekstrem dag/natt.

## 3. De fire ekstrarundene

Et hovedfunn i v16.30 er at året ikke bare er 364 kalenderdager, men 364 kalenderdager pluss 4 ekstrarunder, altså 368 reelle solrunder. Dette er forankret i Enok 75:1-2 og 82:4-6, og koblet til Enok 72:13, 72:19, 72:25 og 72:31. Ekstrarundene ligger i port 1, 3, 4 og 6, altså ved solverv og jevndøgn.

De fire dagene er: dag 91 i port 6 ved +23,7° og sommersolverv; dag 182 i port 4 ved 0° og jevndøgnsovergang; dag 273 i port 1 ved -23,7° og vintersolverv; dag 364 i port 3 ved 0° og årsslutt/jevndøgn. I `index.html` ligger dette i Evidence Archive kategori 5 med tabell over dag, port, bredde, hendelse, Enok-vers og Ark T-rad. I `sol-bane-arkT.json` er disse markert som `isVendepunkt: true` med `bane: null`.

Den viktige tekniske tolkningen er at solen ikke forsvinner i en vegg. Den tar en ekstra runde i samme bane: `sunLat` holdes på samme nivå, mens `sunLonAngle` fortsetter. Portskiftet skjer ved nord-passering, i tråd med Enok 72:5 om at solen vender gjennom nord for å nå øst. Denne regelen korrigerer v16.29, hvor wall-logikk kunne gjøre solen usynlig.

## 4. v16.30 kode-tilstand

Kodegjennomgangen viser at `app.js` har 3016 linjer og `index.html` har 1432 linjer. Hovedkonstanter ligger øverst i `app.js`: `R_EQUATOR_KM = 10001.47`, `R_OUTER_KM = 31420.55`, og `SCALE = 1/1000`. `latToR()` bruker buestreng-uretting. `aeProject()` bruker lon-konvensjonen hvor 0° peker mot scene -Z og positiv lengde går med klokken ovenfra.

Portsystemet bygges visuelt med 12 portsegmenter, portvegger og porter på aksene 60° og 300°. Ark T-data lastes fra `sol-bane-arkT.json`, som har 364 dager, østakse 60°, vestakse 300° og `wall_info` med radpar. `sunLatForDay()` bruker tabellen når den er lastet, og faller ellers tilbake til sinusformel. `dagNattForDay()` returnerer Enok-deler i segmenter, med port 6 og port 1 som sammenhengende 61-dagers vendepunktsegmenter.

Den mest kritiske kodelinjen er i `updateSun()`: `sunMesh.visible = true`. Søk i kode viste ingen aktiv `sunMesh.visible = false`. Kommentarene sier eksplisitt: v16.30, solen lyser alltid; wall-invisibility er fjernet; `isSunInsideWall()` og `computeWallRadii()` er beholdt som dødkode/fremtidig struktur. På ekstrarundedagene lyser solbanen sterkere i hvit-gull som visuell markør.

JSON-strukturen bekrefter datalaget: `calendar.json` har 364 kalenderdager for 5676 AM fra 2026-03-21 til 2027-03-19; `sol-bane-arkT.json` har de 364 solbanedagene og vendepunktene; `enok-himmel-vers.json` inneholder Enok 72-82; `enok72-vers.json` inneholder Enok 72:1-37; `timeline.json` bygger AM-broen med 5700-årsmodell, 5676 AM som nåtid og 10 uker.

## 5. Empiriske funn

De empiriske funnene er blandet, og prosjektet behandler dem ikke som ensidig støtte for én modell. Polarsirkelen er det sterkeste Enok-treffet: Fort Yukon, Bodø og Grímsey har 24 timers sol ved sommersolverv, som matcher Enok 18/0. Dette er dokumentert i `sol-tider-fire-kritiske-punkter.md` og midnattssol-materialet. Sørlige polarsirkel ved nordlig sommersolverv gir motsatt null sol, som passer speilbildet.

Krepsens vendekrets er derimot et alvorlig avvik. Aswan 21. juni 2026 viser daglengde 13:40:06, mens Enok 9/9 tilsier 12 timer. Avviket er +1:40:06. Den interne flate AE-beregningen for Enoks posisjon gir også 8,51/9,49 ved Krepsen der teksten sier 9/9. Dette er ikke løst, og dokumentene markerer det som en hovedgåte.

Cancer-testen med 19 punkter er direkte ugunstig for AE-Enok som avstandsskala: WGS84/kule avviker -0,60 %, mens AE-Enok avviker -21,35 %. Cancer alene støtter derfor kulemodellen. Ekvatorrapporten er mer nøytral: 13 punkter nær ekvator kan ikke skille kule fra AE, fordi avstandene der ligger for nær hverandre og fordi markørenes historiske/usikre plassering gir målegrense.

Skipsloggene gir et annet mønster. CLIWOC-materialet med 249649 observasjoner bekrefter 15° per time med statistisk nær null snittavvik. Cook/K1-observasjonen i 1774 viser 17:05:14 mot forventet 17:05:12 ved oppgitt lengdegrad. Dette støtter at lengdegradssystemet som tidsdifferanse er ekstremt stabilt. Samtidig sier prosjektet at dette ikke alene kan avsløre om kontinenter er forskjøvet i havområdene, fordi sjøobservasjon og moderne kart kan være selvkonsistente.

Det sterkeste negative funnet mot AE i sør er Cook RESOLUTION-testen ved 53°S. På WGS84 gir ruten ca. 7805 km på 34 dager, omtrent 5,17 knop, realistisk for seilskip. På AE-skala blir samme rute ca. 30092 km og krever 19,91 knop, fysisk umulig for Cook-periodens seilskip. Dette regnes i prosjektet som et reelt motbevis mot AE-skala i sør slik den da er brukt.

Punta Arenas-rapporten viser en annen type stabilitet: HMS Challenger målte Sandy Point i 1876 til 53° 9' 30" S, 70° 53' 30" W, som ligger under ca. 1,5 km fra moderne GPS for samme havneområde. Dette støtter at historisk navigasjon etter 1850 kan gi sterke kontrollpunkter for land/havn. Pontianak-Antofagasta-aksen er også viktig: lengdeforskjellen er 179,720586°, bare 0,279414° fra 180°, og fungerer som en låst geometriakse i hypotesearbeidet.

## 6. Aktiv hypotese om kontinentforskyvning

Den aktive hypotesen er brukerens setning: «Jeg tror at lengdegradene er rett men kontinentene er forskjøvet, i havområdene.» Dette er ikke det samme som å si at lengdegradssystemet er feil. Tvert imot tar hypotesen 15°/time på alvor. Problemet flyttes til kartleggingen av kontinenter relativt til havrommene. Hvis havområdene er stedet der forskyvningen skjer, vil landbaserte observatorier og havneankomster kunne se konsistente ut, mens transoseaniske sammenhenger kan skjule avvik.

Derfor sier prosjektet at solar noon-tabeller ikke er tilstrekkelige. De er beregnede tabeller med lengdegrad som inndata. Direkte observasjoner trengs: CLIWOC mot havneankomst, gamle observatorier med GMT og lokal meridian, gnomon+kronometer, og triangulering mellom kontinenter. Afrika-testen er spesielt relevant fordi Afrika berører ekvator, Cancer og Capricorn, og kan brukes som kontinental kontroll uten å forutsette kosmologi.

## 7. Fire åpne gåter

Første åpne gåte er port-paradokset. Solfotpunktets bevegelse mellom +23,7° og -23,7° er kontinuerlig, omtrent 0,2604° per dag, men Enok beskriver fysiske porter. Mulige løsninger er at portene er soner, skyveporter, diskrete vendepunkter eller ulike lag av beskrivelse. Dette er ikke avgjort.

Andre gåte er Krepsen-avviket: Enok 9/9 ved Krepsens vendekrets mot Aswan 13:40 og intern AE 8,51/9,49. Dette er den tydeligste interne spenningen mellom tekst, observasjon og modell.

Tredje gåte er systematisk ca. 3-minutters restavvik i solar-noon-kontroller på fem steder. Aswan, Antofagasta, Quito, Fort Yukon og Bodø ligger alle rundt +3:13 til +3:38. Mulige forklaringer er EOT-presisjon, refraksjon, tabellkonvensjon eller reell systematisk modellfeil. Status er åpent.

Fjerde gåte er kontinentforskyvnings-hypotesen. Den er aktiv og testbar, men ikke bevist. Den krever historiske og moderne data som kan skille mellom korrekt tid/lengdegrad og mulig forskyvning av kontinentenes plassering over hav.

## 8. Teamet på 9 AI-medlemmer

Teamstrukturen er eksplisitt. Medlemmene er: Grok som bredt-søkende agent med 12 subagenter; ChatGPT som kvalitetskontroll; Mistral som europeisk/historisk arkivagent, særlig fransk, portugisisk og spansk materiale; Copilot som britisk-akademisk agent med Royal Society, India, Australia og Karibia; Justdone som smal verifiseringsagent etter tidligere feilrate; Gemini som gamle bøker/Scholar-agent; Google AI som kart/GIS/Google Earth-agent for Sahara, Outback, Amazon og geografiske målinger; Perplexity som datasamler og koordinator; og Jone-Aase som prosjektleder, beslutningstaker og Google Earth-plotter.

Arbeidsreglene er strenge: norsk i kommunikasjon, ingen emojis, ingen hallusinerte URL-er, presis sirkelklassifisering, og skille mellom funn, hypoteser og åpne problemer. Teamets formål er ikke å produsere enighet, men å kryssjekke markører, koordinater, historiske kilder, skipslogger, solobservasjoner og modellkonsekvenser.

## 9. Samlet forståelse

Prosjektets kjerne er ikke bare «flat jord» mot «kule». Den faktiske arbeidsstrukturen er en konfliktanalyse mellom teksttro Enok 72, Ark T, Jone-Aases aktive hypoteser, moderne rutenett, historiske navigasjonsdata og direkte solobservasjoner. Noen funn støtter Enok sterkt, særlig polarsirkelen og de tekstlige fire ekstrarundene. Noen funn støtter kule eller motbeviser nåværende AE-skala, særlig Cancer-avstandstesten og Cook ved 53°S. Noen funn viser stabilitet i moderne lengdegrad, særlig CLIWOC og Challenger/Punta Arenas. Den åpne retningen er derfor ikke å ignorere motfunnene, men å bruke dem til å avgrense hva som faktisk kan være feil: selve rutenettet, kontinentenes plassering, havområdenes kartlegging, eller tolkningen av Enoks porter.

v16.30 er derfor en korrigert instrumenttilstand: solen lyser alltid, fire ekstrarunder er implementert, Ark T V6 styrer solbaner, og bevisarkivet inneholder både støttende og problematiske resultater. Den neste reelle forskningsoppgaven er å teste kontinentforskyvnings-hypotesen med data som ikke bare gjentar samme kartmodell.
