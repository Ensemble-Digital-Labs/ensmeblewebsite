# Session log – 2026-06-12 (PopArt left scroll spy rail)

## Summary

Implemented PopArt-style left chapter rail on home `/`: hidden during hero, slides in after first scroll, animated active dot tracks section on scroll.

## Changes

- Rewrote `src/components/home/HomeSectionIndex.jsx`
- Added `.home-scroll-spy` styles in `src/index.css`

## Behavior

- **Hidden on hero** — rail appears once you scroll past Intro
- **Left side (lg+)** — vertical track, glowing dot, 01–09 labels (Story → Contact)
- **Pop-in** — GSAP slide + stagger when rail first appears
- **Active dot** — animates along the track as sections change
- **Mobile** — compact numbered pills on the right (no labels)

## Notes

- Adapted to Ensemble dark/teal palette (not PopArt yellow)
- Uses existing `HomeStoryViewport` IntersectionObserver for active section

---

## Update — remove Contact from scroll spy rail

### Summary
Removed the Contact (`home-cta`) chapter from the left/right scroll spy sidebar. The contact section remains on the page; it is no longer listed in the rail.

### Changes
- `HomeSectionIndex.jsx` — filter `home-cta` from `RAIL_SECTIONS`

---

## Update — hide scroll spy in footer zone

### Summary
Chapter rail fades out when the cinematic footer enters the viewport so it no longer overlaps the footer.

### Changes
- `HomeSectionIndex.jsx` — `useNearFooter()` + `railVisible` gate
- `CinematicFooter.jsx` — `id="ensemble-cinematic-footer"` for scroll detection
