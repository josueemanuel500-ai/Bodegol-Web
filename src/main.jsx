/**
 * main.jsx - React entry point
 * BrowserRouter lives inside App.jsx so it can wrap providers that use router hooks.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './styles/tokens.css'
import './styles/global.css'
import './styles/typography.css'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
