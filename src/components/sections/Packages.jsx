/**
 * Packages.jsx — Birthday & Event Packages Section
 * Content from src/data/packages.js
 */

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, MessageCircle, Users, Clock } from 'lucide-react'
import { packages, packagesHeading } from '@/data/packages'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import LazyImage      from '@/components/ui/LazyImage'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

export default function Packages() {
  const { business } = useBusiness()

  return (
    <SectionWrapper id="packages" background="base">
      <SectionHeading
        id="packages-heading"
        eyebrow={packagesHeading.eyebrow}
        title={packagesHeading.title}
        subtitle={packagesHeading.subtitle}
      />

      <motion.div
        variants={ANIMATION.STAGGER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {packages.map((pkg) => {
          const waUrl = buildWhatsAppUrl(business.contact.whatsapp, pkg.cta.message)
          const isHighlighted = pkg.highlighted

          return (
            <motion.article
              key={pkg.id}
              variants={ANIMATION.FADE_UP}
              className={cn(
                'relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-250',
                isHighlighted
                  ? 'border-brand-primary shadow-glow-green md:scale-105 md:z-10'
                  : 'border-border-default hover:border-border-strong hover:shadow-card-lg shadow-card bg-surface-elevated'
              )}
            >
              {/* Popular badge */}
              {pkg.badge && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-brand-accent text-white text-xs font-ui font-bold">
                  {pkg.badge}
                </div>
              )}

              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <LazyImage
                  src={pkg.image}
                  alt={`Paquete ${pkg.name} en Bodegol`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="text-4xl mb-1" aria-hidden="true">{pkg.emoji}</div>
                  <h3 className="font-display font-black text-2xl text-white">{pkg.name}</h3>
                  <p className="text-white/75 text-sm font-ui">{pkg.subtitle}</p>
                </div>
              </div>

              {/* Body */}
              <div className={cn(
                'flex flex-col flex-1 p-6 gap-5',
                isHighlighted ? 'bg-surface-elevated' : ''
              )}>
                {/* Price */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-brand-primary font-display font-black text-2xl">{pkg.priceLabel}</p>
                    <p className="text-text-muted text-xs font-ui">{pkg.priceNote}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary font-ui">
                    <Users size={13} className="text-brand-primary" aria-hidden="true" />
                    {pkg.maxGuests
                      ? `${pkg.minGuests}–${pkg.maxGuests} personas`
                      : `${pkg.minGuests}+ personas`
                    }
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary font-ui">
                    <Clock size={13} className="text-brand-primary" aria-hidden="true" />
                    {pkg.duration}
                  </span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-2 flex-1">
                  {pkg.features.map(feat => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-text-secondary">
                      <CheckCircle2 size={15} className="text-brand-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                  {pkg.notIncluded?.map(feat => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-text-muted">
                      <span className="w-[15px] h-[15px] flex-shrink-0 mt-0.5 text-text-muted text-xs flex items-center justify-center">–</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center justify-center gap-2.5 py-3.5 rounded-xl',
                    'font-ui font-bold text-sm transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2',
                    isHighlighted
                      ? 'bg-brand-primary hover:bg-brand-primary-dark text-white shadow-glow-green hover:shadow-none focus-visible:ring-offset-surface-elevated'
                      : 'border border-border-strong hover:border-brand-primary hover:text-brand-primary text-text-secondary focus-visible:ring-offset-surface-elevated'
                  )}
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  {pkg.cta.label}
                </a>
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}
