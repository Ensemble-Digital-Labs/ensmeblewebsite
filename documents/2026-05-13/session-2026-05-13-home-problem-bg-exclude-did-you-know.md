# Session log – 2026-05-13

## Summary

Limited **`hero-bg-ensemble-01`** to the headline + pain-bar column only. The **“Did you know?”** block sits in a sibling wrapper with **`bg-[#050816]`** and higher stacking so the ambient wash does not run under that band.

## Changes

- Edited `src/components/sections/HomeProblemSection.jsx` — wrapped ambient image + headline + list in an inner `relative isolate` container; aside lives outside with `z-[2]` and solid `#050816`.
