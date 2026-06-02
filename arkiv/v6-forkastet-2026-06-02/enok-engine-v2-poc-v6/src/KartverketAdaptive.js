// KartverketAdaptive.js — GE-stil adaptiv tile-lasting
// Beregner hvilke tiles som er synlige i kamera-frustum og laster dem on-demand.

import * as THREE from 'three';
import { aeProject, R_OUTER } from './AEProjection.js';
import { tileCache } from './TileCache.js';

// Norges grenser (brukes som ytre clip for å unngå å laste verden)
const NORGE_BOUNDS = {
  latMin: 57.5, latMax: 71.5,
  lonMin: 4.0,  lonMax: 31.5
};

// Velg zoom basert på kamerahøyde (Y i AE-enheter)
// Y=80 (langt unna): hele Norge → z=5-6
// Y=10: regionalt → z=7-8
// Y=2: lokalt (polarsirkel) → z=9-10
// Y=0.5 (lavt): detalj → z=11-12
function chooseZoom(cameraY) {
  if (cameraY > 50) return 5;
  if (cameraY > 20) return 6;
  if (cameraY > 8)  return 7;
  if (cameraY > 3)  return 8;
  if (cameraY > 1)  return 10;
  return 11;
}

// Konverter Web Mercator tile (z, x, y) til lat/lon-hjørner
function tileToLatLon(z, x, y) {
  const n = Math.pow(2, z);
  const lon = x / n * 360 - 180;
  const latRad = Math.atan(Math.sinh(Math.PI * (1 - 2 * y / n)));
  const lat = latRad * 180 / Math.PI;
  return { lat, lon };
}

// Konverter lat/lon til tile-koordinater (kontinuerlige)
function latLonToTileXY(lat, lon, z) {
  const n = Math.pow(2, z);
  const x = (lon + 180) / 360 * n;
  const latRad = lat * Math.PI / 180;
  const y = (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n;
  return { x, y };
}

// Finn synlig AE-region ved å projisere kamera-frustum mot Y=0-planet
function computeVisibleAERegion(camera) {
  // VIKTIG: kameramatrisen må være oppdatert før unproject() fungerer
  camera.updateMatrixWorld();
  camera.updateProjectionMatrix();

  // Sample 4 hjørner + 4 midtpunkter i NDC-rommet
  const ndcPoints = [
    [-1, -1], [1, -1], [1, 1], [-1, 1],
    [0, -1], [1, 0], [0, 1], [-1, 0], [0, 0]
  ];

  const aePoints = [];
  for (const [ndcX, ndcY] of ndcPoints) {
    // Lag stråle fra kamera gjennom NDC-punkt
    const v = new THREE.Vector3(ndcX, ndcY, 0.5);
    v.unproject(camera);
    const dir = v.sub(camera.position).normalize();

    // Skjær med Y=0-planet
    if (Math.abs(dir.y) < 1e-6) continue; // strålen parallell med bakken
    const t = -camera.position.y / dir.y;
    if (t < 0) continue; // skjæringspunkt bak kameraet

    const hit = new THREE.Vector3().copy(camera.position).addScaledVector(dir, t);
    aePoints.push({ x: hit.x, z: hit.z });
  }

  if (aePoints.length === 0) return null;

  // Bounding box i AE-koordinater
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const p of aePoints) {
    minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
    minZ = Math.min(minZ, p.z); maxZ = Math.max(maxZ, p.z);
  }

  // Utvid med 20% margin slik at tiles ved kanten av synsfeltet kommer med
  const dx = maxX - minX, dz = maxZ - minZ;
  return {
    minX: minX - dx * 0.2, maxX: maxX + dx * 0.2,
    minZ: minZ - dz * 0.2, maxZ: maxZ + dz * 0.2
  };
}

