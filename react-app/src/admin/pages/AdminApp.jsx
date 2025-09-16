import React from 'react'
import InfoCard from "../components/InfoCard/InfoCard.jsx"
import styles from "../components/InfoCard/InfoCard.module.css"

const AdminApp = () => {
  return (
    <div>
      <h1>Panel de Administración</h1>
      <p>En desarrollo...</p>
    </div>
  )
}

export default AdminApp

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardPedidos from './pages/DashboardPedidos.jsx'

export default function PublicApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/precios" element={<Pricing />} />
        <Route path="/envios" element={<Envios />} />
        <Route path="/links-utiles" element={<LinksUtiles />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

