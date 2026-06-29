/**
 * HomePage.jsx - Bodegol landing experience
 */
import React from 'react'
import SEO from '@/components/ui/SEO'
import Hero from '@/components/sections/Hero'
import Highlights from '@/components/sections/Highlights'
import Fields from '@/components/sections/Fields'
import MenuSection from '@/components/sections/Menu'
import Promotions from '@/components/sections/Promotions'
import Packages from '@/components/sections/Packages'
import Events from '@/components/sections/Events'
import Testimonials from '@/components/sections/Testimonials'
import Gallery from '@/components/sections/Gallery'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import ReservationCTA from '@/components/sections/ReservationCTA'

export default function HomePage() {
  return (
    <>
      <SEO
        title="Canchas de Futbol 5x5, Comida y Eventos en Merida"
        description="Bodegol: 6 canchas de futbol 5x5, pantallas gigantes, bar y restaurante en Merida, Yucatan. Reserva tu cancha o mesa por WhatsApp al instante."
      />
      <Hero />
      <Highlights />
      <Fields />
      <MenuSection />
      <Promotions />
      <Packages />
      <Events />
      <Testimonials />
      <Gallery />
      <FAQ />
      <Contact />
      <ReservationCTA />
    </>
  )
}
