# Session log – 2026-06-14 (CTA blended gradient)

## Summary
Refined the “Explore this service” logo rainbow so colors mix smoothly instead of reading as distinct bands.

## Changes
- **`src/index.css`**
  - Added `--ensemble-logo-rainbow-blend` in `:root` with ~33 stops at ~3% intervals (gold → green → cyan → orange → coral → magenta → purple).
  - `.ensemble-logo-gradient-text` now uses that variable with `background-size: 240%` and centered position for a softer blend across the label.
  - Reduced-motion variants reference the same variable (no duplicated gradient blocks).

## Notes
- No glow or animation — static blended spectrum only.
- If still too stripey, try `background-size: 280%` or add a second subtle overlay gradient later.
