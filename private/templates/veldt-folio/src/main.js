import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  Scene, PerspectiveCamera, WebGLRenderer, PlaneGeometry, ShaderMaterial,
  Mesh, Texture, Uniform, Vector2, Raycaster, DoubleSide, SRGBColorSpace,
} from 'three';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// always boot from the top — restored mid-page scroll positions skip the intro
// and can race the helix reveal against texture loading. Restoration can land
// after this module runs, so pin scroll to 0 for a short boot window (released
// early on the first real user input).
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);
{
  let interacted = false;
  ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach((ev) =>
    window.addEventListener(ev, () => { interacted = true; }, { once: true, passive: true }));
  const t0 = performance.now();
  const clamp = () => {
    if (interacted) return;
    if (window.scrollY > 0) window.scrollTo(0, 0);
    if (performance.now() - t0 < 3800) requestAnimationFrame(clamp); // covers the intro, during which scroll is locked anyway
  };
  requestAnimationFrame(clamp);
}

/* ————————————————————————————— data */

const projects = [
  {
    title: 'Drift OS', tags: 'interface · system', year: '2026', c: ['#e9e6dd', '#6f66b8'], v: 0,
    client: 'Driftworks', role: 'design · frontend', stack: 'react · three.js · rive',
    p1: 'A spatial operating-system concept for an automotive HMI startup — every surface of the dashboard rethought as one continuous, glanceable canvas. I led the interface design and built the production shell that ships in their demo vehicles.',
    p2: 'The hardest problem was motion at 10am and at 110km/h: transitions had to communicate hierarchy without ever stealing attention. We tuned every easing curve against eye-tracking sessions until the UI felt like peripheral vision.',
  },
  {
    title: 'Pulse Grid', tags: 'webgl · identity', year: '2025', c: ['#1b2bd0', '#7b5bf0'], v: 1,
    client: 'Pulse Festival', role: 'creative development', stack: 'webgl · glsl · vite',
    p1: 'Identity system and generative website for an electronic music festival. The brand is a single shader: a grid of concentric pulses that reacts to the lineup data, rendering a unique poster for every visitor.',
    p2: 'The same GLSL drives print and screen — we rasterised shader frames at 600dpi for the city-wide poster campaign, so the wall and the website are literally the same artwork.',
  },
  {
    title: 'Tidal', tags: 'e-commerce · motion', year: '2025', c: ['#14d3c0', '#5e2ea0'], v: 6,
    client: 'Tidal Swimwear', role: 'design engineering', stack: 'nuxt · gsap · lenis',
    p1: 'A flagship store for a swimwear label that wanted to feel like water, not like a warehouse. Product pages flow into each other with no hard cuts; the cart is a wave that rises from the footer.',
    p2: 'Underneath the softness is a hard-nosed build: 98 Lighthouse performance on 3G, full keyboard navigation, and a checkout that converts 22% better than the platform template it replaced.',
  },
  {
    title: 'Gramophone', tags: 'editorial · 3d', year: '2025', c: ['#f6b14b', '#27160a'], v: 4,
    client: 'Gramophone Archive', role: 'design · frontend', stack: 'astro · three.js',
    p1: 'A digital archive for a century of recorded sound — thousands of records, each scanned and rebuilt as a lightweight 3D object you can pick up and turn over. Editorial long-reads thread the collection together.',
    p2: 'We obsessed over the reading experience: a custom typesetting pass widows-and-orphans every article, and the 3D viewer streams progressively so the archive works on a museum kiosk and a metro commute alike.',
  },
  {
    title: 'Fieldnotes', tags: 'design system', year: '2024', c: ['#b9e84d', '#3439d8'], v: 5,
    client: 'Fieldnotes HQ', role: 'systems design', stack: 'react · radix · tokens studio',
    p1: 'A ground-up design system for a field-research SaaS: 70 components, four themes, one source of truth. Tokens flow from Figma to production without a human in the loop.',
    p2: 'The system cut feature design-to-ship time roughly in half. The part I am proudest of is the documentation — every component page is a live playground with its accessibility contract spelled out.',
  },
  {
    title: 'Mono Studio', tags: 'portfolio · craft', year: '2024', c: ['#d3d3d8', '#232328'], v: 7,
    client: 'Mono', role: 'design · development', stack: 'eleventy · gsap',
    p1: 'A portfolio for an architecture studio that hates portfolios. One page, twelve projects, no thumbnails — just a typographic index that unfolds into full-bleed photography when you commit to a project.',
    p2: 'The site weighs 240KB before images and runs without a single framework. Restraint was the brief, and restraint is what shipped.',
  },
  {
    title: 'Ember', tags: 'brand · frontend', year: '2023', c: ['#ef7a39', '#efe4d3'], v: 3,
    client: 'Ember Coffee', role: 'frontend', stack: 'shopify · gsap',
    p1: 'Brand site and store for a roastery that treats coffee like vinyl pressings: numbered drops, liner notes, a waiting list. The site leans into that scarcity with a countdown-driven homepage that rebuilds itself for every drop.',
    p2: 'Drop days used to crash their old store. The rebuild held 40× their previous peak traffic on launch weekend without breaking a sweat.',
  },
  {
    title: 'Lighthouse', tags: 'dataviz · tooling', year: '2023', c: ['#0d6b62', '#9ef0e2'], v: 2,
    client: 'Lighthouse Labs', role: 'design engineering', stack: 'svelte · d3 · duckdb-wasm',
    p1: 'An analytics tool for renewable-energy operators — wind farm telemetry rendered as living, breathing visualisations instead of grey dashboards. Sixty thousand data points stay interactive at 60fps, entirely in the browser.',
    p2: 'Operators describe anomalies by how the picture "feels wrong" before they can say why. That instinct is the product: we designed the visual encodings so trouble looks like trouble.',
  },
];

