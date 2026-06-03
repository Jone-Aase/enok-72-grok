# Survey: Island sjøkart-kilder og alternative layers

Status: kun undersøkelse. Ingen kode, ingen geometri, ingen filterendring.

Baseline-kontekst: claude/v7-pane-layer-diagnostics. Diagnostikken bekrefter at toneforskjellen er kildebasert — ikke geometri, ikke z-rekkefølge, ikke opacity-stacking. Kartverket sjøkart og dagens LMI-sjokart har forskjellig kartografisk stil og bakgrunnstone.

## Hva vi bruker nå

Endepunkt: https://gis.natt.is/mapcache/sjokort/web-mercator/wmst
Tjeneste: OGC:WMS, versjon 1.1.1 (selv om vi spør 1.3.0). Titel: "Mapcache service at Náttúrufræðistofnun". Cascaded fra LHG/LMI gjennom Náttúrufræðistofnun.
Layer: Sjomaelingar:Sjokort_Sjomaelinga
Style: tom (default)
Format: image/png
CRS: EPSG:3857
Parametre vi sender: SERVICE=WMS, VERSION=1.3.0, REQUEST=GetMap, LAYERS=Sjomaelingar:Sjokort_Sjomaelinga, STYLES=, FORMAT=image/png, TRANSPARENT=TRUE, CRS=EPSG:3857, BBOX=..., WIDTH=256, HEIGHT=256.

Kilde-egenskap: Sjokort_Sjomaelinga er en automatisk skala-velgende kompositt. Abstract i GetCapabilities beskriver at den bytter mellom flere underliggende kart avhengig av zoom: 1:2 mill, 1:1 mill, 1:300k, 1:100k, 1:35-50k, 1:15k, 1:10k. Det betyr at tonen vi ser endrer seg trinnvis med zoom — fordi underlagene er ulike sjøkart-produksjoner med ulik kartografisk stil.

Dette forklarer hvorfor pane-filter alene ikke kan matche Kartverket konsekvent: den effektive kilden bytter etter zoom-nivå.

## Tilgjengelige layers i samme tjeneste (gis.natt.is mapcache)

Sjøkart-layers i samme endepunkt, alle EPSG:3857, alle PNG, alle med tom STYLES:

- Sjomaelingar:Sjokort_Sjomaelinga (kompositt, brukes nå)
- Sjomaelingar:sjokort_2milljon (1:2.000.000)
- Sjomaelingar:sjokort_1milljon (1:1.000.000)
- Sjomaelingar:sjokort_300thusund (1:300.000)
- Sjomaelingar:sjokort_100thusund (1:100.000)
- Sjomaelingar:sjokort_35_40_50thusund (1:35.000, 1:40.000, 1:50.000)
- Sjomaelingar:sjokort_K44 (1:70.000)
- Sjomaelingar:sjokort_K42 (1:160.000)
- Sjomaelingar:sjokort_15thusund (1:15.000)
- Sjomaelingar:sjokort_10thusund (1:10.000)

Ingen alternative styles er publisert. Cascaded=1 indikerer at MapCache cacher fra en underliggende WMS, så server-side style-bytte er trolig ikke mulig.

TRANSPARENT=TRUE er allerede aktivert i begge GetMap-kallene våre (linje 3010 og 3036 i app.js). Det styrer alfa, ikke tone.

## Hva som finnes i parallell LMI-tjeneste (gis.lmi.is geoserver)

Landmælingar Íslands sin GeoServer har grunnkart/basemap som er kartografisk nærmere "nøytrale" referansekart. Disse er ikke sjøkart, men kan vurderes hvis Jone aksepterer en kartografisk endring av Island-overflaten fra sjøkart til generelt basemap, for å oppnå tonelikhet med Kartverket. To kandidater:

