import ProjectHoverSection from '@/ui/components/interactive/ProjectHoverSection';

const ProjectHoverSectionDemo = () => {
  const projects = [
    {
      title: 'Emily',
      subtitle: 'Portrait & Photography',
      image: '/emily.png',
      alt: 'Emily portrait',
    },
    {
      title: 'Daisy',
      subtitle: 'Editorial & Design',
      image: '/daisy0.png',
      alt: 'Daisy',
    },
    {
      title: 'Lance',
      subtitle: 'Brand Identity',
      image: '/lance0.png',
      alt: 'Lance',
    },
    {
      title: 'Renei',
      subtitle: 'Creative Direction',
      image: '/renei0.png',
      alt: 'Renei',
    },
    {
      title: 'Roiin',
      subtitle: 'Visual Storytelling',
      image: '/roiin0.png',
      alt: 'Roiin',
    },
    {
      title: 'Lylia',
      subtitle: 'Motion & Art',
      image: '/lylia0.png',
      alt: 'Lylia',
    },
    {
      title: 'Linda',
      subtitle: 'Digital Experience',
      image: '/linda0.png',
      alt: 'Linda',
    },
  ];

  return (
    <div className="w-full min-h-[500px] flex items-center justify-center bg-[#0a0a0a] rounded-lg py-12">
      <ProjectHoverSection projects={projects} />
    </div>
  );
};

export { ProjectHoverSectionDemo };
