# PLAN-CODEX-LAG1-MOTOR-V1

Dato: 2026-06-04
Utfører: Codex
Status: Plan til Jone, systemutvikler og Perplexety. Ingen kode i denne leveransen.
Base for dokumentbranch: `claude/v7-roller-og-regler-v1` etter Codex og Perplexety sine bekreftelser.

## Kort konklusjon

Lag 1 må være den stabile motor-kjernen under alt annet. Lag 1 skal ikke være et visuelt eksperiment og skal ikke endre måleflaten. Det neste riktige steget er ikke å legge mer grafikk på toppen, men å gjøre dagens kartmotor kontrollert nok til å håndtere store mengder data uten å miste anker, kartflate, skala eller stabilitet.

Min anbefaling er at Lag 1 bygges i små trinn rundt fem ting:

- Freeze-when-loaded
- Tile- og frame-budget
- LOD-policy
- Ren status- og koordineringsflate mot Lag 2 og Lag 3
- Stabil pane-livssyklus uten geometrisk endring

Lag 2 kan fortsette med cache og prefetch når grenseflaten er tydelig. Lag 3 skal fortsatt være visual mode, ikke fundament.

## Låste områder

Denne planen forutsetter at følgende ikke røres i Lag 1-implementasjonen uten eksplisitt godkjenning fra Jone:

- Anker
- GE-grid
- Solsirklene
- `aeProject`
- `solveCleanSimilarity`
- `withNorgeNorthShift`
- Transform
- Skala
- Rotasjon
- Tile-posisjon
- Kartproporsjoner
- `NORGE_SURFACE_META`
- `NORGE_SURFACE_CONTROL_POINTS`

Kartflatene som matcher ankerpunktene behandles som låste måleflater. Lag 1 kan styre når tiles lastes, hvor mange som lastes, hvilken oppløsning som velges, og når en ferdig flate fryses. Lag 1 skal ikke flytte, strekke, rotere eller bøye kartet som del av ytelsesarbeid.

## Nåværende flaskehalser

Dagens motor fungerer visuelt, men den er fremdeles en lab-motor. De viktigste flaskehalsene er:

1. `updateNorgeDetailTiles()` kan bygge svært mange DOM-bilder i ett arbeidspass. Dette gir tung layout, høy minnebruk og treg respons når vi utvider mot større områder.

2. `norgeCleanTileManager` har kø, cache, aktiv-teller og prioritet, men den mangler et tydelig frame-budget. Den vet hvor mange bilder som er aktive, men ikke hvor mye arbeid som er trygt per frame.

3. Freeze-funksjonen finnes, men den fryser det som ligger der når knappen trykkes. Hvis køen ikke er ferdig, kan vi låse en uferdig flate.

4. LOD-valget er spredt mellom zoom, bounds, maxTiles og kildeliste. Det bør bli en eksplisitt policy slik at Norge, Island, Sverige, Danmark, Grønland og senere verden får samme styringslogikk.

5. Status finnes, men må skilles tydeligere mellom måleflate-status, laste-status, cache-status og visual-mode-status. Ellers blir det vanskelig å se hvem som skaper treghet.

6. Lag 2 legger seg inn i tile-pipelinen. Det er greit hvis grenseflaten er tydelig, men farlig hvis Lag 2 begynner å eie kølogikk eller DOM-livssyklus.

## Lag 1 ansvar

Lag 1 skal eie disse tingene:

- Hvilke tiles som trengs for synsfelt og valgt kartpakke
- Hvilken LOD/zoom som er riktig for nåværende høyde og tile-budget
- Prioritetsrekkefølge for synlige tiles
- Maks aktiv lasting per kilde og totalt
- Når gamle paner beholdes, pensjoneres eller fryses
- Når kartlaget er komplett nok til å fryses
- Status til Jone og til andre lag

Lag 1 skal ikke eie persistent lagring. Det er Lag 2. Lag 1 skal heller ikke eie atmosfære, lys, snapshot eller gaming-effekter. Det er Lag 3.

## Grenseflate mot Lag 2

Lag 2 skal få levere data-hjelp uten å overta motoren.

Lag 1 bør eksponere en liten intern kontrakt:

- `requestTile(src, meta)` eller dagens `queueNorgeCleanTile(img, src, priority, meta)` som fortsatt er bakoverkompatibel
- `meta.sourceKey`
- `meta.layerId`
- `meta.anchorMode`
- `meta.zoom`
- `meta.priority`
- `meta.batch`
- `meta.role`

