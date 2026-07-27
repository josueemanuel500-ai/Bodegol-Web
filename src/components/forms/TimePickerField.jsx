/**
 * TimePickerField.jsx — Selector de hora custom, estilo glass.
 *
 * Mismo motivo que DatePickerField: el picker nativo de <input type="time">
 * lo dibuja el sistema operativo y no admite estilos. El valor sigue siendo
 * un string "HH:MM" (24h, mismo contrato que el input nativo).
 */
import React, { useState, useRef, useEffect } from 'react'
import { Clock } from 'lucide-react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { cn } from '@/utils/cn'

function buildSlots(stepMinutes = 30) {
  const slots = []
  for (let m = 0; m < 24 * 60; m += stepMinutes) {
    const h = String(Math.floor(m / 60)).padStart(2, '0')
    const mm = String(m % 60).padStart(2, '0')
    slots.push(`${h}:${mm}`)
  }
  return slots
}
const SLOTS = buildSlots(30)

function formatDisplay(value) {
  if (!value) return ''
  const [h, m] = value.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, '0')} ${period}`
}

export default function TimePickerField({ id, label, value, onChange, required = false }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  const listRef = useRef(null)
  useClickOutside(wrapRef, () => setOpen(false), open)

  useEffect(() => {
    if (!open || !listRef.current) return
    const active = listRef.current.querySelector('[data-selected="true"]') || listRef.current.querySelector('[data-slot]')
    active?.scrollIntoView({ block: 'center' })
  }, [open])

  function pick(slot) {
    onChange({ target: { value: slot } })
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-2" ref={wrapRef}>
      {label && (
        <label htmlFor={id} className="t-label text-content-secondary normal-case tracking-normal text-sm font-medium">
          {label}{required && <span className="text-primary ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          id={id}
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            'relative w-full min-h-[3rem] bg-surface-elevated text-content-primary text-left',
            'border rounded-xl pl-11 pr-4 py-3 text-sm font-body transition-all duration-200',
            'focus:outline-none focus:ring-4 border-line focus:ring-primary/25 focus:border-primary',
            !value && 'text-content-muted'
          )}
        >
          <Clock size={18} strokeWidth={2} aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-content-muted pointer-events-none" />
          {formatDisplay(value) || 'Selecciona una hora'}
        </button>

        {open && (
          <div ref={listRef} role="listbox" aria-label="Hora"
            className="absolute right-0 z-50 mt-2 max-h-64 w-48 overflow-y-auto rounded-2xl border border-white/15 bg-surface-base/85 p-2 shadow-2xl backdrop-blur-xl">
            {SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                data-slot
                data-selected={value === slot}
                role="option"
                aria-selected={value === slot}
                onClick={() => pick(slot)}
                className={cn(
                  'block w-full rounded-lg px-3 py-2 text-left font-ui text-sm transition-colors',
                  value === slot ? 'bg-primary text-white font-semibold' : 'text-content-primary hover:bg-white/10'
                )}
              >
                {formatDisplay(slot)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
