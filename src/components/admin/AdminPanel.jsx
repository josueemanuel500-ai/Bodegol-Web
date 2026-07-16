/**
 * AdminPanel.jsx — Panel admin oculto (efecto cristal / glass).
 * Se abre con 7 toques en el logo. Permite iniciar sesión (Supabase Auth)
 * y gestionar promociones (crear / editar / activar / eliminar).
 *
 * Si Supabase no está configurado, muestra instrucciones (ver SUPABASE_SETUP.md).
 */
import React, { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Trash2, Pencil, LogOut, Save, ShieldAlert, Loader2, Eye, EyeOff, RefreshCw, Upload } from 'lucide-react'
import { useAdmin } from '@/context/AdminContext'
import { isSupabaseConfigured } from '@/services/supabase.service'
import {
  fetchPromotions, createPromotion, updatePromotion, deletePromotion,
  uploadPromotionImage, signIn, signOut, getSession, onAuthChange,
} from '@/services/promotions.service'
import { cn } from '@/utils/cn'

const EMPTY = { title: '', tag: '', schedule: '', description: '', image: '', imageAlt: '', sort: 0, active: true, cta: { label: 'Más información', message: '' } }

const glassField = 'w-full rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-white/40 outline-none backdrop-blur-md transition focus:border-primary focus:ring-2 focus:ring-primary/40'

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-ui text-xs font-semibold uppercase tracking-wide text-white/70">{label}</span>
      {children}
    </label>
  )
}

// ── Login ────────────────────────────────────────────────────────────────
function Login({ onDone }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const submit = async (e) => {
    e.preventDefault(); setBusy(true); setErr('')
    try { await signIn(email.trim(), password); onDone() }
    catch (e2) { setErr(e2?.message || 'No se pudo iniciar sesión.') }
    finally { setBusy(false) }
  }
  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <p className="text-sm text-white/70">Acceso solo para administradores de Bodegol.</p>
      <Field label="Correo"><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={glassField} placeholder="admin@bodegol.com.mx" autoComplete="username" /></Field>
      <Field label="Contraseña">
        <div className="relative">
          <input type={show ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} className={cn(glassField, 'pr-11')} placeholder="••••••••" autoComplete="current-password" />
          <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white" aria-label={show ? 'Ocultar' : 'Mostrar'}>
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </Field>
      {err && <p className="text-sm text-red-300">{err}</p>}
      <button type="submit" disabled={busy} className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-ui font-bold text-white transition hover:bg-primary-hover disabled:opacity-60">
        {busy ? <Loader2 size={18} className="animate-spin" /> : null} Entrar
      </button>
    </form>
  )
}

