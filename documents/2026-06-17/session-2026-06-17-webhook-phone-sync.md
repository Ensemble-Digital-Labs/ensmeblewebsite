# Session log – 2026-06-17 (webhook + phone sync)

## Summary
Finished syncing optional phone field across all five contact webhook forms and updated webhook sample docs. Fixed missing `submitContactForm` import on Contact page. Build passes.

## Changes
- **Created** `src/lib/contactFormPhone.js` — shared trim + validation helpers
- **Updated** `src/pages/Contact.jsx` — phone field, validation, webhook payload; restored submit import
- **Updated** `src/components/home/chapters/HomeChapterCta.jsx` — phone field + payload
- **Updated** `src/components/contact-orb/PopArtContactOrb.jsx` — phone on consult, contact, audit forms
- **Updated** `src/lib/contactOrbContent.js` — phone on free-audit field list
- **Updated** `src/lib/contactFormSubmit.js` — field matrix doc comment
- **Updated** `src/lib/content.js` — support email `support@ensembledigilabs.com`
- **Updated** `documents/contact-form-webhook-samples.json` — phone on all samples
- **Updated** `documents/webhook-samples/*.sample.js` — phone on all five samples

## Notes
- `phone` is optional everywhere; sent as trimmed string or empty when blank
- Validation: minimum 10 digits when user enters a value
- All forms still POST to `https://n8n-automation.techsoit.com/webhook/contactForm`

## Next steps
- Commit and push to both remotes if requested
- Verify n8n workflow maps new `phone` field for each formType

## GoDaddy production zip (regenerated)
- **File:** `deploy/ensembledigilabs.com-godaddy-production.zip` (~169.60 MB)
- **Includes:** latest build with phone fields, webhook payloads, email fix, mobile perf fixes
- **Upload:** extract contents into `public_html/ensembledigilabs.com` on GoDaddy
