# Respons fra Claude/Perplexity: arkitekturplan for tile-loading og cache (revidert)

Til Codex og Jone. Dette er kun plan, ingen kode. Baseline `codex/v7-clean-seam-smooth-source` commit 8616158 er urørt. Revidert etter tilbakemelding fra Jone og Codex 2026-06-03.

## Bekreftelse av rammer

Planen endrer ikke:

- ankerpunkter (Selsøy 66.5502°N 12.8462°E, Kveitanosen 66.5500°N 12.6383°E, Arctic Circle Center 66.5500°N 15.3266°E, Grímsey 66.545525°N -18.011092°W)
- Norge- og Island-transformene
- kartets mål, form eller rotasjon
- 256-gridet eller tile-posisjoner
- fungerende sjøkartlag (sjokartraster, Sjomaelingar:Sjokort_Sjomaelinga)
- WebMercator/WMTS/WMS som ekstern adresse
- bruk av aeProject (ingen tile-hjørner eller vertices sendes inn i aeProject noensteds)

## Korrigeringer fra revisjonsrunden

1. img.src bevares som transport-mekanisme i denne fasen. Ingen overgang til fetch+blob før CORS- og opaque-response-test er gjort per kilde (Kartverket sjokartraster, Island Sjomaelingar WMS, OSM, NIB).
2. Cache API kobles ikke direkte mot img.src. Persistent cache krever enten Service Worker som intercept-er tile-requests, eller fetch+blob etter CORS-test. Begge løses som separat plan, ikke i Lag 1.
3. Priority-sortering finnes allerede i seam-smooth-1 (verifisert: linje 3893 prioritetsformel, linje 3900 og 3918 `.sort`-kall). Tidligere "Lag 2 prioritering" fjernes — den ville bygd noe som finnes.

## Status i eksisterende kode (verifisert)

Filen `app.js` har allerede en fungerende tile-manager `norgeCleanTileManager` (linje 3044 til 3160) med:

- in-memory LRU-cache via `Map` med `cacheLimit` (linje 3055-3063)
- concurrent-limit via `active` og `maxConcurrent` (linje 3066) — global, ikke per kilde
- batch-cancel via `currentBatch` (linje 3047, 3069, 3075)
- prioritetsformel = avstand fra senter + layer-prioritet + anker-prioritet (linje 3893)
- sortering av tileJobs og queue (linje 3900, 3918)
- src-til-Image-mapping via `img.dataset.loadedSrc`
- img.src som transport (linje 3093, 3101)
- onload/onerror som rapporterer til `refreshNorgeCleanLoadStatus`

URL-bygging i `detailTileUrl` (3003) og `cleanDetailTileUrl` (3029) for fire kilder: OSM, Iceland-sjøkart-WMS, NIB-WMS, Kartverket-WMTS.

Planen bygger oppå dette fundamentet. Eksisterende prioritering, sortering, batch-cancel og in-memory cache består uendret.

## Revidert lag-rekkefølge — fire lag

### Lag 1: trygg forbedring av eksisterende in-memory manager

Mål: bedre kontroll og synlighet uten å endre transport.

Konkret:
- Per-kilde concurrent-counters. `norgeCleanTileManager.active` blir et map `{ kartverket: 0, iceland: 0, osm: 0, nib: 0 }` med per-kilde-tellere ved siden av en total-teller. `processNorgeCleanTileQueue` sjekker både total og per-kilde før den starter en ny request. Forslag til limits: Kartverket 6, Iceland 4, OSM 6, NIB 2. Jone justerer ved behov.
- Per-kilde-feilhåndtering med 100 ms backoff ved 429 eller 503, eksponentiell vekst opp til 30 sekunder. Backoff registreres per kilde og påvirker ikke andre kilder.
- Utvidet status-rapportering. `refreshNorgeCleanLoadStatus` får per-kilde-tall i tillegg til totalen: aktive, ventende, lastet, feilet per kilde. Synlig i eksisterende status-panel.
- Ingen endring av img.src som transport. Ingen endring av cache-modell. Ingen endring av sortering. Ingen endring av prioritetsformel.

Risiko: minimal. Eksisterende oppførsel bevares for én kilde brukt isolert. Ny oppførsel aktiveres kun når flere kilder lastes samtidig.

### Lag 2: persistent cache plan som Service Worker (kun plan først)

Mål: dokumentere veien til persistent cache uten å skrive kode.

