# Grok-pakke: Hillshade-flatlands v16.77

Status: v16.76 deployet til GitHub Pages med ETOPO1 + 2D klimazone-LUT.
Jone-Aase observerte: "der ble bra, men det er ingen flat mark?"

## Problem-diagnose

v16.76 brukte z_factor=20 + HILLSHADE_STRENGTH=0.55 paa hele land-maska.
Resultat: flate sletter (Sahara, Russland-steppe, Sibir, Amazonas, Indo-
Gangetisk sletteland, Australia interior) fikk synlig "kornete" relieff
selv om de er flate i virkeligheten. Smaa hoyde-variasjoner ble forsterket
20x.

## v16.77 (lokal fiks - venter paa Grok-vurdering)

Endringer i build_combo_v1j_flatlands.py:

1. z_factor: 20 -> 4 (mer realistisk vertikal eksagerering)
2. Slope-mask: hillshade-styrke skaleres lineaert med lokal slope
   - Under 8 m/px: ingen hillshade (helt flate sletter, ren farge)
   - 8-60 m/px: lineaer overgang
   - Over 60 m/px: full hillshade-styrke (fjell)
3. Smooth slope-vurdering: uniform_filter 9x9 saa stoy ikke trigger
4. Strenght per piksel = MAX * slope_weight

Resultat: Sahara er n0 majestetisk flat oker. Atlas-fjellene staar klart
ut. Pyreneene/Alpene synlige men ikke overdrevet. Sibir-steppen rolig.

Se vedlagte: zoom-sahara-v76-v77.png

## Spoersmaal til Grok

1. **Er 8/60 m/px riktige terskler?** Vi har 8192x8192 AE-projeksjon, sa
   en piksel er ca 4.9 km bred ved ekvator. 60 m over 4.9 km = 1.2 %
   skraaning, som er moderat. 8 m over 4.9 km = 0.16 %, som er nesten
   flatt. Bor disse justeres?

2. **Z_factor=4 vs z_factor=2?** Lavere z_factor ville gi enda mer
   subtil relieff. For zoom-bruk i Three.js (brukerene zoomer inn),
   trenger vi z_factor som ser bra ut paa baade overview og zoom 5x.

3. **Multi-directional hillshade?** USGS bruker Mark et al. 1992
   weighted combination av 4 lyskilder (NE, NW, SE, SW) for mer
   nyansert skygge. Verdt komplekisteten her, eller er enkel NW 315/45
   tilstrekkelig?

4. **Alternativ: Eklund eller Beauchemin?** Andre kjente hillshade-
   algoritmer som gir bedre lavland-respekt? Spesielt for vise flate
   bekkener uten kunstig texturering.

5. **Coast-line transition**: Naa er det 1px mork (30,50,70). Pa zoom-
   nivaa kan det se for skarpt ut. Bor vi legge til en subtil 2-3 px
   gradient fra kontur til land-fargen?

## Vedlegg i grok-pakker/

- zoom-sahara-v76-v77.png (Middelhavet/Sahara/Europa, 1200x1200 hver side)
- v76-vs-v77-flatlands.png (full overview side ved side)
- v75-vs-v76-final.png (gammel referanse hvor vi kom fra)

## Format paa svar

Hvis du har konkrete kodeforslag (justerte terskler, ny algoritme),
commit som grok-pakker/grok-svar-hillshade.md med Python-snippet. Hvis
du synes v16.77 er bra som det er, si det ogsa.

## Live-status

- GitHub Pages: v16.76 nedlastet, v16.77 venter paa godkjenning
- Vercel: v16.73
- pplx.app: v16.73
