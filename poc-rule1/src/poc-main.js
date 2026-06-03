import * as THREE from 'three';
import { createAEGrid } from './AEGrid.js';
import { createPolarPoints } from './PolarPoints.js';
import { aeProject } from './AEProjection.js';
import { bindTextureReference, createNorgeSingleSurface, setNorgeSurfaceMode } from './NorgeSingleSurface.js';

const canvas = document.getElementById('cv');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 500);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

scene.add(new THREE.AmbientLight(0xffffff, 1));
scene.add(createAEGrid());
scene.add(createPolarPoints());

let norgeSurface = null;
let focus = aeProject(66.55, 14.0);
camera.position.set(focus.x, 8, focus.z + 0.01);
lookAtFocus();

createNorgeSingleSurface().then(group => {
  bindTextureReference(group);
  norgeSurface = group;
  scene.add(group);
  window.__norgeSurface = group;
  globalThis.__norgeSurface = group;
  window.__rule1Ready = true;
  logCalibration(group);
});

function logCalibration(group) {
  const residuals = group.userData.residuals || [];
  console.log('%cRule 1 similarity surface loaded', 'color:#7ee787;font-weight:bold');
  console.log('Transform:', group.userData.transform);
  residuals.forEach((r, i) => {
    console.log(`Residual ${i}: world=${r.dist.toFixed(6)} dx=${r.dx.toFixed(6)} dz=${r.dz.toFixed(6)}`);
  });
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

function lookAtFocus() {
  camera.lookAt(focus.x, 0, focus.z);
}

window.addEventListener('wheel', event => {
  event.preventDefault();
  camera.position.y = Math.max(0.35, Math.min(120, camera.position.y - event.deltaY * 0.04));
  lookAtFocus();
}, { passive: false });

let dragging = false;
let lastX = 0;
let lastY = 0;

window.addEventListener('mousedown', event => {
  if (event.button !== 0) return;
  dragging = true;
  lastX = event.clientX;
  lastY = event.clientY;
});

window.addEventListener('mouseup', () => { dragging = false; });

window.addEventListener('mousemove', event => {
  if (!dragging) return;
  const dx = event.clientX - lastX;
  const dy = event.clientY - lastY;
  lastX = event.clientX;
  lastY = event.clientY;

  const scale = camera.position.y * 0.0016;
  focus.x -= dx * scale;
  focus.z -= dy * scale;
  camera.position.x = focus.x;
  camera.position.z = focus.z + 0.01;
  lookAtFocus();
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.setLayerMode = function setLayerMode(mode) {
  if (norgeSurface) setNorgeSurfaceMode(norgeSurface, mode);
  document.querySelectorAll('#tools button[id^="mode-"]').forEach(button => button.classList.remove('active'));
  const active = document.getElementById(`mode-${mode}`);
  if (active) active.classList.add('active');
};

window.flyTo = function flyTo(lat, lon, height) {
  focus = aeProject(lat, lon);
  camera.position.set(focus.x, height, focus.z + 0.01);
  lookAtFocus();
};

window.setLayerMode('normal');
