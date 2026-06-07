# Kartmotor V2 2I: minimal loader-aktivering plan

Status: plan/review only.

Denne planen definerer hvordan Kartmotor V2 senere kan åpne første ekte tile-loading på en kontrollert måte. 2I skal ikke implementere loading.

## Status før 2I

- 2H URL-validation-hardening er godkjent.
- 2H-fix er godkjent.
- `validTile && validUrl` er fremtidig loader-kandidat.
- `loaderAllowed=false`.
- `loadingEnabled=false`.
- `loaderGateState=closed`.
- Gammel clean-motor er fortsatt komplett backup og referanse.

## 2I skal ikke gjøre

- Ikke åpne loader-gate.
- Ikke implementere loading.
- Ikke bruke `fetch`.
- Ikke bruke `Image`, `img.src` eller `<img>`.
- Ikke lage DOM-tiles.
- Ikke mutere `tileRegistry`, `pendingRegistry` eller `levels`.
- Ikke skjule eller endre clean-motor.
- Ikke røre anker, GE-grid, solsirklene, `aeProject`, transform, skala, rotasjon, tile-posisjon eller kartproporsjoner.

## Første ekte loading etter 2I

Første loadingfase etter godkjent 2I bør være en separat fase, foreløpig kalt 3A controlled base-only tile loading.

3A første test skal begrenses slik:

- Kun basekart.
- Kun `base:visible`.
- Maks 1 tile i første test.
- Maks 4 tiles i andre test hvis 1 tile fungerer.
- Oslo testområde.
- Ingen overlay.
- Ingen Se Eiendom / Matrikkel i første loadingtest.
- Ingen keep-buffer loading i første test.
- Ingen prune.
- Ingen retiring.
- Ingen cache, IndexedDB, local proxy eller offline tile-server i første test.
- Ingen clean-motor-skjuling.

## Hvorfor base først når Se Eiendom er målet

Se Eiendom / Matrikkel er hovedmålet med V2, men første ekte tile-test skal bevise motorens grunnmekanikk:

- Åpne loader-gate kontrollert.
- Velge én gyldig tile.
- Laste den uten sideeffekter.
- Vente på `img.onload`.
- Legge tile inn i V2-pane.
- Kunne slå V2 av igjen.
- La clean-motor stå urørt.

Når base-loading er stabil, legges Se Eiendom inn som overlay i egen fase. Se Eiendom skal aldri erstatte basekartet og skal aldri være et `baseReady`-krav.

## Krav til V2 når loading senere åpnes

- `loaderAllowed` og `loadingEnabled` åpnes bare eksplisitt.
- Bare descriptors med `validTile=true` og `validUrl=true` kan vurderes.
- Bare `base:visible` kan gå til pending i første test.
- `maxConcurrent=1` først.
- Egen V2 `pendingRegistry`.
- Egen V2 `tileRegistry`.
- Egen V2 DOM under V2-pane.
- V2 DOM-klasser må være namespaced, for eksempel `v2-tile`, `v2-tile-base`, `v2-tile-visible`.
- Tile kan appendes først etter `img.onload`.
- `img.onerror` gir failed status, ikke clean-motor-endring.
- Clean-motor forblir synlig backup.
- Toggle av skal kunne deaktivere og clear V2 uten å påvirke clean-motor.

## Statusfelt som må planlegges

- `actualPending`.
- `actualLoaded`.
- `actualFailed`.
- `actualAppended`.
- `actualSkippedByGate`.
- `actualRejectedInvalid`.
- `maxConcurrent`.
- `loaderGateState`.
- `firstLoadedSourceId`.
- `firstLoadedZXY`.
- `lastLoadError`.

## Harde stoppkriterier før 3A-kode

3A-kode skal ikke startes hvis noen av disse kriteriene ikke kan håndheves som hard gate:

- Stopp hvis `cleanDisplay` ikke er `block`.
- Stopp hvis V2 `pointer-events` ikke er `none`.
- Stopp hvis valgt descriptor ikke er `base:visible`.
- Stopp hvis `descriptor.validTile !== true`.
- Stopp hvis `descriptor.validUrl !== true`.
- Stopp hvis loader-gate ikke eksplisitt er åpnet for 3A-test.
- Stopp hvis `maxConcurrent > 1` i første test.
- Stopp hvis `sourceKind` er overlay.
- Stopp hvis `sourceId` er Se Eiendom/Matrikkel.
- Stopp hvis V2 prøver å append før `img.onload`.
- Stopp hvis append-target ikke er V2-pane.

## Rollback

- V2 toggle av stopper videre V2-loading.
- V2-pane og V2-registries kan cleares.
- Clean-motor er fortsatt urørt og synlig.
- Ingen endring i låst geometri skal være nødvendig for rollback.

## Review-spørsmål

1. Er maks 1 tile først riktig?
2. Skal første basekilde være Kartverket/topografisk eller OSM fallback?
3. Er Oslo testområde riktig første område?
4. Er det trygt at første ekte DOM-tile legges under V2-pane etter `img.onload`?
5. Mangler noen stoppsignaler før 3A?

## Foreløpig anbefaling

Første basekilde bør være den enkleste gyldige basekilden som allerede gir `validUrl=true`. OSM kan være teknisk enklest som smoke-test, men Kartverket-base er mer relevant for prosjektets mål. Se Eiendom / Matrikkel kommer etter at base-loading er stabil.
