# Marine 2 km browser-capture-plan

Dato: 2026-06-04
Status: Planutkast. Ingen kode. Ingen capture-kjoring. Ingen tile-download.
Rolle: Codex Atlas
Branch/base: `codex/v7-overview-base-atlas`, commit `62aeeba`

## 1. Formaal

Planlegge en trygg runtime-capture av tile-requests ved ca. 2 km for `marine-2km-nordic-poc`, uten at eksterne kartservere kontaktes.

Capture skal brukes senere til aa bekrefte at static-engine-dry-run-inventaret stemmer med det motoren faktisk proever aa laste i browser.

Dette dokumentet er kun plan. Det skal ikke kjoeres capture i denne leveransen.

## 2. Absolutte regler

Denne fasen skal ikke:

- endre `app.js`
- endre `index.html`
- laste ned kartbilder
- kontakte tile/WMS/WMTS-servere
- bygge atlaspakke
- skrive lokal atlas-data
- endre anker, GE-grid, solsirklene, `aeProject`, transform, skala, rotasjon eller tile-posisjon

Hvis capture ikke kan garanteres uten serverkontakt, skal arbeidet stoppes.

## 3. Verktoy og metode

Anbefalt verktoy: Playwright med global allowlist-first route foer navigering.

Metode:

1. Start lokal appserver.
2. Start Playwright browser-context uten service workers.
3. Installer global route-regel foer siden lastes: `context.route("**/*", handler)`.
4. Handleren tillater bare lokale appressurser med `route.continue()`.
5. Handleren logger og aborterer alle eksterne requests med `route.abort()`.
6. Kjente tile/WMS/WMTS-moenstre brukes bare til klassifisering.
7. Naviger til lokal app.
8. Kjoer kun UI-/runtime-steg som faar motoren til aa beregne tile-requests.
9. Ingen ekstern response body skal mottas eller lagres.

Viktig: `context.route("**/*", handler)` skal etableres foer `page.goto(...)`. Det er selve sikkerhetsgrensen.

## 4. Hvordan blokkering garanteres foer serverkontakt

Capture-run skal bruke global allowlist-first routing:

```text
context.route("**/*", handler)
```

Denne regelen skal installeres foer `page.goto(...)`.

Handlerens grunnregel:

- lokale requests: `route.continue()`
- alle eksterne requests: logg, klassifiser og `route.abort()`
- aldri `route.continue()` for eksterne requests
- aldri `route.fetch()`

Krav til implementasjon senere:

- global route-regel registreres foer lokal side lastes
- `serviceWorkers: "block"` brukes i browser-context
- cache deaktiveres der verktoyet tillater det
- bare lokale requests faar `route.continue()`
- alle eksterne requests aborteres foer serverkontakt
- alle eksterne requests logges og klassifiseres
- kjente tile/WMS/WMTS-moenstre brukes bare til klassifisering, ikke som primaer sikkerhetsmekanisme
- capture avbrytes hvis en ekstern request fullfoeres

Forventet tellere i senere rapport:

```text
downloadedImages: 0
completedExternalTileRequests: 0
completedExternalRequests: 0
blockedExternalRequests: <antall>
blockedTileRequests: <antall>
unexpectedExternalRequests: <antall>
```

Hvis `completedExternalRequests` eller `completedExternalTileRequests` blir stoerre enn `0`, er testen ugyldig.

## 5. URL-moenstre for klassifisering

Primaer sikkerhetsmekanisme er global allowlist-first routing. URL-moenstrene under skal bare brukes til aa klassifisere blokkerte eksterne requests.

Kjente tilekilder fra dagens motor:

```text
https://cache.kartverket.no/v1/wmts/1.0.0/*
https://gis.natt.is/mapcache/sjokort/web-mercator/wmst*
https://geokatalog.sjofartsverket.se/mapservice/wms.axd/FyrenBakgrund*
https://havplan.dk/geoserver/havplan/wms*
```

Kjente kilder som skal blokkeres og merkes som ekskludert hvis de dukker opp:

```text
https://tile.openstreetmap.org/*
https://services.norgeibilder.no/wms/ortofoto*
https://wms.geonorge.no/*
```

Generiske fallback-regler for avvik:

```text
*GetMap*
*SERVICE=WMS*
*service=WMS*
*WMTS*
*wmts*
*tile*
*Tile*
*.png*
*.jpg*
*.jpeg*
*.webp*
```

Generiske regler skal brukes forsiktig slik at lokale appressurser ikke feilklassifiseres. Sikkerheten avhenger likevel ikke av disse reglene: alle eksterne requests aborteres uansett.

## 6. Tillatte lokale requests

Bare lokale appressurser skal faa fullfoeres:

- `http://localhost:*/*`
- `http://127.0.0.1:*/*`
- `http://[::1]:*/*`
- lokale `file://`-ressurser hvis testoppsettet bruker fil-URL

Alt annet er eksternt og skal logges, klassifiseres og aborteres. Eksterne scripts, kartbilder, WMS, WMTS og tile-endepunkter skal aldri fullfoeres under capture.

## 7. Scenarioer som skal kjoeres

Alle scenarioer skal settes til ca. 2 km hoyde via eksisterende runtime/UI, uten kodeendring.

| Scenario | Basevalg | Fokus | Forventet status |
| --- | --- | --- | --- |
| `norway-main-2km` | `sjokartraster` | Norge / polarsirkel-omraade | planned |
| `iceland-main-2km` | `iceland-sjokart` | Island senter | planned |
| `grimsey-2km` | `iceland-sjokart` | Grimsey control point | planned |
| `sweden-2km` | `sweden-seachart` | Sweden control point | planned |
| `assembled-transition-2km` | `assembled-nordic` | Assembled Nordic control point | planned + avvik for ekskluderte kilder |

