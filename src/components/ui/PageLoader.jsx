/**
 * PageLoader.jsx — Branded full-page loader for Suspense (Bodegol DS)
 */
import React from 'react'

export default function PageLoader() {
  return (
    <div role="status" aria-label="Cargando…"
      className="fixed inset-0 z-[500] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl shadow-glow-primary"
          style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)' }}>
          <span className="font-display text-3xl font-black leading-none text-white">B</span>
          <span className="absolute -inset-2 rounded-3xl border border-primary/30 animate-pulse-glow" aria-hidden="true" />
        </div>
        <div className="h-6 w-6 rounded-full border-2 border-line-strong border-t-primary animate-spin" />
        <span className="sr-only">Cargando Bodegol…</span>
      </div>
    </div>
  )
}
