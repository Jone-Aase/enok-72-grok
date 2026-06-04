# Plan: Lag 2 rebase og paritet mot Lag 1 (Trinn 1+2+3)

Branch: `perplexety/v7-lag2-rebase-og-paritet-plan`
Base: `codex/v7-lag1-trinn1-2-3-merged @ d5e69f4c966f852087fa25171f87b13839234cf0`
Status: Plan, ingen kode. Til review av systemutvikler og Codex, godkjenning av Jone.

Lag 2 sine fire branchen (`steg1`, `steg2`, `steg2b`, `steg3`) sitter i dag oppå
`dc95a08`. Lag 1 har lagt tre godkjente trinn oppå baseline (`3dd192e`) og samlet
dem i `codex/v7-lag1-trinn1-2-3-merged @ d5e69f4`. Denne planen beskriver hvordan
Lag 2 rebases opp på den nye basen, hvilke konflikter som forventes, hvordan de
løses, og tre paritetsendringer Lag 2 skal gjøre samtidig for å holde den nye
Lag 1-kontrakten konsistent.

Ingen kode i denne leveransen.

## Innhold

1. Mål og avgrensning
2. Konfliktanalyse mot d5e69f4
3. Paritet 1: `loadedZ` i Lag 2 IDB-treff-gren
4. Paritet 2: parent-fallback kompatibilitet
5. Paritet 3: nye baseline-kilder (Danmark, Sverige)
6. Rebase-strategi og branch-håndtering
7. Det jeg ikke gjør i denne runden
8. Akseptkriterier
9. Anbefalt kodebranch etter godkjenning

---

## 1. Mål og avgrensning

Rebasen skal gi oss fire Lag 2-branchen oppå `d5e69f4` med:

- Bakoverkompatible kroker i `queueNorgeCleanTile` og
  `processNorgeCleanTileQueue.onload`
- Pikselidentisk måle-modus når Lag 2 er av eller i kill-switch
- `window.__enok72__.lag2Exporting` koordineringsflagg uendret
- Ingen endring av Lag 1-symboler eller låste områder
- Tre små paritetsendringer som matcher Codex sin nye kontrakt

Avgrensning: planen dekker rebase + paritet. Den dekker **ikke**:

- Bytte fra `norgeCleanTileManager`-lesing til `window.__enok72__.lag1Status`
  (avventer Codex sin Trinn 5)
- IDB-skriving etter freeze hoppes over (vente, ikke kritisk)
- Parent-fallback fra IDB (eksplisitt utenfor Trinn 3-planens scope)
- Lag 2 sin egen prefetch-flyttekrok ved porsjonert
  `updateNorgeDetailTiles` (avventer at Codex porsjonerer)

## 2. Konfliktanalyse mot d5e69f4

Jeg har inspisert den nye basen funksjon for funksjon. Konfliktene er kartlagt
mot de fire Lag 2-stegene mine.

### 2.1 `resetNorgeCleanTileQueue` (linje 3228)

Lag 1 har lagt til seks linjer (`fallbackHits`, `fallbackMisses`, `queueYielded`,
`yieldCount`, `lastPumpMs`, `cancelAnimationFrame(queuePumpTimer)`).
Lag 2 steg 2 + steg 3 legger til:

- Tre tellere (`fromIdb`, `idbWriteFailed`, `idbDecodeFailed`)
- Eksplisitt prefetch-kø-tømming og abort av `prefetchAbortController`
- Tre prefetch-tellere (`prefetched`, `prefetchSkipped`, `prefetchAborted`)
- `lastLiveActivityAt = Date.now()`

Konflikt: middels. Begge legger linjer i samme funksjon. Løsning: manuell flett
slik at Lag 1 sine linjer ligger først, deretter Lag 2 sine. Ingen
gjensidig overlapping.

### 2.2 `processNorgeCleanTileQueue` (linje 3334)

Lag 1 har innført frame-budget, deadline-sjekk, `requestAnimationFrame`-pump,
`removeNorgeCleanParentFallback(img)` i `onload`, og `loadedZ`-setting i `onload`.
Lag 2 steg 2 legger inn:

- IDB-skriving via `lag2ScheduleIdle` + `lag2WriteTileFromImg` etter
  `rememberNorgeCleanTile(job.src)` i `onload`

