/**
 * Textarea.jsx — Design System Textarea Component
 *
 * Same API as Input.jsx but renders a <textarea>.
 * Auto-resizes vertically to fit content (optional via autoResize prop).
 *
 * Props:
 *   id         string
 *   label      string
 *   error      string
 *   hint       string
 *   rows       number — default 4
 *   autoResize boolean — auto-grow as user types
 *   required   boolean
 *   disabled   boolean
 *   ...rest    standard <textarea> props
 */

import React, { forwardRef, useCallback } from 'react'
import { cn } from '@/utils/cn'

const Textarea = forwardRef(function Textarea({
  id,
  label,
  error,
  hint,
  rows       = 4,
  autoResize = false,
  required   = false,
  disabled   = false,
  className  = '',
  onChange,
  ...rest
}, ref) {
  const hasError = !!error

  const handleChange = useCallback((e) => {
    if (autoResize) {
      e.target.style.height = 'auto'
      e.target.style.height = `${e.target.scrollHeight}px`
    }
    onChange?.(e)
  }, [autoResize, onChange])

  const textareaClasses = cn(
    'w-full bg-surface-base text-text-primary placeholder-text-muted',
    'border rounded-xl px-4 py-3 text-sm font-body transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none',
    hasError
      ? 'border-status-error focus:ring-status-error/30 focus:border-status-error'
      : 'border-border-default focus:ring-brand-primary/30 focus:border-brand-primary',
    disabled ? 'opacity-50 cursor-not-allowed bg-surface-elevated' : '',
    className
  )

  const errorId  = error ? `${id}-error` : undefined
  const descId   = hint  ? `${id}-hint`  : undefined
  const ariaDesc = [descId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-ui font-medium text-text-secondary">
          {label}
          {required && <span className="text-status-error ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        id={id}
        rows={rows}
        required={required}
        disabled={disabled}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={ariaDesc}
        className={textareaClasses}
        onChange={handleChange}
        {...rest}
      />

      {error && (
        <p id={errorId} className="text-xs text-status-error font-ui" role="alert">{error}</p>
      )}
      {hint && !error && (
        <p id={descId} className="text-xs text-text-muted font-ui">{hint}</p>
      )}
    </div>
  )
})

export default Textarea
