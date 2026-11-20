import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { usePixelTransition } from '../components/PixelTransition'

/** Navigate to a legal path with the site pixel transition when available. */
function useLegalPathNavigation(path) {
  const navigate = useNavigate()
  const location = useLocation()
  const pixel = usePixelTransition()

  return useCallback(() => {
    if (pixel?.navigateWithPixel) {
      void pixel.navigateWithPixel(path, { fromPath: location.pathname })
      return
    }
    navigate(path)
  }, [location.pathname, navigate, path, pixel])
}

/** Navigate to `/privacy-policy` with the site pixel transition when available. */
export function usePrivacyPolicyNavigation() {
  return useLegalPathNavigation('/privacy-policy')
}

/** Navigate to `/privacy-policy/sms` with the site pixel transition when available. */
export function useSmsPrivacyNavigation() {
  return useLegalPathNavigation('/privacy-policy/sms')
}

/** Navigate to `/terms` with the site pixel transition when available. */
export function useTermsNavigation() {
  return useLegalPathNavigation('/terms')
}
