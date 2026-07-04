#!/usr/bin/env node
/**
 * Zip deliverable templates. Slugs must match keys in src/data/templateData.ts
 * Strips dev/AI cruft and injects DiMaac LICENSE into every zip.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

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
  'scripts/out/*',
  'scripts/*.mjs',
  '*.tsbuildinfo',
  '.git/*',
  '.editorconfig',
  '.build/*',
  '_licenses/*',
];

/** @type {Record<string, string[]>} */
const EXCLUDE = {
  default: DEFAULT_EXCLUDES,
  etude: ['scripts/*'],
  'veldt-folio': [],
  lumen: [],
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
  const excludes = [...(EXCLUDE.default ?? DEFAULT_EXCLUDES), ...(EXCLUDE[slug] ?? [])];
  const excludeFlags = excludes.map((p) => `-x "${p}"`).join(' ');
  execSync(`cd "${dir}" && zip -r "${zip}" . ${excludeFlags}`, { stdio: 'inherit' });
  injectLicense(slug, zip);
  console.log('Zipped:', slug);
}
