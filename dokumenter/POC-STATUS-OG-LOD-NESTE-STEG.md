# POC-status og neste hovedsteg

Dato: 2026-06-04  
Status: POC-niva oppnadd for clean sjokartmotor i nordomradet

## Kort konklusjon

Vi har kommet til et fungerende POC-niva. Motoren kan vise sjokartflater som matcher ankerpunktene godt nok til at videre arbeid skal handle om stabilisering, datalagring og LOD-struktur, ikke om a legge pa stadig flere live kartkilder.

Neste hovedsteg skal derfor sta overst pa listen:

**Bygg lokal offline LOD-atlasstruktur for sjokartbaserte kartflater.**

Ingen stor utvidelse av kartdekning skal prioriteres foran dette.

## Hva som er bevist

- Clean pixelflate-motoren fungerer uten Leaflet som hovedmotor.
- Norge sjokart og Island sjokart kan ligge sammen og matche godt mot polarsirkelankrene.
- Grimsøy/Island-testen ga sterk bekreftelse pa at sjokartflatene kan bygges videre bit for bit.
- Sverige/sjokart passer godt nok mot Norge til videre POC-bygging.
- Parent-tile fallback, freeze-when-loaded, hard frame-budget og prioritert ko gir betydelig bedre flyt.
- Lavdetaljert overview-atlas kan ligge under detaljlaget som sikkerhetsnett.

## Hva som ikke er godkjent som maleflate

- OSM / Verdenskart vei passer ikke som sann maleflate. Det er strukket/feil i forhold til polarsirkelen og Island.
- OSM kan kun brukes som referanse/hjelpelag, ikke som fundament.
- Flere live kartkilder skal ikke legges til ukritisk. De kan gi visuell nytte, men de loser ikke offline/LOD-problemet.

## Laste- og motorprinsipp videre

Motoren skal ikke prove a holde hele verden i hoy opplosning samtidig.

Riktig modell:

1. Grovt globalt atlas lokalt.
2. Region-atlas lokalt.
3. Sjøkart-atlas ved praktiske hoyder, f.eks. rundt 7 km og 2 km.
4. Høyopplosning bare for synlig omrade.
5. Nylig brukte tiles beholdes i RAM en stund.
6. Store datasett ligger pa disk/offline cache.

Dette er samme prinsipp som Google Earth og spillmotorer bruker: alltid noe grovt synlig, detaljer streames inn etter behov.

## Foreslatt LOD-pyramide

Tallene er forelopige og skal kalibreres i motoren:

| Lag | Rolle | Omtrentlig hoyde | Lagring |
| --- | --- | --- | --- |
| world-low | Grov global bakgrunn | 100 km og opp | lokal fil/atlas |
| region-mid | Nord-Atlanteren / Norden | 20-100 km | lokal atlaspakke |
| nordic-7km | Sammensatt sjokartflate | ca. 7-20 km | lokal atlaspakke |
| marine-2km | Topp sjokartlag for POC | ca. 2-7 km | lokal atlaspakke |
| marine-detail | 1:5000 og narmere | under ca. 2 km | synlig omrade + cache |

## Viktig observasjon

Jone observerte et tydelig detaljskifte mellom ca. 2,0 km og 2,2 km hoyde. Dette skal brukes som praktisk LOD-grense for a bygge et topp-atlas av sjokartene.

Neste test bør derfor hete:

**Build top atlas at 2 km**

Den skal:

- sette kamera/hoyde til valgt LOD-grense
- laste sjokarttiles ferdig
- fryse laget
- rapportere antall tiles, kilder og dekning
- ikke endre anker, transform, skala, rotasjon eller tile-posisjon

## Lastefri/offline-mal

Målet er at instrumentet etter hvert skal kunne kjore uten internett for omrader vi har bygget atlas for.

For det trenger vi:

- atlas-manifest per omrade
- lokal filstruktur for tiles/atlas
- versjonering av kilder og LOD-niva
- enkel kontroll av dekning: hvilke lat/lon-omrader finnes lokalt
- fallback til grovere lokalt lag nar detaljlag mangler

## Laste- og cache-regler

- Live servere skal brukes til bygging/test, ikke som permanent avhengighet.
- Cache skal ikke erstatte atlas. Cache er midlertidig; atlas er en bevisst pakke.
- Prefetch skal styres av synlighetsbehov, ikke bare "last mer".
- Ingen tile skal lastes i hoy opplosning hvis et grovere lag dekker oppgaven godt nok.

## Lastede/aktive lag ma beskyttes

Laste- og LOD-arbeid kan bare røre:

- ko
- cache
- atlasmanifest
- synlighetsvalg
- fade/fallback
- status/diagnostikk

Det kan ikke røre:

- ankerpunkter
- GE-grid
- solsirklene
- aeProject
- transform
- skala
- rotasjon
- tile-posisjon
- kartflatenes interne proporsjoner

## Team og arbeidsform

Jone:

- godkjenner retning
- tester visuelt
- bestemmer hvilke kartflater som blir maleflater

Codex:

- holder motorarkitekturen samlet
- lager presise sma patcher
- tester og stopper endringer som truer maleflaten

Systemutvikler / Claude:

- review og arkitekturkontroll
- planlegger visuelle/lagdelte forbedringer nar fundamentet er klart

Perplexety:

- Lag 2 data/cache/prefetch
- offline/atlas-planlegging etter Codex sin LOD-grenseflate

Andre agenter:

- kan brukes til forskning, kildesok, lisenssjekk og gamingmotor-teknologi
- skal ikke endre motoren uten konkret oppgave og review

## Ressurser vi ma finne

- Offisielle sjokartkilder for neste regioner.
- Lisens/bruksvilkar for lagring av lokale atlaspakker.
- Lagringsstrategi: filbasert atlas, MBTiles, PMTiles eller egen enkel tilemappe.
- Manifestformat for LOD og dekning.
- Testmaskin/budsjett for minne, disk og lastetid.
- Verktøy for a bake atlas ved valgt hoyde/zoom.

## Akseptkriterier for neste POC-steg

Neste POC-steg er godkjent nar:

- ett sjokartbasert topplag kan bygges ved ca. 2 km
- laget kan fryses og brukes uten ny live-lasting i samme sesjon
- et grovere overview-lag alltid ligger under
- zoom ut gir aldri hull/tomt kart
- live detaljer kan slas av uten at grunnkartet forsvinner
- alle locked rules er bekreftet urort

## Beslutning

Fra og med dette punktet er prioritet:

1. Sikre POC.
2. Bygge LOD/atlas-struktur.
3. Lage lokal/offline datamodell.
4. Fortsette kartbygging region for region.

Ikke mer ukontrollert live-lagbygging for hele verden for dette er pa plass.
