/**
 * Highlights.jsx — "Why Bodegol" premium introduction
 *
 * Split layout: emotional copy + experience pillars (left) and a large
 * immersive photograph (right). Stats strip anchors credibility.
 * Sells the EXPERIENCE, not a feature checklist.
 *
 * IMAGE — recommended: 1200 × 1500 px (4:5 portrait), .webp, < 350 KB.
 *   Drop at: public/images/about/venue.jpg  (atmospheric wide shot of the venue at night)
 *
 * Content: short & static (inline). Stats from business.socialProof.
 */
import React from 'react'
import { motion } from 'framer-motion'
import { Goal, Tv2, UtensilsCrossed, PartyPopper } from 'lucide-react'
import { useBusiness } from '@/context/BusinessContext'
import { ANIMATION } from '@/constants'

const pillars = [
  { icon: Goal, title: 'El juego, en serio', desc: '6 canchas de fútbol 7 con pasto sintético profesional.' },
  { icon: Tv2, title: 'Cada partido, en vivo', desc: 'Pantallas gigantes para no perderte ni un gol.' },
  { icon: UtensilsCrossed, title: 'Comida que une', desc: 'Cocina, bar y cervezas frías para antes y después.' },
  { icon: PartyPopper, title: 'Tu mejor festejo', desc: 'Cumpleaños, despedidas y eventos privados.' },
]

export default function Highlights() {
  const { business } = useBusiness()
  const sp = business.socialProof
  const stats = [
    { value: sp.fields, label: 'Canchas F7' },
    { value: `${sp.rating}★`, label: 'En Google' },
    { value: sp.reviews, label: 'Reseñas' },
    { value: `${sp.yearsOpen}+`, label: 'Años en Mérida' },
  ]

  return (
    <section id="highlights" className="section-padding bg-background" aria-labelledby="highlights-heading">
      <div className="site-container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <motion.div
            variants={ANIMATION.STAGGER} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-6"
          >
            <motion.span variants={ANIMATION.FADE_UP} className="t-label text-primary">Por qué Bodegol</motion.span>
            <motion.h2 variants={ANIMATION.FADE_UP} id="highlights-heading" className="t-section-title">
              No es una cancha. Es tu lugar.
            </motion.h2>
            <motion.p variants={ANIMATION.FADE_UP} className="t-section-desc">
              Bodegol nació para los que viven el fútbol diferente: jugar con los tuyos, gritar cada gol en
              pantalla gigante y cerrar la noche con buena comida. Todo en un mismo lugar, en el corazón de Mérida.
            </motion.p>

            <motion.div variants={ANIMATION.STAGGER} className="mt-2 grid gap-5 sm:grid-cols-2">
              {pillars.map(({ icon: Icon, title, desc }) => (
                <motion.div key={title} variants={ANIMATION.FADE_UP} className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-surface-elevated text-primary"
                    style={{ boxShadow: 'inset 0 0 0 1px rgba(255,105,15,0.18)' }}>
                    <Icon size={22} strokeWidth={2} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="t-card-title text-base">{title}</h3>
                    <p className="mt-1 text-sm leading-snug text-content-secondary">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* IMAGE — 1200×1500 (4:5). public/images/about/venue.jpg */}
            <div
              className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-line bg-cover bg-center"
              style={{ backgroundImage: "url('/images/about/venue.jpg')", backgroundColor: 'var(--surface)' }}
              role="img" aria-label="El ambiente nocturno de Bodegol en Mérida"
            >
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(3,17,38,0.85) 100%)' }} />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl border border-line bg-surface/95 p-5 shadow-card-lg backdrop-blur-md">
              <dl className="grid grid-cols-4 gap-2 text-center">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-display text-2xl font-black text-primary">{s.value}</dd>
                    <span className="mt-0.5 block text-[0.6875rem] uppercase tracking-wide text-content-muted">{s.label}</span>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
