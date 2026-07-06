/**
 * Highlights.jsx — "Why Bodegol" — 3 premium feature cards.
 * Sells the experience: fields, sports experience, food & drinks.
 * Static content (inline). Architecture & id unchanged.
 */
import React from 'react'
import { motion } from 'framer-motion'
import { Goal, Trophy, UtensilsCrossed } from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import { ANIMATION } from '@/constants'

const features = [
  { icon: Goal, title: '5 Canchas Profesionales', desc: 'Cinco canchas de fútbol 5v5 con pasto sintético de alta calidad e iluminación nocturna LED.' },
  { icon: Trophy, title: 'Experiencia Deportiva Premium', desc: 'Ambiente profesional, instalaciones cómodas y todo listo para competir con tus amigos.' },
  { icon: UtensilsCrossed, title: 'Comida y Bebidas', desc: 'Cocina y bar para disfrutar antes, durante y después del partido.' },
]

export default function Highlights() {
  return (
    <SectionWrapper id="highlights" background="base">
      <SectionHeading id="highlights-heading" eyebrow="¿Por qué Bodegol?" title="Más que una cancha"
        subtitle="Canchas de fútbol en Mérida, buena comida y el mejor ambiente deportivo, todo en un mismo lugar." />

      <motion.div variants={ANIMATION.STAGGER} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <motion.article key={title} variants={ANIMATION.FADE_UP}
            className="group flex flex-col gap-5 rounded-2xl border border-line bg-surface p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-elevated text-primary transition-transform duration-300 group-hover:scale-105"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(255,105,15,0.18)' }}>
              <Icon size={26} strokeWidth={2} aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="t-card-title">{title}</h3>
              <p className="t-card-body">{desc}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
