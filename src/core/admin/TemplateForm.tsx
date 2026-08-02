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

  // Pro templates must not expose a live preview of paid source.
  const isPro = form.tier === 'pro';
  const proNeedsVideo = isPro && !form.comingSoon;

  function handleTierChange(tier: 'free' | 'pro') {
    setForm((prev) => ({
      ...prev,
      tier,
      previewType: tier === 'pro' ? 'video' : prev.previewType,
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
            disabled={proNeedsVideo}
          >
            <option value="live">Live iframe</option>
            <option value="video">Video</option>
          </select>
        </div>
      </div>

      {proNeedsVideo && (
        <p className="rounded-lg border border-[#DDFC3E]/25 bg-[#DDFC3E]/5 px-3 py-2 text-xs text-[#DDFC3E]">
          Pro templates show a video instead of a live preview, so the paid source is never served
          to visitors who haven&apos;t purchased.
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
          label={`Preview video${proNeedsVideo ? ' (required for pro)' : ''}`}
          hint="MP4 or WebM. This is what non-purchasers see for pro templates."
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
