# Kommentarer til Perplexety sin Lag 2-plan (runde 1)

Fra: systemutvikler
Til: Perplexety
Refererer: handoff/v7-engine-arkitektur/RESPONS-PERPLEXETY-LAG2-CACHE-PREFETCH.md (branch perplexety/v7-lag2-cache-prefetch-plan)
Base: codex/v7-next-dev-source @ dc95a08
Status: kommentarer, ikke endelig godkjenning. Vent på revidert plan før patch.

## Helhetsvurdering

Planen er svært grundig og presis. Alle linjereferanser i §3 og §7 er verifisert mot dc95a08 og stemmer (queueNorgeCleanTile 3097, processNorgeCleanTileQueue 3065, resetNorgeCleanTileQueue 3044, updateNorgeDetailTiles 3775, expandNorgeTileRange 3753, manager-objekt 2654). Skjemaet i §2 er fornuftig, prefetch-kø-isoleringen i §5 er riktig løsning, og av-bryterne i §9 inkludert ?lag2=off er presist tenkt.

Fem punkter må avklares før patch-runden kan starte. Ingen av dem rokker ved hovedlinjen i planen.

## Punkt 1: Dobbel nettverkslast i §3.2 - må verifiseres reelt

Planen sier `cache: 'force-cache'` skal hindre en ny nettverkstur når vi etter onload kaller `fetch(job.src)` for å få blob. Risikoen er at WMTS- og WMS-serverne (Kartverket, Iceland LMI, OSM, NIB) sender Cache-Control-headere som hindrer browser-cachen i å serve. Hvis det skjer, dobler vi nettverksbruken for hver tile - stikk i strid med formålet.

Krav til revidert plan:
- Beskriv en konkret test som verifiserer cache-treff: åpne nettverkspanelet, last instrumentet, og bekreft at de andre fetch-kallene returnerer fra disk cache (size = "from disk cache"). Liste opp de fire kildene Kartverket/Iceland/OSM/NIB og hva som forventes per kilde.
- Fallback hvis cache-treff feiler for en kilde: enten droppe IDB-skriving for den kilden (registrer i bySource-indeksen), eller bruk en annen vei. Forslag: bruk `img.decode()` + canvas + toBlob() som kilde for blob i stedet for ny fetch. Dette gjenbruker det `<img>` allerede har lastet, men koster CPU.
- Velg en strategi og forklar.

## Punkt 2: revokeObjectURL og minne i §3.1 + risikolisten

Du nevner i risikolisten at objectURL må revoke-es i img.onload av idb-treff-grenen. Det er riktig, men implementasjonen må også håndtere onerror-grenen (om img mislykkes å dekode blob - sjelden, men mulig). Ellers lekker vi.

Krav til revidert plan:
- Spesifiser at både img.onload OG img.onerror i idb-treff-grenen kaller URL.revokeObjectURL.
- Vurder å bruke `img.decode()` før vi setter blobUrl, slik at vi vet at dekoding er fullført før revoke. Hvis ikke decode, så minst en setTimeout(revoke, 0) etter onload, ikke synkron i selve onload-handleren.

## Punkt 3: Prefetch-ringen klippes mot bounds men ikke mot scene

Du klipper prefetch-ringen mot `NORGE_SURFACE_DETAIL.bounds` (linje 3756-3763). Det er riktig start. Men prefetch bør også avstå fra tiles som ikke kan ende opp i synlig viewport selv ved zoom-ut. Hvis brukeren er zoomet inn på Bergen, har vi ingen nytte av prefetch på Finnmark — Lag 1 viser uansett ikke disse uten en ny pan-operasjon, og pan utløser uansett ny `updateNorgeDetailTiles`.

Krav til revidert plan:
- Bekreft at prefetch-ringen er en ring rundt nåværende tile-range, ikke en region (du sier "ring" - bare gjør det tydelig at prefetch ikke akkumulerer over tid). Maks N prefetch-jobber køet samtidig.
- Foreslå et tak: aldri mer enn `prefetchPad × 4 × livePad` tiles i prefetchQueue. Hvis ny `updateNorgeDetailTiles` skjer, tømmer prefetchQueue seg via batch-isoleringen — men spesifiser at den ekspliсitt tømmes (queue.length = 0), ikke bare invalideres.

## Punkt 4: meta.version-invalidering trenger en utløser

§2.5 sier `meta.version`-mismatch tømmer tiles. Men hva er kilden til APP_BUILD? Vi har ikke et build-stempel i prosjektet i dag. Hvis vi bruker git-SHA, krever det at vi injecter SHA-en ved deploy - ekstra avhengighet.

Krav til revidert plan:
- Foreslå en konkret kilde: enten en hardkodet konstant LAG2_SCHEMA_VERSION = 1 som økes manuelt når skjemaet endres, eller hentet fra en eksisterende variabel i app.js (sjekk om noe slikt finnes). Ikke git-SHA, ikke noe som krever build-pipeline.
- Skjemaversjon og dataversjon (URL-mønster-endring) bør være to ulike flagg. Når Lag 1 endrer tile-URL-mønster, må noen manuelt øke en `LAG2_DATA_GENERATION`-konstant. Beskriv prosessen.

## Punkt 5: Network Information API er ikke universelt

§5.3 nevner `navigator.connection.saveData` og `effectiveType`. Dette er ikke støttet i Firefox eller Safari. Vi får ikke krasj — bare optional chaining returnerer undefined — men det betyr at Firefox/Safari-brukere får full prefetch alltid, mens Chrome-brukere får respekt for saveData. Asymmetri.

Krav til revidert plan:
- Bekreft at planen er bevisst på denne asymmetrien.
- Foreslå om vi i tillegg skal bruke `document.visibilityState` (allerede dekket) og `Battery API` (også Chrome-only, men kan eksempel sjekkes), eller om vi simpelthen aksepterer at Chrome-brukere får mer hensynsfull prefetch — det er greit for første versjon.

## Punkt 6 (mindre): tre-trinns merge i §11

Forslaget om å splitte patch i tre commits (IDB-skall → cache-innkobling → prefetch) er bra og bør stå. Bare en presisering:

Krav til revidert plan:
- Hvert av de tre stegene skal kunne stå alene på `codex/v7-next-dev-source` og være kjørbart. Etter steg 1 skal IDB åpnes og sweeps kjøre, men ingen tiles skrives ennå (cache flagg er off-default ved skall-only). Etter steg 2 skrives og leses tiles. Etter steg 3 går prefetch.

## Hva planen ikke trenger å endre

- IDB-skjema og indekser i §2 - bra.
- Innkobling i tre eksisterende funksjoner i §3 - bra, hold deg til disse.
- Rydding-policy i §4 - bra.
- Forbudslisten i §7 - bra.
- Filene som ikke endres i §8 - bra.
- ?lag2=off som hard kill-switch i §9 - utmerket.

## Hva vi ber om

Lever revidert plan som ny fil:
handoff/v7-engine-arkitektur/RESPONS-PERPLEXETY-LAG2-CACHE-PREFETCH-V2.md

På branch: perplexety/v7-lag2-cache-prefetch-plan-v2 ut fra codex/v7-next-dev-source.

Behold alt fra v1 som ikke er kommentert. Skriv om bare de seks punktene over. Ingen kode i denne runden.

Når v2 er levert leser systemutvikler og innstiller til Jone for endelig godkjenning. Patch skrives først når Jone gir grønt lys.
