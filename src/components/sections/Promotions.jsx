/**
 * Promotions.jsx — Current offers (immersive overlay cards)
 * Content from data/promotions.js.
 *
 * IMAGE per promo — recommended: 1000 × 1100 px (≈9:10 portrait), .webp < 280 KB.
 *   promo.image → public/images/promotions/<id>.jpg
 */
import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Clock, ArrowRight } from 'lucide-react'
import { activePromotions, promotionsHeading } from '@/data/promotions'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import LazyImage from '@/components/ui/LazyImage'
import Badge from '@/components/ui/Badge'
import { ANIMATION } from '@/constants'

export default function Promotions() {
  const { business } = useBusiness()
  if (activePromotions.length === 0) return null

  return (
    <SectionWrapper id="promotions" background="base" glow>
      <SectionHeading id="promotions-heading" eyebrow={promotionsHeading.eyebrow} title={promotionsHeading.title} subtitle={promotionsHeading.subtitle} />
      <motion.div variants={ANIMATION.STAGGER} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {activePromotions.map((promo) => {
          const waUrl = buildWhatsAppUrl(business.contact.whatsapp, promo.cta.message)
          return (
            <motion.a key={promo.id} variants={ANIMATION.FADE_UP} href={waUrl} target="_blank" rel="noopener noreferrer"
              aria-label={`${promo.title} — ${promo.cta.label}`}
              className="group relative block overflow-hidden rounded-2xl border border-line shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-card-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background">
              <div className="relative aspect-square overflow-hidden">
                {/* IMAGE — 1080×1080 (1:1) WebP, máx 300 KB */}
                <LazyImage src={promo.image} alt={promo.imageAlt} className="h-full w-full transition-transform duration-[600ms] group-hover:scale-[1.08]" />
                <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(3,17,38,0.15) 0%, rgba(3,17,38,0.55) 45%, rgba(3,17,38,0.96) 100%)' }} />
                <div className="absolute left-3 top-3"><Badge variant="dark">{promo.tag}</Badge></div>
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
                  <h3 className="t-card-title text-lg text-white">{promo.title}</h3>
                  <p className="line-clamp-2 text-sm leading-snug text-white/70">{promo.description}</p>
                  {promo.schedule && (
                    <div className="flex items-center gap-1.5 font-ui text-xs font-medium text-primary">
                      <Clock size={13} strokeWidth={2} aria-hidden="true" />{promo.schedule}
                    </div>
                  )}
                  <span className="mt-1 inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-white">
                    <MessageCircle size={15} strokeWidth={2} aria-hidden="true" />{promo.cta.label}
                    <ArrowRight size={15} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </motion.a>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}
