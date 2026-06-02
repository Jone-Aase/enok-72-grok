# Overføring: v6-status og full kontekst for ChatGPT og Grok

Dato: 2026-06-02
Avsender: Perplexity (systemkoordinator)
Mottakere: ChatGPT (kvalitetssjekker) og Grok (POC-bygger)
Modelleier: Jone

Denne pakken inneholder:
- Hele `enok-engine-v2-poc-v6/`-mappen slik den står på disk akkurat nå
- Denne overføringsfilen med all kontekst som trengs for å fortsette
- Snapshot av hovedinstrumentet (`hovedinstrument-app.js` + `hovedinstrument-snapshot.html`) som referanse — ikke for endring
- Skjermbilde av v6 etter hengelås (`v6-etter-hengelaas.png`)
- De to varselmeldingene som ble sendt ut da tile-reprojeksjonen ble forkastet

---

## 1. NÅ-STATUS (helt presist)

### v6 på disk
Mappe: `enok-engine-v2-poc-v6/`
- `index.html` — uendret
- `README.md` — uendret
- `src/AEGrid.js` — uendret, ikke knyttet til Kartverket
- `src/AEProjection.js` — uendret, ikke knyttet til Kartverket
- `src/PolarPoints.js` — uendret (med userData)
- `src/poc-main.js` — har hengelås øverst, kaller IKKE `buildAdaptiveLayer` lenger (early-return på `TILE_REPROJECTION_LOCKED`)
- `src/KartverketAdaptive.js` — urørt på disk, men IKKE KALT
- `src/KartverketReprojection.js` — urørt på disk, men IKKE KALT
- `src/TileCache.js` — urørt på disk, brukes kun av KartverketAdaptive.js (foreldreløs i praksis)

### Lokal server
v6 kjører på `http://localhost:8767` (Python http.server fra v6-mappen).

### Visuell tilstand
v6 viser i dag: AE-grid + polarsirkelring + ekvatorring + 3 polarpunkter. Tom 3D-scene utover det. Ingen Kartverket-tiles. Bekreftet med skjermbilde `v6-etter-hengelaas.png`.

---

## 2. HVORFOR TILE-REPROJEKSJONEN BLE FORKASTET

### Regel nr 1 (etablert 2026-06-02 av Jone)
- **Lengdegrader: eksakt like GE-grid** i hovedinstrumentet. aeProject er allerede identisk med hovedinstrumentet.
- **Breddegrader: KUN Solens 5 ringer som passer.** Ingen Mercator-formler. IKKE `atan(sinh(...))`.
- **Norgeskartet skal ha sann form og sanne mål.** Festes til polarsirkelens ankerpunkter — IKKE strekkes per tile-hjørne.
- Eneste justeringsmulighet: polarsirkelens radius.

### Hva v6 gjorde feil
v6 brukte Mercator-formel (`lat = atan(sinh(...))`) for å gå fra tile-Y til lat, og reprojiserte deretter hvert tile-hjørne gjennom `aeProject`. Dette strekker bildet per tile-hjørne. Bryter Rule 1 — breddegrader skal IKKE komme fra Mercator-matematikk.

### Test-resultatene (matematisk solid, men feil premiss)
- z=8 ved 45° vinkel, kontrollpunkter: seg=16 maks world-avvik 0.94 m, seg=32 0.19 m, seg=64 0.03 m
- Pikselavvik 0.0000 på alle nivåer (verste 0.0001 px)
- Skrå-kamera-test: kontrollpunkt-posisjoner uendret i 7 scenarier (0.000 m)
- 504 tiles på z=8 ved Y=5 (45° vinkel)
- KONKLUSJON: matematisk korrekt, men premiss var feil. Tile-reprojeksjon kan ikke brukes uansett hvor presis den blir.

### Hengelås-prinsipp
`TILE_REPROJECTION_LOCKED = true` i `poc-main.js`. `Object.defineProperty(window, '__TILE_REPROJECTION_LOCKED', { writable: false, configurable: false })`. Lang kommentar-blokk med "FORKASTET" og "STOPP. Spør Jone først".

**Hverken Grok, ChatGPT eller Perplexity skal foreslå å gjenåpne hengelåsen. Kun Jone direkte.**

