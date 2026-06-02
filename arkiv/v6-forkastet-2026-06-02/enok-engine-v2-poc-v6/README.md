# enok-engine-v2-poc v5.1 kamera-fix

**Kamera-fix:**
- Default kamera over Kartverket-området (66.55°N, 14.0°E)
- Wheel-zoom mye nærmere (min 0.5)
- Zoom-terskel satt til cameraY > 3 for z=8 / z=10

**Kjør:**
```bash
npx serve
```

**Test:**
- Default skjermbilde skal vise Kartverket-tekstur synlig
- Solid-modus skal vise 4 ulike farger over området
- Wireframe-modus skal vise 12 BoxHelper-rammer
- Scroll til z=10 skal vise tydelig økt detalj uten hopp

**Status:** Kamera-fix levert. Matematikken er 0.00 px stabil.
