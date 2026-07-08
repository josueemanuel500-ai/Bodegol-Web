/**
 * Footer.jsx — Minimal, professional footer (Bodegol DS)
 * Content from data/footer.js, data/social.js, data/business.js. No clutter.
 */
import React from 'react'
import { MessageCircle, Phone, Mail, MapPin, Instagram, Facebook, Music2, ExternalLink } from 'lucide-react'
import { footerConfig } from '@/data/footer'
import { activeSocial } from '@/data/social'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import { cn } from '@/utils/cn'

const SOCIAL_ICONS = { Instagram, Facebook, Music2, MessageCircle }
const currentYear = new Date().getFullYear()

export default function Footer() {
  const { business } = useBusiness()
  const waUrl = buildWhatsAppUrl(business.contact.whatsapp, business.contact.whatsappMessage)
  const contacts = [
    { icon: MessageCircle, label: 'WhatsApp — reservaciones', href: waUrl, ext: true },
    { icon: Phone, label: business.contact.phone, href: business.contact.phoneTel },
    { icon: Mail, label: business.contact.email, href: `mailto:${business.contact.email}` },
    { icon: MapPin, label: `${business.location.address}, ${business.location.city}`, href: business.location.mapsUrl, ext: true },
  ]

  return (
    <footer className="border-t border-line bg-surface" aria-label="Pie de página de Bodegol">
      <div className="site-container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <a href="/" aria-label={`${business.name} — Inicio`}
              className="w-fit rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <img src="/images/logo/bodegol-logo-footer.png" alt="Deportivo Bodegol" draggable={false} className="h-11 w-auto select-none" />
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-content-secondary">{footerConfig.tagline}</p>
            <div className="flex flex-col gap-2.5">
              {contacts.map((c) => (
                <a key={c.label} href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-flex items-center gap-2.5 font-ui text-sm text-content-secondary transition-colors hover:text-primary">
                  <c.icon size={16} strokeWidth={2} className="flex-shrink-0 text-primary" aria-hidden="true" />
                  {c.label}
                </a>
              ))}
            </div>
            {activeSocial.length > 0 && (
              <div className="mt-1 flex gap-2.5">
                {activeSocial.map((link) => {
                  const Icon = SOCIAL_ICONS[link.icon] || ExternalLink
                  return (
                    <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface-elevated text-content-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary">
                      <Icon size={17} strokeWidth={2} aria-hidden="true" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Reservaciones */}
          <div className="flex flex-col gap-4">
            <h3 className="t-label text-content-primary">{footerConfig.columns[1].heading}</h3>
            <ul className="flex flex-col gap-2.5">
              {footerConfig.columns[1].links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="font-ui text-sm text-content-secondary transition-colors hover:text-primary">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Horarios — al costado de Reservaciones */}
          <div className="flex flex-col gap-4">
            <h3 className="t-label text-content-primary">Horarios</h3>
            <dl className="flex flex-col gap-2.5">
              {business.hours.map((h) => (
                <div key={h.days}>
                  <dt className="font-ui text-sm text-content-secondary">{h.days}</dt>
                  <dd className="font-ui text-sm font-semibold text-content-primary">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <div className="site-container flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-center text-xs text-content-muted font-ui sm:text-left">
            © {currentYear} {footerConfig.copyrightName}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            {footerConfig.bottomLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-xs text-content-muted font-ui transition-colors hover:text-content-secondary">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
