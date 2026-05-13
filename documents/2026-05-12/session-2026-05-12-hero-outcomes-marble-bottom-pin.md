# Session log – 2026-05-12

## Summary
Pinned `#hero-stats-trust` marble stat strip to the bottom of the `100svh` section: `mt-auto` on the bar wrapper, removed bottom margins that floated it above the section edge, replaced inter-block `gap-*` with padding on the `max-w-7xl` body so space above the bar stays predictable.

## Changes
- `src/components/sections/HeroStatsTrustBand.jsx`

## Notes
- Safe-area padding remains on the marble wrapper (`pb-[max(0.5rem,env(safe-area-inset-bottom))]`).
