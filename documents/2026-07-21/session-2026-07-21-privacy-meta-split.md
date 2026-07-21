# Session log – 2026-07-21 (privacy split)

## Summary
Restored the original website privacy policy as `/privacy-policy`, moved Meta API policy to `/meta-privacy-policy`, and added a Meta hover/tap dropdown linking to Meta Privacy + Data Deletion. Footer legal buttons restored to Privacy / Terms / Support.

## Changes
- `src/data/site/corePages.js` — restored healthcare privacy; Meta policy at `/meta-privacy-policy`
- `src/components/legal/MetaPrivacyMenu.jsx` — new dropdown (hover desktop, tap mobile)
- `src/components/legal/LegalDocView.jsx` — renders Meta menu when `metaPrivacyMenu`
- Routes/atmosphere: `/meta-privacy-policy`
- `CinematicFooter.jsx` — removed standalone Data Deletion button

## Notes
- Meta App Review URLs: `/meta-privacy-policy` and `/data-deletion`
- Contact form privacy links still go to `/privacy-policy` (website policy)

## Follow-up
- Removed Meta hero pill/dropdown; Meta Privacy + Data Deletion now via Related links on /privacy-policy. Deleted MetaPrivacyMenu.jsx.
