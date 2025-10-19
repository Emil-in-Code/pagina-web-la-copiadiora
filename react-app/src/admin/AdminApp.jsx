
import { Routes, Route } from 'react-router-dom'
import DashboardPedidos from './pages/DashboardPedidos.jsx'
import { ComandaProvider } from '../admin/context/ComandaContext.jsx'
import Navbar from '../widgets/Navbar/Navbar.jsx'
export default function AdminApp() {
  return (
    <ComandaProvider>
      <Navbar />
      <Routes>
        <Route path="dashboard" element={<DashboardPedidos />} />
        {/* más rutas admin si las necesitás */}
      </Routes>
    </ComandaProvider>
  )
}
