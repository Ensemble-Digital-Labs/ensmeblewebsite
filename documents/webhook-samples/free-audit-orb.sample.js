import { consentSample, postSamplePayload, WEBHOOK_URL } from './webhook.constants.js'

/** Get-in-touch orb - Free audit */
export const sample = {
  formType: 'free-audit-orb',
  practiceName: 'Summit Spine & Joint',
  name: 'Dr. Sarah Lopez',
  email: 'slopez@summitspine.com',
  phone: '+1 (314) 555-0142',
  ...consentSample,
  source: 'ensemble-contact-orb-free-audit',
  submittedAt: '2026-06-17T12:20:00.000Z',
}

export async function postSample(url = WEBHOOK_URL) {
  return postSamplePayload(sample, url)
}
