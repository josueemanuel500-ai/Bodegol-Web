/**
 * AppRouter.jsx — Route Definitions
 * All routes are lazy-loaded for code splitting.
 * BrowserRouter is in App.jsx.
 */

import React, { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'

const HomePage    = lazy(() => import('@/pages/HomePage'))
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'))
const TermsPage   = lazy(() => import('@/pages/TermsPage'))
const NotFoundPage= lazy(() => import('@/pages/NotFoundPage'))

// Future pages — uncomment when ready:
// const ReservationPage = lazy(() => import('@/pages/ReservationPage'))
// const LoginPage       = lazy(() => import('@/pages/LoginPage'))
// const BackofficePage  = lazy(() => import('@/pages/BackofficePage'))

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index          element={<HomePage />}     />
        <Route path="privacidad" element={<PrivacyPage />} />
        <Route path="terminos"   element={<TermsPage />}   />
        <Route path="404"        element={<NotFoundPage />} />
        <Route path="*"          element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
