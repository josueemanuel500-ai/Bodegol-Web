/**
 * EventCard.jsx — Event / match card (Bodegol DS)
 * Props: event, whatsappNumber, featured
 */
import React from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Clock } from 'lucide-react'
import LazyImage from '@/components/ui/LazyImage'
import Badge from '@/components/ui/Badge'
import Button from '@/components/buttons/Button'
import { buildWhatsAppUrl, formatRelativeDate } from '@/utils/format'
import { cn } from '@/utils/cn'

export default function EventCard({ event, whatsappNumber, featured = false }) {
  const ctaHref = buildWhatsAppUrl(whatsappNumber, event.ctaMessage)
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-all duration-300 hover:border-primary/40 hover:shadow-card-lg',
        featured ? 'md:flex' : 'flex flex-col'
      )}
      aria-label={event.title}
    >
      <div className={cn('relative flex-shrink-0 overflow-hidden', featured ? 'md:w-72' : 'aspect-video')}>
        <LazyImage src={event.image} alt={event.imageAlt}
          className={cn('h-full w-full transition-transform duration-500 group-hover:scale-[1.07]', featured && 'min-h-[200px]')} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant="dark">{event.tag}</Badge>
          {event.soldOut && <Badge variant="error">Agotado</Badge>}
          {event.isFeatured && !event.soldOut && <Badge variant="primary">Destacado</Badge>}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-col gap-1">
          {event.subtitle && <p className="t-label text-primary">{event.subtitle}</p>}
          <h3 className="t-card-title">{event.title}</h3>
        </div>
        <div className="flex flex-wrap gap-4 text-content-muted text-xs font-ui">
          <span className="flex items-center gap-1.5"><CalendarDays size={14} strokeWidth={2} aria-hidden="true" />{formatRelativeDate(event.date)}</span>
          <span className="flex items-center gap-1.5"><Clock size={14} strokeWidth={2} aria-hidden="true" />{event.time} hrs</span>
        </div>
        <div className="mt-auto pt-2">
          <Button as="a" href={ctaHref} target="_blank" rel="noopener noreferrer"
            variant={event.soldOut ? 'ghost' : 'primary'} size="sm">
            {event.ctaLabel}
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
