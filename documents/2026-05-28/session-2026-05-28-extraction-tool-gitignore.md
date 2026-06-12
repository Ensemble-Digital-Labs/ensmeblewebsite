# Session log – 2026-05-28

## Summary
Updated repository ignore rules so the local `extraction tool` workspace is not tracked by this main site repo. This keeps extraction runs and tool internals local-only.

## Changes made
- Updated `.gitignore`
  - Added `/extraction tool/`

## Decisions / notes
- The `extraction tool` project already has its own internal `.gitignore` for generated output (`/output/`), but this repo now ignores the entire folder at root level.
- This ensures extraction artifacts remain in that folder and do not appear in `ensemblev2` git status.

## Next steps
- None required unless you want a separate repo initialized specifically for `extraction tool`.

---

## Update – Video asset organization

### Summary
Moved the newly added website video from the project root into the public assets video folder and applied a clean, descriptive filename.

### Changes made
- Moved `ensemble.mp4` → `public/assets/videos/ensemble-website.mp4`

### Decisions / notes
- Keeping video assets under `public/assets/videos/` matches existing repo structure and makes static URL usage straightforward (`/assets/videos/ensemble-website.mp4`).

### Next steps
- Wire this video into the intended section/component when ready.

---

## Update – Initial website loader video

### Summary
Applied the new `ensemble-website.mp4` as the visual background for the intro loader and enabled the intro loader on the canonical `/` homepage route so it appears on initial website load.

### Changes made
- Updated `src/components/Loader.jsx`
  - Added full-screen muted looping video layer: `/assets/videos/ensemble-website.mp4`
  - Kept reduced-motion behavior (video disabled when motion is reduced)
- Updated `src/pages/Home.jsx`
  - Added one-time loader gate with `isHomeIntroLoaderDone()` / `markHomeIntroLoaderDone()`
  - Mounted `Loader` before home content on `/`

### Decisions / notes
- Existing loader timing and transitions were preserved; only the background media layer changed.
- Build verification passed (`npm run build`).

### Next steps
- Optional: tune video opacity or hold duration if readability/brand impact needs adjustment.

---

## Update – Loader replay on refresh

### Summary
Adjusted home intro loader gating so the loader (and video) appears again after each hard refresh, while still avoiding repeat during the same in-app navigation session.

### Changes made
- Updated `src/lib/homeLoaderGate.js`
  - Removed `localStorage` persistence
  - Kept in-memory session flag only

### Decisions / notes
- Behavior now matches “see loader video on refresh” expectation.
- Build verification passed (`npm run build`).

---

## Update – Loader video visibility fix

### Summary
Adjusted loader overlay opacity so the intro video is visibly present behind the logo/content instead of being fully masked by dark gradient layers.

### Changes made
- Updated `src/components/Loader.jsx`
  - Increased video layer visibility (`opacity` from 0.44 to 0.78)
  - Made gradient wash semi-transparent (alpha-based colors)
  - Reduced vignette darkness

### Decisions / notes
- Preserved readability of logo/loading text while exposing video motion.
- Build verification passed (`npm run build`).

---

## Update – Loader synced to video + one-time per user

### Summary
Changed intro behavior so the loader lasts for the full video playback (single run, no looping) and only shows once per user via localStorage persistence.

### Changes made
- Updated `src/components/Loader.jsx`
  - Removed looping from loader video
  - Loader now closes on video `ended` (or `error` fallback)
  - Progress bar duration now follows loaded video duration metadata
  - Added failsafe timeout to prevent stuck loader if autoplay fails
- Updated `src/lib/homeLoaderGate.js`
  - Restored persistent one-time gate with `localStorage` key
  - Kept in-memory fallback if storage is blocked

### Decisions / notes
- This matches requested UX: full video intro once per user.
- Build verification passed (`npm run build`).

---

## Update – Remove loader foreground UI

### Summary
Removed the front overlay lockup from the intro loader so only the video is visible during loading.

### Changes made
- Updated `src/components/Loader.jsx`
  - Removed foreground logo, loading label, and progress line
  - Kept video-only presentation and existing loader timing/exit behavior
  - Cleaned unused imports/state

### Decisions / notes
- Build verification passed (`npm run build`).

---

## Update – Hypefluency-inspired homepage proof patterns

### Summary
Applied three homepage-only refinements from the Hypefluency extraction: stronger trust stat typography, outcome lines on service verticals, and multi-metric chips on selected work cards.

