/**
 * ReservationForm.jsx — Formulario real de reservación de cancha.
 *
 * Llama directo al backend real de Raven POS vía reservation.service.js —
 * la reservación aparece de inmediato en Backoffice → Reservaciones como
 * "booked", lista para que el staff la confirme. Contrato real del backend
 * (POST /public/:businessId/reservations): resourceRef, customerName,
 * phone, startsAt, endsAt (ISO). Las 5 canchas son fijas, todas 5 vs 5.
 */
import React, { useState } from 'react'
import { CalendarDays, LayoutGrid, User, Phone, Timer } from 'lucide-react'
import { useToast } from '@/components/ui/Toast'
import Button from '@/components/buttons/Button'
import Input from '@/components/forms/Input'
import DatePickerField from '@/components/forms/DatePickerField'
import TimePickerField from '@/components/forms/TimePickerField'
import Chip from '@/components/ui/Chip'
import reservationService from '@/services/reservation.service'

const COURTS = ['Área 1', 'Área 2', 'Área 3', 'Área 4', 'Área 5']
const DURATIONS = [
  { value: 60, label: '1 hora' },
  { value: 90, label: '1.5 horas' },
  { value: 120, label: '2 horas' },
]

const EMPTY_FORM = { resourceRef: COURTS[0], customerName: '', phone: '', date: '', startTime: '', duration: 60 }

const labelClass = 'mb-1.5 block font-ui text-sm font-semibold text-content-secondary'

// Un TypeError "Failed to fetch" es el navegador diciendo que ni siquiera
// pudo abrir la conexión (URL mal configurada, servidor caído, sin
// internet) — muy distinto a un 400/404 real del backend con un mensaje
// de negocio útil. Se distinguen para no mostrarle al visitante un texto
// de navegador sin sentido.
function friendlyErrorMessage(err) {
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

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const todayIso = new Date().toISOString().slice(0, 10)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.customerName.trim() || !form.date || !form.startTime) {
      setError('Completa todos los campos requeridos.')
      return
    }
    const startsAt = new Date(`${form.date}T${form.startTime}:00`)
    if (Number.isNaN(startsAt.getTime())) {
      setError('Fecha u hora inválida.')
      return
    }
    const endsAt = new Date(startsAt.getTime() + Number(form.duration) * 60000)

    setSubmitting(true)
    try {
      await reservationService.createReservation({
        resourceRef: form.resourceRef,
        customerName: form.customerName.trim(),
        phone: form.phone.trim() || undefined,
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
      })
      toast.success('¡Solicitud recibida! Te confirmamos pronto por WhatsApp.', 'Reservación enviada')
      setForm(EMPTY_FORM)
      onSuccess?.()
    } catch (err) {
      setError(friendlyErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className={labelClass}>
          <span className="inline-flex items-center gap-1.5"><LayoutGrid size={14} strokeWidth={2} aria-hidden="true" />Cancha (5 vs 5)</span>
        </label>
        <div className="grid grid-cols-5 gap-2">
          {COURTS.map((c) => (
            <Chip
              key={c}
              selected={form.resourceRef === c}
              onClick={() => setForm((f) => ({ ...f, resourceRef: c }))}
              className="min-h-10 w-full justify-center px-2"
            >
              {c.replace('Área ', '#')}
            </Chip>
          ))}
        </div>
      </div>

      <Input id="resv-name" label="Tu nombre" icon={User} value={form.customerName} onChange={set('customerName')}
        className="border-white/15 bg-white/[0.06] backdrop-blur-md"
        placeholder="Juan Pérez" required />

      <Input id="resv-phone" label="Teléfono (WhatsApp)" icon={Phone} type="tel" value={form.phone} onChange={set('phone')}
        className="border-white/15 bg-white/[0.06] backdrop-blur-md"
        placeholder="81 1234 5678" />

      <div className="rounded-2xl border border-white/15 bg-white/[0.045] p-4 shadow-inner backdrop-blur-lg">
        <p className="mb-3 font-ui text-sm font-semibold text-content-secondary">¿Cuándo?</p>
        <div className="grid grid-cols-2 gap-3">
          <DatePickerField id="resv-date" label="Fecha" min={todayIso} value={form.date}
            onChange={set('date')} required />
          <TimePickerField id="resv-time" label="Hora de inicio" value={form.startTime}
            onChange={set('startTime')} required />
        </div>

        <div className="mt-3">
          <label className={labelClass}>
            <span className="inline-flex items-center gap-1.5"><Timer size={14} strokeWidth={2} aria-hidden="true" />Duración</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {DURATIONS.map((d) => (
              <Chip
                key={d.value}
                selected={Number(form.duration) === d.value}
                onClick={() => setForm((f) => ({ ...f, duration: d.value }))}
                className="min-h-10 w-full justify-center px-2"
              >
                {d.label}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-status-error/10 px-4 py-2.5 font-ui text-sm text-status-error">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" icon={CalendarDays} loading={submitting} fullWidth
        className="min-h-14 rounded-2xl">
        Solicitar reservación
      </Button>
      <p className="text-center font-ui text-xs text-content-muted">
        Te confirmamos por teléfono/WhatsApp en las próximas horas.
      </p>
    </form>
  )
}
