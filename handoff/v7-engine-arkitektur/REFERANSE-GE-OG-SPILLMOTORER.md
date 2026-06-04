# Referanse: Hvordan Google Earth og spillmotorer laster grafikken

Fra: systemutvikler (Claude via Perplexety)
Dato: 2026-06-04
Formål: Samle det vi har funnet ut om hvordan de beste motorene løser tile- og asset-streaming, slik at vi har en felles referanse for Lag 1, 2 og 3.

## Hvorfor dette dokumentet

Vi bygger en målepresisjons-instrument, ikke et spill. Men problemet vi har — å vise Norge i sann form med riktig data, uten at det fryser eller stamper — er det samme problemet Google Earth, Cesium, Mapbox, Unreal og Unity har løst gjennom mange år.

Vi trenger ikke å finne opp på nytt. Vi trenger å forstå hvilke prinsipper som faktisk virker, og plukke det som passer vår skala.

## Del 1 — Hva Google Earth og kart-motorene gjør

### Quadtree med screen-space error

Verden deles i fire, fire, fire — et tre der hver node er en tile. For hver frame går motoren gjennom treet med kamera-posisjonen og spør per node: "er denne tilen for grov for skjermen?"

Målet er ikke avstand, men piksler. Cesium og Re:Earth kaller det Screen-Space Error (SSE) — hvor mange skjermpiksler feilen mellom en grov tile og en fin tile utgjør. Hvis SSE er over en terskel, splitt videre. Hvis ikke, stopp på det nivået.

Kilde: Re:Earth Engineering, "Optimize Tile Rendering on the Earth Ellipsoid with Culling and SSE" (2024).

### Prioritetskø, ikke depth-first

Tile-køen er prioritert. Cesium-utviklerne sier det rett ut: i applikasjoner der kamera starter zoomet inn tett, er det dumt å laste hele lavoppløsnings-foreldre først hvis bare en liten brøkdel er synlig.

Køen sorteres slik at synlige, viktige tiles kommer først — uavhengig av nivå i treet. Det er ikke "først forelder, så barn", men "først det brukeren ser, så resten".

Kilde: Cesium Dev Google Groups, "Performance Tweaks: Skip Tile Loads?"

### Progressive refinement — alltid noe på skjermen

Google Earth Studio sin egen dokumentasjon: "As you zoom in, big tiles split up into smaller tiles." Brukeren ser alltid noe — det blir bare gradvis bedre. Det er grunnen til at Google Earth aldri føles fryst. En uskarp versjon i 200ms, så detaljer.

Mekanismen: parent-tile beholdes i minnet og rendres helt til barn-tilen er klar. Når barnet kommer, byttes det ut. Hvis brukeren zoomer videre før barnet er ferdig, fortsetter forelderen å vises.

Kilde: Google Earth Studio Best Practices, "Image Tiling".

### Frame budget — splitte arbeidet over frames

Quadtree-byggingen og tile-generasjonen splittes på flere frames. I stedet for å gjøre alt på én frame, jobber motoren på én chunk per frame til alle er ferdige. Hvis det er for mye igjen, er det greit — det kommer neste frame.

Kilde: SimonDev, "3D World Generation: Quadtree & LOD".

## Del 2 — Hva spillmotorene gjør i tillegg

Spillmotorer har presset dette mye lenger enn kart-motorene fordi de må holde 60 eller 120 fps konstant, ikke bare være "rimelig responsive".

### Virtual texturing — bare det du faktisk ser

Unity og Unreal deler tekstur-MIPene i 128×128-tiles og laster kun de tiles som faktisk er synlige på skjermen denne framen.

Mekanismen er presis: motoren renderer en lavoppløselig "feedback buffer" som forteller akkurat hvilke pixel-tiles som ble bedt om av rendereren. Bare disse strømmes inn. Resten av teksturen finnes på disk, men aldri i GPU-minnet.

For oss: vi trenger bare laste tiles innenfor synsfeltet akkurat nå, ikke hele Norge. Vi gjør noe av dette allerede med viewport-culling, men feedback-prinsippet er mer presist.

Kilde: Unity Documentation, "Streaming Virtual Texturing" (2020). PlayerUnknown Productions, "Virtual Texturing" (2024).

### Prioritet er differansen — ikke avstand alene

Dette er det viktigste innsikten fra spillmotorene. Sitatet fra Reddit r/gameenginedevs sier det rent:

"The priority for that texture patch is the difference between the target quality and the current quality. This way the largest screen space texture won't always be updated first. Maybe the target is only one MIP level higher than the current texture but there's some smaller surface with no texture loaded at all that should be updated first."

Oversatt: prioritet = ønsket kvalitet minus nåværende kvalitet. En liten tile uten noe lastet får høyere prioritet enn en stor tile som bare mangler ett nivå. Det forhindrer at vi alltid jobber med det nærmeste, mens det som er helt tomt i synsfeltet venter.

Kilde: r/gameenginedevs, "Engine devs who worked with texture streaming, do you have any insights?"

### Double og triple buffering — to mottakere, en sender

En buffer brukes til å rendere mens en annen strømmes inn i bakgrunnen. Aldri vent på samme buffer. Triple buffering legger til en til for å unngå stalls i overgangen.

