import React from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './Navbar.jsx'

const el = document.getElementById('navbar-root')
if (el) {
  createRoot(el).render(<Navbar/>)
} else {
  console.warn('No se encontró #navar-root para montar el nav')
}
