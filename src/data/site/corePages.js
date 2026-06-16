import { page } from './buildPage.js'

/** @type {import('./buildPage.js').SitePageDoc[]} */
export const corePages = [
  page(
    '/free-practice-audit',
    'Start in 14 days',
    'Free AI practice audit',
    'AI visibility scan, reputation check, competitor intel, and ROI forecast, built for healthcare practices that want measurable growth without guesswork.',
    [
      {
        body: 'We review how patients find you today, where spend is leaking, and what HIPAA-safe automation can do next. You leave with a prioritized roadmap aligned to revenue and compliance.',
      },
      {
        title: 'What we review',
        body: 'Local presence, paid and organic acquisition signals, website trust and conversion paths, review velocity, and AI-ready infrastructure, framed for your specialty and market.',
      },
    ]
  ),
  page(
    '/privacy-policy',
    'Legal',
    'Privacy policy',
    'How Ensemble Digital Labs handles data, marketing technology, and PHI-conscious workflows for healthcare clients.',
    [
      {
        body: 'This page is a structural placeholder for production legal copy. Replace with counsel-approved HIPAA, data processing, and marketing disclosures before launch.',
      },
    ],
    { noIndex: true }
  ),
  page(
    '/terms',
    'Legal',
    'Terms of service',
    'Service agreement framework including HIPAA BAA expectations for healthcare marketing and technology delivery.',
    [
      {
        body: 'Placeholder terms content. Final terms should reference scope of services, SLAs, acceptable use, indemnities, and BAA obligations for covered entities.',
      },
    ],
    { noIndex: true }
  ),
  page(
    '/thank-you',
    'Submission received',
    'Thank you',
    'Your message is in. Our team routes healthcare inquiries quickly, expect a thoughtful follow-up.',
    [
      {
        body: 'If this was a practice audit request, we will confirm intake details and schedule next steps. For urgent matters, reply to the confirmation email or call your Ensemble contact.',
      },
    ],
    { noIndex: true }
  ),
]
