'use client';

import { useState } from 'react';
import TabPanel, { TabItem } from './TabPanel';

interface ClientTabPanelProps {
    tabList: string[];
    defaultTab?: string;
    children: React.ReactNode;
}

export default function ClientTabPanel({ 
    tabList, 
    defaultTab = tabList[0], 
    children 
}: ClientTabPanelProps) {
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <TabPanel
            tabList={tabList}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >
            {children}
        </TabPanel>
    );
}

export { TabItem };
