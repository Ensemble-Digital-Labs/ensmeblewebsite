# Session log – 2026-06-12 (DNA clone scroll animation phases)

## Summary
Added scroll-driven WebGL phase transitions on `/dna-capital-clone`: helix ribbon → morph/drift → wave grid at approach (dnacapital.com pattern).

## Changes
- `src/lib/dnaCapitalScrollPhases.js` — section-aware phase weights (helixMix, morph, waveMix, drift)
- `src/lib/dnaCapitalShaderHelix.js` — scatter morph, wave grid layer, star brightness per phase
- `src/components/dna-clone/DnaCapitalHelixCanvas.jsx` — uses scroll phases each frame
- `src/components/dna-clone/DnaCapitalClonePage.jsx` — `id="dna-clone-stats"` for phase markers

## Scroll phases
1. **Hero** — centered helix ribbon + rim
2. **Stats / companies** — helix drifts & rotates
3. **Team / content** — helix morphs to scattered particles, fades
4. **Approach** — blue wave grid terrain + ring stats band

## Notes
- Still separate from Ensemble home 2D canvas DNA
- Phase timing keyed to section DOM positions

## Size & position (follow-up)
- Helix shifted **right** (camera + particle offset ~1.4x)
- Scale reduced 1.75 → 1.08, smaller point size, camera pulled back (z 6.2), softer bloom
- Hero copy **left-aligned** so helix sits in the right half

## Particle density (follow-up)
- Helix ~22k → ~1.9k particles (every 2nd vertical step, 20 pts/strand)
- Smaller/softer point sprites, lower alpha, lighter bloom
- Starfield + wave grid thinned to match reference airy look

## Ribbon mesh (reference screenshot)
- Replaced double-helix strands with **68×24 twisted ribbon grid** (flowing surface like reference)
- Bright **white/cyan rim** on outer ribbon edge; right-side framing; subtle film grain overlay
