/**
 * useClickOutside.js — Calls onOutside when a click/touch lands outside ref.
 * Used by popover-style pickers (DatePickerField, TimePickerField) to close
 * on outside click. `active` gates the listener so it's only attached while
 * the popover is actually open.
 */
import { useEffect } from 'react'

export function useClickOutside(ref, onOutside, active = true) {
  useEffect(() => {
    if (!active) return
    function handlePointerDown(e) {
      if (ref.current && !ref.current.contains(e.target)) onOutside()
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') onOutside()
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [active, onOutside, ref])
}

export default useClickOutside
