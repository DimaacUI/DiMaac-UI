'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Logo from './Logo';

interface SidebarProps {
    title: string;
    sections: Section[];
    className?: string;
    onItemClick?: () => void;
    isMobile?: boolean;
}

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

// for position sticky to work you need a fixed height and a top position

const Sidebar = ({ sections, className, onItemClick, isMobile = false }: SidebarProps) => {
    const handleWheel = (e: React.WheelEvent) => {
        if (!isMobile) e.stopPropagation();
    };

    return (
        <div
            className={cn(
                isMobile
                    ? "w-full transition-all duration-300 ease-in"
                    : "h-[calc(100dvh-1.25rem)] w-full sticky top-5 overflow-y-auto transition-all duration-300 ease-in",
                className
            )}
            onWheel={handleWheel}
        >
            <div className={cn("flex flex-col w-full", isMobile ? "" : "h-full")}>
            {!isMobile && (
                <div className="mb-4">
                    <Logo className="w-24 h-auto" />
                </div>
            )}
                <div className="flex flex-col gap-6">
                {sections.map((section) => {
                    return (
                        <div key={section.name} className="flex flex-col">
                            <h1 className="text-md font-bold mb-2">{section.name}</h1>
                            {section.item.map((eachItem) => {
                                return (
                                    <Link
                                        href={eachItem.href}
                                        key={eachItem.name}
                                        className={cn(
                                            "text-sm transition-all duration-300 ease-in leading-relaxed border-l border-white/20 pl-4",
                                            eachItem.isActive
                                                ? "text-white font-bold border-white"
                                                : "text-white/80 hover:text-white"
                                        )}
                                        onClick={onItemClick}
                                    >
                                        {eachItem.name} {eachItem.isNew && <span className='text-xs text-black bg-[#DDFC3E] px-2 rounded-full ml-2 font-bold'>New</span>}
                                    </Link>
                                )
                            })}
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

export default Sidebar