/**
 * useMediaQuery.js — Responsive Media Query Hook
 *
 * Returns true when the given CSS media query matches.
 * SSR-safe (returns false on server / initial render).
 *
 * Usage:
 *   const isMobile  = useMediaQuery('(max-width: 767px)')
 *   const isDesktop = useMediaQuery('(min-width: 1024px)')
 *
 * Convenience hooks are exported for the standard Tailwind breakpoints:
 *   const isMd = useMd()    // ≥ 768px
 *   const isLg = useLg()    // ≥ 1024px
 */

import { useState, useEffect } from 'react'
import { BREAKPOINTS } from '@/constants'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mql = window.matchMedia(query)
    setMatches(mql.matches)

    const handler = (e) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])

  return matches
}

// ─── Convenience Hooks ────────────────────────────────────────────────────
export const useSm  = () => useMediaQuery(`(min-width: ${BREAKPOINTS.SM}px)`)
export const useMd  = () => useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px)`)
export const useLg  = () => useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`)
export const useXl  = () => useMediaQuery(`(min-width: ${BREAKPOINTS.XL}px)`)

export const useIsMobile  = () => useMediaQuery(`(max-width: ${BREAKPOINTS.MD - 1}px)`)
export const useIsTablet  = () => useMediaQuery(`(min-width: ${BREAKPOINTS.MD}px) and (max-width: ${BREAKPOINTS.LG - 1}px)`)
export const useIsDesktop = () => useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`)

export default useMediaQuery
