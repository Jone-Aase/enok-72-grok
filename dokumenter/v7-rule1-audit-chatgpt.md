# v7 Rule 1 Audit - Norgeskart Motor

## Norsk

Status: v7-motoren fungerer visuelt og er bekreftet i Instrumentet. Den viser Kartverket-detaljer inne i samme instrumentflate uten at Leaflet lastes.

Denne auditens konklusjon er likevel betinget: motoren er en god arbeidsprototype, men den er ikke ren nok som endelig v7-clean før tile-geometrien er ryddet etter Rule 1.

### Det som er trygt

- `latToR()` og `aeProject()` matcher Instrumentets AE/GE-formel.
- Norgeskartet kjører inne i Instrumentet, ikke i iframe.
- Leaflet lastes ikke i den aktive motoren. Testet status: `window.L === false`, Leaflet-DOM = 0.
- UN AE-kartet og Norgeskartet er gjensidig eksklusive i aktiv bruk.
- Mus/pan/zoom er knyttet til instrumentkameraet.
- Ark T er lest fra `sol-bane-arkT.json` og sol-/portdata er ikke endret i denne runden.
- De tre kontrollpunktene finnes i koden:
  - Selsøy gården: 66.5502 N, 12.8462 E
  - Kveitanosen: 66.5500 N, 12.6383 E
  - Arctic Circle Center: 66.5500 N, 15.3266 E

### Det som må renses før v7-clean

Motoren bruker WebMercator-formler i `lonLatToTile()`, `tileYToLat()`, `tileBounds()` og `mercatorMeters()`.

Noe av dette er akseptabelt som ren tile-adressering, fordi Kartverket WMTS selv bruker `webmercator/{z}/{y}/{x}.png`. Men i dagens prototype brukes `tileBounds()` videre til å plassere hvert tile i Instrumentet:

- `tileBounds()` beregner nord/sør/vest/øst fra WebMercator tile-indekser.
- Disse grensene sendes inn i `aeProject()`.
- Tile-bildet strekkes deretter til en skjerm-bounding-box fra de projiserte hjørnene.

Det betyr at WebMercator indirekte påvirker hvor hvert bildeutklipp ligger i instrumentflaten. Det er nyttig visuelt, men det er ikke Rule 1-rent nok som endelig arkitektur.

### Viktig skille

Tillatt i v7-clean:

- Bruke Kartverket/OSM tile-indekser og URL-format kun for å hente riktige bildefiler.
- Bruke WebMercator kun som kildeadresse/pikselindeks hvis det holdes helt utenfor Instrumentets geometri.

Ikke tillatt i v7-clean:

- Bruke WebMercator tilegrenser til å bestemme AE-plassering.
- La tile-hjørner reprojiseres til AE som om de bestemmer sann form.
- La per-tile projeksjon styre avstand, areal, skala eller form.

### Anbefalt v7-clean arkitektur

Bygg en todelt motor:

1. Source pane
   - En intern Kartverket-pikselflate som henter tiles slik Leaflet gjør.
   - Tile x/y/z brukes bare til å fylle denne pikselflaten.
   - Dette er ikke Instrument-geometri, bare bildehenting og pikselpakking.

2. Instrument placement
   - Hele Norge-panelet plasseres i AE-flaten med én similarity-transform.
   - Transformen bestemmes av de tre polarsirkelankerne og korrekt nord.
   - Ingen per-tile AE-projeksjon.
   - Ingen Mercator-matematikk får bestemme Instrumentets form, avstand eller areal.

Dette beholder Kartverket-detaljer og gjør samtidig Rule 1 tydelig.

### Funksjonsgap mot `norge.html`

Funksjoner som finnes eller delvis finnes:

- Basekart: topograatone, topo, toporaster, OSM.
- Sjøkart: koblet inn.
- Geografisk grid: finnes som SVG-lag.
- Square grid: finnes som SVG-lag.
- Byer: finnes, men bør sjekkes mot original liste og popup/klikk.
- Måling: finnes i ny motor, men bør gjennomgås mot Rule 1 før den brukes som sann måling.
- Markørposisjon: finnes, men må valideres etter v7-clean-transform.

Funksjoner som krever arbeid:

- Norge i bilder: ny tjeneste krever token. Koden har token-støtte, men flyfoto vises ikke uten gyldig tilgang.
- Leaflet-referansens popup/tooltip-opplevelse er ikke fullt gjenskapt.
- Zoomnivåer bør stabiliseres mer Leaflet-aktig, men uten å bruke Leaflet som motor.
- Gamle Leaflet-funksjoner finnes fortsatt i `app.js` som fallback/legacy og bør fjernes i v7-clean etter at ny motor er stabil.

### Risiko

- Dagens prototype kan se riktig ut, men er ikke matematisk ren etter Rule 1.
- Tile-antallet kan bli høyt ved flere lag samtidig.
- Sjøkart + basekart + NIB kan gi lagrekkefølge og lesbarhetsproblemer.
- NIB-token må avklares før flyfoto kan regnes som del av komplett pakke.
- Måleverktøyet bruker fortsatt forenklet flat formel og må ikke presenteres som endelig sann avstand før audit.