OSM, NIB og `marine-detail` skal ikke inngaa i foerste `marine-2km` scope. Hvis de likevel dukker opp, skal de merkes som avvik og blokkeres.

Danmark finnes i dagens `assembled-nordic` motorliste. Hvis Danmark dukker opp i overgangsscenarioet, skal requestene merkes `excluded-by-scope`, ikke slettes stille.

## 8. Data som skal logges per blokkert request

Hver blokkert request skal logges som metadata, ikke bildeinnhold:

```json
{
  "captureScenario": "grimsey-2km",
  "timestamp": "2026-06-04T00:00:00.000Z",
  "method": "GET",
  "url": "captured-url",
  "urlHash": "sha256",
  "resourceType": "image",
  "isExternalRequest": true,
  "isTileLikeRequest": true,
  "matchedPattern": "wms-iceland-sjokart",
  "blockedBeforeSend": true,
  "blockedExternalRequest": true,
  "completedExternalRequest": false,
  "completedExternalTileRequest": false,
  "downloadedImage": false,
  "status": "blocked-planned|blocked-excluded-by-scope|blocked-unexpected"
}
```

Hvis verktoyet kan hente initiator/stack uten serverkontakt, kan dette legges til. Hvis ikke, skal feltet utelates heller enn aa risikere nettverk.

## 9. Sammenligning mot static-engine-dry-run-inventar

Senere capture-run skal sammenligne mot:

```text
dokumenter/atlas/inventory/marine-2km-nordic-poc.tile-inventory.plan.jsonl
```

Sammenligningsnokkel:

```text
sha256("GET\n" + originalUrl)
```

Sammenligning skal rapportere:

- requests i browser-capture som finnes i static-inventaret
- requests i static-inventaret som ikke ble observert i browser-capture
- requests i browser-capture som ikke finnes i static-inventaret
- avvikende source/layer/status
- avvikende z/x/y eller bbox hvis det kan parses fra URL
- avvikende scope, f.eks. OSM/NIB/Danmark

Viktig: static-engine-dry-run er planlagt inventar. Browser-capture skal bekrefte runtime, men skal fortsatt ikke laste bilder.

## 10. Stoppkriterier

Stopp capture-run hvis:

- global allowlist-first route ikke kan installeres foer navigering
- service worker ikke kan blokkeres eller kontrolleres
- en ekstern request fullfoeres
- en tile/WMS/WMTS-request fullfoeres
- en ekstern kartserver kontaktes
- `downloadedImages` blir stoerre enn `0`
- `completedExternalRequests` blir stoerre enn `0`
- `completedExternalTileRequests` blir stoerre enn `0`
- capture krever endring i `app.js` eller `index.html`
- capture krever endring i locked rules
- uventede eksterne kilder dominerer resultatet
- testverktoyet ikke kan skille lokale appressurser fra eksterne tile-ressurser

Ved stopp skal det leveres stopprapport med aarsak og eventuelle trygge logger som allerede finnes.

## 11. Filer en senere capture-run skal produsere

Senere capture-run, etter godkjenning, skal produsere:

```text
dokumenter/atlas/capture/marine-2km-nordic-poc.browser-capture.blocked-requests.jsonl
dokumenter/atlas/capture/marine-2km-nordic-poc.browser-capture.blocked-external-requests.jsonl
dokumenter/atlas/capture/marine-2km-nordic-poc.browser-capture.unexpected-external-requests.jsonl
dokumenter/atlas/capture/marine-2km-nordic-poc.browser-capture.compare.json
dokumenter/atlas/reports/marine-2km-nordic-poc-browser-capture-report.md
```

Hvis capture stoppes foer fullfoering:

```text
dokumenter/atlas/reports/marine-2km-nordic-poc-browser-capture-stop-report.md
```

Ingen kartbilder skal produseres.

## 12. Rapportkrav for senere capture

Capture-rapporten skal minst inneholde:

```text
downloadedImages: 0
completedExternalTileRequests: 0
completedExternalRequests: 0
blockedExternalRequests: <antall>
blockedTileRequests: <antall>
unexpectedExternalRequests: <antall>
```

I tillegg:

- branch og commit
- verktoy og versjon
- server-URL for lokal app
- scenarioer kjoert
- tile-URL-moenstre brukt
- antall blokkerte eksterne requests per source
- antall avvik per source
- sammenligning mot static-engine-dry-run-inventar
- locked-rules audit
- bekreftelse paa at `app.js` og `index.html` ikke ble endret

## 13. Locked-rules audit

| Omraade | Statuskrav |
| --- | --- |
| `app.js` | ikke endres |
| `index.html` | ikke endres |
| ankerpunkter | ikke endres |
| GE-grid | ikke endres |
| solsirklene | ikke endres |
| `aeProject` | ikke endres |
| transform | ikke endres |
| skala | ikke endres |
| rotasjon | ikke endres |
| tile-posisjon | ikke endres |
| kartbilder | ikke lastes ned |
| eksterne kartservere | ikke kontaktes |

## 14. Neste godkjenningspunkt

Foer capture kan kjoeres, maa Codex Koordinator og Jone godkjenne:

- Playwright-intercept-metode
- URL-moenstre
- scenariosekvens
- outputfiler
- stoppkriterier
- rapportformat

Capture skal ikke startes foer denne planen er godkjent.
