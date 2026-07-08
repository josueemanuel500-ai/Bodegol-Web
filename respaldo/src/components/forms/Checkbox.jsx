/**
 * Checkbox.jsx — Bodegol DS checkbox (forwardRef)
 * Custom orange check, large touch target, accessible.
 */
import React, { forwardRef } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

const Checkbox = forwardRef(function Checkbox({
  id, label, checked, disabled = false, className = '', ...rest
}, ref) {
  return (
    <label htmlFor={id}
      className={cn('group inline-flex items-start gap-3 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed', className)}>
      <span className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center">
        <input ref={ref} id={id} type="checkbox" checked={checked} disabled={disabled}
          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-md
                     border border-line bg-surface-elevated transition-all duration-200
                     checked:border-primary checked:bg-primary
                     focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/25"
          {...rest} />
        <Check size={15} strokeWidth={3}
          className="pointer-events-none text-white opacity-0 transition-opacity duration-200 peer-checked:opacity-100" aria-hidden="true" />
      </span>
      {label && <span className="pt-0.5 text-sm font-body text-content-secondary">{label}</span>}
    </label>
  )
})
export default Checkbox
