import * as THREE from 'three';
import { aeProject } from './AEProjection.js';

const POLAR_CONTROL_POINTS = [
  { id: "selsoy",       name: "Selsøy gården",         lat: 66.5502, lon: 12.8462 },
  { id: "kveitanosen",  name: "Kveitanosen",            lat: 66.5500, lon: 12.6383 },
  { id: "arctic_center",name: "Arctic Circle Center",   lat: 66.550008, lon: 15.327011 }
];

export function createPolarPoints() {
  const group = new THREE.Group();

  POLAR_CONTROL_POINTS.forEach(p => {
    const { x, z } = aeProject(p.lat, p.lon);
    const geometry = new THREE.SphereGeometry(0.15, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, 0, z);
    // Fase 2-forberedelse: userData som bro til kommende Excel-binding
    mesh.userData = { id: p.id, name: p.name, lat: p.lat, lon: p.lon, type: 'polar_control_point' };
    group.add(mesh);
  });

  return group;
}
