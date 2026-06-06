# Marine 2 km tile-inventar-plan

Dato: 2026-06-04
Status: Planutkast. Ingen kode. Ingen tile-download.
Rolle: Codex Atlas
Planbase: `dokumenter/atlas/MARINE-2KM-NORDIC-POC-PLAN.md`
Branch/base ved oppstart: `codex/v7-overview-base-atlas`, commit `007e350`

## 1. Formaal

Lage en trygg plan for aa hente ut tile-inventar for `marine-2km-nordic-poc` uten aa laste ned kartbilder.

Inventaret skal beskrive hvilke requests dagens motor ville laget ved ca. 2 km for:

- Norge
- Island
- Grimsey
- Sverige
- overgangene som allerede er visuelt testet

Dette er bare request-/inventararbeid. Selve kartbildene skal ikke lastes ned, lagres, konverteres eller pakkes i atlas ennaa.

## 2. Grunnregel

Dagens motor-request/grid er sann kilde for foerste inventar.

Det betyr at inventarplanen skal observere eller reprodusere requestene fra dagens motorlogikk:

- `currentNorgeDetailSources()`
- `visibleNorgeSourceBounds()`
- `currentNorgeDetailZoom(bounds)`
- `lonLatToTile(lon, lat, zoom)`
- `expandNorgeTileRange(tileRange, zoom)`
- `fitTileRangeToBudget(tileRange, sources.length)`
- `cleanDetailTileUrl(source, zoom, x, y)`
- `updateNorgeCleanDetailTiles({ zoom, tileRange, screenKey })`

Inventarsteget skal ikke forbedre, normalisere eller bytte gridmodell.

## 3. Ikke-maal

Denne oppgaven skal ikke:

- endre `app.js`
- endre `index.html`
- laste ned kartbilder
- bruke WMS/WMTS-kilder direkte som ny sannhet
- bake tiles
- resample tiles
- mosaikkere tiles
- korrigere transform, skala, rotasjon eller tile-posisjon
- hente `marine-detail`
- bygge atlaspakke
- pushe uten egen godkjenning

Hvis requestuttak krever endring i locked rules, stopp.

## 4. Kilder dagens motor bruker for POC-omraadet

Dette er observert fra eksisterende motorlogikk, ikke fra nye nettverkskall.

| Region | Motorvalg | Source type | Layer | Requestmodell |
| --- | --- | --- | --- | --- |
| Norge | `sjokartraster` | `kartverket` | `sjokartraster` | WMTS-lignende webmercator path |
| Island | `iceland-sjokart` | `wms-iceland-sjokart` | `Sjomaelingar:Sjokort_Sjomaelinga` | WMS GetMap EPSG:3857 |
| Grimsey | `iceland-sjokart` | `wms-iceland-sjokart` | `Sjomaelingar:Sjokort_Sjomaelinga` | WMS GetMap EPSG:3857 |
| Sverige | `sweden-seachart` | `wms-sweden-fyren` | `OgcWmsLayer0` | WMS GetMap EPSG:3857 |
| Samlet overgang | `assembled-nordic` | flere | Sverige, Island, Norge, Danmark | Bare godkjente POC-kilder tas med |

Foerste inventar skal filtrere bort:

- OSM
- Norge i bilder / NIB
- `marine-detail`
- andre kilder som ikke er godkjent for `marine-2km-nordic-poc`

Danmark finnes i `assembled-nordic`-motorvalget, men tas ikke inn i foerste inventar med mindre Codex Koordinator og Jone eksplisitt utvider coverage.

## 5. Uttaksstrategi uten download

Det finnes to trygge strategier. Begge skal gi samme requestliste.

### Strategi A: request-observasjon med nettverksblokkering

Bruk lokal browser/test-runner til aa la motoren beregne requests, men blokker alle tile-URL-er foer nettverket kontaktes.

Prinsipp:

1. Start lokal app.
2. Installer request-intercept for karttile-URL-er.
3. Naar motoren setter `img.src`, fang URL, initiator og tidspunkt.
4. Avbryt requesten umiddelbart.
5. Skriv bare metadata til inventarutkast.
6. Ikke lagre response body.
7. Ikke kontakte eksterne kartservere.