Plan-leveranse, ikke kode:
- CORS-audit per kilde: dokumentere hvilke kilder som tillater `crossorigin="anonymous"`, hvilke som returnerer opaque responses, og hvilke som krever Service Worker-intercept for caching.
- Service Worker-skisse: hvordan en `fetch`-handler i SW kan intercept-e tile-URLer per kilde-mønster, sjekke `caches.match`, returnere cached respons hvis treff, ellers fetche og lagre. Den faktiske img.src forblir uendret — Service Worker er transparent for `img`-elementet.
- Cache-bucket-design: `enok-tiles-kartverket-v1`, `enok-tiles-iceland-sjokart-v1`, `enok-tiles-osm-v1`. NIB ekskluderes fra persistent cache så lenge URL inneholder token.
- Cache-størrelse-monitor: dokumentert plan for `navigator.storage.estimate()` og automatisk eviksjon av eldste tiles per bucket over 300 MB.
- Risiko-dokument: opaque responses kan ikke leses men kan caches. Service Worker registreres på root scope og påvirker alle requests fra siden — må aktiveres med flagg som Jone slår på, ikke automatisk. Avregistrering må være enkel.

Ingen kode i Lag 2. Kun plan og risiko. Kodeplan kommer som egen revisjon hvis Jone og Codex godkjenner retningen.

### Lag 3: beholde lavere zoom synlig mens høyere zoom laster

Mål: jevn visuell overgang ved zoom uten å innføre dobbel geometri og uten tomme hull.

Konkret:
- Eksisterende pixelflate-konstruksjon endres ikke. Det opprettes ikke en ny geometri, ny transform, eller ny pixelflate per zoom-nivå.
- Implementasjonsmønster: tile-img-elementer ved gammel zoom forblir i DOM under sin pixelflate. Når ny zoom velges, lastes nye tile-img-elementer ved nytt zoom-nivå inn i samme pixelflate med `z-index` over gammel zoom og `opacity: 0`. Etter `onload` per tile fader den til `opacity: 1` over 150 ms.

Stramme regler for utskiftning:

Ved oppzoom (z → z+1):
- Hver gammel tile på zoom z dekker fire nye tiles på zoom z+1.
- Den gamle tilen beholdes synlig (opacity: 1, z-index under) til alle fire tilsvarende nye tiles er lastet og har opacity: 1.
- Hvis én eller flere av de fire nye feiler å laste, beholdes den gamle tilen. Den fjernes ikke før erstatning finnes.

Ved nedzoom (z → z-1):
- Fire gamle tiles på zoom z dekker én ny parent-tile på zoom z-1.
- De fire gamle beholdes synlige til den ene nye parent-tilen er lastet og har opacity: 1.
- Hvis ny parent-tile feiler å laste, beholdes de fire gamle. De fjernes ikke før erstatning finnes.

Ved rask pan eller zoom:
- `currentBatch` kan kansellere nye ventende tiles via eksisterende batch-cancel-mekanisme.
- Allerede synlig gammel tile skal aldri fjernes før erstatning finnes og har opacity: 1.
- Ingen tomme hull skal oppstå som følge av batch-cancel.
- Hvis bruker zoomer videre forbi en zoom-nivå mens overgangen pågår, kan mellomliggende zoom-nivåer hoppes over, men ingen gammel synlig tile fjernes før dens erstatning på det nye gjeldende zoom-nivået er lastet.

Debounce: 200 ms uten nye zoom-endringer før systematisk opprydding av zoom-rader som ikke lenger er gjeldende og som har fullstendig erstatning oppå.

Bekreftelse for Lag 3:
- Dette er fortsatt bare DOM-img-overgang via z-index og opacity.
- Ingen ny transform.
- Ingen ny geometri.
- Ingen endring av pixelflatens 256-grid.
- Ingen endring av tile-posisjon.
- Ingen ny pixelflate per zoom-nivå.

Risiko: kort økning i DOM-mengde under overgang. Måles og rapporteres. Worst case er en pixelflate som midlertidig holder tiles fra to zoom-nivåer samtidig — typisk dobling av tile-img-mengde i 200 til 800 ms før gammel rad ryddes.

### Lag 4: prefetch korridor Norge - Jan Mayen - Island

Mål: jevnere visning når bruker panner mellom Norge og Island.

Aktiveres først etter Lag 1 og Lag 3 er stabile. Krever ikke Lag 2 for å fungere — bruker eksisterende in-memory cache.

