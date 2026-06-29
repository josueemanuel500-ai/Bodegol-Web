/**
 * Contact.jsx — Contact & WhatsApp Section
 * Primary CTA for reservations. Multiple contact methods.
 * Business info from data/business.js
 */

import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Phone, Mail, MapPin, Instagram, Facebook, Music2, Clock } from 'lucide-react'
import { useBusiness } from '@/context/BusinessContext'
import { activeSocial } from '@/data/social'
import { buildWhatsAppUrl } from '@/utils/format'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

const SOCIAL_ICONS = {
  Instagram: Instagram,
  Facebook:  Facebook,
  Music2:    Music2,
}

const contactCards = (business) => [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: business.contact.phone,
    href: buildWhatsAppUrl(business.contact.whatsapp, '¡Hola! Quiero hacer una reservación.'),
    external: true,
    primary: true,
  },
  {
    icon: Phone,
    label: 'Llamar',
    value: business.contact.phone,
    href: business.contact.phoneTel,
    external: false,
    primary: false,
  },
  {
    icon: Mail,
    label: 'Email',
    value: business.contact.email,
    href: `mailto:${business.contact.email}`,
    external: false,
    primary: false,
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    value: business.location.address,
    href: business.location.mapsUrl,
    external: true,
    primary: false,
  },
]

export default function Contact() {
  const { business } = useBusiness()
  const waUrlMain = buildWhatsAppUrl(
    business.contact.whatsapp,
    '¡Hola Bodegol! Quiero hacer una reservación.'
  )

  return (
    <SectionWrapper id="contact" background="elevated">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

        {/* Left — CTA side */}
        <motion.div
          variants={ANIMATION.SLIDE_LEFT}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          <SectionHeading
            id="contact-heading"
            eyebrow="📲 Contacto"
            title="¿Listo para reservar?"
            subtitle="Escríbenos por WhatsApp y te confirmamos disponibilidad en minutos. Sin formularios complicados."
            align="left"
          />

          {/* Big WhatsApp CTA */}
          <a
            href={waUrlMain}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group flex items-center gap-4 p-6 rounded-2xl',
              'bg-brand-primary hover:bg-brand-primary-dark',
              'transition-all duration-200 shadow-glow-green hover:shadow-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated'
            )}
          >
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
              <MessageCircle size={28} className="text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="font-display font-black text-white text-xl leading-tight">Reservar por WhatsApp</p>
              <p className="text-white/75 text-sm font-ui mt-0.5">Respuesta inmediata · Sin esperas</p>
            </div>
          </a>

          {/* Other contact methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contactCards(business).slice(1).map(({ icon: Icon, label, value, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className={cn(
                  'flex items-center gap-3 p-4 rounded-xl bg-surface-base border border-border-default',
                  'hover:border-border-strong hover:bg-surface-raised transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
                )}
              >
                <Icon size={18} className="text-brand-primary flex-shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs text-text-muted font-ui">{label}</p>
                  <p className="text-sm text-text-primary font-ui font-medium truncate">{value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Social */}
          {activeSocial.length > 0 && (
            <div className="flex items-center gap-4">
              <p className="text-text-muted text-sm font-ui">Síguenos:</p>
              <div className="flex gap-3">
                {activeSocial.map(link => {
                  const Icon = SOCIAL_ICONS[link.icon] || MessageCircle
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className={cn(
                        'w-10 h-10 rounded-xl border border-border-default bg-surface-base',
                        'flex items-center justify-center text-text-secondary',
                        'hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5',
                        'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
                      )}
                    >
                      <Icon size={18} aria-hidden="true" />
                    </a>
                  )
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Right — Hours & Map */}
        <motion.div
          variants={ANIMATION.SLIDE_RIGHT}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          {/* Hours card */}
          <div className="p-6 rounded-2xl bg-surface-base border border-border-default">
            <div className="flex items-center gap-2 mb-5">
              <Clock size={18} className="text-brand-primary" aria-hidden="true" />
              <h3 className="font-display font-bold text-text-primary">Horarios</h3>
            </div>
            <dl className="flex flex-col gap-3">
              {business.hours.map(h => (
                <div key={h.days} className="flex items-center justify-between gap-4 py-2 border-b border-border-default last:border-0">
                  <dt className="text-text-secondary text-sm font-ui">{h.days}</dt>
                  <dd className="text-text-primary text-sm font-ui font-semibold">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Map placeholder */}
          <a
            href={business.location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group relative overflow-hidden rounded-2xl border border-border-default',
              'hover:border-brand-primary/50 transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
            )}
            aria-label="Ver ubicación en Google Maps"
          >
            <div className="aspect-[16/9] bg-surface-raised flex flex-col items-center justify-center gap-3 text-center p-6">
              <MapPin size={36} className="text-brand-primary" aria-hidden="true" />
              <div>
                <p className="font-display font-bold text-text-primary">{business.location.address}</p>
                <p className="text-text-muted text-sm font-ui">{business.location.city}, {business.location.state}</p>
              </div>
              <span className="text-brand-primary text-sm font-ui font-medium group-hover:underline">
                Ver en Google Maps →
              </span>
            </div>
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
