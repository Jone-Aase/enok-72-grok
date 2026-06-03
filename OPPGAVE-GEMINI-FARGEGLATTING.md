# Oppgave til Gemini: v7-clean fargeglatting

Arbeid kun i denne kopien. Ikke ror hovedinstrumentet eller original lab-kopi.

Mal: Skjul synlige farge- og toneskiller mellom kartbiter uten a endre kartets sanne plassering.

Absolutte regler:
- Ikke flytt tiles.
- Ikke endre 256-gridet.
- Ikke endre ankerpunkter.
- Ikke endre Norge/Island-transformene.
- Ikke bruk aeProject pa tile-hjorner eller vertices.
- Ikke reprojiser, boy, strekk eller warp kartet.
- Ikke fjern sjokartlag som virker.
- WebMercator/WMTS/WMS er kun ekstern tile-adresse.

Undersok:
1. CSS edge feather / mask per tile.
2. Kontrollert overlapp + alpha-gradient pa tile-kanter.
3. Canvas pre-blend i lokal pixelflate.
4. Om DOM-img eller canvas er tryggest uten geometri-endring.

Leveranse:
- Kort vurdering av beste metode.
- Minimal patch eller patchforslag.
- Risiko: kan blending gjore tekst, dybder eller sjokabler uklare?
- Bekreft at ankre, transform og tile-posisjoner er urort.
