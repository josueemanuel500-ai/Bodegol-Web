/**
 * Contact.jsx — Contacto, horarios y ubicación
 * Business info from data/business.js. WhatsApp primary CTA.
 *
 * GOOGLE MAPS — pega la URL de inserción (embed) en business.location.mapsEmbed.
 *   El contenedor del mapa es 16:9; recomendado ≥ 1200 × 675 px.
 *   Mientras no haya embed, se muestra un placeholder que abre Google Maps.
 */
import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

export default function Contact() {
  const { business } = useBusiness()
  const waUrl = buildWhatsAppUrl(business.contact.whatsapp, '¡Hola Bodegol! Quiero hacer una reservación.')

  const methods = [
    { icon: Phone, label: 'Teléfono', value: business.contact.phone, href: business.contact.phoneTel, external: false },
    { icon: Mail, label: 'Correo', value: business.contact.email, href: `mailto:${business.contact.email}`, external: false },
    { icon: MapPin, label: 'Dirección', value: business.location.fullAddress, href: business.location.mapsUrl, external: true },
  ]

  return (
    <SectionWrapper id="contact" background="elevated">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left — contacto */}
        <motion.div variants={ANIMATION.SLIDE_LEFT} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex min-w-0 flex-col gap-6 sm:gap-8">
          <SectionHeading id="contact-heading" eyebrow="Contáctanos" title="¿Listo para reservar?"
            subtitle="Escríbenos por WhatsApp y te confirmamos disponibilidad en minutos. Sin formularios complicados."
            align="left" className="mb-4 sm:mb-8" />

          {/* WhatsApp CTA */}
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className={cn('group flex w-full min-w-0 items-center gap-3 rounded-2xl p-4 transition-all duration-300 sm:gap-4 sm:p-6',
              'bg-primary shadow-glow-primary hover:bg-primary-hover hover:shadow-glow-accent hover:-translate-y-0.5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-hover focus-visible:ring-offset-2 focus-visible:ring-offset-surface')}>
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white/20 transition-colors group-hover:bg-white/30 sm:h-14 sm:w-14">
              <MessageCircle size={28} className="text-white" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block break-words font-display text-lg font-black leading-tight text-white sm:text-xl">Reservar por WhatsApp</span>
              <span className="mt-0.5 block break-words font-ui text-xs leading-snug text-white/80 sm:text-sm">{business.contact.phone} · Respuesta inmediata</span>
            </span>
          </a>

          {/* Métodos */}
          <div className="flex flex-col gap-3">
            {methods.map(({ icon: Icon, label, value, href, external }) => (
              <a key={label} href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
                className={cn('flex items-center gap-3 rounded-xl border border-line bg-background p-4 transition-all duration-200',
                  'hover:border-primary/40 hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary')}>
                <Icon size={18} className="flex-shrink-0 text-primary" strokeWidth={2} aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block font-ui text-xs text-content-muted">{label}</span>
                  <span className="block break-words font-ui text-sm font-medium text-content-primary">{value}</span>
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — horarios + mapa */}
        <motion.div variants={ANIMATION.SLIDE_RIGHT} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex min-w-0 flex-col gap-6">
          {/* Horarios */}
          <div className="rounded-2xl border border-line bg-background p-6">
            <div className="mb-5 flex items-center gap-2">
              <Clock size={18} className="text-primary" strokeWidth={2} aria-hidden="true" />
              <h3 className="t-card-title text-lg">Horarios</h3>
            </div>
            <dl className="flex flex-col gap-1">
              {business.hours.map((h) => (
                <div key={h.days} className="flex items-start justify-between gap-4 border-b border-line py-2.5 last:border-0 sm:items-center">
                  <dt className="font-ui text-sm text-content-secondary">{h.days}</dt>
                  <dd className="text-right font-ui text-sm font-semibold text-content-primary">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Mapa: embed si existe, si no placeholder */}
          {business.location.mapsEmbed ? (
            <div className="overflow-hidden rounded-2xl border-2 border-primary/70 shadow-card">
              {/* Barra con colores Bodegol (naranja + blanco) */}
              <div className="flex flex-col items-stretch gap-3 bg-primary px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="inline-flex min-w-0 items-center gap-2 font-ui text-sm font-semibold text-white">
                  <MapPin size={16} strokeWidth={2.25} className="flex-shrink-0" aria-hidden="true" />
                  <span className="truncate">{business.location.fullAddress}</span>
                </span>
                <a href={business.location.mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="self-start rounded-lg bg-white px-3 py-1.5 font-ui text-xs font-bold text-primary transition-transform duration-200 hover:-translate-y-0.5 sm:flex-shrink-0">
                  Cómo llegar
                </a>
              </div>
              {/* Mapa de Google (embed sin API key) */}
              <iframe title="Ubicación de Bodegol en Google Maps" src={business.location.mapsEmbed}
                className="block aspect-[16/10] w-full" style={{ border: 0 }} loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
          ) : (
            <a href={business.location.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Ver ubicación en Google Maps"
              className="group relative block overflow-hidden rounded-2xl border border-line transition-all duration-200 hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              {/* GOOGLE MAPS placeholder (16:9) — reemplazar con embed real */}
              <div className="flex aspect-[16/9] flex-col items-center justify-center gap-3 p-6 text-center"
                style={{ background: 'linear-gradient(160deg, var(--surface-secondary) 0%, var(--background) 100%)' }}>
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <MapPin size={28} strokeWidth={2} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-lg font-bold uppercase tracking-wide text-content-primary">{business.location.address}</span>
                  <span className="block font-ui text-sm text-content-muted">{business.location.zip} {business.location.city}, {business.location.state}</span>
                </span>
                <span className="font-ui text-sm font-semibold text-primary group-hover:underline">Ver en Google Maps →</span>
              </div>
            </a>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
