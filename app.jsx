const { useState, useRef, useEffect, useCallback, useMemo } = React;

// Inline SVG Icon component — no external icon library needed
const ICON_PATHS = {
  sun: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m12.73-12.73l1.41-1.41M12 6a6 6 0 100 12 6 6 0 000-12z",
  play: "M6 4l12 8-12 8V4z",
  pause: "M10 4H6v16h4V4zm8 0h-4v16h4V4z",
  maximize: "M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3",
  settings: "M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z M12 8a4 4 0 100 8 4 4 0 000-8z",
  "mouse-pointer": "M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z M13 13l6 6",
  crosshair: "M12 2v4m0 12v4M2 12h4m12 0h4 M12 8a4 4 0 100 8 4 4 0 000-8z",
  rocket: "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0 M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
  "trash-2": "M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2 M10 11v6m4-6v6",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  circle: "M12 12m-10 0a10 10 0 1020 0 10 10 0 10-20 0",
  "circle-dot": "M12 12m-10 0a10 10 0 1020 0 10 10 0 10-20 0 M12 12m-1 0a1 1 0 102 0 1 1 0 10-2 0",
  moon: "M12 3a6 6 0 009 9 9 9 0 11-9-9z",
  dot: "M12 12m-2 0a2 2 0 104 0 2 2 0 10-4 0",
  orbit: "M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0 M12 2a10 10 0 010 20 10 10 0 010-20",
  sparkles: "M9.937 15.5A2 2 0 008.5 14.063l-6.135-1.582a.5.5 0 010-.962L8.5 9.936A2 2 0 009.937 8.5l1.582-6.135a.5.5 0 01.963 0L14.063 8.5A2 2 0 0015.5 9.937l6.135 1.581a.5.5 0 010 .964L15.5 14.063a2 2 0 00-1.437 1.437l-1.582 6.135a.5.5 0 01-.963 0z M20 3v4m2-2h-4 M4 17v2m1-1H3",
  eye: "M2.062 12.348a1 1 0 010-.696 10.75 10.75 0 0119.876 0 1 1 0 010 .696 10.75 10.75 0 01-19.876 0 M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0",
  x: "M18 6L6 18M6 6l12 12",
  "chevron-down": "M6 9l6 6 6-6",
  "chevron-up": "M18 15l-6-6-6 6",
};

function Icon({ name, size = 18, className = "" }) {
  const d = ICON_PATHS[name];
  if (!d) return null;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={{ display: "inline-block", verticalAlign: "middle" }}>
      <path d={d} />
    </svg>
  );
}

// ─────────────────────────────────────────
// Constants & Configuration
// ─────────────────────────────────────────
const G_DEFAULT = 40;
const SOFTENING = 2.0;
const FIXED_DT = 1 / 60;
const MAX_BODIES = 2000;
const TRAIL_LENGTH = 120;
const STARFIELD_COUNT = 8000;

const BODY_TYPES = {
  black_hole: {
    label: "Black Hole", icon: "circle-dot",
    defaultMass: 50000, defaultRadius: 3,
    color: "#1a0a2e", emissive: "#4a00e0",
    minMass: 10000, maxMass: 200000, minRadius: 1.5, maxRadius: 8,
  },
  star: {
    label: "Star", icon: "star",
    defaultMass: 500, defaultRadius: 2.5,
    color: "#ffdd44", emissive: "#ffaa00",
    minMass: 50, maxMass: 5000, minRadius: 0.8, maxRadius: 5,
  },
  planet_rocky: {
    label: "Rocky Planet", icon: "circle",
    defaultMass: 5, defaultRadius: 0.8,
    color: "#4a90a4", emissive: "#000000",
    minMass: 0.5, maxMass: 50, minRadius: 0.3, maxRadius: 2,
  },
  planet_gas: {
    label: "Gas Giant", icon: "circle",
    defaultMass: 30, defaultRadius: 1.8,
    color: "#c4956a", emissive: "#000000",
    minMass: 5, maxMass: 200, minRadius: 1, maxRadius: 4,
  },
  moon: {
    label: "Moon", icon: "moon",
    defaultMass: 0.3, defaultRadius: 0.35,
    color: "#aaaaaa", emissive: "#000000",
    minMass: 0.01, maxMass: 2, minRadius: 0.1, maxRadius: 0.8,
  },
  asteroid: {
    label: "Asteroid", icon: "dot",
    defaultMass: 0.01, defaultRadius: 0.15,
    color: "#887766", emissive: "#000000",
    minMass: 0.001, maxMass: 0.5, minRadius: 0.05, maxRadius: 0.3,
  },
};

const STAR_COLORS = [
  { temp: 3000, color: new THREE.Color(1.0, 0.4, 0.2) },
  { temp: 5000, color: new THREE.Color(1.0, 0.7, 0.3) },
  { temp: 6000, color: new THREE.Color(1.0, 0.95, 0.8) },
  { temp: 8000, color: new THREE.Color(0.8, 0.85, 1.0) },
  { temp: 15000, color: new THREE.Color(0.6, 0.7, 1.0) },
  { temp: 30000, color: new THREE.Color(0.5, 0.55, 1.0) },
];

function tempToColor(temp) {
  for (let i = 0; i < STAR_COLORS.length - 1; i++) {
    if (temp <= STAR_COLORS[i + 1].temp) {
      const t = (temp - STAR_COLORS[i].temp) / (STAR_COLORS[i + 1].temp - STAR_COLORS[i].temp);
      return new THREE.Color().lerpColors(STAR_COLORS[i].color, STAR_COLORS[i + 1].color, Math.max(0, Math.min(1, t)));
    }
  }
  return STAR_COLORS[STAR_COLORS.length - 1].color.clone();
}

