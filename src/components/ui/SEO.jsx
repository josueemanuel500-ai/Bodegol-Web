/**
 * SEO.jsx — Document Head Manager
 *
 * Sets page title, meta description, and Open Graph tags.
 * Uses the native document API directly (no external dependency).
 * Falls back to seoDefaults for any unspecified prop.
 *
 * Usage:
 *   <SEO
 *     title="Paquetes de Reservación"
 *     description="Encuentra el paquete ideal para tu evento en Bodegol."
 *   />
 */

import { useEffect } from 'react'
import seoDefaults from '@/config/seo.config'

export default function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  noIndex = false,
}) {
  const resolvedTitle = title
    ? seoDefaults.titleTemplate.replace('%s', title)
    : seoDefaults.defaultTitle

  const resolvedDescription = description || seoDefaults.description
  const resolvedImage = image || seoDefaults.ogImage
  const resolvedUrl   = url   || (typeof window !== 'undefined' ? window.location.href : seoDefaults.siteUrl)

  useEffect(() => {
    // Title
    document.title = resolvedTitle

    // Helper to set/create a meta tag
    const setMeta = (selector, content) => {
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const attr = selector.includes('[name=') ? 'name' : 'property'
        const value = selector.match(/["'](.+?)["']/)?.[1]
        if (attr && value) el.setAttribute(attr, value)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('[name="description"]', resolvedDescription)
    setMeta('[name="robots"]', noIndex ? 'noindex, nofollow' : 'index, follow')
    setMeta('[property="og:title"]', resolvedTitle)
    setMeta('[property="og:description"]', resolvedDescription)
    setMeta('[property="og:image"]', resolvedImage)
    setMeta('[property="og:url"]', resolvedUrl)
    setMeta('[property="og:type"]', type)
    setMeta('[property="twitter:title"]', resolvedTitle)
    setMeta('[property="twitter:description"]', resolvedDescription)
    setMeta('[property="twitter:image"]', resolvedImage)
  }, [resolvedTitle, resolvedDescription, resolvedImage, resolvedUrl, type, noIndex])

  return null // renders nothing — operates via side effects on document.head
}
