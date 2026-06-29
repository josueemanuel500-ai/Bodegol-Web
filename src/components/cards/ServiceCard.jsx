/**
 * ServiceCard.jsx — Service Card
 *
 * Reusable card for displaying a service with icon, title, and description.
 * Used in the Services section and potentially in package details.
 *
 * Props:
 *   service   Object from services.js data file
 *   variant   'default' | 'highlight' | 'compact'
 *   animate   boolean — enable hover animation
 */

import React from 'react'
import * as LucideIcons from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

function resolveIcon(name, size = 24) {
  const Icon = LucideIcons[name]
  return Icon ? <Icon size={size} aria-hidden="true" /> : null
}

export default function ServiceCard({
  service,
  variant = 'default',
  animate = true,
}) {
  const isHighlight = variant === 'highlight' || service.highlight
  const isCompact   = variant === 'compact'

  const card = (
    <article
      className={cn(
        'relative flex flex-col rounded-2xl border transition-all duration-250',
        isCompact ? 'p-4 gap-3' : 'p-6 gap-4',
        isHighlight
          ? 'bg-brand-primary border-brand-primary text-white'
          : 'bg-surface-base border-border-default hover:shadow-card-lg hover:border-brand-primary/30 shadow-card',
        animate && 'group cursor-default'
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          'rounded-xl flex items-center justify-center flex-shrink-0',
          isCompact ? 'w-10 h-10' : 'w-12 h-12',
          isHighlight
            ? 'bg-white/20 text-white'
            : 'bg-surface-elevated text-brand-primary group-hover:bg-brand-primary/10'
        )}
      >
        {resolveIcon(service.icon, isCompact ? 20 : 24)}
      </div>

      {/* Content */}
      <div>
        <h3 className={cn(
          'font-display font-bold mb-1.5',
          isCompact ? 'text-base' : 'text-lg',
          isHighlight ? 'text-white' : 'text-text-primary'
        )}>
          {service.title}
        </h3>
        <p className={cn(
          'leading-relaxed',
          isCompact ? 'text-xs' : 'text-sm',
          isHighlight ? 'text-white/85' : 'text-text-secondary'
        )}>
          {service.description}
        </p>
      </div>

      {/* Highlight badge */}
      {service.highlight && (
        <span
          className="absolute -top-3 left-5 bg-brand-accent text-white text-xs font-semibold px-3 py-1 rounded-full"
          aria-label="Servicio destacado"
        >
          ★ Destacado
        </span>
      )}
    </article>
  )

  if (!animate) return card

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {card}
    </motion.div>
  )
}
