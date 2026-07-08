/**
 * Divider.jsx — Horizontal rule (Bodegol DS)
 * variant: line | gradient | glow ·  optional centered label
 */
import React from 'react'
import { cn } from '@/utils/cn'

export default function Divider({ variant = 'line', label, className = '' }) {
  const lineClass = {
    line:     'bg-line',
    gradient: 'bg-gradient-to-r from-transparent via-line-strong to-transparent',
    glow:     'bg-gradient-to-r from-transparent via-primary to-transparent',
  }[variant] || 'bg-line'

  if (label) {
    return (
      <div className={cn('flex items-center gap-4', className)} role="separator" aria-label={label}>
        <span className={cn('h-px flex-1', lineClass)} />
        <span className="t-label text-content-muted">{label}</span>
        <span className={cn('h-px flex-1', lineClass)} />
      </div>
    )
  }
  return <hr className={cn('h-px border-0', lineClass, className)} />
}
