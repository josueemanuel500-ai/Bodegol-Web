/**
 * Badge.jsx — Badge / Chip Component
 *
 * Small inline label for categories, statuses, tags, and highlights.
 *
 * Props:
 *   variant   'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline'
 *   size      'sm' | 'md'
 *   icon      Lucide icon component (optional, left side)
 *   dot       boolean — show a colored dot instead of text (status indicator)
 *   children  label text
 *
 * Example:
 *   <Badge variant="success" icon={CheckCircle}>Confirmado</Badge>
 *   <Badge variant="warning">Agotado</Badge>
 *   <Badge dot variant="primary" />
 */

import React from 'react'
import { cn } from '@/utils/cn'

const VARIANTS = {
  default: 'bg-surface-elevated text-text-secondary border border-border-default',
  primary: 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20',
  success: 'bg-status-success/10 text-status-success border border-status-success/20',
  warning: 'bg-status-warning/10 text-status-warning border border-status-warning/20',
  error:   'bg-status-error/10 text-status-error border border-status-error/20',
  outline: 'bg-transparent text-text-primary border border-border-strong',
  dark:    'bg-brand-secondary text-white border border-brand-secondary',
}

const DOT_COLORS = {
  default: 'bg-text-muted',
  primary: 'bg-brand-primary',
  success: 'bg-status-success',
  warning: 'bg-status-warning',
  error:   'bg-status-error',
  outline: 'bg-text-primary',
  dark:    'bg-white',
}

const SIZES = {
  sm: 'text-xs px-2 py-0.5 gap-1',
  md: 'text-xs px-2.5 py-1 gap-1.5',
}

export default function Badge({
  variant  = 'default',
  size     = 'md',
  icon: Icon = null,
  dot      = false,
  children,
  className = '',
}) {
  const variantClass = VARIANTS[variant] || VARIANTS.default
  const sizeClass    = SIZES[size]       || SIZES.md

  if (dot) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 font-ui font-semibold rounded-full',
          sizeClass, variantClass, className
        )}
        role="status"
      >
        <span
          className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', DOT_COLORS[variant])}
          aria-hidden="true"
        />
        {children}
      </span>
    )
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-ui font-semibold rounded-full',
        sizeClass, variantClass, className
      )}
    >
      {Icon && <Icon size={10} className="flex-shrink-0" aria-hidden="true" />}
      {children}
    </span>
  )
}
