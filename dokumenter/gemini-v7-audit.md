# Audit av Norge-motor (v7-clean)

Dette er en gjennomgang av kartmotoren i `app.js` med tanke på en overgang til en Rule 1-ren v7-clean. Sentralt for v7-retningen er at vi **ikke** skal gjøre client-side reprojeksjon eller deformere individuelle tiles. Kartverkets tiles samles i én intern pixelflate, som deretter plasseres i AE-verdenen ved hjelp av én samlet similarity-transform (skalering, rotasjon, posisjon).

## 1. Hvor brukes WebMercator?

WebMercator brukes utelukkende som adresseringsmekanisme for å hente tiles fra Kartverkets WMTS API:
`verket.no/v1/wmts/1.0.0/topo/default/webmercator/${z}/${y}/${x}.png`
Det finnes logikk og kommentarer under overskriften `// ---- Web Mercator-konvertering ----` for å oversette tile-koordinater til posisjoner på den interne flaten, samt referanser til at tile-Y øker mot sør. WebMercator brukes alttså *kun* for å hente og sette sammen kartbildet (tiles) internt.

## 2. Hvor brukes AE-projeksjon?

`aeProject(lat, lon)` brukes overalt i `app.js` for å beregne korrekte, polare koordinater (Azimuthal Equidistant) i 3D-scenen for Instrument-objektene (solens ringer for breddegrad, meridianer og GE-gridet for rett nord/lengdegrad). For kartets del brukes den utelukkende til å beregne den eksakte, sanne posisjonen til de tre ankerpunktene:
- Selsøy (66.5502, 12.8462)
- Kveitanosen (66.5500, 12.6383)
- Arctic Circle Center (66.5500, 15.3266)

Disse tre AE-beregnede punktene utfør den absolutte sannheten kartpanelet skal låses mot. `aeProject` brukes **ikke** for geometri eller projeksjon per tile.

## 3. Finnes det per-tile tileBounds -> aeProject?

I den nåværende baseline-koden eksisterer `tileBounds()`, `tileYToLat()` og `aeProject()` inne i tile-loopen. Dette er arkitekturens kjente svakhet som v7-clean skal rette opp. Baseline er visuell referanse, ikke endelig motor.

## 4. Finnes Leaflet-rester?

Ja. Det er flere tekstlige referanser og utkommentert kode i `app.js` som nevner fjerningen av Leaflet:
- `// (v6.1) Leaflet er borte`
- `// (v6.1) Leaflet er borte — ingen applyNorgePlacement()`
- `// Ingen Leaflet, ingen CSS-matrix, ingen DOM-overlegg`
- `// Selve Leaflet/Kartverket-kartet initialiseres senere`

`index.html` inneholder også Leaflet-referanser som må renses bort.

## 5. Hva må endres for en Rule 1-ren v7-clean?

1. **Isolere Tile-henting:** WebMercator skal utelukkende være en ekstern adresse (X, Y, Z) for å hente bildeutklipp. Disse utklippene monteres til en ren, intern Norge-pixelflate i Three.js. Kartverkets adresseringssystem definerer ikke skala, nord eller geometri i Instrumentet.
2. **Låse Norge-panelet (3-anker):** Hele Norge-panelet skal plasseres som en rigid enhet i AE-verdenen, styrt av én enkelt samlet transformasjon. Panelet skal låses matematisk til de tre polarsirkelankrene (Selsøy, Kveitanosen, Arctic Circle Center). Denne plasseringen tvinger panelet til å rette seg etter GE-gridet for rett nord/lengdegrad og Solens ringer for breddegrad.
3. **Fjerne per-tile AE-logikk:** Fjerne `tileBounds()`, `tileYToLat()` og alle kall til `aeProject()` inne i tile-loopen.
4. **Rydde Leaflet-rester:** Fjerne alle kommentarer, ubrukte funksjoner og HTML/CSS-referanser knyttet til Leaflet.

## 6. Hvilke filer må endres senere?

- `app.js`: Fjerne per-tile AE-logikk, rydde Leaflet-kommentarer, verifisere at 3-anker similarity-transformasjonen er den eneste metoden som styrer plasseringen av Norgeskartet.
- `index.html`: Fjerne alle Leaflet-referanser og gamle UI-kontroller.

## 7. Hva er risikoen?

- **Kalibreringsrisiko mot Instrumentet:** Fordi hele Norge-panelet låses rigid til de tre polarsirkelankrene, er den største risikoen knyttet til nøyaktigheten av denne låsingen. Eventuelle geografiske avvik som oppstår lenger sør eller nord på kartet, er en kalibreringsrisiko der kartbildet måles mot våre absolutte sannheter: GE-gridet og solens ringer.
- **Tekstur-styring:** Å bygge en stor, rigid pixelflate dynamisk fra adresseutklipp (tiles) uten standard kartbiblioteker krever en effektiv intern tile-manager i Three.js for å bevare oppløsning og ytelse uten minnelekkasjer.
- **Feil transformasjons-matematikk:** Hvis beregningen av skalering og rotasjon fra de 3 ankerpunktene har feil, vil hele Norge-panelet miste sin korrekte orientering mot GE-gridets nord og solens breddegrader.
