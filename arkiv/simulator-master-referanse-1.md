# SIMULATOR-MASTER-REFERANSE — Enok 72 Truth Instrument

**Formål**: Dette dokumentet er den fullstendige driftshåndboken for `enok-72-truth-instrument`. Den eksisterer slik at modellen, geometrien, port-systemet, ankerpunktene og deploy-prosedyren overlever:
- agent-minnetap (compaction, lange økter, ny sesjon)
- bytte av AI-agent (Perplexity, Grok, ChatGPT, Mistral)
- at brukeren selv vil drifte modellen uten agent-hjelp

**LES FØRST**-regel: Ved alt arbeid med Enoch 72 Truth Instrument skal denne filen leses før noen annen handling. Den er master-kilden. Hvis noe her er i konflikt med agent-hukommelsen, gjelder filen.

**Versjon**: 1.0 (24. mai 2026 — opprettet etter Onevoice 740-analysen og bue­streng-prinsippet ble etablert)

---

## 1. KJERNEKONSTANTER (eksakt — endres ikke uten godkjenning)

I `app.js` linje 10–14:

| Konstant            | Verdi             | Betydning                                                                                                |
| ------------------- | ----------------- | -------------------------------------------------------------------------------------------------------- |
| `R_EQUATOR_KM`      | **10 001,47 km**  | GE-radius. Avstand fra kulens senter til overflate, slik Google Earth oppgir det. Bevares som måltall.   |
| `R_OUTER_KM`        | **31 420,55 km**  | π × R_EQUATOR_KM = halve kule­omkretsen utrettet. Ny ytter­radius for AE-disken etter bue­strengs­uretting. |
| Full omkrets        | **197 421,10 km** | 2π × R_OUTER_KM. Forholdstall til WGS84 = 4,93×.                                                          |
| `SCALE`             | 1/1000            | 1 scene-enhet = 1000 km. Three.js-koordinater er km/1000.                                                |

**Verifiseringsregler**:
- Aldri endre disse uten å oppdatere alle linjer i denne fila + denne kommentarsblokken i `app.js`.
- R_EQUATOR_KM er en *referanseverdi* (det Google Earth sier). R_OUTER_KM er den *ekte* ytterradius i Enoks AE-modell.

---

## 2. PROJEKSJON — Azimuthal Equidistant (Enoks flate kart)

### 2a. Gjeldende formel (v15, **skal erstattes**)

```javascript
function latToR(lat) {
  return R_EQUATOR * (90 - lat) / 90;
}
```

Denne gir bare 0 → 2·R_EQUATOR = 20 003 km i ytter­kant. Sør-halvkulen er IKKE strukket inn i ringen ennå.

### 2b. Buestreng-uretting (skal implementeres etter godkjenning)

```javascript
function latToR(lat) {
  return R_OUTER * (90 - lat) / 180;
}
```

**Hva dette gjør**: AE-disken er i dag en spent bue. Når strengen løsnes, rettes hele 180° breddegrad (90°N → 90°S) ut til den fulle ytterradius 31 420,55 km. Hver breddegrad ganges med π/2 ≈ 1,5708.

### 2c. Strakt-ut posisjons-tabell (etter buestreng)

| Breddegrad             | r (km)     | r (scene-enheter) | Merknad                                  |
| ---------------------- | ---------- | ----------------- | ---------------------------------------- |
| 90°N (Nordpolen)       | 0          | 0                 | Sentrum                                  |
| 66,5634°N (Polarsirkel) | 4 089      | 4,09              | Magnetisk nord-randsone                  |
| 23,7°N (Krepsen)       | 11 608     | 11,61             | Excel H212 — Enoks målte vendekrets      |
| 0° (Ekvator)           | **15 710** | 15,71             | Flytter UT fra 10 001 km!                |
| -23,7°S (Steinbukken)  | 19 812     | 19,81             |                                          |
| -66,5634°S (Antarktissirkel) | 27 322   | 27,32       |                                          |
| -90°S (Antarktisrand)  | 31 420,55  | 31,42             | Ytterkant — R_OUTER                      |

**Buestreng-faktor**: alle posisjoner ganges med 1,5708 i forhold til den gamle formelen.

### 2d. Lon → vinkel-konvensjon

Fra `aeProject(lat, lon)` i app.js linje 22–29:
- lon = 0 (Greenwich) peker mot scene -Z (opp på skjerm i top-down view)
- +lon (østover) går med klokka når sett ovenfra
- x = r · sin(lon·π/180), z = -r · cos(lon·π/180)

---

## 3. ENOK 72 PORT-SYSTEM (master-tabell)

### 3a. Port-sekvens (12 segmenter, syklus)

