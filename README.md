# Hitendra Annavarapu — Portfolio

A cinematic, responsive React/Vite portfolio for robotics, software, and product-engineering work.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Where to edit

- `src/data/content.js` — project cards, Python games, timeline checkpoints, and screen captions
- `src/pages/Home.jsx` — home-page narrative and metrics
- `src/pages/ProjectPage.jsx` — individual case studies and galleries
- `src/pages/ResumePage.jsx` — résumé content
- `src/components/Hero.jsx` — GSAP landing animation
- `src/components/ProjectPile.jsx` — expanding project-card pile
- `src/components/ExperienceGame.jsx` — playable experience timeline
- `src/components/InterestDeck.jsx` — skateboard and interest stickers
- `src/styles.css` — visual system and responsive behavior

GSAP is vendored in `public/vendor/gsap.min.js` so the landing animation does not depend on a third-party CDN at runtime.
