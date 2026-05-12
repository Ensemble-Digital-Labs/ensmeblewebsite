# Session log – 2026-05-11

## Summary
Removed small uppercase eyebrow labels across Home: problem, selected work (carousel), roadmap, and share experience.

## Changes
- `HomeProblemSection.jsx` — removed “The problem” `<p>`; no longer destructure `eyebrow`.
- `Carousel3D.jsx` — removed mono “Our work” row and gold rule; headlines stack directly under the border block.
- `HomeRoadmapSection.jsx` — removed “The roadmap” `<p>`; no longer destructure `eyebrow`.
- `ShareExperienceSection.jsx` — removed “Your voice” `<p>`.

## Notes
- `homeProblemContent.eyebrow`, `homeRoadmapContent.eyebrow`, and `homeSelectedWorkContent.sectionLabel` remain in `content.js` for `aria-label` / future use.
