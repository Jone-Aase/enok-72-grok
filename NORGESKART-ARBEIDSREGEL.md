# Norgeskart arbeidsregel

Status: låst av Jone-Aase, 2026-05-31.

## Hovedregel

Norgeskartet skal ikke justeres, strekkes, roteres eller tilpasses for å passe et grid-system.

Kartverket-data skal behandles som kildekart med egen form, mål og koordinater. Når kartet senere føres inn i verdensinstrumentet og etter hvert erstatter UN AE-kartet, skal transformasjonen være sporbar fra offisielle koordinater og dokumentert med metadata.

## Praktiske konsekvenser

- Ingen manuell visuell align mot GE-grid, Enoch-grid, meridianer eller UN-kart.
- Ingen "øyejustering" av skala, rotasjon eller posisjon.
- Kartverket-laget skal ha en låst kilde-status: offisiell kartkilde først, instrumentlag oppå/ved siden av etterpå.
- Eventuell reprojisering må være deterministisk og dokumentert: kilde, datum, bbox, zoom/fliser, transform, output-skala og kontrollpunkter.
- Grid og markører kan brukes til måling og sammenligning, men de skal aldri endre selve kartformen.

## Første utviklingsfase

1. Behold `norge.html` som separat kontroll-/kildevisning, men ikke som overlay i hovedinstrumentet.
2. Norgeskartet i hovedinstrumentet skal ligge i Layer 1 som eget basiskartlag i Three.js.
3. UN AE-kart og Kartverket-kart skal være gjensidig eksklusive; de skal ikke vises samtidig.
4. Bygg et metadata-låst Kartverket-raster for verdensinstrumentet.
5. Først når kontrollpunkter er dokumentert, kan Norgeskart-laget begynne å erstatte UN AE-kartet.
