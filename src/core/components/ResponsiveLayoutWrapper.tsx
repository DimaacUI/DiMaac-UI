'use client';

import { usePathname } from 'next/navigation';
import ResponsiveLayout from './ResponsiveLayout';

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

interface ResponsiveLayoutWrapperProps {
  sections: Section[];
  children: React.ReactNode;
}

const ResponsiveLayoutWrapper = ({ sections, children }: ResponsiveLayoutWrapperProps) => {
  const pathname = usePathname();

  // Function to determine if a navigation item should be active
  const isItemActive = (href: string): boolean => {
    if (href === '/' && pathname === '/') {
      return true;
    }
    if (href !== '/' && pathname.startsWith(href)) {
      return true;
    }
    return false;
  };

  // Update sections with dynamic active state
  const sectionsWithActiveState = sections.map(section => ({
    ...section,
    item: section.item.map(item => ({
      ...item,
      isActive: isItemActive(item.href)
    }))
  }));

  return (
    <ResponsiveLayout sections={sectionsWithActiveState}>
      {children}
    </ResponsiveLayout>
  );
};

export default ResponsiveLayoutWrapper;
