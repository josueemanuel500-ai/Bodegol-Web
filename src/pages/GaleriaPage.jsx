/**
 * GaleriaPage.jsx — Galería de fotos + testimonios.
 */
import React from 'react'
import SEO from '@/components/ui/SEO'
import Gallery from '@/components/sections/Gallery'
import Testimonials from '@/components/sections/Testimonials'

export default function GaleriaPage() {
  return (
    <>
      <SEO
        title="Galería"
        description="Fotos de las canchas e instalaciones de Bodegol, Mérida — y lo que dicen quienes ya juegan aquí."
        path="/galeria"
      />
      <div className="pt-[var(--nav-height)]">
        <Gallery />
        <Testimonials />
      </div>
    </>
  )
}
