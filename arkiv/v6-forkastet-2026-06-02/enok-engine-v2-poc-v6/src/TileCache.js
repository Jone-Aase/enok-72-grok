// TileCache.js — LRU-cache for Kartverket-tiles (textures + meshes)
// Hindrer at samme tile lastes på nytt når kameraet beveger seg.

import * as THREE from 'three';

const MAX_CACHE_SIZE = 500; // ~500 tiles i minne — ca 50 MB ved 100 KB per tile

class TileCache {
  constructor() {
    this.textures = new Map(); // key "z/x/y" -> { texture, lastAccess }
    this.meshes = new Map();   // key "z/x/y/mode" -> { mesh, lastAccess }
    this.loading = new Map();  // key "z/x/y" -> Promise (for å unngå doble requests)
  }

  tileKey(z, x, y) { return `${z}/${x}/${y}`; }
  meshKey(z, x, y, mode) { return `${z}/${x}/${y}/${mode}`; }

  async getTexture(z, x, y) {
    const key = this.tileKey(z, x, y);

    // Hvis allerede cached: returner direkte
    if (this.textures.has(key)) {
      const entry = this.textures.get(key);
      entry.lastAccess = Date.now();
      return entry.texture;
    }

    // Hvis allerede laster: vent på samme promise
    if (this.loading.has(key)) {
      return this.loading.get(key);
    }

    // Start ny lasting
    const url = `https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/${z}/${y}/${x}.png`;
    const promise = new THREE.TextureLoader().loadAsync(url).then(texture => {
      this.textures.set(key, { texture, lastAccess: Date.now() });
      this.loading.delete(key);
      this._evictIfNeeded();
      return texture;
    }).catch(err => {
      this.loading.delete(key);
      throw err;
    });

    this.loading.set(key, promise);
    return promise;
  }

  getMesh(z, x, y, mode) {
    const key = this.meshKey(z, x, y, mode);
    if (this.meshes.has(key)) {
      const entry = this.meshes.get(key);
      entry.lastAccess = Date.now();
      return entry.mesh;
    }
    return null;
  }

  setMesh(z, x, y, mode, mesh) {
    const key = this.meshKey(z, x, y, mode);
    this.meshes.set(key, { mesh, lastAccess: Date.now() });
    this._evictIfNeeded();
  }

  _evictIfNeeded() {
    // Fjern eldste hvis vi har for mange
    if (this.textures.size > MAX_CACHE_SIZE) {
      const entries = Array.from(this.textures.entries());
      entries.sort((a, b) => a[1].lastAccess - b[1].lastAccess);
      const toRemove = entries.slice(0, entries.length - MAX_CACHE_SIZE);
      for (const [key, entry] of toRemove) {
        entry.texture.dispose();
        this.textures.delete(key);
      }
    }
    if (this.meshes.size > MAX_CACHE_SIZE * 2) { // mesh-cache større pga flere modi per tile
      const entries = Array.from(this.meshes.entries());
      entries.sort((a, b) => a[1].lastAccess - b[1].lastAccess);
      const toRemove = entries.slice(0, entries.length - MAX_CACHE_SIZE * 2);
      for (const [key, entry] of toRemove) {
        if (entry.mesh.geometry) entry.mesh.geometry.dispose();
        if (entry.mesh.material) {
          if (entry.mesh.material.map) entry.mesh.material.map = null; // ikke dispose, fortsatt brukt
          entry.mesh.material.dispose();
        }
        this.meshes.delete(key);
      }
    }
  }

  stats() {
    return {
      textures: this.textures.size,
      meshes: this.meshes.size,
      loading: this.loading.size
    };
  }
}

export const tileCache = new TileCache();
