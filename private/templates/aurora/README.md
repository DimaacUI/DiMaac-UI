# Minimal · Aurora

**Lena Park** — clean white portfolio with animated gradient aurora footer (CSS + WebGL shader).

## Files

- `index.html` — structure
- `styles.css` — layout, aurora CSS fallback, animations
- `main.js` — WebGL footer glow (falls back to CSS if WebGL unavailable)

## Run locally

```bash
npx serve .
```

## Customize

- Edit copy in `index.html`
- Gradient colors: `--g1` through `--g4` in `styles.css`
- WebGL shader uniforms read those same CSS variables

Requires a local server (not `file://`) for consistent WebGL.
