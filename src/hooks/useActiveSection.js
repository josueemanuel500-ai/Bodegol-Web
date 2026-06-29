/**
 * useActiveSection.js — Active Section Tracker
 *
 * Uses IntersectionObserver to track which section ID is currently
 * the most visible in the viewport. Used by the Navbar to highlight
 * the active nav link.
 *
 * Returns: string — the id of the currently active section (e.g. 'about')
 *
 * Usage:
 *   const activeSection = useActiveSection()
 *   // → 'services' when the services section is visible
 */

import { useState, useEffect } from 'react'
import { SECTION_IDS } from '@/constants'

// All section IDs that should be tracked
const TRACKED_SECTIONS = Object.values(SECTION_IDS)

export function useActiveSection(threshold = 0.4) {
  const [activeSection, setActiveSection] = useState(SECTION_IDS.HERO)

  useEffect(() => {
    const observers = []

    TRACKED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold, rootMargin: '-20% 0px -60% 0px' }
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [threshold])

  return activeSection
}

export default useActiveSection
