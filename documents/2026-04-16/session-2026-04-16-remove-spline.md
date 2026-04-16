# Session log – 2026-04-16 (remove Spline)

## Summary

Removed the Spline / `@splinetool/react-spline` integration because it was not working reliably. The hero now relies on the existing Three.js globe and static content; dependencies and env hints tied to Spline were cleaned up.

## Changes

- Ran `npm uninstall @splinetool/react-spline` (updates `package.json` / lockfile).
- Replaced `.env.example` with a generic placeholder (removed `VITE_SPLINE_*` vars).
- Prior edits in this effort: `Hero.jsx` and `content.js` stripped of Spline; deleted `SplineScene.jsx`, `splite.jsx`, `SplineSceneBasic.jsx`.

## Notes

- `npm run build` succeeded after removal.
- Historical session docs under `documents/2026-04-16/` still mention Spline for archive purposes.

## Next steps

- None required for Spline removal; optional audit of bundle size / chunk splitting remains independent.