Lag 2 kan svare på tre måter:

- cache hit: bildet kan fylles raskt
- cache miss: Lag 1 fortsetter normal lasting
- prefetch ready: Lag 1 kan bruke det når tile faktisk trengs

Lag 2 skal ikke bestemme transform, pane-posisjon, LOD, anker eller tile-grid. Lag 2 kan foreslå status, men Lag 1 avgjør hvilke tiles som er aktive i måleflaten.

Det delte flagget `window.__enok72__.lag2Exporting` er riktig og bør beholdes. Lag 1 trenger ikke bruke det direkte annet enn å vise status. Lag 3 bør respektere det.

## Grenseflate mot Lag 3

Lag 3 skal være visual mode. Det betyr:

- Lag 3 kan lese ferdig måleflate
- Lag 3 kan lage overlay, lys, atmosfære, tone og presentasjon
- Lag 3 kan aldri være eneste kilde til måleflaten
- Lag 3 må ha hard kill-switch
- Når Lag 3 er av, må målemodus være pikselidentisk

Jeg anbefaler at Lag 3 ikke kobles rett på `queueNorgeCleanTile` eller `processNorgeCleanTileQueue`. Lag 3 bør bare lese status og ferdige DOM/pane-lag, eller senere lese en eksplisitt render-export fra Lag 1.

## Trinn 1: Freeze-when-loaded

Dette bør være første kodeoppgave etter planen.

Mål:

- Jone kan velge en samlet kartflate, sette høyde, vente til nødvendige tiles er ferdig, og så fryse laget uten å låse en halvferdig flate.

Forslag:

- Ny state: `freezeMode = 'dynamic' | 'waiting' | 'frozen'`
- Ny knapp: `Freeze when loaded`
- Når aktivert:
  - Lag 1 fortsetter å laste dagens batch
  - UI viser `Waiting for tiles`
  - Når `queue.length === 0` og `active === 0`, kalles eksisterende freeze
  - UI viser `Frozen at H ...`
- Hvis Jone panorerer, zoomer eller bytter kartpakke mens den venter, kanselleres ventingen og status går tilbake til dynamic
- Hvis kildefeil holder køen åpen for lenge, skal UI si `Frozen with missing tiles` bare hvis Jone eksplisitt godkjenner det

Dette endrer ikke transform, tile-posisjon eller kartproporsjoner. Det endrer kun tidspunktet for når freeze slås på.

Aksepttest:

- Trykk `Set assembled 7 km`
- Trykk `Freeze when loaded`
- Status skal vise venting mens tiles lastes
- Når kø og active er null, fryses laget
- Pan/zoom etter freeze skal ikke trigge ny tile-rebuild
- Hvis freeze slås av, skal dynamisk lasting komme tilbake

## Trinn 2: Tile-budget og frame-budget

Dagens `maxTiles` og `maxConcurrent` er grove grenser. Vi trenger to budsjetter:

- Tile-budget: hvor mange tiles får finnes i en batch/pane
- Frame-budget: hvor mye DOM-arbeid får gjøres per frame

Forslag:

- Behold `NORGE_SURFACE_DETAIL.maxTiles`, men gjør det til del av en policy
- Innfør `norgeCleanTileManager.frameBudgetMs`, for eksempel 6 til 8 ms i starten
- `updateNorgeDetailTiles()` bør kunne bygge jobber i porsjoner i stedet for å lage alt i ett langt pass
- `processNorgeCleanTileQueue()` bør fortsette å styre nettverkslast, ikke DOM-bygg alene

Aksepttest:

- Pan til Norge, Island, Sverige, Danmark/Grønland, Svalbard og samlet flate
- UI skal ikke fryse merkbart når ny batch bygges
- Status skal vise begrenset antall aktive og ventende tiles
- Kartet skal fortsatt fylle samme område og matche anker som før

## Trinn 3: LOD-policy

LOD må bli eksplisitt før verden bygges videre.

Forslag til policy:

- Høyde over måleflaten styrer ønsket zoom
- Tile-budget kan tvinge zoom ned hvis området er for stort
- Senter/ankerområde prioriteres før ytterkanter
- Nær-kyst og aktive kontrollområder prioriteres før langt unna-områder
- Flere kilder deles i per-kilde budsjett, ikke alle får lov å fylle hele køen samtidig

Dette må ikke endre kartets geometri. LOD velger bare hvilken oppløsning som lastes.

Aksepttest:

