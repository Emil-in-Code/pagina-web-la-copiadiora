import { useEffect, useState } from 'react'
import ListaPedido from '../components/CardPedido/ListaPedido.jsx';
import '../styles/pedidos.css'
import Navbar from "../widgets/navbar"

export default function Pedidos() {
    const [pedidos, setPedidos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)


  useEffect(() => {
    // Simulación mientras no tengas backend
    const fakePedidos = [
      { id: 1, nombre: 'Pedido test', fecha: '2025-08-31' }
    ]
    setPedidos(fakePedidos)
    setLoading(false)
  }, [])

  {/* useEffect(() => {
      fetch('/api/pedidos') // ajustar según tu backend o Supabase
        .then(r => {
          if (!r.ok) throw new Error('Error al cargar pedidos')
          return r.json()
        })
        .then(data => setPedidos(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }, [])

    if (loading) return <p>Cargando pedidos...</p>
    if (error) return <p>Error: {error}</p>
  */ } 
    return (
      <>
        <Navbar />
        <div className="body-pedidos">
          <h1 className="titulo">Subí tus archivos en PDF</h1>
          <ListaPedido pedidos={pedidos} />
        </div>   
      </> 
    )
}

