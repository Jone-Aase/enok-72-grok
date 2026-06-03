# Respons fra Perplexety: Lag 2 — persistent cache og prefetch (plan, ingen kode)

Status: planutkast fra Perplexety, basert på `codex/v7-next-dev-source @ dc95a08`.
Leveransen er ren markdown. Ingen kode i denne runden. Ingen endringer i Lag 1, ingen
endringer i Lag 3 (retire-then-append). Tile-URL-mønstre, kilder og transform-pipeline
forblir uendret.

Alle linjenummer i denne planen refererer til `app.js` på base-commit
`dc95a08224bb9bc4db7968d931bbc16c54983b01`.

---

## 1. Mål og avgrensning

Lag 2 skal legge til to ortogonale funksjoner uten å berøre eksisterende tile-pipeline:

1. **Persistent tile-cache i IndexedDB.** Samme `src`-URL skal kun lastes fra nett én
   gang per «cache-levetid» — etter reload og når brukeren er offline skal tidligere
   sette tiles kunne males rett fra IndexedDB.
2. **Prefetch.** Tiles som ligger like utenfor synlig overscan-vindu lastes i bakgrunnen
   med strengt lavere prioritet enn live-køen, slik at pan og zoom føles jevnt.

Begge knyttes inn på det smaleste mulige snittet rundt
`queueNorgeCleanTile` / `processNorgeCleanTileQueue` (app.js linjer 3097 og 3065). Hverken
`detailTileUrl`, `cleanDetailTileUrl`, transform-løsing, anker, GE-grid, solsirkler eller
`retire-then-append`-byttet i `updateNorgeDetailTiles` skal endre signatur eller atferd.

---

## 2. IndexedDB-skjema

### 2.1 Database

| Felt              | Verdi                                                                 |
| ----------------- | --------------------------------------------------------------------- |
| Database-navn     | `enok72-tiles`                                                        |
| Versjon           | `1` (bump bare ved skjema-endring; migrasjon via `onupgradeneeded`)   |
| Levetid           | Persistent (`navigator.storage.persist()` forespørres ved init)       |
| Disabled-flag     | `localStorage.getItem('enok72.lag2.cache') === 'off'` → ingen open    |

### 2.2 Object stores

#### `tiles` — payload + metadata pr. tile

| Egenskap   | Type            | Beskrivelse                                                             |
| ---------- | --------------- | ----------------------------------------------------------------------- |
| `key`      | `string` (PK)   | Stabil cache-nøkkel, se 2.3                                             |
| `src`      | `string`        | Original tile-URL slik den returneres av `cleanDetailTileUrl`           |
| `source`   | `string`        | `source.type` + `source.layer` (debug/sweep, ikke en del av nøkkelen)   |
| `z`        | `number`        | Zoom                                                                    |
| `x`        | `number`        | Tile-x (web-mercator XYZ)                                               |
| `y`        | `number`        | Tile-y                                                                  |
| `blob`     | `Blob`          | Bilde-payload (`image/png` eller `image/jpeg` slik den ble levert)      |
| `bytes`    | `number`        | `blob.size`, denormalisert for raskt kvote-regnskap                     |
| `etag`     | `string\|null`  | `ETag`-header om tilgjengelig, ellers `null`                            |
| `fetchedAt`| `number`        | `Date.now()` ved lagring                                                |
| `lastUsed` | `number`        | `Date.now()` ved siste treff (oppdateres på `get`)                      |
| `hits`     | `number`        | Antall ganger hentet fra cache (debug/telemetri)                        |

#### `meta` — global cache-status

`keyPath: "id"`. Én rad pr. konfigurasjonsverdi.

| `id`           | Verdi                                                                |
| -------------- | -------------------------------------------------------------------- |
| `quota`        | `{ bytesUsed, bytesBudget, lastSweepAt }`                            |
| `version`      | App-build-stempel for å invalidere ved skjemaendring                 |
| `flags`        | `{ prefetchOn, cacheOn }` speil av localStorage-flagg                |

### 2.3 Nøkkelformat

Bruk URL-en direkte som logisk identitet, men hash den slik at lange WMS-URL-er ikke
sprer indeksstørrelsen. Anbefalt format:

```
key = `${z}/${x}/${y}|${sourceKey}|${urlHash}`
```

der