```
4 → 5 → 6 → 6 → 5 → 4 → 3 → 2 → 1 → 1 → 2 → 3 → (tilbake til 4)
```

- Vårjevndøgn = port 4 starter (dag 1, lat 0°)
- Sommersolverv = port 6 vendepunkt (dag 91, lat +23,7°)
- Høstjevndøgn = port 4→3 (dag 182, lat 0°)
- Vintersolverv = port 1 vendepunkt (dag 273, lat -23,7°)
- Året slutter = port 3→4 (dag 364, lat 0°)

### 3b. Sirkel-365: Solen kommer ut én ekstra runde

Bruker presisering (verbatim):
> "Sirkelen er 360 grader solen har en ekstre dag (runde i port 1 6 3 og 4)."

Tolkning: Året er 364 dager kalendarisk, men solen vandrer den ekstra 365. dagen i vendepunkts-/jevndøgn-portene (1, 3, 4, 6). Dette er hvorfor de fire midt-månedene (Sivan, Elul, Kislev, Adar) har 31 dager i stedet for 30.

### 3c. 13 ankerpunkter (Enok 72:6-32 — bygd inn i app.js)

| Dag | Sol-lat       | Enok-vers   | Hendelse                            |
| --- | ------------- | ----------- | ----------------------------------- |
| 1   | 0°            | 72:8        | Vårjevndøgn, port 4 starter         |
| 31  | +7,9°         | 72:11       | Port 4→5                            |
| 61  | +15,8°        | 72:13       | Port 5→6                            |
| 91  | +23,7°        | 72:13-15    | Sommersolverv, port 6 vendepunkt    |
| 122 | +15,8°        | 72:17       | Port 6→5                            |
| 152 | +7,9°         | 72:19       | Port 5→4                            |
| 182 | 0°            | 72:20-21    | Høstjevndøgn, port 4→3              |
| 213 | -7,9°         | 72:23       | Port 3→2                            |
| 243 | -15,8°        | 72:25       | Port 2→1                            |
| 273 | -23,7°        | 72:25-27    | Vintersolverv, port 1 vendepunkt    |
| 304 | -15,8°        | 72:29       | Port 1→2                            |
| 334 | -7,9°         | 72:31       | Port 2→3                            |
| 365 | 0°            | 72:32       | Tilbake til vårjevndøgn             |

`PORT_LAT_STEP = PORT_LAT_MAX / 3 = 7,9°` per port.

### 3d. Dag/natt-deler per port-segment

Bygd inn i `DAG_NATT_DELER` (app.js linje 604–617):

| Dager     | Dag/natt | Port | Enok-vers |
| --------- | -------- | ---- | --------- |
| 1–30      | 10/8     | 4    | 72:9-10   |
| 31–60     | 11/7     | 5    | 72:11-12  |
| 61–91     | 12/6     | 6    | 72:13-14  |
| 92–121    | 11/7     | 6    | 72:15-16  |
| 122–151   | 10/8     | 5    | 72:17-18  |
| 152–182   | 9/9      | 4    | 72:19-20  |
| 183–212   | 8/10     | 3    | 72:21-22  |
| 213–242   | 7/11     | 2    | 72:23-24  |
| 243–273   | 6/12     | 1    | 72:25-26  |
| 274–303   | 7/11     | 1    | 72:27-28  |
| 304–333   | 8/10     | 2    | 72:29-30  |
| 334–364   | 9/9      | 3    | 72:31-32  |

---

## 4. KALENDER (Enok-året 5676 AM)

Live data: `enok-72-truth-instrument/calendar.json`, 364 dager komplett.

| Felt                | Eksempel              | Betydning                                       |
| ------------------- | --------------------- | ----------------------------------------------- |
| `enoch_year_day`    | 1..364                | Dag i Enok-året                                 |
| `date`              | "2026-03-21"          | Gregoriansk dato                                |
| `enoch_month`       | "Abib"                | Enok-måneds navn                                |
| `enoch_day_in_month`| 1..31                 | Dag i Enok-måneden                              |
| `sun_port_east`     | 4                     | Hvilken port solen står i (1–6)                 |

**Året starter**: lørdag 21. mars 2026 = 1 Abib (vårjevndøgn).
**Året slutter**: 19. mars 2027.

**12 måneder, 4 kvartaler à 91 dager (30+30+31)**.
**Vendepunkts-månedene (31 dager)**: Sivan, Elul, Kislev, Adar — disse fanger opp den 365. soldagen.

---

## 5. MÅNEN — RESERVERES FOR EGET INSTRUMENT

Bruker-vedtak (verbatim): "Ikke begynn med Månen enda den er veldig kompleks."

Agent-vurdering: månen passer ikke inn i sol-instrumentet. Den får eget instrument senere.

