/**
 * useContentProtection — Protección de contenido centralizada (producción).
 *
 * Bloquea, a nivel de document (un solo set de listeners, sin timers):
 *   contextmenu, copy, cut, dragstart, selectstart
 * Respeta la accesibilidad: NO bloquea en campos editables
 * (input, textarea, select, [contenteditable], .allow-select, [data-allow-select]),
 * para que formularios, buscadores y campos de texto sigan funcionando.
 *
 * La selección de texto y el arrastre/callout de imágenes se refuerzan por CSS
 * (styles/protection.css). Ninguna protección es 100% (ver resumen).
 */
import { useEffect } from 'react'

function editableAncestor(node) {
  const el = node && node.nodeType === 3 ? node.parentElement : node
  if (!el || typeof el.closest !== 'function') return null
  return el.closest(
    'input, textarea, select, [contenteditable=""], [contenteditable="true"], .allow-select, [data-allow-select]'
  )
}

function targetIsEditable(e) {
  return !!editableAncestor(e.target)
}

function selectionIsEditable() {
  if (typeof document === 'undefined') return false
  if (editableAncestor(document.activeElement)) return true
  const sel = window.getSelection ? window.getSelection() : null
  return !!(sel && sel.anchorNode && editableAncestor(sel.anchorNode))
}

export function useContentProtection(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return

    // contextmenu / selectstart: permitir en campos editables
    const onContextMenu = (e) => { if (!targetIsEditable(e)) e.preventDefault() }
    const onSelectStart = (e) => { if (!targetIsEditable(e)) e.preventDefault() }
    // copy / cut: permitir si la selección viene de un campo editable
    const onCopyCut = (e) => { if (!selectionIsEditable()) e.preventDefault() }
    // dragstart: bloquear siempre (arrastre de imágenes/enlaces)
    const onDragStart = (e) => { e.preventDefault() }

    const opts = { capture: true }
    document.addEventListener('contextmenu', onContextMenu, opts)
    document.addEventListener('selectstart', onSelectStart, opts)
    document.addEventListener('copy', onCopyCut, opts)
    document.addEventListener('cut', onCopyCut, opts)
    document.addEventListener('dragstart', onDragStart, opts)

    return () => {
      document.removeEventListener('contextmenu', onContextMenu, opts)
      document.removeEventListener('selectstart', onSelectStart, opts)
      document.removeEventListener('copy', onCopyCut, opts)
      document.removeEventListener('cut', onCopyCut, opts)
      document.removeEventListener('dragstart', onDragStart, opts)
    }
  }, [enabled])
}

export default useContentProtection