Konflikt: lav. Lag 1 sitt `removeNorgeCleanParentFallback(img)` på linje 3358
og `loadedZ`-setting på linje 3357 ligger før mitt innskudd skal plasseres.
Min IDB-skriving plasseres etter `rememberNorgeCleanTile`, mellom
`removeNorgeCleanParentFallback` og `processNorgeCleanTileQueue()`-rekursjons-
kallet.

### 2.3 `queueNorgeCleanTile` (linje 3384)

Lag 1 har endret signaturen indirekte via at `qualityGap` beregnes inni
funksjonen fra `img.dataset.z` og `img.dataset.loadedZ`. RAM-cache-grenen
setter nå også `img.dataset.loadedZ = img.dataset.z || ''` på linje 3390.
Jobben får tre nye felter (`targetZ`, `availableZ`, `qualityGap`, `priorityScore`).

Lag 2 steg 2 endrer signaturen til `queueNorgeCleanTile(img, src, priority = 0, meta = null)` og legger til:

- Et utvidet `job`-objekt med `sourceKey`, `z`, `x`, `y`, `lag2Key`, `lag2Excluded`
- En IDB-lookup-gren før push til kø

Konflikt: høy. Begge utvider jobbobjektet og legger inn logikk i samme funksjon.
Løsning: sammenslå begge jobbobjektene til ett objekt med alle felter, behold
Lag 1 sin `priorityScore`-beregning og Lag 2 sin IDB-lookup-gren. Signaturen
forblir `queueNorgeCleanTile(img, src, priority = 0, meta = null)` (bakoverkompatibel).

### 2.4 `updateNorgeCleanDetailTiles` `<img>`-blokken (linje 4213–4232)

Lag 1 har innført fallback-kall:

```
if (!norgeCleanTileManager.cache.has(job.src)) {
  const fallback = addNorgeCleanParentFallback(img, job.source, zoom, job.x, job.y);
  if (fallback) job.pane.appendChild(fallback);
}
queueNorgeCleanTile(img, job.src, job.priority);
job.pane.appendChild(img);
```

Lag 2 steg 2 endret samme blokk til:

```
if (Lag 2 aktiv && ikke ekskludert) img.crossOrigin = 'anonymous';
queueNorgeCleanTile(img, job.src, job.priority, { sourceKey, z, x, y, lag2Excluded });
```

Konflikt: middels. Begge utvider samme blokk. Løsning: rekkefølge etter rebase:

1. Sett `img.crossOrigin = 'anonymous'` hvis Lag 2 aktiv på + ikke ekskludert/tainted
2. Lag 1 sitt fallback-kall (`addNorgeCleanParentFallback` + `pane.appendChild(fallback)`)
3. `queueNorgeCleanTile(img, job.src, job.priority, meta)` med Lag 2 meta-objekt
4. `job.pane.appendChild(img)`

Rekkefølgen er viktig: CORS-attributtet må settes før `queueNorgeCleanTile`
fordi `lag2TryServeFromIdb` kan sette `img.src = blobUrl` umiddelbart inne i
queue-kallet (cache-hit).

### 2.5 Trinn 2 sortering (linje 4234)

Lag 1 har endret `norgeCleanTileManager.queue.sort((a, b) => a.priority - b.priority)`
til `norgeCleanTileManager.queue.sort(compareNorgeCleanTileJobs)`. Lag 2 steg 2
rørte ikke denne linjen. Ingen konflikt — Lag 1 sin endring blir stående.

### 2.6 `currentBatch`-økning ved batch-bytte

Lag 1 har samme `norgeCleanTileManager.currentBatch += 1` på linje 3231. Lag 2
steg 2 legger til prefetch-batch-snapshot og freeze-wait-batch-snapshot. Ingen
konflikt — disse er additive.

### 2.7 schedulePrefetchAround-krok etter processNorgeCleanTileQueue()

Lag 2 steg 3 plasserer `schedulePrefetchAround(tileRange, zoom, sources)` rett
etter `processNorgeCleanTileQueue()` nederst i `updateNorgeCleanDetailTiles`.
Lag 1 har ikke endret denne linjen i Trinn 1+2+3. Ingen konflikt.

Codex har i Trinn 2-planen flagget at hvis `updateNorgeDetailTiles()` senere
porsjoneres, må kroken min flyttes til etter siste porsjon eller bindes til en
idle-event. Trinn 2-koden porsjonerer ikke funksjonen, kun kø-pumpen. Derfor
ingen flyttekrav nå. Notert for senere.

