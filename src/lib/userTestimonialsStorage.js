export const USER_TESTIMONIALS_STORAGE_KEY = 'ensemble_user_testimonials'

export function getStoredUserTestimonials() {
  try {
    const raw = localStorage.getItem(USER_TESTIMONIALS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function persistUserTestimonials(list) {
  localStorage.setItem(USER_TESTIMONIALS_STORAGE_KEY, JSON.stringify(list))
}
