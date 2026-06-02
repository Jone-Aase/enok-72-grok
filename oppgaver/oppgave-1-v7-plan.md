# Oppgave 1: v7 — 2D tile-pane med 3-anker-kalibrering

Tildelt: Grok
Status: Fase 1 (plan) — ingen kode ennå
Branch når kode starter: `grok/v7-tile-pane-prototype`

Gjeldende fase-A-status og milepæler: `dokumenter/fase-A-plan.md` — slå opp der før du starter.

## Bakgrunn

Dagens motor (v6) tegner Kartverket-tiles som 3D-mesh inni Three.js-scenen.
Det fungerer ned mot z=11, men taper detaljer fordi det fundamentalt tenker i
én stor AE-flate, ikke i skjermtiles. Leaflet (som vi nettopp fjernet) hadde
ikke dette problemet fordi den tenkte i 256px skjermtiles og kunne gå til z=18/z=19
(1:5000-nivå).

ChatGPTs forslag: Vi lager en **Leaflet-lignende tile-pane** ovenpå 3D-scenen —
men i stedet for Leaflets eget koordinatsystem styrer 3-anker-systemet vårt
pane-ens posisjon, rotasjon og skala. Da får vi Leaflets oppløsning og smooth
zoom, samtidig som vi beholder AE-projeksjonen og kalibreringen.

## Mål

**Fase 1:** Plan + arkitektur-skisse. INGEN kode i denne fasen.
**Fase 2:** Prototype på branch (etter prosjekteier godkjenner planen).

## Fase 1 — leveranser

Lever som markdown-dokument i repoet: `dokumenter/v7-plan.md` på branch `grok/v7-plan`.

PR mot main. Prosjekteier reviewer og godkjenner før Fase 2 starter.

### Dokumentet skal svare på

1. **Pane-arkitektur:** Skal 2D-panen leve som
   - DOM-overlay (HTML `<div>` med CSS transforms og `<img>`-tiles)?
   - Eget 2D canvas oppå Three.js-canvaset?
   - En WebGL-quad inni Three.js-scenen som teksturers med tile-mosaikk?
   Begrunn valget. Hva er pro/kontra?

2. **Anker-til-pane-transform:** Hvordan oversetter vi
   3-anker-similarity-transformen (M = T2·Ry·S·T1) til pane-ens visuelle transform?
   - Hvis DOM: hvilke CSS-transforms (translate, rotate, scale, matrix3d)?
   - Hvis canvas: hvilken transformasjons-matrise?
   - Hvis WebGL-quad: hvordan kobles M til quad-mesh?

3. **Kamera-synkronisering:** Når brukeren scroll-zoomer eller panorerer i 3D-scenen,
   hvordan oppdateres pane-en?
   - Hvilke kamera-events fanger vi?
   - Hvordan kobler vi 3D-camera.position/dist til pane-ens zoom-nivå og senter?
   - Hva med rotasjon (kameraet ser rett ned, men panen må følge anker-rotasjonen)?

4. **Tile-loading-strategi:**
   - Hvordan velges hvilke tiles som lastes (frustum/viewport)?
   - Hvordan prioriteres (sentrum først, så ut)?
   - Hvordan håndteres zoom-overganger (vis lavere zoom mens høyere lastes)?
   - Cache-strategi.

5. **Synkronisering mellom 3D og 2D:**
   - Hvilke andre lag i 3D-scenen må fortsatt være synlige
     (sol-ringer, GE-grid, kuler, polarsirkler)?
   - Skal panen ligge OVER eller UNDER disse lagene?
   - Hvordan håndteres z-rekkefølge?

6. **Filer som påvirkes:**
   - Liste over filer i `enok-72-grok` som må endres
   - Liste over nye filer som må lages
   - Hva som IKKE røres (anker-systemet, AE-projeksjonen, sol-systemet)

7. **Risiko-vurdering:**
   - Hva kan brytes ved denne endringen?
   - Hva er fallback hvis prototypen ikke virker?
   - Estimat: hvor lang tid tar Fase 2?

