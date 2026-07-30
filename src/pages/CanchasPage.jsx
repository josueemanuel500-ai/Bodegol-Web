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
        title="Renta de canchas de fútbol 5 en Mérida"
        description="Renta una de nuestras 5 canchas de fútbol 5 en Mérida, con pasto sintético e iluminación nocturna. Consulta precios y reserva por WhatsApp."
        path="/canchas"
      />
      <div className="pt-[var(--nav-height)]">
        <Fields />
        <Pricing />
      </div>
    </>
  )
}