/* ————————————————————————————— card artwork (inline svg) */

function art(i, p) {
  const [a, b] = p.c;
  const g = `lg${i}`, n = `nz${i}`;
  let shape = '';
  switch (p.v) {
    case 0:
      shape = `<circle cx="300" cy="78" r="34" fill="${b}"/>
        <polygon points="-20,300 150,128 280,300" fill="${b}" opacity=".92"/>
        <polygon points="190,300 300,170 420,300" fill="${b}" opacity=".65"/>`;
      break;
    case 1:
      shape = [4, 3, 2, 1].map(k =>
        `<circle cx="200" cy="150" r="${k * 32}" fill="none" stroke="${b}" stroke-width="${10 - k}" opacity="${.4 + k * .15}"/>`
      ).join('') + `<circle cx="200" cy="150" r="10" fill="${b}"/>`;
      break;
    case 2:
      shape = [0, 1, 2, 3, 4, 5].map(k =>
        `<rect x="${-80 + k * 95}" y="-60" width="26" height="430" fill="${b}" opacity="${.85 - k * .1}" transform="rotate(24 200 150)"/>`
      ).join('');
      break;
    case 3:
      shape = `<path d="M205,52 C282,42 338,96 326,166 C314,236 246,272 178,256 C110,240 64,186 80,124 C96,62 128,62 205,52 Z" fill="${b}" opacity=".9"/>
        <circle cx="118" cy="92" r="12" fill="${b}"/>`;
      break;
    case 4:
      shape = `<rect x="120" y="170" width="200" height="130" fill="${b}" opacity=".92"/>
        <circle cx="170" cy="160" r="46" fill="${b}"/>
        <ellipse cx="262" cy="158" rx="74" ry="20" fill="${b}" opacity=".85"/>`;
      break;
    case 5:
      {
        let dots = '';
        for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++)
          dots += `<circle cx="${58 + c * 48}" cy="${60 + r * 46}" r="${5 + ((r + c) % 3) * 4}" fill="${b}" opacity="${.45 + ((r * c) % 4) * .14}"/>`;
        shape = dots;
      }
      break;
    case 6:
      shape = [0, 1, 2, 3].map(k =>
        `<path d="M-20,${110 + k * 46} C80,${70 + k * 46} 160,${150 + k * 46} 240,${110 + k * 46} S 380,${70 + k * 46} 440,${110 + k * 46}" fill="none" stroke="${b}" stroke-width="${8 - k}" opacity="${.9 - k * .18}"/>`
      ).join('');
      break;
    case 7:
      shape = `<rect x="130" y="80" width="140" height="140" fill="none" stroke="${b}" stroke-width="6" transform="rotate(18 200 150)"/>
        <circle cx="200" cy="150" r="92" fill="none" stroke="${b}" stroke-width="2" opacity=".7"/>
        <circle cx="265" cy="96" r="14" fill="${b}"/>`;
      break;
  }
  return `<svg viewBox="0 0 400 300" width="1088" height="816" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b === '#27160a' ? '#e8872f' : a}" stop-opacity="${b === '#27160a' ? 1 : 0}"/>
      </linearGradient>
      <filter id="${n}"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2"/><feColorMatrix type="saturate" values="0"/></filter>
    </defs>
    <rect width="400" height="300" fill="${a}"/>
    <rect width="400" height="300" fill="url(#${g})"/>
    ${shape}
    <rect width="400" height="300" filter="url(#${n})" opacity="0.08"/>
  </svg>`;
}

