/**
 * EmptyState.jsx — Empty / Error / Success states (Bodegol DS)
 * Exports: EmptyState (default + named), ErrorState, SuccessState
 */
import React from 'react'
import { AlertCircle, CheckCircle2, Inbox } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/buttons/Button'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

function StateWrapper({ className, children }) {
  return (
    <motion.div variants={ANIMATION.SCALE_IN} initial="hidden" animate="visible"
      className={cn('flex flex-col items-center justify-center px-6 py-16 text-center', className)}>
      {children}
    </motion.div>
  )
}

function IconTile({ children, tone = 'muted' }) {
  const bg = {
    muted: 'bg-surface-elevated text-content-muted',
    error: 'bg-danger/12 text-danger',
    success: 'bg-success/12 text-success',
  }[tone]
  return <div className={cn('mb-5 flex h-16 w-16 items-center justify-center rounded-2xl', bg)}>{children}</div>
}

export function EmptyState({ icon: Icon = Inbox, title = 'No hay contenido', description = '', action, className = '' }) {
  return (
    <StateWrapper className={className}>
      <IconTile tone="muted"><Icon size={28} strokeWidth={2} aria-hidden="true" /></IconTile>
      <h3 className="t-card-title mb-2">{title}</h3>
      {description && <p className="mb-6 max-w-xs text-sm leading-relaxed text-content-muted">{description}</p>}
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick} as={action.href ? 'a' : 'button'} href={action.href}>
          {action.label}
        </Button>
      )}
    </StateWrapper>
  )
}

export function ErrorState({ title = 'Algo salió mal', description = 'No pudimos cargar el contenido. Intenta de nuevo.', onRetry, className = '' }) {
  return (
    <StateWrapper className={className}>
      <IconTile tone="error"><AlertCircle size={28} strokeWidth={2} aria-hidden="true" /></IconTile>
      <h3 className="t-card-title mb-2">{title}</h3>
      <p className="mb-6 max-w-xs text-sm leading-relaxed text-content-muted">{description}</p>
      {onRetry && <Button variant="outline" size="sm" onClick={onRetry}>Intentar de nuevo</Button>}
    </StateWrapper>
  )
}

export function SuccessState({ icon: Icon = CheckCircle2, title = '¡Listo!', description = '', action, className = '' }) {
  return (
    <StateWrapper className={className}>
      <IconTile tone="success"><Icon size={28} strokeWidth={2} aria-hidden="true" /></IconTile>
      <h3 className="t-card-title mb-2">{title}</h3>
      {description && <p className="mb-6 max-w-xs text-sm leading-relaxed text-content-secondary">{description}</p>}
      {action && <Button variant="primary" size="sm" onClick={action.onClick}>{action.label}</Button>}
    </StateWrapper>
  )
}

export default EmptyState
