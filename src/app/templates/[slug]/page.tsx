import Badge from '@/core/components/Badge';
import TemplateDownloadPanel from '@/core/components/TemplateDownloadPanel';
import TemplatePreview from '@/core/components/TemplatePreview';
import {
  getDevTemplateRunCommand,
  getTemplateBySlug,
  getTemplateLivePreviewUrl,
  isTemplateComingSoon,
} from '@/data/templateData';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { TemplatePage } from '@/types/templates';

interface TemplateDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template || isTemplateComingSoon(slug)) {
    redirect('/templates');
  }

  const subscriptionCheckoutUrl = process.env.NEXT_PUBLIC_LEMONSQUEEZY_SUBSCRIPTION_MONTHLY_URL;

  const livePreviewUrl = getTemplateLivePreviewUrl(slug);
  const devRunCommand =
    process.env.NODE_ENV === 'development' ? getDevTemplateRunCommand(slug) : undefined;
  const previewTemplate: TemplatePage = livePreviewUrl
    ? { ...template, previewType: 'live', previewUrl: livePreviewUrl }
    : template;

  const stackLabel =
    template.stack === 'html' ? 'HTML' : template.stack === 'vite' ? 'Vite' : 'Next.js';

  return (
    <div className="w-full md:max-w-[calc(100%-300px)] md:mt-[1rem]">
      <header className="mb-8 flex flex-col gap-8">
        <Link
          href="/templates"
          className="inline-block text-sm text-white/60 hover:text-white transition-colors"
        >
          ← All templates
        </Link>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-bold text-xl md:text-2xl text-white leading-tight">{template.title}</h1>
            {template.tier === 'free' ? (
              <span className="text-xs font-bold text-black bg-white px-3 py-1 rounded-full">Free</span>
            ) : (
              <span className="text-xs font-bold text-black bg-[#DDFC3E] px-3 py-1 rounded-full">Pro</span>
            )}
            {template.isNew && (
              <span className="text-xs font-bold text-black bg-[#DDFC3E] px-3 py-1 rounded-full">New</span>
            )}
          </div>
          <p className="text-sm md:text-md text-white/80 leading-relaxed">{template.description}</p>
        </div>
        <div className="flex flex-wrap gap-3 pt-1">
          <Badge>{stackLabel}</Badge>
          {template.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </header>

      <TemplatePreview template={previewTemplate} devRunCommand={devRunCommand} />

      <section className="mb-8">
        <TemplateDownloadPanel
          template={template}
          subscriptionCheckoutUrl={subscriptionCheckoutUrl}
        />
      </section>

      {template.tier === 'pro' && (
        <section className="rounded-xl border border-white/10 bg-[#17171A] p-6 text-sm text-white/70 space-y-2">
          <h3 className="text-md font-semibold text-white">Included</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Full HTML / WebGL source (zip)</li>
            <li>Documentation for setup & customization</li>
            <li>Commercial use per license terms</li>
          </ul>
          <p className="pt-2">
            Prefer all templates?{' '}
            <Link href="/templates/pricing" className="text-[#DDFC3E] hover:underline">
              See Pro subscription →
            </Link>
          </p>
        </section>
      )}
    </div>
  );
}
