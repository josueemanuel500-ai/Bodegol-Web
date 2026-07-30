import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { createPortal } from 'react-dom'
import { galleryImages, galleryHeading } from '@/data/gallery'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import LazyImage from '@/components/ui/LazyImage'
import { useScrollLock } from '@/hooks/useScrollLock'

function Lightbox({ image, onClose, onPrevious, onNext }) {
  useScrollLock(Boolean(image))

  useEffect(() => {
    if (!image) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrevious()
      if (event.key === 'ArrowRight') onNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [image, onClose, onPrevious, onNext])

  if (!image) return null

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-modal flex items-center justify-center p-4"
        style={{ background: 'rgba(3,17,38,0.94)' }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={image.alt}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar imagen"
          className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-white/10 p-2.5 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X size={22} aria-hidden="true" />
        </button>

        <button
          onClick={(event) => { event.stopPropagation(); onPrevious() }}
          aria-label="Ver imagen anterior"
          className="absolute left-3 z-10 rounded-full border border-white/15 bg-black/25 p-2.5 text-white/80 backdrop-blur-md transition hover:scale-105 hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6 sm:p-3"
        >
          <ChevronLeft size={26} aria-hidden="true" />
        </button>

        <motion.img
          key={image.id}
          src={image.src}
          alt={image.alt}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-h-[84vh] w-full max-w-5xl select-none rounded-2xl object-contain"
          draggable={false}
          onClick={(event) => event.stopPropagation()}
          loading="eager"
        />

        <button
          onClick={(event) => { event.stopPropagation(); onNext() }}
          aria-label="Ver imagen siguiente"
          className="absolute right-3 z-10 rounded-full border border-white/15 bg-black/25 p-2.5 text-white/80 backdrop-blur-md transition hover:scale-105 hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6 sm:p-3"
        >
          <ChevronRight size={26} aria-hidden="true" />
        </button>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const lightbox = lightboxIndex === null ? null : galleryImages[lightboxIndex]
  const showPrevious = () => setLightboxIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length)
  const showNext = () => setLightboxIndex((current) => (current + 1) % galleryImages.length)

  return (
    <SectionWrapper id="gallery" background="elevated" glow>
      <SectionHeading
        id="gallery-heading"
        eyebrow={galleryHeading.eyebrow}
        title={galleryHeading.title}
        subtitle={galleryHeading.subtitle}
      />

      <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
        {galleryImages.map((img, index) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
            className="mb-3 break-inside-avoid"
          >
            <button
              onClick={() => setLightboxIndex(index)}
              aria-label={`Ver: ${img.alt}`}
              className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface ${
                img.layout === 'portrait'
                  ? 'aspect-[3/4]'
                  : img.layout === 'square'
                    ? 'aspect-square'
                    : 'aspect-[4/3]'
              }`}
            >
              <LazyImage
                src={img.src}
                alt={img.alt}
                watermark
                className="h-full w-full transition-transform duration-500 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-background/0 transition-colors duration-300 group-hover:bg-background/40">
                <span className="flex h-11 w-11 scale-90 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <ZoomIn size={20} strokeWidth={2} aria-hidden="true" />
                </span>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      <Lightbox
        image={lightbox}
        onClose={() => setLightboxIndex(null)}
        onPrevious={showPrevious}
        onNext={showNext}
      />
    </SectionWrapper>
  )
}
