/**
 * SectionHeading.jsx — Reusable Section Title Block
 *
 * Props:
 *   eyebrow   string — small label above heading
 *   title     string — main h2 text
 *   subtitle  string — supporting paragraph
 *   align     'left' | 'center' | 'right'
 *   id        string — for aria-labelledby
 *   as        'h1' | 'h2' | 'h3'
 *   accent    boolean — show green accent line (default true)
 */

import React from 'react'
import { cn } from '@/utils/cn'

const ALIGN = {
  left:   'text-left items-start',
  center: 'text-center items-center',
  right:  'text-right items-end',
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align   = 'center',
  id,
  as: Tag = 'h2',
  accent  = true,
}) {
  const alignClass = ALIGN[align] || ALIGN.center

  return (
    <div className={cn('flex flex-col gap-3 mb-12 md:mb-16', alignClass)}>

      {/* Eyebrow — displayed above accent bar */}
      {eyebrow && (
        <p className="text-brand-primary font-ui text-sm font-semibold tracking-widest">
          {eyebrow}
        </p>
      )}

      {/* Decorative green accent bar */}
      {accent && (
        <div
          className="w-12 h-1 rounded-full bg-gradient-to-r from-brand-primary to-brand-primary-light"
          aria-hidden="true"
        />
      )}

      {/* Main heading */}
      <Tag
        id={id}
        className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-text-primary leading-[1.1] tracking-tight"
      >
        {title}
      </Tag>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
