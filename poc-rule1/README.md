# Enok Engine v2 POC - Rule 1 Similarity

Dette er neste POC etter forkastet v6 tile-reprojeksjon.

Maal:
- Norgeskartet behandles som EN flat kartflate.
- Plassering skjer med similarity-transform: uniform scale, rotation og translate.
- Ingen per-tile reprojeksjon.
- Ingen Mercator `atan(sinh(...))` som breddegradskilde.
- Ingen firepunkts-strekking.

Status:
- Bruker midlertidig rasterkopi fra hovedinstrumentet: `assets/norge-source-placeholder.png`.
- Rasteret er kun en skeleton-placeholder for aa teste motorform og transform-loype.
- POC-en viser bare en instrumentflate. Ingen iframe og ingen synlig Leaflet.
- Neste viktige steg er aa bytte inn riktig full kildekartflate uten aa endre transformprinsippet.

Kjoring:
```bash
npx serve
```

Kontroller:
- `Kartflate`: viser Norgeskart som en single surface.
- `Solid`: viser footprint uten tekstur.
- `Ramme`: viser kartflatens ramme.
- `Anker`: viser source/target-kontrollpunkter for similarity-transform.

Hovedinstrumentet er ikke endret.
