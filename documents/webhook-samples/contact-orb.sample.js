import { consentSample, postSamplePayload, WEBHOOK_URL } from './webhook.constants.js'

/** Get-in-touch orb - Contact us */
export const sample = {
  formType: 'contact-orb',
  name: 'Dr. Michael Chen',
  email: 'mchen@wellnessmedspa.com',
  phone: '+1 (314) 555-0198',
  message: 'Interested in performance marketing and a new website for our med spa.',
  ...consentSample,
  source: 'ensemble-contact-orb-contact',
  submittedAt: '2026-06-17T12:15:00.000Z',
}

export async function postSample(url = WEBHOOK_URL) {
  return postSamplePayload(sample, url)
}
