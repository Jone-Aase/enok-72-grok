# Marine 2 km Nordic POC atlasplan

Dato: 2026-06-04  
Status: Plan- og manifestutkast. Ingen kode. Ingen tile-download.  
Rolle: Codex Atlas

## 1. Formaal

Bygge et lite, kontrollert marine-2km atlas for Nordic POC-omraadet:

- Norge
- Island / Grimsey
- Sverige
- overgangene som allerede er visuelt testet i POC

Dette er ikke et verdensatlas. Dette er foerste lokale/offline atlaspakke for sjokartbasert toppnivaa rundt observert LOD-skifte mellom 2,0 km og 2,2 km.

Atlaset skal bruke dagens motor-request/grid som sann kilde for foerste versjon. Det skal ikke byttes til ny WMS/WMTS-modell i denne fasen.

## 2. Ikke-maal

Denne leveransen skal ikke:

- endre app.js
- endre index.html
- laste ned tiles
- bake kartbilder
- lage mosaikk
- resample, skalere, rotere eller korrigere bilder
- konvertere til WebP
- endre anker, transform, skala, rotasjon eller tile-posisjon
- utvide til global dekning

Hvis planlagt atlasarbeid viser seg aa kreve endring i locked rules, skal arbeidet stoppes og rapporteres til Codex Koordinator og Jone.

## 3. Foerste coverage-omraade

Foerste coverage skal vaere et lite Nordic POC-omraade basert paa allerede visuelt testede overganger.

| Delomraade | Rolle | Status |
| --- | --- | --- |
| Norge | Hovedflate for sjokartmotor | POC-testet |
| Island | Nord-Atlanterhavsflate | POC-testet |
| Grimsey | Viktig overgangs-/ankeromraade | POC-testet |
| Sverige | Naboflate mot Norge | POC-testet |
| Norge-Sverige-overgang | Kontroll av kontinuitet | POC-testet visuelt |
| Norge-Island/Grimsey-overgang | Kontroll av nordomraade | POC-testet visuelt |

Eksakt bbox/polygon skal ikke gjettes manuelt. Den skal hentes fra dagens motor-request/grid naar Jone og Codex Koordinator godkjenner tile-inventarsteget.

Coverage skal dokumenteres som menneskelig lesbar regionliste, maskinlesbar coverage.geojson, tile-basert dekning i tile-inventory.jsonl, og liste over hull/no-data/feilede tiles.

## 4. LOD-regel for marine-2km

- aktiver marine-2km ved kamera-/LOD-hoyde <= 2.0 km
- deaktiver marine-2km ved kamera-/LOD-hoyde >= 2.2 km
- behold aktivt lag mellom 2.0 og 2.2 km for hysterese

Dette hindrer flakking rundt det observerte detaljskiftet. Foerste atlaspakke skal bare beskrive regelen i manifestet. Motorvalget implementeres senere av Codex Motor etter separat godkjenning.

## 5. Manifest-skjema

Foreslaatt manifestfil:

```text
dokumenter/atlas/manifests/marine-2km-nordic-poc.manifest.json
```

Foreslaatt skjema:

