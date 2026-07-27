/**
 * DatePickerField.jsx — Selector de fecha custom, estilo glass.
 *
 * El <input type="date"> nativo abre el calendario del sistema operativo,
 * que no se puede restylear con CSS — por eso este componente construye su
 * propio calendario (mes en cuadrícula) en un popover glass/rounded que sí
 * sigue el sistema de diseño del sitio. El valor sigue siendo un string
 * "YYYY-MM-DD" (mismo contrato que el input nativo que reemplaza), así que
 * el resto del formulario no necesita cambios.
 */
import React, { useState, useRef } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { useClickOutside } from '@/hooks/useClickOutside'
import { cn } from '@/utils/cn'

const WEEKDAYS = ['D', 'L', 'M', 'M', 'J', 'V', 'S']
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

function toKey(d) {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
function parseKey(key) {
  if (!key) return null
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}
function buildMonthGrid(viewDate) {
  const year = viewDate.getFullYear(), month = viewDate.getMonth()
  const first = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < first.getDay(); i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  return cells
}

export default function DatePickerField({ id, label, value, onChange, min, required = false }) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef(null)
  useClickOutside(wrapRef, () => setOpen(false), open)

  const selected = parseKey(value)
  const minDate = parseKey(min)
  const [viewDate, setViewDate] = useState(() => selected || minDate || new Date())

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const cells = buildMonthGrid(viewDate)

  function isBeforeMin(d) {
    const floor = minDate || today
    return d < new Date(floor.getFullYear(), floor.getMonth(), floor.getDate())
  }
  function pick(d) {
    if (!d || isBeforeMin(d)) return
    onChange({ target: { value: toKey(d) } })
    setOpen(false)
  }
  function shiftMonth(delta) {
    setViewDate((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1))
  }

  const displayLabel = selected
    ? selected.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })
    : ''

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
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(
            'relative w-full min-h-[3rem] bg-surface-elevated text-content-primary text-left',
            'border rounded-xl pl-11 pr-4 py-3 text-sm font-body transition-all duration-200',
            'focus:outline-none focus:ring-4 border-line focus:ring-primary/25 focus:border-primary',
            !selected && 'text-content-muted'
          )}
        >
          <CalendarDays size={18} strokeWidth={2} aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-content-muted pointer-events-none" />
          {displayLabel || 'Selecciona una fecha'}
        </button>

        {open && (
          <div role="dialog" aria-label="Calendario"
            className="absolute z-50 mt-2 w-72 rounded-2xl border border-white/15 bg-surface-base/85 p-4 shadow-2xl backdrop-blur-xl">
            <div className="mb-3 flex items-center justify-between">
              <button type="button" onClick={() => shiftMonth(-1)} aria-label="Mes anterior"
                className="rounded-lg p-1.5 text-content-secondary transition-colors hover:bg-white/10 hover:text-content-primary">
                <ChevronLeft size={18} />
              </button>
              <span className="font-ui text-sm font-semibold text-content-primary">
                {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
              </span>
              <button type="button" onClick={() => shiftMonth(1)} aria-label="Mes siguiente"
                className="rounded-lg p-1.5 text-content-secondary transition-colors hover:bg-white/10 hover:text-content-primary">
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7 gap-1">
              {WEEKDAYS.map((w, i) => (
                <span key={i} className="flex h-7 items-center justify-center font-ui text-[0.7rem] font-semibold text-content-muted">{w}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {cells.map((d, i) => {
                if (!d) return <span key={`blank-${i}`} />
                const key = toKey(d)
                const isSelected = value === key
                const isToday = key === toKey(today)
                const disabled = isBeforeMin(d)
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={disabled}
                    onClick={() => pick(d)}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg font-ui text-sm transition-colors',
                      disabled && 'cursor-not-allowed text-content-muted/40',
                      !disabled && !isSelected && 'text-content-primary hover:bg-white/10',
                      isSelected && 'bg-primary text-white font-semibold',
                      !isSelected && isToday && 'border border-primary/50'
                    )}
                  >
                    {d.getDate()}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
