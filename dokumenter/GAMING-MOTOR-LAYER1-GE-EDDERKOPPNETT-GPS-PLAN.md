# GAMING-MOTOR LAYER 1 — GE-EDDERKOPPNETT / GE-GPS PLAN

Dato: 2026-06-14  
Repo: Jone-Aase/enok-72-grok  
Arbeidsoriginal: arbeidsoriginal/ge-nett-0e-2026-06-13  

---

## 0. Navngiving — Kartmotor vs. Gamingmotor

> **Dette avsnittet er lagt til 2026-06-14 for å låse begrepsbruken mellom Kartmotor og Gamingmotor.**
> Det er kritisk for at alle agenter (GPT, Grok, Perplexity, Copilot m.fl.) skal forstå hva som er hva.

Instrumentet har to separate motorer. De skal ikke blandes sammen:

| Motor | Teknologi | Status | Rolle |
|---|---|---|---|
| **Kartmotor** | Three.js + Kartverket-fliser (WebGL) | Beta — fullt operativ | Henter og viser eksisterende kartdata fra Kartverket/OSM |
| **Gamingmotor** | Three.js / WebGL — fri pikselflate (Rule 1) | Tidlig alfa — infrastruktur ferdig | Bygger sin egen pikselflate fra grunnen, uavhengig av eksterne kartleverandører |

**Kartmotoren** er ikke Kartverket.no sin motor — den er en Three.js-basert flisrenderer som *bruker Kartverket som datakilde*. Den opererer som en kartfaglig motor: koordinater, kalibrering, avstandsmåling, lagsystem.

**Gamingmotoren** bruker nøyaktig den samme underliggende teknologien som moderne spillmotorer (Three.js er WebGL-basert, samme paradigme som Unity/Unreal sin renderingspipeline): egne pikselfunksjoner, shader-kontroll, opacity, brightness/contrast/saturate, og egne overlay-systemer uavhengig av kartfliser.

Navnet «Gamingmotor» signaliserer tydelig at dette er en *friere, programmerbar renderingsflate* — ikke bundet til eksisterende kartleverandører.

**Viktig for alle agenter:**
- «Kartmotor» = det som tidligere ble kalt «Baseline motor» eller «Leaflet-motor»
- «Gamingmotor» = det som tidligere ble kalt «Clean motor» eller «Rule 1-flaten»
- Disse navnene skal brukes konsekvent fra nå av
- Den nåværende planen gjelder **Gamingmotoren** — ikke Kartmotoren

---

## 1. Formål

Gaming-motorens første fundament i Layer 1 er GE-edderkoppnettet.

GE-edderkoppnettet skal fungere som Instrumentets interne posisjons- og navigasjonsgrunnlag, tilsvarende et GPS-lag inne i modellen.

Første delmål er å få på plass read-only posisjonering:

```text
musens posisjon over GE-edderkoppnettet
→ X/Z-posisjon i Layer 1
→ eksisterende låst geGridLatLonFromPosition(x, z)
→ lat/lon
→ Google Earth-lignende posisjonsvisning
```

Dette er første test av Gaming-motorens posisjonsgrunnlag.

### Lagplassering

GE-edderkoppnettet + solbaner + plottede punkter ligger som underste del av Layer 1 — over Layer 2 (sol/måne/dynamiske objekter), men under kartene (øverste del av Layer 1). Gaming-motoren opererer på dette laget.

```text
[Øverste del av Layer 1]  ← Kartlag (kontinenter, kanter)
[Underste del av Layer 1] ← GE-edderkoppnett + solbaner + plottede punkter  ← (Gaming-motoren her)
[Layer 2]                  ← Sol / måne / bevegelige objekter (ikke nå)
```

---

## 2. Lagstruktur

### Layer 1

Layer 1 består av flere nivåer:

- GE-edderkoppnettet
- Solens 5 hovedbaner
- Innplottede punkter/objekter
- Kartlag som senere skal ligge over dette

GE-edderkoppnettet ligger underst i Layer 1, rett under kartene, og er posisjonsgrunnlaget.

Solens 5 hovedbaner ligger også på dette laget som objekter:
- nordlig polarsirkel
- Krepsens vendekrets
- ekvator
- Steinbukkens vendekrets
- sørlig polarsirkel

Disse banene er markert på jorden ved at solen står rett opp, 90° i zenit, på de aktuelle hovedbanene.

De innplottede punktene er også objekter på samme GE-/posisjonslag.

### Layer 2

Layer 2 er senere dynamikk-/gamingmotor for:
- sol
- måne
- bevegelige objekter
- senere interaksjon mellom himmelobjekter og Layer 1-posisjon

Layer 2 skal senere kunne lese posisjon mot Layer 1 GE-nettet.

