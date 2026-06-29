/**
 * Container.jsx — Responsive Content Container
 *
 * Wraps content with max-width constraint and horizontal padding.
 * Use instead of repeating 'site-container' class manually.
 *
 * Props:
 *   size      'sm' | 'md' | 'lg' | 'xl' | 'full' — max-width
 *   className additional classes
 *   as        HTML tag or component — default 'div'
 *   children
 *
 * Sizes:
 *   sm   → max-w-3xl  (768px)
 *   md   → max-w-5xl  (1024px)
 *   lg   → max-w-7xl  (1280px) — default, matches site-container
 *   xl   → max-w-screen-2xl
 *   full → no max-width
 */

import React from 'react'
import { cn } from '@/utils/cn'

const SIZE_CLASSES = {
  sm:   'max-w-3xl',
  md:   'max-w-5xl',
  lg:   'max-w-7xl',   // default — matches --max-width-site
  xl:   'max-w-screen-2xl',
  full: 'max-w-full',
}

export default function Container({
  size      = 'lg',
  className = '',
  as: Tag   = 'div',
  children,
  ...rest
}) {
  return (
    <Tag
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        SIZE_CLASSES[size] || SIZE_CLASSES.lg,
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
