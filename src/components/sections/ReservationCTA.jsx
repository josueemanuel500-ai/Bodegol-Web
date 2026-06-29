/**
 * ReservationCTA.jsx — Final conversion section (the climax)
 *
 * Minimal + powerful: large headline, one clear message, strong orange CTA.
 * All actions open WhatsApp (no form yet). Business contact from data/business.js.
 *
 * IMAGE — recommended: 2000 × 1100 px (16:9), dark action shot, .webp < 400 KB.
 *   Drop at: public/images/cta/reservation-bg.jpg  (acts as atmospheric backdrop)
 */
import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, CalendarCheck } from 'lucide-react'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import Button from '@/components/buttons/Button'

export default function ReservationCTA() {
  const { business } = useBusiness()
  const waCancha = buildWhatsAppUrl(business.contact.whatsapp, '¡Hola Bodegol! Quiero reservar una cancha. ¿Qué disponibilidad tienen?')
  const waMesa = buildWhatsAppUrl(business.contact.whatsapp, '¡Hola! Me gustaría reservar una mesa en Bodegol para ver un partido.')

  return (
    <section id="reservation" className="section-padding bg-background" aria-labelledby="reservation-heading">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-primary/25 px-6 py-16 text-center md:px-16 md:py-24"
          style={{ background: 'linear-gradient(150deg, var(--surface) 0%, var(--background) 100%)' }}
        >
          {/* IMAGE backdrop — 2000×1100 (16:9). public/images/cta/reservation-bg.jpg */}
          <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-15 mix-blend-luminosity"
            style={{ backgroundImage: "url('/images/cta/reservation-bg.jpg')" }} aria-hidden="true" />
          <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(255,105,15,0.3) 0%, transparent 70%)' }} aria-hidden="true" />

          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6">
            <span className="t-label text-primary">Reservaciones</span>
            <h2 id="reservation-heading" className="t-hero-title text-white" style={{ fontSize: 'clamp(2.5rem, 5vw + 1rem, 5rem)' }}>
              Tu cancha te está esperando
            </h2>
            <p className="t-section-desc max-w-xl text-white/75">
              Sin formularios, sin esperas. Escríbenos por WhatsApp y te confirmamos al instante.
            </p>
            <div className="mt-2 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
              <Button as="a" href={waCancha} target="_blank" rel="noopener noreferrer" variant="primary" size="xl" icon={MessageCircle} fullWidth className="sm:w-auto">
                Reservar cancha
              </Button>
              <Button as="a" href={waMesa} target="_blank" rel="noopener noreferrer" variant="secondary" size="xl" icon={CalendarCheck} fullWidth className="sm:w-auto">
                Reservar mesa
              </Button>
            </div>
            <a href={business.contact.phoneTel}
              className="mt-2 inline-flex items-center gap-2 font-ui text-sm text-white/60 transition-colors hover:text-white">
              <Phone size={16} strokeWidth={2} aria-hidden="true" />
              O llámanos: {business.contact.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
