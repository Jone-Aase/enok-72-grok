# v7 clean seam-smooth handoff

Dette er handoff-punktet for den fungerende clean motor lab-versjonen som Jone testet lokalt.

Status i lokal prototype:

- Norge og Island sjokart kan vises samtidig.
- Hvert kartomrade ligger i egen stiv pixelflate.
- Island er last til Grimsey.
- Norge er last til de norske polarsirkelankrene.
- Seam smoothing er aktiv via kontrollert sub-piksel overlap.
- WebMercator/WMS/WMTS brukes kun som ekstern tile-adresse.
- Kartflatene skal ikke strekkes, boyes, reprojiseres eller deformeres.

Lokal test-URL hos Jone:

- http://127.0.0.1:8091/clean-motor-lab-view/index.html?bust=seam-smooth-1

Lokale filer hos Jone:

- `work/enok-72-norge-v7-clean-motor-lab/app.js`
- `work/enok-72-norge-v7-clean-motor-lab/index.html`
- `work/enok-72-norge-v7-clean-motor-lab/OPPGAVE-GEMINI-FARGEGLATTING.md`
- `work/enok-72-norge-v7-clean-motor-lab/OPPGAVE-CLAUDE-TILE-LOADING.md`

Merk:

Denne GitHub-branchen er forelopig en koordinasjons- og handoff-branch. Den fulle lokale lab-kopien ligger pa Jone sin maskin. ZIP ble vanskelig a bruke for de andre agentene, derfor er oppgavene og arbeidsreglene lagt her som lesbare GitHub-filer.

Neste trygge steg:

1. Gemini arbeider med fargeglatting i egen branch eller egen kopi.
2. Claude/Perplexity arbeider med tile-loading/cache i egen branch eller egen kopi.
3. Ingen endringer merges til main uten Jone sin eksplisitte godkjenning.
