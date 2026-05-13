# Session log – 2026-05-12 (fullscreen nav — showcase scroll snap proximity)

## Summary
Showcase rail used **`scroll-snap-type: y mandatory`**, which forces each card toward a snap point while scrolling so neighboring cards jump off-screen quickly (reads as content “hiding”). Switched to **`lg:snap-proximity`** so scrolling stays natural and snap only assists when near a stop.

## Changes
- Edited `src/components/FullscreenNav.jsx`.
