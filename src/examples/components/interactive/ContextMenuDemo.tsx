'use client';

import ContextMenu from '@/ui/components/interactive/ContextMenu';
import MouseTiltCard from '@/ui/components/cards/MouseTiltCard';
import { 
  Share2,
  Info,
  Download,
  Heart,
  Eye,
  Star,
  Edit,
  Trash2
} from 'lucide-react';

const ContextMenuDemo = () => {
  const characters = [
    {
      image: "/lance.png",
      name: "Lance",
      title: "Knight of Honor",
      description: "Brave warrior of the realm"
    },
    {
      image: "/emily.png",
      name: "Emily", 
      title: "Forest Princess",
      description: "Guardian of nature's secrets"
    },
    {
      image: "/daisy.png",
      name: "Daisy",
      title: "Mace Witch",
      description: "Beauty with magical brains"
    },
    {
      image: "/roiin.png",
      name: "Roiin",
      title: "Wizard King",
      description: "Ruler of the mystical forest"
    }
  ];

  const getContextMenuItems = (character: typeof characters[0]) => [
    {
      id: 'view',
      label: 'View Character',
      icon: Eye,
      action: () => alert(`Viewing ${character.name}...`),
      separator: false
    },
    {
      id: 'favorite',
      label: 'Add to Favorites',
      icon: Heart,
      shortcut: 'Ctrl + F',
      action: () => alert(`${character.name} added to favorites!`),
      separator: false
    },
    {
      id: 'rate',
      label: 'Rate Character',
      icon: Star,
      action: () => alert(`Rating ${character.name}...`),
      separator: true
    },
    {
      id: 'edit',
      label: 'Edit Details',
      icon: Edit,
      shortcut: 'Ctrl + E',
      action: () => alert(`Editing ${character.name}...`),
      separator: false
    },
    {
      id: 'info',
      label: 'Character Info',
      icon: Info,
      action: () => alert(`${character.name}: ${character.description}`),
      separator: true
    },
    {
      id: 'download',
      label: 'Download Image',
      icon: Download,
      shortcut: 'Ctrl + D',
      action: () => alert(`Downloading ${character.name} image...`),
      separator: false
    },
    {
      id: 'share',
      label: 'Share Character',
      icon: Share2,
      action: () => alert(`Sharing ${character.name}...`),
      separator: false
    },
    {
      id: 'delete',
      label: 'Remove Character',
      icon: Trash2,
      shortcut: 'Del',
      action: () => alert(`Removing ${character.name}...`),
      separator: true
    }
  ];

  const handleMenuItemClick = (item: { label: string }) => {
    console.log('Menu item clicked:', item.label);
  };

  return (
    <div className="w-full flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">

        {/* Character Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 justify-items-center">
          {characters.map((character, index) => (
            <ContextMenu
              key={index}
              menuItems={getContextMenuItems(character)}
              onItemClick={handleMenuItemClick}
            >
              <MouseTiltCard
                tiltIntensity={15}
                scale={1.05}
                glareIntensity={0.1}
              >
                <div className="h-96 w-60 bg-black relative flex flex-col rounded-lg overflow-hidden shadow-[3px_3px_10px_rgba(0,0,0,0.5)]">
                  {/* Background Image */}
                  <img 
                    src={character.image} 
                    alt={character.name} 
                    className="h-full w-full object-cover absolute inset-0 z-0"
                  />
                  
                  {/* Gradient Overlay */}
                  <div 
                    className="absolute inset-0 z-10" 
                    style={{
                      background: "linear-gradient(to top, #000, transparent)"
                    }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-20 mt-auto p-4">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {character.name}
                    </h3>
                    <p className="text-sm text-white/80 font-medium mb-2">
                      {character.title}
                    </p>
                    <p className="text-xs text-white/60 font-light">
                      {character.description}
                    </p>
                  </div>

                  {/* Right-click hint */}
                  <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-xs text-white/60">
                    Right Click
                  </div>
                </div>
              </MouseTiltCard>
            </ContextMenu>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ContextMenuDemo };