- LMI_Island_einfalt — "LMI, Iceland, simple". Enkel basemap-stil. Style: default-style-LMI_Island_einfalt. Endepunkt: https://gis.lmi.is/geoserver/wms. Format: image/png. CRS: EPSG:3857 (må verifiseres ved bbox-test).
- nytt_grunnkort_samsett_naer_fjaer — "New basemap with neighboring countries". Style: default-style-nytt_grunnkort_samsett_naer_fjaer. Komposittkart med Island sentralt og naboland nedtonet.
- nytt_grunnkort_corine_haf — "sea". Sjøvariant av samme grunnkart-system.
- ArcticSDI_IS — "Icelandic part of the ArcticSDI basemap". Felles nordisk basemap; ofte stilistisk likere generelle skandinaviske referansekart.

Disse er IKKE nautiske kart. Hvis Island-pane fortsatt skal vise sjøkart-stil for å passe Norge-pane sin Kartverket sjøkartraster, må vi enten:

- akseptere kilde-forskjell og bare matche tone tilnærmet, eller
- bytte til et LMI-basemap som ligner Norges sjøkart visuelt (kompromiss), eller
- bytte Norge-pane fra Kartverket sjøkartraster til en ikke-nautisk Kartverket-bakgrunn som matcher LMI bedre (omvendt match — utenfor scope).

## Kandidater for neste test

### Kandidat 1: Lås Island-pane til én skala-variant (test-direkte erstatning)

Bytt LAYERS-parameteren fra Sjokort_Sjomaelinga til sjokort_1milljon eller sjokort_300thusund. Dette eliminerer den automatiske skala-byttingen og fjerner det zoom-avhengige tone-hoppet vi observerer. Anbefalt første test: sjokort_300thusund (passer ofte zoom 6-9 for hele Island), eller sjokort_1milljon for langt utzoom. Risiko: ved zoom utenfor stilens designede skala blir tile rasterisert til feil oppløsning (tile blir lavoppløst men jevnt farget). Det er ofte foretrukket fremfor tone-hopp.

### Kandidat 2: Bytt til LMI basemap (kartografisk endring)

Bytt endepunkt til https://gis.lmi.is/geoserver/wms og LAYERS=LMI_Island_einfalt. Dette gir en enkel basemap-stil som vanligvis har lysere grunnfarge enn nautiske kart. Risiko: ikke lenger et sjøkart — havdyp-konturer, navigasjonsmarkører, fyrtårn osv. forsvinner. Hvis sjøkart-detaljer ikke er kritiske for det Jone måler/sammenligner, gir denne sannsynligvis raskest tone-match.

### Kandidat 3: Bytt til LMI grunnkort med sjø-variant

Bytt endepunkt til https://gis.lmi.is/geoserver/wms og LAYERS=nytt_grunnkort_corine_haf. Beskrevet som "sea"-variant av nytt_grunnkort. Risiko: ukjent eksakt utseende; må visuell-testes. Kan være middelvei mellom rent basemap og sjøkart.

## Anbefalt neste test

Start med Kandidat 1 (sjokort_1milljon) som ren A/B-test. Det er minst invasivt:

- Endepunkt uendret (samme gis.natt.is/mapcache)
- Kun LAYERS-parameteren endres
- Resten av kart-pipeline uberørt
- Krever én streng-endring i én funksjon (cleanDetailTileUrl i app.js)
- Hvis grå-tone-hopp forsvinner med fast skala, bekrefter det at kompositten var årsaken
- Hvis tone fortsatt skiller seg fra Kartverket, men nå konsekvent, kan vi finjustere med pane-filter på toppen

Hvis Kandidat 1 ikke gir akseptabel tone, går vi videre til Kandidat 3 (sea-variant av LMI basemap). Hvis sjøkart-detaljer kan ofres, hopper vi direkte til Kandidat 2.

## Plan for når du godkjenner test

Branch-forslag: claude/v7-island-source-test-1
Endring: kun LAYERS-strengen i to funksjoner (detailTileUrl og cleanDetailTileUrl), fra Sjomaelingar:Sjokort_Sjomaelinga til Sjomaelingar:sjokort_1milljon (eller annen skala du velger). Ingen andre endringer. Pane-filter, anker, transform, opacity, tile-loading uberørt.

Lever ved godkjent test:

- Commit SHA
- Bekreft at kun LAYERS-strengen er endret
- Bekreft at ingen andre filer rørt
- Visuell screenshot om mulig
