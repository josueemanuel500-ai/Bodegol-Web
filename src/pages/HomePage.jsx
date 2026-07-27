/**
 * HomePage.jsx — Bodegol landing experience
 * Structure: Hero → Why Bodegol → Reservation CTA. Sitio multipágina — el
 * resto de las secciones (Canchas, Menú, Promociones, Paquetes, Galería,
 * FAQ) viven en sus propias páginas, enlazadas desde el header.
 * (Footer renders in MainLayout.)
 */
import React from 'react'
import SEO from '@/components/ui/SEO'
import Hero from '@/components/sections/Hero'
import Highlights from '@/components/sections/Highlights'   // Why Bodegol
import ReservationCTA from '@/components/sections/ReservationCTA'

export default function HomePage() {
  return (
    <>
      <SEO
        title="Canchas de Fútbol 5v5 en Mérida"
        description="Renta de canchas de fútbol 5 vs 5 en Mérida. 5 canchas profesionales con pasto sintético, iluminación nocturna, comida y eventos. Reserva tu cancha por WhatsApp."
        path="/"
      />
      <Hero />
      <Highlights />
      <ReservationCTA />
    </>
  )
}
