# Session log – 2026-04-16 (shadcn-style Card + `@/` alias)

## Summary

Added shadcn-style `Card` primitives (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) in `src/components/ui/Card.jsx` using `cn` from `@/lib/utils`. Restored **default export** `Card` and optional **`hover`** prop for existing pages (`CaseStudies`, `ServicesPreview`, etc.). Configured Vite `resolve.alias` `@` → `src` and added `jsconfig.json` path hints.

## Changes

- `vite.config.js` — `path` + `@` alias
- `jsconfig.json` — `"@/*": ["src/*"]`
- `src/components/ui/Card.jsx` — new file (replaces prior Card-only implementation with compound components + default export)

## Notes

- Semantic classes from the snippet (`bg-card`, `text-muted-foreground`) map to project tokens: `bg-bg-card`, `text-text-primary`, `text-text-secondary`.
- Import either `import Card from '.../Card'` or `import { Card, CardHeader, ... } from '.../Card'`.
