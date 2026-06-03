# Steg 1: UI-toggle Måle-modus / Visuell modus

Status: planforslag. Markdown bare. Ingen kode.

Base: codex/v7-next-dev-source @ dc95a08.
Forslag til implementeringsbranch når godkjent: claude/v7-engine-modus-toggle-css.

## Mål

Innføre rammeverket for to moduser i UI. I første versjon kobler toggle-en ikke noe annet enn en intern variabel og en konsoll-logg. Ingen visuell endring i Måle-modus eller Visuell modus ennå. Hensikten er å verifisere at vi har koblet rammeverket inn riktig sted, uten risiko for kartflaten.

## Hvorfor først

Vi trenger en stabil bryter før vi kobler på Lag 3. Hvis bryteren ikke er ren, vil Lag 3 senere kunne lekke effekter inn i Måle-modus. Derfor bygger vi bryteren tom først, så vi vet at den er trygg.

## Hva som endres

UI: én ny rad i Clean Motor Lab-panelet (eller en egen liten boks øverst, valgfritt — anbefales i samme panel for nå). To radio-knapper eller en select:

- Måle-modus (default ved oppstart)
- Visuell modus

Tekstetikett ved siden av som viser nåværende modus.

State: én variabel i app.js, `engineMode`, med verdiene `'measurement'` eller `'visual'`. Default `'measurement'`. Lagres i localStorage under `enok72.engineMode.v1` — eller ikke lagres i det hele tatt i denne første versjonen (anbefales å droppe localStorage for å holde testen minimal). Endelig valg når patch skrives.

Event: `window.dispatchEvent(new CustomEvent('enok72:engineModeChanged', { detail: { mode } }))` kalles ved hver endring. Lag 3 vil senere lytte på denne. I steg 1 lytter ingen.

Logg: `console.info('[engine] mode →', mode)` på hver endring. Brukes til debug-verifikasjon.

## Hva som IKKE endres

- Ingen ankerendring, ingen aeProject, ingen transform, ingen tile-posisjon, ingen skala, ingen rotasjon, ingen GE-grid, ingen solsirkler.
- Ingen tile-loading rørt.
- Ingen pane-opacity, ingen filter, ingen blur, ingen mask, ingen canvas.
- Ingen Three.js-import. Ikke ennå.
- Ingen visuell forskjell på kartet i Måle-modus mot dagens.

## Akseptkriterier

1. Toggle synlig i UI, default på "Måle-modus".
2. Klikk på "Visuell modus" gir konsoll-logg `[engine] mode → visual`. Klikk tilbake gir `[engine] mode → measurement`.
3. Kartet ser nøyaktig likt ut i begge moduser. Pikselidentisk.
4. Lag 1 og Lag 2 funksjonalitet uendret (pan, zoom, tone-slidere, layer-diagnostikk, opacity-stack).
5. Ingen ny avhengighet i package-stacken.

## Filer som endres

Kun to:

- index.html: legge til UI-elementer for toggle.
- app.js: state-variabel, event-listener, custom-event-dispatch, console.info.

Ingen andre filer rørt.

## Plan for branch og PR

1. Plan godkjent av Jone.
2. Patch på claude/v7-engine-modus-toggle-css ut fra codex/v7-next-dev-source.
3. Test lokalt: visuelt likt i begge moduser.
4. Jone tester live, godkjenner.
5. Slås sammen til codex/v7-next-dev-source først når Jone gir grønt lys.

## Etter Steg 1

Steg 2: tomt Three.js-canvas plassert i kart-containeren, transparent, pointer-events off. Vises kun i Visuell modus. Test-figur (grå sirkel) for å bekrefte at canvas funker uten å gå i veien for DOM-tiles. Egen branch og egen plan.
