# Session log – 2026-05-14 (home page band spec)

## Summary
Implemented the agreed homepage as eleven scroll bands on `/`: hero through final audit CTA, wired to existing routes and `content.js` / `healthcareCaseStudies` / `services` / `aiPages` data. `layout.jsx` still renders a single `CinematicFooter` after page content (no duplicate site footer).

## Changes
- Added `src/components/home/HomePageSections.jsx` — full band markup (trust strip, pillars, who we are, verticals, AI tiles, problem preview, selected work, roadmap, plans, final CTA).
- Updated `src/pages/Home.jsx` — mounts `HomePageSections` inside `#home-scroll-root` for atmosphere scroll height.

## Notes
- Hero secondary CTA uses `/portfolio` per spec; primary audit → `/free-practice-audit`.
- Roadmap “process” link points to `/about` (`/process` not in router).
- Final CTA reuses `ctaContent` headline/subhead with explicit audit bullets + button.

## Next steps
- Optional: staggered / “scene” layouts per `homepage-scenes-content-strategy.md` (currently structured grids for ship-first readability).
- Replace long `heroContent.subhead` with a tighter positioning line if copy deck dictates.

---

## Update (visual choreography — stagger / overlap)

- `src/index.css`: `.home-scene-surface-dark`, `.home-scene-surface-light`, `.home-scene-elevate`, `.home-scene-elevate-soft` for dot-grain glass + depth shadows.
- `HomePageSections.jsx`: hero split + floating stats card; trust pill tilt; staggered pillars; who-we-are split + overlapping comparison cards; xl broken grid for five verticals; AI 2×2 vertical offsets; problem cards slight tilt; selected work `md` 2×2 with first case `row-span-2`; roadmap column stagger; plans outer cards dropped vs lifted center; final CTA split + rotated audit cluster. Transforms gated with `motion-reduce:` resets.

---

## Update (per-element scroll choreography — home-v1 bar wipe)

- Removed uniform `data-scroll-section` from home bands (no whole-section opacity lift).
- Added `src/hooks/useHomeSequentialReveals.js`: each `[data-home-reveal]` gets its own ScrollTrigger (fade + lift, `toggleActions: play/reverse`); each `[data-home-problem-bar]` uses alternating `xPercent` horizontal wipe matching `HomeProblemSection.jsx`. Skips when `prefers-reduced-motion` or `html.reduced-motion`.
- `HomePageSections.jsx`: hero stays always visible; below-fold copy, cards, and CTAs marked `data-home-reveal`; problem rows use `data-home-problem-bar` with `overflow-hidden` on `<li>`; layout transforms stay on parent wrappers so GSAP does not strip Tailwind offsets.
- `index.css`: initial hidden state scoped to `#home-scroll-root [data-home-reveal]`.

---

## Update (hero type scale — Cardinal-style hierarchy)

- `HomePageSections.jsx` hero: three-line display from `heroContent.headlineLines` with **very large** `clamp` sizes (≈ Cardinal headline mass on desktop, still readable at 320px); middle line uses **growth gradient** accent; subhead **~4–5× smaller** via dedicated `clamp` + `font-medium` + tighter `text-white/70`; eyebrow slightly smaller; extra vertical rhythm before CTAs.

---

## Update (hero stagger animation)

- `useHomeSequentialReveals.js`: `#home-hero [data-home-reveal]` runs as **one GSAP timeline** (stagger ~0.095s, `power2.out`) with ScrollTrigger `once`; **nudge** after refresh if hero is already in upper viewport so copy never stays at CSS `opacity:0`.
- `HomePageSections.jsx`: eyebrow, each headline line, subhead, CTA row, and stats card marked `data-home-reveal`; layout transforms stay on parent of stats card.
