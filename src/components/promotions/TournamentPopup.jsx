import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, MessageCircle, X } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { buildWhatsAppUrl } from '@/utils/format'
import { useScrollLock } from '@/hooks/useScrollLock'

const SESSION_KEY = 'bodegol:torneo-veteranos-35:v1'
const WHATSAPP_URL = buildWhatsAppUrl('529999062061', 'Información para el torneo de veteranos')

export default function TournamentPopup() {
  const [open, setOpen] = useState(false)
  const closeButtonRef = useRef(null)
  const openTimerRef = useRef(null)
  const previousPathRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  useScrollLock(open)

  useEffect(() => {
    const previewRequested = new URLSearchParams(window.location.search).get('preview') === 'torneo'
    let alreadySeen = false
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === 'seen'
    } catch {
      // Algunos navegadores bloquean sessionStorage; el popup debe seguir funcionando.
    }
    if (!previewRequested && alreadySeen) return undefined
    openTimerRef.current = window.setTimeout(() => setOpen(true), 700)
    return () => window.clearTimeout(openTimerRef.current)
  }, [])

  useEffect(() => {
    if (previousPathRef.current === null) {
      previousPathRef.current = location.pathname
      return
    }
    if (previousPathRef.current !== location.pathname) {
      previousPathRef.current = location.pathname
      close()
    }
  }, [location.pathname])

  useEffect(() => {
    if (!open) return undefined
    closeButtonRef.current?.focus()
    const closeOnEscape = (event) => event.key === 'Escape' && close()
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])

  function close() {
    if (openTimerRef.current) window.clearTimeout(openTimerRef.current)
    setOpen(false)
    try {
      sessionStorage.setItem(SESSION_KEY, 'seen')
    } catch {
      // Cerrar nunca debe depender de que el navegador permita almacenamiento.
    }
  }

  function viewDetails() {
    close()
    navigate('/torneo-veteranos-35-merida')
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[550] flex items-start justify-center overflow-y-auto bg-[#020b18]/85 p-3 backdrop-blur-md sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onPointerDown={(event) => event.target === event.currentTarget && close()}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="tournament-popup-title"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-primary/40 bg-[#031126] shadow-[0_30px_100px_rgba(0,0,0,0.75)] sm:rounded-3xl"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Cerrar publicidad del torneo"
              className="absolute right-2 top-2 z-20 rounded-full border border-white/25 bg-black/60 p-2 text-white backdrop-blur-md transition hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:right-3 sm:top-3"
            >
              <X size={21} aria-hidden="true" />
            </button>

            <img
              src="/images/promotions/torneo-veteranos-popup.jpg"
              alt="Torneo sabatino de Veteranos 35+, fútbol 5 contra 5, inicia el 5 de septiembre"
              width="1254"
              height="1254"
              className="mx-auto block max-h-[66svh] w-full bg-black object-contain sm:max-h-[72vh] lg:max-h-[74vh]"
            />

            <div className="flex flex-col gap-3 border-t border-white/10 bg-[#031126] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="min-w-0">
                <h2 id="tournament-popup-title" className="font-display text-xl font-black uppercase text-white sm:text-2xl">Torneo Bodegol 35+</h2>
                <p className="font-ui text-sm text-white/65">Inscripciones abiertas · Fútbol 5 vs 5 · Iniciamos el 5 de septiembre</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button type="button" onClick={viewDetails}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-4 py-3 font-ui text-sm font-bold text-white transition hover:border-primary hover:bg-primary/10">
                  Ver detalles <ArrowRight size={17} aria-hidden="true" />
                </button>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={close}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-ui text-sm font-black text-[#062b14] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#35e777] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                  <MessageCircle size={19} aria-hidden="true" /> Información por WhatsApp
                </a>
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
