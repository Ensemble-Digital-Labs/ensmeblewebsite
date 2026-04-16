# Session log – 2026-04-16 (Hero Spline 3D + look-at)

## Summary

Added `@splinetool/react-spline` with a lazy `SplineScene` component, optional hero layout (left column on desktop, stacked on mobile), and pointer-driven `setVariables` so a robot (or any rig) can follow the cursor with extra bias toward the pain-card grid. When a scene URL is set, the Three.js globe hero is disabled to avoid double WebGL; reduced-motion users get the globe again and no Spline panel.

## Changes

- `package.json` — `@splinetool/react-spline`
- `src/components/SplineScene.jsx` — `Suspense` + lazy `Spline`, loading spinner
- `src/lib/content.js` — `splineSceneUrl` (from `VITE_SPLINE_HERO_SCENE` or inline), `splineLookXName` / `splineLookYName`
- `src/components/sections/Hero.jsx` — spline column, `painGridRef`, window `pointermove` → `app.setVariables`
- `.env.example` — `VITE_SPLINE_HERO_SCENE` placeholder

## Spline authoring notes

1. Publish scene and copy **scene.splinecode** URL into `.env` or `content.js`.
2. In Spline **Variables**, add two **numbers** named **`LookX`** and **`LookY`** (or rename in `content.js`).
3. Bind head / look-at / neck rotation to those variables (map roughly −1…1 per axis). The code sends normalized −1…1 based on cursor blended ~52/48 with the pain-grid centroid.

## Next steps (optional)

- Manual chunk only `react-spline` for clearer caching (already lazy).
- Tune blend weights in `Hero.jsx` `applyLook` for stronger “watch the cards” behavior.
