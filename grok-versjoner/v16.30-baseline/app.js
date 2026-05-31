// =================================================================
// ENOCH 72 — THE TRUTH INSTRUMENT v2.0 (3D)
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
function aeProject(lat, lon) {
  const r = latToR(lat);
  const theta = lon * Math.PI / 180;
  // lon=0 peker mot +Z (sør på kartet er nedover skjerm i top-down view)
  const x = r * Math.sin(theta);
  const z = -r * Math.cos(theta);
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
];

const FARGER = {
  "Ekvator":     "#4fff4f",
  "Cancer":      "#ff7755",
  "Capricorn":   "#55a8ff",
  "Struve":      "#ffcc88",
  "Megalithic":  "#cc99ff",
  "Polarsirkel": "#ffff88",
};

const FILTER_KEY = {
  "Ekvator":     "filt-equator",
  "Cancer":      "filt-cancer",
  "Capricorn":   "filt-capricorn",
  "Polarsirkel": "filt-arctic",
  "Struve":      "filt-port",
  "Megalithic":  "filt-megalithic",
};

// =================================================================
// THREE.JS — scene-oppsett
// =================================================================
const wrap = document.getElementById('canvas-wrap');
const canvas = document.getElementById('cv');
let cw = wrap.clientWidth, ch = wrap.clientHeight;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
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
  camera.up.set(0, 1, 0);
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
  meridians: new THREE.Group(), latcircles: new THREE.Group(), outerring: new THREE.Group(),
  squareGrid: new THREE.Group(),  // Kartesisk referanse-rutenett (1° lat = 110.593 km, GE-skala)
  daynight: new THREE.Group(),
  clockSol: new THREE.Group(),   // Sol-klokke (Enok-tid, drives av sunLonAngle)
  clockAtom: new THREE.Group(),  // Atom-klokke (sann tid, drives av Date)
};
Object.values(subMap).forEach(g => grpMap.add(g));

const subCel = {
  equator: new THREE.Group(), cancer: new THREE.Group(), capricorn: new THREE.Group(),
  polarcircles: new THREE.Group(), sun: new THREE.Group(), moon: new THREE.Group(),
};
Object.values(subCel).forEach(g => grpCelest.add(g));

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
// MAGNETISK NORD = AE-SENTRUM (integrert i kartsenter, ikke eget lag)
// =================================================================
{
  // Tett glød i sentrum av kartet — markerer magnetisk nord / AE-sentrum
  const glow = new THREE.Mesh(
    new THREE.CircleGeometry(R_EQUATOR * 0.35, 64),
    new THREE.MeshBasicMaterial({ color: 0xa060ff, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
  );
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = 0.02;
  grpMagnet.add(glow);
  // Tynn lilla akse fra kartsenter opp gjennom Polaris
  const axisGeom = new THREE.CylinderGeometry(0.05, 0.05, Y_FIRMA, 8);
  const axisMat  = new THREE.MeshBasicMaterial({ color: 0xa060ff, transparent: true, opacity: 0.35 });
  const axis = new THREE.Mesh(axisGeom, axisMat);
  axis.position.y = Y_FIRMA / 2;
  grpMagnet.add(axis);
}

// =================================================================
// FN-AE-KART (tekstur å legge på Lag 1)
// =================================================================
// FN-emblemet er azimuthal equidistant projeksjon, sentrert på Nordpolen.
// Ytre kart-grense på emblemet = 60°S.
// Etter buestreng-uretting (v16): r(-60°) = R_OUTER × 150/180 = 26.184.
const UN_MAP_RADIUS = R_OUTER * 150 / 180;  // 26.184 — 60°S i buestreng-skala
{
  const loader = new THREE.TextureLoader();
  loader.load('un-map.png', (tex) => {
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
    mapDisk.position.y = 0.04;
    mapDisk.userData.isUnMap = true;
    subMap.coast.add(mapDisk);
  }, undefined, (err) => {
    console.warn('UN map texture failed to load:', err);
  });
}

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
  const mat  = new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity });
  return new THREE.Line(geom, mat);
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
  subMap.grid.add(makeMeridians(36, 0x3a5070, 0.30));
}
rebuildGrid(5);

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

// Equator-ring (golden, alltid synlig på kartet)
subMap.grid.add(makeRing(R_EQUATOR, 0xc9a247, 0.6));

