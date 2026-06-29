/**
 * SectionWrapper.jsx — Section container w/ scroll-in animation (Bodegol DS)
 * Props: id, className, innerClass, background ('base'|'elevated'|'dark'|'none'), animate
 */
import React from 'react'
import { motion } from 'framer-motion'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

const BG = {
  base: 'bg-background',
  elevated: 'bg-surface',
  dark: 'bg-background',
  none: '',
}

export default function SectionWrapper({
  id, className = '', innerClass = '', background = 'base', animate = true, children,
}) {
  const Tag = animate ? motion.section : 'section'
  const motionProps = animate
    ? { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.08 }, variants: ANIMATION.FADE_UP }
    : {}
  return (
    <Tag id={id}
      className={cn('section-padding scroll-mt-20', BG[background] ?? BG.base, className)}
      aria-labelledby={id ? `${id}-heading` : undefined} {...motionProps}>
      <div className={cn('site-container', innerClass)}>{children}</div>
    </Tag>
  )
}
