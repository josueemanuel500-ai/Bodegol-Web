/**
 * TestimonialCard.jsx — Review card (Bodegol DS)
 * Props: testimonial, variant ('default'|'featured')
 */
import React from 'react'
import { Star, Quote } from 'lucide-react'
import { cn } from '@/utils/cn'

const SOURCE_LABEL = { google: 'Google', facebook: 'Facebook', direct: 'Cliente' }

function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de ${max} estrellas`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} size={15} strokeWidth={2} aria-hidden="true"
          className={i < rating ? 'text-warning fill-warning' : 'text-line-strong'} />
      ))}
    </div>
  )
}

function Avatar({ name, src, size = 44 }) {
  const initials = name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
  if (src) {
    return <img src={src} alt={name} width={size} height={size} loading="lazy"
      className="rounded-full object-cover flex-shrink-0" style={{ width: size, height: size }} />
  }
  return (
    <div className="flex flex-shrink-0 items-center justify-center rounded-full font-display text-primary"
      style={{ width: size, height: size, fontSize: size * 0.4, background: 'rgba(255,105,15,0.12)' }} aria-hidden="true">
      {initials}
    </div>
  )
}

export default function TestimonialCard({ testimonial, variant = 'default' }) {
  const isFeatured = variant === 'featured' || testimonial.featured
  return (
    <article className={cn(
      'relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl border bg-surface p-7 transition-all duration-300',
      isFeatured ? 'border-primary/40 shadow-card-lg' : 'border-line shadow-card hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-lg'
    )}>
      <Quote size={48} strokeWidth={1.5} aria-hidden="true"
        className="absolute -right-1 -top-1 text-primary/10" />
      <div className="flex items-center justify-between">
        <StarRating rating={testimonial.rating} />
        {testimonial.source && (
          <span className="t-label text-content-muted">{SOURCE_LABEL[testimonial.source] || 'Cliente'}</span>
        )}
      </div>
      <blockquote className="flex-1"><p className="t-card-body text-[0.95rem]">“{testimonial.text}”</p></blockquote>
      <footer className="mt-auto flex items-center gap-3 border-t border-line pt-4">
        <Avatar name={testimonial.name} src={testimonial.avatar} />
        <div className="min-w-0">
          <p className="font-ui text-sm font-semibold text-content-primary">{testimonial.name}</p>
          <p className="text-xs text-content-muted">{testimonial.role}</p>
        </div>
        <p className="ml-auto flex-shrink-0 text-xs text-content-muted">{testimonial.date}</p>
      </footer>
    </article>
  )
}
