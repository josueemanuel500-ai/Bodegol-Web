/**
 * scroll.js — Scroll Utility Functions
 *
 * Smooth scroll helpers used across the application.
 */

/**
 * Smooth-scroll to a section by its ID.
 * Accounts for the fixed navbar height.
 *
 * Usage:
 *   scrollToSection('services')
 *   scrollToSection('contact', 80)  // 80px additional offset
 */
export function scrollToSection(sectionId, additionalOffset = 0) {
  const el = document.getElementById(sectionId)
  if (!el) return

  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72',
    10
  )

  const top = el.getBoundingClientRect().top + window.scrollY - navHeight - additionalOffset
  window.scrollTo({ top, behavior: 'smooth' })
}

/**
 * Smooth-scroll to the top of the page.
 */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Returns the current scroll progress as a value from 0 to 1.
 */
export function getScrollProgress() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  return scrollHeight === clientHeight ? 0 : scrollTop / (scrollHeight - clientHeight)
}

/**
 * Handle anchor link clicks with smooth scroll.
 * Use as an onClick handler on <a href="/#section"> links.
 */
export function handleAnchorClick(e) {
  const href = e.currentTarget?.getAttribute('href')
  if (!href?.startsWith('/#')) return

  const sectionId = href.slice(2)
  const el = document.getElementById(sectionId)
  if (!el) return

  e.preventDefault()
  scrollToSection(sectionId)

  // Update URL hash without jumping
  if (window.history.pushState) {
    window.history.pushState(null, '', `/#${sectionId}`)
  }
}
