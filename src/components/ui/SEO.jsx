/**
 * SEO.jsx — Per-page document head via react-helmet-async.
 * Sets title, description, canonical, robots, Open Graph and Twitter Card.
 *
 * Props: title, description, image, path, type, noIndex
 */
import React from 'react'
import { Helmet } from 'react-helmet-async'
import seoDefaults from '@/config/seo.config'

export default function SEO({ title, description, image, imageAlt, path, type = 'website', noIndex = false }) {
  const fullTitle = title ? seoDefaults.titleTemplate.replace('%s', title) : seoDefaults.defaultTitle
  const desc = description || seoDefaults.description
  const url = `${seoDefaults.siteUrl}${path || (typeof window !== 'undefined' ? window.location.pathname : '/')}`
  const img = `${seoDefaults.siteUrl}${image || seoDefaults.ogImage}`
  const imgAlt = imageAlt || seoDefaults.ogImageAlt

  return (
    <Helmet prioritizeSeoTags>
      <html lang="es" />
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Bodegol" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:secure_url" content={img} />
      <meta property="og:image:type" content={seoDefaults.ogImageType} />
      <meta property="og:image:width" content={seoDefaults.ogImageWidth} />
      <meta property="og:image:height" content={seoDefaults.ogImageHeight} />
      <meta property="og:image:alt" content={imgAlt} />
      <meta property="og:locale" content={seoDefaults.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content={seoDefaults.twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:image:alt" content={imgAlt} />
    </Helmet>
  )
}
