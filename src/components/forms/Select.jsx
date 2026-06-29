/**
 * Select.jsx — Bodegol DS native select (forwardRef)
 * Props: id,label,error,hint,options,required,disabled,...rest
 */
import React, { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

const Select = forwardRef(function Select({
  id, label, error, hint, options = [], required = false, disabled = false, className = '', ...rest
}, ref) {
  const hasError = !!error
  const selectClasses = cn(
    'w-full min-h-[3rem] bg-surface-elevated text-content-primary appearance-none',
    'border rounded-xl pl-4 pr-11 py-3 text-sm font-body transition-all duration-200 cursor-pointer',
    'focus:outline-none focus:ring-4',
    hasError ? 'border-danger focus:ring-danger/25 focus:border-danger'
             : 'border-line focus:ring-primary/25 focus:border-primary',
    disabled && 'opacity-50 cursor-not-allowed', className
  )
  const errorId = error ? `${id}-error` : undefined
  const descId = hint ? `${id}-hint` : undefined
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-ui font-medium text-content-secondary">
          {label}{required && <span className="text-primary ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        <select ref={ref} id={id} required={required} disabled={disabled}
          aria-required={required} aria-invalid={hasError}
          aria-describedby={[descId, errorId].filter(Boolean).join(' ') || undefined}
          className={selectClasses} {...rest}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={18} strokeWidth={2}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-content-muted pointer-events-none" aria-hidden="true" />
      </div>
      {error && <p id={errorId} className="text-xs text-danger font-ui" role="alert">{error}</p>}
      {hint && !error && <p id={descId} className="text-xs text-content-muted font-ui">{hint}</p>}
    </div>
  )
})
export default Select
