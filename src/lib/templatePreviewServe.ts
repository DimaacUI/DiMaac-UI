import { access, readFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { getTemplateBySlug } from '@/lib/templates/repository';

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
    // Only where the path starts a URL (after a quote, bracket, `=`, comma or
    // whitespace) — never inside an absolute URL such as https://cdn/assets/x.
    const re = new RegExp(
      `(?<=["'(=,\\s])(?<!${escapeRegExp(previewBase)})${escapeRegExp(root)}`,
      'g',
    );
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

/** Drop any segment that could climb out of the template folder. */
function safeSegments(segments: string[]): string[] {
  return segments.filter((s) => s !== '' && s !== '.' && s !== '..' && !s.includes('\0'));
}

async function resolveRelativePath(segments: string[]): Promise<string | null> {
  const slug = segments[0]!;
  if (slug === '.' || slug === '..' || slug.includes('/') || slug.includes('\\')) return null;

  const template = await getTemplateBySlug(slug);
  let tail = safeSegments(segments.slice(1));
  const root = template?.previewRoot;

  // A framework export built with basePath = this preview URL already carries
  // the prefix in its own asset URLs; the text rewrite may add it a second
  // time. Collapse any repeated "<prefix>/<slug>" at the head of the path.
  const prefixSegments = ['api', 'templates', 'preview', slug];
  while (
    tail.length >= prefixSegments.length &&
    prefixSegments.every((seg, i) => tail[i] === seg)
  ) {
    tail = tail.slice(prefixSegments.length);
  }

  if (tail.length === 0) {
    return root ? path.join(slug, root, 'index.html') : path.join(slug, 'index.html');
  }

  return root ? path.join(slug, root, ...tail) : path.join(slug, ...tail);
}

export async function serveTemplatePreview(
  segments: string[],
  previewPrefix: string,
  allowSlug: (slug: string) => boolean | Promise<boolean>,
): Promise<NextResponse> {
  if (segments.length === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const slug = segments[0]!;
  if (!(await allowSlug(slug))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const relativePath = await resolveRelativePath(segments);
  if (!relativePath) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const absolutePath = path.resolve(TEMPLATES_ROOT, relativePath);
  const rootWithSep = TEMPLATES_ROOT + path.sep;

  if (!absolutePath.startsWith(rootWithSep) && absolutePath !== TEMPLATES_ROOT) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // a scoped preview must never escape its own built-output folder
  const template = await getTemplateBySlug(segments[0]!);
  if (template?.previewRoot) {
    const scope = path.resolve(TEMPLATES_ROOT, segments[0]!, template.previewRoot) + path.sep;
    if (!absolutePath.startsWith(scope)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  // Extension-less paths are routes from a static export: try the folder's
  // index.html (trailingSlash builds) and then "<route>.html".
  let filePath = absolutePath;
  if (!path.extname(filePath)) {
    for (const candidate of [path.join(filePath, 'index.html'), `${filePath}.html`]) {
      try {
        await access(candidate);
        filePath = candidate;
        break;
      } catch {
        /* try the next candidate */
      }
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext];

  if (!contentType) {
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 404 });
  }

  try {
    const file = await readFile(filePath);
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