**Måne-avvik som er nedtegnet for fremtidig bruk**:
- 8 dager i Port 6 før vårjevndøgn (Krepsen)
- 8 dager i Port 1 før høstjevndøgn (Steinbukken)
- Adam i Eden: Soldag 47, fullmåne
- Noah i Arken: Soldag 47, fullmåne (17. Ziv)
- Noah ut: Soldag 14, fullmåne, sabbat (14. Abib)
- Sem fikk landet: Soldag 75, 15. Sivan (Shavuot)

---

## 6. LAG-STRUKTUR (Three.js)

3 hovedlag stablet i Y-aksen:

| Gruppe       | Y-koord | Innhold                                                      |
| ------------ | ------- | ------------------------------------------------------------ |
| `grpMap`     | 0       | Lag 1: kart, kystlinjer, port-markører, dag/natt, magnetisk nord, FN-emblem-tekstur |
| `grpCelest`  | 4       | Lag 2: sol, måne (skjult), ekvator-ring, vendekretser, polarsirkler |
| `grpFirma`   | 14      | Lag 3: firmament — Polaris-prikk, stjerne-sky                |

**Sub-grupper** for fin-toggling (app.js linje 165–179):
- `subMap`: grid, coast, ports, meridians, latcircles, outerring, daynight
- `subCel`: equator, cancer, capricorn, polarcircles, sun, moon
- `subFirma`: polaris, stars

---

## 7. KAMERA

`camState` (app.js linje 132–138):
- `tilt`: 90 = rett ned, 0 = side, -90 = under
- `rot`: horisontal rotasjon
- `height`: ekstra eye-offset
- `dist`: avstand fra senter (15–300)

**Presets** (data-cam-knapper):
- `top`: tilt 90, dist 60
- `oblique`: tilt 45, rot 30, dist 70
- `side`: tilt 5, height 5, dist 50
- `under`: tilt -60, height -30, dist 65

---

## 8. FN-AE-KART TEKSTUR

`un-map.png` (azimuthal equidistant emblemet, sentrert på Nordpolen, 60°S som ytre rand).
- `UN_MAP_RADIUS = R_EQUATOR * 150 / 90 = 16,667`
- Etter buestreng-uretting MÅ denne også justeres: `UN_MAP_RADIUS = R_OUTER * 150 / 180 = 26,184`
- Bildets "ned" = lon 0 (Afrika) → scene -Z; bildets "høyre" = lon 90°Ø → scene +X.

**IKKE-LØST**: ny FN-emblem-tekstur som er strukket etter buestreng-formelen. Eksisterende un-map.png er fortsatt en spent bue. Må enten:
1. Re-projisere tekstur i bildebehandling (akkurat når buestreng-formelen tas i bruk), eller
2. Akseptere en mismatch hvor kystlinjene på FN-emblemet ikke matcher de nye lat-ringene.

---

## 9. KRYSSTEKST-ANALYSE — BEVIS-GRUNNLAGET

Disse er etablert som direkte støtte for Enoks modell (fra `analyse-onevoice/RAPPORT.md`):

- **12 porter (3+3+3+3)**: Enok 76:1 = Åpenbaring 21:13
- **364-dagers året**: Enok 74:10 + Jubileene 6:18
- **Solens fastsatte løp**: Salme 19:4-6, Forkynneren 1:5, Esekiel 8:16
- **Fire hjørner / fire vinder**: Åp 7:1, Jer 49:36, Matt 24:31 — uforenelig med kule
- **30-dagers måned**: Daniel 6:7, 12:12
- **To luminærer**: 1. Mos 1:16 + Enok 73:1

---

## 10. DEPLOY-PROSEDYRE (eksakt)

### 10a. Forutsetninger
- Asset ID: `3847095c-9929-4ae9-ac84-87d1e60ac95a`
- Project path: `/home/user/workspace/enok-72-truth-instrument/`
- Entry point: `index.html`

### 10b. Agentens kommando

```python
pplx-tool deploy_website
{
  "project_path": "/home/user/workspace/enok-72-truth-instrument/",
  "site_name": "Enoch 72 — The Truth Instrument",
  "entry_point": "index.html",
  "should_validate": false
}
```

`api_credentials=["pplx-tool:deploy_website"]`

### 10c. Brukerens egen utviklings-loop (uten agent)

1. **Lokal redigering**: åpne `enok-72-truth-instrument/` i hvilken som helst editor (VSCode, Sublime, vanlig tekst­editor).
2. **Lokal preview**: `python3 -m http.server 8000` i prosjekt-mappa, åpne `http://localhost:8000` i nettleser.
3. **Endring kun i `app.js`**: alt JavaScript-logikk og geometri ligger i én fil. HTML/CSS er i `index.html`.
4. **Tre.js**: hentes som ES-modul fra CDN (se `<script type="importmap">` i `index.html`).
5. **Data-filer**:
   - `calendar.json` — 364 dager
   - `enok-himmel-vers.json` — Enok 72 hele teksten
   - `un-map.png` — FN-emblem-tekstur
