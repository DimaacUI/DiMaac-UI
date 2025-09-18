import { ComponentPage } from '@/types/components';
import { COMPONENT_PATHS } from './githubFetcher';

// Example of how component data would look with GitHub integration
export const expandablePanelGitHub: ComponentPage = {
  id: 'expandable-panel',
  slug: 'expandable-panel',
  title: 'Expandable Panel',
  description: 'An interactive expandable panel component that displays images in collapsible sections. Click on any panel to expand it while others collapse smoothly. Now supports clicking outside to collapse all panels.',
  tags: ['React', 'Layout', 'Interactive', 'Animation', 'Gallery'],
  dependencies: ['react'],
  demoComponent: () => null, // This would be imported normally
  githubFiles: [
    {
      name: 'utils.ts',
      githubPath: COMPONENT_PATHS.utils,
      displayName: 'lib/utils.ts'
    },
    {
      name: 'ExpandablePanel.tsx',
      githubPath: COMPONENT_PATHS.expandablePanel,
      displayName: 'components/ui/ExpandablePanel.tsx'
    }
  ],
  props: [
    {
      title: 'ExpandablePanel Props',
      props: [
        {
          property: 'panels',
          type: 'Panel[]',
          required: true,
          description: 'Array of panel objects with image and optional alt text'
        },
        {
          property: 'className',
          type: 'string',
          required: false,
          description: 'Additional CSS classes to apply to the container'
        },
        {
          property: 'expandedWidth',
          type: 'string',
          required: false,
          defaultValue: '60%',
          description: 'Width of the expanded panel'
        },
        {
          property: 'collapsedWidth',
          type: 'string',
          required: false,
          defaultValue: '10%',
          description: 'Width of collapsed panels'
        },
        {
          property: 'defaultExpanded',
          type: 'number',
          required: false,
          defaultValue: '0',
          description: 'Index of the panel to expand by default (-1 for none)'
        }
      ]
    }
  ],
  isNew: true
};

// This is how clean the component data becomes - no more duplicate source code!
