import { page } from './buildPage.js'

/** @type {import('./buildPage.js').SitePageDoc[]} */
export const corePages = [
  page(
    '/privacy-policy',
    'Legal · Privacy',
    'Privacy Policy',
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
      {
        title: 'Meta integrations',
        body: 'When we manage Facebook Pages, Instagram professional accounts, or Meta ad accounts for clients, additional Meta-specific collection and deletion rules apply. See the related Meta Privacy Policy and Meta Data Deletion pages below.',
      },
    ],
    { noIndex: true, tags: ['Legal', 'Privacy'], relatedLinks: [
      {
        to: '/privacy-policy/meta',
        title: 'Meta Privacy Policy',
        description: 'Facebook, Instagram, and ads data we access for clients through Meta’s APIs.',
      },
      {
        to: '/privacy-policy/meta-data-deletion',
        title: 'Meta — Data Deletion',
        description: 'Request deletion of lead, message, or comment data from Meta integrations.',
      },
    ] }
  ),
  page(
    '/privacy-policy/meta',
    'Privacy Policy · Meta',
    'Meta Privacy Policy',
    'Effective date: July 20, 2026. How Ensemble Digilabs collects, uses, stores, and deletes data accessed through Meta’s APIs on behalf of client businesses.',
    [
      {
        body: 'Ensemble Digilabs ("we," "us," "our") is a marketing agency that manages Facebook Pages, Instagram professional accounts, and ad accounts on behalf of client businesses ("Clients"). This policy explains what data our systems collect through Meta\'s APIs (Graph API, Marketing API, Messenger Platform), how we use it, and how it can be deleted.',
      },
      {
        title: '1. Who this applies to',
        body: 'This policy covers:',
        items: [
          "People who submit a Lead Ad form on a Client's Facebook Page or ad campaign.",
          "People who comment on, react to, or message a Client's Facebook Page or Instagram account.",
          'Client businesses whose Pages, Instagram accounts, and ad accounts we manage.',
        ],
        afterItems: 'It does not apply to our own corporate website or unrelated services.',
      },
      {
        title: '2. Data we collect',
        body: "Through Meta's APIs, and only for Pages, Instagram accounts, and ad accounts our Clients have explicitly granted us access to via Meta Business Manager, we collect:",
        items: [
          "Lead form submissions: name, email address, phone number, and any other fields a Client's lead form asks for, retrieved after someone submits a Lead Ad.",
          'Page and post content: post text, publish times, permalink URLs, comment text, commenter display names, and aggregate reaction/engagement counts.',
          "Messenger conversations: message text and sender identifiers (Page-Scoped IDs) for people who message a Client's Page, so Client staff can view and reply to inquiries.",
          "Advertising and Page performance metrics: spend, impressions, clicks, reach, and similar aggregate statistics tied to a Client's ad account or Page — this data is about ad/content performance, not individual people.",
        ],
        afterItems:
          "We do not collect data from personal Facebook profiles, Groups, or any source outside what a Client's Page, Instagram account, or ad account exposes through the API.",
      },
      {
        title: '3. How we use this data',
        items: [
          'To deliver the marketing services a Client has engaged us for: lead follow-up, content publishing, community management (comments), customer messaging, and performance reporting.',
          "Lead and message data is used solely to help the relevant Client respond to that person's inquiry — never for unrelated marketing, resale, or third-party advertising.",
          "Aggregate performance data is used to build reporting dashboards and optimize the Client's campaigns and content.",
          'We do not sell personal data, and we do not share it with anyone other than the Client whose Page, ad account, or Instagram account the data came from.',
        ],
      },
      {
        title: '4. Where data is stored',
        body: 'Data is stored in our workflow automation platform (n8n), in structured tables scoped to this integration, hosted on infrastructure we control. Access is restricted to authorized Ensemble Digilabs staff working on the relevant Client account.',
      },
      {
        title: '5. Retention',
        body: "We retain lead, comment, and message data for as long as reasonably needed to support the Client's use case, or until a deletion request is received (see Section 6), whichever comes first. Aggregate performance metrics may be retained longer for historical reporting, consistent with Meta's own data retention limits for insights data.",
      },
      {
        title: '6. Your rights and how to request deletion',
        body: 'If you submitted a lead form, sent a message, or commented on a Page we manage and want your data deleted, email support@ensembledigilabs.com with:',
        items: [
          'The Page or ad campaign you interacted with (if known).',
          'The name, email, or phone number you used, so we can locate your record.',
        ],
        afterItems:
          'We will locate and delete matching records from our systems within 30 days and confirm by email once complete. See our Meta — Data Deletion page for details.',
      },
      {
        title: '7. Security',
        body: 'We restrict access to Meta API credentials and stored data to staff who need it for Client service delivery, and we use long-lived, scoped access tokens rather than sharing login credentials.',
      },
      {
        title: '8. Changes to this policy',
        body: "We may update this policy as our services or Meta's platform requirements change. The effective date above reflects the most recent update.",
      },
      {
        title: '9. Contact',
        body: 'Questions about this policy or your data: support@ensembledigilabs.com.',
      },
    ],
    {
      noIndex: true,
      tags: ['Legal', 'Meta', 'Privacy'],
      relatedLinks: [
        {
          to: '/privacy-policy/meta-data-deletion',
          title: 'Meta — Data Deletion',
          description: 'How to request deletion of lead, message, or comment data stored from Meta integrations.',
        },
      ],
    }
  ),
  page(
    '/privacy-policy/meta-data-deletion',
    'Privacy Policy · Meta',
    'Meta — Data Deletion',
    'If you submitted a lead form, sent a Messenger message, or commented on a Facebook Page or Instagram account managed by Ensemble Digilabs, you can ask us to delete your data at any time.',
    [
      {
        title: 'How to request deletion',
        body: 'Email support@ensembledigilabs.com with the subject line "Data Deletion Request" and include:',
        items: [
          'The name of the Facebook Page, Instagram account, or ad campaign you interacted with (if you know it).',
          'The name, email address, or phone number you used when you submitted a form, sent a message, or commented — this helps us find your record.',
        ],
      },
      {
        title: 'What happens next',
        items: [
          'We locate any matching lead, comment, or message records in our systems.',
          'We delete those records.',
          'We confirm by email once the deletion is complete.',
        ],
        afterItems: 'This process is typically completed within 30 days of receiving your request.',
      },
      {
        title: 'What gets deleted',
        items: [
          'Lead form submissions (name, email, phone, and other submitted fields) tied to your request.',
          'Comments and messages you sent, along with associated identifiers.',
        ],
        afterItems:
          'Aggregate, de-identified performance statistics (e.g., total ad clicks or impressions) are not tied to an individual and are not affected by an individual deletion request.',
      },
      {
        title: 'Questions',
        body: 'Contact support@ensembledigilabs.com with any questions about this process or our Meta Privacy Policy.',
      },
    ],
    {
      noIndex: true,
      tags: ['Legal', 'Meta', 'Data deletion'],
      relatedLinks: [
        {
          to: '/privacy-policy/meta',
          title: 'Meta Privacy Policy',
          description: 'Full policy covering Meta API data collection, use, retention, and security.',
        },
      ],
    }
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
