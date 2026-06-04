/*
 * lag3-threejs.js
 * Lag 3 — Three.js Snapshot Bridge (Visuell overlay)
 * 
 * Ren ES-modul. Bruker import * as THREE from 'three'.
 * 
 * Hard kill-switch: localStorage.setItem('enok72.lag3.disabled', '1')
 * 
 * Kollisjon med Lag 2: Sjekker window.__enok72__.lag2Exporting før snapshot.
 * Hvis flagget ikke finnes, behandles det som false.
 * 
 * Pikselidentitet: Tre sjekker i disable():
 *   1. map-container.innerHTML er identisk med før enable()
 *   2. Ingen nye <style> eller <link> noder lagt til <head>
 *   3. Ingen <canvas> elementer igjen i map-container
 */

import * as THREE from 'three';

let lag3 = {
  active: false,
  renderer: null,
  scene: null,
  camera: null,
  plane: null,
  texture: null,
  sun: null,
  sunLight: null,
  overlayDiv: null,
  canvas: null,
  raf: null,
  preEnableSnapshot: null
};

const KILL_SWITCH_KEY = 'enok72.lag3.disabled';

function isKillSwitchActive() {
  return localStorage.getItem(KILL_SWITCH_KEY) === '1';
}

function getLag2Exporting() {
  if (!window.__enok72__ || typeof window.__enok72__.lag2Exporting === 'undefined') {
    return false; // Treat as false if flag does not exist
  }
  return !!window.__enok72__.lag2Exporting;
}

async function initLag3() {
  if (isKillSwitchActive()) {
    console.warn('[Lag3] Hard kill-switch aktivert via localStorage. Lag 3 lastes ikke.');
    return false;
  }
  if (lag3.active) return true;

  const mapContainer = document.getElementById('map-container') || document.body;

  // Lagre tilstand før enable (pikselidentitet)
  lag3.preEnableSnapshot = {
    innerHTML: mapContainer.innerHTML,
    headStyleLinkCount: document.head.querySelectorAll('style, link').length,
    canvasCountInMap: mapContainer.querySelectorAll('canvas').length
  };

  lag3.overlayDiv = document.createElement('div');
  lag3.overlayDiv.id = 'lag3-threejs-overlay';
  lag3.overlayDiv.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:2;pointer-events:none;';

  lag3.canvas = document.createElement('canvas');
  lag3.overlayDiv.appendChild(lag3.canvas);
  mapContainer.appendChild(lag3.overlayDiv);

  lag3.renderer = new THREE.WebGLRenderer({ canvas: lag3.canvas, alpha: true, antialias: true });
  lag3.renderer.setSize(window.innerWidth, window.innerHeight);
  lag3.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  lag3.scene = new THREE.Scene();
  lag3.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 2000);
  lag3.camera.position.set(0, 280, 0);
  lag3.camera.lookAt(0, 0, 0);

  const ambient = new THREE.AmbientLight(0xffffff, 0.35);
  lag3.scene.add(ambient);

  lag3.sunLight = new THREE.DirectionalLight(0xfff4d9, 1.5);
  lag3.sunLight.position.set(0, 180, 0);
  lag3.scene.add(lag3.sunLight);

  const planeGeo = new THREE.PlaneGeometry(420, 420);
  const planeMat = new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 8 });
  lag3.plane = new THREE.Mesh(planeGeo, planeMat);
  lag3.plane.rotation.x = -Math.PI / 2;
  lag3.scene.add(lag3.plane);

  const sunGeo = new THREE.SphereGeometry(10, 32, 32);
  const sunMat = new THREE.MeshBasicMaterial({ color: 0xffee88 });
  lag3.sun = new THREE.Mesh(sunGeo, sunMat);
  lag3.scene.add(lag3.sun);

  lag3.active = true;
  lag3.overlayDiv.style.display = 'block';

  window.addEventListener('resize', onLag3Resize);

  console.log('[Lag3] Initialisert som visuelt overlay (z-index 2, ES-modul).');
  return true;
}

