# Session log – 2026-06-15 (showcase clear brand logo)

## Summary
Increased desktop clearance so the left Selected work showcase no longer touches the fixed ENSEMBLE brand logo when the fullscreen menu is open.

## Changes
- `src/components/FullscreenNav.jsx` — added `fs-nav-showcase-aside` class; extra top padding on showcase list; scroll-padding on rail
- `src/styles/fullscreen-nav-menu.css` — `lg+` rule: `fs-nav-expand-content` padding-top `clamp(11.5rem, 24vh, 13.5rem)` to match nav lockup height (h-28/h-32 logo + bar padding)

## Notes
- Prior aside-only padding was insufficient; expand shell was only ~5.25rem from top while nav bar totals ~11–13rem on laptop/desktop.
- Right logo panel already relied on expand-content offset; showcase aside had no equivalent `fs-nav-panel-nav` padding rule.
