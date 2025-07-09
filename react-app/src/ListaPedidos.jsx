import React, { useState } from 'react';
import PedidoCard from './PedidoCard';

export default function ListaPedidos() {
  const [archivos, setArchivos] = useState([]);
  
  const handleChange = (e) => {
    const nuevosArchivos = Array.from(e.target.files);
    setArchivos(prev => [...prev, ...nuevosArchivos]);
  };

  return (
    <div>
      <input type="file" accept="application/pdf" multiple onChange={handleChange} />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
        {archivos.map((archivo, index) => (
         <PedidoCard key={index} archivo={archivo} /> 
        ))}
      </div>
    </div>
  );
}
