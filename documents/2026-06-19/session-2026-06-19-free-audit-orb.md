# Session log – 2026-06-19 (free audit orb)

## Summary
Removed the unused /free-practice-audit page and wired all "Get your free audit" hero CTAs to open the contact orb directly on the free audit form panel.

## Changes
- Updated Hero.jsx, HeroScrollExpand.jsx — primary CTA uses ContactOrbCtaButton when contactOrbForm: 'audit'
- Updated DnaCapitalClonePage.jsx — InfluxPrimaryButton passes contactOrbForm
- Updated FILE_TREE.md — removed /free-practice-audit route references
- (Prior in session) Removed route from AnimatedRoutes.jsx, nav/footer links, corePages.js; added contactOrbOpen.js, ContactOrbCtaButton.jsx, orb listener in PopArtContactOrb.jsx

## Notes
- Hero primary CTA opens orb → audit form (skips orb menu)
- Old URL /free-practice-audit now 404s (no redirect added)
- Production build passes

## Next steps
- Manually verify orb opens on home hero click at mobile + desktop widths

## Hero CTA typography fix
- Updated #home-hero pill text rule in index.css to include utton.home-hero-cta-pill (audit CTA opens orb via button, not link)

## Site-wide CTA script typography
- Updated ensemble-editorial-type.css — all [data-ensemble-cta] / gradient pills use Dancing Script (matches hero)
- Simplified hero pill override in index.css (size only)
- Updated growthCtaClasses.js, Button.jsx, FormButton.jsx to drop Fraunces on CTAs

## Default page title separator
- index.html — replaced em dash with middle dot in default <title> (matches other pages)

## GoDaddy production zip
- Ran 
pm run deploy:godaddy — fresh build + deploy/ensembledigilabs.com-godaddy-production.zip (~1002 MB)
- Includes production dist/ contents + .htaccess for SPA routing
