/**
 * Highlights.jsx — Social proof strip & key selling points
 * Quick visual summary of what makes Bodegol special.
 * Content is inline here (short, static) but can be moved to data/ if needed.
 */

import React from 'react'
import { motion } from 'framer-motion'
import { Goal, Tv2, UtensilsCrossed, PartyPopper, MapPin, Clock } from 'lucide-react'
import { useBusiness } from '@/context/BusinessContext'
import { ANIMATION } from '@/constants'

const highlights = [
  {
    icon:  Goal,
    title: '6 Canchas',
    desc:  'Fútbol 7 con pasto sintético de alta calidad',
  },
  {
    icon:  Tv2,
    title: 'Pantallas Gigantes',
    desc:  'Transmisiones en vivo de todos los partidos',
  },
  {
    icon:  UtensilsCrossed,
    title: 'Comida & Bar',
    desc:  'Alitas, hambas, cervezas frías y más',
  },
  {
    icon:  PartyPopper,
    title: 'Eventos & Fiestas',
    desc:  'Cumpleaños, despedidas y corporativos',
  },
]

export default function Highlights() {
  const { business } = useBusiness()

  return (
    <section
      id="highlights"
      className="bg-surface-elevated border-y border-border-default"
      aria-label="Lo que nos hace diferentes"
    >
      <div className="site-container py-12">
        <motion.div
          variants={ANIMATION.STAGGER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {highlights.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={ANIMATION.FADE_UP}
              className="flex flex-col items-center text-center gap-3 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary/20 transition-colors duration-200">
                <Icon size={26} className="text-brand-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display font-bold text-text-primary text-base mb-0.5">{title}</h3>
                <p className="text-text-muted text-sm leading-snug">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Location + Hours strip */}
        <div className="mt-10 pt-8 border-t border-border-default flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center sm:justify-between">
          <a
            href={business.location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors text-sm font-ui"
          >
            <MapPin size={16} className="text-brand-primary flex-shrink-0" aria-hidden="true" />
            {business.location.address}, {business.location.city}
          </a>
          <div className="flex items-start gap-2 text-sm font-ui text-text-secondary">
            <Clock size={16} className="text-brand-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {business.hours.map(h => (
                <span key={h.days}>
                  <span className="text-text-muted">{h.days}: </span>
                  <span className="text-text-primary font-medium">{h.time}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