Konkret:
- Når Norge- og Island-flaten begge er rolige (debounce 1.0 sekund uten pan/zoom), starter lav-prioritets prefetch i korridoren mellom dem ved nåværende zoom.
- Korridor: rektangel i WebMercator-meter fra Norges nord-vest hjørne til Islands sør-øst hjørne. WebMercator brukes her kun som adresse, ikke som geometri i Instrumentet.
- Prefetch-jobs får negativ prioritet via eksisterende prioritetsformel slik at de aldri går foran synlige tiles.
- Maks 20 tiles per prefetch-batch. Kanselleres umiddelbart ved bruker-interaksjon via eksisterende `currentBatch`-mekanisme.

Risiko: økt server-belastning når bruker er rolig. Per-kilde concurrent-limit fra Lag 1 begrenser dette.

## Minimal implementeringsrekkefølge

1. Lag 1 per-kilde counters og backoff. Trygg, eksisterende transport bevares.
2. Lag 3 zoom-overgang med opacity-fade. Stabilisering før mer kompleksitet.
3. Lag 4 prefetch korridor. Først etter Lag 1 og Lag 3 har kjørt stabilt mot baseline.
4. Lag 2 persistent cache-plan (skriftlig). Bygges først hvis Jone og Codex godkjenner Service Worker som retning. Ingen kode i denne fasen.

Hvert lag leveres som egen branch `claude/v7-tile-loading-lagN-plan` (plan) og senere `claude/v7-tile-loading-lagN-code` (kode), med PR mot main. Ingen merge uten Jones godkjenning. Hvert lag testes mot baseline seam-smooth-1 før neste starter.

## Filer og funksjoner som må endres

Alle endringer i `app.js`:

Lag 1:
- endring i `norgeCleanTileManager` objekt-deklarasjon: `active` blir map per kilde + total
- endring i `processNorgeCleanTileQueue` (linje 3065-3095): sjekk per-kilde-limit
- endring i `refreshNorgeCleanLoadStatus`: rapporter per kilde
- ny funksjon `recordSourceError(sourceKey, statusCode)` for backoff-håndtering

Lag 2: ingen kode i denne fasen.

Lag 3:
- ny funksjon `transitionZoomLayer(panel, oldZoom, newZoom)` som styrer opacity-overgang
- mindre endring i img.onload (linje 3074-3083) for opacity-fade-håndtering

Lag 4:
- ny funksjon `prefetchCorridor(norgePanel, islandPanel)` med korridor-beregning og batch-utsendelse

Ingen endring i `index.html`. Ingen endring i ankerpunkter, transform-matriser, eller pixelflate-konstruksjon. Ingen endring av eksisterende prioritetsformel eller `.sort`-kall.

## Risiko

Server-belastning: Lag 1 per-kilde concurrent-limit pluss 100 ms backoff med eksponentiell vekst opp til 30 sekunder. Rapporteres i status-panel, ikke til ekstern logger.

Cross-origin: img.src bevares uendret i denne fasen. CORS-status per kilde dokumenteres i Lag 2-plan før Service Worker eller fetch+blob foreslås. Ingen endring av kilder før dokumentet er ferdig og godkjent.

Race condition ved rask pan: eksisterende `currentBatch`-mekanisme bevares uendret. Lag 4 prefetch kanselleres via samme mekanisme.

Tile-tap ved nettverksbrudd: in-memory cache fungerer som korttidsfallback. Persistent fallback dekkes av Lag 2 hvis godkjent.

DOM-mengde under Lag 3: kortvarig dobling av tile-img-elementer per panel under zoom-overgang. Måles og rapporteres. Ved rask gjenta-zoom skal eldre tiles ryddes umiddelbart via batch-cancel uten ventetid.

Kompatibilitet med Geminis fargeglatting: Lag 3 opacity-fade og Geminis edge-feathering må testes sammen før begge merges. Hvis konflikt oppstår, prioriteres geometrisk stabilitet over visuell glatting.

## Bekreftelse

Ankre er urørt. Transform er urørt. Tile-posisjoner er urørt. 256-gridet er urørt. Kartgeometri er urørt. aeProject brukes ikke i denne planen. Sjøkartkilder fjernes ikke. WebMercator brukes kun som ekstern adresse.

Alle endringer skjer i tile-henting og tile-mellomlagring, før tile vises i pixelflaten, og i opacity-overgang når tile er ferdig lastet. Pixelflatens egen geometri og dens placering i Instrumentet er ikke berørt.

Klar for ny vurdering av Jone og Codex. Spør hvis noe er uklart.