// Lat-sirkler (Cancer, Capricorn, Arctic, Antarctic) — Enoks vendekretser ved 23.7° (Excel master-kalender)
subMap.latcircles.add(makeRing(latToR(23.7), 0x886633, 0.5));
subMap.latcircles.add(makeRing(latToR(-23.7), 0x886633, 0.5));
subMap.latcircles.add(makeRing(latToR(66.5634), 0x335577, 0.5));
subMap.latcircles.add(makeRing(latToR(-66.5634), 0x335577, 0.5));

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
    // Liten pin-stil markør (GE-stil) — sirkulær disk + tynn vertikal stilk
    const pinGroup = new THREE.Group();
    const geom = new THREE.SphereGeometry(0.08, 12, 12);
    const mat = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.set(0, 0.12, 0);
    mesh.userData = m;
    pinGroup.add(mesh);
    // Tynn vertikal pin-stilk for synlighet
    const stalkGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.12, 6);
    const stalkMat = new THREE.MeshBasicMaterial({ color, opacity: 0.7, transparent: true });
    const stalk = new THREE.Mesh(stalkGeom, stalkMat);
    stalk.position.set(0, 0.06, 0);
    pinGroup.add(stalk);
    pinGroup.position.set(p.x, 0, p.z);
    markerGroup.add(pinGroup);
    markerMeshes.push(mesh);
  }
}
buildMarkers();