## Tekniske referanser (allerede i repoet)

- `app.js` linje ~480–500: `subMap`-strukturen med `norgeKart` og `norgeKartBase` (3D Three.js-grupper)
- `app.js` linje ~2630–2770: `tilesForNorge`, `chooseNorgeZoom`, `buildNorgeTileMesh`
- `app.js` linje ~2770–2855: `computeVisibleAERegion`, `cullTilesByViewport`
- `app.js` linje ~2858+: `computeAnchorMatrix`, `applyAnchorTransform`
- `app.js` linje ~2968+: `updateNorgeBaseLayer` (multi-zoom z=5 base)
- `app.js` linje ~3160+: `applyNorgeInstrumentMode`, `norgeAESenter`
- `GROK-START-HER.md`: konstanter, AE-projeksjon, anker-matrise-formel, tile-URL

## Ankerpunkter (uendret)

- Selsøy: 66.5502°N, 12.8462°Ø
- Kveitanosen: 66.5500°N, 12.6383°Ø
- Arctic Circle Center: 66.5500°N, 15.3266°Ø

## Tile-URL

```
https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png
```

NB: y/x-rekkefølge.

## Regler du må følge (fra GROK-START-HER.md)

1. **Det sanne arealet er ukrenkelig.** Ingen Mercator-matematikk, ingen omprojisering, ingen rutenett-transformasjon, ingen kode og ingen algoritme som endrer det sanne arealet, den sanne avstanden eller den sanne formen skal inn i Instrumentet eller brukes noe sted i dette prosjektet. Tiles fra Kartverket brukes som sanne lokale utklipp og plasseres uendret i AE-rammen via 3-anker-kalibreringen. Brytes denne regelen, brytes hele grunnlaget for Instrumentet.
2. Lengdegrader = GE-grid eksakt. Breddegrader = kun Solens 5 ringer. Norge = sann form, festes til 3 ankerpunkter, IKKE strekkes.
3. Ikke programmer noe før du har sett siste versjon av filen og arket T.
4. Kun Perplexity merger til main. Du kan committe direkte til egen branch `grok/v7-plan` (og senere `grok/v7-tile-pane-prototype`). `main` er beskyttet — du kan ikke pushe dit. Åpne PR mot main når en milepæl er klar, Perplexity merger.
5. Ved tvil — SPØR, ikke gjett.
6. Solen er passeren som brukes til å fastslå breddegradene.
7. Norsk mellom oss i utviklingsfasen. All dokumentasjon skrives både på engelsk og norsk. Tekst inne i Instrumentet er på engelsk.
8. Ikke ramme inn teksten.

Hovedinstrumentet er FRYST. Denne kopien kan endres. Aldri commit direkte til main — alltid via egen branch og PR.

## Spørsmål

Hvis noe er uklart, spør i Perplexity-tråden via prosjekteier. Ikke gjett.

## Arbeidsflyt (oppdatert)

Du har skrivetilgang til repoet. `main` er beskyttet — du kan ikke pushe direkte dit. Slik jobber du:

1. Opprett egen branch lokalt: `git checkout -b grok/v7-plan`
2. Skriv `dokumenter/v7-plan.md` med din uavhengige plan (se spm 1–7 over)
3. Committ underveis med tydelige meldinger: `git commit -m "v7-plan: pane-arkitektur"`
4. Push branchen: `git push origin grok/v7-plan`
5. Åpne PR mot `main` på github.com/Jone-Aase/enok-72-grok
6. Si fra til Jone i Grok-chatten når PR er åpnet
7. Perplexity og Jone reviewer, Perplexity merger
8. Først etter merge starter Fase 2

For Fase 2 (prototype): samme flyt, men branch heter `grok/v7-tile-pane-prototype`.

---

Opprettet: 2. juni 2026
Av: Perplexity (på vegne av prosjekteier Jone Aase)
