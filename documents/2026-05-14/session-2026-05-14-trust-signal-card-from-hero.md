# Session log – 2026-05-14

## Summary
Restored **`HeroSignalExpandable`** (Signal glass card + Details expand panel) and placed it in **`#home-trust`**, below the HIPAA-aware / Full-stack / Physician-led strip, centered with responsive max-widths.

## Changes
- Re-added `src/components/home/HeroSignalExpandable.jsx` (Framer Motion expand; stats + bullets from `heroContent`).
- `src/components/home/HomePageSections.jsx` — import component; Trust section layout: flex column with gap, Signal block wrapped in `data-home-reveal`.

## Notes
- Stats grid uses `sm:grid-cols-3` for this band (no hero `lg:grid-cols-1` breakpoint) so metrics read cleanly at trust widths.
