# Veldt · Spiral Folio

Vite + Three.js portfolio — 3D helix gallery, list/spiral view toggle, Lenis + GSAP intro.

## Quick start (static)

Open the pre-built site — no install needed:

```bash
npx serve dist
```

## Develop / customize

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/ (relative paths, any static host)
```

## Structure

```
veldt-folio/
├── index.html       # Vite dev entry
├── src/main.js      # helix WebGL + UI
├── src/style.css
├── dist/            # production build (included in zip)
├── vite.config.js
└── package.json
```

## Deploy

Upload `dist/` to Netlify, Vercel, Cloudflare Pages, or S3. Paths are relative (`./assets/`).

## Customize

1. Edit project data and copy in `src/main.js`
2. Procedural SVG textures are generated in JS — swap for image URLs
3. Colors in `src/style.css` `:root`
