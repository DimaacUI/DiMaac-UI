import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTemplates } from '@/data/templateData';

/** Dev-only catalog — preview HTML templates from private/templates */
export default function DevTemplatesCatalogPage() {
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  const templates = getAllTemplates();

  return (
    <div className="min-h-[100dvh] bg-[#0B0B0F] text-white p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-white/40 mb-2">Development only</p>
          <h1 className="text-2xl font-bold">Template previews</h1>
          <p className="text-sm text-white/60 mt-2">
            Local previews from <code className="text-[#DDFC3E]">private/templates/</code>. Not available
            when deployed.
          </p>
        </div>
        <ul className="space-y-3">
          {templates.map((t) => (
            <li key={t.slug}>
              <a
                href={`/dev/preview/${t.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#17171A] px-4 py-3 hover:border-white/25 transition-colors"
              >
                <span>
                  <span className="font-semibold block">{t.title}</span>
                  <span className="text-sm text-white/50 line-clamp-1">{t.description}</span>
                </span>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full shrink-0 ${
                    t.tier === 'free' ? 'bg-white text-black' : 'bg-[#DDFC3E] text-black'
                  }`}
                >
                  {t.tier}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="text-sm text-white/40">
          <Link href="/templates" className="text-[#DDFC3E] hover:underline">
            ← Back to templates catalog
          </Link>
        </p>
      </div>
    </div>
  );
}
