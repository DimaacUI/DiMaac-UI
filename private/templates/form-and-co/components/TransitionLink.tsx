"use client";

import { ReactNode, MouseEvent } from "react";
import { useTransition } from "@/context/TransitionContext";
import { useUI } from "@/context/UIContext";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Cursor mode to switch to while hovering this link. */
  cursorMode?: "link" | "view";
  onClick?: () => void;
};

/**
 * Drop-in replacement for <Link> that routes through the transition overlay
 * instead of navigating instantly. Also drives the custom cursor state.
 */
export default function TransitionLink({
  href,
  children,
  className,
  cursorMode = "link",
  onClick,
}: Props) {
  const { navigateTo } = useTransition();
  const { setCursor, setMenuOpen } = useUI();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    onClick?.();
    setMenuOpen(false);
    setCursor("default");
    navigateTo(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setCursor(cursorMode)}
      onMouseLeave={() => setCursor("default")}
      className={className}
    >
      {children}
    </a>
  );
}