// =================================================================
// BYGG LAG 2 — SOL, MÅNE, RINGER
// =================================================================
subCel.equator.add(makeRing(R_EQUATOR, 0x60c060, 0.85));
// Krepsens og Steinbukkens vendekrets ved 23.7° (Enoks port-yttergrenser, master-kalender)
subCel.cancer.add(makeRing(latToR(23.7), 0xe0c060, 0.85));
subCel.capricorn.add(makeRing(latToR(-23.7), 0xc08040, 0.85));
subCel.polarcircles.add(makeRing(latToR(66.5634), 0x7090c0, 0.7));
subCel.polarcircles.add(makeRing(latToR(-66.5634), 0x7090c0, 0.7));

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
  // ────────────────────────────────────────────────────────────────
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

  // Kompass-ring radius og soner
  const compassInnerR  = radius * 1.02;   // innerring (mot disken)
  const compassOuterR  = radius * 1.245;   // ytterring (begrensning, utenfor kardinal-tall)
  const tickStartR     = radius * 1.025;
  const tickEndMinor   = radius * 1.045;  // 1° ticks
  const tickEndMid     = radius * 1.060;  // 5° ticks
  const tickEndMajor   = radius * 1.080;  // 10° ticks
  const tickEndCardinal= radius * 1.095;  // 90° ticks (kardinaler)
  const degLabelR      = radius * 1.135;  // alle 360 grad-tall
  const cardinalR      = radius * 1.180;  // ekstra fremheving for 0/90/180/270

  // Indre og ytre gull-sirkel som rammer kompass-ringen
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
  group.add(makeRingCircle(radius * 1.100, 0x8a7048, 0.35, yPos + 0.035)); // skille mellom ticks og 1°-tall
  group.add(makeRingCircle(radius * 1.190, 0x8a7048, 0.30, yPos + 0.035)); // skille mellom 10° og kardinaler

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

  // Alle 360 grad-tall — hierarki: kardinaler størst, hver 10. medium, mellomliggende små,
  // hver 1° ekstra liten. Tallene roterer slik at de står vinkelrett på ringen.
  // Vi bruker mesh i stedet for sprite for hver-grad-tallene så de kan roteres riktig.
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

  // Radius-soner for grad-tallene (nærmere ringen = mindre tall)
  // Plassert utenfor lengste tick (tickEndCardinal = 1.095) med god marg
  const r1deg  = radius * 1.108;  // hver 1° — små tall like utenfor ticks
  const r5deg  = radius * 1.142;  // hver 5°
  const r10deg = radius * 1.175;  // hver 10°
  const rCard  = radius * 1.205;  // kardinaler

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
  if (subCel.cancer.children[0]) {
    subCel.cancer.children[0].material.opacity = cancerHit ? 1.0 : 0.5;
    subCel.cancer.children[0].material.color.setHex(cancerHit ? 0xffe080 : 0xe0c060);
  }
  if (subCel.capricorn.children[0]) {
    subCel.capricorn.children[0].material.opacity = capricornHit ? 1.0 : 0.5;
    subCel.capricorn.children[0].material.color.setHex(capricornHit ? 0xffa050 : 0xc08040);
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
const CAM_DIST_MIN = 1.5;   // helt nær overflaten — Google Earth-nivå
const CAM_DIST_MAX = 400;
const PAN_RADIUS_MAX = R_OUTER_KM * SCALE * 1.5; // ikke pan lenger ut enn 1.5× disken

let dragMode = null; // 'rotate' | 'pan' | null
let lastX = 0, lastY = 0;

function updateZoomReadout() {
  const el = document.getElementById('zoom-level');
  const ind = document.getElementById('zoom-indicator');
  const pct = Math.round(100 / camState.dist * 100);
  if (el) el.textContent = pct + '%';
  if (ind) ind.textContent = pct + '% · ' + currentModeLabel();
}

// Pan: forskyv camState.target i kamera-planet (høyre + opp relativt til kamera),
// projisert ned i XZ-planet slik at vi følger kartet — som i Google Earth.
function panCameraTarget(dx, dy) {
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

canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  // Adaptiv zoom: multiplikativ. Mindre følsom enn før.
  const factor = Math.pow(1.0008, e.deltaY);
  camState.dist = Math.max(CAM_DIST_MIN, Math.min(CAM_DIST_MAX, camState.dist * factor));
  applyCamera();
  updateZoomReadout();
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

// Layer-togglers
function bindToggle(id, group, prop = 'visible') {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('change', () => { group[prop] = el.checked; });
  group[prop] = el.checked;
}
bindToggle('layer-magnet', grpMagnet);
bindToggle('layer-grid', subMap.grid);
bindToggle('layer-square-grid', subMap.squareGrid);
bindToggle('layer-meridians', subMap.meridians);
bindToggle('layer-latcircles', subMap.latcircles);
bindToggle('layer-coast', subMap.coast);
// FN-kart opacity-slider
{
  const slider = document.getElementById('map-opacity');
  const valEl  = document.getElementById('map-opacity-val');
  if (slider) {
    slider.addEventListener('input', () => {
      const v = parseFloat(slider.value) / 100;
      valEl.textContent = slider.value;
      subMap.coast.traverse(obj => {
        if (obj.userData && obj.userData.isUnMap && obj.material) {
          obj.material.opacity = v;
          obj.material.needsUpdate = true;
        }
      });
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
    grpMap.add(compareRing);
  }
  // Initial ring på ekvator
  makeCompareRing(R_EQUATOR);

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
}

// =================================================================
// ZENITH-TEST: SOL-SIKTLINJE PÅ FAKTISKE DATOER
// =================================================================
// Tre testbare par: solen i zenith over zenith-punktet kl 12 lokal,
// midnattssol fra observasjonspunktet kl 00 lokal. Den rette linjen er
// solens faktiske siktlinje gjennom flat-geometri.
{
  const tests = [
    {
      id: 'zt1',
      labelA: 'Aswan (zenith)', latA:  24.0880, lonA:  32.8990,
      labelB: 'Fort Yukon (midnattssol)', latB: 66.5636, lonB: -145.2611,
      color: 0xc9a247,
      eventDate: '19. juni 2026',
    },
    {
      id: 'zt2',
      labelA: 'Catequilla (ekvator-zenith)', latA: 0.0, lonA: -78.4956,
      labelB: 'Antipode (midnatt)', latB: 0.0, lonB: 101.5044,
      color: 0x6abfff,
      eventDate: 'Jevndøgn',
    },
    {
      id: 'zt3',
      labelA: 'Capricorn-zenith antipode', latA: -23.4373, lonA: 161.9833,
      labelB: 'Grimsey, Island (midnattssol)', latB: 66.5636, lonB: -18.0167,
      color: 0xff9060,
      eventDate: 'Sommersolverv',
    },
  ];

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

bindToggle('layer-equator', subCel.equator);
bindToggle('layer-cancer', subCel.cancer);
bindToggle('layer-capricorn', subCel.capricorn);
bindToggle('layer-polarcircles', subCel.polarcircles);
bindToggle('layer-sun', subCel.sun);
bindToggle('layer-moon', subCel.moon);

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
}
['filt-equator', 'filt-cancer', 'filt-capricorn', 'filt-arctic', 'filt-port', 'filt-megalithic'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', applyFilters);
});

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
let currentMode = 'enoch';
function currentModeLabel() { return currentMode === 'enoch' ? 'Enoch scale' : 'GE scale'; }
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
  const btnCS = document.getElementById('btn-clock-sol');
  if (btnCS) {
    btnCS.addEventListener('click', () => {
      subMap.clockSol.visible = !subMap.clockSol.visible;
      btnCS.style.background = subMap.clockSol.visible ? '#806020' : '';
      btnCS.style.color = subMap.clockSol.visible ? '#fff' : '';
      if (subMap.clockSol.visible) updateClockSol();
    });
  }
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
      if (subMap.clockSol.visible) updateClockSol();
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
makeDraggable('btn-show-calbar', 'btn-show-calbar');

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
  if (closeBtn && calbar && showBtn) {
    closeBtn.addEventListener('click', () => {
      calbar.style.display = 'none';
      showBtn.classList.add('visible');
    });
    showBtn.addEventListener('click', () => {
      calbar.style.display = 'flex';
      showBtn.classList.remove('visible');
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

document.getElementById('btn-enok72').addEventListener('click', openEnok72Modal);
document.getElementById('enok72-close').addEventListener('click', closeEnok72Modal);
document.getElementById('enok72-modal-backdrop').addEventListener('click', (e) => {
  if (e.target.id === 'enok72-modal-backdrop') closeEnok72Modal();
});
// Klikk på cal-info åpner også Enok 72-modal
document.getElementById('cal-info').style.cursor = 'pointer';
document.getElementById('cal-info').title = 'Click to read Enoch 72 text for today\'s gate';
document.getElementById('cal-info').addEventListener('click', openEnok72Modal);

// =================================================================
// START
// =================================================================
loadCalendar();
loadEnok72();
document.getElementById('sb-count').textContent = MARKERS.length;
document.getElementById('sb-visible').textContent = MARKERS.length;
document.getElementById('sb-mode').textContent = 'Enoch · AE';
