# Session log – 2026-06-15 (nav card colors on reopen)

## Summary
Fixed nav menu cards losing their accent colors after close/reopen. GSAP `clearProps: 'all'` on close was wiping inline `--nav-logo-accent` custom properties; React did not re-render to restore them.

## Changes
- `src/styles/fullscreen-nav-menu.css` — accent colors on `.fs-nav-app-tile--blue|orange|teal|coral|lime|purple` classes.
- `src/components/FullscreenNav.jsx` — removed inline `style` accent vars; narrowed `clearProps` to opacity/visibility/transform only; kill stale tweens before reopen animations.

## Notes
- Card colors now live in CSS classes, not inline styles, so GSAP cleanup cannot strip them.
