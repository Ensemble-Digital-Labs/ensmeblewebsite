# Session log – 2026-06-15 (blog filter card transitions)

## Summary
Added smooth staggered fade/slide transitions on the insights (`/blog`) page when switching category filters, sort order, or pagination.

## Changes
- `src/pages/BlogHub.jsx` — `AnimatePresence` + framer-motion grid/card variants; honors `prefers-reduced-motion`

## Notes
- Grid re-animates on `activeFilter`, `sortOrder`, and page changes via keyed `motion.div`.
