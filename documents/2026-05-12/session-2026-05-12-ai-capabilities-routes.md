# Session log – 2026-05-12 (AI capabilities routes)

## Summary
Defined the AI capabilities hub at `/ai` with five child playbooks and matching summaries; extended marketing doc layout with optional `relatedLinks` grid, hub breadcrumb for `/ai/*` pages, and growth-gradient on the doc `h1`. Production build verified.

## Changes
- **`src/data/site/aiPages.js`** — Six entries: overview + predictive targeting, HIPAA monitoring, chatbot lead capture, campaign optimization, patient nurture automation (titles, summaries, intro copy; hub `relatedLinks`).
- **`src/data/site/buildPage.js`** — `SitePageDoc` typedef includes optional `relatedLinks`.
- **`src/components/site/MarketingDocLayout.jsx`** — JSDoc for `relatedLinks`; “Capability playbooks” link grid; `growth-gradient-text` on main heading; breadcrumb `Home / AI / …` for paths under `/ai/`.

## Notes
- Routes continue to resolve via existing `/ai` and `/ai/:slug` → `DynamicSitePage` / `getSitePage`.

## Next steps (optional)
- Add `/ai` to primary nav if it should be discoverable from the menu.
