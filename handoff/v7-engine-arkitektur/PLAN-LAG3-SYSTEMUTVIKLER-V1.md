# Lag 3 — Three.js snapshot-bro, plan v1

Utfører: systemutvikler
Dato: 2026-06-04
Base: codex/v7-next-dev-source @ dc95a08
Status: Plan til godkjenning. Ingen kode skrives før Jone godkjenner.

## Mål

Visuell modus for instrumentet via et rent overlay-lag. Måle-modus skal være pikselidentisk når Lag 3 ikke er aktivert. Lag 3 rører ikke anker, aeProject, transform, skala, rotasjon, tile-posisjon, GE-grid, solsirklene eller kartflatens proporsjoner.

## Hva som overtas fra Grok-rundene

Alt vi allerede har avklart gjennom V2-godkjenningen og presiseringene fra systemutvikler står. Planen samler dem ett sted:

- ES-modul, ingen window.THREE
- importmap til three@0.170.0
- html2canvas@1.4.1 for snapshot-bildet
- Hard kill-switch via localStorage 'enok72.lag3.disabled'
- Tre pikselidentitets-sjekker i disable()
- Snapshot-guard mot window.__enok72__.lag2Exporting
- Minimal overflate: kun ny fil + minimal head-tilføyelse i index.html
- Public API: enable / disable / updateSnapshot / isActive

Nytt sammenlignet med Grok-versjonen: debounced pan/zoom-snapshot tas med fra start.

## Public API (uendret fra V2)

```
window.Lag3 = {
  enable()        // Promise<boolean>
  disable()       // void
  updateSnapshot()// Promise<void>
  isActive()      // boolean
}
```

## Filer som skal røres

| Fil | Status | Endring | Anslag |
| - | - | - | - |
| lag3-threejs.js | NY (rot) | hele filen | ca. 230-260 linjer |
| index.html | ENDRING | kun innskudd rett før `</head>` | +5 linjer, 0 fjernet |

Ingen andre filer. Ingen mappestruktur. Ingen README i denne patchen.

## Eksakt diff for index.html (alle 5 nye linjer)

Plassering: rett før `</head>`, etter eksisterende script-tags.

```
<!-- === LAG 3: Three.js snapshot-bro (minimal integrasjon) === -->
<script type="importmap">{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js"}}</script>
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<script type="module" src="lag3-threejs.js"></script>
```

Merk: `type="module"` på lag3-threejs.js er kritisk for at `import * as THREE from 'three'` skal fungere via importmap.

## Lag3-modulens struktur

### Initialisering ved load
- Setter `window.Lag3` med fire metoder
- Ingen DOM-mutasjon
- En log-linje til konsoll: `[Lag3] ES-modul lastet`
- Lager `window.__enok72__` hvis det ikke finnes (delt namespace med Lag 2)

### enable()
- Sjekk hard kill-switch — return false hvis aktiv
- Hvis allerede aktiv: return true
- Snapshot DOM-baseline for senere verifikasjon (innerHTML av map-container, head style/link count, canvas count i map-container)
- Opprett overlay-div, append til map-container
- Initialiser Three.js scene, camera, renderer, lys, plan
- Bind pan/zoom-debounce listeners (se nedenfor)
- Kjør første snapshot
- Start animasjons-loop
- Return true

### disable()
- Stopp rAF
- Stopp pan/zoom-listeners
- Fjern overlay-div fra DOM (removeChild, ikke display:none)
- Dispose renderer, texture, scene
- Verifiser pikselidentitet (3 sjekker) mot baseline lagret i enable()
  - Sjekk 1: map-container.innerHTML matcher baseline
  - Sjekk 2: head style/link count uendret
  - Sjekk 3: canvas count i map-container uendret
- Log resultat: "3/3 bestått" eller "advarsel: X/3"
- Nullstill all intern state

### updateSnapshot()
- Hvis ikke aktiv: return
- Hvis `window.__enok72__.lag2Exporting === true`: hopp over (log info)
- Hvis html2canvas mangler: log warning, return
- Sett `window.__enok72__.lag3Snapshotting = true` (try/finally)
- Kall html2canvas med `ignoreElements` for overlay-div
- Lag CanvasTexture, dispose forrige
- Sett texture på plane.material, needsUpdate
- finally: sett `lag3Snapshotting = false`

