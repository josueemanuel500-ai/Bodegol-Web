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
// Navbar intentionally disabled for Phase 1 — the Hero is the first impression.
// Re-enable by uncommenting the import and the <Navbar /> render below.
// import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/sections/Footer'
import ScrollToTop from '@/components/ui/ScrollToTop'

export default function MainLayout() {
  return (
    <>
      {/* Skip to main content — first focusable element, visible only on keyboard focus */}
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>

      {/* Sticky top navigation — removed for Phase 1 (cinematic hero focus) */}
      {/* <Navbar /> */}

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
