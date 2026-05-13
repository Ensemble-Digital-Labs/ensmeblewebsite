# Session log – 2026-05-13

## Summary

Yes — there **was** a visible gap after **#home-problem**: **section bottom padding** (`pb-14`–`pb-20`), **inner band bottom padding**, and **Carousel3D** headline stack **`pt` ~6rem** stacked between the last pain row and “Built by Ensemble…”. Tightened **home-problem** outer/inner `pb-*` and reduced **Carousel3D** top padding by ~2rem at each breakpoint.

## Changes

- `src/components/sections/HomeProblemSection.jsx` — section `pb-14 sm:pb-16 md:pb-20` → `pb-8 sm:pb-10 md:pb-12`; inner band bottom `pb-8…` → `pb-6 sm:pb-8 md:pb-10`.
- `src/components/sections/Carousel3D.jsx` — sticky headline column `pt` from `6rem / 6.25rem / 6.75rem` → `4rem / 4.5rem / 5rem` (with same safe-area `max()` base).