const artURI = (i, p) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(art(i, p));

/* ————————————————————————————— build list dom */

const ul = document.querySelector('.works__list');
projects.forEach((p, i) => {
  const li = document.createElement('li');
  li.className = 'project';
  const idx = String(i + 1).padStart(2, '0');
  li.innerHTML = `
    <span class="project__index">${idx}</span>
    <h3 class="project__title">${p.title}</h3>
    <span class="project__tags">${p.tags}</span>
    <span class="project__year">${p.year}</span>
    <figure class="project__card">
      <div class="project__art">${art(i, p)}</div>
    </figure>`;
  ul.appendChild(li);
});

// marquee content
const marqueeTrack = document.querySelector('.marquee__track');
const phrase = `<span>frontend</span><i>•</i><span class="serif">design engineer</span><i>•</i><span>2026</span><i>•</i>`;
marqueeTrack.innerHTML = `
  <div class="marquee__group">${phrase.repeat(4)}</div>
  <div class="marquee__group">${phrase.repeat(4)}</div>`;

/* ————————————————————————————— lenis smooth scroll */

const lenis = new Lenis({
  lerp: 0.1,
  prevent: (node) => !!node.closest?.('.pdetail__scroll'),
});
lenis.on('scroll', ScrollTrigger.update);

// the project-detail overlay gets its own smoothing, same feel as the page
const detailLenis = new Lenis({
  lerp: 0.1,
  wrapper: document.querySelector('.pdetail__scroll'),
  content: document.querySelector('.pdetail__content'),
});
detailLenis.stop();

gsap.ticker.add((t) => { lenis.raf(t * 1000); detailLenis.raf(t * 1000); });
gsap.ticker.lagSmoothing(0);

/* ————————————————————————————— webgl helix (faithful to the reference build:
   planes duplicated x2 on a cylinder — y = rel*gap, angle = rel*0.85,
   tangent rotation, back faces blurred in-shader, sdf rounded reveal,
   scroll-speed jelly wobble, idle drift that never quite stops) */

const vertexShader = /* glsl */ `
varying vec2 vUv;
#define PI 3.14159265359
uniform float uScrollSpeed;

void main() {
  vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  vec3 newPosition = position;
  newPosition.z = sin(uv.x * PI) * 0.2;

  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  viewPosition.x += pow(worldPosition.y, 2.0) * 0.1;
  viewPosition.x += sin(uv.y * PI) * uScrollSpeed * 2.0;
  gl_Position = projectionMatrix * viewPosition;

  vUv = uv;
}`;

const fragmentShader = /* glsl */ `
uniform sampler2D uTexture;
uniform float uColorStrength;
uniform float uZoom;
uniform vec2 uPlaneSizes;
uniform vec2 uImageSizes;
uniform float uRevealProgress;

varying vec2 vUv;

float roundedRectSDF(vec2 uv, vec2 size, float radius) {
  vec2 d = abs(uv - 0.5) - size * 0.5 + radius;
  return length(max(d, 0.0)) - radius;
}

void main() {
  vec2 ratio = vec2(
    min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
    min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
  );
  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
  vec2 zoomedUv = (uv - 0.5) / uZoom + 0.5;

  vec4 color;
  if (gl_FrontFacing) {
    color = texture2D(uTexture, zoomedUv);
    color = mix(color, vec4(0.0, 0.0, 0.0, 1.0), uColorStrength);
  } else {
    float offset = 40.0 / 1024.0;
    vec4 c = vec4(0.0);
    c += texture2D(uTexture, uv + vec2(-offset, -offset)) * 1.0;
    c += texture2D(uTexture, uv + vec2( 0.0,    -offset)) * 2.0;
    c += texture2D(uTexture, uv + vec2( offset, -offset)) * 1.0;
    c += texture2D(uTexture, uv + vec2(-offset,  0.0))    * 2.0;
    c += texture2D(uTexture, uv)                          * 4.0;
    c += texture2D(uTexture, uv + vec2( offset,  0.0))    * 2.0;
    c += texture2D(uTexture, uv + vec2(-offset,  offset)) * 1.0;
    c += texture2D(uTexture, uv + vec2( 0.0,     offset)) * 2.0;
    c += texture2D(uTexture, uv + vec2( offset,  offset)) * 1.0;
    c /= 16.0;
    color = c;
  }

  float reveal = clamp(uRevealProgress, 0.0, 1.0);
  vec2 revealSize = vec2(reveal);
  float radius = 0.05 * reveal;
  float sdf = roundedRectSDF(vUv, revealSize, radius);
  float alpha = 1.0 - smoothstep(0.0, 0.002, sdf);
  alpha *= smoothstep(0.1, 1.0, uRevealProgress);

  gl_FragColor = vec4(color.rgb, alpha);
}`;

