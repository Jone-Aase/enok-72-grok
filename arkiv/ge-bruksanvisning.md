# Bruksanvisning — Plotting i Google Earth Pro

## Filer du trenger

1. **enok72-tre-sirkler-v2.kml** — hovedfil med 24 punkter + linjer
2. **master-tre-sirkler.csv** — kildedata til referanse

## Slik gjør du

### Trinn 1 — Åpne KML i Google Earth Pro
- Dobbeltklikk `.kml`-filen, ELLER
- I GE Pro: **File → Open** → velg KML-filen

### Trinn 2 — Hva du ser
KML-en inneholder 6 lag i Places-panelet:

**Hjelpelinjer (tynne, 1 px):**
- Cancer i dag (gul, +23.4394°N)
- Ekvator (grønn, 0°)
- Capricorn i dag (rød, -23.4394°S)

**Best-fit-linjer (tykke, 3 px) — gjennom våre faktiske punkter:**
- Cancer best-fit: +23.4607° (2.4 km nord for dagens)
- Ekvator best-fit: -0.0582° (6.5 km sør for dagens)
- Capricorn best-fit: -23.3946° (5.0 km nord for dagens)

**Markørmapper:**
- Ekvator (5 markører, grønne)
- Cancer (12 markører, gule)
- Capricorn (7 markører, røde)

### Trinn 3 — Inspisere punkter
Klikk på en markør for å se:
- Type (arkeologisk_tempel, historisk_havn, etc.)
- Land og kontinent
- Eksakte koordinater
- Alder
- Norsk merknad
- Klikkbar kilde-URL

### Trinn 4 — Visualiser sirklene
For å se hvor sirklene faktisk går rundt jorden:
- Slå av alle markører midlertidig (uncheck mappene)
- Behold bare hjelpelinjene og best-fit-linjene
- Sammenlign farge-par: gul prikkete vs gul tykk = forskjell på Cancer

### Trinn 5 — Egen tegning av sirkler
Hvis du vil tegne en egen linje som passer bedre:
- **Add → Path**
- Klikk langs der du tror sirkelen går
- Sammenlign med våre best-fit-linjer

## Tips for sammenligning

**Aktiver kontur-mode:**
- View → Grid (slå på rutenett)
- Dette legger til lat/lon-rutenett over kartet

**Tilt-visning:**
- Bruk Shift+drag for å vippe kameraet
- I tilt-visning ser du bedre om punktene følger en kurve eller rett linje

**Lagring av dine endringer:**
- High-light Places-mappen
- File → Save → Save Place As...
- Velg KML-format
- Send tilbake til Perplexity hvis du har lagt til noe

## Viktig observasjon å gjøre

Når du har plottet, se etter:
- Følger Cancer-punktene **dagens** gule linje, eller **vår** tykke gule linje?
- Hvor stort er avviket per punkt?
- Er det noen punkter som åpenbart ligger feil (langt fra både linjer)?

Send tilbakemelding så vi kan oppdatere datasettet før Grok-beregningene.

## Etter GE-plotting

Når du har inspisert i GE og er fornøyd, sender vi master-CSV til Grok for de 6 tunge oppgavene.

Hvis du har funnet:
- Punkter som ligger feil → vi flagger og dobbeltsjekker
- Stedsnavn vi har gått glipp av → vi legger til
- Visuell forskjell på dagens linje vs best-fit → vi noterer som hypotese
