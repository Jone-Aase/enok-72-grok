# Plan for per-pane lys- og fargejustering

Branch: `claude/v7-pane-tone-match-plan`
Status: kun plan, ingen kode

## Bakgrunn og observasjon

Tile-sømmer er forbedret etter CSS seam-test 1. Det som gjenstaar er en
tydelig tone- og lysforskjell mellom de store kartflatene. Mest synlig er
Norge/Kartverket mot Island/LMI-sjokart der hver flate i seg selv er fin,
men paafallende mot hverandre.

Geometrien er korrekt. Det er ren visuell rendering som maa justeres.

## Hvilke kroker finnes i koden allerede

To pane-attributter er allerede satt paa hvert pane-element og er trygge
aa selecte i CSS uten aa flytte noe:

- `data-anchor-mode="norway"` eller `data-anchor-mode="iceland"`
- `data-source-layers="topograatone+sjokartraster"` eller tilsvarende
  for Island, OSM, Jan Mayen

Pixelflaten har i dag `opacity: 0.52` per pane og `outline` for visuell
debug. Tiles har `opacity: 0.96` (base) og `0.82` (overlay). Alt dette
er per pane eller per tile-klasse, ikke per individuell tile.

## Svar paa de seks spoersmaalene

### 1. Hvilket pane bor justeres forst

Norge-pane bor staa som referanse. Island-pane justeres mot Norge.

Begrunnelse:
- Norge er hovedmaaleflate i dette instrumentet og brukes oftest.
- Kartverket har konsistente tone-paletter (topograatone, sjokartraster)
  som er etablerte gjennom hele Lag 1 og Lag 3 testing.
- Island/LMI har en annen base-palett som virker lysere og kjoeligere.
- Endrer vi Norge, paavirker det alt annet brukeren sammenligner mot.

Konkret foerste skritt: kun Island-pane justeres. Norge-pane roeres ikke
foer Island-test er godkjent.

### 2. Hvilke CSS-egenskaper er tryggest aa teste foerst

Rangering etter risiko, fra tryggest til mest risikabel:

1. `filter: brightness()` paa pane-niva. Multiplikativ, reversibel,
   paavirker ingen geometri.
2. `filter: contrast()` paa pane-niva. Samme egenskaper.
3. `filter: saturate()` paa pane-niva.
4. `filter` kombinert: `brightness() contrast() saturate()`. Browseren
   kjorer disse i sequence men resultatet er forutsigbart.
5. `opacity` paa pane-niva. Allerede i bruk (0.52). Endring her paavirker
   ogsaa kontrast mot bakgrunnen og kan endre opplevd tone.

Ikke brukes naa:
- `mix-blend-mode` paa pane-niva. Den kan se elegant ut, men gir
  uforutsigbare resultater naar to ulike kartflater overlapper midlertidig
  under retire-vinduet fra Lag 3. Vi har akkurat lost overlap-problemet
  uten doble visninger; et blend-mode kan skape illusjon av dobbeltkart
  igjen.
- `hue-rotate()`. Endrer fargefamilie og kan flytte sjokart-blaa til
  noe som ikke ligner Kartverket-blaa.
- `blur()`. Forbudt etter direktivet.
- `mask-image`. Forbudt etter direktivet.
- Canvas-preprocessing. Forbudt etter direktivet.

### 3. Hvilke verdier bor foerste test bruke

Foerste konservative test paa Island-pane:

```
.norge-clean-pixelflate[data-anchor-mode="iceland"] {
  filter: brightness(0.94) contrast(1.04) saturate(0.96);
}
```

Begrunnelse:
- `brightness(0.94)` demper Island-flatens lyshet 6% slik at den matcher
  Norge bedre. Tryggere enn 0.90, mindre paafallende enn 0.97.
- `contrast(1.04)` gir litt mer separasjon mellom land/sjo paa Island,
  som virker flatere enn Norge.
- `saturate(0.96)` reduserer fargemetning marginalt slik at den
  kjoligere Island-paletten gaar mot Norges noe varmere tone.

Hvis foerste test treffer godt, kan vi i en senere iterasjon proeve med:
- Norge-pane `brightness(1.02)` for aa loefte topograatone litt
- Eller en gradient av filter-verdier per source-layer

Men det er fase 2. Foerste test holder seg til Island-pane alene.

### 4. Hvordan gjor vi testen reversibel

To CSS-variabler paa pane-niva, slik at vi har en enkelt switch:

```css
.norge-clean-pixelflate {
  filter:
    brightness(var(--pane-brightness, 1))
    contrast(var(--pane-contrast, 1))
    saturate(var(--pane-saturate, 1));
}
.norge-clean-pixelflate[data-anchor-mode="iceland"] {
  --pane-brightness: 0.94;
  --pane-contrast: 1.04;
  --pane-saturate: 0.96;
}
```

