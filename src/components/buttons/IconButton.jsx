/**
 * IconButton.jsx — Square icon-only button (Bodegol DS)
 * Variants: solid | glass | ghost | outline. `label` is required for a11y.
 */
import React from 'react'
import { cn } from '@/utils/cn'

const VARIANTS = {
  solid:   'bg-primary text-white shadow-glow-primary hover:bg-primary-hover focus-visible:ring-primary',
  glass:   'bg-white/10 text-white backdrop-blur-md border border-white/15 hover:bg-white/20 focus-visible:ring-white',
  ghost:   'bg-transparent text-content-secondary hover:text-content-primary hover:bg-surface-elevated focus-visible:ring-primary',
  outline: 'bg-transparent text-content-primary border border-line-strong hover:border-primary hover:text-primary focus-visible:ring-primary',
}
const SIZES = { sm: 'h-9 w-9 rounded-lg', md: 'h-11 w-11 rounded-xl', lg: 'h-12 w-12 rounded-xl' }
const ICON = { sm: 16, md: 18, lg: 20 }

export default function IconButton({
  icon: Icon, label, variant = 'glass', size = 'md',
  as: Tag = 'button', className = '', ...rest
}) {
  return (
    <Tag
      aria-label={label}
      className={cn(
        'inline-flex items-center justify-center transition-all duration-300 ease-out',
        'hover:-translate-y-0.5 active:translate-y-0',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        VARIANTS[variant] || VARIANTS.glass, SIZES[size] || SIZES.md, className
      )}
      {...rest}
    >
      {Icon && <Icon size={ICON[size] || 18} strokeWidth={2} aria-hidden="true" />}
    </Tag>
  )
}