6. **Re-deploy med agent**: når brukeren er fornøyd, ber han agenten kjøre deploy-kommandoen i 10b.

### 10d. GitHub-backup (anbefalt)

Bruker har GitHub-konto og kan opprette repo `enok-72-truth-instrument`. Slik:
```bash
cd /home/user/workspace/enok-72-truth-instrument
git init
git add .
git commit -m "v15 — buestreng-uretting baseline"
git remote add origin https://github.com/<brukernavn>/enok-72-truth-instrument.git
git push -u origin main
```

Da kan brukeren også Netlify-deploye (brukerens kjente plattform) som backup.

---

## 11. IKKE-LØST-LISTE (prioritert)

1. **Buestreng-formelen er IKKE implementert ennå**. Krever brukers godkjenning av denne master-fila først.
2. **FN-kart-teksturen må re-projiseres** når formelen byttes (se §8).
3. **Vendekretsene må re-vurderes etter buestreng-uretting** — fortsatt 23,7° eller skal de også strekkes med π/2-faktor? Bruker har sagt: "Vi retter ut kontinentene først og så tar vi vendekretsene etterpå."
4. **Bredde­grad-feilen i kule-kalibreringer** — bruker har påpekt at gamle observasjoner kun ga rett bredde­grad på jevn­døgn, ikke solverv. Dette bør reflekteres i bevis-arkivet.
5. **Måne-instrument** — egen modul, senere.

---

## 12. ENDRINGSLOGG

| Versjon | Dato       | Endring                                                                |
| ------- | ---------- | ---------------------------------------------------------------------- |
| v1      | 2026-03    | Skjelett — kart, AE-projeksjon, port-markører                          |
| v8–v12  | 2026-04    | Tre-lags arkitektur, kalender-integrasjon, kamera-presets             |
| v13     | 2026-05    | Dag/natt-sone på Lag 1, toggle-knapp                                   |
| v14     | 2026-05    | Sol-bane ring, port-system 13 ankerpunkter, Enok 72-modal              |
| v15     | 2026-05-23 | R_OUTER_KM = 31 420,55 satt inn, ytter­ringen synlig (men ikke strukket inn) |
| v16     | (kommer)   | Buestreng-uretting: latToR ganget med π/2. Hele kartet strekkes ut.   |

---

## 13. REGLER FOR ALT FREMTIDIG ARBEID

1. **LES DENNE FILEN FØRST** — alltid før noen endring i `app.js` eller `index.html`.
2. **Språk**: norsk i all kommunikasjon og kommentar. Engelsk UI-meny er OK.
3. **Kun Enoks modell** — ikke kule-sammenligning som premiss. Sammenligning som BEVIS er OK.
4. **Ingen emojis** i kode, UI eller dokumenter.
5. **"Oscar-nivå kvalitet"** — premien er sannheten.
6. **Ikke oppdater simulatoren før diskusjon** — særlig hvis endringen rører geometri, port-system eller kalender.
7. **Tilstand før compaction**: dersom agenten mister minnet, START her, ikke i selve `app.js`.
8. **Master-Excel-fil**: `Time-364-354-versjon-8.xlsx` er den autoritative kalender­kilden. H212 = "Krepsens Vendekrets 23.7° N".
9. **Onevoice 740**: `One-voice-740-renset-for-Perplexity-1.xlsx` med 7 ark er master-tekst­korpuset (B, S, S2, H, T, Jub, 12Pat).

---

## 14. RASK SJEKKLISTE FOR NY AGENT

Når en ny agent (eller du selv) skal jobbe med simulatoren:

- [ ] Har du lest denne filen helt?
- [ ] Vet du forskjellen på R_EQUATOR_KM og R_OUTER_KM?
- [ ] Forstår du buestreng-prinsippet (latToR med /180 i stedet for /90)?
- [ ] Kjenner du port-sekvensen 4→5→6→6→5→4→3→2→1→1→2→3?
- [ ] Vet du hvor calendar.json og enok-himmel-vers.json er?
- [ ] Vet du at månen skal IKKE være med i sol-instrumentet?
- [ ] Vet du at FN-kart-teksturen må re-projiseres når buestreng tas i bruk?
- [ ] Kan du deploy-kommandoen (§10b) utenat eller har du den foran deg?

Hvis ja på alle: du er klar til å fortsette der vi slapp.

---

**Slutt på master-fil. Versjon 1.0.**
