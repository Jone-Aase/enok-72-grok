# Lokal arbeidsmodell og sikkerhet

Dato: 2026-06-04  
Status: Styrende modell for videre arbeid etter POC

## 1. Kort konklusjon

Primar arbeidsplass er Jone sin lokale PC.

GitHub brukes som historikk, backup og branch-deling.

Vercel brukes som visuell testflate.

Codex Koordinator holder kontinuitet, regler og rekkefolge.

Eksterne agenter brukes som innleide eksperter per oppgave, ikke som kontinuerlige hovedutviklere.

## 2. Hvorfor lokal PC er primar

Prosjektet krever kontinuitet, lokal testing og kontroll med filer, kartdata og atlaspakker.

Lokal PC gir:

- rask browser-test
- tilgang til store lokale kartfiler
- kontroll pa kostnad
- kontroll pa hvilke prosesser som faktisk kjorer
- mindre risiko for at reset-agenter mister kontekst
- mulighet for offline/atlas-bygging

GitHub og Vercel er viktige, men de er ikke primar arbeidsflate.

## 3. GitHub sin rolle

GitHub er:

- sikkerhetskopi
- historikk
- branch-kontroll
- diff-review
- rollback-mulighet
- deling med eksperter

GitHub er ikke stedet der eksterne agenter fritt skal endre hovedretning.

Alle endringer skal ha:

- branch
- base-SHA
- commit-SHA
- kort rapport
- teststatus

## 4. Vercel sin rolle

Vercel brukes til:

- visuell branch-test
- deling med andre
- demonstrasjon
- sammenligning mellom versjoner

Vercel er ikke masterkilde for prosjektet. Masterkilden er repoet + lokal arbeidskopi.

## 5. Codex Koordinator

Denne hovedtraden er koordinator.

Ansvar:

- holde samlet retning
- beskytte POC
- holde oversikt over branches og SHA-er
- skrive og oppdatere styringsdokumenter
- koordinere Codex-instansene
- kontrollere eksterne agentleveranser
- stoppe arbeid som truer maleflaten

Hvis en annen agent resetter eller mister kontekst, skal den behandles som ny ekspert og fa handover pa nytt.

## 6. Eksterne agenter

Eksterne agenter kan brukes til:

- research
- lisenssjekk
- kildesok
- gamingmotor-teknologi
- review
- dokumentforslag
- risikoanalyse

De skal ikke eie kontinuiteten.

De skal ikke endre hovedretningen alene.

De skal ikke jobbe videre uten konkret oppgave, stopptid og forventet leveranse.

## 7. Kostnadskontroll

Ingen ekstern agent skal sta aktiv uten konkret oppgave.

Alle eksterne agenter skal ha:

1. konkret oppgave
2. maks tid
3. maks antall iterasjoner hvis mulig
4. eksplisitt stopp etter leveranse
5. ingen API-auto-reload uten Jone-godkjenning

Aktiv driftsregel:

- Codex Koordinator kan vaere aktiv.
- Codex Motor startes ved behov.
- Claude, Grok, Mistral, Gemini, Justdone og Perplexety brukes bare som eksperter per oppgave.
- Dyre modeller stoppes straks etter leveranse.

API-regel:

- Enterprise/UI-bruk kan vaere fastpris.
- API er separat forbruk.
- API-kreditter og auto-reload skal ikke aktiveres uten eksplisitt beslutning.

## 8. Backup-regel

Etter viktig fremgang:

- commit lokalt
- push til GitHub
- noter branch og SHA
- behold fungerende lokal test

For POC-niva skal minst en fungerende branch alltid beholdes urort.

## 9. Arbeidsregel for kartmotor

Ingen agent eller Codex-instans kan røre locked rules uten stopp og Jone-godkjenning.

Locked rules:

- ankerpunkter
- GE-grid
- solsirklene
- aeProject
- transform
- skala
- rotasjon
- tile-posisjon
- kartflatenes interne proporsjoner

Tillatt arbeid:

- ko
- cache
- LOD
- atlasmanifest
- lokal/offline lagring
- fallback
- status/diagnostikk
- visuelle overlays som ikke flytter maleflaten

## 10. Sikkerhet ved flere instanser

Flere Codex-instansser kan brukes, men bare med kontrakt:

- en instans
- en rolle
- en oppgave
- en branch
- en rapport tilbake

Ingen instans jobber pa samme branch som en annen.

Ingen instans endrer samme filer samtidig uten avtale.

Koordinator bestemmer nar noe kan bli ny base.

## 11. Neste fase

Neste fase er ikke mer ukontrollert kartdekning.

Neste fase er:

1. sikre POC
2. etablere lokal/offline LOD-atlasmodell
3. bygge top-atlas ved ca. 2 km fra sjokartene
4. teste offline/uten ny serverlasting
5. fortsette region for region

## 12. Beslutning

Denne modellen gjelder fra og med POC-status 2026-06-04.

Lokal PC er primar arbeidsplass.

GitHub er backup og historikk.

Vercel er testflate.

Codex Koordinator styrer.

Eksterne agenter brukes bare som innleide eksperter.
