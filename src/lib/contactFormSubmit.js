/** n8n contact form webhook — override with `VITE_CONTACT_FORM_WEBHOOK_URL` in `.env`. */
export const CONTACT_FORM_WEBHOOK_URL =
  import.meta.env.VITE_CONTACT_FORM_WEBHOOK_URL ??
  'https://n8n-automation.techsoit.com/webhook/contactForm'

/**
 * POST contact payload to n8n.
 * @param {Record<string, unknown>} payload
 */
export async function submitContactForm(payload) {
  const response = await fetch(CONTACT_FORM_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Contact form webhook failed (${response.status})`)
  }

  const contentType = response.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    return response.json()
  }

  return { ok: true }
}