const lerp = (a, b, t) => a + (b - a) * t;

class Helix {
  constructor(canvas, stage) {
    this.canvas = canvas;
    this.stage = stage;
    this.count = projects.length * 2;
    this.centerIndex = Math.floor(this.count / 2);

    this.verticalGap = 0.5;
    this.angleGap = 0.85;
    this.baseRadius = 2;

    this.drift = 0;            // idle + touch-drag rotation, in item units
    this.scrollPart = 0;       // scroll-scrubbed rotation
    this.prevOffset = 0;
    this.speed = 0;            // smoothed per-frame offset delta -> jelly wobble
    this.active = false;       // render only when stage visible & in spiral mode
    this.planes = [];
    this.hoveredPlane = null;

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(innerWidth < 900 ? 45 : 35, 1, 0.1, 100);
    this.camera.position.set(0, 0, 8);
    this.scene.add(this.camera);

    this.renderer = new WebGLRenderer({
      canvas, alpha: true, antialias: true, powerPreference: 'high-performance', stencil: false,
    });

    this.raycaster = new Raycaster();
    this.mouse = new Vector2(-2, -2);
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    this.resize();
    this.bindEvents();
  }

  async load() {
    const textures = await Promise.all(projects.map((p, i) => new Promise((res) => {
      const img = new Image();
      img.onload = () => {
        const tex = new Texture(img);
        tex.colorSpace = SRGBColorSpace;
        tex.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy());
        tex.needsUpdate = true;
        res(tex);
      };
      img.src = artURI(i, p);
    })));