const PLANET_COLORS_ROCKY = ["#6b8e9b", "#a0522d", "#cd853f", "#8fbc8f", "#b0c4de", "#d2691e", "#708090", "#bc8f8f", "#4682b4"];
const PLANET_COLORS_GAS = ["#daa520", "#cd853f", "#d2b48c", "#f4a460", "#c4956a", "#e8c490", "#8B7355", "#DAA06D"];

let bodyIdCounter = 0;
function nextId() { return ++bodyIdCounter; }

// ─────────────────────────────────────────
// Physics Engine
// ─────────────────────────────────────────
function computeGravity(bodies, G) {
  const n = bodies.length;
  const ax = new Float64Array(n);
  const ay = new Float64Array(n);
  const az = new Float64Array(n);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = bodies[j].px - bodies[i].px;
      const dy = bodies[j].py - bodies[i].py;
      const dz = bodies[j].pz - bodies[i].pz;
      const distSq = dx * dx + dy * dy + dz * dz + SOFTENING * SOFTENING;
      const dist = Math.sqrt(distSq);
      const force = G / (distSq * dist);

      const fxj = dx * force * bodies[j].mass;
      const fyj = dy * force * bodies[j].mass;
      const fzj = dz * force * bodies[j].mass;

      const fxi = dx * force * bodies[i].mass;
      const fyi = dy * force * bodies[i].mass;
      const fzi = dz * force * bodies[i].mass;

      ax[i] += fxj; ay[i] += fyj; az[i] += fzj;
      ax[j] -= fxi; ay[j] -= fyi; az[j] -= fzi;
    }
  }
  return { ax, ay, az };
}

function stepPhysics(bodies, dt, G) {
  if (bodies.length === 0) return bodies;

  const { ax, ay, az } = computeGravity(bodies, G);

  for (let i = 0; i < bodies.length; i++) {
    const b = bodies[i];
    b.vx += ax[i] * dt;
    b.vy += ay[i] * dt;
    b.vz += az[i] * dt;
    b.px += b.vx * dt;
    b.py += b.vy * dt;
    b.pz += b.vz * dt;
  }

  // Collision detection & merging
  const toRemove = new Set();
  for (let i = 0; i < bodies.length; i++) {
    if (toRemove.has(i)) continue;
    for (let j = i + 1; j < bodies.length; j++) {
      if (toRemove.has(j)) continue;
      const dx = bodies[j].px - bodies[i].px;
      const dy = bodies[j].py - bodies[i].py;
      const dz = bodies[j].pz - bodies[i].pz;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const minDist = bodies[i].radius + bodies[j].radius;
      if (dist < minDist * 0.7) {
        const [keep, remove] = bodies[i].mass >= bodies[j].mass ? [i, j] : [j, i];
        const a = bodies[keep];
        const b = bodies[remove];
        const totalMass = a.mass + b.mass;
        a.vx = (a.vx * a.mass + b.vx * b.mass) / totalMass;
        a.vy = (a.vy * a.mass + b.vy * b.mass) / totalMass;
        a.vz = (a.vz * a.mass + b.vz * b.mass) / totalMass;
        a.mass = totalMass;
        a.radius = Math.cbrt(a.radius ** 3 + b.radius ** 3);
        toRemove.add(remove);
      }
    }
  }

  if (toRemove.size > 0) return bodies.filter((_, i) => !toRemove.has(i));
  return bodies;
}

// ─────────────────────────────────────────
// Body Creation Helpers
// ─────────────────────────────────────────
function createBody(type, mass, radius, px, py, pz, vx, vy, vz, extra = {}) {
  const cfg = BODY_TYPES[type];
  let color = extra.color || cfg.color;
  let temperature = extra.temperature || 5500;

  if (type === "star") {
    temperature = extra.temperature || 3000 + Math.random() * 27000;
    const c = tempToColor(temperature);
    color = "#" + c.getHexString();
  } else if (type === "planet_rocky") {
    color = extra.color || PLANET_COLORS_ROCKY[Math.floor(Math.random() * PLANET_COLORS_ROCKY.length)];
  } else if (type === "planet_gas") {
    color = extra.color || PLANET_COLORS_GAS[Math.floor(Math.random() * PLANET_COLORS_GAS.length)];
  }

  return {
    id: nextId(), type, mass, radius,
    px, py, pz,
    vx: vx || 0, vy: vy || 0, vz: vz || 0,
    color, temperature, trail: [],
    ...extra,
  };
}

