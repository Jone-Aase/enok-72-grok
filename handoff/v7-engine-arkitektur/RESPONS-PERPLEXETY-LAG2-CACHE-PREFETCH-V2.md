# Respons fra Perplexety: Lag 2 — persistent cache og prefetch (V2)

Status: revidert plan fra Perplexety etter kommentarer fra systemutvikler
([KOMMENTARER-PERPLEXETY-LAG2-RUNDE-1.md](https://github.com/Jone-Aase/enok-72-grok/blob/claude/v7-perplexety-lag2-kommentarer/handoff/v7-engine-arkitektur/KOMMENTARER-PERPLEXETY-LAG2-RUNDE-1.md)).
Base: `codex/v7-next-dev-source @ dc95a08`. Leveranse: ren markdown, ingen kode.

V2 endrer kun de seks punktene som ble kommentert. Alt øvrig i V1 står ved lag og
gjentas ikke i sin helhet — se [RESPONS-PERPLEXETY-LAG2-CACHE-PREFETCH.md](https://github.com/Jone-Aase/enok-72-grok/blob/perplexety/v7-lag2-cache-prefetch-plan/handoff/v7-engine-arkitektur/RESPONS-PERPLEXETY-LAG2-CACHE-PREFETCH.md)
for IDB-skjema (§2.1–2.4), innkoblingspunkter (§3), rydding (§4), risikoliste (§6),
forbudsliste (§7), urørt-liste (§8) og kill-switch (§9.0 `?lag2=off`).

Endringer i V2 markeres med «**(V2)**» i seksjonsoverskriftene.

---

## Endringsliste

| # | Tema                                      | V1-seksjon | V2-seksjon |
| - | ----------------------------------------- | ---------- | ---------- |
| 1 | Reell cache-treff-verifisering + fallback | §3.2, §6   | §A         |
| 2 | `revokeObjectURL` også i `onerror`        | §3.1, §6   | §B         |
| 3 | Tak på prefetch-køen + eksplisitt tømming | §5.1–5.2   | §C         |
| 4 | Kilde for `meta.version`                  | §2.5       | §D         |
| 5 | Chrome-bias på `navigator.connection`     | §5.3       | §E         |
| 6 | Hvert patch-steg skal kunne stå alene     | §11        | §F         |

---

## §A. Reell cache-treff-verifisering og fallback **(V2 — erstatter §3.2 «blob-henting» og tilhørende risiko-rad)**

### A.1 Bekymring fra runde 1

V1 forutsatte at `fetch(job.src, { cache: 'force-cache' })` etter `<img>.onload` ville
returnere fra HTTP disk-cache og ikke utløse ny nettverkstur. Det er en antagelse om
opprinnelsesserverens `Cache-Control`-headere. Hvis Kartverket, LMI Iceland, OSM eller
NIB sender `Cache-Control: no-store`, `no-cache` uten `must-revalidate`-respekt, eller
`Vary` på headere som ikke matcher, vil `force-cache` enten gå til nettet eller feile —
og vi dobler trafikken.

### A.2 Verifiseringstest (manuelt før patch-runden)

Før patch-runden starter, kjøres følgende test i Chrome DevTools på instrumentet:

1. Tøm disk-cache (`DevTools → Application → Storage → Clear site data`).
2. Last instrumentet på en posisjon som tegner tiles fra alle aktive kilder.
3. I `Network`-panelet, slå på `Disable cache = av` og filtrer på `Img`.
4. Etter at tiles er ferdig lastet, åpne `Console` og kjør for hver av de fire kildene
   et representativt URL-eksempel via `fetch(url, { cache: 'force-cache' })`.
5. Observer ny rad i `Network`. Forventet utfall pr. kilde:

| Kilde            | URL-mønster                                                       | Forventet `Size`-kolonne       | Forventet `Status` |
| ---------------- | ----------------------------------------------------------------- | ------------------------------ | ------------------ |
| Kartverket WMTS  | `cache.kartverket.no/v1/wmts/.../{z}/{y}/{x}.png` (app.js 3026/3041) | `(disk cache)`                 | `200` (fra cache)  |
| Iceland WMST     | `gis.natt.is/mapcache/sjokort/.../wmst?...` (app.js 3007/3033)       | `(disk cache)` eller realt svar | `200`              |
| OSM              | `tile.openstreetmap.org/{z}/{x}/{y}.png` (app.js 3004/3030)          | `(disk cache)`                 | `200`              |
| NIB              | `services.norgeibilder.no/wms/ortofoto?...` (app.js 3019)            | `(disk cache)` — usikker      | `200` eller `304`  |

For hver kilde noteres faktisk resultat i en kort logg som vedlegges patch-PR-en.

### A.3 Beslutning: blob via canvas, ikke ny fetch

På grunn av usikkerheten i A.1–A.2 endrer V2 strategi. Vi henter ikke blob via ny
`fetch`. Vi gjenbruker det bildet `<img>` allerede har dekodet, via følgende kjede
inne i `processNorgeCleanTileQueue.onload` (app.js linjer 3074–3082):

```
img.decode()
  → opprett OffscreenCanvas (eller HTMLCanvasElement fallback) på (img.naturalWidth, img.naturalHeight)
  → ctx.drawImage(img, 0, 0)
  → canvas.convertToBlob({ type: img.src.endsWith('.png') ? 'image/png' : 'image/jpeg', quality: 0.92 })
  → tilesStore.put({ ..., blob })
```

Egenskaper ved dette valget:

- **Null ekstra nettverkslast.** Vi bruker bildet som allerede ligger dekodet i RAM.
- **CPU-kost.** En 256×256 tile er ~196 KB rå pixel-data; `drawImage + convertToBlob`
  tar typisk 2–10 ms pr. tile på moderne maskinvare. Akseptabelt fordi steget
  planlegges inne i `requestIdleCallback` (samme som V1 §3.2).
- **CORS.** `<img>` må ha `crossOrigin = 'anonymous'` for at canvas-eksporten ikke
  skal `tainted`. Tiles uten CORS-headere kan ikke caches via denne ruten.

### A.4 Per-kilde CORS-strategi

Vi setter `img.crossOrigin = 'anonymous'` på alle nye `<img>` i den blokken som i dag
oppretter elementene (app.js linjer 3904–3915, mellom `document.createElement('img')`
og `queueNorgeCleanTile`). Dette er den eneste tilføyelsen utenfor §3.1–3.4-kroker
i V1, og er nødvendig for canvas-eksporten.

Per-kilde forventet CORS-oppførsel:

| Kilde            | `Access-Control-Allow-Origin` forventet | IDB-skriving aktiv? |
| ---------------- | --------------------------------------- | ------------------- |
| Kartverket WMTS  | `*` (verifisert i offentlig dokumentasjon) | Ja                  |
| Iceland WMST     | `*`                                     | Ja                  |
| OSM              | `*`                                     | Ja                  |
| NIB              | Ukjent — krever token                   | Nei (se §A.5)       |

### A.5 Fallback når canvas blir tainted

Hvis `canvas.convertToBlob` kaster `SecurityError` (tainted canvas) for en kilde:

1. Marker `sourceKey` i et per-sesjon `Set` `taintedSources`.
2. Send `bySource`-skriving via meta-status så vi ikke prøver igjen denne sesjonen
   for den kilden.
3. Logg én gang pr. kilde: `console.warn('[v7-lag2] canvas tainted — IDB-skriving av for', sourceKey)`.
4. RAM-cachen i `norgeCleanTileManager.cache` fortsetter å virke for kilden. Lag 1
   påvirkes ikke. Det betyr at reload mister cache for den kilden — det er
   akseptabelt, og bedre enn å risikere dobbel nettverkslast.

NIB (`wms-nib`) er allerede ekskludert fra prefetch (V1 §5.1) og settes som
default ekskludert også fra IDB-skriving inntil CORS-status verifiseres i A.2-testen.

### A.6 Konsekvens for risikolisten i V1 §6

Risiko-raden «Dobbel nettverkslast (img + fetch i §3.2)» fjernes — vi henter ikke
lenger via fetch. Den erstattes med:

| Risiko                                            | Vurdering | Mitigering                                                                     |
| ------------------------------------------------- | --------- | ------------------------------------------------------------------------------ |
| Canvas tainted (CORS mangler på enkeltkilde)      | Middels   | Per-kilde-detektering i §A.5, slå av IDB-skriving for kilden i denne sesjonen  |
| `OffscreenCanvas` ikke støttet (Safari < 16.4)    | Lav       | `typeof OffscreenCanvas !== 'undefined'` ⇒ HTMLCanvasElement-fallback          |
| `convertToBlob` ikke støttet                      | Lav       | `canvas.toBlob(cb, type, quality)` som fallback (samme semantikk, callback)    |
| CPU-spike på batch med mange tiles                | Middels   | All eksport går via `requestIdleCallback`; gi opp resten av batchen hvis idle deadline < 4 ms |

---

## §B. `revokeObjectURL` i alle exit-grener + `img.decode()` **(V2 — strammer V1 §3.1 idb-treff-grenen)**

### B.1 Krav

Når IDB-treff i `queueNorgeCleanTile` (app.js linje 3097–3109) gjør
`URL.createObjectURL(blob)`, må `URL.revokeObjectURL(blobUrl)` kalles i **begge**
exit-grenene for det `<img>`-elementet — `onload` og `onerror` — slik at vi ikke
lekker objectURL-er.

### B.2 Konkret idb-treff-flyt i V2

For en IDB-treff-jobb fra §3.1 i V1 blir flyten:

1. `tilesStore.get(key)` returnerer en rad med `blob`.
2. Verifiser `job.batch === norgeCleanTileManager.currentBatch`. Hvis ikke, kast.
3. `const blobUrl = URL.createObjectURL(blob)`.
4. `img.crossOrigin = 'anonymous'` settes ikke på nytt — det er allerede satt fra
   §A.4 da elementet ble opprettet. (`crossOrigin` har ingen effekt på
   `blob:`-URL-er, men er trygt å la stå.)
5. Definer en lokal `cleanup = () => URL.revokeObjectURL(blobUrl)`.
6. `img.onload = () => { rememberNorgeCleanTile(job.src); img.dataset.loadedSrc = job.src; norgeCleanTileManager.fromIdb += 1; queueMicrotask(cleanup); refreshNorgeCleanLoadStatus(); }`.
7. `img.onerror = () => { norgeCleanTileManager.idbDecodeFailed += 1; cleanup(); /* fall tilbake: legg jobb på live-køen */ }`.
8. Bruk `img.decode()` der det er tilgjengelig: `img.decode().then(onload, onerror)` — sett `img.src = blobUrl` rett etter. `decode()` venter på fullført dekoding før vi kaller `cleanup`, slik at vi ikke `revoke`-er en URL mens nettleseren fortsatt dekoder.

### B.3 Hvorfor `queueMicrotask` og ikke synkron revoke i `onload`

Synkron `URL.revokeObjectURL` inni selve `onload`-handleren er trygt i de fleste
nettlesere i dag, men har historisk hatt edge-cases der bildet ikke blir vist.
`queueMicrotask(cleanup)` (eller `setTimeout(cleanup, 0)` som fallback for eldre
miljøer) flytter revoke til neste tick og er en kjent trygg idiom.

### B.4 Fallback når `img.decode()` ikke finnes

`img.decode()` finnes i alle nyere Chromium/Safari/Firefox. Fallback:
`img.onload = ...; img.onerror = ...; img.src = blobUrl` — uten `decode()`-Promise,
men med `queueMicrotask(cleanup)` i `onload`.

### B.5 onerror i idb-treff-grenen → fallback til live-kø

Hvis `decode()`/`onerror` feiler på en blob fra IDB (sjelden — typisk korrupsjon
eller skjemafeil), gjør vi to ting:

1. Slett raden fra `tilesStore` slik at vi ikke prøver den igjen.
2. Push jobben på den vanlige live-køen som om RAM/IDB-snarveiene ikke fantes.
   Dette gir oss en garantert vei til skjerm.

Inkrementer `norgeCleanTileManager.idbDecodeFailed` for telemetri.

### B.6 Konsekvens for risikolisten i V1 §6

Erstatt raden «`objectURL` ikke `revoke`-et» med:

| Risiko                                                  | Vurdering | Mitigering                                                              |
| ------------------------------------------------------- | --------- | ----------------------------------------------------------------------- |
| `objectURL`-lekkasje                                    | Lav       | `cleanup` kalles fra både `onload` og `onerror` via `queueMicrotask`    |
| `img.decode()` aldri resolver (korrupt blob)            | Lav       | `onerror`-grenen river raden, faller tilbake til live-køen              |

---

## §C. Tak på prefetch-køen + eksplisitt tømming **(V2 — strammer V1 §5.1–5.2)**

### C.1 Bekreftelse: prefetch er en ring, ikke en region

Prefetch-jobbene i V1 §5.1 er per definisjon **kun** de tile-koordinatene som ligger
utenfor live-rangen (`tileRange` etter `expandNorgeTileRange`, app.js linjer 3753–3773)
og innenfor ringen `prefetchPad`. Det er en differansering — `prefetchRange \ tileRange`.

Prefetch-køen akkumuleres ikke over tid: hver gang `updateNorgeDetailTiles`
(app.js linje 3775) kalles, opprettes prefetch-jobbene på nytt for den nye
`tileRange`.

### C.2 Hard øvre grense på prefetch-køen

I tillegg til ringens naturlige avgrensning legger vi inn et eksplisitt tak:

```
PREFETCH_QUEUE_MAX = 256 jobber
```

Begrunnelse: ringtellingen er `(rangeBredde + 2·pad)·(rangeHøyde + 2·pad) − rangeBredde·rangeHøyde`. For
en typisk live-range på 12×8 ved z = 14 (pad = 8) blir det
`28·24 − 12·8 = 672 − 96 = 576` ekstra tiles per kilde. Det er for mange. Vi sorterer
prefetch-ringen etter avstand fra range-senter (samme metrikk som V1 §3.4-prioritet)
og kutter ved 256.

Dette gir oss en garantert grense på minneforbruk og samtidige IDB-skrivinger
uavhengig av zoom-nivå og antall kilder.

### C.3 Eksplisitt tømming, ikke bare batch-invalidering

V1 lente seg på `job.batch !== currentBatch`-sjekken (samme mønster som
`processNorgeCleanTileQueue`, app.js linje 3069) for å «retire» gamle prefetch-jobber.
V2 strammer dette:

Når `resetNorgeCleanTileQueue` kalles (app.js linje 3044, inngang til ny batch i
`updateNorgeDetailTiles` linje 3863), gjør vi tre ting i prefetch-laget:

1. **Eksplisitt tømming:** `norgeCleanTileManager.prefetchQueue.length = 0`.
2. **Abort av in-flight:** `prefetchAbortController.abort(); prefetchAbortController = new AbortController()`.
   Hver in-flight prefetch-`fetch` (eller hva strategien fra §A.3 nå bruker —
   prefetch-laget bruker faktisk `fetch` siden det ikke har et `<img>` å gjenbruke,
   se §C.5) lyttet til `signal: prefetchAbortController.signal`.
3. **Nullstilling av tellere:** `prefetched`, `prefetchSkipped`, `prefetchAborted`
   nullstilles ved siden av V1-tellerne.

Dette gir tre garantier som batch-flagget alene ikke gir:

- Minne frigjøres umiddelbart i stedet for å vente på at idle-pumpen prosesserer ferdig.
- Pågående nettverk-kall blir kansellert, ikke bare ignorert ved retur.
- Prefetch-køen kan ikke vokse over `PREFETCH_QUEUE_MAX` mellom to batch-byttinger.

### C.4 Prefetch-prioritet er en separat akse

Prefetch-jobbenes interne prioritet er fortsatt avstand fra range-senter (V1 §3.4).
Men prefetch-jobber blir aldri sortert inn i live-køen — de holder seg i
`prefetchQueue` og pumpes av `processPrefetchQueue` (V1 §5.2). Live-prioritet og
prefetch-prioritet er to ortogonale tall.

### C.5 Prefetch må bruke `fetch`, ikke canvas

I motsetning til IDB-skrivingen i §A (som gjenbruker `<img>` etter visning), har
prefetch-laget ingen synlig `<img>`. Strategiene er da:

- **Strategi 1:** `fetch(src, { signal })` → `r.blob()` → `tilesStore.put`. Enklest,
  ett nettverkskall pr. tile, ingen DOM. Bruker samme `Cache-Control`-bekymring som
  i V1 §3.2, men her er det per definisjon én nettverkstur (ikke en dobbel) fordi
  bildet ikke er hentet enda.
- **Strategi 2:** Opprett en `Image` uten å feste den til DOM, sett
  `crossOrigin = 'anonymous'`, sett `src`, vent på `decode()`, eksporter via canvas
  som i §A.3. Mer CPU, men gir oss konsistent blob-kilde og verifiserer CORS før
  vi skriver.

**Beslutning:** Vi bruker **Strategi 1** for prefetch. Begrunnelse: prefetch er
en optimisering — om en kilde mangler `Cache-Control` slik at fetch-laget alltid
går til nett, har det fortsatt verdi (vi lagrer blobben i IDB for senere reload),
og kostnaden er én tile-tur som ellers ville skjedd ved pan uansett. Strategi 2
ville gitt oss to nettverkskall hvis brukeren panner inn på tilen før prefetch
er ferdig (én for prefetch, én for img-elementet).

### C.6 Konsekvens for V1 §5.2 punkt 4

Endring av V1 §5.2 punkt 4 fra «AbortController» som hint til konkret krav:

> Prefetch-laget har én global `prefetchAbortController`. Hver
> `fetch(src, { signal: prefetchAbortController.signal })`-call deler den. På
> `resetNorgeCleanTileQueue` (linje 3044), `movestart`/`zoomstart` (V1 §5.3), og
> `visibilitychange → hidden` kalles `prefetchAbortController.abort()` og en ny
> opprettes.

---

## §D. `meta.version` — konkret kilde **(V2 — erstatter V1 §2.5)**

### D.1 Bekreftelse: ingen eksisterende build-konstant

Søk i `app.js @ dc95a08` etter `VERSION`, `BUILD`, `GENERATION`, `SCHEMA` viser kun
WMS-protokollstrenger (`'SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap'` på linjene 3008,
3020, 3034) og en `console.info('[v7-clean-lab] ...')` på linje 3939. Det finnes
ingen eksisterende app-bygg-konstant vi kan resirkulere.

### D.2 To uavhengige konstanter

Vi innfører to manuelt vedlikeholdte konstanter helt øverst i den nye
«// === LAG 2: IDB-CACHE + PREFETCH ===»-blokken (etter app.js linje 3109):

```
const LAG2_SCHEMA_VERSION = 1;
const LAG2_DATA_GENERATION = 1;
```

Forskjellen mellom dem:

| Konstant                | Når den økes manuelt                                                                          | Effekt ved bump                                       |
| ----------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `LAG2_SCHEMA_VERSION`   | Når IDB-skjemaet endres (nye stores, nye indekser, endret nøkkelformat, endret blob-koding)   | `onupgradeneeded` kjører migrasjon (eller drop-all)   |
| `LAG2_DATA_GENERATION`  | Når Lag 1 endrer noe som påvirker tile-innhold for samme `src` (URL-mønster, kildelag, transform) | Hele `tiles`-storen tømmes ved init                   |

### D.3 Lagring og sammenligning

Ved init leses `meta`-storen:

- Hvis `meta.schemaVersion !== LAG2_SCHEMA_VERSION` → kjør migrasjon (V2 standard:
  drop-all, gjenoppbygg), skriv ny `schemaVersion`.
- Hvis `meta.dataGeneration !== LAG2_DATA_GENERATION` → tøm `tiles` (RAM-cachen
  nullstilles også ved sesjonsstart, så ingen ekstra handling), skriv ny
  `dataGeneration`.
- Begge sjekker er uavhengige og kan trigge i samme init.

### D.4 Hvordan endringer i Lag 1 trigger en bump

Prosessen, beskrevet for fremtidige patch-runder:

1. Hvis en patch endrer URL-mønsteret i `cleanDetailTileUrl` eller `detailTileUrl`
   (app.js linjer 3003, 3029), eller endrer hvilke `source.layer`-verdier som
   regnes som «clean», skal patch-eieren samme commit øke
   `LAG2_DATA_GENERATION` med 1.
2. Hvis IDB-skjemaet endres (f.eks. ny indeks `byEtag`), skal patch-eieren samme
   commit øke `LAG2_SCHEMA_VERSION` med 1 og legge migrasjonen i
   `onupgradeneeded`.
3. PR-mal får et avkrysningspunkt: «Endrer denne PR-en tile-URL-mønster eller
   IDB-skjema? Hvis ja, har du bumpet riktig konstant?» Sjekkes manuelt ved review.

### D.5 Hvorfor ikke automatisk git-SHA

Som systemutvikler påpekte: git-SHA krever build-pipeline som projektet ikke har
i dag. Vi vil ikke introdusere en avhengighet. To manuelt vedlikeholdte heltall i
toppen av Lag 2-blokken er enkelt, lesbart i diff, og spores i git-historikk
uansett.

### D.6 Konsekvens for V1 §2.5

V1 §2.5 sa «`meta.version` matcher `APP_BUILD`». V2 erstatter med:
to felter `meta.schemaVersion` og `meta.dataGeneration`, hver med sin egen
konstant og sin egen effekt.

---

## §E. Chrome-bias på `navigator.connection` **(V2 — strammer V1 §5.3)**

### E.1 Bekreftelse: asymmetri er bevisst

`navigator.connection.saveData` og `navigator.connection.effectiveType` er per
2025/2026 fortsatt kun støttet i Chromium-baserte nettlesere
([MDN: NetworkInformation](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)).
Firefox og Safari returnerer `undefined` på `navigator.connection`, og optional
chaining gir `undefined` videre — ingen krasj, men ingen respekt for saveData heller.

Asymmetrien er bevisst akseptert for første versjon:

- **Chromium-brukere:** Prefetch slås av hvis `saveData === true` eller
  `effectiveType ∈ {'slow-2g','2g'}`. Mer hensynsfullt for mobil-nett.
- **Firefox/Safari-brukere:** Prefetch kjører alltid, modulo de øvrige pause-reglene
  (visibility, movestart/zoomstart, debug-flagg).

Dette er ikke et brudd på spec — det er en best-effort optimisering på Chromium og
en no-op andre steder. Brukerne kan slå av prefetch via `enok72.lag2.prefetch=off`
uavhengig av nettleser.

### E.2 Battery API droppes

`navigator.getBattery()` er kun støttet i Chromium og er deprecated i mange
sammenhenger. Vi tar det ikke inn i V2. Visibility (`document.visibilityState`),
som er universelt støttet, dekker det viktigste use-caset (bakgrunns-fane sluker
ikke båndbredde og batteri).

### E.3 Eksplisitt dokumentert beslutning

Følgende setning legges inn i Lag 2-blokken som kommentar (i den endelige patchen,
ikke i denne planen — denne planen er ingen kode):

> «Prefetch respekterer `navigator.connection.saveData`/`effectiveType` der det er
> tilgjengelig (Chromium). Firefox/Safari-brukere får prefetch styrt av
> visibility + Leaflet-events. Akseptert asymmetri for v1.»

### E.4 Avsluttende fallback for alle nettlesere

Uavhengig av Network Information API: hvis tre påfølgende prefetch-`fetch` for samme
sesjon feiler (timeout, 5xx, network error), settes
`prefetchPausedUntil = Infinity` for resten av sesjonen og en `console.warn`
loggjøres. Dette er en universell heuristikk som beskytter mot at en treig kilde
sluker ressurser også for Firefox/Safari-brukere.

### E.5 Konsekvens for V1 §5.3

V1 §5.3 punktlisten beholdes med følgende presisering tillagt:

- Network Information API-sjekkene er Chromium-only. Asymmetri er bevisst.
- Battery API brukes ikke.
- Tre påfølgende prefetch-feil ⇒ prefetch slås av for resten av sesjonen.

---

## §F. Hvert patch-steg skal kunne stå alene **(V2 — strammer V1 §11)**

### F.1 De tre stegene er uavhengig kjørbare

Hvert steg landes som egen commit på samme branch og skal kunne være tip-of-branch
uten å bryte instrumentet. Etter steg N skal `app.js` kompilere, instrumentet
laste, og Lag 1/Lag 3 oppføre seg uendret. Lag 2 skrur seg gradvis på.

### F.2 Steg 1 — IDB-skall

**Mål:** IDB åpnes, stores opprettes, sweep kjører, men ingen tiles skrives eller
leses fra IDB.

**Tilstand etter steg 1:**

- `enok72-tiles`-databasen finnes etter første sidelast.
- `tiles`-storen er tom.
- `meta`-storen har `schemaVersion = 1`, `dataGeneration = 1`,
  `quota = { bytesUsed: 0, bytesBudget: <computed>, lastSweepAt: <now> }`.
- `sweepTileCache` har kjørt minst én gang (no-op, men beviser at den fungerer).
- `norgeCleanTileManager` har nye tellere null-stilt: `fromIdb`, `idbWriteFailed`,
  `idbDecodeFailed`, `prefetched`, `prefetchSkipped`, `prefetchAborted`.
- **`enok72.lag2.cache` standardverdi for steg 1: `'shadow'`** — IDB åpnes, sweep
  kjører, men `queueNorgeCleanTile` (linje 3097) og
  `processNorgeCleanTileQueue.onload` (linje 3074) gjør **ikke** IDB-lookup eller
  IDB-skriving. Lag 1/Lag 3 helt urørt fra brukerens perspektiv.
- `enok72.lag2.prefetch` ignoreres i steg 1.

**Verifikasjon før merge til codex/v7-next-dev-source:**

- Last instrumentet, åpne `Application → IndexedDB → enok72-tiles` i DevTools, se at
  databasen finnes og `meta` er fylt.
- Skru `enok72.lag2.cache=off` i localStorage og reload — verifiser at databasen
  ikke åpnes (sjekk DevTools).
- Skru `?lag2=off` i URL — verifiser samme som over.

### F.3 Steg 2 — cache-innkobling

**Mål:** Lese- og skrive-kroker i `queueNorgeCleanTile` (linje 3097) og
`processNorgeCleanTileQueue.onload` (linje 3074) aktiveres.

**Endring fra steg 1:** `enok72.lag2.cache` default skifter fra `'shadow'` til `'on'`.
Brukere som tidligere hadde `'off'` eller `'shadow'` i localStorage beholder sin
verdi.

**Tilstand etter steg 2:**

- IDB-treff returnerer blob → `<img>` får `blob:` URL → ingen nettverkstur.
- `<img>.onload` etter live-load eksporterer via canvas (§A.3) og skriver til IDB
  i idle.
- `revokeObjectURL` kalles i alle exit-grener (§B).
- `LAG2_DATA_GENERATION` brukes for å invalidere ved URL-mønster-endring (§D).
- Prefetch er fortsatt **ikke** aktiv. `enok72.lag2.prefetch` ignoreres.

**Verifikasjon:**

- Last instrumentet, pan rundt, reload, verifiser at tiles serveres fra IDB ved
  reload (telle `fromIdb` i konsoll-logg, eller `Network`-panelet viser ingen img-trafikk).
- Skru `enok72.lag2.cache=off` og reload — verifiser at instrumentet oppfører seg
  som V0 (Lag 1 alene).
- Skru `enok72.lag2.cache=on` mens fanen er åpen — krever full reload for effekt;
  dokumenter dette i flagg-tabellen.

### F.4 Steg 3 — prefetch

**Mål:** Prefetch-kø, prefetch-pumpe, og pause-handlers aktiveres. Steg 2 ligger i
bunn og fanger opp prefetch-skrivinger.

**Endring fra steg 2:** `enok72.lag2.prefetch` default skifter fra `'off'` til `'on'`.

**Tilstand etter steg 3:**

- `schedulePrefetchAround` kalles fra `updateNorgeDetailTiles` (etter linje 3929).
- `processPrefetchQueue` pumper med maks 4 samtidige.
- Pause-handlers bundet til Leaflet `movestart`/`zoomstart`/`moveend`/`zoomend` og
  `document.visibilitychange`.
- `PREFETCH_QUEUE_MAX = 256` enforces.
- `prefetchAbortController.abort()` kalles på batch-bytte og pan/zoom-start.

**Verifikasjon:**

- Last instrumentet på Bergen, vent på prefetch-ring rundt, pan til Oslo —
  verifiser at Oslo-tiles allerede ligger i IDB der ringen overlappet.
- Skru `enok72.lag2.prefetch=off` — verifiser at ingen prefetch-jobber kjøres
  (tell `prefetched` i konsoll), men steg 2-cachen virker fortsatt.

### F.5 Rollback-matrise

| Tilstand                                            | Lag 1 | Lag 2 cache | Lag 2 prefetch | Effekt                                |
| --------------------------------------------------- | ----- | ----------- | -------------- | ------------------------------------- |
| Etter steg 1 (default)                              | På    | Shadow      | Av             | Helt som V0                           |
| Etter steg 2 (default)                              | På    | På          | Av             | Cache aktiv, ingen prefetch           |
| Etter steg 3 (default)                              | På    | På          | På             | Full Lag 2                            |
| `?lag2=off` (når som helst)                         | På    | Av          | Av             | Garantert V0-atferd                   |
| `enok72.lag2.cache=off` + `enok72.lag2.prefetch=off` | På    | Av          | Av             | Samme                                 |
| `enok72.lag2.cache=off` + `enok72.lag2.prefetch=on`  | På    | Av          | Av (auto)      | Prefetch slås av når cache er av      |
| `enok72.lag2.cache=on` + `enok72.lag2.prefetch=off`  | På    | På          | Av             | Cache uten prefetch (mellomgear)      |

### F.6 PR-håndtering

- Tre commits på samme branch `perplexety/v7-lag2-cache-prefetch-plan-v2-patch`
  (eller den branch Jone velger), én pr. steg.
- Hver commit har egen PR-beskrivelse med verifikasjons-sjekkliste fra F.2/F.3/F.4.
- Hvis Jone vil revertere ett steg, kan han revertere én commit; de andre to
  blir stående uten å gå i stykker (skrudd av via flagg-defaults).

---

## Hva fra V1 som står uendret

For fullstendighet — disse seksjonene fra V1 gjelder uendret og er ikke gjentatt:

- **§1 Mål og avgrensning** — uendret.
- **§2.1–2.4 IDB-skjema (db-navn, stores, key-format, indekser)** — uendret.
- **§2.5** erstattes av §D over.
- **§3.1–3.4 Innkoblingspunkter (linje 3097, 3074, 3044, 3929)** — uendret, med
  presiseringer fra §A, §B, §C der angitt.
- **§4 Rydding (LRU + alder + kvote)** — uendret.
- **§5.1 Hva som prefetches** — uendret bortsett fra taket i §C.
- **§5.2 Prioritet og kø-isolasjon** — uendret bortsett fra eksplisitt tømming i §C.3.
- **§5.3 Når prefetch pauses helt** — uendret bortsett fra Chromium-presisering i §E.
- **§5.4 Hva prefetch faktisk gjør** — uendret bortsett fra fetch-vs-canvas-valget i §C.5.
- **§6 Risiko og bivirkninger** — uendret med oppdaterte rader fra §A.6 og §B.6.
- **§7 Hva som ikke endres** — uendret.
- **§8 Filer som vil bli endret / ikke endret** — uendret. Eneste fil endret er
  fortsatt `app.js`.
- **§9 Av-bryter i localStorage** — uendret. `?lag2=off` står som hard kill-switch.
  Default-verdier per steg er beskrevet i §F.
- **§10 Akseptkriterier** — uendret. Alle punkter fortsatt oppfylt.

---

## Akseptkriterier for V2

- [x] Punkt 1 (reell cache-treff-verifisering + fallback) — §A
- [x] Punkt 2 (`revokeObjectURL` i alle grener + `img.decode()`) — §B
- [x] Punkt 3 (tak på prefetch-kø + eksplisitt tømming) — §C
- [x] Punkt 4 (konkret kilde for `meta.version`) — §D
- [x] Punkt 5 (Chrome-bias på `navigator.connection`) — §E
- [x] Punkt 6 (hvert patch-steg står alene) — §F
- [x] Alt fra V1 som ikke er kommentert er beholdt.
- [x] Ingen kode i denne runden.
- [x] Ingen tredjepartsbibliotek foreslått.
- [x] Lag 1 og Lag 3 fortsatt urørt.

---

## Neste steg

Systemutvikler leser V2 og innstiller til Jone. Patch-runden starter først når
Jone gir grønt lys. Patch-stegene følger §F-rekkefølgen og merges hver for seg.
