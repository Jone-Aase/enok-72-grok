# Plan: unngå dobbel pane-opacity ved overlapp

Status: forslag, ikke implementert. Plan først, ingen kode.

Baseline for denne planen: codex/v7-color-test-1 @ 1da6404.
Branch for planen: claude/v7-pane-opacity-stack-plan.

## Observert problem

Hver kart-pane har klassen .norge-clean-pixelflate og rendres med opacity 0.52. Når to paner ligger oppå hverandre (typisk Norge-pane + Island-pane, eller en retired pane fra Lag 3 før den fjernes), multipliseres pane-opacity slik at det overlappende området fremstår mørkere enn et område dekket av bare en pane. Det skaper en synlig mørkere stripe der to kart-flater overlapper, og fjerner den jevne lys-tonen Jone har laast inn mot bakgrunnen.

Årsaken er ikke fargen til en enkelt pane. Årsaken er at opacity blir satt per pane, og at to halv-transparente paner over hverandre gir summert demping.

## Funn i koden (lest, ikke endret)

I index.html linje 307 til 316 har .norge-clean-pixelflate { opacity: 0.52; } som CSS-regel. Parents #norge-clean-detail-layer (z-index 4) og #norge-screen-detail-layer (z-index 1) har ingen opacity satt. De er begge position absolute, inset 0, og brukes som container for paner avhengig av modus.

I app.js syncNorgeCleanControls (rundt linje 3290 til 3317) leser slideren #norge-clean-opacity verdien (0 til 100), regner den om til 0 til 1, og setter pane.style.opacity per .norge-clean-pixelflate. Det vil si: inline-style overstyrer CSS-regelen, og hver pane får sin egen opacity.

I app.js (rundt linje 3870 til 3925) opprettes hver pane som div.norge-clean-pixelflate og legges inn i enten #norge-screen-detail-layer (når detailLayer finnes) eller #norge-clean-detail-layer. Lag 3 retire-then-append legger flere paner i samme parent samtidig under zoom-overganger.

Konklusjon av funn: stackingen skjer fordi opacity ligger på pane-nivå, og det er flere paner i samme parent samtidig — både ved Norge plus Island, og ved Lag 3 sin retire-then-append-overgang.

## Svar på de syv spørsmålene

### 1. Bør parent opacity flyttes til overordnet kartlag?

Ja. Det er den naturlige løsningen for å unngå at to halv-transparente paner stackes mot hverandre. Når opacity ligger på parent-laget, behandler nettleseren hele lag-treet som én flate som komponeres mot bakgrunnen med én opacity, uavhengig av hvor mange paner som ligger inni.

### 2. Kan hvert pane være opacity 1, mens hele clean-map-layer har opacity 0.52?

Ja. Det er nøyaktig det forslaget er. Paner får opacity 1 (eller får fjernet sin opacity-deklarasjon). Parent-laget får opacity 0.52. Resultatet: ett komponert lag mot bakgrunnen, ingen multiplikativ demping ved overlapp, samme samlede gjennomsiktighet som i dag der bare ett pane ligger.

### 3. Hvilke CSS-elementer må endres?

I index.html må tre regler endres:

For .norge-clean-pixelflate: fjern opacity 0.52, behold alt annet (position, transform-origin, pointer-events, outline, --tile-bleed). Pane-nivået skal være helt opakt.

For #norge-clean-detail-layer: legg til opacity 0.52. Det er parent når detailLayer ikke brukes.

For #norge-screen-detail-layer: legg til opacity 0.52. Det er parent når detailLayer brukes (det er normaltilfellet i v7-clean).

Resten av CSS-en røres ikke. Geometri, transform, anchor, tile-bleed, outline, z-index er uberørt.

I app.js må syncNorgeCleanControls endres slik at slideren skriver opacity til de to parent-lagene i stedet for å iterere over hver pane. Det er én funksjon, og endringen er bytte av target-element. Ingen ny logikk.

For å unngå at gamle inline-styles på paner fortsatt overstyrer (etter første eksisterende slider-bruk), bør syncNorgeCleanControls også rydde bort pane.style.opacity ved å sette den til tom streng på hver pane den ser. Det er en defensiv en-linjes opprydding, ikke ny mekanikk.

### 4. Hva skjer når bare ett pane vises?

Ingen synlig forskjell fra i dag. Parent har opacity 0.52, pane har opacity 1, sluttresultatet mot bakgrunnen er 0.52. Identisk med dagens visuelle uttrykk når bare ett pane er aktivt.

### 5. Hva skjer når Norge plus Island vises samtidig?

Begge paner har opacity 1 og blir tegnet inn i samme parent. Parent komponeres som ett samlet bilde med opacity 0.52 mot bakgrunnen. Det betyr at overlappsområdet fremstår med samme lyshet som ikke-overlappsområdet. Den mørke stripen forsvinner.

