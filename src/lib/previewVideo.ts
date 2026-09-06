import { existsSync } from 'fs';
import path from 'path';
import type { VideoSource } from '@/core/components/TemplateVideoPlayer';

/**
 * For a preview served from /public (e.g. `/previews/altura.mp4`), return the
 * quality encodes and poster that `npm run encode:previews` writes next to it:
 *
 *   altura.mp4          1080p, fast-start (the file previewVideoUrl points at)
 *   altura-720.mp4      720p
 *   altura-480.mp4      480p
 *   altura-poster.jpg   first frame, shown before play
 *
 * The poster is the marker that the set exists — the encoder always writes all
 * four together, and only the small posters are traced into the serverless
 * bundle (see next.config.ts), so this check works on Vercel without shipping
 * the videos inside the function. Remote URLs (Blob uploads, YouTube) get no
 * variants and play as one source.
 */
export function getPreviewVideoSources(previewVideoUrl?: string): {
  sources: VideoSource[];
  poster?: string;
} {
  if (!previewVideoUrl || !previewVideoUrl.startsWith('/') || !previewVideoUrl.endsWith('.mp4')) {
    return { sources: [] };
  }
  const base = previewVideoUrl.slice(0, -4);
  const posterPath = path.join(process.cwd(), 'public', `${base}-poster.jpg`);
  if (!existsSync(posterPath)) return { sources: [] };

  return {
    sources: [
      { src: `${base}.mp4`, size: 1080 },
      { src: `${base}-720.mp4`, size: 720 },
      { src: `${base}-480.mp4`, size: 480 },
    ],
    poster: `${base}-poster.jpg`,
  };
}
