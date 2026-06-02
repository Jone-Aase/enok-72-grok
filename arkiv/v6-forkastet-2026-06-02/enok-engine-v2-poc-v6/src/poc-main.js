import * as THREE from 'three';
import { createAEGrid } from './AEGrid.js';
import { createPolarPoints } from './PolarPoints.js';
import { buildAdaptiveLayer, NORGE_BOUNDS } from './KartverketAdaptive.js';
import { aeProject } from './AEProjection.js';

// ============================================================================
// HENGELÅS — TILE-REPROJEKSJON ER FORKASTET (2026-06-02, Jone)
// ============================================================================
// Regel nr 1 i Enok-72-prosjektet:
//   * Lengdegrader: eksakt som GE-grid (allerede oppfylt — aeProject uendret).
//   * Breddegrader: kun Solens 5 ringer som passer.
//   * Norgeskartet skal ha sann form og sanne mål, festes til polarsirkelens
//     4 ankerpunkter — ikke strekkes per tile-hjørne.
//
// Mercator-reprojeksjon av Kartverket-tiles per tile-hjørne via aeProject
// strekker Norgeskartet og bryter regelen. Derfor: FORKASTET.
//
// Filene KartverketAdaptive.js og KartverketReprojection.js ligger urørt på
// disk som arkiv, men de KALLES IKKE fra denne render-løypen.
//
// Neste steg: hente Norgeskartet fra hovedinstrumentet og feste det som ÉN
// flat Three.js-mesh i AE-rom, ikke som reprojiserte tile-hjørner.
//
// Hengelåsen er to-trinns: både TILE_REPROJECTION_LOCKED nedenfor OG den
// faktiske kommentaren "FORKASTET" på linjene som er kommentert ut må endres
// for å gjenåpne tile-reprojeksjonen. Det skal være umulig å "slippe gjennom"
// uten å bryte begge to bevisst.
//
// Hvis du som AI eller menneske leser dette og vurderer å gjenåpne:
//   STOPP. Spør Jone først. Ikke gjør det selv.
// ============================================================================
const TILE_REPROJECTION_LOCKED = true;
Object.defineProperty(window, '__TILE_REPROJECTION_LOCKED', {
  value: TILE_REPROJECTION_LOCKED, writable: false, configurable: false
});

const container = document.getElementById('container');
const canvas = document.getElementById('cv');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500);

// Default: kamera over Norge sentrum, høyt nok til å se hele landet
const norgeCenter = aeProject(
  (NORGE_BOUNDS.latMin + NORGE_BOUNDS.latMax) / 2,
  (NORGE_BOUNDS.lonMin + NORGE_BOUNDS.lonMax) / 2
);
camera.position.set(norgeCenter.x, 25, norgeCenter.z + 0.01);
camera.lookAt(norgeCenter.x, 0, norgeCenter.z);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

scene.add(new THREE.AmbientLight(0xffffff, 0.8));

const grid = createAEGrid();
scene.add(grid);

const polar = createPolarPoints();
scene.add(polar);

window.debugMode = 'normal';

// Eksponer for Playwright og fase 2-debugging
window.__pocCamera = camera;
window.__pocScene = scene;
window.__pocPolar = polar;
window.__pocNorgeCenter = norgeCenter;

// Adaptiv layer-håndtering (race-safe fra v5.1)
let currentLayer = null;
let currentRequestId = 0;
let latestRequestId = 0;

function disposeLayer(layer) {
  if (!layer) return;
  // VIKTIG: ikke dispose textures/meshes fordi de er cached i tileCache
  // Bare fjern fra scene — cache disposer selv
}

async function updateLayer() {
  // FORKASTET 2026-06-02: tile-reprojeksjon brutt med vilje.
  // Se hengelås-blokken øverst i filen. Skal IKKE gjenåpnes uten Jones godkjenning.
  if (TILE_REPROJECTION_LOCKED) {
    return;
  }
  // ---- nedenfor er den gamle reprojeksjons-løypen, kun for arkiv ----
  // const requestId = ++latestRequestId;
  // const newLayer = await buildAdaptiveLayer(camera, window.debugMode);
  // if (requestId !== latestRequestId || requestId <= currentRequestId) return;
  // if (currentLayer) { scene.remove(currentLayer); disposeLayer(currentLayer); }
  // currentLayer = newLayer;
  // currentRequestId = requestId;
  // scene.add(currentLayer);
  // window.__pocLayer = currentLayer;
}

// Trigger ny lasting når kamera flyttes nok
let lastUpdateY = camera.position.y;
let lastUpdateX = camera.position.x;
let lastUpdateZ = camera.position.z;
const UPDATE_THRESHOLD = 1.0; // AE-enheter (~1000 km)

function maybeUpdate() {
  const dy = Math.abs(camera.position.y - lastUpdateY);
  const dx = Math.abs(camera.position.x - lastUpdateX);
  const dz = Math.abs(camera.position.z - lastUpdateZ);
  if (dy > UPDATE_THRESHOLD || dx > UPDATE_THRESHOLD || dz > UPDATE_THRESHOLD) {
    lastUpdateY = camera.position.y;
    lastUpdateX = camera.position.x;
    lastUpdateZ = camera.position.z;
    updateLayer();
  }
}

updateLayer();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Zoom med scroll (rundt kamera-fokuspunkt)
window.addEventListener('wheel', (e) => {
  e.preventDefault();
  camera.position.y = Math.max(0.5, Math.min(120, camera.position.y - e.deltaY * 0.05));
  camera.lookAt(camera.position.x, 0, camera.position.z - 0.01);
  maybeUpdate();
}, { passive: false });

// Pan med drag (venstre museknapp)
let isDragging = false;
let lastMouseX = 0, lastMouseY = 0;
window.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
  }
});
window.addEventListener('mouseup', () => { isDragging = false; });
window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - lastMouseX;
  const dy = e.clientY - lastMouseY;
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;

  // Pan-hastighet skaleres med kamerahøyde (høyere = raskere)
  const scale = camera.position.y * 0.002;
  camera.position.x -= dx * scale;
  camera.position.z -= dy * scale;
  camera.lookAt(camera.position.x, 0, camera.position.z - 0.01);
  maybeUpdate();
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Debug-knapper
window.setDebugMode = function(mode) {
  window.debugMode = mode;
  updateLayer();
};

// Sett kamera til en gitt lat/lon ved gitt høyde
window.flyTo = function(lat, lon, height) {
  const target = aeProject(lat, lon);
  camera.position.set(target.x, height, target.z + 0.01);
  camera.lookAt(target.x, 0, target.z);
  updateLayer();
};
