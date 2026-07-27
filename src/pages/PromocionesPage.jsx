/**
 * PromocionesPage.jsx — Promociones vigentes.
 */
import React from 'react'
import SEO from '@/components/ui/SEO'
import Promotions from '@/components/sections/Promotions'

export default function PromocionesPage() {
  return (
    <>
      <SEO
        title="Promociones"
        description="Promociones vigentes en Bodegol, Mérida — renta de canchas de fútbol 5 vs 5."
        path="/promociones"
      />
      <div className="pt-[var(--nav-height)]">
        <Promotions />
      </div>
    </>
  )
}
