# PopArt reference animation analysis + Ensemble fix

## How PopArt (popwebdesign.net) actually works

### Text reveal (`rev-text`)

**Markup:**
```html
<h2 class="section-title">
  <span class="rev-text temp-hide">Web design</span>
</h2>
<!-- Hero uses wrap for multi-line: -->
<h1>
  <span class="rev-text-wrap">
    <span class="rev-text temp-hide" data-rev-delay="300">Full Service...</span>
  </span>
</h1>
```

**CSS:**
- `.rev-text-wrap { overflow: hidden }`
- `.rev-text { transition: 350ms }`
- `.temp-hide { transform: translate(0, 100%) }` — text starts below clip
- **Mobile ≤1024px:** `.temp-hide { transform: none }` — text always visible

**JS (`all-pages.js`):**
- On scroll (interval + `isOnScreen()`), each `.rev-text` with `temp-hide` **removes the class**
- Stagger via `data-rev-delay` (ms)
- **No GSAP ScrollTrigger** for section copy — simple class toggle + CSS transition

### Section reveals (`scroll-show`)

- Sections have class `scroll-show`
- On scroll when section is half in view, adds `.show` to:
  - `.outer-wrapper` children (stagger `300ms * index`)
  - `.animate-bigletter` → `.show` (letter turns yellow `#facc16`)
  - `.yellow-block`, `.section-image`, etc.

### Parallax / pin (desktop ≥1250px)

- ScrollMagic pins `#homeslider`, tweens horizontal slide strip
- `.has-parallax` sections move background images via ScrollMagic scrub

### Key difference from our broken approach

| PopArt | Ensemble (before fix) |
|--------|----------------------|
| Text visible via **class remove** + CSS transition | GSAP `yPercent: 110` + ScrollTrigger |
| Scroll listener checks **isOnScreen** every frame | ScrollTrigger init at 600ms/1400ms — **misses if already in view** |
| Re-init safe — class stays removed | `ctx.revert()` **re-hides** text on each re-setup |
| Mobile: text never hidden | Same hide CSS on all breakpoints |

## Ensemble fix (2026-06-12)

Replaced PopArt section copy animation with reference pattern:

- `HomePopArtRevText.jsx` — wrap + hidden class (like `rev-text` / `temp-hide`)
- `useHomePopArtRevText.js` — IntersectionObserver + scroll scan on `#main` (like `isOnScreen`)
- Removed `data-home-mask-group` from `HomePopArtSectionLayout`
- `useHomeSequentialReveals` — single init (`motionInitialized`), no mask on popart sections

## Files

- Reference HTML saved: `documents/2026-06-12/popart-index.html`
- Reference JS saved: `documents/2026-06-12/popart-all-pages.js`, `popart-index.js`
