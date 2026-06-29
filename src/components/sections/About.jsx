/**
 * About.jsx — About / Nosotros Section
 *
 * Introduces the business: story, values, key stats.
 * Content comes from business.js.
 * Image path is configurable.
 */

import React from 'react'
import { motion } from 'framer-motion'
import { useBusiness } from '@/context/BusinessContext'
import SectionWrapper  from '@/components/ui/SectionWrapper'
import SectionHeading  from '@/components/ui/SectionHeading'
import LazyImage       from '@/components/ui/LazyImage'
import { SECTION_IDS, ANIMATION } from '@/constants'

// ─── About Content Config ────────────────────────────────────────────────────
const aboutConfig = {
  image:    '/images/about/about-main.webp',
  imageAlt: 'Interior de Bodegol, restaurante deportivo en Mérida',
  stats: [
    { value: '3+',    label: 'Años de experiencia' },
    { value: '10K+',  label: 'Clientes satisfechos' },
    { value: '20+',   label: 'Pantallas HD' },
    { value: '200+',  label: 'Asientos disponibles' },
  ],
  values: [
    { icon: '🏆', title: 'Pasión por el fútbol',  description: 'Cada partido es una experiencia única. Vivimos el deporte tanto como tú.' },
    { icon: '🍽️', title: 'Calidad en cada plato', description: 'Ingredientes frescos, recetas propias y la dedicación de nuestros chefs.' },
    { icon: '🎉', title: 'Momentos memorables',   description: 'Desde una noche casual hasta eventos especiales — hacemos que valga la pena.' },
  ],
}

export default function About() {
  const { business } = useBusiness()

  return (
    <SectionWrapper id={SECTION_IDS.ABOUT} background="base">
      {/* ─── Heading ───────────────────────────────────────────────────── */}
      <SectionHeading
        id={`${SECTION_IDS.ABOUT}-heading`}
        eyebrow="Nuestra Historia"
        title="Más que un lugar, una experiencia"
        subtitle={business.description}
      />

      {/* ─── Content Grid ──────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
        {/* Image */}
        <motion.div
          variants={ANIMATION.SLIDE_LEFT}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <LazyImage
            src={aboutConfig.image}
            alt={aboutConfig.imageAlt}
            aspectRatio="landscape"
            className="rounded-2xl shadow-card-lg"
          />
        </motion.div>

        {/* Values */}
        <motion.div
          variants={ANIMATION.STAGGER_CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          {aboutConfig.values.map((value) => (
            <motion.div
              key={value.title}
              variants={ANIMATION.FADE_UP}
              className="flex gap-4 items-start"
            >
              <span className="text-3xl flex-shrink-0" aria-hidden="true">{value.icon}</span>
              <div>
                <h3 className="font-display font-bold text-text-primary mb-1">{value.title}</h3>
                <p className="text-text-secondary leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ─── Stats ─────────────────────────────────────────────────────── */}
      <motion.div
        variants={ANIMATION.STAGGER_CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        role="list"
        aria-label="Estadísticas de Bodegol"
      >
        {aboutConfig.stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={ANIMATION.SCALE_IN}
            role="listitem"
            className="text-center p-6 rounded-2xl bg-surface-elevated border border-border-default"
          >
            <p className="text-4xl font-display font-bold text-brand-primary mb-1">
              {stat.value}
            </p>
            <p className="text-text-muted text-sm font-ui">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
