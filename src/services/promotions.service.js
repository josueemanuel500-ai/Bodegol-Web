/**
 * promotions.service.js — CRUD de promociones en Supabase + auth de admin.
 * Tabla: public.promotions  (ver SUPABASE_SETUP.md para el esquema y RLS).
 */
import { supabase, isSupabaseConfigured } from './supabase.service'

const TABLE = 'promotions'

// Fila DB → forma que usa la UI
export function fromRow(r) {
  return {
    id:          r.id,
    active:      r.active ?? true,
    tag:         r.tag || '',
    title:       r.title || '',
    description: r.description || '',
    schedule:    r.schedule || '',
    image:       r.image || '',
    imageAlt:    r.image_alt || r.title || 'Promoción Bodegol',
    sort:        r.sort ?? 0,
    cta: {
      label:   r.cta_label || 'Más información',
      message: r.cta_message || '¡Hola! Quiero información de esta promoción.',
    },
  }
}

// Forma UI → fila DB
function toRow(p) {
  return {
    active:      p.active ?? true,
    tag:         p.tag || null,
    title:       p.title,
    description: p.description || null,
    schedule:    p.schedule || null,
    image:       p.image || null,
    image_alt:   p.imageAlt || null,
    sort:        Number(p.sort) || 0,
    cta_label:   p.cta?.label || null,
    cta_message: p.cta?.message || null,
  }
}

export { isSupabaseConfigured }

export async function fetchPromotions({ onlyActive = false } = {}) {
  if (!isSupabaseConfigured) return null
  let q = supabase.from(TABLE).select('*').order('sort', { ascending: true }).order('created_at', { ascending: true })
  if (onlyActive) q = q.eq('active', true)
  const { data, error } = await q
  if (error) throw error
  return (data || []).map(fromRow)
}

export async function createPromotion(p) {
  const { data, error } = await supabase.from(TABLE).insert(toRow(p)).select().single()
  if (error) throw error
  return fromRow(data)
}

export async function updatePromotion(id, p) {
  const { data, error } = await supabase.from(TABLE).update(toRow(p)).eq('id', id).select().single()
  if (error) throw error
  return fromRow(data)
}

export async function deletePromotion(id) {
  const { data, error } = await supabase.from(TABLE).delete().eq('id', id).select()
  if (error) throw error
  if (!data || data.length === 0) {
    throw new Error('No se eliminó. Es posible que tu sesión haya expirado: cierra sesión y vuelve a entrar.')
  }
  return data
}

// ── Auth admin ─────────────────────────────────────────────────────────────
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data.session
}
export async function signOut() {
  if (isSupabaseConfigured) await supabase.auth.signOut()
}
export async function getSession() {
  if (!isSupabaseConfigured) return null
  const { data } = await supabase.auth.getSession()
  return data.session
}
export function onAuthChange(cb) {
  if (!isSupabaseConfigured) return () => {}
  const { data } = supabase.auth.onAuthStateChange((_e, session) => cb(session))
  return () => data.subscription.unsubscribe()
}

// ── Storage: subir imagen de promoción (bucket "promotions") ─────────────────
export async function uploadPromotionImage(file) {
  if (!isSupabaseConfigured) throw new Error('Supabase no está configurado.')
  const ok = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
  if (!ok.includes(file.type)) throw new Error('Formato no válido. Usa PNG o JPG.')
  if (file.size > 3 * 1024 * 1024) throw new Error('La imagen pesa más de 3 MB. Redúcela.')
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace('jpeg', 'jpg')
  const path = `promo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage.from('promotions').upload(path, file, {
    cacheControl: '3600', contentType: file.type, upsert: false,
  })
  if (error) throw error
  const { data } = supabase.storage.from('promotions').getPublicUrl(path)
  return data.publicUrl
}
