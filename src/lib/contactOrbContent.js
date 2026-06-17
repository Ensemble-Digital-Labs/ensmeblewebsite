/** Copy for the contact orb “Free Practice Audit” panel. */
export const ORB_FREE_AUDIT = {
  menuLabel: 'Free audit',
  title: 'Free Practice Audit',
  description:
    "We'll review your digital presence, HIPAA compliance posture, IT infrastructure, and marketing performance — and tell you exactly where you stand.",
  fields: [
    { name: 'practiceName', label: 'Practice name', placeholder: 'Your practice name', type: 'text', required: true },
    { name: 'name', label: 'Your name', placeholder: 'Dr. Smith', type: 'text', required: true },
    { name: 'email', label: 'Email address', placeholder: 'you@practice.com', type: 'email', required: true },
  ],
  submitLabel: 'Claim your free audit',
  footnote: 'Takes 30 seconds. Results delivered within 24 hours.',
  successMessage: 'Audit claimed — your review will arrive within 24 hours.',
}
