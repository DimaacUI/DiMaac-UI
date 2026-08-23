'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import FileUploadField from './FileUploadField';
import {
  createTemplate,
  updateTemplate,
  deleteTemplate,
  type TemplateInput,
} from '@/app/admin/templates/actions';
import type { TemplateRow } from '@/db/schema';

const EMPTY: TemplateInput = {
  slug: '',
  title: '',
  description: '',
  tier: 'free',
  stack: 'html',
  tags: [],
  thumbnail: '',
  previewType: 'live',
  previewUrl: null,
  previewVideoUrl: null,
  previewRoot: null,
  fullscreenPreview: false,
  zipBlobUrl: null,
  zipFileName: null,
  zipSizeBytes: null,
  comingSoon: false,
  isNew: false,
  published: true,
};

function rowToInput(row: TemplateRow): TemplateInput {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    tier: row.tier as 'free' | 'pro',
    stack: row.stack as 'html' | 'vite' | 'nextjs',
    tags: row.tags ?? [],
    thumbnail: row.thumbnail,
    previewType: row.previewType as 'live' | 'video',
    previewUrl: row.previewUrl,
    previewVideoUrl: row.previewVideoUrl,
    previewRoot: row.previewRoot,
    fullscreenPreview: row.fullscreenPreview,
    zipBlobUrl: row.zipBlobUrl,
    zipFileName: row.zipFileName,
    zipSizeBytes: row.zipSizeBytes,
    comingSoon: row.comingSoon,
    isNew: row.isNew,
    published: row.published,
  };
}

const inputClass =
  'w-full rounded-lg border border-white/10 bg-[#17171A] px-3 py-2.5 text-sm text-white outline-none focus:border-[#DDFC3E]/60';
const labelClass = 'block text-xs font-medium text-white/60 mb-2';