### Changes made
- Updated `src/components/home/TrustStatCards.jsx` — larger stat values, tighter uppercase labels
- Updated `src/data/services.js` — added `outcomeLine` per vertical
- Updated `src/components/home/HomePageSections.jsx` — outcome lines on service cards; `CaseStudyMetricChips` on work band (up to 3 metrics per case)

### Decisions / notes
- Homepage-only; no global theme or other routes changed.
- Case study chips use existing `metrics` arrays in `healthcareCaseStudies.js`.

---

## Update – Remove dark overlay + cleaner video presentation

### Summary
Removed the dark/graphic overlay stack from the loader so the intro shows the raw video directly. Added slight zoom/reposition to reduce visibility of the bottom-right Gemini mark in the source clip.

### Changes made
- Updated `src/components/Loader.jsx`
  - Removed gradient wash, glow, grid, vignette, and top hairline overlays
  - Kept only raw video layer for normal motion mode
  - Added slight zoom/reposition: `transform: scale(1.1)`, `objectPosition: 50% 48%`
  - Kept dark fallback only for reduced-motion path

### Decisions / notes
- Video “quality” is now as direct as possible in-app (no dimming/opacity overlays).
- Source-embedded watermark/symbol can only be visually cropped/hidden, not truly removed without re-exporting the source video.
- Build verification passed (`npm run build`).

---

## Update – Homepage narrative recreation (Hypefluency flow)

### Summary
Recreated the homepage deck flow with an agency-style chapter order (proof → services → pillars → work → why us → depth → CTA), ID-based chapter rendering so reordering does not require moving JSX blocks, unified section headers, and a “why Ensemble” proof grid on the who chapter.

### Changes made
- Updated `src/lib/homeNarrativeSections.js` — new chapter order and rail labels
- Created `src/components/home/HomeSectionHeader.jsx` — shared eyebrow/title/lead
- Created `src/lib/homePageCopy.js` — `HOME_WHY_ENSEMBLE` + section lead copy
- Updated `src/components/home/HomePageSections.jsx` — `activeId` switches; headers; why grid; trust band intro copy

### Decisions / notes
- Preserved deck scroll, pixel transitions, loader video, and existing section content/animations.
- Chapter order: Intro → Proof → Services → How we grow → Work → Why us → AI → Gaps → Roadmap → Plans → Audit.
- Build verification passed (`npm run build`).

---

## Update – Full homepage section redesign (visible layouts)

### Summary
Redesigned every homepage deck chapter with distinct layouts. Split into `src/components/home/chapters/*`.

### Changes made
- `HomeDeckSectionShell.jsx`, `HomeDeckPrimitives.jsx`, 11 chapter components, slim `HomePageSections.jsx` router

### Per-chapter visuals
- Hero: glass card + CTA column + stat strip
- Proof: bento featured stat
- Services: dark stacked rows
- Pillars: timeline
- Work: image overlay cards
- Why us: comparison table
- AI: flagship + grid
- Gaps: numbered panels
- Roadmap: horizontal stepper
- Plans: tier cards
- CTA: centered + checklist card

### Notes
- Hard-refresh if dev cache shows old UI (`Ctrl+Shift+R`).

---

## Update – Influx Marketing extraction (`influxmarketing.com`)

