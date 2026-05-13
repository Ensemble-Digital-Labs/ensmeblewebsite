import { page } from './buildPage.js'

/** @type {import('./buildPage.js').SitePageDoc[]} */
export const aiPages = [
  page(
    '/ai',
    'KEY PAGE · AI',
    'AI capabilities overview',
    'AI-powered patient targeting · HIPAA-safe AI stack · Predictive marketing for medical practices',
    [
      {
        body: 'Each playbook below covers how we deploy models, guardrails, and measurement so growth stays HIPAA-aware and attributable—built for medical practices, not generic agency add-ons.',
      },
    ],
    {
      tags: ['KEY PAGE', 'AI'],
      relatedLinks: [
        {
          to: '/ai/predictive-patient-targeting',
          title: 'Predictive patient targeting',
          description:
            'AI audience models · Behavioral signal analysis · Patient journey mapping at the moment of decision',
        },
        {
          to: '/ai/hipaa-compliance-monitoring',
          title: 'Automated HIPAA compliance monitoring',
          description:
            'Real-time AI scanning of pixels, forms, and ad events · PHI-safe by design · Zero blind spots',
        },
        {
          to: '/ai/chatbot-lead-capture',
          title: 'Chatbot lead capture & triage',
          description:
            '24/7 patient pre-qualification · Intake automation · HIPAA-safe conversation workflows',
        },
        {
          to: '/ai/campaign-optimization',
          title: 'Campaign optimization',
          description:
            'ML-powered A/B testing · Bid strategy automation · Continuous optimization toward booked appointments',
        },
        {
          to: '/ai/patient-nurture-automation',
          title: 'Patient nurture automation',
          description:
            'Behavior-triggered email & SMS · No-show re-engagement · Automated review requests · 24/7 funnel',
        },
      ],
    }
  ),
  page(
    '/ai/predictive-patient-targeting',
    'AI · Acquisition',
    'Predictive patient targeting',
    'AI audience models · Behavioral signal analysis · Patient journey mapping at the moment of decision',
    [
      {
        body: 'We prioritize who to reach, when, and with what message using compliant signals and high-intent healthcare search behavior—so media spend follows patients most likely to book, not broad demographic guesses.',
      },
    ],
    { tags: ['AI'] }
  ),
  page(
    '/ai/hipaa-compliance-monitoring',
    'AI · Compliance',
    'Automated HIPAA compliance monitoring',
    'Real-time AI scanning of pixels, forms, and ad events · PHI-safe by design · Zero blind spots',
    [
      {
        body: 'Monitoring pairs automated scans with clear remediation: what to pause, what to reconfigure, and how to document decisions for BAAs and audits—so marketing velocity does not outpace privacy controls.',
      },
    ],
    { tags: ['AI'] }
  ),
  page(
    '/ai/chatbot-lead-capture',
    'AI · Intake',
    'Chatbot lead capture & triage',
    '24/7 patient pre-qualification · Intake automation · HIPAA-safe conversation workflows',
    [
      {
        body: 'Workflows mirror how your practice schedules—after-hours coverage, specialty filters, and clean handoff to human staff with full context so serious inquiries never stall in a generic bot loop.',
      },
    ],
    { tags: ['AI'] }
  ),
  page(
    '/ai/campaign-optimization',
    'AI · Performance',
    'Campaign optimization',
    'ML-powered A/B testing · Bid strategy automation · Continuous optimization toward booked appointments',
    [
      {
        body: 'Optimization loops connect ad platforms to downstream outcomes so budgets migrate toward consults and procedures—not clicks—and reporting stays practice-legible for leadership and compliance.',
      },
    ],
    { tags: ['AI'] }
  ),
  page(
    '/ai/patient-nurture-automation',
    'AI · Lifecycle',
    'Patient nurture automation',
    'Behavior-triggered email & SMS · No-show re-engagement · Automated review requests · 24/7 funnel',
    [
      {
        body: 'Sequences respect consent, frequency caps, and clinical tone—engineered as an extension of your front office, not a noisy blast engine, with hooks into scheduling and CRM where you already operate.',
      },
    ],
    { tags: ['AI'] }
  ),
]
