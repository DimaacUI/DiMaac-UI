'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { publishComponent, type ComponentInput } from '@/app/admin/components/actions';

const SECTIONS = [
  'Layout Components',
  'Gallery & Media',
  'Card Components',
  'Interactive Elements',
  'Scroll Animations',
  'Text & Animation',
];

const inputClass =
  'w-full rounded-lg border border-white/10 bg-[#17171A] px-3 py-2.5 text-sm text-white outline-none focus:border-[#DDFC3E]/60';
const labelClass = 'block text-xs font-medium text-white/60 mb-2';
const codeClass = `${inputClass} font-mono text-xs leading-relaxed min-h-[220px] resize-y`;

const DEMO_PLACEHOLDER = `'use client';

export default function MyComponentDemo() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      {/* your demo here */}
    </div>
  );
}`;

export default function ComponentPublishForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ url?: string; deploying?: boolean } | null>(null);

  const [form, setForm] = useState({
    slug: '',
    title: '',
    description: '',
    tagText: '',
    depsText: 'react, gsap',
    navSectionName: SECTIONS[0]!,
    cli: '',
    fullscreen: false,
    isNew: true,
    demoSource: '',
    componentFileName: '',
    componentSource: '',
  });

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      // Keep the slug in step until it's been edited by hand.
      slug:
        prev.slug === '' || prev.slug === slugify(prev.title) ? slugify(title) : prev.slug,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const payload: ComponentInput = {
      slug: form.slug,
      title: form.title,
      description: form.description,
      tags: splitList(form.tagText),
      dependencies: splitList(form.depsText),
      cli: form.cli || null,
      fullscreen: form.fullscreen,
      isNew: form.isNew,
      navSectionName: form.navSectionName,
      demoSource: form.demoSource,
      componentSource: form.componentSource || null,
      componentFileName: form.componentFileName || null,
      props: [],
    };

    startTransition(async () => {
      const result = await publishComponent(payload);

      if (!result.ok) {
        setError(result.error ?? 'Publish failed');
        return;
      }

      setSuccess({ url: result.commitUrl, deploying: result.deployTriggered });
      router.refresh();
    });
  }

  if (success) {
    return (
      <div className="max-w-2xl space-y-4 rounded-xl border border-[#DDFC3E]/25 bg-[#DDFC3E]/5 p-6">
        <h2 className="text-lg font-bold text-[#DDFC3E]">Committed</h2>
        <p className="text-sm text-white/70">
          {success.deploying
            ? 'Vercel is building now. Your component will be live in a minute or two.'
            : 'The commit landed, but no deploy hook is configured — trigger a redeploy in Vercel to ship it.'}
        </p>
        {success.url && (
          <a
            href={success.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-[#DDFC3E] hover:underline"
          >
            View commit ↗
          </a>
        )}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => router.push('/admin/components')}
            className="rounded-lg bg-[#DDFC3E] px-4 py-2 text-sm font-bold text-black"
          >
            Done
          </button>
          <button
            onClick={() => {
              setSuccess(null);
              setForm((prev) => ({ ...prev, slug: '', title: '', description: '', demoSource: '' }));
            }}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/70"
          >
            Publish another
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Title</label>
          <input
            className={inputClass}
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Mouse Tilt Card"
            required
          />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input
            className={inputClass}
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
            placeholder="mouse-tilt-card"
            required
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          className={`${inputClass} min-h-[80px] resize-y`}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Sidebar section</label>
          <select
            className={inputClass}
            value={form.navSectionName}
            onChange={(e) => set('navSectionName', e.target.value)}
          >
            {SECTIONS.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Tags (comma separated)</label>
          <input
            className={inputClass}
            value={form.tagText}
            onChange={(e) => set('tagText', e.target.value)}
            placeholder="React, GSAP, Cards"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Dependencies</label>
          <input
            className={inputClass}
            value={form.depsText}
            onChange={(e) => set('depsText', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>CLI install command (optional)</label>
          <input
            className={inputClass}
            value={form.cli}
            onChange={(e) => set('cli', e.target.value)}
            placeholder="npx dimaac add mouse-tilt-card"
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Demo component source</label>
        <textarea
          className={codeClass}
          value={form.demoSource}
          onChange={(e) => set('demoSource', e.target.value)}
          placeholder={DEMO_PLACEHOLDER}
          spellCheck={false}
          required
        />
        <p className="mt-2 text-xs text-white/35">
          Needs a default export. Committed to{' '}
          <code>src/examples/generated/…</code> and rendered on the component page.
        </p>
      </div>

      <details className="rounded-xl border border-white/10 bg-[#111114] p-5">
        <summary className="cursor-pointer text-sm font-semibold">
          Reusable source file (optional)
        </summary>
        <div className="mt-4 space-y-4">
          <div>
            <label className={labelClass}>Filename</label>
            <input
              className={inputClass}
              value={form.componentFileName}
              onChange={(e) => set('componentFileName', e.target.value)}
              placeholder="MouseTiltCard.tsx"
            />
          </div>
          <div>
            <label className={labelClass}>Source</label>
            <textarea
              className={codeClass}
              value={form.componentSource}
              onChange={(e) => set('componentSource', e.target.value)}
              spellCheck={false}
            />
            <p className="mt-2 text-xs text-white/35">
              Committed to <code>src/components/ui/</code> and shown in the Code tab.
            </p>
          </div>
        </div>
      </details>

      <div className="space-y-3 rounded-xl border border-white/10 bg-[#111114] p-5">
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={form.isNew}
            onChange={(e) => set('isNew', e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#DDFC3E]"
          />
          <span>
            <span className="block">New badge</span>
            <span className="block text-xs text-white/40">Shows the New pill in the sidebar</span>
          </span>
        </label>
        <label className="flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={form.fullscreen}
            onChange={(e) => set('fullscreen', e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#DDFC3E]"
          />
          <span>
            <span className="block">Fullscreen layout</span>
            <span className="block text-xs text-white/40">
              No sidebar — the demo fills the viewport
            </span>
          </span>
        </label>
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-[#DDFC3E] px-5 py-2.5 text-sm font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? 'Committing…' : 'Publish component'}
        </button>
        <p className="text-xs text-white/35">
          Commits to DimaacUI/DiMaac-UI and triggers a deploy.
        </p>
      </div>
    </form>
  );
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function splitList(value: string): string[] {
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}