// Finn tiles direkte fra AE-region: iterer tiles innen Norge-bounding-box ved gitt zoom
// og inkluder bare de hvis AE-hjørne ligger innen AE-regionen
function tilesForAERegion(aeRegion, zoom) {
  // Først: tile-range som dekker hele Norge ved denne zoom
  const tlNorge = latLonToTileXY(NORGE_BOUNDS.latMax, NORGE_BOUNDS.lonMin, zoom);
  const brNorge = latLonToTileXY(NORGE_BOUNDS.latMin, NORGE_BOUNDS.lonMax, zoom);
  const xMinNorge = Math.floor(tlNorge.x);
  const xMaxNorge = Math.floor(brNorge.x);
  const yMinNorge = Math.floor(tlNorge.y);
  const yMaxNorge = Math.floor(brNorge.y);

  const tiles = [];
  for (let x = xMinNorge; x <= xMaxNorge; x++) {
    for (let y = yMinNorge; y <= yMaxNorge; y++) {
      // Beregn tile-hjørner i AE-rommet
      const c1 = tileToLatLon(zoom, x, y);         // NW
      const c2 = tileToLatLon(zoom, x + 1, y);     // NE
      const c3 = tileToLatLon(zoom, x, y + 1);     // SW
      const c4 = tileToLatLon(zoom, x + 1, y + 1); // SE

      const ae1 = aeProject(c1.lat, c1.lon);
      const ae2 = aeProject(c2.lat, c2.lon);
      const ae3 = aeProject(c3.lat, c3.lon);
      const ae4 = aeProject(c4.lat, c4.lon);

      // Tile bounding box i AE
      const tileMinX = Math.min(ae1.x, ae2.x, ae3.x, ae4.x);
      const tileMaxX = Math.max(ae1.x, ae2.x, ae3.x, ae4.x);
      const tileMinZ = Math.min(ae1.z, ae2.z, ae3.z, ae4.z);
      const tileMaxZ = Math.max(ae1.z, ae2.z, ae3.z, ae4.z);

      // Overlapper med synsfelt-AE-region?
      if (tileMaxX < aeRegion.minX || tileMinX > aeRegion.maxX) continue;
      if (tileMaxZ < aeRegion.minZ || tileMinZ > aeRegion.maxZ) continue;

      tiles.push({ z: zoom, x, y });
    }
  }
  return tiles;
}

// Bygg én tile-mesh (reprojisert plane med 64x64 segmenter)
async function buildTileMesh(z, x, y, mode) {
  const cached = tileCache.getMesh(z, x, y, mode);
  if (cached) return cached;

  const n = Math.pow(2, z);
  const segments = 16; // færre segmenter pga adaptive zoom-nivåer (lavere zoom = mindre forvrengning per tile)
  const geometry = new THREE.PlaneGeometry(20, 20, segments, segments);
  const vertices = geometry.attributes.position.array;

  for (let j = 0; j < vertices.length; j += 3) {
    const u = (vertices[j] + 10) / 20;
    const v = (vertices[j + 1] + 10) / 20;

    const tileXf = x + u;
    const tileYf = y + (1 - v);

    const lon = tileXf / n * 360 - 180;
    const lat = Math.atan(Math.sinh(Math.PI * (1 - 2 * tileYf / n))) * 180 / Math.PI;

    const { x: aeX, z: aeZ } = aeProject(lat, lon);

    vertices[j]     = aeX;
    vertices[j + 1] = 0;
    vertices[j + 2] = aeZ;
  }
  geometry.attributes.position.needsUpdate = true;

  let material;
  if (mode === 'solid') {
    const colors = [0x00ffff, 0xff00ff, 0xffff00, 0xff8800];
    material = new THREE.MeshBasicMaterial({
      color: colors[(x + y) % 4],
      side: THREE.DoubleSide, transparent: true, opacity: 0.7
    });
  } else if (mode === 'wireframe') {
    material = new THREE.MeshBasicMaterial({
      color: 0xff00ff, wireframe: true, side: THREE.DoubleSide
    });
  } else {
    // Normal: trenger texture
    const texture = await tileCache.getTexture(z, x, y);
    material = new THREE.MeshBasicMaterial({
      map: texture, side: THREE.DoubleSide, transparent: true, opacity: 0.95
    });
  }

  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData = { z, x, y, mode };
  tileCache.setMesh(z, x, y, mode, mesh);
  return mesh;
}

// Hovedfunksjon: bygg layer for synlig region
export async function buildAdaptiveLayer(camera, debugMode = 'normal') {
  const aeRegion = computeVisibleAERegion(camera);
  if (!aeRegion) {
    console.log('%cAdaptive: ingen synlig AE-region', 'color:#fa0');
    return new THREE.Group();
  }

  const zoom = chooseZoom(camera.position.y);
  const tiles = tilesForAERegion(aeRegion, zoom);

  if (tiles.length === 0) {
    console.log('%cAdaptive: ingen Norge-tiles i synsfelt', 'color:#fa0');
    return new THREE.Group();
  }

  console.log(
    `%cAdaptive: z=${zoom}, ${tiles.length} tiles synlige, camY=${camera.position.y.toFixed(2)}`,
    'color:#0f0'
  );

  // Last alle tiles parallelt (Promise.all)
  const meshes = await Promise.all(
    tiles.map(t => buildTileMesh(t.z, t.x, t.y, debugMode).catch(err => {
      console.warn(`Tile ${t.z}/${t.x}/${t.y} feilet:`, err.message);
      return null;
    }))
  );

  const group = new THREE.Group();
  for (const mesh of meshes) {
    if (mesh) group.add(mesh);
  }

  console.log(
    `%cAdaptive: ${group.children.length}/${tiles.length} meshes lagt til, cache: ${JSON.stringify(tileCache.stats())}`,
    'color:#0f0'
  );

  return group;
}

export { chooseZoom, NORGE_BOUNDS };
