
import { Routes, Route } from 'react-router-dom'
import DashboardPedidos from './pages/DashboardPedidos.jsx'
import { ComandaProvider } from '../admin/context/ComandaContext.jsx'
import NavbarAdmin from './widgets/NavbarAdmin.jsx'

export default function AdminApp() {
  return (
    <ComandaProvider>
      <NavbarAdmin />
      <Routes>
        <Route path="dashboard" element={<DashboardPedidos />} />
        {/* más rutas admin si las necesitás */}
      </Routes>
    </ComandaProvider>
  )
}
