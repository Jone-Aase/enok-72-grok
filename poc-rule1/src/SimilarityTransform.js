export function similarityFromPoints(sourcePoints, targetPoints) {
  if (sourcePoints.length !== targetPoints.length || sourcePoints.length < 2) {
    throw new Error('similarityFromPoints requires at least two matching point pairs');
  }

  const sourceCenter = centroid(sourcePoints);
  const targetCenter = centroid(targetPoints);

  let a = 0;
  let b = 0;
  let denom = 0;

  for (let i = 0; i < sourcePoints.length; i++) {
    const sx = sourcePoints[i].x - sourceCenter.x;
    const sz = sourcePoints[i].z - sourceCenter.z;
    const tx = targetPoints[i].x - targetCenter.x;
    const tz = targetPoints[i].z - targetCenter.z;
    a += sx * tx + sz * tz;
    b += sx * tz - sz * tx;
    denom += sx * sx + sz * sz;
  }

  const magnitude = Math.hypot(a, b);
  const scale = denom > 0 ? magnitude / denom : 1;
  const cos = magnitude > 0 ? a / magnitude : 1;
  const sin = magnitude > 0 ? b / magnitude : 0;

  return {
    scale,
    rotationRad: Math.atan2(sin, cos),
    cos,
    sin,
    sourceCenter,
    targetCenter,
    apply(point) {
      const x = point.x - sourceCenter.x;
      const z = point.z - sourceCenter.z;
      return {
        x: targetCenter.x + scale * (cos * x - sin * z),
        z: targetCenter.z + scale * (sin * x + cos * z)
      };
    }
  };
}

export function residuals(sourcePoints, targetPoints, transform) {
  return sourcePoints.map((source, i) => {
    const projected = transform.apply(source);
    const target = targetPoints[i];
    const dx = projected.x - target.x;
    const dz = projected.z - target.z;
    return { dx, dz, dist: Math.hypot(dx, dz) };
  });
}

function centroid(points) {
  const sum = points.reduce((acc, p) => ({ x: acc.x + p.x, z: acc.z + p.z }), { x: 0, z: 0 });
  return { x: sum.x / points.length, z: sum.z / points.length };
}
