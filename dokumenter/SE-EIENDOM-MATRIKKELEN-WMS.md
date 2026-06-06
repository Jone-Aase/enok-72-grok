# Se eiendom / Matrikkelen Enkel WMS

Dette dokumentet bevarer kilden som eget kartlag i Instrument-testen.

## Kilde

Navn i Instrumentet: Se eiendom

Tjeneste: Matrikkelen Enkel WMS

Utgiver: Kartverket

Endepunkt:

https://wms.geonorge.no/skwms1/wms.matrikkel?service=wms&request=getcapabilities

## Bruk i testkopien

Testmappe:

clean-motor-lab-se-eiendom

Kildetype i app.js:

wms-se-eiendom

Lag brukt i WMS GetMap:

eiendomskart,presentasjonsdata

## Regel for bruk

Dette laget er et visuelt WMS-overlay. Det skal ikke endre ankerpunkter, GE-grid,
solsirklene, aeProject, transform, skala, rotasjon, tile-posisjon eller kartproporsjoner.

Laget skal behandles som separat kilde og ikke blandes sammen med Kartverket
WMTS-basiskartene.
