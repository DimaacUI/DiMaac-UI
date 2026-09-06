# FORM&CO · Studio Portfolio

Next.js 14 + Tailwind + Framer Motion portfolio for a design studio — editorial
grid, grayscale imagery that colours on hover, a custom cursor, full-screen menu,
page-transition wipe, auto-advancing hero slider, drag-to-scroll lookbook, and a
contact page with a validated form and FAQ. Lenis smooth scrolling throughout.
5 pages, responsive, honours `prefers-reduced-motion`.

## Develop / customize

```bash
npm install
npm run dev        # http://localhost:4183
npm run build
npm start          # production server on :4183
```

This is a Next.js app with a dynamic case-study route, so it runs on any Node
host — Vercel, Netlify, Railway, Fly. There is no static `dist/`.

## Structure

```
form-and-co/
├── app/
│   ├── page.tsx            # home
│   ├── work/               # index + [slug] case studies
│   ├── studio/             # about
│   ├── contact/            # form + FAQ
│   ├── layout.tsx          # fonts, metadata
│   ├── globals.css         # tokens, type utilities, image treatment
│   └── icon.svg            # favicon
├── components/             # cursor, header, menu, slider, lookbook, reveals
├── context/                # cursor + menu state, page transitions
├── lib/data.ts             # every word and image on the site — start here
└── tailwind.config.ts      # palette, fonts, fluid type, easings
```

## Customize

1. **Content** — `lib/data.ts` holds the brand, projects, services, stats,
   navigation, offices, FAQ. Change it and every page follows.
2. **Colours** — `paper`, `ink`, `accent` in `tailwind.config.ts`, mirrored as
   CSS variables at the top of `app/globals.css`.
3. **Type** — fonts load from Google via `next/font` in `app/layout.tsx`
   (Archivo Black, Archivo, Space Mono).
4. **Images** — Pexels photos through the `pexels()` helper in `lib/data.ts`.
   **These are placeholders — replace the ids with your own images before
   production.** Every image renders grayscale until hovered; that treatment is
   `.img-editorial` in `globals.css`.

## Notes

- The contact form validates on the client and simulates a send. Wire
  `submit()` in `app/contact/page.tsx` to your own endpoint.
- The custom cursor only renders on fine-pointer devices; touch gets the native
  pointer.
