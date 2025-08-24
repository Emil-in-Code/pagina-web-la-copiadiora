import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Pricing from './Pricing'
import Envios from './Envios'
import LinksUtiles from './LinksUtiles'
import Pedidos from './Pedidos'

export default function PublicApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/precios" element={<Pricing />} />
        <Route path="/envios" element={<Envios />} />
        <Route path="/links-utiles" element={<LinksUtiles />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </BrowserRouter>
  )
}

