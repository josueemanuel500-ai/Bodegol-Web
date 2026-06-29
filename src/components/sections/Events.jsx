/**
 * Events.jsx — Upcoming Events & Live Matches Section
 * Shows featured event prominently + secondary events in a grid.
 * All content from src/data/events.js
 * CTAs open WhatsApp with prefilled messages.
 */

import React from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Clock, MessageCircle, AlertCircle } from 'lucide-react'
import { upcomingEvents, eventsHeading } from '@/data/events'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl, formatRelativeDate } from '@/utils/format'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import LazyImage from '@/components/ui/LazyImage'
import Badge from '@/components/ui/Badge'
import { ANIMATION, SECTION_IDS } from '@/constants'
import { cn } from '@/utils/cn'

function EventCardFeatured({ event, whatsappNumber }) {
  const waUrl = buildWhatsAppUrl(whatsappNumber, event.ctaMessage)

  return (
    <div className="group grid md:grid-cols-2 rounded-2xl overflow-hidden border border-border-default bg-surface-elevated hover:border-brand-primary/40 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-video md:aspect-auto overflow-hidden">
        <LazyImage
          src={event.image}
          alt={event.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface-elevated/60 md:block hidden" />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="primary">{event.tag}</Badge>
          <Badge variant="warning">⭐ Destacado</Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col justify-between gap-5">
        <div className="flex flex-col gap-3">
          <p className="text-text-muted text-sm font-ui">{event.subtitle}</p>
          <h3 className="font-display font-black text-2xl md:text-3xl text-text-primary leading-tight">
            {event.title}
          </h3>

          <div className="flex flex-wrap gap-4 text-sm font-ui">
            <span className="flex items-center gap-1.5 text-text-secondary">
              <CalendarDays size={15} className="text-brand-primary" aria-hidden="true" />
              {formatRelativeDate(event.date)}
            </span>
            <span className="flex items-center gap-1.5 text-text-secondary">
              <Clock size={15} className="text-brand-primary" aria-hidden="true" />
              {event.time} hrs
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {!event.soldOut ? (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl',
                'bg-brand-primary hover:bg-brand-primary-dark text-white',
                'font-ui font-bold text-sm transition-all duration-200 shadow-glow-green hover:shadow-none',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated'
              )}
            >
              <MessageCircle size={17} aria-hidden="true" />
              {event.ctaLabel}
            </a>
          ) : (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-surface-raised text-text-muted text-sm font-ui">
              <AlertCircle size={16} className="text-status-warning flex-shrink-0" />
              Evento agotado — Escríbenos para lista de espera
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function EventCardSmall({ event, whatsappNumber }) {
  const waUrl = buildWhatsAppUrl(whatsappNumber, event.ctaMessage)

  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden border border-border-default bg-surface-elevated hover:border-brand-primary/40 transition-all duration-200 hover:shadow-card-lg">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <LazyImage
          src={event.image}
          alt={event.imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge variant="dark" size="sm">{event.tag}</Badge>
          {event.soldOut && <Badge variant="error" size="sm">Agotado</Badge>}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <p className="text-text-muted text-xs font-ui mb-1">{event.subtitle}</p>
          <h3 className="font-display font-bold text-text-primary text-base leading-snug">
            {event.title}
          </h3>
        </div>

        <div className="flex items-center gap-3 text-xs text-text-muted font-ui">
          <span className="flex items-center gap-1">
            <CalendarDays size={12} className="text-brand-primary" />
            {formatRelativeDate(event.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-brand-primary" />
            {event.time}
          </span>
        </div>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'mt-auto flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-ui font-semibold transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
            event.soldOut
              ? 'bg-surface-raised text-text-muted cursor-default pointer-events-none'
              : 'bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white border border-brand-primary/30 hover:border-brand-primary'
          )}
          aria-disabled={event.soldOut}
        >
          <MessageCircle size={14} aria-hidden="true" />
          {event.ctaLabel}
        </a>
      </div>
    </article>
  )
}

export default function Events() {
  const { business } = useBusiness()
  const featured = upcomingEvents.find(e => e.isFeatured)
  const others   = upcomingEvents.filter(e => !e.isFeatured)

  if (upcomingEvents.length === 0) return null

  return (
    <SectionWrapper id={SECTION_IDS.EVENTS} background="base">
      <SectionHeading
        id="events-heading"
        eyebrow={eventsHeading.eyebrow}
        title={eventsHeading.title}
        subtitle={eventsHeading.subtitle}
      />

      <div className="flex flex-col gap-6">
        {/* Featured */}
        {featured && (
          <motion.div
            variants={ANIMATION.FADE_UP}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <EventCardFeatured event={featured} whatsappNumber={business.contact.whatsapp} />
          </motion.div>
        )}

        {/* Grid */}
        {others.length > 0 && (
          <motion.div
            variants={ANIMATION.STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {others.map(event => (
              <motion.div key={event.id} variants={ANIMATION.FADE_UP}>
                <EventCardSmall event={event} whatsappNumber={business.contact.whatsapp} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  )
}
