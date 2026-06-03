# Respons til oppdrag: Lag 3 — Three.js snapshot-bro (kun plan)

**Agent:** Grok
**Oppdrag:** OPPDRAG-GROK-LAG3-SNAPSHOT-BRO.md
**Base:** codex/v7-next-dev-source
**Branch for denne planen:** grok/v7-lag3-snapshot-bro-plan
**Status:** Plan – ingen kode levert i denne runden

## 1. Overordnet arkitektur for Lag 3

Lag 3 bygges som et **helt isolert visuelt overlay-lag** som kun aktiveres når brukeren slår på «Visuell modus».

- Lag 1 (kartflate, aeProject, anker, GE-grid, solsirklene) forblir urørt i alle modi.
- Lag 2 (tile-loading, cache, tile-URL) forblir urørt.
- Lag 3 leser kun DOM-tilstanden fra Lag 1 når visuell modus slås på, og rendrer en statisk snapshot som tekstur på et flatt Three.js-plane.
- Når visuell modus slås av, fjernes Lag 3 fullstendig fra DOM og minne.

Målet er å gi mulighet for avansert visuell rendering (lys, atmosfære, solbane-effekter) uten å kompromittere den matematiske presisjonen eller pikselidentiteten i Måle-modus.

## 2. Three.js-versjon og import-strategi

**Anbefalt:** Three.js r170 (stabil, god WebGPU-støtte via WebGPURenderer med fallback).

**Import-strategi (ESM, ingen build-steg):**
- Importer via esm.sh eller jsDelivr CDN for å holde det enkelt og uten npm.
- Bruk kun nødvendige moduler: `three`, `OrbitControls` (valgfritt for testing), og senere `EffectComposer` + `RenderPass` / `ShaderPass` for post-processing.
- All kode for Lag 3 legges i en egen mappe `src/layers/lag3-threejs/` med én hovedfil `Lag3SnapshotBro.js` som eksporterer en klasse.

Dette gir ren ESM-import og gjør det enkelt å bytte til WebGPU senere uten å endre resten av prosjektet.

## 3. Plassering av Three.js-canvas i DOM

**Anbefalt struktur:**

```html
<div id="map-container">          <!-- Eksisterende container for Lag 1 -->
  <div id="norge-clean-detail-layer">...</div>
  <div id="norge-screen-detail-layer">...</div>

  <!-- Lag 3 legges her -->
  <div id="lag3-threejs-overlay" style="position:absolute; top:0; left:0; width:100%; height:100%; z-index: 2; pointer-events: none;">
    <canvas id="lag3-canvas"></canvas>
  </div>
</div>
```

- z-index: 2 (over Lag 1 som har z-index 1).
- pointer-events: none på overlayet – slik at all interaksjon (pan, zoom, klikk) fortsatt går til Lag 1.
- Canvaset får pointer-events: auto kun når det trengs for testing (f.eks. OrbitControls i lab-modus).
- Overlayet legges til og fjernes dynamisk via JavaScript når visuell modus toggles.

Dette sikrer at Lag 3 aldri blokkerer eller forstyrrer Lag 1.

## 4. Hvordan snappe DOM til tekstur

**Anbefalt primær metode:** html2canvas (v1.4+) med høy kvalitet.

Begrunnelse:
- Enkel å bruke, støtter de fleste DOM-elementer og CSS.
- Gir god kontroll på oppløsning (scale-parameter).
- Kan kjøres on-demand ved toggle eller manuell trigger.

Alternativer vurdert og hvorfor de ikke anbefales som primær:
- Native Document Picture-in-Picture / OffscreenCanvas: For komplisert for snapshot av et helt kart med flere lag og tiles. Krever ekstra tillatelser og gir dårligere kvalitet på tekst.
- CSS Paint API: For lavnivå og krever registrering av paint worklets – overkill for dette formålet.
- Direkte rendering fra `<img>`-tiles til Three.js textures: Mulig, men svært kompleks å synkronisere pan/zoom/transform nøyaktig. Risikerer feil i posisjonering.

Hybrid-forslag (senere optimalisering):
Start med html2canvas. Senere kan man optimalisere ved å rendre kun de synlige tile-bildene direkte til en Three.js CanvasTexture hvis ytelse blir et problem.

## 5. Størrelse og posisjonering av flat-objektet i scenen

Prinsipp: Planet i Three.js-scenen skal alltid være 100 % flatt og i perfekt samsvar med DOM-kartets synlige område.

- Bruk PlaneGeometry med bredde/høyde som matcher viewport-størrelsen i piksler (konvertert til Three.js-enheter via en fast skala-faktor, f.eks. 1 pixel = 0.01 units).
- Kameraet plasseres rett over planet (orthografisk eller perspektiv med svært lav vinkel) slik at det ser rett ned.
- Når brukeren paner eller zoomer i Lag 1, oppdateres snapshotet (se punkt 6). Selve planet flyttes eller skaleres aldri – kun kameraet og lyskildene beveger seg relativt til planet.

