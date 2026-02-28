import ProjectHoverSection from '@/ui/components/interactive/ProjectHoverSection';

const ProjectHoverSectionDemo = () => {
  const projects = [
    { title: 'Bruno', subtitle: 'Keeper of the Woods', image: '/bear.png', alt: 'Bruno the Bear' },
    { title: 'Chompy', subtitle: 'Jaws of the Marsh', image: '/crocs.png', alt: 'Chompy the Croc' },
    { title: 'Snap', subtitle: 'Master of the Lagoon', image: '/crocs2.png', alt: 'Snap the Croc' },
    { title: 'Crowley', subtitle: 'Messenger of the Skies', image: '/crow.png', alt: 'Crowley the Crow' },
    { title: 'Foxy', subtitle: 'Cunning and Quick', image: '/foxy.png', alt: 'Foxy the Fox' },
    { title: 'Gori', subtitle: 'Strength and Wisdom', image: '/gori.png', alt: 'Gori the Gorilla' },
    { title: 'Hoot', subtitle: 'Eyes of the Night', image: '/owl.png', alt: 'Hoot the Owl' },
    { title: 'Slither', subtitle: 'Ancient Wisdom', image: '/snake.png', alt: 'Slither the Snake' },
    { title: 'Rajah', subtitle: 'Stripes of Power', image: '/tiger.png', alt: 'Rajah the Tiger' },
    { title: 'Tank', subtitle: 'Street Enforcer', image: '/bulldog.png', alt: 'Tank the Bulldog' },
    { title: 'Rusty', subtitle: 'Smooth Operator', image: '/redPanda.png', alt: 'Rusty the Red Panda' },
    { title: 'Blaze', subtitle: 'Street King', image: '/tiger2.png', alt: 'Blaze the Tiger' },
  ];

  return (
    <div className="w-full min-h-[500px] flex items-center justify-center bg-[#0a0a0a] rounded-lg py-12">
      <ProjectHoverSection projects={projects} />
    </div>
  );
};

export { ProjectHoverSectionDemo };
