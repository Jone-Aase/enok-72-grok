# Plan Codex Lag 1 Trinn 3: parent-tile fallback

Branch: `codex/v7-lag1-plan-trinn3-parent-fallback`
Base: `codex/v7-lag1-trinn2-prioritet-framebudget` @ `09aa947606c31a5357a0b587bbc5bed64b988511`

Dette er plan, ikke kode. Ingen instrumentfiler endres i denne fasen.

## Mal

Trinn 3 skal sikre at kartflaten alltid viser noe mens hoyere detalj lastes.

Nar en fin tile pa for eksempel z12 ikke er klar, kan motoren midlertidig vise en grovere foreldre-tile fra z11, z10 eller z9 i samme omrade. Dette er samme prinsipp som Google Earth, Cesium og spillmotorer bruker: grovt forst, skarpere etter hvert.

Dette er en visuell reserve. Det er ikke ny geometri.

## Laaste omrader

Trinn 3 skal ikke endre:

- ankerpunkter
- `aeProject`
- GE-grid
- solsirklene
- transform
- skala
- rotasjon
- tile-posisjon
- kartets interne proporsjoner
- kilde-URLer
- tile-gridets matematikk

Hvis en fallback-losning krever aa flytte kartet eller endre en av disse, stoppes arbeidet og Jone sporres.

## Hvor lever foreldre-tilen i DOM?

Foreldre-tilen skal i forste versjon leve i samme pane som barn-tilen, bak barn-tilen.

Begrunnelse:

- samme pane betyr samme CSS-transform
- samme pane betyr samme anker, skala og rotasjon
- ingen ekstra fallback-pane som kan komme ut av sync
- lavest risiko for aa paavirke maaleflaten

Praktisk modell:

- hver fine tile-slot kan faa ett ekstra `img`-element for fallback
- fallback-elementet legges for barnet i DOM eller gis lavere z-index
- barnet er endelig visning nar det er lastet
- fallback fjernes eller skjules nar barnet er klart

## Foreldre-koordinat

For en tile `(z, x, y)` er direkte forelder:

```text
parentZ = z - 1
parentX = x >> 1
parentY = y >> 1
```

Ved flere nivaaer opp gjentas samme regel:

```text
ancestorZ = z - n
ancestorX = x >> n
ancestorY = y >> n
```

Hard grense i forste patch:

- maks 4 nivaaer opp
- ikke ga under laveste fornuftige zoom som allerede brukes av motoren
- hvis ingen foreldre finnes i cache, vises tile-slot som i dag

## Cache-bruk

Trinn 3 skal bruke eksisterende `norgeCleanTileManager.cache` for foreldre-lookup.

Det skal ikke innfores nytt cache-lag i forste versjon.

Regel:

- hvis parent-src finnes i `norgeCleanTileManager.cache`, kan den brukes som fallback
- hvis den ikke finnes, skal Trinn 3 ikke starte en egen parent-last i forste patch
- live-koen skal fortsatt prioritere riktig target-tile

Dette holder Trinn 3 liten og hindrer ekstra lastestorm.

## Hvordan plasseres foreldre-bildet?

Foreldre-bildet skal dekke samme lokale tile-slot som barnet.

Det betyr:

- fallback-bildet strekkes visuelt innenfor barnets 256px slot
- dette er midlertidig visuell reserve, ikke maalegeometri
- barnets faktiske tile erstatter fallback nar den er lastet

Viktig presisering:

Dette endrer ikke pane-transformen eller kartets maaleplassering. Det er kun et midlertidig bilde i samme lokale DOM-slot.

## Nar byttes foreldre ut?

Forste patch skal velge enkel og defensiv oppforsel:

- fallback vises umiddelbart hvis den finnes i cache
- barnet lastes som normalt
- nar barnet er lastet, skjules eller fjernes fallback

Ingen avansert fade i forste patch.

En veldig kort opacity-overgang kan vurderes senere hvis Jone ser flimring, men det skal ikke inn i forste Trinn 3-patch.

## Hva hvis foreldren ogsa mangler?

Motoren kan ga oppover i treet til naermeste cached ancestor, med hard grense.

Forslag:

1. prov z - 1
2. prov z - 2
3. prov z - 3
4. prov z - 4
5. stopp

Hvis ingen cached ancestor finnes, ikke gjor noe ekstra i forste patch.

Dette unngar at fallback selv skaper ny ko eller ny lastestorm.

## Grense mot Trinn 2

Trinn 2 sin ko og frame-budget skal fortsatt eie live-lasting.

Trinn 3 skal ikke:

- endre `frameBudgetMs`
- endre `processNorgeCleanTileQueue()` mer enn nodvendig for aa skjule fallback ved load
- endre `priorityScore`-modellen
- la fallback telle som live-ko

Fallback er bare visuell reserve for eksisterende target-jobber.

## Grense mot Lag 2

Lag 2 kan senere levere parent/ancestor fra IDB, men ikke i forste Trinn 3-patch.

Forste patch bruker bare in-memory cache (`norgeCleanTileManager.cache`).

Senere Lag 2-plan kan vurdere:

- parent fra IDB
- prefetch av foreldre
- lag1Status-felt for fallback-hit/miss

Men dette er ikke naa.

## Status og diagnostikk

Forste patch bor utvide status svakt, for eksempel:

- `fallback N`
- `fallback miss M`

Dette er diagnostikk, ikke funksjonell avhengighet.

## Testkrav for patchen

1. Pan/zoom raskt over Norge, Island, Sverige, Danmark/Grønland og Svalbard.
2. Det skal bli faerre tomme/svarte tile-slots mens detaljer laster.
3. Kartet skal ikke flytte seg.
4. Freeze-when-loaded skal fortsatt vente paa live-ko, ikke fallback.
5. Trinn 2-status (`budget 8ms`, `yielded`, `pump`) skal fortsatt vises.
6. Ingen endring i anker, GE-grid, solsirklene eller karttransform.
7. Hvis cache er tom, skal motoren oppfore seg omtrent som i dag, ikke starte ny parent-storm.

## Ikke naa

Ikke bygg dette i Trinn 3 forste patch:

- parent-tile nettverkslasting
- IDB parent fallback
- Service Worker
- fade-system
- ny fallback-pane
- shader/canvas smoothing
- nye kartkilder
- porsjonering av `updateNorgeDetailTiles()`
- endring av geometri eller transform

## Anbefalt kodebranch etter godkjenning

Hvis Jone godkjenner planen:

- kodebranch: `codex/v7-lag1-trinn3-parent-fallback`
- base: `codex/v7-lag1-trinn2-prioritet-framebudget`
- forventet filomfang: hovedsakelig `app.js`

