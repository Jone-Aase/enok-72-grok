// AEProjection.js — reference implementation from v44 — do not modify

// KONSTANTER — verifiserte tall
const R_EQUATOR_KM = 10001.47;            // GE-radius (måltall)
const R_OUTER_KM   = 31420.55;            // Ny ytterring = halve omkretsen (= ny R)
const SCALE = 1 / 1000;                   // 1 enhet = 1000 km
const R_EQUATOR = R_EQUATOR_KM * SCALE;   // ≈ 10.0
const R_OUTER   = R_OUTER_KM   * SCALE;   // ≈ 31.4

// AE-projeksjon: lat -> radius (lineær, fra polen ut)
function latToR(lat) {
  return R_OUTER * (90 - lat) / 180;
}

// (lat, lon) -> { x, z } på disken (y = 0)
function aeProject(lat, lon) {
  const r = latToR(lat);
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

export { aeProject, latToR, R_OUTER, R_EQUATOR, SCALE };
