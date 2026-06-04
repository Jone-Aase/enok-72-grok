# Prosjektplan: Team, sikker arbeidsflyt og LOD-atlas

Dato: 2026-06-04  
Status: POC er oppnadd. Neste fase er sikring, teamstruktur og lokal/offline LOD-atlasmotor.

## 1. Hovedmal

Bygge Enok 72-kartmotoren videre fra fungerende POC til en stabil atlasmotor som kan:

- vise sjokartbaserte kartflater uten Leaflet som hovedmotor
- kjore med lokale/offline atlaspakker
- bruke LOD-pyramide fra grov global oversikt til 1:5000-detaljer
- laste bare det som er synlig eller snart synlig
- aldri endre kartflatenes mal, form eller anker

Neste hovedsteg:

**Lokal/offline LOD-atlasstruktur for sjokartbaserte kartflater.**

## 2. Hvorfor vi stopper her og organiserer

POC-en viser at retningen virker. Norge, Island og deler av Norden kan legges sammen som sjokartflater, og motoren er blitt tydelig bedre med:

- freeze-when-loaded
- prioritert tile-ko
- hard frame-budget
- parent-tile fallback
- lavdetaljert overview-lag

Men videre arbeid uten tydelig teamstruktur vil gi risiko for:

- motstridende branches
- endringer i samme filer samtidig
- tap av fungerende POC
- utilsiktet endring av anker, transform eller kartproporsjoner
- for mye live-lasting fra servere

Derfor formaliseres team og arbeidsflyt for neste fase.

## 3. Teamroller

### Jone

Ansvar:

- leder retningen
- tester visuelt
- godkjenner hva som er maleflate
- bestemmer nar noe kan bli ny base
- stopper arbeid som ikke stemmer med instrumentets grunnregler

Ingen hovedlinje endres uten Jone sin godkjenning.

### Codex Koordinator

Denne rollen ligger i hovedtraden.

Ansvar:

- holde samlet oversikt
- holde siste godkjente branch og SHA
- skrive styringsdokumenter
- kvalitetssjekke leveranser fra andre agenter
- stoppe endringer som truer maleflaten
- koordinere merge-rekkefolge

Codex Koordinator er ikke bare en kodeagent. Rollen er ogsa prosjektkontroll.

### Codex Motor

Kan kjores som separat Codex-instans nar vi trenger fart.

Ansvar:

- bygge sma, konkrete patcher
- jobbe pa egen branch
- teste lokalt
- rapportere diff, SHA og testresultat

Begrensning:

- ingen arbeid pa samme branch som koordinator
- ingen endring i samme filer samtidig uten avtale
- ingen stor arkitekturendring uten plan forst

### Claude / Systemutvikler

Ansvar:

- arkitektur-review
- risikoanalyse
- lese diff og planer
- fange feil for de blir dyre
- gi stoppsignal hvis en patch truer locked rules

Claude bygger ikke hovedmotor uten konkret oppgave og godkjent branch.

### Perplexety

Ansvar:

- data, cache og offline-strategi
- kilde- og lisenssok
- atlasformat
- LOD-manifest
- prefetch/cache-planer

Perplexety skal ikke endre maleflate, transform eller anker. Dataarbeid skal kobles til motorstatus, ikke bare "last mer".

### Andre agenter

Kan brukes til:

- kildesok
- lisensinformasjon
- gamingmotor-teknologi
- sammenligning av atlasformat
- dokumentutkast

De skal ikke endre app-kode uten avgrenset oppgave, branch og review.

## 4. Fast arbeidsflyt

1. Jone eller koordinator definerer oppgaven.
2. Oppgaven far en tydelig branch.
3. Plan skrives forst hvis endringen er mer enn en liten fix.
4. Kode skrives bare etter gront lys.
5. Diff kontrolleres mot locked rules.
6. Browser-test kjores lokalt.
7. Leveranse rapporteres med branch, ekte SHA og teststatus.
8. Jone tester.
9. Koordinator bestemmer om den kan bli ny base.

