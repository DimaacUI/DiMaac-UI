import ExpandablePanel from '@/ui/components/layout/ExpandablePanel';

const ExpandablePanelDemo = () => {
  const demoImages = [
    { image: "/emily.png", alt: "Architecture 1" },
    { image: "/lance.png", alt: "Architecture 2" },
    { image: "/renei.png", alt: "Architecture 3" },
    { image: "/roiin.png", alt: "Architecture 4" },
    { image: "/daisy.png", alt: "Architecture 5" },
    { image: "/linda.png", alt: "Architecture 6" },
    { image: "/lylia.png", alt: "Architecture 7" },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <ExpandablePanel
        panels={demoImages}
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
