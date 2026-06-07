# Fase 1: 1:5000-motor og kartblad-malband

Status: plan, ingen kode.

Formalet med Fase 1 er aa faa Instrumentet ned til det mest detaljerte kartlaget vi trenger, uten svart skjerm og uten at noen godkjente funksjoner fjernes. Samtidig skal vi etablere et nytt firkantet kartblad-malband som bygger paa dokumenterte kartbladmaal, og som senere kan brukes som maalereferanse for resten av verden.

## Hovedregel

Ingen eksisterende funksjoner skal fjernes i Fase 1.

Endringer skal vaere smaa, reversible og avgrenset til den delen av motoren eller grensesnittet som er uttrykkelig godkjent av Jone.

For noe endres i Instrumentet skal Codex bekrefte med Jone at oppgaven er forstaatt, og kun gjore det som er avtalt.

## Laaste omraader

Fase 1 skal ikke rore:

- ankerpunkter
- GE-grid
- solsirklene
- aeProject
- transform
- skala
- rotasjon
- tile-posisjon
- kartproporsjoner
- intern geometri i godkjente kartflater

Hvis en foreslaatt losning krever endring i ett av disse punktene, skal arbeidet stoppes og Jone sporres forst.

## Viktig avgrensning: firkantnett vs GE-nett

Firkantnettet skal ikke styres av UTM-akser, UTM-nullpunkter eller UTM-soner. Slike opplysninger horer til GE-nett/kartreferanse i Instrumentet, ikke til firkantnettets geometri og kartdokumentasjon.

GE-grid og kartblad-malband er to forskjellige systemer:

- GE-grid: geografisk referanse i Instrumentet.
- Kartblad-malband: firkantet maaleflate basert paa dokumenterte kartbladmaal.

Disse skal kunne vises separat og ikke blandes i kode eller dokumentasjon.

## Fase 1 maal

Fase 1 er godkjent naar:

1. Instrumentet kan zoome ned til detaljnivaaet for Se Eiendom / 1:5000 uten at kartflaten blir svart.
2. Gammel synlig kartflate beholdes til ny detaljflate er klar.
3. Basekart lastes for Se Eiendom-overlay.
4. Se Eiendom-overlay kan mangle eller laste tregt uten at basekartet forsvinner.
5. Kartblad-malbandet kan slaas av og paa.
6. Kartblad-malbandet viser hovedbladet 6400 x 4800 m.
7. Dokumentasjon for malbandet er tilgjengelig fra Instrumentet.

## Nivaadeling

### Nivaa 0: Sikring og status

Maal: Bevare dagens fungerende POC for videre arbeid.

Leveranser:

- bekreftet arbeidskopi
- tydelig branch / mappe / dato
- dokumentert hva som er aktiv baseline
- ingen kodeendring

Aksept:

- `app.js` og `index.html` er ikke endret
- eksisterende kartvalg er intakte
- Se Eiendom-kilden er fortsatt tilgjengelig

### Nivaa 1: No-black-frame motor

Maal: Motoren skal aldri gjore skjermen svart fordi ny tileRange, nytt z-nivaa eller nytt pane ikke er ferdig.

Prinsipp:

- current pane beholdes synlig
- staging pane bygges i bakgrunnen
- basekart lastes forst
- overlay lastes etter base
- swap skjer forst naar staging er klar
- gammel pane fjernes forst etter at ny pane er synlig

Dette er samme hovedprinsipp som Leaflet, Google Earth/Cesium og spillmotor-streaming bruker: brukeren ser alltid beste tilgjengelige flate mens neste detaljnivaa lastes.

Funksjoner som maa planlegges for kode:

- `updateNorgeDetailTiles()`
- `updateNorgeCleanDetailTiles()`
- `queueNorgeCleanTile()`
- `processNorgeCleanTileQueue()`
- `checkNorgeFreezeWhenLoaded()`
- `norgeCleanTileManager`
- eksisterende Diagnostikk V1-status

Aksept:

- ingen svart skjerm ved zoom mot Oslo
- basekartet forblir synlig mens Se Eiendom laster
- ingen endring i kartgeometri
- Diagnostikk viser current/staging/swap-status

### Nivaa 2: 1:5000-kilde og LOD-policy

Maal: Motoren skal faktisk velge og vise riktig detaljnivaa der 1:5000-laget er tilgjengelig.

