/**
 * AnalyticsContext.jsx — Analytics Provider
 *
 * Centralizes all analytics event tracking. Components call track() functions
 * from this context instead of calling GA/Pixel/etc. directly.
 * This means swapping analytics providers only requires changing this file.
 *
 * Currently: stub (logs to console in dev, no-ops in prod until IDs are configured).
 * Future: connect Google Analytics 4, Meta Pixel, etc.
 *
 * Usage:
 *   const { trackEvent, trackPageView } = useAnalytics()
 *   trackEvent('cta_click', { section: 'hero', label: 'Reservar Mesa' })
 */

import React, { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import siteConfig from '@/config/site.config'

const AnalyticsContext = createContext(null)

export function AnalyticsProvider({ children }) {
  const location = useLocation()

  // ─── Page View Tracking ─────────────────────────────────────────────────
  // Fires on every route change
  useEffect(() => {
    trackPageView(location.pathname + location.hash)
  }, [location])

  // ─── Core Track Functions ────────────────────────────────────────────────

  function trackPageView(path) {
    if (!siteConfig.analytics.enabled) {
      if (siteConfig.isDev) console.log('[Analytics] pageView:', path)
      return
    }
    // TODO: window.gtag('event', 'page_view', { page_path: path })
    // TODO: window.fbq('track', 'PageView')
  }

  function trackEvent(eventName, params = {}) {
    if (!siteConfig.analytics.enabled) {
      if (siteConfig.isDev) console.log('[Analytics] event:', eventName, params)
      return
    }
    // TODO: window.gtag('event', eventName, params)
    // TODO: window.fbq('trackCustom', eventName, params)
  }

  function trackConversion(conversionType, value = null) {
    if (!siteConfig.analytics.enabled) {
      if (siteConfig.isDev) console.log('[Analytics] conversion:', conversionType, value)
      return
    }
    // TODO: connect to GA4 conversion events
  }

  // ─── Semantic Helpers ─────────────────────────────────────────────────────
  // Typed helpers so components don't need to remember event name strings.

  const analytics = {
    trackEvent,
    trackPageView,
    trackConversion,
    // Semantic wrappers:
    ctaClick:       (label, section) => trackEvent('cta_click', { label, section }),
    whatsappClick:  (source)         => trackEvent('whatsapp_click', { source }),
    reservationStart:()              => trackEvent('reservation_start'),
    reservationComplete:()           => trackConversion('reservation'),
    formSubmit:     (formName)       => trackEvent('form_submit', { form: formName }),
    galleryView:    (imageId)        => trackEvent('gallery_image_view', { image_id: imageId }),
  }

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (!context) throw new Error('useAnalytics must be used inside <AnalyticsProvider>')
  return context
}

export default AnalyticsContext