### 2.8 Oppsummering konfliktnivå

| Funksjon | Konfliktnivå | Løsbarhet |
|---|---|---|
| `resetNorgeCleanTileQueue` | Middels | Manuell flett, ingen overlapping |
| `processNorgeCleanTileQueue` | Lav | Innskudd i ulike linjer |
| `queueNorgeCleanTile` | Høy | Sammenslå jobbobjekt, ren manuell flett |
| `updateNorgeCleanDetailTiles <img>` | Middels | Rekkefølge må fastsettes |
| Trinn 2 sortering | Ingen | Lag 1 vinner uten kollisjon |
| `currentBatch` | Ingen | Additive |
| `schedulePrefetchAround`-krok | Ingen | Ingen kollisjon |

Alle konflikter er mekaniske. Ingen krever endring av Lag 1-semantikk eller
Lag 2-kontrakt.

## 3. Paritet 1: `loadedZ` i Lag 2 IDB-treff-gren

Codex har i Trinn 2 innført `img.dataset.loadedZ` som tracker hvilket
zoom-nivå en `<img>` faktisk inneholder. Settes i:

- `processNorgeCleanTileQueue.onload` (nett-lasting)
- `queueNorgeCleanTile` RAM-cache-gren

Mitt Lag 2 steg 2 har en tredje vei inn: `lag2TryServeFromIdb` setter
`img.src = blobUrl` ved IDB-hit. Denne grenen setter `dataset.loadedSrc`
men ikke `dataset.loadedZ`.

Konsekvens uten paritet: IDB-serverte tiles vil mangle `loadedZ`, og hvis
en senere `queueNorgeCleanTile` ser samme `<img>`, vil `qualityGap` regnes
som 0 i stedet for nøyaktig 0 (riktig nivå). Ikke en funksjonell feil,
men en asymmetri Codex sin kontrakt forventer skal være konsistent.

### Endring i `lag2TryServeFromIdb.onOk`

I dag (steg 2):

```
const onOk = () => {
  ...
  job.img.dataset.loadedSrc = job.src;
  rememberNorgeCleanTile(job.src);
  norgeCleanTileManager.fromIdb += 1;
  ...
};
```

Etter paritet:

```
const onOk = () => {
  ...
  job.img.dataset.loadedSrc = job.src;
  job.img.dataset.loadedZ = job.img.dataset.z || '';
  rememberNorgeCleanTile(job.src);
  norgeCleanTileManager.fromIdb += 1;
  ...
};
```

Én linje. Plasseres etter `loadedSrc`-setting og før `rememberNorgeCleanTile`,
slik at både Lag 1 og Lag 2 ser samme datasett.

Ingen tilsvarende endring i `onerror`-grenen — der fjernes IDB-raden og
fallback til live-kø trigges, slik at `loadedZ` settes av live-pipelinen.

## 4. Paritet 2: parent-fallback kompatibilitet

Trinn 3 sin `addNorgeCleanParentFallback` plasserer en `<div>` med
`background-image` bak `<img>`-elementet. Den slår opp parent-src i
`norgeCleanTileManager.cache` (RAM).

Min Lag 2 IDB-cache vil i mange tilfeller ha parent-tiles selv om RAM-cachen
ikke har dem (etter reload, eller etter at RAM-cachen har rotert ut gamle
tiles). Trinn 3-planen sier eksplisitt at IDB-fallback er **utenfor scope**
for Trinn 3. Jeg respekterer dette.

### Hva paritet 2 dekker

Ingen kode-endring i denne runden. Kun en eksplisitt verifisering at:

1. `addNorgeCleanParentFallback` kalles **før** `queueNorgeCleanTile` i
   `updateNorgeCleanDetailTiles`-løkken. Hvis Lag 2 sin IDB-lookup i
   `queueNorgeCleanTile` umiddelbart setter `img.src = blobUrl` på et
   cache-treff, vil `<img>` onload fyre raskt og
   `removeNorgeCleanParentFallback(img)` rydder fallback. Fallback blir
   synlig i 0–1 frames. Akseptabelt.

2. Fallback-`<div>` er aldri en `<img>` og passerer aldri gjennom Lag 2 sin
   `lag2WriteTileFromImg`-krok. Bekreftet i Trinn 3-diffen.

