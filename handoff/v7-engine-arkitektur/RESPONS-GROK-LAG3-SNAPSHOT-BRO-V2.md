# Respons til oppdrag: Lag 3 — Three.js snapshot-bro (V2 – revidert)

**Agent:** Grok
**Oppdrag:** OPPDRAG-GROK-LAG3-SNAPSHOT-BRO.md + kommentarer i KOMMENTARER-GROK-LAG3-RUNDE-1.md
**Base:** codex/v7-next-dev-source
**Branch for denne planen:** grok/v7-lag3-snapshot-bro-plan-v2
**Status:** Revidert plan – ingen kode levert i denne runden

## 1. Overordnet arkitektur for Lag 3

Lag 3 bygges som et **helt isolert visuelt overlay-lag** som kun aktiveres når brukeren slår på «Visuell modus».

- Lag 1 (kartflate, aeProject, anker, GE-grid, solsirklene) forblir urørt i alle modi.
- Lag 2 (tile-loading, cache, tile-URL) forblir urørt.
- Lag 3 leser kun DOM-tilstanden fra Lag 1 når visuell modus slås på, og rendrer en statisk snapshot som tekstur på et flatt Three.js-plane.
- Når visuell modus slås av, fjernes Lag 3 fullstendig fra DOM og minne.

Målet er å gi mulighet for avansert visuell rendering (lys, atmosfære, solbane-effekter) uten å kompromittere den matematiske presisjonen eller pikselidentiteten i Måle-modus.

## 2. Three.js-versjon og import-strategi (revidert)

**Låst versjon:** Three.js **r170** via eksakt CDN-URL.

**Anbefalt import (ESM, ingen build-steg):**

```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js"
  }
}
</script>
```

**Offline / vendor-strategi:**
- Ved første stabile release lastes `three.module.js` (r170) ned og plasseres i `vendor/three@0.170.0/three.module.js`.
- Alle imports byttes deretter til lokal sti: `./vendor/three@0.170.0/three.module.js`.
- Dette sikrer at Lag 3 fungerer 100 % offline og er uavhengig av eksterne CDNs etter initial nedlasting.

## 3. Plassering av Three.js-canvas i DOM

**Anbefalt struktur:**

```html
<div id="map-container">
  <!-- Lag 1 elementer -->
  <div id="lag3-threejs-overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; z-index: 2; pointer-events: none;">
    <canvas id="lag3-canvas"></canvas>
  </div>
</div>
```

- z-index: 2 (over Lag 1).
- pointer-events: none på overlayet – all interaksjon går til Lag 1.
- Overlayet legges til og fjernes dynamisk når visuell modus toggles.

## 4. Hvordan snappe DOM til tekstur (revidert)

**Primær metode:** html2canvas v1.4.1 (låst via CDN eller vendor).

**CSS filter på Island-panen:**
- html2canvas v1.4+ har begrenset støtte for CSS filter (spesielt hue-rotate, saturate og contrast på enkelte elementer). Island-panen bruker flere slike filtre.

**Løsning:**
- Ved snapshot kjøres html2canvas med `ignoreElements` på elementer som har tunge filtre, eller filtre fjernes midlertidig under snapshot (gjenopprettes etterpå).
- Pixel-diff-test innføres som del av testprosedyren: Ta referanse-screenshot i ren Måle-modus, aktiver visuell modus, deaktiver igjen, og sammenlign med pixelmatch eller visuell inspeksjon. Eventuelle avvik dokumenteres og rettes før patch.
- Hvis problemet viser seg å være for stort, faller vi tilbake til direkte rendering av synlige tile-bilder til en CanvasTexture (hybrid-tilnærming).

## 5. Størrelse og posisjonering av flat-objektet i scenen

Planet i Three.js-scenen skal alltid være 100 % flatt og i perfekt samsvar med DOM-kartets synlige område.

- Bruk PlaneGeometry med bredde/høyde som matcher viewport-størrelsen.
- Kameraet plasseres rett over planet.
- Selve planet flyttes eller skaleres aldri – kun kameraet og lyskildene beveger seg relativt til planet.

