/**
 * Button.jsx — Bodegol Design System Button
 *
 * Polymorphic (button | a | any via `as`). Premium states: soft shadow,
 * orange glow on primary, subtle hover lift, smooth 300ms transitions.
 *
 * Props: variant ('primary'|'secondary'|'outline'|'ghost'|'danger'),
 *        size ('sm'|'md'|'lg'|'xl'), icon, iconPosition, loading, fullWidth, as
 */
import React from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

const VARIANTS = {
  primary:
    'bg-primary text-white shadow-glow-primary hover:bg-primary-hover hover:shadow-glow-accent focus-visible:ring-primary',
  secondary:
    'bg-transparent text-white border border-white/35 hover:border-primary hover:text-primary hover:bg-primary/10 focus-visible:ring-primary',
  outline:
    'bg-transparent text-content-primary border border-line-strong hover:border-primary hover:text-primary hover:bg-primary/10 focus-visible:ring-primary',
  ghost:
    'bg-transparent text-content-secondary hover:text-content-primary hover:bg-surface-elevated focus-visible:ring-primary',
  danger:
    'bg-danger text-white hover:bg-danger/90 focus-visible:ring-danger',
}

const SIZES = {
  sm: 'px-4 py-2 text-[0.8125rem] gap-1.5 rounded-lg',
  md: 'px-5 py-2.5 text-sm gap-2 rounded-xl',
  lg: 'px-7 py-3.5 text-base gap-2.5 rounded-xl',
  xl: 'px-9 py-4 text-base gap-3 rounded-2xl',
}
const ICON_SIZES = { sm: 15, md: 17, lg: 19, xl: 20 }

export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon = null,
  iconPosition = 'left',
  loading = false,
  fullWidth = false,
  as: Tag = 'button',
  children,
  className = '',
  disabled,
  ...rest
}) {
  const isDisabled = disabled || loading
  const classes = cn(
    'group/btn relative inline-flex items-center justify-center font-ui font-semibold tracking-[0.01em]',
    'transition-all duration-300 ease-out will-change-transform',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    !isDisabled && 'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
    isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    fullWidth && 'w-full',
    VARIANTS[variant] || VARIANTS.primary,
    SIZES[size] || SIZES.md,
    className
  )
  const iconSize = ICON_SIZES[size] || 17
  const renderIcon = (pos) => {
    if (loading && pos === 'left') return <Loader2 size={iconSize} className="animate-spin" aria-hidden="true" />
    if (Icon && iconPosition === pos && !(loading && pos === 'left')) {
      return <Icon size={iconSize} strokeWidth={2} aria-hidden="true"
        className={cn('transition-transform duration-300', pos === 'right' && 'group-hover/btn:translate-x-0.5')} />
    }
    return null
  }
  return (
    <Tag
      type={Tag === 'button' ? (rest.type || 'button') : undefined}
      className={classes}
      disabled={Tag === 'button' ? isDisabled : undefined}
      aria-disabled={isDisabled}
      {...rest}
    >
      {renderIcon('left')}
      {children && <span>{children}</span>}
      {renderIcon('right')}
    </Tag>
  )
}