Hvis Norge-pane og Island-pane har forskjellig egenfarge i overlappsområdet, vil resultatet i overlappsområdet bli en vanlig oppå-hverandre-tegning der det øverste pane skjuler det underste i piksler de begge dekker. Det er forventet og ønsket: ingen multiplikativ demping, bare normal lag-rekkefølge.

### 6. Hvordan tester vi at overlapp ikke blir mørkere?

Visuelt test, tre steg:

Steg 1: Pan til et område der bare Norge-pane ligger. Bekreft at lysheten ser uendret ut mot dagens versjon. Det verifiserer at parent-opacity-tallet ble riktig overført.

Steg 2: Pan til et område der både Norge-pane og Island-pane ligger, og se på overlappssonen. Den skal nå ha samme lyshet som ikke-overlappssonen. Den synlige mørke stripen skal være borte.

Steg 3: Under en zoom-overgang der Lag 3 holder retired pane og ny pane samtidig i et øyeblikk: hele kartet skal forbli jevnt belyst. Ingen kort mørk blink i overgangen.

Slider-test: dra #norge-clean-opacity fra 0 til 100. Tallet skal fortsatt fungere på samme måte. Ved 0 er kartet usynlig. Ved 100 er det fullt synlig. Ved 52 (default) er det identisk med dagens.

### 7. Kan dette kombineres med CSS seam-test 1 uten å røre geometri?

Ja. Seam-test 1 på codex/v7-color-test-1 endret tile opacity (på selve tile-img) til 1 og økte --tile-bleed til 1.0 px. Begge er tile-nivå-justeringer inne i pane. Denne planen flytter pane-opacity opp til parent-nivå. De to lagene jobber på forskjellige nivåer i DOM-treet, og kombineres naturlig:

- Tiles inne i pane: opacity 1, bleed 1.0 px (uendret fra v7-color-test-1).
- Pane: opacity 1 (ny, før: 0.52).
- Parent layer: opacity 0.52 (ny, før: ingen).

Geometri, transform, anchor-system, aeProject, tile-loading, Lag 1 backoff, Lag 3 retire-then-append: alt er uberørt. Det er en ren visuell rendering-justering på CSS-nivå pluss et mindre target-bytte i slider-funksjonen.

## Risiko og bivirkninger

Risiko 1: Hvis det finnes andre paner som ikke skal arve parent-opacity, vil de også bli 52 prosent. Ingen slike paner er observert i clean-detail-layer eller screen-detail-layer i nåværende kode. Begge inneholder kun .norge-clean-pixelflate (og en eventuell diagnostics overlay som ligger i cleanLayer ved siden av, ikke under detailLayer).

Risiko 2: Diagnostikk-overlegg (.norge-clean-diagnostics, .norge-clean-map-overlay) ligger normalt i #norge-clean-detail-layer. Hvis disse skal forbli fulle 100 prosent (typisk ønsket for tall, ankerpunkter, ringer), må de unntas. To muligheter, valg fattes når patch skrives:

- Sette opacity: 1 eksplisitt på .norge-clean-diagnostics og .norge-clean-map-overlay. Det vil ikke fungere fordi parent-opacity arves multiplikativt.
- Flytte parent-opacity til en mellom-wrapper rundt kun panene, ikke rundt diagnostikk. Det krever én ny div i DOM. Det er ikke ønskelig hvis vi vil holde DOM uendret.
- Alternativ tredje: la diagnostikk forbli i parent og akseptere 52 prosent på diagnostikk-elementer. Det er muligens akseptabelt, men må bekreftes av Jone.

Foreslått håndtering: i planen ber jeg om beslutning fra Jone før patch. Standard-anbefaling er å akseptere 52 prosent på diagnostikk, fordi diagnostikk ikke er fokus i seam-arbeidet og det holder DOM uendret.

Risiko 3: Slider-funksjonen syncNorgeCleanControls kalles fra flere steder i app.js. Endringen i target-element må være enkel og bakoverkompatibel: setter alltid både parent-opacity og rydder bort eventuelle gamle pane.style.opacity. Det dekker både første kjøring og senere slider-bruk uten å miste tilstand.

## Hva som ikke endres

Ikke endret: aeProject, anchor-systemet, transform, tile-koordinater, tile URL, tile-loading-kø, Lag 1 backoff, Lag 3 retire-then-append, z-index, pane-dimensjoner, kart-rotasjon, kart-skala, Kartverket-kilder, Island-kilde-fallback.

Ikke brukt: blur, mask, canvas, mix-blend-mode, filter på pane, ny DOM-wrapper.

Tillatt brukt: CSS opacity på parent-layer, CSS opprydding av inline pane.style.opacity, en endring av target-element i én eksisterende slider-callback.

## Rekkefølge når plan er godkjent

Steg 1: bekreft beslutning rundt diagnostikk (Risiko 2).
Steg 2: skriv patch på claude/v7-pane-opacity-stack-css basert på claude/v7-pane-opacity-stack-plan.
Steg 3: rapporter commit-SHA, verifiser kun index.html plus app.js endret, ingen geometri-fil rørt.
Steg 4: Jone tester i nettleser, godkjenner eller justerer.
