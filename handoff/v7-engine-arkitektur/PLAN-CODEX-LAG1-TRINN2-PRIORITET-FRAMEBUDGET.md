# Plan Codex Lag 1 Trinn 2: prioritet og hard frame-kvote

Branch: `codex/v7-lag1-plan-trinn2-prioritet-framebudget`
Base: `codex/v7-lag1-freeze-when-loaded` @ `ea2ddfeedd4aa1b8fe72e5a74e9400b7b26ac16c`

Dette er plan, ikke kode. Ingen filer i instrumentet skal endres i denne fasen.

## Mal

Trinn 2 skal gjore tile-motoren mer lik motorene i Google Earth, Cesium og spillmotorer:

- det som brukeren faktisk ser skal lastes forst
- motoren skal stoppe nar frame-budsjettet er brukt opp
- ingen frame skal blokkeres av at motoren prover aa bli ferdig
- freeze-when-loaded fra Trinn 1 skal fortsatt vaere fundamentet

Trinn 2 skal ikke endre kartgeometri. Det er kun ko, prioritet, timing og status.

## Lasteflater som er laaste

Dette er fortsatt stengt for Trinn 2:

- ankerpunkter
- `aeProject`
- GE-grid
- solsirklene
- transform
- skala
- rotasjon
- tile-posisjon
- kartets interne proporsjoner
- kilde-URLer, med mindre Jone gir egen beskjed

Hvis en endring krever aa flytte kartet eller endre noen av punktene over, stoppes arbeidet og Jone sporres.

## Sporsmaal 1: hvordan maaler vi naavaerende kvalitet per tile?

For Trinn 2 maaler vi ikke kvalitet som fysisk avstand og ikke som geografisk feil. Vi maaler kvalitet som manglende skjermdetalj for en synlig tile-slot.

Forslag til modell:

- `targetZ`: zoom-nivaaet motoren ons ker for denne synlige sloten akkurat naa.
- `availableZ`: beste tile-nivaa som allerede er synlig eller tilgjengelig for samme slot/kilde.
- `qualityGap = targetZ - availableZ`.
- Hvis ingen tile finnes for sloten: `availableZ = -Infinity`, og jobben faar hoy prioritet.
- Hvis riktig `targetZ` allerede finnes og er synlig: ingen live-job trengs.

I Trinn 2 bruker vi dette som ko-prioritet. Vi endrer ikke hvordan sloten plasseres. Vi endrer bare hvilken jobb som starter forst.

Praktisk for forste patch:

1. Start konservativt med eksisterende jobber i `norgeCleanTileManager.queue`.
2. La hver jobb faa en beregnet `priorityScore` rett for sortering.
3. Score bygger paa:
   - synlighet/senter-naerhet fra eksisterende prioritet
   - kilde-prioritet fra eksisterende system
   - anker-prioritet fra eksisterende system
   - ny `qualityGap` der den kan beregnes trygt
4. Hvis `qualityGap` ikke kan beregnes for en jobb i forste patch, fall tilbake til eksisterende prioritet.

Dette gjor at patchen kan starte lite: prioriteringen blir bedre uten at vi maa bygge parent-fallback i samme steg.

## Sporsmaal 2: skal frame-budget maales med performance.now per iterasjon eller per batch?

Frame-budget skal maales per ko-pump, ikke per hel batch.

Forslag:

- Ved start av `processNorgeCleanTileQueue()` settes `deadline = performance.now() + frameBudgetMs`.
- Startverdi: `frameBudgetMs = 8` ms.
- For hver jobb som vurderes/startes sjekkes `performance.now() >= deadline`.
- Hvis fristen er passert, stopper ko-pumpen og planlegger videre arbeid i neste frame/tick.

Hvorfor per ko-pump:

- En batch kan inneholde tusenvis av tiles.
- Batch er en logisk oppdatering, ikke en render-frame.
- Motoren maa aldri blokkere bare fordi batchen er stor.

Dette passer med systemutviklers presisering: 8 ms er startverdi og maa verifiseres paa Jones maskin.

## Sporsmaal 3: hva skjer hvis budsjettet er brukt opp midt i aa laste en tile?

Vi avbryter ikke en tile som allerede er startet.

I nettleseren er `img.src = url` en liten synkron startoperasjon som deretter laster asynkront. Nar den er startet, lar vi den fullfore eller feile normalt.

Regel:

- Sjekk deadline for vi starter neste jobb.
- Hvis jobben allerede er startet, ikke aborter den.
- Hvis deadline passeres rett etter en jobb er startet, stopper vi bare for neste jobb.
- Nettverkslast som allerede er i gang fortsetter.

Dette holder motoren stabil og unngaar halvveis avbrutte bildeobjekter.

## Trinn 2 patch-omfang

Patchen etter godkjent plan skal begrenses til Lag 1:

1. Legge inn `frameBudgetMs` paa tile-manageren, start 8 ms.
2. Legge inn en liten `scheduleNextQueuePump()` hvis koen ikke er tom naar budsjettet stopper pumpen.
3. Endre `processNorgeCleanTileQueue()` slik at den sjekker deadline for hver nye jobb.
4. Stramme prioritetssortering slik at synlig og manglende kvalitet kommer forst.
5. Oppdatere statuslinjen med enkel informasjon:
   - frame-budget, for eksempel `budget 8ms`
   - om koen ble yieldet, for eksempel `yielded`
   - antall aktive og ventende som for

Patchen skal ikke innfore parent-tile fallback. Det er Trinn 3.

## Grense mot Trinn 3

Trinn 3 kommer etterpaa og handler om parent-tile fallback:

- vis grov tile mens fin tile laster
- unngaa svarte eller tomme hull
- holde synlig flate stabil mens detalj oppgraderes

Trinn 2 skal bare gjore koen mer intelligent og mindre blokkerende.

## Grense mot Lag 2

Lag 2 kan lese motorstatus, men Trinn 2 skal ikke avhenge av Lag 2.

Viktig for Perplexety:

- prefetch skal ikke telle som live-ko for freeze-when-loaded
- live-ko maa ferdigstilles for freeze
- prefetch maa vente paa motorstatus, ikke starte bare fordi den kan
- hvis `updateNorgeDetailTiles()` senere deles i porsjoner, maa Lag 2 sin prefetch-krok ligge etter siste live-porsjon eller paa idle-event

## Testkrav for patchen

1. Start lab og pan/zoom over Norge, Island, Sverige og Svalbard.
2. Status skal vise at koen jobber i porsjoner, ikke fryser UI.
3. Freeze-when-loaded skal fortsatt fryse forst naar live-koen er tom og active er 0.
4. Unfreeze skal fortsatt returnere til dynamisk lasting.
5. Ingen synlig flytting av kartflatene.
6. Ingen endring i ankerpunkter eller polarsirkelmarkorer.
7. Ved tungt omraade skal skjermen holde seg responsiv selv om alle tiles ikke er ferdige.

## Ikke naa

Disse punktene skal ikke bygges i Trinn 2:

- Service Worker
- IndexedDB-endringer
- full virtual texturing
- GPU-minnebudsjett ala Nanite
- parent-tile fallback
- ny shader eller ny render-motor
- nye kartkilder
- endring i kartgeometri

## Anbefalt neste branch etter godkjenning

Hvis Jone godkjenner denne planen:

- kodebranch: `codex/v7-lag1-trinn2-prioritet-framebudget`
- base: `codex/v7-lag1-freeze-when-loaded`
- forventet filomfang: hovedsakelig `app.js`, eventuelt ingen `index.html` hvis statuslinjen kan bruke eksisterende DOM

