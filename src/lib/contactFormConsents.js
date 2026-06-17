/** Default consent checkboxes — privacy + SMS pre-checked per site pattern. */
export const CONTACT_CONSENT_DEFAULTS = {
  privacyPolicy: true,
  smsConsent: true,
  newsletter: false,
}

/** @param {{ privacyPolicy: boolean }} consents */
export function validateContactConsents(consents) {
  if (!consents.privacyPolicy) {
    return 'You must agree to the privacy policy to continue.'
  }
  return ''
}

/** @param {{ privacyPolicy: boolean, smsConsent: boolean, newsletter: boolean }} consents */
export function contactConsentsPayload(consents) {
  return {
    agreedToPrivacyPolicy: consents.privacyPolicy,
    smsConsent: consents.smsConsent,
    newsletterSubscribe: consents.newsletter,
  }
}
