
import { useNavigate } from 'react-router-dom'
import { useSupabase } from '../../context/SupabaseContext.jsx'

export function useNavbar() {
  const { user, supabase } = useSupabase()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  // Determinar tipo de navbar
  const navbarType = !user
    ? 'guest'
    : user.role === 'admin'
    ? 'admin'
    : 'client'

  return { user, navbarType, handleLogout }
}
