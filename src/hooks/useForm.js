/**
 * useForm.js — Form State Management Hook
 *
 * Manages form values, validation errors, touched state, and submission.
 * Keeps all form logic out of components.
 *
 * Usage:
 *   const form = useForm({
 *     initialValues: { name: '', email: '' },
 *     validators: {
 *       name:  (v) => !v ? 'El nombre es requerido' : null,
 *       email: (v) => !v.includes('@') ? 'Correo inválido' : null,
 *     },
 *     onSubmit: async (values) => { await api.sendContact(values) },
 *   })
 *
 *   form.values.name
 *   form.errors.email
 *   form.handleChange('name')(e)
 *   form.handleSubmit(e)
 *   form.status  // 'idle' | 'loading' | 'success' | 'error'
 */

import { useState, useCallback } from 'react'
import { FORM_STATUS } from '@/constants'

export function useForm({ initialValues = {}, validators = {}, onSubmit }) {
  const [values,  setValues]  = useState(initialValues)
  const [errors,  setErrors]  = useState({})
  const [touched, setTouched] = useState({})
  const [status,  setStatus]  = useState(FORM_STATUS.IDLE)
  const [submitError, setSubmitError] = useState(null)

  // Validate a single field
  const validateField = useCallback((name, value) => {
    const validator = validators[name]
    return validator ? validator(value) : null
  }, [validators])

  // Validate all fields; returns errors object
  const validateAll = useCallback(() => {
    const newErrors = {}
    Object.keys(validators).forEach((name) => {
      const error = validateField(name, values[name])
      if (error) newErrors[name] = error
    })
    return newErrors
  }, [validators, values, validateField])

  // Change handler factory — usage: onChange={form.handleChange('name')}
  const handleChange = useCallback((name) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setValues((prev) => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }, [errors])

  // Blur handler — marks field as touched and validates it
  const handleBlur = useCallback((name) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, values[name])
    setErrors((prev) => ({ ...prev, [name]: error }))
  }, [validateField, values])

  // Set a value programmatically
  const setValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  // Reset the form to initial values
  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setStatus(FORM_STATUS.IDLE)
    setSubmitError(null)
  }, [initialValues])

  // Submit handler
  const handleSubmit = useCallback(async (e) => {
    if (e?.preventDefault) e.preventDefault()

    // Mark all fields as touched
    const allTouched = Object.keys(initialValues).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
    setTouched(allTouched)

    // Validate all fields
    const newErrors = validateAll()
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    // Submit
    setStatus(FORM_STATUS.LOADING)
    setSubmitError(null)

    try {
      await onSubmit(values)
      setStatus(FORM_STATUS.SUCCESS)
    } catch (err) {
      setStatus(FORM_STATUS.ERROR)
      setSubmitError(err?.message || 'Ocurrió un error. Inténtalo de nuevo.')
    }
  }, [values, validateAll, onSubmit, initialValues])

  // Helper: should show error for a field?
  const showError = (name) => !!(touched[name] && errors[name])

  return {
    values,
    errors,
    touched,
    status,
    submitError,
    handleChange,
    handleBlur,
    handleSubmit,
    setValue,
    reset,
    showError,
    isLoading: status === FORM_STATUS.LOADING,
    isSuccess:  status === FORM_STATUS.SUCCESS,
    isError:    status === FORM_STATUS.ERROR,
  }
}

export default useForm
