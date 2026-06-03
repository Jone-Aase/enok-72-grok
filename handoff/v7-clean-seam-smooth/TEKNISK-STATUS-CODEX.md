# Teknisk status fra Codex: seam-smooth-1

Dette beskriver den lokale prototypen som Jone tester i nettleseren:

`http://127.0.0.1:8091/clean-motor-lab-view/index.html?bust=seam-smooth-1`

## Viktigste egenskaper

- Clean motor lab viser Norge og Island sjokart samtidig.
- Det er to separate DOM/CSS pixelflater, ikke ett blandet kart.
- Island-panelet har `data-anchor-mode="iceland"` og er last til Grimsey.
- Norge-panelet har `data-anchor-mode="norway"` og er last til de norske polarsirkelankrene.
- Begge ligger i samme instrumentvisning, men med hver sin transform.
- WebMercator/WMS/WMTS brukes bare til a hente riktig kartbit.
- Ingen kartbit skal flyttes individuelt for a passe AE-gridet.

## Verifisert i nettleser

Ved test av `both-seacharts-1` ble det observert:

- Pane 1: `anchorMode = iceland`, layer `Sjomaelingar:Sjokort_Sjomaelinga`, primary `1`, maxResidual `0.000`.
- Pane 2: `anchorMode = norway`, layer `sjokartraster`, primary `0`, maxResidual rundt `0.551`.
- Status viste `Anchor lock: Grimsey, Iceland (66.545525, -18.011092)`.

Ved `seam-smooth-1` ble tile-smoothing verifisert:

- `--tile-bleed: 0.6px`
- tile width/height: `256.6px`
- margin-left/top: `-0.3px`

Dette er kun visuell seam-smoothing. Det endrer ikke ankerpunkter, transform, 256-grid, skala eller rotasjon.

## Viktig advarsel

Ikke tolk fargeglatting eller tile-cache som tillatelse til a endre geometri. All glatting/cache ma skje etter at kartbitene er hentet og for pixelflaten som skjerm/rendering, ikke som ny sannhet i Instrumentet.

## Begrensning for denne GitHub-handoffen

Codex-miljoet pa Jone sin maskin mangler `git` og `gh`, og GitHub-koblingen kan ikke direkte laste opp en hel lokal mappe fra disk. Derfor er denne branchen opprettet som koordinasjon/handoff med oppgavefiler og teknisk status. Den fulle lokale lab-kopien finnes fortsatt hos Jone.
