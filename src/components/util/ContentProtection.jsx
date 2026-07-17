/**
 * ContentProtection — monta la protección global una sola vez.
 * No renderiza UI. Colócalo una vez en App.jsx.
 */
import { useContentProtection } from '@/hooks/useContentProtection'

export default function ContentProtection() {
  useContentProtection(true)
  return null
}