### Anbefalt neste steg

Ikke bygg nye funksjoner ennå.

Neste utviklingsrunde bør være `v7-clean`:

- Behold visuell v7-prototype som referanse.
- Lag separat ryddet motor der WebMercator kun brukes til tile-adressering.
- Flytt all Instrument-plassering til én 3-anker similarity-transform.
- Fjern aktiv bruk av per-tile AE-projisering.
- Fjern gamle Leaflet-fallbacker når v7-clean er verifisert.
- Test mot `norge-original` med samme område, samme zoomfølelse og samme lagvalg.

## English

Status: the v7 engine works visually and has been confirmed inside the Instrument. It renders Kartverket detail tiles inside the same Instrument surface without loading Leaflet.

The audit conclusion is conditional: the engine is a strong working prototype, but it is not clean enough to become the final v7-clean architecture until the tile geometry is cleaned up under Rule 1.

### Safe Parts

- `latToR()` and `aeProject()` match the Instrument's AE/GE formula.
- The Norway map runs inside the Instrument, not in an iframe.
- Leaflet is not loaded by the active engine. Verified status: `window.L === false`, Leaflet DOM = 0.
- The UN AE map and Norway map are mutually exclusive in active use.
- Mouse pan and zoom are connected to the Instrument camera.
- Ark T is read from `sol-bane-arkT.json`; solar/gate data was not changed in this round.
- The three control points are present in code:
  - Selsøy garden: 66.5502 N, 12.8462 E
  - Kveitanosen: 66.5500 N, 12.6383 E
  - Arctic Circle Center: 66.5500 N, 15.3266 E

### Must Be Cleaned Before v7-clean

The engine uses WebMercator formulas in `lonLatToTile()`, `tileYToLat()`, `tileBounds()`, and `mercatorMeters()`.

Some of this is acceptable as pure tile addressing, because Kartverket WMTS itself uses `webmercator/{z}/{y}/{x}.png`. However, in the current prototype `tileBounds()` is also used to place each tile inside the Instrument:

- `tileBounds()` computes north/south/west/east from WebMercator tile indices.
- Those bounds are passed into `aeProject()`.
- The tile image is then stretched to a screen bounding box based on projected tile corners.

This means WebMercator indirectly affects where each image cutout appears in the Instrument surface. It is visually useful, but not clean enough under Rule 1.

### Important Boundary

Allowed in v7-clean:

- Use Kartverket/OSM tile indices and URL format only to fetch the correct image files.
- Use WebMercator only as source addressing or pixel indexing if it is kept fully outside Instrument geometry.

Not allowed in v7-clean:

- Use WebMercator tile bounds to determine AE placement.
- Reproject tile corners into AE as if they define true shape.
- Let per-tile projection control distance, area, scale, or form.

### Recommended v7-clean Architecture

Build a two-part engine:

1. Source pane
   - An internal Kartverket pixel surface that fetches tiles in a Leaflet-like way.
   - Tile x/y/z is used only to fill this pixel surface.
   - This is not Instrument geometry, only image fetching and pixel packing.

2. Instrument placement
   - The whole Norway pane is placed on the AE surface using one similarity transform.
   - The transform is determined by the three Arctic Circle anchors and correct north.
   - No per-tile AE projection.
   - No Mercator math may determine Instrument form, distance, or area.

This keeps Kartverket detail while making Rule 1 explicit.

### Functional Gaps Against `norge.html`

Present or partly present:

- Base maps: topograatone, topo, toporaster, OSM.
- Sea chart: connected.
- Geographic grid: present as SVG layer.
- Square grid: present as SVG layer.
- Cities: present, but should be checked against original list and popup/click behavior.
- Measurement: present in the new engine, but must be reviewed under Rule 1 before being treated as true measurement.
- Pointer position: present, but must be validated after the v7-clean transform.

Needs work:

- Norge i bilder: the newer service requires a token. The code has token support, but imagery will not render without valid access.
- The popup/tooltip behavior from the Leaflet reference is not fully recreated.
- Zoom levels should be stabilized in a Leaflet-like way, without using Leaflet as the engine.
- Old Leaflet functions still exist in `app.js` as fallback/legacy and should be removed after v7-clean is verified.

### Risks

- The current prototype may look right while not being mathematically clean under Rule 1.
- Tile count can become high when several layers are enabled simultaneously.
- Sea chart + base map + NIB may create layer order and readability issues.
- NIB token access must be solved before imagery can count as part of the complete package.
- The measurement tool still uses simplified flat formulas and must not be presented as final true distance before audit.

### Recommended Next Step

Do not build more features yet.

The next development round should be `v7-clean`:

- Keep the visual v7 prototype as reference.
- Build a separate cleaned engine where WebMercator is used only for tile addressing.
- Move all Instrument placement to one 3-anchor similarity transform.
- Remove active per-tile AE projection.
- Remove old Leaflet fallbacks after v7-clean is verified.
- Test against `norge-original` using the same area, same zoom feel, and same layer choices.
