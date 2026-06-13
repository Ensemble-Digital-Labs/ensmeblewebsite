# Session log – 2026-06-13 (home hero mobile readability)

## Summary
Improved home hero text legibility on mobile/tablet portrait where DNA particle field washed out the headline and “Scroll to explore” hint.

## Changes
- `src/index.css` — stronger mobile DNA edge scrim; soft radial scrim behind `.home-hero-center`; drop-shadow on hero lines; brighter scroll hint with text-shadow

## Notes
- Headline keeps gradient clip on desktop; mobile uses shadow + backdrop for contrast over bright helix
- Breakpoints: ≤767px base, ≤374px extra scrim on smallest phones
