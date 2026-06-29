/**
 * PromoCard.jsx — Promotion card (Bodegol DS)
 * Props: promotion, whatsappNumber
 */
import React from 'react'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { Clock } from 'lucide-react'
import LazyImage from '@/components/ui/LazyImage'
import Badge from '@/components/ui/Badge'
import Button from '@/components/buttons/Button'
import { buildWhatsAppUrl } from '@/utils/format'

function resolveIcon(name) { return LucideIcons[name] || LucideIcons.ArrowRight }

export default function PromoCard({ promotion, whatsappNumber }) {
  const ctaHref = promotion.cta.whatsapp
    ? buildWhatsAppUrl(whatsappNumber, promotion.cta.whatsappMessage)
    : promotion.cta.href
  const ctaTarget = promotion.cta.whatsapp ? '_blank' : undefined
  const ctaRel = promotion.cta.whatsapp ? 'noopener noreferrer' : undefined
  const CtaIcon = resolveIcon(promotion.cta.icon)

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300 hover:border-primary/40 hover:shadow-card-lg"
    >
      <div className="relative overflow-hidden">
        <LazyImage src={promotion.image} alt={promotion.imageAlt} aspectRatio="landscape"
          className="transition-transform duration-500 group-hover:scale-[1.07]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <div className="absolute left-3 top-3"><Badge variant="dark">{promotion.tag}</Badge></div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="t-card-title">{promotion.title}</h3>
        <p className="t-card-body flex-1 text-sm">{promotion.description}</p>
        {promotion.schedule && (
          <div className="flex items-center gap-1.5 text-content-muted text-xs font-ui">
            <Clock size={14} strokeWidth={2} aria-hidden="true" />
            <span>{promotion.schedule}</span>
          </div>
        )}
        <Button as="a" href={ctaHref} target={ctaTarget} rel={ctaRel}
          variant="outline" size="sm" icon={CtaIcon} iconPosition="right" className="mt-1 self-start">
          {promotion.cta.label}
        </Button>
      </div>
    </motion.article>
  )
}
