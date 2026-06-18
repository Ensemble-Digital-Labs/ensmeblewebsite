/** Trim phone for webhook payload (empty string when omitted). */
export function phonePayloadValue(phone) {
  return String(phone ?? '').trim()
}

/** @returns {string} Error message or empty string when valid / blank. */
export function getPhoneValidationError(phone) {
  const trimmed = phonePayloadValue(phone)
  if (!trimmed) return ''
  if (trimmed.replace(/\D/g, '').length < 10) {
    return 'Please enter a valid phone number'
  }
  return ''
}