```json
{
  "schemaVersion": "0.1",
  "atlasId": "marine-2km-nordic-poc",
  "title": "Marine 2 km Nordic POC",
  "status": "planned",
  "createdAt": "2026-06-04",
  "lod": {
    "id": "marine-2km",
    "role": "top nautical chart layer for Nordic POC",
    "activateAtOrBelowKm": 2.0,
    "deactivateAtOrAboveKm": 2.2,
    "hysteresis": true
  },
  "coverage": {
    "coverageId": "nordic-poc",
    "description": "Norway, Iceland/Grimsey, Sweden and visually tested transitions",
    "geometryFile": "coverage.geojson",
    "sourceOfTruth": "current engine requests/grid",
    "exactBoundsStatus": "to-be-extracted-before-download"
  },
  "renderContract": {
    "requestGrid": "current-engine-grid",
    "tilePositioning": "current-engine-positioning",
    "rawImagesOnly": true,
    "allowResampling": false,
    "allowMosaic": false,
    "allowRotation": false,
    "allowScaleCorrection": false,
    "allowAnchorCorrection": false
  },
  "sources": [],
  "tileInventory": {
    "file": "tile-inventory.jsonl",
    "imagesStoredInGit": false,
    "imageStorage": "local-atlas-data-or-external-storage",
    "checksumAlgorithm": "sha256"
  },
  "fallback": {
    "parentLod": "nordic-7km",
    "fallbackOrder": ["nordic-7km", "region-mid", "world-low"],
    "blankMapAllowed": false
  },
  "lockedRulesAudit": {
    "appJsChanged": false,
    "indexHtmlChanged": false,
    "anchorsChanged": false,
    "aeProjectChanged": false,
    "geGridChanged": false,
    "sunCirclesChanged": false,
    "transformChanged": false,
    "scaleChanged": false,
    "rotationChanged": false,
    "tilePositionChanged": false,
    "internalMapProportionsChanged": false
  }
}
```

## 6. Tile inventory-format

Foreslaatt fil:

```text
dokumenter/atlas/inventory/marine-2km-nordic-poc.tile-inventory.jsonl
```

Foreslaatt radformat:

```json
{
  "tileId": "marine-2km:nordic-poc:source:z:x:y-or-request-hash",
  "atlasId": "marine-2km-nordic-poc",
  "lod": "marine-2km",
  "region": "norway|iceland|grimsey|sweden|transition",
  "sourceId": "todo-source-id",
  "request": {
    "method": "GET",
    "urlTemplateId": "todo-template-id",
    "params": {
      "service": "TODO",
      "request": "TODO",
      "layers": "TODO",
      "crs": "TODO",
      "bbox": "TODO",
      "width": 256,
      "height": 256,
      "format": "image/png"
    }
  },
  "engineGrid": {
    "scheme": "current-engine-grid",
    "z": null,
    "x": null,
    "y": null,
    "bbox": null,
    "crs": "TODO"
  },
  "localImage": {
    "storedInGit": false,
    "relativePath": "marine-2km/nordic-poc/tiles/source/layer/grid/tile.png",
    "sha256": "TODO-after-download",
    "bytes": null,
    "width": null,
    "height": null,
    "mime": "image/png"
  },
  "status": "planned|downloaded|verified|missing|no-data|license-blocked",
  "notes": ""
}
```

Regler: request bevarer original motor-request, engineGrid beskriver dagens motor-grid, sha256 fylles foerst etter godkjent download, og storedInGit er false.

## 7. Lokal mappe- og filstruktur

Git-sporet dokumentasjon og metadata:

```text
dokumenter/
  atlas/
    MARINE-2KM-NORDIC-POC-PLAN.md
    manifests/
      marine-2km-nordic-poc.manifest.json
    inventory/
      marine-2km-nordic-poc.tile-inventory.jsonl
    coverage/
      marine-2km-nordic-poc.coverage.geojson
    reports/
      marine-2km-nordic-poc-build-report.md
      marine-2km-nordic-poc-coverage-report.md
      marine-2km-nordic-poc-license-report.md
      marine-2km-nordic-poc-offline-test-report.md
```

Lokal atlas-data, ikke Git-sporet i foerste fase:

```text
<local-atlas-data-root>/
  marine-2km/
    nordic-poc/
      tiles/
        <source-id>/
          <layer-id>/
            <engine-grid-id>/
              <tile-or-request-key>.png
      checksums/
        sha256.txt
      download-logs/
        planned-requests.jsonl
        completed-requests.jsonl
        failed-requests.jsonl
```

Anbefalt variabel senere: ENOK_ATLAS_DATA.

## 8. Offline-test

Testmaal:

