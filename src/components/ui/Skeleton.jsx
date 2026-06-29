/**
 * Skeleton.jsx — Loading Skeleton Components
 *
 * Pulse-animated placeholders shown while content is loading.
 * Prevents layout shift and reduces perceived wait time.
 *
 * Components:
 *   Skeleton         → generic rectangular skeleton
 *   SkeletonText     → multi-line text placeholder
 *   SkeletonCard     → card-shaped skeleton
 *   SkeletonAvatar   → circular avatar placeholder
 *
 * Usage:
 *   <Skeleton className="h-48 w-full rounded-2xl" />
 *   <SkeletonText lines={3} />
 *   <SkeletonCard />
 */

import React from 'react'
import { cn } from '@/utils/cn'

// ─── Base Skeleton ────────────────────────────────────────────────────────
export function Skeleton({ className = '', ...rest }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-surface-elevated via-border-default to-surface-elevated',
        'bg-[length:200%_100%]',
        className
      )}
      aria-hidden="true"
      {...rest}
    />
  )
}

// ─── Text Lines ───────────────────────────────────────────────────────────
export function SkeletonText({ lines = 3, className = '' }) {
  return (
    <div className={cn('flex flex-col gap-2', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4 rounded-md',
            i === lines - 1 ? 'w-2/3' : 'w-full'  // last line is shorter
          )}
        />
      ))}
    </div>
  )
}

// ─── Avatar ───────────────────────────────────────────────────────────────
export function SkeletonAvatar({ size = 40, className = '' }) {
  return (
    <Skeleton
      className={cn('rounded-full flex-shrink-0', className)}
      style={{ width: size, height: size }}
    />
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────
export function SkeletonCard({ className = '' }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border-default overflow-hidden bg-surface-base',
        className
      )}
      aria-hidden="true"
    >
      {/* Image area */}
      <Skeleton className="h-48 w-full" />
      {/* Content area */}
      <div className="p-5 flex flex-col gap-3">
        <Skeleton className="h-5 w-3/4 rounded-md" />
        <SkeletonText lines={2} />
        <Skeleton className="h-9 w-28 rounded-xl mt-2" />
      </div>
    </div>
  )
}

// ─── Service Card ─────────────────────────────────────────────────────────
export function SkeletonServiceCard() {
  return (
    <div className="p-6 rounded-2xl border border-border-default" aria-hidden="true">
      <Skeleton className="w-12 h-12 rounded-xl mb-4" />
      <Skeleton className="h-5 w-1/2 rounded-md mb-2" />
      <SkeletonText lines={3} />
    </div>
  )
}

// ─── Gallery Item ─────────────────────────────────────────────────────────
export function SkeletonGalleryItem({ aspectRatio = 'aspect-square' }) {
  return <Skeleton className={cn('w-full rounded-2xl', aspectRatio)} />
}

export default Skeleton