    const geometry = new PlaneGeometry(1, 1, 8, 8);
    [...projects, ...projects].forEach((p, i) => {
      const tex = textures[i % projects.length];
      const mesh = new Mesh(geometry, new ShaderMaterial({
        uniforms: {
          uTexture: new Uniform(tex),
          uColorStrength: new Uniform(0),
          uZoom: new Uniform(1),
          uPlaneSizes: new Uniform(new Vector2(1.7, 1)),
          uImageSizes: new Uniform(new Vector2(tex.image.width, tex.image.height)),
          uRevealProgress: new Uniform(0),
          uScrollSpeed: new Uniform(0),
        },
        vertexShader, fragmentShader, transparent: true, side: DoubleSide,
      }));
      mesh.scale.set(1.7, 1, 1);
      mesh.userData = {
        index: i, project: p, projectIndex: i % projects.length,
        hidden: 1, hiddenTarget: 1, isHidden: true,
        hover: 0, hoverTarget: 0,
      };
      this.scene.add(mesh);
      this.planes.push(mesh);
    });
    // if reveal() was requested while textures were still loading, honour it now
    if (this.revealed) this.reveal();
    this.update(16.7);
  }

  bindEvents() {
    // horizontal touch-drag spins the helix; vertical swipes keep scrolling the page
    let startX = 0, startY = 0, lastX = 0, velX = 0, dragging = false;
    this.canvas.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      if (!t) return;
      startX = lastX = t.clientX; startY = t.clientY; velX = 0; dragging = false;
    }, { passive: true });
    this.canvas.addEventListener('touchmove', (e) => {
      const t = e.touches[0];
      if (!t) return;
      const dx = t.clientX - startX, dy = t.clientY - startY;
      if (!dragging && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) dragging = true;
      if (dragging) {
        e.preventDefault();
        velX = t.clientX - lastX;
        this.drift -= velX * 0.006;
      }
      lastX = t.clientX;
    }, { passive: false });
    this.canvas.addEventListener('touchend', (e) => {
      if (dragging) {
        this.drift -= velX * 0.05;
      } else {
        const t = e.changedTouches[0];
        if (t) {
          const r = this.canvas.getBoundingClientRect();
          this.mouse.set(((t.clientX - r.left) / r.width) * 2 - 1, -((t.clientY - r.top) / r.height) * 2 + 1);
          const plane = this.raycast();
          if (plane && this.onPick) this.onPick(plane.userData);
          this.mouse.set(-2, -2);
        }
      }
      dragging = false;
    });

    this.canvas.addEventListener('click', () => {
      if (this.isTouch) return;
      if (this.hoveredPlane && this.onPick) this.onPick(this.hoveredPlane.userData);
    });

    window.addEventListener('mousemove', (e) => {
      const r = this.canvas.getBoundingClientRect();
      this.mouse.set(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        -((e.clientY - r.top) / r.height) * 2 + 1,
      );
    });
  }

  resize() {
    const w = this.stage.clientWidth || innerWidth;
    const h = this.stage.clientHeight || innerHeight;
    this.camera.aspect = w / h;
    this.camera.fov = innerWidth < 900 ? 45 : 35;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  }

  reveal() {
    this.active = true;
    this.revealed = true;
    this.planes.forEach((m, i) => setTimeout(() => {
      m.userData.isHidden = false;
      m.userData.hiddenTarget = 0;
    }, (i % 4) * 50));
  }

  hide() {
    this.revealed = false;
    this.planes.forEach((m, i) => setTimeout(() => {
      m.userData.isHidden = true;
      m.userData.hiddenTarget = 1;
    }, (i % 4) * 30));
  }

  // front-facing, fully revealed plane under this.mouse (or null)
  raycast() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const hits = this.raycaster.intersectObjects(this.planes);
    if (!hits.length) return null;
    const hit = hits[0];
    const normal = hit.face.normal.clone().transformDirection(hit.object.matrixWorld);
    const facing = normal.dot(this.raycaster.ray.direction) < 0;
    return (facing && hit.object.userData.hidden < 0.01) ? hit.object : null;
  }

  checkHover() {
    if (this.isTouch) return;
    const next = this.raycast();
    if (next === this.hoveredPlane) return;
    if (this.hoveredPlane) this.hoveredPlane.userData.hoverTarget = 0;
    this.hoveredPlane = next;
    if (next) next.userData.hoverTarget = 1;
    this.canvas.style.cursor = next ? 'pointer' : 'default';
    onHelixHover(next ? next.userData : null);
  }

  update(deltaMS) {
    if (!this.active || !this.planes.length) return;

    if (!reduceMotion) this.drift += 0.0028; // idle drift — the helix never quite stops

    const offset = this.drift + this.scrollPart;
    // gentle jelly wobble — the shader multiplies this by 2 world units, so keep it small
    const targetSpeed = Math.max(-0.28, Math.min(0.28, (offset - this.prevOffset) * 4));
    this.speed = lerp(this.speed, targetSpeed, 0.08);
    this.prevOffset = offset;

    for (const mesh of this.planes) {
      const d = mesh.userData;
      const hoverEase = 1 - Math.pow(1 - (d.hoverTarget ? 0.09 : 0.07), deltaMS * 0.2);
      d.hover = lerp(d.hover, d.hoverTarget, hoverEase);
      const hiddenEase = 1 - Math.pow(1 - 0.05, deltaMS * 0.15);
      d.hidden = lerp(d.hidden, d.hiddenTarget, hiddenEase);

      let ws = (d.index - offset) % this.count;
      ws = (ws + this.count) % this.count;
      const rel = ws - this.centerIndex;

      const hideDir = d.isHidden ? 1.5 : -1.5;
      const y = rel * this.verticalGap - 0.8 - d.hidden * hideDir;
      const radius = this.baseRadius * (1 - d.hidden / 2);
      const angle = rel * this.angleGap;
      mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      mesh.rotation.y = -angle + Math.PI / 2;

      const u = mesh.material.uniforms;
      u.uColorStrength.value = 0.55 * d.hover;
      u.uZoom.value = 1 + 0.05 * d.hover;
      u.uRevealProgress.value = (1 - d.hover * 0.05) * (1 - d.hidden);
      u.uScrollSpeed.value = this.speed;
    }

    this.checkHover();
    this.renderer.render(this.scene, this.camera);
  }
}

