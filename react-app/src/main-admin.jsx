import React from 'react'
import { createRoot } from 'react-dom/client'
import AdminApp from './admin/AdminApp.jsx'

const el  = document.getElementById('admin-root')
if(el) {
  createRoot(el).render(<AdminApp/>)
} else {
  console.warn('No se encontó #admin-root para montar el dashboard')
}
