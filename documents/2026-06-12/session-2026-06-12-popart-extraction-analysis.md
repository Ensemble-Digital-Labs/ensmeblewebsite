# Session log – 2026-06-12 (PopArt extraction & technique analysis)

## Summary

Attempted automated extraction of [PopArt Studio](https://www.popwebdesign.net/index_eng.html) via the extraction tool; crawl blocked by reCAPTCHA. Completed manual reverse-engineering from live HTML, `main.css`, `index.js`, and `all-pages.js` to document motion/layout techniques and map applicable patterns to Ensemble.

## Changes

- Created `documents/2026-06-12/session-2026-06-12-popart-extraction-analysis.md` (this file)

## Extraction tool result

- Command: `pnpm engine:extract "https://www.popwebdesign.net/index_eng.html" --max-pages 8`
- Outcome: **Failed** — CAPTCHA on crawled URLs; no `output/www.popwebdesign.net/` artifacts
- Manual fetch of HTML/CSS/JS succeeded with browser User-Agent

## PopArt technique inventory (source of truth: live assets)

### Stack

- jQuery 3.1.1, **GSAP TweenMax**, **ScrollMagic** + `animation.gsap`, **Vivus** (SVG stroke), **Slick** carousel, Bootstrap scrollspy
- Fonts: Poppins + Playfair Display; accent yellow `#facc16`
- reCAPTCHA v3 on site (blocks headless crawl)

### Motion & interaction patterns

1. **Vertical bar page loader** — 6 columns, staggered height reveal (`vert-loader` + `localStorage` skip on return visits)
2. **Hero rev-text reveal** — `rev-text-wrap` + `rev-text temp-hide` with `translateY(100%)`; stagger via `data-rev-delay`
3. **Giant section monogram** — `span.bigletter` (F/W/D/G/S); scroll-in adds `.show`, color flips to yellow
4. **Scroll-spy section rail** — `#scrollspy` fixed beside hero height; numbered 01–05 links; active state on scroll; top/bottom jump anchors
5. **ScrollMagic parallax** — `.has-parallax` sections; `data-parallax-offset` tween over full `#main` height (desktop ≥1250px)
6. **ScrollMagic pinned horizontal slider** — `#homeslider` pinned; `TimelineMax` moves `#homeslides-wrapp` −25/−50/−75% over 500% scroll duration
7. **Staggered paragraph reveals** — `.outer-wrapper` children add `.show` with `300ms * index` delay inside `.scroll-show` sections
8. **Typewriter-style blocks** — `.write-all` class for longer copy reveals
9. **SEO section Vivus + icon stagger** — SVG line draw (`Vivus`, 140ms) then `.icon-wrapper` icons fade in with 300ms stagger
10. **Count-up stats** — `.ts-inc` numbers increment when testimonial strip enters view (scroll on slider or about section)
11. **Client logo shuffle** — interval + `data-delay` per logo, `.switch` class swap animation
12. **Page transition curtain** — internal links set `localStorage.page`, replay vert-loader + `.l-loading` before navigation
13. **Hero video** — lazy play on first mousemove/scroll/click (desktop); mobile static image
14. **Blog Slick slider** — 3-up desktop, 1-up mobile; rev-text unhide on slide change

### Layout / content patterns

- Single-page service chapters with letter + image + copy + circular CTA (`.draggable-btn` / `.x-btn`)
- Tech capability tag list (unordered pills) in dev section
- Trust badges row (Clutch, BBB, Forbes) under hero CTAs
- Mega-menu with rich service descriptions in header
- Multi-step overlay forms (Order / Careers / Contact) with same rev-text pattern
- Yellow accent blocks (`.yellow-block`) as visual rhythm between sections

## Ensemble mapping (what exists vs. gaps)

| PopArt pattern | Ensemble today | Fit for healthcare brand |
|----------------|----------------|---------------------------|
| Numbered scroll rail (`HomeSectionIndex`) | ✅ Similar — right-side 01–10 chapter nav | Strong — keep dark glass styling |
| Sequential scroll reveals (`useHomeSequentialReveals`) | ✅ GSAP fade/slide | Upgrade option: **mask slide-up** rev-text |
| Giant section letter | ❌ Not used | Selective — e.g. E/D/L for Expertise/Digital/Labs |
| Scroll-pinned horizontal story | ❌ Continuous vertical only | High impact for Proof or Work chapter |
| Layered parallax images | Partial (`ParallaxDepth`, atmosphere canvas) | Section-level image stacks like PopArt W section |
| Count-up proof stats | Partial (`TrustStatCards`) | Align trigger + stagger with PopArt |
| Tech/capability tag cloud | Partial in capabilities | Pill list with scroll reveal |
| Page transition loader | ✅ `Loader.jsx` (different aesthetic) | Optional 6-bar variant for nav transitions |
| Sticky section nav height-synced to hero | ❌ Rail is viewport-centered | PopArt ties rail top/height to `.banner-inner` |
| Trust badge strip under hero | Partial | Clutch-style third-party badges |

## Decisions / notes

- Do **not** clone PopArt yellow/white agency look — adapt **motion grammar** to plum/teal atmosphere
- PopArt desktop-only for ScrollMagic parallax/pin (>1250px); mobile shows static `.show` states — mirror with `prefers-reduced-motion` + breakpoint gates
- For full extraction artifacts, need headed browser session or CAPTCHA-aware crawl config

## Next steps

- User to pick 2–3 patterns to implement first (e.g. rev-text reveals, pinned work slider, bigletter accents)
- Optional: save reference screenshots manually to `documents/2026-06-12/popart-reference/` for design comparison
- Re-run extraction with headed Playwright if user wants `tokens.json` / component PNGs

---

## Fix – hero headline invisible (2026-06-12 follow-up)

**Cause:** Mask CSS hid all `.home-mask-reveal__inner` at `translateY(110%)` but GSAP load tweens did not reliably run (Lenis init timing / no scrollTrigger on load lines).

**Fix:**
- Hero load lines animate via **CSS keyframes** when `#home-scroll-root[data-home-intro-ready]` (set after intro loader completes, or immediately if loader skipped)
- Scroll-triggered mask lines only hidden via `[data-home-mask-reveal]` selector
- `useHomeSequentialReveals` deferred until 600ms / 1400ms + `ensemble:scroll-ready` event from Locomotive
- `Home.jsx` gates hero animation on loader complete
