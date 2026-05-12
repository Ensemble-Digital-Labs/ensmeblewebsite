# Session log – 2026-05-12 – Hero scroll-expand

## Summary
Replaced the Home hero with a new scroll-driven "media-expand" hero modeled on
the user-provided `ScrollExpandMedia` reference (centered small media card
that grows to full-bleed while the two-word title slides apart on either side).
Removed the reference's "Underwater Adventure" / "Scroll to Expand Demo"
secondary labels per request. Mobile gets a simpler static composition.

## Changes
- **Created:** `src/components/sections/HeroScrollExpand.jsx`
  - Desktop (`min-width: 1024px`): GSAP `ScrollTrigger` pin + scrub on the
    section. Animates in parallel:
    - Media card from `~28vw × 55vh` to `~92vw × 82vh`
    - "ENSEMBLE" line slides left to `-55vw`
    - "Digital Labs" line slides right to `+55vw`
    - Background image fades `0.85 → 0.18` and gently scales back from `1.04`
    - Bottom subhead + CTAs fade in after the card finishes expanding
  - Mobile/tablet: a static stacked hero (background image + gradient
    overlay + stacked title + subhead + CTAs) — no pin, no scrub.
  - Honors `prefers-reduced-motion`: skips GSAP entirely, falls back to the
    mobile layout's static composition.
  - Uses `gsap.matchMedia` so the desktop timeline tears down cleanly on
    breakpoint changes.
- **Edited:** `src/pages/Home.jsx` — swapped `Hero` import + usage for
  `HeroScrollExpand`. Existing `Hero.jsx` is **kept untouched** in the repo
  for easy revert (per `preserve-existing-work.mdc`).

## Decisions / notes
- **Not** porting the reference's `window.addEventListener('wheel', ...,
  { passive: false })` hijack. That would fight Lenis (Locomotive Scroll v5)
  on `#main` and break native scrolling on iOS. `ScrollTrigger.pin` with
  `scrub: 1` gives identical visual feel and integrates with the existing
  `scrollerProxy` registered in `src/lib/locomotive.js`.
- Used `gsap.matchMedia('(min-width: 1024px)')` — matches the project's
  `ANIMATION_MOBILE_MAX_WIDTH_PX` boundary in `src/lib/animationProfile.js`
  and `shouldUseNativeMainScroll()` (≤1024 = native scroll), so the pin only
  runs in the Lenis-controlled environment where it works reliably.
- Title typography uses the project's `font-display` (Fraunces serif):
  - Line 1 ("ENSEMBLE") — extrabold, uppercase, `clamp(3.5rem, 13vw, 11rem)`
    on desktop / `clamp(2.75rem, 14vw, 5.5rem)` on mobile.
  - Line 2 ("Digital Labs") — italic medium, uppercase, smaller.
- Defaults pulled from existing assets:
  - `bgImageSrc` → `backgroundAssets.digitalHealthNetwork`
  - `mediaSrc` → `/assets/videos/hero-background.mp4` (`mediaType: 'video'`)
  - `posterSrc` → `digitalHealthNetwork` (used when video loads)
  - All five are props with defaults — easy to override per use case.
- CTAs reuse `growthPrimaryHero` / `growthSecondaryHero` and `heroContent`
  primary/secondary actions, so the conversion path is unchanged.
- `data-discover="true"` retained on CTAs for the custom cursor context.
- Section keeps `id="page1"` so any existing anchor / parallax / cinematic
  reveal references continue to resolve.

## Files touched
- Added: `src/components/sections/HeroScrollExpand.jsx`
- Edited: `src/pages/Home.jsx`

## Next steps (optional)
- Confirm the default media (`hero-background.mp4`) plays well in the small
  starting card — swap to an image (`mediaType="image"`) or a healthcare
  clip if not. Easy via props on the Home call site.
- Tune the slide-out distance (`55vw`) and end card size if the title feels
  too cramped or too sparse against the expanded card on ultra-wide / 1440p.
- If `Hero.jsx` is no longer wanted as a fallback, delete it once the new
  hero is approved (don't forget to remove it from `FILE_TREE.md`).
