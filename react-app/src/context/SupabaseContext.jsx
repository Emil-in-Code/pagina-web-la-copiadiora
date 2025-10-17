
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

const SupabaseContext = createContext()

export function SupabaseProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const currentUser = session?.user || null
      if (currentUser) {
        // Buscar el rol en la tabla profiles
        const { data: profile } = await supabase
          .from('profiles')
          .select('nombre, apellido, role')
          .eq('id', currentUser.id)
          .single()

        setUser({
          id: currentUser.id,
          email: currentUser.email,
          nombre: profile?.nombre,
          apellido: profile?.apellido,
          role: profile?.role || 'cliente',
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    }

    loadUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) setUser(null)
      else loadUser()
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <SupabaseContext.Provider value={{ user, loading, supabase }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export function useSupabase() {
  const context = useContext(SupabaseContext)
  if (!context) {
    throw new Error('useSupabase debe usarse dentro de SupabaseProvider')
  }
  return context
}
