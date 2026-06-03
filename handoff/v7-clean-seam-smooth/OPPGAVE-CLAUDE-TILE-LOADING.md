# Oppgave til Claude/Perplexity: v7-clean tile-loading/cache

Arbeid kun i en separat kopi eller egen branch. Ikke ror hovedinstrumentet eller fungerende baseline.

Mal: Forbedre lasting av kartbiter for storre havomrader, uten a endre geometri.

Absolutte regler:

- Ikke endre ankerpunkter.
- Ikke endre Norge/Island-transformene.
- Ikke endre kartets mal, form eller rotasjon.
- Ikke reprojiser, boy, strekk eller warp kartet.
- Ikke bruk aeProject pa tile-hjorner eller vertices.
- Ikke fjern fungerende sjokartlag.
- WebMercator/WMTS/WMS er kun ekstern tile-adresse.

Undersok:

1. Lokal tile-cache med Cache API eller IndexedDB.
2. Prioritering: sentrum forst, deretter utover.
3. Avbryt gamle requests nar bruker panorerer/zoomer.
4. Hold lavere zoom synlig mens hoyere zoom lastes.
5. Prefetch langs Norge-Jan Mayen-Island.
6. Maks samtidige requests per kilde.
7. Offline tile-pakker for faste regioner.

Leveranse:

- Arkitekturplan.
- Minimal implementeringsrekkefolge.
- Hvilke filer og funksjoner som ma endres.
- Risiko for minnebruk, server-belastning og offline-lagring.
- Bekreft at ankre, transform og tile-posisjoner er urort.

Baseline:

Fungerende lokal versjon hos Jone er `seam-smooth-1`: Norge og Island sjokart samtidig, separate pixelflater, Grimsey-lock aktiv.
