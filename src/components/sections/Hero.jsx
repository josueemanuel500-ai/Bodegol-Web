/**
 * Hero.jsx — Bodegol Hero Section
 * Full-screen dark hero with background image, headline, stats strip, and dual CTAs.
 * All content from src/data/hero.js
 */

import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, ChevronRight, ChevronDown } from 'lucide-react'
import { heroContent } from '@/data/hero'
import { useBusiness }  from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import { cn } from '@/utils/cn'

export default function Hero() {
  const { business } = useBusiness()

  const waUrl = buildWhatsAppUrl(
    business.contact.whatsapp,
    heroContent.cta.primary.message
  )

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Bodegol — Canchas, comida y eventos en Mérida"
    >
      {/* ── Background ───────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroContent.backgroundImage}
          alt={heroContent.backgroundAlt}
          loading="eager"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay — stronger at bottom for content legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/90" />
        {/* Subtle green tint on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/30 to-transparent" />
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <div className="relative z-10 site-container pt-28 pb-20 flex flex-col gap-8">

        {/* Badge pill */}
        {heroContent.badge && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y:  0  }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/20 border border-brand-primary/40 text-brand-primary-light text-sm font-ui font-medium backdrop-blur-sm">
              {heroContent.badge}
            </span>
          </motion.div>
        )}

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y:  0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[1.05] tracking-tight max-w-4xl"
          style={{ whiteSpace: 'pre-line' }}
        >
          {heroContent.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y:  0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed"
        >
          {heroContent.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y:  0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {/* Primary — WhatsApp */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl',
              'bg-brand-primary hover:bg-brand-primary-dark text-white',
              'font-ui font-bold text-base transition-all duration-200',
              'shadow-glow-green hover:shadow-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black'
            )}
          >
            <MessageCircle size={20} aria-hidden="true" />
            {heroContent.cta.primary.label}
          </a>

          {/* Secondary — internal link */}
          <a
            href={heroContent.cta.secondary.href}
            className={cn(
              'inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl',
              'border border-white/30 text-white hover:border-white/60 hover:bg-white/5',
              'font-ui font-semibold text-base transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black'
            )}
          >
            {heroContent.cta.secondary.label}
            <ChevronRight size={18} aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      {/* ── Stats Strip ──────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y:  0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-sm"
      >
        <div className="site-container py-6">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
            {heroContent.stats.map((stat, i) => (
              <div key={i} className="text-center md:px-8">
                <dt className="text-white/55 text-xs font-ui font-medium uppercase tracking-wider mb-1">
                  {stat.label}
                </dt>
                <dd className="text-3xl font-display font-black text-brand-primary-light">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/40"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  )
}