export default function TemplateForm({ existing }: { existing?: TemplateRow }) {
  const router = useRouter();
  const [form, setForm] = useState<TemplateInput>(existing ? rowToInput(existing) : EMPTY);
  const [tagText, setTagText] = useState((existing?.tags ?? []).join(', '));
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function set<K extends keyof TemplateInput>(key: K, value: TemplateInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // A pro template may only be previewed live from built output (previewRoot),
  // which keeps its source unreachable, or from its own external deploy.
  const isPro = form.tier === 'pro';
  const hasExternalPreview = /^https?:\/\//.test((form.previewUrl ?? '').trim());
  const hasPreviewRoot = Boolean((form.previewRoot ?? '').trim());
  const proCanGoLive = hasPreviewRoot || hasExternalPreview;
  const proLiveNeedsSource = isPro && form.previewType === 'live' && !proCanGoLive;

  function handleTierChange(tier: 'free' | 'pro') {
    setForm((prev) => ({
      ...prev,
      tier,
      // video is the safe default for pro until a built folder or demo URL exists
      previewType: tier === 'pro' && !proCanGoLive ? 'video' : prev.previewType,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);

    const payload: TemplateInput = {
      ...form,
      tags: tagText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    startTransition(async () => {
      const result = existing
        ? await updateTemplate(existing.id, payload)
        : await createTemplate(payload);

      if (!result.ok) {
        setError(result.error ?? 'Something went wrong');
        return;
      }

      router.push('/admin/templates');
      router.refresh();
    });
  }

  function handleDelete() {
    if (!existing) return;
    if (!confirm(`Delete "${existing.title}"? This also removes its uploaded files.`)) return;

    startTransition(async () => {
      const result = await deleteTemplate(existing.id);
      if (!result.ok) {
        setError(result.error ?? 'Delete failed');
        return;
      }
      router.push('/admin/templates');
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Title</label>
          <input
            className={inputClass}
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input
            className={inputClass}
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
            placeholder="my-template"
            required
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          className={`${inputClass} min-h-[90px] resize-y`}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Tier</label>
          <select
            className={inputClass}
            value={form.tier}
            onChange={(e) => handleTierChange(e.target.value as 'free' | 'pro')}
          >
            <option value="free">Free</option>
            <option value="pro">Pro</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Stack</label>
          <select
            className={inputClass}
            value={form.stack}
            onChange={(e) => set('stack', e.target.value as TemplateInput['stack'])}
          >
            <option value="html">HTML</option>
            <option value="vite">Vite</option>
            <option value="nextjs">Next.js</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Preview type</label>
          <select
            className={inputClass}
            value={form.previewType}
            onChange={(e) => set('previewType', e.target.value as 'live' | 'video')}
          >
            <option value="live">Live iframe</option>
            <option value="video">Video</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>Preview root</label>
          <input
            className={inputClass}
            value={form.previewRoot ?? ''}
            onChange={(e) => set('previewRoot', e.target.value.trim() || null)}
            placeholder="out"
          />
          <p className="mt-1.5 text-xs text-white/40">
            Built-output folder inside the template — <code>out</code> for Next, <code>dist</code>{' '}
            for Vite. Set this and the preview URL is generated automatically.
          </p>
        </div>
        <div>
          <label className={labelClass}>Preview URL (optional)</label>
          <input
            className={inputClass}
            type="url"
            inputMode="url"
            value={form.previewUrl ?? ''}
            onChange={(e) => set('previewUrl', e.target.value.trim() || null)}
            placeholder="https://…"
          />
          <p className="mt-1.5 text-xs text-white/40">
            Only needed to point at an external deploy instead. Leave empty to serve the built
            output above.
          </p>
        </div>
      </div>

      {isPro && form.previewType === 'video' && (
        <p className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/60">
          Video preview — the paid source is never served to visitors who haven&apos;t purchased.
          For a live demo instead, ship built output in the zip and set Preview root.
        </p>
      )}

      {proLiveNeedsSource && (
        <p className="rounded-lg border border-[#DDFC3E]/25 bg-[#DDFC3E]/5 px-3 py-2 text-xs text-[#DDFC3E]">
          A live preview would serve this pro template&apos;s source. Set Preview root to its built
          folder (<code>out</code>, <code>dist</code>), or point Preview URL at an external deploy.
        </p>
      )}

      {isPro && form.previewType === 'live' && proCanGoLive && (
        <p className="rounded-lg border border-emerald-400/25 bg-emerald-400/5 px-3 py-2 text-xs text-emerald-300">
          {hasPreviewRoot
            ? 'Preview URL is generated automatically from the built output — source and zip stay unreachable.'
            : 'Live demo from your own deploy — visitors see the built site, never the source or the zip.'}
        </p>
      )}

      <div>
        <label className={labelClass}>Tags (comma separated)</label>
        <input
          className={inputClass}
          value={tagText}
          onChange={(e) => setTagText(e.target.value)}
          placeholder="Portfolio, WebGL, GSAP"
        />
      </div>

      <div className="space-y-5 rounded-xl border border-white/10 bg-[#111114] p-5">
        <h3 className="text-sm font-semibold">Files</h3>

        <FileUploadField
          label="Thumbnail"
          hint="Shown on the templates grid. A wide screenshot reads better than a square crop."
          accept="image/*"
          folder="templates/thumbnails"
          value={form.thumbnail || null}
          onChange={(url) => set('thumbnail', url ?? '')}
        />

        <FileUploadField
          label="Template zip"
          hint="What buyers download. Uploaded straight to Blob storage, so large files are fine."
          accept=".zip"
          folder="templates/zips"
          value={form.zipBlobUrl ?? null}
          onChange={(url, meta) => {
            set('zipBlobUrl', url);
            set('zipSizeBytes', meta?.size ?? null);
            if (meta?.name) set('zipFileName', meta.name);
          }}
        />

        <FileUploadField
          label={`Preview video${isPro && form.previewType === 'video' ? ' (required)' : ''}`}
          hint="MP4 or WebM. This is what non-purchasers see when preview type is Video."
          accept="video/mp4,video/webm"
          folder="templates/previews"
          value={form.previewVideoUrl ?? null}
          onChange={(url) => set('previewVideoUrl', url)}
        />
      </div>

      <div className="space-y-3 rounded-xl border border-white/10 bg-[#111114] p-5">
        <h3 className="mb-1 text-sm font-semibold">Options</h3>
        {(
          [
            ['published', 'Published', 'Visible in the public catalog'],
            ['isNew', 'New badge', 'Shows the New pill on the card'],
            ['comingSoon', 'Coming soon', 'Listed but not downloadable'],
            ['fullscreenPreview', 'Fullscreen preview', 'Embed the preview full-width'],
          ] as const
        ).map(([key, label, hint]) => (
          <label key={key} className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={Boolean(form[key])}
              onChange={(e) => set(key, e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#DDFC3E]"
            />
            <span>
              <span className="block">{label}</span>
              <span className="block text-xs text-white/40">{hint}</span>
            </span>
          </label>
        ))}
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-[#DDFC3E] px-5 py-2.5 text-sm font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? 'Saving…' : existing ? 'Save changes' : 'Create template'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/templates')}
          className="rounded-lg border border-white/15 px-5 py-2.5 text-sm text-white/70 transition-colors hover:text-white"
        >
          Cancel
        </button>
        {existing && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={pending}
            className="ml-auto text-sm text-red-400 transition-colors hover:text-red-300 disabled:opacity-50"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
