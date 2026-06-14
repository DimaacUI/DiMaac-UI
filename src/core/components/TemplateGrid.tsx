'use client';

import Image from 'next/image';
import Link from 'next/link';
import { TemplatePage } from '@/types/templates';

interface TemplateGridProps {
  templates: TemplatePage[];
  /** Optional heading rendered before the first coming-soon card */
  comingSoonHeading?: string;
}

const cardClassName =
  'block w-full sm:w-[calc(50%-1rem)] lg:w-[calc(50%-1rem)] h-[300px] sm:h-[350px] md:h-[400px] transition-all duration-300 ease-in relative border border-white/10 rounded-lg overflow-hidden';

function TemplateBadges({ template }: { template: TemplatePage }) {
  return (
    <div className="absolute top-4 left-4 z-10 flex gap-2">
      {template.comingSoon ? (
        <span className="text-xs font-bold text-white bg-white/15 backdrop-blur px-3 py-1 rounded-full border border-white/20">
          Coming soon
        </span>
      ) : template.tier === 'free' ? (
        <span className="text-xs font-bold text-black bg-white px-3 py-1 rounded-full">Free</span>
      ) : (
        <span className="text-xs font-bold text-black bg-[#DDFC3E] px-3 py-1 rounded-full">Pro</span>
      )}
      {template.isNew && !template.comingSoon && (
        <span className="text-xs font-bold text-black bg-[#DDFC3E] px-3 py-1 rounded-full">New</span>
      )}
    </div>
  );
}

function TemplateCardBody({ template }: { template: TemplatePage }) {
  return (
    <>
      <TemplateBadges template={template} />
      <div className="w-full h-full overflow-hidden flex items-center justify-center bg-[#17171A]">
        <div className="aspect-square max-w-full max-h-full w-full">
          <Image
            src={template.thumbnail}
            alt={template.title}
            width={1080}
            height={1080}
            className={`w-full h-full object-cover transition-all duration-200 ease-in ${
              template.comingSoon ? 'opacity-60 scale-100' : 'hover:scale-105'
            }`}
          />
        </div>
      </div>
      <div
        className="inset-0 absolute"
        style={{
          background: 'linear-gradient(to bottom, transparent, #0B0B0F)',
          pointerEvents: 'none',
        }}
      />
      <div className="absolute bottom-0 w-full h-32 left-0 backdrop-blur-xs px-4 sm:px-6 md:px-8 pb-5 flex flex-col items-start justify-end gap-1">
        <h3 className="text-base sm:text-lg font-bold">{template.title}</h3>
        <p className="text-xs sm:text-sm text-white/80 line-clamp-2">{template.description}</p>
      </div>
    </>
  );
}

const TemplateGrid = ({ templates, comingSoonHeading = 'Pro — coming soon' }: TemplateGridProps) => {
  const firstComingSoonIndex = templates.findIndex((t) => t.comingSoon);

  return (
    <div className="flex flex-wrap w-full gap-4">
      {templates.map((template, index) => (
        <div key={template.slug} className="contents">
          {comingSoonHeading && index === firstComingSoonIndex && firstComingSoonIndex > 0 && (
            <h2 className="w-full text-sm font-semibold uppercase tracking-[0.2em] text-white/45 pt-4 pb-1">
              {comingSoonHeading}
            </h2>
          )}
          {template.comingSoon ? (
            <div
              aria-label={`${template.title} — coming soon`}
              className={`${cardClassName} cursor-default opacity-90`}
            >
              <TemplateCardBody template={template} />
            </div>
          ) : (
            <Link href={`/templates/${template.slug}`} className={`${cardClassName} hover:border-white/20`}>
              <TemplateCardBody template={template} />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default TemplateGrid;
