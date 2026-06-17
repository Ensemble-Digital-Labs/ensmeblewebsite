# Session log – 2026-06-17 (Contact form n8n webhook)

## Summary
Wired the /contact page form to the n8n webhook for live submissions.

## Changes
- **`src/lib/contactFormSubmit.js`** — POST helper; default URL `https://n8n-automation.techsoit.com/webhook/contactForm`.
- **`src/pages/Contact.jsx`** — Real submit with loading, success, and error states.
- **`.env.example`** — Optional `VITE_CONTACT_FORM_WEBHOOK_URL` override.

## Payload fields
name, email, company, painPoints, painPointDetails, message, source, submittedAt
