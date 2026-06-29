/**
 * BusinessContext.jsx — Active Business Configuration Provider
 *
 * Provides business data to all components via useBusiness() hook.
 * To deploy for a different business: add its config to BUSINESS_MAP
 * and set VITE_BUSINESS_ID in .env.
 */

import React, { createContext, useContext } from 'react'
import { business as bodegolBusiness } from '@/data/business'
import siteConfig from '@/config/site.config'

const BusinessContext = createContext(null)

const BUSINESS_MAP = {
  bodegol: bodegolBusiness,
  // future: construauto, canibalforce, etc.
}

export function BusinessProvider({ children }) {
  const activeBusiness = BUSINESS_MAP[siteConfig.businessId] || bodegolBusiness

  return (
    <BusinessContext.Provider value={{ business: activeBusiness }}>
      {children}
    </BusinessContext.Provider>
  )
}

export function useBusiness() {
  const ctx = useContext(BusinessContext)
  if (!ctx) throw new Error('useBusiness must be used inside <BusinessProvider>')
  return ctx
}

export default BusinessContext
