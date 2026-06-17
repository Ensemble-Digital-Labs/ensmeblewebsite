import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { usePixelTransition } from '../components/PixelTransition'

/** Navigate to `/privacy-policy` with the site pixel transition when available. */
export function usePrivacyPolicyNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const pixel = usePixelTransition()

  return useCallback(() => {
    if (pixel?.navigateWithPixel) {
      void pixel.navigateWithPixel('/privacy-policy', { fromPath: location.pathname })
      return
    }
    navigate('/privacy-policy')
  }, [location.pathname, navigate, pixel])
}
