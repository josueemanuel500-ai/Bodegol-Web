/**
 * Main public layout shared by all routes.
 */

import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '@/components/sections/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'

export default function MainLayout() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />
      <ScrollToTop />
    </>
  )
}
