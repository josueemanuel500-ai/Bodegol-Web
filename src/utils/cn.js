/**
 * cn.js — Class Name Merge Utility
 *
 * Merges multiple class name strings, filtering out falsy values.
 * Lightweight alternative to clsx/classnames — no dependency needed.
 *
 * Usage:
 *   cn('base-class', isActive && 'active', variant === 'primary' && 'text-white')
 *   // → 'base-class active text-white'
 *
 *   cn('p-4', undefined, null, false, 'rounded-xl')
 *   // → 'p-4 rounded-xl'
 */

export function cn(...classes) {
  return classes
    .flat()
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export default cn
