/** n8n contact form webhook — same default as `src/lib/contactFormSubmit.js`. */
export const WEBHOOK_URL =
  'https://n8n-automation.techsoit.com/webhook/contactForm'

/** Shared consent fields sent with every form. */
export const consentSample = {
  agreedToPrivacyPolicy: true,
  smsConsent: true,
  newsletterSubscribe: false,
}

export async function postSamplePayload(payload, url = WEBHOOK_URL) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Webhook failed (${response.status})`)
  }

  const contentType = response.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    return response.json()
  }

  return { ok: true }
}