// ── Formulario de promoción ──────────────────────────────────────────────
function PromoForm({ initial, onSave, onCancel, busy }) {
  const [p, setP] = useState(initial || EMPTY)
  const [uploading, setUploading] = useState(false)
  const [upErr, setUpErr] = useState('')
  const set = (k, v) => setP((prev) => ({ ...prev, [k]: v }))
  const setCta = (k, v) => setP((prev) => ({ ...prev, cta: { ...prev.cta, [k]: v } }))
  const onPickFile = async (e) => {
    const f = e.target.files?.[0]; if (!f) return
    setUploading(true); setUpErr('')
    try { const url = await uploadPromotionImage(f); set('image', url) }
    catch (er) { setUpErr(er?.message || 'No se pudo subir la imagen.') }
    finally { setUploading(false); e.target.value = '' }
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(p) }} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Título"><input required value={p.title} onChange={(e) => set('title', e.target.value)} className={glassField} placeholder="Happy Hour" /></Field>
        <Field label="Etiqueta"><input value={p.tag} onChange={(e) => set('tag', e.target.value)} className={glassField} placeholder="Diario" /></Field>
      </div>
      <Field label="Descripción"><textarea value={p.description} onChange={(e) => set('description', e.target.value)} rows={2} className={glassField} placeholder="Cervezas 2×1 de lunes a viernes." /></Field>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Horario"><input value={p.schedule} onChange={(e) => set('schedule', e.target.value)} className={glassField} placeholder="Lun–Vie · 5–7 PM" /></Field>
        <Field label="Orden (menor = primero)"><input type="number" value={p.sort} onChange={(e) => set('sort', e.target.value)} className={glassField} placeholder="0" /></Field>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-ui text-xs font-semibold uppercase tracking-wide text-white/70">
          Imagen — recomendado 1080 × 1080 px (cuadrada) · PNG o JPG · máx 3 MB
        </span>
        {p.image && (
          <img src={p.image} alt="Vista previa" className="h-28 w-28 rounded-xl border border-white/15 object-cover" />
        )}
        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/20">
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {uploading ? 'Subiendo…' : 'Subir PNG/JPG'}
            <input type="file" accept="image/png,image/jpeg" className="hidden" disabled={uploading} onChange={onPickFile} />
          </label>
          {p.image && <button type="button" onClick={() => set('image', '')} className="text-xs text-white/60 hover:text-white">Quitar</button>}
        </div>
        {upErr && <p className="text-xs text-red-300">{upErr}</p>}
        <input value={p.image} onChange={(e) => set('image', e.target.value)} className={glassField} placeholder="o pega una ruta/URL de imagen" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Texto del botón"><input value={p.cta?.label} onChange={(e) => setCta('label', e.target.value)} className={glassField} placeholder="Quiero aprovechar" /></Field>
        <Field label="Mensaje WhatsApp"><input value={p.cta?.message} onChange={(e) => setCta('message', e.target.value)} className={glassField} placeholder="¡Hola! Quiero info de..." /></Field>
      </div>
      <label className="flex items-center gap-2 text-sm text-white/80">
        <input type="checkbox" checked={!!p.active} onChange={(e) => set('active', e.target.checked)} className="h-4 w-4 accent-[#FF690F]" />
        Activa (visible en la página)
      </label>
      <div className="mt-1 flex gap-3">
        <button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-ui font-bold text-white transition hover:bg-primary-hover disabled:opacity-60">
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Guardar
        </button>
        <button type="button" onClick={onCancel} className="rounded-xl border border-white/20 px-4 py-2.5 font-ui text-white/80 transition hover:bg-white/10">Cancelar</button>
      </div>
    </form>
  )
}

