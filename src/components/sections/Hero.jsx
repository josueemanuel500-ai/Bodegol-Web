import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight, ChevronDown } from 'lucide-react'
import { heroContent } from '@/data/hero'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import { cn } from '@/utils/cn'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
}

const rise = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Hero() {
  const { business } = useBusiness()
  const waUrl = buildWhatsAppUrl(business.contact.whatsapp, heroContent.cta.primary.message)

  return (
    <section
      id="hero"
      aria-label="Bodegol - Canchas, comida y eventos en Merida"
      className="relative flex h-screen min-h-[640px] w-full flex-col items-center justify-center overflow-hidden text-center"
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(120% 90% at 50% 0%, var(--surface) 0%, var(--background) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: `url('${heroContent.backgroundImage}')` }}
        role="img"
        aria-label={heroContent.backgroundAlt}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(3,17,38,0.55) 0%, rgba(3,17,38,0.35) 40%, rgba(3,17,38,0.92) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute -top-1/4 left-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,105,15,0.35) 0%, transparent 65%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-[40vh] w-[40vw] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(13,110,253,0.4) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex max-w-4xl flex-col items-center gap-8 px-6"
      >
        <motion.div variants={rise} className="flex flex-col items-center gap-4">
          <span
            className="flex h-20 w-20 items-center justify-center rounded-2xl shadow-glow-primary"
            style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)' }}
            aria-hidden="true"
          >
            <span className="font-display text-5xl font-black leading-none text-white">B</span>
          </span>
          <span className="pl-[0.35em] font-display text-3xl font-black uppercase tracking-[0.35em] text-white">
            Bodegol
          </span>
        </motion.div>

        {heroContent.badge && (
          <motion.p variants={rise} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 font-ui text-sm text-white/80 backdrop-blur-md">
            {heroContent.badge}
          </motion.p>
        )}

        <motion.h1 variants={rise} style={{ whiteSpace: 'pre-line' }} className="t-hero-title text-white">
          {heroContent.headline}
        </motion.h1>

        <motion.p variants={rise} className="t-hero-subtitle max-w-2xl text-white/70">
          {heroContent.subheadline}
        </motion.p>

        <motion.div variants={rise} className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4',
              'bg-primary font-ui text-base font-bold text-white transition-all duration-300 hover:bg-primary-hover',
              'shadow-glow-primary hover:-translate-y-0.5 hover:shadow-glow-accent',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-hover focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            )}
          >
            <MessageCircle size={20} aria-hidden="true" />
            {heroContent.cta.primary.label}
          </a>

          <a
            href={heroContent.cta.secondary.href}
            className={cn(
              'group inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4',
              'border border-white/20 bg-white/10 font-ui text-base font-bold text-white backdrop-blur-md',
              'transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            )}
          >
            {heroContent.cta.secondary.label}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>

      <a
        href="#highlights"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 rounded-full p-3 text-white/70 transition-colors hover:text-white"
        aria-label="Ir a la siguiente seccion"
      >
        <ChevronDown size={26} aria-hidden="true" />
      </a>
    </section>
  )
}