Hos oss: Perplexety sin IndexedDB-cache fungerer nesten som dette allerede — vi henter neste tile mens forrige rendres. Men eksplisitt dobbeltbuffering kan være verdt å tenke på i Lag 2 senere.

Kilde: Zigpoll, "Master Memory Management for Real-Time Asset Streaming".

### Hard frame-kvote, ikke "ferdig først"

Unreal sitt level-streaming splitter objekt-opprettelse over mange frames bevisst. Hver frame får en kvote, og når den er brukt opp stopper motoren, uansett hvor mye som gjenstår. Aldri "vi blir ferdige først, så renderer vi".

For oss: dette er nøyaktig det Codex har planlagt med 6-8ms frame-budget i Trinn 2. Spillmotorene bekrefter at det er riktig mønster.

Kilde: Epic Developer Community Forums, "Sub level streaming FPS drops".

### Nanite — det aller mest interessante (for ambisiøst nå, men prinsippet er nyttig)

Unreal 5 sin Nanite lagrer hele sceneinnholdet i GPU-minnet, oppdaterer sparsomt der ting endrer seg, og rasteriserer alt i én batch. Det er nesten det motsatte av Google Earth som river ned og bygger opp tiles.

For oss er Nanite-implementeringen for ambisiøs. Men prinsippet — "hold det stabilt i minnet, oppdater bare det som faktisk endrer seg" — er presis tanken bak Codex sitt freeze-when-loaded i Trinn 1.

Kilde: Epic Games / SIGGRAPH 2021, "A Deep Dive into Nanite Virtualized Geometry".

## Del 3 — Hva av dette vi trenger for enok-72

Av alle disse prinsippene, fem som faktisk er relevante for vår skala og vårt formål:

### Fundamentet (Trinn 1, Codex)

**Freeze-when-loaded.** Når en tile er ferdig lastet og rendret, ikke rør den. Det er Nanite-prinsippet redusert til vår skala. Dette er det Codex jobber med nå.

### Tile-køen (Trinn 2, Codex)

**Prioritet som differanse.** Sorter på `target_zoom - current_zoom` per tile, ikke kun på avstand til kamera. Liten naken tile slår stor halv-lastet tile.

**Hard frame-kvote.** Når 6-8ms er brukt, stopp. Resten kommer neste frame. Aldri "nesten ferdig".

### LOD-policy (Trinn 3, Codex)

**Parent-tile fallback.** Behold forelder i minnet og render den helt til barn er klar. Aldri tomt hull, alltid noe — gradvis skarpere.

### Lag 2 (Perplexety)

**Feedback-basert prefetch.** Vi laster kun tiles som faktisk vil bli synlige innen kort tid, ikke hele området. Cache de mest sannsynlige neste-tiles, ikke "alt rundt".

## Det vi IKKE trenger

For å være tydelige på hva som ikke hører hjemme i vårt prosjekt:

Full virtual texturing med feedback-buffer er for komplisert. Vi har ikke shader-pipeline for det, og det krever GPU-side koordinering som Three.js ikke gir oss enkelt.

Nanite-stil persistent scene i GPU-minnet er for ambisiøst. Vi har ikke ressurser til å bygge det fra bunnen.

Service Worker-basert tile-serving før CORS er verifisert. Vi har enda ikke verifisert at Kartverket, Iceland og OSM tillater det.

Disse er ikke umulige, men de hører ikke til denne fasen.

## Sammenfattet i én setning

Vi gjør det Google Earth gjør — quadtree med prioritetskø, parent-tile fallback og progressive refinement — men låner fra spillmotorene prinsippene om freeze-when-loaded, prioritet-som-differanse og hard frame-kvote. Det er nok til å bygge en stabil motor.

## Kilder

- Re:Earth Engineering, "Optimize Tile Rendering on the Earth Ellipsoid with Culling and SSE" (2024): https://reearth.engineering/posts/culling-and-sse-for-rendering-tile-en/
- Cesium Dev Google Groups, "Performance Tweaks: Skip Tile Loads?": https://groups.google.com/g/cesium-dev/c/TCwDMTJKSC8
- Google Earth Studio, "Best Practices": https://earth.google.com/studio/docs/best-practices/
- Unity Documentation, "Streaming Virtual Texturing" video (2020): https://www.youtube.com/watch?v=qqomQNsLdjA
- PlayerUnknown Productions, "Virtual Texturing" (2024): https://playerunknownproductions.net/news/virtual-texturing
- r/gameenginedevs, "Engine devs who worked with texture streaming, do you have any insights?" (2024): https://www.reddit.com/r/gameenginedevs/comments/1chbl8k/engine_devs_who_worked_with_texture_streaming_do/
- Epic Developer Community, "Sub level streaming FPS drops": https://forums.unrealengine.com/t/sub-level-streaming-fps-drops/433646
- Epic Games, "A Deep Dive into Nanite Virtualized Geometry" (SIGGRAPH 2021): https://www.youtube.com/watch?v=eviSykqSUUw
- Zigpoll, "Master Memory Management for Real-Time Asset Streaming": http://www.zigpoll.com/content/how-can-i-optimize-memory-management-in-a-game-engine-to-handle-realtime-asset-streaming-without-causing-frame-rate-drops

— systemutvikler
