#!/usr/bin/env node
/**
 * Zip deliverable templates. Slugs must match keys in src/data/templateData.ts
 * Never ships node_modules, .next, or dev cruft.
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT = path.join(process.cwd(), 'private/templates');

/** @type {Record<string, string[]>} */
const EXCLUDE = {
  default: ['*.DS_Store', '__MACOSX/*', '.vscode/*'],
  etude: ['node_modules/*', '.next/*', 'scripts/out/*', '.claude/*', '*.tsbuildinfo'],
  'veldt-folio': ['node_modules/*'],
};

const SLUGS = [
  'minimal',
  'aurora',
  'ember',
  'prism',
  'frontend',
  'backend',
  'altura',
  'musea',
  'overclock',
  'phantom-sphere',
  'portfolio-landing',
  'veldt-folio',
  'etude',
];

/** Free templates — live on site now. */
const FREE_SLUGS = ['minimal', 'ember', 'prism', 'backend', 'portfolio-landing', 'aurora'];

/** Free + pro templates available in the catalog. */
const LAUNCH_SLUGS = [
  ...FREE_SLUGS,
  'frontend',
  'altura',
  'etude',
  'overclock',
];

const onlyFree = process.argv.includes('--free');
const onlyLaunch = process.argv.includes('--launch');
const slugsToZip = onlyFree ? FREE_SLUGS : onlyLaunch ? LAUNCH_SLUGS : SLUGS;

for (const slug of slugsToZip) {
  const dir = path.join(ROOT, slug);
  const zip = path.join(ROOT, `${slug}.zip`);
  if (!fs.existsSync(dir)) {
    console.warn('Skip (missing):', slug);
    continue;
  }
  const excludes = [...EXCLUDE.default, ...(EXCLUDE[slug] ?? [])];
  const excludeFlags = excludes.map((p) => `-x "${p}"`).join(' ');
  execSync(`cd "${dir}" && zip -r "${zip}" . ${excludeFlags}`, { stdio: 'inherit' });
  console.log('Zipped:', slug);
}
