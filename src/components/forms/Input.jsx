/**
 * Input.jsx — Bodegol DS text input (forwardRef)
 * Premium: rounded-xl, large touch target, orange focus ring.
 * Props: id,label,error,hint,icon,iconRight,required,disabled,type,...rest
 */
import React, { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Input = forwardRef(function Input({
  id, label, error, hint, icon: Icon = null, iconRight: IconRight = null,
  required = false, disabled = false, className = '', type = 'text', ...rest
}, ref) {
  const hasError = !!error
  const inputClasses = cn(
    'w-full min-h-[3rem] bg-surface-elevated text-content-primary placeholder-content-muted',
    'border rounded-xl py-3 text-sm font-body transition-all duration-200',
    'focus:outline-none focus:ring-4',
    Icon ? 'pl-11 pr-4' : 'px-4',
    IconRight ? 'pr-11' : '',
    hasError
      ? 'border-danger focus:ring-danger/25 focus:border-danger'
      : 'border-line focus:ring-primary/25 focus:border-primary',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )
  const descId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const ariaDesc = [descId, errorId].filter(Boolean).join(' ') || undefined
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="t-label text-content-secondary normal-case tracking-normal text-sm font-medium">
          {label}{required && <span className="text-primary ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-content-muted pointer-events-none" aria-hidden="true">
            <Icon size={18} strokeWidth={2} />
          </div>
        )}
        <input ref={ref} id={id} type={type} required={required} disabled={disabled}
          aria-required={required} aria-invalid={hasError} aria-describedby={ariaDesc}
          className={inputClasses} {...rest} />
        {IconRight && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-content-muted"><IconRight size={18} strokeWidth={2} /></div>
        )}
      </div>
      {error && <p id={errorId} className="text-xs text-danger font-ui" role="alert">{error}</p>}
      {hint && !error && <p id={descId} className="text-xs text-content-muted font-ui">{hint}</p>}
    </div>
  )
})
export default Input
