import Section3D from '@/ui/components/scroll/Section3D';

const cards = [
  { image: 'https://i.pinimg.com/736x/13/a4/15/13a415c3b4802c47529afe9c15179b12.jpg', number: '01 / 08', name: 'Marcus Chen', role: 'Lead Frontend Engineer', quote: "Clean code is not written by following rules. It's written by caring." },
  { image: 'https://i.pinimg.com/736x/53/ae/15/53ae15903bc6e5a41bbea4d4efbd756f.jpg', number: '02 / 08', name: 'Elena Voss', role: 'UX Design Lead', quote: 'Design is intelligence made visible.' },
  { image: 'https://i.pinimg.com/1200x/3f/30/9e/3f309e9aa079d1685061bc50c8a9ef39.jpg', number: '03 / 08', name: 'James Okonkwo', role: 'Backend Architect', quote: 'Simplicity is the ultimate sophistication.' },
  { image: 'https://i.pinimg.com/1200x/65/32/a5/6532a5afa2fedcc04b895adda337d69a.jpg', number: '04 / 08', name: 'Sofia Reyes', role: 'DevOps Engineer', quote: 'Automate everything. Question nothing.' },
  { image: 'https://i.pinimg.com/736x/98/d7/5f/98d75f5a0780c851ee66d717c1e993ac.jpg', number: '05 / 08', name: 'Ava Mitchell', role: 'Product Manager', quote: 'Ship fast. Learn faster.' },
  { image: 'https://i.pinimg.com/736x/6f/fd/a1/6ffda1b7b861e0e1e7f31140289303b0.jpg', number: '06 / 08', name: 'Kai Tanaka', role: 'Mobile Developer', quote: 'Every pixel tells a story.' },
  { image: 'https://i.pinimg.com/1200x/6c/71/51/6c7151dd37a0229f49e7ca46eecdc6e9.jpg', number: '07 / 08', name: 'Liam Foster', role: 'Security Engineer', quote: 'Trust no one. Verify everything.' },
  { image: 'https://i.pinimg.com/736x/22/86/25/228625a239a9de5fe6482cc80bfdd439.jpg', number: '08 / 08', name: 'Nina Patel', role: 'Data Scientist', quote: 'In data we trust. In models we verify.' },
];

const Section3DDemo = () => (
  <Section3D
    introTitle="Our Team"
    introDescription="The creative minds behind the magic. Meet the talented individuals who turn ideas into reality."
    cards={cards}
  />
);

export { Section3DDemo };
