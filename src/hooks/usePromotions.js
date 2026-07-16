/**
 * usePromotions — promociones en vivo desde Supabase con respaldo a los
 * datos estáticos (data/promotions.js). Nunca deja la sección vacía.
 */
import { useState, useEffect, useCallback } from 'react'
import { activePromotions } from '@/data/promotions'
import { isSupabaseConfigured, fetchPromotions } from '@/services/promotions.service'

export function usePromotions() {
  const [promotions, setPromotions] = useState(activePromotions)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) { setPromotions(activePromotions); setLoading(false); return }
    setLoading(true)
    try {
      const live = await fetchPromotions({ onlyActive: true })
      setPromotions(live && live.length ? live : activePromotions)
    } catch {
      setPromotions(activePromotions)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])
  return { promotions, loading, refresh: load }
}

export default usePromotions
