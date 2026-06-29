/**
 * MainLayout.jsx — Main Public Layout
 *
 * Wraps all public-facing pages with:
 *   - Skip-to-content link (accessibility)
 *   - Navbar (sticky header)
 *   - <main> content area (Outlet renders the active page here)
 *   - Footer
 *
 * This layout is shared by all public pages (Home, Privacy, Terms, 404).
 * Future: BackofficeLayout.jsx and AuthLayout.jsx for other contexts.
 */

import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/sections/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'

export default function MainLayout() {
  return (
    <>
      {/* Skip to main content — first focusable element, visible only on keyboard focus */}
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      {/* Sticky top navigation */}
      <Navbar />

      {/* Main content — Outlet renders the matched page component */}
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to top button (appears after scrolling down) */}
      <ScrollToTop />
    </>
  )
}
