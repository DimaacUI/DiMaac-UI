// ---------------------------------------------------------------------------
// Content model for the FORM&CO studio template.
// All imagery points at hardcoded, hand-vetted Pexels photo ids so the project
// runs immediately with no API key. Every image renders grayscale (color on
// hover) for editorial cohesion — see `.img-editorial` in globals.css.
// ---------------------------------------------------------------------------

/** Build a Pexels image URL for a given photo id at a target width/height. */
export function pexels(id: number, w = 1200, h?: number): string {
  const base = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=${w}`;
  return h ? `${base}&h=${h}` : base;
}

// Vetted, on-theme photo ids (portrait / editorial / studio / detail).
export const IMG = {
  coat: 2887766,
  beauty: 415829,
  suit: 1300550,
  street: 1183266,
  moody: 1689731,
  hoodie: 2703181,
  trench: 1926769,
  shirtA: 1043474,
  shirtB: 1043471,
  techJacket: 1840945,
  dreads: 2698935,
  arch: 2916814,
  flatlay: 322207,
  rail: 2002717,
  cap: 1124465,
  motion: 3756165,
  outdoor: 2866077,
  studio: 1462637,
} as const;

// ---------------------------------------------------------------------------
// Brand constants — shared across header, menu, footer, contact.
// ---------------------------------------------------------------------------

export const site = {
  brand: "FORM&CO",
  word: "form", // rendered as `form.` with an accent dot
  tagline: "Design Studio",
  descriptor:
    "A multidisciplinary design studio crafting brands, digital products & spaces.",
  est: "Est. 2018",
  season: "Independent · Worldwide",
  location: "London · Lisbon",
  email: "hello@formandco.studio",
  phone: "+44 20 7946 0421",
  availability: "Currently booking projects for Q3 2026",
  manifesto:
    "FORM&CO is an independent design studio building brands, products, and spaces with clarity and craft. We partner with a handful of clients each year — closely, and from start to finish.",
};

// Scrolling ticker words.
export const marquee = [
  "Brand Identity",
  "Digital Product",
  "Art Direction",
  "Motion & Film",
  "Editorial",
  "Strategy",
];

// Big counters for the index / studio page.
export const stats = [
  { value: "60", label: "Projects Shipped" },
  { value: "14", label: "Awards" },
  { value: "09", label: "In the Studio" },
  { value: "08", label: "Years Running" },
];

// Studio services — used as an editorial running list.
export const services = [
  { n: "01", t: "Brand Identity", d: "Naming, visual systems, and art direction that hold up everywhere." },
  { n: "02", t: "Digital Product", d: "Websites, apps, and interfaces — designed and built end to end." },
  { n: "03", t: "Motion & Film", d: "Title sequences, brand films, and 3D that set identities in motion." },
  { n: "04", t: "Spatial & Print", d: "Editorial, packaging, and environments for the physical world." },
];

export type Work = {
  slug: string;
  index: string; // "001"
  title: string;
  client: string;
  services: string[];
  category: string;
  year: string;
  cover: number; // pexels id
  gallery: number[]; // editorial gallery for the detail page
  intro: string;
  body: string[];
  meta: { label: string; value: string }[];
};

export const work: Work[] = [
  {
    slug: "helio",
    index: "001",
    title: "helio",
    client: "Helio Energy",
    services: ["Brand Identity", "Website"],
    category: "Brand & Web",
    year: "2023",
    cover: IMG.suit,
    gallery: [IMG.suit, IMG.moody, IMG.shirtA, IMG.flatlay, IMG.rail],
    intro:
      "A complete identity and digital platform for a renewable-energy company powering the next grid.",
    body: [
      "Helio came to us as a young energy company with serious technology and no story. We built the whole brand from the ground up — name architecture, a flexible visual system, motion language, and a website that translates a complex product into something a city council can understand in thirty seconds.",
      "The identity centres on a single solar mark that behaves like light: it expands, fragments, and recombines across every surface. Type is set quiet and technical so the work can do the talking.",
      "The site we designed and built lifted qualified enquiries by 140% in the first quarter after launch.",
    ],
    meta: [
      { label: "Client", value: "Helio Energy" },
      { label: "Services", value: "Brand / Web / Motion" },
      { label: "Year", value: "2023" },
    ],
  },
  {
    slug: "muller-atelier",
    index: "002",
    title: "müller atelier",
    client: "Müller Atelier",
    services: ["Art Direction", "E-commerce"],
    category: "Art Direction",
    year: "2023",
    cover: IMG.coat,
    gallery: [IMG.coat, IMG.trench, IMG.beauty, IMG.arch, IMG.hoodie],
    intro:
      "Art direction and an e-commerce experience for a Berlin tailoring house.",
    body: [
      "Müller Atelier makes garments slowly, by hand, for people who keep them for decades. The brief was to make the website feel like the atelier itself — unhurried, exacting, and quietly confident.",
      "We art-directed a seasonal campaign shot on raw film, then built a storefront where the photography leads and the interface disappears. Every interaction is weighted and deliberate, like a well-cut seam.",
      "Average order value rose 34% and the bounce rate halved against the previous site.",
    ],
    meta: [
      { label: "Client", value: "Müller Atelier" },
      { label: "Services", value: "Art Direction / Shopify" },
      { label: "Year", value: "2023" },
    ],
  },
  {
    slug: "cadence",
    index: "003",
    title: "cadence",
    client: "Cadence",
    services: ["Product Design", "Motion"],
    category: "Product",
    year: "2022",
    cover: IMG.moody,
    gallery: [IMG.moody, IMG.dreads, IMG.motion, IMG.street, IMG.shirtB],
    intro:
      "Product design and a motion system for a listening app that learns your week.",
    body: [
      "Cadence is a music app that scores your day — different sound for the commute, the desk, the run. We led product design from first principles: information architecture, a calm dark interface, and a motion grammar that responds to what you're doing rather than what you tap.",
      "We prototyped in code early so the team could feel the timing of every transition, not just see it on a board.",
      "Cadence shipped to 200k users in its first month and was featured by the App Store editorial team.",
    ],
    meta: [
      { label: "Client", value: "Cadence" },
      { label: "Services", value: "Product / Motion" },
      { label: "Year", value: "2022" },
    ],
  },
  {
    slug: "atlas-studio",
    index: "004",
    title: "atlas studio",
    client: "Atlas Studio",
    services: ["Brand Identity", "Website"],
    category: "Brand & Web",
    year: "2022",
    cover: IMG.arch,
    gallery: [IMG.arch, IMG.shirtA, IMG.suit, IMG.flatlay, IMG.outdoor],
    intro:
      "A restrained identity and portfolio site for an award-winning architecture practice.",
    body: [
      "Atlas designs civic buildings that outlast their architects. Their old website did not. We built a calm, gridded identity and a portfolio that treats each project like a drawing — generous white space, precise type, and photography given room to breathe.",
      "The system is deliberately quiet so the buildings stay loud. A single accent and one typeface carry the entire brand.",
      "The new site became the studio's primary channel for winning competitions.",
    ],
    meta: [
      { label: "Client", value: "Atlas Studio" },
      { label: "Services", value: "Brand / Web" },
      { label: "Year", value: "2022" },
    ],
  },
  {
    slug: "noma-sons",
    index: "005",
    title: "noma & sons",
    client: "Noma & Sons",
    services: ["Identity", "Print"],
    category: "Identity & Print",
    year: "2021",
    cover: IMG.flatlay,
    gallery: [IMG.flatlay, IMG.rail, IMG.cap, IMG.studio, IMG.beauty],
    intro:
      "Identity, packaging, and a print programme for a third-wave coffee roaster.",
    body: [
      "Noma & Sons roast in small batches and wanted packaging you'd keep on the shelf after the coffee was gone. We built a typographic identity, a colour-coded bag system, and a quarterly print zine that doubles as a brewing guide.",
      "Everything is designed to be produced cheaply and look expensive — a discipline that runs through the whole programme.",
      "The range now sits in over 80 independent stores across Europe.",
    ],
    meta: [
      { label: "Client", value: "Noma & Sons" },
      { label: "Services", value: "Identity / Packaging / Print" },
      { label: "Year", value: "2021" },
    ],
  },
];

export function getWork(slug: string): Work | undefined {
  return work.find((w) => w.slug === slug);
}

// ---------------------------------------------------------------------------
// Gallery — a horizontal drag rail of studio frames on the home page.
// ---------------------------------------------------------------------------

export const gallery: { id: number; cap: string }[] = [
  { id: IMG.moody, cap: "Helio — Campaign" },
  { id: IMG.hoodie, cap: "Cadence — Launch" },
  { id: IMG.trench, cap: "Müller — AW Film" },
  { id: IMG.street, cap: "Cadence — Field" },
  { id: IMG.suit, cap: "Atlas — Portrait" },
  { id: IMG.arch, cap: "Atlas — Spaces" },
  { id: IMG.techJacket, cap: "Noma — Editorial" },
  { id: IMG.beauty, cap: "Müller — Beauty" },
];

// ---------------------------------------------------------------------------
// Navigation. Each entry carries an index + preview image so the full-screen
// menu can render an editorial hover gallery that matches the aesthetic.
// ---------------------------------------------------------------------------

export type NavLink = { index: string; label: string; href: string; image: number; meta: string };

export const navLinks: NavLink[] = [
  { index: "01", label: "Index", href: "/", image: IMG.suit, meta: "Home" },
  { index: "02", label: "Work", href: "/work", image: IMG.coat, meta: "Selected Projects" },
  { index: "03", label: "Studio", href: "/studio", image: IMG.moody, meta: "About Us" },
  { index: "04", label: "Contact", href: "/contact", image: IMG.arch, meta: "Start a Project" },
];

export const footerLinks = navLinks;

// ---------------------------------------------------------------------------
// Contact page data.
// ---------------------------------------------------------------------------

export const offices = [
  { city: "London", lines: ["48 Redchurch Street", "Shoreditch, E2 7DP"], tz: "GMT" },
  { city: "Lisbon", lines: ["Rua do Século 120", "1200-433 Lisboa"], tz: "WET" },
];

export const socials = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Are.na", href: "#" },
  { label: "Dribbble", href: "#" },
];

export const budgets = ["< £10k", "£10k – £25k", "£25k – £50k", "£50k +"];

export const projectTypes = [
  "Brand Identity",
  "Website",
  "Product Design",
  "Motion / Film",
  "Print",
  "Other",
];

export const faqs = [
  {
    q: "How do you price a project?",
    a: "Every engagement is scoped to a fixed fee after a short discovery call. You'll always know the number before we start — no hourly surprises.",
  },
  {
    q: "What does a typical timeline look like?",
    a: "A brand identity runs 6–8 weeks; a full identity-plus-website around 10–14. We only take on what we can give our full attention.",
  },
  {
    q: "Do you work with early-stage teams?",
    a: "Often. Some of our best work is with founders at day zero. We'll tell you honestly whether now is the right time to invest in design.",
  },
  {
    q: "Can you build what you design?",
    a: "Yes. Design and engineering sit in the same room here, so what we draw is what ships — production-ready, accessible, and fast.",
  },
];