Denne planen gjelder ikke Layer 2-bevegelse ennå. Den gjelder bare første underliggende posisjonsgrunnlag i Layer 1.

---

## 3. Avgrensning

Dette arbeidet gjelder første del av Gaming-motorens Layer 1-grunnlag:

- GE-edderkoppnettet som posisjons- og GPS-nett.

Dette er **ikke** kartmotor.  
Dette er **ikke** ny kartmotor.  
Dette er **ikke** ferdig SOL-SIRKLER-1A-inventar ennå.

Men Solens 5 hovedbaner er en del av samme Layer 1-posisjonsgrunnlag, og de blir neste fase etter at GE-nettet med posisjonering er på plass.

Solens 5 hovedbaner skal senere brukes som sikre ankerpunkter for å feste kontinenter, kanter og kartlag.

---

## 4. Utviklingsrekkefølge

### Fase 1 — nå

GE-edderkoppnettet ferdigstilles som posisjons-/GPS-grunnlag.

Første funksjon:
**GE-GPS-1A** — read-only hover-posisjon på GE-nettet

Når brukeren beveger musen over GE-edderkoppnettet, skal E-Earth vise posisjonen som lat/lon i Google Earth-lignende format.

### Fase 2 — neste

**SOL-SIRKLER-1A.**

Inventar og verifikasjon av Solens 5 hovedbaner som sikre ankerpunkter:
- nordlig polarsirkel
- Krepsens vendekrets
- ekvator
- Steinbukkens vendekrets
- sørlig polarsirkel

Formål: Bruke solbanene som låste referanser for videre festing av kontinenter, kanter og kartlag.

### Fase 3 — senere

Kontinenter, kanter og kartlag festes mot:
- GE-edderkoppnettet
- + Solens 5 hovedbaner
- + sikre innplottede punkter/objekter

Dette kommer etter at GE-posisjoneringen og solbane-ankrene er verifisert.

---

## 5. Eksisterende låst koordinatlogikk

Koordinatsystemet finnes allerede.

Fremoverprojeksjon:
```js
aeProject(lat, lon)
```

Bakoverprojeksjon:
```js
geGridLatLonFromPosition(x, z)
```

Dette skal brukes som låst grunnlag.

Eksisterende invers formel:
```text
lat = 90 - (radius / R_OUTER) * 180
lon = 180 - compassDeg
```

GE-GPS-arbeidet skal **ikke** endre denne logikken.

---

## 6. GE-GPS-1A — første konkrete delmål

GE-GPS-1A skal være read-only.

Når musen beveges over GE-edderkoppnettet:

```text
musens skjermposisjon
→ X/Z-posisjon på Layer 1-plane
→ geGridLatLonFromPosition(x, z)
→ lat/lon
→ visning i UI
```

Dette er ikke en full navigasjonsmotor ennå.  
Dette er første test av at Gaming-motoren kan lese posisjon fra GE-edderkoppnettet.

---

## 7. Forventet visning

Ved hover skal UI kunne vise decimalformat:

```text
lat: 66.550000
lon: 12.848411
```

og Google Earth-lignende DMS-format:

```text
GE: 66°33'00.00"N, 12°50'54.28"E
```

Senere kan diagnostikk vise:
- radiusUnits
- compassDeg
- x
- z
- insideDisk

---

## 8. Debug-objekt

GE-GPS-1A kan senere publisere et read-only debugobjekt:

```js
window.__GE_GPS_HOVER = {
  lat,
  lon,
  radiusUnits,
  compassDeg,
  x,
  z,
  insideDisk,
  source: 'Layer1 GE-edderkoppnett',
  purpose: 'E-Earth Gamingmotor GE-GPS readout'
}
```

Dette skal kun være diagnostikk.  
Det skal ikke flytte objekter, endre geometri eller påvirke kartmotor.

---

## 9. Ikke endre

I denne fasen skal følgende **ikke** endres:

- kartmotor
- eksisterende gamingmotor-infrastruktur utover read-only GE-GPS-1A
- kartlag
- Leaflet-erstatning
- sol/måne-bevegelse
- Layer 2-dynamikk
- geometri
- anker
- transform
- aeProject
- latToR
- geGridLatLonFromPosition
- geGridPositionFromLatLon
- GE_GRID-konstanter
- solbaner
- punkter/objekter
- MARKERS-data

---

## 10. Fremtidige delmål

**GE-GPS-1A**  
Read-only hover-posisjon på GE-edderkoppnettet.

**GE-GPS-1B**  
Read-only kamera-posisjon: kameraets siktepunkt på Layer 1-plane → lat/lon.  
*(Se seksjon 13 for arkitekturdetaljer.)*

