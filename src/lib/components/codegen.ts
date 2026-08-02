import 'server-only';
import type { ComponentRow } from '@/db/schema';

/**
 * Renders the two generated registry files from the components table.
 *
 * Both files are rewritten wholesale on every publish — no partial edits, no
 * AST surgery on hand-written source, and the DB stays the single source of
 * truth for what's published.
 */

const GENERATED_HEADER = `/**
 * GENERATED FILE — DO NOT EDIT BY HAND.
 *
 * Rewritten by the admin portal on every component publish.
 */`;

/** PascalCase demo component name for a slug: "mouse-tilt-card" → "MouseTiltCard". */
export function toPascalCase(slug: string): string {
  return slug
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

export function demoFilePath(slug: string, category: string): string {
  return `src/examples/generated/${category}/${toPascalCase(slug)}Demo.tsx`;
}

/** Import specifier used inside the generated registry (matches the @/ alias). */
function demoImportPath(slug: string, category: string): string {
  return `@/examples/generated/${category}/${toPascalCase(slug)}Demo`;
}

function j(value: unknown): string {
  return JSON.stringify(value ?? null, null, 2)
    .split('\n')
    .map((line, index) => (index === 0 ? line : `    ${line}`))
    .join('\n');
}

export function renderComponentRegistry(rows: ComponentRow[]): string {
  const published = rows.filter((row) => row.deployStatus !== 'draft');

  const imports = published
    .map((row) => {
      const name = `${toPascalCase(row.slug)}Demo`;
      const category = (row.navSectionName ?? 'misc').toLowerCase().replace(/[^a-z0-9]+/g, '-');
      return `import ${name} from '${demoImportPath(row.slug, category)}';`;
    })
    .join('\n');

  const entries = published
    .map((row) => {
      const name = `${toPascalCase(row.slug)}Demo`;
      return `  ${JSON.stringify(row.slug)}: {
    id: ${JSON.stringify(row.slug)},
    slug: ${JSON.stringify(row.slug)},
    title: ${JSON.stringify(row.title)},
    description: ${JSON.stringify(row.description)},
    tags: ${j(row.tags)},
    dependencies: ${j(row.dependencies)},
    ${row.cli ? `cli: ${JSON.stringify(row.cli)},\n    ` : ''}fullscreen: ${row.fullscreen},
    demoComponent: ${name},
    ${row.demoSourcePath ? `demoSourcePath: ${JSON.stringify(row.demoSourcePath)},\n    ` : ''}githubFiles: ${j(row.githubFiles)},
    props: ${j(row.props)},
    isNew: ${row.isNew},
  },`;
    })
    .join('\n');

  return `import { ComponentPage } from '@/types/components';
${imports ? `${imports}\n` : ''}
${GENERATED_HEADER}
export const generatedComponentData: Record<string, ComponentPage> = {
${entries}
};
`;
}

export function renderNavRegistry(rows: ComponentRow[]): string {
  const published = rows.filter((row) => row.deployStatus !== 'draft');

  const bySection = new Map<string, ComponentRow[]>();
  for (const row of published) {
    const section = row.navSectionName ?? 'Components';
    if (!bySection.has(section)) bySection.set(section, []);
    bySection.get(section)!.push(row);
  }

  const entries = [...bySection.entries()]
    .map(([section, items]) => {
      const sorted = [...items].sort((a, b) => a.sortOrder - b.sortOrder);
      const lines = sorted
        .map(
          (row) =>
            `    { name: ${JSON.stringify(row.title)}, href: ${JSON.stringify(
              `/components/${row.slug}`,
            )}, isActive: false, isNew: ${row.isNew} },`,
        )
        .join('\n');
      return `  ${JSON.stringify(section)}: [\n${lines}\n  ],`;
    })
    .join('\n');

  return `import type { SidebarItem } from './navigation';

${GENERATED_HEADER}
export const generatedNavItems: Record<string, SidebarItem[]> = {
${entries}
};
`;
}
