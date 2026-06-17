# Session log – 2026-06-17 (case study gallery removal)

## Summary
Removed the Project gallery section from all individual case study detail pages.

## Changes
- Edited CaseStudyDetailView.jsx — removed galleryImages logic and Visual proof / Project gallery section
- Edited index.css — removed unused case-study-detail__gallery-grid rule

## Update — CTA band removed
- Removed Ready for similar outcomes CTA section from CaseStudyDetailView.jsx
- Added extra bottom padding on metrics section as page ending

## Update — hero logo overlay removed
- Removed client logo badge from inside case study hero image frame

## Update — metrics eyebrow removed
- Removed Outcomes eyebrow label above Key metrics heading

## Update — Ensemble Methodology card removed
- Removed how-we-measure-ai-marketing-roi from healthcareCaseStudies.js
- Cleaned caseStudyCardThemes.js and FullscreenNav exclusion

## Update — iPad nav ghost clicks fix
- Disabled pointer-events on closed #fullscreen-nav and all descendants
- Block touches immediately when closing; added inert + aria-hidden when closed

## Update — home Our Work hero tile
- Re-enabled Explore this CTA and case study link on largest masonry tile at lg+

## Update — AI playbook hologram cards
- AiPlaybookDetails uses ServiceVerticalCard-style gradient shell, glass body, ambient image, hover shimmer

## Update — AI playbook card backgrounds
- Playbook + grid cards now share per-capability image from aiPages relatedLinks (not generic services fallback)

## Update — remove door curtain images
- ParallaxLayerShowcase pillars back to glass reveal (no imageOutside)
- AI card backgrounds use parallax-inside art instead of parallax-curtain
