# Marine 2 km Nordic POC inventory-plan report

Dato: 2026-06-04
Status: Inventarleveranse uten tile-download
Branch: `codex/v7-overview-base-atlas`
Base commit: `503013b`

## 1. Kort konklusjon

Det er laget en planlagt tile-inventory for `marine-2km-nordic-poc` uten aa kontakte kartservere og uten aa laste ned bildebytes.

Metode: `static-engine-dry-run`. Requestene er generert fra dagens motorformler i `app.js`: webmercator z/x/y, EPSG:3857 BBOX og samme URL-form som `cleanDetailTileUrl()` bruker.

Dette er fortsatt plan-/inventarfasen. Det er ikke bygget atlaspakke.

## 2. Outputfiler

- `dokumenter/atlas/inventory/marine-2km-nordic-poc.tile-inventory.plan.jsonl`
- `dokumenter/atlas/coverage/marine-2km-nordic-poc.coverage.plan.geojson`
- `dokumenter/atlas/reports/marine-2km-nordic-poc-inventory-plan-report.md`

## 3. Null-download audit

| Felt | Verdi |
| --- | --- |
| captureMethod | `static-engine-dry-run` |
| browserCaptureUsed | `false` |
| externalServerContact | `0` |
| downloadedImages | `0` |
| imageBytesStored | `0` |
| tileRequestsBlocked | `not-applicable; no browser network requests were started` |
| kartbilder i Git | `false` |

Browser-capture ble ikke brukt i denne leveransen. Dermed var det ingen tile-requests som maatte blokkeres foer serverkontakt; requestlisten ble generert lokalt fra motorens requestformler.

## 4. Scenarioer

| Scenario | Region | Basevalg | Fokus | Zoom | TileRange | Tiles per source |
| --- | --- | --- | --- | --- | --- | --- |
| `norway-main-2km` | norway | `sjokartraster` | Norge focusBaseMap reference (66.55, 14) | z13 | x 4402-4426, y 2033-2057 | 625 |
| `iceland-main-2km` | iceland | `iceland-sjokart` | Island senter (64.9631, -19.0208) | z13 | x 3651-3675, y 2121-2145 | 625 |
| `grimsey-2km` | grimsey | `iceland-sjokart` | Grimsey, Iceland (66.545525, -18.011092) | z13 | x 3674-3698, y 2034-2058 | 625 |
| `sweden-2km` | sweden | `sweden-seachart` | Sweden - Stockholm archipelago (59.33, 18.07) | z13 | x 4495-4519, y 2397-2421 | 625 |
| `assembled-transition-2km` | transition | `assembled-nordic` | Assembled Nordic surface (64.5, 4) | z13 | x 4175-4199, y 2146-2170 | 625 |

Zoom `z13` er brukt som foerste `marine-2km` dry-run-nivaa fordi det gir ca. 2 km tilefotavtrykk i nordisk breddegrad og bruker dagens webmercator z/x/y-grid. Foer faktisk download skal browser-capture med nettverksblokkering bekrefte eller justere dette mot runtime tileRange.

## 5. Kildesammendrag

| Source | Layer | Status | Rows |
| --- | --- | --- | --- |
| `denmark-havplan-2024` | `Danmarks_havplan_af_28_juni_2024` | `excluded-by-scope` | 625 |
| `iceland-sjokart-sjomaelingar-sjokort` | `Sjomaelingar:Sjokort_Sjomaelinga` | `planned` | 1875 |
| `kartverket-sjokartraster` | `sjokartraster` | `planned` | 1250 |
| `sweden-fyren-ogcwmslayer0` | `OgcWmsLayer0` | `planned` | 1250 |

Totalt antall JSONL-rader: 5000

Planlagte request-rader innenfor foerste scope: 4375

Avviks-/ekskluderte request-rader: 625

## 6. Avvik og ekskluderte kilder

| Scenario | Source | Status | Aarsak |
| --- | --- | --- | --- |
| `assembled-transition-2km` | `denmark-havplan-2024` | `excluded-by-scope` | present in current assembled-nordic motor source list but outside first marine-2km scope |

OSM, NIB og `marine-detail` er ikke tatt med i foerste inventar. Danmark finnes i dagens `assembled-nordic` motorvalg og er derfor beholdt som merket `excluded-by-scope` i inventaret, ikke slettet stille.

## 7. Dedup-regel

Dedup er basert paa:

`sha256("GET\n" + originalMotorUrl)`

Original URL bevares uendret i hver JSONL-rad. Query-parametre er ikke omskrevet i `request.url`.

## 8. Coverage

Coverage-filen inneholder:

- union-bounds for alle scenarioer
- scenario-tile-range for Norge, Island, Grimsey, Sverige og overgang
- scenario-source-range per kilde
- status `planned` eller `excluded-by-scope`

No-data-status er `unknown-until-approved-download`, fordi bildeinnhold ikke er lastet ned.

## 9. Locked-rules audit

| Omraade | Status |
| --- | --- |
| `app.js` | ikke endret |
| `index.html` | ikke endret |
| ankerpunkter | ikke endret |
| GE-grid | ikke endret |
| solsirklene | ikke endret |
| `aeProject` | ikke endret |
| transform | ikke endret |
| skala | ikke endret |
| rotasjon | ikke endret |
| tile-posisjon | ikke endret |
| kartbilder | ikke lastet ned |

## 10. Foer neste steg

Foer tile-download maa Jone og Codex Koordinator godkjenne:

- lisens/attribution per kilde
- om `z13` skal beholdes som foerste `marine-2km` atlasnivaa
- om Danmark fortsatt skal holdes utenfor foerste scope
- browser-capture med nettverksblokkering som bekrefter runtime tileRange

Neste tekniske steg, etter godkjenning, er aa kjoere browser-capture med tile-URL-intercept og fortsatt `downloadedImages: 0`.
