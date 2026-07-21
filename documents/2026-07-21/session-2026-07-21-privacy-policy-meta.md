# Session log – 2026-07-21

## Summary
Replaced the placeholder healthcare privacy policy with the Meta API privacy policy (effective July 20, 2026) and added a linked Data Deletion Instructions page for Meta app-review completeness.

## Changes
- Updated `src/data/site/corePages.js` — full Privacy Policy + new `/data-deletion` doc
- Extended `src/data/site/buildPage.js` — sections support `items` and `afterItems`
- Updated `src/components/legal/LegalDocView.jsx` — multi-paragraph body, bullet lists, related links
- Wired `/data-deletion` in `LegalPage.jsx`, `AnimatedRoutes.jsx`, `atmosphericRoutes.js`

## Notes
- Legal copy uses **Ensemble Digilabs** (as provided), not “Digital Labs.”
- Section 1 states this policy does **not** apply to the corporate website; contact-form consent still links to `/privacy-policy`. A separate website privacy policy may be needed later.
- Terms of service page was left unchanged.

## Next steps
- Confirm Meta App Review URLs: privacy + data deletion
- Decide whether website visitor / form privacy needs a separate page

## Follow-up
- Centered privacy/legal hero summary text (removed sm:text-left) in LegalDocView.jsx.

- Centered legal hero title and tags (removed sm left-align) in LegalDocView.jsx.

## Follow-up — data deletion
- Added footer **Data Deletion** button linking to /data-deletion in CinematicFooter.jsx
- Replaced /data-deletion page copy with How to Request Data Deletion content in corePages.js

- Moved footer Support button to its own third row in CinematicFooter.jsx

- Narrowed legal page content (max-w-xl / xl:max-w-2xl) + extra lg horizontal padding so social rail labels clear the cards

- Narrowed legal page content (max-w-2xl + more side padding) so left social rail clears content cards
