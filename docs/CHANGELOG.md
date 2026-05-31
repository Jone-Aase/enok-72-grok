# CHANGELOG.md

## v16.30 — 26. mai 2026

- Buestreng-uretting implementert (`latToR(lat) = R_OUTER * (90 - lat) / 180`)
- UN_MAP_RADIUS justert til `R_OUTER * 150/180`
- Posisjoner langs buestrengen omberegnet (polar 4089, krepsen 11608, ekvator 15710, steinbukken 19812, antarktis 31421)
- Sol-bane lest fra `sol-bane-arkT.json` (ark T rad 26-227)
- 4 ekstrarunder integrert (dag 91, 182, 273, 364)
- 23,7° vendekrets-mestermal låst fra Ark T H212

## docs/ — 27. mai 2026 (kveld)

- Fire kjernerapporter pushet til `docs/`:
  - `omkrets-rapport-v3-1.pdf` (10 sider)
  - `vendekretser-vitnesbyrd-2.pdf` (6 sider)
  - `rangering-kriterier-zenith-1.pdf` (3 sider)
  - `meridian-gull-rapport-1.pdf` (8 sider)
- STATUS-NA.md oppdatert med tre søyler-strukturen og korrigert Cancer-tolkning
- DECISIONS.md utvidet med beslutninger om bevisgrunnlag og korreksjon

## docs/ — 28. mai 2026 (natt)

- Tre tekniske kjernebeskrivelser pushet til `docs/`:
  - `porter-layer-2-beskrivelse.md` (12 fysiske porter, 192 sol-baner, vegger)
  - `rutenett-feil-deklinasjon.md` (hvorfor ekvator-konvensjonen er feil)
  - `solklokken-18-timer.md` (Enok 18-timers urskive)
- STATUS-NA.md utvidet med seksjon "Tekniske kjernebeskrivelser i docs/"

## v17 — under planlegging

Grok-pipeline etablert 27. mai 2026. Kandidat-endringer kommer som zip-filer fra Grok, deployes til separat live-URL, mergres bare ved godkjenning.

Foreslåtte kandidater (ikke startet):

1. Bedre glød + puls på de 4 ekstrarundene (dag 91, 182, 273, 364)
2. Eksporter dagens solbane som CSV
3. Sammenligningsknapp mot ekte soldeklinasjon
4. Touch-støtte + bedre mobilvisning
5. Ytelsesforbedring på de 192 banene (InstancedMesh)
