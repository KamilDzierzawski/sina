import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';

const isStandaloneProducts = typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port === '3004';

if (isStandaloneProducts) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
