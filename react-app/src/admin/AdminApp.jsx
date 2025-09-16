import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardPedidos from './DashboardPedidos'

export default function AdminApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/DashboardPedidos" element={<DashboardPedidos />} />
      </Routes>
    </BrowserRouter>
  )
}