**GE-GPS-1C**  
Kamera-høyde / zoom / scale: beregn høyde/avstand/visningsradius som intern LOD-verdi.

**GE-GPS-1D**  
Kartmotor-trigger: kamera-posisjon + høyde/LOD → hvilke kartbiter som skal lastes.

**GE-GPS-1E**  
Layer 2 kan lese GE-posisjon fra Layer 1.

**GE-GPS-1F**  
Sol/måne/dynamiske objekter kan bruke GE-posisjon som navigasjonsreferanse.

**SOL-SIRKLER-1A**  
Inventar og verifikasjon av Solens 5 hovedbaner som sikre ankerpunkter.

**KART-/KANT-FESTE**  
Kontinenter, kanter og kartlag festes mot GE-nettet og solbane-ankrene.

---

## 11. Aksept for planfasen

Denne planfasen er godkjent hvis:

- kun denne markdown-filen opprettes
- ingen kodefiler endres
- app.js ikke endres
- index.html ikke endres
- ingen motorlogikk endres
- ingen geometri endres
- ingen kartmotor endres
- ingen sol/måne-logikk endres
- ingen punkter/objekter flyttes

---

## 12. Neste steg etter godkjent plan

Når denne planen er godkjent, kan neste feature-branch opprettes for kode:

```text
feature/ge-gps-hover-readout-1a
```

Første kodeoppdrag skal kun implementere read-only hover-visning fra GE-edderkoppnettet.  
Ingen andre funksjoner skal legges til i samme kodeoppdrag.

---

## 13. Kamera-posisjon, høyde og senere kartmotor-trigger

> **Arkitekturpresisering lagt til 2026-06-14.**  
> Dette er ikke del av GE-GPS-1A. Det er dokumentasjon av den større hensikten bak GE-GPS-systemet.

### GE-GPS er ikke bare et koordinatdisplay

GE-edderkoppnettet og `geGridLatLonFromPosition(x, z)` er ikke bare ment for muse-hover.  
De er **felles posisjonslag for hele E-Earth** — for mus, kamera, objekter og kartmotor.

```text
GE-GPS gir posisjon til:
1. Mus / peker          ← GE-GPS-1A (nå)
2. Kamera (siktepunkt)  ← GE-GPS-1B (neste)
3. Kamera-høyde / LOD   ← GE-GPS-1C
4. Kartmotor tile-valg  ← GE-GPS-1D
5. Layer 2-objekter     ← GE-GPS-1E
6. Sol/måne/dynamikk    ← GE-GPS-1F
```

### Kameraet som navigatør

Kameraet i E-Earth skal senere kunne:
- lese **hvilket punkt på GE-edderkoppnettet det ser mot** (siktepunkt på Layer 1-plane)
- lese **hvilken lat/lon dette siktepunktet tilsvarer**
- lese **hvilken høyde/zoom/LOD det befinner seg på**

Dette er nøyaktig samme prinsipp som hover-readout — men med kameraets siktepunkt i stedet for musens posisjon.

### Kartmotor-trigger

Når kamera-posisjonen og høyden er kjent via GE-GPS, kan kartmotoren bruke dette som input:

```text
kamera GE-lat/lon + kamera-høyde/LOD
→ kartmotor vet hvilke kartbiter (tiles) som skal lastes
→ kartmotor vet riktig zoomnivå / detaljer
```

Dette gjør at kartmotoren aldri trenger egne koordinatberegninger — den leser alltid fra GE-GPS-laget.

### Hvorfor dette styrker Raycaster-metoden

Fordi både mus-hover (GE-GPS-1A) og kamera-posisjon (GE-GPS-1B) bruker **samme Three.js Raycaster mot samme Layer 1-plane (y=0)**, er de garantert konsistente.  
Kameraet og musen bruker det samme koordinatsystemet som GE-edderkoppnettet — ingen parallelle beregninger, ingen drift.

### Avgrensning for nå

- **GE-GPS-1A** (nå): kun read-only hover-posisjon — **ingen kartmotor-trigger**
- **GE-GPS-1B** (neste): kamera-siktepunkt → lat/lon
- **GE-GPS-1C** (senere): kamera-høyde → LOD
- **GE-GPS-1D** (senere): LOD + kamera-pos → kartmotor tile-valg

Kartmotor-trigger kodes **ikke** før både hover-posisjon og kamera-posisjon er verifisert.

---

*Dette er den rene planen: først GE-edderkoppnettet som GPS-/posisjonsgrunnlag, deretter Solens 5 hovedbaner som sikre ankerpunkter, deretter kontinent/kant/kart-festing.*  
*GE-GPS er grunnlaget for at E-Earth kan navigere, forstå kameraets plassering og senere hente riktige kartdata.*
