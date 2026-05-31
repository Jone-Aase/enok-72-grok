# grok-versjoner/

Hver Grok-endring lagres som egen undermappe med komplett filsett. Lett å sammenligne, lett å rulle tilbake.

## Navnekonvensjon

`v<versjon>-<emne>/`

Eksempler:
- `v16.30-baseline/` (snapshot ved oppstart av pipelinen)
- `v17-endring-01-glod-puls/`
- `v17-endring-02-csv-eksport/`
- `v17-endring-03-soldeklinasjon/`
- `v17-final/` (samlet versjon når alle godkjente endringer er flettet)

## Hva som skal ligge i hver mappe

- Komplett filsett som kan deployes direkte
- `ENDRING.md` som beskriver hva som er endret, hvorfor, og hva som ble testet
- Eventuelle screenshots av før/etter
