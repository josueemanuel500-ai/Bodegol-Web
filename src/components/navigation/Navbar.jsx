/**
 * Navbar.jsx — Bodegol Navigation
 *
 * Sitio multipágina (React Router): el header arranca oculto sobre el Hero
 * de Inicio (cinematic focus) y, en cuanto el usuario hace scroll, se
 * desliza a la vista y se queda visible el resto de la sesión (no se
 * vuelve a ocultar). En cualquier otra página arranca ya visible — no hay
 * hero de pantalla completa ahí, el usuario necesita navegar de inmediato.
 *
 * Dark transparent → solid on scroll. Mobile hamburger. Botón "Reservar"
 * siempre disponible (abre el mismo modal que usa ReservationCTA en
 * Inicio), así no hace falta repetir ese bloque en cada página.
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, MessageCircle, CalendarDays } from 'lucide-react'
import { mainNavLinks, navCTA } from '@/data/navigation'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import { cn } from '@/utils/cn'
import siteConfig from '@/config/site.config'
import Modal from '@/components/ui/Modal'
import ReservationForm from '@/components/sections/ReservationForm'

export default function Navbar() {
  const { business } = useBusiness()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formOpen, setFormOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Oculto solo sobre el hero de Inicio y solo mientras no se ha bajado —
  // en cuanto se hace scroll aparece, y al volver arriba se vuelve a
  // ocultar (simétrico). En cualquier otra página no hay hero de pantalla
  // completa, así que siempre está visible.
  const revealed = location.pathname !== '/' || scrolled

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const whatsappUrl = buildWhatsAppUrl(
    business.contact.whatsapp,
    business.contact.whatsappMessage
  )

  const isActive = (href) => location.pathname === href

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-nav transition-all duration-300',
          'transition-transform duration-500 ease-out',
          revealed ? 'translate-y-0' : '-translate-y-full pointer-events-none',
          scrolled || menuOpen
            ? 'bg-surface-base/95 backdrop-blur-md border-b border-border-default shadow-[0_1px_20px_rgba(0,0,0,0.4)]'
            : 'bg-gradient-to-b from-black/70 to-transparent'
        )}
        style={{ height: 'var(--nav-height)' }}
      >
        <div className="site-container h-full flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            aria-label={`${business.name} — Inicio`}
            className="flex items-center gap-2.5 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg"
          >
            <img
              src="/images/logo/bodegol-logo-header-custom.png"
              alt="Deportivo Bodegol"
              className="h-8 w-auto select-none object-contain sm:h-9"
              draggable={false}
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-1">
            {mainNavLinks.map((link) => (
              <Link
                key={link.id}
                to={link.href}
                className={cn(
                  'relative px-3.5 py-2 text-sm font-ui font-medium rounded-lg transition-colors duration-200',
                  isActive(link.href)
                    ? 'text-brand-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                )}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-brand-primary/10 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2.5">
            {siteConfig.features.reservationSystem && (
              <button
                onClick={() => setFormOpen(true)}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl',
                  'border border-white/35 text-white hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/10',
                  'font-ui font-semibold text-sm transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base'
                )}
              >
                <CalendarDays size={16} aria-hidden="true" />
                Reservar
              </button>
            )}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl',
                'bg-brand-primary hover:bg-brand-primary-dark text-white',
                'font-ui font-semibold text-sm transition-all duration-200',
                'shadow-glow-green hover:shadow-none focus-visible:outline-none',
                'focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base'
              )}
            >
              <MessageCircle size={16} aria-hidden="true" />
              {navCTA.label}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99] bg-surface-base flex flex-col pt-[var(--nav-height)] lg:hidden"
          >
            <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Menú móvil">
              <ul className="flex flex-col gap-1">
                {mainNavLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'flex items-center px-4 py-4 text-lg font-ui font-medium rounded-xl transition-colors',
                        isActive(link.href)
                          ? 'text-brand-primary bg-brand-primary/10'
                          : 'text-text-primary hover:bg-surface-elevated'
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {siteConfig.features.reservationSystem && (
                <button
                  onClick={() => { setMenuOpen(false); setFormOpen(true) }}
                  className={cn(
                    'mt-4 flex items-center justify-center gap-2.5 w-full py-4 rounded-xl',
                    'border border-white/25 text-text-primary hover:border-brand-primary hover:text-brand-primary',
                    'font-ui font-bold text-base transition-colors'
                  )}
                >
                  <CalendarDays size={20} />
                  Reservar en línea
                </button>
              )}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'mt-3 flex items-center justify-center gap-2.5 w-full py-4 rounded-xl',
                  'bg-brand-primary hover:bg-brand-primary-dark text-white',
                  'font-ui font-bold text-base transition-colors'
                )}
              >
                <MessageCircle size={20} />
                {navCTA.label}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {siteConfig.features.reservationSystem && (
        <Modal isOpen={formOpen} onClose={() => setFormOpen(false)} title="Reserva tu cancha" size="sm">
          <ReservationForm onSuccess={() => setFormOpen(false)} />
        </Modal>
      )}
    </>
  )
}
