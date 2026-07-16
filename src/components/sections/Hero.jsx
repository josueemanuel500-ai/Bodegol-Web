/**
 * Hero.jsx — Cinematic full-screen hero (Bodegol)
 * Logo only (no nav). Ken-Burns backdrop (disabled when the user prefers
 * reduced motion), navy overlays, orange glow, large headline, dual CTAs.
 *
 * IMAGE — football stadium / match. Recommended: 2400 × 1350 px (16:9), .webp < 500 KB.
 *   public/images/hero/hero-stadium.jpg
 */
import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, ArrowRight, ChevronDown } from 'lucide-react'
import { heroContent } from '@/data/hero'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import { useAdmin } from '@/context/AdminContext'
import { useSecretTap } from '@/hooks/useSecretTap'
import { cn } from '@/utils/cn'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } } }
const rise = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] } } }

export default function Hero() {
  const { business } = useBusiness()
  const reduce = useReducedMotion()
  const { openAdmin } = useAdmin()
  const secretTap = useSecretTap(openAdmin) // 7 toques en el logo → panel admin
  const waUrl = buildWhatsAppUrl(business.contact.whatsapp, heroContent.cta.primary.message)
  const title = heroContent.headline
  const endsDot = title.trimEnd().endsWith('.')
  const titleMain = endsDot ? title.trimEnd().slice(0, -1) : title

  return (
    <section id="hero" aria-label="Bodegol — Fútbol 5v5 en Mérida"
      className="relative h-[100svh] min-h-[640px] w-full flex flex-col items-center justify-center overflow-hidden text-center">

      {/* Base navy */}
      <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(120% 90% at 50% 0%, var(--surface) 0%, var(--background) 100%)' }} />

      {/* Ken-Burns stadium image (static if reduced motion). Two sources:
          desktop 1920×1080 (16:9) and mobile 1080×1350 (4:5). */}
      <motion.div
        className="absolute inset-0 z-0 hidden bg-cover bg-center opacity-45 mix-blend-luminosity md:block"
        style={{ backgroundImage: `url('${heroContent.backgroundImage}')` }}
        initial={{ scale: 1.06 }}
        animate={reduce ? { scale: 1.06 } : { scale: 1.14 }}
        transition={reduce ? undefined : { duration: 22, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        role="img" aria-label={heroContent.backgroundAlt}
      />
      <motion.div
        className="absolute inset-0 z-0 block bg-cover bg-center opacity-45 mix-blend-luminosity md:hidden"
        style={{ backgroundImage: `url('${heroContent.backgroundImageMobile || heroContent.backgroundImage}')` }}
        initial={{ scale: 1.06 }}
        animate={reduce ? { scale: 1.06 } : { scale: 1.12 }}
        transition={reduce ? undefined : { duration: 22, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        aria-hidden="true"
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(180deg, rgba(3,17,38,0.55) 0%, rgba(3,17,38,0.30) 38%, rgba(3,17,38,0.96) 100%)' }} />
      <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(120% 80% at 50% 45%, transparent 45%, rgba(3,17,38,0.7) 100%)' }} aria-hidden="true" />
      <div className="pointer-events-none absolute -top-1/4 left-1/2 z-0 h-[65vh] w-[85vw] -translate-x-1/2 rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(255,105,15,0.4) 0%, transparent 65%)' }} aria-hidden="true" />

      {/* Content */}
      <motion.div variants={container} initial="hidden" animate="visible" className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-7 px-6">
        <motion.div variants={rise}>
          <img
            src={business.logo.main}
            alt={business.logo.alt}
            draggable={false}
            onClick={secretTap}
            className="h-44 w-auto cursor-default select-none drop-shadow-2xl md:h-56"
          />
        </motion.div>

        <motion.h1 variants={rise} className="t-hero-title text-white">
          {titleMain}{endsDot && <span className="text-primary">.</span>}
        </motion.h1>

        <motion.span variants={rise} aria-hidden="true" className="h-1 w-16 rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--primary), var(--primary-hover))' }} />

        <motion.p variants={rise} className="t-hero-subtitle max-w-2xl text-white/80">
          {heroContent.subheadline}
        </motion.p>

        {/* CTAs — full width on mobile for large tap targets */}
        <motion.div variants={rise} className="mt-1 flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className={cn('group inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-8 py-4 sm:w-auto','t-button text-white',
              'bg-primary hover:bg-primary-hover transition-all duration-300','shadow-glow-primary hover:shadow-glow-accent','hover:-translate-y-0.5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-hover focus-visible:ring-offset-2 focus-visible:ring-offset-background')}>
            <MessageCircle size={20} aria-hidden="true" />
            {heroContent.cta.primary.label}
          </a>
          <a href={heroContent.cta.secondary.href}
            className={cn('group inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 sm:w-auto','t-button text-white',
              'border border-white/30 bg-white/5 backdrop-blur-sm','hover:border-white/60 hover:bg-white/10 transition-all duration-300',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background')}>
            {heroContent.cta.secondary.label}
            <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.p variants={rise} className="t-caption text-white/65">
          Reservaciones al instante por WhatsApp · {business.contact.phone}
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-white/50" aria-hidden="true">
        <motion.div animate={reduce ? undefined : { y: [0, 8, 0] }} transition={reduce ? undefined : { repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <ChevronDown size={26} />
        </motion.div>
      </motion.div>

      {/* Bottom blend into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32" style={{ background: 'linear-gradient(180deg, transparent 0%, var(--background) 100%)' }} aria-hidden="true" />
    </section>
  )
}
