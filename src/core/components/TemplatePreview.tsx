'use client';

import Image from 'next/image';
import { TemplatePage } from '@/types/templates';

function isEmbedUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('vimeo.com');
}

function isExternalPreview(url: string): boolean {
  return /^https?:\/\//.test(url);
}

function toEmbedUrl(url: string): string {
  if (url.includes('youtube.com/watch')) {
    const id = new URL(url).searchParams.get('v');
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes('vimeo.com/') && !url.includes('player.vimeo.com')) {
    const id = url.split('vimeo.com/')[1]?.split('?')[0];
    return id ? `https://player.vimeo.com/video/${id}` : url;
  }
  return url;
}

interface TemplatePreviewProps {
  template: TemplatePage;
  devRunCommand?: string;
}

const TemplatePreview = ({ template, devRunCommand }: TemplatePreviewProps) => {
  const isVideo = template.previewType === 'video';
  const label = isVideo ? 'Preview' : 'Live preview';
  const liveUrl = template.previewUrl;
  const isLocalServer = liveUrl ? isExternalPreview(liveUrl) : false;

  return (
    <section className="mb-8 w-full rounded-xl border border-white/10 overflow-hidden bg-[#17171A]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="text-sm font-semibold text-white">{label}</span>
        {!isVideo && liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#DDFC3E] hover:underline"
          >
            Open full screen ↗
          </a>
        )}
        {isVideo && (
          <span className="text-xs text-white/50">Screen recording — source not publicly hosted</span>
        )}
      </div>

      {isLocalServer && devRunCommand && (
        <div className="px-4 py-3 border-b border-white/10 bg-[#0f0f12] text-xs text-white/60 space-y-1">
          <p>
            This template runs its own dev server. In a second terminal:
          </p>
          <code className="block text-[#DDFC3E]/90 font-mono text-[11px] break-all">{devRunCommand}</code>
        </div>
      )}

      <div className="relative w-full aspect-[16/10] min-h-[320px] bg-black">
        {isVideo && template.previewVideoUrl ? (
          isEmbedUrl(template.previewVideoUrl) ? (
            <iframe
              src={toEmbedUrl(template.previewVideoUrl)}
              title={`${template.title} preview`}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={template.previewVideoUrl}
              controls
              playsInline
              preload="metadata"
              poster={template.thumbnail}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )
        ) : isVideo ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <Image
              src={template.thumbnail}
              alt={template.title}
              width={800}
              height={500}
              className="max-h-[60%] w-auto object-contain opacity-80 rounded-lg"
            />
            <p className="text-sm text-white/60">Add previewVideoUrl in templateData (MP4 or YouTube/Vimeo)</p>
          </div>
        ) : liveUrl ? (
          <iframe
            src={liveUrl}
            title={`${template.title} preview`}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-white/50">
            Preview not configured
          </div>
        )}
      </div>
    </section>
  );
};

export default TemplatePreview;