Dette nivaaet skal bare styre hvilket detaljnivaa som hentes, ikke hvor kartet ligger.

Leveranser:

- bekrefte riktig Kartverket/Se Eiendom/Matrikkel-kilde
- vise valgt z/LOD i diagnostikk
- skille base og overlay i status
- sikre at Se Eiendom ikke stjeler basekartets tile-budsjett
- etablere hoyde-/screen-space-regel for detaljvalg

Aksept:

- Oslo kan zoomes ned til Se Eiendom-nivaa uten blanking
- z/LOD oker naar kameraet gaar naermere
- basekart og overlay rapporteres separat
- feil eller treg overlay stopper ikke basekart

### Nivaa 3: Kartblad-malband 6400 x 4800 m

Maal: Legge inn et eget kartblad-malband basert paa dokumentert hovedbladstorrelse.

Dette skal vaere et nytt, separat overlay-system. Det skal ikke erstatte GE-grid og ikke kobles til UTM-regler.

Forste malband:

- hovedblad: 6400 x 4800 m
- underdeling senere: 3200 x 2400 m
- videre underdeling senere: 1600 x 1200 m

I Fase 1 tegnes bare hovedbladet 6400 x 4800 m, med tynn skjermstrek som ikke skalerer til flere kilometer bredde ved zoom.

Aksept:

- egen av/paa-knapp
- tydelig navn, for eksempel `Chart sheet measure grid`
- ingen gamle firkantnett slaas paa samtidig ved et uhell
- tynn linje paa skjermen
- gridet paavirker ikke kartmotoren

### Nivaa 4: Dokumentasjon i Instrumentet

Maal: Brukeren skal kunne klikke paa info og se hva malbandet er basert paa.

Dokumentasjonen skal forklare:

- at dette er kartblad-malband
- at det ikke er GE-grid
- at det ikke er UTM-styrt i vaar modell
- hovedmaal: 6400 x 4800 m
- neste delinger: 3200 x 2400 m og 1600 x 1200 m
- hvilken dokumentasjon som er brukt
- at dette er malband for videre verdensbygging

Aksept:

- info-knapp eller info-lenke ved grid-valget
- dokumentasjonen vises uten aa aapne ekstern nettside
- teksten skiller klart mellom GE-grid og kartblad-malband

## Anbefalt arbeidsrekkefolge

### Steg 1: Plan for no-black-frame motor

Ren plan. Ingen kode.

Maalet er aa beskrive current/staging/swap-livslopet og hvilke tellere som trengs.

### Steg 2: Minimal no-black-frame patch

Kun etter godkjenning.

Maalet er aa stoppe svart skjerm ved naerzoom uten aa endre geometri.

### Steg 3: 1:5000 LOD-status

Kun etter at motoren ikke blanker.

Maalet er aa se at riktig z/LOD velges og at Se Eiendom-overlay ikke stopper basekart.

### Steg 4: Kartblad-malband hovedblad

Kun etter at motoren er stabil nok til aa zoome.

Maalet er aa tegne 6400 x 4800 m hovedblad som separat overlay.

### Steg 5: Dokumentasjon/info-knapp

Legges inn naar malbandet er synlig og riktig avgrenset.

## Ting vi ikke gjor i Fase 1

- ingen full verdens-atlasering
- ingen nedlasting av store kartsett
- ingen endring av kartprojeksjon
- ingen rebaking eller resampling av kartbilder
- ingen ny GE-grid-geometri
- ingen UTM-styring av firkantnettet
- ingen fjerning av eksisterende funksjoner
- ingen GPU-/shader-motor som fundament

## Kontrollsporsmaal for hver patch

For hver patch skal disse sporsmaalene besvares:

1. Hvilken del av Fase 1 gjelder patchen?
2. Hvilke filer rores?
3. Rorer patchen noen laaste omraader?
4. Fjerner patchen noen eksisterende funksjon?
5. Hvordan kan Jone visuelt teste at dette virker?
6. Hvordan ruller vi tilbake hvis det blir feil?

## Kort konklusjon

Fase 1 skal forst gjore motoren stabil nok til aa vise 1:5000 uten svart skjerm. Deretter bygger vi kartblad-malbandet paa dokumenterte maal, forst 6400 x 4800 m, som en egen maaleflate over Instrumentet. Dette blir forste trygge steg mot et verdensdekkende malband, uten aa blande det med GE-grid eller endre kartets godkjente geometri.
