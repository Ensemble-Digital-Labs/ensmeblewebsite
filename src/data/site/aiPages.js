import { page } from './buildPage.js'

/** @type {import('./buildPage.js').SitePageDoc[]} */
export const aiPages = [
  page(
    '/ai',
    'AI capabilities',
    'AI capabilities overview',
    'AI-powered patient targeting, HIPAA-safe AI stack, and predictive marketing engineered for medical practices — not generic agency bolt-ons.',
    [
      {
        body: 'Each capability below links to a deeper playbook: how we deploy models, guardrails, and measurement so growth stays compliant and attributable.',
      },
    ],
    { tags: ['AI', 'KEY PAGE'] }
  ),
  page(
    '/ai/predictive-patient-targeting',
    'AI · Acquisition',
    'Predictive patient targeting',
    'AI audience models, behavioral signal analysis, and patient journey mapping at the moment of decision — tuned for high-intent healthcare searches.',
    [
      {
        body: 'We combine first-party practice signals with compliant data practices to prioritize who to reach, when, and with what message — reducing wasted spend and protecting patient trust.',
      },
    ],
    { tags: ['AI'] }
  ),
  page(
    '/ai/hipaa-compliance-monitoring',
    'AI · Compliance',
    'Automated HIPAA compliance monitoring',
    'Real-time scanning of pixels, forms, and ad events with PHI-safe-by-design defaults — fewer blind spots between marketing and compliance.',
    [
      {
        body: 'Monitoring is paired with remediation guidance: what to pause, what to reconfigure, and how to document decisions for BAAs and audits.',
      },
    ],
    { tags: ['AI'] }
  ),
  page(
    '/ai/chatbot-lead-capture',
    'AI · Intake',
    'AI chatbot lead capture & triage',
    '24/7 patient pre-qualification, intake automation, and HIPAA-safe conversation workflows that route serious inquiries to your team.',
    [
      {
        body: 'Workflows mirror how your practice actually schedules — including after-hours coverage, specialty filters, and handoff to human staff without dropping context.',
      },
    ],
    { tags: ['AI'] }
  ),
  page(
    '/ai/campaign-optimization',
    'AI · Performance',
    'AI-driven campaign optimization',
    'ML-assisted testing, bid strategy automation, and continuous optimization toward booked appointments — not vanity clicks.',
    [
      {
        body: 'Optimization loops connect ad platforms to downstream outcomes so budgets follow what produces consults and procedures.',
      },
    ],
    { tags: ['AI'] }
  ),
  page(
    '/ai/patient-nurture-automation',
    'AI · Lifecycle',
    'Intelligent patient nurture automation',
    'Behavior-triggered email and SMS, no-show re-engagement, automated review requests, and always-on funnel hygiene.',
    [
      {
        body: 'Sequences respect frequency caps, clinical tone, and consent — engineered as an extension of your front office, not a noisy blast engine.',
      },
    ],
    { tags: ['AI'] }
  ),
]
