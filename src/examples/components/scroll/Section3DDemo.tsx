import Section3D from '@/ui/components/scroll/Section3D';

const cards = [
  { image: '/gori.png', imageAlt: 'Gori the Gorilla', number: '01 / 12', name: 'Gori', role: 'Jungle Sage', quote: "Strength isn't in the muscles. It's in knowing when to hold back." },
  { image: '/crocs2.png', imageAlt: 'Snap the Croc', number: '02 / 12', name: 'Snap', role: 'Swamp King', quote: "Make moves in silence. Let success make the noise." },
  { image: '/crow.png', imageAlt: 'Crowley the Crow', number: '03 / 12', name: 'Crowley', role: 'Night Watcher', quote: "I've seen it all from above. Perspective changes everything." },
  { image: '/foxy.png', imageAlt: 'Foxy the Fox', number: '04 / 12', name: 'Foxy', role: 'Forest Trickster', quote: "Stay sharp. The forest rewards the clever." },
  { image: '/snake.png', imageAlt: 'Slither the Snake', number: '05 / 12', name: 'Slither', role: 'Desert Whisper', quote: "Patience isn't waiting. It's knowing exactly when to strike." },
  { image: '/bear.png', imageAlt: 'Bruno the Bear', number: '06 / 12', name: 'Bruno', role: 'Mountain Guardian', quote: "Protect what matters. Everything else is just noise." },
  { image: '/owl.png', imageAlt: 'Hoot the Owl', number: '07 / 12', name: 'Hoot', role: 'Wise Watcher', quote: "The night holds secrets. I'm just here to observe." },
  { image: '/crocs.png', imageAlt: 'Chompy the Croc', number: '08 / 12', name: 'Chompy', role: 'River Sentinel', quote: "Cool under pressure. Hot when it counts." },
  { image: '/tiger.png', imageAlt: 'Rajah the Tiger', number: '09 / 12', name: 'Rajah', role: 'Jungle Emperor', quote: "Respect isn't given. It's earned in the wild." },
  { image: '/bulldog.png', imageAlt: 'Tank the Bulldog', number: '10 / 12', name: 'Tank', role: 'Street Enforcer', quote: "Loyalty over everything. Once we're in, we're in." },
  { image: '/redPanda.png', imageAlt: 'Rusty the Red Panda', number: '11 / 12', name: 'Rusty', role: 'Smooth Operator', quote: "Whiskey neat. Cigars optional. Class non-negotiable." },
  { image: '/tiger2.png', imageAlt: 'Blaze the Tiger', number: '12 / 12', name: 'Blaze', role: 'Street King', quote: "Stay cool. Stay sharp. The block runs through me." },
];

const Section3DDemo = () => (
  <Section3D
    introTitle="The Crew"
    introDescription="Meet the squad. Each one brings something different to the table—style, wisdom, or straight-up attitude."
    cards={cards}
  />
);

export { Section3DDemo };
