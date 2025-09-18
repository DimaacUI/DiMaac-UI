import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SidebarProps {
    title: string;
    sections: Section[];
    className?: string;
    onItemClick?: () => void;
    isMobile?: boolean;
}

interface Section{
    name: string;
    item: SidebarItem[];
}

interface SidebarItem{  
    name: string;
    href: string;
    isNew?: boolean;
    isActive: boolean;
}

// for position sticky to work you need a fixed height and a top position

const Sidebar = ({sections, className, onItemClick, isMobile = false}: SidebarProps) => {
  return (
    <div className={cn(
      isMobile 
        ? "w-full transition-all duration-300 ease-in" 
        : "h-[calc(100dvh-2.5rem)] w-full sticky top-10 overflow-y-auto transition-all duration-300 ease-in", 
      className
    )}>
        <div className={cn("flex flex-col w-full gap-6", isMobile ? "" : "h-full")}>
            {sections.map((section)=>{
                return(
                    <div key={section.name} className="flex flex-col">
                        <h1 className="text-md font-bold mb-2">{section.name}</h1>
                        {section.item.map((eachItem) => {
                            return(
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
  )
}

export default Sidebar