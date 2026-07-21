import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X, ArrowLeft } from 'lucide-react'
import { prefersReducedMotion } from '../../lib/utils'
import { submitContactForm } from '../../lib/contactFormSubmit'
import { getPhoneValidationError, phonePayloadValue } from '../../lib/contactFormPhone'
import {
  CONTACT_CONSENT_DEFAULTS,
  contactConsentsPayload,
  validateContactConsents,
} from '../../lib/contactFormConsents'
import ContactFormConsents from '../ui/ContactFormConsents'
import { usePrivacyPolicyNavigation } from '../../hooks/usePrivacyPolicyNavigation'
import {
  OrbAnimatedHand,
  OrbAnimatedMail,
  OrbAnimatedPen,
} from './ContactOrbAnimatedIcons'
import ContactOrbCursorMorph from './ContactOrbCursorMorph'
import { ORB_FREE_AUDIT } from '../../lib/contactOrbContent'
import { ENSEMBLE_CONTACT_ORB_OPEN } from '../../lib/contactOrbOpen'

const ICON_CYCLE = [
  { id: 'hand', Component: OrbAnimatedHand, label: 'Say hello' },
  { id: 'pen', Component: OrbAnimatedPen, label: 'Start a brief' },
  { id: 'mail', Component: OrbAnimatedMail, label: 'Send a message' },
]

const ICON_DISPLAY_SEC = 2.4

const MENU_ACTIONS = [
  { id: 'consult', label: 'Growth consult' },
  { id: 'contact', label: 'Contact us' },
  { id: 'audit', label: ORB_FREE_AUDIT.menuLabel },
]

const CONSULT_FIELDS = [
  { name: 'specialty', label: 'Practice specialty', placeholder: 'Pain management, surgery, med spa…', type: 'text' },
  { name: 'budget', label: 'Monthly marketing budget', placeholder: 'Approximate monthly spend', type: 'text' },
  { name: 'phone', label: 'Phone number', placeholder: '+1 (555) 123-4567', type: 'tel' },
  { name: 'referral', label: 'How did you hear about us?', placeholder: 'Referral, Google, event…', type: 'text' },
]

const CLOSE_SIZE_PX = 44

function originPercent(cx, cy) {
  const w = window.innerWidth || 1
  const h = window.innerHeight || 1
  return {
    x: (cx / w) * 100,
    y: (cy / h) * 100,
  }
}

function clipCircleAt(x, y, radiusPercent) {
  return `circle(${radiusPercent}% at ${x}% ${y}%)`
}

function closeCornerPosition() {
  const pad = Math.max(16, Math.min(28, window.innerWidth * 0.028))
  return {
    left: window.innerWidth - pad - CLOSE_SIZE_PX,
    top: pad,
  }
}

function setBackdropOrigin(backdrop, origin) {
  if (!backdrop || !origin) return
  backdrop.style.setProperty('--orb-origin-x', `${origin.x}%`)
  backdrop.style.setProperty('--orb-origin-y', `${origin.y}%`)
}

function triggerCenter(rect) {
  return {
    cx: rect.left + rect.width / 2,
    cy: rect.top + rect.height / 2,
  }
}

