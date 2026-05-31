# Enok 72 — Norge-fork (EKSPERIMENT)

**Dette er IKKE produksjonsversjonen av Enok 72-instrumentet.**

Dette repoet er en avlegger/fork basert på v16.77 av hoved-instrumentet, brukt til å eksperimentere med å koble på nasjonale høyoppløselige kart (Kartverket WMTS for Norge, og senere andre lands tilsvarende tjenester).

## Produksjonsversjon

Den ekte, autoritative versjonen av Enok 72-instrumentet ligger her:

- **Repo:** https://github.com/Jone-Aase/enok-72-truth-instrument
- **Live (master):** https://jone-aase.github.io/enok-72-truth-instrument/
- **Vercel:** https://enok-72-truth-instrument.vercel.app
- **Permanent:** https://enok72.pplx.app

## Dette repoet

- **Live:** https://jone-aase.github.io/enok-72-norge/
- **Norge-test:** https://jone-aase.github.io/enok-72-norge/norge.html
- **Basert på:** commit `c9557af` (v16.77) av hoved-instrumentet
- **Lagt til:**
  - `norge.html` — Leaflet-side med Kartverket WMTS, sjøkart, flyfoto
  - `norge-byer.json` — 8 norske byer med Kartverket SSR-koordinater
  - Knapp "Norge-test" i toolbaren på forsiden

## Hvorfor en fork?

For å eksperimentere med nasjonale karttjenester uten å risikere å rote til produksjonsversjonen. Endringer her påvirker IKKE hoved-instrumentet.

## Hvis du vil endre instrumentet selv

Bruk hoved-repoet: `enok-72-truth-instrument`. Dette repoet er kun for Norge/nasjonalkart-eksperimentering.
