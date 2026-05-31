# SIMULATOR-MASTER-REFERANSE — Enok 72 Truth Instrument

**Formål**: Dette dokumentet er den fullstendige driftshåndboken for `enok-72-truth-instrument`. Den eksisterer slik at modellen, geometrien, port-systemet, ankerpunktene og deploy-prosedyren overlever:
- agent-minnetap (compaction, lange økter, ny sesjon)
- bytte av AI-agent (Perplexity, Grok, ChatGPT, Mistral)
- at brukeren selv vil drifte modellen uten agent-hjelp

**LES FØRST**-regel: Ved alt arbeid med Enoch 72 Truth Instrument skal denne filen leses før noen annen handling. Den er master-kilden. Hvis noe her er i konflikt med agent-hukommelsen, gjelder filen.

**Versjon**: 1.1 (25. mai 2026 — v16.24: Enok 18-timers urskive innført; tilbakeført min/sec-visere)

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
| v16     | 2026-05-24 | Buestreng-uretting: latToR med /180. Ekvator 15710, Steinbukken 19812, Antarktis 31421. |
| v16.1   | 2026-05-24 | Sinusoidal sol-bane: sunLatForDay = 23.7·sin(2π·(d-1)/364). 180 baner mellom vendekretsene per halvår. |
| v16.2   | 2026-05-24 | 6 port-segmenter (1-60:P4, 61-121:P6, 122-182:P5, 183-242:P3, 243-303:P1, 304-364:P3). 61 dager på hver vendekrets. |
| v16.3   | 2026-05-24 | Ark T-nedlastingslink i kalender-bar. Sol-rotasjons-toggle (sunRotationEnabled). dayAccumulator for Speed/Pause. |
| v16.4   | 2026-05-25 | Dag-rotasjon låst til 18°/s (én runde per 20 s), uavhengig av Speed-slider. Speed styrer nå kun kalender-fremdrift. |
| v16.5   | 2026-05-25 | ENOKS FYSIKK: dag-rotasjon = kalender-fase. sunLonAngle = (currentDayIdx + dayAccumulator) × 360. Én dag = én runde. 364 runder = 364 dager. Speed-slider styrer begge samtidig. |
| v16.6   | 2026-05-25 | UI-rensing: ↑ Sol-rot-knapp fjernet (Play/Pause stopper alt). Speed-slider 1–50 → 0.1–5.0 d/s, default 0.2 d/s (én runde per 5 sek). |
| v16.7   | 2026-05-25 | Finere speed: slider 1–500 → 0.01–5.0 d/s, default 0.10 d/s (én runde per 10 sek). Min = én runde per 100 sek. Kalender-bar høyere (38→56px), større skrift (11→14px), bredere info-felt (240→320px). |
| v16.8   | 2026-05-25 | Atomur-takt: ⏱ Sann tid-knapp setter én runde = 86 400 sek (SI-sekund × 86 400). Speed-slider logaritmisk 0–1000, fra 1/86400 d/s til 5 d/s. Lesning viser både d/s og s/min/t per runde. |
| v16.9   | 2026-05-25 | 12-timers urskive på Lag 1 (⌚ Klokke-knapp): romertall I-XII, 60 minutt-tikk, minutt-viser (gold), sekund-viser (rød). Tidssone-velger UTC-12 til +14. Kalender-vindu nå flyttbart (drag-handle), resizable (CSS resize:both), lukkbart (X). |

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

---

## 15. VERSJONSLOGG (oppsummert)

