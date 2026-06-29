/**
 * validators.js — Form Validation Utilities
 *
 * Pure validator functions. Each returns null if valid, or an error string.
 * Designed to be used with useForm() validators config.
 *
 * Usage:
 *   validators: {
 *     name:  validators.required('El nombre es requerido'),
 *     email: validators.compose(validators.required(), validators.email()),
 *     phone: validators.phone(),
 *   }
 */

// ─── Primitives ───────────────────────────────────────────────────────────

export const required = (msg = 'Este campo es requerido') =>
  (value) => (!value || String(value).trim() === '') ? msg : null

export const minLength = (min, msg) =>
  (value) => value && value.length < min
    ? (msg || `Mínimo ${min} caracteres`)
    : null

export const maxLength = (max, msg) =>
  (value) => value && value.length > max
    ? (msg || `Máximo ${max} caracteres`)
    : null

// ─── Format Validators ────────────────────────────────────────────────────

export const email = (msg = 'Correo electrónico inválido') =>
  (value) => {
    if (!value) return null
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(value) ? null : msg
  }

export const phone = (msg = 'Número de teléfono inválido') =>
  (value) => {
    if (!value) return null
    const digits = value.replace(/\D/g, '')
    return digits.length >= 10 ? null : msg
  }

export const url = (msg = 'URL inválida') =>
  (value) => {
    if (!value) return null
    try { new URL(value); return null }
    catch { return msg }
  }

// ─── Date Validators ─────────────────────────────────────────────────────

export const futureDate = (msg = 'La fecha debe ser futura') =>
  (value) => {
    if (!value) return null
    return new Date(value) > new Date() ? null : msg
  }

// ─── Composer ─────────────────────────────────────────────────────────────

/**
 * Run multiple validators in sequence; return the first error found.
 * Usage: compose(required(), email())
 */
export const compose = (...fns) => (value) => {
  for (const fn of fns) {
    const error = fn(value)
    if (error) return error
  }
  return null
}

// ─── Reservation-Specific Presets ─────────────────────────────────────────
export const reservationValidators = {
  name:     compose(required('El nombre es requerido'), minLength(2)),
  phone:    compose(required('El teléfono es requerido'), phone()),
  email:    email(),
  date:     compose(required('La fecha es requerida'), futureDate()),
  time:     required('La hora es requerida'),
  guests:   required('Indica el número de personas'),
}

// ─── Contact Form Presets ──────────────────────────────────────────────────
export const contactValidators = {
  name:    compose(required('El nombre es requerido'), minLength(2)),
  phone:   compose(required('El teléfono es requerido'), phone()),
  email:   email(),
  message: compose(required('El mensaje es requerido'), minLength(10)),
}