// ── Gestor de promociones ────────────────────────────────────────────────
function Manager({ onLogout }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // promo | 'new' | null
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [confirmId, setConfirmId] = useState(null)

  const load = useCallback(async () => {
    setLoading(true); setErr('')
    try { setItems(await fetchPromotions() || []) }
    catch (e) { setErr(e?.message || 'Error al cargar.') }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { load() }, [load])

  const save = async (p) => {
    setBusy(true); setErr('')
    try {
      if (editing === 'new') await createPromotion(p)
      else await updatePromotion(editing.id, p)
      setEditing(null); await load()
    } catch (e) { setErr(e?.message || 'No se pudo guardar.') }
    finally { setBusy(false) }
  }
  const remove = async (id) => {
    setBusy(true); setErr('')
    try { await deletePromotion(id); setConfirmId(null); await load() }
    catch (e) { setErr(e?.message || 'No se pudo eliminar.') }
    finally { setBusy(false) }
  }

  if (editing) {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="font-display text-xl font-black uppercase text-white">{editing === 'new' ? 'Nueva promoción' : 'Editar promoción'}</h3>
        {err && <p className="text-sm text-red-300">{err}</p>}
        <PromoForm initial={editing === 'new' ? null : editing} onSave={save} onCancel={() => setEditing(null)} busy={busy} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-black uppercase text-white">Promociones</h3>
        <div className="flex items-center gap-2">
          <button onClick={load} className="rounded-lg border border-white/15 p-2 text-white/70 hover:bg-white/10" aria-label="Recargar"><RefreshCw size={16} /></button>
          <button onClick={() => setEditing('new')} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 font-ui text-sm font-bold text-white hover:bg-primary-hover"><Plus size={16} /> Nueva</button>
        </div>
      </div>
      {err && <p className="text-sm text-red-300">{err}</p>}
      {loading ? (
        <div className="flex items-center gap-2 py-8 text-white/60"><Loader2 size={18} className="animate-spin" /> Cargando…</div>
      ) : items.length === 0 ? (
        <p className="py-8 text-center text-sm text-white/60">Aún no hay promociones. Crea la primera con “Nueva”.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((p) => (
            <li key={p.id} className="flex items-center gap-3 rounded-xl border border-white/12 bg-white/5 p-3">
              <span className={cn('h-2.5 w-2.5 flex-shrink-0 rounded-full', p.active ? 'bg-green-400' : 'bg-white/30')} title={p.active ? 'Activa' : 'Inactiva'} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-ui text-sm font-semibold text-white">{p.title || '(sin título)'}</p>
                <p className="truncate text-xs text-white/50">{p.tag} · {p.schedule}</p>
              </div>
              {confirmId === p.id ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-white/70">¿Eliminar?</span>
                  <button onClick={() => remove(p.id)} disabled={busy} className="rounded-lg bg-red-500/80 px-2.5 py-1 text-xs font-bold text-white hover:bg-red-500 disabled:opacity-60">
                    {busy ? '…' : 'Sí'}
                  </button>
                  <button onClick={() => setConfirmId(null)} className="rounded-lg border border-white/20 px-2.5 py-1 text-xs text-white/80 hover:bg-white/10">No</button>
                </div>
              ) : (
                <>
                  <button onClick={() => setEditing(p)} className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white" aria-label="Editar"><Pencil size={16} /></button>
                  <button onClick={() => setConfirmId(p.id)} className="rounded-lg p-2 text-red-300 hover:bg-red-500/20" aria-label="Eliminar"><Trash2 size={16} /></button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      <button onClick={onLogout} className="mt-2 inline-flex items-center gap-2 self-start rounded-lg border border-white/15 px-3 py-2 font-ui text-sm text-white/70 hover:bg-white/10"><LogOut size={16} /> Cerrar sesión</button>
    </div>
  )
}

export default function AdminPanel() {
  const { open, closeAdmin } = useAdmin()
  const [session, setSession] = useState(null)

  useEffect(() => {
    if (!open || !isSupabaseConfigured) return
    getSession().then(setSession)
    const off = onAuthChange(setSession)
    return off
  }, [open])

  const logout = async () => { await signOut(); setSession(null) }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[600] flex items-center justify-center p-4"
          style={{ background: 'rgba(3,17,38,0.72)' }} onClick={closeAdmin}>
          {/* GLASS card */}
          <motion.div initial={{ scale: 0.94, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-white/15 shadow-2xl"
            style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)' }}>
            {/* header */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
              <span className="flex items-center gap-2 font-display text-lg font-black uppercase tracking-wide text-white">
                <ShieldAlert size={18} className="text-primary" /> Panel Bodegol
              </span>
              <button onClick={closeAdmin} className="rounded-full border border-white/15 bg-white/10 p-2 text-white/80 hover:bg-white/20" aria-label="Cerrar"><X size={18} /></button>
            </div>
            {/* body */}
            <div className="overflow-y-auto px-6 py-6">
              {!isSupabaseConfigured ? (
                <div className="flex flex-col gap-3 text-white/80">
                  <p className="font-ui font-semibold text-white">Supabase no está configurado</p>
                  <p className="text-sm">Agrega <code className="rounded bg-white/10 px-1">VITE_SUPABASE_URL</code> y <code className="rounded bg-white/10 px-1">VITE_SUPABASE_ANON_KEY</code> en tu <code className="rounded bg-white/10 px-1">.env</code>, crea la tabla <code className="rounded bg-white/10 px-1">promotions</code> y un usuario admin. Todo está en <strong>SUPABASE_SETUP.md</strong>.</p>
                  <p className="text-sm text-white/60">Mientras tanto, la página muestra las promociones estáticas de <code className="rounded bg-white/10 px-1">data/promotions.js</code>.</p>
                </div>
              ) : session ? (
                <Manager onLogout={logout} />
              ) : (
                <Login onDone={() => getSession().then(setSession)} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
