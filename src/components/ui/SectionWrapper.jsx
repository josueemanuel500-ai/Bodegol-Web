/**
 * SectionWrapper.jsx — Section Container with scroll-triggered animation
 *
 * Props:
 *   id          string — anchor id
 *   className   string
 *   innerClass  string — classes on inner container div
 *   background  'base' | 'elevated' | 'dark' | 'none'
 *   animate     boolean — scroll fade-in (default true)
 *   children
 */

import React from 'react'
import { motion } from 'framer-motion'
import { ANIMATION } from '@/constants'
import { cn } from '@/utils/cn'

const BG = {
  base:     'bg-surface-base',
  elevated: 'bg-surface-elevated',
  dark:     'bg-black',
  none:     '',
}

export default function SectionWrapper({
  id,
  className  = '',
  innerClass = '',
  background = 'base',
  animate    = true,
  children,
}) {
  const Tag = animate ? motion.section : 'section'

  const motionProps = animate
    ? {
        initial:     'hidden',
        whileInView: 'visible',
        viewport:    { once: true, amount: 0.08 },
        variants:    ANIMATION.FADE_UP,
      }
    : {}

  return (
    <Tag
      id={id}
      className={cn(
        'section-padding',
        BG[background] ?? BG.base,
        className
      )}
      aria-labelledby={id ? `${id}-heading` : undefined}
      {...motionProps}
    >
      <div className={cn('site-container', innerClass)}>
        {children}
      </div>
    </Tag>
  )
}
