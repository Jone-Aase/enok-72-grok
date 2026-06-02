# Oppgave 1: v7 — 2D tile-pane med 3-anker-kalibrering (ChatGPT-parallell)

Tildelt: ChatGPT
Status: Fase 1 (plan) — ingen kode ennå
Leveranse-form: markdown-tekst i chatten med Jone (du har ikke GitHub-skrivetilgang — Perplexity pusher leveransen din til repoet)

Gjeldende fase-A-status og milepæler: `dokumenter/fase-A-plan.md` — slå opp der før du starter.

## Hvorfor du får denne oppgaven

Dette v7-forslaget er DITT (ChatGPT). Du foreslo at vi bygger en
Leaflet-lignende 2D tile-pane (z opp til 18/19) ovenpå 3D-scenen, hvor
3-anker-systemet styrer panens posisjon, rotasjon og skala. Jone har valgt
å gå all-in på forslaget ditt.

Du jobber **parallelt med Grok**, ikke i konkurranse. Grok skriver sin egen
plan (se `oppgaver/oppgave-1-v7-plan.md`). Vi vil ha to uavhengige planer,
slik at Jone kan sammenligne, kombinere og velge beste arkitektur før Fase 2
(koding) starter.

## Mål

**Fase 1:** Plan + arkitektur-skisse. INGEN kode i denne fasen.
**Fase 2:** Implementasjon (besluttes etter at begge planer er levert).

## Fase 1 — leveranser

Lever som markdown-tekst i chatten med Jone. Jone limer det videre til
Perplexity, som pusher det til repoet som:

- Fil: `dokumenter/v7-plan-CHATGPT.md`
- Branch: `chatgpt/v7-plan`
- PR mot `main` i `Jone-Aase/enok-72-grok`

### Dokumentet skal svare på

1. **Pane-arkitektur:** Skal 2D-panen leve som
   - DOM-overlay (HTML `<div>` med CSS transforms og `<img>`-tiles)?
   - Eget 2D canvas oppå Three.js-canvaset?
   - En WebGL-quad inni Three.js-scenen som teksturers med tile-mosaikk?
   Begrunn valget. Hva er pro/kontra?

2. **Anker-til-pane-transform:** Hvordan oversetter vi
   3-anker-similarity-transformen (M = T2·Ry·S·T1) til panens visuelle transform?
   - Hvis DOM: hvilke CSS-transforms (translate, rotate, scale, matrix3d)?
   - Hvis canvas: hvilken transformasjons-matrise?
   - Hvis WebGL-quad: hvordan kobles M til quad-mesh?

3. **Kamera-synkronisering:** Når brukeren scroll-zoomer eller panorerer i 3D-scenen,
   hvordan oppdateres panen?
   - Hvilke kamera-events fanger vi?
   - Hvordan kobler vi 3D-camera.position/dist til panens zoom-nivå og senter?
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

## Tekniske referanser

Repo: https://github.com/Jone-Aase/enok-72-grok (PUBLIC, du kan lese)

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

## Regler du må følge

1. **Det sanne arealet er ukrenkelig.** Ingen Mercator-matematikk, ingen omprojisering, ingen rutenett-transformasjon, ingen kode og ingen algoritme som endrer det sanne arealet, den sanne avstanden eller den sanne formen skal inn i Instrumentet eller brukes noe sted i dette prosjektet. Tiles fra Kartverket brukes som sanne lokale utklipp og plasseres uendret i AE-rammen via 3-anker-kalibreringen. Brytes denne regelen, brytes hele grunnlaget for Instrumentet.
2. Lengdegrader = GE-grid eksakt. Breddegrader = kun Solens 5 ringer. Norge = sann form, festes til 3 ankerpunkter, IKKE strekkes.
3. Ikke programmer noe før du har sett siste versjon av filen og arket T.
4. Kun Perplexity merger til main. ChatGPT har ikke GitHub-skrivetilgang — leveranser sendes som markdown i chatten, Perplexity oppretter branch og PR.
5. Ved tvil — SPØR, ikke gjett.
6. Solen er passeren som brukes til å fastslå breddegradene.
7. Norsk mellom oss i utviklingsfasen. All dokumentasjon skrives både på engelsk og norsk. Tekst inne i Instrumentet er på engelsk.
8. Ikke ramme inn teksten.

Hovedinstrumentet er FRYST. Denne kopien (enok-72-grok) kan endres. Aldri foreslå kode-commit direkte til main — alltid via egen branch og PR.

## Spørsmål

Hvis noe er uklart, spør i Perplexity-tråden via Jone. Ikke gjett.

## Når Fase 1 er ferdig

1. Lever hele dokumentet som markdown-tekst i chatten med Jone
2. Jone limer det til Perplexity
3. Perplexity pusher det som branch `chatgpt/v7-plan`, fil `dokumenter/v7-plan-CHATGPT.md`, PR mot main
4. Jone reviewer både din plan og Groks plan side om side
5. Beslutning om Fase 2-arkitektur tas etter sammenligning

---

Opprettet: 2. juni 2026
Av: Perplexity (på vegne av prosjekteier Jone Aase)