Ingen "jeg fikset litt" uten branch og rapport.

## 5. Branch-regler

- En agent per branch.
- Ingen to agenter jobber pa samme branch samtidig.
- Ingen to agenter endrer samme fil samtidig uten avtale.
- Branch skal bygges fra oppgitt base-SHA.
- Ekte SHA rapporteres etter push.
- Hvis push feiler, stopp og si det. Ikke fabriker SHA.

## 6. Laste- og LOD-prinsipp

Motoren skal ikke laste hele verden i hoy detalj samtidig.

Riktig modell:

- grovt globalt atlas alltid tilgjengelig
- region-atlas nar du kommer narmere
- sjokart-atlas pa 7 km og 2 km
- hoyopplosning bare for synlig omrade
- RAM-cache for nylig brukte tiles
- lokal disk/atlas for ferdigbygde omrader

Dette er samme prinsipp som Google Earth og moderne spillmotorer bruker.

## 7. Forelopig LOD-struktur

| Niva | Rolle | Hoydeomrade | Status |
| --- | --- | --- | --- |
| world-low | grov global bakgrunn | 100 km og opp | ma bygges |
| region-mid | Nord-Atlanteren/Norden | 20-100 km | ma bygges |
| nordic-7km | sammensatt sjokartflate | ca. 7-20 km | POC-naer |
| marine-2km | topp sjokartlag | ca. 2-7 km | neste byggesteg |
| marine-detail | 1:5000 og narmere | under ca. 2 km | live/cache senere |

Det observerte skiftet mellom ca. 2,0 og 2,2 km brukes som praktisk grense for neste test.

## 8. Neste konkrete oppgave

Arbeidsnavn:

**Build top atlas at 2 km**

Mal:

- sette kamera til valgt hoyde/LOD-grense
- laste sjokarttiles ferdig
- fryse laget
- rapportere antall tiles, kilder, dekning og status
- lagre/forberede dette som atlasgrunnlag

Forbud:

- ingen endring av anker
- ingen endring av aeProject
- ingen endring av GE-grid
- ingen endring av solsirklene
- ingen endring av transform/skala/rotasjon/tile-posisjon

## 9. Locked rules

Ingen agent kan røre disse uten eksplisitt stopp-og-spor Jone-godkjenning:

- ankerpunkter
- GE-grid
- solsirklene
- aeProject
- transform
- skala
- rotasjon
- tile-posisjon
- kartflatenes interne proporsjoner

Tillatte forbedringsomrader:

- ko
- cache
- atlasmanifest
- LOD-valg
- fallback
- status/diagnostikk
- lokal/offline datalagring
- visuelle overlays som ikke flytter maleflaten

## 10. Hva vi ikke gjor na

- Ikke bygge mer ukontrollert live-kartdekning.
- Ikke bruke OSM som maleflate.
- Ikke starte full gamingmotor-migrering.
- Ikke merge eksperimenter direkte.
- Ikke optimalisere 1:5000 for hele verden for atlasstrukturen er pa plass.

## 11. Sikkerhetsmodell

Hvis en agent faller ut, roter seg bort eller leverer feil:

1. Arbeidet stoppes.
2. Koordinator leser branch/diff.
3. Laste/maleflate-risiko vurderes.
4. Fungerende POC beholdes.
5. Ny agent kan fortsette fra siste godkjente SHA.

Dette er grunnen til at teamet kan ha flere agenter uten at prosjektet blir kaos.

## 12. Status for POC

POC er verdifull og skal beholdes som referanse.

POC viser:

- sjokartene er riktig retning
- OSM er ikke maleflate
- LOD/atlas er neste nodvendige fundament
- motoren trenger mindre live-lasting, ikke bare mer kraft

Neste fase starter nar Jone godkjenner at denne prosjektplanen er styrende.
