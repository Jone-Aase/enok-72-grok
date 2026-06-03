# Kommentarer til Grok sin Lag 3-plan (runde 1)

Fra: systemutvikler
Til: Grok
Refererer: handoff/v7-engine-arkitektur/RESPONS-GROK-LAG3-SNAPSHOT-BRO.md (branch grok/v7-lag3-snapshot-bro-plan)
Base: codex/v7-next-dev-source @ dc95a08
Status: kommentarer, ikke endelig godkjenning. Vent på revidert plan før patch.

## Helhetsvurdering

Planen er ryddig, oppfyller akseptkriteriene i oppdraget og respekterer alle forbud (Lag 1 og Lag 2 urørt, ingen reprojeksjon, planet flatt, dispose ved av-toggle). Snapshot-bro-prinsippet og kameraet-beveger-seg-aldri-planet er riktig forstått.

Tre punkter må avklares før planen kan slås sammen og før jeg skriver patch.

## Punkt 1: Three.js-versjon og CDN-låsing

Du foreslår r170 via esm.sh eller jsDelivr CDN. Det er greit for prototypen, men vi trenger en tydeligere versjonslås.

Krav til revidert plan:
- Spesifiser nøyaktig URL med versjon i path (for eksempel https://esm.sh/three@0.170.0 eller https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js). Ikke @latest, ikke uten versjon.
- Beskriv hvordan vi tester offline (CDN nede) eller hvordan vi senere kan flytte til en lokal vendor-kopi uten å endre Lag 3-koden. Forslag: én konstant TREE_URL øverst i Lag 3-fil, slik at vi enkelt bytter til lokal path senere.
- Bekreft at OrbitControls og eventuelle senere moduler importeres fra samme versjon (ingen versjonsblanding).

## Punkt 2: html2canvas og CSS-filter på Island

Vi bruker aktivt CSS-filter på Norge- og Island-panen i dag: brightness/contrast/saturate via variablene --pane-brightness, --pane-contrast, --pane-saturate. Island-panen kjører nå 1.05/1.03/1.05.

html2canvas har kjente begrensninger på CSS filter-property — i flere versjoner gjengis ikke filteret korrekt eller ignoreres. Hvis filteret ikke kommer med i snapshotet, blir Visuell modus en annen visuell sannhet enn Måle-modus. Det bryter prinsippet om at toggle-bytte ikke skal flytte sannhet.

Krav til revidert plan:
- Bekreft eller avkreft at html2canvas v1.4+ gjengir CSS filter på .leaflet-pane-elementene korrekt. Hvis ikke, foreslå hvordan vi bake filter inn i snapshotet (for eksempel ved å bruke en mellomliggende canvas der vi anvender filter manuelt, eller ved å lese pikslene gjennom et canvas2d filter).
- Foreslå en konkret pixel-diff-test som verifiserer at Island-panen ser likt ut i Måle-modus og Visuell modus. Bruk pixelmatch eller resemblejs som du selv nevnte.
- Hvis html2canvas ikke kan håndtere filter pålitelig, foreslå alternativ: kanskje native browser-API `Element.captureStream()` eller en hybrid der vi rendrer hver tile direkte fra `<img>`-element til CanvasTexture og pålegger filter via Three.js shader. Velg én og forklar valget.

## Punkt 3: Mappestruktur

Du foreslår src/layers/lag3-threejs/Lag3SnapshotBro.js. Prosjektet har i dag flat struktur (app.js, index.html i rot), uten bundler eller build-steg. Å innføre src/-mappe nå risikerer å brekke deploy-pipelinen i Vercel (som serverer alt fra rot) og krever oppdatering av script-tags.

Krav til revidert plan:
- Aksepter midlertidig flat struktur: én fil lag3-threejs.js i rot, ved siden av app.js.
- Bekreft at importen i index.html gjøres som `<script type="module" src="./lag3-threejs.js"></script>` uten bundler.
- Vi kan innføre src/-mappe senere når vi setter opp Vite eller esbuild. Det er en separat beslutning som Jone tar.

## Punkt 4 (mindre): debug-flag

Oppdraget krevde et eget avsnitt om hvordan Lag 3 kan slås helt av. Du leverte det (punkt 10), men en ting mangler: en hard kill-switch via localStorage som overstyrer UI-toggle. Dette er nyttig hvis Lag 3 forårsaker krasj og UI-en ikke kommer opp.

Krav til revidert plan:
- Legg til at localStorage-flag `enok72.lag3.disabled = "1"` hindrer Lag 3 i å laste i det hele tatt, uavhengig av UI-toggle. Brukeren kan da slå det av i devtools og laste på nytt.

## Hva planen ikke trenger å endre

- Snapshot-strategi (toggle-on, pan-slutt, zoom-slutt) er bra.
- PlaneGeometry + kamera-bevegelse er bra.
- Forbudslisten i punkt 9 er bra.
- Testing-kapittel er bra, bare utvid med pixel-diff-spesifikasjonen i punkt 2 her.

## Hva vi ber om

Lever revidert plan som ny fil:
handoff/v7-engine-arkitektur/RESPONS-GROK-LAG3-SNAPSHOT-BRO-V2.md

På branch: grok/v7-lag3-snapshot-bro-plan-v2 ut fra codex/v7-next-dev-source.

Behold alt fra v1 som ikke er kommentert. Skriv om bare de fire punktene over. Ingen kode i denne runden heller.

Når v2 er levert leser systemutvikler og innstiller til Jone for endelig godkjenning. Patch skrives først når Jone gir grønt lys.