Denne strategien er best fordi den bruker dagens faktiske DOM/motorflyt uten aa endre `app.js`.

Tile-URL-er som skal blokkeres/logges:

- `https://cache.kartverket.no/v1/wmts/1.0.0/*`
- `https://gis.natt.is/mapcache/sjokort/web-mercator/wmst*`
- `https://geokatalog.sjofartsverket.se/mapservice/wms.axd/FyrenBakgrund*`
- eventuelle uventede `tile`, `wmts`, `wms`, `GetMap`-requests rapporteres som avvik

Aksept:

- requestlisten blir laget
- ingen bildebytes lastes ned
- alle requests er merket `status: "planned"`
- rapporten viser `downloadedImages: 0`

### Strategi B: separat request-planlegger

Lag senere et separat atlas-script som kopierer den rene requestlogikken fra motoren og produserer samme requestliste uten browser.

Denne strategien kan vaere nyttig for repeterbarhet, men maa behandles som egen kodeoppgave senere. Risikoen er avvik mellom script og motor. Derfor skal Strategi A brukes som sann kontroll for foerste inventar.

## 6. Foreslaatte capture-scenarier ved ca. 2 km

Alle scenarier skal bruke `setCameraHeightKm(2)` eller tilsvarende UI-kamerahoyde uten aa endre motorfiler.

| Scenario | Basevalg | Fokuspunkt | Formaal |
| --- | --- | --- | --- |
| `norway-main-2km` | `sjokartraster` | Norge/Polarsirkel-omraade | Hente norske sjokartrequests |
| `iceland-main-2km` | `iceland-sjokart` | Island senter | Hente Island-requests |
| `grimsey-2km` | `iceland-sjokart` | Grimsey control point | Hente Grimsey/overgang mot polarsirkel |
| `sweden-2km` | `sweden-seachart` | Sweden control point | Hente svenske sjokartrequests |
| `assembled-transition-2km` | `assembled-nordic` | Assembled Nordic control point | Kontrollere overgang mellom godkjente kilder |

Fokuspunkt skal tas fra dagens motor-konstanter eller eksisterende knapper:

- `GRIMSEY_CONTROL_POINT`
- `ICELAND_CONTROL_POINT`
- `SWEDEN_CONTROL_POINT`
- `ASSEMBLED_CONTROL_POINT`
- eksisterende Norge-fokus via `focusBaseMap('norge')` eller godkjente norske kontrollpunkter

Hvis et scenario produserer kilder utenfor godkjent scope, skal requestene merkes `excluded-by-scope`, ikke slettes stille.

## 7. Foreslaatt inventarfil

Planlagt metadatafil:

```text
dokumenter/atlas/inventory/marine-2km-nordic-poc.tile-inventory.plan.jsonl
```

Dette er en planfil, ikke et download-resultat.

Hver linje skal vaere en planlagt request:

```json
{
  "schemaVersion": "0.1",
  "atlasId": "marine-2km-nordic-poc",
  "inventoryKind": "planned-request",
  "captureScenario": "grimsey-2km",
  "lod": "marine-2km",
  "cameraHeightKm": 2.0,
  "hysteresisBandKm": {
    "activateAtOrBelowKm": 2.0,
    "deactivateAtOrAboveKm": 2.2
  },
  "region": "grimsey",
  "source": {
    "sourceType": "wms-iceland-sjokart",
    "layer": "Sjomaelingar:Sjokort_Sjomaelinga",
    "role": "base",
    "anchorMode": "iceland"
  },
  "engineGrid": {
    "scheme": "current-engine-webmercator",
    "z": 0,
    "x": 0,
    "y": 0,
    "tileSize": 256,
    "bboxEpsg3857": null,
    "bboxLonLat": null
  },
  "request": {
    "method": "GET",
    "url": "TODO-captured-url",
    "urlHash": "TODO-sha256-of-url",
    "service": "WMS-or-WMTS-path",
    "crs": "EPSG:3857",
    "format": "image/png",
    "width": 256,
    "height": 256
  },
  "localImage": {
    "storedInGit": false,
    "plannedRelativePath": "marine-2km/nordic-poc/tiles/source/layer/grid/tile.png",
    "sha256": null,
    "bytes": null
  },
  "status": "planned",
  "downloaded": false,
  "notes": ""
}
```

