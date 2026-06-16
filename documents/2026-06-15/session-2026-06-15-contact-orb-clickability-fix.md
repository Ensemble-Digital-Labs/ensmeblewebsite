# Session log – 2026-06-15 (contact orb clickability fix)

## Summary
Fixed contact orb FAB not receiving clicks — fullscreen panel portal sat above the trigger in z-index and intercepted pointer events.

## Changes
- `src/components/contact-orb/PopArtContactOrb.jsx` — portal trigger FAB to `document.body` (same as panel)
- `src/styles/popart-contact-orb.css` — FAB `z-index: 10000020` above closed panel (`10000010`); open panel `10000030`; closed panel `visibility: hidden` + `pointer-events: none !important` on panel and descendants

## Notes
- Trigger was inside `#overlay` (z-index 999999) while panel was on body at 9999999, so panel always won hit-testing when GSAP left interactive children.

## Update — root cause (backdrop theme session)
- Accidentally **deleted `triggerCenter()`** when adding `setBackdropOrigin()` — click handler threw `ReferenceError` and orb appeared dead. Function restored.
