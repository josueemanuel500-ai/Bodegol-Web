/**
 * Promotions.jsx — Ofertas (mismo estilo de tarjeta; imagen → lightbox; CTA WhatsApp)
 * Datos desde Supabase (con respaldo a data/promotions.js) vía usePromotions.
 *
 * IMAGE por promo — recomendado: 1080 × 1080 px (1:1), PNG/JPG/WebP, < 300 KB.
 */
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Clock, X } from 'lucide-react'
import { promotionsHeading } from '@/data/promotions'
import { usePromotions } from '@/hooks/usePromotions'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import LazyImage from '@/components/ui/LazyImage'
import Badge from '@/components/ui/Badge'
import { ANIMATION } from '@/constants'

function Lightbox({ promo, onClose }) {
  if (!promo) return null
  return createPortal(
    <AnimatePresence>
      <motion.div key="promo-lb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-modal flex items-center justify-center p-4" style={{ background: 'rgba(3,17,38,0.94)' }}
        onClick={onClose} role="dialog" aria-modal="true" aria-label={promo.title}>
        <button onClick={onClose} aria-label="Cerrar"
          className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 p-2.5 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white">
          <X size={22} aria-hidden="true" />
        </button>
        <motion.img src={promo.image} alt={promo.imageAlt} initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="max-h-[88vh] w-full max-w-3xl select-none rounded-2xl object-contain" draggable={false}
          onClick={(e) => e.stopPropagation()} loading="eager" />
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

export default function Promotions() {
  const { business } = useBusiness()
  const { promotions } = usePromotions()
  const [lightbox, setLightbox] = useState(null)
  if (!promotions || promotions.length === 0) return null

  return (
    <SectionWrapper id="promotions" background="base" glow>
      <SectionHeading id="promotions-heading" eyebrow={promotionsHeading.eyebrow} title={promotionsHeading.title} subtitle={promotionsHeading.subtitle} />
      <motion.div variants={ANIMATION.STAGGER} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {promotions.map((promo) => {
          const waUrl = buildWhatsAppUrl(business.contact.whatsapp, promo.cta.message)
          return (
            <motion.article key={promo.id} variants={ANIMATION.FADE_UP}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-card-lg">
              {/* Imagen — clic para verla en grande */}
              <button type="button" onClick={() => setLightbox(promo)} aria-label={`Ver imagen: ${promo.title}`}
                className="relative block aspect-square w-full cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary">
                <LazyImage src={promo.image} alt={promo.imageAlt} watermark className="h-full w-full transition-transform duration-[600ms] group-hover:scale-[1.08]" />
                <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(3,17,38,0.10) 0%, rgba(3,17,38,0.50) 45%, rgba(3,17,38,0.94) 100%)' }} />
                <div className="absolute left-3 top-3"><Badge variant="dark">{promo.tag}</Badge></div>
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5 text-left">
                  <h3 className="t-card-title text-lg text-white">{promo.title}</h3>
                  <p className="line-clamp-2 text-sm leading-snug text-white/70">{promo.description}</p>
                  {promo.schedule && (
                    <div className="flex items-center gap-1.5 font-ui text-xs font-medium text-primary">
                      <Clock size={13} strokeWidth={2} aria-hidden="true" />{promo.schedule}
                    </div>
                  )}
                </div>
              </button>
              {/* CTA WhatsApp */}
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-primary py-3 font-ui text-sm font-bold text-white transition-colors hover:bg-primary-hover">
                <MessageCircle size={16} strokeWidth={2} aria-hidden="true" />{promo.cta.label}
              </a>
            </motion.article>
          )
        })}
      </motion.div>
      <Lightbox promo={lightbox} onClose={() => setLightbox(null)} />
    </SectionWrapper>
  )
}
