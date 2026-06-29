/**
 * EventCard.jsx — Event Card
 *
 * Displays an upcoming event or live match.
 * Used in the Events section.
 *
 * Props:
 *   event           Object from events.js
 *   whatsappNumber  string
 *   featured        boolean — renders a larger, horizontal layout
 */

import React from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Clock, Users } from 'lucide-react'
import LazyImage from '@/components/ui/LazyImage'
import Badge    from '@/components/ui/Badge'
import Button   from '@/components/buttons/Button'
import { buildWhatsAppUrl, formatRelativeDate } from '@/utils/format'
import { cn } from '@/utils/cn'

export default function EventCard({ event, whatsappNumber, featured = false }) {
  const ctaHref = buildWhatsAppUrl(whatsappNumber, event.ctaMessage)

  return (
    <motion.article
      whileHover={featured ? { y: -4 } : { y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group rounded-2xl border border-border-default bg-surface-base overflow-hidden',
        'hover:shadow-card-lg transition-all shadow-card',
        featured ? 'md:flex' : 'flex flex-col'
      )}
      aria-label={event.title}
    >
      {/* Image */}
      <div className={cn(
        'relative overflow-hidden flex-shrink-0',
        featured ? 'md:w-64' : 'aspect-video'
      )}>
        <LazyImage
          src={event.image}
          alt={event.imageAlt}
          className={cn(
            'w-full h-full group-hover:scale-105 transition-transform duration-400',
            featured ? 'h-full min-h-[180px]' : ''
          )}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="dark">{event.tag}</Badge>
          {event.soldOut && <Badge variant="error">Agotado</Badge>}
          {event.isFeatured && !event.soldOut && <Badge variant="primary">Destacado</Badge>}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-text-muted text-xs font-ui">{event.subtitle}</p>
          <h3 className="font-display font-bold text-text-primary text-lg leading-snug">
            {event.title}
          </h3>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 text-text-muted text-xs font-ui">
          <span className="flex items-center gap-1">
            <CalendarDays size={12} aria-hidden="true" />
            {formatRelativeDate(event.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} aria-hidden="true" />
            {event.time} hrs
          </span>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-2">
          {event.soldOut ? (
            <Button
              as="a"
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
            >
              {event.ctaLabel}
            </Button>
          ) : (
            <Button
              as="a"
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="sm"
            >
              {event.ctaLabel}
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  )
}
