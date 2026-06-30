import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight, ChevronDown } from 'lucide-react'
import { heroContent } from '@/data/hero'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import { cn } from '@/utils/cn'

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } } }
const rise = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } } }

export default function Hero() {
  const { business } = useBusiness()
  const waUrl = buildWhatsAppUrl(business.contact.whatsapp, heroContent.cta.primary.message)

  return (
    <section id="hero" aria-label="Bodegol — Canchas, comida y eventos en Mérida"
      className="relative h-screen min-h-[640px] w-full flex flex-col items-center justify-center overflow-hidden text-center">
      <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(120% 90% at 50% 0%, var(--surface) 0%, var(--background) 100%)' }} />
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-luminosity" style={{ backgroundImage: `url('${heroContent.backgroundImage}')` }} role="img" aria-label={heroContent.backgroundAlt} />
      <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(180deg, rgba(3,17,38,0.55) 0%, rgba(3,17,38,0.35) 40%, rgba(3,17,38,0.92) 100%)' }} />
      <div className="pointer-events-none absolute -top-1/4 left-1/2 -translate-x-1/2 z-0 h-[60vh] w-[80vw] rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, rgba(255,105,15,0.35) 0%, transparent 65%)' }} aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-[40vh] w-[40vw] rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, rgba(13,110,253,0.4) 0%, transparent 70%)' }} aria-hidden="true" />

      <motion.div variants={container} initial="hidden" animate="visible" className="relative z-10 flex flex-col items-center gap-8 px-6 max-w-4xl">
        <motion.div variants={rise} className="flex flex-col items-center gap-4">
          <span className="flex h-20 w-20 items-center justify-center rounded-2xl shadow-glow-primary" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)' }} aria-hidden="true">
            <span className="font-display text-5xl font-black leading-none text-white">B</span>
          </span>
          <span className="font-display text-3xl font-black uppercase tracking-[0.35em] text-white pl-[0.35em]">Bodegol</span>
        </motion.div>

        <motion.h1 variants={rise} style={{ whiteSpace: 'pre-line' }} className="t-hero-title text-white">
          {heroContent.headline}
        </motion.h1>

        <motion.p variants={rise} className="t-hero-subtitle max-w-2xl text-white/70">
          {heroContent.subheadline}
        </motion.p>

        <motion.div variants={rise} className="mt-2 flex flex-col sm:flex-row items-center gap-4">
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className={cn('group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl','t-button text-white','bg-primary hover:bg-primary-hover transition-all duration-300','shadow-glow-primary hover:shadow-glow-accent','hover:-translate-y-0.5','focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-hover focus-visible:ring-offset-2 focus-visible:ring-offset-background')}>
            <MessageCircle size={20} aria-hidden="true" />
            {heroContent.cta.primary.label}
          </a>
          <a href={heroContent.cta.secondary.href}
            className={cn('group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl','t-button text-white','border border-white/25 bg-white/5 backdrop-blur-sm','hover:border-white/50 hover:bg-white/10 transition-all duration-300','focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background')}>
            {heroContent.cta.secondary.label}
            <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40" aria-hidden="true">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
          <ChevronDown size={26} />
        </motion.div>
      </motion.div>
    </section>
  )
}
