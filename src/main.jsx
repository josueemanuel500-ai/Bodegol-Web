/**
 * main.jsx — React entry point
 * BrowserRouter is now inside App.jsx so it wraps the AnalyticsProvider
 * which uses useLocation() from react-router-dom.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './styles/tokens.css'
import './styles/global.css'
import './styles/typography.css'  // role classes — before Tailwind so utilities can override
import './styles/index.css'

ReactDOM.createRoot(doc