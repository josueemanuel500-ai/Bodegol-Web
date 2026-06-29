/**
 * PromoCard.jsx — Promotion Card
 *
 * Displays a promotion with image, tag, title, description, schedule, and CTA.
 * Used in the Promotions section.
 *
 * Props:
 *   promotion   Object from promotions.js
 *   whatsappNumber string — from business.contact.whatsapp
 */

import React from 'react'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { Clock } from 'lucide-react'
import LazyImage from '@/components/ui/LazyImage'
import Badge    from '@/components/ui/Badge'
import Button   from '@/components/buttons/Button'
import { buildWhatsAppUrl } from '@/utils/format'
import { cn } from '@/utils/cn'

function resolveIcon(name) {
  const Icon = LucideIcons[name]
  return Icon || LucideIcons.ArrowRight
}

export default function PromoCard({ promotion, whatsappNumber }) {
  const ctaHref = promotion.cta.whatsapp
    ? buildWhatsAppUrl(whatsappNumber, promotion.cta.whatsappMessage)
    : promotion.cta.href

  const ctaTarget = promotion.cta.whatsapp ? '_blank' : undefined
  const ctaRel    = promotion.cta.whatsapp ? 'noopener noreferrer' : undefined
  const CtaIcon   = resolveIcon(promotion.cta.icon)

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col rounded-2xl border border-border-default bg-surface-base shadow-card overflow-hidden hover:shadow-card-lg transition-shadow"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <LazyImage
          src={promotion.image}
          alt={promotion.imageAlt}
          aspectRatio="landscape"
          className="group-hover:scale-105 transition-transform duration-400"
        />
        {/* Tag badge overlay */}
        <div className="absolute top-3 left-3">
          <Badge variant="dark">{promotion.tag}</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-display font-bold text-text-primary text-lg leading-tight">
          {promotion.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed flex-1">
          {promotion.description}
        </p>

        {/* Schedule */}
        {promotion.schedule && (
          <div className="flex items-center gap-1.5 text-text-muted text-xs font-ui">
            <Clock size={12} aria-hidden="true" />
            <span>{promotion.schedule}</span>
          </div>
        )}

        {/* CTA */}
        <Button
          as="a"
          href={ctaHref}
          target={ctaTarget}
          rel={ctaRel}
          variant="outline"
          size="sm"
          icon={CtaIcon}
          iconPosition="right"
          className="mt-1 self-start"
        >
          {promotion.cta.label}
        </Button>
      </div>
    </motion.article>
  )
}
