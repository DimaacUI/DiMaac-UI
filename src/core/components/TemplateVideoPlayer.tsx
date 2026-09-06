'use client';

import { useEffect, useRef } from 'react';
import 'plyr/dist/plyr.css';

export interface VideoSource {
  src: string;
  /** Vertical resolution, used as the quality label. */
  size: number;
}

interface TemplateVideoPlayerProps {
  sources: VideoSource[];
  poster?: string;
  title: string;
  /** Quality chosen on first play. Defaults to 720 when available. */
  defaultQuality?: number;
}

/**
 * Plyr-based preview player. Given several encodes of the same recording it
 * exposes a quality menu (and remembers the choice), plus speed control,
 * keyboard shortcuts, picture-in-picture and fullscreen. Files are expected
 * to be fast-start MP4s so playback begins before the download finishes.
 */
const TemplateVideoPlayer = ({ sources, poster, title, defaultQuality = 720 }: TemplateVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    let player: import('plyr') | null = null;
    let cancelled = false;

    // Plyr touches `window` at import time, so load it on the client only.
    // Plyr reads a non-standard `size` attribute on each <source> to switch
    // quality; React's typings don't allow it, so it is set here instead.
    el.querySelectorAll('source').forEach((src) => {
      if (src.dataset.size) src.setAttribute('size', src.dataset.size);
    });

    import('plyr').then(({ default: Plyr }) => {
      if (cancelled || !videoRef.current) return;
      const sizes = sources.map((s) => s.size).sort((a, b) => b - a);
      const initial = sizes.includes(defaultQuality) ? defaultQuality : sizes[Math.min(1, sizes.length - 1)];
      player = new Plyr(videoRef.current, {
        controls: [
          'play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume',
          'settings', 'pip', 'fullscreen',
        ],
        settings: sizes.length > 1 ? ['quality', 'speed'] : ['speed'],
        quality: { default: initial, options: sizes, forced: true },
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
        ratio: '16:10',
        storage: { enabled: true, key: 'dimaac-plyr' },
        tooltips: { controls: true, seek: true },
        keyboard: { focused: true, global: false },
        i18n: { qualityLabel: { 0: 'Auto' } },
      });
    });

    return () => {
      cancelled = true;
      player?.destroy();
    };
    // Sources are stable for a given template page.
  }, [sources.map((s) => s.src).join('|')]);

  return (
    <div className="dimaac-player absolute inset-0">
      <video
        ref={videoRef}
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={`${title} preview`}
        className="h-full w-full"
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type="video/mp4" data-size={s.size} />
        ))}
      </video>
    </div>
  );
};

export default TemplateVideoPlayer;
