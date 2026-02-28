import { cn } from "@/lib/utils";
import React from "react";

interface TabPanelProps {
    children: React.ReactNode;
    tabList: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}

interface TabHeaderProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

interface TabItemProps {
    children: React.ReactNode;
    label: string;
    isActive?: boolean;
}

const TabHeader = ({ label, isActive, onClick }: TabHeaderProps) => {
    return (
        <button 
            onClick={onClick} 
            className={cn(
                "px-4 py-2 transition-colors rounded-none",
                isActive 
                    ? "bg-[#17171A] text-[#EDEDED] border-b border-white" 
                    : "bg-transparent text-white/80 hover:bg-[#17171A]"
            )}
        >
            {label}
        </button>
    );
};

const TabItem = ({ children, isActive = false }: TabItemProps) => {
    if (!isActive) return null;
    
    return (
        <div className="mt-4 p-4 bg-[#17171A] border  border-white/20 rounded-md">
            {children}
        </div>
    );
};

const TabPanel = ({ children, tabList, activeTab, onTabChange }: TabPanelProps) => {
    // Extract tab items from children
    const tabItems = React.Children.toArray(children) as React.ReactElement<TabItemProps>[];

    return (
        <div className="w-full">
            {/* Tab Headers */}
            <div className="flex border-b border-white/20">
                {tabList.map((tab) => (
                    <TabHeader
                        key={tab}
                        label={tab}
                        isActive={activeTab === tab}
                        onClick={() => onTabChange(tab)}
                    />
                ))}
            </div>
            
            {/* Tab Content */}
            <div>
                {tabItems.map((tabItem) => 
                    React.cloneElement(tabItem, {
                        ...tabItem.props,
                        isActive: activeTab === tabItem.props.label
                    })
                )}
            </div>
        </div>
    );
};

export default TabPanel;
export { TabItem };