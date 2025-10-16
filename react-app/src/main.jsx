import React from 'react'
import { createRoot } from 'react-dom/client'
import PublicApp from './pages/PublicApp.jsx'
import { SupabaseProvider } from './context/SupabaseContext.jsx'
import'./styles/global.css'

const el = document.getElementById('root')
if (el) {
createRoot (el).render(
  <SupabaseProvider>
    <PublicApp/> 
  </SupabaseProvider>
  )
} else {
  console.warn('No se econtró #public-root para montar la app publica') 
}
