import React from 'react'
import { createRoot } from 'react-dom/client'
import Footer from './footer.jsx'

const el = document.getElementById('footer-root')
if (el) {
  createRoot(el).render(<Footer />)
} else {
  console.warn('No se encontró #footer-root para montar el footer')
}
