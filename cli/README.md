# DiMaac

Add DiMaac UI components to your projects.

## Usage

```bash
npx dimaac init
```

`init` command initializes a components directory for your project.

### add

```bash
npx dimaac add [component]
```

Adds a new component to your project.

Example:
```bash
npx dimaac add MouseTiltCard
```

You can also use the optional `--all` flag to install all components:

```bash
npx dimaac add --all
```

You can install the related demos / examples for the related components by using the `-e` flag with the add command:

```bash
npx dimaac add [component] -e
```

Example:
```bash
npx dimaac add MouseTiltCard -e
```

To check all the available components, you can use the add without supplying anything extra:

```bash
npx dimaac add
```

## Available Components

### Cards
- MouseTiltCard
- SwipeableCards

### Reveals
- TextScrambleReveal
- LiquidImageReveal

### Interactive
- MouseTrail
- ContextMenu

### Gallery
- ScrollingGallery
- ImageGallery

### Loaders
- TextLoader

### Layout
- ExpandablePanel

## Available Examples

Each component has a corresponding demo example:
- MouseTiltCardDemo
- SwipeableCardsDemo
- TextScrambleRevealDemo
- LiquidImageRevealDemo
- MouseTrailDemo
- ContextMenuDemo
- ScrollingGalleryDemo
- ImageGalleryDemo
- TextLoaderDemo
- ExpandablePanelDemo

## File Structure

After installation, your project will have:

```
your-project/
├── components/
│   ├── cards/
│   │   ├── MouseTiltCard.tsx
│   │   └── SwipeableCards.tsx
│   ├── reveals/
│   │   ├── TextScrambleReveal.tsx
│   │   └── LiquidImageReveal.tsx
│   └── ...
└── examples/
    ├── cards/
    │   ├── MouseTiltCardDemo.tsx
    │   └── SwipeableCardsDemo.tsx
    ├── reveals/
    │   ├── TextScrambleRevealDemo.tsx
    │   └── LiquidImageRevealDemo.tsx
    └── ...
```

## Requirements

- Node.js >= 14.0.0
- React project with TypeScript support
- Tailwind CSS
- Required dependencies based on components used