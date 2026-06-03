# Plan: motor-arkitektur v1

Status: planforslag. Markdown bare. Ingen kode. Ikke implementert.

Base: codex/v7-next-dev-source @ dc95a08.
Branch: claude/v7-engine-arkitektur-plan.

## Hva vi bygger

En kart- og visualiseringsmotor som håndterer mange kartlag bedre enn Google Earth, og som har alle dører åpne for videre utvikling. Motoren skal være målbar: kartflaten er sann, areal og avstander forfalskes ikke av rendering eller projeksjon. Visuell stemning og effekter ligger som lag oppå, ikke i kartflaten.

## Ufravikelig regel

Kartflaten er sann. Motoren viser den, projiserer ikke om.

Ingen prosess, ingen shader, ingen kamera, ingen post-effekt og ingen kart-bibliotek skal røre:

- anker
- aeProject
- transform
- skala
- rotasjon
- tile-posisjon
- GE-grid
- solsirklene
- kartflatens proporsjoner

Alle visuelle effekter må kunne slås av i Måle-modus, og resultatet i Måle-modus må være pikselidentisk med dagens kartflate.

## To moduser

### Måle-modus

Ren kartflate. Skarpe tiles. Ingen lys, ingen vann, ingen atmosfære, ingen tone-mapping. Brukes til faktisk måling, sammenligning og verifikasjon. Standardmodus ved oppstart.

### Visuell modus

Naturtro presentasjon. Hav, lys, atmosfære, dybde, skygger og kamera kan brukes. Skal aldri overskrive kartflaten — bare legges som lag rundt den. Visuell modus er for kommunikasjon og estetikk, ikke for måling.

Toggle mellom modusene må være tilgjengelig i UI, og må ikke endre ankerpunkter eller transform.

## Tre-lags arkitektur

Motoren deles i tre uavhengige lag som kommuniserer via tydelige grensesnitt. Hvert lag kan skiftes ut uten å rive ned de to andre.

### Lag 1: Kartmotor (sannhetslaget)

Ansvar:
- Definere kartflaten som et matematisk objekt med faste ankerpunkter.
- Plassere tiles ut fra anker, ikke ut fra kart-bibliotekets projeksjonsregler.
- Holde aeProject, GE-grid og solsirklene som rene matematiske overlegg.
- Eksponere kartflatens geometri (posisjon, rotasjon, skala) som leselige verdier til de andre lagene.

Dette laget er allerede etablert i app.js. Det videreutvikles forsiktig. Ingen omskrivinger uten godkjenning.

### Lag 2: Tile- og lag-system (data-laget)

Ansvar:
- Laste tiles fra mange kilder parallelt.
- Cache med levetid og prioritet, persistent over sider.
- Prefetch av tiles utenfor synlig område for jevn pan og zoom.
- LOD: bestemme hvilket detaljnivå som er riktig for nåværende zoom, uten å forfalske geometri.
- Backoff og retry per kilde (Lag 1 i tile-pipelinen er allerede implementert).
- Retire-then-append for jevn zoom-overgang uten tomme felt (Lag 3 i tile-pipelinen er allerede implementert).
- Vilkårlig mange uavhengige kart-lag: sjøkart, topografi, ortofoto, historiske kart, vektor, måleoverlegg, sol-baner, anker.
- Lag-system må tåle å skru på og av enkeltlag uten å bygge resten på nytt.

Referanse-implementasjoner vi henter inspirasjon fra:

- CesiumJS tile-pipeline: prioritert kø, screen-space error, request scheduler, replacement queue.
- Leaflet sin enkle layer-modell: layers er objekter med add/remove, ikke tett bundet til render.
- deck.gl layer-arkitektur: deklarativ layer-spesifikasjon, props styrer rendering, ikke imperativ DOM.
- OpenLayers source/layer-skille: kilde og visning er adskilt, samme kilde kan vises i flere lag.

Vi kopierer ideer, ikke kode. Vi velger det som passer Lag 1 sin sannhet, og avviser alt som forutsetter automatisk reprojeksjon.

### Lag 3: Visuell motor (presentasjonslaget)

Ansvar:
- GPU-akselerert rendering av kartflaten som tekstur på et flat objekt.
- Lys (sol-posisjon koblet til Lag 1 sine solsirkler — visuelt, ikke geometrisk).
- Vann: refleksjon, bølger, dybde — kun rundt og under kartflaten, ikke i den.
- Atmosfære: luft-perspektiv, lett tåke i avstand.
- Skygger fra kartobjekter og terreng-overlegg.
- Kamera: fri navigering, snap-tilbake til Måle-modus-kamera ved toggle.
- Materialer: tekstur-filtrering, mipmap-kontroll, anisotrop filtrering for skarp kartflate på skrå vinkler.
- Post-processing: tone-mapping, ambient occlusion, vignett. Alt skal kunne slås av.

Referanse-implementasjoner vi henter inspirasjon fra:

- Three.js scene-graph og material-system: stabil, dokumentert, stort økosystem.
- Babylon.js: PBR-materialer, post-processing-pipeline, godt vann-system out of the box.
- WebGPU (når moden): bedre ytelse, bedre kontroll, modne wrappers via Three.js og Babylon.
- Unreal-style render-graph (for senere): hvis vi vokser ut av WebGL/WebGPU.