---

## 3. HVA HOVEDINSTRUMENTET FAKTISK GJØR (lest fra `hovedinstrument-app.js`)

### Norgeskartet er ikke en mesh — det er et Leaflet-DOM-overlegg
- Kartverket WMTS-tiles via Leaflet
- Base URL: `https://cache.kartverket.no/v1/wmts/1.0.0/{layerName}/default/webmercator/{z}/{y}/{x}.png`
- Default base: `topograatone`
- Tilgjengelige lag: `topograatone`, `topo`, `toporaster`, `osm` (OpenStreetMap), `sjokartraster` (overlay), `nib` (ortofoto WMS fra wms.geonorge.no)
- Leaflet-kontainer-ID: `norge-leaflet-map`
- LOCKED view: `center: [65.0, 15.0], zoom: 4, placement: { x: 6, y: 8, scale: 1.04 }`

### Bindingen til AE-disken er en SIMILARITY-TRANSFORM, ikke 4-punkts-strekking
Dette er en KRITISK forskjell fra det vi trodde i v6-planen.

Mekanismen ligger i `applyAnchorTransform()` (linje 3241 i `hovedinstrument-app.js`):

1. **Source (3 punkter):** der ankerpunktene ligger på Leaflet-kartet i container-pixels (via `map.latLngToContainerPoint([lat, lon])`).
2. **Destination (3 punkter):** der samme punkter skal ligge på AE-disken, beregnet via `aePointToContainerPx(lat, lon)` som projiserer Three.js-koordinater til skjerm-pixel med kameraets projection-matrise.
3. **Rotasjon:** deterministisk satt til `-lon_senter` (gjennomsnittet av de tre lengdegradene), IKKE utledet fra punktene.
4. **Skala:** RMS-avstand fra senter i destination / RMS-avstand fra senter i source (`solveSimilarity` på linje 3214).
5. **Translasjon:** flytter senter-punktet (gjennomsnitt) til riktig sted.
6. Tredje punkt brukes som uavhengig verifikasjon — residual rapporteres i statuslinjen.

Resultatet er en 2×3 CSS-matrise `matrix(a,b,c,d,tx,ty)` som settes på CSS-variabelen `--norge-anchor-transform` på `#norge-leaflet-map`.

### De 3 ankerpunktene i hovedinstrumentet (linje 2817–2821)
```javascript
const arcticCalibrationPoints = [
  { name: 'Selsøy gården / Polarsirkelen',           ge: `GE: 66°33'0.01"N, 12°50'54.28"E`, lat: 66.5502, lon: 12.8462 },
  { name: 'Kveitanosen / Enganveien Sørnesøya',      ge: `GE: 66°33'0.00"N, 12°38'17.89"E`, lat: 66.5500, lon: 12.6383 },
  { name: 'Arctic Circle Center',                    ge: `GE: 66°33'0.03"N, 15°19'37.24"E`, lat: 66.5500, lon: 15.3266 },
];
```
NB: Arctic Circle Center er `15.3266`, ikke `15.327011`. Tidligere notater hadde feil tall.

Kveitanosen Lon ble korrigert 2026-06-01: 12.8462 → 12.6383 (Jone bekreftet).

Det finnes ikke et fjerde "rett nord"-ankerpunkt i hovedinstrumentet i dag. Spørsmålet om fjerde punkt er åpent og Jone har ikke svart ennå.

### anchorState (linje 3142–3154)
```javascript
const anchorState = {
  polar: {
    points: arcticCalibrationPoints,
    lat:   66.5634,
    km:    0,
    active: true,  // permanent ankret
    lastMatrix: null,
  },
};
window.anchorState = anchorState;
```

### Hvorfor Leaflet ikke kan tilte med 3D-scenen
CSS `matrix(a,b,c,d,tx,ty)` er en 2×3 affin transform. Den kan rotere, skalere, og translere et 2D-DOM-element. Den kan IKKE gjøre perspektiv. Når Three.js-kameraet tilter, så ville Leaflet-laget måtte få et `matrix3d(...)` med perspektiv, og selv det ville bare gjøre overflaten skrå — ikke vise tile-detaljer riktig fra siden.

Det er den eneste grunnen til at en ny motor trengs. Norgeskartet i dagens hovedinstrument har sann form og sanne mål — det er kun "kan ikke tilte"-problemet vi trenger å løse.

### aeProject (identisk i hovedinstrument og v6)
```javascript
const R_EQUATOR_KM = 10001.47;
const R_OUTER_KM = 31420.55;
const SCALE = 1/1000;
const R_OUTER = R_OUTER_KM * SCALE;

