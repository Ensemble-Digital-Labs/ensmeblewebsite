# Session log – 2026-05-12 (fullscreen nav — showcase image fills row)

## Summary
Replaced fixed thumbnail dimensions with a **`flex-1 min-w-0 self-stretch`** image frame beside meta: row uses **`lg:items-stretch`** and meta is **`shrink-0`** so the photo grows to **fill remaining width and row height**. Image uses **`absolute inset-0 object-cover`** inside the relative frame; **`min-h-[min(22svh,220px)]`** keeps a usable minimum.

## Changes
- Edited `src/components/FullscreenNav.jsx`.
