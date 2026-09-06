"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";

// Cursor "modes" the custom cursor can morph into.
export type CursorMode = "default" | "link" | "view" | "drag";

type Controls = {
  setCursor: (m: CursorMode) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
};

const ControlsContext = createContext<Controls | null>(null);

// The live cursor mode sits in its own context. Every hover on the site calls
// setCursor; with the value in the shared context, each one re-rendered the
// header, the menu, the hero slider and every link that had merely *set* it.
// Now only the <Cursor /> that actually draws the mode re-renders.
const CursorModeContext = createContext<CursorMode>("default");

/** Shared UI state: cursor mode + the full-screen menu toggle. */
export function UIProvider({ children }: { children: ReactNode }) {
  const [cursor, setCursor] = useState<CursorMode>("default");
  const [menuOpen, setMenuOpen] = useState(false);
  const controls = useMemo(() => ({ setCursor, menuOpen, setMenuOpen }), [menuOpen]);

  return (
    <ControlsContext.Provider value={controls}>
      <CursorModeContext.Provider value={cursor}>{children}</CursorModeContext.Provider>
    </ControlsContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(ControlsContext);
  if (!ctx) throw new Error("useUI must be used within <UIProvider>");
  return ctx;
}

/** The current cursor mode — read by the cursor itself, nothing else. */
export function useCursorMode() {
  return useContext(CursorModeContext);
}
