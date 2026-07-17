/**
 * Testimonials.jsx — Customer Reviews Section
 *
 * Displays a featured testimonial prominently + grid of other reviews.
 * Star ratings, avatar initials fallback, source badges.
 * All content from src/data/testimonials.js
 *
 * Future: can be connected to Google Reviews API or a CMS.
 */

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials, testimonialsHeading } from '@/data/testimonials'
import { useBusiness } from '@/context/BusinessContext'
import SectionWrapper from '@/components/ui/SectionWrapper'
import SectionHeading from '@/components/ui/SectionHeading'
import { ANIMATION, SECTION_IDS } from '@/constants'
import { cn } from '@/utils/cn'

// ─── Star Rating ───────────────────────────────────────────────────────────
function Stars({ rating, size = 14 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map(n => (
        <Star
          key={n}
          size={size}
          aria-hidden="true"
          className={n <= rating
            ? 'text-brand-accent fill-brand-accent'
            : 'text-border-strong'
          }
        />
      ))}
    </div>
  )
}

// ─── Avatar with initials fallback ────────────────────────────────────────
function Avatar({ name, src, size = 44 }) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        loading="lazy"
        draggable={false}
        width={size}
        height={size}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
      />
    )
  }

  // Color based on first letter for variety
  const colors = [
    'bg-brand-primary/20 text-brand-primary',
    'bg-brand-accent/20 text-brand-accent',
    'bg-blue-500/20 text-blue-400',
    'bg-purple-500/20 text-purple-400',
    'bg-pink-500/20 text-pink-400',
  ]
  const colorClass = colors[name.charCodeAt(0) % colors.length]

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center flex-shrink-0 font-display font-bold',
        colorClass
      )}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

// Source icons as emoji / text
const SOURCE_LABEL = {
  google:   '★ Google',
  facebook: 'f Facebook',
  direct:   '✓ Verificado',
}

// ─── Featured testimonial (large card) ────────────────────────────────────
function FeaturedTestimonial({ testimonial }) {
  return (
    <div className="relative p-8 md:p-10 rounded-2xl bg-surface-elevated border border-brand-primary/20 overflow-hidden">
      {/* Decorative quote */}
      <Quote
        size={80}
        className="absolute -top-3 -right-3 text-brand-primary/6 rotate-180"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-6">
        <Stars rating={testimonial.rating} size={18} />

        <blockquote>
          <p className="text-text-primary text-xl md:text-2xl font-display font-medium leading-relaxed">
            "{testimonial.text}"
          </p>
        </blockquote>

        <footer className="flex items-center gap-4 pt-4 border-t border-border-default">
          <Avatar name={testimonial.name} src={testimonial.avatar} size={52} />
          <div className="flex-1 min-w-0">
            <p className="font-ui font-bold text-text-primary">{testimonial.name}</p>
            <p className="text-text-muted text-sm font-ui">{testimonial.role}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-ui text-brand-primary font-medium">
              {SOURCE_LABEL[testimonial.source] || testimonial.source}
            </span>
            <span className="text-xs text-text-muted font-ui">{testimonial.date}</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

// ─── Regular testimonial card ─────────────────────────────────────────────
function TestimonialCard({ testimonial }) {
  return (
    <article className="flex flex-col gap-4 p-5 rounded-2xl bg-surface-elevated border border-border-default hover:border-border-strong transition-colors duration-200">
      <div className="flex items-start justify-between gap-3">
        <Stars rating={testimonial.rating} size={13} />
        <span className="text-xs text-text-muted font-ui flex-shrink-0">
          {SOURCE_LABEL[testimonial.source] || testimonial.source}
        </span>
      </div>

      <blockquote>
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-4">
          "{testimonial.text}"
        </p>
      </blockquote>

      <footer className="flex items-center gap-3 pt-3 border-t border-border-default mt-auto">
        <Avatar name={testimonial.name} src={testimonial.avatar} size={36} />
        <div className="min-w-0">
          <p className="text-sm font-ui font-semibold text-text-primary leading-tight">{testimonial.name}</p>
          <p className="text-xs text-text-muted font-ui">{testimonial.role}</p>
        </div>
        <p className="text-xs text-text-muted font-ui ml-auto flex-shrink-0">{testimonial.date}</p>
      </footer>
    </article>
  )
}

// ─── Mobile carousel ─────────────────────────────────────────────────────
function MobileCarousel({ items }) {
  const [index, setIndex] = useState(0)
  const prev = () => setIndex(i => (i - 1 + items.length) % items.length)
  const next = () => setIndex(i => (i + 1) % items.length)

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3 }}
        >
          <TestimonialCard testimonial={items[index]} />
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={prev}
          aria-label="Testimonio anterior"
          className="p-2 rounded-xl bg-surface-elevated border border-border-default text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Ir al testimonio ${i + 1}`}
              className={cn(
                'h-1.5 rounded-full transition-all duration-200',
                i === index ? 'bg-brand-primary w-6' : 'bg-border-strong w-1.5'
              )}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Siguiente testimonio"
          className="p-2 rounded-xl bg-surface-elevated border border-border-default text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────
export default function Testimonials() {
  const featured = testimonials.find(t => t.featured)
  const others   = testimonials.filter(t => !t.featured)

  // Overall stats
  const avgRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)

  return (
    <SectionWrapper id={SECTION_IDS.TESTIMONIALS} background="base">
      <SectionHeading
        id="testimonials-heading"
        eyebrow={testimonialsHeading.eyebrow}
        title={testimonialsHeading.title}
        subtitle={testimonialsHeading.subtitle}
      />

      {/* Rating summary strip */}
      <motion.div
        variants={ANIMATION.FADE_UP}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-6 mb-12 p-5 rounded-2xl bg-surface-elevated border border-border-default"
      >
        <div className="flex flex-col items-center">
          <span className="font-display font-black text-4xl text-brand-primary">{avgRating}</span>
          <Stars rating={Math.round(parseFloat(avgRating))} size={16} />
          <span className="text-text-muted text-xs font-ui mt-1">Calificación promedio</span>
        </div>
        <div className="w-px h-12 bg-border-default hidden sm:block" />
        <div className="flex flex-col items-center">
          <span className="font-display font-black text-4xl text-text-primary">
            {testimonials.length}+
          </span>
          <span className="text-text-muted text-sm font-ui">Reseñas verificadas</span>
        </div>
        <div className="w-px h-12 bg-border-default hidden sm:block" />
        <div className="flex flex-col items-center">
          <span className="font-display font-black text-4xl text-text-primary">10K+</span>
          <span className="text-text-muted text-sm font-ui">Clientes satisfechos</span>
        </div>
      </motion.div>

      {/* Featured */}
      {featured && (
        <motion.div
          variants={ANIMATION.FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8"
        >
          <FeaturedTestimonial testimonial={featured} />
        </motion.div>
      )}

      {/* Grid — hidden on mobile, shown on md+ */}
      {others.length > 0 && (
        <>
          {/* Desktop grid */}
          <motion.div
            variants={ANIMATION.STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {others.map(t => (
              <motion.div key={t.id} variants={ANIMATION.FADE_UP}>
                <TestimonialCard testimonial={t} />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile carousel */}
          <div className="md:hidden">
            <MobileCarousel items={others} />
          </div>
        </>
      )}
    </SectionWrapper>
  )
}