function generateSolarSystem(cx, cy, cz, cvx, cvy, cvz, G) {
  const bodies = [];
  const starMass = 300 + Math.random() * 700;
  const starTemp = 3500 + Math.random() * 20000;
  const starColor = tempToColor(starTemp);

  bodies.push(createBody("star", starMass, 2 + Math.random() * 1.5, cx, cy, cz, cvx || 0, cvy || 0, cvz || 0, {
    temperature: starTemp, color: "#" + starColor.getHexString(),
  }));

  const numPlanets = 3 + Math.floor(Math.random() * 6);
  for (let i = 0; i < numPlanets; i++) {
    const dist = 15 + i * (8 + Math.random() * 6);
    const angle = Math.random() * Math.PI * 2;
    const isGas = i >= numPlanets - 2 && Math.random() > 0.3;
    const type = isGas ? "planet_gas" : "planet_rocky";
    const cfg = BODY_TYPES[type];
    const mass = cfg.defaultMass * (0.5 + Math.random());
    const radius = cfg.defaultRadius * (0.6 + Math.random() * 0.8);

    const px = cx + Math.cos(angle) * dist;
    const pz = cz + Math.sin(angle) * dist;
    const py = cy + (Math.random() - 0.5) * 1;

    const orbitalSpeed = Math.sqrt((G * starMass) / dist);
    const vx = (cvx || 0) + -Math.sin(angle) * orbitalSpeed;
    const vz = (cvz || 0) + Math.cos(angle) * orbitalSpeed;

    bodies.push(createBody(type, mass, radius, px, py, pz, vx, 0, vz));

    if (Math.random() > 0.5) {
      const numMoons = 1 + Math.floor(Math.random() * 2);
      for (let m = 0; m < numMoons; m++) {
        const moonDist = radius * 3 + m * 2 + Math.random() * 2;
        const moonAngle = Math.random() * Math.PI * 2;
        const moonMass = 0.05 + Math.random() * 0.3;
        const moonRadius = 0.15 + Math.random() * 0.25;

        const mpx = px + Math.cos(moonAngle) * moonDist;
        const mpz = pz + Math.sin(moonAngle) * moonDist;

        const moonOrbitalSpeed = Math.sqrt((G * mass) / moonDist);
        const mvx = vx + -Math.sin(moonAngle) * moonOrbitalSpeed;
        const mvz = vz + Math.cos(moonAngle) * moonOrbitalSpeed;

        bodies.push(createBody("moon", moonMass, moonRadius, mpx, py, mpz, mvx, 0, mvz));
      }
    }
  }
  return bodies;
}

function generateGalaxy(cx, cy, cz, G) {
  const bodies = [];
  const bhMass = 80000 + Math.random() * 40000;
  bodies.push(createBody("black_hole", bhMass, 3.5, cx, cy, cz, 0, 0, 0));

  const numStars = 250 + Math.floor(Math.random() * 150);
  const numArms = 2 + Math.floor(Math.random() * 3);
  const armSpread = 0.4 + Math.random() * 0.3;

  for (let i = 0; i < numStars; i++) {
    const arm = i % numArms;
    const armAngle = (arm / numArms) * Math.PI * 2;
    const distance = 20 + Math.random() * 450;
    const angle = armAngle + Math.log(distance + 1) * 1.2 + (Math.random() - 0.5) * armSpread;

    const x = cx + Math.cos(angle) * distance;
    const z = cz + Math.sin(angle) * distance;
    const y = cy + (Math.random() - 0.5) * distance * 0.06;

    const orbitalSpeed = Math.sqrt((G * bhMass) / Math.max(distance, 10)) * 0.6;
    const vx = -Math.sin(angle) * orbitalSpeed;
    const vz = Math.cos(angle) * orbitalSpeed;

    const temp = 3000 + Math.random() * 27000;
    const col = tempToColor(temp);
    const mass = 1 + Math.random() * 8;
    const radius = 0.4 + Math.random() * 1.2;

    bodies.push(createBody("star", mass, radius, x, y, z, vx, 0, vz, {
      temperature: temp, color: "#" + col.getHexString(),
    }));
  }
  return bodies;
}

