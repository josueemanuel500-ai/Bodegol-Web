/**
 * SectionWrapper.jsx — Section container w/ scroll-in animation (Bodegol DS)
 * Props: id, className, innerClass, background ('base'|'elevated'|'dark'|'none'),
 *        animate, glow (subtle orange ambient blob for cinematic depth)
 */
import React from 'react'
import { motion } from 'framer-motion'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

const BG = { base: 'bg-background', elevated: 'bg-surface', dark: 'bg-background', none: '' }

export default function SectionWrapper({
  id, className = '', innerClass = '', background = 'base', animate = true, glow = false, children,
}) {
  const Tag = animate ? motion.section : 'section'
  const motionProps = animate
    ? { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.08 }, variants: ANIMATION.FADE_UP }
    : {}
  return (
    <Tag id={id}
      className={cn('section-padding scroll-mt-20 relative overflow-hidden', BG[background] ?? BG.base, className)}
      aria-labelledby={id ? `${id}-heading` : undefined} {...motionProps}>
      {glow && (
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[60rem] max-w-full -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl opacity-[0.13]"
          style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }} aria-hidden="true" />
      )}
      <div className={cn('site-container relative', innerClass)}>{children}</div>
    </Tag>
  )
}
