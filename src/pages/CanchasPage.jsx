/**
 * CanchasPage.jsx — Canchas + precios de renta.
 */
import React from 'react'
import SEO from '@/components/ui/SEO'
import Fields from '@/components/sections/Fields'
import Pricing from '@/components/sections/Pricing'

export default function CanchasPage() {
  return (
    <>
      <SEO
        title="Canchas y Precios"
        description="5 canchas de fútbol 5 vs 5 con pasto sintético e iluminación nocturna en Bodegol, Mérida. Consulta precios de renta por hora."
        path="/canchas"
      />
      <div className="pt-[var(--nav-height)]">
        <Fields />
        <Pricing />
      </div>
    </>
  )
}