// ─────────────────────────────────────────
// Three.js Scene Manager
// ─────────────────────────────────────────
class SceneManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100000);
    this.camera.position.set(0, 80, 120);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    this.ambientLight = new THREE.AmbientLight(0x111133, 0.5);
    this.scene.add(this.ambientLight);

    this.bodyMeshes = new Map();
    this.glowSprites = new Map();
    this.trailLines = new Map();
    this.accretionDisks = new Map();
    this.pointLights = new Map();

    this.sphereGeo = new THREE.SphereGeometry(1, 24, 16);
    this.lowSphereGeo = new THREE.SphereGeometry(1, 8, 6);
    this.glowTexture = this._createGlowTexture();

    this._createStarfield();
    this._createLaunchArrow();
    this._createSelectionRing();

    this.raycaster = new THREE.Raycaster();

    this.cameraTarget = new THREE.Vector3(0, 0, 0);
    this.cameraDistance = 150;
    this.cameraPhi = Math.PI / 4;
    this.cameraTheta = 0;
    this.followTarget = null;
    this._updateCameraPosition();
  }

  _createGlowTexture() {
    const size = 128;
    const c = document.createElement("canvas");
    c.width = size; c.height = size;
    const ctx = c.getContext("2d");
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.1, "rgba(255,255,255,0.8)");
    g.addColorStop(0.3, "rgba(255,220,150,0.3)");
    g.addColorStop(0.6, "rgba(255,150,50,0.05)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }

  _createStarfield() {
    const positions = new Float32Array(STARFIELD_COUNT * 3);
    const colors = new Float32Array(STARFIELD_COUNT * 3);

    for (let i = 0; i < STARFIELD_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 15000 + Math.random() * 35000;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const brightness = 0.3 + Math.random() * 0.7;
      const tint = Math.random();
      if (tint > 0.95) {
        colors[i * 3] = brightness; colors[i * 3 + 1] = brightness * 0.7; colors[i * 3 + 2] = brightness * 0.5;
      } else if (tint > 0.9) {
        colors[i * 3] = brightness * 0.6; colors[i * 3 + 1] = brightness * 0.7; colors[i * 3 + 2] = brightness;
      } else {
        colors[i * 3] = brightness; colors[i * 3 + 1] = brightness; colors[i * 3 + 2] = brightness;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({ size: 2, sizeAttenuation: false, vertexColors: true, transparent: true, opacity: 0.8, depthWrite: false });
    this.scene.add(new THREE.Points(geo, mat));
  }

  _createLaunchArrow() {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6), 3));
    const mat = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.8 });
    this.launchArrow = new THREE.Line(geo, mat);
    this.launchArrow.visible = false;
    this.scene.add(this.launchArrow);
  }

  _createSelectionRing() {
    const geo = new THREE.RingGeometry(1, 1.2, 48);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, side: THREE.DoubleSide, transparent: true, opacity: 0.6, depthTest: false });
    this.selectionRing = new THREE.Mesh(geo, mat);
    this.selectionRing.visible = false;
    this.selectionRing.rotation.x = -Math.PI / 2;
    this.scene.add(this.selectionRing);
  }

  _updateCameraPosition() {
    const x = this.cameraTarget.x + this.cameraDistance * Math.sin(this.cameraPhi) * Math.cos(this.cameraTheta);
    const y = this.cameraTarget.y + this.cameraDistance * Math.cos(this.cameraPhi);
    const z = this.cameraTarget.z + this.cameraDistance * Math.sin(this.cameraPhi) * Math.sin(this.cameraTheta);
    this.camera.position.set(x, y, z);
    this.camera.lookAt(this.cameraTarget);
  }

  pan(dx, dz) {
    const right = new THREE.Vector3();
    right.crossVectors(this.camera.up, new THREE.Vector3().subVectors(this.cameraTarget, this.camera.position)).normalize();
    const forward = new THREE.Vector3().subVectors(this.cameraTarget, this.camera.position);
    forward.y = 0;
    forward.normalize();
    this.cameraTarget.add(right.multiplyScalar(-dx * this.cameraDistance * 0.002));
    this.cameraTarget.add(forward.multiplyScalar(dz * this.cameraDistance * 0.002));
    this.followTarget = null;
    this._updateCameraPosition();
  }

  orbit(dTheta, dPhi) {
    this.cameraTheta += dTheta;
    this.cameraPhi = Math.max(0.1, Math.min(Math.PI - 0.1, this.cameraPhi + dPhi));
    this._updateCameraPosition();
  }

  zoom(factor) {
    this.cameraDistance = Math.max(3, Math.min(50000, this.cameraDistance * factor));
    this._updateCameraPosition();
  }

  followBody(body) {
    if (body) {
      this.followTarget = body.id;
      this.cameraTarget.set(body.px, body.py, body.pz);
      this._updateCameraPosition();
    }
  }

  resetView() {
    this.cameraTarget.set(0, 0, 0);
    this.cameraDistance = 150;
    this.cameraPhi = Math.PI / 4;
    this.cameraTheta = 0;
    this.followTarget = null;
    this._updateCameraPosition();
  }

  getWorldPosition(screenX, screenY, groundY = 0) {
    const ndc = new THREE.Vector2((screenX / window.innerWidth) * 2 - 1, -(screenY / window.innerHeight) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -groundY);
    const target = new THREE.Vector3();
    this.raycaster.ray.intersectPlane(plane, target);
    return target;
  }

  raycastBodies(screenX, screenY, bodies) {
    const ndc = new THREE.Vector2((screenX / window.innerWidth) * 2 - 1, -(screenY / window.innerHeight) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.camera);
    const meshes = [];
    const meshToBody = new Map();
    for (const b of bodies) {
      const mesh = this.bodyMeshes.get(b.id);
      if (mesh) { meshes.push(mesh); meshToBody.set(mesh, b); }
    }
    const intersects = this.raycaster.intersectObjects(meshes);
    return intersects.length > 0 ? meshToBody.get(intersects[0].object) : null;
  }

  updateBodies(bodies, showTrails, selectedId) {
    const existingIds = new Set();

    for (const body of bodies) {
      existingIds.add(body.id);
      this._updateOrCreateBody(body);
      if (showTrails && body.type !== "asteroid") {
        this._updateTrail(body);
      }
    }

    // Cleanup removed bodies
    for (const [id] of this.bodyMeshes) {
      if (!existingIds.has(id)) {
        this._removeBodyMeshes(id);
      }
    }

    // Selection ring
    if (selectedId != null) {
      const sb = bodies.find(b => b.id === selectedId);
      if (sb) {
        this.selectionRing.visible = true;
        this.selectionRing.position.set(sb.px, sb.py + 0.1, sb.pz);
        const s = sb.radius * 2.5;
        this.selectionRing.scale.set(s, s, s);
      } else {
        this.selectionRing.visible = false;
      }
    } else {
      this.selectionRing.visible = false;
    }

    // Follow target
    if (this.followTarget) {
      const target = bodies.find(b => b.id === this.followTarget);
      if (target) {
        this.cameraTarget.set(target.px, target.py, target.pz);
        this._updateCameraPosition();
      } else {
        this.followTarget = null;
      }
    }
  }

  _removeBodyMeshes(id) {
    const mesh = this.bodyMeshes.get(id);
    if (mesh) { this.scene.remove(mesh); this.bodyMeshes.delete(id); }
    const glow = this.glowSprites.get(id);
    if (glow) { this.scene.remove(glow); this.glowSprites.delete(id); }
    const trail = this.trailLines.get(id);
    if (trail) { this.scene.remove(trail); this.trailLines.delete(id); }
    const disk = this.accretionDisks.get(id);
    if (disk) { this.scene.remove(disk); this.accretionDisks.delete(id); }
    const light = this.pointLights.get(id);
    if (light) { this.scene.remove(light); this.pointLights.delete(id); }
  }

  _updateOrCreateBody(body) {
    let mesh = this.bodyMeshes.get(body.id);

    if (!mesh) {
      // Create mesh
      const color = new THREE.Color(body.color);
      let material;
      if (body.type === "star") {
        material = new THREE.MeshBasicMaterial({ color });
      } else if (body.type === "black_hole") {
        material = new THREE.MeshBasicMaterial({ color: 0x050510 });
      } else {
        material = new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.2 });
      }

      const geo = body.type === "asteroid" ? this.lowSphereGeo : this.sphereGeo;
      mesh = new THREE.Mesh(geo, material);
      this.bodyMeshes.set(body.id, mesh);
      this.scene.add(mesh);

      // Glow for stars and black holes
      if (body.type === "star" || body.type === "black_hole") {
        const glowColor = new THREE.Color(body.type === "black_hole" ? "#7c3aed" : body.color);
        const spriteMat = new THREE.SpriteMaterial({
          map: this.glowTexture, color: glowColor, transparent: true,
          opacity: body.type === "black_hole" ? 0.6 : 0.45,
          blending: THREE.AdditiveBlending, depthWrite: false,
        });
        const sprite = new THREE.Sprite(spriteMat);
        const scale = body.radius * (body.type === "black_hole" ? 10 : 6);
        sprite.scale.set(scale, scale, 1);
        this.glowSprites.set(body.id, sprite);
        this.scene.add(sprite);
      }

      // Point light for stars
      if (body.type === "star") {
        const light = new THREE.PointLight(new THREE.Color(body.color), body.radius * 1.5, body.radius * 60);
        this.pointLights.set(body.id, light);
        this.scene.add(light);
      }

      // Accretion disk for black holes
      if (body.type === "black_hole") {
        const diskGeo = new THREE.RingGeometry(body.radius * 2, body.radius * 7, 64);
        const diskMat = new THREE.MeshBasicMaterial({
          color: 0xff6600, side: THREE.DoubleSide, transparent: true,
          opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false,
        });
        const disk = new THREE.Mesh(diskGeo, diskMat);
        disk.rotation.x = Math.PI / 2 + 0.2;
        this.accretionDisks.set(body.id, disk);
        this.scene.add(disk);
      }
    }

    // Update positions
    mesh.position.set(body.px, body.py, body.pz);
    mesh.scale.setScalar(body.radius);

    const glow = this.glowSprites.get(body.id);
    if (glow) glow.position.set(body.px, body.py, body.pz);

    const disk = this.accretionDisks.get(body.id);
    if (disk) { disk.position.set(body.px, body.py, body.pz); disk.rotation.z += 0.008; }

    const light = this.pointLights.get(body.id);
    if (light) light.position.set(body.px, body.py, body.pz);
  }

  _updateTrail(body) {
    body.trail.push({ x: body.px, y: body.py, z: body.pz });
    if (body.trail.length > TRAIL_LENGTH) body.trail.shift();
    if (body.trail.length < 2) return;

    let line = this.trailLines.get(body.id);
    if (line) this.scene.remove(line);

    const points = body.trail.map(p => new THREE.Vector3(p.x, p.y, p.z));
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const colors = new Float32Array(points.length * 3);
    const c = new THREE.Color(body.type === "star" ? body.color : "#4488aa");
    for (let i = 0; i < points.length; i++) {
      const alpha = i / points.length;
      colors[i * 3] = c.r * alpha;
      colors[i * 3 + 1] = c.g * alpha;
      colors[i * 3 + 2] = c.b * alpha;
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.4, depthWrite: false });
    line = new THREE.Line(geo, mat);
    this.trailLines.set(body.id, line);
    this.scene.add(line);
  }

  showLaunchArrow(from, to) {
    if (!from || !to) { this.launchArrow.visible = false; return; }
    this.launchArrow.visible = true;
    const pos = this.launchArrow.geometry.attributes.position;
    pos.array[0] = from.x; pos.array[1] = from.y; pos.array[2] = from.z;
    pos.array[3] = to.x; pos.array[4] = to.y; pos.array[5] = to.z;
    pos.needsUpdate = true;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  dispose() {
    this.renderer.dispose();
  }
}

