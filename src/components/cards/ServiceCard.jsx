/**
 * ServiceCard.jsx — Feature / service card (Bodegol DS)
 * Props: service, variant ('default'|'highlight'|'compact'), animate
 */
import React from 'react'
import * as LucideIcons from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

function resolveIcon(name, size = 24) {
  const Icon = LucideIcons[name]
  return Icon ? <Icon size={size} strokeWidth={2} aria-hidden="true" /> : null
}

export default function ServiceCard({ service, variant = 'default', animate = true }) {
  const isHighlight = variant === 'highlight' || service.highlight
  const isCompact = variant === 'compact'

  const card = (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300',
        isCompact ? 'p-5 gap-3' : 'p-7 gap-5',
        isHighlight
          ? 'border-primary/40 text-white shadow-glow-primary'
          : 'border-line bg-surface shadow-card hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-lg'
      )}
      style={isHighlight ? { background: 'linear-gradient(150deg, var(--primary) 0%, var(--primary-hover) 100%)' } : undefined}
    >
      {/* Icon tile */}
      <div
        className={cn(
          'flex items-center justify-center flex-shrink-0 rounded-xl transition-all duration-300',
          isCompact ? 'h-11 w-11' : 'h-14 w-14',
          isHighlight
            ? 'bg-white/20 text-white'
            : 'bg-surface-elevated text-primary group-hover:scale-105'
        )}
        style={!isHighlight ? { boxShadow: 'inset 0 0 0 1px rgba(255,105,15,0.18)' } : undefined}
      >
        {resolveIcon(service.icon, isCompact ? 20 : 26)}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className={cn('t-card-title', isHighlight && 'text-white')}>{service.title}</h3>
        <p className={cn('t-card-body', isCompact && 'text-sm', isHighlight && 'text-white/85')}>
          {service.description}
        </p>
      </div>

      {service.highlight && (
        <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[0.6875rem] font-ui font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
          ★ Destacado
        </span>
      )}
    </article>
  )

  if (!animate) return card
  return <motion.div className="h-full" whileHover={{ y: isHighlight ? 0 : -4 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>{card}</motion.div>
}