3. Fallback-`<div>` har ingen `crossOrigin`-attributt (kun `<img>`) og bruker
   CSS `background-image`-CORS-default. Lag 2 sin CORS-håndtering påvirker
   ikke fallback-visning.

### Mulig framtidig paritet (ikke nå)

Når Lag 2 senere skal kunne servere parent fra IDB, kreves en av:

- **A:** Synkron `lag2HasParentInIdb(parentSrc)` — vanskelig, IDB er async
- **B:** Pre-warming av parent-RAM-cache fra IDB ved init
- **C:** Egen Lag 2-funksjon `lag2AddIdbParentFallback` som settes ved init
  og kalles fra Lag 1 sin `addNorgeCleanParentFallback` som ekstra steg

Dette er ren framtidsplan. Ingen handling nå.

## 5. Paritet 3: nye baseline-kilder (Danmark, Sverige)

Baseline (`3dd192e`) innførte to nye kilder:

- `wms-denmark-havplan` mot `https://havplan.dk/geoserver/havplan/wms`
- `wms-sweden-fyren` mot `https://geokatalog.sjofartsverket.se/mapservice/wms.axd/FyrenBakgrund`

Min `lag2IsSourceExcluded` (steg 2) ekskluderer i dag kun `wms-nib`:

```
function lag2IsSourceExcluded(source) {
  if (!source) return true;
  if (source.type === 'wms-nib') return true;
  return false;
}
```

Spørsmål til Codex og Jone: skal disse to kildene caches av Lag 2 fra dag én,
eller skal de ekskluderes inntil CORS er manuelt verifisert i DevTools?

### Anbefaling

**La dem være med fra dag én**, og la `taintedSources`-mekanismen min fange
eventuelle CORS-problemer. Begrunnelse:

- Min canvas-eksport prøver `crossOrigin='anonymous'`. Hvis kilden mangler
  `Access-Control-Allow-Origin`, kaster `canvas.convertToBlob` SecurityError,
  og `lag2State.taintedSources.add(sourceKey)` slår av IDB-skriving for kilden
  for resten av sesjonen. Live-tile fortsetter å vises som vanlig.

- Hvis CORS er OK, får brukeren reload-cache og prefetch fra disse kildene gratis.

- Det er rever sibelt: hvis Jone observerer at en av disse kildene aldri laster
  med Lag 2 påskrudd, kan flagget `?lag2=off` eller
  `enok72.lag2.cache=off` slå av Lag 2 helt, eller `lag2IsSourceExcluded`
  utvides i en oppfølgings-patch.

### Alternativ: hard eksklusjon

Hvis Codex eller Jone foretrekker konservativ start:

```
function lag2IsSourceExcluded(source) {
  if (!source) return true;
  if (source.type === 'wms-nib') return true;
  if (source.type === 'wms-denmark-havplan') return true;   // til CORS er verifisert
  if (source.type === 'wms-sweden-fyren') return true;       // til CORS er verifisert
  return false;
}
```

Dette gjør at Danmark og Sverige aldri røres av Lag 2 (verken cache eller
prefetch) før noen har bekreftet CORS-headerne. Tryggere men gir mindre
ytelsesgevinst.

**Mitt forslag: gå med liberal start (la dem være med) og bruk
`taintedSources` som sikkerhetsnett.** Endelig valg ligger hos Jone.

## 6. Rebase-strategi og branch-håndtering

### 6.1 Rebase-rekkefølge

Mine fire branchen rebases sekvensielt oppå `d5e69f4`:

```
codex/v7-lag1-trinn1-2-3-merged  (d5e69f4)
  └── perplexety/v7-lag2-cache-prefetch-patch-steg1     (rebases først)
        └── perplexety/v7-lag2-cache-prefetch-patch-steg2     (rebases andre)
              └── perplexety/v7-lag2-cache-prefetch-patch-steg2b  (rebases tredje)
                    └── perplexety/v7-lag2-cache-prefetch-patch-steg3  (rebases sist)
```

Hver branch rebases med `git rebase --onto d5e69f4 <prev-base> <branch>`
slik vi gjorde i steg 2b-runden. Force-push med `--force-with-lease`.

### 6.2 Konfliktløsning

For hver rebase-konflikt:

