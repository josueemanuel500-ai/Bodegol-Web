/**
 * useScrollLock.js — Body Scroll Lock Hook
 *
 * Prevents body scroll while a modal, mobile menu, or drawer is open.
 * Preserves scroll position and removes padding shift compensation.
 *
 * Usage:
 *   useScrollLock(isModalOpen)
 */

import { useEffect } from 'react'

export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    document.body.style.overflow = 'hidden'
    // Compensate for scrollbar disappearance to prevent layout shift
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [locked])
}

export default useScrollLock
