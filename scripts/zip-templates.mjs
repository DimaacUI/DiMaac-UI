#!/usr/bin/env node
/**
 * Zip deliverable templates. Slugs must match keys in src/data/templateData.ts
 * Strips dev/AI cruft and injects DiMaac LICENSE into every zip.
 */
import fs from 'fs';
import path from 'path';
import { execSync, spawnSync } from 'child_process';

const ROOT = path.join(process.cwd(), 'private/templates');
const LICENSE_DIR = path.join(ROOT, '_licenses');
const BUILD_DIR = path.join(ROOT, '.build');

/** Shared excludes for all templates (AI tooling, dev deps, build output). */
const DEFAULT_EXCLUDES = [
  '*.DS_Store',
  '__MACOSX/*',
  '.vscode/*',
  '.cursor/*',
  '.claude/*',
  '.idea/*',
  'node_modules/*',
  '.next/*',
  'out/*',
  'out/*/*',
  'out/*/*/*',
  'out/*/*/*/*',
  'out/*/*/*/*/*',
  'scripts/out/*',
  'scripts/*.mjs',
  '*.tsbuildinfo',
  '.git/*',
  '.editorconfig',
  '.build/*',
  '_licenses/*',
];

/** Zip -x patterns for a directory tree (recursive globs). */
function treeExcludes(root, depth = 6) {
  const patterns = [];
  let p = root;
  for (let i = 0; i < depth; i++) {
    patterns.push(`${p}/*`);
    p += '/*';
  }
  return patterns;
}

/** @type {Record<string, string[]>} */
const EXCLUDE = {
  default: DEFAULT_EXCLUDES,
  etude: ['scripts/*', ...treeExcludes('out', 8)],
  'veldt-folio': [],
  lumen: [],
  'phantom-sphere': [
    ...treeExcludes('vendor/gsap/dist', 4),
    ...treeExcludes('vendor/gsap/src', 6),
    ...treeExcludes('vendor/gsap/types', 4),
    ...treeExcludes('vendor/gsap/utils', 3),
    'vendor/gsap/README.md',
    'vendor/gsap/SECURITY.md',
    'vendor/gsap/package.json',
    'vendor/gsap/all.js',
    'vendor/gsap/InertiaPlugin.js',
    'vendor/gsap/PhysicsPropsPlugin.js',
    'vendor/gsap/SplitText.js',
    'vendor/gsap/Draggable.js',
    'vendor/gsap/GSDevTools.js',
    'vendor/gsap/MotionPathPlugin.js',
    'vendor/gsap/ScrollTrigger.js',
    'vendor/gsap/MotionPathHelper.js',
    'vendor/gsap/ScrollToPlugin.js',
    'vendor/gsap/TextPlugin.js',
    'vendor/gsap/EasePack.js',
    'vendor/gsap/Observer.js',
    'vendor/gsap/ScrollSmoother.js',
    'vendor/gsap/ScrambleTextPlugin.js',
    'vendor/gsap/CustomBounce.js',
    'vendor/gsap/PixiPlugin.js',
    'vendor/gsap/DrawSVGPlugin.js',
    'vendor/gsap/CustomEase.js',
    'vendor/gsap/Flip.js',
    'vendor/gsap/EaselPlugin.js',
    'vendor/gsap/CustomWiggle.js',
    'vendor/gsap/MorphSVGPlugin.js',
    'vendor/gsap/CSSRulePlugin.js',
    'vendor/gsap/Physics2DPlugin.js',
  ],
};

const SLUGS = [
  'minimal',
  'aurora',
  'ember',
  'prism',
  'maya',
  'backend',
  'altura',
  'lumen',
  'overclock',
  'phantom-sphere',
  'portfolio-landing',
  'veldt-folio',
  'etude',
];

/** Free templates — live on site now. */
const FREE_SLUGS = ['minimal', 'ember', 'prism', 'backend', 'portfolio-landing', 'aurora', 'veldt-folio', 'maya'];

/** Free + pro templates available in the catalog. */
const LAUNCH_SLUGS = [
  ...FREE_SLUGS,
  'overclock',
  'phantom-sphere',
  'altura',
  'lumen',
  'etude',
];

const onlyFree = process.argv.includes('--free');
const onlyLaunch = process.argv.includes('--launch');
const slugsToZip = onlyFree ? FREE_SLUGS : onlyLaunch ? LAUNCH_SLUGS : SLUGS;

function injectLicense(slug, zipPath) {
  const tier = FREE_SLUGS.includes(slug) ? 'LICENSE-FREE.txt' : 'LICENSE-PRO.txt';
  const licenseSrc = path.join(LICENSE_DIR, tier);
  if (!fs.existsSync(licenseSrc)) {
    console.warn('Skip license inject (missing):', licenseSrc);
    return;
  }
  fs.mkdirSync(BUILD_DIR, { recursive: true });
  const staged = path.join(BUILD_DIR, 'LICENSE');
  fs.copyFileSync(licenseSrc, staged);
  execSync(`zip -j "${zipPath}" "${staged}"`, { stdio: 'inherit' });
}

for (const slug of slugsToZip) {
  const dir = path.join(ROOT, slug);
  const zip = path.join(ROOT, `${slug}.zip`);
  if (!fs.existsSync(dir)) {
    console.warn('Skip (missing):', slug);
    continue;
  }
  if (fs.existsSync(zip)) {
    fs.unlinkSync(zip);
  }
  const excludes = [...(EXCLUDE.default ?? DEFAULT_EXCLUDES), ...(EXCLUDE[slug] ?? [])];
  const zipArgs = ['-r', zip, '.', ...excludes.flatMap((p) => ['-x', p])];
  const result = spawnSync('zip', zipArgs, { cwd: dir, stdio: 'inherit' });
  if (result.status !== 0) {
    throw new Error(`zip failed for ${slug}`);
  }
  injectLicense(slug, zip);
  console.log('Zipped:', slug);
}
