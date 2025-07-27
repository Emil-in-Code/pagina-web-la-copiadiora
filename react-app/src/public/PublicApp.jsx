import React, {useEffect, useState } from 'react'
import ListaPedidos from './ListaPedidos.jsx'
import styles from './ListaPedidos.module.css'

export default function PublicApp() {
  const [pedidos, setPedidos] = useState ([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/pedidos') //ajustar al backend posta
      .then(r => {
        if (!r.ok) throw new Error('Erro al cargar pedidos')
        return r.json()
    })
    .then(data => setPedidos(data))
    .catch(err => setErro(err.message))
    .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Cargando pedidos...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Pedidos</h1>
      <ListaPedidos pedidos={pedidos}/>
    </div>
  )
}
