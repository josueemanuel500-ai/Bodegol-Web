/**
 * Footer.jsx — Bodegol Site Footer
 *
 * Contains: logo, tagline, nav columns, social links,
 * contact info, business hours, legal links, copyright.
 *
 * All content from:
 *   - src/data/footer.js   (columns, tagline, legal links)
 *   - src/data/social.js   (social media links)
 *   - src/data/business.js (contact, hours, name)
 */

import React from 'react'
import { MessageCircle, Phone, Mail, MapPin, Instagram, Facebook, Music2, ExternalLink } from 'lucide-react'
import { footerConfig } from '@/data/footer'
import { activeSocial } from '@/data/social'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import { cn } from '@/utils/cn'

// Map icon string names to Lucide components
const SOCIAL_ICONS = {
  Instagram,
  Facebook,
  Music2,
  MessageCircle,
}

const currentYear = new Date().getFullYear()

export default function Footer() {
  const { business } = useBusiness()

  const waUrl = buildWhatsAppUrl(
    business.contact.whatsapp,
    business.contact.whatsappMessage
  )

  return (
    <footer
      className="bg-surface-elevated border-t border-border-default"
      aria-label="Pie de página de Bodegol"
    >
      {/* ── Main footer body ────────────────────────────────────── */}
      <div className="site-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* ── Brand column (takes 2 cols on lg) ──────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <a
              href="/"
              aria-label={`${business.name} — Inicio`}
              className="flex items-center gap-2.5 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg"
            >
              <div className="w-9 h-9 bg-brand-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-white font-display font-black text-base">B</span>
              </div>
              <span className="font-display font-black text-2xl text-text-primary tracking-tight">
                Bodegol
              </span>
            </a>

            {/* Tagline */}
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              {footerConfig.tagline}
            </p>

            {/* Quick contact */}
            <div className="flex flex-col gap-2.5">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-ui text-text-secondary hover:text-brand-primary transition-colors"
              >
                <MessageCircle size={15} className="text-brand-primary flex-shrink-0" aria-hidden="true" />
                WhatsApp — reservaciones
              </a>
              <a
                href={business.contact.phoneTel}
                className="flex items-center gap-2 text-sm font-ui text-text-secondary hover:text-text-primary transition-colors"
              >
                <Phone size={15} className="text-brand-primary flex-shrink-0" aria-hidden="true" />
                {business.contact.phone}
              </a>
              <a
                href={`mailto:${business.contact.email}`}
                className="flex items-center gap-2 text-sm font-ui text-text-secondary hover:text-text-primary transition-colors"
              >
                <Mail size={15} className="text-brand-primary flex-shrink-0" aria-hidden="true" />
                {business.contact.email}
              </a>
              <a
                href={business.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm font-ui text-text-secondary hover:text-text-primary transition-colors"
              >
                <MapPin size={15} className="text-brand-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                {business.location.address}, {business.location.city}
              </a>
            </div>

            {/* Social */}
            {activeSocial.length > 0 && (
              <div className="flex gap-2.5 mt-1">
                {activeSocial.map(link => {
                  const Icon = SOCIAL_ICONS[link.icon] || ExternalLink
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className={cn(
                        'w-9 h-9 rounded-xl border border-border-default bg-surface-base',
                        'flex items-center justify-center text-text-muted',
                        'hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5',
                        'transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
                      )}
                    >
                      <Icon size={16} aria-hidden="true" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* ── Nav columns ────────────────────────────────────── */}
          {footerConfig.columns.map(col => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h3 className="font-ui font-bold text-text-primary text-sm uppercase tracking-wider">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm font-ui text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Hours ────────────────────────────────────────────── */}
        <div className="mt-10 pt-8 border-t border-border-default">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <h3 className="font-ui font-bold text-text-primary text-sm uppercase tracking-wider mb-4">
                Horarios
              </h3>
              <dl className="flex flex-col gap-2">
                {business.hours.map(h => (
                  <div key={h.days} className="flex items-center justify-between gap-6">
                    <dt className="text-text-secondary text-sm font-ui">{h.days}</dt>
                    <dd className="text-text-primary text-sm font-ui font-medium">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 md:justify-end">
              {footerConfig.badges.map(badge => (
                <div
                  key={badge.label}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-base border border-border-default text-text-muted text-xs font-ui"
                >
                  <span aria-hidden="true">✓</span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div className="border-t border-border-default">
        <div className="site-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs font-ui text-center sm:text-left">
            © {currentYear} {footerConfig.copyrightName}. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4">
            {footerConfig.bottomLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-text-muted hover:text-text-secondary text-xs font-ui transition-colors"
              >
                {link.label}
              </a>
            ))}

            {footerConfig.madeBy && (
              <a
                href={footerConfig.madeBy.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-brand-primary text-xs font-ui transition-colors"
              >
                {footerConfig.madeBy.label}{' '}
                <span className="text-brand-primary font-medium">{footerConfig.madeBy.name}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
