import * as THREE from 'three';
import { aeProject, latToR } from './AEProjection.js';
import { residuals, similarityFromPoints } from './SimilarityTransform.js';

const EDGE_LAT = 56.0;
const SOURCE_RADIUS = latToR(EDGE_LAT);
const SOURCE_SIZE = SOURCE_RADIUS * 2;

const CONTROL_POINTS = [
  { id: 'selsoy', name: 'Selsoy garden', lat: 66.5502, lon: 12.8462 },
  { id: 'kveitanosen', name: 'Kveitanosen', lat: 66.55, lon: 12.6383 },
  { id: 'arctic_center', name: 'Arctic Circle Center', lat: 66.550008, lon: 15.327011 }
];

export async function createNorgeSingleSurface() {
  const texture = await new THREE.TextureLoader().loadAsync('./assets/norge-source-placeholder.png');
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    alphaTest: 0.03,
    side: THREE.DoubleSide,
    depthWrite: false
  });

  const geometry = createSurfaceGeometry(SOURCE_SIZE);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.userData.role = 'norge_surface';
  mesh.userData.texture = texture;
  mesh.renderOrder = 2;

  const sourcePoints = CONTROL_POINTS.map(pointToSourceSpace);
  const targetPoints = CONTROL_POINTS.map(pointToTargetSpace);
  const transform = similarityFromPoints(sourcePoints, targetPoints);

  const group = new THREE.Group();
  const sourceRoot = new THREE.Group();
  group.position.set(transform.targetCenter.x, 0, transform.targetCenter.z);
  group.scale.setScalar(transform.scale);
  group.rotation.y = -transform.rotationRad;
  sourceRoot.position.set(-transform.sourceCenter.x, 0, -transform.sourceCenter.z);
  sourceRoot.add(mesh);
  group.add(sourceRoot);
  group.userData = {
    type: 'rule1_single_surface',
    source: 'assets/norge-source-placeholder.png',
    rule: 'single flat surface, similarity transform only',
    transform,
    residuals: residuals(sourcePoints, targetPoints, transform),
    controlPoints: CONTROL_POINTS
  };

  addSurfaceFrame(sourceRoot);
  addAnchorMarkers(sourceRoot, sourcePoints);

  return group;
}

export function setNorgeSurfaceMode(group, mode) {
  const objects = [];
  group.traverse(child => objects.push(child));
  const mesh = objects.find(child => child.userData.role === 'norge_surface');
  const frame = objects.find(child => child.userData.role === 'surface_frame');
  const anchors = objects.filter(child => child.userData.role === 'anchor_marker');
  if (!mesh) return;

  mesh.material.wireframe = mode === 'wireframe';
  mesh.material.map = mode === 'solid' || mode === 'wireframe' ? null : mesh.userData.texture;
  mesh.material.color.set(mode === 'solid' ? 0x8fd0ff : 0xffffff);
  mesh.material.opacity = mode === 'solid' ? 0.34 : 0.95;
  mesh.material.needsUpdate = true;

  if (frame) frame.visible = mode === 'wireframe' || mode === 'anchors';
  anchors.forEach(anchor => { anchor.visible = mode === 'anchors'; });
}

function pointToSourceSpace(point) {
  return aeProject(point.lat, point.lon);
}

function pointToTargetSpace(point) {
  return aeProject(point.lat, point.lon);
}

function createSurfaceGeometry(size) {
  const h = size / 2;
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([
    -h, 0, -h,
     h, 0, -h,
     h, 0,  h,
    -h, 0,  h
  ], 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute([
    0, 0,
    1, 0,
    1, 1,
    0, 1
  ], 2));
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  geometry.computeBoundingSphere();
  return geometry;
}

function addSurfaceFrame(group) {
  const shape = new THREE.Shape();
  const h = SOURCE_SIZE / 2;
  shape.moveTo(-h, -h);
  shape.lineTo(h, -h);
  shape.lineTo(h, h);
  shape.lineTo(-h, h);
  shape.lineTo(-h, -h);
  const points = shape.getPoints();
  const geometry = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x, 0.01, p.y)));
  const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xffd36b }));
  line.userData.role = 'surface_frame';
  line.visible = false;
  group.add(line);
}

function addAnchorMarkers(group, sourcePoints) {
  const geometry = new THREE.SphereGeometry(0.055, 16, 16);
  const sourceMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });

  for (let i = 0; i < CONTROL_POINTS.length; i++) {
    const sourceMarker = new THREE.Mesh(geometry, sourceMaterial);
    sourceMarker.position.set(sourcePoints[i].x, 0.08, sourcePoints[i].z);
    sourceMarker.userData = { role: 'anchor_marker', kind: 'mapped_source', id: CONTROL_POINTS[i].id };
    sourceMarker.visible = false;
    group.add(sourceMarker);
  }
}

export function bindTextureReference(group) {
  let mesh = null;
  group.traverse(child => {
    if (!mesh && child.type === 'Mesh' && child.material?.map) mesh = child;
  });
  if (mesh) {
    mesh.userData.role = 'norge_surface';
    mesh.userData.texture = mesh.material.map;
  }
}