- **v15**: AE-projeksjon med `latToR(lat) = R_EQUATOR * (90-lat)/90`. Sør-halvkulen ikke strukket.
- **v16**: Buestreng-uretting `latToR(lat) = R_OUTER * (90-lat)/180`. Ekvator flytter til 15 710 km, Antarktis-randen til 31 421 km.
- **v16.1**: Sinusoidal sol-bane `sunLatForDay(d) = 23.7 * sin(2π(d-1)/364)`.
- **v16.2**: 6 port-segmenter med riktig dag/natt-fordeling.
- **v16.5**: Enoks fysikk-prinsipp implementert — `sunLonAngle = ((currentDayIdx + dayAccumulator) * 360) % 360`. Én dag = én rotasjon. Speed styrer alt samtidig.
- **v16.6**: Én Play/Pause-knapp (toggles tekst). Pause-knappen fjernet.
- **v16.7**: Logaritmisk speed-slider 0–1000 med default ≈ 0.10 d/s. Kalender-vindu større og draggable.
- **v16.8**: ⏱ Sann tid-knapp som låser speed = 1/86400 (atomur-takt). Log-slider.
- **v16.9**: 12-timers urskive på Lag 1 (solen som timeviser), tidssone-velger UTC−12 til +14, flyttbart og resizable kalender-vindu med ✎ Kalender for å åpne igjen.
- **v16.10**: TO klokker på Lag 1 (Sol gylden romertall + Atom blå arabertall). Erstattet av v16.11.
- **v16.11**: Sol-klokke STOR ut til ytterste diameter. Atom-klokke som digitalt popup-vindu (24-t).
- **v16.12**: Rolex-stil viserne v1 (kun minutt og sekund, Phong-materiale).
- **v16.13**: **Tre Rolex-visere med ekte gull-glans**. Lagt til timeviser (65% av minuttviser, klassisk Rolex-proporsjon). Materialene oppgradert til `MeshStandardMaterial` med metalness=1.0, roughness=0.28. Lagt til `RoomEnvironment` via `PMREMGenerator` slik at metallet får ekte refleksjon (uten environment fremstår metalliske materialer som flate). Sekundviseren tykkere (radius × 0.008 i stedet for 0.003) så den synes. Rød lakk-materiale for sekundviser. Stable Y-nivåer: time +0.04, minutt +0.10, sekund +0.16, hub-topp +0.25 — hindrer z-fighting. Tre DirectionalLights (varmt gult, kjølig blått, varmt amber).

---

