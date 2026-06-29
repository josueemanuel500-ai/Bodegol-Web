/**
 * Promotions.jsx — Promotions Section
 * Content from src/data/promotions.js
 */

import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Clock } from 'lucide-react'
import { activePromotions, promotionsHeading } from '@/data/promotions'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import LazyImage      from '@/components/ui/LazyImage'
import Badge          from '@/components/ui/Badge'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

export default function Promotions() {
  const { business } = useBusiness()

  if (activePromotions.length === 0) return null

  return (
    <SectionWrapper id="promotions" background="elevated">
      <SectionHeading
        id="promotions-heading"
        eyebrow={promotionsHeading.eyebrow}
        title={promotionsHeading.title}
        subtitle={promotionsHeading.subtitle}
      />

      <motion.div
        variants={ANIMATION.STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {activePromotions.map(promo => {
          const waUrl = buildWhatsAppUrl(business.contact.whatsapp, promo.cta.message)
          return (
            <motion.article
              key={promo.id}
              variants={ANIMATION.FADE_UP}
              className="group flex flex-col rounded-2xl bg-surface-base border border-border-default overflow-hidden hover:border-brand-primary/40 hover:shadow-card-lg transition-all duration-250"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <LazyImage
                  src={promo.image}
                  alt={promo.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="dark">{promo.tag}</Badge>
                </div>
                <div className="absolute top-3 right-3 text-2xl" aria-hidden="true">
                  {promo.emoji}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5 gap-3">
                <div>
                  <h3 className="font-display font-bold text-text-primary text-lg leading-tight">
                    {promo.title}
                  </h3>
                  <p className="text-text-secondary text-sm mt-2 leading-relaxed">
                    {promo.description}
                  </p>
                </div>

                {promo.schedule && (
                  <div className="flex items-center gap-1.5 text-brand-primary text-xs font-ui font-medium">
                    <Clock size={12} aria-hidden="true" />
                    {promo.schedule}
                  </div>
                )}

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'mt-auto flex items-center justify-center gap-2 py-2.5 rounded-xl',
                    'bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white',
                    'border border-brand-primary/30 hover:border-brand-primary',
                    'font-ui font-semibold text-sm transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
                  )}
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  {promo.cta.label}
                </a>
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}