## 8. Felter som maa med i capture-rapport

Rapportfil:

```text
dokumenter/atlas/reports/marine-2km-nordic-poc-inventory-plan-report.md
```

Rapporten skal inneholde:

- branch og commit som ble brukt
- dato/tid
- viewport-storrelse
- kamera-hoyde
- scenarioer kjoert
- basevalg per scenario
- fokuspunkt per scenario
- valgt zoom per scenario
- tileRange per scenario
- antall planlagte requests per source
- antall blokkerte tile-requests
- antall uventede tile-/WMS-/WMTS-requests
- antall nedlastede kartbilder, som skal vaere `0`
- liste over ekskluderte kilder
- locked-rules audit

## 9. Dedup og stabil tileId

Samme request kan dukke opp i flere scenarioer. Inventaret skal dedupliseres paa stabil requestidentitet.

Foreslaatt dedup-nokkel:

```text
sha256(normalized-method + "\n" + normalized-url)
```

Normalisering:

- behold host, path og alle parametre som motoren lager
- sorter query-parametre bare i dedup-feltet
- behold original URL uendret i `request.url`
- ikke rund av bbox mer enn motoren allerede gjoer
- ikke endre CRS/SRS

Foreslaatt `tileId`:

```text
marine-2km:nordic-poc:<sourceType>:z<z>:x<x>:y<y>:<urlHashPrefix>
```

For WMS skal `z/x/y` fortsatt bevares fordi dagens motor bruker webmercator tilekoordinater til aa lage BBOX.

## 10. Coverage fra inventar

Etter requestlisten er laget, kan coverage beregnes fra tile-koordinater og BBOX uten aa laste bilder.

Planlagt output:

```text
dokumenter/atlas/coverage/marine-2km-nordic-poc.coverage.plan.geojson
```

Coverage skal gruppere:

- Norge
- Island
- Grimsey
- Sverige
- transition
- excluded-by-scope

Coverage skal markere:

- planlagte tiles
- overlapp
- hull som skyldes manglende scenario
- uventede kilder

No-data kan ikke fastslaas foer bildeinnhold faktisk er godkjent lastet ned. Foer download kan no-data bare vaere `unknown`.

## 11. Locked-rules audit for inventarsteget

| Omraade | Regel |
| --- | --- |
| `app.js` | Skal ikke endres |
| `index.html` | Skal ikke endres |
| ankerpunkter | Skal ikke endres |
| GE-grid | Skal ikke endres |
| solsirklene | Skal ikke endres |
| `aeProject` | Skal ikke endres |
| transform | Skal ikke endres |
| skala | Skal ikke endres |
| rotasjon | Skal ikke endres |
| tile-posisjon | Skal ikke endres |
| kartbilder | Skal ikke lastes ned |

Inventaruttaket kan lese runtime-status og observere planlagte requests. Det kan ikke korrigere eller flytte noe.

## 12. Stoppkriterier

Stopp og rapporter hvis:

- requestlisten ikke kan hentes uten aa kontakte kartservere
- browser/test-runner begynner aa laste bildebytes
- dagens motor bare kan gi riktig coverage ved endring av app-kode
- inventar krever ny WMS/WMTS-modell
- scenarioene gir uventede kilder som dominerer coverage
- lisensstatus tilsier at selv planlagt persistent URL-liste er sensitiv
- noen locked rules maa endres

## 13. Neste anbefalte leveranse etter godkjenning

Etter at denne planen er godkjent:

1. kjoer request-capture med nettverksblokkering
2. lag `tile-inventory.plan.jsonl`
3. lag `coverage.plan.geojson`
4. lag inventory-plan-rapport
5. rapporter antall planlagte requests, kilder, scenarioer og `downloadedImages: 0`

Fortsatt ingen tile-download foer Jone og Codex Koordinator godkjenner lisens og coverage.