### Summary
Ran the local extraction tool on [Influx Marketing](https://www.influxmarketing.com/). Fixed a `page.evaluate` `__name` polyfill bug in the engine, crawled 5 pages, and generated full artifacts.

### Output folder
`extraction tool/output/www.influxmarketing.com/`

### Artifacts
- `DESIGN.md`, `tokens.json`, `tailwind.css`, `preview.html`, `proof.html`, `report.html`, `regenerated-ramp.json`, 25 screenshots

### Engine fix
- Added `lib/engine/browser-eval-polyfill.ts` and wired it in `extract.ts` (esbuild `__name` helper for Playwright evaluate callbacks)
- Added `pnpm engine:emit-artifacts` for post-processing after CLI extract

### Extraction stats
- 3,902 DOM elements, 56 colors, 52 typography levels, 5 pages (home + plastic surgery + medspa + growthstack)

---

## Update – Full Influx-inspired homepage redesign

### Summary
Rebuilt the homepage deck to follow [Influx Marketing](https://www.influxmarketing.com/) section flow and layout patterns (multi-line display headlines, expertise cards, proof + marquee, testimonial carousel, passion band, browser-style work showcase, 4-step process, 8-capability grid, AI + contact form) while keeping Ensemble’s dark healthcare palette, deck scroll, and pixel transitions.

### New chapter flow (11 slides)
Intro → Story → Expertise → Proof → Clients → Mission → Work → Process → Capabilities → AI → Contact

### Key files
- `src/lib/homeInfluxContent.js` — copy mapped from Influx patterns
- `src/components/home/influx/*` — shared primitives, marquee, testimonials
- `src/components/home/chapters/HomeChapter*.jsx` — all chapters rewritten/added
- `src/lib/homeNarrativeSections.js`, `HomePageSections.jsx`, `index.css` (influx card/light-band styles)

### Notes
- Not a pixel clone: dark navy/teal Ensemble theme vs Influx light editorial site.
- Build passed (`npm run build`).

---

## Update – Hybrid home deck scroll (acts + inner scroll)

### Summary
Replaced 11 pixel-wipe chapter steps with **4 acts**. Wheel scrolls **inside** each act through stacked sections; **pixel transition only once** (Intro → Prove). Rail still jumps to all 11 sections; same-act jumps scroll without pixel.

### Acts
1. **Intro** — hero only (full viewport)
2. **Prove** — brand, expertise, proof (scroll inside)
3. **Story** — testimonials, mission, work, process (scroll inside)
4. **Close** — capabilities, AI, CTA (scroll inside)

### Key files
- `src/lib/homeDeckActs.js`
- `src/components/home/HomeStoryViewport.jsx`
- `src/components/home/HomePageSections.jsx` (`#home-deck-scroll`)

---

## Update – Faster hybrid home scroll

### Summary
Fixed sluggish scroll: inner act stacks use **native overflow scrolling** (no wheel hijack), Lenis home `wheelMultiplier` restored to 1, act changes snap instantly (no smooth pin scroll), shorter cooldowns, faster pixel wipe.

### Changes
- `HomeStoryViewport.jsx` — native inner scroll; instant act transitions
- `HomePageSections.jsx` — stop wheel propagation inside scrollable act
- `locomotive.js` — home wheel multiplier 1
- `index.css` — removed `scroll-behavior: smooth` on deck scroll

---

## Update – Influx-style homepage photography

### Summary
Upgraded homepage visuals with curated healthcare marketing photography (Influx-style: large portraits, image-first cards, editorial crops). Centralized assets in `homeImagery.js` with `photoUrl()` for crisp Unsplash delivery.

### Changes
- **Created** `src/lib/homeImagery.js` — hero, brand, passion, proof strip, expertise cards, testimonials
- **Created** `src/components/home/influx/HomePhoto.jsx`, `HomeExpertiseCard.jsx`
- **Updated** `homeInfluxContent.js` — re-exports imagery from `homeImagery.js`
- **Updated** chapters: Hero (split portrait + stronger bleed), Expertise (full-bleed overlay cards), Brand (team photo), Passion (consult image), Proof (3-photo strip), Work (higher-res case study shots), Testimonials (large side portrait layout)

### Notes
- Hero keeps local `home-hero-primary-2026-05.png` as bleed; Unsplash portrait on right (lg+).
- Build passed (`npm run build`).

---

## Update – Influx CDN images (not Unsplash)

### Summary
Swapped homepage photography to official URLs from `www.influxmarketing.com/assets/img/` via `influxAssets.js`.

### Changes
- **Created** `src/lib/influxAssets.js`
- **Updated** `src/lib/homeImagery.js`, `HomeChapterWork.jsx`
- Testimonials: Influx `photo-showcase` editorial shots + Ensemble quotes (no Influx client headshots)

### Notes
- Hotlinked from Influx CDN; download to `public/` before production if needed.

---

## Update – Influx exact homepage recreation

### Summary
Rebuilt homepage to closely mirror influxmarketing.com: **white canvas**, ink/coral tokens, exact copy, Influx CDN images, section order, masthead grid, Inc. 5000 partner band, client testimonial carousel, site-showcase work, 8 capability cards with icons, contact form. Removed AI chapter from deck; disabled dark atmosphere canvas on `/`.

### Key changes
- Light theme: `.home-influx-exact` on `#home-scroll-root`, CSS tokens `#2d2c2b` / `#ff6b3c`
- `homeInfluxContent.js` — Influx verbatim copy (brand, expertise, process, win, CTA)
- All chapter components rewritten for light Influx layout
- `homeDeckActs.js` — removed `home-ai`; matches Influx flow
- Section rail + `#main` background updated for light home

---

## Update – Restore dark canvas (not white Influx clone)

### Summary
User feedback: white screen was wrong. Restored Ensemble **dark navy deck** + atmosphere canvas while keeping Influx layout, copy, and photography.

### Changes
- `home-influx-exact` → `home-influx-deck` (transparent bg, white type)
- Primitives + all chapters back to glass/dark styling
- Re-enabled `HomeAtmosphereCanvas` on `/`
- Removed white `#main` override

---

## Update – Extraction recreation mode (rules + workflow)

### Summary
User feedback: too many Ensemble rules prevent exact site recreation from extraction. Added recreation-mode Cursor rule, agent prompt template, and extraction tool workflow doc.

### Changes
- **Created** `.cursor/rules/extraction-recreation.mdc` — fidelity-first; overrides preserve/brand rules when cloning from `extraction tool/output/`
- **Created** `extraction tool/prompts/component-exact-recreation.md` — paste prompt for exact component rebuild
- **Created** `extraction tool/RECREATION-WORKFLOW.md` — gap analysis + recommended workflow + future engine emit tasks

---

## Update – Pixel transition on nav routes (not homepage sections)

### Summary
Moved the pixel grid wipe from homepage deck act transitions to navbar route changes. Clicking nav links to non-home pages (Services, Case Studies, Contact, etc.) now plays the pixel transition; homepage section scrolling no longer uses it.

### Changes
- **Created** `src/components/PixelTransition.jsx` — global provider + `navigateWithPixel`
- **Created** `src/components/NavPixelLink.jsx` — nav `Link` wrapper with pixel routing
- **Created** `src/lib/pixelNav.js` — `shouldUsePixelNav` helper
- **Edited** `src/app/layout.jsx` — wraps app in `PixelTransitionProvider`
- **Edited** `src/pages/Home.jsx` — removed home-only pixel provider
- **Edited** `src/components/FullscreenNav.jsx` — menu links, CTA, showcase use `NavPixelLink`; logo home links unchanged
- **Edited** `src/lib/homeDeckActs.js` — `pixelEnter: false` on prove act
- **Edited** `src/components/home/HomeStoryViewport.jsx` — removed homepage pixel deck logic
- **Edited** `src/components/home/HomePixelTransition.jsx` — re-exports from global module

### Notes
- Pixel overlay z-index raised to `999999` so it covers the fullscreen nav during transitions
- Home (`/`) navigation and `prefers-reduced-motion` skip the effect
- Build verified with `npm run build`

---

## Update – Continuous homepage scroll (no act cutoffs)

### Summary
Removed the hybrid 4-act pinned deck on `/`. All homepage sections now scroll continuously through `#main` with no hard cutoffs between acts.

### Changes
- **Rewrote** `HomeStoryViewport.jsx` — section tracking + rail jumps only; removed sticky pin, wheel hijack, and act stepping
- **Rewrote** `HomePageSections.jsx` — renders all 10 sections in one vertical stack
- **Updated** `useHomeSequentialReveals.js` — scroll-triggered reveals per section (not per act swap)
- **Updated** `layout.jsx` — normal Lenis smooth scroll on home (removed `homeDeck` mode)
- **Updated** `HomeSectionIndex.jsx`, `Home.jsx` — simplified for continuous scroll

### Notes
- Section rail still works: click a chapter to smooth-scroll to that section
- Hero keeps full-viewport height; other sections flow naturally with stacked spacing

---

## Update – Fix gradient accent headline clipping

### Summary
Fixed emphasized hero lines (e.g. "growth-minded") getting cut off at descenders. Cause: tight `leading-[0.98]` plus `bg-clip-text` on the accent span.

### Changes
- **Edited** `HomeInfluxPrimitives.jsx` — per-line `leading-[1.08–1.1]`, accent uses `.home-influx-gradient-text`
- **Added** `.home-influx-gradient-text` in `index.css` — padding-bottom + line-height for descenders
- **Edited** `HomeChapterHero.jsx` — `overflow-y-visible` on hero; headline wrapper `overflow-visible`

---

## Update – Ensemble homepage copy (rebrand from Influx reference)

### Summary
Replaced Influx reference copy, testimonials, imagery, and partner badges with Ensemble Digital Labs content from `content.js`, `homePageCopy.js`, and local assets.

### Changes
- **Rewrote** `homeInfluxContent.js` — hero, brand, expertise, testimonials intro, mission, work, process, capabilities, win, CTA
- **Rewrote** `homeImagery.js` — portfolio images, Ensemble testimonials, expertise cards, local ambient art (no Influx CDN)
- **Updated** chapter components — Hero CTAs, Brand, Expertise, Testimonials, Proof (stats band), CTA form labels + background
- Proof section now shows `100+ / 3× / 90 days` stats instead of Influx partner logos
