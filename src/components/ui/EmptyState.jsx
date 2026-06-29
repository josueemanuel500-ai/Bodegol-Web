/**
 * EmptyState.jsx — Empty, Error & Success State Components
 *
 * Shown when: no data found, network errors, form success, etc.
 *
 * Components:
 *   EmptyState    → generic "no content" state
 *   ErrorState    → "something went wrong" state with retry
 *   SuccessState  → "action completed" confirmation
 *
 * Usage:
 *   <EmptyState
 *     icon={Calendar}
 *     title="No hay eventos próximos"
 *     description="Vuelve pronto para ver las novedades."
 *     action={{ label: 'Contactar', onClick: () => {} }}
 *   />
 */

import React from 'react'
import { AlertCircle, CheckCircle2, Inbox } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/buttons/Button'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

function StateWrapper({ className, children }) {
  return (
    <motion.div
      variants={ANIMATION.SCALE_IN}
      initial="hidden"
      animate="visible"
      className={cn(
        'flex flex-col items-center justify-center text-center py-16 px-6',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────
export function EmptyState({
  icon: Icon  = Inbox,
  title       = 'No hay contenido',
  description = '',
  action,
  className   = '',
}) {
  return (
    <StateWrapper className={className}>
      <div className="w-16 h-16 rounded-2xl bg-surface-elevated flex items-center justify-center mb-4">
        <Icon size={28} className="text-text-muted" aria-hidden="true" />
      </div>
      <h3 className="font-display font-bold text-text-primary text-lg mb-2">{title}</h3>
      {description && (
        <p className="text-text-muted text-sm max-w-xs leading-relaxed mb-6">{description}</p>
      )}
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick} as={action.href ? 'a' : 'button'} href={action.href}>
          {action.label}
        </Button>
      )}
    </StateWrapper>
  )
}

// ─── Error State ──────────────────────────────────────────────────────────
export function ErrorState({
  title       = 'Algo salió mal',
  description = 'No pudimos cargar el contenido. Intenta de nuevo.',
  onRetry,
  className   = '',
}) {
  return (
    <StateWrapper className={className}>
      <div className="w-16 h-16 rounded-2xl bg-status-error/10 flex items-center justify-center mb-4">
        <AlertCircle size={28} className="text-status-error" aria-hidden="true" />
      </div>
      <h3 className="font-display font-bold text-text-primary text-lg mb-2">{title}</h3>
      <p className="text-text-muted text-sm max-w-xs leading-relaxed mb-6">{description}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Intentar de nuevo
        </Button>
      )}
    </StateWrapper>
  )
}

// ─── Success State ────────────────────────────────────────────────────────
export function SuccessState({
  icon: Icon  = CheckCircle2,
  title       = '¡Listo!',
  description = '',
  action,
  className   = '',
}) {
  return (
    <StateWrapper className={className}>
      <div className="w-16 h-16 rounded-2xl bg-status-success/10 flex items-center justify-center mb-4">
        <Icon size={28} className="text-status-success" aria-hidden="true" />
      </div>
      <h3 className="font-display font-bold text-text-primary text-xl mb-2">{title}</h3>
      {description && (
        <p className="text-text-secondary text-sm max-w-xs leading-relaxed mb-6">{description}</p>
      )}
      {action && (
        <Button variant="primary" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </StateWrapper>
  )
}

export default EmptyState