Reverser ved aa fjerne den ene selectoren, eller ved aa sette
variablene til 1 i et toggle. Ingen ytterligere kodendring trengs.

For testing kan Jone toggle i konsoll:
```
document.querySelectorAll('.norge-clean-pixelflate[data-anchor-mode="iceland"]')
  .forEach(p => p.style.setProperty('--pane-brightness', '1'));
```

### 5. Hvordan tester vi visuelt uten aa paavirke geometri

Tre konkrete tester:

A) Vis hele Norge og Island ved siden av hverandre paa default zoom.
   Sammenlign overgangen ved kysten av Lofoten/Vesteralen mot Island-
   kysten. Tone-skille skal bli mindre paafallende.

B) Zoom inn paa Island-kysten. Verifiser at sjokart-blaa fortsatt ser
   ut som sjokart-blaa, ikke som en avbleket pastell. Hvis blaaen
   doer ut, er saturate satt for lavt.

C) Toggle filter av og paa via konsoll-snippet over. Geometri, tile-
   posisjon, anker-prikker og GE-grid skal vaere identiske i begge
   tilstander. Bare fargene endres.

Verifikasjon at ingenting flyttet seg:
- Bruk `window.__norgeCleanTileManager.bySource` for aa bekrefte at
  ingen tile lastes paa nytt under toggle.
- Sjekk at anker-overlay (cyan/pink prikker) staar paa noeyaktig samme
  pixel.
- Bruk DevTools "computed transform" paa pane-elementet. Den skal vaere
  uendret.

### 6. Hva bor vi ikke bruke enna

- `blur()` - forbudt
- `mask-image` - forbudt
- canvas-preprocessing - forbudt
- `mix-blend-mode` - utsatt til Lag 3 retire-overlap er ryddet videre
- `hue-rotate()` - kan flytte fargefamilier, ikke kun matche tone
- `filter: drop-shadow()` - kan skape kunstig kant rundt panet
- Per-tile justeringer - skaper sommer mellom tiles
- Per-source filter med ulike verdier innen samme pane - hvis et pane
  har base + overlay fra forskjellige kilder, blir overlap uforutsigbar
- Animasjon av filter-verdier - paavirker rendering-pipeline, kan
  trigge gjenstart av decode paa tiles

## Avgrensninger som holdes strikt

- Justering gjelder hele pane-elementet som ett objekt, ikke individuelle
  tiles. Selectoren `.norge-clean-pixelflate[data-anchor-mode="iceland"]`
  treffer panet, ikke `.norge-detail-tile`. Da fanger CSS filter alle
  child-tiles uten aa skape nye sommer.
- Ingen endring i tile-loading, cache, URL-bygging, prioritet.
- Ingen endring i anker, aeProject, GE-grid, solsirklene, transform,
  tile-posisjon, kartskala, rotasjon eller interne proporsjoner.
- Ingen flytting av kartflater. Filteret er rent visuelt og endrer ikke
  geometrisk plassering av en eneste pixel.

## Hva som skjer hvis testen ikke treffer

Hvis brightness/contrast/saturate ikke gir tilfredsstillende match:

1. Forsoek finere verdier. Tre nivaaer er klargjort:
   - Mild: `brightness(0.96) contrast(1.02) saturate(0.98)`
   - Medium: `brightness(0.94) contrast(1.04) saturate(0.96)` (foreslaatt foerst)
   - Sterk: `brightness(0.92) contrast(1.06) saturate(0.94)`
2. Hvis grunntonen er feil i seg selv, kan vi vurdere aa proeve i motsatt
   retning - juster Norge oppover heller enn Island nedover.
3. Hvis ingen filter-kombinasjon treffer, stopp og vurder kartdata-niva
   (det vil si be Kartverket eller LMI om annen styling), ikke utvid med
   blur eller canvas.

Vi stopper ved filter-niva. Vi gjor ikke jakt paa stadig sterkere effekter.

## Hva som leveres naar planen er godkjent

Naar Jone godkjenner denne planen, leverer jeg en CSS-only patch som:

- Legger til de tre CSS-variablene paa `.norge-clean-pixelflate`
- Setter variabel-overrides under `[data-anchor-mode="iceland"]`
- Endrer kun `index.html` (eller en dedikert CSS-blokk der), ikke `app.js`
- Ingen JavaScript-endring
- Lett aa reversere ved aa kommentere ut tre linjer

Foer det skrives, venter jeg paa godkjenning av denne planen.

## Branch og videre flyt

Plan-dokumentet pushes til `claude/v7-pane-tone-match-plan` som
markdown. Ingen `app.js`-endring i denne branchen. Eventuell senere
CSS-patch lages som ny commit eller ny branch etter godkjenning.
