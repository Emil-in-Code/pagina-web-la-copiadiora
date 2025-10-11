import React, { createContext, useContext, useState } from 'react';

const ComandaContext = createContext();

export const useComandas = () => {
  const context = useContext(ComandaContext);
  if (!context) {
    throw new Error('useComandas debe usarse dentro de ComandaProvider');
  }
  return context;
};

export const ComandaProvider = ({ children }) => {
  const [comandas, setComandas] = useState([]);

  const crearComanda = (pedidoData) => {
    const nuevaComanda = {
      id: Date.now(), // Mejor usar uuid en producción
      fecha: new Date().toISOString(),
      usuario: pedidoData.usuario || 'Anónimo',
      entrega: pedidoData.entrega || 'Retiro',
      direccion: pedidoData.direccion || '',
      telefono: pedidoData.telefono || '',
      archivos: pedidoData.archivos || [],
      total: pedidoData.total || 0,
      estado: 'pendiente', // pendiente, realizando, finalizado
      tiempoEstimado: calcularTiempoEstimado(pedidoData.archivos),
    };
    
    setComandas(prev => [...prev, nuevaComanda]);
    return nuevaComanda.id;
  };

  const actualizarEstadoComanda = (id, nuevoEstado) => {
    setComandas(prev => 
      prev.map(comanda => 
        comanda.id === id 
          ? { ...comanda, estado: nuevoEstado }
          : comanda
      )
    );
  };

  const eliminarComanda = (id) => {
    setComandas(prev => prev.filter(comanda => comanda.id !== id));
  };

  const calcularTiempoEstimado = (archivos) => {
    let totalPaginas = 0;
    archivos.forEach(archivo => {
      totalPaginas += (archivo.numPages || 0) * (archivo.copies || 1);
    });
    
    // Estimación: 1 minuto por cada 10 páginas, mínimo 30 min
    const minutos = Math.max(30, Math.ceil(totalPaginas / 10));
    return `${Math.floor(minutos / 60)}h ${minutos % 60}min`;
  };

  const getComandasPorEstado = (estado) => {
    return comandas.filter(comanda => comanda.estado === estado);
  };

  return (
    <ComandaContext.Provider value={{
      comandas,
      crearComanda,
      actualizarEstadoComanda,
      eliminarComanda,
      getComandasPorEstado
    }}>
      {children}
    </ComandaContext.Provider>
  );
};
