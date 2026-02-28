import ExpandablePanel from '@/ui/components/layout/ExpandablePanel';

const ExpandablePanelDemo = () => {
  const demoImages = [
    { image: "/gori.png", alt: "Gori" },
    { image: "/crocs2.png", alt: "Snap" },
    { image: "/crow.png", alt: "Crowley" },
    { image: "/foxy.png", alt: "Foxy" },
    { image: "/snake.png", alt: "Slither" },
    { image: "/bear.png", alt: "Bruno" },
    { image: "/owl.png", alt: "Hoot" },
    { image: "/bulldog.png", alt: "Tank" },
    { image: "/redPanda.png", alt: "Rusty" },
    { image: "/tiger2.png", alt: "Blaze" },
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
