/**
 * format.js — Formatting Utilities
 *
 * Pure functions for formatting dates, currencies, phone numbers, etc.
 * All locale-aware functions default to 'es-MX'.
 */

// ─── Currency ─────────────────────────────────────────────────────────────

/**
 * Format a number as Mexican Peso currency.
 * formatCurrency(1500) → '$1,500.00 MXN'
 */
export function formatCurrency(amount, currency = 'MXN', locale = 'es-MX') {
  return new Intl.NumberFormat(locale, {
    style:    'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

// ─── Dates ────────────────────────────────────────────────────────────────

/**
 * Format an ISO date string for display.
 * formatDate('2025-07-15') → 'martes, 15 de julio de 2025'
 */
export function formatDate(isoString, options = {}, locale = 'es-MX') {
  const defaultOptions = {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  }
  return new Date(isoString).toLocaleDateString(locale, { ...defaultOptions, ...options })
}

/**
 * Format a date as short display.
 * formatDateShort('2025-07-15') → '15 jul 2025'
 */
export function formatDateShort(isoString, locale = 'es-MX') {
  return formatDate(isoString, { weekday: undefined, year: 'numeric', month: 'short', day: 'numeric' }, locale)
}

/**
 * Returns true if the given ISO date is in the past.
 */
export function isPastDate(isoString) {
  return new Date(isoString) < new Date()
}

/**
 * Returns 'Hoy', 'Mañana', or the short date for the given ISO string.
 */
export function formatRelativeDate(isoString) {
  const today    = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const date = new Date(isoString)

  if (date.toDateString() === today.toDateString())    return 'Hoy'
  if (date.toDateString() === tomorrow.toDateString()) return 'Mañana'
  return formatDateShort(isoString)
}

// ─── Phone ────────────────────────────────────────────────────────────────

/**
 * Format a phone number for display.
 * formatPhone('9991234567') → '999 123 4567'
 */
export function formatPhone(phone) {
  const digits = phone.replace(/\D/g, '').replace(/^52/, '')
  if (digits.length === 10) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
  }
  return phone
}

/**
 * Build a tel: href from a phone number.
 * toTelHref('9991234567') → 'tel:+529991234567'
 */
export function toTelHref(phone, countryCode = '52') {
  const digits = phone.replace(/\D/g, '')
  const number = digits.startsWith(countryCode) ? digits : `${countryCode}${digits}`
  return `tel:+${number}`
}

// ─── WhatsApp ─────────────────────────────────────────────────────────────

/**
 * Build a wa.me URL.
 * buildWhatsAppUrl('9991234567', 'Hola!') → 'https://wa.me/529991234567?text=Hola!'
 */
export function buildWhatsAppUrl(number, message = '') {
  const digits = number.replace(/\D/g, '')
  const base   = `https://wa.me/${digits}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

// ─── Text ─────────────────────────────────────────────────────────────────

/**
 * Truncate a string to maxLength characters, adding ellipsis.
 * truncate('Hello world', 8) → 'Hello wo…'
 */
export function truncate(str, maxLength = 100) {
  if (!str || str.length <= maxLength) return str
  return `${str.slice(0, maxLength).trimEnd()}…`
}

/**
 * Convert a string to a URL-friendly slug.
 * slugify('Noche de Champions!') → 'noche-de-champions'
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}
