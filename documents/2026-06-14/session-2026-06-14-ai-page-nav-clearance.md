# Session log – 2026-06-14 (AI page nav clearance)

## Summary
Fixed `/ai` (and other marketing doc pages) where breadcrumb/eyebrow text overlapped the fixed nav logo. Added responsive nav clearance padding and cleaned up the breadcrumb so it no longer duplicates the rose eyebrow label.

## Changes
- **`src/components/site/MarketingDocLayout.jsx`** — `marketing-doc-layout` class on container; breadcrumb uses `Home / AI` (hub) or `Home / AI / {title}` (detail) instead of repeating `doc.eyebrow`; aria-label on breadcrumb nav.
- **`src/index.css`** — `.marketing-doc-layout` with `--marketing-nav-clearance` scaled like home hero (10.5rem–15.5rem by breakpoint + safe-area); `.marketing-doc-breadcrumb` z-index; `.marketing-doc-bigletter` no longer pulled upward into nav zone.

## Notes
- Root cause: fixed overlay nav lockup (logo up to `h-32` + padding) exceeded previous `pt-24`–`pt-32` content offset.
- Rose eyebrow (`KEY PAGE · AI`) remains as the styled label below breadcrumb; breadcrumb no longer shows the same string.

## Next steps
- None required; verify at 320px–1440px if further nudge needed on very small screens.
