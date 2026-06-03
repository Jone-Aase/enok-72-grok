# Neste steg: full Norgeskart-flate uten synlig Leaflet

Maalet er ikke aa vise `norge.html` i et eget vindu. Maalet er aa bruke fullt
Norgeskart som kilde og legge det inn i samme Three.js-instrumentflate som EN
kartflate.

Regler:
- Ingen synlig Leaflet i sluttflaten.
- Ingen iframe i instrumentflaten.
- Ingen tile-reprojeksjon.
- Ingen Mercator `atan(sinh(...))` som breddegradskilde.
- Ingen per-tile-strekking.
- Kartet skal inn som EN kildeflate med similarity-transform.

Trygg rekkefolge:
1. Behold `norge.html` som kilde/kontroll utenfor instrumentflaten.
2. Lag en skjult/offscreen kilde-render av fullt Norgeskart med valgte lag.
3. Fang kilde-renderen som canvas/bitmap.
4. Bruk bitmapen som tekstur paa `NorgeSingleSurface`.
5. Behold similarity-transformen uendret.
6. Dokumenter hvilke lag som var paa da kildeflaten ble laget.

Viktig:
Skeleton-placeholderen i denne POC-en er bare motor-test. Den er ikke godkjent
som Norgeskart.