/* ————————————————————————————— helix wiring */

const worksSec = document.querySelector('.works');
const stage = document.querySelector('.works__stage');
const helix = new Helix(document.querySelector('.works__canvas'), stage);
helix.load();
if (import.meta.env.DEV) window.__helix = helix;

let mode = 'spiral';
let busy = false;

gsap.ticker.add((time, deltaMS) => {
  if (mode === 'spiral') helix.update(deltaMS);
});

window.addEventListener('resize', () => {
  helix.resize();
  ScrollTrigger.refresh();
});

// page scroll through the tall works section corkscrews the helix
ScrollTrigger.create({
  trigger: worksSec,
  start: 'top top',
  end: 'bottom bottom',
  onUpdate: (self) => { helix.scrollPart = self.progress * helix.count * 0.5; },
});

// first reveal when the stage approaches
ScrollTrigger.create({
  trigger: stage,
  start: 'top 70%',
  once: true,
  onEnter: () => { if (mode === 'spiral') helix.reveal(); },
});

// hovered project chip, bottom-left of the stage
const hoverEl = document.querySelector('.works__hover');
const hoverIndex = document.querySelector('.works__hover-index');
const hoverTitle = document.querySelector('.works__hover-title');

function onHelixHover(data) {
  if (data) {
    hoverIndex.textContent = String(data.projectIndex + 1).padStart(2, '0');
    hoverTitle.textContent = data.project.title;
    gsap.to(hoverEl, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', overwrite: true });
    gsap.fromTo(hoverTitle, { yPercent: 30 }, { yPercent: 0, duration: 0.5, ease: 'power3.out' });
  } else {
    gsap.to(hoverEl, { autoAlpha: 0, y: 10, duration: 0.4, ease: 'power3.out', overwrite: true });
  }
}

/* ————————————————————————————— project detail overlay */

const pd = {
  el: document.querySelector('.pdetail'),
  scroll: document.querySelector('.pdetail__scroll'),
  num: document.querySelector('.pdetail__num'),
  total: document.querySelector('.pdetail__total'),
  title: document.querySelector('.pdetail__title-inner'),
  tags: document.querySelector('.pdetail__tags'),
  year: document.querySelector('.pdetail__year'),
  client: document.querySelector('.pdetail__client'),
  role: document.querySelector('.pdetail__role'),
  stack: document.querySelector('.pdetail__stack'),
  img: document.querySelector('.pdetail__media img'),
  p1: document.querySelector('.pdetail__p1'),
  p2: document.querySelector('.pdetail__p2'),
  prev: document.querySelector('.pdetail__prev'),
  next: document.querySelector('.pdetail__next'),
  anims: gsap.utils.toArray('.pd-anim'),
};
pd.total.textContent = String(projects.length).padStart(2, '0');

let detailOpen = false;
let detailBusy = false;
let detailIndex = 0;

function fillDetail(i) {
  detailIndex = i;
  const p = projects[i];
  pd.num.textContent = String(i + 1).padStart(2, '0');
  pd.title.textContent = p.title;
  pd.tags.textContent = `${p.tags} — ${p.year}`;
  pd.year.textContent = p.year;
  pd.client.textContent = p.client;
  pd.role.textContent = p.role;
  pd.stack.textContent = p.stack;
  pd.img.src = artURI(i, p);
  pd.img.alt = `${p.title} — project artwork`;
  pd.p1.textContent = p.p1;
  pd.p2.textContent = p.p2;
  pd.prev.querySelector('span').textContent = projects[(i - 1 + projects.length) % projects.length].title;
  pd.next.querySelector('span').textContent = projects[(i + 1) % projects.length].title;
}

function detailContentIn(tl, at = 0) {
  tl.fromTo(pd.title, { yPercent: 115 }, { yPercent: 0, duration: 1, ease: 'power4.out' }, at)
    .fromTo(pd.anims, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out', clearProps: 'opacity,visibility,transform' }, at + 0.08)
    .fromTo(pd.img, { scale: 1.22 }, { scale: 1, duration: 1.5, ease: 'power3.out' }, at);
}

function openProject(i) {
  if (detailOpen) return;
  detailOpen = true;
  detailBusy = true;
  fillDetail(i);
  lenis.stop();
  detailLenis.start();
  detailLenis.scrollTo(0, { immediate: true, force: true });
  pd.el.setAttribute('aria-hidden', 'false');

  const fromSpiral = mode === 'spiral';
  if (fromSpiral) { helix.hide(); onHelixHover(null); }

  const tl = gsap.timeline({ onComplete: () => { detailBusy = false; if (fromSpiral) helix.active = false; } });
  tl.set(pd.el, { visibility: 'visible' })
    .to(pd.el, { clipPath: 'inset(0% 0 0 0)', duration: 0.9, ease: 'power4.inOut' }, fromSpiral ? 0.35 : 0);
  detailContentIn(tl, fromSpiral ? 0.75 : 0.4);
}

let detailClosing = false;

function closeProject() {
  if (!detailOpen || detailClosing) return;
  detailClosing = true;
  gsap.killTweensOf([pd.el, pd.title, pd.img, ...pd.anims]);
  gsap.timeline({
    onComplete: () => {
      gsap.set(pd.el, { visibility: 'hidden' });
      pd.el.setAttribute('aria-hidden', 'true');
      detailOpen = false;
      detailClosing = false;
      detailBusy = false;
      detailLenis.stop();
      lenis.start();
      if (mode === 'spiral') helix.reveal();
    },
  })
    .to(pd.anims, { autoAlpha: 0, y: -20, duration: 0.35, stagger: 0.03, ease: 'power2.in' })
    .to(pd.title, { yPercent: -115, duration: 0.4, ease: 'power2.in' }, 0)
    .to(pd.el, { clipPath: 'inset(100% 0 0 0)', duration: 0.85, ease: 'power4.inOut' }, 0.18);
}

function swapProject(dir) {
  if (!detailOpen || detailBusy) return;
  detailBusy = true;
  const ni = (detailIndex + dir + projects.length) % projects.length;
  const tl = gsap.timeline({ onComplete: () => { detailBusy = false; } });
  tl.to(pd.anims, { autoAlpha: 0, y: dir * -26, duration: 0.32, stagger: 0.025, ease: 'power2.in' })
    .to(pd.title, { yPercent: dir * -115, duration: 0.38, ease: 'power2.in' }, 0)
    .add(() => { fillDetail(ni); detailLenis.scrollTo(0, { immediate: true, force: true }); });
  detailContentIn(tl, '+=0.05');
}

helix.onPick = (data) => { if (!menuOpen) openProject(data.projectIndex); };
document.querySelector('.pdetail__close').addEventListener('click', closeProject);
pd.prev.addEventListener('click', () => swapProject(-1));
pd.next.addEventListener('click', () => swapProject(1));
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeProject(); });

