/**
 * Promotions.jsx — Current offers
 * Modern promo cards; image-led; highlights offers without overwhelming.
 * Content from data/promotions.js.
 *
 * IMAGE per promo — recommended: 1000 × 750 px (4:3), .webp < 250 KB.
 *   promo.image → public/images/promotions/<id>.jpg
 */
import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Clock } from 'lucide-react'
import { activePromotions, promotionsHeading } from '@/data/promotions'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import LazyImage from '@/components/ui/LazyImage'
import Badge from '@/components/ui/Badge'
import Button from '@/components/buttons/Button'
import { ANIMATION } from '@/constants'

export default function Promotions() {
  const { business } = useBusiness()
  if (activePromotions.length === 0) return null

  return (
    <SectionWrapper id="promotions" background="elevated">
      <SectionHeading id="promotions-heading" eyebrow={promotionsHeading.eyebrow} title={promotionsHeading.title} subtitle={promotionsHeading.subtitle} />

      <motion.div variants={ANIMATION.STAGGER} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {activePromotions.map((promo) => {
          const waUrl = buildWhatsAppUrl(business.contact.whatsapp, promo.cta.message)
          return (
            <motion.article key={promo.id} variants={ANIMATION.FADE_UP}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-background shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-lg">
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* IMAGE — 1000×750 (4:3) */}
                <LazyImage src={promo.image} alt={promo.imageAlt} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.07]" />
                <div className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(3,17,38,0.1) 0%, rgba(3,17,38,0.75) 100%)' }} />
                <div className="absolute left-3 top-3"><Badge variant="dark">{promo.tag}</Badge></div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="t-card-title text-lg">{promo.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-content-secondary">{promo.description}</p>
                {promo.schedule && (
                  <div className="flex items-center gap-1.5 font-ui text-xs font-medium text-primary">
                    <Clock size={13} strokeWidth={2} aria-hidden="true" />{promo.schedule}
                  </div>
                )}
                <Button as="a" href={waUrl} target="_blank" rel="noopener noreferrer" variant="outline" size="sm" icon={MessageCircle} className="mt-1 self-start">
                  {promo.cta.label}
                </Button>
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}
