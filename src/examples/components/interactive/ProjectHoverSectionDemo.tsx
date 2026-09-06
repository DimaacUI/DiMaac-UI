import ProjectHoverSection from '@/ui/components/interactive/ProjectHoverSection';

const ProjectHoverSectionDemo = () => {
  const projects = [
    { title: 'Bruno', subtitle: 'Keeper of the Woods', image: '/bear.webp', alt: 'Bruno the Bear' },
    { title: 'Chompy', subtitle: 'Jaws of the Marsh', image: '/crocs.webp', alt: 'Chompy the Croc' },
    { title: 'Snap', subtitle: 'Master of the Lagoon', image: '/crocs2.webp', alt: 'Snap the Croc' },
    { title: 'Crowley', subtitle: 'Messenger of the Skies', image: '/crow.webp', alt: 'Crowley the Crow' },
    { title: 'Foxy', subtitle: 'Cunning and Quick', image: '/foxy.webp', alt: 'Foxy the Fox' },
    { title: 'Gori', subtitle: 'Strength and Wisdom', image: '/gori.webp', alt: 'Gori the Gorilla' },
    { title: 'Hoot', subtitle: 'Eyes of the Night', image: '/owl.webp', alt: 'Hoot the Owl' },
    { title: 'Slither', subtitle: 'Ancient Wisdom', image: '/snake.webp', alt: 'Slither the Snake' },
    { title: 'Rajah', subtitle: 'Stripes of Power', image: '/tiger.webp', alt: 'Rajah the Tiger' },
    { title: 'Tank', subtitle: 'Street Enforcer', image: '/bulldog.webp', alt: 'Tank the Bulldog' },
    { title: 'Rusty', subtitle: 'Smooth Operator', image: '/redPanda.webp', alt: 'Rusty the Red Panda' },
    { title: 'Blaze', subtitle: 'Street King', image: '/tiger2.webp', alt: 'Blaze the Tiger' },
  ];

  return (
    <div className="w-full min-h-[500px] flex items-center justify-center bg-[#0a0a0a] rounded-lg py-12">
      <ProjectHoverSection projects={projects} />
    </div>
  );
};

export { ProjectHoverSectionDemo };
