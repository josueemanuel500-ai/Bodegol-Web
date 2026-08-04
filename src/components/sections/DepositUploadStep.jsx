/**
 * DepositUploadStep.jsx — Segundo paso del flujo de anticipo (BODEGOL_ANTICIPO_FLOW).
 *
 * Se muestra justo después de crear una reservación que el backend marcó
 * con depositStatus "pending" (el negocio tiene tarifa configurada en
 * Backoffice). Le muestra al cliente a qué cuenta transferir y le deja
 * subir la foto/captura de su comprobante — sin necesidad de iniciar
 * sesión, el id de la reservación ya creada es el único dato necesario
 * (POST /public/:businessId/reservations/:id/proof).
 *
 * El staff sigue teniendo que aprobar el comprobante desde POS/Backoffice
 * antes de que la cancha quede realmente confirmada — esto solo manda el
 * comprobante, no confirma nada por sí solo.
 */
import React, { useEffect, useState } from 'react'
import { Copy, Check, Upload, ImageIcon, ShieldCheck, Loader2 } from 'lucide-react'
import Button from '@/components/buttons/Button'
import Input from '@/components/forms/Input'
import Textarea from '@/components/forms/Textarea'
import reservationService from '@/services/reservation.service'

const money = (n) => `$${Number(n).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const MAX_FILE_BYTES = 5 * 1024 * 1024

export default function DepositUploadStep({ reservation, onDone, onSkip }) {
  const [info, setInfo] = useState(null)
  const [loadingInfo, setLoadingInfo] = useState(true)
  const [copied, setCopied] = useState(false)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [reference, setReference] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    let cancelled = false
    reservationService.getDepositInfo()
      .then((data) => { if (!cancelled) setInfo(data) })
      .catch(() => { if (!cancelled) setInfo(null) })
      .finally(() => { if (!cancelled) setLoadingInfo(false) })
    return () => { cancelled = true }
  }, [])

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])

  function onPickFile(e) {
    const picked = e.target.files?.[0]
    if (!picked) return
    if (!/^image\/(jpeg|png|webp)$/.test(picked.type)) {
      setError('Usa una imagen JPG, PNG o WEBP.')
      return
    }
    if (picked.size > MAX_FILE_BYTES) {
      setError('La imagen no puede pesar más de 5 MB.')
      return
    }
    setError('')
    if (preview) URL.revokeObjectURL(preview)
    setFile(picked)
    setPreview(URL.createObjectURL(picked))
  }

  async function copyAccountNumber() {
    if (!info?.accountNumber) return
    try {
      await navigator.clipboard.writeText(info.accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API can fail silently on some mobile browsers — no big
      // deal, the number is still selectable/visible on screen.
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (uploading) return
    if (!file && !reference.trim()) {
      setError('Adjunta una foto de tu comprobante o escribe la referencia del pago.')
      return
    }
    setError('')
    setUploading(true)
    try {
      await reservationService.uploadProof(reservation.id, file, { reference: reference.trim(), notes: notes.trim() })
      onDone?.()
    } catch (err) {
      setError(err.message || 'No se pudo enviar el comprobante. Intenta de nuevo.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-2xl border border-primary/30 bg-primary/10 p-4 text-center">
        <p className="font-ui text-sm font-semibold text-content-primary">
          ¡Ya casi! Tu {reservation.resourceRef} queda apartada en cuanto recibamos tu anticipo.
        </p>
        <p className="mt-1 font-ui text-2xl font-bold text-primary">{money(reservation.deposit)}</p>
        <p className="font-ui text-xs text-content-muted">Anticipo de tu reservación</p>
      </div>

      {loadingInfo ? (
        <div className="flex items-center justify-center gap-2 py-6 text-content-muted">
          <Loader2 size={18} className="animate-spin" /> <span className="font-ui text-sm">Cargando datos de pago…</span>
        </div>
      ) : info?.enabled && info.accountNumber ? (
        <div className="rounded-2xl border border-white/15 bg-white/[0.045] p-4 backdrop-blur-lg">
          <p className="mb-2 font-ui text-sm font-semibold text-content-secondary">Transfiere a esta cuenta</p>
          <dl className="space-y-1.5 font-ui text-sm">
            {info.bankName && (
              <div className="flex justify-between gap-3"><dt className="text-content-muted">Banco / Plataforma</dt><dd className="font-medium text-content-primary">{info.bankName}</dd></div>
            )}
            {info.accountHolder && (
              <div className="flex justify-between gap-3"><dt className="text-content-muted">A nombre de</dt><dd className="font-medium text-content-primary">{info.accountHolder}</dd></div>
            )}
            <div className="flex items-center justify-between gap-3">
              <dt className="text-content-muted">Cuenta / CLABE</dt>
              <dd className="flex items-center gap-2 font-medium text-content-primary">
                <span className="font-mono tracking-wide">{info.accountNumber}</span>
                <button type="button" onClick={copyAccountNumber} aria-label="Copiar número de cuenta"
                  className="rounded-lg border border-white/15 p-1.5 text-content-muted transition-colors hover:text-primary">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </dd>
            </div>
          </dl>
        </div>
      ) : (
        <p className="rounded-xl bg-status-error/10 px-4 py-2.5 text-center font-ui text-sm text-status-error">
          No pudimos cargar los datos de pago. Contáctanos por WhatsApp para completar tu anticipo.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block font-ui text-sm font-semibold text-content-secondary">
            <span className="inline-flex items-center gap-1.5"><ImageIcon size={14} strokeWidth={2} aria-hidden="true" />Comprobante de pago</span>
          </label>
          <label htmlFor="proof-file" className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/25 bg-white/[0.03] p-4 text-center transition-colors hover:border-primary">
            {preview ? (
              <img src={preview} alt="Vista previa del comprobante" className="max-h-40 rounded-lg object-contain" />
            ) : (
              <>
                <Upload size={22} className="text-content-muted" />
                <span className="font-ui text-sm text-content-secondary">Toca para subir tu captura o foto</span>
                <span className="font-ui text-xs text-content-muted">JPG, PNG o WEBP · máx. 5 MB</span>
              </>
            )}
          </label>
          <input id="proof-file" type="file" accept="image/jpeg,image/png,image/webp" onChange={onPickFile} className="hidden" />
        </div>

        <Input id="proof-reference" label="Referencia / folio (opcional si adjuntas foto)" value={reference}
          onChange={(e) => setReference(e.target.value)}
          className="border-white/15 bg-white/[0.06] backdrop-blur-md"
          placeholder="Últimos dígitos de la operación" />

        <Textarea id="proof-notes" label="Notas (opcional)" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)}
          className="border-white/15 bg-white/[0.06] backdrop-blur-md"
          placeholder="Ej. transferí desde la cuenta de mi papá" />

        {error && (
          <p role="alert" className="rounded-xl bg-status-error/10 px-4 py-2.5 font-ui text-sm text-status-error">{error}</p>
        )}

        <Button type="submit" variant="primary" size="lg" icon={ShieldCheck} loading={uploading} fullWidth className="min-h-14 rounded-2xl">
          Enviar comprobante
        </Button>
        <button type="button" onClick={onSkip} className="text-center font-ui text-xs text-content-muted underline-offset-2 hover:underline">
          Enviarlo después por WhatsApp
        </button>
      </form>
    </div>
  )
}
