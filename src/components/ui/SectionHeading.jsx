/**
 * SectionHeading.jsx — Section title block (Bodegol DS)
 * Props: eyebrow, title, subtitle, align, id, as, accent
 */
import React from 'react'
import { cn } from '@/utils/cn'

const ALIGN = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
}

export default function SectionHeading({
  eyebrow, title, subtitle, align = 'center', id, as: Tag = 'h2', accent = true, className = '',
}) {
  return (
    <div className={cn('flex flex-col gap-4 mb-14 md:mb-20', ALIGN[align] || ALIGN.center, className)}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 self-auto">
          {accent && <span className="h-px w-6 bg-primary" aria-hidden="true" />}
          <span className="t-label text-primary">{eyebrow}</span>
          {accent && align === 'center' && <span className="h-px w-6 bg-primary" aria-hidden="true" />}
        </span>
      )}
      <Tag id={id} className="t-section-title">{title}</Tag>
      {subtitle && <p className="t-section-desc max-w-2xl">{subtitle}</p>}
    </div>
  )
}