- **v16.14**: **Dobbel urskive — Enoks portsystem som indre 18-ring**. Lagt til indre 18-delt ring (`enokRingR = radius × 0.74`) som representerer Enoks port-deler av dagen. Dag-halvdel 0–9 = gylden bue (#c9a247), natt-halvdel 9–18 = midnattblå bue (#0a1830). Jevndøgn-markører (trekanter) på del 0/18 og 9-aksen — bekrefter 9/9 ved vår- og høstjevndøgn. Tall 1–18 i Cormorant Garamond. **Timeviseren drives nå direkte av `sunLonAngle/360`** (én runde per Enok-dag) og peker korrekt på indre 18-skala (del 9 = solen høyest = middag). Minutt + sekund beholder ytre 12-ring (atom-takt innen dagen). Ny **rotasjons-teller** i kalender-vinduet: «ROTASJON N / 364 · År Y · X.X% · Port P · D/N deler» — viser nåværende sol-rotasjon, år, prosent gjennom året, aktiv port og dag/natt-deler iht. Enok 72. Telleren oppdateres uavhengig av om sol-klokken er synlig.

---

- **v16.15**: Mørk timeviser-materiale + (FEILSLAGEN) sol låst til timeviser-spissen — brytet solens årsbane. Rullet tilbake i v16.16. Ny `darkGoldMat()` for timeviseren (#6b4a14 mørk antikk-bronse, roughness 0.45) — står tydelig mot lyse gull-minutt og rød sekundviser. Når sol-klokken er synlig overstyres `sunMesh.position` slik at solen sitter EKSAKT på timeviser-spissen (`hourHandLength = radius × 0.64`), beregnet fra samme `rotation.y = π - dayFrac·2π` som `setHands` bruker. Når klokken er skjult faller solen tilbake til normal lat/lon-bane på disken.

---

- **v16.16**: **Solens årsbane gjenopprettet**. Fjernet overstyringen som låste `sunMesh.position` til timeviser-spissen — den så ut som en "sol nummer to" oppe ved klokken og brytet sol-banen (lat varierer fortsatt 0 → +23.7° → 0 → -23.7° → 0 over 364 dager). Nå ligger solen alltid på sin korrekte lat/lon-posisjon på disken (én sol, én bane). Klokken er bare lesehjelp: timeviser-vinkelen drives av samme `sunLonAngle/360` som solens longitude, så viseren peker fortsatt i RETNING av solen — men solen følger sin egen bane uavhengig av klokkens diameter. Mørk bronse-timeviser fra v16.15 beholdt.

---

- **v16.17**: **Falske soler fjernet — én sol, én bane**. Bruker rapporterte 4 "soler" på disken. Årsak: `buildLancetHand` la til hver viser TO selvlysende lume-prikker (gult #fff4d8 + glow #ffd070) plassert ved `length * 0.78` nær spissen, og `buildSecondHand` la til én stjerne-lume på sekundviseren ved `length * 0.55`. Time + minutt + sekund = 3 falske soler + 1 ekte = 4. Fjernet ALLE lume/dot-prikker fra begge funksjoner. Nå er det én sol på disken og viserne er rene metall-lansetter uten glødende prikker.

---

- **v16.18**: **Timeviser strekker seg dynamisk til solens posisjon**. Solen følger fortsatt sin egen årsbane (lat 0 → ±23.7° over 364 dager) på sin korrekte radius `r = latToR(sunLat)`. I hver frame settes `hourHand.scale.z = r / baseL` der `baseL = radius × 0.64` — timeviseren strekker seg ut eller krymper inn slik at spissen treffer EKSAKT der solen er, uten å forstyrre solens bane. Ved jevndøgn (r ~10) er viseren kortere; ved sør-vendepunkt (r ~12.6) er den lengre. Klokken blir slik et instrument som følger solen, ikke omvendt.

- **v16.19**: **90°-koordinatkonvensjon-feilen fikset — sol og timeviser nå sammenstilt**. Bruker rapporterte at sol og time­viser-spiss fortsatt lå ved siden av hverandre, ikke over hverandre. Diagnose via Playwright-skjermbilde: `updateSun()` og main-loop brukte `x = r·cos(a), z = r·sin(a)` (sunLonAngle=0 → +X / kl 3), mens `setHands` med `rotation.y = π − frac·2π` plasserte spissen mot −Z (kl 12). 90° mismatch — dette var rotårsaken hele tiden, ikke skala eller dupliserte soler. Fix: endret `updateSun()` (linje 1014-1015), main-loop sun-posisjon (linje 1863-1864) og `updateDayNight()` (linje 476-477) til `x = r·sin(a), z = −r·cos(a)`. Samme konvensjon som `aeProject(lat,lon)` (linje 25-32). Nå: **sunLonAngle = 0 = midnatt = kl 12 (−Z øverst)**, 90° = soloppgang (+X), 180° = middag/solen høyest (+Z), 270° = solnedgang (−X). Verifisert i Playwright: sol-prikken treffer time­viser-spissen eksakt.

---

- **v16.20**: **Kontinuerlig sol-årsbane når Play er aktiv**. Bruker rapporterte at solen lå fast på ekvator og bare roterte uten å endre lat. Årsak: `sunLat` ble kun oppdatert i `setDay()` som bare kalles ved hele dag-tikk — mellom tikk frøs lat-en på forrige verdi. Ved 0.10 d/s gikk det 10 sekunder mellom hver lat-endring, og brukeren oppfattet det som at solen aldri forlot ekvator (dag 1 har lat=0). Fix i main-loop (linje 1859-1871): interpolerer `sunLat = sunLatForDay(doyFloat)` der `doyFloat = doyNow + dayAccumulator * dDoy` — jevn glidende verdi mellom dager. Kjøres KUN når `isPlaying=true` slik at bruker-slideren og presets fortsatt virker når animasjonen er pauset. Verifisert i Playwright ved speed=5 d/s: 0s→0° (dag 1), 3s→6.1° (dag 16), 8s→15.1° (dag 41). Solen vandrer nå jevnt mellom 0 → +23.7° → 0 → –23.7° → 0 over 364 dager.

---

- **v16.21**: **Default-hastighet hevet — årsbanen synlig på minutter, ikke timer** (reversert i v16.22 etter brukertilbakemelding). Bruker rapporterte at solen "lå fast på ekvator" selv etter v16.20-fiksen. Diagnose: ved default-slider 700 var hastigheten 0.10 d/s = 10 sek per dag. Første merkbare lat-endring kom etter en hel dag (10 sek), og hele 182 dager fra ekvator til solverv tok 30 minutter. Solen flyttet seg, bare ekstremt sakte. Fix i `index.html` (linje 726) og `app.js` (linje 1637): default-slider hevet fra 700 til 940 → hastighet 2 d/s. Nå: hel dag = 0.5 sek, ekvator-til-solverv 91 dager = 45 sek, hele årsbanen 364 dager = ~3 min. Bruker kan fortsatt dra slider ned til atomur-takt (24t/runde) via "Sann tid"-knappen for langsom observasjon. Timeviseren følger solen passivt (peker på sun.position via `setHands(dayFrac)` + `scale.z = r/baseL`) — én logikk, ikke to.

---

- **v16.22**: **Sol-klokken går som en vanlig klokke; default-speed tilbake til atomur-takt** (delvis reversert i v16.23 — bare timeviseren beholdes). Bruker rapporterte at viserne ved 2 d/s spant som helikopter-rotor (sekundviser 2880 omdr/sek), og at man ikke kunne kontrollere hastigheten. To fix:
  1. **Default-speed reversert** (`index.html` linje 726, `app.js` linje 1637): slider-verdi fra 940 → 0. Default er nå atomur-takt 1/86400 d/s = 24 t/runde — helt rolig start. Bruker drar slideren opp for raskere animasjon.
  2. **Sol-klokken kobling fra rotasjons-hastighet** (`app.js` linje 877-908): tidligere ble minutt+sekundviser drevet av `dayFrac × 1440` og `dayFrac × 86400`, så ved høy Play-speed gikk de meningsløst fort. Nå leser de `Date.now()` direkte (lokal browser-tid med `getMinutes/getSeconds/getMilliseconds`), 60 min/runde + 60 sek/runde. Helt uavhengig av sol-animasjon. Bare TIMEVISEREN forblir koblet til solens reelle posisjon (`setHands(dayFrac)` der `dayFrac = sunLonAngle/360`). Den digitale Enok-tid-readouten beholder fortsatt rotasjons-takt.

  Verifisering: ved slider=0 stilles default 24t/runde; slider=500 → 2.2 min/runde; slider=800 → 2.7 s/runde. Minutt+sekundviser går jevnt som vanlig klokke (1 puls/sek).

---

- **v16.29 (gjeldende)**: **Solen hopper over wall-radene fra ark T (V6)**. Bruker leverte ny master-Excel V6 og ba om at solen "hopper over de banene som er merket wall i arket T". Ark T (V6) har 7 vegg-rad-par: [28,29], [61,62], [93,94], [126,127], [158,159], [190,191], [223,224] — hver markerer en fysisk vegg mellom port-segmentene på 60°- og 300°-aksene. Endringer:
  1. Ny `sol-bane-arkT.json` (37 KB) ekstrahert fra V6: 364 dager med lat, bane-nr, vendepunkts-flagg + wall_info-blokk med akser og rad-par.
  2. `sunLatForDay` (app.js linje 1535-1547) leser nå JSON-objektet `data.days`, ikke rå array.
  3. `isSunInsideWall(lat, lonDeg)` (linje 1573-1598): returnerer true når solens fotpunkt ligger innenfor ±3° azimut av 60°/300°-aksen OG dens radius ligger mellom et wall-rad-pars indre/ytre radius.
  4. Main-loop (linje 2510-2512): `sunMesh.visible = !inWall; sunGlow.visible = !inWall` — solen forsvinner synlig når den passerer en vegg.
  5. ±3° azimut-buffer fordi ved 2 d/s passerer solen 2° azimut på under én frame uten denne utvidelsen.
  6. Datakilde i workspace: `One-voice-740-Perplexity-V6.xlsx` (erstatter V5 som master).

---

- **v16.28**: **Default-speed løftet slik at årsbanen er synlig fra start**. Bruker rapporterte at "solen og timeviseren ligger låst på ekvator banen vår og høstjevndøgn". Diagnose via Playwright bekreftet at mekanikken er riktig (sol-lat 0.7° → 6.8° over 17 sek ved høy speed) — men default-slider value=0 = atomur-takt = 24 t per runde, så lat-endringen var nesten usynlig. Fix: `index.html` linje 730 og `app.js` linje 2207 endret slider-default fra 0 til 940 (~2 d/s). Resultat: ekvator → vendekrets på ~45 sek, hele årsbanen på ~3 min. ⏱ Sann tid-knapp virker fortsatt for atomur-takt ved langsom observasjon.

---

- **v16.23**: **Ækte solur — KUN én viser (timeviseren)**. Bruker presiserte at sol-klokken er et SOLUR der timeviseren peker hele tiden på solens posisjon og følger dens radius mellom de to vendekretsene. Et solur har KUN én viser — ikke minutt eller sekund. Fix:
  1. Ny hjelpefunksjon `hideExtraHands(group)` (`app.js` linje 877-885) skjuler `minHand` + `secHand` + `hub-top` på sol-klokke-gruppen.
  2. Kalles etter `buildClock(subMap.clockSol, ...)` på både linje 854 og 1989 (radius-slider rebuild).
  3. `updateClockSol()` (linje 887-906) forenklet: sender bare timeviser-frac til `setHands(group, dayFrac, 0, 0)`. Minutt/sekund-logikk fjernet helt.

  Timeviseren peker på solens reelle posisjon både i retning (`sunLonAngle` → vinkel) og lengde (`r = latToR(sunLat)` → `scale.z = r/baseL`). Bevegelsen mellom vendekretsene 0 → +23.7° → 0 → –23.7° over 364 dager driver viserens utstrekning. Bruker nøt at man kan "stille soluret etter data fra nettet om hvor solen står rett sør høyest på himmelen" — subsolar-point API — dette er noe vi kan legge til senere.

---

---

## 16. DE FIRE EKSTRARUNDENE — VERIFISERT MOT ENOKS BOK 72

**Status**: Verifisert mot Enoks bok 72 (Charles-oversettelsen, R.H. Charles 1917) og mot ark T i `One-voice-740-Perplexity-V6.xlsx`. Bekreftet av Jone-Aase 26. mai 2026.

### 16a. Hovedregel — solen lyser ALLTID

> Verbatim fra Jone-Aase: "Solen slutter ikke å lyse en eneste dag."

Dette overstyrer alt annet. `sunMesh.visible` skal aldri settes til `false`. Veggene i ark T (kolonne H, AT, AV merket "wall") angir IKKE at solen forsvinner — de er strukturelle markører i kalender-arket. Solen passerer dem usynlig på azimut-aksen, men selve sol-mesh er synlig hele tiden.

### 16b. Port-skifte skjer ved nord-passering

> Verbatim: "Solen går ut av porten i vest og kommer inn i en annen i port øst. Så portskiftet (Baneskiftet) skjer når den går rundt nord."

Dette er bekreftet i Enok 72:5: *"The sun returns through the north to reach the east."*

- Sol-baner på øst-aksen ligger ved azimut 60°
- Sol-baner på vest-aksen ligger ved azimut 300°
- Solen går ut av en port på 300°-aksen, runder NORD (krysser 0°/360° = Polaris-aksen sett ovenfra), og kommer inn i ny port på 60°-aksen
- Dette er observerbart for de som vet det og kan brukes til å vite sol-månedskiftet

### 16c. De 4 ekstrarundene (Enok 72 + ark T)

Enok 75:1-2 og 82:4-6 sier eksplisitt at det er **fire intercalary days**, én i hver av portene 1, 3, 4 og 6. Dette er solverv- og jevndøgn-portene. Ark T markerer disse med `AJ=31` eller `BF=31` (31-dagers-måned) sammen med `AO=91` (siste dag i kvartalet).

| # | Ark T rad | Sol-dag | Port | Bane (sun-lat) | Hendelse | Enok-vers | Ark T-celler |
|---|-----------|---------|------|----------------|----------|-----------|--------------|
| 1 | **30** | 273 | **Port 1** (ytterst, sør) | -23,7° (Steinbukken) | Vintersolverv | 72:25 | BM30=1, BB30=273, BF30=31 |
| 2 | **125 (H1-side)** | 364 | **Port 3** (ekvator) | 0° | Vårjevndøgn-slutt (Adar 31) | 72:31 | AC125=3, AR125=3, BN125=3, AJ125=31, AN125=364, AO125=91 |
| 3 | **125 (H2-side)** | 182 | **Port 4** (ekvator) | 0° | Vårjevndøgn-start | 72:19 | AX125=4, BF125=31, BB125=182 |
| 4 | **222** | 91 | **Port 6** (innerst, nord, zenit) | +23,7° (Krepsen) | Sommersolverv (Sivan 31) | 72:13 | AC222=6, AR222=6, AJ222=31, AN222=91, AO222=91 |

**Lederne** (Enok 82:13-14): Milki'el, Hel'emmelek, Mel'ejal, Narel — de leder de fire ekstradagene. Adnar'el, Ijasusa'el, 'Elome'el er navnene på dem som leder dem.

### 16d. Visuell oppførsel på ekstrarunde-dager

Bruker-vedtak 26. mai 2026:

1. **Lat konstant** — `sunLatForDay` returnerer identisk lat for ekstrarunde-dagen og dagen før (= 2 dager i samme bane)
2. **Lon fortsetter normalt** — `sunLonAngle` rotasjonen stopper IKKE, så solen tar en ekstra full runde rundt disken
3. **Bane lyser sterkere** — den aktuelle sol-banen får visuell markør (økt opacity / glow) på ekstrarunde-dagen så observatøren ser at port-skiftet er utsatt 1 dag
4. **Port-skifte ved nord-passering: glidende interpolering** — sol-lat interpoleres jevnt over nord-passeringen så banen ser kontinuerlig ut. Ikke skarpt hopp i én frame.

Resultat: **364 kalenderdager + 4 ekstrarunder = 368 reelle sol-runder per år.**

### 16e. Kilder

- **Enok 72:13** (port 6, sommersolverv, 31 morgener): *"And the sun returns to the east and goes into the sixth portal, and comes forth and descends into the sixth portal, thirty-one mornings on account of its sign."*
- **Enok 72:19** (port 4, vårjevndøgn-start, 31 morgener): *"And the sun comes forth from that fifth portal and descends into the fifth portal of the west and rises in the fourth portal, on account of its sign, thirty-one mornings."*
- **Enok 72:25** (port 1, vintersolverv, 31 morgener): *"returns to the east in the first portal thirty-one mornings."*
- **Enok 72:31** (port 3, vårjevndøgn-slutt, 31 morgener): *"rises in the third portal thirty-one mornings."*
- **Enok 72:33**: *"the year is exactly as to its days three hundred and sixty-four."*
- **Enok 75:1-2 og 82:4-6**: "There are four intercalary days... one in the first portal, one in the third portal, one in the fourth portal, and one in the sixth portal."
- **Kilde 1**: `enok-72-truth-instrument/enok-himmel-vers.json` — alle 37 vers ligger inne
- **Kilde 2**: `One-voice-740-Perplexity-V6.xlsx` ark T — radene 30, 125, 222
- **Kilde 3**: R.H. Charles, *The Book of Enoch* (1917), seksjon III, kapittel 72-82

### 16f. Knapper i instrumentet som relaterer seg

- **✎ Enok 72** (id `btn-enok72`, index.html linje 430) — åpner modal med alle 37 vers, fremhever dagens port-segment automatisk. Skal i v16.31+ også fremheve gull-ramme rundt verset for nåværende ekstrarunde (72:13, 72:19, 72:25 eller 72:31) når dag = 91, 182, 273 eller 364.
- **↓ Ark T** (id `cal-arkT`, index.html linje 720) — laster ned `Time-364-354-versjon-8.xlsx` (91 KB, 25. mai). Bør oppdateres til V6-uttrekk når v16.30 er stabilt.

### 16g. Wall-koden — status etter v16.30

- `isSunInsideWall(lat, lonDeg)` (app.js linje 1573-1598) — **beholdes som dødkode** (ikke kalt) i tilfelle veggene senere viser seg å bety noe annet
- `computeWallRadii(rowA, rowB)` (linje 1554-1571) — **beholdes som dødkode**
- `sol-bane-arkT.json` wall_info-blokk — **beholdes** i fila for fremtidig bruk
- **`sunMesh.visible = !inWall`** (linje 2511-2516 i v16.29) — **FJERNES** i v16.30. Solen er alltid synlig.

---

## 17. ENDRINGSLOGG (forts.)

- **v16.30**: **De fire ekstrarundene implementert + wall-invisibility fjernet**. Bruker korrigerte v16.29: solen lyser ALDRI ikke. Veggene i ark T er strukturelle markører, ikke usynlighets-soner. Det reelle Enoks-systemet har 4 ekstrarunder per år, én i hver av portene 1, 3, 4 og 6 — verifisert i Enok 72:13, 72:19, 72:25, 72:31 og bekreftet i ark T radene 30, 125, 222 (V6). På ekstrarunde-dagen (sol-dag 91, 182, 273, 364) står `sunLat` konstant fra dagen før mens `sunLonAngle` fortsetter normalt — solen tar en ekstra runde i samme bane. Bane lyser sterkere som visuell markør. Port-skifte ved nord-passering bruker glidende lat-interpolering (allerede slik koden er). Wall-invisibility-koden (linje 2511-2516 i v16.29) fjernet; `isSunInsideWall` og `computeWallRadii` beholdt som dødkode for fremtidig bruk. Resultat: 364 kalenderdager + 4 ekstrarunder = 368 reelle sol-runder per år.

---

**Slutt på master-fil. Versjon 1.2 — sist oppdatert v16.30, 26. mai 2026.**
