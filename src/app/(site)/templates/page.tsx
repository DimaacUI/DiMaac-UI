import Link from 'next/link';
import { Suspense } from 'react';
import TemplateCatalog from '@/core/components/TemplateCatalog';
import TemplateGrid from '@/core/components/TemplateGrid';
import { getCatalogTemplates } from '@/lib/templates/repository';

export default async function TemplatesPage() {
  const templates = await getCatalogTemplates();

  return (
    <div className="flex-1 md:mt-[1rem]">
      <header className="mb-8 space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-3">
            <h1 className="font-bold text-xl md:text-2xl text-white leading-tight">Templates</h1>
            <p className="text-sm md:text-md text-white/80 leading-relaxed max-w-2xl">
              Premium website templates — cinematic, ready to customize. Free templates download
              instantly. Pro templates unlock with DiMaac Pro.
            </p>
          </div>
          <Link
            href="/templates/pricing"
            className="inline-flex items-center justify-center rounded-lg bg-[#DDFC3E] text-black font-bold text-sm px-5 py-2.5 hover:opacity-90 transition-opacity shrink-0"
          >
            Pro pricing
          </Link>
        </div>
      </header>

      <Suspense fallback={<TemplateGrid templates={templates} />}>
        <TemplateCatalog templates={templates} />
      </Suspense>
    </div>
  );
}
