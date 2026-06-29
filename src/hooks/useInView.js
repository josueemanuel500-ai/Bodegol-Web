/**
 * useInView.js — Intersection Observer Hook
 *
 * Returns a ref and a boolean indicating if the element is in the viewport.
 * Used for triggering animations or lazy loading without Framer Motion.
 *
 * Usage:
 *   const [ref, inView] = useInView({ threshold: 0.2, once: true })
 *   <div ref={ref} className={inView ? 'opacity-100' : 'opacity-0'}>...</div>
 */

import { useState, useEffect, useRef } from 'react'

export function useInView({
  threshold  = 0.1,
  rootMargin = '0px',
  once       = true,
} = {}) {
  const ref     = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}

export default useInView
