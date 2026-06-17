import { consentSample, postSamplePayload, WEBHOOK_URL } from './webhook.constants.js'

/** Get-in-touch orb — Growth consult */
export const sample = {
  formType: 'growth-consult',
  specialty: 'Orthopedic surgery',
  budget: '$12,000 / month',
  referral: 'Referral from colleague',
  ...consentSample,
  source: 'ensemble-contact-orb-consult',
  submittedAt: '2026-06-17T12:10:00.000Z',
}

export async function postSample(url = WEBHOOK_URL) {
  return postSamplePayload(sample, url)
}
