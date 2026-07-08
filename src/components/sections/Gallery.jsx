/**
 * Gallery.jsx — Galería de fotos (sin categorías ni filtros).
 * Muestra todas las imágenes de data/gallery.js en un mosaico + lightbox.
 */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { createPortal } from 'react-dom'
import { galleryImages, galleryHeading } from '@/data/gallery'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import LazyImage from '@/components/ui/LazyImage'

function Lightbox({ image, onClose }) {
  if (!image) return null
  return createPortal(
    <AnimatePresence>
      <motion.div key="lb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-modal flex items-center justify-center p-4" style={{ background: 'rgba(3,17,38,0.94)' }}
        onClick={onClose} role="dialog" aria-modal="true" aria-label={image.alt}>
        <button onClick={onClose} aria-label="Cerrar imagen"
          className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 p-2.5 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white">
          <X size={22} aria-hidden="true" />
        </button>
        <motion.img src={image.src} alt={image.alt} initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="max-h-[88vh] w-full max-w-5xl select-none rounded-2xl object-contain" draggable={false}
          onClick={(e) => e.stopPropagation()} onContextMenu={(e) => e.preventDefault()} loading="eager" />
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  return (
    <SectionWrapper id="gallery" background="elevated" glow>
      <SectionHeading id="gallery-heading" eyebrow={galleryHeading.eyebrow} title={galleryHeading.title} subtitle={galleryHeading.subtitle} />

      <div className="columns-2 gap-3 space-y-3 md:columns-3 lg:columns-4">
        {galleryImages.map((img) => (
          <motion.div key={img.id} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.35 }} className="break-inside-avoid">
            <button onClick={() => setLightbox(img)} aria-label={`Ver: ${img.alt}`}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
              <LazyImage src={img.src} alt={img.alt} watermark className="w-full transition-transform duration-500 group-hover:scale-[1.06]" />
              <div className="absolute inset-0 flex items-center justify-center bg-background/0 transition-colors duration-300 group-hover:bg-background/40">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                  <ZoomIn size={20} strokeWidth={2} aria-hidden="true" />
                </span>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
    </SectionWrapper>
  )
}
