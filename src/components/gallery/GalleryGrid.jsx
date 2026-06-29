/**
 * GalleryGrid.jsx — Filterable Photo Gallery Grid
 *
 * Features:
 *   - Category filter tabs (from galleryCategories in gallery.js)
 *   - Animated filter transition via Framer Motion layout animation
 *   - Lightbox on image click (opens full-size in a Modal)
 *   - Lazy loading on all images
 *   - Responsive masonry-style grid
 *
 * Props:
 *   images      Array from gallery.js
 *   categories  Array from galleryCategories in gallery.js
 *   showFilter  boolean — show/hide category filter tabs (default true)
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import LazyImage from '@/components/ui/LazyImage'
import { createPortal } from 'react-dom'
import { cn } from '@/utils/cn'

// ─── Lightbox ─────────────────────────────────────────────────────────────
function Lightbox({ image, onClose }) {
  return createPortal(
    <AnimatePresence>
      {image && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/90"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Cerrar imagen"
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10"
          >
            <X size={24} />
          </button>
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1,    opacity: 1 }}
            exit={{ scale: 0.92,    opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[90vh] w-full"
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="eager"
              className="w-full h-full object-contain rounded-xl max-h-[85vh]"
            />
            {image.caption && (
              <p className="text-center text-white/70 text-sm mt-3 font-ui">
                {image.caption}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

// ─── Filter Tabs ──────────────────────────────────────────────────────────
function FilterTabs({ categories, active, onChange }) {
  return (
    <div
      className="flex flex-wrap gap-2 justify-center mb-10"
      role="group"
      aria-label="Filtrar galería por categoría"
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          aria-pressed={active === cat.id}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-ui font-medium transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
            active === cat.id
              ? 'bg-brand-primary text-white shadow-sm'
              : 'bg-surface-elevated text-text-secondary hover:bg-brand-primary/10 hover:text-brand-primary border border-border-default'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

// ─── Main Gallery Component ───────────────────────────────────────────────
export default function GalleryGrid({
  images     = [],
  categories = [],
  showFilter = true,
}) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxImage,  setLightboxImage]  = useState(null)

  const filtered = activeCategory === 'all'
    ? images
    : images.filter((img) => img.category === activeCategory)

  return (
    <div>
      {/* Filter Tabs */}
      {showFilter && categories.length > 0 && (
        <FilterTabs
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      )}

      {/* Grid */}
      <motion.div
        layout
        className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0,   scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="break-inside-avoid"
            >
              <button
                onClick={() => setLightboxImage(image)}
                aria-label={`Ver imagen: ${image.alt}`}
                className={cn(
                  'group relative w-full overflow-hidden rounded-2xl',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
                  'block cursor-zoom-in'
                )}
              >
                <LazyImage
                  src={image.src}
                  alt={image.alt}
                  className="w-full group-hover:scale-105 transition-transform duration-400"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                  <ZoomIn
                    size={28}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg"
                    aria-hidden="true"
                  />
                </div>
                {/* Caption */}
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-ui">{image.caption}</p>
                  </div>
                )}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-text-muted py-12 font-ui">
          No hay imágenes en esta categoría.
        </p>
      )}

      {/* Lightbox */}
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  )
}
