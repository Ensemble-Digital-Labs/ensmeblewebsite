import { cn } from '../../lib/utils'
import { usePrivacyPolicyNavigation } from '../../hooks/usePrivacyPolicyNavigation'

/**
 * Shared privacy / SMS / newsletter consent block for all contact forms.
 * @param {{ value: { privacyPolicy: boolean, smsConsent: boolean, newsletter: boolean }, onChange: (next: object) => void, error?: string, variant?: 'dark' | 'orb' | 'home', className?: string, onPrivacyPolicyClick?: () => void }} props
 */
export default function ContactFormConsents({
  value,
  onChange,
  error,
  variant = 'dark',
  className,
  onPrivacyPolicyClick,
  ...rest
}) {
  const navigateToPrivacyPolicy = usePrivacyPolicyNavigation()
  const privacyPolicyClick = onPrivacyPolicyClick ?? navigateToPrivacyPolicy
  const toggle = (key) => (event) => {
    onChange({ ...value, [key]: event.target.checked })
  }

  const labelClass = cn(
    'contact-form-consents__label',
    variant === 'orb' && 'contact-form-consents__label--orb',
    variant === 'home' && 'contact-form-consents__label--home',
    variant === 'dark' && 'contact-form-consents__label--dark',
  )

  const handlePrivacyClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    privacyPolicyClick()
  }

  const privacyLinkClass = 'contact-form-consents__link'

  return (
    <fieldset className={cn('contact-form-consents', className)} {...rest}>
      <legend className="sr-only">Consent preferences</legend>

      <label className={labelClass}>
        <input
          type="checkbox"
          name="privacyPolicy"
          checked={value.privacyPolicy}
          onChange={toggle('privacyPolicy')}
          className="contact-form-consents__checkbox"
        />
        <span>
          I agree to the{' '}
          <a href="/privacy-policy" className={privacyLinkClass} onClick={handlePrivacyClick}>
            privacy policy
          </a>{' '}
          and authorize Ensemble Digital Labs to contact me regarding my inquiry.
        </span>
      </label>

      <label className={labelClass}>
        <input
          type="checkbox"
          name="smsConsent"
          checked={value.smsConsent}
          onChange={toggle('smsConsent')}
          className="contact-form-consents__checkbox"
        />
        <span>
          I consent to receive SMS messages from Ensemble Digital Labs for appointment
          confirmations, reminders, and other healthcare-related information.
        </span>
      </label>

      <label className={labelClass}>
        <input
          type="checkbox"
          name="newsletter"
          checked={value.newsletter}
          onChange={toggle('newsletter')}
          className="contact-form-consents__checkbox"
        />
        <span>Subscribe to newsletter.</span>
      </label>

      {error ? (
        <p className="contact-form-consents__error" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  )
}
