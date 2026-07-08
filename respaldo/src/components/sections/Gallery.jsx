/**
 * Gallery.jsx — Photo Gallery Section
 * Content from src/data/gallery.js
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { createPortal } from 'react-dom'
import { galleryImages, galleryCategories, galleryHeading } from '@/data/gallery'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import LazyImage      from '@/components/ui/LazyImage'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

function Lightbox({ image, onClose }) {
  if (!image) return null
  return createPortal(
    <AnimatePresence>
      <motion.div
        key="lb"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/95"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={image.alt}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Cerrar imagen"
        >
          <X size={22} />
        </button>
        <motion.img
          src={image.src}
          alt={image.alt}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-5xl max-h-[88vh] w-full object-contain rounded-xl"
          onClick={e => e.stopPropagation()}
          loading="eager"
        />
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export default function Gallery() {
  const [active,    setActive]    = useState('all')
  const [lightbox,  setLightbox]  = useState(null)

  const filtered = active === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === active)

  return (
    <SectionWrapper id="gallery" background="elevated">
      <SectionHeading
        id="gallery-heading"
        eyebrow={galleryHeading.eyebrow}
        title={galleryHeading.title}
        subtitle={galleryHeading.subtitle}
      />

      {/* Filter */}
      <div className="flex gap-2 flex-wrap justify-center mb-8" role="group" aria-label="Filtrar galería">
        {galleryCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            aria-pressed={active === cat.id}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-ui font-medium transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
              active === cat.id
                ? 'bg-brand-primary text-white'
                : 'bg-surface-base border border-border-default text-text-secondary hover:border-border-strong hover:text-text-primary'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid — masonry-style with columns */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.map(img => (
            <motion.div
              key={img.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="break-inside-avoid"
            >
              <button
                onClick={() => setLightbox(img)}
                aria-label={`Ver: ${img.alt}`}
                className="group relative w-full overflow-hidden rounded-xl block cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <LazyImage
                  src={img.src}
                  alt={img.alt}
                  className="w-full group-hover:scale-105 transition-transform duration-400"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
                  <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" aria-hidden="true" />
                </div>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Lightbox image={lightbox} onClose={() => setLightbox(null)} />
    </SectionWrapper>
  )
}
