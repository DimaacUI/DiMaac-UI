import { readFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { getTemplateBySlug } from '@/data/templateData';

export const TEMPLATES_ROOT = path.join(process.cwd(), 'private/templates');

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8',
};

const TEXT_EXTENSIONS = new Set(['.html', '.css', '.js', '.mjs', '.json', '.svg', '.txt']);

const ROOT_ASSET_PREFIXES = ['/_next/', '/works/', '/images/', '/assets/'] as const;

function isTextAsset(ext: string): boolean {
  return TEXT_EXTENSIONS.has(ext);
}

function isAbsoluteOrSpecial(url: string): boolean {
  const u = url.trim();
  if (u.startsWith('/') && !u.startsWith('//')) return false;
  return /^(https?:|\/|mailto:|tel:|data:|#|javascript:)/i.test(u);
}

function toPreviewPath(previewPrefix: string, slug: string, relPath: string): string {
  const clean = relPath.replace(/^\.\//, '').replace(/^\//, '');
  return `${previewPrefix}/${slug}/${clean}`;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function rewriteRootAbsolutePaths(text: string, slug: string, previewPrefix: string): string {
  const previewBase = `${previewPrefix}/${slug}`;
  let out = text;

  for (const root of ROOT_ASSET_PREFIXES) {
    const target = `${previewBase}${root}`;
    const re = new RegExp(`(?<!${escapeRegExp(previewBase)})${escapeRegExp(root)}`, 'g');
    out = out.replace(re, target);
    out = out.replaceAll(`url(${root}`, `url(${target}`);
  }

  const double = `${previewBase}${previewBase}`;
  while (out.includes(double)) {
    out = out.replaceAll(double, previewBase);
  }

  return out;
}

function rewriteImportMaps(html: string, slug: string, previewPrefix: string): string {
  return html.replace(
    /<script\s+type=["']importmap["'][^>]*>([\s\S]*?)<\/script>/gi,
    (match, jsonText) => {
      try {
        const map = JSON.parse(jsonText) as { imports?: Record<string, string> };
        if (map.imports) {
          for (const [key, val] of Object.entries(map.imports)) {
            if (typeof val === 'string' && !isAbsoluteOrSpecial(val)) {
              map.imports[key] = toPreviewPath(previewPrefix, slug, val);
            }
          }
        }
        return `<script type="importmap">\n${JSON.stringify(map, null, 2)}\n</script>`;
      } catch {
        return match;
      }
    },
  );
}

function rewritePreviewHtml(html: string, slug: string, previewPrefix: string): string {
  let out = html.replace(/<base[^>]*>\s*/i, '');

  out = rewriteImportMaps(out, slug, previewPrefix);

  out = out.replace(/\s(href|src|srcset|poster)=(["'])([^"']+)\2/gi, (match, attr, quote, url) => {
    if (isAbsoluteOrSpecial(url)) return match;
    const hashIdx = url.indexOf('#');
    const relPath = hashIdx >= 0 ? url.slice(0, hashIdx) : url;
    const hash = hashIdx >= 0 ? url.slice(hashIdx) : '';
    if (!relPath || relPath === '.') {
      return ` ${attr}=${quote}${toPreviewPath(previewPrefix, slug, 'index.html')}${hash}${quote}`;
    }
    return ` ${attr}=${quote}${toPreviewPath(previewPrefix, slug, relPath)}${hash}${quote}`;
  });

  return rewriteRootAbsolutePaths(out, slug, previewPrefix);
}

function rewritePreviewAsset(text: string, slug: string, ext: string, previewPrefix: string): string {
  if (ext === '.css' || ext === '.js' || ext === '.mjs') {
    return rewriteRootAbsolutePaths(text, slug, previewPrefix);
  }
  return text;
}

function resolveRelativePath(segments: string[]): string {
  const slug = segments[0]!;
  const template = getTemplateBySlug(slug);
  const tail = segments.slice(1);

  if (tail.length === 0) {
    const root = template?.previewRoot;
    if (root) return path.join(slug, root, 'index.html');
    return path.join(slug, 'index.html');
  }

  if (template?.previewRoot) {
    return path.join(slug, template.previewRoot, ...tail);
  }

  return segments.join('/');
}

export async function serveTemplatePreview(
  segments: string[],
  previewPrefix: string,
  allowSlug: (slug: string) => boolean,
): Promise<NextResponse> {
  if (segments.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const slug = segments[0]!;
  if (!allowSlug(slug)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const relativePath = resolveRelativePath(segments);
  const absolutePath = path.resolve(TEMPLATES_ROOT, relativePath);
  const rootWithSep = TEMPLATES_ROOT + path.sep;

  if (!absolutePath.startsWith(rootWithSep) && absolutePath !== TEMPLATES_ROOT) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const ext = path.extname(absolutePath).toLowerCase();
  const contentType = MIME[ext];

  if (!contentType) {
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 404 });
  }

  try {
    const file = await readFile(absolutePath);
    const body = isTextAsset(ext)
      ? ext === '.html'
        ? rewritePreviewHtml(file.toString('utf8'), slug, previewPrefix)
        : rewritePreviewAsset(file.toString('utf8'), slug, ext, previewPrefix)
      : file;

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        Pragma: 'no-cache',
        'X-Frame-Options': 'SAMEORIGIN',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
