/**
 * HomePage.jsx — Bodegol landing experience
 * Structure: Hero → Why Bodegol → Fields → Food & Drinks → Pricing →
 *   Promotions → Birthday & Events → Gallery → Testimonials → FAQ → Contact.
 * (Footer renders in MainLayout.) Architecture & routing unchanged.
 */
import React from 'react'
import SEO from '@/components/ui/SEO'
import Hero from '@/components/sections/Hero'
import Highlights from '@/components/sections/Highlights'   // Why Bodegol
import Fields from '@/components/sections/Fields'           // Football Fields
import MenuSection from '@/components/sections/Menu'        // Food & Drinks
import Pricing from '@/components/sections/Pricing'         // Field Rental Pricing
import Promotions from '@/components/sections/Promotions'
import Packages from '@/components/sections/Packages'       // Birthday & Events
import Gallery from '@/components/sections/Gallery'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import ReservationCTA from '@/components/sections/ReservationCTA'

export default function HomePage() {
  return (
    <>
      <SEO
        title="Canchas de Fútbol 5v5 en Mérida"
        description="Renta de canchas de fútbol 5 vs 5 en Mérida. 5 canchas profesionales con pasto sintético, iluminación nocturna, comida y eventos. Reserva tu cancha por WhatsApp."
      />
      <Hero />
      <Highlights />
      <Fields />
      <MenuSection />
      <Pricing />
      <Promotions />
      <Packages />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
      <ReservationCTA />
    </>
  )
}
