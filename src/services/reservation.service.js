/**
 * reservation.service.js — Reservation API Service
 *
 * All reservation-related API calls go through this service.
 * Components never call the API directly.
 *
 * Wired to the real Raven POS backend: POST /public/:businessId/reservations
 * (public/anonymous channel — no login, see reservations/public-reservations.controller.ts
 * in the raven-pos repo). Real DTO fields: resourceRef, customerName, phone
 * (optional), startsAt, endsAt (ISO datetimes) — NOT the generic
 * name/date/time/guests/occasion/notes shape this stub originally assumed;
 * Bodegol books sports courts (a time range on one of 5 fixed courts), not
 * restaurant tables. ReservationForm.jsx already sends the right shape.
 */

import api from './api.service'
import siteConfig from '@/config/site.config'
import { buildWhatsAppUrl } from '@/utils/format'

// ─── Types (JSDoc only — no TypeScript) ───────────────────────────────────
/**
 * @typedef {Object} ReservationData
 * @property {string} resourceRef   e.g. 'Área 1'..'Área 5'
 * @property {string} customerName
 * @property {string} [phone]
 * @property {string} startsAt      ISO datetime
 * @property {string} endsAt        ISO datetime
 */

class ReservationService {
  /**
   * Create a new reservation.
   * Returns the created reservation object on success.
   * Throws on failure.
   *
   * @param {ReservationData} data
   */
  async createReservation(data) {
    if (!siteConfig.features.reservationSystem) {
      throw new Error('Reservation system is not enabled.')
    }

    if (siteConfig.isDev) {
      console.log('[ReservationService] createReservation:', data)
    }

    const { data: created } = await api.post(`/public/${siteConfig.businessId}/reservations`, data)
    return created
  }

  /**
   * Build a pre-filled WhatsApp URL for reservation requests.
   * Used as fallback when reservationSystem feature is disabled.
   *
   * @param {ReservationData} data
   * @param {string} whatsappNumber
   */
  buildWhatsAppReservation(data, whatsappNumber) {
    const lines = [
      `*Nueva Reservación*`,
      `Cancha: ${data.resourceRef}`,
      `Nombre: ${data.customerName}`,
      data.phone ? `Teléfono: ${data.phone}` : null,
      `Inicio: ${data.startsAt}`,
      `Fin: ${data.endsAt}`,
    ].filter(Boolean)

    return buildWhatsAppUrl(whatsappNumber, lines.join('\n'))
  }

  /**
   * Existing (non-cancelled) reservations for a court on a given calendar
   * date — lets the caller compute free slots. Matches
   * GET /public/:businessId/reservations/availability?resource=&date=
   */
  async checkAvailability({ resourceRef, date }) {
    const { data } = await api.get(
      `/public/${siteConfig.businessId}/reservations/availability?resource=${encodeURIComponent(resourceRef)}&date=${date}`
    )
    return data
  }

  /** Public-safe reservation settings configured in Raven Backoffice. */
  async getConfiguration() {
    const { data } = await api.get(`/public/${siteConfig.businessId}/reservations/configuration`)
    return data
  }

  /** Real court names configured in Raven Backoffice. */
  async getAreas() {
    const { data } = await api.get(`/public/${siteConfig.businessId}/reservations/areas-config`)
    return data
  }

  /**
   * Real availability for a calendar period. The backend excludes existing
   * reservations and administrative event blocks before returning slots.
   */
  async getCalendar({ from, to, duration, resourceRef }) {
    const query = new URLSearchParams({ from, to, duration: String(duration) })
    if (resourceRef) query.set('resource', resourceRef)
    const { data } = await api.get(
      `/public/${siteConfig.businessId}/reservations/calendar?${query.toString()}`
    )
    return data
  }

  /**
   * Business-configured deposit (Backoffice → Negocio → "Reservaciones ·
   * Anticipo"): hourly rate, % anticipo, and the account to transfer to.
   * `{ enabled: false }` when the business hasn't set an hourly rate — the
   * booking flow should skip the payment step entirely in that case.
   */
  async getDepositInfo() {
    const { data } = await api.get(`/public/${siteConfig.businessId}/reservations/deposit-info`)
    return data
  }

  /**
   * Uploads the customer's own transfer receipt for a reservation created
   * with a deposit — no login needed (the reservation id is the only
   * credential). Staff still has to approve it before the court is
   * actually confirmed; this only marks depositStatus as 'uploaded'.
   *
   * @param {string} reservationId
   * @param {File} [file]              image (jpg/png/webp, max 5MB)
   * @param {{reference?: string, notes?: string}} [meta]
   */
  async uploadProof(reservationId, file, meta = {}) {
    const form = new FormData()
    if (file) form.append('file', file)
    if (meta.reference) form.append('reference', meta.reference)
    if (meta.notes) form.append('notes', meta.notes)
    const { data } = await api.postForm(`/public/${siteConfig.businessId}/reservations/${reservationId}/proof`, form)
    return data
  }
}

export const reservationService = new ReservationService()
export default reservationService