- marine-2km kan vises fra lokal atlas-data uten ny live-lasting.
- Grovere lag ligger under som fallback.
- Ingen hull gir blankt kart hvis nordic-7km, region-mid eller world-low dekker omraadet.
- Locked rules er urort.

Foreslaatt testflyt:

1. Start fra godkjent POC-baseline.
2. Sett kamera/LOD til <= 2.0 km.
3. Verifiser at planlagt marine-2km coverage dekker synlig POC-omraade.
4. Slukk nettverk eller blokker live tile-kilder.
5. Last samme utsnitt fra lokal atlas-data.
6. Sammenlign visuelt mot baseline.
7. Panorer over Norge, Island/Grimsey, Sverige og overgangene.
8. Zoom ut til >= 2.2 km og bekreft overgang til grovere LOD.
9. Fjern eller merk en test-tile som manglende og bekreft fallback.
10. Rapporter console-feil, manglende tiles, lastetid, minne og visuell status.

Godkjenningskrav: ingen endring i anker/transform/skala/rotasjon/tile-posisjon, ingen blank flate ved manglende detaljtile, ingen live tile-request i offline-test for dekningsomraadet, og manifest/tile-inventory stemmer med lokal data.

## 9. Lisens- og attribution-sjekkliste

Foer tile-download:

- kilde identifisert med offisielt navn
- endpoint/layer dokumentert
- lisensvilkaar lest og lagret som referanse
- lokal/offline lagring eksplisitt tillatt eller avklart
- cache vs permanent atlas skilt juridisk
- maks nedlasting/rate limit avklart
- krav til attribution dokumentert
- krav til datomerking/kildeversjon dokumentert
- redistribusjon til Git, Vercel eller andre agenter avklart
- kartbilder holdes utenfor Git til lisens og storrelse er avklart
- Jone og Codex Koordinator har godkjent download

Foreslaatt attribution-felt per kilde:

```json
{
  "sourceId": "TODO",
  "provider": "TODO",
  "attributionText": "TODO",
  "licenseName": "TODO",
  "licenseUrl": "TODO",
  "offlineStorageAllowed": "unknown",
  "redistributionAllowed": "unknown",
  "notes": "TODO"
}
```

## 10. Locked-rules audit

| Locked rule | Tillatt endring i denne fasen? | Status |
| --- | --- | --- |
| ankerpunkter | Nei | Skal ikke roeres |
| GE-grid | Nei | Skal ikke roeres |
| solsirklene | Nei | Skal ikke roeres |
| aeProject | Nei | Skal ikke roeres |
| transform | Nei | Skal ikke roeres |
| skala | Nei | Skal ikke roeres |
| rotasjon | Nei | Skal ikke roeres |
| tile-posisjon | Nei | Skal ikke roeres |
| kartflatenes interne proporsjoner | Nei | Skal ikke roeres |
| app.js | Nei | Skal ikke roeres |
| index.html | Nei | Skal ikke roeres |

Stoppkriterier:

- Hvis atlaset bare passer ved aa justere anker, stopp.
- Hvis atlaset bare passer ved aa justere transform/skala/rotasjon, stopp.
- Hvis tile-posisjon maa endres for aa skjule feil i data, stopp.
- Hvis ny WMS/WMTS-modell blir nodvendig i foerste fase, stopp.
- Hvis lisens ikke tillater lokal lagring, stopp for den kilden.

## 11. Neste godkjenningspunkt

Foer kode eller tile-download maa Codex Koordinator og Jone godkjenne:

- coverage-avgrensning
- manifest-skjema
- tile inventory-format
- lokal atlasrot
- kilde- og lisensliste
- offline-testoppsett
- locked-rules audit

Etter godkjenning kan neste Atlas-oppgave vaere:

- hente ut planlagt tile-inventar fra dagens motor-request/grid
- fylle coverage.geojson og tile-inventory.jsonl
- lage download-plan uten aa laste ned
- levere ny rapport for review
