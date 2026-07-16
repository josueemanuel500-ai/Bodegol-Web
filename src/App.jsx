/**
 * App.jsx — Root Application Component
 * Provider order (outer → inner):
 *   HelmetProvider → document head (SEO)
 *   ThemeProvider → BusinessProvider → ToastProvider → BrowserRouter → AnalyticsProvider
 */
import React, { Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from '@/router/AppRouter'
import { ThemeProvider } from '@/context/ThemeContext'
import { BusinessProvider } from '@/context/BusinessContext'
import { AnalyticsProvider } from '@/context/AnalyticsContext'
import { ToastProvider } from '@/components/ui/Toast'
import { AdminProvider } from '@/context/AdminContext'
import AdminPanel from '@/components/admin/AdminPanel'
import PageLoader from '@/components/ui/PageLoader'

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BusinessProvider>
          <AdminProvider>
            <ToastProvider>
              <BrowserRouter>
                <AnalyticsProvider>
                  <Suspense fallback={<PageLoader />}>
                    <AppRouter />
                  </Suspense>
                </AnalyticsProvider>
              </BrowserRouter>
            </ToastProvider>
            <AdminPanel />
          </AdminProvider>
        </BusinessProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
