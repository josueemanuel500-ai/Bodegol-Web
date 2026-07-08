/**
 * LazyImage.jsx — Lazy image + casual copy-protection (Bodegol)
 *
 * ⚠️ NINGUNA protección frontend es 100% segura. Una imagen visible siempre puede
 * capturarse con una screenshot o desde las herramientas de red del navegador.
 * Esto SOLO desalienta la copia casual (clic derecho / arrastrar / "guardar imagen").
 *
 * Protección aplicada a la imagen:
 *   - draggable={false} + onDragStart prevenido  → no se puede arrastrar
 *   - onContextMenu prevenido                     → no aparece el menú en la imagen
 *   - select-none / -webkit-user-drag (CSS global)
 * Watermark opcional ("Bodegol") solo si watermark={true} Y features.imageWatermark = true.
 *
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
  src,
  alt,
  className    = '',
  aspectRatio  = null,
  objectFit    = 'cover',
  priority     = false,
  watermark    = false,
  watermarkText = 'Bodegol',
  width,
  height,
  ...rest
}) {
  const [loaded,  setLoaded]  = useState(false)
  const [errored, setErrored] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true)
  }, [])

  const showWatermark = watermark && siteConfig.features?.imageWatermark

  const aspectClass = aspectRatio ? ASPECT_RATIO_CLASSES[aspectRatio] : ''
  const containerClasses = ['relative overflow-hidden bg-surface-elevated', aspectClass, className].filter(Boolean).join(' ')
  const imgClasses = [
    'w-full h-full select-none transition-opacity duration-400',
    `object-${objectFit}`,
    loaded && !errored ? 'opacity-100' : 'opacity-0',
  ].filter(Boolean).join(' ')

  return (
    <div className={containerClasses} aria-hidden={!alt}>
      {!loaded && !errored && (
        <div className="absolute inset-0 bg-surface-elevated animate-pulse" aria-hidden="true" />
      )}

      {errored && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-elevated text-text-muted gap-2">
          <ImageOff size={32} aria-hidden="true" />
          <span className="text-xs">Imagen no disponible</span>
        </div>
      )}

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
          draggable={false}
          onDragStart={preventDefault}
          onContextMenu={preventDefault}
        />
      )}

      {/* Subtle diagonal watermark (opt-in) */}
      {showWatermark && !errored && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
          <span
            className="whitespace-nowrap font-display uppercase tracking-[0.35em] text-white"
            style={{ transform: 'rotate(-22deg)', fontSize: 'clamp(1.5rem, 6vw, 3rem)', opacity: 0.08 }}
          >
            {watermarkText} · {watermarkText} · {watermarkText}
          </span>
        </div>
      )}
    </div>
  )
}
