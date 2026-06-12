import { Link, useLocation } from 'react-router-dom'
import { usePixelTransition } from './PixelTransition'
import { shouldUsePixelNav } from '../lib/pixelNav'

/**
 * Nav `Link` that plays the pixel wipe when routing to a non-home page.
 * Home (`/`) and same-route clicks use the default React Router behavior.
 */
export default function NavPixelLink({ to, onClick, replace = false, ...rest }) {
  const location = useLocation()
  const pixel = usePixelTransition()

  const handleClick = (e) => {
    onClick?.(e)
    if (e.defaultPrevented) return

    const targetPath = typeof to === 'string' ? to : to?.pathname ?? ''
    if (!shouldUsePixelNav(location.pathname, targetPath)) return
    if (!pixel?.navigateWithPixel) return

    e.preventDefault()
    void pixel.navigateWithPixel(to, { replace, fromPath: location.pathname })
  }

  return <Link to={to} replace={replace} onClick={handleClick} {...rest} />
}
