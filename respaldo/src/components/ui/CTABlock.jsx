/**
 * CTABlock.jsx — Reusable premium call-to-action panel (Bodegol DS)
 * Props: eyebrow, title, description, children (action buttons), align, className
 */
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export default function CTABlock({
  eyebrow, title, description, children, align = 'center', className = '',
}) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn('relative overflow-hidden rounded-3xl border border-primary/25 px-7 py-12 md:px-14 md:py-16', className)}
      style={{ background: 'linear-gradient(135deg, var(--surface) 0%, var(--background) 100%)' }}
    >
      <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,105,15,0.28) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className={cn('relative z-10 flex flex-col gap-5', alignClass)}>
        {eyebrow && <span className="t-label text-primary">{eyebrow}</span>}
        {title && <h2 className="t-section-title max-w-2xl">{title}</h2>}
        {description && <p className="t-section-desc max-w-xl">{description}</p>}
        {children && <div className="mt-2 flex flex-col sm:flex-row gap-4">{children}</div>}
      </div>
    </motion.div>
  )
}
