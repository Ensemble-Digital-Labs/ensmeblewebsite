# Session log – 2026-05-13

## Summary

Removed the **dark gap** between `HeroStatsTrustBand` and **#home-problem**: vertical padding had lived on `<section>` while the ambient image lived in a child, so **top padding painted flat `#050816`** with no wash. **Top padding** now sits on the **same wrapper** that contains the absolute background (`pt-14 sm:pt-16 md:pt-20`); section keeps **bottom padding only** for spacing below “Did you know?”.

## Changes

- Edited `src/components/sections/HomeProblemSection.jsx` — `section`: `py-*` → `pb-*` only; inner band: add matching `pt-*`.