- Ved høy høyde skal grovere lag gi oversikt
- Ved lav høyde skal detaljer komme inn rundt synsfeltet først
- Ved samlet nordisk flate skal motoren ikke prøve å laste alle høyoppløste tiles over alt samtidig

## Trinn 4: Pane-livssyklus

Vi trenger tydelige regler for paner:

- Active pane: måleflaten som vises nå
- Previous pane: kan beholdes kort under overgang
- Frozen pane: låst måleflate som ikke rebuildes
- Diagnostic pane: bare test, aldri produksjonsfundament

Forslag:

- Hver pane får status via dataset:
  - `data-pane-state="active|previous|frozen|diagnostic"`
  - `data-anchor-mode`
  - `data-source-layers`
  - `data-batch`
  - `data-lod`
- Pensjonering av gamle paner må være deterministisk: maks ett previous-pane i normal drift
- Frozen pane skal ikke kombineres med dynamic pane uten tydelig UI-status

Aksepttest:

- Det skal ikke oppstå doble kyster uten at debug/diagnostikk er aktivert
- Parent opacity skal fortsatt styre samlet lys, ikke hver tile alene
- Freeze og unfreeze skal ikke etterlate gamle paner

## Trinn 5: Statusflate

Jone trenger enkel status, utviklerne trenger detaljert status.

Forslag:

Kort status i UI:

- Height
- Mode: dynamic / waiting / frozen
- Active source package
- Loaded / queued / failed
- Cache on/off hvis Lag 2 er aktiv

Utviklerstatus:

- `window.__norgeCleanTileManager`
- `window.__enok72__.lag1Status`
- `window.__enok72__.lag2Status`
- `window.__enok72__.lag3Status`

Lag 1 bør sette `window.__enok72__.lag1Status` som ren data, ikke DOM.

Minimum felt:

- `mode`
- `batch`
- `active`
- `queued`
- `loaded`
- `cached`
- `failed`
- `sourceCounts`
- `freezeMode`
- `heightKm`
- `lod`
- `tileBudget`
- `frameBudgetMs`

## Trinn 6: Merge-rekkefølge mot Lag 2

Før Lag 2 merges inn i hovedutviklingslinjen, anbefaler jeg:

1. Merge eller behold Lag 1-planen som dokument
2. Implementer Lag 1 Trinn 1: freeze-when-loaded
3. Test med dagens motor uten Lag 2
4. Merge Lag 2 Steg 1 shadow
5. Test pikselidentitet
6. CORS-verifisering for Kartverket, Iceland og OSM
7. Merge Lag 2 Steg 2 cache on
8. Merge Lag 2 Steg 2b flagg
9. Merge Lag 2 Steg 3 prefetch on
10. Først etter dette vurderes Lag 3 visual mode

Dette gir oss en ren rekkefølge: motor-stabilitet først, data-hjelp etterpå, visualisering til slutt.

## Hva jeg ikke anbefaler nå

Jeg anbefaler ikke å gjøre disse tingene i neste runde:

- Full Three.js-rendering av tiles
- `html2canvas` som hovedmotor
- Service Worker før CORS og cache-policy er verifisert
- Global verdensflate i høy oppløsning
- Nye kartkilder uten kildebudsjett
- Endringer i anker eller transform for å få kilder til å passe visuelt

Dette er ikke fordi ideene er feil, men fordi måleflaten må være stabil før vi legger mer kraft på toppen.

## Første kodebranch etter godkjenning

Hvis Jone godkjenner denne planen, foreslår jeg første kodebranch:

`codex/v7-lag1-freeze-when-loaded`

Endringer:

- Kun `app.js` og eventuelt minimal tekst i `index.html`
- Ny `freezeMode`
- Ny knapp `Freeze when loaded` eller ombruk av eksisterende freeze-knapp med ventemodus
- Status som viser dynamic / waiting / frozen
- Ingen endring i anker, transform, skala, rotasjon, tile-posisjon eller kartproporsjoner

Akseptkriterium:

Jone kan trykke `Set assembled 7 km`, vente til motoren sier klar, fryse laget, og deretter se at laget ikke rebuildes ved videre pan/zoom før han selv låser opp.

## Sluttvurdering

Lag 1 må være konservativt. Det er her vi beskytter måleflaten. Hvis Lag 1 er ryddig, kan Lag 2 bli kraftig og Lag 3 bli visuelt avansert uten at instrumentets sannhet flytter seg.

Min innstilling: start med freeze-when-loaded, deretter frame-budget, deretter LOD-policy. Ikke koble Lag 3 dypere inn før disse tre er stabile.
