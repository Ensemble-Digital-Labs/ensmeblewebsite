import { consentSample, postSamplePayload, WEBHOOK_URL } from './webhook.constants.js'

/** Homepage — “No cost. No commitment.” CTA band */
export const sample = {
  formType: 'home-cta',
  specialty: 'Pain management',
  budget: '$8,000 / month',
  referral: 'Google search',
  ...consentSample,
  source: 'ensemble-home-cta',
  submittedAt: '2026-06-17T12:05:00.000Z',
}

export async function postSample(url = WEBHOOK_URL) {
  return postSamplePayload(sample, url)
}
