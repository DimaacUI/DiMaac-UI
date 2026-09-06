import ProofOfWork from '@/ui/components/scroll/ProofOfWork';

const works = [
  { image: '/gori.webp', imageAlt: 'Gori the Gorilla', title: 'Gori', subtitle: 'Jungle Sage' },
  { image: '/crocs2.webp', imageAlt: 'Snap the Croc', title: 'Snap', subtitle: 'Swamp King' },
  { image: '/crow.webp', imageAlt: 'Crowley the Crow', title: 'Crowley', subtitle: 'Night Watcher' },
  { image: '/foxy.webp', imageAlt: 'Foxy the Fox', title: 'Foxy', subtitle: 'Forest Trickster' },
  { image: '/snake.webp', imageAlt: 'Slither the Snake', title: 'Slither', subtitle: 'Desert Whisper' },
  { image: '/bear.webp', imageAlt: 'Bruno the Bear', title: 'Bruno', subtitle: 'Mountain Guardian' },
  { image: '/owl.webp', imageAlt: 'Hoot the Owl', title: 'Hoot', subtitle: 'Wise Watcher' },
  { image: '/crocs.webp', imageAlt: 'Chompy the Croc', title: 'Chompy', subtitle: 'River Sentinel' },
  { image: '/tiger.webp', imageAlt: 'Rajah the Tiger', title: 'Rajah', subtitle: 'Jungle Emperor' },
  { image: '/bulldog.webp', imageAlt: 'Tank the Bulldog', title: 'Tank', subtitle: 'Street Enforcer' },
  { image: '/redPanda.webp', imageAlt: 'Rusty the Red Panda', title: 'Rusty', subtitle: 'Smooth Operator' },
  { image: '/tiger2.webp', imageAlt: 'Blaze the Tiger', title: 'Blaze', subtitle: 'Street King' },
];

const ProofOfWorkDemo = () => (
  <ProofOfWork title="The Crew" works={works} />
);

export { ProofOfWorkDemo };
