import * as THREE from 'three';
import { aeProject } from './AEProjection.js';

// TilesForBounds med korrekt y-retning (Web Mercator går nedover fra nord)
function tilesForBounds(latMin, latMax, lonMin, lonMax, zoom) {
  const n = Math.pow(2, zoom);
  const xMin = Math.floor((lonMin + 180) / 360 * n);
  const xMax = Math.floor((lonMax + 180) / 360 * n);
  const yMin = Math.floor((1 - Math.log(Math.tan(latMax * Math.PI / 180) + 1 / Math.cos(latMax * Math.PI / 180)) / Math.PI) / 2 * n);
  const yMax = Math.floor((1 - Math.log(Math.tan(latMin * Math.PI / 180) + 1 / Math.cos(latMin * Math.PI / 180)) / Math.PI) / 2 * n);
  const tiles = [];
  for (let x = xMin; x <= xMax; x++) {
    for (let y = yMin; y <= yMax; y++) {
      tiles.push({ x, y, z: zoom });
    }
  }
  return tiles;
}

// Ekte reprojeksjon: Web Mercator tile → AE (ALTERNATIV B)
export async function createKartverketTopoLayer(cameraY, debugMode = 'normal') {
  const group = new THREE.Group();

  const zoom = cameraY > 3 ? 8 : 10;
  const bounds = { latMin: 65.4, latMax: 66.8, lonMin: 12.5, lonMax: 15.5 };
  const tiles = tilesForBounds(bounds.latMin, bounds.latMax, bounds.lonMin, bounds.lonMax, zoom);

  const n = Math.pow(2, zoom);

  console.log(`%cRender-debug: ${tiles.length} tiles lastet (z=${zoom})`, "color:#0f0");

  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    const url = `https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/${tile.z}/${tile.y}/${tile.x}.png`;
    const texture = await new THREE.TextureLoader().loadAsync(url);

    const segments = 64;
    const geometry = new THREE.PlaneGeometry(20, 20, segments, segments);
    const vertices = geometry.attributes.position.array;

    for (let j = 0; j < vertices.length; j += 3) {
      const u = (vertices[j] + 10) / 20;
      const v = (vertices[j + 1] + 10) / 20;

      const tileXf = tile.x + u;
      const tileYf = tile.y + (1 - v);

      const lon = tileXf / n * 360 - 180;
      const lat = Math.atan(Math.sinh(Math.PI * (1 - 2 * tileYf / n))) * 180 / Math.PI;

      const { x: aeX, z: aeZ } = aeProject(lat, lon);

      vertices[j]     = aeX;
      vertices[j + 1] = 0;
      vertices[j + 2] = aeZ;
    }

    geometry.attributes.position.needsUpdate = true;

    let material;
    if (debugMode === 'solid') {
      const colors = [0x00ffff, 0xff00ff, 0xffff00, 0xff8800];
      material = new THREE.MeshBasicMaterial({ color: colors[i % 4], side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
    } else if (debugMode === 'wireframe') {
      material = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true, side: THREE.DoubleSide });
    } else {
      material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95
      });
    }

    const plane = new THREE.Mesh(geometry, material);
    group.add(plane);

    if (debugMode === 'wireframe') {
      const box = new THREE.BoxHelper(plane, 0xffffff);
      group.add(box);
    }
  }

  console.log(`%cRender-debug: ${group.children.length} meshes + boxes opprettet`, "color:#0f0");
  return group;
}
