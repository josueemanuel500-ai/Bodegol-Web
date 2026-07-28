/**
 * Modal.jsx — Accessible Modal / Dialog Component
 *
 * Features:
 *   - Traps focus inside the modal (keyboard accessibility)
 *   - Closes on Escape key
 *   - Closes on backdrop click (configurable)
 *   - Prevents body scroll while open
 *   - Framer Motion entrance/exit animation
 *   - ARIA: role="dialog", aria-modal, aria-labelledby
 *
 * Props:
 *   isOpen         boolean
 *   onClose        () => void
 *   title          string — modal heading (used for aria-labelledby)
 *   size           'sm' | 'md' | 'lg' | 'xl' | 'full'
 *   closeOnBackdrop boolean — default true
 *   children       ReactNode — modal content
 *   footer         ReactNode — optional footer (action buttons)
 *
 * Usage:
 *   <Modal isOpen={open} onClose={() => setOpen(false)} title="Reservar Mesa">
 *     <ReservationForm />
 *   </Modal>
 */

import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useScrollLock } from '@/hooks/useScrollLock'
import { cn } from '@/utils/cn'

const SIZES = {
  sm:   'max-w-sm',
  md:   'max-w-lg',
  lg:   'max-w-2xl',
  xl:   'max-w-4xl',
  full: 'max-w-full mx-4',
}

export default function Modal({
  isOpen,
  onClose,
  title,
  size             = 'md',
  closeOnBackdrop  = true,
  children,
  footer,
  className        = '',
}) {
  const dialogRef = useRef(null)

  // Lock body scroll
  useScrollLock(isOpen)

  // Trap focus and handle Escape key
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      // Focus trap
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last  = focusable[focusable.length - 1]
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault()
          ;(e.shiftKey ? last : first)?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    // Auto-focus the dialog on open
    dialogRef.current?.focus()

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const titleId = title ? 'modal-title' : undefined

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-[#020b18]/75 backdrop-blur-sm"
            onClick={closeOnBackdrop ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            key="dialog"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{ opacity: 0,    scale: 0.97,  y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'relative w-full rounded-3xl border border-white/15 bg-surface-base/80 shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl',
              'flex flex-col max-h-[90vh] overflow-hidden',
              'focus:outline-none',
              SIZES[size] || SIZES.md,
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {title && (
              <div className="flex flex-shrink-0 items-center justify-between border-b border-white/15 bg-white/[0.04] px-6 py-4">
                <h2
                  id={titleId}
                  className="text-lg font-display font-bold text-text-primary"
                >
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  aria-label="Cerrar modal"
                  className={cn(
                    'p-2 rounded-xl border border-transparent text-text-muted hover:text-text-primary',
                    'hover:border-white/10 hover:bg-white/10 transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
                  )}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white/[0.035] to-transparent px-6 py-5">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="px-6 py-4 border-t border-border-default flex-shrink-0 flex justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  // Render into document.body via portal
  return typeof document !== 'undefined'
    ? createPortal(modal, document.body)
    : null
}
