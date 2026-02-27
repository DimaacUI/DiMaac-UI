import ProofOfWork from '@/ui/components/scroll/ProofOfWork';

const works = [
  { image: 'https://images.pexels.com/photos/8467429/pexels-photo-8467429.jpeg', title: 'Ethereal Dreams', subtitle: 'Visual storytelling' },
  { image: 'https://images.pexels.com/photos/33276110/pexels-photo-33276110.jpeg', title: 'Midnight Bloom', subtitle: 'Dark elegance' },
  { image: 'https://images.pexels.com/photos/3378993/pexels-photo-3378993.jpeg', title: 'Golden Hour', subtitle: 'Warm minimalism' },
  { image: 'https://images.pexels.com/photos/1231258/pexels-photo-1231258.jpeg', title: 'Urban Solace', subtitle: 'City life reimagined' },
  { image: 'https://images.unsplash.com/photo-1558865869-c93f6f8482af?w=500&auto=format&fit=crop&q=60', title: 'Velvet Skies', subtitle: 'Soft gradients' },
  { image: 'https://images.unsplash.com/photo-1541331270253-b7cb940d4e1a?w=500&auto=format&fit=crop&q=60', title: 'Serene Moments', subtitle: 'Peaceful composition' },
  { image: 'https://images.unsplash.com/photo-1562157697-74f3f1deab4f?w=500&auto=format&fit=crop&q=60', title: 'Neon Reflections', subtitle: 'Modern aesthetics' },
  { image: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=500&auto=format&fit=crop&q=60', title: 'Ocean Whispers', subtitle: "Coastal serenity" },
  { image: 'https://images.unsplash.com/photo-1601047656464-f4e7621681bf?w=500&auto=format&fit=crop&q=60', title: 'Pastel Paradise', subtitle: 'Soft color palette' },
  { image: 'https://images.unsplash.com/photo-1596806906801-d328b0c8bcc6?w=500&auto=format&fit=crop&q=60', title: 'Silent Poetry', subtitle: 'Minimal expression' },
  { image: 'https://images.unsplash.com/photo-1596805892053-7c2180568a1f?w=500&auto=format&fit=crop&q=60', title: 'Mystic Haze', subtitle: 'Dreamy atmosphere' },
  { image: 'https://images.unsplash.com/flagged/photo-1565666680395-793cc9d1afe3?w=500&auto=format&fit=crop&q=60', title: 'Lunar Glow', subtitle: 'Night photography' },
  { image: 'https://images.unsplash.com/photo-1536621796770-f31c101df927?w=500&auto=format&fit=crop&q=60', title: 'Amber Essence', subtitle: 'Warm tones' },
  { image: 'https://images.unsplash.com/photo-1572566201797-81b5e325dd6c?w=500&auto=format&fit=crop&q=60', title: 'Frosted Glass', subtitle: 'Translucent beauty' },
  { image: 'https://images.unsplash.com/photo-1617972883136-c4deaaed0f9c?w=500&auto=format&fit=crop&q=60', title: 'Wabi Sabi', subtitle: 'Imperfect perfection' },
  { image: 'https://images.unsplash.com/photo-1535083252457-6080fe29be45?w=500&auto=format&fit=crop&q=60', title: 'Azure Horizon', subtitle: 'Endless blue' },
  { image: 'https://plus.unsplash.com/premium_photo-1728014305999-2515a0b4f575?w=500&auto=format&fit=crop&q=60', title: 'Bloom & Decay', subtitle: "Natural cycles" },
  { image: 'https://images.unsplash.com/photo-1608922804825-b546ae16006b?w=500&auto=format&fit=crop&q=60', title: 'Monochrome Magic', subtitle: 'Black & white study' },
  { image: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=500&auto=format&fit=crop&q=60', title: "Wild & Free", subtitle: "Nature's canvas" },
  { image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=500&auto=format&fit=crop&q=60', title: 'Soft Focus', subtitle: 'Blurred lines' },
];

const ProofOfWorkDemo = () => (
  <ProofOfWork title="My Works" works={works} />
);

export { ProofOfWorkDemo };
