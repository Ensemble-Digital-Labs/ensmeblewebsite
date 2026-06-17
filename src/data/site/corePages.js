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
    'Legal · Privacy',
    'Privacy policy',
    'How Ensemble Digital Labs handles data, marketing technology, and PHI-conscious workflows for healthcare clients.',
    [
      {
        title: 'Overview',
        body: 'Ensemble Digital Labs respects your privacy and the trust healthcare organizations place in us. This policy describes what we collect, how we use it, and the safeguards we apply when delivering marketing and technology services to medical practices.',
      },
      {
        title: 'Information we collect',
        body: 'We may collect contact details, practice information, website and campaign analytics, and communications you send through forms, email, or scheduled calls. For healthcare clients, we treat any information that could relate to patients or PHI according to contractual and HIPAA requirements.',
      },
      {
        title: 'How we use data',
        body: 'Data is used to deliver agreed services, improve campaigns, provide reporting, and respond to inquiries. We do not sell personal information. Marketing technology is configured to minimize exposure of sensitive health information in ads, forms, and analytics.',
      },
      {
        title: 'HIPAA & healthcare clients',
        body: 'Where Ensemble acts as a business associate or handles data subject to HIPAA, a Business Associate Agreement (BAA) governs permitted uses, safeguards, and breach notification. Production legal copy should be reviewed and approved by counsel before launch.',
      },
      {
        title: 'Cookies & analytics',
        body: 'Our site and client properties may use cookies, pixels, and similar tools for performance measurement and conversion tracking. Healthcare implementations should follow consent, tagging, and documentation practices aligned with your privacy program.',
      },
      {
        title: 'Your rights & contact',
        body: 'You may request access, correction, or deletion of personal data we hold, subject to legal and contractual limits. Questions about this policy: contact us through the form at /contact or your Ensemble account representative.',
      },
    ],
    { noIndex: true, tags: ['Legal', 'Privacy'] }
  ),
  page(
    '/terms',
    'Legal · Terms',
    'Terms of service',
    'Service agreement framework including HIPAA BAA expectations for healthcare marketing and technology delivery.',
    [
      {
        title: 'Agreement',
        body: 'These terms govern use of Ensemble Digital Labs websites and the marketing, creative, and technology services we provide to clients. By engaging our services or using our site, you agree to this framework pending execution of a formal statement of work or master agreement.',
      },
      {
        title: 'Scope of services',
        body: 'Deliverables may include strategy, design, development, SEO, paid media, reputation programs, and AI-enabled workflows as defined in each proposal or SOW. Timelines, milestones, and acceptance criteria are specified in project documentation.',
      },
      {
        title: 'Client responsibilities',
        body: 'Clients provide timely feedback, accurate practice information, required access to platforms, and compliance approvals. You represent that materials supplied do not infringe third-party rights and that use of patient stories or imagery complies with applicable law and consent requirements.',
      },
      {
        title: 'HIPAA & BAAs',
        body: 'Healthcare clients requiring HIPAA-compliant handling of PHI must execute a BAA before Ensemble processes protected information on their behalf. Marketing and analytics configurations must align with that agreement and your internal policies.',
      },
      {
        title: 'Fees, payment & changes',
        body: 'Fees, billing cadence, and payment terms are set in each SOW or invoice. Scope changes require written approval. Either party may terminate according to contract terms; outstanding fees and transition assistance are handled as specified in the signed agreement.',
      },
      {
        title: 'Limitation of liability',
        body: 'Services are provided professionally and in good faith. Liability caps, indemnities, and dispute resolution should be defined in counsel-approved master terms. This page is a structural placeholder until final legal language is published.',
      },
    ],
    { noIndex: true, tags: ['Legal', 'Terms'] }
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
