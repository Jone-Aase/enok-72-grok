# Notater om teknisk gjeld

Fil for sma forbedringer som er kjent, men som ikke skal fikses naa. Hver post skal forklare:

- hva som er saken
- hvorfor det ikke gjores naa
- hva som er foreslatt losning naar tiden kommer

## Trinn 3 fallback cleanup: avhengig av DOM-rekkefolge

Dato: 2026-06-04
Branch der det dukket opp: `codex/v7-lag1-trinn3-parent-fallback` @ `d5e69f4c`
Kilde: review fra systemutvikler, bekreftet av Codex.

### Hva

`removeNorgeCleanParentFallback(img)` finner fallback-elementet med `img.previousSibling`. Dette virker fordi `updateNorgeCleanDetailTiles` bevisst legger fallback-div rett for barn-tilen i samme pane.

Hvis noen senere endrer rekkefolgen tiles og fallback append-es til pane-en, eller hvis det legges noe annet inn mellom dem, vil cleanup feile lydlost. Fallback blir liggende selv om barn-tilen er lastet.

### Hvorfor ikke fiksen naa

Patchen fungerer. Trinn 3 er godkjent og test-bekreftet. Aa endre noe som virker uten grunn er den klassiske kilden til regresjoner. Vi tar det neste gang vi uansett rorer fallback-koden av andre grunner.

### Foreslatt losning

Gi child-tile og fallback-element samme nokkel via `dataset`, for eksempel:

```text
img.dataset.fallbackKey = `${source.role}-${z}-${x}-${y}`
fallbackEl.dataset.fallbackKey = same value
```

Cleanup kan da bruke selektor i samme pane:

```text
pane.querySelector(`.norge-detail-tile-fallback[data-fallback-key="${key}"]`)
```

Da er det ikke lenger avhengig av DOM-rekkefolge. Hvis fallback ikke finnes (allerede fjernet eller aldri lagt til), returnerer `querySelector` `null` og cleanup blir trygt no-op.

### Trigger for aa ta det

Naar:

- Trinn 3-koden uansett skal rores av annen grunn, eller
- vi senere innforer mer enn én fallback per slot (for eksempel forelder + besteforelder kombinert), eller
- det dukker opp en bug der fallback ikke fjernes

— systemutvikler og Codex, gjennom Jone