// list rows open the same detail view
ul.querySelectorAll('.project').forEach((li, i) =>
  li.addEventListener('click', () => openProject(i)));

/* ————————————————————————————— spiral ⇄ list toggle */

const toggleBtns = gsap.utils.toArray('.view-toggle__btn');
const setToggleUI = (m) => toggleBtns.forEach((b) => b.classList.toggle('is-active', b.dataset.mode === m));

function toList() {
  if (mode === 'list' || busy) return;
  busy = true;
  setToggleUI('list');
  helix.hide();
  onHelixHover(null);

  gsap.delayedCall(0.55, () => {
    mode = 'list';
    helix.active = false;
    worksSec.classList.add('is-list');
    lenis.scrollTo(worksSec, { immediate: true, force: true });
    ScrollTrigger.refresh();
    gsap.fromTo('.works .project',
      { autoAlpha: 0, y: 34 },
      { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.05, ease: 'power3.out', clearProps: 'all', onComplete: () => { busy = false; } });
    gsap.fromTo('.works__label', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 });
  });
}

function toSpiral() {
  if (mode === 'spiral' || busy) return;
  busy = true;
  setToggleUI('spiral');

  gsap.to('.works .project', {
    autoAlpha: 0, y: -20, duration: 0.45, stagger: 0.025, ease: 'power2.in',
    onComplete: () => {
      mode = 'spiral';
      worksSec.classList.remove('is-list');
      gsap.set('.works .project', { clearProps: 'all' });
      lenis.scrollTo(worksSec, { immediate: true, force: true });
      ScrollTrigger.refresh();
      helix.scrollPart = 0;
      helix.resize();
      helix.reveal();
      busy = false;
    },
  });
}

