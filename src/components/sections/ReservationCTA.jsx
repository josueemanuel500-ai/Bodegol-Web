/**
 * ReservationCTA.jsx — Cierre fuerte de conversión + indicadores de confianza.
 * IMAGE backdrop — 2000 × 1100 px (16:9), .webp < 400 KB.
 *   public/images/cta/reservation-bg.jpg
 */
import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MessageCircle, Phone, LayoutGrid, Users, CalendarDays } from 'lucide-react'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import siteConfig from '@/config/site.config'
import Button from '@/components/buttons/Button'

const TRUST = [
  { icon: LayoutGrid, label: '5 canchas disponibles' },
  { icon: Users, label: 'Fútbol 5 vs 5' },
  { icon: CalendarDays, label: 'Abierto los 7 días' },
  { icon: MessageCircle, label: 'Reserva por WhatsApp' },
]

export default function ReservationCTA() {
  const { business } = useBusiness()
  const wa = buildWhatsAppUrl(business.contact.whatsapp, '¡Hola Bodegol! Quiero reservar una cancha. ¿Qué disponibilidad tienen?')

  return (
    <section id="reservation" className="section-padding bg-background" aria-labelledby="reservation-heading">
      <div className="site-container">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-primary/25 px-6 py-16 text-center md:px-16 md:py-20"
          style={{ background: 'linear-gradient(150deg, var(--surface) 0%, var(--background) 100%)' }}>
          {/* IMAGE backdrop — 2000×1100 */}
          <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity"
            style={{ backgroundImage: "url('/images/cta/reservation-bg.jpg?v=20260710')" }} aria-hidden="true" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(255,105,15,0.32) 0%, transparent 70%)' }} aria-hidden="true" />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6">
            <span className="t-label text-primary">Reservaciones</span>
            <h2 id="reservation-heading" className="t-hero-title text-white" style={{ fontSize: 'clamp(2.25rem, 4.5vw + 1rem, 4.5rem)' }}>
              Reserva tu cancha y vive el fútbol en Bodegol.
            </h2>
            <div className="mt-1 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:flex-wrap">
              {siteConfig.features.reservationSystem && (
                <Button as={Link} to="/reservaciones" variant="primary" size="xl" icon={CalendarDays} fullWidth className="sm:w-auto">
                  Reservar en línea
                </Button>
              )}
              <Button as="a" href={wa} target="_blank" rel="noopener noreferrer"
                variant={siteConfig.features.reservationSystem ? 'secondary' : 'primary'} size="xl" icon={MessageCircle} fullWidth className="sm:w-auto">
                Reserva por WhatsApp
              </Button>
              <Button as="a" href={business.contact.phoneTel} variant="secondary" size="xl" icon={Phone} fullWidth className="sm:w-auto">
                {business.contact.phone}
              </Button>
            </div>

            {/* Trust indicators */}
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-6">
              {TRUST.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-2 text-white/75">
                  <Icon size={16} strokeWidth={2} className="text-primary" aria-hidden="true" />
                  <span className="font-ui text-sm">{label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.7rem] text-white/45">Aplican restricciones.</p>
          </div>
        </motion.div>
      </div>

    </section>
  )
}
