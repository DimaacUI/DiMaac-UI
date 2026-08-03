'use client';

import { usePathname } from 'next/navigation';
import { isFullscreenComponent } from '@/data/componentData';
import ResponsiveLayoutWrapper from './ResponsiveLayoutWrapper';
import { NAV_SECTIONS } from '@/config/navigation';

interface FullscreenLayoutHandlerProps {
  children: React.ReactNode;
}

/** For fullscreen component routes: render full viewport without sidebar. Otherwise use normal layout. */
export default function FullscreenLayoutHandler({ children }: FullscreenLayoutHandlerProps) {
  const pathname = usePathname();

  const match = pathname.match(/^\/components\/([^/]+)$/);
  const slug = match?.[1];
  const useFullscreen = slug ? isFullscreenComponent(slug) : false;

  if (useFullscreen) {
    return <div className="min-h-[100dvh] w-full">{children}</div>;
  }

  return <ResponsiveLayoutWrapper sections={NAV_SECTIONS}>{children}</ResponsiveLayoutWrapper>;
}
