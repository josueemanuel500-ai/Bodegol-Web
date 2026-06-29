/**
 * TestimonialCard.jsx — Testimonial / Review Card
 *
 * Displays a customer review with name, rating, avatar, and text.
 *
 * Props:
 *   testimonial   Object from testimonials.js
 *   variant       'default' | 'featured'
 */

import React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/utils/cn'

const SOURCE_ICONS = {
  google:   '🔍',
  facebook: '📘',
  direct:   '💬',
}

function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de ${max} estrellas`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={14}
          aria-hidden="true"
          className={i < rating ? 'text-status-warning fill-status-warning' : 'text-border-strong'}
        />
      ))}
    </div>
  )
}

function Avatar({ name, src, size = 40 }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
        loading="lazy"
      />
    )
  }

  return (
    <div
      className="rounded-full bg-brand-primary/10 text-brand-primary font-display font-bold flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

export default function TestimonialCard({ testimonial, variant = 'default' }) {
  const isFeatured = variant === 'featured' || testimonial.featured

  return (
    <article
      className={cn(
        'flex flex-col gap-4 rounded-2xl border p-6 bg-surface-base',
        isFeatured
          ? 'border-brand-primary/30 shadow-card-lg'
          : 'border-border-default shadow-card hover:shadow-card-lg transition-shadow'
      )}
    >
      {/* Rating + Source */}
      <div className="flex items-center justify-between">
        <StarRating rating={testimonial.rating} />
        {testimonial.source && (
          <span className="text-sm" aria-label={`Reseña de ${testimonial.source}`}>
            {SOURCE_ICONS[testimonial.source] || '💬'}
          </span>
        )}
      </div>

      {/* Quote */}
      <blockquote>
        <p className="text-text-secondary text-sm leading-relaxed">
          "{testimonial.text}"
        </p>
      </blockquote>

      {/* Author */}
      <footer className="flex items-center gap-3 mt-auto pt-2 border-t border-border-default">
        <Avatar name={testimonial.name} src={testimonial.avatar} />
        <div className="min-w-0">
          <p className="font-ui font-semibold text-text-primary text-sm">{testimonial.name}</p>
          <p className="text-text-muted text-xs">{testimonial.role}</p>
        </div>
        <p className="text-text-muted text-xs ml-auto flex-shrink-0">{testimonial.date}</p>
      </footer>
    </article>
  )
}