Dette overholder regelen: kartflatens anker, transform, skala og rotasjon forblir urørt.

## 6. Når og hvordan snapshot oppdateres

- Ved toggle til Visuell modus: Ta ett snapshot umiddelbart.
- Ved pan-slutt og zoom-slutt: Ta nytt snapshot (debounce + requestIdleCallback).
- Manuell trigger: Knapp «Oppdater visuell visning» (valgfritt).
- Kontinuerlig oppdatering anbefales ikke i første versjon.

## 7. Sikring av pikselidentitet i Måle-modus

Når visuell modus er av:
- Hele Lag 3 (div + canvas) fjernes fullstendig fra DOM.
- Three.js-scene, renderer og alle ressurser ryddes opp (dispose).
- DOM-kartet vises nøyaktig som før – ingen overlay, ingen ekstra elementer, ingen stilendringer.

## 8. Hard kill-switch via localStorage (nytt punkt)

Lag 3 skal ha en hard kill-switch som kan slås på uten å endre kode:

```javascript
if (localStorage.getItem('enok72.lag3.disabled') === '1') {
  console.warn('[Lag3] Hard kill-switch aktivert via localStorage. Lag 3 lastes ikke.');
  return; // Avslutt initialisering umiddelbart
}
```

- Denne sjekken legges først i `lag3-threejs.js`.
- Når `enok72.lag3.disabled = "1"` er satt i localStorage, skal Lag 3 aldri initialiseres, aldri legge til elementer i DOM, og aldri laste Three.js.
- Dette gir systemutvikleren full kontroll til å deaktivere hele laget uten å røre kildekoden.

## 9. Risiko og bivirkninger

- html2canvas + CSS filter på Island-panen (håndteres via `ignoreElements` + pixel-diff-test).
- Ytelse på store viewports (begrenses til synlig viewport + buffer).
- Minnelekkasje (løses med korrekt dispose ved toggle av).

## 10. Forbudte ting i Lag 3

- Post-processing som endrer farger eller kontrast på kartet permanent.
- Automatisk reprojeksjon eller warping av planet.
- Lerret-forskyvning eller animasjon av selve planet ved zoom.
- Bruk av Three.js OrbitControls som primær interaksjon.
- Rendering av elementer som overlapper og skjuler viktige måle-elementer uten mulighet for å slå av.

## 11. Hvordan Lag 3 kan slås helt av

Én enkelt toggle i UI + hard kill-switch via localStorage som beskrevet i punkt 8.

## 12. Testing av pikselidentitet

- Ta referanse-screenshot i ren Måle-modus.
- Implementer Lag 3.
- Toggle til Visuell modus og tilbake til Måle-modus.
- Sammenlign med referansen (visuelt + pixel-diff-test).
- Dokumenter og korriger til null synlige avvik.

## 13. Filer som vil bli endret i fremtidig patch (etter godkjenning)

**Vil bli endret:**
- `lag3-threejs.js` (flat fil i rot)
- `index.html` eller hoved-HTML (legge til overlay-container)
- UI-toggle (bygget i Steg 1)

**Vil aldri bli rørt:**
- Alle filer knyttet til Lag 1 (aeProject, anker, GE-grid, solsirklene, transform-logikk)
- Alle filer knyttet til Lag 2 (tile-loading, cache, tile-URL)
- `app.js` kjerne (med mindre det er en ren import av Lag 3-modulen)
- Kartflate-proporsjoner eller posisjonering

## 14. Konklusjon og anbefaling

Denne reviderte planen (V2) tar hensyn til alle fire kommentarene fra systemutvikleren:

- Three.js-versjon er nå låst + offline-strategi beskrevet.
- html2canvas + CSS filter-problem er avklart med pixel-diff-test som sikkerhetsnett.
- Filstruktur endret til flat fil `lag3-threejs.js` i rot (ingen bundler).
- Hard kill-switch via `localStorage.getItem('enok72.lag3.disabled')` er lagt til.

Planen respekterer alle ufravikelige forbud og sikrer at Måle-modus alltid forblir pikselidentisk.

---

Levert av Grok – revidert versjon basert på kommentarer (Runde 1)
Dato: 4. juni 2026
