import {
  pgTable,
  text,
  uuid,
  boolean,
  integer,
  jsonb,
  timestamp,
  bigserial,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

/**
 * Source of truth for everything the admin portal can change without a rebuild.
 *
 * Templates are fully dynamic (metadata here, files in Blob storage).
 * Components are git-backed — this table mirrors their metadata for the admin
 * UI and analytics joins, but the rendered demo still lives in code.
 */

// --- Templates ---------------------------------------------------------------

export const templates = pgTable(
  'templates',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    description: text('description').notNull(),

    /** 'free' | 'pro' — pro requires a valid Lemon Squeezy license to download. */
    tier: text('tier').notNull().default('free'),
    /** 'html' | 'vite' | 'nextjs' */
    stack: text('stack').notNull().default('html'),

    tags: jsonb('tags').$type<string[]>().notNull().default([]),

    /** Card thumbnail — Blob URL, or a /public path for legacy rows. */
    thumbnail: text('thumbnail').notNull(),

    /** 'live' (iframe demo) | 'video' (pro: show a video instead of the site). */
    previewType: text('preview_type').notNull().default('live'),
    previewUrl: text('preview_url'),
    previewVideoUrl: text('preview_video_url'),
    /** Subfolder served in dev preview, e.g. `dist` for Vite builds. */
    previewRoot: text('preview_root'),
    fullscreenPreview: boolean('fullscreen_preview').notNull().default(false),

    /** Blob URL for the downloadable zip. Preferred over zipFileName. */
    zipBlobUrl: text('zip_blob_url'),
    /** Legacy on-disk zip in private/templates/ — fallback when no Blob URL. */
    zipFileName: text('zip_file_name'),
    zipSizeBytes: integer('zip_size_bytes'),

    /** Listed in the catalog but not downloadable yet. */
    comingSoon: boolean('coming_soon').notNull().default(false),
    isNew: boolean('is_new').notNull().default(false),
    /** Unpublished templates are hidden from the public catalog entirely. */
    published: boolean('published').notNull().default(true),

    sortOrder: integer('sort_order').notNull().default(0),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex('templates_slug_idx').on(t.slug),
    index('templates_sort_idx').on(t.sortOrder),
  ],
);

// --- Sidebar navigation ------------------------------------------------------

export const navSections = pgTable(
  'nav_sections',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
  },
  (t) => [index('nav_sections_sort_idx').on(t.sortOrder)],
);

export const navItems = pgTable(
  'nav_items',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    sectionId: uuid('section_id')
      .notNull()
      .references(() => navSections.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    href: text('href').notNull(),
    isNew: boolean('is_new').notNull().default(false),
    sortOrder: integer('sort_order').notNull().default(0),
  },
  (t) => [index('nav_items_section_idx').on(t.sectionId, t.sortOrder)],
);

// --- Components (git-backed; this table is metadata + publish state) ---------

export const components = pgTable(
  'components',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    tags: jsonb('tags').$type<string[]>().notNull().default([]),
    dependencies: jsonb('dependencies').$type<string[]>().notNull().default([]),
    cli: text('cli'),
    fullscreen: boolean('fullscreen').notNull().default(false),
    isNew: boolean('is_new').notNull().default(false),

    /** Which sidebar section this component is filed under. */
    navSectionName: text('nav_section_name'),
    sortOrder: integer('sort_order').notNull().default(0),

    demoSourcePath: text('demo_source_path'),
    githubFiles: jsonb('github_files')
      .$type<{ name: string; githubPath: string; displayName?: string }[]>()
      .notNull()
      .default([]),
    props: jsonb('props').$type<unknown[]>().notNull().default([]),

    /** Publish pipeline state: the commit + deploy that shipped this component. */
    deployStatus: text('deploy_status').notNull().default('draft'),
    deployCommitSha: text('deploy_commit_sha'),
    deployError: text('deploy_error'),
    publishedAt: timestamp('published_at', { withTimezone: true }),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex('components_slug_idx').on(t.slug)],
);

// --- Analytics ---------------------------------------------------------------

/**
 * First-party events from the public site. Deliberately PII-free: the session
 * id is a rotating hash, and we keep only coarse referrer/country.
 */
export const analyticsEvents = pgTable(
  'analytics_events',
  {
    id: bigserial('id', { mode: 'number' }).primaryKey(),

    /**
     * 'page_view' | 'component_view' | 'template_view' | 'download_start'
     * | 'download_success' | 'download_denied' | 'pro_gate_view' | 'checkout_click'
     */
    type: text('type').notNull(),
    path: text('path').notNull(),
    /** Template or component slug, when the event is about one. */
    slug: text('slug'),
    tier: text('tier'),

    referrerHost: text('referrer_host'),
    country: text('country'),
    /** 'mobile' | 'tablet' | 'desktop' */
    device: text('device'),

    /** Rotating daily hash — lets us count uniques without identifying anyone. */
    sessionHash: text('session_hash'),
    meta: jsonb('meta').$type<Record<string, unknown>>(),

    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index('analytics_created_idx').on(t.createdAt),
    index('analytics_type_created_idx').on(t.type, t.createdAt),
    index('analytics_slug_idx').on(t.slug),
  ],
);

// --- Settings ----------------------------------------------------------------

export const settings = pgTable('settings', {
  key: text('key').primaryKey(),
  value: jsonb('value').$type<unknown>(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type TemplateRow = typeof templates.$inferSelect;
export type NewTemplateRow = typeof templates.$inferInsert;
export type ComponentRow = typeof components.$inferSelect;
export type AnalyticsEventRow = typeof analyticsEvents.$inferSelect;
export type NavSectionRow = typeof navSections.$inferSelect;
export type NavItemRow = typeof navItems.$inferSelect;
