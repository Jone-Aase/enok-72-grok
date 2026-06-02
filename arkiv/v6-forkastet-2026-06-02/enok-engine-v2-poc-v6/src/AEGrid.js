import * as THREE from 'three';
import { latToR } from './AEProjection.js';

export function createAEGrid() {
  const group = new THREE.Group();

  // Polarsirkel
  const polarR = latToR(66.5634);
  const circle = new THREE.RingGeometry(polarR - 0.05, polarR + 0.05, 128);
  const material = new THREE.MeshBasicMaterial({ color: 0x7090c0, side: THREE.DoubleSide, transparent: true, opacity: 0.85 });
  const mesh = new THREE.Mesh(circle, material);
  mesh.rotation.x = Math.PI / 2;
  group.add(mesh);

  // Ekvator-ring
  const eqR = latToR(0);
  const eqCircle = new THREE.RingGeometry(eqR - 0.05, eqR + 0.05, 128);
  const eqMat = new THREE.MeshBasicMaterial({ color: 0x4fff4f, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
  const eqMesh = new THREE.Mesh(eqCircle, eqMat);
  eqMesh.rotation.x = Math.PI / 2;
  group.add(eqMesh);

  return group;
}
