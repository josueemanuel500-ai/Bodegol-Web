/**
 * AppRouter.jsx — Route Definitions
 * All routes are lazy-loaded for code splitting.
 * BrowserRouter is in App.jsx.
 */

import React, { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'

const HomePage        = lazy(() => import('@/pages/HomePage'))
const CanchasPage     = lazy(() => import('@/pages/CanchasPage'))
const MenuPage        = lazy(() => import('@/pages/MenuPage'))
const PromocionesPage = lazy(() => import('@/pages/PromocionesPage'))
const PaquetesPage    = lazy(() => import('@/pages/PaquetesPage'))
const GaleriaPage     = lazy(() => import('@/pages/GaleriaPage'))
const VerPartidosPage = lazy(() => import('@/pages/VerPartidosPage'))
const TorneoVeteranosPage = lazy(() => import('@/pages/TorneoVeteranosPage'))
const TorneoFemenilPage = lazy(() => import('@/pages/TorneoFemenilPage'))
const ReservacionesPage = lazy(() => import('@/pages/ReservacionesPage'))
const FaqPage         = lazy(() => import('@/pages/FaqPage'))
const PrivacyPage     = lazy(() => import('@/pages/PrivacyPage'))
const TermsPage       = lazy(() => import('@/pages/TermsPage'))
const NotFoundPage    = lazy(() => import('@/pages/NotFoundPage'))

// Future pages — uncomment when ready:
// const LoginPage       = lazy(() => import('@/pages/LoginPage'))
// const BackofficePage  = lazy(() => import('@/pages/BackofficePage'))

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index             element={<HomePage />}        />
        <Route path="canchas"    element={<CanchasPage />}     />
        <Route path="menu"       element={<MenuPage />}        />
        <Route path="promociones" element={<PromocionesPage />} />
        <Route path="paquetes"   element={<PaquetesPage />}    />
        <Route path="galeria"    element={<GaleriaPage />}     />
        <Route path="ver-partidos-en-merida" element={<VerPartidosPage />} />
        <Route path="torneo-veteranos-35-merida" element={<TorneoVeteranosPage />} />
        <Route path="torneo-femenil-merida" element={<TorneoFemenilPage />} />
        <Route path="reservaciones" element={<ReservacionesPage />} />
        <Route path="faq"        element={<FaqPage />}         />
        <Route path="privacidad" element={<PrivacyPage />} />
        <Route path="terminos"   element={<TermsPage />}   />
        <Route path="404"        element={<NotFoundPage />} />
        <Route path="*"          element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