function latToR(lat) {
  return R_OUTER * (90 - lat) / 180;
}

function aeProject(lat, lon) {
  const r = latToR(lat);
  let signedLon = lon;
  if (signedLon > 180) signedLon -= 360;
  if (signedLon < -180) signedLon += 360;
  let compassDeg = (180 - signedLon) % 360;
  if (compassDeg < 0) compassDeg += 360;
  const a = (compassDeg / 360) * Math.PI * 2;
  return { x: Math.sin(a) * r, z: -Math.cos(a) * r };
}
```

### Solens 5 ringer (eksakt fra hovedinstrument)
```
Antarktis polarsirkel  latToR(-66.5634) ≈ 27.347 AE = 27 347 km
Capricorn              latToR(-23.7)    ≈ 19.848
Ekvator                latToR(0)        ≈ 15.710
Cancer                 latToR(23.7)     ≈ 11.572
Arctic polarsirkel     latToR(66.5634)  ≈  4.073
```

### Polarsirkel-ring i 3D-scenen
`updatePolarRing()` på linje 3158 bygger en 256-segment ring med radius `R_OUTER_KM * (90 - |lat|) / 180 * SCALE + kmOffset * SCALE`. Eksponert som `window.__polarRings = { arctic, antar }`.

### Kamera-listener-mekanisme (kritisk for v6-port)
Hovedinstrumentet eksponerer `window.__cameraChangeListeners`. Når brukeren panner/zoomer/tilter 3D-scenen, kjøres alle registrerte callbacks etter `applyCamera()`. Anker-systemet registrerer en callback som kaller `requestAnimationFrame(applyAnchorTransform)` ved hver kameraendring. Det er slik Norge "følger med" når man beveger 3D-scenen.

---

## 4. JONES SPRÅK OG INSTRUKSER (verbatim)

- "Ikke gjør noe annet enn det jeg sier. Om du er i tvil om hva jeg mener spør"
- "Ikke ramme inn teksten" (ingen markdown-tabeller eller -rammer)
- Norsk only. Ingen emojis.
- Solen lyser ALLTID (`sunMesh.visible` aldri false)
- Rule 4: "Ikke programmer noe før du har sett siste versjon av filen og arket T"
- Rule 7: Kun Perplexity committer til GitHub
- Rule 8: Ved tvil — SPØR, ikke gjett
- NORGESKART-ARBEIDSREGEL: Norgeskartet skal IKKE endres
- Hovedinstrumentet er FRYST — ingen patch, ingen push
- Perplexity er systemkoordinator/leder

### Jones nøkkelformuleringer denne sesjonen
- "Det hele poenget er hav som er rett utgangspunkt" — A4-ark-rundt-ball-analogi, flat = sannhet
- "Du trenger ikke stramme og presse inn noe som er for stort, du må klippe vekk"
- "Lengdegradene blir de samme på begge modellene"
- "Vi bruker kun passeren (Solens 5 ringer) foreløpig for breddegrader"
- "Vi skal ha norgeskartet urørt og ikke strukket... feste det til de 3 + rett nord"
- "Vi skal lage eksakt sanne GE grid som er på Instrumentet i dag... bare ha en ny motor i stedet for Leaflet"
- "Det kartet vi har av norge i dag har sin sanne form og mål vi trenger ikke hente noe nytt kart"
- "Forkast v6 sin tile-reprojeksjon helt, behold alt annet"

---

## 5. ARBEIDSDELING

- **Grok:** POC-bygger. v6-tile-arbeid avsluttet. Står på vent. Skal IKKE foreslå å gjenåpne hengelåsen. Får oppdrag fra Perplexity når Jone har godkjent ny plan.
- **ChatGPT:** Kvalitetssjekker matematikk. Tester bestått matematisk, men premiss var feil. Står på vent.
- **Perplexity:** Systemkoordinator. Skal lese hovedinstrumentet (gjort) og legge fram plan til Jone (gjort — venter på Jones svar på tre avklaringsspørsmål).
- **Jone:** Modelleier. Etablerte Rule 1 og hengelås-prinsipp.

---

## 6. PERPLEXITYS TRE ÅPNE SPØRSMÅL TIL JONE

Disse ble lagt fram før samtalen ble komprimert og før Jone ba om sletting + zip. Ingen svar ennå.

**Spørsmål 1 — Fjerde ankerpunkt:**
Hovedinstrumentet har 3 punkter, ikke 4. Tre alternativer:
- A: Bruk samme 3 (Selsøy, Kveitanosen, Arctic Center)
- B: Legg til et fjerde selv (Nordpolen 90°N? eller et punkt rett nord for Arctic Center?)
- C: Jone vet hvilket punkt han mener

**Spørsmål 2 — Leaflet ut eller inn?**
- D: Erstatt Leaflet helt. Norgeskartet blir én flat Three.js-mesh, festet med samme similarity-transform til AE-disken. Da kan vi tilte. Tiles hentes som tekstur, IKKE reprojisert.
- E: Behold Leaflet. Kan fortsatt ikke tilte.
Bare D oppfyller "vi må kunne tilte"-kravet som var grunnen til hele POC-en.

**Spørsmål 3 — Kartutsnitt:**
Hvis D: hvilket bbox (lat/lon-grenser) og hvilket zoom-nivå skal vi hente fra Kartverket? Perplexity kan foreslå tall hvis Jone ikke har dem klare.

---

## 7. SISTE EKSPLISITTE INSTRUKSER FRA JONE

1. (Etter compaction-reset) "Først Rens v6 nå — slett KartverketAdaptive.js, KartverketReprojection.js, og fjern relaterte kall i poc-main.js"
2. (Da Perplexity foreslo også å slette TileCache.js): "Slett Kun dette ingenting annet endres eller slettes. KartverketAdaptive.js — skal slettes, KartverketReprojection.js — skal slettes, TileCache.js — IKKE slett."
3. (Da Perplexity sa "men da blir poc-main.js broken"): "Stopp ikke gjør noen ting. Pakk alt inn i en ZIP fil sammen med alt du husker av informasjon som kan overføres til de andre to."

Status: **Ingen filer er slettet. Ingen kode er endret etter hengelås-implementeringen.** v6 står slik den var i sist skjermbilde.

---

## 8. FILER OG STIER (lokal arbeidsmaskin)

- Hovedinstrument lokal kopi: `hovedinstrument-app.js` (260 KB), `hovedinstrument-snapshot.html` (112 KB)
- v6-mappen: `enok-engine-v2-poc-v6/`
- Hovedinstrument live URL (FRYST): https://enok-72-norge-kalibrering.vercel.app
- Hovedinstrument original (FRYST): https://enok72.pplx.app, site_id 854fd5ea-fd3d-4d0f-a665-a4d7de072516
- Lokal v6-server: port 8767

---

## 9. NESTE STEG (når Jone svarer på spørsmålene)

Avhenger av svar. Skissert plan hvis D + 3 punkter:

1. Slett KartverketAdaptive.js og KartverketReprojection.js (Jone godkjente før han ba om stopp)
2. Lag ny `KartverketTexture.js`: henter Kartverket-tiles for et fastsatt bbox/zoom, syr dem sammen til ett tekstur-bilde
3. Lag ny `NorgeMesh.js`: én flat Three.js-mesh som bruker teksturen, posisjonert i AE-rom
4. Lag ny `AnchorSystem.js`: porterer `solveSimilarity` + `applyAnchorTransform` fra hovedinstrumentet til å virke på Three.js-meshet i stedet for CSS-transform
5. Test: Norge må ligge stille på samme sted som i hovedinstrumentet når kameraet står rett over. Når kameraet tilter, skal Norge tilte med (ulikt Leaflet i hovedinstrumentet, som ikke kan)
6. Verifisering: residual på 3. ankerpunkt skal være < 1 px i normal kameravinkel