toggleBtns.forEach((b) =>
  b.addEventListener('click', () => (b.dataset.mode === 'list' ? toList() : toSpiral())));

/* ————————————————————————————— menu overlay */

const menuBtn = document.querySelector('.menu-btn');
const menuLabel = document.querySelector('.menu-btn__label');
const overlay = document.querySelector('.menu-overlay');
let menuOpen = false;

const menuTl = gsap.timeline({ paused: true })
  .set(overlay, { visibility: 'visible' })
  .to(overlay, { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'power4.inOut' })
  .fromTo('.menu__link', { yPercent: 120 }, { yPercent: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out' }, '-=0.35')
  .fromTo('.menu__foot', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, '-=0.4');

function setMenu(open) {
  menuOpen = open;
  menuBtn.setAttribute('aria-expanded', String(open));
  menuLabel.textContent = open ? 'close' : 'menu';
  overlay.setAttribute('aria-hidden', String(!open));
  if (open) { menuTl.timeScale(1).play(); lenis.stop(); }
  else { menuTl.timeScale(1.4).reverse(); lenis.start(); }
}
menuBtn.addEventListener('click', () => setMenu(!menuOpen));

document.querySelectorAll('.menu__link, .logo').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');
    if (menuOpen) setMenu(false);
    gsap.delayedCall(menuOpen ? 0 : 0.1, () => lenis.scrollTo(target, { duration: 1.4 }));
  });
});

document.querySelector('.hero__scroll').addEventListener('click', () =>
  lenis.scrollTo('#work', { duration: 1.4 }));

/* ————————————————————————————— ambient loops */

if (!reduceMotion) {
  gsap.to(marqueeTrack, { xPercent: -50, duration: 26, ease: 'none', repeat: -1 });
  gsap.to('.badge svg', { rotation: 360, duration: 18, ease: 'none', repeat: -1 });
}

/* ————————————————————————————— scroll reveals */

function revealUp(targets, trigger, vars = {}) {
  gsap.from(targets, {
    autoAlpha: 0, y: 40, duration: 1, stagger: 0.08, ease: 'power3.out',
    scrollTrigger: { trigger, start: 'top 80%', once: true },
    ...vars,
  });
}
revealUp(['.about__kicker', '.about__lead'], '.about');
revealUp('.about__col', '.about__grid');
revealUp(['.contact__kicker', '.contact__mail'], '.contact');
revealUp('.footer', '.footer', { y: 16, scrollTrigger: { trigger: '.footer', start: 'top bottom', once: true } });

/* ————————————————————————————— intro */

const hdr = document.querySelector('.site-header');

function intro() {
  if (reduceMotion) {
    gsap.set('.intro', { display: 'none' });
    gsap.set([hdr, '.hero__role', '.marquee', '.hero__scroll', '.badge', '.hero__kicker'], { autoAlpha: 1 });
    return;
  }
  lenis.stop();
  gsap.set([hdr, '.hero__role', '.marquee', '.hero__scroll', '.badge', '.hero__kicker'], { autoAlpha: 0 });
  gsap.set('.hero__title .line > span', { yPercent: 115 });

  gsap.timeline({ onComplete: () => lenis.start() })
    .fromTo('.intro__line span', { yPercent: 110 }, { yPercent: 0, stagger: 0.14, duration: 0.9, ease: 'power4.out' }, 0.25)
    .fromTo('.intro__bar i', { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0.3)
    .to('.intro__line span', { yPercent: -110, stagger: 0.09, duration: 0.65, ease: 'power3.in' }, '+=0.4')
    .to('.intro', { clipPath: 'inset(0 0 100% 0)', duration: 0.95, ease: 'power4.inOut' }, '-=0.3')
    .set('.intro', { display: 'none' })
    .to('.hero__title .line > span', { yPercent: 0, duration: 1.15, stagger: 0.1, ease: 'power4.out' }, '-=0.6')
    .to(['.hero__kicker', '.hero__role'], { autoAlpha: 1, duration: 0.9, ease: 'power3.out' }, '-=0.7')
    .fromTo(['.marquee', '.hero__scroll', '.badge'],
      { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out' }, '-=0.75')
    .to(hdr, { autoAlpha: 1, duration: 0.8 }, '<');
}
intro();

/* ————————————————————————————— footer clock */

const clock = document.getElementById('clock');
function tick() {
  clock.textContent = new Date().toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Amsterdam',
  });
}
tick();
setInterval(tick, 30_000);
