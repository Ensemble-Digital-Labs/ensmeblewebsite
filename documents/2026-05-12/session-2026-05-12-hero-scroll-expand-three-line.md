# Session log – 2026-05-12 – Hero scroll-expand: 3-line title

## Summary
Restructured the hero title from 2 lines to **3 lines** (`Welcome to` /
`Ensemble` / `Digital Labs`) and made "Welcome to" significantly larger.
"ENSEMBLE" remains the dominant focal word; the italic lead-in is now
prominent rather than a tiny eyebrow.

## Changes
- **Edited:** `src/components/sections/HeroScrollExpand.jsx`
  - Props renamed for clarity:
    - `primaryWord` → `leadText` (`'Welcome to'`)
    - `secondaryWord` removed; replaced with `focalText` (`'Ensemble'`)
      and `tailText` (`'Digital Labs'`)
  - Added a third title ref `wordMidRef` for the focal "ENSEMBLE" line.
  - Desktop initial Y stack: `-150 / -20 / +110` (lead / focal / tail) so
    the three lines sit tightly clustered over the card.
  - Desktop scroll animation per line:
    - `wordTop` ("Welcome to") → slides up-and-left
      (`x: -50vw, y: -45vh`)
    - `wordMid` ("ENSEMBLE") → rises straight up + fades
      (`y: -55vh, autoAlpha: 0`)
    - `wordBottom` ("Digital Labs") → slides down-and-right
      (`x: 50vw, y: 45vh`)
  - Desktop typography:
    - Lead: italic medium Fraunces, `clamp(1.75rem, 3.6vw, 3rem)` — was
      `clamp(1.25rem, 2.2vw, 2rem)`.
    - Focal: extrabold Fraunces, `clamp(4rem, 11vw, 10rem)` — dominant.
    - Tail: italic medium Fraunces, `clamp(1.85rem, 3.8vw, 3.25rem)` —
      slightly larger than the lead for balance with the focal word above.
  - Mobile typography mirrors the same hierarchy at smaller fluid sizes:
    `1.25/5.5/2rem` lead, `2.75/14/5.5rem` focal, `1.35/6.5/2.5rem` tail.
  - Mobile JSX renders all three as flow elements stacked vertically; no
    GSAP touches them on small screens.

## Decisions / notes
- Picked diagonal exits (lead up-left, focal straight up, tail down-right)
  rather than a horizontal slide-apart so the focal word "ENSEMBLE" gets a
  distinct exit direction. Otherwise the focal would overlap one of the
  outer lines mid-animation and read messy.
- The focal line is the page `<h1>` ("Ensemble" is the dominant brand word).
  Lead and tail are `<p>` — consistent with semantic best practice.
- Kept `whitespace-nowrap` on all three desktop lines so wrap behavior never
  fights the animation.

## Files touched
- Edited: `src/components/sections/HeroScrollExpand.jsx`
