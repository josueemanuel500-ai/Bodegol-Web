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
import { CalendarDays } from 'lucide-react'
import { useToast } from '@/components/ui/Toast'
import Button from '@/components/buttons/Button'
import reservationService from '@/services/reservation.service'

const COURTS = ['Área 1', 'Área 2', 'Área 3', 'Área 4', 'Área 5']
const DURATIONS = [
  { value: 60, label: '1 hora' },
  { value: 90, label: '1.5 horas' },
  { value: 120, label: '2 horas' },
]

const inputClass =
  'w-full rounded-xl border border-line bg-background px-4 py-2.5 font-ui text-sm text-content-primary ' +
  'placeholder:text-content-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors'
const labelClass = 'mb-1.5 block font-ui text-sm font-semibold text-content-secondary'

const EMPTY_FORM = { resourceRef: COURTS[0], customerName: '', phone: '', date: '', startTime: '', duration: 60 }

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
      setError(err.message || 'No se pudo enviar la reservación. Intenta de nuevo.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className={labelClass} htmlFor="resv-court">Cancha (5 vs 5)</label>
        <select id="resv-court" className={inputClass} value={form.resourceRef} onChange={set('resourceRef')}>
          {COURTS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="resv-name">Tu nombre</label>
        <input id="resv-name" className={inputClass} value={form.customerName} onChange={set('customerName')}
          placeholder="Juan Pérez" required />
      </div>

      <div>
        <label className={labelClass} htmlFor="resv-phone">Teléfono (WhatsApp)</label>
        <input id="resv-phone" className={inputClass} type="tel" value={form.phone} onChange={set('phone')}
          placeholder="81 1234 5678" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass} htmlFor="resv-date">Fecha</label>
          <input id="resv-date" className={inputClass} type="date" min={todayIso} value={form.date}
            onChange={set('date')} required />
        </div>
        <div>
          <label className={labelClass} htmlFor="resv-time">Hora de inicio</label>
          <input id="resv-time" className={inputClass} type="time" value={form.startTime}
            onChange={set('startTime')} required />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="resv-duration">Duración</label>
        <select id="resv-duration" className={inputClass} value={form.duration} onChange={set('duration')}>
          {DURATIONS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
        </select>
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-status-error/10 px-4 py-2.5 font-ui text-sm text-status-error">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" size="lg" icon={CalendarDays} loading={submitting} fullWidth>
        Solicitar reservación
      </Button>
      <p className="text-center font-ui text-xs text-content-muted">
        Te confirmamos por teléfono/WhatsApp en las próximas horas.
      </p>
    </form>
  )
}
