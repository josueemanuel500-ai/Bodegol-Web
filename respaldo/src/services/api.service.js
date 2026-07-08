/**
 * api.service.js — Base HTTP API Client
 *
 * Centralized fetch wrapper for all API calls.
 * All other services (reservation, contact, auth) import from here.
 *
 * Features:
 *   - Automatic JSON serialization / deserialization
 *   - Auth token injection from localStorage
 *   - Consistent error normalization
 *   - Request/response logging in development
 *
 * INTEGRATION NOTE:
 *   When the Raven API or Supabase backend is ready, only the baseUrl
 *   in site.config.js needs to change — no component changes required.
 */

import siteConfig from '@/config/site.config'
import { STORAGE_KEYS } from '@/constants'

class ApiService {
  constructor() {
    this.baseUrl = siteConfig.api.baseUrl
  }

  // ─── Build Headers ──────────────────────────────────────────────────────
  _buildHeaders(extra = {}) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept':       'application/json',
      ...extra,
    }

    // Inject auth token if available
    const token = this._getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`

    return headers
  }

  _getToken() {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    } catch {
      return null
    }
  }

  // ─── Request ────────────────────────────────────────────────────────────
  async _request(method, endpoint, data = null, options = {}) {
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${this.baseUrl}${endpoint}`

    const config = {
      method,
      headers: this._buildHeaders(options.headers),
      signal:  options.signal,
    }

    if (data) {
      config.body = JSON.stringify(data)
    }

    if (siteConfig.isDev) {
      console.log(`[API] ${method} ${url}`, data || '')
    }

    const response = await fetch(url, config)

    // Parse JSON (even on error responses — they may contain error messages)
    let json
    try {
      json = await response.json()
    } catch {
      json = null
    }

    if (!response.ok) {
      const error = new Error(json?.message || `HTTP ${response.status}`)
      error.status = response.status
      error.data   = json
      throw error
    }

    if (siteConfig.isDev) {
      console.log(`[API] ← ${response.status}`, json)
    }

    return json
  }

  // ─── HTTP Methods ───────────────────────────────────────────────────────
  get    = (endpoint, opts)       => this._request('GET',    endpoint, null, opts)
  post   = (endpoint, data, opts) => this._request('POST',   endpoint, data, opts)
  put    = (endpoint, data, opts) => this._request('PUT',    endpoint, data, opts)
  patch  = (endpoint, data, opts) => this._request('PATCH',  endpoint, data, opts)
  delete = (endpoint, opts)       => this._request('DELETE', endpoint, null, opts)
}

// Singleton instance
export const api = new ApiService()
export default api
