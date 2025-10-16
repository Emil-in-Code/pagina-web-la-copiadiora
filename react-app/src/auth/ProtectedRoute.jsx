
import { Navigate } from "react-router-dom";
import { useSupabase } from "../context/SupabaseContext.jsx";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useSupabase(); // 👈 también tomamos loading

  // mientras carga la sesión, no renderices nada (evita flicker)
  if (loading) return null;

  // si no hay sesión activa, redirige al login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // si el usuario no tiene rol admin, lo manda a inicio
  const role = user.user_metadata?.role || "cliente";
  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  // si pasó todo, puede acceder
  return children;
}
