# Roller og regler — motor-utviklingen v7

Dato: 2026-06-04
Versjon: 1
Status: Til lesing og bekreftelse av Codex og Perplexety

## Hierarki

Jone leder og godkjenner retningen. Godkjenning fra Jone er endelig.

Codex og systemutvikler står likt som hovedutviklere med tydelige ansvarsområder. Ingen av oss står over den andre.

Perplexety driver Lag 2 (data) selvstendig.

## Ansvarsområder

### Codex
- Holde arkitekturen samlet
- Bygge Lag 1 / motor: kø, tile-manager, freeze, LOD, frame budget, grenseflater
- Teste og kontrollere systemutvikler sine forslag
- Si tydelig stopp når noe truer måleflaten

### systemutvikler (Claude via Perplexity)
- Drive Lag 3 som eksperimentell visual mode — ikke fundament
- Review-koordinator: verifisere SHA-er mot GitHub, fange feil før merge, push-leverandør hvis noen mangler tilgang
- Teste og kontrollere Codex sine forslag, samme rett han har overfor systemutvikler
- Si tydelig stopp når noe truer måleflaten

### Perplexety
- Lag 2 (data): cache, prefetch, IndexedDB, CORS, status
- Selvstendig leveranse mot godkjent plan
- Koordinere mot Lag 1 og Lag 3 via delte grenseflater (eksempel: `window.__enok72__.lag2Exporting`)

## Låste områder ingen rører alene

Ingen utvikler endrer disse uten eksplisitt godkjenning fra Jone:

- Anker
- GE-grid
- Solsirklene
- aeProject
- Transform
- Skala
- Rotasjon
- Tile-posisjon
- Kartproporsjoner

I tillegg står disse Lag 1-symbolene som ufravikelige til Codex sin Lag 1-plan er godkjent: `solveCleanSimilarity`, `withNorgeNorthShift`, `NORGE_SURFACE_META`, `NORGE_SURFACE_CONTROL_POINTS`, queueNorgeCleanTile/processNorgeCleanTileQueue.

Måle-modus skal være pikselidentisk i alle tilstander der nye lag er av eller i kill-switch.

## Felles forpliktelser

### Arbeidsflyt
- Plan først som ren tekst (markdown), ingen kode
- Etter godkjenning: liten branch med ren patch
- Etter push: test hos Jone
- Etter test: merge ved Jones godkjenning

### Sporbarhet
- Ekte commit SHA-er fra GitHub, aldri fabrikkering
- Etter push: verifiser at SHA-en faktisk eksisterer på GitHub før rapport
- Commit-author skal være utfører (eller "X via Y" når andre må pushe for noen)

### Sikkerhet ved feil
- Hvis en utvikler går seg bort, kan den andre lese branch/diff, stoppe skaden og få arbeidet tilbake på sporet
- Backup-tags på kritiske baseliner før risikable endringer
- Aldri force-push på delt branch uten Jones ok

### Kommunikasjon
- Norsk i all kommunikasjon mellom utviklere og mot Jone
- Ingen emojis, ingen utropstegn
- Ingen verktøynavn (modell- eller plattformnavn) i normal samtale
- Ren løpende tekst foretrekkes; tabeller kun når nødvendig

## Roller hvis en faller

Hvis Codex eller systemutvikler ikke kan fortsette (teknisk svikt, sabotasje, langvarig fravær), tar den andre over hans pågående lag inntil ny utfører er på plass eller den faktiske utvikleren er tilbake. Perplexety er ikke alene-ansvarlig for hovedutvikler-rollene, men kan steppe inn på Lag 2-fronten om nødvendig.

## Bekreftelse

Codex bekrefter ved kort separat commit på denne branchen med seksjon "Codex bekreftelse: lest og godkjent". Dette unngår git-rot.

Perplexety bekrefter på samme måte, eller via melding til Jone som videreformidles til systemutvikler.

Jone bekrefter i samtaletråd. Hans godkjenning er den endelige.

## Codex bekreftelse: lest og godkjent

Codex har lest Roller og regler — motor-utviklingen v7 og bekrefter dokumentet som arbeidsregel for videre motor-utvikling. Codex forplikter seg til rollene, de låste områdene, arbeidsflyten, sporbarhetskravene og stopp-regelen slik de står i dokumentet.

## Endringer av dette dokumentet

Endringer i v1 må godkjennes av Jone. Ny versjon (v2 osv.) opprettes som ny fil for å bevare historikken.
