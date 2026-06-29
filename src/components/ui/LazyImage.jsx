/**
 * LazyImage.jsx — Lazy Loading Image Component
 *
 * Wraps <img> with:
 *   - Native lazy loading (loading="lazy")
 *   - Fade-in animation when the image enters the viewport
 *   - Fallback placeholder while loading or on error
 *   - Accessibility: requires alt text (enforced via prop)
 *
 * Props:
 *   src         string — image path (from public/images/)
 *   alt         string — required alt text
 *   className   string — additional Tailwind classes
 *   aspectRatio 'square' | 'landscape' | 'portrait' | null
 *   objectFit   'cover' | 'contain' | 'fill' — default 'cover'
 *   priority    boolean — if true, don't lazy load (for above-the-fold images)
 *
 * Example:
 *   <LazyImage src="/images/gallery/g-01.webp" alt="Vista del salón" className="rounded-2xl" />
 */

import React, { useState, useRef, useEffect } from 'react'
import { ImageOff } from 'lucide-react'

const ASPECT_RATIO_CLASSES = {
  square:    'aspect-square',
  landscape: 'aspect-video',
  portrait:  'aspect-[3/4]',
}

export default function LazyImage({
  src,
  alt,
  className    = '',
  aspectRatio  = null,
  objectFit    = 'cover',
  priority     = false,
  width,
  height,
  ...rest
}) {
  const [loaded,  setLoaded]  = useState(false)
  const [errored, setErrored] = useState(false)
  const imgRef = useRef(null)

  // If image is already cached, it may fire onLoad before React mounts the handler
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  const aspectClass = aspectRatio ? ASPECT_RATIO_CLASSES[aspectRatio] : ''

  const containerClasses = [
    'relative overflow-hidden bg-surface-elevated',
    aspectClass,
    className,
  ].filter(Boolean).join(' ')

  const imgClasses = [
    'w-full h-full transition-opacity duration-400',
    `object-${objectFit}`,
    loaded && !errored ? 'opacity-100' : 'opacity-0',
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClasses} aria-hidden={!alt}>
      {/* Placeholder shown while loading */}
      {!loaded && !errored && (
        <div
          className="absolute inset-0 bg-surface-elevated animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Error state */}
      {errored && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-elevated text-text-muted gap-2">
          <ImageOff size={32} aria-hidden="true" />
          <span className="text-xs">Imagen no disponible</span>
        </div>
      )}

      {/* The actual image */}
      {!errored && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width={width}
          height={height}
          className={imgClasses}
          onLoad={() => setLoaded(true)}
          onError={() => { setErrored(true); setLoaded(true) }}
          {...rest}
        />
      )}
    </div>
  )
}
