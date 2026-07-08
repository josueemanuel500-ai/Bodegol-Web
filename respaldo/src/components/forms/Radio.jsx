/**
 * Radio.jsx — Bodegol DS radio (forwardRef)
 * Custom orange dot, large touch target, accessible.
 */
import React, { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Radio = forwardRef(function Radio({
  id, name, value, label, checked, disabled = false, className = '', ...rest
}, ref) {
  return (
    <label htmlFor={id}
      className={cn('group inline-flex items-center gap-3 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed', className)}>
      <span className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center">
        <input ref={ref} id={id} type="radio" name={name} value={value} checked={checked} disabled={disabled}
          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full
                     border border-line bg-surface-elevated transition-all duration-200
                     checked:border-primary
                     focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
          {...rest} />
        <span className="pointer-events-none h-2.5 w-2.5 rounded-full bg-primary opacity-0 transition-opacity duration-200 peer-checked:opacity-100" aria-hidden="true" />
      </span>
      {label && <span className="text-sm font-body text-content-secondary">{label}</span>}
    </label>
  )
})
export default Radio
