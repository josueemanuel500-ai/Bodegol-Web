/**
 * useSecretTap — dispara onTrigger tras `count` toques dentro de `windowMs`.
 * Uso: const tap = useSecretTap(openAdmin); <img onClick={tap} />
 */
import { useRef, useCallback } from 'react'

export function useSecretTap(onTrigger, { count = 7, windowMs = 3000 } = {}) {
  const taps = useRef(0)
  const timer = useRef(null)
  return useCallback(() => {
    taps.current += 1
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => { taps.current = 0 }, windowMs)
    if (taps.current >= count) {
      taps.current = 0
      if (timer.current) clearTimeout(timer.current)
      onTrigger()
    }
  }, [onTrigger, count, windowMs])
}

export default useSecretTap
