import React from 'react'
import { createRoot } from 'react-dom/client'
import PublicApp from './components/PublicApp.jsx'

const el = document.getElementById('root')
if (el) {
createRoot (el).render(<PublicApp/>)
} else {
  console.warn('No se econtró #public-root para montar la app publica') 
}