async function updateSnapshot() {
  if (!lag3.active) return;
  if (getLag2Exporting()) {
    console.log('[Lag3] Lag 2 eksporterer – venter med snapshot.');
    return;
  }
  if (!window.html2canvas) {
    console.warn('[Lag3] html2canvas ikke lastet.');
    return;
  }

  const mapContainer = document.getElementById('map-container') || document.body;

  try {
    const snap = await html2canvas(mapContainer, {
      scale: 1.2,
      useCORS: true,
      logging: false,
      ignoreElements: (el) => el.id === 'lag3-threejs-overlay'
    });

    if (lag3.texture) lag3.texture.dispose();
    lag3.texture = new THREE.CanvasTexture(snap);
    lag3.plane.material.map = lag3.texture;
    lag3.plane.material.needsUpdate = true;

    console.log('[Lag3] Snapshot oppdatert.');
  } catch (e) {
    console.error('[Lag3] Snapshot feilet:', e);
  }
}

function startAnimation() {
  if (!lag3.active) return;
  let angle = 0;
  function animate() {
    if (!lag3.active) return;
    angle += 0.004;
    if (lag3.sun) {
      lag3.sun.position.x = Math.cos(angle) * 160;
      lag3.sun.position.z = Math.sin(angle) * 160;
      lag3.sun.position.y = 70;
    }
    if (lag3.sunLight && lag3.sun) lag3.sunLight.position.copy(lag3.sun.position);
    lag3.renderer.render(lag3.scene, lag3.camera);
    lag3.raf = requestAnimationFrame(animate);
  }
  animate();
}

function destroyLag3() {
  if (!lag3.active) return;

  if (lag3.raf) cancelAnimationFrame(lag3.raf);

  const mapContainer = document.getElementById('map-container') || document.body;

  if (lag3.overlayDiv && lag3.overlayDiv.parentNode) {
    lag3.overlayDiv.parentNode.removeChild(lag3.overlayDiv);
  }

  // === Pikselidentitets-verifikasjon (tre sjekker) ===
  const currentInner = mapContainer.innerHTML;
  const currentHeadCount = document.head.querySelectorAll('style, link').length;
  const currentCanvasCount = mapContainer.querySelectorAll('canvas').length;

  const pre = lag3.preEnableSnapshot || {};

  const check1 = currentInner === pre.innerHTML;
  const check2 = currentHeadCount === pre.headStyleLinkCount;
  const check3 = currentCanvasCount === pre.canvasCountInMap;

  if (!check1 || !check2 || !check3) {
    console.warn('[Lag3] Pikselidentitet advarsel etter disable():', { check1, check2, check3 });
  } else {
    console.log('[Lag3] Pikselidentitet bekreftet (3/3 sjekker bestått).');
  }

  if (lag3.renderer) lag3.renderer.dispose();
  if (lag3.texture) lag3.texture.dispose();
  if (lag3.scene) lag3.scene.clear();

  window.removeEventListener('resize', onLag3Resize);

  Object.keys(lag3).forEach(k => lag3[k] = null);
  lag3.active = false;

  console.log('[Lag3] Deaktivert og ryddet. Måle-modus er tilbake.');
}

function onLag3Resize() {
  if (!lag3.active || !lag3.renderer || !lag3.camera) return;
  lag3.renderer.setSize(window.innerWidth, window.innerHeight);
  lag3.camera.aspect = window.innerWidth / window.innerHeight;
  lag3.camera.updateProjectionMatrix();
}

window.Lag3 = {
  enable: async () => {
    const ok = await initLag3();
    if (ok) {
      await updateSnapshot();
      startAnimation();
    }
    return ok;
  },
  disable: () => destroyLag3(),
  updateSnapshot: () => updateSnapshot(),
  isActive: () => lag3.active
};

console.log('[Lag3] ES-modul lastet. Bruk window.Lag3.enable() / .disable()');
