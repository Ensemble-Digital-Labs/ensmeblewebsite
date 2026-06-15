import { cn } from '../../lib/utils'
import { getPictureSources, hasWebpSource } from '../../lib/pictureSources'

/**
 * Marketing photo with WebP preferred + PNG/JPEG fallback via `<picture>`.
 * Pair with `npm run images:webp` / build-time generation in `scripts/generate-webp.mjs`.
 */
export default function ResponsivePicture({
  src,
  alt = '',
  className,
  style,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  sizes,
  ...rest
}) {
  if (!src) return null

  const sources = getPictureSources(src)
  const imgProps = {
    alt,
    loading,
    decoding,
    sizes,
    className: cn(className),
    style,
    ...(fetchPriority ? { fetchPriority } : {}),
    ...rest,
  }

  if (!hasWebpSource(sources)) {
    return <img src={src} {...imgProps} />
  }

  return (
    <picture className="block h-full w-full">
      <source srcSet={sources.webp} type="image/webp" />
      <img src={sources.fallback} {...imgProps} />
    </picture>
  )
}
