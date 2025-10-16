
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

const SupabaseContext = createContext()

export function SupabaseProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obtenemos la sesión actual
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data?.session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // Escuchamos cambios de sesión (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <SupabaseContext.Provider value={{ user, supabase, loading }}>
      {children}
    </SupabaseContext.Provider>
  )
}

// Hook para acceder fácilmente al contexto
export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase debe usarse dentro de SupabaseProvider')
  }
  return context
}
