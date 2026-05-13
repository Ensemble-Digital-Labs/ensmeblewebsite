# Session log – 2026-05-13

## Summary

**Did you know?** read as a floating **card** because the wrapper used **`rounded-b-2xl` + border + drop shadow**, and the magnifier grid used **`rounded-xl` + border + heavy shadow**. Removed outer card chrome; flattened the stats panel to **`rounded-none`** with light **`border-y`**, subtle **`sm:rounded-md`**, lighter **`bg-[#050816]/55`**, no drop shadow.

## Changes

- `src/components/sections/HomeProblemSection.jsx` — Did-you-know shell: drop rounded border shadow; keep `relative isolate overflow-hidden` + image stack.
- `src/components/sections/HomeProblemStatsReveal.jsx` — magnifier container: `rounded-none border-y … sm:rounded-md`, removed large shadow.
