/**
 * ImageProtect.jsx — Envoltura reutilizable de protección casual de imágenes.
 *
 * ⚠️ Ninguna protección frontend es 100% segura: lo mostrado públicamente puede
 * capturarse con screenshots o herramientas de red. Esto solo desalienta la
 * copia casual (clic derecho / arrastrar).
 *
 * Uso:
 *   <ImageProtect watermark>            // envuelve cualquier contenido con imagen
 *     <img src="..." alt="..." />
 *   </ImageProtect>
 *
 * Props:
 *   watermark      boolean — muestra "Bodegol" tenue (solo si features.imageWatermark = true)
 *   watermarkText  string  — texto del watermark (default "Bodegol")
 *   className      string
 */
import React from 'react'
import siteConfig from '@/config/site.config'
import { cn } from '@/utils/cn'

const prevent = (e) => e.preventDefault()

export default function ImageProtect({ children, watermark = false, watermarkText = 'Bodegol', className = '' }) {
  const show = watermark && siteConfig.features?.imageWatermark
  return (
    <div
      className={cn('relative select-none', className)}
      onContextMenu={prevent}
      onDragStart={prevent}
      style={{ WebkitUserSelect: 'none' }}
    >
      {children}
      {show && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
          <span className="whitespace-nowrap font-display uppercase tracking-[0.35em] text-white"
            style={{ transform: 'rotate(-22deg)', fontSize: 'clamp(1.5rem, 6vw, 3rem)', opacity: 0.08 }}>
            {watermarkText}
          </span>
        </div>
      )}
    </div>
  )
}
