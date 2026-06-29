/**
 * Grid.jsx — Responsive Grid Layout
 *
 * Shorthand for common responsive grid patterns.
 *
 * Props:
 *   cols    number | { sm, md, lg } — columns at each breakpoint
 *   gap     'sm' | 'md' | 'lg' — gap size
 *   className
 *   children
 *
 * Examples:
 *   <Grid cols={3} gap="md">...</Grid>
 *   <Grid cols={{ sm: 1, md: 2, lg: 3 }} gap="lg">...</Grid>
 */

import React from 'react'
import { cn } from '@/utils/cn'

const GAP_CLASSES = {
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
}

const COLS_MAP = {
  1: 'grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  6: 'sm:grid-cols-3 lg:grid-cols-6',
}

export default function Grid({
  cols      = 3,
  gap       = 'md',
  className = '',
  children,
  ...rest
}) {
  const colClass = typeof cols === 'number'
    ? COLS_MAP[cols] || `grid-cols-${cols}`
    : [
        cols.sm ? `sm:grid-cols-${cols.sm}` : '',
        cols.md ? `md:grid-cols-${cols.md}` : '',
        cols.lg ? `lg:grid-cols-${cols.lg}` : '',
      ].filter(Boolean).join(' ')

  return (
    <div
      className={cn(
        'grid',
        colClass,
        GAP_CLASSES[gap] || GAP_CLASSES.md,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
