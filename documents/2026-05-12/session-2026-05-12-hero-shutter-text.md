# Session log – 2026-05-12 (Hero shutter text)

## Summary
Added a per-character "shutter" animation to the focal **ENSEMBLE** line in the
desktop hero. On mount the word shutters IN (three colored horizontal slice
layers sweep across each character while the base fades in + un-blurs). As the
user scrolls the pinned hero (card expanding), the word shutters OUT — slices
sweep across once more in the opposite direction while the base fades + blurs
away. Lead "Welcome to" and tail "Digital Labs" keep their existing diagonal
slide-out + a soft fade-in so the dramatic effect stays focused on the brand
word and isn't noisy across ~30 characters × 4 layers.

## Changes
- `src/components/sections/HeroScrollExpand.jsx`
  - Added an inline `ShutterWord` helper that renders each character as a
    relatively-positioned span with `overflow:hidden` plus four child spans:
    - `data-shutter="base"` — visible white character (opacity + blur driven by GSAP)
    - `data-shutter="top"` — top 35% slice in `var(--color-growth-from)` (rose)
    - `data-shutter="mid"` — middle 30% slice in white/85%
    - `data-shutter="bot"` — bottom 35% slice in `var(--color-growth-to)` (coral)
  - Replaced the desktop focal `<h1>` direct text with `<ShutterWord …>`. Added
    a `sr-only` canonical text so the accessible name stays clean. Marked the
    decorative slices and the `ShutterWord` container with `aria-hidden`.
  - Removed `mix-blend-difference` from the focal `<h1>` (colored slices read
    correctly without difference inversion). Lead + tail keep `mix-blend-difference`.
  - Replaced the old "ENSEMBLE rises straight up + fades" tween with:
    1. Initial `gsap.set` hiding bases + parking slices off-screen (top/bot at
       xPercent −100, mid at +100).
    2. A one-shot **entry timeline** (`delay 0.35`) that sweeps the slices
       through (`-100 → 0 → +100` for top/bot, mirrored for mid) while the base
       fades in with a 10px → 0 blur, plus a soft fade-in for lead + tail.
    3. Slice + base exit tweens added to the existing scrub-tied pin timeline
       so each slice sweeps once more during the scroll-driven card expand and
       the base fades/blurs out.
  - Lead + tail kept their diagonal slide-out (now also fade out via
    `autoAlpha`).
  - Cleanup now kills both `entryTl` and the scrub `tl`. `ScrollTrigger.refresh`
    delay bumped to 500ms to let the entry animation settle before measuring.

## Decisions / notes
- Per-character shutter is applied **only to the focal word** for two reasons:
  visual focus (drama stays on the brand) and performance (covering 30+
  characters × 4 layers with their own tweens gets heavy quickly).
- Slice colors use the existing growth-CTA palette tokens
  (`--color-growth-from` / `--color-growth-to`) so the shutter reads as
  part of the same brand system as the primary CTAs.
- Mobile / tablet branch is unchanged — static stacked title, no shutter, no
  pin. Honors `prefers-reduced-motion` as before (whole effect skipped).
- Entry has a 0.35s delay so the first paint is calm; on a session where the
  intro loader is still active the shutter plays under it, but on return
  visits (loader gated by `homeLoaderGate`) the effect is fully visible.

## Next steps (optional)
- If the user wants the shutter to be visible on first-visit too, gate the
  entry timeline on the loader-complete signal from `Home.jsx`.
- If the per-character serif slices look noisy on Fraunces, try Plus Jakarta
  Sans for the focal word only.

---

## Update — extend shutter to lead/tail + restore see-through

Followed up to apply the shutter treatment to **all three lines** (lead, focal,
tail) and to bring back the `mix-blend-difference` "see-through" effect.

### Changes (same file: `src/components/sections/HeroScrollExpand.jsx`)
- `ShutterWord` now applies `mix-blend-difference` directly to the **base**
  character span (and to the mid slice) so each word reads through the
  background image/card again. Top + bot slices keep their growth-CTA palette
  colors (`--color-growth-from` / `--color-growth-to`) without blend so the
  flash punches.
- Lead and tail are no longer rendered as raw `<p>{text}</p>`. They now use
  `<ShutterWord …>` inside their `<p>` wrappers, mirroring the focal `<h1>`
  pattern (with an `sr-only` span for the accessible name).
- The GSAP setup now iterates over a `lines` array (`[wordTop, wordMid,
  wordBottom]`), running the same shutter logic on each:
  - **Entry timeline** staggers between lines (`LINE_STAGGER = 0.18`) so the
    eye reads top → focal → bottom; per-character stagger inside each line
    stays at ~0.03.
  - **Exit timeline** runs all three lines' shutter-out roughly in parallel
    (lineIdx × 0.04 micro-stagger) so the title clears in lockstep with the
    card expanding.
  - Lead + tail still drift diagonally outward in the exit timeline; the
    shutter handles their fade-away.

### Notes
- DOM cost: ~30 characters × 4 layers = ~120 spans on desktop only. The mobile
  branch still uses plain text — no perf hit on phones.
- The `mix-blend-difference` on slices is intentional only on the mid slice;
  top/bot slices use solid brand colors to keep the rolling-shutter flash
  unmistakable while the rest of the text feels "punched through".