### Debounced pan/zoom-snapshot
- Lytte på `pointerup` på map-container, og `wheel` med scheduling
- Debounce 300 ms etter siste interaksjon
- Innenfor debounce: `requestIdleCallback` (fallback `setTimeout(0)`) før `updateSnapshot()` kalles
- Forhindrer kollisjon med Lag 2 ved at både den og Lag 3 går via idle-kø
- Eksplisitt guard mot `lag2Exporting` flagg på topp av snapshot

### Kollisjonshåndtering mot Lag 2 (eksplisitt)
- Lag 3 leser `window.__enok72__.lag2Exporting`
- Hvis flagget ikke finnes: behandles som false (Lag 3 fungerer alene før Steg 2b)
- Hvis true: snapshot hopper over, retry på neste debounced trigger
- Lag 3 setter selv `window.__enok72__.lag3Snapshotting = true/false` rundt html2canvas slik at Perplexety eventuelt kan koordinere fra sin side i fremtidige iterasjoner

## Pikselidentitets-verifikasjon (eksakt)

Tre sjekker i `disable()` mot baseline lagret i `enable()`:

1. `currentInnerHTML === baseline.innerHTML` (strict streng-sammenligning)
2. `document.head.querySelectorAll('style, link').length === baseline.headStyleLinkCount`
3. `mapContainer.querySelectorAll('canvas').length === baseline.canvasCountInMap`

Hvis alle tre er true: `console.log('[Lag3] Pikselidentitet bekreftet 3/3')`.
Hvis noen er false: `console.warn('[Lag3] Pikselidentitet advarsel:', {check1, check2, check3})`.

Lag 3 endrer aldri noen Lag 1-symboler, så hvis disse sjekkene gir advarsel er det en bug i Lag 3 — ikke i Lag 1.

## Hard kill-switch

`localStorage.setItem('enok72.lag3.disabled', '1')` blokkerer enable() fra å gjøre noe. Modulen laster, men gjør ingenting. Måle-modus garantert pikselidentisk.

## Hva Lag 3 ALDRI gjør

- Endrer ikke aeProject, transform, solveCleanSimilarity, withNorgeNorthShift
- Endrer ikke NORGE_SURFACE_META, NORGE_SURFACE_CONTROL_POINTS
- Endrer ikke solsirkler, GE-grid, anker
- Lager ikke `<style>` eller `<link>` i `<head>` ut over det importmap/script-tags i index.html allerede gjør
- Lager ikke canvas i map-container annet enn den ene inne i overlay-div (som rives ved disable)
- Skriver ikke til IndexedDB
- Endrer ikke historikk eller scroll-posisjon

## Verifikasjon før patch pushes

1. Lokal test: instrumentet kjører fra `codex/v7-next-dev-source` med min patch lagt på
2. Snapshot av visuell modus tas, sammenlignes med Grok-versjonens visuelle output (referanse: lag3-threejs.js på commit 76422918)
3. Pikselidentitets-sjekkene kjøres manuelt: enable → disable → konsoll viser 3/3 bestått
4. Lag 2-flagget mockes (window.__enok72__.lag2Exporting = true) for å verifisere at snapshot venter
5. Hard kill-switch testes
6. Diff-størrelse rapporteres: index.html må være +5/-0, lag3-threejs.js må være en ren ny fil

Først etter alle seks punkter er bestått, pushes patchen.

## Pushrutine (lærdom fra Grok-runden)

- Branch: `claude/v7-lag3-implementasjon`
- Author på commit: `Claude (via Perplexity) <claude@enok-72.local>` (samme som tidligere)
- Etter push: kjør lokalt `git ls-remote ...` for å verifisere at SHA-en faktisk eksisterer på GitHub
- Diff-størrelse fra GitHub rapporteres til Jone, ikke fra lokal kopi
- Hvis diff-størrelsen avviker fra forventet: stopp, ikke be om merge

## Hva som ikke er med i denne patchen

- UI-toggle (knapp i index.html for å skru av/på). Tas i iterasjon 2 når plassering avklares med deg
- Avanserte visuelle effekter (godrays, atmosfære, sol-bane med tidsstempel). Iterasjon 2+
- Skygge-rendering. Iterasjon 2+

Disse er ikke nødvendige for å bevise at lag-arkitekturen fungerer. Første patch skal være minimal og bevisbar.

## Innstilling

Planen er klar for godkjenning. Når Jone sier ok, leverer systemutvikler patchen på branch `claude/v7-lag3-implementasjon` med kun en commit som inneholder begge filer.
