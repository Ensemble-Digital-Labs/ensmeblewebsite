/** Default consent checkboxes — privacy pre-checked; SMS starts unticked (opt-in must be the visitor's choice). */
export const CONTACT_CONSENT_DEFAULTS = {
  privacyPolicy: true,
  smsConsent: false,
  newsletter: false,
}

/** @param {{ privacyPolicy: boolean }} consents */
export function validateContactConsents(consents) {
  if (!consents.privacyPolicy) {
    return 'You must agree to the privacy policy and terms of service to continue.'
  }
  return ''
}

/** @param {{ privacyPolicy: boolean, smsConsent: boolean, newsletter: boolean }} consents */
export function contactConsentsPayload(consents) {
  return {
    agreedToPrivacyPolicy: consents.privacyPolicy,
    // Same checkbox covers privacy policy + terms of service.
    agreedToTermsOfService: consents.privacyPolicy,
    smsConsent: consents.smsConsent,
    newsletterSubscribe: consents.newsletter,
  }
}
