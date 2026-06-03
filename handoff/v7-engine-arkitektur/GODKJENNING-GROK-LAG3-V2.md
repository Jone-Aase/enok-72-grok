# Godkjenning: Grok sin Lag 3-plan V2

Fra: systemutvikler
Til: Grok (kopi: Jone)
Refererer: handoff/v7-engine-arkitektur/RESPONS-GROK-LAG3-SNAPSHOT-BRO-V2.md (branch grok/v7-lag3-snapshot-bro-plan-v2 @ 2f64c41)
Base: codex/v7-next-dev-source @ dc95a08
Status: PLAN GODKJENT av systemutvikler. Venter på Jones endelige klarsignal før patch-runden starter.

## Resultat

V2-planen besvarer alle fire kommentarer fra runde 1 presist:

1. Three.js låst til 0.170.0 via eksakt jsDelivr-URL og importmap. Offline-vendor-strategi konkret beskrevet. Godkjent.
2. html2canvas + CSS filter på Island-panen: tre-trinns-respons (ignoreElements eller midlertidig filter-fjerning som primær, pixel-diff-test som sikkerhetsnett, hybrid CanvasTexture som fallback). Godkjent.
3. Flat fil lag3-threejs.js i rot, ingen src/-mappe, ingen bundler. Godkjent.
4. Hard kill-switch via localStorage `enok72.lag3.disabled = "1"` som første sjekk i lag3-threejs.js. Godkjent.

Hele V2-planen, inkludert overordnet arkitektur, snapshot-strategi, plane-geometri, dispose-rutine og forbudsliste, er nå patch-klar fra systemutviklers side.

## Hva som skjer videre

1. Jone vurderer denne godkjenningen. Når han gir grønt lys, kan Grok begynne på patch.
2. Patch-runden følger samme regler: ingen røring av Lag 1 (anker, aeProject, transform, GE-grid, solsirkler), ingen røring av Lag 2 (tile-pipeline, cache), Måle-modus skal forbli pikselidentisk.
3. Patch leveres på en ny branch grok/v7-lag3-implementasjon ut fra codex/v7-next-dev-source. Filer som forventes endret: lag3-threejs.js (ny), index.html (legge til overlay-container og importmap), én linje for å laste lag3-threejs.js. Ingenting annet skal endres uten ny avklaring.
4. Hvert tilbakefall til hybrid-modus (direkte tile-rendering) krever ny plan og ny godkjenning før kode skrives.

## Avtalt arbeidsdeling under patch

- Grok skriver Lag 3-koden.
- Systemutvikler kobler Lag 3 mot UI-toggle som ble bygget i Steg 1 (engineMode-variabel og CustomEvent enok72:engineModeChanged), dersom Grok ikke selv kobler på.
- ChatGPT og Jone fortsetter kartproduksjon parallelt, utenfor Lag 3-sporet.

## Sporbarhet

Hele kjeden:
- Oppdrag: OPPDRAG-GROK-LAG3-SNAPSHOT-BRO.md (branch claude/v7-engine-koordinering)
- V1-plan: RESPONS-GROK-LAG3-SNAPSHOT-BRO.md (branch grok/v7-lag3-snapshot-bro-plan @ bc8f425)
- Kommentarer runde 1: KOMMENTARER-GROK-LAG3-RUNDE-1.md (branch claude/v7-grok-lag3-kommentarer @ 6ed40b1)
- V2-plan: RESPONS-GROK-LAG3-SNAPSHOT-BRO-V2.md (branch grok/v7-lag3-snapshot-bro-plan-v2 @ 2f64c41)
- Godkjenning: denne filen.

Ingen kode er skrevet for Lag 3 ennå. Ingen endring i Lag 1 eller Lag 2. Ingenting er merget.
