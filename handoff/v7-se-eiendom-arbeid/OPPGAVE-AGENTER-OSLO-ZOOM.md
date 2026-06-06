# Oppgave til Agent 1 og Agent 2: Se Eiendom / Oslo zoom

Branch: `codex/v7-se-eiendom-arbeid-20260606`

Arbeidskopi: `clean-motor-lab-se-eiendom-ARBEID-20260606-070818`

Lokal test-URL hos Jone:
`http://127.0.0.1:8091/clean-motor-lab-se-eiendom-ARBEID-20260606-070818/index.html?bust=se-eiendom-arbeid-1`

## Status

Dette er arbeidskopien der Se Eiendom / Matrikkelen-kilden er hentet tilbake i Instrumentet.

Problemet som skal diagnostiseres:

Når Jone zoomer inn mot Oslo, forsvinner kartet rundt `136277%` zoom. Dermed kommer vi ikke ned til laget der Se Eiendom / Matrikkelen er nyttig.

## Arbeidsmodus

Første leveranse er kun diagnose og forslag til minste trygge patch.

Ikke skriv kode, ikke opprett branch, ikke push, og ikke endre filer uten eksplisitt godkjenning fra Jone og Codex Koordinator.

## Låste områder

Ikke foreslå endring i:

- ankerpunkter
- GE-grid
- solsirklene
- `aeProject`
- transform
- skala
- rotasjon
- tile-posisjon
- kartproporsjoner
- intern geometri i godkjente kartflater

Hvis en løsning krever noe av dette, stopp og spør.

## Funksjoner som skal leses først

Les disse områdene i `app.js` før dere konkluderer:

- `NORGE_SURFACE_DETAIL`
- `currentNorgeDetailZoom()`
- `visibleNorgeSourceBounds()`
- `fitTileRangeToBudget()`
- `expandNorgeTileRange()`
- `updateNorgeDetailTiles()`
- `updateNorgeCleanDetailTiles()`
- `queueNorgeCleanTile()`
- `processNorgeCleanTileQueue()`

## Spørsmål dere skal svare på

1. Hvorfor forsvinner kartet ved nærzoom mot Oslo?
2. Er årsaken tile-budsjett, overscan, zoom-valg, bounds, DOM-pane-størrelse, eller noe annet?
3. Hva er minste trygge patch for å la Oslo nå z16-z18 uten at kartet forsvinner?
4. Hvordan sørger vi for at Se Eiendom-overlay ikke stjeler budsjett fra bakgrunnskartet?
5. Hvilke statusverdier i Diagnostikk V1 bør Jone se på under testen?

## Viktig kilde-notat

Se Eiendom-kilden i denne arbeidskopien bruker Kartverkets Matrikkel-WMS:

`https://wms.geonorge.no/skwms1/wms.matrikkel`

Det finnes dokumentasjon i:

`dokumenter/SE-EIENDOM-MATRIKKELEN-WMS.md`

Ikke bytt layer-navn eller kilde før diagnose er godkjent. Første problem er at kartet forsvinner ved nærzoom.

## Ønsket første svar

Lever en kort diagnose:

- funn først
- sannsynlig årsak
- minste trygge patch
- risiko
- hvilke filer/funksjoner som må røres hvis patch godkjennes

Ingen kode i første svar.