1. Lag 1 sine linjer beholdes nøyaktig som i `d5e69f4`
2. Lag 2 sine innskudd legges inntil, ikke oppå
3. Ingen Lag 1-symboler endres, ingen Lag 1-semantikk endres
4. `node --check app.js` må passere etter hver løste konflikt
5. Diff mot `d5e69f4` skal vise kun additive endringer (Lag 2)

### 6.3 Verifikasjon etter rebase

Etter at alle fire branchen er rebased:

1. `node --check app.js` på hver branch
2. Diff `steg3` mot `d5e69f4` skal vise:
   - Kun `app.js` endret
   - Forventet linjeantall: ca. +1100 / −15 (steg 1: +417, steg 2: +335,
     steg 2b: +51, steg 3: +320, med modifikasjoner for konfliktløsning)
3. Hard kill-switch sjekk: `?lag2=off` skal returnere instrumentet til
   `d5e69f4`-atferd (måle-modus pikselidentisk)
4. Steg 1 default `cache='shadow'` skal være ren no-op
5. Steg 2 IDB-skriving skal kjøre etter `removeNorgeCleanParentFallback` i
   `onload`, ikke før
6. Steg 3 prefetch skal fortsatt være gated på live-kø og leve i egen kø

### 6.4 Branch-navn etter rebase

Branch-navnene beholdes uendret. Force-push med `--force-with-lease`. Tidligere
SHA-er blir foreldede; nye SHA-er rapporteres til Jone og Codex etter hver
vellykket rebase + paritetspatch.

## 7. Det jeg ikke gjør i denne runden

- Ikke bytte fra `norgeCleanTileManager`-lesing til `window.__enok72__.lag1Status`
  (avventer Codex sin Trinn 5)
- Ikke implementere IDB-skriving-skip ved freeze-tilstand
- Ikke utvide `findNorgeCleanParentFallback` med IDB-lookup
- Ikke endre kø-prioritet eller `priorityScore`-modellen
- Ikke endre `frameBudgetMs`
- Ikke endre Lag 1-symboler
- Ikke endre låste områder (anker, `aeProject`, GE-grid, solsirkler, transform,
  skala, rotasjon, tile-posisjon, kartproporsjoner)
- Ikke legge til nye kartkilder
- Ikke endre tile-URL-mønstre

## 8. Akseptkriterier

Etter rebase + paritetspatch på alle fire branchen:

1. `git log --oneline d5e69f4..perplexety/v7-lag2-cache-prefetch-patch-steg3`
   viser nøyaktig fire commits, én per steg, i rekkefølge
2. Hver commit har eneste fil `app.js` endret (ingen andre filer)
3. `node --check app.js` passerer på hver av de fire HEAD-ene
4. `window.__enok72__.lag2Exporting` finnes som boolean fra steg 2b og oppover
5. `lag2TryServeFromIdb.onOk` setter `img.dataset.loadedZ` (paritet 1)
6. Med `?lag2=off` skal instrumentet være pikselidentisk med `d5e69f4`
7. `wms-denmark-havplan` og `wms-sweden-fyren` håndteres som besluttet i
   punkt 5 over
8. Trinn 3 fallback-`<div>` rører ikke Lag 2-laget på noen som helst måte
9. `LAG2_DATA_GENERATION` skal **ikke** bumpes — URL-mønstrene for de
   eksisterende kildene (Kartverket, Iceland, OSM, NIB) er uendret i d5e69f4.
   For de to nye kildene (Danmark, Sverige) lagres `sourceKey` i nøkkelen, så
   de får sine egne IDB-rader uten å kollidere med eksisterende rader.

## 9. Anbefalt kodebranch etter godkjenning

Når Jone godkjenner denne planen, kjører jeg rebase + paritet sekvensielt:

- `perplexety/v7-lag2-cache-prefetch-patch-steg1` rebases oppå `d5e69f4`
- `perplexety/v7-lag2-cache-prefetch-patch-steg2` rebases oppå ny steg 1,
  med paritet 1 og paritet 3 lagt inn
- `perplexety/v7-lag2-cache-prefetch-patch-steg2b` rebases oppå ny steg 2
- `perplexety/v7-lag2-cache-prefetch-patch-steg3` rebases oppå ny steg 2b

Hver rebase-resultat verifiseres med `node --check` og diff-inspeksjon før
force-push. SHA-er rapporteres til Jone og Codex.

Ingen merge til `codex/v7-current-mapbuild-baseline` eller `main` uten Jones
eksplisitte godkjenning og review av Codex.
