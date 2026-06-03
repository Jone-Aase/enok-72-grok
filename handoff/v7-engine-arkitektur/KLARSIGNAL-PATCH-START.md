# Klarsignal — patch-runde kan starte

Fra: Jone (sjef)
Via: systemutvikler
Dato: 2026-06-04
Status: GRØNT LYS

## Hva som er klart

Begge planene er godkjent og klare til implementering:

- Lag 3 Three.js snapshot-bro — Grok V2, godkjenning commit 6bafd16
- Lag 2 cache/prefetch — Perplexety V2, godkjenning commit 0d2d7f9

Jone har gitt grønt lys for at patch-rundene kan starte parallelt.

## Til Grok (Lag 3)

Du kan starte patch i henhold til V2-planen på branch grok/v7-lag3-snapshot-bro-plan-v2. Følg disse reglene:

- Ikke rør anker, aeProject, transform, skala, rotasjon, tile-posisjon, GE-grid, solsirklene eller kartflatens proporsjoner
- Måle-modus skal være pikselidentisk med dagens — ufravikelig
- Versjonslås, html2canvas/CSS-filter, mappestruktur og kill-switch som spesifisert i V2
- Push patch til egen branch (forslag: grok/v7-lag3-snapshot-bro-patch). Ikke merge til codex/v7-next-dev-source uten review

## Til Perplexety (Lag 2)

Du kan starte patch i henhold til V2-planen på branch perplexety/v7-lag2-cache-prefetch-plan-v2. Følg §F-rekkefølgen:

1. Steg 1 default 'shadow' (cache i skyggemodus, ingen synlig effekt)
2. Steg 2 default 'on' cache (cache-treff aktiv)
3. Steg 3 default 'on' prefetch (med PREFETCH_QUEUE_MAX=256 og AbortController)

Hvert steg som egen commit/PR slik at rollback-matrisen (7 kombinasjoner) faktisk kan brukes.

Reglene som for Grok: ikke rør anker, aeProject, transform, skala, rotasjon, tile-posisjon, GE-grid, solsirklene eller kartflatens proporsjoner. Måle-modus pikselidentisk. NIB ekskludert til CORS er verifisert manuelt i DevTools.

Push patch til egen branch (forslag: perplexety/v7-lag2-cache-prefetch-patch-steg1, -steg2, -steg3).

## Parallell-koordinering

Dere jobber på hver deres lag og rører ikke hverandres filer:

- Grok: Three.js snapshot-modul, visuell modus
- Perplexety: cache/prefetch-lag, IndexedDB

Hvis dere oppdager kollisjon mellom planene, stopp og rapporter til systemutvikler før dere fortsetter.

## Rapportering

Etter hver pushet patch:

- Commit SHA
- Branch
- Hvilke filer som er rørt
- Kort verifikasjon på at måle-modus fortsatt er pikselidentisk
- Eventuelle avvik fra V2-planen og begrunnelse
