import React from 'react'
import { CalendarCheck2, ShieldCheck, Smartphone } from 'lucide-react'
import SEO from '@/components/ui/SEO'
import ReservationForm from '@/components/sections/ReservationForm'

const benefits = [
  { icon: CalendarCheck2, title: 'Disponibilidad real', text: 'Los horarios ocupados o bloqueados en Raven POS no pueden seleccionarse.' },
  { icon: Smartphone, title: 'Datos sencillos', text: 'Solo necesitamos tu nombre y un teléfono con WhatsApp.' },
  { icon: ShieldCheck, title: 'Anticipo seguro', text: 'La cuenta y el importe se muestran después de registrar tu horario.' },
]

export default function ReservacionesPage() {
  return <>
    <SEO title="Reservar cancha de fútbol en Mérida — Bodegol" description="Consulta la disponibilidad de las canchas Bodegol y reserva en línea por fecha y hora. Tu solicitud se registra directamente en Raven POS." path="/reservaciones" />
    <div className="min-h-screen bg-background pt-[var(--nav-height)]">
      <section className="relative overflow-hidden border-b border-line py-10 sm:py-14">
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,105,15,.55), transparent 48%)' }} aria-hidden="true" />
        <div className="site-container relative text-center">
          <p className="t-label text-primary">Reservaciones en línea</p>
          <h1 className="mx-auto mt-3 max-w-4xl font-display text-4xl font-black uppercase leading-none text-white sm:text-5xl">Elige tu cancha, fecha y hora</h1>
          <p className="mx-auto mt-4 max-w-2xl font-ui text-base leading-relaxed text-content-secondary">Consulta espacios disponibles en tiempo real y completa tu reservación en tres pasos.</p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="site-container grid max-w-5xl items-start gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="rounded-3xl border border-primary/20 bg-surface p-4 shadow-card-lg sm:p-6">
            <ReservationForm />
          </div>
          <aside className="space-y-4 lg:sticky lg:top-[calc(var(--nav-height)+2rem)]" aria-label="Información sobre la reservación">
            {benefits.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-line bg-surface p-5"><Icon className="text-primary" aria-hidden="true" /><h2 className="mt-3 font-ui text-lg font-bold text-white">{title}</h2><p className="mt-1 font-ui text-sm leading-relaxed text-content-muted">{text}</p></div>)}
          </aside>
        </div>
      </section>
    </div>
  </>
}