- `sourceKey = `${source.type}:${source.layer || ''}` (Iceland-WMST, NIB, OSM, Kartverket)
- `urlHash = base64url(SHA-256(src)).slice(0, 16)` — kollisjonsmotstandsdyktig nok
  (≈ 96 bit) og holder nøkkelen kort.

`src` lagres i tillegg som felt så vi kan diffe ved eventuell URL-mønster-endring.

### 2.4 Indekser

På `tiles`:

- `byLastUsed` på `lastUsed` — driver LRU-rydding.
- `byFetchedAt` på `fetchedAt` — driver aldersbasert rydding (TTL).
- `bySource` på `source` — gjør det mulig å feie ett kilde-sett (f.eks. ortofoto)
  isolert, og brukes av debug-knapp «tøm bare NIB».
- `byZ` på `z` — brukes for å droppe lave zoom-nivåer først når kvoten kverner.

`meta` har ingen sekundære indekser.

### 2.5 Versjonering og migrasjon

`onupgradeneeded` håndterer kun versjons-bumpene. Hvis `meta.version` ikke matcher
nåværende `APP_BUILD`, tømmes `tiles` ved init. Dette beskytter mot at en URL-form
ble endret i Lag 1 uten at Lag 2 vet det.

---

## 3. Innkobling i eksisterende pipeline

Hele innkoblingen skjer i tre eksisterende funksjoner. Ingen andre funksjoner berøres.

### 3.1 `queueNorgeCleanTile` (app.js linjer 3097–3109)

I dag: returnerer umiddelbart med `img.src = src` om RAM-cachen (`Map`) har sett
URL-en, ellers pusher jobb til køen.

Endring (kun den løypa):

1. Behold RAM-snarveien (linje 3100–3107) urørt — den er fortsatt riktig snarvei.
2. Hvis RAM-cachen ikke har src, og IndexedDB-laget er på, gjør et asynkront
   `tilesStore.get(key)`.
   - Treff → `URL.createObjectURL(blob)` og sett `img.src` direkte; oppdater
     `lastUsed`/`hits`; kall `rememberNorgeCleanTile(src)` slik at RAM-cachen følger
     etter. Inkrementer en ny teller `norgeCleanTileManager.fromIdb` (kun visning,
     ikke styring).
   - Bom → push jobb til køen som i dag (linje 3108).
3. IndexedDB-lookup må respektere `job.batch` på samme måte som
   `processNorgeCleanTileQueue` gjør (linje 3069, 3075, 3085). Hvis batch er rullet
   før idb-svaret kommer, kastes resultatet uten å mutere DOM.

### 3.2 `processNorgeCleanTileQueue` (app.js linjer 3065–3095)

Tile-køens kontrollflyt forblir uendret. Den eneste tilføyelsen er at vi i `onload`
(linje 3074–3082) skriver tilen til IndexedDB.

- Etter `img.dataset.loadedSrc = job.src` og `rememberNorgeCleanTile(job.src)`
  (linje 3078–3079), planlegg en `await fetch(job.src, { cache: 'force-cache' }).then(r => r.blob())` på en idle-callback (`requestIdleCallback`, fallback `setTimeout`) og `tilesStore.put({...})`.
- Skrivingen er «fire and forget»: feiler skrivingen, økes `norgeCleanTileManager.idbWriteFailed`, men køen og DOM påvirkes ikke.
- `onerror` (linje 3084–3092): ingen IDB-skriving. URL-en cache-svartes ikke.

Viktig: vi henter `blob` med `cache: 'force-cache'` slik at vi ikke trigger en ny
nettverksrunde — `<img>`-elementet har allerede lastet ressursen og HTTP-cachen
serverer den.

### 3.3 `resetNorgeCleanTileQueue` (app.js linjer 3044–3053)

Ingen funksjonell endring. Vi legger til null-stilling av nye tellere
(`fromIdb`, `prefetched`, `prefetchSkipped`, `idbWriteFailed`) ved siden av
`requested/loaded/cached/failed`, slik at HUD-statusen i
`refreshNorgeCleanLoadStatus` kan vise dem. Selve `currentBatch += 1` blir stående
som invalideringsmekanisme.

### 3.4 Prefetch-innkobling

Det legges til **én ny funksjon** og **ett ekstra kall**. Selve `for`-løkken som
genererer `tileJobs` i `updateNorgeDetailTiles` (app.js linjer 3888–3899) endres
ikke. Etter at live-køen er fylt og sortert (etter linje 3920) og
`processNorgeCleanTileQueue()` er kalt (linje 3929), kaller vi en ny funksjon
`schedulePrefetchAround(tileRange, zoom, panes, primaryMode)`. Detaljer i §5.

---

## 4. Rydding (LRU + alder + kvote)

Rydding skjer i én funksjon, `sweepTileCache`, som kalles fra tre triggere:

1. **Init** — kall i `loadV7CleanLab`/oppstart, etter at db er åpnet.
2. **Idle** — `requestIdleCallback` etter at en batch er ferdig
   (`norgeCleanTileManager.active === 0 && queue.length === 0`). Sjekkes i `onload`/`onerror`-grenene.
3. **Periodisk** — `setInterval` hvert 60. sekund mens fanen er synlig
   (`document.visibilityState === 'visible'`).

### 4.1 Policy

| Trinn | Regel                                                                                   |
| ----- | --------------------------------------------------------------------------------------- |
| 1     | Drop alle rader der `fetchedAt < now - TTL_MS` (TTL = 30 dager default, debug-overstyr) |
| 2     | Hvis `bytesUsed > 0.9 × bytesBudget` → drop LRU (`byLastUsed` asc) til 0.7 × budsjettet |
| 3     | Innenfor LRU-pass: dropp lavest `z` først (`byZ` asc) for å spare detalj-tiles          |
| 4     | Aldri dropp en tile som har `lastUsed > now - 60_000` (akkurat brukt)                   |
| 5     | Skriv ny `meta.quota` etter sweep                                                       |

### 4.2 Kvote-budsjett

- Standard `bytesBudget = 256 MB`. Hentes fra `navigator.storage.estimate()` ved init;
  vi tar `min(256 MB, 0.4 × quota)` for å la annen app-state få plass.
- Overstyrbart med `localStorage.setItem('enok72.lag2.cache.budgetMb', '128')`.
- `bytesUsed` oppdateres inkrementelt på `put`/`delete` for å unngå full table scan.
  Re-synkroniseres på sweep #3.

### 4.3 Hard-fail-modes

- `QuotaExceededError` på `put` → kjør sweep umiddelbart, prøv en gang til, ellers
  hopp over skrivingen og inkrementer `idbWriteFailed`.
- DB-open-feil → sett `cacheOn = false` for resten av sesjonen, logg én
  `console.warn('[v7-lag2] IndexedDB unavailable, running RAM-only')`, ingen
  brukerdialog.

---

## 5. Prefetch-strategi

### 5.1 Hva som prefetches

Etter at live `tileRange` er bygd (med dagens overscan-pad fra
`expandNorgeTileRange`, app.js linjer 3753–3773, som er 8/12/16 alt etter zoom),
genererer vi en **prefetch-ring**:

- En ekstra ring på `prefetchPad = ceil(0.5 × livePad)` tiles utenfor live-rangen.
  - z ≥ 14 → 8 tiles, z ≥ 11 → 6 tiles, ellers → 4 tiles.
- Klippes mot samme `NORGE_SURFACE_DETAIL.bounds`-limit som
  `expandNorgeTileRange` bruker (linje 3756–3763).
- Bare `(x, y)`-er som ligger **utenfor** live-rangen tas med (vi unngår
  dobbelt-køing).
- Kun for `sources` der `source.role !== 'overlay'` (overlays prefetches ikke,
  prioritet 0.2 i dag er allerede lavest blant live, og dataene er små).
- `wms-nib` (ortofoto) prefetches **ikke** — den koster båndbredde, krever token og
  brukeren slår den ofte av/på. Eksplisitt unntak.

### 5.2 Prioritet og kø-isolasjon

Prefetch må aldri konkurrere med live-køen. Vi bruker to mekanismer i lag:

1. **Egen kø.** Prefetch-jobber legges i `norgeCleanTileManager.prefetchQueue`, ikke i
   `queue`. `processNorgeCleanTileQueue` rører ikke prefetch-køen.
2. **Egen pumpe.** `processPrefetchQueue` pumper prefetch-køen, men kun når:
   - `norgeCleanTileManager.queue.length === 0`
   - `norgeCleanTileManager.active === 0`
   - Det er gått minst `PREFETCH_IDLE_MS = 400 ms` siden siste live-aktivitet
     (debounce mot pan/zoom).
   - Maks samtidige prefetch-forespørsler: `prefetchMaxConcurrent = 4`
     (mot live `maxConcurrent = 24`, app.js linje 2656).
3. **Avbrudd ved live-aktivitet.** Når `queueNorgeCleanTile` eller
   `resetNorgeCleanTileQueue` kalles, settes `prefetchPausedUntil = now + 400 ms` og
   alle in-flight prefetch-`fetch`-kall avbrytes via `AbortController` — DOM røres
   ikke (prefetch maler ikke `<img>` i DOM, se §5.4).
4. **Batch-isolering.** Prefetch-jobber bærer samme `currentBatch` som
   live-køen ved opprettelse, og pumpen sjekker `job.batch === currentBatch`
   før hvert kall — akkurat som linje 3069. Dette gir oss «retire»-semantikken
   gratis uten å røre Lag 3.

### 5.3 Når prefetch pauses helt

- Under aktiv pan: `norgeLeaflet.map.on('movestart', ...)` og `'zoomstart'` setter
  `prefetchPausedUntil = Infinity`. `'moveend'` og `'zoomend'` setter den til
  `now + 400 ms`. Bindes i samme init-blokk som annen Leaflet-binding (én ny
  funksjon `bindPrefetchPauseHandlers`, kalt fra eksisterende init-løype).
- Når fanen er skjult (`document.visibilityState !== 'visible'`).
- Når brukeren har slått av prefetch i debug.
- Når Network Information API tilsier sparsommelig modus:
  `navigator.connection?.saveData === true` eller
  `navigator.connection?.effectiveType` ∈ `{'slow-2g','2g'}`.

### 5.4 Hva prefetch faktisk gjør

Prefetch maler **aldri** DOM. Den gjør én ting: `fetch(src, { cache: 'force-cache' })`
→ `r.blob()` → `tilesStore.put(...)`. Dermed:

- Det finnes ingen visningsbivirkninger.
- Når brukeren panner og live-køen så ber om samme `src`,
  vil IndexedDB-treffet i §3.1 servere blobben uten ny nettrunde.
- Lag 1/3-koden ser aldri at prefetch fant sted.

---

## 6. Risiko og bivirkninger

| Risiko                                           | Vurdering | Mitigering                                                                          |
| ------------------------------------------------ | --------- | ----------------------------------------------------------------------------------- |
| Dobbel nettverkslast (img + fetch i §3.2)        | Lav       | `cache: 'force-cache'` + immutable WMTS-URL-er ⇒ samme HTTP-cache-rad serverer      |
| `objectURL` ikke `revoke`-et                     | Middels   | Sett `img.onload = () => URL.revokeObjectURL(blobUrl)` i idb-treff-grenen           |
| IDB-skriving stjeler hovedtråd ved store batches | Middels   | Skriv kun via `requestIdleCallback`; batch `put` i transaksjoner på 32 rader        |
| Stale tiles (kilde-bytte hos Kartverket)         | Lav       | TTL 30 dager + `meta.version`-invalidering + debug-knapp «tøm cache»                |
| Quota-fyll i Safari (lavt budsjett)              | Middels   | `navigator.storage.estimate()` styrer budsjettet ned automatisk                     |
| Prefetch maskerer reelle nettverksproblemer      | Lav       | `connection.saveData`/effectiveType-sjekk; debug-flag for å slå av                  |
| Prefetch holder live-pumpen tilbake              | Avvist    | Egen kø + egen pumpe + harde gates på `queue.length === 0 && active === 0`          |
| RAM-cachen og IDB blir ute av synk               | Lav       | `rememberNorgeCleanTile` kalles fra idb-treff også (§3.1) — én sannhetskilde i RAM  |
| Privat-modus / Tor uten IDB                      | Lav       | Open-feil ⇒ `cacheOn = false`, prefetch slås også av (avhenger av IDB for lagring)  |
| Service worker introduseres ved et uhell         | Avvist    | Eksplisitt nei i §9                                                                 |

---

## 7. Hva som ikke endres

- `detailTileUrl` (app.js linje 3003) — uendret.
- `cleanDetailTileUrl` (app.js linje 3029) — uendret.
- `webMercatorTileBbox`, `mercatorMeters`, `lonLatToTile` — uendret.
- Alle transformer (`solveCleanSimilarity`, `applyCleanTransformPoint`,
  `withNorgeNorthShift`) — uendret.
- `expandNorgeTileRange` (linje 3753) og `fitTileRangeToBudget` (linje 3731) —
  uendret. Prefetch-rangen er en **separat** beregning som ikke muterer disse.
- `updateNorgeDetailTiles` (linje 3775) — kun ett ekstra kall etter
  `processNorgeCleanTileQueue()` (linje 3929). Eksisterende
  retire-then-append (`detailLayer.replaceChildren(fragment)`, linje 3924) er urørt.
- `norgeCleanTileManager.maxConcurrent = 24`, `cacheLimit = 2600`, alle
  eksisterende tellere og oppførsel i `onload`/`onerror`-grenene.
- Lag 1: anker, `aeProject`, transform, GE-grid, solsirkler — utenfor scope.
- Backoff-/retry-policy som ligger i `onerror` (linje 3084) — uendret.
- HTML, CSS, Leaflet-konfigurasjon, kildelistene under `currentNorgeDetailSources`.

---

## 8. Filer som vil bli endret / ikke endret

### Vil bli endret (én fil totalt)

| Fil                            | Endring                                                                  |
| ------------------------------ | ------------------------------------------------------------------------ |
| `app.js`                       | Tilføyelser rundt linje 2654 (felter), 3044 (reset), 3074 (idb-write), 3097 (idb-read), og én ny seksjon med `openTileDb`, `tilesStore`, `sweepTileCache`, `schedulePrefetchAround`, `processPrefetchQueue`, `bindPrefetchPauseHandlers`. Plasseres etter linje 3109 (rett etter `queueNorgeCleanTile`) i en egen «// === LAG 2: IDB-CACHE + PREFETCH ===»-blokk. |

### Vil ikke bli rørt

| Fil / område                                            | Begrunnelse                                  |
| ------------------------------------------------------- | -------------------------------------------- |
| `index.html`                                            | Ingen nye DOM-noder eller script-tags        |
| `poc-rule1/index.html`                                  | Utenfor scope                                |
| `arkiv/v6-forkastet-2026-06-02/...`                     | Arkiv                                        |
| Alle CSS-filer                                          | Cache/prefetch er usynlig for brukeren       |
| Service worker / manifest                               | Eksplisitt nei (se §9)                       |
| Leaflet-konfig, kildedefinisjoner, transform-pipeline   | Utenfor Lag 2                                |

---

## 9. Av-bryter (debug-flagg i localStorage)

To uavhengige bryter, lest ved hver init og speilet til `meta.flags` for telemetri:

| Nøkkel                                  | Verdi                          | Effekt                                                                                          |
| --------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| `enok72.lag2.cache`                     | `'off'` slår av                | IDB åpnes ikke. `queueNorgeCleanTile` og `processNorgeCleanTileQueue` faller tilbake til ren RAM-cache som i dag. Prefetch slås automatisk av (avhenger av IDB). |
| `enok72.lag2.prefetch`                  | `'off'` slår av                | `schedulePrefetchAround` returnerer umiddelbart. IDB-cache fortsetter å virke.                  |
| `enok72.lag2.cache.budgetMb`            | tall, f.eks. `'128'`           | Overstyrer kvote-budsjettet (default 256 MB / 0.4 × storage.estimate)                           |
| `enok72.lag2.cache.ttlDays`             | tall, f.eks. `'7'`             | Overstyrer TTL (default 30 dager)                                                               |
| `enok72.lag2.cache.purge`               | `'1'` slår på engangs-purge    | Ved neste init dropps alt i `tiles`, deretter nullstilles flagget                               |

I tillegg avvises både cache og prefetch hvis `?lag2=off` finnes i URL-en
(query-param leses én gang ved init og brukes som hard kill-switch som overstyrer
localStorage). Dette gir oss en garantert vei tilbake til ren Lag 1-atferd uten å
måtte åpne devtools.

**Ingen tredjepartsbibliotek brukes.** All IndexedDB-tilgang skrives med
native API. Ingen `idb`, `localforage` e.l.

---

## 10. Akseptkriterier — sjekkliste

- [x] IndexedDB-skjema (db-navn, store-navn, key-format, verdi-format, indekser) — §2
- [x] Hvor cache-laget kobles inn (funksjoner + omtrentlige linjenummer) — §3
- [x] LRU + alder + kvote — §4
- [x] Prefetch: antall tiles utenfor synlig område, prioritet vs. live-kø, pause-regler — §5
- [x] Risiko og bivirkninger — §6
- [x] Hva som ikke endres — §7
- [x] Filer endret / urørt — §8
- [x] Av-bryter via localStorage (cache og prefetch hver for seg) + URL-kill-switch — §9
- [x] Ingen kode i denne leveransen, kun plan.
- [x] Ingen tredjepartsbibliotek foreslått.
- [x] Lag 1 og Lag 3 ikke berørt.

---

## 11. Neste runde (etter godkjenning)

Når systemutvikler har lest og kommentert, og Jone har godkjent, foreslår jeg at
patch-runden splittes i tre små PR-er på samme branch (eller tre commits):

1. IDB-skall: `openTileDb`, stores, `meta`, sweep — uten innkobling i pipelinen.
2. Cache-innkobling: lese-/skrive-kroker i `queueNorgeCleanTile` og
   `processNorgeCleanTileQueue`.
3. Prefetch: ny kø, pumpe, pause-handlers, kall fra `updateNorgeDetailTiles`.

Hver av de tre kan slås av med sitt eget flagg i §9 selv etter merge, slik at
Jone og systemutvikler kan rulle tilbake granulært uten revert.
