import { WEBHOOK_URL, consentSample, postSamplePayload } from './webhook.constants.js'
import { sample as contactPageSample, postSample as postContactPageSample } from './contact-page.sample.js'
import { sample as homeCtaSample, postSample as postHomeCtaSample } from './home-cta.sample.js'
import { sample as growthConsultOrbSample, postSample as postGrowthConsultOrbSample } from './growth-consult-orb.sample.js'
import { sample as contactOrbSample, postSample as postContactOrbSample } from './contact-orb.sample.js'
import { sample as freeAuditOrbSample, postSample as postFreeAuditOrbSample } from './free-audit-orb.sample.js'

export {
  WEBHOOK_URL,
  consentSample,
  postSamplePayload,
  contactPageSample,
  postContactPageSample,
  homeCtaSample,
  postHomeCtaSample,
  growthConsultOrbSample,
  postGrowthConsultOrbSample,
  contactOrbSample,
  postContactOrbSample,
  freeAuditOrbSample,
  postFreeAuditOrbSample,
}

export const allSamples = {
  'contact-page': contactPageSample,
  'home-cta': homeCtaSample,
  'growth-consult': growthConsultOrbSample,
  'contact-orb': contactOrbSample,
  'free-audit-orb': freeAuditOrbSample,
}

/** POST every sample to the webhook (n8n workflow testing). */
export async function postAllSamples(url = WEBHOOK_URL) {
  return {
    'contact-page': await postContactPageSample(url),
    'home-cta': await postHomeCtaSample(url),
    'growth-consult': await postGrowthConsultOrbSample(url),
    'contact-orb': await postContactOrbSample(url),
    'free-audit-orb': await postFreeAuditOrbSample(url),
  }
}
