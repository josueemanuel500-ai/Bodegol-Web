/**
 * Chip.jsx — Interactive pill (filters / selectable tags) — Bodegol DS
 * Props: selected, onClick, icon, onRemove, as
 */
import React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

export default function Chip({
  children, selected = false, onClick, icon: Icon = null, onRemove,
  as: Tag = 'button', className = '', ...rest
}) {
  return (
    <Tag
      onClick={onClick}
      aria-pressed={onClick ? selected : undefined}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-ui text-sm font-medium',
        'transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        selected
          ? 'bg-primary text-white shadow-glow-primary border border-primary'
          : 'bg-surface-elevated text-content-secondary border border-line hover:border-primary/50 hover:text-content-primary',
        className
      )}
      {...rest}
    >
      {Icon && <Icon size={15} strokeWidth={2} aria-hidden="true" />}
      {children}
      {onRemove && (
        <span role="button" tabIndex={0} aria-label="Quitar"
          onClick={(e) => { e.stopPropagation(); onRemove() }}
          className="ml-0.5 -mr-1 rounded-full p-0.5 hover:bg-white/20">
          <X size={13} aria-hidden="true" />
        </span>
      )}
    </Tag>
  )
}
