/**
 * LazyImage.jsx — Imagen con carga diferida + protección casual (Bodegol)
 *
 * Robustez móvil (iPad/Safari): la imagen NO se oculta esperando onLoad
 * (antes quedaba invisible si onLoad no disparaba). Se muestra siempre;
 * el placeholder queda detrás y se oculta al cargar o al detectar `complete`.
 *
 * ⚠️ Ninguna protección frontend es 100% segura (screenshots/red).
 * Props: src, alt, className, aspectRatio, objectFit, priority, watermark, watermarkText
 */
import React, { useState, useRef, useEffect } from 'react'
import { ImageOff } from 'lucide-react'
import siteConfig from '@/config/site.config'

const ASPECT_RATIO_CLASSES = {
  square:    'aspect-square',
  landscape: 'aspect-video',
  portrait:  'aspect-[3/4]',
}
const preventDefault = (e) => e.preventDefault()

export default function LazyImage({
  src, alt, className = '', aspectRatio = null, objectFit = 'cover',
  priority = false, watermark = false, watermarkText = 'Bodegol', width, height, ...rest
}) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)
  const imgRef = useRef(null)

  // Detecta imágenes ya cacheadas (Safari a veces no dispara onLoad)
  useEffect(() => {
    const img = imgRef.current
    if (img && img.complete) {
      if (img.naturalWidth > 0) setLoaded(true)
      else setErrored(true)
    }
  }, [src])

  const showWatermark = watermark && siteConfig.features?.imageWatermark
  const aspectClass = aspectRatio ? ASPECT_RATIO_CLASSES[aspectRatio] : ''
  const containerClasses = ['relative overflow-hidden bg-surface-elevated', aspectClass, className].filter(Boolean).join(' ')

  return (
    <div className={containerClasses} aria-hidden={!alt}>
      {/* Placeholder mientras carga (detrás de la imagen) */}
      {!loaded && !errored && (
        <div className="absolute inset-0 z-0 bg-surface-elevated animate-pulse" aria-hidden="true" />
      )}

      {errored ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-surface-elevated text-content-muted">
          <ImageOff size={32} aria-hidden="true" />
          <span className="text-xs">Imagen no disponible</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width={width}
          height={height}
          className={`relative z-[1] h-full w-full select-none object-${objectFit}`}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          {...rest}
          draggable={false}
          onDragStart={preventDefault}
          onContextMenu={preventDefault}
        />
      )}

      {showWatermark && !errored && (
        <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center overflow-hidden" aria-hidden="true">
          <span className="whitespace-nowrap font-display uppercase tracking-[0.35em] text-white"
            style={{ transform: 'rotate(-22deg)', fontSize: 'clamp(1.5rem, 6vw, 3rem)', opacity: 0.08 }}>
            {watermarkText} · {watermarkText} · {watermarkText}
          </span>
        </div>
      )}
    </div>
  )
}
