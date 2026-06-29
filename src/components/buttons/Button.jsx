/**
 * Button.jsx — Design System Button
 *
 * Polymorphic: renders as <button>, <a>, or any component via `as` prop.
 *
 * Props:
 *   variant      'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
 *   size         'sm' | 'md' | 'lg'
 *   icon         Lucide component — left icon
 *   iconPosition 'left' | 'right'
 *   loading      boolean — shows spinner
 *   fullWidth    boolean
 *   as           tag or component (default 'button')
 *   children     label
 */

import React from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

const VARIANTS = {
  primary:   'bg-brand-primary hover:bg-brand-primary-dark text-white shadow-glow-green hover:shadow-none focus-visible:ring-brand-primary',
  secondary: 'bg-surface-elevated hover:bg-surface-raised text-text-primary border border-border-strong hover:border-border-default focus-visible:ring-brand-primary',
  outline:   'border border-border-strong hover:border-brand-primary text-text-primary hover:text-brand-primary hover:bg-brand-primary/5 focus-visible:ring-brand-primary',
  ghost:     'text-text-secondary hover:text-text-primary hover:bg-surface-elevated focus-visible:ring-brand-primary',
  danger:    'bg-status-error hover:bg-red-700 text-white focus-visible:ring-status-error',
}

const SIZES = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
}

const ICON_SIZES = { sm: 13, md: 15, lg: 18 }

export default function Button({
  variant      = 'primary',
  size         = 'md',
  icon: Icon   = null,
  iconPosition = 'left',
  loading      = false,
  fullWidth    = false,
  as: Tag      = 'button',
  children,
  className    = '',
  disabled,
  ...rest
}) {
  const isDisabled = disabled || loading

  const classes = cn(
    'inline-flex items-center justify-center font-ui font-semibold rounded-xl',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base',
    isDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    fullWidth ? 'w-full' : '',
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] || SIZES.md,
    className
  )

  const iconSize = ICON_SIZES[size] || 15

  const renderIcon = (pos) => {
    if (loading && pos === 'left') return <Loader2 size={iconSize} className="animate-spin" aria-hidden="true" />
    if (Icon && iconPosition === pos && !(loading && pos === 'left')) return <Icon size={iconSize} aria-hidden="true" />
    return null
  }

  return (
    <motion.div
      className={cn('inline-flex', fullWidth && 'w-full')}
      whileTap={{ scale: isDisabled ? 1 : 0.97 }}
    >
      <Tag
        className={classes}
        disabled={Tag === 'button' ? isDisabled : undefined}
        aria-disabled={isDisabled}
        {...rest}
      >
        {renderIcon('left')}
        {children && <span>{children}</span>}
        {renderIcon('right')}
      </Tag>
    </motion.div>
  )
}
