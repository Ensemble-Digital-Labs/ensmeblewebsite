/** Production n8n webhook — override with `VITE_CONTACT_FORM_WEBHOOK_URL` in `.env`. */
export const CONTACT_FORM_WEBHOOK_URL =
  import.meta.env.VITE_CONTACT_FORM_WEBHOOK_URL ??
  'https://n8n-automation.techsoit.com/webhook/contactForm'

/**
 * In local Vite, POST same-origin `/api/contact-form` (proxied) so the browser
 * does not fail on n8n CORS while the workflow still receives the payload.
 * Production builds keep calling the webhook URL directly.
 */
export function getContactFormSubmitUrl() {
  if (import.meta.env.VITE_CONTACT_FORM_WEBHOOK_URL) {
    return import.meta.env.VITE_CONTACT_FORM_WEBHOOK_URL
  }
  if (import.meta.env.DEV) {
    return '/api/contact-form'
  }
  return CONTACT_FORM_WEBHOOK_URL
}

/**
 * All forms POST JSON to the same webhook. `formType` + `source` identify the entry point.
 *
 * | formType         | source                          | Fields |
 * |------------------|---------------------------------|--------|
 * | contact-page     | ensemble-contact-page           | name, email, company, phone?, painPoints, message, consents |
 * | home-cta         | ensemble-home-cta               | specialty, budget, phone?, referral, consents |
 * | growth-consult   | ensemble-contact-orb-consult    | specialty, budget, phone?, referral, consents |
 * | contact-orb      | ensemble-contact-orb-contact    | name, email, phone?, message, consents |
 * | free-audit-orb   | ensemble-contact-orb-free-audit | practiceName, name, email, phone?, consents |
 *
 * `phone` is optional; omitted or empty string when not provided.
 * Samples: `documents/contact-form-webhook-samples.json`
 */

/**
 * POST contact payload to n8n.
 * n8n often receives/stores the payload even when the HTTP response is empty or
 * non-JSON — treat any 2xx as success so the UI matches what shows in n8n.
 * @param {Record<string, unknown>} payload
 */
export async function submitContactForm(payload) {
  let response
  try {
    response = await fetch(getContactFormSubmitUrl(), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'Network error'
    throw new Error(
      `Could not reach the form service (${reason}). If this is local, restart the Vite dev server so the contact-form proxy is active.`,
    )
  }

  if (!response.ok) {
    // Best-effort read for debugging; ignore body parse failures.
    let detail = ''
    try {
      detail = (await response.text()).slice(0, 200)
    } catch {
      /* ignore */
    }
    throw new Error(
      detail
        ? `Contact form webhook failed (${response.status}): ${detail}`
        : `Contact form webhook failed (${response.status})`,
    )
  }

  // 2xx = delivered to n8n. Don't fail the UI if the response body is empty/non-JSON.
  try {
    const contentType = response.headers.get('content-type') ?? ''
    if (contentType.includes('application/json')) {
      const text = await response.text()
      if (!text.trim()) return { ok: true }
      return JSON.parse(text)
    }
  } catch {
    /* n8n accepted the request; response shape is optional */
  }

  return { ok: true }
}
