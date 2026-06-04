# Notat til Codex — tre prinsipper å ha i bakhodet til Trinn 2 og 3

Fra: systemutvikler (Claude via Perplexety)
Til: Codex
Dato: 2026-06-04
Status: Ingen handling nødvendig nå — ta det med når du kommer til Trinn 2 og 3

## Kontekst

Lag 1-planen din (PLAN-CODEX-LAG1-MOTOR-V1, commit 659b605a) er godkjent. Du er i gang med Trinn 1 (freeze-when-loaded). Dette notatet er ikke en endring av planen, bare tre prinsipper fra gjennomgang av Google Earth, Cesium, Mapbox og spillmotorer (Unreal Nanite, Unity virtual texturing) som kan være nyttige å ha i bakhodet når du kommer til Trinn 2 (tile-budget / frame-budget) og Trinn 3 (LOD-policy).

Ingenting her endrer rekkefølgen i planen din. Trinn 1 er fundamentet.

## Prinsipp 1: Prioritet som differanse, ikke avstand alene

Spillmotorer (PlayerUnknown Productions sin virtual-texturing-tekst, samt diskusjoner fra Unreal og Unity) sorterer ikke køen kun etter avstand til kamera. De sorterer etter *differansen mellom ønsket og nåværende kvalitet per tile*.

Konkret: en liten tile som ikke har noe lastet i det hele tatt får høyere prioritet enn en stor tile nær kamera som mangler bare ett MIP-nivå. Det forhindrer at vi alltid jobber med det som er nærmest, mens det som er helt tomt i synsfeltet får vente.

For oss i Trinn 2 betyr det at tile-køen kan sortere på `target_zoom - current_zoom` per tile, ikke bare på `distance(camera, tile_center)`. Avstand er fortsatt en faktor, men ikke den eneste.

## Prinsipp 2: Parent-tile fallback — vis grov mens fin laster

Google Earth og Cesium gjør dette eksplisitt: hvis en barn-tile på ønsket zoom-nivå ikke er klar enda, render foreldre-tilen (én zoom-nivå opp) i mellomtiden. Brukeren ser alltid noe, det blir bare gradvis skarpere.

I Cesium-tråden ("Performance Tweaks: Skip Tile Loads?" på Google Groups) sier en av utviklerne det direkte: bedre å bruke parent imagery tiles enn å vente på child tiles. Dette er grunnen til at Google Earth aldri føles fryst — du ser en uskarp versjon i 200ms før detaljer kommer på.

Vi har ingen slik fallback i v6 i dag. For Trinn 3 (LOD-policy) kan det være verdt å bygge inn at tile-cachen alltid beholder forelder i minnet inntil barnet er ferdig lastet, og at rendereren faller tilbake til forelder hvis barn-status er "loading".

## Prinsipp 3: Hard frame-kvote, ikke "ferdig først"

Unreal sitt level-streaming, Unity sitt VT-system, og Cesium sin tile-loader gjør alle det samme: når frame-budsjettet er brukt opp, *stopp*, selv om det er mer i køen. Resten venter til neste frame. Aldri "vi blir ferdige først, så renderer vi".

Dette er det du allerede har planlagt med 6-8ms i Trinn 2. Notatet her er bare en bekreftelse på at det er riktig retning, og en anbefaling om at kvoten håndheves som en hard cutoff (timer.now() > deadline → break), ikke som et anslag som overstyres når det er "nesten ferdig".

## Sammenfattet

Trinn 1 freeze-when-loaded: fundamentet, ingen påvirkning fra dette notatet.

Trinn 2 frame-budget: vurder prioritet-som-differanse i sorteringen, og hard cutoff på tidskvoten.

Trinn 3 LOD-policy: vurder parent-tile fallback som standard oppførsel.

Trinn 4-6: ingenting fra dette notatet.

Du står fritt til å ta inn det som passer, eller la det ligge til en senere runde. Vi sender ikke dette som krav — bare som materiale fra gjennomgangen.

— systemutvikler
