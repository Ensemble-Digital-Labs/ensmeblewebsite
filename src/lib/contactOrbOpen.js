/** Custom event to open the floating contact orb (optionally straight to a form panel). */
export const ENSEMBLE_CONTACT_ORB_OPEN = 'ensemble:contact-orb-open'

/**
 * @param {'audit'|'consult'|'contact'|null} [form]
 */
export function openContactOrb(form = null) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent(ENSEMBLE_CONTACT_ORB_OPEN, {
      detail: { form },
    }),
  )
}
