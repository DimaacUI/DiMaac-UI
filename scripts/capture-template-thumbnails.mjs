#!/usr/bin/env node
/**
 * Capture dev preview screenshots → public/templates/{slug}.png
 * Requires: npm run dev, and Playwright (uses etude template's install if present).
 *
 *   node scripts/capture-template-thumbnails.mjs
 */
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'public/templates');
const baseUrl = process.env.PREVIEW_BASE ?? 'http://localhost:3000/dev/preview';

const slugs = [
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

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require(path.join(root, 'private/templates/etude/node_modules/playwright')));
} catch {
  console.error('Install Playwright in private/templates/etude first (npm install).');
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

for (const slug of slugs) {
  const url = `${baseUrl}/${slug}`;
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(slug === 'etude' ? 3500 : 1500);
    const buf = await page.screenshot({ type: 'png' });
    const dest = path.join(outDir, `${slug}.png`);
    await writeFile(dest, buf);
    console.log('Captured', slug);
  } catch (err) {
    console.warn('Skip', slug, err.message);
  }
}

await browser.close();
console.log('Done → public/templates/');
