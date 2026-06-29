/**
 * Services.jsx — Services Section
 *
 * Reads from src/data/services.js.
 * Renders a responsive card grid.
 * Icon names are resolved to Lucide components via iconMap.
 */

import React from 'react'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { services }      from '@/data/services'
import SectionWrapper    from '@/components/ui/SectionWrapper'
import SectionHeading    from '@/components/ui/SectionHeading'
import { SECTION_IDS, ANIMATION } from '@/constants'

// Resolve icon name string → Lucide component
function resolveIcon(name, size = 28) {
  const Icon = LucideIcons[name]
  return Icon ? <Icon size={size} aria-hidden="true" /> : null
}

export default function Services() {
  return (
    <SectionWrapper id={SECTION_IDS.SERVICES} background="elevated">
      <SectionHeading
        id={`${SECTION_IDS.SERVICES}-heading`}
        eyebrow="Lo Que Ofrecemos"
        title="Todo lo que necesitas en un solo lugar"
        subtitle="Diseñamos cada detalle para que tu visita sea perfecta, desde la primera pantalla hasta el último bocado."
      />

      <motion.div
        variants={ANIMATION.STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
      >
        {services.map((service) => (
          <motion.article
            key={service.id}
            variants={ANIMATION.FADE_UP}
            role="listitem"
            className={[
              'relative flex flex-col gap-4 p-6 rounded-2xl border transition-shadow duration-250',
              'hover:shadow-card-lg cursor-default',
              service.highlight
                ? 'bg-brand-primary text-white border-brand-primary shadow-glow'
                : 'bg-surface-base border-border-default shadow-card',
            ].join(' ')}
          >
            {/* Icon */}
            <div
              className={[
                'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                service.highlight
                  ? 'bg-white/20 text-white'
                  : 'bg-surface-elevated text-brand-primary',
              ].join(' ')}
              aria-hidden="true"
            >
              {resolveIcon(service.icon)}
            </div>

            {/* Content */}
            <div>
              <h3 className={[
                'font-display font-bold text-lg mb-2',
                service.highlight ? 'text-white' : 'text-text-primary',
              ].join(' ')}>
                {service.title}
              </h3>
              <p className={[
                'leading-relaxed text-sm',
                service.highlight ? 'text-white/85' : 'text-text-secondary',
              ].join(' ')}>
                {service.description}
              </p>
            </div>

            {/* Highlight badge */}
            {service.highlight && (
              <span
                className="absolute -top-3 left-6 bg-brand-accent text-white text-xs font-semibold px-3 py-1 rounded-full"
                aria-label="Destacado"
              >
                ★ Destacado
              </span>
            )}
          </motion.article>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
