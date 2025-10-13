
// src/auth/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'

// temporal hasta conectar Supabase
const fakeUser = { role: 'admin' }

export default function ProtectedRoute({ children }) {
  const user = fakeUser // simulación

  if (!user) {
    return <Navigate to="/login" />
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" />
  }

  return children
}
