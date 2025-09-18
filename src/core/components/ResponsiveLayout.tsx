'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import HamburgerMenu from './HamburgerMenu';
import Logo from './Logo';

interface Section {
  name: string;
  item: SidebarItem[];
}

interface SidebarItem {
  name: string;
  href: string;
  isNew?: boolean;
  isActive: boolean;
}

interface ResponsiveLayoutProps {
  sections: Section[];
  children: React.ReactNode;
}

const ResponsiveLayout = ({ sections, children }: ResponsiveLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint is 768px
    };

    // Check initial size
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header with Hamburger */}
      {isMobile && (
        <header className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm border-b border-white/10">
          <Logo className="w-24 h-auto" />
          <HamburgerMenu 
            isOpen={isMobileMenuOpen} 
            onClick={toggleMobileMenu}
          />
        </header>
      )}

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <div className={cn(
          "fixed top-0 left-0 h-full w-80 bg-black z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Fixed Header */}
          <div className="flex-shrink-0 p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <Logo className="w-24 h-auto" />
              <button
                onClick={closeMobileMenu}
                className="text-white hover:text-gray-300 text-2xl"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <Sidebar 
              title="DIMAC" 
              sections={sections} 
              className="w-full"
              onItemClick={closeMobileMenu}
              isMobile={true}
            />
          </div>
        </div>
      )}

      {/* Dynamic Main Layout - Only one main element */}
      <main className={cn(
        isMobile 
          ? "w-full px-4 py-4" // Mobile: full width container
          : "flex w-[100dvw] max-w-[1440px] gap-5 px-4 py-0 container mx-auto" // Desktop: layout with sidebar
      )}>
        {!isMobile && (
          <Sidebar title="DIMAC" sections={sections} className="w-[300px]" isMobile={false}/>
        )}
        {children}
      </main>
    </>
  );
};

export default ResponsiveLayout;
