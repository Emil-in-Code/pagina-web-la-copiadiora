import { useEffect, useState } from 'react'
import ListaPedidos from './ListaPedidos.jsx'
import '../styles/pedidos.css'

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
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

  return (
    <div>
      <h1 className="titulo">Subí tus archivos en PDF</h1>
      <ListaPedidos pedidos={pedidos} />
    </div>
  )
}

