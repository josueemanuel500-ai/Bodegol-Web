/**
 * seo.config.js — Default SEO Configuration
 *
 * Default meta values used by the SEO component.
 * Individual pages override these via props to the <SEO /> component.
 */

export const seoDefaults = {
  titleTemplate: '%s | Bodegol',
  defaultTitle:  'Bodegol — Deportivo & Gastronómico',
  description:   'El mejor lugar en Mérida para vivir el fútbol, disfrutar comida de calidad y celebrar con amigos. Reservaciones, eventos y más.',
  siteUrl:       'https://bodegol.mx',
  ogImage:       '/images/logos/og-image.jpg',
  twitterCard:   'summary_large_image',
  locale:        'es_MX',
  type:          'website',
}

export default seoDefaults
