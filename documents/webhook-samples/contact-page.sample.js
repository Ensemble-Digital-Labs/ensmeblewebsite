import { consentSample, postSamplePayload, WEBHOOK_URL } from './webhook.constants.js'

/** `/contact` — full contact page form */
export const sample = {
  formType: 'contact-page',
  name: 'Dr. Jane Smith',
  email: 'jane@riversideclinic.com',
  company: 'Riverside Pain Center',
  painPoints: ['digital-visibility', 'reputation'],
  painPointDetails: [
    {
      id: 'digital-visibility',
      category: 'Digital visibility',
      label: "You're not showing up when patients search for you.",
    },
    {
      id: 'reputation',
      category: 'Reputation',
      label: 'One bad review is hurting your whole practice.',
    },
  ],
  message: 'We need help with local SEO and review management for our pain practice.',
  ...consentSample,
  source: 'ensemble-contact-page',
  submittedAt: '2026-06-17T12:00:00.000Z',
}

export async function postSample(url = WEBHOOK_URL) {
  return postSamplePayload(sample, url)
}
