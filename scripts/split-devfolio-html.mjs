#!/usr/bin/env node
/**
 * One-off: split single-file HTML portfolios into index.html + styles.css + main.js
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.join(process.cwd(), 'private/templates/devfolios');

const SOURCES = [
  { slug: 'minimal', file: 'minimal.html' },
  { slug: 'aurora', file: 'aurora/index.html' },
  { slug: 'ember', file: 'ember/index.html' },
  { slug: 'prism', file: 'prism/index.html' },
  { slug: 'frontend', file: 'frontend.html' },
  { slug: 'backend', file: 'backend.html' },
  { slug: 'gamedev', file: 'gamedev.html' },
];

function splitHtml(html) {
  const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  const scriptMatches = [...html.matchAll(/<script(?![^>]*\ssrc=)([^>]*)>([\s\S]*?)<\/script>/gi)];
  const scripts = scriptMatches.map((m) => m[2].trim()).filter(Boolean);

  let cleaned = html;
  if (styleMatch) {
    cleaned = cleaned.replace(/<style[^>]*>[\s\S]*?<\/style>/i, '  <link rel="stylesheet" href="./styles.css" />');
  }
  for (const m of scriptMatches) {
    cleaned = cleaned.replace(m[0], '');
  }
  cleaned = cleaned.replace(/\s*<\/body>/i, '\n  <script src="./main.js"></script>\n</body>');

  return {
    index: cleaned.trim() + '\n',
    css: styleMatch ? styleMatch[1].trim() + '\n' : '/* no styles */\n',
    js: scripts.length ? scripts.join('\n\n') + '\n' : '// no scripts\n',
  };
}

for (const { slug, file } of SOURCES) {
  const srcPath = path.join(ROOT, file);
  const outDir = path.join(process.cwd(), 'private/templates', slug);
  const html = fs.readFileSync(srcPath, 'utf8');
  const { index, css, js } = splitHtml(html);

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), index);
  fs.writeFileSync(path.join(outDir, 'styles.css'), css);
  fs.writeFileSync(path.join(outDir, 'main.js'), js);
  console.log('Created', slug);
}