Dette overholder regelen: kartflatens anker, transform, skala og rotasjon forblir urørt.

## 6. Når og hvordan snapshot oppdateres

Anbefalt strategi:
- Ved toggle til Visuell modus: Ta ett snapshot umiddelbart.
- Ved pan-slutt og zoom-slutt: Ta nytt snapshot (bruk requestIdleCallback eller en kort debounce for å unngå for mange oppdateringer).
- Manuell trigger: Legg til en knapp «Oppdater visuell visning» i UI-en (valgfritt, for testing).
- Kontinuerlig oppdatering: Ikke anbefalt i første versjon – det vil gi unødvendig CPU/GPU-belastning og kan forstyrre ytelsen i Måle-modus.

Snapshotet lagres som en THREE.CanvasTexture og oppdateres på materialet til planet.

## 7. Sikring av pikselidentitet i Måle-modus

Når visuell modus er av:
- Hele Lag 3 (div + canvas) fjernes fullstendig fra DOM.
- Three.js-scene, renderer og alle ressurser ryddes opp (dispose).
- DOM-kartet vises nøyaktig som før – ingen overlay, ingen ekstra elementer, ingen stilendringer.

Dette garanterer pikselidentitet.

## 8. Risiko og bivirkninger

Hovedrisikoer:
- html2canvas kan ha problemer med visse CSS-effekter eller eksterne bilder (CORS). Løsning: Bruk useCORS: true og test grundig med de faktiske tile-kildene.
- Ytelse ved store viewports: html2canvas kan være treg på veldig store områder. Løsning: Begrens snapshot til synlig viewport + en liten buffer.
- Minnelekkasje hvis ikke dispose kjøres riktig ved toggle av.

Bivirkninger som må unngås:
- Aldri endre noen stiler på Lag 1-elementer.
- Aldri legge til event listeners som kan fange opp pan/zoom fra Lag 1.
- Aldri endre transform eller posisjon på eksisterende DOM-elementer.

## 9. Forbudte ting i Lag 3 (som kan friste senere)

- Post-processing som endrer farger eller kontrast på kartet permanent.
- Automatisk reprojeksjon eller warping av planet.
- Lerret-forskyvning eller animasjon av selve planet ved zoom.
- Bruk av Three.js OrbitControls som primær interaksjon (kun for intern testing).
- Rendering av solbane eller andre elementer som overlapper og skjuler viktige måle-elementer uten mulighet for å slå av.

## 10. Hvordan Lag 3 kan slås helt av

Én enkelt toggle i UI (bygget i Steg 1):
- Fjern `<div id="lag3-threejs-overlay">` fra DOM.
- Kall renderer.dispose(), scene.clear(), nullstill alle referanser.
- Fjern alle event listeners knyttet til Lag 3.

Resultat: Ingen spor etter Lag 3 i DOM, ingen ekstra minnebruk, ingen stilendringer.

## 11. Testing av pikselidentitet

Anbefalt metode:
- Ta et referanse-screenshot i ren Måle-modus (før Lag 3 er implementert).
- Implementer Lag 3.
- Toggle til Visuell modus og deretter tilbake til Måle-modus.
- Ta nytt screenshot og sammenlign med referansen (enten manuelt visuelt eller med verktøy som pixelmatch / resemblejs i en test-suite).
- Dokumenter eventuelle forskjeller og korriger til null synlige avvik.

## 12. Filer som vil bli endret i fremtidig patch (etter godkjenning)

Vil bli endret:
- src/layers/lag3-threejs/Lag3SnapshotBro.js (ny fil)
- index.html eller hoved-HTML (legge til overlay-container)
- UI-toggle (bygget i Steg 1 av motor-arkitektur)

Vil aldri bli rørt:
- Alle filer knyttet til Lag 1 (aeProject, anker, GE-grid, solsirklene, transform-logikk)
- Alle filer knyttet til Lag 2 (tile-loading, cache, tile-URL)
- app.js kjerne (med mindre det er en ren import av Lag 3-modulen)
- Kartflate-proporsjoner eller posisjonering

## 13. Konklusjon og anbefaling

Denne planen muliggjør avansert visuell rendering som et rent, isolert overlay uten å kompromittere den eksisterende motorens presisjon eller pålitelighet.

Vi starter enkelt med html2canvas + statisk snapshot, og holder døren åpen for senere optimaliseringer (direkte tile-rendering) uten å låse oss inn i komplekse løsninger fra dag én.

Planen respekterer alle ufravikelige forbud og sikrer at Måle-modus alltid forblir pikselidentisk med dagens tilstand.

---

Levert av Grok – 4. juni 2026
