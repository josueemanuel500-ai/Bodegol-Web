/**
 * ThemeContext.jsx — Theme Provider
 *
 * Bodegol is currently always dark-themed.
 * The toggle is prepared but disabled via siteConfig.features.darkModeToggle.
 *
 * To enable light mode in the future:
 *   1. Set siteConfig.features.darkModeToggle = true
 *   2. Define light-mode values in tokens.css (currently identical to dark)
 */

import React, { createContext, useContext, useEffect, useState } from 'react'
import { STORAGE_KEYS } from '@/constants'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  // Default to dark — Bodegol uses dark theme
  const [theme, setThemeState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.THEME)
      return stored === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    const html = document.documentElement
    if (theme === 'dark') html.classList.add('dark')
    else html.classList.remove('dark')
    try { localStorage.setItem(STORAGE_KEYS.THEME, theme) } catch {}
  }, [theme])

  const setTheme   = (t) => { if (t === 'light' || t === 'dark') setThemeState(t) }
  const toggleTheme= () => setThemeState(p => p === 'dark' ? 'light' : 'dark')

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}

export default ThemeContext
