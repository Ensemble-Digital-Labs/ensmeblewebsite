
## Hero entrance timeline (2026-06-12)

Added `useHomeHeroEntrance.js` — dedicated GSAP timeline for `#home-hero` after intro loader:
1. Headline lines mask slide-up (stagger 0.13s)
2. CTA buttons fade up
3. Promo pills stagger
4. Masthead image tiles scale/fade in

Dispatches `ensemble:home-intro-ready` from `Home.jsx` when loader completes. Hero elements excluded from scroll-based `data-home-reveal`.

## Fix — headline invisible (follow-up)

**Root cause:** CSS + GSAP kept headline at `translateY(110%)` when animation failed; gradient `bg-clip-text` inside mask also unreliable.

**Fix:**
- New `HomeHeroTitle.jsx` — plain white text, safe gradient accent with fallback color
- Headline **never hidden in CSS** when intro not ready
- CSS line stagger only when `#home-scroll-root[data-intro-ready]`
- GSAP animates CTAs / promos / tiles only
- `introReady` prop from `Home` → `HomePageSections` → `HomeChapterHero`
- 1.5s failsafe forces visible state

## Fix — descender clipping (g, y)

Added padding-bottom on `.home-hero-line-mask` and inner lines; relaxed line-height to 1.16–1.18 so `overflow: hidden` mask does not clip g/y/p tails.

## Hero center + lower placement

- Hero copy block centered (`text-center`, `mx-auto`, `items-center` on CTAs/promos)
- `bandAlign="start"` on hero shell with extra top padding (vh-based)
- Increased section `pt-*` so content sits lower on the viewport
