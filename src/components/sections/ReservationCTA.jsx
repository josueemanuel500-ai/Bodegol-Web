/**
 * ReservationCTA.jsx — Reservation Call-to-Action Banner
 *
 * Full-width conversion section placed between Gallery and Testimonials.
 * Currently: all CTAs open WhatsApp with prefilled messages.
 *
 * FUTURE INTEGRATION:
 *   When siteConfig.features.reservationSystem = true, this section will
 *   show an inline reservation form connected to:
 *   - api.bodegol.com.mx
 *   - Supabase (reservations table)
 *   - backoffice.bodegol.com.mx (admin confirmation panel)
 *   - Raven POS (table management)
 *
 * Content: inline (short, conversion-focused — no data file needed).
 * Business info (WhatsApp, phone): from data/business.js
 */

import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, Calendar, Clock, Users, Sparkles } from 'lucide-react'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

const steps = [
  {
    icon:  MessageCircle,
    step:  '1',
    title: 'Escríbenos',
    desc:  'Por WhatsApp o llamada',
  },
  {
    icon:  Calendar,
    step:  '2',
    title: 'Elige fecha y hora',
    desc:  'Te damos disponibilidad al instante',
  },
  {
    icon:  Users,
    step:  '3',
    title: 'Confirma tu grupo',
    desc:  'Cuántos vienen y la ocasión',
  },
  {
    icon:  Sparkles,
    step:  '4',
    title: '¡Listo! A disfrutar',
    desc:  'Tu cancha y mesa esperándote',
  },
]

export default function ReservationCTA() {
  const { business } = useBusiness()

  const waUrlCancha = buildWhatsAppUrl(
    business.contact.whatsapp,
    '¡Hola Bodegol! Quiero reservar una cancha. ¿Qué disponibilidad tienen?'
  )

  const waUrlMesa = buildWhatsAppUrl(
    business.contact.whatsapp,
    '¡Hola! Me gustaría reservar una mesa en Bodegol para ver un partido.'
  )

  return (
    <section
      id="reservation"
      className="relative overflow-hidden bg-surface-elevated border-y border-border-default"
      aria-labelledby="reservation-heading"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div className="w-full h-full"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px)',
          }}
        />
      </div>

      {/* Green accent line top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent" aria-hidden="true" />

      <div className="relative z-10 site-container py-20">

        {/* Heading */}
        <motion.div
          variants={ANIMATION.FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-brand-primary font-ui font-semibold text-sm uppercase tracking-widest mb-3">
            📲 Reservaciones
          </p>
          <h2
            id="reservation-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-text-primary mb-5 leading-tight"
          >
            Reserva en menos de{' '}
            <span className="text-brand-primary">2 minutos</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto leading-relaxed">
            Sin formularios. Sin esperas. Solo escríbenos por WhatsApp y te
            confirmamos al momento.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.ol
          variants={ANIMATION.STAGGER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
          aria-label="Pasos para hacer una reservación"
        >
          {steps.map(({ icon: Icon, step, title, desc }, i) => (
            <motion.li
              key={step}
              variants={ANIMATION.FADE_UP}
              className="relative flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-surface-base border border-border-default"
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-8 -right-[calc(1rem+1px)] w-8 h-px bg-border-strong z-10"
                  aria-hidden="true"
                />
              )}

              {/* Step number */}
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                  <Icon size={24} className="text-brand-primary" aria-hidden="true" />
                </div>
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-primary text-white text-xs font-display font-bold flex items-center justify-center">
                  {step}
                </span>
              </div>

              <div>
                <p className="font-ui font-bold text-text-primary text-sm">{title}</p>
                <p className="text-text-muted text-xs mt-0.5 leading-snug">{desc}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>

        {/* CTA Buttons */}
        <motion.div
          variants={ANIMATION.FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary — Cancha */}
          <a
            href={waUrlCancha}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center justify-center gap-3 px-8 py-4 rounded-xl w-full sm:w-auto',
              'bg-brand-primary hover:bg-brand-primary-dark text-white',
              'font-ui font-bold text-base transition-all duration-200',
              'shadow-glow-green hover:shadow-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated'
            )}
          >
            <MessageCircle size={20} aria-hidden="true" />
            <span>
              Reservar Cancha
              <span className="block text-xs font-normal text-white/70">WhatsApp · Respuesta inmediata</span>
            </span>
          </a>

          {/* Secondary — Mesa */}
          <a
            href={waUrlMesa}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center justify-center gap-3 px-8 py-4 rounded-xl w-full sm:w-auto',
              'border border-border-strong hover:border-brand-primary text-text-primary hover:text-brand-primary',
              'font-ui font-bold text-base transition-all duration-200 bg-surface-base hover:bg-brand-primary/5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated'
            )}
          >
            <Calendar size={20} aria-hidden="true" />
            <span>
              Reservar Mesa
              <span className="block text-xs font-normal text-text-muted">Para ver partido o evento</span>
            </span>
          </a>

          {/* Phone */}
          <a
            href={business.contact.phoneTel}
            className={cn(
              'flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl w-full sm:w-auto',
              'text-text-secondary hover:text-text-primary border border-border-default hover:border-border-strong',
              'font-ui font-semibold text-sm transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
            )}
          >
            <Phone size={18} aria-hidden="true" />
            {business.contact.phone}
          </a>
        </motion.div>

        {/* Trust note */}
        <motion.p
          variants={ANIMATION.FADE_IN}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center text-text-muted text-sm font-ui mt-8 flex items-center justify-center gap-1.5"
        >
          <Clock size={13} aria-hidden="true" />
          Confirmación en menos de 15 minutos · Sin depósito previo
        </motion.p>

      </div>
    </section>
  )
}
