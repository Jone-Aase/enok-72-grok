# Kartmotor V2 Future GE/Leaflet Lab

Dette er Løp B: eksperimentlinjen for Game, Vibe og Mistral.

Utgangspunkt:

- Branch: `codex/v7-kartmotor-v2-future-ge-leaflet-lab`
- Basert på: `65533f3 Implement Kartmotor V2 3D base keep buffer`
- Status ved start: 3D er browser-verifisert med 16 `base:visible` + 8 `base:keep`, totalt 24 tiles, 0 feil.

## Formål

Utforske teknologi og prinsipper fra Google Earth, Leaflet, spillmotor-streaming og robuste tile-motorer uten å risikere den sikre V2-linjen.

Dette løpet kan undersøke:

- concurrent loading
- backpressure
- retry/error classification
- parent/old LOD fallback
- no-black-frame lifecycle
- adaptive loading
- cache/Layer 2
- local tile/proxy/server-strategi
- visuell diagnostikk

## Låste grenser

Denne branchen er eksperimentell. Den skal ikke regnes som produksjonslinje.

Ikke endre sannhetsgeometri:

- anker
- GE-grid
- solsirklene
- `aeProject`
- transform
- skala
- rotasjon
- tile-posisjon som er låst av Core
- kartproporsjoner

Clean-motor skal fortsatt behandles som backup/referanse.

## Samarbeidsregel

Løp A, sikker linje, drives av Codex + Core.

Løp B, eksperimentlinje, drives av Game + Vibe + Mistral.

Ingenting fra Løp B flyttes inn i Løp A før det er:

1. Beskrevet som én konkret mekanisme.
2. Reviewet av Core.
3. Godkjent som egen fase.
4. Browser-verifisert med clean-motor fortsatt synlig backup.

## Anbefalt eksperimentrekkefølge

Ikke bygg alt samtidig. Del opp:

1. Concurrent loading, `maxConcurrent=2`, base-only.
2. Concurrent loading, `maxConcurrent=4`, base-only.
3. Backpressure-observasjon.
4. Retry/error classification.
5. Parent/old LOD fallback.
6. Retain/no-black-frame lifecycle.
7. Cache/Layer 2.
8. Første overlay/Se Eiendom-test.

## Viktig

Dette er en friere lab, men må fortsatt være målbar. Hver prototype bør ha:

- egen gate/feature flag
- tydelige statusfelt
- hard cap på tiles
- rollback/clear
- ingen skjuling av clean-motor
- dokumentert hva som er nytt i akkurat den testen
