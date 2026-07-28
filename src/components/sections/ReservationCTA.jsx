/**
 * ReservationCTA.jsx — Cierre fuerte de conversión + indicadores de confianza.
 * IMAGE backdrop — 2000 × 1100 px (16:9), .webp < 400 KB.
 *   public/images/cta/reservation-bg.jpg
 */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, LayoutGrid, Users, CalendarDays } from 'lucide-react'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import siteConfig from '@/config/site.config'
import Button from '@/components/buttons/Button'
import Modal from '@/components/ui/Modal'
import ReservationForm from '@/components/sections/ReservationForm'

const TRUST = [
  { icon: LayoutGrid, label: '5 canchas disponibles' },
  { icon: Users, label: 'Fútbol 5 vs 5' },
  { icon: CalendarDays, label: 'Abierto los 7 días' },
  { icon: MessageCircle, label: 'Reserva por WhatsApp' },
]

export default function ReservationCTA() {
  const { business } = useBusiness()
  const [formOpen, setFormOpen] = useState(false)
  const wa = buildWhatsAppUrl(business.contact.whatsapp, '¡Hola Bodegol! Quiero reservar una cancha. ¿Qué disponibilidad tienen?')

  return (
    <section id="reservation" className="section-padding bg-background" aria-labelledby="reservation-heading">
      <div className="site-container">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white/[0.08] px-5 py-12 text-center shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl sm:px-8 sm:py-16 md:px-16 md:py-20">
          {/* IMAGE backdrop — 2000×1100 */}
          <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity"
            style={{ backgroundImage: "url('/images/cta/reservation-bg.jpg?v=20260710')" }} aria-hidden="true" />
          <div className="pointer-events-none absolute inset-[1px] rounded-[calc(2rem-1px)] border border-white/10 bg-gradient-to-br from-white/[0.08] via-transparent to-primary/[0.05]" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(255,105,15,0.32) 0%, transparent 70%)' }} aria-hidden="true" />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6">
            <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 font-ui text-xs font-bold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur-md">
              Reservaciones
            </span>
            <h2 id="reservation-heading" className="t-hero-title text-white" style={{ fontSize: 'clamp(2.25rem, 4.5vw + 1rem, 4.5rem)' }}>
              Reserva tu cancha y vive el fútbol en Bodegol.
            </h2>
            <div className="mt-2 grid w-full gap-3 sm:grid-cols-3">
              {siteConfig.features.reservationSystem && (
                <Button variant="primary" size="xl" icon={CalendarDays} fullWidth className="min-h-16 rounded-2xl px-5" onClick={() => setFormOpen(true)}>
                  Reservar en línea
                </Button>
              )}
              <Button as="a" href={wa} target="_blank" rel="noopener noreferrer"
                variant={siteConfig.features.reservationSystem ? 'secondary' : 'primary'} size="xl" icon={MessageCircle} fullWidth
                className="min-h-16 rounded-2xl border-white/20 bg-white/10 px-5 backdrop-blur-md hover:bg-white/15">
                Reserva por WhatsApp
              </Button>
              <Button as="a" href={business.contact.phoneTel} variant="secondary" size="xl" icon={Phone} fullWidth
                className="min-h-16 rounded-2xl border-white/20 bg-white/10 px-5 backdrop-blur-md hover:bg-white/15">
                {business.contact.phone}
              </Button>
            </div>

            {/* Trust indicators */}
            <ul className="mt-5 grid w-full grid-cols-2 gap-2 border-t border-white/10 pt-6 sm:grid-cols-4">
              {TRUST.map(({ icon: Icon, label }) => (
                <li key={label} className="flex min-h-16 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 text-white/75 backdrop-blur-md">
                  <Icon size={16} strokeWidth={2} className="text-primary" aria-hidden="true" />
                  <span className="font-ui text-xs font-medium leading-snug sm:text-sm">{label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.7rem] text-white/45">Aplican restricciones.</p>
          </div>
        </motion.div>
      </div>

      {siteConfig.features.reservationSystem && (
        <Modal isOpen={formOpen} onClose={() => setFormOpen(false)} title="Reserva tu cancha" size="sm">
          <ReservationForm onSuccess={() => setFormOpen(false)} />
        </Modal>
      )}
    </section>
  )
}
