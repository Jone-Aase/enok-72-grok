# PORT-GEOMETRI FRA ARK T — KORREKT VERSJON

Datakilde: `One-voice-740-Perplexity-V2.xlsx` ark `T`, lest 26. mai 2026.

## Vegg-rader (port-skiller)

| Rad-par | Etter port | Markert i kolonne H og CD |
|---------|-----------|--------------------------|
| 28-29 | før port 1 | "wall" |
| 61-62 | mellom port 1 og 2 | "wall" |
| 93-94 | mellom port 2 og 3 | "wall" |
| 126-127 | mellom port 3 og 4 (vårjevndøgn) | "wall" |
| 158-159 | mellom port 4 og 5 | "wall" |
| 190-191 | mellom port 5 og 6 | "wall" |
| 223-224 | etter port 6 (sommersolverv) | "wall" |

7 vegg-par totalt, som skiller portene. Mellom hvert vegg-par ligger port-segmentet.

## Port-soner langs grad-aksen

Kolonne I (øst, "180-360") går fra **180 ned til 1** gjennom 6 porter.
Kolonne CC (vest, "180-360") går fra **180 opp til 360** gjennom 6 porter.

| Port-nr | Øst grader (kol I) | Vest grader (kol CC) | Rad-intervall | Dager | Måned |
|---------|-------------------|---------------------|---------------|-------|-------|
| 1 | 180–151 | 180–209 | 31–60 | 30 | Tebet (10) |
| 2 | 150–121 | 210–239 | 63–92 | 30 | Shebat (11) |
| 3 | 120–91 | 240–269 | 95–124 | 30 | Adar (12, vårjevndøgn) |
| 4 | 90–62 (61) | 270–299 | 128–157 | 30 | Abib (1) |
| 5 | 60–32 (31) | 300–329 | 160–189 | 30 | Sivan (2) |
| 6 | 30–1 | 330–360 | 192–222 | 31 | Sivan (3, sommersolverv) |

NB: Dette er kun **annen halvår** (returvei fra vintersolverv til sommersolverv). 
Den andre halve speilretur (port 6 tilbake → 5 → 4 → 3 → 2 → 1) ligger sannsynligvis i en annen del av arket.

## Ankerpunkter på aksen

### Rad 31 — VINTERSOLVERV-AKSEN (180°)
- I31 = **180** (øst-aksen ved 180°)
- CC31 = **180** (vest-aksen ved 180°)
- AC31 = **1** (Sol Port Øst = 1)
- AR31 = **1** (Sol Port Vest = 1)
- Dato: Sat 19. Des 2025, "10 Tebet"
- Det er den første dagen ETTER vegg-paret (28-29) som markerer vintersolverv-portens nordlige grense

### Rad 128 — VÅRJEVNDØGN-AKSEN (90° øst / 270° vest)
- I128 = **90**, CC128 = **270**
- AC128 = 4, AR128 = 4 (Port 4 = den store porten, vårutgang)
- Dato: 21. Mars 2026, "1 ABIB"

### Rad 222 — SOMMERSOLVERV-AKSEN (1° øst / 360° vest = Krepsens Vendekrets)
- I222 = tom (kun "Krepsens Vendekrets 23.7° N" i H222)
- CC222 = **360**, CD222 = "Krepsens Vendekrets"
- AC222 = 6, AR222 = 6 (siste dag i port 6)
- Dato: Fredag 19. Juni 2026, "3 Sivan"
- Direction ved soloppgang: **57.67° ENE** — dette er kompass-vinkelen for solens oppgang den dagen
- 23.4° N i kolonne BQ

## KRITISK FORSTÅELSE: kompass-grader vs. port-grader

- Kolonne I (180–1 nedover) er IKKE kompass-grader rundt en sirkel
- Det er **grad-indikatoren på Layer 3 (ytre sirkel)**
- 180 = nord-aksen (vintersolverv)
- 90 = øst-aksen (vårjevndøgn)
- 1 = krepsens vendekrets / sommer-grensen
- Vest-siden CC speiler: 180 → 270 → 360

## Vegg vs. port — geometrisk tolkning

**Vegg = grense mellom to porter.** På Layer 3 kart-skiven (R = 31420.55 km), 
veggene er små buer (eller punkter) på den ytre sirkelen som markerer hvor 
én port slutter og neste begynner. Solen kan ikke passere gjennom veggen — 
den må gå gjennom selve port-åpningen (port-segmentet).

**Port = åpningen mellom to vegger.** Hver port er en bue på ytre sirkelen 
mellom to vegg-par.

## Sol-banens vinkel ved soloppgang (kompass-direction)

Fra arket: 19. juni 2026 (sommersolverv) — direction 57.67° ENE.

Det ER kompass-bæringen for soloppgangen. På Enok-modellen med N=sentrum, 
Ø=høyre, V=venstre, S=ytre kant:
- 0° = N (rett opp på skiven) = sentrum
- 90° = Ø (rett høyre)
- 180° = S (rett ned/ytre kant)
- 270° = V (rett venstre)

Direction 57.67° = mellom N og Ø, nær Ø-aksen. Det stemmer at solen ved 
sommersolverv står høyt på nordhalvkulen og kommer opp nær N-Ø-retningen.

## Konsekvens for portenes plassering i 3D-modellen

Brukerens premiss: alle 12 porter ligger på aksen 60° og aksen 300°.
- Aksen 60° = ØST (6 østre porter, der solen STÅR OPP)
- Aksen 300° = VEST (6 vestre porter, der solen SETTER)

På aksen mellom N (sentrum) og ytterkant, fordeles de 6 portene fra sentrum 
mot ytterkanten. Hvilken port er nærmest sentrum og hvilken er ytterst — det 
må brukeren bekrefte. Geometrien fra arket peker på:
- Port 1 = lengst SØR på Layer 3-sirkelen (180° på grad-aksen, Steinbukken/vintersolverv)
- Port 6 = nærmest NORD på Layer 3-sirkelen (1° på grad-aksen, Krepsens/sommersolverv)

Men brukeren har sagt portene ligger på 60° og 300° AKSENE — dette må avklares.
