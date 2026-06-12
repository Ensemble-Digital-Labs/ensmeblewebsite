# Session log – 2026-06-12 (PopArt motion visibility)

## Summary
Added visible PopArt-style scroll motion to Ensemble homepage sections: layered image parallax, collage entrance stagger, grid line fade, stronger monogram, floating CTA pulse, and a failsafe so scroll reveals never stay invisible.

## Changes
- Created `src/hooks/useHomePopArtMotion.js` — parallax + collage entrance for PopArt sections
- Updated `src/hooks/useHomeSequentialReveals.js` — wires PopArt motion, stronger monogram tween, 2.8s reveal failsafe
- Updated `src/components/home/HomePopArtSectionLayout.jsx` — `data-home-popart-section`, dedicated CTA motion target
- Updated `src/components/home/HomePopArtVisualStack.jsx` — parallax layer markers + image depth gradient
- Updated `src/index.css` — bolder monogram, animated grid lines, CTA ring pulse, reduced-motion fallbacks

## Notes
- PopArt reference uses ScrollMagic parallax + staggered reveals; Ensemble now mirrors this on Story + Expertise sections (desktop parallax at lg+)
- Mask line reveals + count-up stats on other chapters unchanged
- Build verified with `npm run build`

## Next steps
- Extend PopArt section layout to Work or Proof if user wants more chapters with collage + parallax
- Optional pinned horizontal work strip (PopArt homeslider pattern)

---

## Update — fix hidden PopArt copy text

### Summary
Fixed Story/Expertise copy staying invisible: mask-line ScrollTriggers missed when section was already in view, leaving text clipped at `translateY(110%)`.

### Changes
- `useHomeSequentialReveals.js` — section-level mask groups, `revealMasksAlreadyInView()`, faster 600ms failsafe
- `useHomePopArtMotion.js` — removed copy-column parallax that could shift text
- `index.css` — show mask inner text when `is-popart-ready`
