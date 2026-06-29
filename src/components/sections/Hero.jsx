/**
 * Hero.jsx — Bodegol Cinematic Hero Section
 *
 * Phase 1 redesign: full-screen (100vh) cinematic first impression.
 *   - Centered Bodegol logo lockup (navigation menu intentionally removed for now)
 *   - Large premium typography that communicates emotion before information
 *   - Epic football background placeholder (CSS background — degrades gracefully
 *     to a deep navy stadium gradient when the image file is not yet present)
 *   - Dark navy overlay for legibility
 *   - Strong call-to-action buttons (orange primary, glass secondary)
 *   - Beautiful staggered entrance animations
 *
 * Content from src/data/hero.js · WhatsApp number from BusinessContext.
 * Colors are driven entirely by the design-token system (Phase 2):
 * backgrounds use var(--surface)/var(--background), actions use bg-primary.
 */

import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight, ChevronDown } from 'lucide-react'
import { heroContent } from '@/data/hero'
import { useBusiness } from '@/context/BusinessContext'
import { buildWhatsAppUrl } from '@/utils/format'
import { cn } from '@/utils/cn'

// ── Entrance animation presets ──────────────────────────────────────────────
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

  const waUrl = buildWhatsAppUrl(
    business.contact.whatsapp,
    heroContent.cta.primary.message
  )

  return (
    <section
      id="hero"
      aria-label="Bodegol — Canchas, comida y eventos en Mérida"
      className="relative h-screen min-h-[640px] w-full flex flex-col items-center justify-center overflow-hidden text-center"
    >
      {/* ── Background layers ──────────────────────────────────────────── */}
      {/* 1 · Deep navy stadium base — always visible, premium even with no photo */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 0%, var(--surface) 0%, var(--background) 100%)',
        }}
      />

      {/* 2 · Epic football background placeholder (CSS bg — no broken-image icon
             if the file is missing; drop the photo at public/images/hero/hero-bg.jpg) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
        style={{ backgroundImage: `url('${heroContent.backgroundImage}')` }}
        role="img"
        aria-label={heroContent.backgroundAlt}
      />

      {/* 3 · Dark navy overlay for legibility */}
      <div
        className="absolute inset-0 z-0"
        style={{
          /* navy (#031126) at varying opacity for legibility */
          background:
            'linear-gradient(180deg, rgba(3,17,38,0.55) 0%, rgba(3,17,38,0.35) 40%, rgba(3,17,38,0.92) 100%)',
        }}
      />

      {/* 4 · Stadium light glows — adds cinematic atmosphere */}
      <div
        className="pointer-events-none absolute -top-1/4 left-1/2 -translate-x-1/2 z-0 h-[60vh] w-[80vw] rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(255,105,15,0.35) 0%, transparent 65%)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-[40vh] w-[40vw] rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(13,110,253,0.4) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* ── Centered content ───────────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center gap-8 px-6 max-w-4xl"
      >
        {/* Logo lockup — the only "navigation" for now */}
        <motion.div variants={rise} className="flex flex-col items-center gap-4">
          <span
            className="flex h-20 w-20 items-center justify-center rounded-2xl shadow-glow-primary"
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
            }}
            aria-hidden="true"
          >
            <span className="font-display text-5xl font-black leading-none text-white">B</span>
          </span>
          <span className="font-display text-3xl font-black uppercase tracking-[0.35em] text-white pl-[0.35em]">
            Bodegol
          </span>
        </motion.div>

        {/* Headline — emotion first */}
        <motion.h1
          variants={rise}
          style={{ whiteSpace: 'pre-line' }}
          className="t-hero-title text-white"
        >
          {heroContent.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={rise}
          className="t-hero-subtitle max-w-2xl text-white/70"
        >
          {heroContent.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={rise}
          className="mt-2 flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Primary — WhatsApp (orange) */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl',
              'font-ui font-bold text-base text-white',
              'bg-primary hover:bg-primary-hover transition-all duration-300',
              'shadow-glow-primary hover:shadow-glow-accent',
              'hover:-translate-y-0.5',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-hover focus-visible:ring-offset-2 focus-visible:ring-offset-background'
            )}
          >
            <MessageCircle size={20} aria-hidden="true" />
            {heroContent.cta.primary.label}
          </a>

          {/* Secondary — glass */}
          <a
            href={heroContent.cta.secondary.href}
            className={cn(
              'group inl