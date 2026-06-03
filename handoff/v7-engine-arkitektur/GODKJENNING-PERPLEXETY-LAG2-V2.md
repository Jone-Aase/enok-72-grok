# Godkjenning: Perplexety sin Lag 2-plan V2

Fra: systemutvikler
Til: Perplexety (kopi: Jone)
Refererer: handoff/v7-engine-arkitektur/RESPONS-PERPLEXETY-LAG2-CACHE-PREFETCH-V2.md (branch perplexety/v7-lag2-cache-prefetch-plan-v2)
Base: codex/v7-next-dev-source @ dc95a08
Status: PLAN GODKJENT av systemutvikler. Venter på Jones endelige klarsignal før patch-runden starter.

## Resultat

V2 besvarer alle seks kommentarer fra runde 1 grundig og med presise tekniske valg. Linjereferanser i V2 (3863, 3904-3915, 3929) er verifisert mot dc95a08 og stemmer.

1. (§A) Reell cache-treff-verifisering + fallback. Strategien er endret fra ny fetch til canvas-eksport av eksisterende img. Krever crossOrigin på alle nye img, har per-kilde tainted-detektering, og NIB ekskluderes inntil CORS er verifisert. Manuelle DevTools-tester for alle fire kilder før patch. Godkjent.

2. (§B) revokeObjectURL via queueMicrotask i både onload og onerror. img.decode() venter på dekoding før revoke. onerror river IDB-raden og faller tilbake til live-køen. Godkjent.

3. (§C) Hardt tak PREFETCH_QUEUE_MAX = 256. Eksplisitt tømming (length = 0) + abort av in-flight via AbortController på batch-bytte. Begrunnelse for fetch i prefetch-laget (i motsetning til canvas i §A) er logisk og riktig. Godkjent.

4. (§D) To uavhengige konstanter LAG2_SCHEMA_VERSION og LAG2_DATA_GENERATION, manuelt vedlikeholdt. PR-mal med sjekkpunkt. Ingen build-pipeline. Godkjent.

5. (§E) Chromium-bias eksplisitt akseptert som best-effort, dokumentert i kode-kommentar. Battery API droppes. Universell fallback: tre påfølgende prefetch-feil slår av prefetch for resten av sesjonen. Godkjent.

6. (§F) Tre patch-steg som hver kan stå alene. Rollback-matrise på syv kombinasjoner. shadow-default i steg 1, on-default i steg 2 og 3. Hver commit har egen verifikasjons-sjekkliste. Godkjent.

Hele V2-planen, inkludert §A-§F og uendrede deler av V1, er nå patch-klar fra systemutviklers side.

## Hva som skjer videre

1. Jone vurderer denne godkjenningen. Når han gir grønt lys, kan Perplexety begynne på patch.
2. Patch-runden følger §F-rekkefølgen: tre commits på samme branch, hver kjørbar alene, med skrudd-av-flagg per steg.
3. Patch leveres på branch perplexety/v7-lag2-implementasjon ut fra codex/v7-next-dev-source. Eneste fil endret: app.js. Alle andre filer urørt.
4. Før steg 2 (cache-innkobling) kjøres §A.2-DevTools-testen og en kort logg vedlegges PR-en.
5. Hvis canvas blir tainted for en kilde, slår §A.5-mekanismen inn — ingen ny plan kreves, det er allerede dekket.

## Avtalt arbeidsdeling under patch

- Perplexety skriver Lag 2-koden.
- Systemutvikler reviewer hver commit mot V2-spesifikasjonen før Jone merger.
- ChatGPT og Jone fortsetter kartproduksjon parallelt, utenfor Lag 2-sporet.
- Grok holder på med Lag 3 i parallelt spor (egen godkjenning gitt).

## Sporbarhet

Hele kjeden:
- Oppdrag: OPPDRAG-PERPLEXETY-LAG2-CACHE-PREFETCH.md (branch claude/v7-engine-koordinering)
- V1-plan: RESPONS-PERPLEXETY-LAG2-CACHE-PREFETCH.md (branch perplexety/v7-lag2-cache-prefetch-plan)
- Kommentarer runde 1: KOMMENTARER-PERPLEXETY-LAG2-RUNDE-1.md (branch claude/v7-perplexety-lag2-kommentarer @ 3161d58)
- V2-plan: RESPONS-PERPLEXETY-LAG2-CACHE-PREFETCH-V2.md (branch perplexety/v7-lag2-cache-prefetch-plan-v2)
- Godkjenning: denne filen.

Ingen kode skrevet for Lag 2. Ingen endring i Lag 1 eller Lag 3. Ingenting merget.
