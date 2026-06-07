# Kartmotor V2 / Layer 2 lokal tile-plan

Status: styrende videreutviklingsnotat.

Formaal: sikre at lokal lagring, cache, proxy og eventuell tile-server ikke blandes inn i Kartmotor V2. Kartmotor V2 skal vise og styre tile-livssyklus. Layer 2 / Datamotoren skal eie cache, prefetch, speiling og lokal fallback.

## Ansvarsdeling

### Kartmotor V2

Kartmotor V2 skal vaere ren motor for kartvisning og loading-kontroll.

V2 eier:
- visible/keep tile range
- priority queue
- center-out rekkefolge
- base/overlay-skille
- no-black-frame-livssyklus
- loader gate
- URL/source-adapter-kontrakt
- DOM-rendering av V2 sine egne tiles naar loading senere blir eksplisitt aapnet

V2 skal ikke eie:
- IndexedDB-cache
- Cache API
- prefetch-strategi
- lokal proxy
- produksjons tile-server
- lisens-/attribution-policy
- blind speiling av Kartverket/WMS/WMTS

V2 skal bare lese en source-kontrakt, for eksempel:

```js
{
  sourceId: "kartverket-sjokartraster",
  delivery: "kartverket-live",
  fallbackOrder: ["idb-cache", "local-proxy", "kartverket-live"],
  attribution: "© Kartverket",
  cachePolicy: "layer2-managed"
}
```

Tillatte delivery-verdier i planfasen:
- `kartverket-live`
- `idb-cache`
- `local-proxy`
- `offline-tile-server`
- `disabled`

### Layer 2 / Datamotor

Layer 2 eier all datalagring og fallback.

Layer 2 eier:
- browser/IndexedDB-cache
- Cache API hvis valgt
- lokal dev proxy
- offline tile-pakker for godkjente testomraader
- produksjons tile-server fra lovlig nedlastbare datasett
- metadata per tile/layer/source
- attribution og lisensspor
- rate limiting
- prefetch-regler
- local-first fallback

Layer 2 skal levere tile-kilde til V2 gjennom en kontrakt, ikke ved aa endre V2 sin geometri eller tile-posisjonering.

## Tre nivaer for lokal kartbruk

### 1. Browser / IDB cache

Foerste trygge niva.

Regler:
- cache bare tiles som faktisk er sett eller eksplisitt valgt i et lite testomraade
- start med Oslo / 1:5000 og Se Eiendom-testomraade
- ingen "last ned hele Norge"
- cache er Layer 2-styrt
- V2 ser dette bare som `delivery: "idb-cache"`

### 2. Lokal dev proxy

Andre niva for utvikling og kontrollert testing.

Proxy-regler:
- lokal server sjekker lokal cache foerst
- hvis ikke lokalt: hent upstream etter allowlist
- rate limit per kilde
- logging per source/layer/tile
- tydelig attribution
- stopp ved ukjent source eller ukjent lisensstatus
- ikke blind speiling

V2 ser dette bare som `delivery: "local-proxy"`.

### 3. Produksjons tile-server

Tredje niva, bare etter lisens-/datasett-avklaring.

Regler:
- bygges fra aapne/nedlastbare datasett der vilkaar eksplisitt tillater lokal hosting
- ikke bygges som ukontrollert scraping av WMTS/WMS
- attribution og kilde metadata lagres per layer
- versjonering av datasett maa vaere eksplisitt
- produksjonsserver skal kunne brukes offline/lokalt der rettigheter tillater det

V2 ser dette bare som `delivery: "offline-tile-server"`.

## Kartverket / Se Eiendom-regler

Foer lokal lagring utover browser-cache maa gjeldende vilkaar sjekkes eksplisitt.

Laaste regler:
- behold korrekt kildeangivelse, f.eks. `© Kartverket`
- respekter WMTS/WMS/cache-vilkaar
- ikke prefetch hele Norge
- ikke blind-speil Kartverket eller Se Eiendom
- start med lite testomraade
- dokumenter source, layer, tidspunkt og bruksvilkaar

Se Eiendom / Matrikkelen behandles som overlay og skal ikke blokkere basekart.

## V2 roadmap-konsekvens

Kartmotor V2 skal fortsette slik:

1. URL/source-adapter dry-run.
2. Plan/review for controlled base-only tile loading.
3. Ekte loading aapnes bare via eksplisitt loader gate.
4. Base visible foerst.
5. Overlay senere.
6. Layer 2-cache kobles inn som source-kontrakt, ikke som V2-intern logikk.

## Ikke tillatt

Ikke legg dette inn i V2:
- IndexedDB-write direkte fra V2
- full prefetch
- lokal proxy-kode
- produksjons tile-server-kode
- Kartverket-speiling
- lisensbeslutninger
- geometriendringer
- endringer i anker, GE-grid, aeProject, transform, skala, rotasjon, tile-posisjon eller kartproporsjoner

## Kort konklusjon

Ja, kart kan senere lagres lokalt eller serveres lokalt, men det skal eies av Layer 2 / Datamotoren.

Kartmotor V2 skal bare forholde seg til en ren source-/delivery-kontrakt og fortsette aa fokusere paa stabil kartvisning, no-black-frame og kontrollert tile-livssyklus.
