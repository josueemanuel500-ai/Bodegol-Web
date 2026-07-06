/**
 * GalleryGrid.jsx — Filterable photo gallery + lightbox (Bodegol DS)
 * Props: images, categories, showFilter
 */
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import LazyImage from '@/components/ui/LazyImage'
import { createPortal } from 'react-dom'
import { cn } from '@/utils/cn'

function Lightbox({ image, onClose }) {
  return createPortal(
    <AnimatePresence>
      {image && (
        <motion.div key="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-modal flex items-center justify-center p-4" style={{ background: 'rgba(3,17,38,0.92)' }} onClick={onClose}>
          <button onClick={onClose} aria-label="Cerrar imagen"
            className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 p-2.5 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white">
            <X size={22} aria-hidden="true" />
          </button>
          <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25 }} onClick={(e) => e.stopPropagation()} className="relative max-h-[90vh] w-full max-w-5xl">
            <img src={image.src} alt={image.alt} loading="eager" draggable={false} onDragStart={(e)=>e.preventDefault()} onContextMenu={(e)=>e.preventDefault()} className="max-h-[85vh] w-full select-none rounded-2xl object-contain" />
            {image.caption && <p className="mt-3 text-center font-ui text-sm text-white/70">{image.caption}</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

function FilterTabs({ categories, active, onChange }) {
  return (
    <div className="mb-12 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Filtrar galería por categoría">
      {categories.map((cat) => (
        <button key={cat.id} onClick={() => onChange(cat.id)} aria-pressed={active === cat.id}
          className={cn(
            'rounded-full px-5 py-2.5 font-ui text-sm font-medium transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            active === cat.id
              ? 'bg-primary text-white shadow-glow-primary'
              : 'border border-line bg-surface-elevated text-content-secondary hover:border-primary/50 hover:text-content-primary'
          )}>
          {cat.label}
        </button>
      ))}
    </div>
  )
}

export default function GalleryGrid({ images = [], categories = [], showFilter = true }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [lightboxImage, setLightboxImage] = useState(null)
  const filtered = activeCategory === 'all' ? images : images.filter((img) => img.category === activeCategory)

  return (
    <div>
      {showFilter && categories.length > 0 && (
        <FilterTabs categories={categories} active={activeCategory} onChange={setActiveCategory} />
      )}
      <motion.div layout className="columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((image) => (
            <motion.div key={image.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="break-inside-avoid">
              <button onClick={() => setLightboxImage(image)} aria-label={`Ver imagen: ${image.alt}`}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                <LazyImage src={image.src} alt={image.alt} watermark className="w-full transition-transform duration-500 group-hover:scale-[1.07]" />
                <div className="absolute inset-0 flex items-center justify-center bg-background/0 transition-colors duration-300 group-hover:bg-background/40">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                    <ZoomIn size={22} strokeWidth={2} aria-hidden="true" />
                  </span>
                </div>
                {image.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="font-ui text-sm text-white">{image.caption}</p>
                  </div>
                )}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {filtered.length === 0 && <p className="py-12 text-center font-ui text-content-muted">No hay imágenes en esta categoría.</p>}
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </div>
  )
}