// ─────────────────────────────────────────
// React Application
// ─────────────────────────────────────────
const TOOLS = [
  { id: "select", label: "Select", icon: "mouse-pointer" },
  { id: "place", label: "Place Body", icon: "crosshair" },
  { id: "launch", label: "Launch", icon: "rocket" },
  { id: "delete", label: "Delete", icon: "trash-2" },
];

const SPEEDS = [
  { label: "0.1x", value: 0.1 },
  { label: "0.5x", value: 0.5 },
  { label: "1x", value: 1 },
  { label: "5x", value: 5 },
  { label: "10x", value: 10 },
  { label: "50x", value: 50 },
];

function App() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const bodiesRef = useRef([]);
  const animFrameRef = useRef(null);
  const physicsAccum = useRef(0);

  const [bodies, setBodies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [activeTool, setActiveTool] = useState("select");
  const [placeType, setPlaceType] = useState("star");
  const [placeMass, setPlaceMass] = useState(BODY_TYPES.star.defaultMass);
  const [placeRadius, setPlaceRadius] = useState(BODY_TYPES.star.defaultRadius);
  const [isPaused, setIsPaused] = useState(false);
  const [timeScale, setTimeScale] = useState(1);
  const [showTrails, setShowTrails] = useState(true);
  const [gravityG, setGravityG] = useState(G_DEFAULT);
  const [bodyCount, setBodyCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [showTypeMenu, setShowTypeMenu] = useState(false);

  const mouseState = useRef({
    isDown: false, isDragging: false,
    startX: 0, startY: 0, button: -1,
    launchStart: null, lastClickTime: 0,
  });

  // Initialize Three.js
  useEffect(() => {
    if (!canvasRef.current) return;
    const scene = new SceneManager(canvasRef.current);
    sceneRef.current = scene;
    const handleResize = () => scene.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      scene.dispose();
    };
  }, []);

  // Main loop
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    let lastTime = performance.now();

    function loop(now) {
      animFrameRef.current = requestAnimationFrame(loop);
      const realDt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isPaused) {
        physicsAccum.current += realDt * timeScale;
        let steps = 0;
        const maxSteps = 20;
        while (physicsAccum.current >= FIXED_DT && steps < maxSteps) {
          bodiesRef.current = stepPhysics(bodiesRef.current, FIXED_DT, gravityG);
          physicsAccum.current -= FIXED_DT;
          steps++;
        }
        if (steps >= maxSteps) physicsAccum.current = 0;
      }

      scene.updateBodies(bodiesRef.current, showTrails, selectedId);
      scene.render();

      // Update React state periodically for UI
      if (Math.floor(now / 250) !== Math.floor((now - realDt * 1000) / 250)) {
        setBodies([...bodiesRef.current]);
        setBodyCount(bodiesRef.current.length);
      }
    }

    animFrameRef.current = requestAnimationFrame(loop);
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [isPaused, timeScale, gravityG, showTrails, selectedId]);

  const addBodies = useCallback((newBodies) => {
    bodiesRef.current = [...bodiesRef.current, ...newBodies].slice(0, MAX_BODIES);
    setBodies([...bodiesRef.current]);
    setBodyCount(bodiesRef.current.length);
  }, []);

  const clearAll = useCallback(() => {
    bodiesRef.current = [];
    setBodies([]);
    setBodyCount(0);
    setSelectedId(null);
    if (sceneRef.current) {
      for (const [id, line] of sceneRef.current.trailLines) {
        sceneRef.current.scene.remove(line);
      }
      sceneRef.current.trailLines.clear();
    }
  }, []);

  const removeBody = useCallback((id) => {
    bodiesRef.current = bodiesRef.current.filter(b => b.id !== id);
    setBodies([...bodiesRef.current]);
    setBodyCount(bodiesRef.current.length);
    if (selectedId === id) setSelectedId(null);
  }, [selectedId]);

  useEffect(() => {
    const cfg = BODY_TYPES[placeType];
    if (cfg) { setPlaceMass(cfg.defaultMass); setPlaceRadius(cfg.defaultRadius); }
  }, [placeType]);

  // Mouse handlers
  const handleMouseDown = useCallback((e) => {
    if (e.target.closest(".ui-panel")) return;
    const ms = mouseState.current;
    ms.isDown = true; ms.isDragging = false;
    ms.startX = e.clientX; ms.startY = e.clientY; ms.button = e.button;

    if (activeTool === "launch" && e.button === 0) {
      const scene = sceneRef.current;
      const worldPos = scene.getWorldPosition(e.clientX, e.clientY);
      if (worldPos) ms.launchStart = worldPos.clone();
    }
  }, [activeTool]);

  const handleMouseMove = useCallback((e) => {
    const ms = mouseState.current;
    if (!ms.isDown) return;

    const dx = e.clientX - ms.startX;
    const dy = e.clientY - ms.startY;
    if (Math.sqrt(dx * dx + dy * dy) > 5) ms.isDragging = true;

    const scene = sceneRef.current;

    if (ms.isDragging && ms.button === 0 && activeTool === "select") {
      scene.pan(e.movementX, -e.movementY);
    } else if (ms.isDragging && ms.button === 2) {
      scene.orbit(e.movementX * 0.005, e.movementY * 0.005);
    } else if (ms.isDragging && ms.button === 1) {
      scene.pan(e.movementX, -e.movementY);
    }

    if (activeTool === "launch" && ms.launchStart && ms.button === 0) {
      const worldPos = scene.getWorldPosition(e.clientX, e.clientY);
      if (worldPos) scene.showLaunchArrow(ms.launchStart, worldPos);
    }
  }, [activeTool]);

  const handleMouseUp = useCallback((e) => {
    if (e.target.closest(".ui-panel")) return;
    const ms = mouseState.current;
    const scene = sceneRef.current;

    if (!ms.isDragging && ms.button === 0) {
      const now = Date.now();
      const isDoubleClick = now - ms.lastClickTime < 350;
      ms.lastClickTime = now;

      if (activeTool === "select") {
        const hit = scene.raycastBodies(e.clientX, e.clientY, bodiesRef.current);
        if (hit) {
          if (isDoubleClick) scene.followBody(hit);
          setSelectedId(hit.id);
        } else {
          setSelectedId(null);
        }
      } else if (activeTool === "place") {
        const worldPos = scene.getWorldPosition(e.clientX, e.clientY);
        if (worldPos) {
          addBodies([createBody(placeType, placeMass, placeRadius, worldPos.x, worldPos.y, worldPos.z)]);
        }
      } else if (activeTool === "delete") {
        const hit = scene.raycastBodies(e.clientX, e.clientY, bodiesRef.current);
        if (hit) removeBody(hit.id);
      }
    }

    if (activeTool === "launch" && ms.launchStart && ms.button === 0) {
      const worldPos = scene.getWorldPosition(e.clientX, e.clientY);
      if (worldPos) {
        const velocity = new THREE.Vector3().subVectors(worldPos, ms.launchStart).multiplyScalar(0.3);
        addBodies([createBody(placeType, placeMass, placeRadius, ms.launchStart.x, ms.launchStart.y, ms.launchStart.z, velocity.x, 0, velocity.z)]);
      }
      scene.showLaunchArrow(null, null);
      ms.launchStart = null;
    }

    ms.isDown = false; ms.isDragging = false; ms.button = -1;
  }, [activeTool, placeType, placeMass, placeRadius, addBodies, removeBody]);

  const handleWheel = useCallback((e) => {
    if (e.target.closest(".ui-panel")) return;
    sceneRef.current?.zoom(e.deltaY > 0 ? 1.1 : 0.9);
  }, []);

  const handleContextMenu = useCallback((e) => e.preventDefault(), []);

  const handleGenerateSolarSystem = useCallback(() => {
    addBodies(generateSolarSystem(0, 0, 0, 0, 0, 0, gravityG));
  }, [gravityG, addBodies]);

  const handleGenerateGalaxy = useCallback(() => {
    addBodies(generateGalaxy(0, 0, 0, gravityG));
    if (sceneRef.current) {
      sceneRef.current.cameraDistance = 600;
      sceneRef.current.cameraPhi = Math.PI / 5;
      sceneRef.current._updateCameraPosition();
    }
  }, [gravityG, addBodies]);

  const selectedBody = useMemo(() => bodies.find(b => b.id === selectedId), [bodies, selectedId]);

  const updateSelectedBody = useCallback((field, value) => {
    if (!selectedId) return;
    const body = bodiesRef.current.find(b => b.id === selectedId);
    if (body) { body[field] = value; setBodies([...bodiesRef.current]); }
  }, [selectedId]);

  return (
    <div className="w-full h-full relative select-none"
      onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp} onWheel={handleWheel} onContextMenu={handleContextMenu}>

      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* ─── Top Bar ─── */}
      <div className="ui-panel absolute top-0 left-0 right-0 z-10">
        <div className="glass-panel m-2 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="sun" size={18} className="text-yellow-400" />
            <span className="text-sm font-semibold tracking-wider text-white/90">GALAXY SANDBOX</span>
            <span className="text-xs text-white/40 ml-2">{bodyCount} bodies</span>
          </div>

          {/* Time Controls */}
          <div className="flex items-center gap-1">
            <button onClick={() => setIsPaused(!isPaused)}
              className="speed-btn px-3 py-1.5 rounded text-xs flex items-center gap-1"
              title={isPaused ? "Play" : "Pause"}>
              <Icon name={isPaused ? "play" : "pause"} size={14} />
            </button>
            {SPEEDS.map(s => (
              <button key={s.value}
                onClick={() => { setTimeScale(s.value); setIsPaused(false); }}
                className={`speed-btn px-2 py-1 rounded text-xs ${timeScale === s.value && !isPaused ? "active" : "text-white/60"}`}>
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => sceneRef.current?.resetView()}
              className="speed-btn px-2 py-1.5 rounded text-xs text-white/60 flex items-center gap-1" title="Reset View">
              <Icon name="maximize" size={14} />
            </button>
            <button onClick={() => setShowSettings(!showSettings)}
              className={`speed-btn px-2 py-1.5 rounded text-xs flex items-center gap-1 ${showSettings ? "active" : "text-white/60"}`}>
              <Icon name="settings" size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Settings Panel ─── */}
      {showSettings && (
        <div className="ui-panel absolute top-14 right-2 z-20">
          <div className="glass-panel p-4 w-56">
            <h3 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">Settings</h3>
            <div className="mb-3">
              <label className="text-xs text-white/50 mb-1 block">Gravity (G): {gravityG.toFixed(1)}</label>
              <input type="range" min="1" max="200" step="1" value={gravityG}
                onChange={(e) => setGravityG(parseFloat(e.target.value))} className="slider-cosmic w-full" />
            </div>
            <div className="mb-3">
              <label className="flex items-center gap-2 text-xs text-white/50 cursor-pointer">
                <input type="checkbox" checked={showTrails} onChange={(e) => setShowTrails(e.target.checked)} className="rounded" />
                Show Orbital Trails
              </label>
            </div>
            <button onClick={clearAll}
              className="w-full mt-2 px-3 py-1.5 rounded text-xs bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition">
              Clear All Bodies
            </button>
          </div>
        </div>
      )}

      {/* ─── Left Sidebar ─── */}
      <div className="ui-panel absolute top-16 left-2 z-10">
        <div className="glass-panel p-2 w-44">
          <div className="mb-2">
            <h3 className="text-[10px] font-semibold text-white/40 uppercase tracking-widest px-2 mb-1">Tools</h3>
            {TOOLS.map(tool => (
              <button key={tool.id} onClick={() => setActiveTool(tool.id)}
                className={`tool-btn w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs ${activeTool === tool.id ? "active text-cyan-300" : "text-white/70"}`}>
                <Icon name={tool.icon} size={14} />
                {tool.label}
              </button>
            ))}
          </div>

          {/* Body type selector for place/launch */}
          {(activeTool === "place" || activeTool === "launch") && (
            <div className="border-t border-white/10 pt-2 mt-2">
              <h3 className="text-[10px] font-semibold text-white/40 uppercase tracking-widest px-2 mb-1">Body Type</h3>
              <button onClick={() => setShowTypeMenu(!showTypeMenu)}
                className="tool-btn w-full flex items-center justify-between px-2 py-1.5 rounded text-xs text-white/70">
                <span className="flex items-center gap-2">
                  <Icon name={BODY_TYPES[placeType].icon} size={14} />
                  {BODY_TYPES[placeType].label}
                </span>
                <Icon name={showTypeMenu ? "chevron-up" : "chevron-down"} size={12} />
              </button>

              {showTypeMenu && (
                <div className="mt-1">
                  {Object.entries(BODY_TYPES).map(([key, cfg]) => (
                    <button key={key} onClick={() => { setPlaceType(key); setShowTypeMenu(false); }}
                      className={`tool-btn w-full flex items-center gap-2 px-2 py-1 rounded text-xs ${placeType === key ? "active text-cyan-300" : "text-white/60"}`}>
                      <Icon name={cfg.icon} size={12} />
                      {cfg.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-2 px-2">
                <label className="text-[10px] text-white/40 block mb-1">Mass: {placeMass.toFixed(1)}</label>
                <input type="range" min={BODY_TYPES[placeType].minMass} max={BODY_TYPES[placeType].maxMass}
                  step={(BODY_TYPES[placeType].maxMass - BODY_TYPES[placeType].minMass) / 100}
                  value={placeMass} onChange={(e) => setPlaceMass(parseFloat(e.target.value))} className="slider-cosmic w-full" />
              </div>
              <div className="mt-1 px-2">
                <label className="text-[10px] text-white/40 block mb-1">Radius: {placeRadius.toFixed(2)}</label>
                <input type="range" min={BODY_TYPES[placeType].minRadius} max={BODY_TYPES[placeType].maxRadius}
                  step={0.01} value={placeRadius} onChange={(e) => setPlaceRadius(parseFloat(e.target.value))} className="slider-cosmic w-full" />
              </div>
            </div>
          )}

          {/* Generators */}
          <div className="border-t border-white/10 pt-2 mt-2">
            <h3 className="text-[10px] font-semibold text-white/40 uppercase tracking-widest px-2 mb-1">Generate</h3>
            <button onClick={handleGenerateSolarSystem}
              className="tool-btn w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-white/70">
              <Icon name="orbit" size={14} />
              Solar System
            </button>
            <button onClick={handleGenerateGalaxy}
              className="tool-btn w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-purple-300">
              <Icon name="sparkles" size={14} />
              Spiral Galaxy
            </button>
          </div>
        </div>
      </div>

      {/* ─── Selection Info Panel ─── */}
      {selectedBody && (
        <div className="ui-panel absolute bottom-2 left-2 z-10">
          <div className="glass-panel p-3 w-56">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedBody.color }} />
                <span className="text-xs font-semibold text-white/90">
                  {BODY_TYPES[selectedBody.type]?.label || selectedBody.type}
                </span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => sceneRef.current?.followBody(selectedBody)}
                  className="p-1 rounded hover:bg-white/10" title="Follow">
                  <Icon name="eye" size={12} />
                </button>
                <button onClick={() => setSelectedId(null)} className="p-1 rounded hover:bg-white/10">
                  <Icon name="x" size={12} />
                </button>
              </div>
            </div>

            <div className="space-y-1.5 text-[10px] text-white/60">
              <div className="flex justify-between">
                <span>ID</span><span className="text-white/40">#{selectedBody.id}</span>
              </div>
              <div>
                <div className="flex justify-between mb-0.5">
                  <span>Mass</span><span>{selectedBody.mass.toFixed(2)}</span>
                </div>
                <input type="range"
                  min={BODY_TYPES[selectedBody.type]?.minMass || 0.001}
                  max={BODY_TYPES[selectedBody.type]?.maxMass || 200000}
                  step={((BODY_TYPES[selectedBody.type]?.maxMass || 200000) - (BODY_TYPES[selectedBody.type]?.minMass || 0.001)) / 200}
                  value={selectedBody.mass}
                  onChange={(e) => updateSelectedBody("mass", parseFloat(e.target.value))}
                  className="slider-cosmic w-full" />
              </div>
              <div>
                <div className="flex justify-between mb-0.5">
                  <span>Radius</span><span>{selectedBody.radius.toFixed(2)}</span>
                </div>
                <input type="range"
                  min={BODY_TYPES[selectedBody.type]?.minRadius || 0.05}
                  max={BODY_TYPES[selectedBody.type]?.maxRadius || 8}
                  step={0.01} value={selectedBody.radius}
                  onChange={(e) => updateSelectedBody("radius", parseFloat(e.target.value))}
                  className="slider-cosmic w-full" />
              </div>
              <div className="flex justify-between">
                <span>Position</span>
                <span>({selectedBody.px.toFixed(1)}, {selectedBody.py.toFixed(1)}, {selectedBody.pz.toFixed(1)})</span>
              </div>
              <div className="flex justify-between">
                <span>Velocity</span>
                <span>{Math.sqrt(selectedBody.vx ** 2 + selectedBody.vy ** 2 + selectedBody.vz ** 2).toFixed(2)}</span>
              </div>
              {selectedBody.temperature && (
                <div className="flex justify-between">
                  <span>Temperature</span><span>{selectedBody.temperature.toFixed(0)} K</span>
                </div>
              )}
            </div>

            <button onClick={() => removeBody(selectedBody.id)}
              className="w-full mt-2 px-2 py-1 rounded text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition">
              Delete Body
            </button>
          </div>
        </div>
      )}

      {/* Help hint */}
      <div className="absolute bottom-2 right-2 text-[10px] text-white/20 z-10 pointer-events-none">
        Left-click: interact &middot; Right-drag: orbit &middot; Scroll: zoom &middot; Double-click: follow
      </div>
    </div>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
