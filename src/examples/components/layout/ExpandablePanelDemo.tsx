'use client';

import { useState, useEffect } from 'react';
import ExpandablePanel from '@/ui/components/layout/ExpandablePanel';

const DEMO_IMAGES = [
  { image: "/gori.webp", alt: "Gori" },
  { image: "/crocs2.webp", alt: "Snap" },
  { image: "/crow.webp", alt: "Crowley" },
  { image: "/foxy.webp", alt: "Foxy" },
  { image: "/snake.webp", alt: "Slither" },
  { image: "/bear.webp", alt: "Bruno" },
  { image: "/owl.webp", alt: "Hoot" },
  { image: "/bulldog.webp", alt: "Tank" },
  { image: "/redPanda.webp", alt: "Rusty" },
  { image: "/tiger2.webp", alt: "Blaze" },
];

const MOBILE_PANEL_COUNT = 4;

const ExpandablePanelDemo = () => {
  const [panels, setPanels] = useState(DEMO_IMAGES);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setPanels(mq.matches ? DEMO_IMAGES.slice(0, MOBILE_PANEL_COUNT) : DEMO_IMAGES);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <ExpandablePanel
        panels={panels}
        height="70vh"
        expandedWidth="50%"
        collapsedWidth="8%"
        gap="0.75rem"
        borderRadius="1.5rem"
        transitionDuration="600ms"
        defaultExpanded={-1}
      />
    </div>
  );
};

export { ExpandablePanelDemo };
