/**
 * Badge.jsx — Status / category label (Bodegol DS)
 * variant: default | primary | success | warning | error | outline | dark | glass
 * size: sm | md ·  dot: status-dot mode · icon: leading Lucide icon
 */
import React from 'react'
import { cn } from '@/utils/cn'

const VARIANTS = {
  default: 'bg-surface-elevated text-content-secondary border border-line',
  primary: 'bg-primary/12 text-primary border border-primary/30',
  success: 'bg-success/12 text-success border border-success/30',
  warning: 'bg-warning/12 text-warning border border-warning/30',
  error:   'bg-danger/12 text-danger border border-danger/30',
  outline: 'bg-transparent text-content-primary border border-line-strong',
  dark:    'bg-background/70 text-white border border-white/15 backdrop-blur-md',
  glass:   'bg-white/10 text-white border border-white/20 backdrop-blur-md',
}
const DOT = {
  default: 'bg-content-muted', primary: 'bg-primary', success: 'bg-success',
  warning: 'bg-warning', error: 'bg-danger', outline: 'bg-content-primary',
  dark: 'bg-primary', glass: 'bg-white',
}
const SIZES = { sm: 'text-[0.6875rem] px-2 py-0.5 gap-1', md: 'text-xs px-2.5 py-1 gap-1.5' }

export default function Badge({
  variant = 'default', size = 'md', icon: Icon = null, dot = false, children, className = '',
}) {
  return (
    <span className={cn(
      'inline-flex items-center font-ui font-semibold uppercase tracking-[0.06em] rounded-full whitespace-nowrap',
      SIZES[size] || SIZES.md, VARIANTS[variant] || VARIANTS.default, className
    )}
    {...(dot ? { role: 'status' } : {})}>
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full flex-shrink-0', DOT[variant])} aria-hidden="true" />}
      {Icon && <Icon size={12} strokeWidth={2.25} className="flex-shrink-0" aria-hidden="true" />}
      {children}
    </span>
  )
}
