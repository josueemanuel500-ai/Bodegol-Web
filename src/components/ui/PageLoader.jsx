/**
 * PageLoader.jsx — Full-page loading spinner for Suspense boundaries
 */

import React from 'react'

export default function PageLoader() {
  return (
    <div
      role="status"
      aria-label="Cargando…"
      className="fixed inset-0 flex items-center justify-center bg-surface-base z-50"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Logo mark */}
        <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center">
          <span className="text-white font-display font-black text-xl">B</span>
        </div>
        {/* Spinner */}
        <div className="w-8 h-8 rounded-full border-2 border-border-strong border-t-brand-primary animate-spin" />
        <span className="sr-only">Cargando Bodegol…</span>
      </div>
    </div>
  )
}
