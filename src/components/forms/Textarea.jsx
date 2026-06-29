/**
 * Textarea.jsx — Bodegol DS textarea (forwardRef)
 * Props: id,label,error,hint,rows,autoResize,required,disabled,...rest
 */
import React, { forwardRef, useCallback } from 'react'
import { cn } from '@/utils/cn'

const Textarea = forwardRef(function Textarea({
  id, label, error, hint, rows = 4, autoResize = false,
  required = false, disabled = false, className = '', onChange, ...rest
}, ref) {
  const hasError = !!error
  const handleChange = useCallback((e) => {
    if (autoResize) { e.target.style.height = 'auto'; e.target.style.height = `${e.target.scrollHeight}px` }
    onChange?.(e)
  }, [autoResize, onChange])
  const cls = cn(
    'w-full bg-surface-elevated text-content-primary placeholder-content-muted',
    'border rounded-xl px-4 py-3 text-sm font-body leading-relaxed transition-all duration-200 resize-none',
    'focus:outline-none focus:ring-4',
    hasError ? 'border-danger focus:ring-danger/25 focus:border-danger'
             : 'border-line focus:ring-primary/25 focus:border-primary',
    disabled && 'opacity-50 cursor-not-allowed', className
  )
  const errorId = error ? `${id}-error` : undefined
  const descId = hint ? `${id}-hint` : undefined
  const ariaDesc = [descId, errorId].filter(Boolean).join(' ') || undefined
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-ui font-medium text-content-secondary">
          {label}{required && <span className="text-primary ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <textarea ref={ref} id={id} rows={rows} required={required} disabled={disabled}
        aria-required={required} aria-invalid={hasError} aria-describedby={ariaDesc}
        className={cls} onChange={handleChange} {...rest} />
      {error && <p id={errorId} className="text-xs text-danger font-ui" role="alert">{error}</p>}
      {hint && !error && <p id={descId} className="text-xs text-content-muted font-ui">{hint}</p>}
    </div>
  )
})
export default Textarea
