'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { TemplateRow } from '@/db/schema';
import {
  importStaticTemplates,
  reorderTemplates,
  setTemplatePublished,
} from '@/app/admin/templates/actions';

export default function TemplateList({ rows }: { rows: TemplateRow[] }) {
  const router = useRouter();
  const [order, setOrder] = useState(rows);
  const [pending, startTransition] = useTransition();
  const [notice, setNotice] = useState<string | null>(null);

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= order.length) return;

    const next = [...order];
    [next[index], next[target]] = [next[target]!, next[index]!];
    setOrder(next);

    startTransition(async () => {
      await reorderTemplates(next.map((r) => r.id));
      router.refresh();
    });
  }

  function togglePublished(row: TemplateRow) {
    startTransition(async () => {
      await setTemplatePublished(row.id, !row.published);
      router.refresh();
    });
  }

  function handleImport() {
    startTransition(async () => {
      const result = await importStaticTemplates();
      setNotice(result.ok ? (result.summary ?? 'Imported.') : (result.error ?? 'Import failed'));
      router.refresh();
    });
  }

  if (order.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#111114] p-6">
        <p className="font-semibold">No templates in the database yet</p>
        <p className="mt-2 max-w-lg text-sm text-white/55">
          Import the 13 templates already on your site to get started. This reads them from the
          build and uploads any zips it finds locally — safe to run more than once.
        </p>
        <button
          onClick={handleImport}
          disabled={pending}
          className="mt-4 rounded-lg bg-[#DDFC3E] px-4 py-2.5 text-sm font-bold text-black disabled:opacity-50"
        >
          {pending ? 'Importing…' : 'Import existing templates'}
        </button>
        {notice && <p className="mt-3 text-sm text-white/60">{notice}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {notice && (
        <p className="rounded-lg border border-white/10 bg-[#111114] px-3 py-2 text-sm text-white/60">
          {notice}
        </p>
      )}

      {order.map((row, index) => (
        <div
          key={row.id}
          className={`flex items-center gap-4 rounded-xl border border-white/10 bg-[#111114] p-3 transition-opacity ${
            row.published ? '' : 'opacity-50'
          }`}
        >
          <div className="flex flex-col">
            <button
              onClick={() => move(index, -1)}
              disabled={index === 0 || pending}
              className="px-1 text-xs text-white/40 hover:text-white disabled:opacity-20"
              aria-label="Move up"
            >
              ▲
            </button>
            <button
              onClick={() => move(index, 1)}
              disabled={index === order.length - 1 || pending}
              className="px-1 text-xs text-white/40 hover:text-white disabled:opacity-20"
              aria-label="Move down"
            >
              ▼
            </button>
          </div>

          <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md bg-black/40">
            {row.thumbnail && (
              <Image
                src={row.thumbnail}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
                unoptimized={row.thumbnail.startsWith('http')}
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate font-semibold">{row.title}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  row.tier === 'pro' ? 'bg-[#DDFC3E] text-black' : 'bg-white text-black'
                }`}
              >
                {row.tier}
              </span>
              {row.isNew && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold">
                  NEW
                </span>
              )}
              {row.comingSoon && (
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/60">
                  soon
                </span>
              )}
              {!row.zipBlobUrl && !row.zipFileName && (
                <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] text-red-300">
                  no zip
                </span>
              )}
            </div>
            <p className="truncate text-xs text-white/40">/{row.slug}</p>
          </div>

          <button
            onClick={() => togglePublished(row)}
            disabled={pending}
            className="shrink-0 text-xs text-white/50 hover:text-white disabled:opacity-40"
          >
            {row.published ? 'Unpublish' : 'Publish'}
          </button>

          <Link
            href={`/admin/templates/${row.slug}`}
            className="shrink-0 rounded-lg border border-white/15 px-3 py-1.5 text-sm transition-colors hover:border-white/35"
          >
            Edit
          </Link>
        </div>
      ))}

      <div className="pt-4">
        <button
          onClick={handleImport}
          disabled={pending}
          className="text-sm text-white/40 hover:text-white disabled:opacity-40"
        >
          Re-sync from build data
        </button>
      </div>
    </div>
  );
}