/** PopArt-style floating contact orb — icon loop, circle expand, menu, form panels. */
export default function PopArtContactOrb() {
  const navigateToPrivacyPolicy = usePrivacyPolicyNavigation()
  const [open, setOpen] = useState(false)
  const [activeForm, setActiveForm] = useState(null)
  const [iconIndex, setIconIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [consents, setConsents] = useState({ ...CONTACT_CONSENT_DEFAULTS })
  const [consentError, setConsentError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const rootRef = useRef(null)
  const btnRef = useRef(null)
  const backdropRef = useRef(null)
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  const menuRef = useRef(null)
  const formRef = useRef(null)
  const iconLoopTween = useRef(null)
  const originPctRef = useRef({ x: 92, y: 92 })

  useEffect(() => {
    setMounted(true)
  }, [])

  const lockScroll = useCallback((locked) => {
    if (typeof document === 'undefined') return
    document.body.style.overflow = locked ? 'hidden' : ''
    const main = document.getElementById('main')
    if (main) main.style.overflow = locked ? 'hidden' : ''
  }, [])

  const startIconLoop = useCallback(() => {
    iconLoopTween.current?.kill()

    if (prefersReducedMotion()) {
      setIconIndex(2)
      return
    }

    let index = 0
    const step = () => {
      setIconIndex(index)
      index = (index + 1) % ICON_CYCLE.length
    }

    step()
    iconLoopTween.current = gsap.delayedCall(ICON_DISPLAY_SEC, function loop() {
      step()
      iconLoopTween.current = gsap.delayedCall(ICON_DISPLAY_SEC, loop)
    })
  }, [])

  const stopIconLoop = useCallback(() => {
    iconLoopTween.current?.kill()
  }, [])

  useEffect(() => {
    if (!open) startIconLoop()
    return () => stopIconLoop()
  }, [open, startIconLoop, stopIconLoop])

  const resetCloseButton = useCallback(() => {
    const closeEl = closeRef.current
    if (!closeEl) return
    gsap.set(closeEl, {
      clearProps: 'all',
      opacity: 0,
      pointerEvents: 'none',
    })
  }, [])

  const placeCloseAtOrigin = useCallback((rect) => {
    const closeEl = closeRef.current
    if (!closeEl || !rect) return
    const { cx, cy } = triggerCenter(rect)
    gsap.set(closeEl, {
      position: 'fixed',
      left: cx,
      top: cy,
      xPercent: -50,
      yPercent: -50,
      width: rect.width,
      height: rect.height,
      opacity: 0,
      scale: 0.85,
      pointerEvents: 'none',
    })
  }, [])

  const floatCloseToCorner = useCallback((delay = 0.32) => {
    const closeEl = closeRef.current
    if (!closeEl) return
    const { left, top } = closeCornerPosition()
    gsap.to(closeEl, {
      left,
      top,
      xPercent: 0,
      yPercent: 0,
      width: CLOSE_SIZE_PX,
      height: CLOSE_SIZE_PX,
      opacity: 1,
      scale: 1,
      duration: prefersReducedMotion() ? 0.01 : 0.72,
      delay: prefersReducedMotion() ? 0 : delay,
      ease: 'power3.out',
      pointerEvents: 'auto',
    })
  }, [])

  const revealMenu = useCallback(() => {
    const menu = menuRef.current
    const form = formRef.current
    if (!menu) return

    gsap.set(form, { autoAlpha: 0, pointerEvents: 'none' })
    gsap.set(menu, { autoAlpha: 1, pointerEvents: 'auto' })

    const lines = menu.querySelectorAll('[data-orb-rev]')
    gsap.fromTo(
      lines,
      { yPercent: 108 },
      {
        yPercent: 0,
        duration: prefersReducedMotion() ? 0.01 : 0.78,
        stagger: prefersReducedMotion() ? 0 : 0.14,
        ease: 'power3.out',
      },
    )

    const pills = menu.querySelectorAll('[data-orb-pill]')
    gsap.fromTo(
      pills,
      { y: 18, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: prefersReducedMotion() ? 0.01 : 0.62,
        stagger: prefersReducedMotion() ? 0 : 0.1,
        delay: prefersReducedMotion() ? 0 : 0.35,
        ease: 'power3.out',
      },
    )
  }, [])

  const revealForm = useCallback((formId) => {
    const menu = menuRef.current
    const form = formRef.current
    if (!menu || !form) return

    setActiveForm(formId)

    gsap.to(menu, {
      xPercent: -8,
      autoAlpha: 0,
      duration: prefersReducedMotion() ? 0.01 : 0.45,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(menu, { pointerEvents: 'none' })
      },
    })

    gsap.set(form, { pointerEvents: 'auto' })
    gsap.fromTo(
      form,
      { xPercent: 14, autoAlpha: 0 },
      {
        xPercent: 0,
        autoAlpha: 1,
        duration: prefersReducedMotion() ? 0.01 : 0.72,
        ease: 'power3.out',
      },
    )

    const fields = form.querySelectorAll('[data-orb-field]')
    gsap.fromTo(
      fields,
      { y: 22, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: prefersReducedMotion() ? 0.01 : 0.55,
        stagger: prefersReducedMotion() ? 0 : 0.08,
        delay: prefersReducedMotion() ? 0 : 0.12,
        ease: 'power3.out',
      },
    )
  }, [])

  const resetFormState = useCallback(() => {
    setConsents({ ...CONTACT_CONSENT_DEFAULTS })
    setConsentError('')
    setSubmitError('')
    setSubmitSuccess(false)
    setIsSubmitting(false)
  }, [])

  const openOrb = useCallback(({ formId = null } = {}) => {
    const btn = btnRef.current
    const backdrop = backdropRef.current
    const panel = panelRef.current
    if (!btn || !backdrop || !panel) return

    stopIconLoop()
    setActiveForm(null)
    resetFormState()
    lockScroll(true)
    const revealPanel = formId ? () => revealForm(formId) : revealMenu

    const rect = btn.getBoundingClientRect()
    const { cx, cy } = triggerCenter(rect)
    const origin = originPercent(cx, cy)
    originPctRef.current = origin
    setBackdropOrigin(backdrop, origin)

    placeCloseAtOrigin(rect)

    gsap.set(menuRef.current, { autoAlpha: 0, pointerEvents: 'none' })
    gsap.set(formRef.current, { autoAlpha: 0, pointerEvents: 'none' })
    gsap.set(panel, { autoAlpha: 1, pointerEvents: 'auto' })
    gsap.set(backdrop, {
      autoAlpha: 1,
      clipPath: clipCircleAt(origin.x, origin.y, 0),
    })

    setOpen(true)

    if (prefersReducedMotion()) {
      gsap.set(backdrop, { clipPath: clipCircleAt(origin.x, origin.y, 150) })
      floatCloseToCorner(0)
      revealPanel()
      return
    }

    const tl = gsap.timeline({ onComplete: revealPanel })

    tl.to(
      backdrop,
      {
        clipPath: clipCircleAt(origin.x, origin.y, 150),
        duration: 0.95,
        ease: 'power3.inOut',
      },
      0,
    )

    tl.add(() => floatCloseToCorner(0), 0.28)
  }, [
    floatCloseToCorner,
    lockScroll,
    placeCloseAtOrigin,
    revealForm,
    revealMenu,
    resetFormState,
    stopIconLoop,
  ])

  useEffect(() => {
    const onOpenRequest = (event) => {
      const form = event.detail?.form ?? null
      if (open) {
        if (form) {
          resetFormState()
          revealForm(form)
        }
        return
      }
      openOrb({ formId: form })
    }

    window.addEventListener(ENSEMBLE_CONTACT_ORB_OPEN, onOpenRequest)
    return () => window.removeEventListener(ENSEMBLE_CONTACT_ORB_OPEN, onOpenRequest)
  }, [open, openOrb, revealForm, resetFormState])

  const closeOrb = useCallback((options) => {
    const onClosed = options?.onClosed
    const btn = btnRef.current
    const backdrop = backdropRef.current
    const panel = panelRef.current
    const closeEl = closeRef.current
    if (!btn || !backdrop || !panel) return

    const finish = () => {
      gsap.set(panel, { autoAlpha: 0, pointerEvents: 'none' })
      gsap.set(backdrop, { autoAlpha: 0, clearProps: 'clipPath' })
      gsap.set(menuRef.current, { clearProps: 'all', autoAlpha: 0 })
      gsap.set(formRef.current, { clearProps: 'all', autoAlpha: 0 })
      resetCloseButton()
      setOpen(false)
      setActiveForm(null)
      resetFormState()
      lockScroll(false)
      startIconLoop()
      onClosed?.()
    }

    const rect = btn.getBoundingClientRect()
    const { cx, cy } = triggerCenter(rect)
    const origin = originPctRef.current

    if (prefersReducedMotion()) {
      finish()
      return
    }

    gsap.to([menuRef.current, formRef.current], {
      autoAlpha: 0,
      duration: 0.22,
      ease: 'power2.in',
    })

    const tl = gsap.timeline({ onComplete: finish })

    if (closeEl) {
      tl.to(
        closeEl,
        {
          left: cx,
          top: cy,
          xPercent: -50,
          yPercent: -50,
          width: rect.width,
          height: rect.height,
          opacity: 0,
          scale: 0.85,
          duration: 0.45,
          ease: 'power3.in',
          pointerEvents: 'none',
        },
        0,
      )
    }

    tl.to(
      backdrop,
      {
        clipPath: clipCircleAt(origin.x, origin.y, 0),
        duration: 0.78,
        ease: 'power3.inOut',
      },
      0.08,
    )
  }, [lockScroll, resetCloseButton, resetFormState, startIconLoop])

  const handleMenuPick = useCallback(
    (id) => {
      revealForm(id)
    },
    [revealForm],
  )

  const handlePrivacyPolicyClick = useCallback(() => {
    closeOrb({
      onClosed: navigateToPrivacyPolicy,
    })
  }, [closeOrb, navigateToPrivacyPolicy])

  const handleConsultSubmit = async (e) => {
    e.preventDefault()
    const consentErr = validateContactConsents(consents)
    if (consentErr) {
      setConsentError(consentErr)
      return
    }

    const fd = new FormData(e.currentTarget)
    const phone = phonePayloadValue(fd.get('phone'))
    const phoneErr = getPhoneValidationError(phone)
    if (phoneErr) {
      setSubmitError(phoneErr)
      return
    }

    setConsentError('')
    setSubmitError('')
    setSubmitSuccess(false)
    setIsSubmitting(true)

    try {
      await submitContactForm({
        formType: 'growth-consult',
        specialty: String(fd.get('specialty') || '').trim(),
        budget: String(fd.get('budget') || '').trim(),
        phone,
        referral: String(fd.get('referral') || '').trim(),
        ...contactConsentsPayload(consents),
        source: 'ensemble-contact-orb-consult',
        submittedAt: new Date().toISOString(),
      })
      setSubmitSuccess(true)
      e.currentTarget.reset()
      setConsents({ ...CONTACT_CONSENT_DEFAULTS })
    } catch {
      setSubmitError('We could not send your request. Please try again or visit our contact page.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    const consentErr = validateContactConsents(consents)
    if (consentErr) {
      setConsentError(consentErr)
      return
    }

    const fd = new FormData(e.currentTarget)
    const phone = phonePayloadValue(fd.get('phone'))
    const phoneErr = getPhoneValidationError(phone)
    if (phoneErr) {
      setSubmitError(phoneErr)
      return
    }

    setConsentError('')
    setSubmitError('')
    setSubmitSuccess(false)
    setIsSubmitting(true)

    try {
      await submitContactForm({
        formType: 'contact-orb',
        name: String(fd.get('name') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        phone,
        message: String(fd.get('message') || '').trim(),
        ...contactConsentsPayload(consents),
        source: 'ensemble-contact-orb-contact',
        submittedAt: new Date().toISOString(),
      })
      setSubmitSuccess(true)
      e.currentTarget.reset()
      setConsents({ ...CONTACT_CONSENT_DEFAULTS })
    } catch {
      setSubmitError('We could not send your message. Please try again or visit our contact page.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAuditSubmit = async (e) => {
    e.preventDefault()
    const consentErr = validateContactConsents(consents)
    if (consentErr) {
      setConsentError(consentErr)
      return
    }

    const fd = new FormData(e.currentTarget)
    const phone = phonePayloadValue(fd.get('phone'))
    const phoneErr = getPhoneValidationError(phone)
    if (phoneErr) {
      setSubmitError(phoneErr)
      return
    }

    setConsentError('')
    setSubmitError('')
    setSubmitSuccess(false)
    setIsSubmitting(true)

    try {
      await submitContactForm({
        formType: 'free-audit-orb',
        practiceName: String(fd.get('practiceName') || '').trim(),
        name: String(fd.get('name') || '').trim(),
        email: String(fd.get('email') || '').trim(),
        phone,
        ...contactConsentsPayload(consents),
        source: 'ensemble-contact-orb-free-audit',
        submittedAt: new Date().toISOString(),
      })
      setSubmitSuccess(true)
      e.currentTarget.reset()
      setConsents({ ...CONTACT_CONSENT_DEFAULTS })
    } catch {
      setSubmitError('We could not submit your audit request. Please try again or visit our contact page.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const backToMenu = useCallback(() => {
    const menu = menuRef.current
    const form = formRef.current
    if (!menu || !form) return

    gsap.to(form, {
      xPercent: 12,
      autoAlpha: 0,
      duration: prefersReducedMotion() ? 0.01 : 0.4,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(form, { pointerEvents: 'none' })
        setActiveForm(null)
        resetFormState()
      },
    })

    gsap.set(menu, { pointerEvents: 'auto', xPercent: -6, autoAlpha: 0 })
    gsap.to(menu, {
      xPercent: 0,
      autoAlpha: 1,
      duration: prefersReducedMotion() ? 0.01 : 0.55,
      ease: 'power3.out',
    })
  }, [resetFormState])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && open) closeOrb()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, closeOrb])

  const panel = (
    <div
      ref={panelRef}
      className="ensemble-contact-orb__panel"
      data-open={open || undefined}
      aria-hidden={!open}
      role="dialog"
      aria-modal={open}
      aria-label="Contact Ensemble"
    >
      <div ref={backdropRef} className="ensemble-contact-orb__backdrop" aria-hidden />

      <button
        ref={closeRef}
        type="button"
        className="ensemble-contact-orb__close"
        aria-label="Close contact menu"
        onClick={closeOrb}
      >
        <X className="h-5 w-5" strokeWidth={2.25} />
      </button>

      <div ref={menuRef} className="ensemble-contact-orb__menu">
        <div className="ensemble-contact-orb__menu-copy">
          <div className="ensemble-contact-orb__rev-wrap">
            <p data-orb-rev className="ensemble-contact-orb__rev-line">
              Hello.
            </p>
          </div>
          <div className="ensemble-contact-orb__rev-wrap">
            <p data-orb-rev className="ensemble-contact-orb__rev-line ensemble-contact-orb__rev-line--lead">
              How can we help your practice grow?
            </p>
          </div>
        </div>
        <ul className="ensemble-contact-orb__pills">
          {MENU_ACTIONS.map((action) => (
            <li key={action.id}>
              <button
                type="button"
                data-orb-pill
                className="ensemble-contact-orb__pill"
                onClick={() => handleMenuPick(action.id)}
              >
                {action.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div ref={formRef} className="ensemble-contact-orb__form-wrap">
        <button
          type="button"
          className="ensemble-contact-orb__back"
          onClick={backToMenu}
          aria-label="Back to menu"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2} />
        </button>

        {activeForm === 'consult' ? (
          <form
            className="ensemble-contact-orb__form"
            onSubmit={handleConsultSubmit}
            aria-label="Growth consult form"
          >
            <h2 className="ensemble-contact-orb__form-title">Start a growth consult</h2>
            {submitSuccess ? (
              <p
                data-orb-field
                className="ensemble-contact-orb__form-status ensemble-contact-orb__form-status--success"
                role="status"
              >
                Request sent — we will be in touch shortly.
              </p>
            ) : null}
            {submitError ? (
              <p
                data-orb-field
                className="ensemble-contact-orb__form-status ensemble-contact-orb__form-status--error"
                role="alert"
              >
                {submitError}
              </p>
            ) : null}
            {CONSULT_FIELDS.map((field) => (
              <label key={field.name} data-orb-field className="ensemble-contact-orb__field">
                <span>{field.label}</span>
                <input
                  type={field.type ?? 'text'}
                  name={field.name}
                  placeholder={field.placeholder}
                  inputMode={field.type === 'tel' ? 'tel' : undefined}
                  autoComplete={field.type === 'tel' ? 'tel' : undefined}
                />
              </label>
            ))}
            <ContactFormConsents
              data-orb-field
              value={consents}
              onChange={setConsents}
              error={consentError}
              variant="orb"
              className="ensemble-contact-orb__consents"
              onPrivacyPolicyClick={handlePrivacyPolicyClick}
            />
            <button
              type="submit"
              data-orb-field
              className="ensemble-contact-orb__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending…' : 'Send request'}
            </button>
          </form>
        ) : null}

        {activeForm === 'contact' ? (
          <form
            className="ensemble-contact-orb__form"
            onSubmit={handleContactSubmit}
            aria-label="Contact form"
          >
            <h2 className="ensemble-contact-orb__form-title">We are here for you.</h2>
            {submitSuccess ? (
              <p
                data-orb-field
                className="ensemble-contact-orb__form-status ensemble-contact-orb__form-status--success"
                role="status"
              >
                Message sent — we will respond within one business day.
              </p>
            ) : null}
            {submitError ? (
              <p
                data-orb-field
                className="ensemble-contact-orb__form-status ensemble-contact-orb__form-status--error"
                role="alert"
              >
                {submitError}
              </p>
            ) : null}
            <label data-orb-field className="ensemble-contact-orb__field">
              <span>Full name *</span>
              <input type="text" name="name" placeholder="Dr. Smith" required />
            </label>
            <label data-orb-field className="ensemble-contact-orb__field">
              <span>E-mail *</span>
              <input type="email" name="email" placeholder="you@practice.com" required />
            </label>
            <label data-orb-field className="ensemble-contact-orb__field">
              <span>Phone number</span>
              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 123-4567"
                inputMode="tel"
                autoComplete="tel"
              />
            </label>
            <label data-orb-field className="ensemble-contact-orb__field">
              <span>Message</span>
              <textarea name="message" rows={4} placeholder="Tell us what you need…" />
            </label>
            <ContactFormConsents
              data-orb-field
              value={consents}
              onChange={setConsents}
              error={consentError}
              variant="orb"
              className="ensemble-contact-orb__consents"
              onPrivacyPolicyClick={handlePrivacyPolicyClick}
            />
            <button
              type="submit"
              data-orb-field
              className="ensemble-contact-orb__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending…' : 'Submit'}
            </button>
          </form>
        ) : null}

        {activeForm === 'audit' ? (
          <form
            className="ensemble-contact-orb__form"
            onSubmit={handleAuditSubmit}
            aria-label="Free practice audit form"
          >
            <h2 className="ensemble-contact-orb__form-title">{ORB_FREE_AUDIT.title}</h2>
            <p data-orb-field className="ensemble-contact-orb__form-lead">
              {ORB_FREE_AUDIT.description}
            </p>
            {submitSuccess ? (
              <p
                data-orb-field
                className="ensemble-contact-orb__form-status ensemble-contact-orb__form-status--success"
                role="status"
              >
                {ORB_FREE_AUDIT.successMessage}
              </p>
            ) : null}
            {submitError ? (
              <p
                data-orb-field
                className="ensemble-contact-orb__form-status ensemble-contact-orb__form-status--error"
                role="alert"
              >
                {submitError}
              </p>
            ) : null}
            {ORB_FREE_AUDIT.fields.map((field) => (
              <label key={field.name} data-orb-field className="ensemble-contact-orb__field">
                <span>{field.label}</span>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  inputMode={field.type === 'tel' ? 'tel' : undefined}
                  autoComplete={field.type === 'tel' ? 'tel' : field.type === 'email' ? 'email' : undefined}
                />
              </label>
            ))}
            <ContactFormConsents
              data-orb-field
              value={consents}
              onChange={setConsents}
              error={consentError}
              variant="orb"
              className="ensemble-contact-orb__consents"
              onPrivacyPolicyClick={handlePrivacyPolicyClick}
            />
            <button
              type="submit"
              data-orb-field
              className="ensemble-contact-orb__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending…' : ORB_FREE_AUDIT.submitLabel}
            </button>
            <p data-orb-field className="ensemble-contact-orb__form-footnote">
              {ORB_FREE_AUDIT.footnote}
            </p>
          </form>
        ) : null}
      </div>
    </div>
  )

  return (
    <>
      <ContactOrbCursorMorph disabled={open} />
      <div ref={rootRef} className="ensemble-contact-orb" data-open={open || undefined}>
        <button
          ref={btnRef}
          type="button"
          className="ensemble-contact-orb__trigger"
          aria-label="Open contact menu"
          aria-expanded={open}
          onClick={() => (open ? closeOrb() : openOrb())}
        >
          <span className="ensemble-contact-orb__trigger-icons" aria-hidden>
            {ICON_CYCLE.map(({ id, Component }, i) => (
              <Component key={id} isActive={i === iconIndex} />
            ))}
          </span>
          <span className="sr-only">{ICON_CYCLE[iconIndex].label}</span>
        </button>
      </div>
      {mounted ? createPortal(panel, document.body) : null}
    </>
  )
}
