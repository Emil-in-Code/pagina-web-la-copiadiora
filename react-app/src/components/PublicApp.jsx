import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './Index'
import Pricing from './Pricing'
import Envios from './Envios'
import LinksUtiles from './LinksUtiles'
import Pedidos from './Pedidos'

export default function PublicApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/precios" element={<Pricing />} />
        <Route path="/envios" element={<Envios />} />
        <Route path="/links-utiles" element={<LinksUtiles />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </BrowserRouter>
  )
}

