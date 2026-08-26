/**
 * ReservationForm.jsx — Formulario real de reservación de cancha.
 *
 * Llama directo al backend real de Raven POS vía reservation.service.js —
 * la reservación aparece de inmediato en Backoffice → Reservaciones como
 * "booked", lista para que el staff la confirme. Contrato real del backend
 * (POST /public/:businessId/reservations): resourceRef, customerName,
 * phone, startsAt, endsAt (ISO). Las 5 canchas son fijas, todas 5 vs 5.
 *
 * Anticipo (BODEGOL_ANTICIPO_FLOW): cuando el negocio tiene configurada una
 * tarifa por hora en Backoffice, el backend calcula el anticipo (50% del
 * total) y la reservación queda "booked" con depositStatus "pending" — el
 * horario se aparta temporalmente mientras el cliente sube su comprobante
 * (segundo paso, ver DepositUploadStep abajo) y el staff lo aprueba. Si el
 * negocio no tiene tarifa configurada, el flujo original (sin anticipo)
 * sigue funcionando igual que antes.
 */
import React, { useEffect, useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, LayoutGrid, LoaderCircle, User, Phone, Timer, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { useToast } from '@/components/ui/Toast'
import Button from '@/components/buttons/Button'
import Input from '@/components/forms/Input'
import Select from '@/components/forms/Select'
import Chip from '@/components/ui/Chip'
import reservationService from '@/services/reservation.service'
import DepositUploadStep from './DepositUploadStep'

const DURATIONS = [
  { value: 60, label: '1 hora' },
  { value: 90, label: '1.5 horas' },
  { value: 120, label: '2 horas' },
]
// Solo para mostrar un estimado ANTES de enviar — el monto real y
// autoritativo del anticipo lo calcula el backend con la tarifa configurada
// en Backoffice, nunca se confía en un cálculo hecho aquí. Si el negocio
// cambia la tarifa, este estimado puede quedar desactualizado un momento
// hasta el próximo deploy del sitio — no afecta el cobro real.
const HOURLY_RATE_ESTIMATE = 500

const EMPTY_FORM = { resourceRef: '', bookingType: 'daily', customerName: '', phone: '', date: '', startTime: '', duration: 60 }
const BOOKING_TYPES = [
  { value: 'daily', label: 'Reserva de cancha' },
  { value: 'birthday', label: 'Cumpleaños' },
  { value: 'tournament', label: 'Torneo' },
]
const WEEKDAYS = ['D', 'L', 'M', 'M', 'J', 'V', 'S']

const labelClass = 'mb-1.5 block font-ui text-sm font-semibold text-content-secondary'
const money = (n) => `$${Number(n).toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
const isoDate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
const monthRange = (date) => ({
  from: isoDate(new Date(date.getFullYear(), date.getMonth(), 1)),
  to: isoDate(new Date(date.getFullYear(), date.getMonth() + 1, 0)),
})
const monthLabel = (date) => date.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })
const startsAtForBusiness = (date, time, offsetMinutes) => {
  const [year, month, day] = date.split('-').map(Number)
  const [hour, minute] = time.split(':').map(Number)
  return new Date(Date.UTC(year, month - 1, day, hour, minute) - offsetMinutes * 60000)
}

// Un TypeError "Failed to fetch" es el navegador diciendo que ni siquiera
// pudo abrir la conexión (URL mal configurada, servidor caído, sin
// internet) — muy distinto a un 400/404 real del backend con un mensaje
// de negocio útil. Se distinguen para no mostrarle al visitante un texto
// de navegador sin sentido.
function friendlyErrorMessage(err) {
  if (err?.status === 409) {
    return 'Cancha ocupada, prueba con otra.'
  }
  if (err?.status >= 500) {
    return 'El servidor no pudo registrar la solicitud. Intenta nuevamente en un momento.'
  }
  if (err instanceof TypeError) {
    return 'No pudimos conectar con el servidor. Intenta de nuevo en un momento o reserva por WhatsApp.'
  }
  return err.message || 'No se pudo enviar la reservación. Intenta de nuevo.'
}

export default function ReservationForm({ onSuccess }) {
  const { toast } = useToast()
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [courts, setCourts] = useState([])
  const [operations, setOperations] = useState({ maxAdvanceDays: 90, utcOffsetMinutes: -360 })
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [availability, setAvailability] = useState([])
  const [loadingCalendar, setLoadingCalendar] = useState(true)
  const [calendarError, setCalendarError] = useState('')
  // Una vez creada la reservación CON anticipo, cambiamos a un segundo paso
  // (subir comprobante) en vez de cerrar el modal de inmediato.
  const [pendingDeposit, setPendingDeposit] = useState(null)
  const [step, setStep] = useState(1)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const estimatedTotal = HOURLY_RATE_ESTIMATE * (Number(form.duration) / 60)

  useEffect(() => {
    let active = true
    Promise.all([reservationService.getAreas(), reservationService.getConfiguration()])
      .then(([areaConfig, config]) => {
        if (!active) return
        const names = Array.isArray(areaConfig?.names) ? areaConfig.names.filter(Boolean) : []
        setCourts(names)
        setOperations((current) => ({ ...current, ...(config || {}) }))
        setForm((current) => ({ ...current, resourceRef: names.includes(current.resourceRef) ? current.resourceRef : (names[0] || '') }))
      })
      .catch(() => active && setCalendarError('No pudimos cargar las canchas configuradas. Intenta nuevamente.'))
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!form.resourceRef) return
    let active = true
    const range = monthRange(visibleMonth)
    setLoadingCalendar(true)
    setCalendarError('')
    reservationService.getCalendar({ ...range, duration: form.duration, resourceRef: form.resourceRef })
      .then((result) => {
        if (!active) return
        const days = Array.isArray(result?.days) ? result.days : []
        setAvailability(days)
        const selected = days.find((day) => day.date === form.date)
        if (form.date && (!selected || !selected.available)) setForm((current) => ({ ...current, date: '', startTime: '' }))
      })
      .catch((err) => active && setCalendarError(friendlyErrorMessage(err)))
      .finally(() => active && setLoadingCalendar(false))
    return () => { active = false }
  }, [form.resourceRef, form.duration, visibleMonth])

  const availabilityByDate = useMemo(() => new Map(availability.map((day) => [day.date, day])), [availability])
  const calendarCells = useMemo(() => {
    const first = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1)
    const total = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate()
    return [...Array(first.getDay()).fill(null), ...Array.from({ length: total }, (_, index) => {
      const date = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), index + 1)
      return { number: index + 1, date: isoDate(date) }
    })]
  }, [visibleMonth])
  const selectedDay = availabilityByDate.get(form.date)
  const slots = selectedDay?.resources?.find((row) => row.resourceRef === form.resourceRef)?.slots || []
  const currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const canGoPrevious = visibleMonth > currentMonth
  const maxMonth = new Date(); maxMonth.setDate(maxMonth.getDate() + Number(operations.maxAdvanceDays || 90)); maxMonth.setDate(1)
  const canGoNext = visibleMonth < maxMonth

  async function handleSubmit(e) {
    e.preventDefault()
    if (submitting) return
    setError('')

    if (!form.customerName.trim() || !form.phone.trim() || !form.date || !form.startTime) {
      setError('Completa todos los campos requeridos.')
      return
    }
    const startsAt = startsAtForBusiness(form.date, form.startTime, Number(operations.utcOffsetMinutes ?? -360))
    if (Number.isNaN(startsAt.getTime())) {
      setError('Fecha u hora inválida.')
      return
    }
    const endsAt = new Date(startsAt.getTime() + Number(form.duration) * 60000)

    setSubmitting(true)
    try {
      const created = await reservationService.createReservation({
        resourceRef: form.resourceRef,
        customerName: form.customerName.trim(),
        phone: form.phone.trim() || undefined,
        bookingType: form.bookingType,
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
      })
      setForm((current) => ({ ...EMPTY_FORM, resourceRef: current.resourceRef }))
      // El backend solo pone depositStatus cuando el negocio tiene anticipo
      // configurado — si no, sigue siendo una reservación simple como antes.
      if (created?.deposit && created?.depositStatus === 'pending') {
        setPendingDeposit({ id: created.id, resourceRef: form.resourceRef, deposit: created.deposit })
      } else {
        toast.success('¡Solicitud recibida! Te confirmamos pronto por WhatsApp.', 'Reservación enviada')
        onSuccess?.()
      }
    } catch (err) {
      setError(friendlyErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  if (pendingDeposit) {
    return (
      <DepositUploadStep
        reservation={pendingDeposit}
        onDone={() => { toast.success('¡Comprobante recibido! En cuanto lo verifiquemos tu cancha queda confirmada.', 'Anticipo enviado'); onSuccess?.() }}
        onSkip={() => { toast.success('Reservación guardada. Puedes enviar tu comprobante más tarde por WhatsApp.', 'Solicitud enviada'); onSuccess?.() }}
      />
    )
  }

  const selectedDateLabel = form.date
    ? new Date(`${form.date}T12:00:00`).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <ol className="grid grid-cols-3 gap-2" aria-label="Progreso de la reservación">
        {['Fecha y hora', 'Tus datos', 'Anticipo'].map((label, index) => {
          const number = index + 1
          const active = number === step
          const complete = number < step
          return <li key={label} className={`rounded-xl border px-2 py-3 text-center font-ui text-xs font-bold sm:text-sm ${active ? 'border-primary bg-primary/15 text-primary' : complete ? 'border-primary/30 bg-primary/5 text-content-primary' : 'border-white/10 text-content-muted'}`}>
            <span className="mx-auto mb-1 flex h-6 w-6 items-center justify-center rounded-full border border-current">{complete ? <Check size={14} /> : number}</span>{label}
          </li>
        })}
      </ol>

      {step === 1 && <>
        <div>
          <label className={labelClass}><span className="inline-flex items-center gap-1.5"><LayoutGrid size={14} aria-hidden="true" />Cancha (5 vs 5)</span></label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {courts.map((c) => <Chip key={c} type="button" selected={form.resourceRef === c} onClick={() => setForm((f) => ({ ...f, resourceRef: c, date: '', startTime: '' }))} className="min-h-11 w-full justify-center px-2">{c.replace(/^(Área|Cancha)\s*/i, '#')}</Chip>)}
          </div>
          {!courts.length && <p className="mt-2 font-ui text-xs text-content-muted">Cargando canchas disponibles…</p>}
        </div>

        <Select id="resv-type" label="Tipo de reservación" value={form.bookingType} onChange={set('bookingType')} options={BOOKING_TYPES} className="border-primary/40 bg-[#0b1628] font-ui font-semibold text-white shadow-inner hover:border-primary/70" />

        <div className="relative z-20 overflow-visible rounded-2xl border border-white/15 bg-white/[0.045] p-4 shadow-inner backdrop-blur-lg sm:p-5">
        <div>
          <label className={labelClass}>
            <span className="inline-flex items-center gap-1.5"><Timer size={14} strokeWidth={2} aria-hidden="true" />Duración</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {DURATIONS.map((d) => (
              <Chip
                key={d.value}
                type="button"
                selected={Number(form.duration) === d.value}
                onClick={() => setForm((f) => ({ ...f, duration: d.value }))}
                className="min-h-10 w-full justify-center px-2"
              >
                {d.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <button type="button" aria-label="Mes anterior" disabled={!canGoPrevious || loadingCalendar}
              onClick={() => setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() - 1, 1))}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-content-secondary transition hover:border-primary/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-30">
              <ChevronLeft size={18} />
            </button>
            <div className="text-center">
              <p className="font-ui text-xs font-semibold uppercase tracking-wider text-content-muted">Elige un día disponible</p>
              <p className="font-ui text-base font-bold capitalize text-content-primary">{monthLabel(visibleMonth)}</p>
            </div>
            <button type="button" aria-label="Mes siguiente" disabled={!canGoNext || loadingCalendar}
              onClick={() => setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() + 1, 1))}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-content-secondary transition hover:border-primary/60 hover:text-white disabled:cursor-not-allowed disabled:opacity-30">
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center sm:gap-1.5">
            {WEEKDAYS.map((day, index) => <span key={`${day}-${index}`} className="py-1 font-ui text-[11px] font-bold text-content-muted">{day}</span>)}
            {calendarCells.map((cell, index) => {
              if (!cell) return <span key={`empty-${index}`} />
              const day = availabilityByDate.get(cell.date)
              const available = !!day?.available
              const selected = form.date === cell.date
              return <button key={cell.date} type="button" disabled={!available || loadingCalendar}
                aria-label={`${cell.date}${available ? ', disponible' : ', no disponible'}`}
                onClick={() => setForm((current) => ({ ...current, date:cell.date, startTime:'' }))}
                className={`aspect-square min-h-9 rounded-lg border font-ui text-xs font-bold transition sm:min-h-11 sm:text-sm ${selected ? 'border-primary bg-primary text-white shadow-glow-primary' : available ? 'border-white/15 bg-white/[0.07] text-content-primary hover:border-primary/70 hover:bg-primary/15' : 'border-transparent bg-white/[0.02] text-content-muted opacity-35'}`}>
                {cell.number}
              </button>
            })}
          </div>
          {loadingCalendar && <div className="mt-3 flex items-center justify-center gap-2 font-ui text-xs text-content-muted"><LoaderCircle className="animate-spin" size={15}/>Consultando disponibilidad real…</div>}
          {calendarError && <p className="mt-3 text-center font-ui text-xs font-semibold text-white">{calendarError}</p>}
          <div className="mt-3 flex items-center justify-center gap-4 font-ui text-[11px] text-content-muted"><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-primary"/>Disponible</span><span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-white/20"/>Ocupado</span></div>
        </div>

        {form.date && <div className="mt-5 border-t border-white/10 pt-4">
          <label className={labelClass}>Horarios disponibles</label>
          {slots.length ? <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {slots.map((time) => <Chip key={time} type="button" selected={form.startTime === time}
              onClick={() => setForm((current) => ({ ...current, startTime:time }))}
              className="min-h-10 w-full justify-center px-2">{time}</Chip>)}
          </div> : !loadingCalendar && <p className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-center font-ui text-xs text-content-muted">No quedan horarios para esta duración. Elige otro día.</p>}
        </div>}

        <p className="mt-3 text-center font-ui text-xs text-content-muted">
          Total estimado <b className="text-content-secondary">{money(estimatedTotal)}</b> · si tu cancha requiere anticipo, te lo mostramos en el siguiente paso.
        </p>
        </div>

        <Button type="button" variant="primary" size="lg" icon={ArrowRight} fullWidth disabled={!form.resourceRef || !form.date || !form.startTime} onClick={() => setStep(2)} className="min-h-14 rounded-2xl">
          Continuar con mis datos
        </Button>
      </>}

      {step === 2 && <>
        <div className="rounded-2xl border border-primary/25 bg-primary/10 p-4">
          <p className="font-ui text-xs font-bold uppercase tracking-wider text-primary">Horario seleccionado</p>
          <p className="mt-1 font-ui font-bold capitalize text-content-primary">{selectedDateLabel}</p>
          <p className="font-ui text-sm text-content-secondary">{form.resourceRef} · {form.startTime} · {DURATIONS.find((item) => item.value === Number(form.duration))?.label}</p>
        </div>

        <Input id="resv-name" label="Nombre completo" icon={User} value={form.customerName} onChange={set('customerName')} className="border-white/15 bg-white/[0.06] backdrop-blur-md" placeholder="Juan Pérez" autoComplete="name" required />
        <Input id="resv-phone" label="Teléfono con WhatsApp" icon={Phone} type="tel" value={form.phone} onChange={set('phone')} className="border-white/15 bg-white/[0.06] backdrop-blur-md" placeholder="999 000 0000" autoComplete="tel" required />

        <p className="rounded-xl border border-white/10 bg-white/[0.04] p-4 font-ui text-sm leading-relaxed text-content-secondary">
          Al continuar se registrará la solicitud en Raven POS. Si la reservación requiere anticipo, enseguida verás el importe y la cuenta configurada por Bodegol.
        </p>
      </>}

      {error && (
        <p role="alert" className="rounded-xl bg-status-error/10 px-4 py-2.5 text-center font-ui text-sm font-bold text-white">
          {error}
        </p>
      )}

      {step === 2 && <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
        <Button type="button" variant="secondary" size="lg" icon={ArrowLeft} onClick={() => setStep(1)} className="min-h-14 rounded-2xl">Cambiar horario</Button>
        <Button type="submit" variant="primary" size="lg" icon={CalendarDays} loading={submitting} fullWidth disabled={!form.customerName.trim() || !form.phone.trim()} className="relative z-0 min-h-14 rounded-2xl">Registrar y continuar</Button>
      </div>}
      {step === 2 && <p className="text-center font-ui text-xs text-content-muted">La reservación queda sujeta a confirmación del anticipo cuando corresponda.</p>}
    </form>
  )
}
