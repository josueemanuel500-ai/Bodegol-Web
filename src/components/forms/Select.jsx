/**
 * Select.jsx — Design System Select Component
 *
 * Native <select> with consistent styling.
 * For complex dropdowns (multi-select, search) use a library like React Select.
 *
 * Props:
 *   id        string
 *   label     string
 *   error     string
 *   hint      string
 *   options   Array<{ value: string, label: string, disabled?: boolean }>
 *   required  boolean
 *   ...rest   standard <select> props
 */

import React, { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

const Select = forwardRef(function Select({
  id,
  label,
  error,
  hint,
  options   = [],
  required  = false,
  disabled  = false,
  className = '',
  ...rest
}, ref) {
  const hasError = !!error

  const selectClasses = cn(
    'w-full bg-surface-base text-text-primary appearance-none',
    'border rounded-xl pl-4 pr-10 py-2.5 text-sm font-body',
    'transition-all duration-200 cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    hasError
      ? 'border-status-error focus:ring-status-error/30 focus:border-status-error'
      : 'border-border-default focus:ring-brand-primary/30 focus:border-brand-primary',
    disabled ? 'opacity-50 cursor-not-allowed bg-surface-elevated' : '',
    className
  )

  const errorId = error ? `${id}-error` : undefined
  const descId  = hint  ? `${id}-hint`  : undefined

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-ui font-medium text-text-secondary">
          {label}
          {required && <span className="text-status-error ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={id}
          required={required}
          disabled={disabled}
          aria-required={required}
          aria-invalid={hasError}
          aria-describedby={[descId, errorId].filter(Boolean).join(' ') || undefined}
          className={selectClasses}
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom chevron arrow */}
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {error && <p id={errorId} className="text-xs text-status-error font-ui" role="alert">{error}</p>}
      {hint && !error && <p id={descId} className="text-xs text-text-muted font-ui">{hint}</p>}
    </div>
  )
})

export default Select
