'use client';

import React, { createContext, useContext } from 'react';

export interface LenisContextValue {
  /** Ref to custom scroller element, or null to use window */
  scrollerRef: React.RefObject<HTMLElement | null> | null;
  /** True when the scroller is ready; use in effect deps */
  isReady: boolean;
}

const LenisContext = createContext<LenisContextValue>({
  scrollerRef: null,
  isReady: true,
});

export const LenisProvider = LenisContext.Provider;

export function useLenisScroll(): LenisContextValue {
  return useContext(LenisContext);
}

/** Resolve the actual scroller element for ScrollTrigger (element or window) */
export function getScroller(value: LenisContextValue): HTMLElement | Window | undefined {
  if (value.scrollerRef?.current) return value.scrollerRef.current;
  return typeof window !== 'undefined' ? window : undefined;
}
