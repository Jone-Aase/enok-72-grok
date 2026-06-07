// =================================================================
// ENOCH 72 — THE TRUTH INSTRUMENT v2.0 (3D)
// v16.70 (2026-05-30): RENE FLATE FARGER. Hav: marin blaa RGB(0,0,196) over hele havet. Land: dyp groenn RGB(118,181,49) over alle kontinenter og oeyer. Antarktis: ren hvit (255,255,255). Kystlinje: moerk (40,40,60) width=4. Bygget fra Natural Earth ne_10m_land via build_k2_8192_v12.py. Backup: un-map-v16.69-backup.webp.
// v16.69 (2026-05-30): IS-GRENSE PAA KYSTLINJEN. Antarktis hvit-fyll er bygget som VIFTE-POLYGON fra kystkurven ut til R_FULL (ikke en fast sirkel). Hav-blaa (126,176,203 - GE-stil samplet fra hypso r=0.70R) fylles fra lat=-51S helt inn til kystlinjen. Resultat: hav moeter kystlinjen direkte, hvit is moeter kystlinjen direkte. Ingen mellom-gradient. Kystlinje (40,40,60) width=4. Bygget med build_k2_8192_v11.py. Backup: un-map-v16.68-backup.webp.
// v16.68 (2026-05-30): GE-FARGER + REN HVIT SYDPOL. Hav-blaa palett fra hypso-basis (GE-stil) ut til lat=-66S. Antarktis-kystlinje strukket langs lengdegrad, og fra kystlinjen ut til R_FULL fylles med REN HVIT (selve sydpolen/ismuren). Kystlinjen tegnes som tynn morkebla strek. Bygget med build_k2_8192_v9.py. Backup: un-map-v16.67-backup.webp.
// v16.67 (2026-05-30): HAVET STREKKER SEG NA SAMMENHENGENDE HELT UT TIL R_FULL.
// Hypsometri-basisbildets hvite fade-out-ring fra ca -60S er erstattet med ren hav-bla (125,180,212).
// Antarktis-polygonene tegnes som KUN morke kystlinjer (width=6, farge 25,50,90), ingen fyll.
// Resultat: ett sammenhengende hav fra Nordpolen ut til ytterkanten av AE-disken, med Antarktis-kystlinjen synlig som
// en tynn morkebla strek strukket rundt hele 360 graders periferi. Sub-antarktiske oyer (South Georgia, Kerguelen, Bouvet osv.)
// vises som sma morke flekker pa hav. Etter Jone-Aases onske: 'fyll den hvite sirkelen med rasten av havet og vis bare kystlinjen pa sydpolen.'
// Bygget med build_k2_8192_v6.py (etter v8e-iterasjon). Backup: un-map-v16.66-backup.webp.
// v16.66 (2026-05-30): ANTARKTIS-KYSTLINJE FAKTISK STREKKET LANGS LENGDEGRAD. Nytt un-map.webp (2.83 MB) bygget med build_k2_8192_v6.py: Natural Earth 10m land-shapefile (ne_10m_land) gir 203 Antarktis-relaterte polygon-ringer. Hver kyst-vertex (lat, lon) projiseres til AE: r = R_FULL * (90-lat)/180, slik at f.eks. Antarktis-halvoya (-63S) ligger pa r=3527px og sorpolen (-90S) pa r=4096px. Polygonene blir derfor strukket radialt ut langs sin lengdegrad rundt hele AE-disken. Mellom kystlinjen og R_FULL fylles med ren hvit is (Enok-modellens ismur). Innover (mot Nordpolen) fra ca -56S tar hypsometri-bildet over som for. Ant-fyll: lys is-bla (215,232,245), kyststrek: blagra (90,125,165). Backup: un-map-v16.65-backup.webp.
// v16.65 (2026-05-30): 8192 HYPSOMETRISK KART (Natural Earth HYP_HR_SR_OB_DR.tif) + 20 ANTARKTIS-BASER. Nytt un-map.webp (2.97 MB) bygget med build_k2_8192_v5.py: 10800x5400 hypsometri-projeksjon i AE 90N, hypsometri fra 90N ned til -60S, deretter ren hvit isring (Enok-modellens ismur) ut til R_OUTER med gradient #d8e8f0 -> #ffffff. Lagt inn 20 Antarktis-baser ANT-01..ANT-20 (Amundsen-Scott, McMurdo, Vostok, Esperanza, Mawson, Davis, Halley VI, Rothera, Casey, Concordia, Syowa, Troll, Maitri, King Sejong, Bellingshausen, Palmer, Zhongshan, Kunlun, Princess Elisabeth, Neumayer III) med offisielle koordinater, farge cyan #00d4ff, togglebar via layer-antarctica-bases. UN_MAP_RADIUS uendret = R_OUTER (kartet fyller hele AE-disken). Backup: un-map-4096-backup.png. Total markors: 165 (var 145).
// v16.64 (2026-05-30): KART OPPGRADERT til 4096x4096 (fra 2048x2048). Samme K2 Naturlig fra cartopy + Natural Earth 10m, men 4x pikselantall = mye skarpere kystlinjer, elver, grenser ved zoom. Tilfoyd urban-omrader (storre byer som morkere bruntoner). Filstorrelse 2.8 MB (var 1.1 MB). un-map-2048-backup.png lagret som backup.
// v16.63 (2026-05-30): KART-SKALA FIKSET. Det nye K2 Naturlig-kartet dekker hele AE-projeksjonen (0° til -90°S), ikke bare til -60°S som det gamle FN-emblemet. UN_MAP_RADIUS endret fra R_OUTER × 150/180 (= 26.184) til R_OUTER (= 31.42), slik at kartet fyller hele disken ut til Antarktis-yttergrensen (197 421 km / 31 420 km AE-radius). Kontinenter ligger nå på korrekt avstand fra Nordpolen iht. AE-projeksjon.
// v16.62 (2026-05-29): 25 AKSE-VERIFIKASJONSPINS lagt inn fra Groks oppdaterte rapport (5 pins x 5 akser). Nye grupper: Akse-60W (gul), Akse-45W (lysegrønn), Akse-30W (oransje), Akse-15W (rosa), Akse-0 (hvit). Styres av layer-antipodal-axes master-toggle. AE-x/AE-z korrigert for 5 navngitte steder (Goose Bay, Nain, Rigolet, St. John's, Greenwich) — Grok brukte feilaktig akse-lat istedenfor stedets faktiske lat; 20 teoretiske pins var korrekte. Verifikasjons-rapport: dokumenter/perplexity-grok-verifikasjon-2026-05-29.md. Total markors: 145 (var 120).
// v16.61 (2026-05-29): FEM NYE ANTIPODAL-AKSER bygget inn (matematisk garanterte rette linjer gjennom Nordpolen i AE-projeksjonen): 60°W↔120°E (gul #ffdd44), 45°W↔135°E (lysegrønn #88ff88), 30°W↔150°E (oransje #ff8844), 15°W↔165°E (rosa #ff4488), 0°↔180° (hvit #ffffff). Ny subMap.antipodalAxes-gruppe + ny master-toggle layer-antipodal-axes (default på). Visuell verifikasjon at hele rutenettet holder — venter på Groks verifikasjons-pins fra dokumenter/grok-antipodal-akser-2026-05-29.md.
// v16.60 (2026-05-28): Antipodal akselinje 70°W ↔ 110°E som RETT LINJE gjennom Nordpolen (senter på AE-disken). Lyserosa #ff88ff, opacity 0.85. subMap.axis70w110e-gruppe styres av filt-mer-70w ELLER filt-mer-110e (vises når minst en er på). Visuell verifikasjon: alle MR70W-pins ligger på venstre/ned-side av aksen, alle Meridian-110E-pins (EK-03/04/05/22/23) ligger på motsatt side gjennom senter. Antipodal-test bestått = AE-projeksjon korrekt.
// v16.59 (2026-05-28): NY GRUPPE Meridian-70W (lyserosa #ff88ff) med 12 punkter langs 70°W-meridianen — MR70W-01 Póvalo Salcedo (Puno) -15.86°, MR70W-02 Orquidea Lodge -12.65°, MR70W-03 Punta Cardon +11.57°, MR70W-04 Barcadera Port Aruba +12.48°, MR70W-05 Santo Domingo +18.50°, MR70W-06 Cabot Ln Chatham MA +41.67°, MR70W-07 Topsham ME +43.93°, MR70W-08 Iqaluit +63.75°, MR70W-09 Clyde River Airport +70.49°, MR70W-10 Moriusaq Grønland +76.75°, MR70W-11 Herbert Ø 1967 +77.42°, MR70W-12 Rawlings Bay Ellesmere +80.31°. Pluss CAN-23 Hartswell Bahamas (23°27'N-presisjon), MEG-14 Auckland Island (NZ subantarktisk), EK-22 Lebo Java + EK-23 Yogyakarta Airport (110.03E). 6 duplikater hoppet over (Khatulistiwa Park=EKV-05, Beihai=EK-03, Hutou=EK-04, Xincun=EK-05, Itilleq=EK-20, Nedlung=EK-21). Total markørs: 120 (var 104).
// v16.58 (2026-05-28): To nye markører fra Jone-Aase. EKV-07 Jardim Marco Zero (Macapá, Amapá Brasil, 0°00'02.66"N 51°04'41.27"W = +0.000739° -51.078131°) på_sirkel 82m nord for ekvator. CAP-10 Campo de Marte Airport (São Paulo SP Brasil, 23°30'26.23"S 46°38'02.14"W = -23.507286° -46.633928°) 8.2 km sør for Capricorn. Equator-teller 15→16, Capricorn-teller 10→11. Total markørs: 104 (var 102).
// v16.57 (2026-05-28): VKM-17 Giant Crab Tropic of Capricorn (Mantos Blancos, Sierra Gorda, Antofagasta Chile, 23°29'13.72"S 70°00'00.01"W = -23.487144° -70.000003°) lagt inn etter Jone-Aase. Vendekrets-monumenter teller nå 17 (var 16). Total markørs: 102 (var 101). Huacalera-sundial (-23.447769° -65.351686°) ikke lagt inn — ligger 1 km fra eksisterende VKM-03 Monolito sin sombra Huacalera, samme monument.
// v16.56 (2026-05-28): aeProject() oppdatert til å matche GE-tallringens formel eksakt — lon=0° (Greenwich) ligger nå NEDE på skjermen (+Z), 90°E høyre (+X), 180° oppe (-Z), 90°W venstre (-X). Alle 101 markørene flyttes automatisk til riktig posisjon på kontinent-kartet. Eksempel: Kayabwe (32°E) treffer nå Afrika ekvator i bunn-høyre, Catequilla (78W) treffer Ecuador i bunn-venstre.
// v16.55 (2026-05-28): ALLE 72 GE-tall på SAMME ring (R_OUTER × 1.040) — også kardinalene 0°, 90E, 180°, 90W. Rektangulær canvas (3:1) + PlaneGeometry(3,1) slik at lange labels ("180°", "170W", "90E") får plass uten klipping. Kardinaler bold + lys cyan, 10°-tall medium, 5°-mellomtall mindre/mørkere.
// v16.54 (2026-05-28): 5°- og 10°-tall (med E/W-suffiks) samlet på SAMME ring (R_OUTER × 1.040). Bare kardinalene (0°, 90E, 180°, 90W) ligger fortsatt på ytre ring (R_OUTER × 1.065). Resultat: én hovedring med alle tall + kardinaler utenfor som referansepunkter.
// v16.53 (2026-05-28): GE-tallring FLYTTET UT av kompasset til egen subMap.geRing-gruppe — nå styres den KUN av layer-grid-toggelen, helt uavhengig av kompass og klokke. Kompassets gull-bakgrunnsringer (compassInnerR/compassOuterR) LAGT TILBAKE. Kompasset flyttet nærmere Antarctica igjen (ticks 1.085–1.155, tall 1.168–1.265) for å redusere overflødig luft — GE-tallene har nå sin egen plass mellom Antarctica (R_OUTER) og kompassets innerring (R_OUTER × 1.080). Nye GE-radier: 1.030–1.065 (innenfor kompassets gull-innerring).
// v16.52 (2026-05-28): TRE UAVHENGIGE TOGGLES + omorganisert layout. (1) Kompass beholder sine 360 0–359° tall (lagt tilbake fra v16.51), men flyttet UTOVER så det er luft mellom Antarctica-ring og kompass. (2) GE-tallring flyttet til MELLOM Antarctica-ring og kompass (R_OUTER × 1.04 → 1.075), tilhører kun GE grid-toggelen. (3) Antarctica-ring beholder sin egen toggle 'layer-outerring' uavhengig. Klokkens gull-ringer (compassInnerR/compassOuterR) FJERNET så de ikke skjuler GE-tallene. Ny lagrekkefølge innenfra og ut: kart → Antarctica-ring (R_OUTER) → GE-tall (R_OUTER × 1.04–1.075) → kompass-ticks (1.105–1.175) → kompass-tall 0–359° (1.188–1.285).
// v16.51 (2026-05-28): Konsolidert tallskala — ETT sett GE-tall plassert UTENFOR ytre ring (R_OUTER × 1.03). Fjernet alle gamle 360 grad-tall inni kompasset (kardinaler N/E/S/W, hver 1°, hver 5°, hver 10°) OG fjernet 5°-finringens 72 teal-tall inni klokken. Ticks (gull-streker for 1°/5°/10°/90° + teal 5°-ticks) beholdes som visuell skala uten tall. Formel uendret: kompass_vinkel = (180 - GE_lon) mod 360. Nå er det bare ETT tallsett som viser kompassets 360° — det ligger rett utenfor ytre ring (Antarctica 197 421 km / 31 420 km AE-radius).
// v16.50 (2026-05-28): GE-lengdegrad-tallring lagt inn inni kompasset (hver 5°, 72 tall). Greenwich (0° GE) plassert på vårt kompass-180° (bunn der Afrika ligger). Formel: kompass_vinkel = (180 - GE_lon) mod 360. 10°E -> kompass 170°, 10°W -> kompass 190°, 90°E -> kompass 90°. Slått sammen toggles: 'GE grid (lat/long reference)' styrer nå standardrutenett + 5°-edderkoppnett + 5°-finring i kompasset + GE-tallring. 'Fine 5° grid (72)'-checkbox fjernet (redundant).
// v16.49 (2026-05-28): Klokke og kompass kan toggles uavhengig (nye knapper btn-clock-sol og btn-compass). Finmasket 5°-edderkoppnett (subMap.gridFine, 72 meridianer + 5° lat-sirkler) som egen toggle 'layer-grid-fine' - aktiverer samtidig en ekstra 5°-tallring (72 tall) inni kompasset for finlesning. FN-kart-rotasjon-slider 'map-rotation' (-180° til +180°) lagt inn for å finjustere Greenwich-orientering ift våre AE-koordinater. Kayabwe Equator Monument bekreftet som AFR-030 (0°N, 32.04°E).
// v16.48 (2026-05-28): Reversert v16.47 - Greenwich-linje, datolinje og 12 lengdegrad-labels fjernet igjen etter Jone-Aase. Sol-uret/klokken viser allerede gradene og kompasset bedre visuelt; to lag oppa hverandre var redundant.
// v16.47 (2026-05-28): [REVERSERT i v16.48] Greenwich-meridian (0°, grønn) og datolinje (180°, kobolt-bla) markert som tydelige linjer. 12 lengdegrad-labels rundt yttersirkelen.
// v16.46 (2026-05-28): Pin-storrelse 0.08 -> 0.13 (bedre synlighet pa utzoomet AE-disk, Afrika-punktene var for sma til a se). Calendar-knapp top:56px -> top:90px (toolbar bunn er 78px pga embedding, ikke 46px). Filter-label-tellere oppdatert: Equator (15), Cancer (22), Capricorn (10), Vendekrets-monumenter (16). Total markors: 101.
// v16.45 (2026-05-28): VKM-15 Trópico de Cáncer Plaza del Pueblo (Cabo San Lucas, 23.447875°N -109.703106°W) og VKM-16 Trópico de Cáncer C. Centenario 8 (El Centro BCS, 23.450006°N -110.225467°W) lagt inn etter Jone-Aase. Begge på_sirkel (1.6/1.9 km fra nominell 23.4333°).
// v16.44 (2026-05-28): Lagt inn 23 Afrika-markorer (9 Ekvator, 9 Cancer, 5 Capricorn) fra afrika-markorer-perplexity.csv. Inkluderer på_sirkel (Kayabwe Uganda, Namibia/Botswana/Limpopo/Mosambik/Madagaskar), nær_sirkel (Uganda triangulering, Aswan) og langt_fra (Sudan/Egypt triangulering). Pretoria CAP-09 og Aswan CAN-04/VKM-11 bevares.
// v16.43 (2026-05-28): Calendar-knapp flyttet fra bunn-hoyre til ovre hoyre (top:56px right:14px) - dekket zoom-indikator og statusbar. Na under toolbar, symmetrisk med View-menyen.
// v16.42 (2026-05-28): Calendar-vindu skjult som default (apnes via Calendar-knappen, lukkes som klokke/day-night). Calendar-knapp festet fast i hjornet (ikke draggable lenger).
// v16.41 (2026-05-28): Synlig kamera-panel (cam-panel nederst hoyre) fjernet etter Jone-Aase - kamera-kontroll finnes i View-menyen ved siden av Day/night. Calendar-knapp flyttet til bunn-hoyre der cam-panel sto.
// v16.40 (2026-05-28): UI-rydding etter Jone-Aase: Enoch 72 og Evidence Archive flyttet fra toolbar inn i Documents-modalen som 'Quick access'-seksjon. Calendar-knapp flyttet til bunn-hoyre ved siden av kamera-panelet.
// v16.39 (2026-05-28): Hit-sphere redusert fra 0.4 til 0.18 (mindre 'klissete' click-omrade). compareRing (sammenligningsring under lat-slider) starter na skjult og kobles til ekvator-toggle nar den ligger pa ekvator-posisjon - faar synlighet styrt av slider-bevegelse. Lat-slider sjekkboks lagt til.
// v16.38 (2026-05-28): Ekvator-ring flyttet fra R_EQUATOR (10001 km, kule-radius) til latToR(0) (15710 km, buestreng-radius) sa ringen ligger pa samme posisjon som ekvator-punktene (Pyramid of Oyambaro, Pontianak Tugu Khatulistiwa, Quitsato). Click-treff-flate utvidet: usynlig hit-sphere radius 0.4 lagt rundt hver markor.
// v16.37 (2026-05-28): Ekvator-ring byttet fra gronn (0x60c060) til gull (0xc9a247) etter Jone-Aase. Matcher Quitsato/Pontianak/Catequilla monumentene og vendekretsene.
// v16.36 (2026-05-28): Rydding-3 etter Jone-Aase: lilla nordpol-glow fjernet (grpMagnet tom, layer-magnet toggle fjernet), port-progress-indikator (4,6,5,3,1,3) fjernet fra canvas.
// v16.35 (2026-05-28): Rydding-2 etter Jone-Aase: zt3 (Capricorn-antipode->Grimsey, oransje) fjernet, gul polarsirkel-til-polarsirkel-strek skjult som default, dupliserte ringer fjernet (en ring per breddegrad), latcircles-toggle fjernet.
// v16.34 (2026-05-28): Rydding etter Jone-Aase: equator/cancer/capricorn/polarcircles flyttet fra Layer 2 til Layer 1, polaris-akse fjernet, zt1 (Aswan->Fort Yukon gul) og zt2 (Catequilla->Antipode bla) fjernet, Enoch 12 gates fikk egen toggle pa Layer 2.
// v16.33 (2026-05-28): Lagt til 21 EK_Data-punkter (EK-01..21) fra One Voice V6 ark EK_Data kolonne AE-AL. Nye grupper: Havn-Sor, Meridian-110E/150E/149W.
// v16.32 (2026-05-28): Plottet 14 vendekrets-monumenter (VKM-01..14) + empirisk ring 23.4409° / 23.5614° ved siden av Ark T 23.70°. Lokasjoner IKKE flyttet.
// v16.31 (2026-05-28): Lagt til firkantet Cartesian referanse-rutenett (GE-skala 110.593 km/°)
// 4 lag stacket i Y-akse, fri kamera, ny radius = halve omkretsen
// =================================================================
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// =================================================================
// KONSTANTER — verifiserte tall
// =================================================================
const R_EQUATOR_KM = 10001.47;            // GE-radius (måltall)
const R_OUTER_KM   = 31420.55;            // Ny ytterring = halve omkretsen (= ny R)
const SCALE = 1 / 1000;                   // 1 enhet = 1000 km
const R_EQUATOR = R_EQUATOR_KM * SCALE;   // ≈ 10.0
const R_OUTER   = R_OUTER_KM   * SCALE;   // ≈ 31.4

// AE-projeksjon: lat -> radius (lineær, fra polen ut)
// BUESTRENG-URETTING (v16): hele 180° breddegrad strekkes til R_OUTER.
// r(90) = 0, r(0) = R_OUTER/2 = 15710 km, r(-90) = R_OUTER = 31420 km.
// Faktor π/2 ≈ 1.5708 i forhold til gammel formel.
function latToR(lat) {
  return R_OUTER * (90 - lat) / 180;
}
// (lat, lon) -> { x, z } på disken (y = 0)
// v16.56: Matcher GE-tallringens formel eksakt (lon=0 ligger NEDE på skjermen, ikke oppe).
// Formel: kompass_vinkel = (180 - signedLon) mod 360
//   lon = 0°   → kompass 180° → +Z (bunn) — Greenwich/Afrika
//   lon = 90°E → kompass 90°  → +X (høyre)
//   lon = 180° → kompass 0°   → -Z (topp) — Stillehavet
//   lon = 90°W → kompass 270° → -X (venstre)
function aeProject(lat, lon) {
  const r = latToR(lat);
  // Signert lengdegrad (-180..180), så vi håndterer både ±180 og 0..360 input.
  let signedLon = lon;
  if (signedLon > 180)  signedLon -= 360;
  if (signedLon < -180) signedLon += 360;
  let compassDeg = (180 - signedLon) % 360;
  if (compassDeg < 0) compassDeg += 360;
  const a = (compassDeg / 360) * Math.PI * 2;
  const x = Math.sin(a) * r;
  const z = -Math.cos(a) * r;
  return { x, z };
}

// Y-koordinater for lag-stacking (3 lag — magnet integrert i kartsenter)
const Y_MAP     =  0;
const Y_CELEST  =  4;
const Y_FIRMA   = 14;

// =================================================================
// MARKØR-DATA (samme som skjelett-v1, kortet ned for plass)
// =================================================================
const MARKERS = [
  // EKVATOR
  { id:"EKV-01", g:"Ekvator", n:"Catequilla", lat:0.00000, lon:-78.42869, type:"observatorium", info:"Pre-columbiansk ca. 800 e.Kr. Eksakt 0.00000°N.", src:"https://en.wikipedia.org/wiki/Catequilla" },
  { id:"EKV-02", g:"Ekvator", n:"Pyramid of Oyambaro", lat:-0.16, lon:-78.32, type:"baseline", info:"French Geodesic 1736." },
  { id:"EKV-03", g:"Ekvator", n:"Pyramid of Caraburo", lat:-0.13, lon:-78.36, type:"baseline", info:"French Geodesic 1736." },
  { id:"EKV-04", g:"Ekvator", n:"Mitad del Mundo", lat:-0.00222, lon:-78.45583, type:"feilmonument", info:"1979-1982. Feilplassert 240 m sør." },
  { id:"EKV-05", g:"Ekvator", n:"Pontianak Tugu Khatulistiwa", lat:0.001056, lon:109.322222, type:"observatorium", info:"Solkulminasjon 21-23 mars og sept." },
  { id:"EKV-06", g:"Ekvator", n:"Quitsato Sundial", lat:0.00000, lon:-78.17500, type:"moderne-solur", info:"2006. 1 mm GPS." },
  { id:"EKV-07", g:"Ekvator", n:"Jardim Marco Zero (Macapá)", lat:0.000739, lon:-51.078131, type:"ekvator-monument", info:"Av. Equatorial, Macapá, Amapá Brasil. 0°00'02.66\"N 51°04'41.27\"W. På_sirkel (0.08 km nord for ekvator).", src:"https://maps.google.com/?q=0.000739,-51.078131" },
  // CANCER
  { id:"CAN-01", g:"Cancer", n:"Modhera Sun Temple", lat:23.583806, lon:72.132686, type:"soltempel", info:"1026 e.Kr. UNESCO." },
  { id:"CAN-02", g:"Cancer", n:"Dholavira", lat:23.888606, lon:70.213636, type:"by", info:"Harappan 2650 f.Kr." },
  { id:"CAN-03", g:"Cancer", n:"Chiayi Tropic Monument", lat:23.453917, lon:120.416722, type:"monument", info:"1908." },
  { id:"CAN-04", g:"Cancer", n:"Aswan/Syene (Eratosthenes)", lat:24.0880, lon:32.8990, type:"observasjon", info:"Eratosthenes 240 f.Kr." },
  { id:"CAN-05", g:"Cancer", n:"Ujjain Jantar Mantar", lat:23.1824, lon:75.7764, type:"observatorium", info:"1719/1725." },
  { id:"CAN-06", g:"Cancer", n:"Mazatlán", lat:23.217, lon:-106.42, type:"havn", info:"Spansk koloni." },
  { id:"CAN-07", g:"Cancer", n:"Havana", lat:23.114, lon:-82.37, type:"havn", info:"Spansk 1519." },
  { id:"CAN-08", g:"Cancer", n:"Muscat", lat:23.61, lon:58.59, type:"havn", info:"Arabisk handel." },
  { id:"CAN-09", g:"Cancer", n:"Kandla", lat:23.03, lon:70.22, type:"havn", info:"Gujarat." },
  { id:"CAN-10", g:"Cancer", n:"Guangzhou", lat:23.13, lon:113.26, type:"havn", info:"Eldgammel kinesisk havn." },
  { id:"CAN-11", g:"Cancer", n:"Macao", lat:22.171, lon:113.55, type:"havn", info:"Portugisisk 1557." },
  { id:"CAN-12", g:"Cancer", n:"Nassau", lat:25.06, lon:-77.34, type:"havn", info:"Britisk 1648." },
  { id:"CAN-13", g:"Cancer", n:"Nabta Playa", lat:22.50797, lon:30.72560, type:"megalittisk", info:"5500 f.Kr." },
  // CAPRICORN
  { id:"CAP-06", g:"Capricorn", n:"Rio de Janeiro", lat:-23.043, lon:-43.17, type:"havn", info:"Portugisisk 1565." },
  { id:"CAP-07", g:"Capricorn", n:"Sao Paulo", lat:-23.55, lon:-46.63, type:"by", info:"Portugisisk 1554." },
  { id:"CAP-08", g:"Capricorn", n:"Antofagasta", lat:-23.65, lon:-70.40, type:"havn", info:"Chilensk." },
  { id:"CAP-09", g:"Capricorn", n:"Pretoria", lat:-25.74, lon:28.19, type:"by", info:"Sør-Afrika." },
  { id:"CAP-10", g:"Capricorn", n:"Campo de Marte Airport (São Paulo)", lat:-23.507286, lon:-46.633928, type:"flyplass", info:"Av. Santos Dumont 1979, Santana, São Paulo SP 02012-010, Brasil. 23°30'26.23\"S 46°38'02.14\"W. 8.2 km sør for nominell Capricorn-sirkel (-23.4333\u00b0).", src:"https://maps.google.com/?q=-23.507286,-46.633928" },
  // CAN-23: Hartswell (Bahamas/Cancer) — 23°27'N-presisjon, ikke på 70W
  { id:"CAN-23", g:"Cancer", n:"Hartswell (Bahamas)", lat:23.449894, lon:-75.671764, type:"cancer-presisjon", info:"Bahamas, Long Island/Exuma-området. 23°26'59.62\"N 75°40'18.35\"W. På_sirkel (23°27'-presisjon).", src:"https://maps.google.com/?q=23.449894,-75.671764" },
  // =================================================================
  // MERIDIAN-70W — 10 punkter langs 70°W-meridianen (Jone-Aase 2026-05-28)
  // Fra -16°S (Peru) til +80°N (Ellesmere Island). Testserie for AE-projeksjon.
  // =================================================================
  { id:"MR70W-01", g:"Meridian-70W", n:"Póvalo Salcedo (Puno, Peru)", lat:-15.862547, lon:-70.000003, type:"meridian-70w", info:"Puno 21002, Peru. Plus 42P3+729. 15°51'45.17\"S 70°00'00.01\"W. Eksakt på 70W (avvik 3 cm).", src:"https://maps.google.com/?q=-15.862547,-70.000003" },
  { id:"MR70W-02", g:"Meridian-70W", n:"Orquidea Lodge (Puerto Maldonado, Peru)", lat:-12.652161, lon:-70.000031, type:"meridian-70w", info:"Rio Madre de Dios, Tambopata, Puerto Maldonado, Peru. 12°39'07.78\"S 70°00'00.11\"W. Eksakt på 70W (avvik 3 m).", src:"https://maps.google.com/?q=-12.652161,-70.000031" },
  { id:"MR70W-03", g:"Meridian-70W", n:"Punta Cardon (Venezuela)", lat:11.570117, lon:-70.000008, type:"meridian-70w", info:"Falcón, Venezuela. 11°34'12.42\"N 70°00'00.03\"W. Eksakt på 70W (avvik 1 m).", src:"https://maps.google.com/?q=11.570117,-70.000008" },
  { id:"MR70W-04", g:"Meridian-70W", n:"Barcadera Port (Aruba)", lat:12.480906, lon:-70.000008, type:"meridian-70w", info:"Aruba (NL Karibien). 12°28'51.26\"N 70°00'00.03\"W. Eksakt på 70W (avvik 1 m).", src:"https://maps.google.com/?q=12.480906,-70.000008" },
  { id:"MR70W-05", g:"Meridian-70W", n:"Santo Domingo (DR)", lat:18.501275, lon:-70.000181, type:"meridian-70w", info:"Dominikanske Republikk. 18°30'04.59\"N 70°00'00.65\"W. Eksakt på 70W (avvik 19 m).", src:"https://maps.google.com/?q=18.501275,-70.000181" },
  { id:"MR70W-06", g:"Meridian-70W", n:"32 Cabot Ln, Chatham MA", lat:41.670867, lon:-70.000206, type:"meridian-70w", info:"Cape Cod, Massachusetts, USA. 41°40'15.12\"N 70°00'00.74\"W. Eksakt på 70W (avvik 17 m).", src:"https://maps.google.com/?q=41.670867,-70.000206" },
  { id:"MR70W-07", g:"Meridian-70W", n:"Topsham, ME", lat:43.934017, lon:-70.000011, type:"meridian-70w", info:"Maine, USA. 43°56'02.46\"N 70°00'00.04\"W. Eksakt på 70W (avvik 1 m).", src:"https://maps.google.com/?q=43.934017,-70.000011" },
  { id:"MR70W-08", g:"Meridian-70W", n:"Iqaluit (Nunavut, Canada)", lat:63.749292, lon:-68.520197, type:"meridian-70w-naer", info:"Hovedstad i Nunavut. 63°44'57.45\"N 68°31'12.71\"W. Nær 70W (~73 km øst).", src:"https://maps.google.com/?q=63.749292,-68.520197" },
  { id:"MR70W-09", g:"Meridian-70W", n:"Clyde River Airport (Nunavut)", lat:70.485461, lon:-68.511117, type:"meridian-70w-naer", info:"Clyde River, NU X0A 0A7, Canada. 70°29'07.66\"N 68°30'40.02\"W. Nær 70W (~56 km øst på 70.5°N).", src:"https://maps.google.com/?q=70.485461,-68.511117" },
  { id:"MR70W-10", g:"Meridian-70W", n:"Moriusaq (Grønland)", lat:76.753342, lon:-69.846903, type:"meridian-70w-naer", info:"Avalannguaq-området, Grønland. Plus Q538+9QP. 76°45'12.03\"N 69°50'48.85\"W. Nær 70W (~4 km øst).", src:"https://maps.google.com/?q=76.753342,-69.846903" },
  { id:"MR70W-11", g:"Meridian-70W", n:"Herbert Ø 1967 (Grønland)", lat:77.420631, lon:-70.172181, type:"meridian-70w-naer", info:"Herbert Island, Grønland. 1967 ekspedisjon. 77°25'14.27\"N 70°10'19.85\"W. Eksakt på 70W (~4 km vest).", src:"https://maps.google.com/?q=77.420631,-70.172181" },
  { id:"MR70W-12", g:"Meridian-70W", n:"Rawlings Bay (Ellesmere, Canada)", lat:80.305603, lon:-70.000094, type:"meridian-70w", info:"Ellesmere Island, Nunavut, Canada. 80°18'20.17\"N 70°00'00.34\"W. Eksakt på 70W (avvik 9 m).", src:"https://maps.google.com/?q=80.305603,-70.000094" },
  // Auckland Island — megalitisk/Maori-arkeologi i sørhavet (Jone-Aase 2026-05-28)
  { id:"MEG-14", g:"Megalithic", n:"Auckland Island / Motu Maha (NZ)", lat:-50.732353, lon:166.094872, type:"subantarktisk", info:"Auckland Islands, New Zealand. Maori-navn: Motu Maha. 50°43'56.47\"S 166°05'41.54\"E. Subantarktisk øgruppe.", src:"https://maps.google.com/?q=-50.732353,166.094872" },
  // Ekvator-monument: Itilleq Arsaattar (=EK-20), Pontianak Khatulistiwa Park (=EKV-05), Beihai (=EK-03), Hainan/Hutou (=EK-04), Xincun (=EK-05), Nedlung (=EK-21) hoppes over (eksisterer allerede).
  // Lebo og Yogyakarta International Airport: 110°02'E, ikke 110°00'E — ligger ca 4 km øst for 110E-meridianen.
  { id:"EK-22", g:"Meridian-110E", n:"Lebo (Java)", lat:-6.963539, lon:110.033475, type:"meridian-110-east-naer", info:"Lebo, Sentral-Java, Indonesia. 6\u00b057'48.74\"S 110\u00b002'00.51\"E. Nær 110E (~3.7 km øst).", src:"https://maps.google.com/?q=-6.963539,110.033475" },
  { id:"EK-23", g:"Meridian-110E", n:"Yogyakarta International Airport", lat:-7.896131, lon:110.034731, type:"meridian-110-east-naer", info:"YIA flyplass, Kulon Progo, Yogyakarta, Indonesia. 7\u00b053'46.07\"S 110\u00b002'05.03\"E. Nær 110E (~3.8 km øst).", src:"https://maps.google.com/?q=-7.896131,110.034731" },
  // v16.62: AKSE-VERIFIKASJONSPINS fra Grok (oppdatert rapport 29. mai 2026). Korrigert AE-x/AE-z for navngitte steder etter Perplexity-verifikasjon.
  // Akse 60°W ↔ 120°E (5 pins)
  { id:"AX60-01", g:"Akse-60W", n:"Goose Bay, Labrador", lat:53.3192, lon:-60.4258, type:"akse-verifikasjon", info:"Grok-pin akse 60°W↔120°E. AE: x=-5568.8, z=3160.2 (Perplexity-korrigert).", src:"https://maps.google.com/?q=53.3192,-60.4258" },
  { id:"AX60-02", g:"Akse-60W", n:"Nain, Newfoundland & Labrador", lat:56.5500, lon:-61.6833, type:"akse-verifikasjon-naer", info:"Grok-pin akse 60°W↔120°E. AE: x=-5140.3, z=2769.7 (Perplexity-korrigert). Avvik 1.68° fra 60W.", src:"https://maps.google.com/?q=56.5500,-61.6833" },
  { id:"AX60-03", g:"Akse-60W", n:"Rigolet, NL", lat:54.1800, lon:-58.4300, type:"akse-verifikasjon-naer", info:"Grok-pin akse 60°W↔120°E. AE: x=-5327.3, z=3273.5 (Perplexity-korrigert). Avvik 1.57° fra 60W.", src:"https://maps.google.com/?q=54.1800,-58.4300" },
  { id:"AX60-04", g:"Akse-60W", n:"Akse-test 40°N -60°W (Atlanterhavet)", lat:40.0000, lon:-60.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 60°W↔120°E. AE: x=-7558.6, z=4364.0.", src:"https://maps.google.com/?q=40,-60" },
  { id:"AX60-05", g:"Akse-60W", n:"Akse-test 0°N -60°W (Atlanterhavet)", lat:0.0000, lon:-60.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 60°W↔120°E ved ekvator. AE: x=-13605.5, z=7855.1.", src:"https://maps.google.com/?q=0,-60" },
  // Akse 45°W ↔ 135°E (5 pins)
  { id:"AX45-01", g:"Akse-45W", n:"St. John's, Newfoundland", lat:47.5615, lon:-52.7126, type:"akse-verifikasjon-naer", info:"Grok-pin akse 45°W↔135°E. AE: x=-5893.9, z=4487.9 (Perplexity-korrigert). Avvik 7.7° fra 45W — nyttig som transatlantisk referanse.", src:"https://maps.google.com/?q=47.5615,-52.7126" },
  { id:"AX45-02", g:"Akse-45W", n:"Akse-test 60°N -45°W", lat:60.0000, lon:-45.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 45°W↔135°E ved Grønland sør-spiss. AE: x=-3702.9, z=3702.9.", src:"https://maps.google.com/?q=60,-45" },
  { id:"AX45-03", g:"Akse-45W", n:"Akse-test 40°N -45°W", lat:40.0000, lon:-45.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 45°W↔135°E. AE: x=-6171.6, z=6171.6.", src:"https://maps.google.com/?q=40,-45" },
  { id:"AX45-04", g:"Akse-45W", n:"Akse-test 20°N -45°W", lat:20.0000, lon:-45.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 45°W↔135°E. AE: x=-8640.2, z=8640.2.", src:"https://maps.google.com/?q=20,-45" },
  { id:"AX45-05", g:"Akse-45W", n:"Akse-test 0°N -45°W", lat:0.0000, lon:-45.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 45°W↔135°E ved ekvator. AE: x=-11108.8, z=11108.8.", src:"https://maps.google.com/?q=0,-45" },
  // Akse 30°W ↔ 150°E (5 pins)
  { id:"AX30-01", g:"Akse-30W", n:"Akse-test 80°N -30°W", lat:80.0000, lon:-30.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 30°W↔150°E. AE: x=-872.8, z=1511.7.", src:"https://maps.google.com/?q=80,-30" },
  { id:"AX30-02", g:"Akse-30W", n:"Akse-test 60°N -30°W", lat:60.0000, lon:-30.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 30°W↔150°E. AE: x=-2618.4, z=4535.2.", src:"https://maps.google.com/?q=60,-30" },
  { id:"AX30-03", g:"Akse-30W", n:"Akse-test 40°N -30°W", lat:40.0000, lon:-30.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 30°W↔150°E. AE: x=-4364.0, z=7558.6.", src:"https://maps.google.com/?q=40,-30" },
  { id:"AX30-04", g:"Akse-30W", n:"Akse-test 20°N -30°W", lat:20.0000, lon:-30.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 30°W↔150°E. AE: x=-6109.6, z=10582.1.", src:"https://maps.google.com/?q=20,-30" },
  { id:"AX30-05", g:"Akse-30W", n:"Akse-test 0°N -30°W", lat:0.0000, lon:-30.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 30°W↔150°E ved ekvator. AE: x=-7855.1, z=13605.5.", src:"https://maps.google.com/?q=0,-30" },
  // Akse 15°W ↔ 165°E (5 pins)
  { id:"AX15-01", g:"Akse-15W", n:"Akse-test 80°N -15°W", lat:80.0000, lon:-15.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 15°W↔165°E. AE: x=-451.8, z=1686.1.", src:"https://maps.google.com/?q=80,-15" },
  { id:"AX15-02", g:"Akse-15W", n:"Akse-test 60°N -15°W", lat:60.0000, lon:-15.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 15°W↔165°E. AE: x=-1355.4, z=5058.3.", src:"https://maps.google.com/?q=60,-15" },
  { id:"AX15-03", g:"Akse-15W", n:"Akse-test 40°N -15°W", lat:40.0000, lon:-15.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 15°W↔165°E. AE: x=-2259.0, z=8430.5.", src:"https://maps.google.com/?q=40,-15" },
  { id:"AX15-04", g:"Akse-15W", n:"Akse-test 20°N -15°W", lat:20.0000, lon:-15.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 15°W↔165°E. AE: x=-3162.5, z=11802.7.", src:"https://maps.google.com/?q=20,-15" },
  { id:"AX15-05", g:"Akse-15W", n:"Akse-test 0°N -15°W", lat:0.0000, lon:-15.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 15°W↔165°E ved ekvator. AE: x=-4066.1, z=15175.0.", src:"https://maps.google.com/?q=0,-15" },
  // Akse 0° (Greenwich) ↔ 180° (datolinjen) (5 pins)
  { id:"AX0-01", g:"Akse-0", n:"Royal Observatory, Greenwich", lat:51.4779, lon:0.0000, type:"akse-verifikasjon", info:"Grok-pin akse 0°↔180°. Hovedmeridianens opprinnelse 1851. AE: x=0.0, z=6724.4 (Perplexity-korrigert).", src:"https://maps.google.com/?q=51.4779,0" },
  { id:"AX0-02", g:"Akse-0", n:"Akse-test 80°N 0°", lat:80.0000, lon:0.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 0°↔180°. AE: x=0.0, z=1745.6.", src:"https://maps.google.com/?q=80,0" },
  { id:"AX0-03", g:"Akse-0", n:"Akse-test 60°N 0°", lat:60.0000, lon:0.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 0°↔180°. AE: x=0.0, z=5236.8.", src:"https://maps.google.com/?q=60,0" },
  { id:"AX0-04", g:"Akse-0", n:"Akse-test 40°N 0°", lat:40.0000, lon:0.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 0°↔180°. AE: x=0.0, z=8727.9.", src:"https://maps.google.com/?q=40,0" },
  { id:"AX0-05", g:"Akse-0", n:"Akse-test 0°N 0° (Atlanterhavet)", lat:0.0000, lon:0.0000, type:"akse-teoretisk", info:"Teoretisk verifikasjonspunkt på akse 0°↔180° ved ekvator (Null-øya). AE: x=0.0, z=15710.3.", src:"https://maps.google.com/?q=0,0" },
  // =================================================================
  // ANTARKTIS-BASER (v16.65) - 20 forskningsstasjoner langs isringen.
  // Plasseres som ankerpunkter pa rett lengdegrad i Enok-modellens ismur.
  // Lat/lon fra offisielle kilder (COMNAP, nasjonale antarktisprogrammer).
  // =================================================================
  { id:"ANT-01", g:"Antarktis-Base", n:"Amundsen-Scott", lat:-89.9999, lon:0.0, type:"antarktis-base", info:"USA. Sorpolen - alle lengdegrader motes her. Hele aret bemannet.", src:"https://www.nsf.gov/geo/opp/support/southp.jsp" },
  { id:"ANT-02", g:"Antarktis-Base", n:"McMurdo Station", lat:-77.85, lon:166.67, type:"antarktis-base", info:"USA. Ross-oya. Storste forskningsstasjon i Antarktis (1200 personer sommer).", src:"https://www.usap.gov/" },
  { id:"ANT-03", g:"Antarktis-Base", n:"Vostok", lat:-78.46, lon:106.84, type:"antarktis-base", info:"Russland. Innlandsstasjon, kuldepol (-89.2C registrert 1983).", src:"https://www.aari.ru/" },
  { id:"ANT-04", g:"Antarktis-Base", n:"Esperanza", lat:-63.40, lon:-56.99, type:"antarktis-base", info:"Argentina. Antarktis-halvoya. Forste barn fodt i Antarktis (1978).", src:"https://www.dna.gob.ar/" },
  { id:"ANT-05", g:"Antarktis-Base", n:"Mawson", lat:-67.60, lon:62.87, type:"antarktis-base", info:"Australia. Eldste kontinuerlig bemannede stasjon sor for polarsirkelen (1954).", src:"https://www.antarctica.gov.au/" },
  { id:"ANT-06", g:"Antarktis-Base", n:"Davis", lat:-68.58, lon:77.97, type:"antarktis-base", info:"Australia. Vestfold Hills, Princess Elizabeth Land.", src:"https://www.antarctica.gov.au/" },
  { id:"ANT-07", g:"Antarktis-Base", n:"Halley VI", lat:-75.58, lon:-26.50, type:"antarktis-base", info:"Storbritannia. Brunt-isheelv. Flyttbar pa skier.", src:"https://www.bas.ac.uk/" },
  { id:"ANT-08", g:"Antarktis-Base", n:"Rothera", lat:-67.57, lon:-68.13, type:"antarktis-base", info:"Storbritannia. Antarktis-halvoya. BAS hovedbase.", src:"https://www.bas.ac.uk/" },
  { id:"ANT-09", g:"Antarktis-Base", n:"Casey", lat:-66.28, lon:110.53, type:"antarktis-base", info:"Australia. Wilkes Land.", src:"https://www.antarctica.gov.au/" },
  { id:"ANT-10", g:"Antarktis-Base", n:"Concordia", lat:-75.10, lon:123.33, type:"antarktis-base", info:"Frankrike/Italia. Dome C innlandsstasjon, 3233m.o.h. Mars-analog.", src:"https://www.institut-polaire.fr/" },
  { id:"ANT-11", g:"Antarktis-Base", n:"Syowa", lat:-69.00, lon:39.58, type:"antarktis-base", info:"Japan. Dronning Maud Land kyst, East Ongul Island.", src:"https://www.nipr.ac.jp/" },
  { id:"ANT-12", g:"Antarktis-Base", n:"Troll", lat:-72.01, lon:2.53, type:"antarktis-base", info:"Norge. Jutulsessen, Dronning Maud Land. Bla-is-rullebane.", src:"https://www.npolar.no/" },
  { id:"ANT-13", g:"Antarktis-Base", n:"Maitri", lat:-70.77, lon:11.74, type:"antarktis-base", info:"India. Schirmacher-oasen, Dronning Maud Land.", src:"https://ncpor.res.in/" },
  { id:"ANT-14", g:"Antarktis-Base", n:"King Sejong", lat:-62.22, lon:-58.78, type:"antarktis-base", info:"Sor-Korea. King George Island, Sor-Shetland.", src:"https://kopri.re.kr/" },
  { id:"ANT-15", g:"Antarktis-Base", n:"Bellingshausen", lat:-62.20, lon:-58.96, type:"antarktis-base", info:"Russland. King George Island, Sor-Shetland.", src:"https://www.aari.ru/" },
  { id:"ANT-16", g:"Antarktis-Base", n:"Palmer", lat:-64.77, lon:-64.05, type:"antarktis-base", info:"USA. Anvers Island, Antarktis-halvoya.", src:"https://www.usap.gov/" },
  { id:"ANT-17", g:"Antarktis-Base", n:"Zhongshan", lat:-69.37, lon:76.37, type:"antarktis-base", info:"Kina. Larsemann Hills, Princess Elizabeth Land.", src:"https://www.chinare.gov.cn/" },
  { id:"ANT-18", g:"Antarktis-Base", n:"Kunlun", lat:-80.42, lon:77.12, type:"antarktis-base", info:"Kina. Dome A innlandsstasjon, 4087m.o.h. - hoyeste punkt på isen.", src:"https://www.chinare.gov.cn/" },
  { id:"ANT-19", g:"Antarktis-Base", n:"Princess Elisabeth", lat:-71.95, lon:23.35, type:"antarktis-base", info:"Belgia. Forste null-utslipps-forskningsstasjon.", src:"https://www.antarcticstation.org/" },
  { id:"ANT-20", g:"Antarktis-Base", n:"Neumayer III", lat:-70.67, lon:-8.27, type:"antarktis-base", info:"Tyskland. Ekstrom-isheelva, Dronning Maud Land.", src:"https://www.awi.de/" },
  { id:"ANT-21", g:"Antarktis-Base", n:"Mendel Polar Station", lat:-63.799997, lon:-57.882528, type:"antarktis-base", info:"Tsjekkia. James Ross Island, Antarktis-halvoya. Jone-Aase GE-koordinat.", src:"https://polar.sci.muni.cz/" },
  { id:"ANT-22", g:"Antarktis-Base", n:"Belgrano II", lat:-77.873858, lon:-34.624172, type:"antarktis-base", info:"Argentina. Coats Land, Weddellhavet. Jone-Aase GE-koordinat.", src:"https://www.dna.gob.ar/" },
  { id:"ANT-23", g:"Antarktis-Base", n:"San Martin", lat:-68.129831, lon:-67.100731, type:"antarktis-base", info:"Argentina. Barry Island, Antarktis-halvoya. Jone-Aase GE-koordinat.", src:"https://www.dna.gob.ar/" },
  { id:"ANT-24", g:"Antarktis-Base", n:"Teniente Luis Carvajal Villaroel", lat:-67.760658, lon:-68.915558, type:"antarktis-base", info:"Chile. Adelaide Island, Antarktis-halvoya. Jone-Aase GE-koordinat.", src:"https://www.inach.cl/" },
  { id:"ANT-25", g:"Antarktis-Base", n:"Zucchelli", lat:-74.695056, lon:164.115008, type:"antarktis-base", info:"Italia. Terra Nova Bay. Jone-Aase GE-koordinat.", src:"https://www.pnra.aq/" },
  { id:"ANT-26", g:"Antarktis-Base", n:"Jang Bogo", lat:-74.624433, lon:164.228931, type:"antarktis-base", info:"Sor-Korea. Terra Nova Bay. Jone-Aase GE-koordinat.", src:"https://kopri.re.kr/" },
  { id:"ANT-27", g:"Antarktis-Base", n:"Commonwealth Bay Cape Denison", lat:-67.008511, lon:142.659117, type:"antarktis-base", info:"Australia. Adelie Land. Mawsons originale base 1912. Jone-Aase GE-koordinat.", src:"https://www.antarctica.gov.au/" },
  { id:"ANT-28", g:"Antarktis-Base", n:"Dumont d'Urville", lat:-66.663825, lon:140.000808, type:"antarktis-base", info:"Frankrike. Adelie Land. Jone-Aase GE-koordinat.", src:"https://www.institut-polaire.fr/" },
  { id:"ANT-29", g:"Antarktis-Base", n:"Mirny", lat:-66.526114, lon:92.993797, type:"antarktis-base", info:"Russland. Davis-havet. Jone-Aase GE-koordinat.", src:"https://www.aari.ru/" },
  // NORGE-TEST (Norge-fork, 2026-05-31): 8 norske byer plottet pa AE-disken med v16.77-formelen r = R_OUTER * (90-lat)/180.
  // Test: Nordkapp og Tromso skal ligge innenfor polarsirkelen (r=4091 km), Lindesnes mye lenger ut. WGS84-koordinater fra Kartverket SSR.
  { id:"NO-01", g:"Norge-test", n:"Nordkapp",     lat:71.17, lon:25.78, type:"norge-test", info:"Finnmark. Nordligste punkt pa fastlandet (Magerøya). Innenfor polarsirkelen.", src:"https://www.kartverket.no/" },
  { id:"NO-02", g:"Norge-test", n:"Tromsø",       lat:69.65, lon:18.96, type:"norge-test", info:"Troms. Nord-Norges storste by. Innenfor polarsirkelen.", src:"https://www.kartverket.no/" },
  { id:"NO-03", g:"Norge-test", n:"Trondheim",    lat:63.43, lon:10.40, type:"norge-test", info:"Trøndelag. Tredje storste by i Norge. Like sor for polarsirkelen.", src:"https://www.kartverket.no/" },
  { id:"NO-04", g:"Norge-test", n:"Bergen",       lat:60.39, lon:5.32,  type:"norge-test", info:"Vestland. Norges nest storste by. Vestlandet.", src:"https://www.kartverket.no/" },
  { id:"NO-05", g:"Norge-test", n:"Oslo",         lat:59.91, lon:10.74, type:"norge-test", info:"Oslo. Hovedstaden i Norge.", src:"https://www.kartverket.no/" },
  { id:"NO-06", g:"Norge-test", n:"Stavanger",    lat:58.97, lon:5.73,  type:"norge-test", info:"Rogaland. Oljebyen pa Sor-Vestlandet.", src:"https://www.kartverket.no/" },
  { id:"NO-07", g:"Norge-test", n:"Kristiansand", lat:58.15, lon:7.99,  type:"norge-test", info:"Agder. Storste by pa Sorlandet.", src:"https://www.kartverket.no/" },
  { id:"NO-08", g:"Norge-test", n:"Lindesnes",    lat:57.98, lon:7.05,  type:"norge-test", info:"Agder. Sorligste punkt pa fastlandet. Lengst ute fra Nordpolen pa AE.", src:"https://www.kartverket.no/" },
  // AFRIKA-MARKORER (v16.44) - 23 punkter fra afrika-markorer-perplexity.csv (Ekvator/Cancer/Capricorn)
  { id:"AFR-005", g:"Ekvator", n:"Semliki Base", lat:0.850000, lon:30.100000, type:"triangulering", info:"Uganda. 1908. Smith 2005 FIG. Avstand til sirkel: 94 km (nær_sirkel).", src:"https://www.fig.net/resources/proceedings/fig_proceedings/cairo/papers/wshs_03/wshs03_01_smith.pdf" },
  { id:"AFR-006", g:"Ekvator", n:"Omunturok", lat:0.300000, lon:30.050000, type:"triangulering", info:"Uganda. 1908. Smith 2005 FIG. Avstand til sirkel: 33 km (nær_sirkel).", src:"https://www.fig.net/resources/proceedings/fig_proceedings/cairo/papers/wshs_03/wshs03_01_smith.pdf" },
  { id:"AFR-007", g:"Ekvator", n:"NKenda", lat:0.200000, lon:30.100000, type:"triangulering", info:"Uganda. 1908. Smith 2005 FIG. Avstand til sirkel: 22 km (nær_sirkel).", src:"https://www.fig.net/resources/proceedings/fig_proceedings/cairo/papers/wshs_03/wshs03_01_smith.pdf" },
  { id:"AFR-008", g:"Ekvator", n:"Kasunju", lat:-0.250000, lon:29.950000, type:"triangulering", info:"Uganda. 1908. Smith 2005 FIG. Avstand til sirkel: 28 km (nær_sirkel).", src:"https://www.fig.net/resources/proceedings/fig_proceedings/cairo/papers/wshs_03/wshs03_01_smith.pdf" },
  { id:"AFR-009", g:"Ekvator", n:"Karangora", lat:0.300000, lon:30.000000, type:"triangulering", info:"Uganda. 1908. Smith 2005 FIG. Avstand til sirkel: 33 km (nær_sirkel).", src:"https://www.fig.net/resources/proceedings/fig_proceedings/cairo/papers/wshs_03/wshs03_01_smith.pdf" },
  { id:"AFR-017", g:"Ekvator", n:"Lake Rudolph Base", lat:5.500000, lon:30.500000, type:"triangulering", info:"Sudan. 1903. Smith 2005 FIG. Avstand til sirkel: 611 km (langt_fra).", src:"https://www.fig.net/resources/proceedings/fig_proceedings/cairo/papers/wshs_03/wshs03_01_smith.pdf" },
  { id:"AFR-019", g:"Ekvator", n:"Juba Base", lat:4.850000, lon:31.600000, type:"triangulering", info:"Sudan. 1952. Smith 2005 FIG. Avstand til sirkel: 539 km (langt_fra).", src:"https://www.fig.net/resources/proceedings/fig_proceedings/cairo/papers/wshs_03/wshs03_01_smith.pdf" },
  { id:"AFR-021", g:"Ekvator", n:"Abu Qarn Base", lat:10.000000, lon:30.000000, type:"triangulering", info:"Sudan. 1951. Smith 2005 FIG. Avstand til sirkel: 1113 km (langt_fra).", src:"https://www.fig.net/resources/proceedings/fig_proceedings/cairo/papers/wshs_03/wshs03_01_smith.pdf" },
  { id:"AFR-030", g:"Ekvator", n:"Kayabwe Equator Monument", lat:-0.000811, lon:32.039169, type:"vendekrets-monument", info:"Uganda. 1980. Wikimedia Commons; OpenStreetMap. Avstand til sirkel: 0.09 km (på_sirkel).", src:"https://commons.wikimedia.org/wiki/File:Uganda_Equator_(Kayabwe).jpg" },
  { id:"AFR-011", g:"Cancer", n:"Wadi Halfa", lat:21.800000, lon:31.350000, type:"triangulering", info:"Sudan. 1893. Smith 2005 FIG. Avstand til sirkel: 184 km (langt_fra).", src:"https://www.fig.net/resources/proceedings/fig_proceedings/cairo/papers/wshs_03/wshs03_01_smith.pdf" },
  { id:"AFR-012", g:"Cancer", n:"Murrat Wells", lat:20.500000, lon:30.800000, type:"triangulering", info:"Sudan. 1893. Smith 2005 FIG. Avstand til sirkel: 328 km (langt_fra).", src:"https://www.fig.net/resources/proceedings/fig_proceedings/cairo/papers/wshs_03/wshs03_01_smith.pdf" },
  { id:"AFR-013", g:"Cancer", n:"Kerma", lat:19.650000, lon:30.400000, type:"triangulering", info:"Sudan. 1896. Smith 2005 FIG. Avstand til sirkel: 422 km (langt_fra).", src:"https://www.fig.net/resources/proceedings/fig_proceedings/cairo/papers/wshs_03/wshs03_01_smith.pdf" },
  { id:"AFR-014", g:"Cancer", n:"Merowe", lat:18.450000, lon:31.800000, type:"triangulering", info:"Sudan. 1898. Smith 2005 FIG. Avstand til sirkel: 555 km (langt_fra).", src:"https://www.fig.net/resources/proceedings/fig_proceedings/cairo/papers/wshs_03/wshs03_01_smith.pdf" },
  { id:"AFR-015", g:"Cancer", n:"Abu Hamed", lat:19.530000, lon:33.320000, type:"triangulering", info:"Sudan. 1898. Smith 2005 FIG. Avstand til sirkel: 430 km (langt_fra).", src:"https://www.fig.net/resources/proceedings/fig_proceedings/cairo/papers/wshs_03/wshs03_01_smith.pdf" },
  { id:"AFR-026", g:"Cancer", n:"Luxor Base", lat:25.670000, lon:32.650000, type:"triangulering", info:"Egypt. 1922. Smith 2005 FIG. Avstand til sirkel: 248 km (langt_fra).", src:"https://www.fig.net/resources/proceedings/fig_proceedings/cairo/papers/wshs_03/wshs03_01_smith.pdf" },
  { id:"AFR-027", g:"Cancer", n:"Aswan Base", lat:24.090000, lon:32.900000, type:"triangulering", info:"Egypt. 1927. Smith 2005 FIG; Wikipedia Aswan. Avstand til sirkel: 73 km (nær_sirkel).", src:"https://www.fig.net/resources/proceedings/fig_proceedings/cairo/papers/wshs_03/wshs03_01_smith.pdf" },
  { id:"AFR-028", g:"Cancer", n:"Adindan Base", lat:22.170000, lon:31.500000, type:"triangulering", info:"Egypt. 1930. Smith 2005 FIG; EPSG:4201. Avstand til sirkel: 141 km (langt_fra).", src:"https://epsg.io/4201" },
  { id:"AFR-036", g:"Cancer", n:"Aswan Eratosthenes locus", lat:24.089800, lon:32.899700, type:"observatorium", info:"Egypt. -240. Wikipedia Aswan; Eratosthenes 240 BC. Avstand til sirkel: 73 km (nær_sirkel).", src:"https://en.wikipedia.org/wiki/Aswan" },
  { id:"AFR-031", g:"Capricorn", n:"Tropic of Capricorn Sign Namibia", lat:-23.436940, lon:15.500000, type:"vendekrets-monument", info:"Namibia. 1970. Facebook 4x4Rentals; Wikipedia Tropic Capricorn. Avstand til sirkel: 0.05 km (på_sirkel).", src:"https://en.wikipedia.org/wiki/Tropic_of_Capricorn" },
  { id:"AFR-032", g:"Capricorn", n:"Tropic of Capricorn Monument Botswana", lat:-23.433000, lon:20.000000, type:"vendekrets-monument", info:"Botswana. 1970. Wikipedia Tropic Capricorn. Avstand til sirkel: 0.7 km (på_sirkel).", src:"https://en.wikipedia.org/wiki/Tropic_of_Capricorn" },
  { id:"AFR-033", g:"Capricorn", n:"Tropic of Capricorn Marker Limpopo", lat:-23.433000, lon:27.300000, type:"vendekrets-monument", info:"Sør-Afrika. 1970. Wikipedia Tropic Capricorn; AARoads N1. Avstand til sirkel: 0.7 km (på_sirkel).", src:"https://en.wikipedia.org/wiki/Tropic_of_Capricorn" },
  { id:"AFR-034", g:"Capricorn", n:"Tropic of Capricorn Mozambique", lat:-23.433000, lon:31.550000, type:"vendekrets-monument", info:"Mosambik. 1970. Wikipedia Tropic Capricorn. Avstand til sirkel: 0.7 km (på_sirkel).", src:"https://en.wikipedia.org/wiki/Tropic_of_Capricorn" },
  { id:"AFR-035", g:"Capricorn", n:"Tropic of Capricorn Madagaskar", lat:-23.433000, lon:43.750000, type:"vendekrets-monument", info:"Madagaskar. 1970. Wikipedia Tropic Capricorn. Avstand til sirkel: 0.7 km (på_sirkel).", src:"https://en.wikipedia.org/wiki/Tropic_of_Capricorn" },
  // STRUVE (utvalg)
  { id:"STRUVE-01", g:"Struve", n:"Fuglenes Hammerfest", lat:70.67000, lon:23.66333, type:"geodetisk", info:"Nordligste 1816-1855. UNESCO." },
  { id:"STRUVE-10", g:"Struve", n:"Aavasaksa Ylitornio", lat:66.39778, lon:23.72528, type:"geodetisk", info:"Maupertuis 1736." },
  { id:"STRUVE-19", g:"Struve", n:"Tartu Old Observatory", lat:58.3787889, lon:26.7201694, type:"geodetisk", info:"Struves base." },
  { id:"STRUVE-34", g:"Struve", n:"Staro-Nekrasivka", lat:45.332639, lon:28.92778, type:"geodetisk", info:"Svartehavet — sør-ende." },
  // POLARSIRKEL
  { id:"POL-01", g:"Polarsirkel", n:"Orbis et Globus (Grímsey)", lat:66.56342, lon:-18.01783, type:"polarsirkel-monument", info:"3m betongkule 2017." },
  // MEGALITTISKE
  { id:"MEG-01", g:"Megalithic", n:"Stonehenge", lat:51.17889, lon:-1.82611, type:"megalittisk", info:"3000 f.Kr." },
  { id:"MEG-02", g:"Megalithic", n:"Newgrange", lat:53.69472, lon:-6.47528, type:"megalittisk", info:"3200 f.Kr." },
  { id:"MEG-03", g:"Megalithic", n:"Goseck Circle", lat:51.19778, lon:11.86056, type:"megalittisk", info:"4900 f.Kr." },
  { id:"MEG-05", g:"Megalithic", n:"Mnajdra", lat:35.82667, lon:14.43639, type:"megalittisk", info:"3600 f.Kr." },
  { id:"MEG-06", g:"Megalithic", n:"Bighorn Medicine Wheel", lat:44.82611, lon:-107.92167, type:"megalittisk", info:"1200-1700 e.Kr." },
  { id:"OBS-01", g:"Megalithic", n:"Gaocheng Observatory", lat:34.40278, lon:113.14083, type:"observatorium", info:"1276 e.Kr." },
  { id:"OBS-02", g:"Megalithic", n:"El Caracol Chichen Itza", lat:20.6792, lon:-88.5707, type:"observatorium", info:"Maya ca. 800 e.Kr." },
  { id:"OBS-03", g:"Megalithic", n:"Machu Picchu Intihuatana", lat:-13.16333, lon:-72.54556, type:"observatorium", info:"Inka 1450 e.Kr." },
  { id:"OBS-05", g:"Megalithic", n:"Chankillo Solar Observatory", lat:-9.55917, lon:-78.23333, type:"observatorium", info:"250 f.Kr." },
  { id:"OBS-06", g:"Megalithic", n:"Karnak Temple", lat:25.71889, lon:32.65750, type:"soltempel", info:"2055 f.Kr." },
  { id:"OBS-07", g:"Megalithic", n:"Abu Simbel", lat:22.33750, lon:31.62583, type:"soltempel", info:"1264 f.Kr." },
  { id:"OBS-08", g:"Megalithic", n:"Tikal Mundo Perdido", lat:17.22194, lon:-89.62361, type:"observatorium", info:"Maya." },
  { id:"OBS-09", g:"Megalithic", n:"Ahu Akivi", lat:-27.11528, lon:-109.41472, type:"moai", info:"Rapa Nui 1500-tallet." },
  // =================================================================
  // VENDEKRETS-MONUMENTER (14) — fysiske monumenter satt opp PÅ vendekretsene
  // Empirisk snitt: Capricorn -23.4409° (spredning 13.5 km), Cancer +23.5614° (Aswan utligger)
  // Match mot Ark T 23.70°: avvik 15-29 km systematisk. Plottes med eksakte GPS-koordinater.
  // =================================================================
  { id:"VKM-01", g:"Vendekrets-Monument", n:"Hito al Trópico de Capricornio (Antofagasta)", lat:-23.44310, lon:-70.42827, type:"vendekrets-monument", info:"Capricorn-monument, Chile. Eksakt 23°26'35.16\"S.", src:"https://www.wikidata.org/wiki/Q9004360" },
  { id:"VKM-02", g:"Vendekrets-Monument", n:"Monolito del Trópico de Capricornio (Belén)", lat:-23.43752, lon:-57.27018, type:"vendekrets-monument", info:"Capricorn-monolitt, Paraguay. 23°26'15.07\"S.", src:"https://mapcarta.com/N4939298321" },
  { id:"VKM-03", g:"Vendekrets-Monument", n:"Monolito sin sombra (Huacalera)", lat:-23.43830, lon:-65.35080, type:"vendekrets-monument", info:"Capricorn-monolitt, Argentina, Ruta Nacional 9. 23°26'17.88\"S.", src:"https://es.wikipedia.org/wiki/Huacalera" },
  { id:"VKM-04", g:"Vendekrets-Monument", n:"Museu Florestal Octávio Vecchi (São Paulo)", lat:-23.46257, lon:-46.63707, type:"vendekrets-monument", info:"Capricorn-marker, Brasil, Parque Alberto Löfgren. 23°27'45.25\"S.", src:"https://en.wikipedia.org/wiki/Albert_L%C3%B6fgren_State_Park" },
  { id:"VKM-05", g:"Vendekrets-Monument", n:"Marco do Trópico de Capricórnio (Maringá)", lat:-23.42530, lon:-51.93860, type:"vendekrets-monument", info:"Capricorn-marker, Paraná Brasil, Avenida Cerro Azul. 23°25'31.08\"S.", src:"https://time-ok.com/coordinates/maringa" },
  { id:"VKM-06", g:"Vendekrets-Monument", n:"Tropic of Capricorn Spire (Rockhampton)", lat:-23.37810, lon:150.51360, type:"vendekrets-monument", info:"Capricorn-spire, QLD Australia. Gladstone Rd Allenstown. 23°22'41.16\"S.", src:"https://en.wikipedia.org/wiki/Rockhampton" },
  { id:"VKM-07", g:"Vendekrets-Monument", n:"Tropic of Capricorn Marker (Alice Springs)", lat:-23.44189, lon:133.83280, type:"vendekrets-monument", info:"Capricorn-marker, NT Australia, Stuart Highway. 23°26'30.80\"S.", src:"https://www.monumentaustralia.org/themes/landscape/settlement/display/101471" },
  { id:"VKM-08", g:"Vendekrets-Monument", n:"Tropic of Capricorn Sign (Solitaire)", lat:-23.50023, lon:15.77214, type:"vendekrets-monument", info:"Capricorn-skilt, Khomas Namibia, Rute C14. 23°30'00.83\"S.", src:"https://www.findlatitudeandlongitude.com/" },
  { id:"VKM-09", g:"Vendekrets-Monument", n:"Monumento al Trópico de Cáncer (San Luis Potosí)", lat:23.44944, lon:-100.60500, type:"vendekrets-monument", info:"Cancer-monument, Mexico, Carretera 57. 23°26'58\"N.", src:"http://wikimapia.org/34376176" },
  { id:"VKM-10", g:"Vendekrets-Monument", n:"Plaza Turística Trópico de Cáncer (Santiago BCS)", lat:23.50000, lon:-109.71667, type:"vendekrets-monument", info:"Cancer-plaza, Baja California Sur Mexico, km 81.5 Hwy 1. 23°30'00\"N.", src:"https://www.loscabosguide.com/tropic-of-cancer-monument/" },
  { id:"VKM-15", g:"Vendekrets-Monument", n:"Trópico de Cáncer Plaza del Pueblo (Cabo San Lucas)", lat:23.447875, lon:-109.703106, type:"vendekrets-monument", info:"Cancer-park, Baja California Sur Mexico, 23500 Cabo San Lucas. 23°26'52.35\"N 109°42'11.18\"W. På_sirkel (1.6 km fra nominell 23.4333°).", src:"https://maps.google.com/?q=23.447875,-109.703106" },
  { id:"VKM-16", g:"Vendekrets-Monument", n:"Trópico de Cáncer C. Centenario 8 (El Centro BCS)", lat:23.450006, lon:-110.225467, type:"vendekrets-monument", info:"Cancer-marker, Baja California Sur Mexico, 23880 Centro. 23°27'00.02\"N 110°13'31.68\"W. På_sirkel (1.9 km fra nominell 23.4333°).", src:"https://maps.google.com/?q=23.450006,-110.225467" },
  { id:"VKM-11", g:"Vendekrets-Monument", n:"Aswan/Syene Eratosthenes-brønn", lat:24.08889, lon:32.89972, type:"vendekrets-monument", info:"Cancer-observasjon, Egypt. Eratosthenes' brønn 240 f.Kr. Utligger 24.089°N.", src:"https://en.wikipedia.org/wiki/Aswan" },
  { id:"VKM-12", g:"Vendekrets-Monument", n:"Symbolic Tower of Tropic of Cancer (Shantou)", lat:23.44240, lon:116.58885, type:"vendekrets-monument", info:"Cancer-tårn, Guangdong Kina, Jilong-fjellet. 23°26'33\"N.", src:"https://en.wikipedia.org/wiki/Shantou" },
  { id:"VKM-13", g:"Vendekrets-Monument", n:"Gate of Nature Tropic Tower (Nan'ao)", lat:23.43300, lon:117.01700, type:"vendekrets-monument", info:"Cancer-tårn, Nan'ao øy Guangdong Kina, Qing'ao Bay. 23°25'58.8\"N.", src:"https://en.wikipedia.org/wiki/Nan%27ao_County" },
  { id:"VKM-14", g:"Vendekrets-Monument", n:"Tropic of Cancer Solar Exploration Center (Chiayi)", lat:23.45462, lon:120.41697, type:"vendekrets-monument", info:"Cancer-senter, Shuishang Taiwan. 23°27'16.63\"N.", src:"https://jotarofootsteps.blogspot.com/" },
  { id:"VKM-17", g:"Vendekrets-Monument", n:"Giant Crab Tropic of Capricorn (Mantos Blancos)", lat:-23.487144, lon:-70.000003, type:"vendekrets-monument", info:"Capricorn-monument, Sierra Gorda Antofagasta Chile. Historical landmark, G273+44. 23°29'13.72\"S 70°00'00.01\"W.", src:"https://maps.google.com/?q=-23.487144,-70.000003" },
  // =================================================================
  // EK_DATA V6 — 21 punkter fra One Voice V6, arket EK_Data, kolonne AE-AL
  // Empiriske Google Earth-observasjoner langs meridianer (110°E, 150°E, 149.5°W), polarsirkler og sørlige havner
  // =================================================================
  { id:"EK-01", g:"Havn-Sor", n:"Punta Arenas", lat:-53.15052, lon:-70.90298, type:"skipslogg-referanse", info:"EK_Data V6. Raw GE: 53°9'1.88\"S 70°54'10.74\"W" },
  { id:"EK-02", g:"Havn-Sor", n:"Puerto Harris", lat:-53.84006, lon:-70.44378, type:"skipslogg-referanse", info:"EK_Data V6. Raw GE: 53°50'24.23\"S 70°26'37.61\"W" },
  { id:"EK-03", g:"Meridian-110E", n:"Beihai Port", lat:20.27938, lon:110.00001, type:"meridian-110-east", info:"EK_Data V6. Raw GE: 20°16'45.77\"N 110°0'0.04\"E" },
  { id:"EK-04", g:"Meridian-110E", n:"Hainan", lat:19.93009, lon:110.00000, type:"meridian-110-east", info:"EK_Data V6. Raw GE: 19°55'48.34\"N 110°0'0.00\"E" },
  { id:"EK-05", g:"Meridian-110E", n:"Xincun Habor Yanjincun", lat:18.43403, lon:110.00017, type:"meridian-110-east", info:"EK_Data V6. Raw GE: 18°26'2.52\"N 110°0'0.60\"E" },
  { id:"EK-06", g:"Meridian-150E", n:"Urup (Kuril-øyene)", lat:46.20177, lon:150.50465, type:"meridian-150-east", info:"EK_Data V6. Raw GE: 46°12'6.39\"N 150°30'16.75\"E" },
  { id:"EK-07", g:"Meridian-150E", n:"Magadan Oblast", lat:59.54829, lon:150.78977, type:"meridian-150-east", info:"EK_Data V6. Raw GE: 59°32'53.86\"N 150°47'23.19\"E" },
  { id:"EK-08", g:"Meridian-150E", n:"Sinegor'e (Magadan)", lat:62.07863, lon:150.50553, type:"meridian-150-east", info:"EK_Data V6. Raw GE: 62°4'43.07\"N 150°30'19.89\"E" },
  { id:"EK-09", g:"Meridian-150E", n:"Tumannyi", lat:62.68097, lon:150.50514, type:"meridian-150-east", info:"EK_Data V6. Raw GE: 62°40'51.48\"N 150°30'18.52\"E" },
  { id:"EK-10", g:"Meridian-150E", n:"Usun-Kiuell", lat:66.34406, lon:150.50526, type:"meridian-150-east", info:"EK_Data V6. Raw GE: 66°20'38.62\" 150°30'18.92\"E" },
  { id:"EK-11", g:"Capricorn", n:"Tubuai (Fransk Polynesia)", lat:-23.37577, lon:-149.46830, type:"capricorn-punkt", info:"EK_Data V6. Raw GE: 23°22'32.76\"S 149°28'5.87\"W" },
  { id:"EK-12", g:"Meridian-149W", n:"Michou (Fransk Polynesia)", lat:-17.50682, lon:-149.46826, type:"meridian-149-west", info:"EK_Data V6. Raw GE: 17°30'24.56\"S 149°28'5.73\"W" },
  { id:"EK-13", g:"Meridian-149W", n:"Seward (Alaska)", lat:60.12090, lon:-149.46848, type:"meridian-149-west", info:"EK_Data V6. Raw GE: 60°7'15.25\"N 149°28'6.54\"W" },
  { id:"EK-14", g:"Meridian-149W", n:"Kongiganak Anchorage (Alaska)", lat:60.97331, lon:-149.46826, type:"meridian-149-west", info:"EK_Data V6. Raw GE: 60°58'23.92\"N 149°28'5.74\"W" },
  { id:"EK-15", g:"Meridian-149W", n:"Chugiak Birchwood Loop (Alaska)", lat:61.40395, lon:-149.46826, type:"meridian-149-west", info:"EK_Data V6. Raw GE: 61°24'14.21\"N 149°28'5.74\"W" },
  { id:"EK-16", g:"Polarsirkel", n:"Toolik Lake Field Station", lat:68.62758, lon:-149.59427, type:"polarsirkel-punkt", info:"EK_Data V6. Raw GE: 68°37'39.30\"N 149°35'39.38\"W" },
  { id:"EK-17", g:"Meridian-149W", n:"Kuparuk Rd (Alaska)", lat:70.32616, lon:-149.59595, type:"meridian-149-west", info:"EK_Data V6. Raw GE: 70°19'34.16\"N 149°35'45.43\"W" },
  { id:"EK-18", g:"Polarsirkel", n:"Hestmona Storselsøy", lat:66.55002, lon:12.84714, type:"polarsirkel-punkt", info:"EK_Data V6. Raw GE: 66°33'0.08\"N 12°50'49.72\"E" },
  { id:"EK-19", g:"Polarsirkel", n:"Raudskjærholmen", lat:66.54329, lon:12.16575, type:"polarsirkel-punkt", info:"EK_Data V6. Raw GE: 66°32'35.83\"N 12°9'56.69\"E" },
  { id:"EK-20", g:"Polarsirkel", n:"Itilleq Arsaattarfik (Grønland)", lat:66.57695, lon:-53.49841, type:"polarsirkel-punkt", info:"EK_Data V6. Raw GE: 66°34'37.01\"N 53°29'54.27\"W" },
  { id:"EK-21", g:"Polarsirkel", n:"Nedlung", lat:66.54316, lon:-71.32839, type:"polarsirkel-punkt", info:"EK_Data V6. Raw GE: 66°32'35.39\"N 71°19'42.20\"W" },
  { id:"NO-AC-01", g:"Polarsirkel", n:"Arctic Circle Center", lat:66.550008, lon:15.327011, type:"polarsirkel-punkt", info:"Jone-Aase kalibreringspunkt. Raw GE: 66°33'0.03\"N 15°19'37.24\"E" },
];

const FARGER = {
  "Ekvator":     "#4fff4f",
  "Cancer":      "#ff7755",
  "Capricorn":   "#55a8ff",
  "Struve":      "#ffcc88",
  "Megalithic":  "#cc99ff",
  "Polarsirkel": "#ffff88",
  "Vendekrets-Monument": "#ffff00",  // klar gul — fysiske monumenter på vendekretsene
  "Havn-Sor":      "#ff44aa",  // magenta — sørlige skipslogg-havner (Punta Arenas, Puerto Harris)
  "Meridian-110E": "#44ddff",  // cyan — 110°E (Kina-aksen)
  "Meridian-150E": "#88ffaa",  // lysegrønn — 150°E (Russland-aksen)
  "Meridian-149W": "#ffaa44",  // oransje — 149.5°W (Alaska / Polynesia-aksen)
  "Meridian-70W":  "#ff88ff",  // lyserosa/lilla — 70°W (Peru/Karibien/Maine/Ellesmere-aksen) v16.59
  // v16.62: Akse-verifikasjonspins fra Groks rapport. Samme farger som tilsvarende akselinjer i ANTIPODAL_AXES_V1661.
  "Akse-60W":      "#ffdd44",  // gul — akse 60°W↔120°E
  "Akse-45W":      "#88ff88",  // lysegrønn — akse 45°W↔135°E
  "Akse-30W":      "#ff8844",  // oransje — akse 30°W↔150°E
  "Akse-15W":      "#ff4488",  // rosa — akse 15°W↔165°E
  "Akse-0":        "#ffffff",  // hvit — akse 0°↔180°
  // v16.65: Antarktis-baser — lys cyan, godt synlig på hvit isring
  "Antarktis-Base": "#00d4ff",
  // Norge-fork 2026-05-31: 8 norske byer — sterkt rødt for kontrast mot grønn landfarge
  "Norge-test":     "#ff3333",
};

const FILTER_KEY = {
  "Ekvator":     "filt-equator",
  "Cancer":      "filt-cancer",
  "Capricorn":   "filt-capricorn",
  "Polarsirkel": "filt-arctic",
  "Struve":      "filt-port",
  "Megalithic":  "filt-megalithic",
  "Vendekrets-Monument": "filt-vendekretsmon",
  "Havn-Sor":      "filt-havn-sor",
  "Meridian-110E": "filt-mer-110e",
  "Meridian-150E": "filt-mer-150e",
  "Meridian-149W": "filt-mer-149w",
  "Meridian-70W":  "filt-mer-70w",  // v16.59
  // v16.62: Akse-verifikasjonspins styres av samme master-toggle som akselinjene.
  "Akse-60W":      "layer-antipodal-axes",
  "Akse-45W":      "layer-antipodal-axes",
  "Akse-30W":      "layer-antipodal-axes",
  "Akse-15W":      "layer-antipodal-axes",
  "Akse-0":        "layer-antipodal-axes",
  // v16.65: Antarktis-baser styres av egen toggle
  "Antarktis-Base": "layer-antarctica-bases",
  // Norge-fork 2026-05-31: Norge-test-byer styres av egen toggle
  "Norge-test":     "layer-norge-test",
};

// =================================================================
// THREE.JS — scene-oppsett
// =================================================================
const wrap = document.getElementById('canvas-wrap');
const canvas = document.getElementById('cv');
let cw = wrap.clientWidth, ch = wrap.clientHeight;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(cw, ch, false);
renderer.setClearColor(0x050505, 1);

const scene = new THREE.Scene();
// v16: fog og kamera tilpasset større disk (R_OUTER ≈ 31.4 scene-enheter)
scene.fog = new THREE.Fog(0x050505, 120, 300);

const camera = new THREE.PerspectiveCamera(50, cw / ch, 0.1, 2000);
camera.position.set(0, 100, 0.001);
camera.lookAt(0, 0, 0);

// Belysning — flat farger, men en dim ambient for stjernerne
scene.add(new THREE.AmbientLight(0xffffff, 0.75));
// Direksjonslys for at metalliske materialer får glans og skyggespill
const dirLight = new THREE.DirectionalLight(0xfff4d8, 1.1);
dirLight.position.set(20, 80, 30);
scene.add(dirLight);
const dirLight2 = new THREE.DirectionalLight(0xa0c0ff, 0.55);
dirLight2.position.set(-30, 60, -20);
scene.add(dirLight2);
const dirLight3 = new THREE.DirectionalLight(0xffe0a0, 0.45);
dirLight3.position.set(0, 40, -60);
scene.add(dirLight3);

// Miljs-tekstur for MeshStandardMaterial — gir ekte metallisk refleksjon (gull-glans).
// Bygges fra Three.js sin innebygde RoomEnvironment.
{
  const pmremGen = new THREE.PMREMGenerator(renderer);
  pmremGen.compileEquirectangularShader();
  const envScene = new RoomEnvironment();
  const envTex = pmremGen.fromScene(envScene, 0.04).texture;
  scene.environment = envTex;
  // Ikke sett scene.background — vi vil beholde den mørke bakgrunnen.
  pmremGen.dispose();
}

// =================================================================
// KAMERA-KONTROLL (vår egen — ikke OrbitControls, så vi kan gå under)
// =================================================================
const camState = {
  tilt: 90,      // 90 = rett ned, 0 = side, -90 = under
  rot: 0,        // horisontal rotasjon
  height: 0,     // ekstra høyde-offset (eye height)
  dist: 100,     // v16: økt fra 60 for å vise hele R_OUTER-disken
  target: new THREE.Vector3(0, 0, 0),
};

function applyCamera() {
  const tiltRad = camState.tilt * Math.PI / 180;
  const rotRad  = camState.rot  * Math.PI / 180;
  const desiredNear = Math.max(0.000001, Math.min(0.1, camState.dist * 0.001));
  if (Math.abs(camera.near - desiredNear) > desiredNear * 0.01) {
    camera.near = desiredNear;
    camera.updateProjectionMatrix();
  }
  // sfærisk -> kartesisk (offset fra target, ikke fra origo —
  // slik at pan blir en ren translasjon og ikke endrer synsvinkel)
  const r = camState.dist;
  const y = r * Math.sin(tiltRad) + camState.height * 0.4;
  const horiz = r * Math.cos(tiltRad);
  const x = horiz * Math.sin(rotRad);
  const z = horiz * Math.cos(rotRad);
  camera.position.set(
    camState.target.x + x,
    camState.target.y + y,
    camState.target.z + z
  );
  // Når kameraet står rett over kartet er Y-aksen parallell med blikkretningen.
  // Bruk scene-nord som up-vektor for en stabil top-down-matrise.
  if (Math.abs(horiz) < 0.0001) {
    camera.up.set(0, 0, -1);
  } else {
    camera.up.set(0, 1, 0);
  }
  camera.lookAt(camState.target);
}
applyCamera();

// =================================================================
// LAG-CONTAINERS (en Group pr lag — lett å toggle synlighet)
// =================================================================
const grpMap     = new THREE.Group(); grpMap.position.y     = Y_MAP;    scene.add(grpMap);
// Magnet-elementene leveres som en sub-gruppe av kartet (i sentrum, ikke under)
const grpMagnet  = new THREE.Group(); grpMap.add(grpMagnet);
const grpCelest  = new THREE.Group(); grpCelest.position.y  = Y_CELEST; scene.add(grpCelest);
const grpFirma   = new THREE.Group(); grpFirma.position.y   = Y_FIRMA;  scene.add(grpFirma);

// Sub-grupper for fin-toggling
const subMap = {
  grid: new THREE.Group(), coast: new THREE.Group(), ports: new THREE.Group(),
  equator: new THREE.Group(), cancer: new THREE.Group(), capricorn: new THREE.Group(),
  polarcircles: new THREE.Group(),
  meridians: new THREE.Group(), latcircles: new THREE.Group(), outerring: new THREE.Group(),
  squareGrid: new THREE.Group(),  // Kartesisk referanse-rutenett (1° lat = 110.593 km, GE-skala)
  gridFine: new THREE.Group(),    // v16.49: Finmasket 5°-edderkoppnett (72 meridianer + 5°-breddesirkler)
  geRing: new THREE.Group(),      // v16.53: GE-lengdegrad-tallring (0°, 5°E…) MELLOM Antarctica og kompass. Helt uavhengig av kompass/klokke.
  axis70w110e: new THREE.Group(), // v16.60: Antipodal akselinje 70°W ↔ 110°E (rett linje gjennom Nordpolen). Styres av Meridian-70W-toggle og/eller Meridian-110E-toggle.
  antipodalAxes: new THREE.Group(), // v16.61: Fem nye antipodal-akser (60W→60E avvik, 45W→45E, 30W→30E—faktisk 60W↔120E osv). Master-toggle layer-antipodal-axes.
  daynight: new THREE.Group(),
  clockSol: new THREE.Group(),   // Sol-klokke (Enok-tid, drives av sunLonAngle)
  clockAtom: new THREE.Group(),  // Atom-klokke (sann tid, drives av Date)
  norgeKart: new THREE.Group(),  // Beholdes tom for bakoverkompatibilitet; Norgeskart rendres som Leaflet i instrumentflaten.
};
Object.values(subMap).forEach(g => grpMap.add(g));

const subCel = {
  sun: new THREE.Group(), moon: new THREE.Group(),
};
subCel.equator = subMap.equator;
subCel.cancer = subMap.cancer;
subCel.capricorn = subMap.capricorn;
subCel.polarcircles = subMap.polarcircles;
// v16.34: equator/cancer/capricorn/polarcircles flyttet til Layer 1 (grpMap) etter Jone-Aase 2026-05-28.
// Sun og moon forblir på Layer 2 (grpCelest).
grpCelest.add(subCel.sun);
grpCelest.add(subCel.moon);

const subFirma = { polaris: new THREE.Group(), stars: new THREE.Group() };
Object.values(subFirma).forEach(g => grpFirma.add(g));

// ────────────────────────────────────────────────────────────────
// ENOK 72 PORT-SYSTEM — 12 porter på to akser (60°-øst og 300°-vest)
// ────────────────────────────────────────────────────────────────
// Geometri fra Ark T (One-voice-740-Perplexity-V5.xlsx), bekreftet av Jone-Aase:
//   - Sol-banene ligger som 192 konsentriske sirkler mellom Krepsens
//     vendekrets (+23.7° = innerst, sommer) og Steinbukkens vendekrets
//     (-23.7° = ytterst, vinter).
//   - 6 port-segmenter dekker hvert halvår. Mellom hvert segment står
//     en vegg (rad 28-29, 61-62, 93-94, 126-127, 158-159, 190-191, 223-224 i ark T).
//   - 60°-aksen (asimut 60°, oppe-til-høyre) bærer 6 øst-port-åpninger
//     der solen står opp.
//   - 300°-aksen (asimut 300°, oppe-til-venstre) bærer 6 vest-port-åpninger
//     der solen går ned.
//   - Aksene danner et V som peker oppover (mot Nor / nordpolen).
//   - Når man står på sør-siden (AU26=S) speilvendes høyre/venstre — men
//     fra Layer 1 sett ovenfra (nord-perspektiv) er øst alltid høyre.
// ────────────────────────────────────────────────────────────────

// Vegg-radene i ark T (1-indekserte rader for sol-banene)
const PORT_WALL_ROWS = [[28,29],[61,62],[93,94],[126,127],[158,159],[190,191],[223,224]];
// Sol-bane rad 31 = innerste (Krepsens, +23.7° N)
// Sol-bane rad 222 = ytterste (Steinbukkens, -23.7° S)
// 192 daglige baner. Lineær interpolering fra rad-indeks til breddegrad.
const PORT_ROW_FIRST = 31;
const PORT_ROW_LAST  = 222;
function portRowToLat(row) {
  const t = (row - PORT_ROW_FIRST) / (PORT_ROW_LAST - PORT_ROW_FIRST); // 0..1
  return 23.7 - t * (23.7 - (-23.7)); // +23.7° -> -23.7°
}
function portRowToRadius(row) { return latToR(portRowToLat(row)); }

// De to akse-vinklene (asimut målt i kompass-grader, 0 = N opp)
const AXIS_EAST_DEG = 60;
const AXIS_WEST_DEG = 300;
function axisToXZ(deg, r) {
  const a = (deg / 360) * Math.PI * 2;
  return { x: Math.sin(a) * r, z: -Math.cos(a) * r };
}

subCel.ports = new THREE.Group();
grpCelest.add(subCel.ports);

(function buildPortSystem() {
  // Farger
  const COL_AXIS    = 0xffd54a;  // gull-akse linje
  const COL_WALL    = 0xe06030;  // varm rød = vegg
  const COL_GATE    = 0x70d8ff;  // klar cyan = åpning (port)
  const COL_PATH    = 0x223040;  // dempet blå-grå = sol-bane skygge

  // --- 1) 192 sol-baner som svake konsentriske sirkler (Layer 2) ---
  for (let row = PORT_ROW_FIRST; row <= PORT_ROW_LAST; row++) {
    const r = portRowToRadius(row);
    const pts = [];
    const segs = 192;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
    }
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    // Hver 30. bane (port-grense) sterkere
    const isPortBoundary = ((row - PORT_ROW_FIRST) % 30) === 0;
    const m = new THREE.LineBasicMaterial({
      color: COL_PATH,
      transparent: true,
      opacity: isPortBoundary ? 0.42 : 0.14,
    });
    subCel.ports.add(new THREE.Line(g, m));
  }

  // --- 2) De to akse-linjene (fra Nor ut til ytre sol-bane) ---
  const rOuterPath = portRowToRadius(PORT_ROW_LAST); // Steinbukkens
  for (const deg of [AXIS_EAST_DEG, AXIS_WEST_DEG]) {
    const p1 = axisToXZ(deg, 0);
    const p2 = axisToXZ(deg, rOuterPath * 1.02);
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(p1.x, 0, p1.z),
      new THREE.Vector3(p2.x, 0, p2.z),
    ]);
    const m = new THREE.LineBasicMaterial({
      color: COL_AXIS, transparent: true, opacity: 0.55,
    });
    subCel.ports.add(new THREE.Line(g, m));
  }

  // --- 3) Vegg-segmenter på begge akser ---
  // Geometri fra Ark T + Jone-Aase 26. mai 2026:
  //   "Solen må kunne ha plass til 180 runder, 60 i hver port,
  //    derfor er det kun 2 grader til rammen eller søylen mellom hver port."
  // Tolkning:
  //   - 6 porter á 60 sol-runder (30 opp + 30 retur) = 360 sol-baner per akse,
  //     totalt 180 unike sol-baner mellom vendekretsene per halvår.
  //   - Hver vegg er smal: 2° azimut bue tvers på aksen. Det er den
  //     fysiske "søylen" mellom to porter.
  //   - Veggens radielle dybde tilsvarer 2 sol-baner i ark T (vegg-rad-paret)
  //     slik at den ligger eksakt mellom port-segmentene.
  const WALL_AZIMUTH_HALF_DEG = 1.0;  // halv-bue tvers (2° totalt)
  function buildQuad(c1, c2, c3, c4, color, opacity, yOffset) {
    const positions = new Float32Array([
      c1.x, yOffset, c1.z,
      c2.x, yOffset, c2.z,
      c3.x, yOffset, c3.z,
      c4.x, yOffset, c4.z,
    ]);
    const indices = new Uint16Array([0,1,2, 0,2,3]);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setIndex(new THREE.BufferAttribute(indices, 1));
    g.computeVertexNormals();
    const m = new THREE.MeshBasicMaterial({
      color, side: THREE.DoubleSide,
      transparent: true, opacity,
    });
    return new THREE.Mesh(g, m);
  }
  function buildWall(deg, rowA, rowB) {
    // Veggen er en SMAL BUE på 2° azimut (±1° fra aksen), i radial-spennet
    // fra ytre kant av forrige port til indre kant av neste port (rowA..rowB).
    // Bygges som et kile-formet quad i XZ-planet.
    const rIn  = portRowToRadius(rowA);
    const rOut = portRowToRadius(rowB);
    const aMid = (deg / 360) * Math.PI * 2;
    const half = (WALL_AZIMUTH_HALF_DEG / 360) * Math.PI * 2;
    const aMinus = aMid - half;
    const aPlus  = aMid + half;
    // Hjørner: indre-venstre, ytre-venstre, ytre-høyre, indre-høyre
    const c1 = { x: Math.sin(aMinus) * rIn,  z: -Math.cos(aMinus) * rIn  };
    const c2 = { x: Math.sin(aMinus) * rOut, z: -Math.cos(aMinus) * rOut };
    const c3 = { x: Math.sin(aPlus)  * rOut, z: -Math.cos(aPlus)  * rOut };
    const c4 = { x: Math.sin(aPlus)  * rIn,  z: -Math.cos(aPlus)  * rIn  };
    return buildQuad(c1, c2, c3, c4, COL_WALL, 0.92, 0.06);
  }

  for (const [rowA, rowB] of PORT_WALL_ROWS) {
    for (const deg of [AXIS_EAST_DEG, AXIS_WEST_DEG]) {
      subCel.ports.add(buildWall(deg, rowA, rowB));
    }
  }

  // --- 4) Port-åpninger — markert som lysende segmenter mellom vegger ---
  // Port N er sol-banene mellom vegg N og vegg N+1.
  // Port 1: rad 31-60 (etter åpning før første vegg)
  // Port 2: rad 63-92 osv.
  const PORT_SEGMENTS = [
    { num: 1, rowStart: 31,  rowEnd: 60  }, // 30 baner — Tebet
    { num: 2, rowStart: 63,  rowEnd: 92  }, // 30 — Shebat
    { num: 3, rowStart: 95,  rowEnd: 124 }, // 30 — Adar (vårjevndøgn)
    { num: 4, rowStart: 128, rowEnd: 157 }, // 30 — Abib (den store porten)
    { num: 5, rowStart: 160, rowEnd: 189 }, // 30 — Sivan
    { num: 6, rowStart: 192, rowEnd: 222 }, // 31 — Sivan/Tammuz (sommersolverv)
  ];

  // Port-åpning = lysende sone LANGS aksen mellom to vegger.
  // Den dekker alle sol-banene som tilhører denne porten.
  function buildGate(deg, rowStart, rowEnd, portNum) {
    const rStart = portRowToRadius(rowStart);
    const rEnd   = portRowToRadius(rowEnd);
    const a = (deg / 360) * Math.PI * 2;
    const dirX =  Math.sin(a);
    const dirZ = -Math.cos(a);
    const perpX = -dirZ;
    const perpZ =  dirX;
    const t = 0.55; // halv-bredde tvers på aksen
    const c1 = { x: dirX * rStart + perpX * t, z: dirZ * rStart + perpZ * t };
    const c2 = { x: dirX * rEnd   + perpX * t, z: dirZ * rEnd   + perpZ * t };
    const c3 = { x: dirX * rEnd   - perpX * t, z: dirZ * rEnd   - perpZ * t };
    const c4 = { x: dirX * rStart - perpX * t, z: dirZ * rStart - perpZ * t };
    return buildQuad(c1, c2, c3, c4, COL_GATE, 0.42, 0.03);
  }

  // Port-nummer-etiketter (canvas-tekstur)
  function makeGateLabel(text, color = 0x70d8ff) {
    const cv = document.createElement('canvas');
    cv.width = 128; cv.height = 128;
    const ctx = cv.getContext('2d');
    ctx.clearRect(0,0,128,128);
    ctx.fillStyle = '#' + color.toString(16).padStart(6, '0');
    ctx.font = 'bold 84px Cormorant Garamond, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 8;
    ctx.fillText(text, 64, 70);
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  for (const seg of PORT_SEGMENTS) {
    for (const deg of [AXIS_EAST_DEG, AXIS_WEST_DEG]) {
      subCel.ports.add(buildGate(deg, seg.rowStart, seg.rowEnd, seg.num));
      // Etikett midt i port-segmentet, litt utenfor aksen
      const rMid = (portRowToRadius(seg.rowStart) + portRowToRadius(seg.rowEnd)) / 2;
      const a = (deg / 360) * Math.PI * 2;
      const dirX =  Math.sin(a);
      const dirZ = -Math.cos(a);
      const perpX = -dirZ;
      const perpZ =  dirX;
      const labelOffset = 1.0;
      const lx = dirX * rMid + perpX * labelOffset;
      const lz = dirZ * rMid + perpZ * labelOffset;
      const labelTex = makeGateLabel(String(seg.num), 0xffe680);
      const spr = new THREE.Sprite(new THREE.SpriteMaterial({
        map: labelTex, transparent: true, opacity: 0.95, depthWrite: false,
      }));
      spr.position.set(lx, 0.15, lz);
      spr.scale.set(0.9, 0.9, 1);
      subCel.ports.add(spr);
    }
  }

  // --- 5) Endepunkt-dot på hver akse fjernet (v16.25)
  //     Jone-Aase 26. mai 2026: gul sirkel på ytterste bane i port 6 
  //     ble fjernet — den passet visuelt sammen med portene og ble
  //     forvirrende. Akse-endepunktet er nå bare selve linje-spissen.
})();

// =================================================================
// MAGNETISK NORD / AE-SENTRUM
// v16.36: Lilla glow-sirkel fjernet etter Jone-Aase 2026-05-28. grpMagnet beholdes tom.
// v16.34: Polaris-akse fjernet etter Jone-Aase 2026-05-28.
// =================================================================

// =================================================================
// AE-KART (tekstur å legge på Lag 1)
// =================================================================
// v16.63 (2026-05-30): Byttet fra FN-emblem (60°S yttergrense) til K2 Naturlig
// fra cartopy + Natural Earth 10m. Kartet dekker hele AE-projeksjonen fra
// Nordpolen (sentrum) til Sydpolen / Antarktis-yttergrense (-90°S) = R_OUTER.
// Tidligere: UN_MAP_RADIUS = R_OUTER * 150/180 (FN-emblemets 60°S-grense).
const UN_MAP_RADIUS = R_OUTER;  // 31.42 — kartet fyller hele disken ut til Antarktis-ytterring
// v16.49: FN-kart-rotasjon (grader). Positiv = mot klokken når sett ovenfra.
// Justerbart via UI-slider for å matche kartets Greenwich-meridian mot våre AE-koordinater.
let unMapRotationDeg = 0;
let unMapDiskRef = null;  // referanse til mesh slik at sliderene kan endre rotasjon uten ombygging
let norgeMapDiskRef = null;
let currentMapOpacity = 0.85;
{
  const loader = new THREE.TextureLoader();
  // v16.65: 8192x8192 hypsometrisk kart (WebP q85). Sahara sand, Amazonas grønn,
  // Himalaya hvit, hav-batymetri. Ren hvit isring fra -60S ut til disk-yttergrense
  // (Enok-modellens 'ismur rundt jordens ende').
  loader.load('un-map.webp?v=16.77', (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    // FN-emblemet (azimuthal equidistant, sentrert på Nordpolen) har
    // Greenwich-meridianen pekende nedover i bildet og 180°-meridianen oppover.
    // Tre.js CircleGeometry + rotation.x = -PI/2 mapper bildets «opp»-retning
    // til scene +Z og bildets «høyre» til scene +X.
    // Vår AE-konvensjon i scenen er lon=0 → scene -Z (opp på skjerm), +X = 90°Ø.
    // Det betyr: bildets «ned» (lon=0/Afrika) lander på scene -Z = opp på skjerm,
    // og bildets «høyre» (lon=90°Ø) lander på scene +X. Perfekt match uten rotasjon.
    const mapGeom = new THREE.CircleGeometry(UN_MAP_RADIUS, 128);
    const mapMat  = new THREE.MeshBasicMaterial({
      map: tex, transparent: true, opacity: 0.85,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const mapDisk = new THREE.Mesh(mapGeom, mapMat);
    mapDisk.rotation.x = -Math.PI / 2;  // legg flatt i XZ-planet
    // v16.49: rotation.z brukes til finjustering av Greenwich-orientering ift våre koordinater.
    mapDisk.rotation.z = unMapRotationDeg * Math.PI / 180;
    mapDisk.position.y = 0.04;
    mapDisk.userData.isUnMap = true;
    unMapDiskRef = mapDisk;
    subMap.coast.add(mapDisk);
  }, undefined, (err) => {
    console.warn('UN map texture failed to load:', err);
  });
}

// =================================================================
// NORGE-KART (Norge-fork)
// Kartverket skal inn som ekte Layer 1-basiskart, ikke som iframe og ikke
// samtidig med UN AE-kartet. Ingen manuell grid-tilpassing: rasteret må være
// bygget deterministisk fra offisielle koordinater og egen metadata.
// =================================================================
// Selve Leaflet/Kartverket-kartet initialiseres senere, når brukeren velger
// Norgeskart som Layer 1-basiskart.

// =================================================================
// BYGG LAG 1 — ENOK-KARTET
// =================================================================

function makeRing(radius, color, opacity = 1.0, segments = 256) {
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
  }
  const geom = new THREE.BufferGeometry().setFromPoints(pts);
  const mat  = new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity, depthTest: false });
  const ring = new THREE.Line(geom, mat);
  ring.renderOrder = 20;
  return ring;
}

function makeLatGrid(stepDeg, color, opacity) {
  const grp = new THREE.Group();
  for (let lat = -85; lat <= 85; lat += stepDeg) {
    if (lat === 0) continue;
    const r = latToR(lat);
    if (r <= 0) continue;
    const ring = makeRing(r, color, opacity);
    grp.add(ring);
  }
  return grp;
}

function makeMeridians(count, color, opacity) {
  const grp = new THREE.Group();
  for (let i = 0; i < count; i++) {
    const lon = (i * 360 / count) - 180;
    const p1 = aeProject(89.99, lon);
    const p2 = aeProject(-89.99, lon);
    const geom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(p1.x, 0, p1.z),
      new THREE.Vector3(p2.x, 0, p2.z),
    ]);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    grp.add(new THREE.Line(geom, mat));
  }
  return grp;
}

// Lat/long grid (5°)
let currentGridSize = 5;
function rebuildGrid(step) {
  subMap.grid.clear();
  subMap.grid.add(makeLatGrid(step, 0x3a5070, 0.30));
  subMap.grid.add(makeMeridians(36, 0x3a5070, 0.22));
}
rebuildGrid(5);

// =================================================================
// v16.60: Antipodal akselinje 70°W ↔ 110°E (rett linje gjennom Nordpolen)
// 70°W + 110°E = 180° forskjell → antipodale meridianer.
// På AE-disken danner de ÉN rett linje fra ytre ring (Sydhavet ved 70°W)
// gjennom Nordpolen (senter) og videre til ytre ring (Stillehavet ved 110°E).
// Lyserosa farge matcher Meridian-70W-pin-fargen (#ff88ff).
// =================================================================
function buildAxis70W110E() {
  const grp = subMap.axis70w110e;
  // Tøm gruppen først
  while (grp.children.length > 0) {
    const child = grp.children[0];
    grp.remove(child);
    if (child.geometry) child.geometry.dispose();
    if (child.material) child.material.dispose();
  }
  // Sydende av 70°W (lat = -89.99) til senter (Nordpolen ved lat = 89.99)
  // og videre til sydende av 110°E. Dette er ÉN rett linje gjennom origo.
  const pSouth70W  = aeProject(-89.99, -70);
  const pNorth     = { x: 0, z: 0 };  // Nordpolen = senter på AE-disken
  const pSouth110E = aeProject(-89.99, 110);
  const yLine = 0.02;  // litt over kartet for synlighet
  const geom = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(pSouth70W.x,  yLine, pSouth70W.z),
    new THREE.Vector3(pNorth.x,     yLine, pNorth.z),
    new THREE.Vector3(pSouth110E.x, yLine, pSouth110E.z),
  ]);
  const mat = new THREE.LineBasicMaterial({
    color: 0xff88ff,
    transparent: true,
    opacity: 0.85,
    linewidth: 2,
  });
  grp.add(new THREE.Line(geom, mat));
  // Default: skjult — vises når Meridian-70W eller Meridian-110E er på (binding lenger ned).
  grp.visible = false;
}
buildAxis70W110E();

// =================================================================
// v16.61: FEM NYE ANTIPODAL-AKSER (matematisk garanterte rette linjer
// gjennom Nordpolen i AE-projeksjonen). Hver akse er et meridian-par
// 180° fra hverandre. Master-toggle: layer-antipodal-axes.
// =================================================================
const ANTIPODAL_AXES_V1661 = [
  { lonA:  -60, lonB:  120, color: 0xffdd44, label: '60°W ↔ 120°E' },  // gul
  { lonA:  -45, lonB:  135, color: 0x88ff88, label: '45°W ↔ 135°E' },  // lysegrønn
  { lonA:  -30, lonB:  150, color: 0xff8844, label: '30°W ↔ 150°E' },  // oransje
  { lonA:  -15, lonB:  165, color: 0xff4488, label: '15°W ↔ 165°E' },  // rosa
  { lonA:    0, lonB:  180, color: 0xffffff, label: '0° (Greenwich) ↔ 180° (datolinjen)' },  // hvit
];
function buildAntipodalAxes() {
  const grp = subMap.antipodalAxes;
  // Tøm gruppen først
  while (grp.children.length > 0) {
    const child = grp.children[0];
    grp.remove(child);
    if (child.geometry) child.geometry.dispose();
    if (child.material) child.material.dispose();
  }
  const yLine = 0.02;
  for (const a of ANTIPODAL_AXES_V1661) {
    // Sydende av lonA → Nordpolen → sydende av lonB
    const pA = aeProject(-89.99, a.lonA);
    const pN = { x: 0, z: 0 };  // Nordpolen = senter
    const pB = aeProject(-89.99, a.lonB);
    const geom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(pA.x, yLine, pA.z),
      new THREE.Vector3(pN.x, yLine, pN.z),
      new THREE.Vector3(pB.x, yLine, pB.z),
    ]);
    const mat = new THREE.LineBasicMaterial({
      color: a.color,
      transparent: true,
      opacity: 0.75,
      linewidth: 2,
    });
    const line = new THREE.Line(geom, mat);
    line.userData = { axisLabel: a.label, lonA: a.lonA, lonB: a.lonB };
    grp.add(line);
  }
  grp.visible = true;  // default på
}
buildAntipodalAxes();

// v16.49: FINMASKET 5°-EDDERKOPPNETT (72 meridianer + 5°-breddesirkler)
// Aktiveres via egen toggle 'layer-grid-fine'. Uavhengig av standard-rutenettet.
function rebuildGridFine() {
  subMap.gridFine.clear();
  // 72 meridianer (én hver 5°), dempet teal-farge for å skille fra blå standard-grid
  subMap.gridFine.add(makeMeridians(72, 0x4a6878, 0.32));
  // Ekstra 5°-breddesirkler (samme farge for visuell konsistens)
}
rebuildGridFine();
subMap.gridFine.visible = false;  // av som default — bruker slår på

// =================================================================
// FIRKANTET REFERANSE-RUTENETT (kartesisk, GE-skala)
// =================================================================
// Skala: 1° lat = 110.593 km (Jone-Aase GE-måling: 1105.93 km mellom 0° og 10°N).
// Lengdegrader følger samme spacing (samme km-verdi som breddegradene).
// Rutenettet dekker hele disken (radius R_OUTER_KM = 31420.55 km).
// Bare linje-segmenter INNENFOR disken tegnes (Bresenham-cirkel-klipping ikke nødvendig
// fordi linjene er rette — vi klipper hver linje analytisk mot disk-radius).
const KM_PER_DEG_GE = 110.593;  // GE-skala (Jone-Aase 2026-05-28 02:35)

function makeSquareGrid(stepDeg, color, opacity, axisColor, axisOpacity) {
  const grp = new THREE.Group();
  const stepKm = stepDeg * KM_PER_DEG_GE;
  const stepU  = stepKm * SCALE;          // Three.js-enheter
  const Rdisk  = R_OUTER;                  // disk-grense (three-enheter)
  // Antall steg fra senter til disk-grense
  const maxStep = Math.ceil(Rdisk / stepU);

  // Hjelpe-funksjon: klipp en horisontal linje (z = const) mot disk-sirkelen
  // x^2 + z^2 <= Rdisk^2  →  |x| <= sqrt(Rdisk^2 - z^2)
  function clipX(z) {
    const d2 = Rdisk*Rdisk - z*z;
    if (d2 <= 0) return null;
    const x = Math.sqrt(d2);
    return { x1: -x, x2: x };
  }
  function clipZ(x) {
    const d2 = Rdisk*Rdisk - x*x;
    if (d2 <= 0) return null;
    const z = Math.sqrt(d2);
    return { z1: -z, z2: z };
  }

  // Horisontale linjer (konstant z, varierende x) — "breddegrader" i kartesisk skala
  for (let i = -maxStep; i <= maxStep; i++) {
    const z = i * stepU;
    const clip = clipX(z);
    if (!clip) continue;
    const isAxis = (i === 0);
    const c = isAxis ? axisColor : color;
    const o = isAxis ? axisOpacity : opacity;
    const geom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(clip.x1, 0, z),
      new THREE.Vector3(clip.x2, 0, z),
    ]);
    grp.add(new THREE.Line(geom, new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: o })));
  }
  // Vertikale linjer (konstant x, varierende z) — "lengdegrader" i kartesisk skala
  for (let i = -maxStep; i <= maxStep; i++) {
    const x = i * stepU;
    const clip = clipZ(x);
    if (!clip) continue;
    const isAxis = (i === 0);
    const c = isAxis ? axisColor : color;
    const o = isAxis ? axisOpacity : opacity;
    const geom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x, 0, clip.z1),
      new THREE.Vector3(x, 0, clip.z2),
    ]);
    grp.add(new THREE.Line(geom, new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: o })));
  }
  return grp;
}

function rebuildSquareGrid(step) {
  subMap.squareGrid.clear();
  // Normale linjer: lysegrå, akser: hvit og litt tydeligere
  subMap.squareGrid.add(makeSquareGrid(step, 0xaaaaaa, 0.25, 0xffffff, 0.55));
}
rebuildSquareGrid(5);
subMap.squareGrid.visible = false;  // av som default — brukeren skrur den på

// v16.35: Duplikat-ringer fjernet etter Jone-Aase 2026-05-28.
// Ekvator, vendekretser og polarsirkler vises na bare en gang, fra subCel.* gruppene (flyttet til Layer 1 i v16.34).
// Empiriske vendekrets-monument-ringene (23.5614/-23.4409) er ogsa fjernet visuelt -
// monumentene plottes fortsatt som individuelle gule markorer (VKM-01..14).

// Meridianer (12 hovedmeridianer)
subMap.meridians.add(makeMeridians(12, 0x556680, 0.45));

// Ytterring — den nye disk-grensen (31420.55 km = -90°S etter buestreng-uretting)
{
  const outerRing = makeRing(R_OUTER, 0xe07a7a, 0.85);
  subMap.outerring.add(outerRing);
  // glow-versjon innenfor
  const outerRing2 = makeRing(R_OUTER * 0.995, 0xe07a7a, 0.35);
  subMap.outerring.add(outerRing2);
  // v16: fyll-arealet mellom 2*R_EQUATOR og R_OUTER er borte fordi -90°S nå strekkes helt ut til R_OUTER.
  // Hele kartet fyller nå disken — ingen "tom sone" igjen.
}

// Kontinenter (forenklet kysstegning — punktverdier)
const COAST_SAMPLES = []; // hopper over for nå — krever data
// (vi hopper over kystlinjer, det er for omfattende å implementere her)

// Markører på kart
const markerMeshes = [];
const markerGroup = new THREE.Group();
subMap.ports.add(markerGroup);

function buildMarkers() {
  markerGroup.clear();
  markerMeshes.length = 0;
  for (const m of MARKERS) {
    const p = aeProject(m.lat, m.lon);
    const color = FARGER[m.g] || 0xffffff;
    const isArcticMarker = m.g === 'Polarsirkel';
    // Liten pin-stil markør (GE-stil) — sirkulær disk + tynn vertikal stilk
    const pinGroup = new THREE.Group();
    const geom = new THREE.SphereGeometry(isArcticMarker ? 0.006 : 0.055, 12, 12);
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: isArcticMarker,
      opacity: isArcticMarker ? 0.65 : 1,
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(0, isArcticMarker ? 0.03 : 0.08, 0);
    mesh.userData = m;
    pinGroup.add(mesh);
    // Tynn vertikal pin-stilk for synlighet
    const stalkGeom = new THREE.CylinderGeometry(
      isArcticMarker ? 0.0015 : 0.006,
      isArcticMarker ? 0.0015 : 0.006,
      isArcticMarker ? 0.025 : 0.07,
      6
    );
    const stalkMat = new THREE.MeshBasicMaterial({ color, opacity: 0.7, transparent: true });
    const stalk = new THREE.Mesh(stalkGeom, stalkMat);
    stalk.position.set(0, isArcticMarker ? 0.012 : 0.035, 0);
    pinGroup.add(stalk);
    // v16.39: Usynlig hit-sphere for lettere klikk-treff (~2x større radius enn synlig pin)
    const hitGeom = new THREE.SphereGeometry(0.14, 8, 8);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitMesh = new THREE.Mesh(hitGeom, hitMat);
    hitMesh.position.set(0, 0.08, 0);
    hitMesh.userData = m;
    pinGroup.add(hitMesh);
    pinGroup.position.set(p.x, 0, p.z);
    markerGroup.add(pinGroup);
    // Begge meshes legges i markerMeshes — raycaster treffer det som er nærmest
    markerMeshes.push(mesh);
    markerMeshes.push(hitMesh);
  }
}
buildMarkers();

// =================================================================
// BYGG LAG 2 — SOL, MÅNE, RINGER
// =================================================================
// v16.35: En ring per breddegrad etter Jone-Aase 2026-05-28. Duplikater i subMap.grid og subMap.latcircles
// er fjernet under. Ekvator, Cancer og Capricorn vises som EN ring her, ikke som Ark T + empirisk par.
subMap.equator.add(makeRing(latToR(0), 0xc9a247, 0.85));  // v16.38: latToR(0) = 15710 km, samme radius som ekvator-punktene (Pyramid of Oyambaro, Pontianak, Quitsato). v16.37: gull.
// Krepsens og Steinbukkens vendekrets ved 23.7° (Enoks port-yttergrenser, master-kalender Ark T H212)
subMap.cancer.add(makeRing(latToR(23.7), 0xe0c060, 0.85));
subMap.capricorn.add(makeRing(latToR(-23.7), 0xc08040, 0.85));
subMap.polarcircles.add(makeRing(latToR(66.5634), 0x7090c0, 0.85));
subMap.polarcircles.add(makeRing(latToR(-66.5634), 0x7090c0, 0.85));

// Sol (v16.25: redusert til størrelsen på ark-T-sol-bane-prikken, 0.18)
const sunMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.18, 24, 24),
  new THREE.MeshBasicMaterial({ color: 0xffd860 })
);
const sunGlow = new THREE.Mesh(
  new THREE.SphereGeometry(0.32, 24, 24),
  new THREE.MeshBasicMaterial({ color: 0xffd860, transparent: true, opacity: 0.25 })
);
subCel.sun.add(sunMesh); subCel.sun.add(sunGlow);

// Måne
const moonMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.35, 20, 20),
  new THREE.MeshBasicMaterial({ color: 0xd0d0e0 })
);
subCel.moon.add(moonMesh);
subCel.moon.visible = false; // av som default

// =================================================================
// SOL-BANE RING — dynamisk ring som viser solens nåværende breddegrad
// =================================================================
// Hovedring (gul, halvtransparent)
let sunPathRing = makeRing(latToR(0), 0xffd860, 0.55, 256);
subCel.sun.add(sunPathRing);
// Pulserende indre ring (lysere gul, animert opacity)
let sunPathPulse = makeRing(latToR(0), 0xffe890, 0.9, 256);
subCel.sun.add(sunPathPulse);

function updateSunPath(lat) {
  const r = latToR(lat);
  // Bytt ut geometri-punktene på begge ringene
  const pts = [];
  const segs = 256;
  for (let i = 0; i <= segs; i++) {
    const a = (i / segs) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
  }
  sunPathRing.geometry.dispose();
  sunPathRing.geometry = new THREE.BufferGeometry().setFromPoints(pts);
  sunPathPulse.geometry.dispose();
  sunPathPulse.geometry = new THREE.BufferGeometry().setFromPoints(pts);
}

// =================================================================
// DAG / NATT / SKUMRING — opplyst sone på Lag 1
// =================================================================
// I AE-modellen: solens fotpunkt = (lat=sunLat, lon=sunLonAngle).
// Opplyst-sone = sirkel rundt fotpunktet med radius ~10 000 km (en kvart omkrets).
// Skumring = ring på kanten av denne flekken (±300 km).

const DAY_RADIUS_KM = 10001.47;      // En kvart omkrets — grensa for opplyst sone
const TWILIGHT_KM   = 350;           // Bredde på skumringsbeltet
const DAY_RADIUS    = DAY_RADIUS_KM * SCALE;
const TWILIGHT_R    = TWILIGHT_KM * SCALE;

// Dag-flekk: gul transparent sirkel
const dayDiskGeom = new THREE.CircleGeometry(DAY_RADIUS, 96);
const dayDiskMat  = new THREE.MeshBasicMaterial({
  color: 0xffe070, transparent: true, opacity: 0.18, side: THREE.DoubleSide,
});
const dayDisk = new THREE.Mesh(dayDiskGeom, dayDiskMat);
dayDisk.rotation.x = -Math.PI / 2;
dayDisk.position.y = 0.03; // litt over kartet
subMap.daynight.add(dayDisk);

// Skumringsbelte: tynn ring på grensa
const twilightGeom = new THREE.RingGeometry(DAY_RADIUS - TWILIGHT_R, DAY_RADIUS + TWILIGHT_R, 96);
const twilightMat  = new THREE.MeshBasicMaterial({
  color: 0xff8030, transparent: true, opacity: 0.35, side: THREE.DoubleSide,
});
const twilightRing = new THREE.Mesh(twilightGeom, twilightMat);
twilightRing.rotation.x = -Math.PI / 2;
twilightRing.position.y = 0.04;
subMap.daynight.add(twilightRing);

// Natt-overlay: stor mørk disk over hele kartet (under dag-flekken)
const nightGeom = new THREE.CircleGeometry(R_OUTER, 128);
const nightMat  = new THREE.MeshBasicMaterial({
  color: 0x000a18, transparent: true, opacity: 0.45, side: THREE.DoubleSide,
});
const nightOverlay = new THREE.Mesh(nightGeom, nightMat);
nightOverlay.rotation.x = -Math.PI / 2;
nightOverlay.position.y = 0.02; // under dag/skumring
subMap.daynight.add(nightOverlay);

function updateDayNight() {
  // Solens fotpunkt på disken (samme som sunMesh.position på Lag 1)
  // v16.19: justert konvensjon slik at sunLonAngle=0 → -Z (kl 12)
  const r = latToR(sunLat);
  const a = sunLonAngle * Math.PI / 180;
  const x = r * Math.sin(a);
  const z = -r * Math.cos(a);
  dayDisk.position.set(x, 0.03, z);
  twilightRing.position.set(x, 0.04, z);
}

// Av som default — toggles via UI-knapp
subMap.daynight.visible = false;

// =================================================================
// TO 12-TIMERS URSKIVER (LAG 1)
//   1) clockSol — Sol-klokke (Enok-tid, drives av sunLonAngle)
//   2) clockAtom — Atom-klokke (sann tid, drives av Date + tidssone)
// =================================================================
const CLOCK_Y_SOL = 0.05;
const CLOCK_Y_ATOM = 0.08;  // litt over sol-klokken for å unngå z-fighting

// Bygg sol-klokken: stor stil — tallene utenfor disken, viserne ut til ytterste diameter.
// Solen er selve tuppen på timeviseren (ligger over på subCel.sun, så vi tegner ingen time-stang).
function buildClock(group, opts) {
  const {
    radius, yPos, colorRing, colorMin, colorSec, colorFace, numerals,
    faceOpacity = 0.10, showFace = true,
  } = opts;

  // Tom gruppen først (så vi kan bygge om ved radius-endring)
  while (group.children.length) {
    const c = group.children.pop();
    if (c.geometry) c.geometry.dispose();
    if (c.material) {
      if (c.material.map) c.material.map.dispose();
      c.material.dispose();
    }
  }

  // Bakgrunns-skive (svært subtil — den ligger over kartet)
  if (showFace) {
    const face = new THREE.Mesh(
      new THREE.RingGeometry(radius * 0.02, radius * 1.0, 128),
      new THREE.MeshBasicMaterial({ color: colorFace, transparent: true, opacity: faceOpacity, side: THREE.DoubleSide })
    );
    face.rotation.x = -Math.PI / 2;
    face.position.y = yPos - 0.005;
    group.add(face);
  }

  // Ytre ring (akkurat på ytterste diameter)
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(radius * 1.00, radius * 1.015, 128),
    new THREE.MeshBasicMaterial({ color: colorRing, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = yPos;
  group.add(ring);

  // 18-delt urskive: 18 hovedmerker + 3 submerker mellom (totalt 18×4 = 72 tikk).
  // Hver hovedmerke = én Enok-time (1/18 av rotasjon). 4 sub-tikk = kvarter.
  const SUBDIVISIONS = 4; // 4 × 18 = 72 tikk totalt (sammenfaller med Enok 72-systemet)
  const TOTAL_TICKS = 18 * SUBDIVISIONS;
  for (let m = 0; m < TOTAL_TICKS; m++) {
    const isHour = m % SUBDIVISIONS === 0;
    const a = (m / TOTAL_TICKS) * Math.PI * 2 - Math.PI / 2;
    const r1 = radius * 1.02;
    const r2 = isHour ? radius * 1.07 : radius * 1.04;
    const geom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(Math.cos(a) * r1, yPos, Math.sin(a) * r1),
      new THREE.Vector3(Math.cos(a) * r2, yPos, Math.sin(a) * r2),
    ]);
    const mat = new THREE.LineBasicMaterial({
      color: colorRing,
      transparent: true, opacity: isHour ? 1.0 : 0.45,
    });
    group.add(new THREE.Line(geom, mat));
  }

  // Yttre Helvetica-tallring fjernet — duplikatet med indre serif-tall.
  // Ytre ring ved radius * 1.12 holdes nå tom for kommende 360°-kompass.

  // ────────────────────────────────────────────────────────────────
  // INDRE 18-DELT RING — Enoks portsystem (1 dag = 18 deler)
  //   Dag-halvdel: 0–9 (gylden bue)
  //   Natt-halvdel: 9–18 (dyp midnattblå bue)
  //   Jevndogn-akse: 9-merket og 0/18-merket markert med trekanter
  // ────────────────────────────────────────────────────────────────
  const enokRingR = radius * 0.74;       // indre 18-ring-radius
  const enokRingThickness = radius * 0.10;

  // Dag-bue (kl 0 → kl 9 i Enok-tid = de 9 første 18-delene)
  // Bygges som RingGeometry med thetaStart og thetaLength.
  // Three.js RingGeometry: theta måles fra +X-aksen, mot klokken. Vi vil at "kl 12" = -Z = theta = -π/2.
  // Dag = halve som starter ved "kl 0 = bunn = +Z = theta = π/2" og går til "kl 12 = -Z = theta = -π/2",
  // men siden ringen går mot klokken: thetaStart = -π/2 (kl 12), thetaLength = π betyr fra kl 12 mot kl 6 langs høyre side.
  // Enklere: tegn to halv-ringer der "opp" (mot kl 12) er dag-grense, "ned" (mot kl 6) er andre dag-grense.
  // I vår konvensjon: sunLonAngle = 0 = midnatt = -Z = kl 0 øverst. Soloppgang ved 90°, høyest ved 180°, nedgang ved 270°.
  // Det betyr: deler 0–9 (dag) skal være den HVITE halvdelen pekende NED (mot kl 6 = solens høyeste posisjon i vår konvensjon).
  // Men da blir det rotete. Bedre: vi tegner ringen rotert slik at del-0 ligger øverst (kl 12) og går mot klokken.
  // Bruker SHAPE i stedet for RingGeometry for full kontroll:
  function enokSectorMesh(startDel, endDel, color, opacity) {
    const innerR = enokRingR - enokRingThickness * 0.5;
    const outerR = enokRingR + enokRingThickness * 0.5;
    const a0 = (startDel / 18) * Math.PI * 2 - Math.PI / 2; // del 0 = kl 12 (øverst)
    const a1 = (endDel   / 18) * Math.PI * 2 - Math.PI / 2;
    const shape = new THREE.Shape();
    const steps = 48;
    shape.moveTo(Math.cos(a0) * innerR, Math.sin(a0) * innerR);
    for (let i = 0; i <= steps; i++) {
      const a = a0 + (a1 - a0) * (i / steps);
      shape.lineTo(Math.cos(a) * outerR, Math.sin(a) * outerR);
    }
    for (let i = steps; i >= 0; i--) {
      const a = a0 + (a1 - a0) * (i / steps);
      shape.lineTo(Math.cos(a) * innerR, Math.sin(a) * innerR);
    }
    const g = new THREE.ShapeGeometry(shape);
    g.rotateX(-Math.PI / 2);
    const mesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({
      color, transparent: true, opacity, side: THREE.DoubleSide,
    }));
    mesh.position.y = yPos + 0.005;
    return mesh;
  }
  // Dag-bue (deler 0–9): gylden, varm
  group.add(enokSectorMesh(0, 9, 0xc9a247, 0.32));
  // Natt-bue (deler 9–18): midnattblå
  group.add(enokSectorMesh(9, 18, 0x0a1830, 0.55));

  // 18 tikk-markeringer rundt indre ring
  for (let d = 0; d < 18; d++) {
    const a = (d / 18) * Math.PI * 2 - Math.PI / 2;
    const isJevndogn = (d === 0 || d === 9);
    const r1 = enokRingR - enokRingThickness * 0.55;
    const r2 = enokRingR + enokRingThickness * (isJevndogn ? 0.75 : 0.55);
    const geom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(Math.cos(a) * r1, yPos + 0.01, Math.sin(a) * r1),
      new THREE.Vector3(Math.cos(a) * r2, yPos + 0.01, Math.sin(a) * r2),
    ]);
    const mat = new THREE.LineBasicMaterial({
      color: isJevndogn ? 0xffd870 : 0xc9a247,
      transparent: true, opacity: isJevndogn ? 1.0 : 0.65,
      linewidth: isJevndogn ? 3 : 1,
    });
    group.add(new THREE.Line(geom, mat));
  }

  // Tall 1–18 i smal serif på indre radius
  function makeEnokNumeralSprite(text, sizePx, color) {
    // Høy oppløsning for skarp tekst — canvas 4x sizePx
    const SS = 4; // super-sampling faktor
    const c = document.createElement('canvas');
    c.width = sizePx * SS; c.height = sizePx * SS;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const fontPx = Math.floor(sizePx * SS * 0.78);
    ctx.font = `400 ${fontPx}px 'Cormorant Garamond', 'Times New Roman', serif`;
    const cx = c.width / 2, cy = c.height / 2;
    // Mørk stroke for kontrast mot bakgrunn
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.strokeStyle = 'rgba(20,14,0,0.75)';
    ctx.lineWidth = Math.max(1.5, fontPx * 0.03);
    ctx.strokeText(text, cx, cy);
    // Hovedfyll
    ctx.fillStyle = color;
    ctx.fillText(text, cx, cy);
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 8;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    tex.needsUpdate = true;
    const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: true }));
    spr.scale.set(radius * 0.07, radius * 0.07, 1);
    return spr;
  }
  for (let d = 1; d <= 18; d++) {
    const a = (d / 18) * Math.PI * 2 - Math.PI / 2;
    const rad = radius * 0.96; // like innenfor ytterkanten av disken (radius * 1.0)
    const col = '#ffd54a'; // klar varm gull — alle 18 tall likeverdige (port-markører får egen farge senere)
    const spr = makeEnokNumeralSprite(String(d), 80, col);
    spr.position.set(Math.cos(a) * rad, yPos + 0.06, Math.sin(a) * rad);
    group.add(spr);
  }

  // ────────────────────────────────────────────────────────────────
  // 360° kompass-skala (ytre ring, uten N/S/Ø/V-bokstaver)
  // v16.49: Bygges som egen undergruppe slik at klokke og kompass kan toggles uavhengig.
  // Funksjonsparameter 'group' rebindes til compassGroup i kompass-seksjonen,
  // og restaureres til __origGroup før N-mesh og Enok-trekanter bygges (de hører til urskiven).
  // ────────────────────────────────────────────────────────────────
  const __origGroup = group;
  const compassGroup = new THREE.Group();
  compassGroup.userData.isCompass = true;
  __origGroup.add(compassGroup);
  __origGroup.userData.compass = compassGroup;
  // Rebind 'group' til compassGroup slik at alle 'group.add(...)' i denne seksjonen treffer kompasset.
  group = compassGroup;

  function makeDegreeSprite(text, sizePx, color, weight) {
    const SS = 4;
    const c = document.createElement('canvas');
    c.width = sizePx * SS; c.height = sizePx * SS;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const fontPx = Math.floor(sizePx * SS * 0.62);
    ctx.font = `${weight} ${fontPx}px 'Cormorant Garamond', 'Times New Roman', serif`;
    const cx = c.width / 2, cy = c.height / 2;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(20,14,0,0.7)';
    ctx.lineWidth = Math.max(1.2, fontPx * 0.025);
    ctx.strokeText(text, cx, cy);
    ctx.fillStyle = color;
    ctx.fillText(text, cx, cy);
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 8;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    tex.needsUpdate = true;
    const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: true }));
    return spr;
  }

  // v16.53: Kompass tilbake til strammere posisjon (GE-tall ligger nå i egen subMap.geRing-gruppe utenfor).
  // Ny rekkefølge innenfra og ut:
  //   kart → Antarctica-ring (R_OUTER) → GE-tall (subMap.geRing, R_OUTER × 1.030–1.065) → kompass-innerring (1.080) → kompass-ticks (1.085–1.155) → kompass-tall (1.168–1.265) → kompass-ytterring (1.295)
  // Kompassets to gull-sirkler er LAGT TILBAKE som bakgrunn rundt kompassdelen.
  const compassInnerR  = radius * 1.080;  // gull-bakgrunnsring innerst rundt kompasset
  const compassOuterR  = radius * 1.295;  // gull-bakgrunnsring ytterst
  const tickStartR     = radius * 1.085;
  const tickEndMinor   = radius * 1.105;  // 1° ticks
  const tickEndMid     = radius * 1.120;  // 5° ticks
  const tickEndMajor   = radius * 1.140;  // 10° ticks
  const tickEndCardinal= radius * 1.155;  // 90° ticks (kardinaler)
  const degLabelR      = radius * 1.195;  // alle 360 grad-tall (mellomradius for 1°)
  const cardinalR      = radius * 1.240;  // ekstra fremheving for 0/90/180/270

  // Indre og ytre gull-sirkel som rammer kompass-ringen (v16.53: tilbake fra v16.52)
  function makeRingCircle(r, color, opacity, y) {
    const segments = 720;
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.sin(a) * r, y, -Math.cos(a) * r));
    }
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
    return new THREE.Line(g, m);
  }
  group.add(makeRingCircle(compassInnerR, 0xffd54a, 0.85, yPos + 0.035));
  group.add(makeRingCircle(compassOuterR, 0xffd54a, 0.85, yPos + 0.035));
  // To tynne dempede mellomringer for ekstra dybde
  group.add(makeRingCircle(radius * 1.160, 0x8a7048, 0.35, yPos + 0.035)); // skille mellom ticks og 1°-tall
  group.add(makeRingCircle(radius * 1.220, 0x8a7048, 0.30, yPos + 0.035)); // skille mellom 5° og 10°/kardinaler

  // 360 tick-merker, ett per grad. Hver 10. er lang, hver 90. (kardinal) ekstra lang.
  for (let deg = 0; deg < 360; deg++) {
    // a = 0 ved N (toppen). Kompass går med klokken: øst = 90°, sør = 180°, vest = 270°.
    // x = sin(a), z = -cos(a) gir N på -z (samme retning som 18/0-aksen).
    const a = (deg / 360) * Math.PI * 2;
    const isCardinal = (deg % 90 === 0);
    const isMajor = (deg % 10 === 0);
    const isMid   = (deg % 5 === 0);
    const outerR = isCardinal ? tickEndCardinal : (isMajor ? tickEndMajor : (isMid ? tickEndMid : tickEndMinor));
    const x1 = Math.sin(a) * tickStartR;
    const z1 = -Math.cos(a) * tickStartR;
    const x2 = Math.sin(a) * outerR;
    const z2 = -Math.cos(a) * outerR;
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x1, yPos + 0.04, z1),
      new THREE.Vector3(x2, yPos + 0.04, z2),
    ]);
    const m = new THREE.LineBasicMaterial({
      color: isCardinal ? 0xffe680 : (isMajor ? 0xffd54a : (isMid ? 0xc8a060 : 0x8a7048)),
      transparent: true,
      opacity: isCardinal ? 1.0 : (isMajor ? 0.9 : (isMid ? 0.65 : 0.42)),
    });
    group.add(new THREE.Line(g, m));
  }

  // v16.51: Helper beholdes (brukes av GE-tallringen utenfor R_OUTER lenger ned).
  // De gamle 360 grad-tallene inni kompasset er fjernet — kun ticks/streker beholdes som skala.
  function makeDegreeText(text, color, weight, sizePx) {
    // Returnerer et plant mesh som ligger flatt i xz-planet og kan roteres rundt y.
    const SS = 4;
    const c = document.createElement('canvas');
    c.width = sizePx * SS; c.height = sizePx * SS;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const fontPx = Math.floor(sizePx * SS * 0.7);
    ctx.font = `${weight} ${fontPx}px 'Cormorant Garamond', 'Times New Roman', serif`;
    const cx = c.width / 2, cy = c.height / 2;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(20,14,0,0.65)';
    ctx.lineWidth = Math.max(1.0, fontPx * 0.022);
    ctx.strokeText(text, cx, cy);
    ctx.fillStyle = color;
    ctx.fillText(text, cx, cy);
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 16;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    tex.needsUpdate = true;
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthTest: true, side: THREE.DoubleSide });
    const geo = new THREE.PlaneGeometry(1, 1);
    geo.rotateX(-Math.PI / 2); // ligger flatt på xz-planet, teksten oppover
    return new THREE.Mesh(geo, mat);
  }

  // v16.52: 360 grad-tall (0–359) LAGT TILBAKE inni kompasset — dette er kompassets egne tall.
  // v16.53: GE-tallringen flyttet til egen subMap.geRing-gruppe (utenfor kompasset) — helt uavhengig.
  // Radius-soner for grad-tallene (nærmere ticks = mindre tall)
  const r1deg  = radius * 1.168;  // hver 1° — små tall like utenfor ticks
  const r5deg  = radius * 1.198;  // hver 5°
  const r10deg = radius * 1.230;  // hver 10°
  const rCard  = radius * 1.265;  // kardinaler

  for (let deg = 0; deg < 360; deg++) {
    const a = (deg / 360) * Math.PI * 2;
    const isCardinal = (deg % 90 === 0);
    const isMajor = (deg % 10 === 0);
    const isMid   = (deg % 5 === 0);
    let r, scale, weight, color;
    if (isCardinal) {
      r = rCard; scale = radius * 0.080; weight = '500'; color = '#ffe680';
    } else if (isMajor) {
      r = r10deg; scale = radius * 0.052; weight = '500'; color = '#ffd54a';
    } else if (isMid) {
      r = r5deg; scale = radius * 0.034; weight = '400'; color = '#c8a060';
    } else {
      r = r1deg; scale = radius * 0.018; weight = '400'; color = '#9a7e50';
    }
    const x = Math.sin(a) * r;
    const z = -Math.cos(a) * r;
    const mesh = makeDegreeText(String(deg), color, weight, 96);
    mesh.scale.set(scale, 1, scale);
    mesh.position.set(x, yPos + 0.06, z);
    // Roter slik at teksten peker radielt utover ("bunnen mot sentrum")
    mesh.rotation.y = -a;
    group.add(mesh);
  }

  // ────────────────────────────────────────────────────────────────
  // v16.49: EKSTRA FINMASKET 5°-RING (72 tall, kobles til 'gridFine'-toggle)
  // Egen undergruppe slik at den kan toggles separat fra hovedkompasset.
  // ────────────────────────────────────────────────────────────────
  const fineRingGroup = new THREE.Group();
  fineRingGroup.userData.isFineRing = true;
  group.add(fineRingGroup);
  __origGroup.userData.fineRing = fineRingGroup;
  // Ring-radius mellom kompass-ytre og N-bokstav: bruk en sone nedover (nærmere disken)
  const fineLabelR = radius * 0.97;  // litt innenfor compassInnerR (1.02) - mellom kart og kompass-ticks
  const fineTickStartR = radius * 0.985;
  const fineTickEndR   = radius * 0.998;
  // 72 tick-merker (hver 5°)
  for (let i = 0; i < 72; i++) {
    const deg = i * 5;
    const a = (deg / 360) * Math.PI * 2;
    const x1 = Math.sin(a) * fineTickStartR;
    const z1 = -Math.cos(a) * fineTickStartR;
    const x2 = Math.sin(a) * fineTickEndR;
    const z2 = -Math.cos(a) * fineTickEndR;
    const isMajor = (deg % 10 === 0);
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x1, yPos + 0.045, z1),
      new THREE.Vector3(x2, yPos + 0.045, z2),
    ]);
    const m = new THREE.LineBasicMaterial({
      color: isMajor ? 0x80c8d0 : 0x4a8088,
      transparent: true, opacity: isMajor ? 0.85 : 0.55,
    });
    fineRingGroup.add(new THREE.Line(g, m));
  }
  // v16.51: 72 teal 5°-tall FJERNET — kun ticks beholdes som skala.
  // GE-tallringen (under) er nå den eneste numeriske skalaen, plassert UTENFOR ytre ring.

  // ────────────────────────────────────────────────────────────────
  // v16.53: GE-LENGDEGRAD-RING er FLYTTET UT av buildClock() til egen funksjon buildGeRing()
  // som plasserer tallene i subMap.geRing (helt uavhengig av kompass/klokke).
  // Se buildGeRing() nedenfor (kjeres en gang fra init). Den styres KUN av layer-grid-toggelen.
  // ────────────────────────────────────────────────────────────────

  // Av som default — styres av layer-grid-toggle (slått sammen med GE grid)
  fineRingGroup.visible = false;

  // N-bokstav i sentrum — ligger flatt over senterfestet (hub topp = yPos + 0.30)
  // Bruker en dedikert tegnefunksjon med kraftig kontrast mot gull-hubben
  function makeCenterN() {
    const SS = 4;
    const sizePx = 160;
    const c = document.createElement('canvas');
    c.width = sizePx * SS; c.height = sizePx * SS;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const fontPx = Math.floor(sizePx * SS * 0.72);
    ctx.font = `600 ${fontPx}px 'Cormorant Garamond', 'Times New Roman', serif`;
    const cx = c.width / 2, cy = c.height / 2;
    // Kraftig mørk halo / stroke for sterk kontrast mot gull
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(0,0,0,0.95)';
    ctx.lineWidth = Math.max(6, fontPx * 0.10);
    ctx.strokeText('N', cx, cy);
    // Lysere stroke utenpå for ekstra dybde
    ctx.strokeStyle = 'rgba(40,28,8,0.6)';
    ctx.lineWidth = Math.max(3, fontPx * 0.04);
    ctx.strokeText('N', cx, cy);
    // Hovedfyll: kjølig elfenben/sølv-hvit for kontrast mot varm gull
    ctx.fillStyle = '#fafaf2';
    ctx.fillText('N', cx, cy);
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 16;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    tex.needsUpdate = true;
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthTest: true, side: THREE.DoubleSide });
    const geo = new THREE.PlaneGeometry(1, 1);
    geo.rotateX(-Math.PI / 2);
    return new THREE.Mesh(geo, mat);
  }
  const nMesh = makeCenterN();
  // Litt mindre enn før og finsentrert. PlaneGeometry(1,1) er sentrert i origo,
  // men Cormorant 'N' har smål optisk asymmetri — kompenseres med liten z-offset.
  nMesh.scale.set(radius * 0.062, 1, radius * 0.062);
  nMesh.position.set(0, yPos + 0.34, 0);
  nMesh.rotation.y = Math.PI;
  group.add(nMesh);

  // v16.49: Restaurer 'group' til urskiven før Jevndogn-trekanter og visere (de hører til klokken, ikke kompasset)
  group = __origGroup;

  // Jevndogn-trekanter (små indikatorer på 0/18-aksen og 9-aksen)
  function jevndognTriangle(delPos, color) {
    const a = (delPos / 18) * Math.PI * 2 - Math.PI / 2;
    const r = enokRingR + enokRingThickness * 0.65;
    const size = radius * 0.025;
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(-size * 0.5, -size);
    shape.lineTo( size * 0.5, -size);
    shape.lineTo(0, 0);
    const g = new THREE.ShapeGeometry(shape);
    g.rotateX(-Math.PI / 2);
    const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({
      color, metalness: 1.0, roughness: 0.25,
      emissive: 0x402810, emissiveIntensity: 0.4, side: THREE.DoubleSide,
    }));
    m.position.set(Math.cos(a) * r, yPos + 0.08, Math.sin(a) * r);
    m.rotation.y = -a + Math.PI / 2; // peker mot sentrum
    return m;
  }
  group.add(jevndognTriangle(0, 0xffd870));   // kl 0 / 18 = midnatt-aksen
  group.add(jevndognTriangle(9, 0xffd870));   // jevndogn-grensen (dag-natt skille)

  // Ingen time-viser — solen (på subCel.sun, høyere lag) er tuppen.

  // ────────────────────────────────────────────────────────────────
  // Sveitsisk Rolex-stil viser-former (Shape + ExtrudeGeometry)
  //  - Lansett-spiss (bred, taperer mot punkt)
  //  - Smal hals
  //  - Sirkulær lume-plot nær spissen
  //  - Sekundviser: tynn nål + motvekt (Rolex-stil)
  // Hver viser-mesh er en gruppe (Group) som har sin akse i origo og peker mot -Z (oppover skjårmen i top-down).
  // ────────────────────────────────────────────────────────────────

  // Ekte gull-materiale: MeshStandardMaterial med høy metalness
  function goldMat() {
    return new THREE.MeshStandardMaterial({
      color: 0xd4af37,         // klassisk 18k gull
      metalness: 1.0,
      roughness: 0.28,
      emissive: 0x3a2a08,
      emissiveIntensity: 0.15,
      side: THREE.DoubleSide,
    });
  }
  // Mørk gull/bronse for timeviseren — slik at den står tydelig mot lysere minutt/sek-visere
  function darkGoldMat() {
    return new THREE.MeshStandardMaterial({
      color: 0x6b4a14,         // mørk antikk-gull / bronse
      metalness: 1.0,
      roughness: 0.45,
      emissive: 0x1a1004,
      emissiveIntensity: 0.08,
      side: THREE.DoubleSide,
    });
  }
  function steelMat() {
    return new THREE.MeshStandardMaterial({
      color: 0xeae0c8, metalness: 1.0, roughness: 0.20,
      emissive: 0x222018, emissiveIntensity: 0.1, side: THREE.DoubleSide,
    });
  }
  function redLacquerMat() {
    return new THREE.MeshStandardMaterial({
      color: 0xff3020, metalness: 0.55, roughness: 0.35,
      emissive: 0x551005, emissiveIntensity: 0.35,
    });
  }

  function buildLancetHand(length, widthBase, widthMid, widthTip, mat, depth) {
    // Shape i XY-planet; spissen peker langs +Y.
    const s = new THREE.Shape();
    const wB = widthBase / 2;
    const wM = widthMid / 2;
    const wT = widthTip / 2;
    s.moveTo( wB, 0);
    s.lineTo( wM, length * 0.55);
    s.lineTo( wT * 1.5, length * 0.78);
    s.lineTo( wT * 0.3, length * 0.97);
    s.lineTo( 0, length);
    s.lineTo(-wT * 0.3, length * 0.97);
    s.lineTo(-wT * 1.5, length * 0.78);
    s.lineTo(-wM, length * 0.55);
    s.lineTo(-wB, 0);
    s.lineTo( wB, 0);
    const geom = new THREE.ExtrudeGeometry(s, {
      depth: depth, bevelEnabled: true,
      bevelSize: depth * 0.45, bevelThickness: depth * 0.45, bevelSegments: 3, curveSegments: 8,
    });
    geom.rotateX(-Math.PI / 2);
    geom.scale(1, 1, -1); // så spissen peker langs +Z etter rotasjon
    const handMesh = new THREE.Mesh(geom, mat);
    const wrapper = new THREE.Group();
    wrapper.add(handMesh);
    // v16.17: lume-prikker fjernet — de så ut som ekstra soler på disken.
    return wrapper;
  }

  function buildSecondHand(length, depth) {
    // Tykkere nål enn før så den blir synlig
    const ng = new THREE.Mesh(
      new THREE.BoxGeometry(radius * 0.008, depth, length),
      redLacquerMat()
    );
    ng.position.z = length / 2;
    ng.position.y = 0;
    // Motvekt fjernet — brukeren ba om at den røde sirkelen tas vekk.
    const wrap = new THREE.Group();
    wrap.add(ng);
    return wrap;
  }

  // ────────────────────────────────────────────────────────────────
  // TIMEVISER — kortere lansett, 65 % av minuttviser-lengden
  // ────────────────────────────────────────────────────────────────
  const hourHand = buildLancetHand(
    radius * 0.64,                // 65 % — klassisk Rolex-proporsjon
    radius * 0.030,               // bredere base enn minutt
    radius * 0.022,
    radius * 0.040,
    darkGoldMat(),                // mørk bronse for kontrast mot minutt/sek
    0.06
  );
  // Lagre base-lengden på timeviseren slik at den kan skaleres til solens radius i hver frame.
  group.userData.hourHandBaseLength = radius * 0.64;
  hourHand.position.y = yPos + 0.04;
  group.add(hourHand);
  group.userData.hourHand = hourHand;

  // MINUTTVISER — lansett, helt ut til ytterste diameter
  const minHand = buildLancetHand(
    radius * 0.96,
    radius * 0.020,
    radius * 0.014,
    radius * 0.028,
    goldMat(),
    0.05
  );
  minHand.position.y = yPos + 0.10;
  group.add(minHand);
  group.userData.minHand = minHand;

  // SEKUNDVISER — rød med motvekt, helt ut
  const secHand = buildSecondHand(
    radius * 0.99,
    0.04
  );
  secHand.position.y = yPos + 0.16;
  group.add(secHand);
  group.userData.secHand = secHand;

  // HUB — dobbel sylinder med ekte metallisk glans
  const hubBase = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.026, radius * 0.030, 0.14, 32),
    goldMat()
  );
  hubBase.position.y = yPos + 0.18;
  group.add(hubBase);
  const hubTop = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.012, radius * 0.018, 0.10, 28),
    steelMat()
  );
  hubTop.position.y = yPos + 0.25;
  group.add(hubTop);

  group.userData.radius = radius;
  group.userData.yPos = yPos;
}

// Initial radius for sol-klokken — dekker hele AE-disken (ytterste diameter = R_OUTER).
// Bruker uttrykt prosent av R_OUTER (default 100% = hele disken).
let clockSolRadius = R_OUTER * 1.00;

// =================================================================
// v16.53: GE-LENGDEGRAD-TALLRING — egen gruppe (subMap.geRing)
// =================================================================
// 72 tall plassert MELLOM Antarctica-ring (R_OUTER) og kompass-innerring (R_OUTER × 1.080).
// Helt uavhengig av klokke/kompass — styres KUN av layer-grid-toggelen.
// Formel: kompass_vinkel = (180 - GE_lon_signert) mod 360
//   0° GE  → kompass 180° (nede, mot Afrika)
//  90°E   → kompass 90°  (høyre)
//  90°W   → kompass 270° (venstre)
// 180°   → kompass 0°   (toppen, Greenwich-meridianen på antipoden)
function buildGeRing() {
  const grp = subMap.geRing;
  // Tøm gruppen først (idempotent — kan kalles flere ganger)
  while (grp.children.length > 0) {
    const child = grp.children[0];
    grp.remove(child);
    if (child.geometry) child.geometry.dispose();
    if (child.material) {
      if (child.material.map) child.material.map.dispose();
      child.material.dispose();
    }
  }

  // v16.55: Rektangulær canvas (3:1 bredde:høyde) og PlaneGeometry slik at lange labels
  // som "180°", "170W", "90E" får plass uten å klippes.
  function makeGeText(text, color, weight, sizePx) {
    const SS = 4;
    const WIDTH_RATIO = 3;  // canvas bredde = 3 × høyde
    const c = document.createElement('canvas');
    c.width = sizePx * WIDTH_RATIO * SS;
    c.height = sizePx * SS;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const fontPx = Math.floor(sizePx * SS * 0.8);
    ctx.font = `${weight} ${fontPx}px 'Cormorant Garamond', 'Times New Roman', serif`;
    const cx = c.width / 2, cy = c.height / 2;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(0,20,30,0.75)';
    ctx.lineWidth = Math.max(1.0, fontPx * 0.025);
    ctx.strokeText(text, cx, cy);
    ctx.fillStyle = color;
    ctx.fillText(text, cx, cy);
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 16;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true;
    tex.needsUpdate = true;
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthTest: true, side: THREE.DoubleSide });
    // PlaneGeometry med samme aspect ratio som canvas (3:1) — ingen klipping/strekking.
    const geo = new THREE.PlaneGeometry(WIDTH_RATIO, 1);
    geo.rotateX(-Math.PI / 2);
    return new THREE.Mesh(geo, mat);
  }

  // v16.55: ALLE tall (5°, 10°E/W, og kardinaler 0°/90E/180°/90W) på SAMME ring (R_OUTER × 1.040).
  // Én hovedring med 72 tall — ingen tall på forskjellige diametere lenger.
  const geMidR      = R_OUTER * 1.040;  // 5°-tall
  const geMajorR    = R_OUTER * 1.040;  // 10°-tall (med E/W)
  const geCardinalR = R_OUTER * 1.040;  // v16.55: 0°, 90°E, 180°, 90°W — NÅ PÅ SAMME RING

  const yPos = 0.10;  // Y_MAP (0) + CLOCK_Y_SOL (0.05) + 0.05 buffer

  // 72 tall: hver 5° GE-lengdegrad (0, 5, 10, ..., 355)
  for (let geLon = 0; geLon < 360; geLon += 5) {
    // GE-lengdegrad → signert (-180..180)
    const signedLon = geLon > 180 ? geLon - 360 : geLon;
    // Vår kompass-vinkel (180° = Greenwich/0° GE nederst)
    let compassDeg = (180 - signedLon) % 360;
    if (compassDeg < 0) compassDeg += 360;
    const a = (compassDeg / 360) * Math.PI * 2;

    const isCardinal = (geLon === 0 || geLon === 90 || geLon === 180 || geLon === 270);
    const isMajor    = (geLon % 10 === 0);

    // v16.55: Bredere canvas (sizePx = canvas-bredde) for å unngå at "10E", "90W", "180°" klippes.
    // Faktisk skalering (scaleSize) bestemmer størrelsen i scenen — bredde-til-høyde 2:1 for tekst-mesh.
    let r, color, weight, sizePx, scaleW, scaleH, label;
    if (isCardinal) {
      r = geCardinalR;
      color = '#9ee0ff';   // lys cyan — GE-kardinaler
      weight = 'bold';
      sizePx = 160;
      scaleW = R_OUTER * 0.090;  // bredere for "180°", "90E", "90W"
      scaleH = R_OUTER * 0.045;
      if (geLon === 0) label = '0\u00b0';
      else if (geLon === 90) label = '90E';
      else if (geLon === 180) label = '180\u00b0';
      else label = '90W';
    } else if (isMajor) {
      r = geMajorR;
      color = '#7ec8d8';
      weight = 'normal';
      sizePx = 144;
      scaleW = R_OUTER * 0.075;  // bredere for tre-tegns labels ("10E", "170W")
      scaleH = R_OUTER * 0.038;
      if (geLon < 180) label = String(geLon) + 'E';
      else label = String(360 - geLon) + 'W';
    } else {
      // 5°-mellomtall (rene tall uten suffiks)
      r = geMidR;
      color = '#5a96a8';
      weight = 'normal';
      sizePx = 112;
      scaleW = R_OUTER * 0.055;
      scaleH = R_OUTER * 0.030;
      if (geLon < 180) label = String(geLon);
      else label = String(360 - geLon);
    }

    const x = Math.sin(a) * r;
    const z = -Math.cos(a) * r;

    const mesh = makeGeText(label, color, weight, sizePx);
    mesh.position.set(x, yPos, z);
    // v16.55: PlaneGeometry har allerede 3:1 aspect ratio — vi skalerer høyden
    // og lar bredden følge automatisk (3 × scaleH = synlig bredde i scenen).
    mesh.scale.set(scaleH, 1, scaleH);
    // Rotér slik at tallet "peker utover" fra senter (lesbar fra utsiden)
    mesh.rotation.y = -a;
    grp.add(mesh);
  }
}

buildGeRing();
// Default: følger layer-grid-toggle (av som default — se binding lenger ned)
subMap.geRing.visible = false;

// v16.24: Enok-urskive — 18 likestore deler per rotasjon (én dag = 18 timer).
// 18 øverst (kl 0 / midnatt), tellingen går med klokken: 1,2,3,...,9 (middag, kl 6-posisjon),...,17,18.
const ENOK_NUMERALS_18 = ['18','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17'];

buildClock(subMap.clockSol, {
  radius: clockSolRadius, yPos: CLOCK_Y_SOL,
  colorRing: 0xc9a247, colorMin: 0xc9a247, colorSec: 0xff4030,
  colorFace: 0x0a0e18, numerals: ENOK_NUMERALS_18, faceOpacity: 0.06,
});
subMap.clockSol.visible = false;
// Atom-klokke er IKKE 3D lenger — kun et digitalt popup-vindu.
// subMap.clockAtom beholdes som tom gruppe for bakoverkompatibilitet.
subMap.clockAtom.visible = false;

// Hjelpefunksjon: oppdater viser-rotasjon. Rolex-stil viserne har hub-enden i origo og
// spissen i +Z, så vi bare roterer rundt Y (ingen flytting).
// 0% = kl 12 = -Z-retning, dvs. rotation.y = π.
function setHands(group, hourFrac, minFrac, secFrac) {
  const hourHand = group.userData.hourHand;
  const minHand = group.userData.minHand;
  const secHand = group.userData.secHand;
  if (!minHand || !secHand) return;
  const hourAngle = Math.PI - hourFrac * Math.PI * 2;
  const minAngle  = Math.PI - minFrac  * Math.PI * 2;
  const secAngle  = Math.PI - secFrac  * Math.PI * 2;
  if (hourHand) hourHand.rotation.y = hourAngle;
  minHand.rotation.y = minAngle;
  secHand.rotation.y = secAngle;
}

// Sol-klokke (Enok 18-timers urskive):
//   - Timeviser peker på solens posisjon (lon=retning, lat=lengde) — følger sol-radius.
//   - Minutt-viser går én runde per 1/18 av rotasjon (én Enok-time).
//   - Sekund-viser går én runde per 1/60 av en Enok-minutt.
function updateClockSol() {
  // v16.25: Klokken kjører KONSTANT — også når 3D-laget er skjult visuelt.
  // Visere roteres uansett (cheap), og digital read-out oppdateres alltid.
  // Timeviser-retning: peker på solens reelle posisjon på disken.
  // sunLonAngle = 0 → øverst (kl 18/0 = midnatt), 180 → nederst (kl 9 = middag).
  const dayFrac = (sunLonAngle % 360) / 360;

  // Minutt og sekund — basert på hvor langt vi er kommet inn i nåværende Enok-time (1/18 av rotasjon).
  const totalEnokHours = dayFrac * 18;                       // 0..18
  const minFrac = totalEnokHours - Math.floor(totalEnokHours); // 0..1 = aktuell time-progresjon
  // Sekund-viseren: 60 Enok-sekunder per Enok-minutt
  const totalEnokMinutes = minFrac * 60;
  const secFrac = totalEnokMinutes - Math.floor(totalEnokMinutes);

  setHands(subMap.clockSol, dayFrac, minFrac, secFrac);

  // Digital read-out (Enok-tid: 18 timer per rotasjon, 60 min, 60 sek)
  const hour18 = Math.floor(totalEnokHours);                 // 0..17
  const minute = Math.floor(totalEnokMinutes);               // 0..59
  const second = Math.floor(secFrac * 60);                   // 0..59
  const dig = document.getElementById('clock-sol-digital');
  if (dig) {
    const hh = String(hour18).padStart(2,'0');
    const mm = String(minute).padStart(2,'0');
    const ss = String(second).padStart(2,'0');
    dig.textContent = `${hh}:${mm}:${ss} Enoch (18 h)`;
  }
}

// Oppdater rotasjons-display (sol-rotasjoner, år, port)
function updateRotationDisplay() {
  const rot = currentDayIdx + 1; // 1..364
  const totalRotations = currentDayIdx + dayAccumulator;
  const yr = Math.floor(totalRotations / 364) + 1;
  const pct = (totalRotations / 364 * 100);
  const seg = (typeof dagNattForDay === 'function') ? dagNattForDay(rot) : null;
  // Port-nummer fra DAG_NATT_DELER-tabellen
  let portTxt = '—';
  if (seg && typeof seg.port !== 'undefined') {
    portTxt = `Gate ${seg.port} · ${seg.day}/${seg.night} parts`;
  }
  const rd = document.getElementById('rotation-display');
  if (rd) rd.textContent = `ROTATION ${rot} / 364`;
  const rs = document.getElementById('rotation-sub');
  if (rs) rs.textContent = `Year ${yr} · ${pct.toFixed(1)}% · ${portTxt}`;
}

// Atom-klokke: sann offisiell tid for valgt sone — BARE DIGITAL POPUP (24-timers).
// subMap.clockAtom-gruppen er tom; ingen 3D-rendering.
let clockTimezoneOffset = -new Date().getTimezoneOffset() / 60;
function updateClockAtom() {
  // Skriver alltid til digitalt readout. Visning styres av popup-window display.
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const d = new Date(utcMs + clockTimezoneOffset * 3600000);
  const dig = document.getElementById('clock-atom-digital');
  if (dig) {
    const hh = String(d.getHours()).padStart(2,'0');
    const mm = String(d.getMinutes()).padStart(2,'0');
    const ss = String(d.getSeconds()).padStart(2,'0');
    const sign = clockTimezoneOffset >= 0 ? '+' : '';
    dig.textContent = `${hh}:${mm}:${ss}`;
    const tz = document.getElementById('clock-atom-tz-label');
    if (tz) tz.textContent = `UTC${sign}${clockTimezoneOffset}`;
  }
}

// Bakoverkompatibilitet for eksisterende kall (loop bruker fortsatt updateClock)
function updateClock() { updateClockSol(); updateClockAtom(); }

// Highlight-tilstand for Cancer/Capricorn-ringene ved vendepunkter
function highlightTropics(lat) {
  // Cancer +23.44 ± 0.5° → lyser sterkt; Capricorn −23.44 ± 0.5° → lyser sterkt
  const cancerHit = Math.abs(lat - 23.7) < 0.5;
  const capricornHit = Math.abs(lat - (-23.7)) < 0.5;
  // Plukk første barn (selve ringen) og juster opacity
  if (subMap.cancer.children[0]) {
    subMap.cancer.children[0].material.opacity = cancerHit ? 1.0 : 0.5;
    subMap.cancer.children[0].material.color.setHex(cancerHit ? 0xffe080 : 0xe0c060);
  }
  if (subMap.capricorn.children[0]) {
    subMap.capricorn.children[0].material.opacity = capricornHit ? 1.0 : 0.5;
    subMap.capricorn.children[0].material.color.setHex(capricornHit ? 0xffa050 : 0xc08040);
  }
}

// =================================================================
// BYGG LAG 3 — FIRMAMENT (Polaris + stjerner)
// =================================================================
{
  // Polaris — liten kalibreringsprikk (klart mindre enn solen)
  const pol = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  const polGlow = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xfff0c0, transparent: true, opacity: 0.3 })
  );
  subFirma.polaris.add(pol);
  subFirma.polaris.add(polGlow);

  // Stjerner — punktsky
  const starCount = 600;
  const positions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    const r = R_EQUATOR * (0.5 + Math.random() * 2.0);
    const theta = Math.random() * Math.PI * 2;
    positions[i*3]   = r * Math.cos(theta);
    positions[i*3+1] = (Math.random() - 0.5) * 6;
    positions[i*3+2] = r * Math.sin(theta);
  }
  const starGeom = new THREE.BufferGeometry();
  starGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xeeeeff, size: 0.12, transparent: true, opacity: 0.7, sizeAttenuation: true,
  });
  subFirma.stars.add(new THREE.Points(starGeom, starMat));
  subFirma.stars.visible = false;
}

// =================================================================
// SOL-POSISJON
// =================================================================
let sunLat = 0;
let sunLonAngle = 0; // dag-rotasjon
let sunRotationEnabled = true;  // v16: kan fryses uten å skjule solen

function updateSun() {
  const r = latToR(sunLat);
  const a = sunLonAngle * Math.PI / 180;
  // v16.19: justert konvensjon slik at sunLonAngle=0 svarer til kl 12 (øverst, -Z)
  // samme som timeviseren og aeProject. Tidligere brukte vi cos/sin som ga +X for a=0
  // — det gjorde solen og klokken 90° forskjøvet.
  const x = r * Math.sin(a);
  const z = -r * Math.cos(a);
  sunMesh.position.set(x, 0, z);
  sunGlow.position.set(x, 0, z);
  // Oppdater sol-bane (ringen som solen vandrer på)
  updateSunPath(sunLat);
  highlightTropics(sunLat);
  // v16: dag/natt-sonen skal alltid følge solen når den er synlig
  if (subMap.daynight.visible) {
    updateDayNight();
  }

  // Sol-statistikk
  // v16 buestreng-uretting: r(lat) = R_OUTER_KM × (90-lat) / 180
  const sgRadius = R_OUTER_KM * (90 - sunLat) / 180;
  const sgCirc = 2 * Math.PI * sgRadius;
  document.getElementById('sg-lat').textContent = sunLat.toFixed(1) + '°';
  document.getElementById('sg-radius').textContent = Math.round(sgRadius).toLocaleString('en-US') + ' km';
  document.getElementById('sg-circ').textContent = Math.round(sgCirc).toLocaleString('en-US') + ' km';
  document.getElementById('sg-day').textContent = Math.round(sgCirc / 2).toLocaleString('en-US') + ' km';
  document.getElementById('sg-rot').textContent = (sunLonAngle % 360).toFixed(0) + '°';
}
updateSun();

// =================================================================
// KALENDER
// =================================================================
let calendarData = null;
let currentDayIdx = 0; // 0..363
let enok72Verses = null; // "72:1" -> tekst

async function loadCalendar() {
  try {
    const resp = await fetch('calendar.json');
    calendarData = await resp.json();
    populateMonthSelector();
    setDay(0);
  } catch (e) {
    console.warn('Kunne ikke laste kalender:', e);
  }
}

async function loadEnok72() {
  try {
    const resp = await fetch('enok-himmel-vers.json');
    enok72Verses = await resp.json();
  } catch (e) {
    console.warn('Kunne ikke laste Enok-vers:', e);
  }
}

function populateMonthSelector() {
  const sel = document.getElementById('cal-month');
  if (!calendarData) return;
  const months = Object.keys(calendarData.meta.sun_calendar_months);
  sel.innerHTML = months.map(m => `<option value="${m}">${m}</option>`).join('');
}

// =================================================================
// ENOK 72 — PORT-BASERT SOL-LATITUDE OG DAG/NATT-DELER
// =================================================================
// Master-kilder:
//   - Time-364-354-versjon-8.xlsx, H212 = "Krepsens Vendekrets 23.7° N"
//   - Enok 72:6-32 (komplette vers fra One-voice-740-filen)
// Enok 72-syklusen: solen passerer 12 port-segmenter (åtte 30-dagers og fire 31-dagers).
// Vendepunkt-portene 6 og 1 har 61 dager hver (30 opp + 31 ned, calendar.json).
// Dag/natt-deler skifter med 1 ved hver port-grense: 9-10-11-12-11-10-9-8-7-6-7-8-9.
const PORT_LAT_MAX = 23.7;  // Excel H212 — Enoks målte vendekrets
const PORT_LAT_STEP = PORT_LAT_MAX / 3;  // 7.9° per port-trinn

// Ankerpunkter: dag -> sol-lat (en per port-grense + solverv-vendepunkter)
const SOL_ANKERPUNKTER = [
  { day:   1, lat:                  0, note: 'Vårjevndøgn — port 4 starter (Enok 72:8)' },
  { day:  31, lat: +1 * PORT_LAT_STEP, note: 'Port 4→5 (Enok 72:11)' },
  { day:  61, lat: +2 * PORT_LAT_STEP, note: 'Port 5→6 (Enok 72:13)' },
  { day:  91, lat: +3 * PORT_LAT_STEP, note: 'Sommersolverv — port 6 vendepunkt (Enok 72:13-15)' },
  { day: 122, lat: +2 * PORT_LAT_STEP, note: 'Port 6→5 (Enok 72:17)' },
  { day: 152, lat: +1 * PORT_LAT_STEP, note: 'Port 5→4 (Enok 72:19)' },
  { day: 182, lat:                  0, note: 'Høstjevndøgn — port 4→3 (Enok 72:20-21)' },
  { day: 213, lat: -1 * PORT_LAT_STEP, note: 'Port 3→2 (Enok 72:23)' },
  { day: 243, lat: -2 * PORT_LAT_STEP, note: 'Port 2→1 (Enok 72:25)' },
  { day: 273, lat: -3 * PORT_LAT_STEP, note: 'Vintersolverv — port 1 vendepunkt (Enok 72:25-27)' },
  { day: 304, lat: -2 * PORT_LAT_STEP, note: 'Port 1→2 (Enok 72:29)' },
  { day: 334, lat: -1 * PORT_LAT_STEP, note: 'Port 2→3 (Enok 72:31)' },
  { day: 365, lat:                  0, note: 'Tilbake til vårjevndøgn (Enok 72:32)' }
];

// Dag/natt-deler per port-segment
// v16-fix: Port 6 og Port 1 er sammenhængende 61-dagers segmenter (vendepunkts-porter)
// Solen er i samme port i hele perioden — dag/natt-deler er konstant innenfor hvert segment.
const DAG_NATT_DELER = [
  { startDay:   1, endDay:  60, day: 10, night:  8, port: 4, vers: '72:9-10' },   // Vinter → vår
  { startDay:  61, endDay: 121, day: 12, night:  6, port: 6, vers: '72:13-14' },  // Krepsens vendekrets (61 d)
  { startDay: 122, endDay: 182, day: 10, night:  8, port: 5, vers: '72:17-18' },  // Sommer → høst
  { startDay: 183, endDay: 242, day:  8, night: 10, port: 3, vers: '72:21-22' },  // Høstjevndøgn
  { startDay: 243, endDay: 303, day:  6, night: 12, port: 1, vers: '72:25-26' },  // Steinbukkens vendekrets (61 d)
  { startDay: 304, endDay: 364, day:  8, night: 10, port: 3, vers: '72:31-32' }   // Vinter → vår-jevndøgn
];

// v16.29: Ark-T-tabell oppgradert fra V6 (26. mai 2026). Inneholder nå:
//   - 180 sol-baner mellom Krepsen (bane 1, +23.7°) og Steinbukken (bane 180, -23.7°)
//   - 4 vendepunkts-dager (91, 182, 273, 364) markert med isVendepunkt=true og bane=null
//   - 7 vegg-rad-par fra ark T (wall_info) som styrer hvor solen skal hoppe over
//   - 2 akser: 60° (øst-akse, sol kommer ut) og 300° (vest-akse, sol går ned)
let SOL_BANE_TABELL = null;       // Float32Array[366]: lat per dag
let SOL_BANE_VENDEPUNKT = null;   // Set<int>: dager (1..364) som er vendepunkter
let SOL_BANE_WALL_INFO = null;    // {axes_deg, half_width_deg, wall_row_pairs}
fetch('sol-bane-arkT.json').then(r => r.json()).then(data => {
  const rows = Array.isArray(data) ? data : data.days;
  SOL_BANE_TABELL = new Float32Array(366); // index 1..364, 0-padded
  SOL_BANE_VENDEPUNKT = new Set();
  for (const row of rows) {
    SOL_BANE_TABELL[row.day] = row.lat;
    if (row.isVendepunkt) SOL_BANE_VENDEPUNKT.add(row.day);
  }
  SOL_BANE_WALL_INFO = data.wall_info || null;
  console.log('Sol-bane-tabell fra ark T (V6) lastet:', rows.length, 'dager,', SOL_BANE_VENDEPUNKT.size, 'vendepunkter, vegg-info:', SOL_BANE_WALL_INFO ? 'ja' : 'nei');
});
function sunLatForDay(dayOfYear) {
  // Tabell-basert oppslag fra ark T med lineær interpolering mellom dager.
  // Faller tilbake til sinus-formelen før JSON er lastet.
  if (!SOL_BANE_TABELL) {
    return 23.7 * Math.sin(2 * Math.PI * (dayOfYear - 1) / 364);
  }
  let d = ((dayOfYear - 1) % 364 + 364) % 364 + 1;
  const d0 = Math.floor(d);
  const d1 = d0 === 364 ? 1 : d0 + 1;
  const frac = d - d0;
  const v0 = SOL_BANE_TABELL[d0] || 0;
  const v1 = SOL_BANE_TABELL[d1] || 0;
  return v0 + (v1 - v0) * frac;
}

// v16.29: Returnerer true hvis solens nåværende posisjon (sunLat + sunLonAngle)
//   ligger inne i en vegg i ark T. Vegger står på 60°- og 300°-aksene (±1° azimut)
//   ved radielle posisjoner som svarer til wall-rad-parene i ark T.
//   Vegg-radier beregnes fra de samme port-radiene som buildGate/buildWall.
let SOL_WALL_RADII = null;  // Float32Array av [rIndre, rYtre] per vegg-par
function computeWallRadii() {
  // Wall-rad-par fra ark T: [28,29],[61,62],[93,94],[126,127],[158,159],[190,191],[223,224]
  // Wall-radien er midt mellom rad-paret. portRowToRadius() mapper rad 31→Krepsens vendekrets,
  // rad 221→Steinbukkens. Vegg-par dekker rad-mellomrommet.
  if (typeof portRowToRadius !== 'function') return null;
  const pairs = [[28,29],[61,62],[93,94],[126,127],[158,159],[190,191],[223,224]];
  const out = [];
  for (const [a, b] of pairs) {
    // Vegg dekker radius fra rad a-0.5 til rad b+0.5 langs port-aksen
    const rA = portRowToRadius(a - 0.5);
    const rB = portRowToRadius(b + 0.5);
    const rIndre = Math.min(rA, rB);
    const rYtre  = Math.max(rA, rB);
    out.push([rIndre, rYtre]);
  }
  return out;
}
// Vær forsiktig: portRowToRadius defineres senere. Vi henter SOL_WALL_RADII på første bruk.
function isSunInsideWall(lat, lonDeg) {
  // v16.29: Sjekk om solens fotpunkt (lat, lon) ligger inne i en vegg-quad fra ark T.
  //   Vegger står på 60°- og 300°-aksene med 2° azimut-bredde (±1° fra aksen).
  //   Vi forstørrer detection til ±3° slik at solen er tydelig usynlig under hele
  //   passeringen ved høy animasjonshastighet — ved 2 d/s passeres veggen på
  //   under 1 frame uten denne bufferen.
  if (!SOL_WALL_RADII) SOL_WALL_RADII = computeWallRadii();
  if (!SOL_WALL_RADII) return false;
  const AXES = [60, 300];
  const HALF = 3.0;
  const lonNorm = ((lonDeg % 360) + 360) % 360;
  let nearAxis = false;
  for (const ax of AXES) {
    const diff = Math.min(Math.abs(lonNorm - ax), 360 - Math.abs(lonNorm - ax));
    if (diff <= HALF) { nearAxis = true; break; }
  }
  if (!nearAxis) return false;
  const r = latToR(lat);
  // Liten radial-buffer (+/- 0.05 scene-enheter ≈ 50 km) så solen ikke flimrer
  //   på vegg-grensen.
  const RAD_BUFFER = 0.05;
  for (const [rIn, rOut] of SOL_WALL_RADII) {
    if (r >= rIn - RAD_BUFFER && r <= rOut + RAD_BUFFER) return true;
  }
  return false;
}

function dagNattForDay(dayOfYear) {
  // Returnerer dag/natt-deler iht. Enok 72
  for (const seg of DAG_NATT_DELER) {
    if (dayOfYear >= seg.startDay && dayOfYear <= seg.endDay) return seg;
  }
  return DAG_NATT_DELER[0];
}

// v16: Marker aktivt port-segment i port-progress-indikatoren
function updatePortProgress(dayOfYear) {
  for (let i = 0; i < DAG_NATT_DELER.length; i++) {
    const seg = DAG_NATT_DELER[i];
    const el = document.querySelector(`[data-port-seg="${i}"]`);
    if (!el) continue;
    const isActive = dayOfYear >= seg.startDay && dayOfYear <= seg.endDay;
    if (isActive) {
      el.style.color = '#fff';
      el.style.background = '#c9a247';
      el.style.padding = '0 4px';
      el.style.borderRadius = '2px';
      el.style.fontWeight = '700';
    } else {
      el.style.color = '#aaa';
      el.style.background = '';
      el.style.padding = '';
      el.style.borderRadius = '';
      el.style.fontWeight = '';
    }
  }
}

function setDay(idx) {
  if (!calendarData) return;
  idx = ((idx % 364) + 364) % 364;
  currentDayIdx = idx;
  const day = calendarData.days[idx];
  if (!day) return;

  // Sol-lat fra Enok 72-port-systemet (lineær interpolering mellom ankerpunkter)
  const dayOfYear = day.enoch_year_day; // 1..364
  sunLat = sunLatForDay(dayOfYear);
  updateSun();

  // UI
  document.getElementById('sun-lat').value = sunLat.toFixed(1);
  document.getElementById('sun-lat-val').textContent = sunLat.toFixed(1) + '°';
  document.getElementById('cal-month').value = day.enoch_month;
  document.getElementById('cal-day').value = day.enoch_day_in_month;
  document.getElementById('cal-day-val').textContent = day.enoch_day_in_month;
  const dn = dagNattForDay(dayOfYear);
  document.getElementById('cal-info').textContent =
    `${day.date} · ${day.enoch_month} d.${day.enoch_day_in_month} · Gate ${day.sun_port_east}E · sun lat ${sunLat.toFixed(1)}° · day/night ${dn.day}/${dn.night} (Enoch ${dn.vers})`;
  // v16: oppdater port-progresjons-indikatoren
  updatePortProgress(dayOfYear);
}

// =================================================================
// UI EVENT-HANDLERS
// =================================================================

// Kamera-slidere
function bindCam(id, key, valId, suffix = '°') {
  const el = document.getElementById(id);
  const val = document.getElementById(valId);
  el.addEventListener('input', () => {
    camState[key] = parseFloat(el.value);
    val.textContent = el.value + suffix;
    applyCamera();
  });
}
bindCam('vm-cam-tilt',   'tilt',   'vm-cam-tilt-val',   '°');
bindCam('vm-cam-rot',    'rot',    'vm-cam-rot-val',    '°');
bindCam('vm-cam-height', 'height', 'vm-cam-height-val', '');

// Synlige live-slidere (kamera-panel nederst til høyre på canvas)
function bindLiveCam(id, key, valId) {
  const el  = document.getElementById(id);
  const val = document.getElementById(valId);
  if (!el || !val) return;
  el.addEventListener('input', () => {
    camState[key] = parseFloat(el.value);
    val.textContent = el.value + '°';
    // Speil til View-menyens sliders
    const other = document.getElementById('vm-cam-' + key);
    const otherVal = document.getElementById('vm-cam-' + key + '-val');
    if (other) other.value = el.value;
    if (otherVal) otherVal.textContent = el.value + '°';
    applyCamera();
  });
}
bindLiveCam('cam-rot-live',  'rot',  'cam-rot-live-val');
bindLiveCam('cam-tilt-live', 'tilt', 'cam-tilt-live-val');

// Reset-knapp i live-panelet: sentrer pan og tilbakestill kamera
const camResetBtn = document.getElementById('cam-reset-live');
if (camResetBtn) {
  camResetBtn.addEventListener('click', () => {
    camState.target.set(0, 0, 0);
    camState.tilt = 90;
    camState.rot  = 0;
    camState.dist = 100;
    document.getElementById('cam-rot-live').value  = 0;
    document.getElementById('cam-tilt-live').value = 90;
    document.getElementById('cam-rot-live-val').textContent  = '0°';
    document.getElementById('cam-tilt-live-val').textContent = '90°';
    const vmRot = document.getElementById('vm-cam-rot');
    const vmTilt = document.getElementById('vm-cam-tilt');
    if (vmRot)  { vmRot.value  = 0;  document.getElementById('vm-cam-rot-val').textContent  = '0°';  }
    if (vmTilt) { vmTilt.value = 90; document.getElementById('vm-cam-tilt-val').textContent = '90°'; }
    applyCamera();
    updateZoomReadout();
  });
}

// Kamera-presets
document.querySelectorAll('[data-cam]').forEach(btn => {
  btn.addEventListener('click', () => {
    const p = btn.dataset.cam;
    const presets = {
      top:     { tilt: 90,  rot: 0,   height: 0,   dist: 100 },
      oblique: { tilt: 45,  rot: 30,  height: 15,  dist: 110 },
      side:    { tilt: 5,   rot: 0,   height: 8,   dist: 80 },
      under:   { tilt: -60, rot: 0,   height: -40, dist: 100 },
    };
    Object.assign(camState, presets[p]);
    document.getElementById('vm-cam-tilt').value = camState.tilt;
    document.getElementById('vm-cam-rot').value  = camState.rot;
    document.getElementById('vm-cam-height').value = camState.height;
    document.getElementById('vm-cam-tilt-val').textContent = camState.tilt + '°';
    document.getElementById('vm-cam-rot-val').textContent  = camState.rot + '°';
    document.getElementById('vm-cam-height-val').textContent = camState.height;
    applyCamera();
  });
});

// Mus: venstre-drag = roter kamera, høyre-drag (eller Shift+venstre) = pan, hjul = zoom
// Google Earth-stil: zoom helt ned til overflaten, og forskyv kartet i vinduet.
const CAM_DIST_MIN = 0.0002; // kalibrering: tillater ekstrem nærzoom på gridflaten
const CAM_DIST_MAX = 400;
const PAN_RADIUS_MAX = R_OUTER_KM * SCALE * 1.5; // ikke pan lenger ut enn 1.5× disken

let dragMode = null; // 'rotate' | 'pan' | null
let lastX = 0, lastY = 0;
let currentMode = 'enoch';

function currentModeLabel() { return currentMode === 'enoch' ? 'Enoch scale' : 'GE scale'; }

function updateZoomReadout() {
  const el = document.getElementById('zoom-level');
  const ind = document.getElementById('zoom-indicator');
  const heightEl = document.getElementById('height-above-ground');
  const norgeZoom = document.getElementById('norge-instrument-zoom');
  const norgeZoomVal = document.getElementById('norge-instrument-zoom-val');
  const gridX = document.getElementById('norge-grid-x');
  const gridY = document.getElementById('norge-grid-y');
  const gridXVal = document.getElementById('norge-grid-x-val');
  const gridYVal = document.getElementById('norge-grid-y-val');
  const pct = Math.round(100 / camState.dist * 100);
  if (el) el.textContent = pct + '%';
  if (heightEl) {
    const heightKm = Math.max(0, (camState.dist / R_OUTER) * R_OUTER_KM);
    heightEl.textContent = heightKm >= 100
      ? `H ${Math.round(heightKm).toLocaleString('en-US')} km`
      : `H ${Math.round(heightKm * 1000).toLocaleString('en-US')} m`;
  }
  if (norgeZoom) norgeZoom.value = String(Math.max(25, Math.min(50000000, pct)));
  if (norgeZoomVal) norgeZoomVal.textContent = pct + '%';
  if (gridX) gridX.value = String(camState.target.x);
  if (gridY) gridY.value = String(camState.target.z);
  if (gridXVal) gridXVal.textContent = camState.target.x.toFixed(2);
  if (gridYVal) gridYVal.textContent = camState.target.z.toFixed(2);
  if (norgeSurface || norgeLeaflet) applyNorgePlacement();
  if (norgeSurface) syncNorgeDetailPaneToCamera();
  if (norgeSurface) scheduleNorgeDetailTiles();
  if (ind) ind.textContent = pct + '% · ' + currentModeLabel();
}

// Pan: forskyv camState.target i kamera-planet (høyre + opp relativt til kamera),
// projisert ned i XZ-planet slik at vi følger kartet — som i Google Earth.
function setCameraHeightKm(heightKm) {
  const dist = (heightKm / R_OUTER_KM) * R_OUTER;
  camState.dist = Math.max(CAM_DIST_MIN, Math.min(CAM_DIST_MAX, dist));
  applyCamera();
  updateZoomReadout();
}

function updateNorgeFreezeUi() {
  const btn = document.getElementById('norge-freeze-layer');
  const waitBtn = document.getElementById('norge-freeze-when-loaded');
  const status = document.getElementById('norge-freeze-status');
  if (btn) btn.textContent = norgeFrozenDetailLayer ? 'Unfreeze layer' : 'Freeze layer';
  if (waitBtn) waitBtn.textContent = norgeFreezeMode === 'waiting' ? 'Waiting...' : 'Freeze when loaded';
  if (status) {
    const heightKm = Math.max(0, (camState.dist / R_OUTER) * R_OUTER_KM);
    const heightText = heightKm >= 100
      ? `${Math.round(heightKm).toLocaleString('en-US')} km`
      : `${Math.round(heightKm * 1000).toLocaleString('en-US')} m`;
    if (norgeFreezeMode === 'waiting') {
      status.textContent = `Waiting for tiles at H ${heightText}`;
    } else {
      status.textContent = norgeFrozenDetailLayer ? `Frozen at H ${heightText}` : 'Dynamic loading';
    }
  }
}

function setNorgeFrozenDetailLayer(active) {
  norgeFrozenDetailLayer = !!active;
  norgeFreezeMode = norgeFrozenDetailLayer ? 'frozen' : 'dynamic';
  norgeFreezeWaitBatch = null;
  const cleanLayer = document.getElementById('norge-clean-detail-layer');
  if (cleanLayer) cleanLayer.dataset.frozen = norgeFrozenDetailLayer ? '1' : '0';
  if (cleanLayer) cleanLayer.dataset.freezeMode = norgeFreezeMode;
  if (!norgeFrozenDetailLayer) scheduleNorgeDetailTiles();
  updateNorgeFreezeUi();
  refreshNorgeCleanLoadStatus();
}

function isNorgeCleanTileQueueIdle() {
  return norgeCleanTileManager.active === 0 && norgeCleanTileManager.queue.length === 0;
}

function checkNorgeFreezeWhenLoaded() {
  if (norgeFreezeMode !== 'waiting') return;
  if (norgeFreezeWaitBatch !== null && norgeFreezeWaitBatch !== norgeCleanTileManager.currentBatch) {
    norgeFreezeWaitBatch = norgeCleanTileManager.currentBatch;
  }
  if (!isNorgeCleanTileQueueIdle()) {
    updateNorgeFreezeUi();
    return;
  }
  norgeFrozenDetailLayer = true;
  norgeFreezeMode = 'frozen';
  norgeFreezeWaitBatch = null;
  const cleanLayer = document.getElementById('norge-clean-detail-layer');
  if (cleanLayer) {
    cleanLayer.dataset.frozen = '1';
    cleanLayer.dataset.freezeMode = 'frozen';
  }
  updateNorgeFreezeUi();
  refreshNorgeCleanLoadStatus();
}

function requestNorgeFreezeWhenLoaded() {
  if (norgeFrozenDetailLayer) return;
  norgeFreezeMode = 'waiting';
  norgeFreezeWaitBatch = norgeCleanTileManager.currentBatch;
  const cleanLayer = document.getElementById('norge-clean-detail-layer');
  if (cleanLayer) {
    cleanLayer.dataset.frozen = '0';
    cleanLayer.dataset.freezeMode = 'waiting';
  }
  updateNorgeFreezeUi();
  refreshNorgeCleanLoadStatus();
  if (norgeDetailTimer) return;
  checkNorgeFreezeWhenLoaded();
}

function cancelNorgeFreezeWait() {
  if (norgeFreezeMode !== 'waiting') return;
  norgeFreezeMode = 'dynamic';
  norgeFreezeWaitBatch = null;
  const cleanLayer = document.getElementById('norge-clean-detail-layer');
  if (cleanLayer) cleanLayer.dataset.freezeMode = 'dynamic';
  updateNorgeFreezeUi();
  refreshNorgeCleanLoadStatus();
}

function setInstrumentZoomPercent(percent) {
  cancelNorgeFreezeWait();
  const pct = Math.max(25, Math.min(50000000, percent));
  camState.dist = Math.max(CAM_DIST_MIN, Math.min(CAM_DIST_MAX, 10000 / pct));
  applyCamera();
  updateZoomReadout();
}

function setInstrumentGridOffset({ x = camState.target.x, y = camState.target.z }) {
  cancelNorgeFreezeWait();
  camState.target.x = Math.max(-40, Math.min(40, x));
  camState.target.z = Math.max(-40, Math.min(40, y));
  applyCamera();
  updateZoomReadout();
}

function isNorgeMouseGridMode() {
  return !!document.getElementById('norge-mouse-grid')?.checked;
}

function syncNorgeMouseMode() {
  if (!norgeLeaflet) return;
  if (isNorgeRule1SurfaceMode() || isNorgeMouseGridMode()) {
    norgeLeaflet.map.dragging.disable();
  } else {
    norgeLeaflet.map.dragging.enable();
  }
}

function focusBaseMap(selected) {
  camState.tilt = 90;
  camState.rot = 0;
  camState.height = 0;
  if (selected === 'norge') {
    const p = aeProject(66.55, 14.0);
    camState.target.set(p.x, 0, p.z);
    camState.dist = 4;
  } else {
    camState.target.set(0, 0, 0);
    camState.dist = 100;
  }
  applyCamera();
  updateZoomReadout();
}

function panCameraTarget(dx, dy) {
  cancelNorgeFreezeWait();
  // dx, dy er piksel-delta. Skalér til scene-enheter basert på dist (zoom-nivå).
  // Ved dist=100 og 60° FOV: én piksel ~ dist/canvas.height scene-enheter.
  const h = canvas.clientHeight || window.innerHeight;
  const worldPerPixel = (2 * camState.dist * Math.tan((60 * Math.PI/180)/2)) / h;
  // Google Earth "grab and drag": jorden følger musen.
  // Drar man musen til høyre, må target flyttes til VENSTRE i scenen
  // slik at innholdet ser ut til å gli mot høyre. Beholder negativt fortegn,
  // men bruker omvendt rotasjon nedenfor for at retningen skal stemme.
  const moveX = -dx * worldPerPixel;
  const moveZ = -dy * worldPerPixel;
  // Roter pan-vektoren etter kameraets horisontale rotasjon (rot)
  const rotRad = camState.rot * Math.PI / 180;
  const cosR = Math.cos(rotRad);
  const sinR = Math.sin(rotRad);
  // Kamera ser mot -Z når rot=0. Skjerm-høyre = +X, skjerm-opp = +Z (når tilt=90, top-down).
  // Når tilt < 90 (skrå sett), vil skjerm-"opp" mer og mer bli skjerm-bakover (mot kameraet).
  // For pan i kart-planet bruker vi den horisontale projeksjonen.
  const wx = moveX * cosR - moveZ * sinR;
  const wz = moveX * sinR + moveZ * cosR;
  camState.target.x += wx;
  camState.target.z += wz;
  // Begrens — ikke pan ut i tomrommet
  const rTarget = Math.hypot(camState.target.x, camState.target.z);
  if (rTarget > PAN_RADIUS_MAX) {
    const k = PAN_RADIUS_MAX / rTarget;
    camState.target.x *= k;
    camState.target.z *= k;
  }
}

canvas.addEventListener('contextmenu', (e) => e.preventDefault()); // ikke høyreklikk-meny

// Forenklet muse-kontroll (Jone-Aase 2026-05-26):
//   Venstre-drag = PAN (forskyv jorden i vinduet). KUN pan, ingen rotasjon.
//   Hjul         = ZOOM inn/ut. Eneste zoom-input.
//   Høyre-klikk  = reservert for objekt-meny (håndteres separat senere).
//   Rotasjon og Tilt styres av sliderne i kontroll-panelet.
const PAN_SENSITIVITY = 0.5;  // halv fart — mindre overfølsom

canvas.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    dragMode = 'pan';
    lastX = e.clientX; lastY = e.clientY;
  }
  // Høyre-knapp (button === 2) gør INGENTING her — reservert for objekt-klikk.
  // Midt-knapp (button === 1) er heller ikke i bruk lenger.
});
window.addEventListener('mouseup', () => { dragMode = null; });
window.addEventListener('mousemove', (e) => {
  if (dragMode !== 'pan') return;
  const dx = (e.clientX - lastX) * PAN_SENSITIVITY;
  const dy = (e.clientY - lastY) * PAN_SENSITIVITY;
  lastX = e.clientX; lastY = e.clientY;
  panCameraTarget(dx, dy);
  applyCamera();
});

function screenToMapWorld(clientX, clientY) {
  const rect = wrap.getBoundingClientRect();
  const ndc = new THREE.Vector2(
    ((clientX - rect.left) / rect.width) * 2 - 1,
    -(((clientY - rect.top) / rect.height) * 2 - 1)
  );
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(ndc, camera);
  if (Math.abs(raycaster.ray.direction.y) < 0.000001) return null;
  const t = (Y_MAP - raycaster.ray.origin.y) / raycaster.ray.direction.y;
  if (!Number.isFinite(t)) return null;
  const point = raycaster.ray.origin.clone().add(raycaster.ray.direction.clone().multiplyScalar(t));
  return { x: point.x, z: point.z };
}

function zoomInstrumentOverlay(deltaY, anchorEvent = null) {
  cancelNorgeFreezeWait();
  // Adaptiv zoom: multiplikativ. Mindre følsom enn før.
  const before = anchorEvent ? screenToMapWorld(anchorEvent.clientX, anchorEvent.clientY) : null;
  const factor = Math.pow(1.0008, deltaY);
  camState.dist = Math.max(CAM_DIST_MIN, Math.min(CAM_DIST_MAX, camState.dist * factor));
  applyCamera();
  if (before && anchorEvent) {
    const after = screenToMapWorld(anchorEvent.clientX, anchorEvent.clientY);
    if (after) {
      camState.target.x += before.x - after.x;
      camState.target.z += before.z - after.z;
      const rTarget = Math.hypot(camState.target.x, camState.target.z);
      if (rTarget > PAN_RADIUS_MAX) {
        const k = PAN_RADIUS_MAX / rTarget;
        camState.target.x *= k;
        camState.target.z *= k;
      }
      applyCamera();
    }
  }
  updateZoomReadout();
}

canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  zoomInstrumentOverlay(e.deltaY, e);
}, { passive: false });

// Touch-støtte: en finger = roter, to fingre = pinch-zoom + pan
let touchState = null;
canvas.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    touchState = { mode: 'pan', x: e.touches[0].clientX, y: e.touches[0].clientY };
  } else if (e.touches.length === 2) {
    const t0 = e.touches[0], t1 = e.touches[1];
    touchState = {
      mode: 'pinch',
      dist: Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY),
      cx: (t0.clientX + t1.clientX) / 2,
      cy: (t0.clientY + t1.clientY) / 2,
    };
  }
}, { passive: true });
canvas.addEventListener('touchmove', (e) => {
  if (!touchState) return;
  e.preventDefault();
  if (touchState.mode === 'pan' && e.touches.length === 1) {
    const t = e.touches[0];
    const dx = (t.clientX - touchState.x) * PAN_SENSITIVITY;
    const dy = (t.clientY - touchState.y) * PAN_SENSITIVITY;
    touchState.x = t.clientX; touchState.y = t.clientY;
    panCameraTarget(dx, dy);
    applyCamera();
  } else if (touchState.mode === 'pinch' && e.touches.length === 2) {
    const t0 = e.touches[0], t1 = e.touches[1];
    const newDist = Math.hypot(t1.clientX - t0.clientX, t1.clientY - t0.clientY);
    const newCx = (t0.clientX + t1.clientX) / 2;
    const newCy = (t0.clientY + t1.clientY) / 2;
    // pinch -> zoom
    const ratio = touchState.dist / newDist;
    camState.dist = Math.max(CAM_DIST_MIN, Math.min(CAM_DIST_MAX, camState.dist * ratio));
    // bevegelse av midtpunkt -> pan
    const panX = newCx - touchState.cx;
    const panY = newCy - touchState.cy;
    panCameraTarget(panX, panY);
    touchState.dist = newDist;
    touchState.cx = newCx;
    touchState.cy = newCy;
    applyCamera();
    updateZoomReadout();
  }
}, { passive: false });
canvas.addEventListener('touchend', () => { touchState = null; });

// Dobbeltklikk = reset pan til sentrum (zoom og rotasjon beholdes).
canvas.addEventListener('dblclick', (e) => {
  if (e.button !== 0) return;
  camState.target.set(0, 0, 0);
  applyCamera();
});

// =================================================================
// NORGESKART I SAMME INSTRUMENTFLATE
// =================================================================
let norgeLeaflet = null;
let norgeSurface = null;
let norgeSurfaceCities = [];
let norgeSurfaceMeasureMode = false;
let norgeSurfaceMeasurePoints = [];
let norgeDetailTimer = null;
let norgeDetailKey = '';
let norgeCleanDetailKey = '';
let norgeCleanLastContext = null;
let norgeFrozenDetailLayer = false;
let norgeFreezeMode = 'dynamic';
let norgeFreezeWaitBatch = null;
const norgeCleanLabSamples = [];
const norgeCleanTileManager = {
  active: 0,
  maxConcurrent: 12,
  frameBudgetMs: 8,
  queuePumpTimer: null,
  queueYielded: false,
  yieldCount: 0,
  lastPumpMs: 0,
  queue: [],
  cache: new Map(),
  cacheLimit: 1800,
  currentBatch: 0,
  requested: 0,
  loaded: 0,
  cached: 0,
  failed: 0,
  fallbackHits: 0,
  fallbackMisses: 0,
};
function deepFreezePlain(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  Object.freeze(value);
  Object.keys(value).forEach(key => deepFreezePlain(value[key]));
  return value;
}
const norgeLeafletStyleEngine = {
  enabled: false,
  layer: null,
  tileRegistry: new Map(),
  levels: new Map(),
  pendingRegistry: new Map(),
  dryRun: {
    visibleKeys: new Set(),
    keepKeys: new Set(),
    previousKeepKeys: new Set(),
    enterKeys: new Set(),
    stayKeys: new Set(),
    leaveKeys: new Set(),
    sourceStats: {},
    priorityQueue: [],
    queueCenter: null,
    queueCap: 0,
    queueRejectedReason: '',
    tileDescriptors: [],
    descriptorPreview: [],
    descriptorPreviewLimit: 12,
    previewTruncated: false,
    countsByRequestType: {},
    validationSummary: { valid: 0, invalid: 0, errors: [] },
    loadCandidates: 0,
    rejectedCandidates: 0,
    urlCandidates: [],
    urlPreview: [],
    urlPreviewLimit: 12,
    urlPreviewTruncated: false,
    validUrlCandidates: 0,
    rejectedUrlCandidates: 0,
    countsByUrlKind: {},
    urlValidationSummary: { valid: 0, invalid: 0, errors: [] },
    urlWarningSummary: { warnings: 0, items: [] },
    loaderGate: {
      enabled: false,
      loaderAllowed: false,
      loadingEnabled: false,
      wouldEnqueue: 0,
      wouldSkip: 0,
      wouldReject: 0,
      futureLoadCandidates: 0,
      maxConcurrentPlan: 0,
      preview: [],
      previewLimit: 12,
      previewTruncated: false,
      warnings: [],
    },
    rejected: false,
    warnings: [],
  },
  keepBuffer: 2,
  sourceVersion: 'v1',
  threeAMaxConcurrent: 1,
  threeAExplicitlyOpened: false,
  threeBMaxTiles: 4,
  threeBMaxConcurrent: 1,
  threeBExplicitlyOpened: false,
  threeCMaxTiles: 16,
  threeCMaxConcurrent: 1,
  threeCExplicitlyOpened: false,
  threeDMaxVisibleTiles: 16,
  threeDMaxKeepTiles: 8,
  threeDMaxTotalTiles: 24,
  threeDMaxConcurrent: 1,
  threeDExplicitlyOpened: false,
  threeEMaxVisibleTiles: 16,
  threeEMaxKeepTiles: 8,
  threeEMaxTotalTiles: 24,
  threeEMaxConcurrent: 2,
  threeEExplicitlyOpened: false,
  lastSnapshot: null,
  stats: {
    phase: '3E-concurrent-base-loading-max2',
    state: 'off',
    loadingEnabled: false,
    leafletRuntimeEnabled: false,
    loaderAllowed: false,
    loaderGateEnabled: false,
    loaderGateState: 'closed',
    maxConcurrentPlan: 0,
    wouldEnqueue: 0,
    wouldSkip: 0,
    wouldReject: 0,
    futureLoadCandidates: 0,
    loaderPreviewCount: 0,
    loaderPreviewLimit: 12,
    loaderPreviewTruncated: false,
    loaderGateWarnings: [],
    pendingContractReady: true,
    abortContractReady: true,
    zoom: null,
    tileZoom: null,
    source: '',
    snapshotReady: false,
    coreReady: false,
    transformReady: false,
    registrySize: 0,
    levelCount: 0,
    pendingCount: 0,
    keepBuffer: 2,
    visibleTiles: 0,
    keepTiles: 0,
    enterTiles: 0,
    stayTiles: 0,
    leaveTiles: 0,
    dryRunRejected: false,
    dryRunWarnings: [],
    dryRunSources: {},
    queueTotal: 0,
    queueVisibleBase: 0,
    queueVisibleOverlay: 0,
    queueKeepBase: 0,
    queueKeepOverlay: 0,
    queueFirstRole: '',
    queuePreview: [],
    queueRejected: false,
    queueRejectedReason: '',
    queueCenterX: null,
    queueCenterY: null,
    queueCap: 0,
    queueFirstDistance: null,
    queuePreviewDistances: [],
    descriptorPreviewCount: 0,
    descriptorPreviewLimit: 12,
    previewTruncated: false,
    loadCandidates: 0,
    rejectedCandidates: 0,
    countsByRequestType: {},
    validationInvalid: 0,
    validationErrors: [],
    firstDescriptorRequestType: '',
    firstDescriptorSourceKind: '',
    firstDescriptorValid: false,
    firstDescriptorLoaderAllowed: false,
    baseSourceCount: 0,
    overlaySourceCount: 0,
    baseWanted: 0,
    baseLoaded: 0,
    baseReady: false,
    overlayWanted: 0,
    overlayLoaded: 0,
    overlayReady: false,
    loadingCount: 0,
    retiringCount: 0,
    prunedCount: 0,
    blackFramePrevented: 0,
    wanted: 0,
    loaded: 0,
    pending: 0,
    kept: 0,
    retired: 0,
    failed: 0,
    validUrl: 0,
    invalidUrl: 0,
    validUrlCandidates: 0,
    rejectedUrlCandidates: 0,
    urlPreviewCount: 0,
    urlPreviewLimit: 12,
    urlPreviewTruncated: false,
    countsByUrlKind: {},
    urlValidationInvalid: 0,
    urlValidationErrors: [],
    urlWarningCount: 0,
    urlWarnings: [],
    firstUrlKind: '',
    firstUrlValid: false,
    firstUrlLoaderAllowed: false,
    firstUrlWarnings: [],
    actualPending: 0,
    actualLoaded: 0,
    actualFailed: 0,
    actualAppended: 0,
    actualSkippedByGate: 0,
    actualRejectedInvalid: 0,
    firstLoadedSourceId: '',
    firstLoadedZXY: '',
    lastLoadError: '',
    loaderMode: '',
    threeBRequested: 0,
    threeBPending: 0,
    threeBLoaded: 0,
    threeBFailed: 0,
    threeBAppended: 0,
    threeBRejectedByGate: 0,
    threeBRejectedOverlay: 0,
    threeBRejectedNonVisible: 0,
    threeBRejectedInvalid: 0,
    threeBFirstSourceId: '',
    threeBLoadedZXY: '',
    threeBLastError: '',
    threeCRequested: 0,
    threeCPending: 0,
    threeCLoaded: 0,
    threeCFailed: 0,
    threeCAppended: 0,
    threeCRejectedByGate: 0,
    threeCRejectedOverlay: 0,
    threeCRejectedNonVisible: 0,
    threeCRejectedInvalid: 0,
    threeCFirstSourceId: '',
    threeCLoadedZXY: '',
    threeCLastError: '',
    threeDVisibleRequested: 0,
    threeDKeepRequested: 0,
    threeDTotalRequested: 0,
    threeDPending: 0,
    threeDVisibleLoaded: 0,
    threeDKeepLoaded: 0,
    threeDLoaded: 0,
    threeDFailed: 0,
    threeDAppended: 0,
    threeDRejectedByGate: 0,
    threeDRejectedOverlay: 0,
    threeDRejectedNonVisible: 0,
    threeDRejectedInvalid: 0,
    threeDFirstSourceId: '',
    threeDLoadedZXY: '',
    threeDLoadedBands: '',
    threeDLastError: '',
    threeEVisibleRequested: 0,
    threeEKeepRequested: 0,
    threeETotalRequested: 0,
    threeEPending: 0,
    threeEInflight: 0,
    threeEMaxInflightObserved: 0,
    threeEVisibleLoaded: 0,
    threeEKeepLoaded: 0,
    threeELoaded: 0,
    threeEFailed: 0,
    threeEAppended: 0,
    threeERejectedByGate: 0,
    threeERejectedOverlay: 0,
    threeERejectedNonVisible: 0,
    threeERejectedInvalid: 0,
    threeEFirstSourceId: '',
    threeELoadedZXY: '',
    threeELoadedBands: '',
    threeELastError: '',
  },
  init() {
    this.layer = document.getElementById('norge-leaflet-style-detail-layer');
    globalThis.__openKartmotorV2ThreeATestGate = () => this.openThreeATestGate();
    globalThis.__closeKartmotorV2ThreeATestGate = () => this.closeThreeATestGate();
    globalThis.__openKartmotorV2ThreeBTestGate = () => this.openThreeBTestGate();
    globalThis.__closeKartmotorV2ThreeBTestGate = () => this.closeThreeBTestGate();
    globalThis.__openKartmotorV2ThreeCTestGate = () => this.openThreeCTestGate();
    globalThis.__closeKartmotorV2ThreeCTestGate = () => this.closeThreeCTestGate();
    globalThis.__openKartmotorV2ThreeDTestGate = () => this.openThreeDTestGate();
    globalThis.__closeKartmotorV2ThreeDTestGate = () => this.closeThreeDTestGate();
    globalThis.__openKartmotorV2ThreeETestGate = () => this.openThreeETestGate();
    globalThis.__closeKartmotorV2ThreeETestGate = () => this.closeThreeETestGate();
    this.publishState();
    this.sync();
  },
  makeSourceId(source) {
    return [source?.type || 'unknown', source?.layer || 'default']
      .join(':')
      .replace(/\s+/g, '_');
  },
  getTileKey(source, z, x, y, dpr = window.devicePixelRatio || 1) {
    const sourceId = typeof source === 'string' ? source : this.makeSourceId(source);
    const role = typeof source === 'string' ? 'base' : (source?.role || 'base');
    const anchorMode = typeof source === 'string' ? 'norway' : (cleanSourceAnchorMode(source) || 'norway');
    const dprKey = Number.isFinite(dpr) ? Math.max(1, Math.round(dpr)) : 1;
    return `${sourceId}:${this.sourceVersion}:${role}:${anchorMode}:z${z}:nz${z}:x${x}:y${y}:dpr${dprKey}`;
  },
  countRangeTiles(range) {
    if (!range) return 0;
    const width = Math.max(0, range.xMax - range.xMin + 1);
    const height = Math.max(0, range.yMax - range.yMin + 1);
    return width * height;
  },
  expandRangeForKeep(range, zoom) {
    if (!range || !Number.isFinite(zoom)) return null;
    const worldTiles = Math.pow(2, zoom);
    const pad = this.keepBuffer;
    return {
      xMin: Math.max(0, range.xMin - pad),
      xMax: Math.min(worldTiles - 1, range.xMax + pad),
      yMin: Math.max(0, range.yMin - pad),
      yMax: Math.min(worldTiles - 1, range.yMax + pad),
    };
  },
  rangeCenter(range) {
    if (!range) return null;
    return {
      x: (range.xMin + range.xMax) / 2,
      y: (range.yMin + range.yMax) / 2,
    };
  },
  addDryRunKeysForRange(keys, source, zoom, range) {
    if (!range) return;
    for (let x = range.xMin; x <= range.xMax; x += 1) {
      for (let y = range.yMin; y <= range.yMax; y += 1) {
        keys.add(this.getTileKey(source, zoom, x, y));
      }
    }
  },
  buildPriorityQueue(sources, zoom, visibleRange, keepRange, visibleKeys, keepKeys, center) {
    const queue = [];
    const pushQueueItem = (source, key, x, y, band) => {
      const role = source.role === 'overlay' ? 'overlay' : 'base';
      const visible = band === 'visible';
      const tileCenterX = x + 0.5;
      const tileCenterY = y + 0.5;
      const dx = tileCenterX - center.x;
      const dy = tileCenterY - center.y;
      const distanceToCenter = Math.sqrt(dx * dx + dy * dy);
      const priorityGroup = role === 'base' && visible
        ? 0
        : role === 'overlay' && visible
          ? 1
          : role === 'base'
            ? 2
            : 3;
      queue.push({
        key,
        sourceId: source.id,
        role,
        band,
        visible,
        keep: true,
        z: zoom,
        nativeZ: zoom,
        x,
        y,
        distanceToCenter,
        priorityGroup,
        sourceOrder: Number.isFinite(source.order) ? source.order : 0,
      });
    };

    sources.forEach(source => {
      for (let x = keepRange.xMin; x <= keepRange.xMax; x += 1) {
        for (let y = keepRange.yMin; y <= keepRange.yMax; y += 1) {
          const key = this.getTileKey(source, zoom, x, y);
          if (!keepKeys.has(key)) continue;
          const visible = visibleKeys.has(key)
            || (x >= visibleRange.xMin && x <= visibleRange.xMax && y >= visibleRange.yMin && y <= visibleRange.yMax);
          pushQueueItem(source, key, x, y, visible ? 'visible' : 'keep');
        }
      }
    });

    queue.sort((a, b) =>
      (a.priorityGroup - b.priorityGroup)
      || (a.sourceOrder - b.sourceOrder)
      || (a.distanceToCenter - b.distanceToCenter)
      || (a.y - b.y)
      || (a.x - b.x)
      || a.key.localeCompare(b.key)
    );
    return queue;
  },
  inferPassiveSourceContract(source) {
    const sourceText = [
      source?.id,
      source?.type,
      source?.layer,
    ].filter(Boolean).join(' ').toLowerCase();
    if (!source) return { requestType: 'unknown', sourceKind: 'unknown' };
    if (sourceText.includes('se-eiendom') || sourceText.includes('matrikkel') || sourceText.includes('eiendom')) {
      return { requestType: 'wms', sourceKind: 'se-eiendom' };
    }
    if ((source.type || '').startsWith('wms-') || sourceText.includes(' wms') || sourceText.includes('wms-')) {
      return { requestType: 'wms', sourceKind: 'wms' };
    }
    if (source.type === 'kartverket') return { requestType: 'xyz', sourceKind: 'wmts' };
    if (source.type === 'osm') return { requestType: 'xyz', sourceKind: 'other' };
    if (sourceText.includes('local') || sourceText.includes('assembled')) {
      return { requestType: 'local', sourceKind: 'other' };
    }
    if (source.type === 'none') return { requestType: 'none', sourceKind: 'other' };
    return { requestType: 'unknown', sourceKind: 'unknown' };
  },
  validatePassiveTileDescriptor(descriptor) {
    const errors = [];
    const minZoom = NORGE_SURFACE_DETAIL.minZoom;
    const maxZoom = NORGE_SURFACE_DETAIL.maxZoom;
    const worldTiles = Number.isInteger(descriptor.z) ? Math.pow(2, descriptor.z) : 0;
    if (!descriptor.sourceId) errors.push('missing sourceId');
    if (!['base', 'overlay'].includes(descriptor.role)) errors.push(`invalid role ${descriptor.role}`);
    if (!['visible', 'keep'].includes(descriptor.band)) errors.push(`invalid band ${descriptor.band}`);
    if (!Number.isInteger(descriptor.z)) errors.push('z is not integer');
    if (!Number.isInteger(descriptor.nativeZ)) errors.push('nativeZ is not integer');
    if (Number.isInteger(descriptor.z) && (descriptor.z < minZoom || descriptor.z > maxZoom)) {
      errors.push(`z ${descriptor.z} outside ${minZoom}-${maxZoom}`);
    }
    if (!Number.isInteger(descriptor.x)) errors.push('x is not integer');
    if (!Number.isInteger(descriptor.y)) errors.push('y is not integer');
    if (worldTiles > 0 && (descriptor.x < 0 || descriptor.x >= worldTiles)) {
      errors.push(`x ${descriptor.x} outside 0-${worldTiles - 1}`);
    }
    if (worldTiles > 0 && (descriptor.y < 0 || descriptor.y >= worldTiles)) {
      errors.push(`y ${descriptor.y} outside 0-${worldTiles - 1}`);
    }
    if (!['xyz', 'wms', 'local', 'none', 'unknown'].includes(descriptor.requestType)) {
      errors.push(`invalid requestType ${descriptor.requestType}`);
    }
    if (descriptor.requestType === 'unknown') errors.push('unknown requestType');
    if (descriptor.sourceKind === 'unknown') errors.push('unknown sourceKind');
    return errors;
  },
  buildPassiveTileDescriptors(snapshot, diff) {
    const previewLimit = 12;
    const queue = Array.isArray(diff.priorityQueue) ? diff.priorityQueue : [];
    const sourceMap = new Map((snapshot.sources || []).map(source => [source.id, source]));
    const shouldPreviewOnly = diff.rejected || queue.length > diff.queueCap;
    const descriptorItems = shouldPreviewOnly ? queue.slice(0, previewLimit) : queue;
    const countsByRequestType = { xyz: 0, wms: 0, local: 0, none: 0, unknown: 0 };
    const validationSummary = { valid: 0, invalid: 0, errors: [] };
    const tileDescriptors = descriptorItems.map(item => {
      const source = sourceMap.get(item.sourceId) || null;
      const sourceContract = this.inferPassiveSourceContract(source);
      const descriptor = {
        sourceId: item.sourceId || '',
        role: item.role === 'overlay' ? 'overlay' : 'base',
        band: item.band === 'visible' ? 'visible' : 'keep',
        z: Number.isInteger(item.z) ? item.z : Number(item.z),
        nativeZ: Number.isInteger(item.nativeZ) ? item.nativeZ : Number(item.nativeZ),
        x: Number.isInteger(item.x) ? item.x : Number(item.x),
        y: Number.isInteger(item.y) ? item.y : Number(item.y),
        priorityGroup: Number.isFinite(item.priorityGroup) ? item.priorityGroup : 99,
        sourceOrder: Number.isFinite(item.sourceOrder) ? item.sourceOrder : 0,
        distanceToCenter: Number.isFinite(item.distanceToCenter) ? item.distanceToCenter : 0,
        requestType: sourceContract.requestType,
        sourceKind: sourceContract.sourceKind,
        validTile: false,
        validationErrors: [],
        loaderAllowed: false,
        loadingEnabled: false,
      };
      descriptor.validationErrors = this.validatePassiveTileDescriptor(descriptor);
      descriptor.validTile = descriptor.validationErrors.length === 0;
      countsByRequestType[descriptor.requestType] = (countsByRequestType[descriptor.requestType] || 0) + 1;
      if (descriptor.validTile) {
        validationSummary.valid += 1;
      } else {
        validationSummary.invalid += 1;
        descriptor.validationErrors.forEach(error => {
          if (validationSummary.errors.length < 12) {
            validationSummary.errors.push(`${descriptor.sourceId || 'unknown'} ${descriptor.z}/${descriptor.x}/${descriptor.y}: ${error}`);
          }
        });
      }
      return descriptor;
    });
    const descriptorPreview = tileDescriptors.slice(0, previewLimit);
    return {
      tileDescriptors,
      descriptorPreview,
      descriptorPreviewLimit: previewLimit,
      previewTruncated: queue.length > previewLimit,
      countsByRequestType,
      validationSummary,
      loadCandidates: tileDescriptors.filter(descriptor => descriptor.validTile).length,
      rejectedCandidates: validationSummary.invalid,
      rejected: shouldPreviewOnly,
      queueRejectedReason: shouldPreviewOnly && !diff.queueRejectedReason
        ? `descriptor preview limited by cap ${diff.queueCap}`
        : diff.queueRejectedReason,
    };
  },
  buildNoopLoaderGate(descriptorDiff, urlDiff = null) {
    const previewLimit = 12;
    const descriptors = Array.isArray(descriptorDiff.tileDescriptors) ? descriptorDiff.tileDescriptors : [];
    const urlCandidates = urlDiff && Array.isArray(urlDiff.urlCandidates) ? urlDiff.urlCandidates : [];
    const candidates = urlCandidates.length ? urlCandidates : descriptors;
    const requireValidUrl = urlCandidates.length > 0;
    const loadingEnabled = false;
    const loaderAllowed = false;
    const maxConcurrentPlan = 0;
    const warnings = ['loader gate closed: 2H is validation dry-run only'];
    let wouldEnqueue = 0;
    let wouldSkip = 0;
    let wouldReject = 0;

    const preview = candidates.slice(0, previewLimit).map(descriptor => {
      const reasons = [];
      if (!descriptor.validTile) reasons.push(...descriptor.validationErrors);
      if ('validUrl' in descriptor && !descriptor.validUrl) reasons.push(...descriptor.validationErrors);
      if (!loaderAllowed) reasons.push('loaderAllowed=false');
      if (!loadingEnabled) reasons.push('loadingEnabled=false');
      const validForFutureLoader = descriptor.validTile === true && (!requireValidUrl || descriptor.validUrl === true);
      const decision = validForFutureLoader && loaderAllowed && loadingEnabled ? 'enqueue' : validForFutureLoader ? 'skip' : 'reject';
      if (decision === 'enqueue') wouldEnqueue += 1;
      if (decision === 'skip') wouldSkip += 1;
      if (decision === 'reject') wouldReject += 1;
      return {
        sourceId: descriptor.sourceId,
        role: descriptor.role,
        band: descriptor.band,
        z: descriptor.z,
        nativeZ: descriptor.nativeZ,
        x: descriptor.x,
        y: descriptor.y,
        key: `${descriptor.sourceId}:${descriptor.z}:${descriptor.x}:${descriptor.y}`,
        priorityGroup: descriptor.priorityGroup,
        sourceOrder: descriptor.sourceOrder,
        distanceToCenter: descriptor.distanceToCenter,
        requestType: descriptor.requestType,
        sourceKind: descriptor.sourceKind,
        validTile: descriptor.validTile,
        validUrl: descriptor.validUrl === undefined ? false : descriptor.validUrl,
        decision,
        reasons,
        loaderAllowed,
        loadingEnabled,
      };
    });

    if (candidates.length > previewLimit) {
      const rest = candidates.slice(previewLimit);
      rest.forEach(descriptor => {
        const validForFutureLoader = descriptor.validTile === true && (!requireValidUrl || descriptor.validUrl === true);
        if (!validForFutureLoader) {
          wouldReject += 1;
        } else {
          wouldSkip += 1;
        }
      });
    }

    return {
      enabled: false,
      loaderAllowed,
      loadingEnabled,
      wouldEnqueue,
      wouldSkip,
      wouldReject,
      futureLoadCandidates: urlDiff ? urlDiff.validUrlCandidates : descriptorDiff.loadCandidates,
      maxConcurrentPlan,
      preview,
      previewLimit,
      previewTruncated: candidates.length > previewLimit,
      warnings,
    };
  },
  redactUrlText(urlText) {
    if (!urlText) return '';
    const sensitiveKeys = new Set([
      'token', 'key', 'api_key', 'apikey', 'access_token', 'auth', 'authorization',
      'password', 'passwd', 'secret', 'client_secret', 'session', 'jwt', 'bearer',
    ]);
    const redactLoose = text => text
      .replace(/([?&])([^=&]*(?:token|key|auth|authorization|password|passwd|secret|session|jwt|bearer)[^=&]*)=[^&]*/gi, '$1$2=[REDACTED]')
      .replace(/([?&])(client[_-]?secret|access[_-]?token|api[_-]?key)=[^&]*/gi, '$1$2=[REDACTED]');
    try {
      const parsed = new URL(urlText);
      [...parsed.searchParams.keys()].forEach(key => {
        if (sensitiveKeys.has(key.toLowerCase())) parsed.searchParams.set(key, '[REDACTED]');
      });
      const safe = parsed.toString();
      return safe.length > 180 ? `${safe.slice(0, 180)}...` : safe;
    } catch {
      const safe = redactLoose(urlText);
      return safe.length > 180 ? `${safe.slice(0, 180)}...` : safe;
    }
  },
  urlParams(urlText) {
    if (!urlText) return new Map();
    try {
      const parsed = new URL(urlText);
      const params = new Map();
      parsed.searchParams.forEach((value, key) => params.set(key.toUpperCase(), value));
      return params;
    } catch {
      return new Map();
    }
  },
  validateHardenedUrlCandidate(candidate, source) {
    const errors = [...(candidate.validationErrors || [])];
    const warnings = [];
    const sourceType = source?.type || '';
    const isWms = candidate.urlKind === 'wms' || candidate.requestType === 'wms' || sourceType.startsWith('wms-');
    const isWmts = candidate.sourceKind === 'wmts' || sourceType === 'kartverket';
    const isOverlay = candidate.role === 'overlay';
    const params = this.urlParams(candidate.urlText);
    const requireParam = (name, message = `missing ${name}`) => {
      if (!params.get(name)) errors.push(message);
    };

    if (!candidate.urlText && candidate.urlKind !== 'none') errors.push('empty urlText');
    if (candidate.urlText && !/^https?:\/\//i.test(candidate.urlText)) errors.push('url must start with http or https');
    if (candidate.urlText && candidate.urlText.length > 2048) warnings.push('urlText exceeds preview length policy');
    if ((isWms || isWmts) && !source?.layer) errors.push('missing source.layer');
    if ((isWms || isWmts || candidate.urlKind === 'xyz') && !candidate.urlText) errors.push('missing source url/base url output');

    if (isWms) {
      requireParam('SERVICE');
      requireParam('REQUEST');
      requireParam('LAYERS', 'missing LAYERS/source.layer');
      requireParam('BBOX');
      requireParam('WIDTH');
      requireParam('HEIGHT');
      requireParam('FORMAT');
      const service = (params.get('SERVICE') || '').toUpperCase();
      const request = (params.get('REQUEST') || '').toUpperCase();
      if (service && service !== 'WMS') errors.push(`invalid SERVICE ${service}`);
      if (request && request !== 'GETMAP') errors.push(`invalid REQUEST ${request}`);
      const version = params.get('VERSION') || '';
      const crs = params.get('CRS') || '';
      const srs = params.get('SRS') || '';
      if (version === '1.3.0') {
        if (!crs) errors.push('WMS 1.3.0 requires CRS');
        if (srs) warnings.push('WMS 1.3.0 uses CRS; SRS is legacy');
        if (crs === 'EPSG:4326') warnings.push('WMS 1.3.0 EPSG:4326 may require lat/lon BBOX order');
      } else if (version === '1.1.1') {
        if (!srs) errors.push('WMS 1.1.1 requires SRS');
        if (crs) warnings.push('WMS 1.1.1 uses SRS; CRS is WMS 1.3.0 style');
      } else if (!version) {
        warnings.push('missing WMS VERSION; future live loading must reject until version is explicit');
      } else {
        warnings.push(`unreviewed WMS VERSION ${version}; future live loading must reject until version is reviewed`);
      }
      if (!crs && !srs) errors.push('missing CRS/SRS');
      const transparent = (params.get('TRANSPARENT') || '').toLowerCase();
      if (isOverlay && transparent !== 'true') errors.push('overlay WMS requires TRANSPARENT=TRUE');
      if (candidate.sourceKind === 'se-eiendom') {
        if (candidate.role !== 'overlay') errors.push('Se Eiendom/Matrikkel must be overlay');
        if (transparent !== 'true') errors.push('Se Eiendom/Matrikkel requires TRANSPARENT=TRUE');
        warnings.push('Se Eiendom/Matrikkel terms/auth must remain verified before live loading');
      }
    }

    if (isWmts) {
      if (!source?.layer) errors.push('missing WMTS layer');
      if (!candidate.urlText.includes('/wmts/')) warnings.push('WMTS url does not include /wmts/ path marker');
      if (!Number.isInteger(candidate.nativeZ)) errors.push('missing WMTS nativeZ/tilematrix');
      if (!Number.isInteger(candidate.x)) errors.push('missing WMTS tilecol/x');
      if (!Number.isInteger(candidate.y)) errors.push('missing WMTS tilerow/y');
      if (!/\.png(?:$|\?)/i.test(candidate.urlText) && !params.get('FORMAT')) warnings.push('WMTS format not explicit');
    }

    const validUrl = candidate.validTile && errors.length === 0;
    return {
      validUrl,
      urlValidationErrors: errors,
      urlValidationWarnings: warnings,
      safeUrlPreview: this.redactUrlText(candidate.urlText),
      futureLoaderEligible: candidate.validTile === true && validUrl === true,
      futureLoaderBlockedByGate: true,
    };
  },
  buildDryRunUrlCandidates(snapshot, descriptorDiff) {
    const previewLimit = 12;
    const descriptors = Array.isArray(descriptorDiff.tileDescriptors) ? descriptorDiff.tileDescriptors : [];
    const sourceMap = new Map((snapshot.sources || []).map(source => [source.id, source]));
    const countsByUrlKind = { xyz: 0, wms: 0, local: 0, none: 0, unknown: 0 };
    const urlValidationSummary = { valid: 0, invalid: 0, errors: [] };
    const urlWarningSummary = { warnings: 0, items: [] };
    const makeError = (descriptor, error) =>
      `${descriptor.sourceId || 'unknown'} ${descriptor.z}/${descriptor.x}/${descriptor.y}: ${error}`;
    const pushError = (descriptor, error) => {
      if (urlValidationSummary.errors.length < 12) urlValidationSummary.errors.push(makeError(descriptor, error));
    };
    const buildUrlText = (source, descriptor) => {
      if (!source) return { urlKind: 'unknown', urlText: '', errors: ['missing source metadata'] };
      const z = descriptor.z;
      const x = descriptor.x;
      const y = descriptor.y;
      const tileSize = NORGE_SURFACE_DETAIL.tileSize;
      if (source.type === 'osm') {
        return { urlKind: 'xyz', urlText: `https://tile.openstreetmap.org/${z}/${x}/${y}.png`, errors: [] };
      }
      if (source.type === 'kartverket') {
        return {
          urlKind: 'xyz',
          urlText: `https://cache.kartverket.no/v1/wmts/1.0.0/${source.layer}/default/webmercator/${z}/${y}/${x}.png`,
          errors: [],
        };
      }
      if (source.type === 'wms-nib') {
        return { urlKind: 'wms', urlText: '', errors: ['wms-nib is excluded from V2 URL dry-run until auth is explicit'] };
      }
      if (source.type === 'wms-iceland-sjokart') {
        const b = webMercatorTileBbox(x, y, z);
        return {
          urlKind: 'wms',
          urlText: 'https://gis.natt.is/mapcache/sjokort/web-mercator/wmst?' +
            'SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap' +
            `&LAYERS=${encodeURIComponent(source.layer)}` +
            '&STYLES=&FORMAT=image/png&TRANSPARENT=TRUE&CRS=EPSG:3857' +
            `&BBOX=${b.minX.toFixed(2)},${b.minY.toFixed(2)},${b.maxX.toFixed(2)},${b.maxY.toFixed(2)}` +
            `&WIDTH=${tileSize}&HEIGHT=${tileSize}`,
          errors: [],
        };
      }
      if (source.type === 'wms-denmark-havplan') {
        const b = webMercatorTileBbox(x, y, z);
        return {
          urlKind: 'wms',
          urlText: 'https://havplan.dk/geoserver/havplan/wms?' +
            'SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap' +
            `&LAYERS=${encodeURIComponent(source.layer)}` +
            '&STYLES=&FORMAT=image/png&TRANSPARENT=TRUE&SRS=EPSG:3857' +
            `&BBOX=${b.minX.toFixed(2)},${b.minY.toFixed(2)},${b.maxX.toFixed(2)},${b.maxY.toFixed(2)}` +
            `&WIDTH=${tileSize}&HEIGHT=${tileSize}`,
          errors: [],
        };
      }
      if (source.type === 'wms-sweden-fyren') {
        const b = webMercatorTileBbox(x, y, z);
        return {
          urlKind: 'wms',
          urlText: 'https://geokatalog.sjofartsverket.se/mapservice/wms.axd/FyrenBakgrund?' +
            'SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap' +
            `&LAYERS=${encodeURIComponent(source.layer)}` +
            '&STYLES=&FORMAT=image/png&TRANSPARENT=FALSE&CRS=EPSG:3857' +
            `&BBOX=${b.minX.toFixed(2)},${b.minY.toFixed(2)},${b.maxX.toFixed(2)},${b.maxY.toFixed(2)}` +
            `&WIDTH=${tileSize}&HEIGHT=${tileSize}`,
          errors: [],
        };
      }
      if (source.type === 'wms-se-eiendom') {
        const b = webMercatorTileBbox(x, y, z);
        return {
          urlKind: 'wms',
          urlText: 'https://wms.geonorge.no/skwms1/wms.matrikkel?' +
            'SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap' +
            `&LAYERS=${encodeURIComponent(source.layer)}` +
            '&STYLES=&FORMAT=image/png&TRANSPARENT=TRUE&CRS=EPSG:3857' +
            `&BBOX=${b.minX.toFixed(2)},${b.minY.toFixed(2)},${b.maxX.toFixed(2)},${b.maxY.toFixed(2)}` +
            `&WIDTH=${tileSize}&HEIGHT=${tileSize}`,
          errors: [],
        };
      }
      return { urlKind: 'unknown', urlText: '', errors: [`unsupported source type ${source.type || 'unknown'}`] };
    };

    const urlCandidates = descriptors.map(descriptor => {
      const source = sourceMap.get(descriptor.sourceId) || null;
      const built = descriptor.validTile
        ? buildUrlText(source, descriptor)
        : { urlKind: descriptor.requestType || 'unknown', urlText: '', errors: [...descriptor.validationErrors] };
      const candidate = {
        sourceId: descriptor.sourceId,
        role: descriptor.role,
        band: descriptor.band,
        z: descriptor.z,
        nativeZ: descriptor.nativeZ,
        x: descriptor.x,
        y: descriptor.y,
        requestType: descriptor.requestType,
        sourceKind: descriptor.sourceKind,
        urlKind: built.urlKind,
        urlText: built.urlText,
        validTile: descriptor.validTile,
        validUrl: false,
        validationErrors: [...built.errors],
        validationWarnings: [],
        safeUrlPreview: '',
        futureLoaderEligible: false,
        futureLoaderBlockedByGate: true,
        loaderAllowed: false,
        loadingEnabled: false,
      };
      const hardened = this.validateHardenedUrlCandidate(candidate, source);
      candidate.validUrl = hardened.validUrl;
      candidate.validationErrors = hardened.urlValidationErrors;
      candidate.validationWarnings = hardened.urlValidationWarnings;
      candidate.safeUrlPreview = hardened.safeUrlPreview;
      candidate.futureLoaderEligible = hardened.futureLoaderEligible;
      candidate.futureLoaderBlockedByGate = hardened.futureLoaderBlockedByGate;
      countsByUrlKind[candidate.urlKind] = (countsByUrlKind[candidate.urlKind] || 0) + 1;
      if (candidate.validUrl) {
        urlValidationSummary.valid += 1;
      } else {
        urlValidationSummary.invalid += 1;
        candidate.validationErrors.forEach(error => pushError(candidate, error));
      }
      if (candidate.validationWarnings.length) {
        urlWarningSummary.warnings += candidate.validationWarnings.length;
        candidate.validationWarnings.forEach(warning => {
          if (urlWarningSummary.items.length < 12) urlWarningSummary.items.push(makeError(candidate, warning));
        });
      }
      return candidate;
    });

    return {
      urlCandidates,
      urlPreview: urlCandidates.slice(0, previewLimit),
      urlPreviewLimit: previewLimit,
      urlPreviewTruncated: urlCandidates.length > previewLimit,
      validUrlCandidates: urlValidationSummary.valid,
      rejectedUrlCandidates: urlValidationSummary.invalid,
      countsByUrlKind,
      urlValidationSummary,
      urlWarningSummary,
    };
  },
  clearRuntimeTiles() {
    if (!this.layer) return;
    this.layer.querySelectorAll('.norge-leaflet-style-pixelflate').forEach(element => element.remove());
  },
  clearRuntimeState() {
    this.clearRuntimeTiles();
    this.tileRegistry.clear();
    this.pendingRegistry.clear();
    this.levels.clear();
  },
  isEiendomCandidate(candidate, source = null) {
    const sourceId = candidate?.sourceId || '';
    const layer = source?.layer || candidate?.layer || '';
    const kind = candidate?.sourceKind || '';
    return kind === 'se-eiendom'
      || /se[-_ ]?eiendom|matrikkel|eiendom/i.test(sourceId)
      || /se[-_ ]?eiendom|matrikkel|eiendom/i.test(layer);
  },
  sortUrlCandidatesForLoading(candidates) {
    return [...candidates].sort((a, b) => {
      const priorityDelta = (a.priorityGroup ?? 99) - (b.priorityGroup ?? 99);
      if (priorityDelta) return priorityDelta;
      const sourceDelta = (a.sourceOrder ?? 0) - (b.sourceOrder ?? 0);
      if (sourceDelta) return sourceDelta;
      const distanceDelta = (a.distanceToCenter ?? Number.MAX_SAFE_INTEGER) - (b.distanceToCenter ?? Number.MAX_SAFE_INTEGER);
      if (distanceDelta) return distanceDelta;
      const yDelta = (a.y ?? 0) - (b.y ?? 0);
      if (yDelta) return yDelta;
      const xDelta = (a.x ?? 0) - (b.x ?? 0);
      if (xDelta) return xDelta;
      return String(a.key || '').localeCompare(String(b.key || ''));
    });
  },
  isThreeATestGateOpen() {
    return this.threeAExplicitlyOpened === true
      || globalThis.__enableKartmotorV2ThreeATest === true
      || globalThis.__enok72__?.enableKartmotorV2ThreeATest === true
      || new URLSearchParams(window.location.search).get('kartmotorV2ThreeATest') === '1';
  },
  openThreeATestGate() {
    this.threeAExplicitlyOpened = true;
    if (this.enabled) this.update();
    return this.publicState();
  },
  closeThreeATestGate() {
    this.threeAExplicitlyOpened = false;
    this.clearRuntimeState();
    if (this.enabled) this.update();
    return this.publicState();
  },
  isThreeBTestGateOpen() {
    return this.threeBExplicitlyOpened === true
      || globalThis.__enableKartmotorV2ThreeBTest === true
      || globalThis.__enok72__?.enableKartmotorV2ThreeBTest === true
      || new URLSearchParams(window.location.search).get('kartmotorV2ThreeBTest') === '1';
  },
  openThreeBTestGate() {
    this.threeBExplicitlyOpened = true;
    if (this.enabled) this.update();
    return this.publicState();
  },
  closeThreeBTestGate() {
    this.threeBExplicitlyOpened = false;
    this.clearRuntimeState();
    this.stats.threeBRequested = 0;
    this.stats.threeBPending = 0;
    this.stats.threeBLoaded = 0;
    this.stats.threeBFailed = 0;
    this.stats.threeBAppended = 0;
    this.stats.threeBFirstSourceId = '';
    this.stats.threeBLoadedZXY = '';
    this.stats.threeBLastError = '';
    if (this.enabled) this.update();
    return this.publicState();
  },
  isThreeCTestGateOpen() {
    return this.threeCExplicitlyOpened === true
      || globalThis.__enableKartmotorV2ThreeCTest === true
      || globalThis.__enok72__?.enableKartmotorV2ThreeCTest === true
      || new URLSearchParams(window.location.search).get('kartmotorV2ThreeCTest') === '1';
  },
  openThreeCTestGate() {
    this.threeCExplicitlyOpened = true;
    if (this.enabled) this.update();
    return this.publicState();
  },
  closeThreeCTestGate() {
    this.threeCExplicitlyOpened = false;
    this.clearRuntimeState();
    this.stats.threeCRequested = 0;
    this.stats.threeCPending = 0;
    this.stats.threeCLoaded = 0;
    this.stats.threeCFailed = 0;
    this.stats.threeCAppended = 0;
    this.stats.threeCFirstSourceId = '';
    this.stats.threeCLoadedZXY = '';
    this.stats.threeCLastError = '';
    if (this.enabled) this.update();
    return this.publicState();
  },
  isThreeDTestGateOpen() {
    return this.threeDExplicitlyOpened === true
      || globalThis.__enableKartmotorV2ThreeDTest === true
      || globalThis.__enok72__?.enableKartmotorV2ThreeDTest === true
      || new URLSearchParams(window.location.search).get('kartmotorV2ThreeDTest') === '1';
  },
  openThreeDTestGate() {
    this.threeDExplicitlyOpened = true;
    if (this.enabled) this.update();
    return this.publicState();
  },
  closeThreeDTestGate() {
    this.threeDExplicitlyOpened = false;
    this.clearRuntimeState();
    this.stats.threeDVisibleRequested = 0;
    this.stats.threeDKeepRequested = 0;
    this.stats.threeDTotalRequested = 0;
    this.stats.threeDPending = 0;
    this.stats.threeDVisibleLoaded = 0;
    this.stats.threeDKeepLoaded = 0;
    this.stats.threeDLoaded = 0;
    this.stats.threeDFailed = 0;
    this.stats.threeDAppended = 0;
    this.stats.threeDFirstSourceId = '';
    this.stats.threeDLoadedZXY = '';
    this.stats.threeDLoadedBands = '';
    this.stats.threeDLastError = '';
    if (this.enabled) this.update();
    return this.publicState();
  },
  isThreeETestGateOpen() {
    return this.threeEExplicitlyOpened === true
      || globalThis.__enableKartmotorV2ThreeETest === true
      || globalThis.__enok72__?.enableKartmotorV2ThreeETest === true
      || new URLSearchParams(window.location.search).get('kartmotorV2ThreeETest') === '1';
  },
  openThreeETestGate() {
    this.threeEExplicitlyOpened = true;
    if (this.enabled) this.update();
    return this.publicState();
  },
  closeThreeETestGate() {
    this.threeEExplicitlyOpened = false;
    this.clearRuntimeState();
    this.stats.threeEVisibleRequested = 0;
    this.stats.threeEKeepRequested = 0;
    this.stats.threeETotalRequested = 0;
    this.stats.threeEPending = 0;
    this.stats.threeEInflight = 0;
    this.stats.threeEMaxInflightObserved = 0;
    this.stats.threeEVisibleLoaded = 0;
    this.stats.threeEKeepLoaded = 0;
    this.stats.threeELoaded = 0;
    this.stats.threeEFailed = 0;
    this.stats.threeEAppended = 0;
    this.stats.threeEFirstSourceId = '';
    this.stats.threeELoadedZXY = '';
    this.stats.threeELoadedBands = '';
    this.stats.threeELastError = '';
    if (this.enabled) this.update();
    return this.publicState();
  },
  selectThreeABaseCandidate(snapshot, diff) {
    const sourceMap = new Map((snapshot.sources || []).map(source => [source.id, source]));
    const candidates = Array.isArray(diff.urlCandidates) ? diff.urlCandidates : [];
    return candidates.find(candidate => {
      const source = sourceMap.get(candidate.sourceId || '') || null;
      return candidate.role === 'base'
        && candidate.band === 'visible'
        && candidate.validTile === true
        && candidate.validUrl === true
        && candidate.futureLoaderEligible === true
        && candidate.sourceKind !== 'se-eiendom'
        && !this.isEiendomCandidate(candidate, source);
    }) || null;
  },
  selectThreeBBaseCandidates(snapshot, diff) {
    const sourceMap = new Map((snapshot.sources || []).map(source => [source.id, source]));
    const candidates = Array.isArray(diff.urlCandidates) ? diff.urlCandidates : [];
    return this.sortUrlCandidatesForLoading(candidates)
      .filter(candidate => {
        const source = sourceMap.get(candidate.sourceId || '') || null;
        return candidate.role === 'base'
          && candidate.band === 'visible'
          && candidate.validTile === true
          && candidate.validUrl === true
          && candidate.futureLoaderEligible === true
          && candidate.sourceKind !== 'se-eiendom'
          && !this.isEiendomCandidate(candidate, source);
      })
      .slice(0, this.threeBMaxTiles);
  },
  selectThreeCBaseCandidates(snapshot, diff) {
    const sourceMap = new Map((snapshot.sources || []).map(source => [source.id, source]));
    const candidates = Array.isArray(diff.urlCandidates) ? diff.urlCandidates : [];
    return this.sortUrlCandidatesForLoading(candidates)
      .filter(candidate => {
        const source = sourceMap.get(candidate.sourceId || '') || null;
        return candidate.role === 'base'
          && candidate.band === 'visible'
          && candidate.validTile === true
          && candidate.validUrl === true
          && candidate.futureLoaderEligible === true
          && candidate.sourceKind !== 'se-eiendom'
          && !this.isEiendomCandidate(candidate, source);
      })
      .slice(0, this.threeCMaxTiles);
  },
  selectThreeDBaseCandidates(snapshot, diff) {
    const sourceMap = new Map((snapshot.sources || []).map(source => [source.id, source]));
    const candidates = Array.isArray(diff.urlCandidates) ? diff.urlCandidates : [];
    const baseCandidates = this.sortUrlCandidatesForLoading(candidates)
      .filter(candidate => {
        const source = sourceMap.get(candidate.sourceId || '') || null;
        return candidate.role === 'base'
          && (candidate.band === 'visible' || candidate.band === 'keep')
          && candidate.validTile === true
          && candidate.validUrl === true
          && candidate.futureLoaderEligible === true
          && candidate.sourceKind !== 'se-eiendom'
          && !this.isEiendomCandidate(candidate, source);
      });
    const visible = baseCandidates
      .filter(candidate => candidate.band === 'visible')
      .slice(0, this.threeDMaxVisibleTiles);
    const keep = baseCandidates
      .filter(candidate => candidate.band === 'keep')
      .slice(0, this.threeDMaxKeepTiles);
    return {
      visible,
      keep,
      all: [...visible, ...keep],
    };
  },
  selectThreeEBaseCandidates(snapshot, diff) {
    const sourceMap = new Map((snapshot.sources || []).map(source => [source.id, source]));
    const candidates = Array.isArray(diff.urlCandidates) ? diff.urlCandidates : [];
    const baseCandidates = this.sortUrlCandidatesForLoading(candidates)
      .filter(candidate => {
        const source = sourceMap.get(candidate.sourceId || '') || null;
        return candidate.role === 'base'
          && (candidate.band === 'visible' || candidate.band === 'keep')
          && candidate.validTile === true
          && candidate.validUrl === true
          && candidate.futureLoaderEligible === true
          && candidate.sourceKind !== 'se-eiendom'
          && !this.isEiendomCandidate(candidate, source);
      });
    const visible = baseCandidates
      .filter(candidate => candidate.band === 'visible')
      .slice(0, this.threeEMaxVisibleTiles);
    const keep = baseCandidates
      .filter(candidate => candidate.band === 'keep')
      .slice(0, this.threeEMaxKeepTiles);
    return {
      visible,
      keep,
      all: [...visible, ...keep],
    };
  },
  threeAStopReasons(candidate) {
    const reasons = [];
    const cleanLayer = document.getElementById('norge-clean-detail-layer');
    const cleanDisplay = cleanLayer ? getComputedStyle(cleanLayer).display : '';
    const pointerEvents = this.layer ? getComputedStyle(this.layer).pointerEvents : '';
    const maxConcurrent = this.threeAMaxConcurrent;
    if (cleanDisplay !== 'block') reasons.push(`cleanDisplay=${cleanDisplay || 'missing'}`);
    if (pointerEvents !== 'none') reasons.push(`v2 pointer-events=${pointerEvents || 'missing'}`);
    if (!candidate) reasons.push('missing base:visible candidate');
    if (candidate && candidate.role !== 'base') reasons.push(`candidate role=${candidate.role}`);
    if (candidate && candidate.band !== 'visible') reasons.push(`candidate band=${candidate.band}`);
    if (candidate && candidate.validTile !== true) reasons.push('validTile is not true');
    if (candidate && candidate.validUrl !== true) reasons.push('validUrl is not true');
    if (!this.isThreeATestGateOpen()) reasons.push('3A loader gate not explicitly opened');
    if (maxConcurrent > 1) reasons.push(`maxConcurrent=${maxConcurrent}`);
    if (candidate && candidate.sourceKind === 'se-eiendom') reasons.push('sourceKind is Se Eiendom');
    if (candidate && /se[-_ ]?eiendom|matrikkel|eiendom/i.test(candidate.sourceId || '')) reasons.push('sourceId is Se Eiendom/Matrikkel');
    return reasons;
  },
  threeBStopReasons(candidates) {
    const reasons = [];
    const cleanLayer = document.getElementById('norge-clean-detail-layer');
    const cleanDisplay = cleanLayer ? getComputedStyle(cleanLayer).display : '';
    const pointerEvents = this.layer ? getComputedStyle(this.layer).pointerEvents : '';
    if (cleanDisplay !== 'block') reasons.push(`cleanDisplay=${cleanDisplay || 'missing'}`);
    if (pointerEvents !== 'none') reasons.push(`v2 pointer-events=${pointerEvents || 'missing'}`);
    if (!this.isThreeBTestGateOpen()) reasons.push('3B loader gate not explicitly opened');
    if (this.isThreeATestGateOpen()) reasons.push('3A loader gate is also open');
    if (!Array.isArray(candidates) || candidates.length === 0) reasons.push('missing base:visible candidates');
    if (Array.isArray(candidates) && candidates.length > this.threeBMaxTiles) reasons.push(`candidate count=${candidates.length}`);
    if (this.threeBMaxConcurrent > 1) reasons.push(`maxConcurrent=${this.threeBMaxConcurrent}`);
    if (this.tileRegistry.size > this.threeBMaxTiles) reasons.push(`actualLoaded=${this.tileRegistry.size}`);
    if ((this.stats.actualLoaded || 0) > this.threeBMaxTiles) reasons.push(`actualLoaded=${this.stats.actualLoaded}`);
    if ((this.stats.actualAppended || 0) > this.threeBMaxTiles) reasons.push(`actualAppended=${this.stats.actualAppended}`);
    if ((this.stats.threeBLoaded || 0) > this.threeBMaxTiles) reasons.push(`threeBLoaded=${this.stats.threeBLoaded}`);
    if ((this.stats.threeBAppended || 0) > this.threeBMaxTiles) reasons.push(`threeBAppended=${this.stats.threeBAppended}`);
    if (this.pendingRegistry.size > this.threeBMaxTiles) reasons.push(`pendingRegistry.size=${this.pendingRegistry.size}`);
    (candidates || []).forEach(candidate => {
      if (candidate.role !== 'base') reasons.push(`candidate role=${candidate.role}`);
      if (candidate.band !== 'visible') reasons.push(`candidate band=${candidate.band}`);
      if (candidate.validTile !== true) reasons.push('validTile is not true');
      if (candidate.validUrl !== true) reasons.push('validUrl is not true');
      if (candidate.sourceKind === 'se-eiendom') reasons.push('sourceKind is Se Eiendom');
      if (/se[-_ ]?eiendom|matrikkel|eiendom/i.test(candidate.sourceId || '')) reasons.push('sourceId is Se Eiendom/Matrikkel');
    });
    return [...new Set(reasons)];
  },
  threeCStopReasons(candidates) {
    const reasons = [];
    const cleanLayer = document.getElementById('norge-clean-detail-layer');
    const cleanDisplay = cleanLayer ? getComputedStyle(cleanLayer).display : '';
    const pointerEvents = this.layer ? getComputedStyle(this.layer).pointerEvents : '';
    if (cleanDisplay !== 'block') reasons.push(`cleanDisplay=${cleanDisplay || 'missing'}`);
    if (pointerEvents !== 'none') reasons.push(`v2 pointer-events=${pointerEvents || 'missing'}`);
    if (!this.isThreeCTestGateOpen()) reasons.push('3C loader gate not explicitly opened');
    if (this.isThreeATestGateOpen()) reasons.push('3A loader gate is also open');
    if (this.isThreeBTestGateOpen()) reasons.push('3B loader gate is also open');
    if (!Array.isArray(candidates) || candidates.length === 0) reasons.push('missing base:visible candidates');
    if (Array.isArray(candidates) && candidates.length > this.threeCMaxTiles) reasons.push(`candidate count=${candidates.length}`);
    if (this.threeCMaxConcurrent > 1) reasons.push(`maxConcurrent=${this.threeCMaxConcurrent}`);
    if (this.tileRegistry.size > this.threeCMaxTiles) reasons.push(`actualLoaded=${this.tileRegistry.size}`);
    if ((this.stats.actualLoaded || 0) > this.threeCMaxTiles) reasons.push(`actualLoaded=${this.stats.actualLoaded}`);
    if ((this.stats.actualAppended || 0) > this.threeCMaxTiles) reasons.push(`actualAppended=${this.stats.actualAppended}`);
    if ((this.stats.threeCLoaded || 0) > this.threeCMaxTiles) reasons.push(`threeCLoaded=${this.stats.threeCLoaded}`);
    if ((this.stats.threeCAppended || 0) > this.threeCMaxTiles) reasons.push(`threeCAppended=${this.stats.threeCAppended}`);
    if (this.pendingRegistry.size > this.threeCMaxTiles) reasons.push(`pendingRegistry.size=${this.pendingRegistry.size}`);
    (candidates || []).forEach(candidate => {
      if (candidate.role !== 'base') reasons.push(`candidate role=${candidate.role}`);
      if (candidate.band !== 'visible') reasons.push(`candidate band=${candidate.band}`);
      if (candidate.validTile !== true) reasons.push('validTile is not true');
      if (candidate.validUrl !== true) reasons.push('validUrl is not true');
      if (candidate.sourceKind === 'se-eiendom') reasons.push('sourceKind is Se Eiendom');
      if (/se[-_ ]?eiendom|matrikkel|eiendom/i.test(candidate.sourceId || '')) reasons.push('sourceId is Se Eiendom/Matrikkel');
    });
    return [...new Set(reasons)];
  },
  threeDStopReasons(selection) {
    const reasons = [];
    const visible = Array.isArray(selection?.visible) ? selection.visible : [];
    const keep = Array.isArray(selection?.keep) ? selection.keep : [];
    const all = Array.isArray(selection?.all) ? selection.all : [];
    const cleanLayer = document.getElementById('norge-clean-detail-layer');
    const cleanDisplay = cleanLayer ? getComputedStyle(cleanLayer).display : '';
    const pointerEvents = this.layer ? getComputedStyle(this.layer).pointerEvents : '';
    if (cleanDisplay !== 'block') reasons.push(`cleanDisplay=${cleanDisplay || 'missing'}`);
    if (pointerEvents !== 'none') reasons.push(`v2 pointer-events=${pointerEvents || 'missing'}`);
    if (!this.isThreeDTestGateOpen()) reasons.push('3D loader gate not explicitly opened');
    if (this.isThreeATestGateOpen()) reasons.push('3A loader gate is also open');
    if (this.isThreeBTestGateOpen()) reasons.push('3B loader gate is also open');
    if (this.isThreeCTestGateOpen()) reasons.push('3C loader gate is also open');
    if (visible.length === 0) reasons.push('missing base:visible candidates');
    if (visible.length > this.threeDMaxVisibleTiles) reasons.push(`visible candidate count=${visible.length}`);
    if (keep.length > this.threeDMaxKeepTiles) reasons.push(`keep candidate count=${keep.length}`);
    if (all.length > this.threeDMaxTotalTiles) reasons.push(`total candidate count=${all.length}`);
    if (this.threeDMaxConcurrent > 1) reasons.push(`maxConcurrent=${this.threeDMaxConcurrent}`);
    if (this.tileRegistry.size > this.threeDMaxTotalTiles) reasons.push(`actualLoaded=${this.tileRegistry.size}`);
    if ((this.stats.actualLoaded || 0) > this.threeDMaxTotalTiles) reasons.push(`actualLoaded=${this.stats.actualLoaded}`);
    if ((this.stats.actualAppended || 0) > this.threeDMaxTotalTiles) reasons.push(`actualAppended=${this.stats.actualAppended}`);
    if ((this.stats.threeDVisibleLoaded || 0) > this.threeDMaxVisibleTiles) reasons.push(`threeDVisibleLoaded=${this.stats.threeDVisibleLoaded}`);
    if ((this.stats.threeDKeepLoaded || 0) > this.threeDMaxKeepTiles) reasons.push(`threeDKeepLoaded=${this.stats.threeDKeepLoaded}`);
    if ((this.stats.threeDLoaded || 0) > this.threeDMaxTotalTiles) reasons.push(`threeDLoaded=${this.stats.threeDLoaded}`);
    if ((this.stats.threeDAppended || 0) > this.threeDMaxTotalTiles) reasons.push(`threeDAppended=${this.stats.threeDAppended}`);
    if (this.pendingRegistry.size > this.threeDMaxTotalTiles) reasons.push(`pendingRegistry.size=${this.pendingRegistry.size}`);
    visible.forEach(candidate => {
      if (candidate.band !== 'visible') reasons.push(`visible candidate band=${candidate.band}`);
    });
    keep.forEach(candidate => {
      if (candidate.band !== 'keep') reasons.push(`keep candidate band=${candidate.band}`);
    });
    all.forEach(candidate => {
      if (candidate.role !== 'base') reasons.push(`candidate role=${candidate.role}`);
      if (candidate.band !== 'visible' && candidate.band !== 'keep') reasons.push(`candidate band=${candidate.band}`);
      if (candidate.validTile !== true) reasons.push('validTile is not true');
      if (candidate.validUrl !== true) reasons.push('validUrl is not true');
      if (candidate.sourceKind === 'se-eiendom') reasons.push('sourceKind is Se Eiendom');
      if (/se[-_ ]?eiendom|matrikkel|eiendom/i.test(candidate.sourceId || '')) reasons.push('sourceId is Se Eiendom/Matrikkel');
    });
    return [...new Set(reasons)];
  },
  threeEStopReasons(selection) {
    const reasons = [];
    const visible = Array.isArray(selection?.visible) ? selection.visible : [];
    const keep = Array.isArray(selection?.keep) ? selection.keep : [];
    const all = Array.isArray(selection?.all) ? selection.all : [];
    const cleanLayer = document.getElementById('norge-clean-detail-layer');
    const cleanDisplay = cleanLayer ? getComputedStyle(cleanLayer).display : '';
    const pointerEvents = this.layer ? getComputedStyle(this.layer).pointerEvents : '';
    if (cleanDisplay !== 'block') reasons.push(`cleanDisplay=${cleanDisplay || 'missing'}`);
    if (pointerEvents !== 'none') reasons.push(`v2 pointer-events=${pointerEvents || 'missing'}`);
    if (!this.isThreeETestGateOpen()) reasons.push('3E loader gate not explicitly opened');
    if (this.isThreeATestGateOpen()) reasons.push('3A loader gate is also open');
    if (this.isThreeBTestGateOpen()) reasons.push('3B loader gate is also open');
    if (this.isThreeCTestGateOpen()) reasons.push('3C loader gate is also open');
    if (this.isThreeDTestGateOpen()) reasons.push('3D loader gate is also open');
    if (visible.length === 0) reasons.push('missing base:visible candidates');
    if (visible.length > this.threeEMaxVisibleTiles) reasons.push(`visible candidate count=${visible.length}`);
    if (keep.length > this.threeEMaxKeepTiles) reasons.push(`keep candidate count=${keep.length}`);
    if (all.length > this.threeEMaxTotalTiles) reasons.push(`total candidate count=${all.length}`);
    if (this.threeEMaxConcurrent > 2) reasons.push(`maxConcurrent=${this.threeEMaxConcurrent}`);
    if (this.pendingRegistry.size > this.threeEMaxTotalTiles) reasons.push(`pendingRegistry.size=${this.pendingRegistry.size}`);
    if (this.tileRegistry.size > this.threeEMaxTotalTiles) reasons.push(`actualLoaded=${this.tileRegistry.size}`);
    if ((this.stats.actualLoaded || 0) > this.threeEMaxTotalTiles) reasons.push(`actualLoaded=${this.stats.actualLoaded}`);
    if ((this.stats.actualAppended || 0) > this.threeEMaxTotalTiles) reasons.push(`actualAppended=${this.stats.actualAppended}`);
    if ((this.stats.threeEInflight || 0) > this.threeEMaxConcurrent) reasons.push(`threeEInflight=${this.stats.threeEInflight}`);
    if ((this.stats.threeEMaxInflightObserved || 0) > this.threeEMaxConcurrent) reasons.push(`threeEMaxInflightObserved=${this.stats.threeEMaxInflightObserved}`);
    if ((this.stats.threeEVisibleLoaded || 0) > this.threeEMaxVisibleTiles) reasons.push(`threeEVisibleLoaded=${this.stats.threeEVisibleLoaded}`);
    if ((this.stats.threeEKeepLoaded || 0) > this.threeEMaxKeepTiles) reasons.push(`threeEKeepLoaded=${this.stats.threeEKeepLoaded}`);
    if ((this.stats.threeELoaded || 0) > this.threeEMaxTotalTiles) reasons.push(`threeELoaded=${this.stats.threeELoaded}`);
    if ((this.stats.threeEAppended || 0) > this.threeEMaxTotalTiles) reasons.push(`threeEAppended=${this.stats.threeEAppended}`);
    visible.forEach(candidate => {
      if (candidate.band !== 'visible') reasons.push(`visible candidate band=${candidate.band}`);
    });
    keep.forEach(candidate => {
      if (candidate.band !== 'keep') reasons.push(`keep candidate band=${candidate.band}`);
    });
    all.forEach(candidate => {
      if (candidate.role !== 'base') reasons.push(`candidate role=${candidate.role}`);
      if (candidate.band !== 'visible' && candidate.band !== 'keep') reasons.push(`candidate band=${candidate.band}`);
      if (candidate.validTile !== true) reasons.push('validTile is not true');
      if (candidate.validUrl !== true) reasons.push('validUrl is not true');
      if (candidate.sourceKind === 'se-eiendom') reasons.push('sourceKind is Se Eiendom');
      if (/se[-_ ]?eiendom|matrikkel|eiendom/i.test(candidate.sourceId || '')) reasons.push('sourceId is Se Eiendom/Matrikkel');
    });
    return [...new Set(reasons)];
  },
  runThreeASingleBaseTile(snapshot, diff) {
    if (!this.enabled || !this.layer) return { started: false, reasons: ['engine disabled'] };
    if (this.tileRegistry.size > 0 || this.pendingRegistry.size > 0) {
      return { started: false, reasons: ['3A single tile already loaded or pending'] };
    }
    const candidate = this.selectThreeABaseCandidate(snapshot, diff);
    const stopReasons = this.threeAStopReasons(candidate);
    if (stopReasons.length) {
      return { started: false, rejected: true, reasons: stopReasons };
    }

    const tileSize = NORGE_SURFACE_DETAIL.tileSize;
    const originX = candidate.x * tileSize;
    const originY = candidate.y * tileSize;
    const source = (snapshot.sources || []).find(item => item.id === candidate.sourceId) || null;
    const anchorMode = source?.anchorMode || 'norway';
    const transform = cleanNorgeTransform(candidate.z, originX, originY, anchorMode);
    if (!transform) {
      return { started: false, rejected: true, reasons: ['missing cleanNorgeTransform for candidate'] };
    }

    const pane = document.createElement('div');
    pane.className = 'norge-leaflet-style-pixelflate v2-pixelflate-3a';
    pane.style.width = `${tileSize}px`;
    pane.style.height = `${tileSize}px`;
    pane.style.transform = transform.css;
    pane.dataset.v2Pane = '1';
    pane.dataset.phase = '3A';
    pane.dataset.zoom = String(candidate.z);
    pane.dataset.anchorMode = anchorMode;
    pane.dataset.sourceId = candidate.sourceId;

    const img = document.createElement('img');
    img.className = 'norge-leaflet-style-tile v2-tile v2-tile-base v2-tile-visible';
    img.loading = 'eager';
    img.decoding = 'async';
    img.style.left = '0px';
    img.style.top = '0px';
    img.style.width = `${tileSize}px`;
    img.style.height = `${tileSize}px`;
    img.dataset.phase = '3A';
    img.dataset.sourceId = candidate.sourceId;
    img.dataset.role = 'base';
    img.dataset.band = 'visible';
    img.dataset.z = String(candidate.z);
    img.dataset.nativeZ = String(candidate.nativeZ);
    img.dataset.x = String(candidate.x);
    img.dataset.y = String(candidate.y);

    const key = candidate.sourceId + ':3A:z' + candidate.z + ':x' + candidate.x + ':y' + candidate.y;
    this.pendingRegistry.set(key, {
      key,
      candidate,
      startedAt: Date.now(),
      maxConcurrent: this.threeAMaxConcurrent,
      status: 'loading',
    });
    this.stats.state = '3a-loading';
    this.stats.actualPending = this.pendingRegistry.size;
    this.stats.loaderAllowed = true;
    this.stats.loadingEnabled = true;
    this.stats.loaderGateEnabled = true;
    this.stats.loaderGateState = 'open-3a';
    this.stats.maxConcurrentPlan = this.threeAMaxConcurrent;
    this.updateStatus();
    this.publishState();

    img.onload = () => {
      if (pane.dataset.v2Pane !== '1' || !pane.classList.contains('norge-leaflet-style-pixelflate')) {
        this.pendingRegistry.delete(key);
        this.stats.actualPending = this.pendingRegistry.size;
        this.stats.actualFailed += 1;
        this.stats.lastLoadError = '3A append target is not V2-pane';
        this.updateStatus();
        this.publishState();
        return;
      }
      pane.appendChild(img);
      this.layer.appendChild(pane);
      this.pendingRegistry.delete(key);
      this.tileRegistry.set(key, {
        key,
        candidate,
        el: img,
        pane,
        loadedAt: Date.now(),
        status: 'loaded',
      });
      this.levels.set(`z${candidate.z}`, pane);
      this.stats.registrySize = this.tileRegistry.size;
      this.stats.levelCount = this.levels.size;
      this.stats.pendingCount = this.pendingRegistry.size;
      this.stats.actualPending = this.pendingRegistry.size;
      this.stats.actualLoaded = this.tileRegistry.size;
      this.stats.actualAppended += 1;
      this.stats.state = '3a-loaded';
      this.stats.baseLoaded = this.tileRegistry.size;
      this.stats.baseReady = true;
      this.stats.loadingCount = this.pendingRegistry.size;
      this.stats.loaded = this.tileRegistry.size;
      this.stats.pending = this.pendingRegistry.size;
      this.stats.firstLoadedSourceId = candidate.sourceId;
      this.stats.firstLoadedZXY = `${candidate.z}/${candidate.x}/${candidate.y}`;
      this.stats.lastLoadError = '';
      this.updateStatus();
      this.publishState();
    };
    img.onerror = () => {
      this.pendingRegistry.delete(key);
      this.stats.registrySize = this.tileRegistry.size;
      this.stats.levelCount = this.levels.size;
      this.stats.pendingCount = this.pendingRegistry.size;
      this.stats.actualPending = this.pendingRegistry.size;
      this.stats.actualFailed += 1;
      this.stats.state = '3a-failed';
      this.stats.failed += 1;
      this.stats.loadingCount = this.pendingRegistry.size;
      this.stats.pending = this.pendingRegistry.size;
      this.stats.lastLoadError = `${candidate.sourceId} ${candidate.z}/${candidate.x}/${candidate.y}`;
      this.updateStatus();
      this.publishState();
    };
    img.src = candidate.urlText;
    return { started: true, key, candidate };
  },
  runThreeBBaseVisibleTiles(snapshot, diff) {
    if (!this.enabled || !this.layer) return { started: false, reasons: ['engine disabled'] };
    if (this.tileRegistry.size > 0 || this.pendingRegistry.size > 0) {
      return { started: false, reasons: ['3B tiles already loaded or pending'] };
    }
    const candidates = this.selectThreeBBaseCandidates(snapshot, diff);
    const stopReasons = this.threeBStopReasons(candidates);
    if (stopReasons.length) {
      return { started: false, rejected: true, reasons: stopReasons };
    }

    const tileSize = NORGE_SURFACE_DETAIL.tileSize;
    const sourceMap = new Map((snapshot.sources || []).map(source => [source.id, source]));
    this.stats.state = '3b-loading';
    this.stats.loaderMode = '3b-base-visible-only';
    this.stats.loaderAllowed = true;
    this.stats.loadingEnabled = true;
    this.stats.loaderGateEnabled = true;
    this.stats.loaderGateState = 'open-3b-base-visible-only';
    this.stats.maxConcurrentPlan = this.threeBMaxConcurrent;
    this.stats.threeBRequested = candidates.length;
    this.stats.threeBPending = 0;
    this.stats.threeBLoaded = 0;
    this.stats.threeBFailed = 0;
    this.stats.threeBAppended = 0;
    this.stats.threeBLastError = '';
    this.updateStatus();
    this.publishState();

    const startTile = index => {
      if (index >= candidates.length) {
        if (this.pendingRegistry.size === 0) {
          this.stats.state = this.stats.threeBFailed > 0 ? '3b-partial' : '3b-loaded';
          this.stats.baseReady = this.stats.threeBLoaded === candidates.length;
          this.updateStatus();
          this.publishState();
        }
        return;
      }
      if (this.pendingRegistry.size >= this.threeBMaxConcurrent) return;
      if (this.tileRegistry.size >= this.threeBMaxTiles) {
        this.stats.threeBLastError = '3B hard cap reached';
        this.updateStatus();
        this.publishState();
        return;
      }

      const candidate = candidates[index];
      const originX = candidate.x * tileSize;
      const originY = candidate.y * tileSize;
      const source = sourceMap.get(candidate.sourceId) || null;
      const anchorMode = source?.anchorMode || 'norway';
      const transform = cleanNorgeTransform(candidate.z, originX, originY, anchorMode);
      if (!transform) {
        this.stats.threeBRejectedInvalid += 1;
        this.stats.threeBLastError = `missing cleanNorgeTransform for ${candidate.sourceId} ${candidate.z}/${candidate.x}/${candidate.y}`;
        this.updateStatus();
        this.publishState();
        startTile(index + 1);
        return;
      }

      const pane = document.createElement('div');
      pane.className = 'norge-leaflet-style-pixelflate v2-pixelflate-3b';
      pane.style.width = `${tileSize}px`;
      pane.style.height = `${tileSize}px`;
      pane.style.transform = transform.css;
      pane.dataset.v2Pane = '1';
      pane.dataset.phase = '3B';
      pane.dataset.zoom = String(candidate.z);
      pane.dataset.anchorMode = anchorMode;
      pane.dataset.sourceId = candidate.sourceId;

      const img = document.createElement('img');
      img.className = 'norge-leaflet-style-tile v2-tile v2-tile-base v2-tile-visible v2-tile-3b';
      img.loading = 'eager';
      img.decoding = 'async';
      img.style.left = '0px';
      img.style.top = '0px';
      img.style.width = `${tileSize}px`;
      img.style.height = `${tileSize}px`;
      img.dataset.phase = '3B';
      img.dataset.sourceId = candidate.sourceId;
      img.dataset.role = 'base';
      img.dataset.band = 'visible';
      img.dataset.z = String(candidate.z);
      img.dataset.nativeZ = String(candidate.nativeZ);
      img.dataset.x = String(candidate.x);
      img.dataset.y = String(candidate.y);
      img.dataset.loadOrder = String(index + 1);
      img.dataset.distanceToCenter = String(Number((candidate.distanceToCenter ?? 0).toFixed(3)));

      const key = candidate.sourceId + ':3B:z' + candidate.z + ':x' + candidate.x + ':y' + candidate.y;
      this.pendingRegistry.set(key, {
        key,
        candidate,
        startedAt: Date.now(),
        maxConcurrent: this.threeBMaxConcurrent,
        status: 'loading',
      });
      this.stats.pendingCount = this.pendingRegistry.size;
      this.stats.actualPending = this.pendingRegistry.size;
      this.stats.threeBPending = this.pendingRegistry.size;
      this.stats.loadingCount = this.pendingRegistry.size;
      this.stats.pending = this.pendingRegistry.size;
      this.updateStatus();
      this.publishState();

      img.onload = () => {
        if (!this.isThreeBTestGateOpen() || !this.pendingRegistry.has(key)) {
          this.pendingRegistry.delete(key);
          this.stats.pendingCount = this.pendingRegistry.size;
          this.stats.actualPending = this.pendingRegistry.size;
          this.stats.threeBPending = this.pendingRegistry.size;
          this.stats.loadingCount = this.pendingRegistry.size;
          this.stats.pending = this.pendingRegistry.size;
          this.updateStatus();
          this.publishState();
          return;
        }
        if (pane.dataset.v2Pane !== '1' || !pane.classList.contains('norge-leaflet-style-pixelflate')) {
          this.pendingRegistry.delete(key);
          this.stats.pendingCount = this.pendingRegistry.size;
          this.stats.actualPending = this.pendingRegistry.size;
          this.stats.threeBPending = this.pendingRegistry.size;
          this.stats.actualFailed += 1;
          this.stats.threeBFailed += 1;
          this.stats.threeBLastError = '3B append target is not V2-pane';
          this.updateStatus();
          this.publishState();
          startTile(index + 1);
          return;
        }
        if (this.tileRegistry.size >= this.threeBMaxTiles) {
          this.pendingRegistry.delete(key);
          this.stats.pendingCount = this.pendingRegistry.size;
          this.stats.actualPending = this.pendingRegistry.size;
          this.stats.threeBPending = this.pendingRegistry.size;
          this.stats.threeBRejectedInvalid += 1;
          this.stats.threeBLastError = '3B append blocked by hard cap';
          this.updateStatus();
          this.publishState();
          return;
        }
        pane.appendChild(img);
        this.layer.appendChild(pane);
        this.pendingRegistry.delete(key);
        this.tileRegistry.set(key, {
          key,
          candidate,
          el: img,
          pane,
          loadedAt: Date.now(),
          status: 'loaded',
        });
        this.levels.set(`z${candidate.z}:x${candidate.x}:y${candidate.y}`, pane);
        const loadedZxy = `${candidate.z}/${candidate.x}/${candidate.y}`;
        this.stats.registrySize = this.tileRegistry.size;
        this.stats.levelCount = this.levels.size;
        this.stats.pendingCount = this.pendingRegistry.size;
        this.stats.actualPending = this.pendingRegistry.size;
        this.stats.actualLoaded = this.tileRegistry.size;
        this.stats.actualAppended = this.tileRegistry.size;
        this.stats.threeBPending = this.pendingRegistry.size;
        this.stats.threeBLoaded = this.tileRegistry.size;
        this.stats.threeBAppended = this.tileRegistry.size;
        this.stats.baseLoaded = this.tileRegistry.size;
        this.stats.loadingCount = this.pendingRegistry.size;
        this.stats.loaded = this.tileRegistry.size;
        this.stats.pending = this.pendingRegistry.size;
        if (!this.stats.threeBFirstSourceId) this.stats.threeBFirstSourceId = candidate.sourceId;
        this.stats.threeBLoadedZXY = this.stats.threeBLoadedZXY ? `${this.stats.threeBLoadedZXY},${loadedZxy}` : loadedZxy;
        if (!this.stats.firstLoadedSourceId) this.stats.firstLoadedSourceId = candidate.sourceId;
        this.stats.firstLoadedZXY = this.stats.threeBLoadedZXY;
        this.stats.threeBLastError = '';
        this.stats.lastLoadError = '';
        this.updateStatus();
        this.publishState();
        startTile(index + 1);
      };
      img.onerror = () => {
        if (!this.isThreeBTestGateOpen() || !this.pendingRegistry.has(key)) {
          this.pendingRegistry.delete(key);
          this.stats.pendingCount = this.pendingRegistry.size;
          this.stats.actualPending = this.pendingRegistry.size;
          this.stats.threeBPending = this.pendingRegistry.size;
          this.stats.loadingCount = this.pendingRegistry.size;
          this.stats.pending = this.pendingRegistry.size;
          this.updateStatus();
          this.publishState();
          return;
        }
        this.pendingRegistry.delete(key);
        this.stats.registrySize = this.tileRegistry.size;
        this.stats.levelCount = this.levels.size;
        this.stats.pendingCount = this.pendingRegistry.size;
        this.stats.actualPending = this.pendingRegistry.size;
        this.stats.actualFailed += 1;
        this.stats.threeBPending = this.pendingRegistry.size;
        this.stats.threeBFailed += 1;
        this.stats.failed += 1;
        this.stats.loadingCount = this.pendingRegistry.size;
        this.stats.pending = this.pendingRegistry.size;
        this.stats.threeBLastError = `${candidate.sourceId} ${candidate.z}/${candidate.x}/${candidate.y}`;
        this.stats.lastLoadError = this.stats.threeBLastError;
        this.updateStatus();
        this.publishState();
        startTile(index + 1);
      };
      img.src = candidate.urlText;
    };

    startTile(0);
    return { started: true, candidates };
  },
  runThreeCBaseVisibleTiles(snapshot, diff) {
    if (!this.enabled || !this.layer) return { started: false, reasons: ['engine disabled'] };
    if (this.tileRegistry.size > 0 || this.pendingRegistry.size > 0) {
      return { started: false, reasons: ['3C tiles already loaded or pending'] };
    }
    const candidates = this.selectThreeCBaseCandidates(snapshot, diff);
    const stopReasons = this.threeCStopReasons(candidates);
    if (stopReasons.length) {
      return { started: false, rejected: true, reasons: stopReasons };
    }

    const tileSize = NORGE_SURFACE_DETAIL.tileSize;
    const sourceMap = new Map((snapshot.sources || []).map(source => [source.id, source]));
    this.stats.state = '3c-loading';
    this.stats.loaderMode = '3c-base-visible-only';
    this.stats.loaderAllowed = true;
    this.stats.loadingEnabled = true;
    this.stats.loaderGateEnabled = true;
    this.stats.loaderGateState = 'open-3c-base-visible-only';
    this.stats.maxConcurrentPlan = this.threeCMaxConcurrent;
    this.stats.threeCRequested = candidates.length;
    this.stats.threeCPending = 0;
    this.stats.threeCLoaded = 0;
    this.stats.threeCFailed = 0;
    this.stats.threeCAppended = 0;
    this.stats.threeCLastError = '';
    this.updateStatus();
    this.publishState();

    const startTile = index => {
      if (index >= candidates.length) {
        if (this.pendingRegistry.size === 0) {
          this.stats.state = this.stats.threeCFailed > 0 ? '3c-partial' : '3c-loaded';
          this.stats.baseReady = this.stats.threeCLoaded === candidates.length;
          this.updateStatus();
          this.publishState();
        }
        return;
      }
      if (this.pendingRegistry.size >= this.threeCMaxConcurrent) return;
      if (this.tileRegistry.size >= this.threeCMaxTiles) {
        this.stats.threeCLastError = '3C hard cap reached';
        this.updateStatus();
        this.publishState();
        return;
      }

      const candidate = candidates[index];
      const originX = candidate.x * tileSize;
      const originY = candidate.y * tileSize;
      const source = sourceMap.get(candidate.sourceId) || null;
      const anchorMode = source?.anchorMode || 'norway';
      const transform = cleanNorgeTransform(candidate.z, originX, originY, anchorMode);
      if (!transform) {
        this.stats.threeCRejectedInvalid += 1;
        this.stats.threeCLastError = `missing cleanNorgeTransform for ${candidate.sourceId} ${candidate.z}/${candidate.x}/${candidate.y}`;
        this.updateStatus();
        this.publishState();
        startTile(index + 1);
        return;
      }

      const pane = document.createElement('div');
      pane.className = 'norge-leaflet-style-pixelflate v2-pixelflate-3c';
      pane.style.width = `${tileSize}px`;
      pane.style.height = `${tileSize}px`;
      pane.style.transform = transform.css;
      pane.dataset.v2Pane = '1';
      pane.dataset.phase = '3C';
      pane.dataset.zoom = String(candidate.z);
      pane.dataset.anchorMode = anchorMode;
      pane.dataset.sourceId = candidate.sourceId;

      const img = document.createElement('img');
      img.className = 'norge-leaflet-style-tile v2-tile v2-tile-base v2-tile-visible v2-tile-3c';
      img.loading = 'eager';
      img.decoding = 'async';
      img.style.left = '0px';
      img.style.top = '0px';
      img.style.width = `${tileSize}px`;
      img.style.height = `${tileSize}px`;
      img.dataset.phase = '3C';
      img.dataset.sourceId = candidate.sourceId;
      img.dataset.role = 'base';
      img.dataset.band = 'visible';
      img.dataset.z = String(candidate.z);
      img.dataset.nativeZ = String(candidate.nativeZ);
      img.dataset.x = String(candidate.x);
      img.dataset.y = String(candidate.y);
      img.dataset.loadOrder = String(index + 1);
      img.dataset.distanceToCenter = String(Number((candidate.distanceToCenter ?? 0).toFixed(3)));

      const key = candidate.sourceId + ':3C:z' + candidate.z + ':x' + candidate.x + ':y' + candidate.y;
      this.pendingRegistry.set(key, {
        key,
        candidate,
        startedAt: Date.now(),
        maxConcurrent: this.threeCMaxConcurrent,
        status: 'loading',
      });
      this.stats.pendingCount = this.pendingRegistry.size;
      this.stats.actualPending = this.pendingRegistry.size;
      this.stats.threeCPending = this.pendingRegistry.size;
      this.stats.loadingCount = this.pendingRegistry.size;
      this.stats.pending = this.pendingRegistry.size;
      this.updateStatus();
      this.publishState();

      img.onload = () => {
        if (!this.isThreeCTestGateOpen() || !this.pendingRegistry.has(key)) {
          this.pendingRegistry.delete(key);
          this.stats.pendingCount = this.pendingRegistry.size;
          this.stats.actualPending = this.pendingRegistry.size;
          this.stats.threeCPending = this.pendingRegistry.size;
          this.stats.loadingCount = this.pendingRegistry.size;
          this.stats.pending = this.pendingRegistry.size;
          this.updateStatus();
          this.publishState();
          return;
        }
        if (pane.dataset.v2Pane !== '1' || !pane.classList.contains('norge-leaflet-style-pixelflate')) {
          this.pendingRegistry.delete(key);
          this.stats.pendingCount = this.pendingRegistry.size;
          this.stats.actualPending = this.pendingRegistry.size;
          this.stats.threeCPending = this.pendingRegistry.size;
          this.stats.actualFailed += 1;
          this.stats.threeCFailed += 1;
          this.stats.threeCLastError = '3C append target is not V2-pane';
          this.updateStatus();
          this.publishState();
          startTile(index + 1);
          return;
        }
        if (this.tileRegistry.size >= this.threeCMaxTiles) {
          this.pendingRegistry.delete(key);
          this.stats.pendingCount = this.pendingRegistry.size;
          this.stats.actualPending = this.pendingRegistry.size;
          this.stats.threeCPending = this.pendingRegistry.size;
          this.stats.threeCRejectedInvalid += 1;
          this.stats.threeCLastError = '3C append blocked by hard cap';
          this.updateStatus();
          this.publishState();
          return;
        }
        pane.appendChild(img);
        this.layer.appendChild(pane);
        this.pendingRegistry.delete(key);
        this.tileRegistry.set(key, {
          key,
          candidate,
          el: img,
          pane,
          loadedAt: Date.now(),
          status: 'loaded',
        });
        this.levels.set(`z${candidate.z}:x${candidate.x}:y${candidate.y}`, pane);
        const loadedZxy = `${candidate.z}/${candidate.x}/${candidate.y}`;
        this.stats.registrySize = this.tileRegistry.size;
        this.stats.levelCount = this.levels.size;
        this.stats.pendingCount = this.pendingRegistry.size;
        this.stats.actualPending = this.pendingRegistry.size;
        this.stats.actualLoaded = this.tileRegistry.size;
        this.stats.actualAppended = this.tileRegistry.size;
        this.stats.threeCPending = this.pendingRegistry.size;
        this.stats.threeCLoaded = this.tileRegistry.size;
        this.stats.threeCAppended = this.tileRegistry.size;
        this.stats.baseLoaded = this.tileRegistry.size;
        this.stats.loadingCount = this.pendingRegistry.size;
        this.stats.loaded = this.tileRegistry.size;
        this.stats.pending = this.pendingRegistry.size;
        if (!this.stats.threeCFirstSourceId) this.stats.threeCFirstSourceId = candidate.sourceId;
        this.stats.threeCLoadedZXY = this.stats.threeCLoadedZXY ? `${this.stats.threeCLoadedZXY},${loadedZxy}` : loadedZxy;
        if (!this.stats.firstLoadedSourceId) this.stats.firstLoadedSourceId = candidate.sourceId;
        this.stats.firstLoadedZXY = this.stats.threeCLoadedZXY;
        this.stats.threeCLastError = '';
        this.stats.lastLoadError = '';
        this.updateStatus();
        this.publishState();
        startTile(index + 1);
      };
      img.onerror = () => {
        if (!this.isThreeCTestGateOpen() || !this.pendingRegistry.has(key)) {
          this.pendingRegistry.delete(key);
          this.stats.pendingCount = this.pendingRegistry.size;
          this.stats.actualPending = this.pendingRegistry.size;
          this.stats.threeCPending = this.pendingRegistry.size;
          this.stats.loadingCount = this.pendingRegistry.size;
          this.stats.pending = this.pendingRegistry.size;
          this.updateStatus();
          this.publishState();
          return;
        }
        this.pendingRegistry.delete(key);
        this.stats.registrySize = this.tileRegistry.size;
        this.stats.levelCount = this.levels.size;
        this.stats.pendingCount = this.pendingRegistry.size;
        this.stats.actualPending = this.pendingRegistry.size;
        this.stats.actualFailed += 1;
        this.stats.threeCPending = this.pendingRegistry.size;
        this.stats.threeCFailed += 1;
        this.stats.failed += 1;
        this.stats.loadingCount = this.pendingRegistry.size;
        this.stats.pending = this.pendingRegistry.size;
        this.stats.threeCLastError = `${candidate.sourceId} ${candidate.z}/${candidate.x}/${candidate.y}`;
        this.stats.lastLoadError = this.stats.threeCLastError;
        this.updateStatus();
        this.publishState();
        startTile(index + 1);
      };
      img.src = candidate.urlText;
    };

    startTile(0);
    return { started: true, candidates };
  },
  runThreeDBaseKeepTiles(snapshot, diff) {
    if (!this.enabled || !this.layer) return { started: false, reasons: ['engine disabled'] };
    if (this.tileRegistry.size > 0 || this.pendingRegistry.size > 0) {
      return { started: false, reasons: ['3D tiles already loaded or pending'] };
    }
    const selection = this.selectThreeDBaseCandidates(snapshot, diff);
    const candidates = selection.all;
    const stopReasons = this.threeDStopReasons(selection);
    if (stopReasons.length) {
      return { started: false, rejected: true, reasons: stopReasons };
    }

    const tileSize = NORGE_SURFACE_DETAIL.tileSize;
    const sourceMap = new Map((snapshot.sources || []).map(source => [source.id, source]));
    this.stats.state = '3d-loading';
    this.stats.loaderMode = '3d-base-visible-plus-keep';
    this.stats.loaderAllowed = true;
    this.stats.loadingEnabled = true;
    this.stats.loaderGateEnabled = true;
    this.stats.loaderGateState = 'open-3d-base-keep-buffer';
    this.stats.maxConcurrentPlan = this.threeDMaxConcurrent;
    this.stats.threeDVisibleRequested = selection.visible.length;
    this.stats.threeDKeepRequested = selection.keep.length;
    this.stats.threeDTotalRequested = candidates.length;
    this.stats.threeDPending = 0;
    this.stats.threeDVisibleLoaded = 0;
    this.stats.threeDKeepLoaded = 0;
    this.stats.threeDLoaded = 0;
    this.stats.threeDFailed = 0;
    this.stats.threeDAppended = 0;
    this.stats.threeDLoadedZXY = '';
    this.stats.threeDLoadedBands = '';
    this.stats.threeDLastError = '';
    this.updateStatus();
    this.publishState();

    const startTile = index => {
      if (index >= candidates.length) {
        if (this.pendingRegistry.size === 0) {
          this.stats.state = this.stats.threeDFailed > 0 ? '3d-partial' : '3d-loaded';
          this.stats.baseReady = this.stats.threeDVisibleLoaded === selection.visible.length;
          this.updateStatus();
          this.publishState();
        }
        return;
      }
      if (this.pendingRegistry.size >= this.threeDMaxConcurrent) return;
      if (this.tileRegistry.size >= this.threeDMaxTotalTiles) {
        this.stats.threeDLastError = '3D hard cap reached';
        this.updateStatus();
        this.publishState();
        return;
      }

      const candidate = candidates[index];
      if (candidate.band === 'keep' && this.stats.threeDVisibleLoaded < selection.visible.length) {
        this.stats.threeDRejectedInvalid += 1;
        this.stats.threeDLastError = '3D keep blocked until visible complete';
        this.updateStatus();
        this.publishState();
        return;
      }

      const originX = candidate.x * tileSize;
      const originY = candidate.y * tileSize;
      const source = sourceMap.get(candidate.sourceId) || null;
      const anchorMode = source?.anchorMode || 'norway';
      const transform = cleanNorgeTransform(candidate.z, originX, originY, anchorMode);
      if (!transform) {
        this.stats.threeDRejectedInvalid += 1;
        this.stats.threeDLastError = `missing cleanNorgeTransform for ${candidate.sourceId} ${candidate.z}/${candidate.x}/${candidate.y}`;
        this.updateStatus();
        this.publishState();
        startTile(index + 1);
        return;
      }

      const pane = document.createElement('div');
      pane.className = 'norge-leaflet-style-pixelflate v2-pixelflate-3d';
      pane.style.width = `${tileSize}px`;
      pane.style.height = `${tileSize}px`;
      pane.style.transform = transform.css;
      pane.dataset.v2Pane = '1';
      pane.dataset.phase = '3D';
      pane.dataset.zoom = String(candidate.z);
      pane.dataset.anchorMode = anchorMode;
      pane.dataset.sourceId = candidate.sourceId;
      pane.dataset.band = candidate.band;

      const img = document.createElement('img');
      img.className = `norge-leaflet-style-tile v2-tile v2-tile-base v2-tile-${candidate.band} v2-tile-3d`;
      img.loading = 'eager';
      img.decoding = 'async';
      img.style.left = '0px';
      img.style.top = '0px';
      img.style.width = `${tileSize}px`;
      img.style.height = `${tileSize}px`;
      img.dataset.phase = '3D';
      img.dataset.sourceId = candidate.sourceId;
      img.dataset.role = 'base';
      img.dataset.band = candidate.band;
      img.dataset.z = String(candidate.z);
      img.dataset.nativeZ = String(candidate.nativeZ);
      img.dataset.x = String(candidate.x);
      img.dataset.y = String(candidate.y);
      img.dataset.loadOrder = String(index + 1);
      img.dataset.distanceToCenter = String(Number((candidate.distanceToCenter ?? 0).toFixed(3)));

      const key = candidate.sourceId + ':3D:' + candidate.band + ':z' + candidate.z + ':x' + candidate.x + ':y' + candidate.y;
      this.pendingRegistry.set(key, {
        key,
        candidate,
        startedAt: Date.now(),
        maxConcurrent: this.threeDMaxConcurrent,
        status: 'loading',
      });
      this.stats.pendingCount = this.pendingRegistry.size;
      this.stats.actualPending = this.pendingRegistry.size;
      this.stats.threeDPending = this.pendingRegistry.size;
      this.stats.loadingCount = this.pendingRegistry.size;
      this.stats.pending = this.pendingRegistry.size;
      this.updateStatus();
      this.publishState();

      img.onload = () => {
        if (!this.isThreeDTestGateOpen() || !this.pendingRegistry.has(key)) {
          this.pendingRegistry.delete(key);
          this.stats.pendingCount = this.pendingRegistry.size;
          this.stats.actualPending = this.pendingRegistry.size;
          this.stats.threeDPending = this.pendingRegistry.size;
          this.stats.loadingCount = this.pendingRegistry.size;
          this.stats.pending = this.pendingRegistry.size;
          this.updateStatus();
          this.publishState();
          return;
        }
        if (pane.dataset.v2Pane !== '1' || !pane.classList.contains('norge-leaflet-style-pixelflate')) {
          this.pendingRegistry.delete(key);
          this.stats.pendingCount = this.pendingRegistry.size;
          this.stats.actualPending = this.pendingRegistry.size;
          this.stats.threeDPending = this.pendingRegistry.size;
          this.stats.actualFailed += 1;
          this.stats.threeDFailed += 1;
          this.stats.threeDLastError = '3D append target is not V2-pane';
          this.updateStatus();
          this.publishState();
          startTile(index + 1);
          return;
        }
        if (this.tileRegistry.size >= this.threeDMaxTotalTiles) {
          this.pendingRegistry.delete(key);
          this.stats.pendingCount = this.pendingRegistry.size;
          this.stats.actualPending = this.pendingRegistry.size;
          this.stats.threeDPending = this.pendingRegistry.size;
          this.stats.threeDRejectedInvalid += 1;
          this.stats.threeDLastError = '3D append blocked by hard cap';
          this.updateStatus();
          this.publishState();
          return;
        }
        if (candidate.band === 'keep' && this.stats.threeDVisibleLoaded < selection.visible.length) {
          this.pendingRegistry.delete(key);
          this.stats.pendingCount = this.pendingRegistry.size;
          this.stats.actualPending = this.pendingRegistry.size;
          this.stats.threeDPending = this.pendingRegistry.size;
          this.stats.threeDRejectedInvalid += 1;
          this.stats.threeDLastError = '3D keep append blocked until visible complete';
          this.updateStatus();
          this.publishState();
          return;
        }
        pane.appendChild(img);
        this.layer.appendChild(pane);
        this.pendingRegistry.delete(key);
        this.tileRegistry.set(key, {
          key,
          candidate,
          el: img,
          pane,
          loadedAt: Date.now(),
          status: 'loaded',
        });
        this.levels.set(`z${candidate.z}:x${candidate.x}:y${candidate.y}:${candidate.band}`, pane);
        const loadedZxy = `${candidate.z}/${candidate.x}/${candidate.y}`;
        this.stats.registrySize = this.tileRegistry.size;
        this.stats.levelCount = this.levels.size;
        this.stats.pendingCount = this.pendingRegistry.size;
        this.stats.actualPending = this.pendingRegistry.size;
        this.stats.actualLoaded = this.tileRegistry.size;
        this.stats.actualAppended = this.tileRegistry.size;
        this.stats.threeDPending = this.pendingRegistry.size;
        this.stats.threeDLoaded = this.tileRegistry.size;
        this.stats.threeDAppended = this.tileRegistry.size;
        if (candidate.band === 'visible') this.stats.threeDVisibleLoaded += 1;
        if (candidate.band === 'keep') this.stats.threeDKeepLoaded += 1;
        this.stats.baseLoaded = this.tileRegistry.size;
        this.stats.loadingCount = this.pendingRegistry.size;
        this.stats.loaded = this.tileRegistry.size;
        this.stats.pending = this.pendingRegistry.size;
        if (!this.stats.threeDFirstSourceId) this.stats.threeDFirstSourceId = candidate.sourceId;
        this.stats.threeDLoadedZXY = this.stats.threeDLoadedZXY ? `${this.stats.threeDLoadedZXY},${loadedZxy}` : loadedZxy;
        this.stats.threeDLoadedBands = this.stats.threeDLoadedBands ? `${this.stats.threeDLoadedBands},${candidate.band}` : candidate.band;
        if (!this.stats.firstLoadedSourceId) this.stats.firstLoadedSourceId = candidate.sourceId;
        this.stats.firstLoadedZXY = this.stats.threeDLoadedZXY;
        this.stats.threeDLastError = '';
        this.stats.lastLoadError = '';
        this.updateStatus();
        this.publishState();
        startTile(index + 1);
      };
      img.onerror = () => {
        if (!this.isThreeDTestGateOpen() || !this.pendingRegistry.has(key)) {
          this.pendingRegistry.delete(key);
          this.stats.pendingCount = this.pendingRegistry.size;
          this.stats.actualPending = this.pendingRegistry.size;
          this.stats.threeDPending = this.pendingRegistry.size;
          this.stats.loadingCount = this.pendingRegistry.size;
          this.stats.pending = this.pendingRegistry.size;
          this.updateStatus();
          this.publishState();
          return;
        }
        this.pendingRegistry.delete(key);
        this.stats.registrySize = this.tileRegistry.size;
        this.stats.levelCount = this.levels.size;
        this.stats.pendingCount = this.pendingRegistry.size;
        this.stats.actualPending = this.pendingRegistry.size;
        this.stats.actualFailed += 1;
        this.stats.threeDPending = this.pendingRegistry.size;
        this.stats.threeDFailed += 1;
        this.stats.failed += 1;
        this.stats.loadingCount = this.pendingRegistry.size;
        this.stats.pending = this.pendingRegistry.size;
        this.stats.threeDLastError = `${candidate.sourceId} ${candidate.z}/${candidate.x}/${candidate.y}`;
        this.stats.lastLoadError = this.stats.threeDLastError;
        this.updateStatus();
        this.publishState();
        startTile(index + 1);
      };
      img.src = candidate.urlText;
    };

    startTile(0);
    return { started: true, selection };
  },
  runThreeEConcurrentBaseTiles(snapshot, diff) {
    if (!this.enabled || !this.layer) return { started: false, reasons: ['engine disabled'] };
    if (this.tileRegistry.size > 0 || this.pendingRegistry.size > 0) {
      return { started: false, reasons: ['3E tiles already loaded or pending'] };
    }
    const selection = this.selectThreeEBaseCandidates(snapshot, diff);
    const candidates = selection.all;
    const stopReasons = this.threeEStopReasons(selection);
    if (stopReasons.length) {
      return { started: false, rejected: true, reasons: stopReasons };
    }

    const tileSize = NORGE_SURFACE_DETAIL.tileSize;
    const sourceMap = new Map((snapshot.sources || []).map(source => [source.id, source]));
    let nextIndex = 0;
    this.stats.state = '3e-loading';
    this.stats.loaderMode = '3e-concurrent-base-loading-max2';
    this.stats.loaderAllowed = true;
    this.stats.loadingEnabled = true;
    this.stats.loaderGateEnabled = true;
    this.stats.loaderGateState = 'open-3e-concurrent-base-max2';
    this.stats.maxConcurrentPlan = this.threeEMaxConcurrent;
    this.stats.threeEVisibleRequested = selection.visible.length;
    this.stats.threeEKeepRequested = selection.keep.length;
    this.stats.threeETotalRequested = candidates.length;
    this.stats.threeEPending = 0;
    this.stats.threeEInflight = 0;
    this.stats.threeEMaxInflightObserved = 0;
    this.stats.threeEVisibleLoaded = 0;
    this.stats.threeEKeepLoaded = 0;
    this.stats.threeELoaded = 0;
    this.stats.threeEFailed = 0;
    this.stats.threeEAppended = 0;
    this.stats.threeELoadedZXY = '';
    this.stats.threeELoadedBands = '';
    this.stats.threeELastError = '';
    this.updateStatus();
    this.publishState();

    const updateInflightStats = () => {
      this.stats.threeEPending = this.pendingRegistry.size;
      this.stats.threeEInflight = this.pendingRegistry.size;
      this.stats.threeEMaxInflightObserved = Math.max(this.stats.threeEMaxInflightObserved || 0, this.pendingRegistry.size);
      this.stats.pendingCount = this.pendingRegistry.size;
      this.stats.actualPending = this.pendingRegistry.size;
      this.stats.loadingCount = this.pendingRegistry.size;
      this.stats.pending = this.pendingRegistry.size;
    };

    const maybeFinish = () => {
      if (nextIndex >= candidates.length && this.pendingRegistry.size === 0) {
        this.stats.state = this.stats.threeEFailed > 0 ? '3e-partial' : '3e-loaded';
        this.stats.baseReady = this.stats.threeEVisibleLoaded === selection.visible.length;
        updateInflightStats();
        this.updateStatus();
        this.publishState();
        return true;
      }
      return false;
    };

    const pump = () => {
      if (maybeFinish()) return;
      while (this.pendingRegistry.size < this.threeEMaxConcurrent && nextIndex < candidates.length) {
        if (this.tileRegistry.size >= this.threeEMaxTotalTiles) {
          this.stats.threeELastError = '3E hard cap reached';
          this.updateStatus();
          this.publishState();
          return;
        }

        const candidate = candidates[nextIndex];
        if (candidate.band === 'keep' && this.stats.threeEVisibleLoaded < selection.visible.length) {
          updateInflightStats();
          this.updateStatus();
          this.publishState();
          return;
        }
        nextIndex += 1;
        startTile(candidate, nextIndex);
      }
      updateInflightStats();
      this.updateStatus();
      this.publishState();
    };

    const startTile = (candidate, loadOrder) => {
      const originX = candidate.x * tileSize;
      const originY = candidate.y * tileSize;
      const source = sourceMap.get(candidate.sourceId) || null;
      const anchorMode = source?.anchorMode || 'norway';
      const transform = cleanNorgeTransform(candidate.z, originX, originY, anchorMode);
      if (!transform) {
        this.stats.threeERejectedInvalid += 1;
        this.stats.threeELastError = `missing cleanNorgeTransform for ${candidate.sourceId} ${candidate.z}/${candidate.x}/${candidate.y}`;
        pump();
        return;
      }

      const pane = document.createElement('div');
      pane.className = 'norge-leaflet-style-pixelflate v2-pixelflate-3e';
      pane.style.width = `${tileSize}px`;
      pane.style.height = `${tileSize}px`;
      pane.style.transform = transform.css;
      pane.dataset.v2Pane = '1';
      pane.dataset.phase = '3E';
      pane.dataset.zoom = String(candidate.z);
      pane.dataset.anchorMode = anchorMode;
      pane.dataset.sourceId = candidate.sourceId;
      pane.dataset.band = candidate.band;

      const img = document.createElement('img');
      img.className = `norge-leaflet-style-tile v2-tile v2-tile-base v2-tile-${candidate.band} v2-tile-3e`;
      img.loading = 'eager';
      img.decoding = 'async';
      img.style.left = '0px';
      img.style.top = '0px';
      img.style.width = `${tileSize}px`;
      img.style.height = `${tileSize}px`;
      img.dataset.phase = '3E';
      img.dataset.sourceId = candidate.sourceId;
      img.dataset.role = 'base';
      img.dataset.band = candidate.band;
      img.dataset.z = String(candidate.z);
      img.dataset.nativeZ = String(candidate.nativeZ);
      img.dataset.x = String(candidate.x);
      img.dataset.y = String(candidate.y);
      img.dataset.loadOrder = String(loadOrder);
      img.dataset.distanceToCenter = String(Number((candidate.distanceToCenter ?? 0).toFixed(3)));

      const key = candidate.sourceId + ':3E:' + candidate.band + ':z' + candidate.z + ':x' + candidate.x + ':y' + candidate.y;
      this.pendingRegistry.set(key, {
        key,
        candidate,
        startedAt: Date.now(),
        maxConcurrent: this.threeEMaxConcurrent,
        status: 'loading',
      });
      updateInflightStats();
      this.updateStatus();
      this.publishState();

      img.onload = () => {
        if (!this.isThreeETestGateOpen() || !this.pendingRegistry.has(key)) {
          this.pendingRegistry.delete(key);
          updateInflightStats();
          this.updateStatus();
          this.publishState();
          pump();
          return;
        }
        if (pane.dataset.v2Pane !== '1' || !pane.classList.contains('norge-leaflet-style-pixelflate')) {
          this.pendingRegistry.delete(key);
          updateInflightStats();
          this.stats.actualFailed += 1;
          this.stats.threeEFailed += 1;
          this.stats.threeELastError = '3E append target is not V2-pane';
          this.updateStatus();
          this.publishState();
          pump();
          return;
        }
        if (this.tileRegistry.size >= this.threeEMaxTotalTiles) {
          this.pendingRegistry.delete(key);
          updateInflightStats();
          this.stats.threeERejectedInvalid += 1;
          this.stats.threeELastError = '3E append blocked by hard cap';
          this.updateStatus();
          this.publishState();
          pump();
          return;
        }
        if (candidate.band === 'keep' && this.stats.threeEVisibleLoaded < selection.visible.length) {
          this.pendingRegistry.delete(key);
          updateInflightStats();
          this.stats.threeERejectedInvalid += 1;
          this.stats.threeELastError = '3E keep append blocked until visible complete';
          this.updateStatus();
          this.publishState();
          pump();
          return;
        }
        pane.appendChild(img);
        this.layer.appendChild(pane);
        this.pendingRegistry.delete(key);
        this.tileRegistry.set(key, {
          key,
          candidate,
          el: img,
          pane,
          loadedAt: Date.now(),
          status: 'loaded',
        });
        this.levels.set(`z${candidate.z}:x${candidate.x}:y${candidate.y}:${candidate.band}`, pane);
        const loadedZxy = `${candidate.z}/${candidate.x}/${candidate.y}`;
        this.stats.registrySize = this.tileRegistry.size;
        this.stats.levelCount = this.levels.size;
        this.stats.actualLoaded = this.tileRegistry.size;
        this.stats.actualAppended = this.tileRegistry.size;
        this.stats.threeELoaded = this.tileRegistry.size;
        this.stats.threeEAppended = this.tileRegistry.size;
        if (candidate.band === 'visible') this.stats.threeEVisibleLoaded += 1;
        if (candidate.band === 'keep') this.stats.threeEKeepLoaded += 1;
        this.stats.baseLoaded = this.tileRegistry.size;
        this.stats.loaded = this.tileRegistry.size;
        if (!this.stats.threeEFirstSourceId) this.stats.threeEFirstSourceId = candidate.sourceId;
        this.stats.threeELoadedZXY = this.stats.threeELoadedZXY ? `${this.stats.threeELoadedZXY},${loadedZxy}` : loadedZxy;
        this.stats.threeELoadedBands = this.stats.threeELoadedBands ? `${this.stats.threeELoadedBands},${candidate.band}` : candidate.band;
        if (!this.stats.firstLoadedSourceId) this.stats.firstLoadedSourceId = candidate.sourceId;
        this.stats.firstLoadedZXY = this.stats.threeELoadedZXY;
        this.stats.threeELastError = '';
        this.stats.lastLoadError = '';
        updateInflightStats();
        this.updateStatus();
        this.publishState();
        pump();
      };
      img.onerror = () => {
        if (!this.isThreeETestGateOpen() || !this.pendingRegistry.has(key)) {
          this.pendingRegistry.delete(key);
          updateInflightStats();
          this.updateStatus();
          this.publishState();
          pump();
          return;
        }
        this.pendingRegistry.delete(key);
        this.stats.registrySize = this.tileRegistry.size;
        this.stats.levelCount = this.levels.size;
        this.stats.actualFailed += 1;
        this.stats.threeEFailed += 1;
        this.stats.failed += 1;
        this.stats.threeELastError = `${candidate.sourceId} ${candidate.z}/${candidate.x}/${candidate.y}`;
        this.stats.lastLoadError = this.stats.threeELastError;
        updateInflightStats();
        this.updateStatus();
        this.publishState();
        pump();
      };
      img.src = candidate.urlText;
    };

    pump();
    return { started: true, selection };
  },
  computeTileDiff(snapshot) {
    const warnings = [];
    const zoom = snapshot.zoom.tileZoom;
    const visibleRange = snapshot.view.visibleRange;
    const keepRange = this.expandRangeForKeep(visibleRange, zoom);
    const queueCenter = this.rangeCenter(visibleRange);
    const sources = snapshot.sources.filter(source => source.enabled);
    const visiblePerSource = this.countRangeTiles(visibleRange);
    const keepPerSource = this.countRangeTiles(keepRange);
    const totalKeep = keepPerSource * sources.length;
    const maxDryRunKeys = Math.max(1, Math.min(NORGE_SURFACE_DETAIL.maxTiles, 5000));
    const rejectedReason = !visibleRange
      ? 'missing visibleRange'
      : !keepRange
        ? 'missing keepRange'
        : !Number.isFinite(zoom)
          ? 'missing tileZoom'
          : totalKeep > maxDryRunKeys
            ? `keep key count ${totalKeep} exceeds dry-run cap ${maxDryRunKeys}`
            : '';
    const rejected = rejectedReason !== '';
    const visibleKeys = new Set();
    const keepKeys = new Set();
    const sourceStats = {};
    let priorityQueue = [];

    if (rejectedReason) warnings.push(rejectedReason);

    if (!rejected) {
      sources.forEach(source => {
        const sourceVisibleKeys = new Set();
        const sourceKeepKeys = new Set();
        this.addDryRunKeysForRange(sourceVisibleKeys, source, zoom, visibleRange);
        this.addDryRunKeysForRange(sourceKeepKeys, source, zoom, keepRange);
        sourceVisibleKeys.forEach(key => visibleKeys.add(key));
        sourceKeepKeys.forEach(key => keepKeys.add(key));
        sourceStats[source.id] = {
          kind: source.role === 'overlay' ? 'overlay' : 'base',
          visible: sourceVisibleKeys.size,
          keep: sourceKeepKeys.size,
          queueVisible: 0,
          queueKeep: 0,
          enter: 0,
          stay: 0,
          leave: 0,
        };
      });
    } else {
      sources.forEach(source => {
        sourceStats[source.id] = {
          kind: source.role === 'overlay' ? 'overlay' : 'base',
          visible: visiblePerSource,
          keep: keepPerSource,
          queueVisible: 0,
          queueKeep: 0,
          enter: 0,
          stay: 0,
          leave: 0,
        };
      });
    }

    const previousKeepKeys = this.dryRun.keepKeys;
    const enterKeys = new Set([...keepKeys].filter(key => !previousKeepKeys.has(key)));
    const stayKeys = new Set([...keepKeys].filter(key => previousKeepKeys.has(key)));
    const leaveKeys = new Set([...previousKeepKeys].filter(key => !keepKeys.has(key)));

    if (!rejected) {
      priorityQueue = this.buildPriorityQueue(sources, zoom, visibleRange, keepRange, visibleKeys, keepKeys, queueCenter);
      sources.forEach(source => {
        const prefix = `${source.id}:${source.version}:${source.role}:${source.anchorMode}:`;
        const stats = sourceStats[source.id];
        stats.enter = [...enterKeys].filter(key => key.startsWith(prefix)).length;
        stats.stay = [...stayKeys].filter(key => key.startsWith(prefix)).length;
        stats.leave = [...leaveKeys].filter(key => key.startsWith(prefix)).length;
        stats.queueVisible = priorityQueue.filter(item => item.sourceId === source.id && item.band === 'visible').length;
        stats.queueKeep = priorityQueue.filter(item => item.sourceId === source.id && item.band === 'keep').length;
      });
    }

    return {
      visibleKeys,
      keepKeys,
      previousKeepKeys,
      enterKeys,
      stayKeys,
      leaveKeys,
      sourceStats,
      priorityQueue,
      queueCenter,
      queueCap: maxDryRunKeys,
      queueRejectedReason: rejectedReason,
      rejected,
      warnings,
      visiblePerSource,
      keepPerSource,
    };
  },
  getCoreSnapshot() {
    const sources = currentNorgeDetailSources().map((source, index) => ({
      id: this.makeSourceId(source),
      version: this.sourceVersion,
      type: source.type,
      layer: source.layer,
      role: source.role || 'base',
      anchorMode: cleanSourceAnchorMode(source),
      priority: source.role === 'overlay' ? 1 : 0,
      enabled: true,
      order: index,
    }));
    const visibleBounds = norgeLastVisibleSourceBounds
      ? { ...norgeLastVisibleSourceBounds }
      : null;
    const diag = norgeCleanDiagnosticsV1;
    return deepFreezePlain({
      schema: 'kartmotor-v2-core-snapshot-v1',
      timestamp: Date.now(),
      frameId: Math.round(performance.now()),
      geometry: {
        profileId: 'enok72-norge-clean-locked',
        transformId: 'cleanNorgeTransform',
        transformRevision: 'clean-v1',
        anchorRevision: 'locked-control-points-v1',
        aeProjectRevision: 'locked-aeProject',
        geGridRevision: 'locked-ge-grid',
        truthLocked: true,
      },
      transform: {
        tileSize: NORGE_SURFACE_DETAIL.tileSize,
        minZoom: NORGE_SURFACE_DETAIL.minZoom,
        maxZoom: NORGE_SURFACE_DETAIL.maxZoom,
        maxTiles: NORGE_SURFACE_DETAIL.maxTiles,
        bounds: { ...NORGE_SURFACE_DETAIL.bounds },
        axisY: 'tile-y-down',
      },
      camera: {
        dist: camState.dist,
        height: camState.height,
        tilt: camState.tilt,
        rot: camState.rot,
        targetX: camState.target.x,
        targetZ: camState.target.z,
        viewportWidth: cw,
        viewportHeight: ch,
        devicePixelRatio: window.devicePixelRatio || 1,
      },
      view: {
        boundsSource: diag.boundsSource || '',
        visibleBounds,
        visibleRange: diag.visibleRange ? { ...diag.visibleRange } : null,
        expandedRange: diag.expandedRange ? { ...diag.expandedRange } : null,
        fittedRange: diag.fittedRange ? { ...diag.fittedRange } : null,
      },
      zoom: {
        detailZoom: diag.zoom,
        tileZoom: diag.zoom,
        screenKey: diag.screenKey || '',
      },
      sources,
      status: {
        coreReady: true,
        transformReady: true,
        sourcesReady: sources.length > 0,
        cameraStable: !norgeDetailTimer,
        cleanAvailable: true,
        freezeMode: norgeFreezeMode,
      },
    });
  },
  publicState() {
    return Object.freeze({
      enabled: this.enabled,
      phase: this.stats.phase,
      state: this.stats.state,
      loadingEnabled: this.stats.loadingEnabled,
      leafletRuntimeEnabled: this.stats.leafletRuntimeEnabled,
      keepBuffer: this.keepBuffer,
      registrySize: this.tileRegistry.size,
      levelCount: this.levels.size,
      pendingCount: this.pendingRegistry.size,
      snapshotReady: !!this.lastSnapshot,
      snapshot: this.lastSnapshot,
      dryRun: {
        visibleCount: this.dryRun.visibleKeys.size,
        keepCount: this.dryRun.keepKeys.size,
        enterCount: this.dryRun.enterKeys.size,
        stayCount: this.dryRun.stayKeys.size,
        leaveCount: this.dryRun.leaveKeys.size,
        queueTotal: this.dryRun.priorityQueue.length,
        queuePreview: this.dryRun.priorityQueue.slice(0, 12).map(item => ({
          sourceId: item.sourceId,
          role: item.role,
          band: item.band,
          z: item.z,
          nativeZ: item.nativeZ,
          x: item.x,
          y: item.y,
          distanceToCenter: Number(item.distanceToCenter.toFixed(3)),
          priorityGroup: item.priorityGroup,
        })),
        queuePreviewDescriptors: this.dryRun.descriptorPreview.map(descriptor => ({
          sourceId: descriptor.sourceId,
          role: descriptor.role,
          band: descriptor.band,
          z: descriptor.z,
          nativeZ: descriptor.nativeZ,
          x: descriptor.x,
          y: descriptor.y,
          priorityGroup: descriptor.priorityGroup,
          sourceOrder: descriptor.sourceOrder,
          distanceToCenter: Number(descriptor.distanceToCenter.toFixed(3)),
          requestType: descriptor.requestType,
          sourceKind: descriptor.sourceKind,
          validTile: descriptor.validTile,
          validationErrors: [...descriptor.validationErrors],
          loaderAllowed: false,
          loadingEnabled: false,
        })),
        queueCenter: this.dryRun.queueCenter ? { ...this.dryRun.queueCenter } : null,
        queueCap: this.dryRun.queueCap,
        queueRejectedReason: this.dryRun.queueRejectedReason,
        descriptorPreviewCount: this.dryRun.descriptorPreview.length,
        descriptorPreviewLimit: this.dryRun.descriptorPreviewLimit,
        previewTruncated: this.dryRun.previewTruncated,
        countsByRequestType: { ...this.dryRun.countsByRequestType },
        validationSummary: {
          valid: this.dryRun.validationSummary.valid,
          invalid: this.dryRun.validationSummary.invalid,
          errors: [...this.dryRun.validationSummary.errors],
        },
        loadCandidates: this.dryRun.loadCandidates,
        rejectedCandidates: this.dryRun.rejectedCandidates,
        urlBuilder: {
          urlPreview: this.dryRun.urlPreview.map(item => ({
            ...item,
            urlText: item.safeUrlPreview || '',
            validationErrors: [...item.validationErrors],
            validationWarnings: [...(item.validationWarnings || [])],
          })),
          urlPreviewLimit: this.dryRun.urlPreviewLimit,
          urlPreviewTruncated: this.dryRun.urlPreviewTruncated,
          validUrlCandidates: this.dryRun.validUrlCandidates,
          rejectedUrlCandidates: this.dryRun.rejectedUrlCandidates,
          countsByUrlKind: { ...this.dryRun.countsByUrlKind },
          validationSummary: {
            valid: this.dryRun.urlValidationSummary.valid,
            invalid: this.dryRun.urlValidationSummary.invalid,
            errors: [...this.dryRun.urlValidationSummary.errors],
          },
          warningSummary: {
            warnings: this.dryRun.urlWarningSummary.warnings,
            items: [...this.dryRun.urlWarningSummary.items],
          },
        },
        loaderGate: {
          enabled: this.dryRun.loaderGate.enabled,
          loaderAllowed: this.dryRun.loaderGate.loaderAllowed,
          loadingEnabled: this.dryRun.loaderGate.loadingEnabled,
          wouldEnqueue: this.dryRun.loaderGate.wouldEnqueue,
          wouldSkip: this.dryRun.loaderGate.wouldSkip,
          wouldReject: this.dryRun.loaderGate.wouldReject,
          futureLoadCandidates: this.dryRun.loaderGate.futureLoadCandidates,
          maxConcurrentPlan: this.dryRun.loaderGate.maxConcurrentPlan,
          preview: this.dryRun.loaderGate.preview.map(item => ({ ...item, reasons: [...item.reasons] })),
          previewLimit: this.dryRun.loaderGate.previewLimit,
          previewTruncated: this.dryRun.loaderGate.previewTruncated,
          warnings: [...this.dryRun.loaderGate.warnings],
        },
        rejected: this.dryRun.rejected,
        warnings: [...this.dryRun.warnings],
        sources: { ...this.dryRun.sourceStats },
      },
      stats: { ...this.stats },
      runtime3A: {
        testGateOpen: this.isThreeATestGateOpen(),
        actualPending: this.stats.actualPending,
        actualLoaded: this.stats.actualLoaded,
        actualFailed: this.stats.actualFailed,
        actualAppended: this.stats.actualAppended,
        actualSkippedByGate: this.stats.actualSkippedByGate,
        actualRejectedInvalid: this.stats.actualRejectedInvalid,
        firstLoadedSourceId: this.stats.firstLoadedSourceId,
        firstLoadedZXY: this.stats.firstLoadedZXY,
        lastLoadError: this.stats.lastLoadError,
      },
      runtime3B: {
        testGateOpen: this.isThreeBTestGateOpen(),
        loaderMode: this.stats.loaderMode,
        requested: this.stats.threeBRequested,
        pending: this.stats.threeBPending,
        loaded: this.stats.threeBLoaded,
        failed: this.stats.threeBFailed,
        appended: this.stats.threeBAppended,
        rejectedByGate: this.stats.threeBRejectedByGate,
        rejectedOverlay: this.stats.threeBRejectedOverlay,
        rejectedNonVisible: this.stats.threeBRejectedNonVisible,
        rejectedInvalid: this.stats.threeBRejectedInvalid,
        firstSourceId: this.stats.threeBFirstSourceId,
        loadedZXY: this.stats.threeBLoadedZXY,
        lastError: this.stats.threeBLastError,
      },
      runtime3C: {
        testGateOpen: this.isThreeCTestGateOpen(),
        loaderMode: this.stats.loaderMode,
        requested: this.stats.threeCRequested,
        pending: this.stats.threeCPending,
        loaded: this.stats.threeCLoaded,
        failed: this.stats.threeCFailed,
        appended: this.stats.threeCAppended,
        rejectedByGate: this.stats.threeCRejectedByGate,
        rejectedOverlay: this.stats.threeCRejectedOverlay,
        rejectedNonVisible: this.stats.threeCRejectedNonVisible,
        rejectedInvalid: this.stats.threeCRejectedInvalid,
        firstSourceId: this.stats.threeCFirstSourceId,
        loadedZXY: this.stats.threeCLoadedZXY,
        lastError: this.stats.threeCLastError,
      },
      runtime3D: {
        testGateOpen: this.isThreeDTestGateOpen(),
        loaderMode: this.stats.loaderMode,
        visibleRequested: this.stats.threeDVisibleRequested,
        keepRequested: this.stats.threeDKeepRequested,
        totalRequested: this.stats.threeDTotalRequested,
        pending: this.stats.threeDPending,
        visibleLoaded: this.stats.threeDVisibleLoaded,
        keepLoaded: this.stats.threeDKeepLoaded,
        loaded: this.stats.threeDLoaded,
        failed: this.stats.threeDFailed,
        appended: this.stats.threeDAppended,
        rejectedByGate: this.stats.threeDRejectedByGate,
        rejectedOverlay: this.stats.threeDRejectedOverlay,
        rejectedNonVisible: this.stats.threeDRejectedNonVisible,
        rejectedInvalid: this.stats.threeDRejectedInvalid,
        firstSourceId: this.stats.threeDFirstSourceId,
        loadedZXY: this.stats.threeDLoadedZXY,
        loadedBands: this.stats.threeDLoadedBands,
        lastError: this.stats.threeDLastError,
      },
      runtime3E: {
        testGateOpen: this.isThreeETestGateOpen(),
        loaderMode: this.stats.loaderMode,
        visibleRequested: this.stats.threeEVisibleRequested,
        keepRequested: this.stats.threeEKeepRequested,
        totalRequested: this.stats.threeETotalRequested,
        pending: this.stats.threeEPending,
        inflight: this.stats.threeEInflight,
        maxInflightObserved: this.stats.threeEMaxInflightObserved,
        visibleLoaded: this.stats.threeEVisibleLoaded,
        keepLoaded: this.stats.threeEKeepLoaded,
        loaded: this.stats.threeELoaded,
        failed: this.stats.threeEFailed,
        appended: this.stats.threeEAppended,
        rejectedByGate: this.stats.threeERejectedByGate,
        rejectedOverlay: this.stats.threeERejectedOverlay,
        rejectedNonVisible: this.stats.threeERejectedNonVisible,
        rejectedInvalid: this.stats.threeERejectedInvalid,
        firstSourceId: this.stats.threeEFirstSourceId,
        loadedZXY: this.stats.threeELoadedZXY,
        loadedBands: this.stats.threeELoadedBands,
        lastError: this.stats.threeELastError,
      },
    });
  },
  publishState() {
    const state = this.publicState();
    globalThis.__norgeKartmotorV2 = state;
    globalThis.__enok72__ = globalThis.__enok72__ || {};
    globalThis.__enok72__.kartmotorV2 = state;
    return state;
  },
  enable() {
    this.enabled = true;
    this.sync();
    this.update();
  },
  disable() {
    this.enabled = false;
    this.clearRuntimeTiles();
    this.tileRegistry.clear();
    this.levels.clear();
    this.pendingRegistry.clear();
    this.sync();
  },
  clear() {
    this.clearRuntimeTiles();
    this.tileRegistry.clear();
    this.levels.clear();
    this.pendingRegistry.clear();
    this.dryRun = {
      visibleKeys: new Set(),
      keepKeys: new Set(),
      previousKeepKeys: new Set(),
      enterKeys: new Set(),
      stayKeys: new Set(),
      leaveKeys: new Set(),
      sourceStats: {},
      priorityQueue: [],
      queueCenter: null,
      queueCap: 0,
      queueRejectedReason: '',
      tileDescriptors: [],
      descriptorPreview: [],
      descriptorPreviewLimit: 12,
      previewTruncated: false,
      countsByRequestType: {},
      validationSummary: { valid: 0, invalid: 0, errors: [] },
      loadCandidates: 0,
      rejectedCandidates: 0,
      urlCandidates: [],
      urlPreview: [],
      urlPreviewLimit: 12,
      urlPreviewTruncated: false,
      validUrlCandidates: 0,
      rejectedUrlCandidates: 0,
      countsByUrlKind: {},
      urlValidationSummary: { valid: 0, invalid: 0, errors: [] },
      urlWarningSummary: { warnings: 0, items: [] },
      loaderGate: {
        enabled: false,
        loaderAllowed: false,
        loadingEnabled: false,
        wouldEnqueue: 0,
        wouldSkip: 0,
        wouldReject: 0,
        futureLoadCandidates: 0,
        maxConcurrentPlan: 0,
        preview: [],
        previewLimit: 12,
        previewTruncated: false,
        warnings: [],
      },
      rejected: false,
      warnings: [],
    };
    this.lastSnapshot = null;
    this.stats = {
      ...this.stats,
      snapshotReady: false,
      registrySize: 0,
      levelCount: 0,
      pendingCount: 0,
      visibleTiles: 0,
      keepTiles: 0,
      enterTiles: 0,
      stayTiles: 0,
      leaveTiles: 0,
      dryRunRejected: false,
      dryRunWarnings: [],
      dryRunSources: {},
      queueTotal: 0,
      queueVisibleBase: 0,
      queueVisibleOverlay: 0,
      queueKeepBase: 0,
      queueKeepOverlay: 0,
      queueFirstRole: '',
      queuePreview: [],
      queueRejected: false,
      queueRejectedReason: '',
      queueCenterX: null,
      queueCenterY: null,
      queueCap: 0,
      queueFirstDistance: null,
      queuePreviewDistances: [],
      descriptorPreviewCount: 0,
      descriptorPreviewLimit: 12,
      previewTruncated: false,
      loadCandidates: 0,
      rejectedCandidates: 0,
      validUrlCandidates: 0,
      rejectedUrlCandidates: 0,
      urlPreviewCount: 0,
      urlPreviewLimit: 12,
      urlPreviewTruncated: false,
      countsByUrlKind: {},
      urlValidationInvalid: 0,
      urlValidationErrors: [],
      firstUrlKind: '',
      firstUrlValid: false,
      firstUrlLoaderAllowed: false,
      loaderAllowed: false,
      loaderGateEnabled: false,
      loaderGateState: 'closed',
      maxConcurrentPlan: 0,
      wouldEnqueue: 0,
      wouldSkip: 0,
      wouldReject: 0,
      futureLoadCandidates: 0,
      loaderPreviewCount: 0,
      loaderPreviewLimit: 12,
      loaderPreviewTruncated: false,
      loaderGateWarnings: [],
      pendingContractReady: true,
      abortContractReady: true,
      countsByRequestType: {},
      validationInvalid: 0,
      validationErrors: [],
      urlWarningCount: 0,
      urlWarnings: [],
      firstDescriptorRequestType: '',
      firstDescriptorSourceKind: '',
      firstDescriptorValid: false,
      firstDescriptorLoaderAllowed: false,
      baseSourceCount: 0,
      overlaySourceCount: 0,
      baseWanted: 0,
      baseLoaded: 0,
      baseReady: false,
      overlayWanted: 0,
      overlayLoaded: 0,
      overlayReady: false,
      loadingCount: 0,
      retiringCount: 0,
      prunedCount: 0,
      blackFramePrevented: 0,
      wanted: 0,
      loaded: 0,
      pending: 0,
      kept: 0,
      retired: 0,
      failed: 0,
      actualPending: 0,
      actualLoaded: 0,
      actualFailed: 0,
      actualAppended: 0,
      actualSkippedByGate: 0,
      actualRejectedInvalid: 0,
      firstLoadedSourceId: '',
      firstLoadedZXY: '',
      lastLoadError: '',
      loaderMode: '',
      threeBRequested: 0,
      threeBPending: 0,
      threeBLoaded: 0,
      threeBFailed: 0,
      threeBAppended: 0,
      threeBRejectedByGate: 0,
      threeBRejectedOverlay: 0,
      threeBRejectedNonVisible: 0,
      threeBRejectedInvalid: 0,
      threeBFirstSourceId: '',
      threeBLoadedZXY: '',
      threeBLastError: '',
      threeCRequested: 0,
      threeCPending: 0,
      threeCLoaded: 0,
      threeCFailed: 0,
      threeCAppended: 0,
      threeCRejectedByGate: 0,
      threeCRejectedOverlay: 0,
      threeCRejectedNonVisible: 0,
      threeCRejectedInvalid: 0,
      threeCFirstSourceId: '',
      threeCLoadedZXY: '',
      threeCLastError: '',
      threeDVisibleRequested: 0,
      threeDKeepRequested: 0,
      threeDTotalRequested: 0,
      threeDPending: 0,
      threeDVisibleLoaded: 0,
      threeDKeepLoaded: 0,
      threeDLoaded: 0,
      threeDFailed: 0,
      threeDAppended: 0,
      threeDRejectedByGate: 0,
      threeDRejectedOverlay: 0,
      threeDRejectedNonVisible: 0,
      threeDRejectedInvalid: 0,
      threeDFirstSourceId: '',
      threeDLoadedZXY: '',
      threeDLoadedBands: '',
      threeDLastError: '',
      threeEVisibleRequested: 0,
      threeEKeepRequested: 0,
      threeETotalRequested: 0,
      threeEPending: 0,
      threeEInflight: 0,
      threeEMaxInflightObserved: 0,
      threeEVisibleLoaded: 0,
      threeEKeepLoaded: 0,
      threeELoaded: 0,
      threeEFailed: 0,
      threeEAppended: 0,
      threeERejectedByGate: 0,
      threeERejectedOverlay: 0,
      threeERejectedNonVisible: 0,
      threeERejectedInvalid: 0,
      threeEFirstSourceId: '',
      threeELoadedZXY: '',
      threeELoadedBands: '',
      threeELastError: '',
    };
    this.publishState();
  },
  sync() {
    if (!this.layer) this.layer = document.getElementById('norge-leaflet-style-detail-layer');
    if (!this.layer) return;
    this.layer.style.display = this.enabled ? 'block' : 'none';
    this.layer.style.pointerEvents = 'none';
    this.stats.state = this.enabled ? 'shell' : 'off';
    this.layer.dataset.engineState = this.stats.state;
    this.updateStatus();
  },
  baseSource() {
    return currentNorgeDetailSources().find(source => source.role !== 'overlay') || cleanNorgeDetailSources()[0] || null;
  },
  selectedBaseKey() {
    const selected = document.querySelector('input[name="norge-base"]:checked')?.value || 'sjokartraster';
    if (['topograatone', 'topo', 'toporaster', 'sjokartraster', 'osm', 'iceland-sjokart', 'denmark-havplan', 'sweden-seachart'].includes(selected)) return selected;
    return selected === 'assembled-nordic' ? 'sjokartraster' : 'topograatone';
  },
  updateStatus() {
    if (!this.layer) return;
    const status = this.layer.querySelector('.norge-leaflet-style-status');
    if (!status) return;
    const sourceText = this.stats.source || 'no source';
    const zoomText = this.stats.zoom === null ? '-' : `z${this.stats.zoom}`;
    this.layer.dataset.engineState = this.stats.state;
    this.layer.dataset.snapshotReady = this.stats.snapshotReady ? '1' : '0';
    this.layer.dataset.registrySize = String(this.stats.registrySize);
    this.layer.dataset.levelCount = String(this.stats.levelCount);
    this.layer.dataset.pendingCount = String(this.stats.pendingCount);
    this.layer.dataset.visibleTiles = String(this.stats.visibleTiles);
    this.layer.dataset.keepTiles = String(this.stats.keepTiles);
    this.layer.dataset.enterTiles = String(this.stats.enterTiles);
    this.layer.dataset.stayTiles = String(this.stats.stayTiles);
    this.layer.dataset.leaveTiles = String(this.stats.leaveTiles);
    this.layer.dataset.dryRunRejected = this.stats.dryRunRejected ? '1' : '0';
    this.layer.dataset.queueTotal = String(this.stats.queueTotal);
    this.layer.dataset.queueVisibleBase = String(this.stats.queueVisibleBase);
    this.layer.dataset.queueVisibleOverlay = String(this.stats.queueVisibleOverlay);
    this.layer.dataset.queueKeepBase = String(this.stats.queueKeepBase);
    this.layer.dataset.queueKeepOverlay = String(this.stats.queueKeepOverlay);
    this.layer.dataset.queueFirstRole = this.stats.queueFirstRole;
    this.layer.dataset.queueRejected = this.stats.queueRejected ? '1' : '0';
    this.layer.dataset.queueRejectedReason = this.stats.queueRejectedReason;
    this.layer.dataset.queueCenterX = this.stats.queueCenterX === null ? '' : String(this.stats.queueCenterX);
    this.layer.dataset.queueCenterY = this.stats.queueCenterY === null ? '' : String(this.stats.queueCenterY);
    this.layer.dataset.queueCap = String(this.stats.queueCap);
    this.layer.dataset.queueFirstDistance = this.stats.queueFirstDistance === null ? '' : String(this.stats.queueFirstDistance);
    this.layer.dataset.queuePreviewDistances = this.stats.queuePreviewDistances.join(',');
    this.layer.dataset.descriptorPreviewCount = String(this.stats.descriptorPreviewCount);
    this.layer.dataset.descriptorPreviewLimit = String(this.stats.descriptorPreviewLimit);
    this.layer.dataset.previewTruncated = this.stats.previewTruncated ? '1' : '0';
    this.layer.dataset.loadCandidates = String(this.stats.loadCandidates);
    this.layer.dataset.rejectedCandidates = String(this.stats.rejectedCandidates);
    this.layer.dataset.countsByRequestType = Object.entries(this.stats.countsByRequestType || {})
      .map(([key, value]) => `${key}:${value}`).join(',');
    this.layer.dataset.validUrlCandidates = String(this.stats.validUrlCandidates);
    this.layer.dataset.rejectedUrlCandidates = String(this.stats.rejectedUrlCandidates);
    this.layer.dataset.urlPreviewCount = String(this.stats.urlPreviewCount);
    this.layer.dataset.urlPreviewLimit = String(this.stats.urlPreviewLimit);
    this.layer.dataset.urlPreviewTruncated = this.stats.urlPreviewTruncated ? '1' : '0';
    this.layer.dataset.countsByUrlKind = Object.entries(this.stats.countsByUrlKind || {})
      .map(([key, value]) => `${key}:${value}`).join(',');
    this.layer.dataset.urlValidationInvalid = String(this.stats.urlValidationInvalid);
    this.layer.dataset.urlValidationErrors = (this.stats.urlValidationErrors || []).join(' | ');
    this.layer.dataset.urlWarningCount = String(this.stats.urlWarningCount || 0);
    this.layer.dataset.urlWarnings = (this.stats.urlWarnings || []).join(' | ');
    this.layer.dataset.firstUrlKind = this.stats.firstUrlKind;
    this.layer.dataset.firstUrlValid = this.stats.firstUrlValid ? '1' : '0';
    this.layer.dataset.firstUrlLoaderAllowed = this.stats.firstUrlLoaderAllowed ? '1' : '0';
    this.layer.dataset.firstUrlWarnings = (this.stats.firstUrlWarnings || []).join(' | ');
    this.layer.dataset.validationInvalid = String(this.stats.validationInvalid);
    this.layer.dataset.validationErrors = (this.stats.validationErrors || []).join(' | ');
    this.layer.dataset.firstDescriptorRequestType = this.stats.firstDescriptorRequestType;
    this.layer.dataset.firstDescriptorSourceKind = this.stats.firstDescriptorSourceKind;
    this.layer.dataset.firstDescriptorValid = this.stats.firstDescriptorValid ? '1' : '0';
    this.layer.dataset.firstDescriptorLoaderAllowed = this.stats.firstDescriptorLoaderAllowed ? '1' : '0';
    this.layer.dataset.loaderAllowed = this.stats.loaderAllowed ? '1' : '0';
    this.layer.dataset.loaderGateEnabled = this.stats.loaderGateEnabled ? '1' : '0';
    this.layer.dataset.loaderGateState = this.stats.loaderGateState;
    this.layer.dataset.maxConcurrentPlan = String(this.stats.maxConcurrentPlan);
    this.layer.dataset.wouldEnqueue = String(this.stats.wouldEnqueue);
    this.layer.dataset.wouldSkip = String(this.stats.wouldSkip);
    this.layer.dataset.wouldReject = String(this.stats.wouldReject);
    this.layer.dataset.futureLoadCandidates = String(this.stats.futureLoadCandidates);
    this.layer.dataset.loaderPreviewCount = String(this.stats.loaderPreviewCount);
    this.layer.dataset.loaderPreviewLimit = String(this.stats.loaderPreviewLimit);
    this.layer.dataset.loaderPreviewTruncated = this.stats.loaderPreviewTruncated ? '1' : '0';
    this.layer.dataset.loaderGateWarnings = (this.stats.loaderGateWarnings || []).join(' | ');
    this.layer.dataset.pendingContractReady = this.stats.pendingContractReady ? '1' : '0';
    this.layer.dataset.abortContractReady = this.stats.abortContractReady ? '1' : '0';
    this.layer.dataset.actualPending = String(this.stats.actualPending || 0);
    this.layer.dataset.actualLoaded = String(this.stats.actualLoaded || 0);
    this.layer.dataset.actualFailed = String(this.stats.actualFailed || 0);
    this.layer.dataset.actualAppended = String(this.stats.actualAppended || 0);
    this.layer.dataset.actualSkippedByGate = String(this.stats.actualSkippedByGate || 0);
    this.layer.dataset.actualRejectedInvalid = String(this.stats.actualRejectedInvalid || 0);
    this.layer.dataset.firstLoadedSourceId = this.stats.firstLoadedSourceId || '';
    this.layer.dataset.firstLoadedZXY = this.stats.firstLoadedZXY || '';
    this.layer.dataset.lastLoadError = this.stats.lastLoadError || '';
    this.layer.dataset.loaderMode = this.stats.loaderMode || '';
    this.layer.dataset.threeBTestGateOpen = this.isThreeBTestGateOpen() ? '1' : '0';
    this.layer.dataset.threeBRequested = String(this.stats.threeBRequested || 0);
    this.layer.dataset.threeBPending = String(this.stats.threeBPending || 0);
    this.layer.dataset.threeBLoaded = String(this.stats.threeBLoaded || 0);
    this.layer.dataset.threeBFailed = String(this.stats.threeBFailed || 0);
    this.layer.dataset.threeBAppended = String(this.stats.threeBAppended || 0);
    this.layer.dataset.threeBRejectedByGate = String(this.stats.threeBRejectedByGate || 0);
    this.layer.dataset.threeBRejectedOverlay = String(this.stats.threeBRejectedOverlay || 0);
    this.layer.dataset.threeBRejectedNonVisible = String(this.stats.threeBRejectedNonVisible || 0);
    this.layer.dataset.threeBRejectedInvalid = String(this.stats.threeBRejectedInvalid || 0);
    this.layer.dataset.threeBFirstSourceId = this.stats.threeBFirstSourceId || '';
    this.layer.dataset.threeBLoadedZXY = this.stats.threeBLoadedZXY || '';
    this.layer.dataset.threeBLastError = this.stats.threeBLastError || '';
    this.layer.dataset.threeCTestGateOpen = this.isThreeCTestGateOpen() ? '1' : '0';
    this.layer.dataset.threeCRequested = String(this.stats.threeCRequested || 0);
    this.layer.dataset.threeCPending = String(this.stats.threeCPending || 0);
    this.layer.dataset.threeCLoaded = String(this.stats.threeCLoaded || 0);
    this.layer.dataset.threeCFailed = String(this.stats.threeCFailed || 0);
    this.layer.dataset.threeCAppended = String(this.stats.threeCAppended || 0);
    this.layer.dataset.threeCRejectedByGate = String(this.stats.threeCRejectedByGate || 0);
    this.layer.dataset.threeCRejectedOverlay = String(this.stats.threeCRejectedOverlay || 0);
    this.layer.dataset.threeCRejectedNonVisible = String(this.stats.threeCRejectedNonVisible || 0);
    this.layer.dataset.threeCRejectedInvalid = String(this.stats.threeCRejectedInvalid || 0);
    this.layer.dataset.threeCFirstSourceId = this.stats.threeCFirstSourceId || '';
    this.layer.dataset.threeCLoadedZXY = this.stats.threeCLoadedZXY || '';
    this.layer.dataset.threeCLastError = this.stats.threeCLastError || '';
    this.layer.dataset.threeDTestGateOpen = this.isThreeDTestGateOpen() ? '1' : '0';
    this.layer.dataset.threeDVisibleRequested = String(this.stats.threeDVisibleRequested || 0);
    this.layer.dataset.threeDKeepRequested = String(this.stats.threeDKeepRequested || 0);
    this.layer.dataset.threeDTotalRequested = String(this.stats.threeDTotalRequested || 0);
    this.layer.dataset.threeDPending = String(this.stats.threeDPending || 0);
    this.layer.dataset.threeDVisibleLoaded = String(this.stats.threeDVisibleLoaded || 0);
    this.layer.dataset.threeDKeepLoaded = String(this.stats.threeDKeepLoaded || 0);
    this.layer.dataset.threeDLoaded = String(this.stats.threeDLoaded || 0);
    this.layer.dataset.threeDFailed = String(this.stats.threeDFailed || 0);
    this.layer.dataset.threeDAppended = String(this.stats.threeDAppended || 0);
    this.layer.dataset.threeDRejectedByGate = String(this.stats.threeDRejectedByGate || 0);
    this.layer.dataset.threeDRejectedOverlay = String(this.stats.threeDRejectedOverlay || 0);
    this.layer.dataset.threeDRejectedNonVisible = String(this.stats.threeDRejectedNonVisible || 0);
    this.layer.dataset.threeDRejectedInvalid = String(this.stats.threeDRejectedInvalid || 0);
    this.layer.dataset.threeDFirstSourceId = this.stats.threeDFirstSourceId || '';
    this.layer.dataset.threeDLoadedZXY = this.stats.threeDLoadedZXY || '';
    this.layer.dataset.threeDLoadedBands = this.stats.threeDLoadedBands || '';
    this.layer.dataset.threeDLastError = this.stats.threeDLastError || '';
    this.layer.dataset.threeETestGateOpen = this.isThreeETestGateOpen() ? '1' : '0';
    this.layer.dataset.threeEVisibleRequested = String(this.stats.threeEVisibleRequested || 0);
    this.layer.dataset.threeEKeepRequested = String(this.stats.threeEKeepRequested || 0);
    this.layer.dataset.threeETotalRequested = String(this.stats.threeETotalRequested || 0);
    this.layer.dataset.threeEPending = String(this.stats.threeEPending || 0);
    this.layer.dataset.threeEInflight = String(this.stats.threeEInflight || 0);
    this.layer.dataset.threeEMaxInflightObserved = String(this.stats.threeEMaxInflightObserved || 0);
    this.layer.dataset.threeEVisibleLoaded = String(this.stats.threeEVisibleLoaded || 0);
    this.layer.dataset.threeEKeepLoaded = String(this.stats.threeEKeepLoaded || 0);
    this.layer.dataset.threeELoaded = String(this.stats.threeELoaded || 0);
    this.layer.dataset.threeEFailed = String(this.stats.threeEFailed || 0);
    this.layer.dataset.threeEAppended = String(this.stats.threeEAppended || 0);
    this.layer.dataset.threeERejectedByGate = String(this.stats.threeERejectedByGate || 0);
    this.layer.dataset.threeERejectedOverlay = String(this.stats.threeERejectedOverlay || 0);
    this.layer.dataset.threeERejectedNonVisible = String(this.stats.threeERejectedNonVisible || 0);
    this.layer.dataset.threeERejectedInvalid = String(this.stats.threeERejectedInvalid || 0);
    this.layer.dataset.threeEFirstSourceId = this.stats.threeEFirstSourceId || '';
    this.layer.dataset.threeELoadedZXY = this.stats.threeELoadedZXY || '';
    this.layer.dataset.threeELoadedBands = this.stats.threeELoadedBands || '';
    this.layer.dataset.threeELastError = this.stats.threeELastError || '';
    this.layer.dataset.baseSourceCount = String(this.stats.baseSourceCount);
    this.layer.dataset.overlaySourceCount = String(this.stats.overlaySourceCount);
    status.textContent =
      `Kartmotor V2: ${this.stats.state}\n` +
      `${sourceText} ${zoomText}, snapshot ${this.stats.snapshotReady ? 'ready' : 'none'}\n` +
      `registry ${this.stats.registrySize}, levels ${this.stats.levelCount}, pending ${this.stats.pendingCount}\n` +
      `dry-run visible ${this.stats.visibleTiles}, keep ${this.stats.keepTiles}, enter ${this.stats.enterTiles}, stay ${this.stats.stayTiles}, leave ${this.stats.leaveTiles}\n` +
      `queue total ${this.stats.queueTotal}: base vis ${this.stats.queueVisibleBase}, overlay vis ${this.stats.queueVisibleOverlay}, base keep ${this.stats.queueKeepBase}, overlay keep ${this.stats.queueKeepOverlay}\n` +
      `queue center ${this.stats.queueCenterX === null ? '-' : this.stats.queueCenterX},${this.stats.queueCenterY === null ? '-' : this.stats.queueCenterY}; first ${this.stats.queueFirstRole || '-'} d ${this.stats.queueFirstDistance === null ? '-' : this.stats.queueFirstDistance}\n` +
      `descriptors preview ${this.stats.descriptorPreviewCount}/${this.stats.descriptorPreviewLimit}${this.stats.previewTruncated ? ' truncated' : ''}; requests ${this.layer.dataset.countsByRequestType || '-'}; invalid ${this.stats.validationInvalid}\n` +
      `url hardening ${this.stats.validUrlCandidates}/${this.stats.validUrlCandidates + this.stats.rejectedUrlCandidates} valid; kinds ${this.layer.dataset.countsByUrlKind || '-'}; invalid ${this.stats.urlValidationInvalid}; warnings ${this.stats.urlWarningCount || 0}\n` +
      `loader gate ${this.stats.loaderGateState}; would enqueue ${this.stats.wouldEnqueue}, skip ${this.stats.wouldSkip}, reject ${this.stats.wouldReject}; pending ${this.stats.pendingCount}\n` +
      `3A test gate ${this.isThreeATestGateOpen() ? 'open' : 'closed'}; actual pending ${this.stats.actualPending || 0}, loaded ${this.stats.actualLoaded || 0}, failed ${this.stats.actualFailed || 0}, appended ${this.stats.actualAppended || 0}\n` +
      `3B test gate ${this.isThreeBTestGateOpen() ? 'open' : 'closed'}; requested ${this.stats.threeBRequested || 0}, pending ${this.stats.threeBPending || 0}, loaded ${this.stats.threeBLoaded || 0}, failed ${this.stats.threeBFailed || 0}, appended ${this.stats.threeBAppended || 0}\n` +
      `3C test gate ${this.isThreeCTestGateOpen() ? 'open' : 'closed'}; requested ${this.stats.threeCRequested || 0}, pending ${this.stats.threeCPending || 0}, loaded ${this.stats.threeCLoaded || 0}, failed ${this.stats.threeCFailed || 0}, appended ${this.stats.threeCAppended || 0}\n` +
      `3D test gate ${this.isThreeDTestGateOpen() ? 'open' : 'closed'}; visible ${this.stats.threeDVisibleLoaded || 0}/${this.stats.threeDVisibleRequested || 0}, keep ${this.stats.threeDKeepLoaded || 0}/${this.stats.threeDKeepRequested || 0}, pending ${this.stats.threeDPending || 0}, loaded ${this.stats.threeDLoaded || 0}, failed ${this.stats.threeDFailed || 0}, appended ${this.stats.threeDAppended || 0}\n` +
      `3E test gate ${this.isThreeETestGateOpen() ? 'open' : 'closed'}; visible ${this.stats.threeEVisibleLoaded || 0}/${this.stats.threeEVisibleRequested || 0}, keep ${this.stats.threeEKeepLoaded || 0}/${this.stats.threeEKeepRequested || 0}, inflight ${this.stats.threeEInflight || 0}/${this.stats.threeEMaxInflightObserved || 0}, pending ${this.stats.threeEPending || 0}, loaded ${this.stats.threeELoaded || 0}, failed ${this.stats.threeEFailed || 0}, appended ${this.stats.threeEAppended || 0}\n` +
      `sources base ${this.stats.baseSourceCount}, overlay ${this.stats.overlaySourceCount}\n` +
      `base ${this.stats.baseLoaded}/${this.stats.baseWanted}, overlay ${this.stats.overlayLoaded}/${this.stats.overlayWanted}`;
  },
  update() {
    if (!this.enabled) return;
    const snapshot = this.getCoreSnapshot();
    this.lastSnapshot = snapshot;
    const rawDiff = this.computeTileDiff(snapshot);
    const descriptorDiff = this.buildPassiveTileDescriptors(snapshot, rawDiff);
    const urlDiff = this.buildDryRunUrlCandidates(snapshot, descriptorDiff);
    const loaderGate = this.buildNoopLoaderGate(descriptorDiff, urlDiff);
    const diff = {
      ...rawDiff,
      tileDescriptors: descriptorDiff.tileDescriptors,
      descriptorPreview: descriptorDiff.descriptorPreview,
      descriptorPreviewLimit: descriptorDiff.descriptorPreviewLimit,
      previewTruncated: descriptorDiff.previewTruncated,
      countsByRequestType: descriptorDiff.countsByRequestType,
      validationSummary: descriptorDiff.validationSummary,
      loadCandidates: descriptorDiff.loadCandidates,
      rejectedCandidates: descriptorDiff.rejectedCandidates,
      urlCandidates: urlDiff.urlCandidates,
      urlPreview: urlDiff.urlPreview,
      urlPreviewLimit: urlDiff.urlPreviewLimit,
      urlPreviewTruncated: urlDiff.urlPreviewTruncated,
      validUrlCandidates: urlDiff.validUrlCandidates,
      rejectedUrlCandidates: urlDiff.rejectedUrlCandidates,
      countsByUrlKind: urlDiff.countsByUrlKind,
      urlValidationSummary: urlDiff.urlValidationSummary,
      urlWarningSummary: urlDiff.urlWarningSummary,
      loaderGate,
      rejected: rawDiff.rejected || descriptorDiff.rejected,
      queueRejectedReason: descriptorDiff.queueRejectedReason || rawDiff.queueRejectedReason,
    };
    this.dryRun = diff;
    const baseKey = this.selectedBaseKey();
    const seEnabled = document.getElementById('norge-layer-se-eiendom')?.checked === true;
    const baseSourceCount = snapshot.sources.filter(source => source.role !== 'overlay').length;
    const overlaySourceCount = snapshot.sources.filter(source => source.role === 'overlay').length;
    const baseWanted = Object.values(diff.sourceStats)
      .filter(source => source.kind === 'base')
      .reduce((sum, source) => sum + source.keep, 0);
    const overlayWanted = Object.values(diff.sourceStats)
      .filter(source => source.kind === 'overlay')
      .reduce((sum, source) => sum + source.keep, 0);
    const queueVisibleBase = diff.priorityQueue.filter(item => item.role === 'base' && item.band === 'visible').length;
    const queueVisibleOverlay = diff.priorityQueue.filter(item => item.role === 'overlay' && item.band === 'visible').length;
    const queueKeepBase = diff.priorityQueue.filter(item => item.role === 'base' && item.band === 'keep').length;
    const queueKeepOverlay = diff.priorityQueue.filter(item => item.role === 'overlay' && item.band === 'keep').length;
    const firstQueueItem = diff.priorityQueue[0] || null;
    const queueCenterX = diff.queueCenter ? Number(diff.queueCenter.x.toFixed(3)) : null;
    const queueCenterY = diff.queueCenter ? Number(diff.queueCenter.y.toFixed(3)) : null;
    const queueFirstDistance = firstQueueItem ? Number(firstQueueItem.distanceToCenter.toFixed(3)) : null;
    const queuePreviewDistances = diff.priorityQueue.slice(0, 12)
      .map(item => Number(item.distanceToCenter.toFixed(3)));
    const firstDescriptor = diff.descriptorPreview[0] || null;
    const firstUrl = diff.urlPreview[0] || null;
    this.stats = {
      ...this.stats,
      state: 'dry-run',
      zoom: snapshot.zoom.detailZoom,
      tileZoom: snapshot.zoom.tileZoom,
      source: `${baseKey}${seEnabled ? ' + Se Eiendom' : ''}`,
      snapshotReady: true,
      coreReady: snapshot.status.coreReady,
      transformReady: snapshot.status.transformReady,
      registrySize: this.tileRegistry.size,
      levelCount: this.levels.size,
      pendingCount: this.pendingRegistry.size,
      keepBuffer: this.keepBuffer,
      visibleTiles: diff.visibleKeys.size,
      keepTiles: diff.keepKeys.size,
      enterTiles: diff.enterKeys.size,
      stayTiles: diff.stayKeys.size,
      leaveTiles: diff.leaveKeys.size,
      dryRunRejected: diff.rejected,
      dryRunWarnings: diff.warnings,
      dryRunSources: diff.sourceStats,
      queueTotal: diff.priorityQueue.length,
      queueVisibleBase,
      queueVisibleOverlay,
      queueKeepBase,
      queueKeepOverlay,
      queueFirstRole: firstQueueItem ? `${firstQueueItem.role}:${firstQueueItem.band}` : '',
      queuePreview: diff.priorityQueue.slice(0, 12),
      queueRejected: diff.rejected,
      queueRejectedReason: diff.queueRejectedReason,
      queueCenterX,
      queueCenterY,
      queueCap: diff.queueCap,
      queueFirstDistance,
      queuePreviewDistances,
      descriptorPreviewCount: diff.descriptorPreview.length,
      descriptorPreviewLimit: diff.descriptorPreviewLimit,
      previewTruncated: diff.previewTruncated,
      loadCandidates: diff.loadCandidates,
      rejectedCandidates: diff.rejectedCandidates,
      countsByRequestType: diff.countsByRequestType,
      validationInvalid: diff.validationSummary.invalid,
      validationErrors: diff.validationSummary.errors,
      firstDescriptorRequestType: firstDescriptor ? firstDescriptor.requestType : '',
      firstDescriptorSourceKind: firstDescriptor ? firstDescriptor.sourceKind : '',
      firstDescriptorValid: firstDescriptor ? firstDescriptor.validTile : false,
      firstDescriptorLoaderAllowed: false,
      validUrlCandidates: diff.validUrlCandidates,
      rejectedUrlCandidates: diff.rejectedUrlCandidates,
      urlPreviewCount: diff.urlPreview.length,
      urlPreviewLimit: diff.urlPreviewLimit,
      urlPreviewTruncated: diff.urlPreviewTruncated,
      countsByUrlKind: diff.countsByUrlKind,
      urlValidationInvalid: diff.urlValidationSummary.invalid,
      urlValidationErrors: diff.urlValidationSummary.errors,
      urlWarningCount: diff.urlWarningSummary.warnings,
      urlWarnings: diff.urlWarningSummary.items,
      firstUrlKind: firstUrl ? firstUrl.urlKind : '',
      firstUrlValid: firstUrl ? firstUrl.validUrl : false,
      firstUrlLoaderAllowed: false,
      firstUrlWarnings: firstUrl ? firstUrl.validationWarnings : [],
      loaderAllowed: loaderGate.loaderAllowed,
      loaderGateEnabled: loaderGate.enabled,
      loaderGateState: loaderGate.enabled ? 'open' : 'closed',
      maxConcurrentPlan: loaderGate.maxConcurrentPlan,
      wouldEnqueue: loaderGate.wouldEnqueue,
      wouldSkip: loaderGate.wouldSkip,
      wouldReject: loaderGate.wouldReject,
      futureLoadCandidates: loaderGate.futureLoadCandidates,
      loaderPreviewCount: loaderGate.preview.length,
      loaderPreviewLimit: loaderGate.previewLimit,
      loaderPreviewTruncated: loaderGate.previewTruncated,
      loaderGateWarnings: loaderGate.warnings,
      pendingContractReady: true,
      abortContractReady: true,
      baseSourceCount,
      overlaySourceCount,
      baseWanted,
      baseLoaded: this.tileRegistry.size,
      baseReady: this.tileRegistry.size > 0,
      overlayWanted,
      overlayLoaded: 0,
      overlayReady: false,
      loadingCount: 0,
      retiringCount: 0,
      wanted: 0,
      loaded: this.tileRegistry.size,
      pending: this.pendingRegistry.size,
      failed: this.stats.failed || 0,
    };
    const threeEGateOpen = this.isThreeETestGateOpen();
    const threeDGateOpen = this.isThreeDTestGateOpen();
    const threeCGateOpen = this.isThreeCTestGateOpen();
    const threeBGateOpen = this.isThreeBTestGateOpen();
    const loaderAttempt = threeEGateOpen
      ? this.runThreeEConcurrentBaseTiles(snapshot, diff)
      : threeDGateOpen
        ? this.runThreeDBaseKeepTiles(snapshot, diff)
        : threeCGateOpen
          ? this.runThreeCBaseVisibleTiles(snapshot, diff)
          : threeBGateOpen
            ? this.runThreeBBaseVisibleTiles(snapshot, diff)
            : this.runThreeASingleBaseTile(snapshot, diff);
    if (loaderAttempt.rejected) {
      if (threeEGateOpen) this.stats.threeERejectedByGate += 1;
      else if (threeDGateOpen) this.stats.threeDRejectedByGate += 1;
      else if (threeCGateOpen) this.stats.threeCRejectedByGate += 1;
      else if (threeBGateOpen) this.stats.threeBRejectedByGate += 1;
      else this.stats.actualRejectedInvalid += 1;
      this.stats.lastLoadError = loaderAttempt.reasons.join(' | ');
      if (threeEGateOpen) this.stats.threeELastError = this.stats.lastLoadError;
      else if (threeDGateOpen) this.stats.threeDLastError = this.stats.lastLoadError;
      else if (threeCGateOpen) this.stats.threeCLastError = this.stats.lastLoadError;
      else if (threeBGateOpen) this.stats.threeBLastError = this.stats.lastLoadError;
    } else if (!loaderAttempt.started) {
      if (threeEGateOpen) this.stats.threeERejectedByGate += 1;
      else if (threeDGateOpen) this.stats.threeDRejectedByGate += 1;
      else if (threeCGateOpen) this.stats.threeCRejectedByGate += 1;
      else if (threeBGateOpen) this.stats.threeBRejectedByGate += 1;
      else this.stats.actualSkippedByGate += 1;
    }
    this.publishState();
    this.updateStatus();
  },
};
const norgeCleanDiagnosticsV1 = {
  zoom: null,
  screenKey: '',
  sourceCount: 0,
  cleanSourceCount: 0,
  paneCount: 0,
  tileJobCount: 0,
  visibleTileCount: 0,
  overscanTileCount: 0,
  requestTileCount: 0,
  visibleRange: null,
  expandedRange: null,
  fittedRange: null,
  overscan: 0,
  clipped: false,
  boundsSource: '',
  coverageGuard: null,
  outsideVisibleJobs: 0,
  overscanJobs: 0,
};
let norgeLastVisibleSourceBounds = null;
let norgeAppliedPan = { x: 0, y: 0 };
const LOCKED_NORGE_VIEW = {
  center: [65.0, 15.0],
  zoom: 4,
  placement: { x: 0, y: 0, scale: 1, rotation: 0 },
};
const norgePlacement = {
  ...LOCKED_NORGE_VIEW.placement,
};

function isNorgeRule1SurfaceMode() {
  return !!document.getElementById('norge-surface-map') || !!document.getElementById('norge-rule1-surface')?.checked;
}

function getNorgeMapElement() {
  return document.getElementById('norge-surface-map') || document.getElementById('norge-leaflet-map');
}

function isNorgeSurfaceVerticallyFlipped() {
  return !!document.getElementById('norge-surface-map');
}

function applyNorgePlacement() {
  const mapEl = getNorgeMapElement();
  if (!mapEl) return;
  syncNorgeSurfaceToInstrument();
  const rule1Mode = isNorgeRule1SurfaceMode();
  mapEl.classList.toggle('norge-rule1-surface', rule1Mode);
  mapEl.style.setProperty('--norge-map-x', rule1Mode ? `${norgePlacement.x}px` : '0px');
  mapEl.style.setProperty('--norge-map-y', rule1Mode ? `${norgePlacement.y}px` : '0px');
  mapEl.style.setProperty('--norge-map-scale', String(norgePlacement.scale));
  mapEl.style.setProperty('--norge-map-flip-y', isNorgeSurfaceVerticallyFlipped() ? '-1' : '1');
  mapEl.style.setProperty('--norge-map-rotation', `${norgePlacement.rotation || 0}deg`);
  const xVal = document.getElementById('norge-cal-x-val');
  const yVal = document.getElementById('norge-cal-y-val');
  const scaleVal = document.getElementById('norge-cal-scale-val');
  const rotationVal = document.getElementById('norge-cal-rotation-val');
  if (xVal) xVal.textContent = String(norgePlacement.x);
  if (yVal) yVal.textContent = String(norgePlacement.y);
  if (scaleVal) scaleVal.textContent = `${Math.round(norgePlacement.scale * 100)}%`;
  if (rotationVal) rotationVal.textContent = `${(norgePlacement.rotation || 0).toFixed(1)}°`;
  if (norgeLeaflet) {
    if (rule1Mode) {
      if (norgeAppliedPan.x || norgeAppliedPan.y) {
        norgeLeaflet.map.panBy([norgeAppliedPan.x, norgeAppliedPan.y], { animate: false });
        norgeAppliedPan = { x: 0, y: 0 };
      }
    } else {
      const dx = norgePlacement.x - norgeAppliedPan.x;
      const dy = norgePlacement.y - norgeAppliedPan.y;
      if (dx || dy) {
        norgeLeaflet.map.panBy([-dx, -dy], { animate: false });
        norgeAppliedPan = { x: norgePlacement.x, y: norgePlacement.y };
      }
    }
    setTimeout(() => norgeLeaflet.map.invalidateSize(), 0);
  }
  requestAnimationFrame(updateNorgeCalibrationStatus);
}

function setNorgePlacement({
  x = norgePlacement.x,
  y = norgePlacement.y,
  scale = norgePlacement.scale,
  rotation = norgePlacement.rotation || 0,
}) {
  norgePlacement.x = x;
  norgePlacement.y = y;
  norgePlacement.scale = scale;
  norgePlacement.rotation = rotation;
  const xSlider = document.getElementById('norge-cal-x');
  const ySlider = document.getElementById('norge-cal-y');
  const scaleSlider = document.getElementById('norge-cal-scale');
  const rotationSlider = document.getElementById('norge-cal-rotation');
  if (xSlider) xSlider.value = String(x);
  if (ySlider) ySlider.value = String(y);
  if (scaleSlider) scaleSlider.value = String(Math.round(scale * 100));
  if (rotationSlider) rotationSlider.value = String(rotation);
  applyNorgePlacement();
}

function bindNorgePlacementControls() {
  const xSlider = document.getElementById('norge-cal-x');
  const ySlider = document.getElementById('norge-cal-y');
  const scaleSlider = document.getElementById('norge-cal-scale');
  const rotationSlider = document.getElementById('norge-cal-rotation');
  const rule1Toggle = document.getElementById('norge-rule1-surface');
  const instrumentZoomSlider = document.getElementById('norge-instrument-zoom');
  const gridXSlider = document.getElementById('norge-grid-x');
  const gridYSlider = document.getElementById('norge-grid-y');
  const mouseGridToggle = document.getElementById('norge-mouse-grid');
  if (xSlider) xSlider.addEventListener('input', () => setNorgePlacement({ x: parseInt(xSlider.value, 10) || 0 }));
  if (ySlider) ySlider.addEventListener('input', () => setNorgePlacement({ y: parseInt(ySlider.value, 10) || 0 }));
  if (scaleSlider) scaleSlider.addEventListener('input', () => setNorgePlacement({ scale: (parseInt(scaleSlider.value, 10) || 100) / 100 }));
  if (rotationSlider) rotationSlider.addEventListener('input', () => setNorgePlacement({ rotation: parseFloat(rotationSlider.value) || 0 }));
  if (rule1Toggle) {
    rule1Toggle.addEventListener('change', () => {
      applyNorgePlacement();
      syncNorgeMouseMode();
    });
  }
  if (instrumentZoomSlider) {
    instrumentZoomSlider.addEventListener('input', () => {
      setInstrumentZoomPercent(parseInt(instrumentZoomSlider.value, 10) || 100);
    });
  }
  if (gridXSlider) {
    gridXSlider.addEventListener('input', () => {
      setInstrumentGridOffset({ x: parseFloat(gridXSlider.value) || 0 });
    });
  }
  if (gridYSlider) {
    gridYSlider.addEventListener('input', () => {
      setInstrumentGridOffset({ y: parseFloat(gridYSlider.value) || 0 });
    });
  }
  if (mouseGridToggle) {
    mouseGridToggle.addEventListener('change', syncNorgeMouseMode);
  }
  document.getElementById('norge-cal-approx')?.addEventListener('click', () => {
    if (norgeLeaflet) {
      norgeLeaflet.map.setView([64.7, 14.5], 5);
      norgeAppliedPan = { x: 0, y: 0 };
    }
    setNorgePlacement({ x: 165, y: -215, scale: 0.42, rotation: 0 });
  });
  document.getElementById('norge-cal-reset')?.addEventListener('click', () => {
    if (norgeLeaflet) {
      norgeLeaflet.map.setView(LOCKED_NORGE_VIEW.center, LOCKED_NORGE_VIEW.zoom);
      norgeAppliedPan = { x: 0, y: 0 };
    }
    setNorgePlacement(LOCKED_NORGE_VIEW.placement);
  });
  document.getElementById('norge-grid-reset')?.addEventListener('click', () => {
    setInstrumentGridOffset({ x: 0, y: 0 });
  });
  applyNorgePlacement();
  updateZoomReadout();
}

const NORGE_SURFACE_META = {
  width: 2048,
  height: 2048,
  centerX: 1024,
  centerY: 1024,
  radiusPx: 1024,
  edgeLat: 56.0,
};
const NORGE_MAP_NORTH_SHIFT_DEG = 0.0135;
const NORGE_SURFACE_CONTROL_POINTS = [
  {
    id: 'selsoy',
    name: 'Selsøy gården / polarsirkelen',
    geLat: 66.550003,
    geLon: 12.848411,
    mapLat: 66.5506,
    mapLon: 12.8472,
    ge: `GE: 66°33'0.01"N, 12°50'54.28"E`,
    map: 'Norgeskart: 66.5506° N, 12.8472° E',
    info: 'Polarsirkelanker for låsing av Norgeskartet mot GE-gridet.',
  },
  {
    id: 'kveitanosen',
    name: 'Kveitanosen / polarsirkelen',
    geLat: 66.55,
    geLon: 12.638303,
    mapLat: 66.55,
    mapLon: 12.6384,
    ge: `GE: 66°33'0.00"N, 12°38'17.89"E`,
    map: 'Norgeskart: 66.5500° N, 12.6384° E',
    info: 'Polarsirkelanker ved Kveitanosen/Enganveien for kontroll av samme breddegrad.',
  },
  {
    id: 'arctic-center',
    name: 'Arctic Circle Center',
    geLat: 66.550008,
    geLon: 15.327011,
    mapLat: 66.55,
    mapLon: 15.3266,
    ge: `GE: 66°33'0.03"N, 15°19'37.24"E`,
    map: 'Norgeskart: 66.5500° N, 15.3266° E',
    info: 'Polarsirkelanker ved Arctic Circle Center.',
  },
];
const NORGE_SURFACE_DETAIL = {
  maxTiles: 3600,
  minZoom: 7,
  maxZoom: 18,
  tileSize: 256,
  bounds: { latMin: -85.0, latMax: 84.0, lonMin: -180.0, lonMax: 180.0 },
};
const GRIMSEY_CONTROL_POINT = {
  name: 'Grimsey, Iceland',
  lat: 66.545525,
  lon: -18.011092,
};
const ICELAND_CONTROL_POINT = {
  name: 'Island senter',
  lat: 64.9631,
  lon: -19.0208,
};
const JAN_MAYEN_CONTROL_POINT = {
  name: 'Jan Mayen',
  lat: 70.98,
  lon: -8.53,
};
const DENMARK_CONTROL_POINT = {
  name: 'Danmark - Kattegat',
  lat: 56.0,
  lon: 10.5,
};
const GREENLAND_CONTROL_POINT = {
  name: 'Greenland - Arctic Circle reference',
  lat: 66.57695,
  lon: -53.49841,
};
const SWEDEN_CONTROL_POINT = {
  name: 'Sweden - Stockholm archipelago',
  lat: 59.33,
  lon: 18.07,
};
const SOUTH_CONTROL_POINT = {
  name: 'South test - Norwegian seacharts',
  lat: -70.0,
  lon: 0.0,
};
const ASSEMBLED_CONTROL_POINT = {
  name: 'Assembled Nordic surface',
  lat: 64.5,
  lon: 4.0,
};

function norgeSurfacePxPerUnit() {
  return NORGE_SURFACE_META.radiusPx / latToR(NORGE_SURFACE_META.edgeLat);
}

function projectNorgeSurfacePoint(lat, lon) {
  const p = aeProject(lat, lon);
  const pxPerUnit = norgeSurfacePxPerUnit();
  return {
    x: NORGE_SURFACE_META.centerX + p.x * pxPerUnit,
    y: NORGE_SURFACE_META.centerY - p.z * pxPerUnit,
  };
}

function worldToCanvasPoint(x, z) {
  const v = new THREE.Vector3(x, Y_MAP, z);
  v.project(camera);
  return {
    x: (v.x + 1) * 0.5 * cw,
    y: (-v.y + 1) * 0.5 * ch,
  };
}

function syncNorgeSurfaceToInstrument() {
  const mapEl = document.getElementById('norge-surface-map');
  if (!mapEl) return;
  const center = worldToCanvasPoint(0, 0);
  const edgeWorld = aeProject(NORGE_SURFACE_META.edgeLat, 0);
  const edge = worldToCanvasPoint(edgeWorld.x, edgeWorld.z);
  const radius = Math.hypot(edge.x - center.x, edge.y - center.y);
  if (!Number.isFinite(radius) || radius < 2) return;
  mapEl.style.setProperty('--norge-map-left', `${center.x.toFixed(2)}px`);
  mapEl.style.setProperty('--norge-map-top', `${center.y.toFixed(2)}px`);
  mapEl.style.setProperty('--norge-map-size', `${(radius * 2).toFixed(2)}px`);
  const renderedScale = Math.max(0.001, (radius * 2 * norgePlacement.scale) / NORGE_SURFACE_META.width);
  const markerScale = Math.max(0.18, Math.min(1.4, 1 / renderedScale));
  mapEl.style.setProperty('--norge-surface-marker-scale', markerScale.toFixed(4));
}

function unprojectNorgeSurfacePoint(x, y) {
  const pxPerUnit = norgeSurfacePxPerUnit();
  const worldX = (x - NORGE_SURFACE_META.centerX) / pxPerUnit;
  const worldZ = (NORGE_SURFACE_META.centerY - y) / pxPerUnit;
  return worldPointToLatLon(worldX, worldZ);
}

function worldPointToLatLon(worldX, worldZ) {
  const r = Math.hypot(worldX, worldZ);
  const lat = 90 - (r / R_OUTER) * 180;
  const a = Math.atan2(worldX, -worldZ);
  let compassDeg = (a * 180 / Math.PI) % 360;
  if (compassDeg < 0) compassDeg += 360;
  let lon = 180 - compassDeg;
  if (lon > 180) lon -= 360;
  if (lon < -180) lon += 360;
  return { lat, lon };
}

function lonLatToTile(lon, lat, zoom) {
  const latRad = lat * Math.PI / 180;
  const n = 2 ** zoom;
  return {
    x: (lon + 180) / 360 * n,
    y: (1 - Math.asinh(Math.tan(latRad)) / Math.PI) / 2 * n,
  };
}

function calibratedNorgeMapLat(point) {
  return point.mapLat + (point.mapLatAdjustDeg || 0);
}

function tileYToLat(y, zoom) {
  const n = 2 ** zoom;
  return Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n))) * 180 / Math.PI;
}

function tileBounds(x, y, zoom) {
  const n = 2 ** zoom;
  return {
    west: x / n * 360 - 180,
    east: (x + 1) / n * 360 - 180,
    north: tileYToLat(y, zoom),
    south: tileYToLat(y + 1, zoom),
  };
}

function currentNorgeDetailSources() {
  const selectedBase = document.querySelector('input[name="norge-base"]:checked')?.value || 'sjokartraster';
  const sources = [];
  if (selectedBase === 'osm') sources.push({ type: 'osm', layer: 'osm', role: 'base' });
  else if (selectedBase === 'iceland-sjokart') {
    sources.push({ type: 'wms-iceland-sjokart', layer: 'Sjomaelingar:Sjokort_Sjomaelinga', role: 'base' });
  }
  else if (selectedBase === 'denmark-havplan') {
    sources.push({ type: 'wms-denmark-havplan', layer: 'Danmarks_havplan_af_28_juni_2024', role: 'base' });
  }
  else if (selectedBase === 'sweden-seachart') {
    sources.push({ type: 'wms-sweden-fyren', layer: 'OgcWmsLayer0', role: 'base' });
  }
  else if (selectedBase === 'assembled-nordic') {
    sources.push(
      { type: 'wms-sweden-fyren', layer: 'OgcWmsLayer0', role: 'base', anchorMode: 'norway' },
      { type: 'wms-denmark-havplan', layer: 'Danmarks_havplan_af_28_juni_2024', role: 'overlay', anchorMode: 'norway' },
      { type: 'wms-iceland-sjokart', layer: 'Sjomaelingar:Sjokort_Sjomaelinga', role: 'overlay', anchorMode: 'norway' },
      { type: 'kartverket', layer: 'sjokartraster', role: 'overlay', anchorMode: 'norway' },
    );
  }
  else sources.push({ type: 'kartverket', layer: selectedBase, role: 'base' });
  if (document.getElementById('norge-layer-both-seacharts')?.checked) {
    if (!sources.some(source => source.type === 'wms-iceland-sjokart')) {
      sources.push({ type: 'wms-iceland-sjokart', layer: 'Sjomaelingar:Sjokort_Sjomaelinga', role: 'overlay' });
    }
    if (!sources.some(source => source.type === 'kartverket' && source.layer === 'sjokartraster')) {
      sources.push({ type: 'kartverket', layer: 'sjokartraster', role: 'overlay' });
    }
  }
  if (document.getElementById('norge-layer-sjokart')?.checked) {
    sources.push({ type: 'kartverket', layer: 'sjokartraster', role: 'overlay' });
  }
  if (document.getElementById('norge-layer-nib')?.checked) {
    sources.push({ type: 'wms-nib', layer: 'ortofoto', role: 'overlay' });
  }
  if (document.getElementById('norge-layer-se-eiendom')?.checked) {
    sources.push({ type: 'wms-se-eiendom', layer: 'eiendomsgrense,grensepunkt,adresse,eiendoms_id', role: 'overlay' });
  }
  return sources;
}

function mercatorMeters(lon, lat) {
  const r = 6378137;
  const clampedLat = Math.max(-85.05112878, Math.min(85.05112878, lat));
  return {
    x: r * lon * Math.PI / 180,
    y: r * Math.log(Math.tan(Math.PI / 4 + clampedLat * Math.PI / 360)),
  };
}

function webMercatorTileBbox(x, y, z) {
  const world = 20037508.342789244;
  const tiles = 2 ** z;
  const span = (world * 2) / tiles;
  const minX = -world + x * span;
  const maxX = minX + span;
  const maxY = world - y * span;
  const minY = maxY - span;
  return { minX, minY, maxX, maxY };
}

function detailTileUrl(source, z, x, y, bounds) {
  if (source.type === 'osm') return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  if (source.type === 'wms-iceland-sjokart') {
    const b = webMercatorTileBbox(x, y, z);
    return 'https://gis.natt.is/mapcache/sjokort/web-mercator/wmst?' +
      'SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap' +
      `&LAYERS=${encodeURIComponent(source.layer)}` +
      '&STYLES=&FORMAT=image/png&TRANSPARENT=TRUE&CRS=EPSG:3857' +
      `&BBOX=${b.minX.toFixed(2)},${b.minY.toFixed(2)},${b.maxX.toFixed(2)},${b.maxY.toFixed(2)}` +
      `&WIDTH=${NORGE_SURFACE_DETAIL.tileSize}&HEIGHT=${NORGE_SURFACE_DETAIL.tileSize}`;
  }
  if (source.type === 'wms-denmark-havplan') {
    const b = webMercatorTileBbox(x, y, z);
    return 'https://havplan.dk/geoserver/havplan/wms?' +
      'SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap' +
      `&LAYERS=${encodeURIComponent(source.layer)}` +
      '&STYLES=&FORMAT=image/png&TRANSPARENT=TRUE&SRS=EPSG:3857' +
      `&BBOX=${b.minX.toFixed(2)},${b.minY.toFixed(2)},${b.maxX.toFixed(2)},${b.maxY.toFixed(2)}` +
      `&WIDTH=${NORGE_SURFACE_DETAIL.tileSize}&HEIGHT=${NORGE_SURFACE_DETAIL.tileSize}`;
  }
  if (source.type === 'wms-sweden-fyren') {
    const b = webMercatorTileBbox(x, y, z);
    return 'https://geokatalog.sjofartsverket.se/mapservice/wms.axd/FyrenBakgrund?' +
      'SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap' +
      `&LAYERS=${encodeURIComponent(source.layer)}` +
      '&STYLES=&FORMAT=image/png&TRANSPARENT=FALSE&CRS=EPSG:3857' +
      `&BBOX=${b.minX.toFixed(2)},${b.minY.toFixed(2)},${b.maxX.toFixed(2)},${b.maxY.toFixed(2)}` +
      `&WIDTH=${NORGE_SURFACE_DETAIL.tileSize}&HEIGHT=${NORGE_SURFACE_DETAIL.tileSize}`;
  }
  if (source.type === 'wms-nib') {
    const sw = mercatorMeters(bounds.west, bounds.south);
    const ne = mercatorMeters(bounds.east, bounds.north);
    const token = localStorage.getItem('norgeibilder-token') || window.NORGEIBILDER_TOKEN || '';
    const tokenParam = token ? `&token=${encodeURIComponent(token)}` : '';
    return 'https://services.norgeibilder.no/wms/ortofoto?' +
      'SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap' +
      '&LAYERS=ortofoto&FORMAT=image/jpeg&CRS=EPSG:3857' +
      `&BBOX=${sw.x},${sw.y},${ne.x},${ne.y}` +
      `&WIDTH=${NORGE_SURFACE_DETAIL.tileSize}&HEIGHT=${NORGE_SURFACE_DETAIL.tileSize}` +
      tokenParam;
  }
  if (source.type === 'wms-se-eiendom') {
    const b = webMercatorTileBbox(x, y, z);
    return 'https://wms.geonorge.no/skwms1/wms.matrikkel?' +
      'SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap' +
      `&LAYERS=${encodeURIComponent(source.layer)}` +
      '&STYLES=&FORMAT=image/png&TRANSPARENT=TRUE&CRS=EPSG:3857' +
      `&BBOX=${b.minX.toFixed(2)},${b.minY.toFixed(2)},${b.maxX.toFixed(2)},${b.maxY.toFixed(2)}` +
      `&WIDTH=${NORGE_SURFACE_DETAIL.tileSize}&HEIGHT=${NORGE_SURFACE_DETAIL.tileSize}`;
  }
  return `https://cache.kartverket.no/v1/wmts/1.0.0/${source.layer}/default/webmercator/${z}/${y}/${x}.png`;
}

function cleanDetailTileUrl(source, z, x, y) {
  if (source.type === 'osm') return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
  if (source.type === 'wms-iceland-sjokart') {
    const b = webMercatorTileBbox(x, y, z);
    return 'https://gis.natt.is/mapcache/sjokort/web-mercator/wmst?' +
      'SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap' +
      `&LAYERS=${encodeURIComponent(source.layer)}` +
      '&STYLES=&FORMAT=image/png&TRANSPARENT=TRUE&CRS=EPSG:3857' +
      `&BBOX=${b.minX.toFixed(2)},${b.minY.toFixed(2)},${b.maxX.toFixed(2)},${b.maxY.toFixed(2)}` +
      `&WIDTH=${NORGE_SURFACE_DETAIL.tileSize}&HEIGHT=${NORGE_SURFACE_DETAIL.tileSize}`;
  }
  if (source.type === 'wms-denmark-havplan') {
    const b = webMercatorTileBbox(x, y, z);
    return 'https://havplan.dk/geoserver/havplan/wms?' +
      'SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap' +
      `&LAYERS=${encodeURIComponent(source.layer)}` +
      '&STYLES=&FORMAT=image/png&TRANSPARENT=TRUE&SRS=EPSG:3857' +
      `&BBOX=${b.minX.toFixed(2)},${b.minY.toFixed(2)},${b.maxX.toFixed(2)},${b.maxY.toFixed(2)}` +
      `&WIDTH=${NORGE_SURFACE_DETAIL.tileSize}&HEIGHT=${NORGE_SURFACE_DETAIL.tileSize}`;
  }
  if (source.type === 'wms-sweden-fyren') {
    const b = webMercatorTileBbox(x, y, z);
    return 'https://geokatalog.sjofartsverket.se/mapservice/wms.axd/FyrenBakgrund?' +
      'SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap' +
      `&LAYERS=${encodeURIComponent(source.layer)}` +
      '&STYLES=&FORMAT=image/png&TRANSPARENT=FALSE&CRS=EPSG:3857' +
      `&BBOX=${b.minX.toFixed(2)},${b.minY.toFixed(2)},${b.maxX.toFixed(2)},${b.maxY.toFixed(2)}` +
      `&WIDTH=${NORGE_SURFACE_DETAIL.tileSize}&HEIGHT=${NORGE_SURFACE_DETAIL.tileSize}`;
  }
  if (source.type === 'wms-nib') return '';
  if (source.type === 'wms-se-eiendom') {
    const b = webMercatorTileBbox(x, y, z);
    return 'https://wms.geonorge.no/skwms1/wms.matrikkel?' +
      'SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap' +
      `&LAYERS=${encodeURIComponent(source.layer)}` +
      '&STYLES=&FORMAT=image/png&TRANSPARENT=TRUE&CRS=EPSG:3857' +
      `&BBOX=${b.minX.toFixed(2)},${b.minY.toFixed(2)},${b.maxX.toFixed(2)},${b.maxY.toFixed(2)}` +
      `&WIDTH=${NORGE_SURFACE_DETAIL.tileSize}&HEIGHT=${NORGE_SURFACE_DETAIL.tileSize}`;
  }
  return `https://cache.kartverket.no/v1/wmts/1.0.0/${source.layer}/default/webmercator/${z}/${y}/${x}.png`;
}

function resetNorgeCleanTileQueue() {
  if (norgeCleanTileManager.queuePumpTimer !== null) {
    cancelAnimationFrame(norgeCleanTileManager.queuePumpTimer);
    norgeCleanTileManager.queuePumpTimer = null;
  }
  norgeCleanTileManager.queue = [];
  norgeCleanTileManager.active = 0;
  norgeCleanTileManager.currentBatch += 1;
  if (norgeFreezeMode === 'waiting') norgeFreezeWaitBatch = norgeCleanTileManager.currentBatch;
  norgeCleanTileManager.requested = 0;
  norgeCleanTileManager.loaded = 0;
  norgeCleanTileManager.cached = 0;
  norgeCleanTileManager.failed = 0;
  norgeCleanTileManager.fallbackHits = 0;
  norgeCleanTileManager.fallbackMisses = 0;
  norgeCleanTileManager.queueYielded = false;
  norgeCleanTileManager.yieldCount = 0;
  norgeCleanTileManager.lastPumpMs = 0;
  refreshNorgeCleanLoadStatus();
}

function rememberNorgeCleanTile(src) {
  if (!src) return;
  if (norgeCleanTileManager.cache.has(src)) norgeCleanTileManager.cache.delete(src);
  norgeCleanTileManager.cache.set(src, Date.now());
  while (norgeCleanTileManager.cache.size > norgeCleanTileManager.cacheLimit) {
    const oldest = norgeCleanTileManager.cache.keys().next().value;
    norgeCleanTileManager.cache.delete(oldest);
  }
}

function countNorgeCleanTilesInRange(range) {
  if (!range) return 0;
  return Math.max(0, range.xMax - range.xMin + 1) * Math.max(0, range.yMax - range.yMin + 1);
}

function cloneNorgeCleanTileRange(range) {
  if (!range) return null;
  return {
    xMin: range.xMin,
    xMax: range.xMax,
    yMin: range.yMin,
    yMax: range.yMax,
    count: range.count || countNorgeCleanTilesInRange(range),
    overscan: range.overscan || 0,
    clipped: !!range.clipped,
  };
}

function isNorgeTileInRange(x, y, range) {
  return !!range && x >= range.xMin && x <= range.xMax && y >= range.yMin && y <= range.yMax;
}

function norgeCleanPaneScreenRectForRange(range, zoom, anchorMode = primaryCleanAnchorMode()) {
  if (!range) return null;
  const tileSize = NORGE_SURFACE_DETAIL.tileSize;
  const originX = range.xMin * tileSize;
  const originY = range.yMin * tileSize;
  const transform = cleanNorgeTransform(zoom, originX, originY, anchorMode);
  if (!transform) return null;
  const width = (range.xMax - range.xMin + 1) * tileSize;
  const height = (range.yMax - range.yMin + 1) * tileSize;
  const corners = [
    applyCleanTransformPoint(transform, { x: 0, y: 0 }),
    applyCleanTransformPoint(transform, { x: width, y: 0 }),
    applyCleanTransformPoint(transform, { x: 0, y: height }),
    applyCleanTransformPoint(transform, { x: width, y: height }),
  ];
  return {
    left: Math.min(...corners.map(p => p.x)),
    right: Math.max(...corners.map(p => p.x)),
    top: Math.min(...corners.map(p => p.y)),
    bottom: Math.max(...corners.map(p => p.y)),
  };
}

function norgeCleanViewportCoverage(rect) {
  if (!rect || !wrap) return null;
  const viewport = wrap.getBoundingClientRect();
  const missing = {
    left: Math.max(0, rect.left - viewport.left),
    right: Math.max(0, viewport.right - rect.right),
    top: Math.max(0, rect.top - viewport.top),
    bottom: Math.max(0, viewport.bottom - rect.bottom),
  };
  return {
    ...missing,
    total: missing.left + missing.right + missing.top + missing.bottom,
  };
}

function norgeTileRangeLimit(zoom) {
  const worldTiles = 2 ** zoom;
  const nwLimit = lonLatToTile(NORGE_SURFACE_DETAIL.bounds.lonMin, NORGE_SURFACE_DETAIL.bounds.latMax, zoom);
  const seLimit = lonLatToTile(NORGE_SURFACE_DETAIL.bounds.lonMax, NORGE_SURFACE_DETAIL.bounds.latMin, zoom);
  return {
    xMin: Math.max(0, Math.floor(Math.min(nwLimit.x, seLimit.x))),
    xMax: Math.min(worldTiles - 1, Math.floor(Math.max(nwLimit.x, seLimit.x))),
    yMin: Math.max(0, Math.floor(Math.min(nwLimit.y, seLimit.y))),
    yMax: Math.min(worldTiles - 1, Math.floor(Math.max(nwLimit.y, seLimit.y))),
  };
}

function expandNorgeTileRangeToCoverViewport(range, zoom, sourcesLength) {
  if (!range) return range;
  const maxTilesPerSource = Math.max(16, Math.floor(NORGE_SURFACE_DETAIL.maxTiles / Math.max(1, sourcesLength)));
  const limit = norgeTileRangeLimit(zoom);
  let current = { ...range, count: countNorgeCleanTilesInRange(range) };
  let guard = { expanded: 0, before: null, after: null, limited: false };
  for (let i = 0; i < 64; i++) {
    const rect = norgeCleanPaneScreenRectForRange(current, zoom);
    const coverage = norgeCleanViewportCoverage(rect);
    if (!coverage) break;
    if (!guard.before) guard.before = coverage;
    guard.after = coverage;
    if (coverage.total <= 2) break;
    const candidates = [];
    const pushCandidate = next => {
      next.count = countNorgeCleanTilesInRange(next);
      if (next.count <= maxTilesPerSource) {
        const nextRect = norgeCleanPaneScreenRectForRange(next, zoom);
        const nextCoverage = norgeCleanViewportCoverage(nextRect);
        if (nextCoverage) candidates.push({ range: next, coverage: nextCoverage });
      }
    };
    if (current.xMin > limit.xMin) pushCandidate({ ...current, xMin: current.xMin - 1 });
    if (current.xMax < limit.xMax) pushCandidate({ ...current, xMax: current.xMax + 1 });
    if (current.yMin > limit.yMin) pushCandidate({ ...current, yMin: current.yMin - 1 });
    if (current.yMax < limit.yMax) pushCandidate({ ...current, yMax: current.yMax + 1 });
    if (!candidates.length) {
      guard.limited = true;
      break;
    }
    candidates.sort((a, b) => a.coverage.total - b.coverage.total);
    if (candidates[0].coverage.total >= coverage.total - 0.1) break;
    current = candidates[0].range;
    guard.expanded += 1;
  }
  current.count = countNorgeCleanTilesInRange(current);
  current.coverageGuard = guard;
  return current;
}

function resetNorgeCleanDiagnosticsV1() {
  Object.assign(norgeCleanDiagnosticsV1, {
    zoom: null,
    screenKey: '',
    sourceCount: 0,
    cleanSourceCount: 0,
    paneCount: 0,
    tileJobCount: 0,
    visibleTileCount: 0,
    overscanTileCount: 0,
    requestTileCount: 0,
    visibleRange: null,
    expandedRange: null,
    fittedRange: null,
    overscan: 0,
    clipped: false,
    boundsSource: '',
    coverageGuard: null,
    outsideVisibleJobs: 0,
    overscanJobs: 0,
  });
}

function norgeCleanNow() {
  return typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
}

function computeNorgeCleanPriorityScore(job) {
  const basePriority = Number.isFinite(job.priority) ? job.priority : 0;
  const qualityGap = Number.isFinite(job.qualityGap) ? Math.max(0, job.qualityGap) : 0;
  return basePriority - qualityGap * 100;
}

function compareNorgeCleanTileJobs(a, b) {
  const aScore = Number.isFinite(a.priorityScore) ? a.priorityScore : computeNorgeCleanPriorityScore(a);
  const bScore = Number.isFinite(b.priorityScore) ? b.priorityScore : computeNorgeCleanPriorityScore(b);
  return aScore - bScore || (a.priority || 0) - (b.priority || 0);
}

function findNorgeCleanParentFallback(source, z, x, y, maxLevels = 4) {
  for (let levels = 1; levels <= maxLevels && z - levels >= 0; levels += 1) {
    const scale = 2 ** levels;
    const parentZ = z - levels;
    const parentX = x >> levels;
    const parentY = y >> levels;
    const parentSrc = cleanDetailTileUrl(source, parentZ, parentX, parentY);
    if (!parentSrc || !norgeCleanTileManager.cache.has(parentSrc)) continue;
    return {
      levels,
      src: parentSrc,
      offsetX: (x % scale) * NORGE_SURFACE_DETAIL.tileSize,
      offsetY: (y % scale) * NORGE_SURFACE_DETAIL.tileSize,
      backgroundSize: NORGE_SURFACE_DETAIL.tileSize * scale,
    };
  }
  return null;
}

function addNorgeCleanParentFallback(img, source, z, x, y) {
  const fallback = findNorgeCleanParentFallback(source, z, x, y);
  if (!fallback) {
    norgeCleanTileManager.fallbackMisses += 1;
    return null;
  }
  const el = document.createElement('div');
  el.className = `norge-detail-tile-fallback${source.role === 'overlay' ? ' overlay' : ''}`;
  el.style.position = 'absolute';
  el.style.left = img.style.left;
  el.style.top = img.style.top;
  el.style.width = img.style.width;
  el.style.height = img.style.height;
  el.style.pointerEvents = 'none';
  el.style.backgroundImage = `url("${fallback.src}")`;
  el.style.backgroundRepeat = 'no-repeat';
  el.style.backgroundSize = `${fallback.backgroundSize}px ${fallback.backgroundSize}px`;
  el.style.backgroundPosition = `-${fallback.offsetX}px -${fallback.offsetY}px`;
  el.style.zIndex = '1';
  el.dataset.parentSrc = fallback.src;
  el.dataset.parentLevels = String(fallback.levels);
  img.dataset.fallbackId = '1';
  img.style.zIndex = '2';
  norgeCleanTileManager.fallbackHits += 1;
  return el;
}

function removeNorgeCleanParentFallback(img) {
  if (!img?.previousSibling?.classList?.contains('norge-detail-tile-fallback')) return;
  img.previousSibling.remove();
}

function scheduleNorgeCleanQueuePump() {
  if (norgeCleanTileManager.queuePumpTimer !== null) return;
  norgeCleanTileManager.queuePumpTimer = requestAnimationFrame(() => {
    norgeCleanTileManager.queuePumpTimer = null;
    processNorgeCleanTileQueue();
  });
}

function processNorgeCleanTileQueue() {
  const startedAt = norgeCleanNow();
  const deadline = startedAt + norgeCleanTileManager.frameBudgetMs;
  norgeCleanTileManager.queueYielded = false;
  while (norgeCleanTileManager.active < norgeCleanTileManager.maxConcurrent && norgeCleanTileManager.queue.length) {
    if (norgeCleanNow() >= deadline) {
      norgeCleanTileManager.queueYielded = true;
      norgeCleanTileManager.yieldCount += 1;
      scheduleNorgeCleanQueuePump();
      break;
    }
    const job = norgeCleanTileManager.queue.shift();
    const img = job.img;
    if (job.batch !== norgeCleanTileManager.currentBatch) continue;
    if (!img.isConnected || img.dataset.loadedSrc === job.src) continue;
    norgeCleanTileManager.active += 1;
    norgeCleanTileManager.requested += 1;
    refreshNorgeCleanLoadStatus();
    img.onload = () => {
      if (job.batch !== norgeCleanTileManager.currentBatch) return;
      norgeCleanTileManager.active = Math.max(0, norgeCleanTileManager.active - 1);
      norgeCleanTileManager.loaded += 1;
      img.dataset.loadedSrc = job.src;
      img.dataset.loadedZ = img.dataset.z || '';
      removeNorgeCleanParentFallback(img);
      rememberNorgeCleanTile(job.src);
      processNorgeCleanTileQueue();
      syncNorgeCleanControls();
      refreshNorgeCleanLoadStatus();
      checkNorgeFreezeWhenLoaded();
    };
    img.onerror = () => {
      if (job.batch !== norgeCleanTileManager.currentBatch) return;
      norgeCleanTileManager.active = Math.max(0, norgeCleanTileManager.active - 1);
      norgeCleanTileManager.failed += 1;
      img.remove();
      processNorgeCleanTileQueue();
      syncNorgeCleanControls();
      refreshNorgeCleanLoadStatus();
      checkNorgeFreezeWhenLoaded();
    };
    img.src = job.src;
  }
  norgeCleanTileManager.lastPumpMs = Math.max(0, norgeCleanNow() - startedAt);
  if (norgeCleanTileManager.queue.length && norgeCleanTileManager.active < norgeCleanTileManager.maxConcurrent) {
    scheduleNorgeCleanQueuePump();
  }
  checkNorgeFreezeWhenLoaded();
}

function queueNorgeCleanTile(img, src, priority = 0) {
  if (!src) return;
  img.dataset.src = src;
  if (norgeCleanTileManager.cache.has(src)) {
    img.src = src;
    img.dataset.loadedSrc = src;
    img.dataset.loadedZ = img.dataset.z || '';
    norgeCleanTileManager.cached += 1;
    rememberNorgeCleanTile(src);
    refreshNorgeCleanLoadStatus();
    checkNorgeFreezeWhenLoaded();
    return;
  }
  const targetZ = Number(img.dataset.z);
  const availableZ = Number(img.dataset.loadedZ);
  const qualityGap = Number.isFinite(targetZ) && Number.isFinite(availableZ)
    ? Math.max(0, targetZ - availableZ)
    : 0;
  const job = { img, src, priority, targetZ, availableZ, qualityGap, batch: norgeCleanTileManager.currentBatch };
  job.priorityScore = computeNorgeCleanPriorityScore(job);
  norgeCleanTileManager.queue.push(job);
}

function cleanNorgeDetailSources() {
  return currentNorgeDetailSources().filter(source => source.type !== 'wms-nib');
}

function cleanSourceAnchorMode(source) {
  if (source?.anchorMode) return source.anchorMode;
  return source?.type === 'wms-iceland-sjokart' ? 'iceland' : 'norway';
}

function primaryCleanAnchorMode() {
  return document.querySelector('input[name="norge-base"]:checked')?.value === 'iceland-sjokart'
    ? 'iceland'
    : 'norway';
}

function cleanTileLocalPoint(lat, lon, zoom, originX, originY) {
  const tileSize = NORGE_SURFACE_DETAIL.tileSize;
  const tile = lonLatToTile(lon, lat, zoom);
  return {
    x: tile.x * tileSize - originX,
    y: tile.y * tileSize - originY,
  };
}

function applyCleanTransformPoint(transform, point) {
  return {
    x: transform.a * point.x + transform.c * point.y + transform.tx,
    y: transform.b * point.x + transform.d * point.y + transform.ty,
  };
}

function solveCleanSimilarity(srcPts, dstPts) {
  if (srcPts.length !== dstPts.length || srcPts.length < 2) return null;
  const n = srcPts.length;
  const srcCenter = srcPts.reduce((acc, p) => ({ x: acc.x + p.x / n, y: acc.y + p.y / n }), { x: 0, y: 0 });
  const dstCenter = dstPts.reduce((acc, p) => ({ x: acc.x + p.x / n, y: acc.y + p.y / n }), { x: 0, y: 0 });
  let sxx = 0;
  let sxy = 0;
  let denom = 0;
  for (let i = 0; i < n; i++) {
    const sx = srcPts[i].x - srcCenter.x;
    const sy = srcPts[i].y - srcCenter.y;
    const dx = dstPts[i].x - dstCenter.x;
    const dy = dstPts[i].y - dstCenter.y;
    sxx += sx * dx + sy * dy;
    sxy += sx * dy - sy * dx;
    denom += sx * sx + sy * sy;
  }
  if (denom < 1e-9) return null;
  const a = sxx / denom;
  const b = sxy / denom;
  const c = -b;
  const d = a;
  const tx = dstCenter.x - (a * srcCenter.x + c * srcCenter.y);
  const ty = dstCenter.y - (b * srcCenter.x + d * srcCenter.y);
  let maxResidual = 0;
  let sumSq = 0;
  const residuals = srcPts.map((src, i) => {
    const x = a * src.x + c * src.y + tx;
    const y = b * src.x + d * src.y + ty;
    const r = Math.hypot(x - dstPts[i].x, y - dstPts[i].y);
    maxResidual = Math.max(maxResidual, r);
    sumSq += r * r;
    return r;
  });
  return {
    a,
    b,
    c,
    d,
    tx,
    ty,
    css: `matrix(${a.toFixed(10)}, ${b.toFixed(10)}, ${c.toFixed(10)}, ${d.toFixed(10)}, ${tx.toFixed(2)}, ${ty.toFixed(2)})`,
    maxResidual,
    rmsResidual: Math.sqrt(sumSq / n),
    residuals,
  };
}

function withNorgeNorthShift(transform, srcPts, dstPts, zoom, originX, originY) {
  if (!transform || !NORGE_MAP_NORTH_SHIFT_DEG) return transform;
  const tileSize = NORGE_SURFACE_DETAIL.tileSize;
  const ref = NORGE_SURFACE_CONTROL_POINTS[0];
  const baseMapLat = calibratedNorgeMapLat(ref);
  const baseTile = lonLatToTile(ref.mapLon, baseMapLat, zoom);
  const northTile = lonLatToTile(ref.mapLon, baseMapLat + NORGE_MAP_NORTH_SHIFT_DEG, zoom);
  const base = {
    x: baseTile.x * tileSize - originX,
    y: baseTile.y * tileSize - originY,
  };
  const north = {
    x: northTile.x * tileSize - originX,
    y: northTile.y * tileSize - originY,
  };
  const apply = p => ({
    x: transform.a * p.x + transform.c * p.y + transform.tx,
    y: transform.b * p.x + transform.d * p.y + transform.ty,
  });
  const baseScreen = apply(base);
  const northScreen = apply(north);
  const tx = transform.tx + (northScreen.x - baseScreen.x);
  const ty = transform.ty + (northScreen.y - baseScreen.y);
  const shifted = {
    ...transform,
    tx,
    ty,
    css: `matrix(${transform.a.toFixed(10)}, ${transform.b.toFixed(10)}, ${transform.c.toFixed(10)}, ${transform.d.toFixed(10)}, ${tx.toFixed(2)}, ${ty.toFixed(2)})`,
    northShiftDeg: NORGE_MAP_NORTH_SHIFT_DEG,
  };
  if (srcPts && dstPts && srcPts.length === dstPts.length) {
    let maxResidual = 0;
    let sumSq = 0;
    const residuals = srcPts.map((src, index) => {
      const p = {
        x: shifted.a * src.x + shifted.c * src.y + shifted.tx,
        y: shifted.b * src.x + shifted.d * src.y + shifted.ty,
      };
      const r = Math.hypot(p.x - dstPts[index].x, p.y - dstPts[index].y);
      maxResidual = Math.max(maxResidual, r);
      sumSq += r * r;
      return r;
    });
    shifted.maxResidual = maxResidual;
    shifted.rmsResidual = Math.sqrt(sumSq / srcPts.length);
    shifted.residuals = residuals;
  }
  return shifted;
}

function lockCleanTransformToGrimsey(transform, zoom, originX, originY) {
  if (!transform) return transform;
  const src = cleanTileLocalPoint(GRIMSEY_CONTROL_POINT.lat, GRIMSEY_CONTROL_POINT.lon, zoom, originX, originY);
  const current = applyCleanTransformPoint(transform, src);
  const dstWorld = aeProject(GRIMSEY_CONTROL_POINT.lat, GRIMSEY_CONTROL_POINT.lon);
  const dst = worldToCanvasPoint(dstWorld.x, dstWorld.z);
  const dx = dst.x - current.x;
  const dy = dst.y - current.y;
  const tx = transform.tx + dx;
  const ty = transform.ty + dy;
  const shifted = {
    ...transform,
    tx,
    ty,
    css: `matrix(${transform.a.toFixed(10)}, ${transform.b.toFixed(10)}, ${transform.c.toFixed(10)}, ${transform.d.toFixed(10)}, ${tx.toFixed(2)}, ${ty.toFixed(2)})`,
    anchorLock: {
      id: 'grimsey',
      name: GRIMSEY_CONTROL_POINT.name,
      lat: GRIMSEY_CONTROL_POINT.lat,
      lon: GRIMSEY_CONTROL_POINT.lon,
      dx,
      dy,
    },
  };
  const locked = applyCleanTransformPoint(shifted, src);
  const residual = Math.hypot(locked.x - dst.x, locked.y - dst.y);
  shifted.maxResidual = residual;
  shifted.rmsResidual = residual;
  shifted.residuals = [residual];
  return shifted;
}

function cleanNorgeTransform(zoom, originX, originY, anchorMode = primaryCleanAnchorMode()) {
  const tileSize = NORGE_SURFACE_DETAIL.tileSize;
  const srcPts = NORGE_SURFACE_CONTROL_POINTS.map(point => {
    const tile = lonLatToTile(point.mapLon, calibratedNorgeMapLat(point), zoom);
    return {
      x: tile.x * tileSize - originX,
      y: tile.y * tileSize - originY,
    };
  });
  const dstPts = NORGE_SURFACE_CONTROL_POINTS.map(point => {
    const target = aeProject(point.geLat, point.geLon);
    return worldToCanvasPoint(target.x, target.z);
  });
  const baseTransform = withNorgeNorthShift(solveCleanSimilarity(srcPts, dstPts), srcPts, dstPts, zoom, originX, originY);
  return anchorMode === 'iceland'
    ? lockCleanTransformToGrimsey(baseTransform, zoom, originX, originY)
    : baseTransform;
}

function syncNorgeCleanControls() {
  const layer = document.getElementById('norge-clean-detail-layer');
  norgeLeafletStyleEngine.enabled = document.getElementById('norge-leaflet-style-engine')?.checked === true;
  norgeLeafletStyleEngine.sync();
  if (norgeLeafletStyleEngine.enabled) norgeLeafletStyleEngine.update();
  const baselineLayer = document.getElementById('norge-screen-detail-layer');
  const surfaceOverlay = document.getElementById('norge-surface-overlay');
  const baseRasters = document.querySelectorAll('#norge-surface-map .norge-surface-raster');
  const surfaceDetailLayer = document.getElementById('norge-surface-detail-layer');
  const cleanOverlay = document.querySelector('#norge-clean-detail-layer .norge-clean-map-overlay');
  const visibleToggle = document.getElementById('norge-clean-visible');
  const hideBaselineToggle = document.getElementById('norge-clean-hide-baseline');
  const opacityInput = document.getElementById('norge-clean-opacity');
  const opacityVal = document.getElementById('norge-clean-opacity-val');
  const panes = document.querySelectorAll('.norge-clean-pixelflate');
  const visible = visibleToggle?.checked !== false;
  const hideBaseline = hideBaselineToggle?.checked === true;
  const opacity = Math.max(0, Math.min(100, Number(opacityInput?.value || 52))) / 100;
  if (layer) layer.style.display = visible ? '' : 'none';
  if (baselineLayer) baselineLayer.style.visibility = hideBaseline ? 'hidden' : '';
  if (surfaceOverlay) surfaceOverlay.style.visibility = hideBaseline ? 'hidden' : '';
  if (surfaceDetailLayer) surfaceDetailLayer.style.visibility = hideBaseline ? 'hidden' : '';
  if (cleanOverlay) cleanOverlay.style.display = visible && hideBaseline ? '' : 'none';
  baseRasters.forEach(img => {
    img.style.visibility = hideBaseline ? 'hidden' : '';
  });
  if (layer) layer.style.opacity = String(opacity);
  if (baselineLayer) baselineLayer.style.opacity = String(opacity);
  panes.forEach(pane => {
    if (pane.style.opacity) pane.style.opacity = '';
  });
  if (opacityVal) opacityVal.textContent = `${Math.round(opacity * 100)}%`;
  refreshNorgeCleanLoadStatus();
}

function norgeCleanLoadLine() {
  const manager = norgeCleanTileManager;
  const diag = norgeCleanDiagnosticsV1;
  window.__norgeCleanTileManager = {
    active: manager.active,
    requested: manager.requested,
    loaded: manager.loaded,
    cached: manager.cached,
    failed: manager.failed,
    fallbackHits: manager.fallbackHits,
    fallbackMisses: manager.fallbackMisses,
    queued: manager.queue.length,
    cacheSize: manager.cache.size,
    maxConcurrent: manager.maxConcurrent,
    frameBudgetMs: manager.frameBudgetMs,
    queueYielded: manager.queueYielded,
    yieldCount: manager.yieldCount,
    lastPumpMs: Number(manager.lastPumpMs.toFixed(2)),
    currentBatch: manager.currentBatch,
    freezeMode: norgeFreezeMode,
    frozen: norgeFrozenDetailLayer,
    diagnosticsV1: {
      zoom: diag.zoom,
      screenKey: diag.screenKey,
      sourceCount: diag.sourceCount,
      cleanSourceCount: diag.cleanSourceCount,
      paneCount: diag.paneCount,
      tileJobCount: diag.tileJobCount,
      visibleTileCount: diag.visibleTileCount,
      overscanTileCount: diag.overscanTileCount,
      requestTileCount: diag.requestTileCount,
      overscanJobs: diag.overscanJobs,
      outsideVisibleJobs: diag.outsideVisibleJobs,
      overscan: diag.overscan,
      clipped: diag.clipped,
      boundsSource: diag.boundsSource,
      coverageGuard: diag.coverageGuard,
      visibleRange: diag.visibleRange,
      expandedRange: diag.expandedRange,
      fittedRange: diag.fittedRange,
      fallbackIndicatorNote: 'diagnostic only; confirmed fallback is tracked by DOM/data fallbackId and fallback counters',
    },
  };
  const yieldText = manager.queueYielded ? `, yielded ${manager.yieldCount}` : '';
  const guardText = diag.coverageGuard
    ? `, guard +${diag.coverageGuard.expanded}${diag.coverageGuard.after ? ` miss ${diag.coverageGuard.after.total.toFixed(0)}px` : ''}`
    : '';
  const diagText = diag.zoom === null
    ? ''
    : `\nDiag V1: z${diag.zoom}, bounds ${diag.boundsSource || 'n/a'}${guardText}, panes ${diag.paneCount}, jobs ${diag.tileJobCount}, visible ${diag.visibleTileCount}, request ${diag.requestTileCount}, overscan ${diag.overscanTileCount}, outside-visible jobs ${diag.outsideVisibleJobs}`;
  const leafletStats = norgeLeafletStyleEngine.stats;
  const leafletText = norgeLeafletStyleEngine.enabled
    ? `\nLeaflet-style engine: ${leafletStats.state}, ${leafletStats.source || 'no source'} z${leafletStats.zoom ?? '-'}, tiles ${leafletStats.loaded}/${leafletStats.wanted}, pending ${leafletStats.pending}, kept ${leafletStats.kept}`
    : '';
  return `Load: ${manager.loaded}/${manager.requested} fetched, ${manager.cached} cache, ${manager.active} active, ${manager.queue.length} queued, ${manager.failed} failed, fallback ${manager.fallbackHits}/${manager.fallbackMisses}, budget ${manager.frameBudgetMs}ms${yieldText}, pump ${manager.lastPumpMs.toFixed(1)}ms, freeze ${norgeFreezeMode}${leafletText}${diagText}`;
}

function setNorgeCleanStatus(baseText) {
  const status = document.getElementById('norge-clean-status');
  if (!status) return;
  status.dataset.baseText = baseText;
  status.textContent = `${baseText}\n${norgeCleanLoadLine()}`;
}

function refreshNorgeCleanLoadStatus() {
  const status = document.getElementById('norge-clean-status');
  if (!status || !status.dataset.baseText) {
    norgeCleanLoadLine();
    return;
  }
  status.textContent = `${status.dataset.baseText}\n${norgeCleanLoadLine()}`;
}

function updateNorgeCleanStatusLegacy(transform, tileCount, sources, zoom) {
  const status = document.getElementById('norge-clean-status');
  if (!status) return;
  if (!transform) {
    setNorgeCleanStatus('Clean lab: ingen transform');
    return;
  }
  const worst = norgeCleanLabSamples.reduce((max, sample) => Math.max(max, sample.maxResidual), transform.maxResidual);
  const lockLine = transform.anchorLock
    ? `Anchor lock: ${transform.anchorLock.name} (${transform.anchorLock.lat.toFixed(6)}, ${transform.anchorLock.lon.toFixed(6)})\n`
    : '';
  status.textContent =
    `Clean lab z${zoom}\n` +
    `Tiles: ${tileCount} (${sources.map(source => source.layer).join(' + ')})\n` +
    `North shift: ${(transform.northShiftDeg || 0).toFixed(4)}°\n` +
    `Max residual: ${transform.maxResidual.toFixed(3)} px\n` +
    `RMS residual: ${transform.rmsResidual.toFixed(3)} px\n` +
    `Samples: ${norgeCleanLabSamples.length} · worst ${worst.toFixed(3)} px`;
}

function updateNorgeCleanStatus(transform, tileCount, sources, zoom) {
  const status = document.getElementById('norge-clean-status');
  if (!status) return;
  if (!transform) {
    setNorgeCleanStatus('Clean lab: ingen transform');
    return;
  }
  const worst = norgeCleanLabSamples.reduce((max, sample) => Math.max(max, sample.maxResidual), transform.maxResidual);
  const lockLine = transform.anchorLock
    ? `Anchor lock: ${transform.anchorLock.name} (${transform.anchorLock.lat.toFixed(6)}, ${transform.anchorLock.lon.toFixed(6)})\n`
    : '';
  setNorgeCleanStatus(
    `Clean lab z${zoom}\n` +
    `Tiles: ${tileCount} (${sources.map(source => source.layer).join(' + ')})\n` +
    lockLine +
    `North shift: ${(transform.northShiftDeg || 0).toFixed(4)}°\n` +
    `Max residual: ${transform.maxResidual.toFixed(3)} px\n` +
    `RMS residual: ${transform.rmsResidual.toFixed(3)} px\n` +
    `Samples: ${norgeCleanLabSamples.length} - worst ${worst.toFixed(3)} px`
  );
}

function recordNorgeCleanLabSample(transform, tileCount, sources, zoom) {
  const sample = {
    zoom,
    tileCount,
    layers: sources.map(source => source.layer).join('+'),
    maxResidual: Number(transform.maxResidual.toFixed(3)),
    rmsResidual: Number(transform.rmsResidual.toFixed(3)),
    cameraDist: Number(camState.dist.toFixed(6)),
    targetX: Number(camState.target.x.toFixed(3)),
    targetZ: Number(camState.target.z.toFixed(3)),
    time: Date.now(),
  };
  const last = norgeCleanLabSamples[norgeCleanLabSamples.length - 1];
  const same =
    last &&
    last.zoom === sample.zoom &&
    last.tileCount === sample.tileCount &&
    last.layers === sample.layers &&
    Math.abs(last.cameraDist - sample.cameraDist) < 0.000001 &&
    Math.abs(last.targetX - sample.targetX) < 0.001 &&
    Math.abs(last.targetZ - sample.targetZ) < 0.001;
  if (!same) {
    norgeCleanLabSamples.push(sample);
    if (norgeCleanLabSamples.length > 24) norgeCleanLabSamples.shift();
  }
  window.__norgeCleanLabSamples = norgeCleanLabSamples;
}

function addNorgeCleanDiagnostics(cleanLayer, transform, zoom, originX, originY) {
  const old = cleanLayer.querySelector('.norge-clean-diagnostics');
  if (old) old.remove();
  const diag = document.createElement('div');
  diag.className = 'norge-clean-diagnostics';
  const tileSize = NORGE_SURFACE_DETAIL.tileSize;

  const marker = (point, cls, title, controlPoint, kind) => {
    const el = document.createElement('div');
    el.className = `norge-clean-anchor ${cls}`;
    el.style.left = `${point.x.toFixed(2)}px`;
    el.style.top = `${point.y.toFixed(2)}px`;
    el.title = title;
    if (controlPoint) {
      el.dataset.id = controlPoint.id;
      el.dataset.anchorLayer = kind;
      el.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        reportNorgeAnchorOffset(controlPoint, kind);
      });
    }
    diag.appendChild(el);
  };
  const line = (a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.hypot(dx, dy);
    const el = document.createElement('div');
    el.className = 'norge-clean-residual-line';
    el.style.left = `${a.x.toFixed(2)}px`;
    el.style.top = `${a.y.toFixed(2)}px`;
    el.style.width = `${length.toFixed(2)}px`;
    el.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
    diag.appendChild(el);
  };

  NORGE_SURFACE_CONTROL_POINTS.forEach(point => {
    const srcTile = lonLatToTile(point.mapLon, calibratedNorgeMapLat(point), zoom);
    const srcLocal = {
      x: srcTile.x * tileSize - originX,
      y: srcTile.y * tileSize - originY,
    };
    const cleanScreen = {
      x: transform.a * srcLocal.x + transform.c * srcLocal.y + transform.tx,
      y: transform.b * srcLocal.x + transform.d * srcLocal.y + transform.ty,
    };
    const dstWorld = aeProject(point.geLat, point.geLon);
    const dstScreen = worldToCanvasPoint(dstWorld.x, dstWorld.z);
    marker(dstScreen, 'src norge-anchor-object', `${point.name}\nGoogle Earth\n${point.ge || ''}`, point, 'Google Earth');
    marker(cleanScreen, 'dst norge-anchor-object', `${point.name}\nNorgeskart\n${point.map || ''}`, point, 'Norgeskart');
  });
  cleanLayer.appendChild(diag);
}

function reportNorgeAnchorOffset(point, layerName = 'Underlag') {
  const wrapRect = wrap?.getBoundingClientRect?.();
  const targetWorld = aeProject(point.geLat, point.geLon);
  const targetCanvas = worldToCanvasPoint(targetWorld.x, targetWorld.z);
  const targetScreen = wrapRect ? {
    x: wrapRect.left + targetCanvas.x,
    y: wrapRect.top + targetCanvas.y,
  } : null;
  const surfaceMarker = document.querySelector(`#norge-surface-control-points [data-id="${point.id}"]`);
  const cleanPoint = norgeCleanLastContext && wrapRect
    ? projectNorgeCleanScreenPoint(
        calibratedNorgeMapLat(point),
        point.mapLon,
        norgeCleanLastContext.zoom,
        norgeCleanLastContext.originX,
        norgeCleanLastContext.originY,
        norgeCleanLastContext.transform
      )
    : null;
  const cleanScreenActual = cleanPoint && wrapRect
    ? { x: wrapRect.left + cleanPoint.x, y: wrapRect.top + cleanPoint.y }
    : null;
  const rows = [
    `${point.name}`,
    point.ge || '',
    point.map || '',
    point.info || '',
    `Lag: ${layerName}`,
  ].filter(Boolean);
  const addOffset = (label, screen) => {
    if (!screen || !targetScreen) return;
    const dx = screen.x - targetScreen.x;
    const dy = screen.y - targetScreen.y;
    rows.push(`${label} → GE/AE: dx ${dx.toFixed(2)} px, dy ${dy.toFixed(2)} px, avstand ${Math.hypot(dx, dy).toFixed(2)} px`);
  };
  const surfaceScreenActual = surfaceMarker ? (() => {
    const rect = surfaceMarker.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  })() : null;
  addOffset('Underlag', surfaceScreenActual);
  addOffset('Clean', cleanScreenActual);
  const out = document.getElementById('norge-measure-output');
  if (out) out.textContent = rows.join('\n');
  updateNorgeCalibrationStatus();
}

function projectNorgeCleanScreenPoint(lat, lon, zoom, originX, originY, transform) {
  const tileSize = NORGE_SURFACE_DETAIL.tileSize;
  const srcTile = lonLatToTile(lon, lat, zoom);
  const x = srcTile.x * tileSize - originX;
  const y = srcTile.y * tileSize - originY;
  return {
    x: transform.a * x + transform.c * y + transform.tx,
    y: transform.b * x + transform.d * y + transform.ty,
  };
}

function focusNorgeSurfaceLatLon(lat, lon, label = '') {
  cancelNorgeFreezeWait();
  const target = aeProject(lat, lon);
  camState.target.set(target.x, 0, target.z);
  camState.dist = Math.min(camState.dist, 4);
  applyCamera();
  updateZoomReadout();
  scheduleNorgeDetailTiles();
  renderNorgeSurfaceLayers();
  const out = document.getElementById('norge-measure-output');
  if (out) {
    out.textContent = `${label || 'Punkt'}\nLat: ${lat.toFixed(6)}\nLon: ${lon.toFixed(6)}`;
  }
}

function selectNorgeBaseMap(value) {
  cancelNorgeFreezeWait();
  const input = document.querySelector(`input[name="norge-base"][value="${value}"]`);
  if (!input) return;
  input.checked = true;
  updateNorgeSurfaceRasters();
  scheduleNorgeDetailTiles();
}

function addNorgeCleanMapOverlay(cleanLayer, transform, zoom, originX, originY) {
  cleanLayer.querySelector('.norge-clean-map-overlay')?.remove();
  const svg = svgEl('svg', {
    class: 'norge-clean-map-overlay',
    viewBox: `0 0 ${cw} ${ch}`,
    preserveAspectRatio: 'none',
    'aria-hidden': 'true',
  });

  NORGE_SURFACE_CONTROL_POINTS.forEach(point => {
    const p = projectNorgeCleanScreenPoint(calibratedNorgeMapLat(point), point.mapLon, zoom, originX, originY, transform);
    const marker = svgEl('circle', {
      cx: p.x.toFixed(2),
      cy: p.y.toFixed(2),
      r: 5,
      class: 'clean-control',
      'data-id': point.id,
    });
    marker.appendChild(svgEl('title'));
    marker.querySelector('title').textContent = `${point.name}\n${point.map || ''}`;
    marker.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      reportNorgeAnchorOffset(point, 'Clean');
    });
    svg.appendChild(marker);
  });

  if (document.getElementById('norge-layer-cities')?.checked) {
    norgeSurfaceCities.forEach(city => {
      const p = projectNorgeCleanScreenPoint(city.lat, city.lon, zoom, originX, originY, transform);
      const marker = svgEl('circle', {
        cx: p.x.toFixed(2),
        cy: p.y.toFixed(2),
        r: 6,
        class: 'clean-city',
        'data-name': city.navn,
      });
      marker.appendChild(svgEl('title'));
      marker.querySelector('title').textContent = `${city.navn}\n${city.lat.toFixed(4)} N, ${city.lon.toFixed(4)} E`;
      marker.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        focusNorgeSurfaceLatLon(city.lat, city.lon, city.navn);
      });
      svg.appendChild(marker);
    });
  }

  cleanLayer.appendChild(svg);
}

function refreshNorgeCleanMapOverlay() {
  const cleanLayer = document.getElementById('norge-clean-detail-layer');
  if (!cleanLayer || !norgeCleanLastContext) return;
  addNorgeCleanMapOverlay(
    cleanLayer,
    norgeCleanLastContext.transform,
    norgeCleanLastContext.zoom,
    norgeCleanLastContext.originX,
    norgeCleanLastContext.originY
  );
  syncNorgeCleanControls();
}

function syncNorgeDetailPaneToCamera() {
  if (norgeFrozenDetailLayer) return;
  if (!norgeCleanLastContext) return;
  const panes = [...document.querySelectorAll('.norge-clean-pixelflate')];
  const cleanLayer = document.getElementById('norge-clean-detail-layer');
  if (!panes.length || !cleanLayer) return;
  const { zoom, originX, originY } = norgeCleanLastContext;
  let primary = null;
  let tileCount = 0;
  panes.forEach(pane => {
    const anchorMode = pane.dataset.anchorMode || primaryCleanAnchorMode();
    const transform = cleanNorgeTransform(zoom, originX, originY, anchorMode);
    if (!transform) return;
    pane.style.transform = transform.css;
    pane.dataset.maxResidual = transform.maxResidual.toFixed(3);
    pane.dataset.rmsResidual = transform.rmsResidual.toFixed(3);
    tileCount += pane.querySelectorAll('img').length;
    if (pane.dataset.primary === '1' || !primary) primary = { transform, anchorMode };
  });
  if (!primary) return;
  norgeCleanLastContext = { transform: primary.transform, zoom, originX, originY };
  addNorgeCleanDiagnostics(cleanLayer, primary.transform, zoom, originX, originY);
  addNorgeCleanMapOverlay(cleanLayer, primary.transform, zoom, originX, originY);
  updateNorgeCleanStatus(primary.transform, tileCount, cleanNorgeDetailSources(), zoom);
  syncNorgeCleanControls();
}

function estimateDetailTileScreenSize(bounds, zoom) {
  const centerLat = (bounds.latMin + bounds.latMax) / 2;
  const centerLon = (bounds.lonMin + bounds.lonMax) / 2;
  const tile = lonLatToTile(centerLon, centerLat, zoom);
  const b = tileBounds(Math.floor(tile.x), Math.floor(tile.y), zoom);
  const corners = [
    aeProject(b.north, b.west),
    aeProject(b.north, b.east),
    aeProject(b.south, b.west),
    aeProject(b.south, b.east),
  ].map(p => worldToCanvasPoint(p.x, p.z));
  const width = Math.max(...corners.map(p => p.x)) - Math.min(...corners.map(p => p.x));
  const height = Math.max(...corners.map(p => p.y)) - Math.min(...corners.map(p => p.y));
  return Math.max(width, height);
}

function currentNorgeDetailZoom(bounds) {
  const minTilePx = 54;
  for (let z = NORGE_SURFACE_DETAIL.maxZoom; z >= NORGE_SURFACE_DETAIL.minZoom; z--) {
    if (estimateDetailTileScreenSize(bounds, z) >= minTilePx) return z;
  }
  return NORGE_SURFACE_DETAIL.minZoom;
}

function visibleNorgeSourceBounds() {
  const mapEl = document.getElementById('norge-surface-map');
  if (!mapEl || !wrap) return null;
  const wrapRect = wrap.getBoundingClientRect();

  const samplePoints = [
    [wrapRect.left, wrapRect.top],
    [wrapRect.left + wrapRect.width / 2, wrapRect.top],
    [wrapRect.right, wrapRect.top],
    [wrapRect.left, wrapRect.top + wrapRect.height / 2],
    [wrapRect.left + wrapRect.width / 2, wrapRect.top + wrapRect.height / 2],
    [wrapRect.right, wrapRect.top + wrapRect.height / 2],
    [wrapRect.left, wrapRect.bottom],
    [wrapRect.left + wrapRect.width / 2, wrapRect.bottom],
    [wrapRect.right, wrapRect.bottom],
  ];
  const worldPts = samplePoints
    .map(([x, y]) => screenToMapWorld(x, y))
    .filter(Boolean)
    .map(p => worldPointToLatLon(p.x, p.z));
  if (worldPts.length >= 3) {
    const latMin = Math.max(NORGE_SURFACE_DETAIL.bounds.latMin, Math.min(...worldPts.map(p => p.lat)));
    const latMax = Math.min(NORGE_SURFACE_DETAIL.bounds.latMax, Math.max(...worldPts.map(p => p.lat)));
    const lonMin = Math.max(NORGE_SURFACE_DETAIL.bounds.lonMin, Math.min(...worldPts.map(p => p.lon)));
    const lonMax = Math.min(NORGE_SURFACE_DETAIL.bounds.lonMax, Math.max(...worldPts.map(p => p.lon)));
    if (latMax > latMin && lonMax > lonMin) {
      norgeLastVisibleSourceBounds = { latMin, latMax, lonMin, lonMax };
      norgeCleanDiagnosticsV1.boundsSource = 'camera';
      return norgeLastVisibleSourceBounds;
    }
  }

  const pct = Math.max(100, Math.round(100 / camState.dist * 100));
  if (norgeLastVisibleSourceBounds) {
    norgeCleanDiagnosticsV1.boundsSource = 'last-valid';
    return norgeLastVisibleSourceBounds;
  }
  if (pct >= 1000) {
    norgeCleanDiagnosticsV1.boundsSource = 'camera-miss';
    return null;
  }

  const mapRect = mapEl.getBoundingClientRect();
  const left = Math.max(mapRect.left, wrapRect.left);
  const right = Math.min(mapRect.right, wrapRect.right);
  const top = Math.max(mapRect.top, wrapRect.top);
  const bottom = Math.min(mapRect.bottom, wrapRect.bottom);
  if (right <= left || bottom <= top || !mapRect.width || !mapRect.height) return null;

  const screenToSource = (sx, sy) => {
    const x = (sx - mapRect.left) / mapRect.width * NORGE_SURFACE_META.width;
    const yVisual = (sy - mapRect.top) / mapRect.height * NORGE_SURFACE_META.height;
    return {
      x: Math.max(0, Math.min(NORGE_SURFACE_META.width, x)),
      y: Math.max(0, Math.min(NORGE_SURFACE_META.height, NORGE_SURFACE_META.height - yVisual)),
    };
  };

  const pad = pct >= 1000 ? 0 : 120;
  const pts = [
    screenToSource(left - pad, top - pad),
    screenToSource(right + pad, top - pad),
    screenToSource(left - pad, bottom + pad),
    screenToSource(right + pad, bottom + pad),
  ].map(p => unprojectNorgeSurfacePoint(p.x, p.y));
  const result = {
    latMin: Math.max(NORGE_SURFACE_DETAIL.bounds.latMin, Math.min(...pts.map(p => p.lat))),
    latMax: Math.min(NORGE_SURFACE_DETAIL.bounds.latMax, Math.max(...pts.map(p => p.lat))),
    lonMin: Math.max(NORGE_SURFACE_DETAIL.bounds.lonMin, Math.min(...pts.map(p => p.lon))),
    lonMax: Math.min(NORGE_SURFACE_DETAIL.bounds.lonMax, Math.max(...pts.map(p => p.lon))),
  };
  if (result.latMax > result.latMin && result.lonMax > result.lonMin) {
    norgeCleanDiagnosticsV1.boundsSource = 'dom-fallback';
    norgeLastVisibleSourceBounds = result;
    return result;
  }
  norgeCleanDiagnosticsV1.boundsSource = 'none';
  return null;
}

function fitTileRangeToBudget(tileRange, sourcesLength, centerRange = null) {
  const maxTilesPerSource = Math.max(16, Math.floor(NORGE_SURFACE_DETAIL.maxTiles / Math.max(1, sourcesLength)));
  if (tileRange.count <= maxTilesPerSource) return tileRange;
  const width = tileRange.xMax - tileRange.xMin + 1;
  const height = tileRange.yMax - tileRange.yMin + 1;
  const centerSource = centerRange || tileRange;
  const centerX = Math.round((centerSource.xMin + centerSource.xMax) / 2);
  const centerY = Math.round((centerSource.yMin + centerSource.yMax) / 2);
  const aspect = Math.max(0.25, Math.min(4, width / Math.max(1, height)));
  const fittedWidth = Math.max(1, Math.min(width, Math.floor(Math.sqrt(maxTilesPerSource * aspect))));
  const fittedHeight = Math.max(1, Math.min(height, Math.floor(maxTilesPerSource / fittedWidth)));
  const xMin = Math.max(tileRange.xMin, Math.min(tileRange.xMax - fittedWidth + 1, centerX - Math.floor(fittedWidth / 2)));
  const yMin = Math.max(tileRange.yMin, Math.min(tileRange.yMax - fittedHeight + 1, centerY - Math.floor(fittedHeight / 2)));
  return {
    xMin,
    xMax: Math.min(tileRange.xMax, xMin + fittedWidth - 1),
    yMin,
    yMax: Math.min(tileRange.yMax, yMin + fittedHeight - 1),
    count: fittedWidth * fittedHeight,
    clipped: true,
  };
}

function expandNorgeTileRange(tileRange, zoom) {
  const pad = zoom >= 16 ? 1 : zoom >= 14 ? 2 : zoom >= 11 ? 3 : 8;
  const worldTiles = 2 ** zoom;
  const nwLimit = lonLatToTile(NORGE_SURFACE_DETAIL.bounds.lonMin, NORGE_SURFACE_DETAIL.bounds.latMax, zoom);
  const seLimit = lonLatToTile(NORGE_SURFACE_DETAIL.bounds.lonMax, NORGE_SURFACE_DETAIL.bounds.latMin, zoom);
  const limit = {
    xMin: Math.max(0, Math.floor(Math.min(nwLimit.x, seLimit.x))),
    xMax: Math.min(worldTiles - 1, Math.floor(Math.max(nwLimit.x, seLimit.x))),
    yMin: Math.max(0, Math.floor(Math.min(nwLimit.y, seLimit.y))),
    yMax: Math.min(worldTiles - 1, Math.floor(Math.max(nwLimit.y, seLimit.y))),
  };
  const expanded = {
    xMin: Math.max(limit.xMin, tileRange.xMin - pad),
    xMax: Math.min(limit.xMax, tileRange.xMax + pad),
    yMin: Math.max(limit.yMin, tileRange.yMin - pad),
    yMax: Math.min(limit.yMax, tileRange.yMax + pad),
    overscan: pad,
  };
  expanded.count = (expanded.xMax - expanded.xMin + 1) * (expanded.yMax - expanded.yMin + 1);
  return expanded;
}

function updateNorgeDetailTiles() {
  if (norgeFrozenDetailLayer) return;
  const detailLayer = document.getElementById('norge-screen-detail-layer');
  const cleanLayer = document.getElementById('norge-clean-detail-layer');
  const legacyDetailLayer = document.getElementById('norge-surface-detail-layer');
  if (legacyDetailLayer) legacyDetailLayer.replaceChildren();
  if (!cleanLayer || !norgeSurface) return;
  const bounds = visibleNorgeSourceBounds();
  if (!bounds || bounds.latMax <= bounds.latMin || bounds.lonMax <= bounds.lonMin) {
    Object.assign(norgeCleanDiagnosticsV1, {
      visibleTileCount: 0,
      requestTileCount: 0,
      visibleRange: null,
      expandedRange: null,
      fittedRange: null,
      clipped: false,
    });
    refreshNorgeCleanLoadStatus();
    return;
  }

  const sources = currentNorgeDetailSources();
  if (!sources.length) {
    if (detailLayer) detailLayer.replaceChildren();
    if (cleanLayer) cleanLayer.replaceChildren();
    norgeDetailKey = '';
    norgeCleanDetailKey = '';
    resetNorgeCleanDiagnosticsV1();
    return;
  }
  let zoom = currentNorgeDetailZoom(bounds);
  let tileRange = null;
  const nw = lonLatToTile(bounds.lonMin, bounds.latMax, zoom);
  const se = lonLatToTile(bounds.lonMax, bounds.latMin, zoom);
  const xMin = Math.max(0, Math.floor(Math.min(nw.x, se.x)));
  const xMax = Math.floor(Math.max(nw.x, se.x));
  const yMin = Math.max(0, Math.floor(Math.min(nw.y, se.y)));
  const yMax = Math.floor(Math.max(nw.y, se.y));
  const count = (xMax - xMin + 1) * (yMax - yMin + 1);
  const visibleRange = { xMin, xMax, yMin, yMax, count };
  const expandedRange = expandNorgeTileRange(visibleRange, zoom);
  const baseSourceCount = sources.filter(source => source.role !== 'overlay').length || sources.length;
  tileRange = fitTileRangeToBudget(expandedRange, baseSourceCount, visibleRange);
  tileRange = expandNorgeTileRangeToCoverViewport(tileRange, zoom, baseSourceCount);
  if (!tileRange) return;

  const sourceKey = sources.map(source => `${source.type}:${source.layer}:${source.role}`).join('+');
  const screenKey = `${camState.dist.toExponential(3)}:${camState.target.x.toFixed(3)}:${camState.target.z.toFixed(3)}:${Math.round(cw)}x${Math.round(ch)}`;
  Object.assign(norgeCleanDiagnosticsV1, {
    zoom,
    screenKey,
    sourceCount: sources.length,
    visibleTileCount: countNorgeCleanTilesInRange(visibleRange),
    overscanTileCount: Math.max(0, countNorgeCleanTilesInRange(expandedRange) - countNorgeCleanTilesInRange(visibleRange)),
    requestTileCount: countNorgeCleanTilesInRange(tileRange),
    visibleRange: cloneNorgeCleanTileRange(visibleRange),
    expandedRange: cloneNorgeCleanTileRange(expandedRange),
    fittedRange: cloneNorgeCleanTileRange(tileRange),
    overscan: expandedRange.overscan || 0,
    clipped: !!tileRange.clipped,
    coverageGuard: tileRange.coverageGuard || null,
  });
  const key = `${sourceKey}:z${zoom}:${tileRange.xMin}-${tileRange.xMax}:${tileRange.yMin}-${tileRange.yMax}:${screenKey}`;
  if (key === norgeDetailKey) return;
  norgeDetailKey = key;

  if (detailLayer) {
    detailLayer.replaceChildren();
  }
  updateNorgeCleanDetailTiles({ zoom, tileRange, screenKey });
  const zoomEl = document.getElementById('norge-info-zoom');
  if (zoomEl) zoomEl.textContent = `surface z${zoom}${sources.length > 1 ? ` (${sources.length} lag)` : ''}${tileRange.clipped ? ' center' : ''}`;
}

function updateNorgeCleanDetailTiles({ zoom, tileRange, screenKey }) {
  const cleanLayer = document.getElementById('norge-clean-detail-layer');
  const detailLayer = document.getElementById('norge-screen-detail-layer');
  if (!cleanLayer) return;
  const sources = cleanNorgeDetailSources();
  if (!sources.length) {
    cleanLayer.replaceChildren();
    norgeCleanDetailKey = '';
    Object.assign(norgeCleanDiagnosticsV1, {
      cleanSourceCount: 0,
      paneCount: 0,
      tileJobCount: 0,
      outsideVisibleJobs: 0,
      overscanJobs: 0,
    });
    updateNorgeCleanStatus(null, 0, sources, zoom);
    return;
  }
  const tileSize = NORGE_SURFACE_DETAIL.tileSize;
  const tileBleed = 0.6;
  const originX = tileRange.xMin * tileSize;
  const originY = tileRange.yMin * tileSize;
  const groupedSources = new Map();
  sources.forEach(source => {
    const anchorMode = cleanSourceAnchorMode(source);
    if (!groupedSources.has(anchorMode)) groupedSources.set(anchorMode, []);
    groupedSources.get(anchorMode).push(source);
  });
  const paneConfigs = [...groupedSources.entries()].map(([anchorMode, groupSources]) => ({
    anchorMode,
    sources: groupSources,
    transform: cleanNorgeTransform(zoom, originX, originY, anchorMode),
  })).filter(config => config.transform);
  if (!paneConfigs.length) {
    cleanLayer.replaceChildren();
    norgeCleanDetailKey = '';
    Object.assign(norgeCleanDiagnosticsV1, {
      cleanSourceCount: sources.length,
      paneCount: 0,
      tileJobCount: 0,
      outsideVisibleJobs: 0,
      overscanJobs: 0,
    });
    updateNorgeCleanStatus(null, 0, sources, zoom);
    return;
  }
  const sourceKey = sources.map(source => `${source.type}:${source.layer}:${source.role}`).join('+');
  const transformKey = paneConfigs.map(config => `${config.anchorMode}:${config.transform.css}`).join('|');
  const key = `clean:${sourceKey}:z${zoom}:${tileRange.xMin}-${tileRange.xMax}:${tileRange.yMin}-${tileRange.yMax}:${screenKey}:${transformKey}`;
  if (key === norgeCleanDetailKey) {
    return;
  }
  norgeCleanDetailKey = key;

  cleanLayer.querySelectorAll('.norge-clean-diagnostics, .norge-clean-map-overlay').forEach(element => element.remove());
  resetNorgeCleanTileQueue();
  const centerX = (tileRange.xMin + tileRange.xMax) / 2;
  const centerY = (tileRange.yMin + tileRange.yMax) / 2;
  const primaryMode = primaryCleanAnchorMode();
  const panes = [];
  const paneSize = {
    width: `${(tileRange.xMax - tileRange.xMin + 1) * tileSize}px`,
    height: `${(tileRange.yMax - tileRange.yMin + 1) * tileSize}px`,
  };
  const tileJobs = [];
  let outsideVisibleJobs = 0;
  let overscanJobs = 0;
  const visibleRange = norgeCleanDiagnosticsV1.visibleRange;
  paneConfigs.forEach((config, index) => {
    const pane = document.createElement('div');
    pane.className = 'norge-clean-pixelflate';
    pane.style.width = paneSize.width;
    pane.style.height = paneSize.height;
    pane.style.transform = config.transform.css;
    pane.dataset.zoom = String(zoom);
    pane.dataset.anchorMode = config.anchorMode;
    pane.dataset.primary = config.anchorMode === primaryMode || (!paneConfigs.some(item => item.anchorMode === primaryMode) && index === 0) ? '1' : '0';
    pane.dataset.sourceLayers = config.sources.map(source => source.layer).join('+');
    pane.dataset.maxResidual = config.transform.maxResidual.toFixed(3);
    pane.dataset.rmsResidual = config.transform.rmsResidual.toFixed(3);
    pane.dataset.overscan = String(tileRange.overscan || 0);
    panes.push({ pane, ...config });

    for (const source of config.sources) {
      for (let x = tileRange.xMin; x <= tileRange.xMax; x++) {
        for (let y = tileRange.yMin; y <= tileRange.yMax; y++) {
          const src = cleanDetailTileUrl(source, zoom, x, y);
          if (!src) continue;
          const layerPriority = source.role === 'overlay' ? 1000 : 0;
          const anchorPriority = config.anchorMode === primaryMode ? 0 : 0.05;
          const priority = Math.hypot(x - centerX, y - centerY) + layerPriority + anchorPriority;
          tileJobs.push({ source, x, y, src, priority, pane });
          if (!isNorgeTileInRange(x, y, visibleRange)) {
            outsideVisibleJobs += 1;
            overscanJobs += 1;
          }
        }
      }
    }
  });
  Object.assign(norgeCleanDiagnosticsV1, {
    cleanSourceCount: sources.length,
    paneCount: panes.length,
    tileJobCount: tileJobs.length,
    outsideVisibleJobs,
    overscanJobs,
  });

  tileJobs.sort((a, b) => a.priority - b.priority);
  for (const job of tileJobs) {
        const img = document.createElement('img');
        img.className = `norge-detail-tile${job.source.role === 'overlay' ? ' overlay' : ''}`;
        img.loading = 'eager';
        img.decoding = 'async';
        img.style.left = `${(job.x - tileRange.xMin) * tileSize}px`;
        img.style.top = `${(job.y - tileRange.yMin) * tileSize}px`;
        img.style.width = `${tileSize + tileBleed}px`;
        img.style.height = `${tileSize + tileBleed}px`;
        img.dataset.z = String(zoom);
        img.dataset.layer = job.source.layer;
        img.dataset.role = job.source.role;
        img.dataset.clean = '1';
        img.dataset.anchorMode = job.pane.dataset.anchorMode;
        if (!norgeCleanTileManager.cache.has(job.src)) {
          const fallback = addNorgeCleanParentFallback(img, job.source, zoom, job.x, job.y);
          if (fallback) job.pane.appendChild(fallback);
        }
        queueNorgeCleanTile(img, job.src, job.priority);
        job.pane.appendChild(img);
  }
  norgeCleanTileManager.queue.sort(compareNorgeCleanTileJobs);
  const fragment = document.createDocumentFragment();
  panes.forEach(config => fragment.appendChild(config.pane));
  cleanLayer.replaceChildren(fragment);
  if (detailLayer) detailLayer.replaceChildren();
  processNorgeCleanTileQueue();
  const primaryPane = panes.find(config => config.pane.dataset.primary === '1') || panes[0];
  const primaryTransform = primaryPane.transform;
  const tileCount = panes.reduce((sum, config) => sum + config.pane.querySelectorAll('img').length, 0);
  norgeCleanLastContext = { transform: primaryTransform, zoom, originX, originY };
  addNorgeCleanDiagnostics(cleanLayer, primaryTransform, zoom, originX, originY);
  addNorgeCleanMapOverlay(cleanLayer, primaryTransform, zoom, originX, originY);
  syncNorgeCleanControls();
  recordNorgeCleanLabSample(primaryTransform, tileCount, sources, zoom);
  updateNorgeCleanStatus(primaryTransform, tileCount, sources, zoom);
  console.info('[v7-clean-lab] DOM/CSS pixelflate', {
    zoom,
    tiles: tileCount,
    panes: panes.map(config => ({
      anchorMode: config.anchorMode,
      layers: config.sources.map(source => source.layer),
      tiles: config.pane.querySelectorAll('img').length,
      maxResidualPx: Number(config.transform.maxResidual.toFixed(3)),
      rmsResidualPx: Number(config.transform.rmsResidual.toFixed(3)),
    })),
    maxResidualPx: Number(primaryTransform.maxResidual.toFixed(3)),
    rmsResidualPx: Number(primaryTransform.rmsResidual.toFixed(3)),
    layers: sources.map(source => source.layer),
  });
  checkNorgeFreezeWhenLoaded();
}

function scheduleNorgeDetailTiles() {
  if (norgeFrozenDetailLayer) return;
  clearTimeout(norgeDetailTimer);
  norgeDetailTimer = setTimeout(() => {
    norgeDetailTimer = null;
    updateNorgeDetailTiles();
  }, 120);
}

function norgeSurfacePointerToImage(e) {
  const mapEl = document.getElementById('norge-surface-map');
  if (!mapEl) return null;
  const rect = mapEl.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const x = (e.clientX - rect.left) / rect.width * NORGE_SURFACE_META.width;
  let y = (e.clientY - rect.top) / rect.height * NORGE_SURFACE_META.height;
  if (isNorgeSurfaceVerticallyFlipped()) y = NORGE_SURFACE_META.height - y;
  return { x, y };
}

function svgEl(name, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', name);
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, String(value)));
  return el;
}

function norgeSurfacePath(points) {
  return points.map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(' ');
}

function addNorgeSurfaceGrid(overlay, square = false) {
  const group = svgEl('g', { id: square ? 'norge-surface-square-grid' : 'norge-surface-geo-grid' });
  const color = square ? '#d6d6d6' : '#d4af37';
  const opacity = square ? '0.38' : '0.62';
  const dash = square ? '10 14' : '';
  for (let lat = 56; lat <= 72; lat += 1) {
    const pts = [];
    for (let lon = 4; lon <= 32; lon += 0.5) pts.push(projectNorgeSurfacePoint(lat, lon));
    group.appendChild(svgEl('path', {
      d: norgeSurfacePath(pts),
      class: 'norge-surface-line',
      stroke: color,
      'stroke-width': lat % 5 === 0 ? 2 : 1,
      'stroke-opacity': opacity,
      'stroke-dasharray': dash,
    }));
  }
  for (let lon = 4; lon <= 32; lon += 1) {
    const pts = [];
    for (let lat = 56; lat <= 72; lat += 0.5) pts.push(projectNorgeSurfacePoint(lat, lon));
    group.appendChild(svgEl('path', {
      d: norgeSurfacePath(pts),
      class: 'norge-surface-line',
      stroke: color,
      'stroke-width': lon % 5 === 0 ? 2 : 1,
      'stroke-opacity': opacity,
      'stroke-dasharray': dash,
    }));
  }
  overlay.appendChild(group);
}

function addNorgeSurfaceCities(overlay) {
  const group = svgEl('g', { id: 'norge-surface-cities' });
  norgeSurfaceCities.forEach(city => {
    const p = projectNorgeSurfacePoint(city.lat, city.lon);
    const marker = svgEl('circle', {
      cx: p.x,
      cy: p.y,
      r: 7,
      class: 'norge-surface-marker',
      fill: '#ffd76b',
      'fill-opacity': '0.9',
      stroke: '#111',
      'stroke-width': 2,
    });
    marker.appendChild(svgEl('title'));
    marker.querySelector('title').textContent = `${city.navn}\n${city.lat.toFixed(4)} N, ${city.lon.toFixed(4)} E`;
    marker.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      focusNorgeSurfaceLatLon(city.lat, city.lon, city.navn);
    });
    group.appendChild(marker);
  });
  overlay.appendChild(group);
}

function addNorgeSurfaceControlPoints(overlay) {
  const group = svgEl('g', { id: 'norge-surface-control-points' });
  NORGE_SURFACE_CONTROL_POINTS.forEach(point => {
    const p = projectNorgeSurfacePoint(calibratedNorgeMapLat(point), point.mapLon);
    const marker = svgEl('circle', {
      cx: p.x,
      cy: p.y,
      r: 0.32,
      'data-id': point.id,
      class: 'norge-surface-marker norge-anchor-underlay',
      fill: '#ff50dc',
      'fill-opacity': '0.95',
      stroke: '#050505',
      'stroke-width': 2,
    });
    marker.appendChild(svgEl('title'));
    marker.querySelector('title').textContent = `${point.name}\n${point.map || ''}`;
    marker.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      reportNorgeAnchorOffset(point, 'Underlag');
    });
    group.appendChild(marker);
  });
  overlay.appendChild(group);
}

function addNorgeSurfaceMeasure(overlay) {
  if (!norgeSurfaceMeasurePoints.length) return;
  const group = svgEl('g', { id: 'norge-surface-measure' });
  norgeSurfaceMeasurePoints.forEach(point => {
    const p = projectNorgeSurfacePoint(point.lat, point.lon);
    group.appendChild(svgEl('circle', {
      cx: p.x,
      cy: p.y,
      r: 9,
      fill: '#ff6b6b',
      stroke: '#111',
      'stroke-width': 3,
      class: 'norge-surface-marker',
    }));
  });
  if (norgeSurfaceMeasurePoints.length === 2) {
    group.appendChild(svgEl('path', {
      d: norgeSurfacePath(norgeSurfaceMeasurePoints.map(p => projectNorgeSurfacePoint(p.lat, p.lon))),
      class: 'norge-surface-line',
      stroke: '#ff6b6b',
      'stroke-width': 3,
      'stroke-opacity': '0.95',
    }));
  }
  overlay.appendChild(group);
}

function renderNorgeSurfaceLayers() {
  const overlay = document.getElementById('norge-surface-overlay');
  if (overlay) {
    overlay.replaceChildren();
    addNorgeSurfaceControlPoints(overlay);
    addNorgeSurfaceMeasure(overlay);
  }
  refreshNorgeCleanMapOverlay();
  requestAnimationFrame(updateNorgeCalibrationStatus);
}

function updateNorgeSurfaceRasters() {
  const selectedBase = document.querySelector('input[name="norge-base"]:checked')?.value || 'sjokartraster';
  document.querySelectorAll('.norge-surface-raster').forEach(img => {
    const layer = img.dataset.layer;
    const isBase = layer === selectedBase;
    const isSjokart = layer === 'sjokart' && !!document.getElementById('norge-layer-sjokart')?.checked;
    const isNib = layer === 'nib' && !!document.getElementById('norge-layer-nib')?.checked;
    img.classList.toggle('active', isBase || isSjokart || isNib);
  });
  norgeDetailKey = '';
  scheduleNorgeDetailTiles();
}

function updateNorgeCalibrationStatus() {
  const status = document.getElementById('norge-cal-status');
  const wrapRect = wrap?.getBoundingClientRect?.();
  if (!status || !wrapRect) return;
  if (document.getElementById('norge-screen-detail-layer')) {
    status.textContent =
      `Kalibrering mot polarsirkelpunkter\n` +
      NORGE_SURFACE_CONTROL_POINTS.map(point => `${point.name.split(' / ')[0]}: 0.00 px (AE-låst)`).join('\n') +
      `\nMaks: 0.00 px · Snitt: 0.00 px`;
    return;
  }

  const rows = [];
  let max = 0;
  let sum = 0;
  NORGE_SURFACE_CONTROL_POINTS.forEach(point => {
    const marker = document.querySelector(`#norge-surface-control-points [data-id="${point.id}"]`);
    if (!marker) return;
    const markerRect = marker.getBoundingClientRect();
    const surfaceScreen = {
      x: markerRect.left + markerRect.width / 2,
      y: markerRect.top + markerRect.height / 2,
    };
    const targetWorld = aeProject(point.geLat, point.geLon);
    const targetCanvas = worldToCanvasPoint(targetWorld.x, targetWorld.z);
    const targetScreen = {
      x: wrapRect.left + targetCanvas.x,
      y: wrapRect.top + targetCanvas.y,
    };
    const dx = surfaceScreen.x - targetScreen.x;
    const dy = surfaceScreen.y - targetScreen.y;
    const dist = Math.hypot(dx, dy);
    max = Math.max(max, dist);
    sum += dist;
    rows.push(`${point.name.split(' / ')[0]}: ${dist.toFixed(2)} px`);
  });

  if (!rows.length) {
    status.textContent = 'Kalibrering: kontrollpunkter ikke synlige';
    return;
  }
  status.textContent =
    `Kalibrering mot polarsirkelpunkter\n` +
    rows.join('\n') +
    `\nMaks: ${max.toFixed(2)} px · Snitt: ${(sum / rows.length).toFixed(2)} px`;
}

function updateNorgeSurfaceCityList() {
  const cityList = document.getElementById('norge-city-list');
  if (!cityList) return;
  if (!norgeSurfaceCities.length) {
    cityList.textContent = 'Laster...';
    return;
  }
  cityList.innerHTML = '';
  norgeSurfaceCities.forEach(city => {
    const item = document.createElement('div');
    item.className = 'norge-city-item';
    item.innerHTML = `<b>${city.navn}</b><br><span class="norge-city-coord">${city.lat.toFixed(4)}° N, ${city.lon.toFixed(4)}° E</span>`;
    item.addEventListener('click', () => focusNorgeSurfaceLatLon(city.lat, city.lon, city.navn));
    cityList.appendChild(item);
  });
}

function clearNorgeSurfaceMeasure() {
  norgeSurfaceMeasureMode = false;
  norgeSurfaceMeasurePoints = [];
  const out = document.getElementById('norge-measure-output');
  if (out) out.textContent = 'Klikk «Start måling» og deretter to punkter på kartet';
  renderNorgeSurfaceLayers();
}

function updateNorgeSurfaceMeasureOutput() {
  const out = document.getElementById('norge-measure-output');
  if (!out) return;
  if (norgeSurfaceMeasurePoints.length === 0) {
    out.textContent = 'Klikk PUNKT 1 på kartet';
    return;
  }
  if (norgeSurfaceMeasurePoints.length === 1) {
    out.textContent = 'Klikk PUNKT 2 på kartet';
    return;
  }
  const [p1, p2] = norgeSurfaceMeasurePoints;
  const dx = (p2.lon - p1.lon) * 110.593 * Math.cos(((p1.lat + p2.lat) / 2) * Math.PI / 180);
  const dy = (p2.lat - p1.lat) * 110.593;
  const flatKm = Math.hypot(dx, dy);
  out.textContent =
    `PUNKT 1: ${p1.lat.toFixed(4)}, ${p1.lon.toFixed(4)}\n` +
    `PUNKT 2: ${p2.lat.toFixed(4)}, ${p2.lon.toFixed(4)}\n\n` +
    `Flat GE-skala (110.593 km/°): ${flatKm.toFixed(2)} km`;
}

function bindNorgeSurfaceEngine() {
  const mapEl = document.getElementById('norge-surface-map');
  if (!mapEl || mapEl.dataset.bound === '1') return;
  mapEl.dataset.bound = '1';

  ['norge-layer-geo-grid', 'norge-layer-square-grid', 'norge-layer-cities', 'norge-layer-both-seacharts'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', () => {
      renderNorgeSurfaceLayers();
      scheduleNorgeDetailTiles();
    });
  });
  document.getElementById('norge-clean-visible')?.addEventListener('change', syncNorgeCleanControls);
  document.getElementById('norge-clean-hide-baseline')?.addEventListener('change', syncNorgeCleanControls);
  document.getElementById('norge-leaflet-style-engine')?.addEventListener('change', syncNorgeCleanControls);
  document.querySelectorAll('input[name="norge-base"]').forEach(input => {
    input.addEventListener('change', () => {
      syncNorgeCleanControls();
      if (norgeLeafletStyleEngine.enabled) norgeLeafletStyleEngine.update();
    });
  });
  document.getElementById('norge-layer-se-eiendom')?.addEventListener('change', () => {
    syncNorgeCleanControls();
    if (norgeLeafletStyleEngine.enabled) norgeLeafletStyleEngine.update();
  });
  document.getElementById('norge-clean-opacity')?.addEventListener('input', syncNorgeCleanControls);
  norgeLeafletStyleEngine.init();

  const ICELAND_TONE_DEFAULTS = { brightness: 1.05, contrast: 1.03, saturate: 1.05 };
  const ICELAND_TONE_STORAGE_KEY = 'enok72.icelandTone.v1';
  function readIcelandToneInputs() {
    const b = parseFloat(document.getElementById('norge-iceland-brightness')?.value);
    const c = parseFloat(document.getElementById('norge-iceland-contrast')?.value);
    const s = parseFloat(document.getElementById('norge-iceland-saturate')?.value);
    return {
      brightness: Number.isFinite(b) ? b : ICELAND_TONE_DEFAULTS.brightness,
      contrast: Number.isFinite(c) ? c : ICELAND_TONE_DEFAULTS.contrast,
      saturate: Number.isFinite(s) ? s : ICELAND_TONE_DEFAULTS.saturate,
    };
  }
  function writeIcelandToneStyle(tone) {
    const styleEl = document.getElementById('iceland-tone-overrides');
    if (!styleEl) return;
    styleEl.textContent =
      `.norge-clean-pixelflate[data-anchor-mode="iceland"] {\n` +
      `  --pane-brightness: ${tone.brightness};\n` +
      `  --pane-contrast: ${tone.contrast};\n` +
      `  --pane-saturate: ${tone.saturate};\n` +
      `}\n`;
  }
  function updateIcelandToneValueDisplays(tone) {
    const b = document.getElementById('norge-iceland-brightness-val');
    const c = document.getElementById('norge-iceland-contrast-val');
    const s = document.getElementById('norge-iceland-saturate-val');
    if (b) b.textContent = tone.brightness.toFixed(2);
    if (c) c.textContent = tone.contrast.toFixed(2);
    if (s) s.textContent = tone.saturate.toFixed(2);
  }
  function applyIcelandToneFromInputs() {
    const tone = readIcelandToneInputs();
    writeIcelandToneStyle(tone);
    updateIcelandToneValueDisplays(tone);
    try { localStorage.setItem(ICELAND_TONE_STORAGE_KEY, JSON.stringify(tone)); } catch (_) {}
  }
  function setIcelandToneInputs(tone) {
    const b = document.getElementById('norge-iceland-brightness');
    const c = document.getElementById('norge-iceland-contrast');
    const s = document.getElementById('norge-iceland-saturate');
    if (b) b.value = String(tone.brightness);
    if (c) c.value = String(tone.contrast);
    if (s) s.value = String(tone.saturate);
  }
  function initIcelandToneControls() {
    let stored = null;
    try {
      const raw = localStorage.getItem(ICELAND_TONE_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') stored = parsed;
      }
    } catch (_) {}
    const initial = stored && Number.isFinite(stored.brightness) && Number.isFinite(stored.contrast) && Number.isFinite(stored.saturate)
      ? { brightness: stored.brightness, contrast: stored.contrast, saturate: stored.saturate }
      : { ...ICELAND_TONE_DEFAULTS };
    setIcelandToneInputs(initial);
    writeIcelandToneStyle(initial);
    updateIcelandToneValueDisplays(initial);
  }
  initIcelandToneControls();
  document.getElementById('norge-iceland-brightness')?.addEventListener('input', applyIcelandToneFromInputs);
  document.getElementById('norge-iceland-contrast')?.addEventListener('input', applyIcelandToneFromInputs);
  document.getElementById('norge-iceland-saturate')?.addEventListener('input', applyIcelandToneFromInputs);
  document.getElementById('norge-iceland-tone-reset')?.addEventListener('click', () => {
    setIcelandToneInputs(ICELAND_TONE_DEFAULTS);
    writeIcelandToneStyle(ICELAND_TONE_DEFAULTS);
    updateIcelandToneValueDisplays(ICELAND_TONE_DEFAULTS);
    try { localStorage.removeItem(ICELAND_TONE_STORAGE_KEY); } catch (_) {}
  });

  const paneDiagState = {
    showNorway: true,
    showIceland: true,
    zOrder: 'default',
    parentOpacityOverride: null,
  };
  function writePaneDiagStyle() {
    const styleEl = document.getElementById('pane-layer-diagnostics');
    if (!styleEl) return;
    const rules = [];
    if (!paneDiagState.showNorway) {
      rules.push('.norge-clean-pixelflate[data-anchor-mode="norway"] { display: none; }');
    }
    if (!paneDiagState.showIceland) {
      rules.push('.norge-clean-pixelflate[data-anchor-mode="iceland"] { display: none; }');
    }
    if (paneDiagState.zOrder === 'norway-top') {
      rules.push('.norge-clean-pixelflate[data-anchor-mode="norway"] { z-index: 3; }');
      rules.push('.norge-clean-pixelflate[data-anchor-mode="iceland"] { z-index: 2; }');
    } else if (paneDiagState.zOrder === 'iceland-top') {
      rules.push('.norge-clean-pixelflate[data-anchor-mode="iceland"] { z-index: 3; }');
      rules.push('.norge-clean-pixelflate[data-anchor-mode="norway"] { z-index: 2; }');
    }
    if (paneDiagState.parentOpacityOverride !== null) {
      const v = paneDiagState.parentOpacityOverride;
      rules.push(`#norge-clean-detail-layer { opacity: ${v} !important; }`);
      rules.push(`#norge-screen-detail-layer { opacity: ${v} !important; }`);
    }
    styleEl.textContent = rules.join('\n');
  }
  document.getElementById('norge-diag-show-norway')?.addEventListener('change', (e) => {
    paneDiagState.showNorway = e.target.checked;
    writePaneDiagStyle();
  });
  document.getElementById('norge-diag-show-iceland')?.addEventListener('change', (e) => {
    paneDiagState.showIceland = e.target.checked;
    writePaneDiagStyle();
  });
  document.getElementById('norge-diag-z-norway-top')?.addEventListener('click', () => {
    paneDiagState.zOrder = paneDiagState.zOrder === 'norway-top' ? 'default' : 'norway-top';
    writePaneDiagStyle();
  });
  document.getElementById('norge-diag-z-iceland-top')?.addEventListener('click', () => {
    paneDiagState.zOrder = paneDiagState.zOrder === 'iceland-top' ? 'default' : 'iceland-top';
    writePaneDiagStyle();
  });
  document.getElementById('norge-diag-parent-52')?.addEventListener('click', () => {
    paneDiagState.parentOpacityOverride = paneDiagState.parentOpacityOverride === 0.52 ? null : 0.52;
    writePaneDiagStyle();
  });
  document.getElementById('norge-diag-parent-100')?.addEventListener('click', () => {
    paneDiagState.parentOpacityOverride = paneDiagState.parentOpacityOverride === 1 ? null : 1;
    writePaneDiagStyle();
  });

  document.getElementById('norge-btn-measure')?.addEventListener('click', () => {
    norgeSurfaceMeasureMode = true;
    norgeSurfaceMeasurePoints = [];
    updateNorgeSurfaceMeasureOutput();
    renderNorgeSurfaceLayers();
  });
  document.getElementById('norge-btn-clear')?.addEventListener('click', clearNorgeSurfaceMeasure);
  document.getElementById('norge-focus-grimsey')?.addEventListener('click', () => {
    selectNorgeBaseMap('iceland-sjokart');
    focusNorgeSurfaceLatLon(GRIMSEY_CONTROL_POINT.lat, GRIMSEY_CONTROL_POINT.lon, GRIMSEY_CONTROL_POINT.name);
  });
  document.getElementById('norge-focus-iceland')?.addEventListener('click', () => {
    selectNorgeBaseMap('iceland-sjokart');
    focusNorgeSurfaceLatLon(ICELAND_CONTROL_POINT.lat, ICELAND_CONTROL_POINT.lon, ICELAND_CONTROL_POINT.name);
  });
  document.getElementById('norge-focus-jan-mayen')?.addEventListener('click', () => {
    selectNorgeBaseMap('osm');
    focusNorgeSurfaceLatLon(JAN_MAYEN_CONTROL_POINT.lat, JAN_MAYEN_CONTROL_POINT.lon, JAN_MAYEN_CONTROL_POINT.name);
  });
  document.getElementById('norge-focus-denmark')?.addEventListener('click', () => {
    selectNorgeBaseMap('denmark-havplan');
    focusNorgeSurfaceLatLon(DENMARK_CONTROL_POINT.lat, DENMARK_CONTROL_POINT.lon, DENMARK_CONTROL_POINT.name);
  });
  document.getElementById('norge-focus-greenland')?.addEventListener('click', () => {
    selectNorgeBaseMap('osm');
    focusNorgeSurfaceLatLon(GREENLAND_CONTROL_POINT.lat, GREENLAND_CONTROL_POINT.lon, GREENLAND_CONTROL_POINT.name);
  });
  document.getElementById('norge-focus-sweden')?.addEventListener('click', () => {
    selectNorgeBaseMap('sweden-seachart');
    focusNorgeSurfaceLatLon(SWEDEN_CONTROL_POINT.lat, SWEDEN_CONTROL_POINT.lon, SWEDEN_CONTROL_POINT.name);
  });
  document.getElementById('norge-focus-assembled')?.addEventListener('click', () => {
    selectNorgeBaseMap('assembled-nordic');
    focusNorgeSurfaceLatLon(ASSEMBLED_CONTROL_POINT.lat, ASSEMBLED_CONTROL_POINT.lon, ASSEMBLED_CONTROL_POINT.name);
  });
  document.getElementById('norge-set-height-7')?.addEventListener('click', () => {
    setNorgeFrozenDetailLayer(false);
    selectNorgeBaseMap('assembled-nordic');
    focusNorgeSurfaceLatLon(ASSEMBLED_CONTROL_POINT.lat, ASSEMBLED_CONTROL_POINT.lon, ASSEMBLED_CONTROL_POINT.name);
    setCameraHeightKm(7);
    scheduleNorgeDetailTiles();
  });
  document.getElementById('norge-freeze-layer')?.addEventListener('click', () => {
    setNorgeFrozenDetailLayer(!norgeFrozenDetailLayer);
  });
  document.getElementById('norge-freeze-when-loaded')?.addEventListener('click', () => {
    requestNorgeFreezeWhenLoaded();
  });
  document.getElementById('norge-focus-south')?.addEventListener('click', () => {
    selectNorgeBaseMap('sjokartraster');
    focusNorgeSurfaceLatLon(SOUTH_CONTROL_POINT.lat, SOUTH_CONTROL_POINT.lon, SOUTH_CONTROL_POINT.name);
  });
  updateNorgeFreezeUi();

  mapEl.addEventListener('mousemove', e => {
    const imagePoint = norgeSurfacePointerToImage(e);
    if (!imagePoint) return;
    const p = unprojectNorgeSurfacePoint(imagePoint.x, imagePoint.y);
    const latEl = document.getElementById('norge-info-lat');
    const lonEl = document.getElementById('norge-info-lon');
    if (latEl) latEl.textContent = p.lat.toFixed(4) + '°';
    if (lonEl) lonEl.textContent = p.lon.toFixed(4) + '°';
  });

  mapEl.addEventListener('click', e => {
    if (!norgeSurfaceMeasureMode) return;
    const imagePoint = norgeSurfacePointerToImage(e);
    if (!imagePoint) return;
    const p = unprojectNorgeSurfacePoint(imagePoint.x, imagePoint.y);
    norgeSurfaceMeasurePoints.push(p);
    if (norgeSurfaceMeasurePoints.length >= 2) norgeSurfaceMeasureMode = false;
    updateNorgeSurfaceMeasureOutput();
    renderNorgeSurfaceLayers();
  });
  mapEl.addEventListener('wheel', e => {
    e.preventDefault();
    zoomInstrumentOverlay(e.deltaY, e);
  }, { passive: false });

  let gridDrag = null;
  mapEl.addEventListener('mousedown', e => {
    if (e.button !== 0 || norgeSurfaceMeasureMode) return;
    gridDrag = { x: e.clientX, y: e.clientY };
    mapEl.classList.add('dragging');
    e.preventDefault();
    e.stopPropagation();
  });
  window.addEventListener('mousemove', e => {
    if (!gridDrag) return;
    const dx = e.clientX - gridDrag.x;
    const dy = e.clientY - gridDrag.y;
    gridDrag = { x: e.clientX, y: e.clientY };
    panCameraTarget(dx, dy);
    applyCamera();
    updateZoomReadout();
    e.preventDefault();
  }, true);
  window.addEventListener('mouseup', () => {
    mapEl.classList.remove('dragging');
    gridDrag = null;
  }, true);
}

function initNorgeSurfaceMap() {
  if (norgeSurface) return norgeSurface;

  const mapEl = document.getElementById('norge-surface-map');
  const imageEl = document.getElementById('norge-surface-image');
  const status = document.getElementById('norge-map-status');
  if (!mapEl || !imageEl) {
    if (status) status.textContent = 'Norgeskart-flaten kunne ikke lastes';
    return null;
  }

  imageEl.draggable = false;
  norgeSurface = { element: mapEl, image: imageEl };
  const rule1Toggle = document.getElementById('norge-rule1-surface');
  if (rule1Toggle) {
    rule1Toggle.checked = true;
    rule1Toggle.disabled = true;
    rule1Toggle.title = 'Ny Norgeskart-motor bruker alltid én låst kartflate';
  }
  const mouseGridToggle = document.getElementById('norge-mouse-grid');
  if (mouseGridToggle) {
    mouseGridToggle.checked = true;
    mouseGridToggle.disabled = true;
    mouseGridToggle.title = 'Ny motor: venstre-drag panorerer alltid som Google Earth';
  }
  document.querySelectorAll('input[name="norge-base"], #norge-layer-sjokart, #norge-layer-nib, #norge-layer-se-eiendom, #norge-layer-both-seacharts')
    .forEach(el => {
      el.disabled = false;
      el.title = '';
      el.addEventListener('change', () => {
        updateNorgeSurfaceRasters();
        scheduleNorgeDetailTiles();
      });
    });
  const nibToggle = document.getElementById('norge-layer-nib');
  if (nibToggle) {
    nibToggle.checked = false;
    nibToggle.disabled = false;
    nibToggle.title = 'Norge i bilder WMS krever autorisert tilgang fra denne IP-en. Bygges inn når flyfoto-kilde er tilgjengelig.';
  }
  document.querySelectorAll('#norge-layer-geo-grid, #norge-layer-square-grid, #norge-layer-cities')
    .forEach(el => {
      el.disabled = false;
      el.title = '';
    });
  [
    'norge-layer-geo-grid',
    'norge-layer-square-grid',
    'norge-layer-cities',
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.checked = true;
  });
  const zoomEl = document.getElementById('norge-info-zoom');
  if (zoomEl) zoomEl.textContent = 'surface';
  bindNorgeSurfaceEngine();
  updateNorgeSurfaceRasters();
  fetch('norge-byer.json')
    .then(r => r.json())
    .then(data => {
      norgeSurfaceCities = data.byer || [];
      updateNorgeSurfaceCityList();
      renderNorgeSurfaceLayers();
      norgeCleanDetailKey = '';
      scheduleNorgeDetailTiles();
    })
    .catch(err => {
      const cityList = document.getElementById('norge-city-list');
      if (cityList) cityList.innerHTML = `<span style="color:#f66">Feil ved lasting: ${err}</span>`;
    });
  renderNorgeSurfaceLayers();
  if (status) {
    status.textContent = 'Ny Norgeskart-motor aktiv: låst til AE-grid, Leaflet er ikke startet';
  }
  scheduleNorgeDetailTiles();
  return norgeSurface;
}

function initNorgeLeafletMap() {
  if (norgeLeaflet) return norgeLeaflet;

  const L = window.L;
  const mapEl = document.getElementById('norge-leaflet-map');
  if (!L || !mapEl) {
    const status = document.getElementById('norge-map-status');
    if (status) status.textContent = 'Leaflet/Kartverket kunne ikke lastes';
    return null;
  }

  const KV_BASE = 'https://cache.kartverket.no/v1/wmts/1.0.0';
  const WORLD_BOUNDS = [[-85.05112878, -180], [85.05112878, 180]];
  const kvLayer = (layerName, opts = {}) => L.tileLayer(
    `${KV_BASE}/${layerName}/default/webmercator/{z}/{y}/{x}.png`,
    Object.assign({
      attribution: '© Kartverket CC BY 4.0',
      maxZoom: 20,
      noWrap: true,
      bounds: WORLD_BOUNDS,
      tileSize: 256,
    }, opts)
  );

  const baseLayers = {
    topograatone: kvLayer('topograatone'),
    topo: kvLayer('topo'),
    toporaster: kvLayer('toporaster'),
    osm: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap-bidragsytere',
      maxZoom: 19,
      noWrap: true,
      bounds: WORLD_BOUNDS,
    }),
  };

  const sjokartLayer = kvLayer('sjokartraster', { opacity: 0.85 });
  const nibLayer = L.tileLayer.wms('https://wms.geonorge.no/skwms1/wms.nib', {
    layers: 'ortofoto',
    format: 'image/jpeg',
    transparent: false,
    attribution: '© Norge i bilder / Kartverket',
    opacity: 0.85,
    maxZoom: 20,
    noWrap: true,
    bounds: WORLD_BOUNDS,
  });

  const map = L.map(mapEl, {
    center: LOCKED_NORGE_VIEW.center,
    zoom: LOCKED_NORGE_VIEW.zoom,
    minZoom: 0,
    maxZoom: 19,
    zoomControl: false,
    worldCopyJump: false,
    layers: [baseLayers.topograatone],
  });

  const geoGridLayer = L.layerGroup();
  function buildGeoGrid() {
    geoGridLayer.clearLayers();
    const style = { color: '#d4af37', weight: 0.6, opacity: 0.5, interactive: false };
    const axisStyle = { color: '#ffd76b', weight: 1.2, opacity: 0.85, interactive: false };
    for (let lat = -85; lat <= 85; lat += 5) {
      const pts = [];
      for (let lon = -180; lon <= 180; lon += 2) pts.push([lat, lon]);
      L.polyline(pts, lat === 0 ? axisStyle : style).addTo(geoGridLayer);
    }
    for (let lon = -180; lon <= 180; lon += 5) {
      const pts = [];
      for (let lat = -85; lat <= 85; lat += 2) pts.push([lat, lon]);
      L.polyline(pts, lon === 0 ? axisStyle : style).addTo(geoGridLayer);
    }
  }
  buildGeoGrid();
  geoGridLayer.addTo(map);

  const squareGridLayer = L.layerGroup();
  function buildSquareGrid() {
    squareGridLayer.clearLayers();
    const style = { color: '#888', weight: 0.4, opacity: 0.4, interactive: false, dashArray: '2,4' };
    for (let lat = -85; lat <= 85; lat += 1) {
      const pts = [];
      for (let lon = -180; lon <= 180; lon += 5) pts.push([lat, lon]);
      L.polyline(pts, style).addTo(squareGridLayer);
    }
    for (let lon = -180; lon <= 180; lon += 1) {
      const pts = [];
      for (let lat = -85; lat <= 85; lat += 5) pts.push([lat, lon]);
      L.polyline(pts, style).addTo(squareGridLayer);
    }
  }
  buildSquareGrid();

  const arcticCalibrationLayer = L.layerGroup();
  const arcticCalibrationPoints = [
    {
      name: 'Selsøy gården / Polarsirkelen',
      ge: `GE: 66°33'0.01"N, 12°50'54.28"E`,
      lat: 66.5502,
      lon: 12.8462,
    },
    {
      name: 'Kveitanosen / Enganveien Sørnesøya',
      ge: `GE: 66°33'0.00"N, 12°38'17.89"E`,
      lat: 66.5500,
      lon: 12.8462,
    },
    {
      name: 'Arctic Circle Center',
      ge: `GE: 66°33'0.03"N, 15°19'37.24"E`,
      lat: 66.5500,
      lon: 15.3266,
    },
  ];
  L.polyline(
    arcticCalibrationPoints.map(p => [p.lat, p.lon]),
    { color: '#ffef6e', weight: 2, opacity: 0.9, interactive: false }
  ).addTo(arcticCalibrationLayer);
  arcticCalibrationPoints.forEach(p => {
    L.circleMarker([p.lat, p.lon], {
      radius: 6,
      color: '#111',
      weight: 1,
      fillColor: '#ffef6e',
      fillOpacity: 0.95,
    })
      .bindPopup(`<b>${p.name}</b><br>${p.ge}<br>Norgeskart: ${p.lat.toFixed(4)}° N, ${p.lon.toFixed(4)}° E`)
      .addTo(arcticCalibrationLayer);
  });

  const cityLayer = L.layerGroup();
  const cityMarkers = [];
  const cityList = document.getElementById('norge-city-list');
  function updateNorgeCityMarkerVisibility() {
    const visible = map.getZoom() >= 7;
    cityMarkers.forEach(marker => {
      if (visible) {
        if (!cityLayer.hasLayer(marker)) cityLayer.addLayer(marker);
      } else {
        if (cityLayer.hasLayer(marker)) cityLayer.removeLayer(marker);
      }
    });
  }
  fetch('norge-byer.json')
    .then(r => r.json())
    .then(data => {
      if (cityList) cityList.innerHTML = '';
      data.byer.forEach(by => {
        const marker = L.circleMarker([by.lat, by.lon], {
          radius: 3,
          color: '#d4af37',
          weight: 1,
          fillColor: '#ffd76b',
          fillOpacity: 0.75,
        });
        marker.bindPopup(`<b>${by.navn}</b><br>${by.lat.toFixed(4)}° N, ${by.lon.toFixed(4)}° E<br><i>${by.beskrivelse}</i>`);
        cityMarkers.push(marker);

        if (cityList) {
          const item = document.createElement('div');
          item.className = 'norge-city-item';
          item.innerHTML = `<b>${by.navn}</b><br><span class="norge-city-coord">${by.lat.toFixed(4)}° N, ${by.lon.toFixed(4)}° E</span>`;
          item.addEventListener('click', () => {
            map.setView([by.lat, by.lon], 12);
            marker.openPopup();
          });
          cityList.appendChild(item);
        }
      });
      cityLayer.addTo(map);
      updateNorgeCityMarkerVisibility();
    })
    .catch(err => {
      if (cityList) cityList.innerHTML = `<span style="color:#f66">Feil ved lasting: ${err}</span>`;
    });

  const setLayer = (checkboxId, layer, onChange) => {
    const el = document.getElementById(checkboxId);
    if (!el) return;
    const apply = () => {
      if (onChange) onChange(el.checked);
      else if (el.checked) layer.addTo(map);
      else map.removeLayer(layer);
    };
    el.addEventListener('change', apply);
    apply();
  };

  document.querySelectorAll('input[name="norge-base"]').forEach(radio => {
    radio.addEventListener('change', e => {
      Object.values(baseLayers).forEach(layer => map.removeLayer(layer));
      baseLayers[e.target.value].addTo(map);
      if (document.getElementById('norge-layer-sjokart')?.checked) sjokartLayer.bringToFront();
      if (document.getElementById('norge-layer-nib')?.checked) nibLayer.bringToFront();
    });
  });

  setLayer('norge-layer-sjokart', sjokartLayer);
  setLayer('norge-layer-nib', nibLayer);
  setLayer('norge-layer-geo-grid', geoGridLayer);
  setLayer('norge-layer-square-grid', squareGridLayer);
  setLayer('norge-layer-cities', cityLayer);

  let measureMode = false;
  let measurePoints = [];
  let measureLine = null;
  let measureMarkers = [];
  const measureOut = document.getElementById('norge-measure-output');

  function clearMeasure() {
    measurePoints = [];
    if (measureLine) {
      map.removeLayer(measureLine);
      measureLine = null;
    }
    measureMarkers.forEach(m => map.removeLayer(m));
    measureMarkers = [];
    if (measureOut) measureOut.textContent = 'Klikk «Start måling» og deretter to punkter på kartet';
  }

  function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  }

  function flatKm(lat1, lon1, lat2, lon2) {
    const dLat = (lat2 - lat1) * 110.593;
    const meanLat = (lat1 + lat2) / 2;
    const dLon = (lon2 - lon1) * 110.593 * Math.cos(meanLat * Math.PI / 180);
    return Math.sqrt(dLat * dLat + dLon * dLon);
  }

  document.getElementById('norge-btn-measure')?.addEventListener('click', () => {
    clearMeasure();
    measureMode = true;
    if (measureOut) measureOut.textContent = 'Klikk PUNKT 1 på kartet';
  });
  document.getElementById('norge-btn-clear')?.addEventListener('click', clearMeasure);

  map.on('click', e => {
    if (!measureMode) return;
    measurePoints.push([e.latlng.lat, e.latlng.lng]);
    const marker = L.circleMarker(e.latlng, {
      radius: 5,
      color: '#ff6b6b',
      fillColor: '#ff6b6b',
      fillOpacity: 1,
      weight: 2,
    }).addTo(map);
    measureMarkers.push(marker);

    if (measurePoints.length === 1) {
      if (measureOut) measureOut.textContent = 'Klikk PUNKT 2 på kartet';
      return;
    }

    if (measurePoints.length === 2) {
      measureLine = L.polyline(measurePoints, { color: '#ff6b6b', weight: 2 }).addTo(map);
      const [p1, p2] = measurePoints;
      const kmSphere = haversineKm(p1[0], p1[1], p2[0], p2[1]);
      const kmFlat = flatKm(p1[0], p1[1], p2[0], p2[1]);
      const diff = Math.abs(kmSphere - kmFlat);
      const pct = (diff / kmSphere * 100).toFixed(2);
      if (measureOut) {
        measureOut.textContent =
          `PUNKT 1: ${p1[0].toFixed(4)}, ${p1[1].toFixed(4)}\n` +
          `PUNKT 2: ${p2[0].toFixed(4)}, ${p2[1].toFixed(4)}\n\n` +
          `Sfærisk (Haversine R=6371): ${kmSphere.toFixed(2)} km\n` +
          `Flat (110.593 km/° GE):     ${kmFlat.toFixed(2)} km\n` +
          `Differanse:                  ${diff.toFixed(2)} km (${pct} %)`;
      }
      measureMode = false;
    }
  });

  map.on('mousemove', e => {
    const latEl = document.getElementById('norge-info-lat');
    const lonEl = document.getElementById('norge-info-lon');
    if (latEl) latEl.textContent = e.latlng.lat.toFixed(4) + '°';
    if (lonEl) lonEl.textContent = e.latlng.lng.toFixed(4) + '°';
  });
  map.on('zoomend', () => {
    const zoomEl = document.getElementById('norge-info-zoom');
    if (zoomEl) zoomEl.textContent = map.getZoom();
    updateNorgeCityMarkerVisibility();
  });
  const zoomEl = document.getElementById('norge-info-zoom');
  if (zoomEl) zoomEl.textContent = map.getZoom();
  let gridDrag = null;
  mapEl.addEventListener('mousedown', e => {
    if (e.button !== 0 || !isNorgeMouseGridMode()) return;
    gridDrag = { x: e.clientX, y: e.clientY };
    e.preventDefault();
    e.stopPropagation();
  }, true);
  window.addEventListener('mousemove', e => {
    if (!gridDrag) return;
    const dx = e.clientX - gridDrag.x;
    const dy = e.clientY - gridDrag.y;
    gridDrag = { x: e.clientX, y: e.clientY };
    panCameraTarget(dx, dy);
    applyCamera();
    updateZoomReadout();
    e.preventDefault();
  }, true);
  window.addEventListener('mouseup', () => {
    gridDrag = null;
  }, true);

  norgeLeaflet = { map };
  syncNorgeMouseMode();
  return norgeLeaflet;
}

function applyNorgeInstrumentMode(active) {
  const wrap = document.getElementById('canvas-wrap');
  const controls = document.getElementById('norge-controls');
  const status = document.getElementById('norge-map-status');
  if (wrap) wrap.classList.toggle('norge-active', active);
  if (controls) controls.classList.toggle('open', active);
  renderer.setClearColor(0x050505, active ? 0 : 1);
  if (status) {
    status.textContent = active
      ? 'Ny Norgeskart-motor aktiv i samme instrumentflate'
      : 'Norgeskart ligger klart i instrumentflaten';
  }
  if (active) {
    focusBaseMap('norge');
    initNorgeSurfaceMap();
    applyNorgePlacement();
  }
}

// Layer-togglers
function bindToggle(id, group, prop = 'visible') {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('change', () => { group[prop] = el.checked; });
  group[prop] = el.checked;
}
// v16.36: layer-magnet toggle fjernet (grpMagnet er tom etter at glow ble fjernet).
// v16.50: 'GE grid (lat/long reference)'-toggle styrer nå også 5°-edderkoppnettet (subMap.gridFine)
// og 5°-finringen + GE-tallringen inni kompasset. Tidligere 'layer-grid-fine'-checkbox fjernet.
// v16.53: GE-tallringen er nå EGEN gruppe (subMap.geRing) — også styrt av layer-grid (uavhengig av klokke/kompass).
{
  const el = document.getElementById('layer-grid');
  if (el) {
    const apply = () => {
      subMap.grid.visible = el.checked;
      subMap.gridFine.visible = el.checked;
      subMap.geRing.visible = el.checked;   // v16.53: GE-tallring følger nå GE-grid-toggelen uavhengig
      // Bakoverkompatibel kobling — hvis fineRing-undergruppen finnes på clockSol, koble den også
      const fr = subMap.clockSol.userData ? subMap.clockSol.userData.fineRing : null;
      if (fr) fr.visible = el.checked;
    };
    el.addEventListener('change', apply);
    apply();
  }
}
bindToggle('layer-square-grid', subMap.squareGrid);
bindToggle('layer-meridians', subMap.meridians);
bindToggle('layer-latcircles', subMap.latcircles);
// Layer 1-basiskart: UN AE og Norgeskart er gjensidig eksklusive.
{
  const unEl = document.getElementById('base-map-un');
  const norgeEl = document.getElementById('base-map-norge');
  const apply = () => {
    const showUn = !unEl || unEl.checked;
    const showNorge = !!(norgeEl && norgeEl.checked);
    subMap.coast.visible = showUn;
    subMap.norgeKart.visible = false;
    applyNorgeInstrumentMode(showNorge);
    if (!showNorge) focusBaseMap('un');
  };
  if (unEl || norgeEl) {
    unEl?.addEventListener('change', () => {
      if (unEl.checked && norgeEl) norgeEl.checked = false;
      apply();
    });
    norgeEl?.addEventListener('change', () => {
      if (norgeEl.checked && unEl) unEl.checked = false;
      apply();
    });
    if (unEl?.checked && norgeEl?.checked) unEl.checked = false;
    apply();
  }
}
// v16.49: FN-kart-rotasjon slider (for å finjustere Greenwich-orientering)
{
  const slider = document.getElementById('map-rotation');
  const valEl  = document.getElementById('map-rotation-val');
  if (slider) {
    slider.addEventListener('input', () => {
      const deg = parseFloat(slider.value);
      unMapRotationDeg = deg;
      if (valEl) valEl.textContent = deg.toFixed(1) + '\u00b0';
      if (unMapDiskRef) {
        // CircleGeometry roteres rundt sin egen normal-akse (z før rotation.x).
        // Etter rotation.x = -PI/2 ligger normalen langs +Y, og rotation.z styrer spin i XZ-planet.
        unMapDiskRef.rotation.z = deg * Math.PI / 180;
      }
    });
  }
}
// FN-kart opacity-slider
{
  const slider = document.getElementById('map-opacity');
  const valEl  = document.getElementById('map-opacity-val');
  if (slider) {
    slider.addEventListener('input', () => {
      const v = parseFloat(slider.value) / 100;
      currentMapOpacity = v;
      valEl.textContent = slider.value;
      for (const group of [subMap.coast, subMap.norgeKart]) {
        group.traverse(obj => {
          if (obj.userData && (obj.userData.isUnMap || obj.userData.isNorgeMap) && obj.material) {
            obj.material.opacity = v;
            obj.material.needsUpdate = true;
          }
        });
      }
    });
  }
}
bindToggle('layer-ports', subMap.ports);
bindToggle('layer-outerring', subMap.outerring);

// =================================================================
// SOL-SIKTLINJE PÅ JEVNØDGN
// =================================================================
// På jevnødgn rekker solen samtidig til begge polarsirkler (terminator-linjen tangerer dem).
// Den lengste siktlinjen på flatkartet er Polarsirkel-N (lat=66,57°, lon=0°)
// gjennom Nordpolen til Antarktissirkel-S (lat=-66,57°, lon=180°).
// Lengde = r(66,57°) + r(-66,57°) = 2 × R_AE = ~20 003 km.
{
  const ARCTIC_LAT  =  66.5634;
  const ANTAR_LAT   = -66.5634;
  const R_SPHERE_KM = 6371;

  // Endepunkt 1: Polarsirkel-N på lon=0 (Greenwich)
  const p1 = aeProject(ARCTIC_LAT, 0);
  // Endepunkt 2: Antarktissirkel-S på lon=180 (motsatt side)
  const p2 = aeProject(ANTAR_LAT, 180);

  // Linje
  const lineGeom = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(p1.x, 0.07, p1.z),
    new THREE.Vector3(p2.x, 0.07, p2.z),
  ]);
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xffe06a, transparent: true, opacity: 0.95, linewidth: 2,
  });
  const siktLine = new THREE.Line(lineGeom, lineMat);
  grpMap.add(siktLine);

  // Endepunkt-markerer (små kuler)
  function makeEndpoint(pos, color) {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 16, 16),
      new THREE.MeshBasicMaterial({ color }),
    );
    m.position.set(pos.x, 0.1, pos.z);
    grpMap.add(m);
    return m;
  }
  const e1 = makeEndpoint(p1, 0xff5a5a);  // rød — nord
  const e2 = makeEndpoint(p2, 0x6abfff);  // blå — sør
  const eNP = makeEndpoint({x:0, z:0}, 0xa060ff);  // lilla — Nordpol
  // v16.35: skjult som default etter Jone-Aase 2026-05-28 (siktlinje-show checkbox styrer visning)
  siktLine.visible = false;
  e1.visible = false;
  e2.visible = false;
  eNP.visible = false;

  // Beregn tall
  // v16 buestreng-uretting: r(lat) = R_OUTER_KM × (90-lat) / 180
  const rArcticKm  = R_OUTER_KM * (90 - ARCTIC_LAT) / 180;
  const rAntarKm   = R_OUTER_KM * (90 - ANTAR_LAT) / 180;
  const flatLineKm = rArcticKm + rAntarKm;

  // Kule-modell: punkter ved (lat=66,57°, lon=0) og (lat=-66,57°, lon=180)
  // = motsatte punkter på motsatte sider av kulen (lat-symmetrisk om ekvator, lon-motsatt)
  // Vinkelavstand mellom dem: cos(d) = sin(66,57)·sin(-66,57) + cos(66,57)·cos(-66,57)·cos(180)
  //   = -sin²(66,57) - cos²(66,57) = -1 → d = 180° (antipoder!)
  const a1lat = ARCTIC_LAT * Math.PI / 180;
  const a2lat = ANTAR_LAT * Math.PI / 180;
  const dlon = Math.PI;  // 180° i radianer
  const cosD = Math.sin(a1lat)*Math.sin(a2lat) + Math.cos(a1lat)*Math.cos(a2lat)*Math.cos(dlon);
  const angDist = Math.acos(Math.max(-1, Math.min(1, cosD)));
  const sphereChord = 2 * R_SPHERE_KM * Math.sin(angDist / 2);  // rett linje gjennom jorden
  const sphereArc   = R_SPHERE_KM * angDist;                     // langs overflate

  // Oppdater panel
  function fmtKm(v) { return Math.round(v).toLocaleString('en-US') + ' km'; }
  const elArctic = document.getElementById('sl-r-arctic');
  const elAntar  = document.getElementById('sl-r-antarctic');
  const elFlat   = document.getElementById('sl-flat');
  const elChord  = document.getElementById('sl-sphere-chord');
  const elArc    = document.getElementById('sl-sphere-arc');
  const elDiff   = document.getElementById('sl-diff');
  if (elArctic) elArctic.textContent = fmtKm(rArcticKm);
  if (elAntar)  elAntar.textContent  = fmtKm(rAntarKm);
  if (elFlat)   elFlat.textContent   = fmtKm(flatLineKm);
  if (elChord)  elChord.textContent  = fmtKm(sphereChord);
  if (elArc)    elArc.textContent    = fmtKm(sphereArc);
  if (elDiff)   elDiff.textContent   = '+' + fmtKm(flatLineKm - sphereChord).replace(' km','') + ' km';

  // Toggle visning
  const toggleEl = document.getElementById('siktlinje-show');
  if (toggleEl) {
    toggleEl.addEventListener('change', () => {
      siktLine.visible = toggleEl.checked;
      e1.visible = toggleEl.checked;
      e2.visible = toggleEl.checked;
      eNP.visible = toggleEl.checked;
    });
  }
}

// =================================================================
// BREDDEGRAD-OMKRETS-SAMMENLIGNING (slider + bevegelig ring)
// =================================================================
// En lysende ring på Lag 1 som flytter seg etter slider.
// Sammenligner flat AE-omkrets vs. kule-omkrets ved samme breddegrad.
{
  const R_SPHERE_KM = 6371;  // standard kule-radius
  // Bygg ringen én gang, oppdater radius via scale eller geometry-rebuild
  let compareRing = null;
  // v16.39: compareRing skjult som default - vises bare nar brukeren aktiverer 'Show compare ring'
  let compareRingEnabled = false;
  function makeCompareRing(radius) {
    if (compareRing) {
      grpMap.remove(compareRing);
      compareRing.geometry.dispose();
    }
    const geom = new THREE.RingGeometry(radius - 0.04, radius + 0.04, 256);
    const mat  = new THREE.MeshBasicMaterial({
      color: 0xffe06a, transparent: true, opacity: 0.92, side: THREE.DoubleSide,
      depthWrite: false,
    });
    compareRing = new THREE.Mesh(geom, mat);
    compareRing.rotation.x = -Math.PI / 2;
    compareRing.position.y = 0.06;  // over kartet og rutenettet
    compareRing.visible = compareRingEnabled;  // v16.39: respekter toggle
    grpMap.add(compareRing);
  }
  // Initial ring på ekvator (men skjult inntil brukeren skrur den pa)
  makeCompareRing(latToR(0));  // v16.38: buestreng-radius, ikke kule-radius

  const slider = document.getElementById('lat-slider');
  const elVal     = document.getElementById('lat-slider-val');
  const elRadius  = document.getElementById('lc-radius');
  const elFlat    = document.getElementById('lc-flat');
  const elSphere  = document.getElementById('lc-sphere');
  const elDiff    = document.getElementById('lc-diff');
  const elFactor  = document.getElementById('lc-factor');
  const elZone    = document.getElementById('lc-zone');

  function fmtKm(v) { return Math.round(v).toLocaleString('en-US') + ' km'; }
  function fmtSignedKm(v) {
    const s = v >= 0 ? '+' : '−';
    return s + Math.abs(Math.round(v)).toLocaleString('en-US') + ' km';
  }

  function updateCompare(lat) {
    // Flat AE-modell
    // v16 buestreng-uretting: r(lat) = R_OUTER_KM × (90-lat) / 180
    const rKmAE = R_OUTER_KM * (90 - lat) / 180;     // km fra Nordpolen i buestreng-skala
    const flatCirc = 2 * Math.PI * rKmAE;
    // Kule-modell
    const sphereCirc = 2 * Math.PI * R_SPHERE_KM * Math.cos(lat * Math.PI / 180);
    const diff = flatCirc - sphereCirc;
    const factor = sphereCirc > 1 ? (flatCirc / sphereCirc) : 0;

    // Oppdater tall i panel
    elVal.textContent = lat.toFixed(1) + '°';
    elRadius.textContent = fmtKm(rKmAE);
    elFlat.textContent = fmtKm(flatCirc);
    elSphere.textContent = fmtKm(sphereCirc);
    elDiff.textContent = fmtSignedKm(diff);
    elFactor.textContent = factor > 0 ? factor.toFixed(2) + '×' : '—';

    // Sone-tekst og fargekoding
    let zone, color;
    if (lat > 66.5) {
      zone = 'Arktis (nord for polarsirkelen). På kulen: liten kalott rundt Nordpolen.';
      color = 0x6abfff;
    } else if (lat > 23.5) {
      zone = 'Tempererte nordsone. Flat- og kule-omkrets vokser fra hverandre.';
      color = 0x6affc0;
    } else if (lat > -23.5) {
      zone = 'Tropisk sone (mellom vendekretsene). Flat-omkrets gror raskere sørover.';
      color = 0xffe06a;
    } else if (lat > -66.5) {
      zone = 'Tempererte sørsone. Flat-omkrets er nå betydelig større enn kule-omkrets.';
      color = 0xff9060;
    } else {
      zone = 'Antarktis-sone. På kulen: kalott rundt Sørpolen. Flat-omkrets er gigantisk.';
      color = 0xff5a5a;
    }
    elZone.textContent = 'Sone: ' + zone;

    // Oppdater ring i scenen
    const sceneR = rKmAE * SCALE;  // til scene-enheter
    if (sceneR > 0.01) {
      makeCompareRing(sceneR);
      compareRing.material.color.setHex(color);
    }
  }

  if (slider) {
    slider.addEventListener('input', () => {
      updateCompare(parseFloat(slider.value));
    });
    updateCompare(parseFloat(slider.value));
  }

  // v16.39: Toggle for compareRing
  const compareToggle = document.getElementById('lc-show-ring');
  if (compareToggle) {
    compareToggle.addEventListener('change', () => {
      compareRingEnabled = compareToggle.checked;
      if (compareRing) compareRing.visible = compareRingEnabled;
    });
  }
}

// =================================================================
// ZENITH-TEST: SOL-SIKTLINJE PÅ FAKTISKE DATOER
// =================================================================
// Tre testbare par: solen i zenith over zenith-punktet kl 12 lokal,
// midnattssol fra observasjonspunktet kl 00 lokal. Den rette linjen er
// solens faktiske siktlinje gjennom flat-geometri.
{
  // v16.34: zt1 (Aswan->Fort Yukon, gul) og zt2 (Catequilla->Antipode, bla) fjernet.
  // v16.35: zt3 (Capricorn-antipode->Grimsey, oransje) ogsa fjernet etter Jone-Aase 2026-05-28
  // fordi Capricorn-antipode-endepunktet ikke er et objekt. Beholder tom test-liste sa
  // panel-id-er fortsatt fungerer (de tomme dom-elementene blir bare ikke oppdatert).
  const tests = [];

  const zenithObjs = [];

  tests.forEach(t => {
    const pA = aeProject(t.latA, t.lonA);
    const pB = aeProject(t.latB, t.lonB);

    // Linje på kartet (litt over Lag 1)
    const lineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(pA.x, 0.08, pA.z),
      new THREE.Vector3(pB.x, 0.08, pB.z),
    ]);
    const lineMat = new THREE.LineBasicMaterial({
      color: t.color, transparent: true, opacity: 0.95, linewidth: 2,
    });
    const line = new THREE.Line(lineGeom, lineMat);
    grpMap.add(line);

    // Endepunkt-markerer (kuler)
    function makePin(pos, color) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 16, 16),
        new THREE.MeshBasicMaterial({ color }),
      );
      m.position.set(pos.x, 0.12, pos.z);
      grpMap.add(m);
      return m;
    }
    const mA = makePin(pA, t.color);
    const mB = makePin(pB, t.color);

    // Beregn tall
    const distKm = Math.hypot(pA.x - pB.x, pA.z - pB.z) * 1000;  // scene -> km
    let lonDiff = Math.abs(t.lonA - t.lonB);
    if (lonDiff > 180) lonDiff = 360 - lonDiff;
    // Avstand fra origo (AE-NP) til linjen
    const ax = pA.x, az = pA.z, bx = pB.x, bz = pB.z;
    const lineLen = Math.hypot(bx - ax, bz - az);
    const npMissScene = lineLen > 0.001
      ? Math.abs(ax * bz - bx * az) / lineLen
      : 0;
    const npMissKm = npMissScene * 1000;

    // Oppdater panel
    function fmtKm(v) { return Math.round(v).toLocaleString('no-NO') + ' km'; }
    const elFlat = document.getElementById(t.id + '-flat');
    const elNp   = document.getElementById(t.id + '-npmiss');
    const elLon  = document.getElementById(t.id + '-londiff');
    if (elFlat) elFlat.textContent = fmtKm(distKm);
    if (elNp)   elNp.textContent   = fmtKm(npMissKm);
    if (elLon)  elLon.textContent  = lonDiff.toFixed(2) + '°';

    zenithObjs.push(line, mA, mB);
  });

  // Toggle visning
  const toggleEl = document.getElementById('zenith-show');
  if (toggleEl) {
    toggleEl.addEventListener('change', () => {
      zenithObjs.forEach(o => { o.visible = toggleEl.checked; });
    });
  }
}

bindToggle('layer-equator', subMap.equator);
bindToggle('layer-cancer', subMap.cancer);
bindToggle('layer-capricorn', subMap.capricorn);
bindToggle('layer-polarcircles', subMap.polarcircles);
bindToggle('layer-sun', subCel.sun);
bindToggle('layer-moon', subCel.moon);
bindToggle('layer-enoch-gates', subCel.ports);

bindToggle('layer-polaris', subFirma.polaris);
bindToggle('layer-stars', subFirma.stars);

// Grid size — oppdaterer både AE-rutenett (konsentriske ringer) og firkantet referanse-rutenett
document.getElementById('grid-size').addEventListener('change', (e) => {
  const step = parseFloat(e.target.value);
  rebuildGrid(step);
  rebuildSquareGrid(step);
});

// Sun-lat slider
document.getElementById('sun-lat').addEventListener('input', (e) => {
  sunLat = parseFloat(e.target.value);
  document.getElementById('sun-lat-val').textContent = sunLat.toFixed(1) + '°';
  updateSun();
});

// Sol-presets
document.getElementById('preset-equinox').addEventListener('click', () => {
  sunLat = 0; document.getElementById('sun-lat').value = 0;
  document.getElementById('sun-lat-val').textContent = '0.0°'; updateSun();
});
document.getElementById('preset-cancer').addEventListener('click', () => {
  sunLat = 23.7; document.getElementById('sun-lat').value = 23.7;
  document.getElementById('sun-lat-val').textContent = '23.7°'; updateSun();
});
document.getElementById('preset-capricorn').addEventListener('click', () => {
  sunLat = -23.7; document.getElementById('sun-lat').value = -23.7;
  document.getElementById('sun-lat-val').textContent = '-23.7°'; updateSun();
});

// Kalender
document.getElementById('cal-day').addEventListener('input', (e) => {
  if (!calendarData) return;
  const month = document.getElementById('cal-month').value;
  const dayInMonth = parseInt(e.target.value);
  // Finn dag-indeks
  const idx = calendarData.days.findIndex(d => d.enoch_month === month && d.enoch_day_in_month === dayInMonth);
  if (idx >= 0) setDay(idx);
});
document.getElementById('cal-month').addEventListener('change', () => {
  const month = document.getElementById('cal-month').value;
  const idx = calendarData.days.findIndex(d => d.enoch_month === month);
  if (idx >= 0) setDay(idx);
});
document.getElementById('cal-prev').addEventListener('click', () => setDay(currentDayIdx - 1));
document.getElementById('cal-next').addEventListener('click', () => setDay(currentDayIdx + 1));
document.getElementById('cal-today').addEventListener('click', () => setDay(0));

// Play
let isPlaying = false;
let lastFrameTime = 0;
let dayAccumulator = 0;  // v16: akkumulerer brokdeler av dager mellom frames
// Logaritmisk speed-skala (v16.8):
//   Slider 0–1000 mappes til speed = SPEED_MIN × (SPEED_MAX/SPEED_MIN)^(slider/1000)
//   SPEED_MIN = 1/86400 d/s (atomur-takt, én runde = 24 timer)
//   SPEED_MAX = 5 d/s (5 runder per sek)
// Default slider=700 → ca 0.10 d/s (én runde per 10 sek)
const SPEED_MIN = 1 / 86400;  // d/s — atomur (SI-sekund)
const SPEED_MAX = 5.0;        // d/s
function sliderToSpeed(v) {
  const t = v / 1000;
  return SPEED_MIN * Math.pow(SPEED_MAX / SPEED_MIN, t);
}
function formatSpeedReadout(s) {
  const secPerRev = 1 / s;
  let timeStr;
  if (secPerRev >= 3600) {
    timeStr = (secPerRev / 3600).toFixed(1) + ' t/runde';
  } else if (secPerRev >= 60) {
    timeStr = (secPerRev / 60).toFixed(1) + ' min/runde';
  } else {
    timeStr = secPerRev.toFixed(1) + ' s/runde';
  }
  const dStr = s < 0.001 ? s.toExponential(2) : s.toFixed(s < 0.1 ? 4 : 2);
  return dStr + ' d/s · ' + timeStr;
}
let speed = sliderToSpeed(940); // v16.28: default ~2 d/s slik at årsbanen mellom vendekretsene er synlig fra start. Bruker kan trykke 'Sann tid' for atomur-takt.
document.getElementById('btn-play').addEventListener('click', (e) => {
  isPlaying = !isPlaying;
  e.target.textContent = isPlaying ? '⏸ Pause' : '▶ Play';
  // Slå automatisk på dag/natt-sone når animasjonen starter — viser solens vandring fullt ut
  if (isPlaying) {
    subMap.daynight.visible = true;
    const btnDN = document.getElementById('btn-daynight');
    if (btnDN) {
      btnDN.style.background = '#806020';
      btnDN.style.color = '#fff';
    }
    updateDayNight();
  }
});
document.getElementById('speed-slider').addEventListener('input', (e) => {
  speed = sliderToSpeed(parseInt(e.target.value));
  document.getElementById('speed-val').textContent = formatSpeedReadout(speed);
});
// Sann tid-knapp: 1 runde = 86 400 sek (atomur-takt)
{
  const btnRT = document.getElementById('btn-realtime');
  if (btnRT) {
    btnRT.addEventListener('click', () => {
      speed = SPEED_MIN;
      document.getElementById('speed-slider').value = 0;
      document.getElementById('speed-val').textContent = formatSpeedReadout(speed);
    });
  }
}

// Søk
const searchBox = document.getElementById('searchbox');
const searchResults = document.getElementById('search-results');
searchBox.addEventListener('input', () => {
  const q = searchBox.value.trim().toLowerCase();
  searchResults.innerHTML = '';
  if (!q) return;
  const hits = MARKERS.filter(m => m.n.toLowerCase().includes(q) || (m.info || '').toLowerCase().includes(q)).slice(0, 12);
  for (const h of hits) {
    const el = document.createElement('div');
    el.className = 'search-hit';
    el.innerHTML = `<div class="hit-name">${h.n}</div><div class="hit-meta">${h.g} · ${h.lat.toFixed(2)}, ${h.lon.toFixed(2)}</div>`;
    el.addEventListener('click', () => selectMarker(h));
    searchResults.appendChild(el);
  }
});

// Marker-info — oppdaterer både høyre panel OG åpner modal
function selectMarker(m, opts = {}) {
  const { openModal = true } = opts;
  // 1. Oppdater høyre panel (backup)
  const info = document.getElementById('marker-info');
  if (info) {
    info.innerHTML = `
      <div style="color:#c9a247;font-size:13px;font-weight:600;margin-bottom:6px">${m.n}</div>
      <div style="color:#888;font-size:10px;margin-bottom:6px">${m.g} · ${m.type || ''}</div>
      <div style="margin-bottom:4px"><span style="color:#888">Lat</span> <span style="color:#cde">${m.lat.toFixed(5)}°</span></div>
      <div style="margin-bottom:4px"><span style="color:#888">Lon</span> <span style="color:#cde">${m.lon.toFixed(5)}°</span></div>
      <div style="margin-bottom:4px"><span style="color:#888">AE radius</span> <span style="color:#cde">${Math.round(latToR(m.lat) * 1000).toLocaleString('en-US')} km</span></div>
      <div style="margin-top:6px;color:#aaa;font-size:10px;line-height:1.4">${m.info || ''}</div>
      ${m.src ? `<a href="${m.src}" target="_blank" style="color:#c9a247;font-size:10px">Source ↗</a>` : ''}
    `;
  }
  // 2. Fokuser kameraet på markøren
  const p = aeProject(m.lat, m.lon);
  camState.target.set(p.x, 0, p.z);
  applyCamera();
  // 3. Åpne modal
  if (openModal) openMarkerModal(m);
}

// Modal-håndtering
function openMarkerModal(m) {
  document.getElementById('mm-name').textContent = m.n;
  document.getElementById('mm-group').textContent = `${m.g} · ${m.type || ''}`;
  document.getElementById('mm-id').textContent = m.id;
  document.getElementById('mm-type').textContent = m.type || '—';
  document.getElementById('mm-lat').textContent = m.lat.toFixed(5) + '°';
  document.getElementById('mm-lon').textContent = m.lon.toFixed(5) + '°';
  document.getElementById('mm-aer').textContent = Math.round(latToR(m.lat) * 1000).toLocaleString('en-US');
  document.getElementById('mm-info').textContent = m.info || '(ingen tilleggsinfo)';
  // GE Web: https://earth.google.com/web/@lat,lon,0a,5000d
  document.getElementById('mm-ge-web').href = `https://earth.google.com/web/@${m.lat},${m.lon},0a,5000d,35y,0h,0t,0r`;
  document.getElementById('mm-gmaps').href = `https://www.google.com/maps/@${m.lat},${m.lon},15z`;
  const srcBtn = document.getElementById('mm-src');
  if (m.src) { srcBtn.href = m.src; srcBtn.style.display = ''; }
  else { srcBtn.style.display = 'none'; }
  document.getElementById('marker-modal-backdrop').classList.add('open');
}

function closeMarkerModal() {
  document.getElementById('marker-modal-backdrop').classList.remove('open');
}
document.getElementById('mm-close').addEventListener('click', closeMarkerModal);
document.getElementById('marker-modal-backdrop').addEventListener('click', (e) => {
  if (e.target.id === 'marker-modal-backdrop') closeMarkerModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMarkerModal();
});

// Marker-filter
function applyFilters() {
  for (const mesh of markerMeshes) {
    const m = mesh.userData;
    const filterId = FILTER_KEY[m.g];
    const filterEl = document.getElementById(filterId);
    const visible = !filterEl || filterEl.checked;
    // Hele pinGroup er parent (med mesh + stalk)
    if (mesh.parent) mesh.parent.visible = visible;
  }
  // v16.71: Dedikert toggle for 70°W ↔ 110°E aksen (Carvajal-Casey verifikasjonsakse).
  // Var tidligere koblet til Meridian-70W ELLER Meridian-110E (v16.60) - nå frittstående.
  const axis70wEl = document.getElementById('layer-axis-70w-110e');
  if (subMap.axis70w110e) subMap.axis70w110e.visible = !axis70wEl || axis70wEl.checked;
  // v16.61: Master-toggle for de 5 nye antipodal-aksene.
  const antipodalEl = document.getElementById('layer-antipodal-axes');
  if (subMap.antipodalAxes) subMap.antipodalAxes.visible = !antipodalEl || antipodalEl.checked;
}
['filt-equator', 'filt-cancer', 'filt-capricorn', 'filt-arctic', 'filt-port', 'filt-megalithic', 'filt-vendekretsmon', 'filt-havn-sor', 'filt-mer-110e', 'filt-mer-150e', 'filt-mer-149w', 'filt-mer-70w', 'layer-antipodal-axes', 'layer-axis-70w-110e', 'layer-antarctica-bases', 'layer-norge-test'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', applyFilters);
});
// v16.60: Kør applyFilters() ved oppstart slik at akselinjen 70W ↔ 110E vises som default.
applyFilters();

// Panel-toggling (venstre/høyre)
const mainEl = document.getElementById('main');
const vmLeft  = document.getElementById('vm-show-left');
const vmRight = document.getElementById('vm-show-right');
function applyPanelVisibility() {
  mainEl.classList.toggle('hide-left',  !vmLeft.checked);
  mainEl.classList.toggle('hide-right', !vmRight.checked);
  setTimeout(onResize, 280);
}
document.getElementById('toggle-left').addEventListener('click', () => {
  vmLeft.checked = !vmLeft.checked;
  applyPanelVisibility();
});
document.getElementById('toggle-right').addEventListener('click', () => {
  vmRight.checked = !vmRight.checked;
  applyPanelVisibility();
});
vmLeft.addEventListener('change', applyPanelVisibility);
vmRight.addEventListener('change', applyPanelVisibility);

// View-meny: toggle dropdown
const viewMenuBtn = document.getElementById('view-menu-btn');
const viewMenu    = document.getElementById('view-menu');
viewMenuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  viewMenu.classList.toggle('open');
  viewMenuBtn.classList.toggle('active', viewMenu.classList.contains('open'));
});
document.addEventListener('click', (e) => {
  if (!viewMenu.contains(e.target) && e.target !== viewMenuBtn) {
    viewMenu.classList.remove('open');
    viewMenuBtn.classList.remove('active');
  }
});

// Modus
document.querySelectorAll('[data-mode]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-mode]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMode = btn.dataset.mode;
    document.getElementById('sb-mode').textContent = currentMode === 'enoch' ? 'Enoch · AE' : 'GE · sphere';
  });
});

// Raycaster — klikk på markør
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
canvas.addEventListener('click', (e) => {
  if (Math.abs(e.clientX - lastX) > 4 || Math.abs(e.clientY - lastY) > 4) return; // var en drag
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(markerMeshes, false);
  if (intersects.length > 0) {
    selectMarker(intersects[0].object.userData);
  }
});

// =================================================================
// RESIZE
// =================================================================
function onResize() {
  cw = wrap.clientWidth; ch = wrap.clientHeight;
  camera.aspect = cw / ch;
  camera.updateProjectionMatrix();
  renderer.setSize(cw, ch, false);
  if (norgeSurface || norgeLeaflet) applyNorgePlacement();
  if (norgeSurface) scheduleNorgeDetailTiles();
}
window.addEventListener('resize', onResize);

// =================================================================
// ANIMATION LOOP
// =================================================================
// ENOKS FYSIKK: én dag = én rotasjon. 364 rotasjoner = 364 dager = ett år.
// sunLonAngle drives DIREKTE av kalenderposisjonen (currentDayIdx + brøkdel),
// så når kalenderen rykker fram én dag har solen gått nøyaktig 360°.
// Speed-slideren styrer dermed BÅDE rotasjonen og kalender-fremdriften samtidig,
// fordi de er samme fysiske bevegelse i Enoks modell.
function loop(t) {
  requestAnimationFrame(loop);

  // auto-spill kalender — akkumuler delta-dager (driver både dag og år)
  if (isPlaying) {
    if (lastFrameTime === 0) lastFrameTime = t;
    const dt = (t - lastFrameTime) / 1000;
    dayAccumulator += speed * dt;
    lastFrameTime = t;
    if (dayAccumulator >= 1) {
      const wholeDays = Math.floor(dayAccumulator);
      dayAccumulator -= wholeDays;
      setDay(currentDayIdx + wholeDays);
    }
  } else {
    lastFrameTime = 0;
    // dayAccumulator beholdes — brøkdel av dag (rotasjons-fase) skal ikke nullstilles
  }

  // Dag-rotasjon = kalender-fase. (currentDayIdx + dayAccumulator) × 360°
  // Hver hel dag = én full runde. Pause fryser begge samtidig.
  sunLonAngle = ((currentDayIdx + dayAccumulator) * 360) % 360;

  // v16.20: KONTINUERLIG årsbane når Play er aktiv. sunLat interpoleres jevnt
  // mellom dager fra Enok-kalenderen, slik at lat-en gradvis veksler 0 → +23.7 → 0 → –23.7→ 0
  // over hele året. Når Play er pauset (isPlaying=false) respekteres bruker-slideren.
  if (isPlaying && calendarData && calendarData.days) {
    const idxNow = currentDayIdx;
    const idxNext = (currentDayIdx + 1) % 364;
    const doyNow = calendarData.days[idxNow] ? calendarData.days[idxNow].enoch_year_day : 1;
    const doyNext = calendarData.days[idxNext] ? calendarData.days[idxNext].enoch_year_day : doyNow + 1;
    // Float day-of-year for jevn lat-interpolering
    const dDoy = ((doyNext - doyNow + 364) % 364) || 1;
    const doyFloat = doyNow + dayAccumulator * dDoy;
    sunLat = sunLatForDay(doyFloat);
  }

  // Solen følger sin egen årsbane: lat varierer 0 → +23.7° → 0 → -23.7° → 0 over 364 dager,
  // lon er en funksjon av rotasjonen (sunLonAngle). Klokken er KUN et lesehjelp som peker på solen.
  // v16.19: sunLonAngle=0 → sol på -Z (kl 12 / midnatt), samme konvensjon som timeviseren.
  const r = latToR(sunLat);
  const a = sunLonAngle * Math.PI / 180;
  const solX = r * Math.sin(a);
  const solZ = -r * Math.cos(a);
  sunMesh.position.set(solX, 0, solZ);
  sunGlow.position.set(solX, 0, solZ);

  // v16.30: SOLEN LYSER ALLTID (Enok 72 + Jone-Aase verbatim).
  //   Wall-invisibility-koden fra v16.29 er fjernet. I Enoks modell går solen
  //   ut av port i vest og inn i annen port i øst — port-skiftet skjer ved
  //   nord-passering, ikke ved at solen blir usynlig i en vegg. På de fire
  //   ekstrarunde-dagene (91, 182, 273, 364) tar solen en ekstra runde i
  //   samme bane før den fortsetter — vist visuelt via forsterket sol-bane-glow.
  sunMesh.visible = true;
  if (sunGlow) sunGlow.visible = true;

  // v16.30: Sjekk om vi er på en av de 4 ekstrarunde-dagene.
  //   Hvis ja, marker sol-banen tydelig (sterk hvit-gull glow) som visuell
  //   bekreftelse på at solen står 2 dager i samme bane (Enok 72:13/19/25/31).
  const dayNow = currentDayIdx + 1; // dag-of-year 1..364
  const isExtraRound = SOL_BANE_VENDEPUNKT && SOL_BANE_VENDEPUNKT.has(dayNow);

  // Timeviser-lengden skaleres dynamisk slik at SPISSEN treffer eksakt der solen er.
  // Solen følger fortsatt sin egen bane — timeviseren strekker seg ut eller inn for å møte den.
  // v16.25: Kjøres ALLTID (ikke bare når 3D-laget er synlig), så klokken er klar når du slår den på igjen.
  if (subMap.clockSol.userData) {
    const baseL = subMap.clockSol.userData.hourHandBaseLength;
    const hh = subMap.clockSol.userData.hourHand;
    if (baseL && hh) {
      hh.scale.z = r / baseL;   // r = solens nåværende radius på disken
    }
  }
  // Pulse sol-bane (sin-puls, periode ~2 sek)
  // v16.30: På de 4 ekstrarunde-dagene (91/182/273/364) lyser banen sterkere
  //   og skifter til hvit-gull som visuell markør for ekstrarunde.
  if (sunPathPulse && sunPathPulse.material) {
    const basePulse = 0.4 + 0.45 * Math.abs(Math.sin(t / 600));
    if (isExtraRound) {
      sunPathPulse.material.opacity = 0.85 + 0.15 * Math.abs(Math.sin(t / 300));
      sunPathPulse.material.color.setHex(0xffffff);
      if (sunPathRing && sunPathRing.material) {
        sunPathRing.material.opacity = 0.95;
        sunPathRing.material.color.setHex(0xfff4b8);
      }
    } else {
      sunPathPulse.material.opacity = basePulse;
      sunPathPulse.material.color.setHex(0xffe890);
      if (sunPathRing && sunPathRing.material) {
        sunPathRing.material.opacity = 0.55;
        sunPathRing.material.color.setHex(0xffd860);
      }
    }
  }
  // Oppdater dag/natt-sone (følger solen)
  if (subMap.daynight.visible) {
    updateDayNight();
  }
  // Oppdater urskive-visere — v16.25: kjører alltid, også når 3D-laget er skjult,
  // slik at digital read-out og viser-rotasjoner holder seg synkroniserte.
  updateClockSol();
  // Rotasjons-teller skal oppdateres uansett om sol-klokken er synlig
  updateRotationDisplay();
  // Atom-klokke (popup) — tikker hele tiden når popup er åpent
  {
    const atomPopup = document.getElementById('atom-clock-popup');
    if (atomPopup && atomPopup.style.display === 'block') updateClockAtom();
  }

  renderer.render(scene, camera);
}
requestAnimationFrame(loop);

// SOL-ROTASJON: i v16.6 er denne flettet inn i Play/Pause — ingen separat knapp.
// sunRotationEnabled står alltid true; Pause stopper hele bevegelsen.

// =================================================================
// DAG/NATT TOGGLE
// =================================================================
{
  const btnDN = document.getElementById('btn-daynight');
  if (btnDN) {
    btnDN.addEventListener('click', () => {
      subMap.daynight.visible = !subMap.daynight.visible;
      btnDN.style.background = subMap.daynight.visible ? '#806020' : '';
      btnDN.style.color = subMap.daynight.visible ? '#fff' : '';
      if (subMap.daynight.visible) updateDayNight();
    });
  }
}

// =================================================================
// KLOKKE TOGGLE + TIDSSONE + RADIUS-JUSTERING
// =================================================================
{
  // SOL-KLOKKE toggle
  // v16.49: Klokken (urskive + visere) og kompasset toggles uavhengig.
  // «Show-clock» = vise hele clockSol-gruppen OG vise dial-undergruppen.
  // «Show-compass» = vise clockSol-gruppen OG vise compass-undergruppen.
  // Hvis begge er av, skjules hele clockSol. Hvis bare én er på, skjules den andre delen.
  let showDial = false;      // urskive (Enok-ring, visere, jevndogn-trekanter, sentrum-N)
  let showCompass = false;   // 360° kompass-ring
  function applyClockVisibility() {
    const cg = subMap.clockSol.userData ? subMap.clockSol.userData.compass : null;
    // clockSol som helhet er synlig hvis minst en av delene er på
    subMap.clockSol.visible = showDial || showCompass;
    // Skjul/vis kompass-undergruppen
    if (cg) cg.visible = showCompass;
    // Urskive-elementer ligger som direkte barn av clockSol (alt som ikke er compassGroup).
    // Vi traverserer barn og skjuler/viser dem unntatt compassGroup.
    for (const child of subMap.clockSol.children) {
      if (child === cg) continue;
      child.visible = showDial;
    }
    if (subMap.clockSol.visible) updateClockSol();
  }
  const btnCS = document.getElementById('btn-clock-sol');
  if (btnCS) {
    btnCS.addEventListener('click', () => {
      showDial = !showDial;
      btnCS.style.background = showDial ? '#806020' : '';
      btnCS.style.color = showDial ? '#fff' : '';
      applyClockVisibility();
    });
  }
  // v16.49: KOMPASS toggle (uavhengig av urskiven)
  const btnCP = document.getElementById('btn-compass');
  if (btnCP) {
    btnCP.addEventListener('click', () => {
      showCompass = !showCompass;
      btnCP.style.background = showCompass ? '#806020' : '';
      btnCP.style.color = showCompass ? '#fff' : '';
      applyClockVisibility();
    });
  }
  // Init: begge av (subMap.clockSol.visible = false er allerede satt), sett undergruppe-synlighet riktig
  applyClockVisibility();
  // ATOM-KLOKKE toggle — styrer popup-vinduet, ikke 3D-laget
  const btnCA = document.getElementById('btn-clock-atom');
  const atomPopup = document.getElementById('atom-clock-popup');
  if (btnCA && atomPopup) {
    btnCA.addEventListener('click', () => {
      const visible = atomPopup.style.display !== 'block';
      atomPopup.style.display = visible ? 'block' : 'none';
      btnCA.style.background = visible ? '#204060' : '';
      btnCA.style.color = visible ? '#fff' : '';
      if (visible) updateClockAtom();
    });
  }
  // Lukke-knapp inne i popup
  const atomClose = document.getElementById('atom-clock-close');
  if (atomClose && atomPopup) {
    atomClose.addEventListener('click', () => {
      atomPopup.style.display = 'none';
      if (btnCA) { btnCA.style.background = ''; btnCA.style.color = ''; }
    });
  }
  // TIDSSONE
  const tzSel = document.getElementById('clock-tz');
  if (tzSel) {
    tzSel.value = String(clockTimezoneOffset);
    tzSel.addEventListener('change', (e) => {
      clockTimezoneOffset = parseFloat(e.target.value);
      updateClockAtom();
    });
  }
  // SOL RADIUS slider — prosent av R_OUTER (ytterste diameter av disken)
  const solRadiusSlider = document.getElementById('clock-sol-radius');
  if (solRadiusSlider) {
    solRadiusSlider.addEventListener('input', (e) => {
      const pct = parseInt(e.target.value);
      clockSolRadius = R_OUTER * (pct / 100);
      buildClock(subMap.clockSol, {
        radius: clockSolRadius, yPos: CLOCK_Y_SOL,
        colorRing: 0xc9a247, colorMin: 0xc9a247, colorSec: 0xff4030,
        colorFace: 0x0a0e18, numerals: ENOK_NUMERALS_18, faceOpacity: 0.06,
      });
      const lbl = document.getElementById('clock-sol-radius-val');
      if (lbl) lbl.textContent = pct + '%';
      // v16.50: Rebind 5°-finring til layer-grid-toggle etter ombygging.
      // v16.53: GE-tallringen er flyttet ut til subMap.geRing og bygges KUN én gang fra init —
      // den påvirkes IKKE av radius-slider lenger (helt uavhengig av klokken).
      const gridEl = document.getElementById('layer-grid');
      if (gridEl) {
        const fr = subMap.clockSol.userData ? subMap.clockSol.userData.fineRing : null;
        if (fr) fr.visible = gridEl.checked;
      }
      // v16.49: Reapply dial/compass-visning etter ombygging
      applyClockVisibility();
    });
  }
}

// =================================================================
// GENERISK DRAG-MEKANISME (kalender-vindu, kamera-panel, kalender-knapp)
// =================================================================
function makeDraggable(elemId, handleId, opts = {}) {
  const el = document.getElementById(elemId);
  const handle = document.getElementById(handleId);
  if (!el || !handle) return;
  const DRAG_THRESHOLD = opts.threshold ?? 4; // piksler musen må bevege seg før drag teller
  let pending = null;  // {sx, sy} — ventet musedown
  let drag = null;     // {dx, dy} — aktiv drag
  handle.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    pending = { sx: e.clientX, sy: e.clientY };
  });
  window.addEventListener('mousemove', (e) => {
    if (pending && !drag) {
      // Sjekk om vi har gått over terskelen — da starter ekte drag
      const ddx = e.clientX - pending.sx;
      const ddy = e.clientY - pending.sy;
      if (Math.hypot(ddx, ddy) >= DRAG_THRESHOLD) {
        const rect = el.getBoundingClientRect();
        el.style.left = rect.left + 'px';
        el.style.top = rect.top + 'px';
        el.style.right = 'auto';
        el.style.bottom = 'auto';
        el.style.transform = 'none';
        if (getComputedStyle(el).position === 'absolute') {
          el.style.position = 'fixed';
        } else if (!el.style.position) {
          el.style.position = 'fixed';
        }
        drag = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
        handle.style.cursor = 'grabbing';
      }
    }
    if (!drag) return;
    let x = e.clientX - drag.dx;
    let y = e.clientY - drag.dy;
    x = Math.max(-el.offsetWidth + 40, Math.min(window.innerWidth - 40, x));
    y = Math.max(0, Math.min(window.innerHeight - 30, y));
    el.style.left = x + 'px';
    el.style.top = y + 'px';
  });
  window.addEventListener('mouseup', () => {
    pending = null;
    if (drag) { drag = null; handle.style.cursor = 'grab'; }
  });
}

// Aktiver drag for kamera-panel og kalender-knapp
makeDraggable('cam-panel', 'cam-panel-handle');
// v16.42: makeDraggable for btn-show-calbar fjernet - knappen er fast i hjornet

// =================================================================
// POP-UT TIL EGET VINDU — Document Picture-in-Picture API
// Lar bruker flytte kamera-panel og kalender til et eget always-on-top
// vindu som kan dras til en annen skjerm (Chrome/Edge, ikke Firefox/Safari).
// =================================================================
const PIP = {
  win: null,              // det åpne PiP-vinduet
  hostedIds: new Set(),   // hvilke element-id-er som er flyttet inn
  placeholders: new Map() // id -> placeholder-element (så vi kan flytte tilbake)
};

function supportsDocumentPiP() {
  return 'documentPictureInPicture' in window;
}

async function ensurePipWindow() {
  if (PIP.win && !PIP.win.closed) return PIP.win;
  if (!supportsDocumentPiP()) {
    alert('Beklager — nettleseren støtter ikke Document Picture-in-Picture.\n\n'
        + 'Dette virker i Chrome, Edge og andre Chromium-baserte nettlesere.\n'
        + 'Firefox og Safari kan dessverre ikke flytte HTML-vinduer ut på denne måten ennå.');
    return null;
  }
  const win = await window.documentPictureInPicture.requestWindow({
    width:  340,
    height: 520,
  });
  PIP.win = win;
  // Kopier alle stylesheets fra hoved-vinduet til PiP-vinduet,
  // slik at panelene ser like ut.
  [...document.styleSheets].forEach(sheet => {
    try {
      const cssRules = [...sheet.cssRules].map(r => r.cssText).join('\n');
      const style = win.document.createElement('style');
      style.textContent = cssRules;
      win.document.head.appendChild(style);
    } catch (e) {
      // Eksterne stylesheets vi ikke kan lese — link dem i stedet
      if (sheet.href) {
        const link = win.document.createElement('link');
        link.rel = 'stylesheet';
        link.href = sheet.href;
        win.document.head.appendChild(link);
      }
    }
  });
  // Sett matåtta bakgrunn / font
  win.document.body.style.cssText = 'margin:0;padding:12px;background:#0a0a0a;color:#e0e0e0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:13px;display:flex;flex-direction:column;gap:12px;';
  win.document.title = 'Enok 72 — kontroller';
  // Når vinduet lukkes, send alt tilbake til hoved-siden
  win.addEventListener('pagehide', () => {
    for (const id of [...PIP.hostedIds]) {
      restoreFromPip(id);
    }
    PIP.win = null;
  });
  return win;
}

async function popOutPanel(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (PIP.hostedIds.has(id)) {
    // Allerede i PiP — flytt tilbake i stedet
    restoreFromPip(id);
    return;
  }
  const win = await ensurePipWindow();
  if (!win) return;
  // Lag en plassholder så vi vet hvor elementet kom fra
  const placeholder = document.createElement('div');
  placeholder.dataset.pipPlaceholder = id;
  el.parentNode.insertBefore(placeholder, el);
  PIP.placeholders.set(id, placeholder);
  // Reset inline-positioning som ble satt under drag, og gjør elementet relativt
  el.style.position = 'relative';
  el.style.left = el.style.top = el.style.right = el.style.bottom = 'auto';
  el.style.transform = 'none';
  el.style.width = '100%';
  // Endre pop-ut-knapp-ikonet til "flytt tilbake"
  const btn = el.querySelector('[data-popout="' + id + '"]');
  if (btn) { btn.textContent = '↩'; btn.title = 'Flytt tilbake til hovedvinduet'; }
  win.document.body.appendChild(el);
  PIP.hostedIds.add(id);
}

function restoreFromPip(id) {
  const el = document.getElementById(id);
  const placeholder = PIP.placeholders.get(id);
  if (!el || !placeholder) return;
  placeholder.parentNode.insertBefore(el, placeholder);
  placeholder.remove();
  PIP.placeholders.delete(id);
  PIP.hostedIds.delete(id);
  // Tilbakestill posisjons-stiler så default CSS overtar igjen
  el.style.position = el.style.left = el.style.top = el.style.right = el.style.bottom = '';
  el.style.transform = el.style.width = '';
  const btn = el.querySelector('[data-popout="' + id + '"]');
  if (btn) { btn.textContent = '⧉'; btn.title = 'Flytt panelet til et eget vindu (kan dras til en annen skjerm)'; }
  // Lukk PiP-vinduet om det er tomt
  if (PIP.hostedIds.size === 0 && PIP.win && !PIP.win.closed) {
    try { PIP.win.close(); } catch (e) {}
    PIP.win = null;
  }
}

// Bind alle pop-ut-knapper
document.querySelectorAll('.popout-btn[data-popout]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();  // ikke trigger drag eller andre klikk
    popOutPanel(btn.dataset.popout);
  });
  // Stopp også mousedown så makeDraggable ikke begynner å dra panelet
  btn.addEventListener('mousedown', (e) => e.stopPropagation());
});

// Skjul pop-ut-knappen hvis nettleseren ikke støtter Document PiP
if (!supportsDocumentPiP()) {
  document.querySelectorAll('.popout-btn').forEach(b => {
    b.style.display = 'none';
  });
}

// =================================================================
// KALENDER-VINDU — drag og lukke
// =================================================================
{
  const calbar = document.getElementById('calbar');
  const handle = document.getElementById('calbar-handle');
  const closeBtn = document.getElementById('calbar-close');
  const showBtn = document.getElementById('btn-show-calbar');
  if (calbar && handle) {
    let drag = null;
    handle.addEventListener('mousedown', (e) => {
      const rect = calbar.getBoundingClientRect();
      // Konverter sentrert transform til fast venstre-koordinat ved start av drag
      calbar.style.left = rect.left + 'px';
      calbar.style.top = rect.top + 'px';
      calbar.style.transform = 'none';
      drag = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
      e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => {
      if (!drag) return;
      let x = e.clientX - drag.dx;
      let y = e.clientY - drag.dy;
      // Begrens innenfor viewport
      x = Math.max(0, Math.min(window.innerWidth - 100, x));
      y = Math.max(0, Math.min(window.innerHeight - 40, y));
      calbar.style.left = x + 'px';
      calbar.style.top = y + 'px';
    });
    window.addEventListener('mouseup', () => { drag = null; });
  }
  // v16.42: Knappen er alltid synlig. Lukkeknapp skjuler calbar, show-knapp aapner.
  if (closeBtn && calbar) {
    closeBtn.addEventListener('click', () => {
      calbar.style.display = 'none';
    });
  }
  if (showBtn && calbar) {
    showBtn.addEventListener('click', () => {
      calbar.style.display = 'flex';
    });
  }
}

// =================================================================
// DOKUMENTER MODAL
// =================================================================
{
  const btnOpen  = document.getElementById('btn-docs');
  const btnClose = document.getElementById('docs-close');
  const overlay  = document.getElementById('docs-overlay');
  if (btnOpen && overlay) {
    btnOpen.addEventListener('click', () => { overlay.style.display = 'flex'; });
  }
  if (btnClose && overlay) {
    btnClose.addEventListener('click', () => { overlay.style.display = 'none'; });
  }
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.style.display = 'none';
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && overlay.style.display !== 'none') {
      overlay.style.display = 'none';
    }
  });
}

// =================================================================
// BEVIS-ARKIV MODAL
// =================================================================
{
  const btnOpen  = document.getElementById('btn-evidence');
  const btnClose = document.getElementById('btn-close-evidence');
  const overlay  = document.getElementById('evidence-overlay');
  if (btnOpen && overlay) {
    btnOpen.addEventListener('click', () => {
      // v16.40: Lukk Documents-modal forst hvis den er aapen
      const docsOv = document.getElementById('docs-overlay');
      if (docsOv) docsOv.style.display = 'none';
      overlay.style.display = 'flex';
    });
  }
  if (btnClose && overlay) {
    btnClose.addEventListener('click', () => { overlay.style.display = 'none'; });
  }
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.style.display = 'none';
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && overlay.style.display !== 'none') {
      overlay.style.display = 'none';
    }
  });

  // "Vis i kalender"-knapper: lukk modal, hopp til dag, gi visuell feedback
  document.querySelectorAll('.goto-cal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const day = parseInt(btn.dataset.gotoDay, 10);
      if (isNaN(day)) return;
      // Lukk modal
      if (overlay) overlay.style.display = 'none';
      // Stopp autoplay hvis aktiv
      if (typeof isPlaying !== 'undefined' && isPlaying) {
        isPlaying = false;
        const playBtn = document.getElementById('btn-play');
        if (playBtn) playBtn.textContent = '▶ Play';
      }
      // Hopp til dag
      setDay(day);
      // Kort flash på sol-info-feltet
      const calInfo = document.getElementById('cal-info');
      if (calInfo) {
        const orig = calInfo.style.background;
        calInfo.style.background = '#2da356';
        calInfo.style.transition = 'background 0.8s';
        setTimeout(() => { calInfo.style.background = orig || ''; }, 800);
      }
    });
  });
}

// =================================================================
// ENOK 72 — TEKST-MODAL
// =================================================================
function openEnok72Modal() {
  const backdrop = document.getElementById('enok72-modal-backdrop');
  const content = document.getElementById('enok72-content');
  const subtitle = document.getElementById('enok72-subtitle');
  if (!backdrop || !content) return;

  if (!enok72Verses) {
    content.innerHTML = '<div style="color:#888;text-align:center;padding:30px">Loading Enoch verses …</div>';
  } else {
    const day = calendarData && calendarData.days[currentDayIdx];
    const dayOfYear = day ? day.enoch_year_day : 1;
    const seg = dagNattForDay(dayOfYear);
    const segVersStart = parseInt(seg.vers.split(':')[1].split('-')[0]);
    const segVersEnd = parseInt(seg.vers.split(':')[1].split('-')[1]);
    if (day && subtitle) {
      subtitle.textContent = `${day.date} · ${day.enoch_month} d.${day.enoch_day_in_month} · Gate ${day.sun_port_east} · day/night ${seg.day}/${seg.night} — highlighted: Enoch ${seg.vers}`;
    }

    // Bygg innhold: alle 37 vers, med dagens port-segment fremhevet
    const parts = [];
    for (let v = 1; v <= 37; v++) {
      const txt = enok72Verses[`72:${v}`];
      if (!txt) continue;
      const highlight = (v >= segVersStart && v <= segVersEnd);
      const style = highlight
        ? 'background:#2a2410;border-left:3px solid #e0c060;padding:8px 12px;margin:6px -12px 6px -12px;'
        : 'padding:2px 0;';
      parts.push(`<div style="${style}"><span style="color:#888;font-family:sans-serif;font-size:12px;">72:${v}</span> ${txt}</div>`);
    }
    content.innerHTML = parts.join('');

    // Scroll til fremhevet vers
    setTimeout(() => {
      const hl = content.querySelector('[style*="border-left"]');
      if (hl) hl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }
  backdrop.style.display = 'flex';
}

function closeEnok72Modal() {
  const backdrop = document.getElementById('enok72-modal-backdrop');
  if (backdrop) backdrop.style.display = 'none';
}

// v16.40: Wrap-handler lukker Documents-modal forst hvis den er aapen
document.getElementById('btn-enok72').addEventListener('click', () => {
  const docsOv = document.getElementById('docs-overlay');
  if (docsOv) docsOv.style.display = 'none';
  openEnok72Modal();
});
document.getElementById('enok72-close').addEventListener('click', closeEnok72Modal);
document.getElementById('enok72-modal-backdrop').addEventListener('click', (e) => {
  if (e.target.id === 'enok72-modal-backdrop') closeEnok72Modal();
});
// Klikk på cal-info åpner også Enok 72-modal
document.getElementById('cal-info').style.cursor = 'pointer';
document.getElementById('cal-info').title = 'Click to read Enoch 72 text for today\'s gate';
document.getElementById('cal-info').addEventListener('click', openEnok72Modal);
bindNorgePlacementControls();

// =================================================================
// START
// =================================================================
loadCalendar();
loadEnok72();
if (document.getElementById('base-map-norge')?.checked) {
  applyNorgeInstrumentMode(true);
}
setTimeout(() => {
  if (document.getElementById('base-map-norge')?.checked) {
    applyNorgeInstrumentMode(true);
  }
}, 250);
document.getElementById('sb-count').textContent = MARKERS.length;
document.getElementById('sb-visible').textContent = MARKERS.length;
document.getElementById('sb-mode').textContent = 'Enoch · AE';
