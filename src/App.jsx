/**
 * App.jsx — Root Application Component
 *
 * Mounts all global context providers, then renders the router.
 * No UI logic lives here.
 *
 * Provider order (outer → inner):
 *   ThemeProvider      → dark/light mode
 *   BusinessProvider   → active business config
 *   ToastProvider      → global toast notifications
 *   AnalyticsProvider  → page view + event tracking (wraps router)
 */

import React, { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter }         from '@/router/AppRouter'
import { ThemeProvider }     from '@/context/ThemeContext'
import { BusinessProvider }  from '@/context/BusinessContext'
import { AnalyticsProvider } from '@/context/AnalyticsContext'
import { ToastProvider }     from '@/components/ui/Toast'
import PageLoader            from '@/components/ui/PageLoader'

export default function App() {
  return (
    <ThemeProvider>
      <BusinessProvider>
        <ToastProvider>
          <BrowserRouter>
            <AnalyticsProvider>
              <Suspense fallback={<PageLoader />}>
                <AppRouter />
              </Suspense>
            </AnalyticsProvider>
          </BrowserRouter>
        </ToastProvider>
      </BusinessProvider>
    </ThemeProvider>
  )
}
