'use client';

import { cn } from '@/lib/utils';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

const HamburgerMenu = ({ isOpen, onClick, className }: HamburgerMenuProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col justify-center items-center w-8 h-8 bg-transparent border-none cursor-pointer p-0",
        "md:hidden", // Only show on mobile
        className
      )}
      aria-label="Toggle menu"
    >
      <span
        className={cn(
          "block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out",
          isOpen ? "rotate-45 translate-y-1.5" : "rotate-0 translate-y-0"
        )}
      />
      <span
        className={cn(
          "block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out mt-1",
          isOpen ? "opacity-0" : "opacity-100"
        )}
      />
      <span
        className={cn(
          "block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out mt-1",
          isOpen ? "-rotate-45 -translate-y-1.5" : "rotate-0 translate-y-0"
        )}
      />
    </button>
  );
};

export default HamburgerMenu;