Førstevalg for prototype: Three.js. Grunn: størst økosystem, lavest terskel for å hente kart som tekstur, og enklest å skru av effekter til pikselidentisk Måle-modus.

## Grensesnitt mellom lagene

Lag 1 → Lag 2: Lag 1 eksponerer en oppdaterings-event når kartet pannes eller zoomes. Lag 2 lytter, beregner hvilke tiles som trengs, og laster dem.

Lag 2 → Lag 3: Lag 2 leverer ferdige tile-DOM-elementer eller canvas-tekstur til Lag 3. I Måle-modus brukes DOM direkte (dagens løsning). I Visuell modus snappes DOM/canvas til en GPU-tekstur som mappes på flat-objekt i scenen.

Lag 3 → Lag 1: Lag 3 røres aldri Lag 1. Aldri.

Toggle Måle-modus / Visuell modus styres i UI og forteller Lag 3 om det skal rendere noe i det hele tatt. I Måle-modus er Lag 3 stille og DOM-tiles vises direkte (som i dag).

## Hva som er på plass i dag

- Lag 1 kartmotor: ankersystem, aeProject, transform, tile-posisjon — i app.js. Stabil.
- Lag 2 tile-system: Kartverket og LMI som kilder, per-kilde backoff (Lag 1 tile-loading), retire-then-append (Lag 3 tile-loading), opacity-stack løst, tone-kalibrering og layer-diagnostikk i UI. Stabil.
- Lag 3 visuell motor: finnes ikke ennå.

## Hva vi bygger neste

Steg 1: Toggle i UI — Måle-modus (default) og Visuell modus. I første versjon endrer toggle bare en variabel og logger. Ingen visuell effekt ennå. Verifiserer at vi har et rammeverk uten å risikere kartflaten.

Steg 2: Tomt Three.js-canvas plassert i samme container som dagens kart, full-screen, transparent, pointer-events off. I Måle-modus er canvas tomt eller skjult. I Visuell modus tegnes en testfigur (f.eks. en grå sirkel) for å bekrefte at canvas funker uten å gå i veien for DOM-tiles.

Steg 3: Snapshot-mekanisme. I Visuell modus tar Lag 3 et bilde av nåværende DOM-kart-flate som tekstur og legger den på et flat-objekt i scenen. Måle-modus viser fortsatt DOM. Toggle bytter mellom de to. Resultatet i Måle-modus skal være pikselidentisk med dagens.

Steg 4: Første visuelle effekt — havflate som flat-plan rundt og under kartflaten, med enkel blå farge. Ingen bølger ennå. Skal kunne slås av i Måle-modus uten spor.

Steg 5: Lys og skygge. Sol-posisjon kobles til Lag 1 sine solsirkler — kun visuelt, koordinater leses, ikke skrives.

Hvert steg er sin egen branch, med markdown-plan først, godkjenning, så patch.

## Arbeidsfordeling

Motor-spor (Jone + Claude + Gemini + Grok):
- Lag 2 forbedringer: persistent cache, prefetch, multi-source orchestration, kilde-veksling, søm-utjevning uten pixelflytting
- Lag 3 oppbygging: Three.js-rammeverk, snapshot-bro, effekter, modus-toggle
- Felles dokumentasjon under handoff/v7-engine-arkitektur/

Kartproduksjon-spor (Jone + ChatGPT):
- Kartkilder, kartografi, kvalitet på underlaget
- Berøres ikke av motor-sporet uten beskjed

Koordinerings-MD-er pushes til handoff/v7-engine-arkitektur/. Hver agent får sin egen markdown-fil med oppdrag, leveranse-kriterier og hva som er forbudt. Plan først, godkjenning, så kode.

## Hva som er forbudt for alle agenter

- Endre ankerpunkter, transform, aeProject, GE-grid, solsirklene, kartflatens proporsjoner
- Bruke kart-bibliotek som automatisk reprojiserer (Leaflet i kartflaten, Mapbox-GL, OpenLayers som primary motor, Cesium globe-modus)
- Skrive shaders som flytter pikselverdier i kartflaten (filter på pane-nivå er ok hvis det ikke flytter, men forbedrer farge)
- Legge effekter som ikke kan slås av i Måle-modus
- Innføre projeksjons-antakelser (Web Mercator-tvang, lat/lon-auto-warp) i Lag 3

## Hvordan vi måler om vi slår Google Earth

Vi skal kunne:

- Vise flere kart-lag samtidig enn GE støtter native (ortofoto + sjøkart + historiske kart + vektor + målerasters + sol-baner + GE-grid + anker — alle uavhengige, alle togglebare).
- Pan og zoom uten frame-drops på samme maskinvare som kjører GE jevnt.
- Bytte mellom kartkilder uten tom-skjerm (Lag 3 retire-then-append er allerede dette).
- Holde kartflaten urørt mens vi legger til lys og hav — noe GE ikke skiller mellom.

## Leveranseplan for denne fasen

- Steg 0 (denne planen): godkjent av Jone. Branch: claude/v7-engine-arkitektur-plan.
- Steg 1: UI-toggle Måle/Visuell. Ny branch claude/v7-engine-modus-toggle-plan, så claude/v7-engine-modus-toggle-css når godkjent.
- Steg 2 og fremover: hver sin branch, hver med plan først.

Ingen leveranser sammenslås til codex/v7-next-dev-source uten at Jone tester og godkjenner.
