/**
 * Input.jsx — Design System Input Component
 *
 * Supports: text, email, tel, number, date, time, password
 *
 * Props:
 *   id          string — must match htmlFor on a Label
 *   label       string — visible label above input
 *   error       string — error message (shown in red below)
 *   hint        string — helper text (shown below input, hidden if error)
 *   icon        Lucide component — left icon inside input
 *   iconRight   Lucide component — right icon (e.g. toggle visibility)
 *   required    boolean
 *   disabled    boolean
 *   ...rest     all standard <input> props (type, placeholder, value, onChange…)
 *
 * Usage:
 *   <Input
 *     id="name"
 *     label="Nombre completo"
 *     placeholder="Tu nombre"
 *     value={form.values.name}
 *     onChange={form.handleChange('name')}
 *     onBlur={form.handleBlur('name')}
 *     error={form.showError('name') ? form.errors.name : null}
 *     required
 *   />
 */

import React, { forwardRef } from 'react'
import { cn } from '@/utils/cn'

const Input = forwardRef(function Input({
  id,
  label,
  error,
  hint,
  icon: Icon        = null,
  iconRight: IconRight = null,
  required  = false,
  disabled  = false,
  className = '',
  type      = 'text',
  ...rest
}, ref) {
  const hasError = !!error

  const inputClasses = cn(
    // Base
    'w-full bg-surface-base text-text-primary placeholder-text-muted',
    'border rounded-xl py-2.5 text-sm font-body transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    // Icon padding
    Icon      ? 'pl-10 pr-4' : 'px-4',
    IconRight ? 'pr-10'      : '',
    // States
    hasError
      ? 'border-status-error focus:ring-status-error/30 focus:border-status-error'
      : 'border-border-default focus:ring-brand-primary/30 focus:border-brand-primary',
    disabled
      ? 'opacity-50 cursor-not-allowed bg-surface-elevated'
      : '',
    className
  )

  const descId   = hint  ? `${id}-hint`  : undefined
  const errorId  = error ? `${id}-error` : undefined
  const ariaDesc = [descId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-ui font-medium text-text-secondary"
        >
          {label}
          {required && (
            <span className="text-status-error ml-1" aria-hidden="true">*</span>
          )}
        </label>
      )}

      {/* Input wrapper (for icon positioning) */}
      <div className="relative">
        {Icon && (
          <div
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
            aria-hidden="true"
          >
            <Icon size={16} />
          </div>
        )}

        <input
          ref={ref}
          id={id}
          type={type}
          required={required}
          disabled={disabled}
          aria-required={required}
          aria-invalid={hasError}
          aria-describedby={ariaDesc}
          className={inputClasses}
          {...rest}
        />

        {IconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
            <IconRight size={16} />
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p id={errorId} className="text-xs text-status-error font-ui" role="alert">
          {error}
        </p>
      )}

      {/* Hint (hidden when error is shown) */}
      {hint && !error && (
        <p id={descId} className="text-xs text-text-muted font-ui">
          {hint}
        </p>
      )}
    </div>
  )
})

export default Input
