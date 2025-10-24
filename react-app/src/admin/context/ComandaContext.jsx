import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient.js';

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
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Obtener el rol del usuario actual
  useEffect(() => {
    const getUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        
        setUserRole(profile?.role || 'cliente');
      }
    };

    getUserRole();
  }, []);

  // Crear pedido en Supabase
  const crearComanda = async (pedidoData) => {
    try {
      setLoading(true);
      
      // Obtener usuario actual (puede ser null para anónimos)
      const { data: { user } } = await supabase.auth.getUser();
      const esRegistrado = !!user;

      // 1. Crear el pedido en la tabla 'pedidos'
      const pedidoPayload = {
        usuario_id: esRegistrado ? user.id : null,
        total: pedidoData.total,
        entrega: pedidoData.entrega || 'Retiro',
        direccion: pedidoData.direccion || '',
        telefono: pedidoData.telefono || '',
        global_double_sided: pedidoData.globalDoubleSided || false,
        global_color: pedidoData.globalColor || false,
        global_bindings: pedidoData.globalBindings || false,
        tiempo_estimado: calcularTiempoEstimado(pedidoData.archivos),
        estado: 'pendiente',
        es_usuario_registrado: esRegistrado,
        // Solo para usuarios anónimos:
        nombre_cliente: esRegistrado ? null : pedidoData.usuario?.split(' ')[0] || 'Anónimo',
        apellido_cliente: esRegistrado ? null : pedidoData.usuario?.split(' ').slice(1).join(' ') || '',
        email_cliente: esRegistrado ? null : pedidoData.email || ''
      };

      const { data: pedido, error: pedidoError } = await supabase
        .from('pedidos')
        .insert(pedidoPayload)
        .select()
        .single();

      if (pedidoError) throw pedidoError;

      const pedidoId = pedido.id;

      // 2. Subir archivos a Storage y crear registros en 'archivos_pedido'
      for (const archivo of pedidoData.archivos) {
        const carpetaUsuario = esRegistrado ? user.id : 'anonimo';
        const rutaStorage = `${carpetaUsuario}/${pedidoId}/${archivo.file.name}`;

        // Subir archivo a Storage
        const { error: uploadError } = await supabase.storage
          .from('pedidos-pdf')
          .upload(rutaStorage, archivo.file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Error subiendo archivo:', uploadError);
          throw uploadError;
        }

        // Crear registro en tabla archivos_pedido
        const { error: archivoError } = await supabase
          .from('archivos_pedido')
          .insert({
            pedido_id: pedidoId,
            nombre_archivo: archivo.name,
            ruta_storage: rutaStorage,
            num_pages: archivo.numPages || 0,
            copies: archivo.copies || 1,
            bindings: archivo.bindings || 0,
            double_sided: archivo.doubleSided || false,
            color: archivo.color || false,
            subtotal: archivo.subtotal || 0
          });

        if (archivoError) throw archivoError;
      }

      // 3. Actualizar lista de comandas
      await obtenerComandas();

      return pedidoId;
    } catch (error) {
      console.error('Error creando comanda:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Obtener pedidos desde Supabase
  const obtenerComandas = async () => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setComandas([]);
        return;
      }

      // Obtener rol del usuario
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      const esAdmin = profile?.role === 'admin';

      // Query base
      let query = supabase
        .from('pedidos')
        .select(`
          *,
          archivos_pedido (*)
        `)
        .order('created_at', { ascending: false });

      // Si no es admin, solo sus pedidos
      if (!esAdmin) {
        query = query.eq('usuario_id', user.id);
      }

      const { data: pedidos, error } = await query;

      if (error) throw error;

      // Transformar a formato de comandas
      const comandasFormateadas = pedidos.map(pedido => ({
        id: pedido.id,
        fecha: pedido.fecha,
        usuario: pedido.es_usuario_registrado 
          ? `${pedido.nombre_cliente || ''} ${pedido.apellido_cliente || ''}`.trim() || 'Usuario registrado'
          : `${pedido.nombre_cliente} ${pedido.apellido_cliente}`,
        entrega: pedido.entrega,
        direccion: pedido.direccion,
        telefono: pedido.telefono,
        archivos: pedido.archivos_pedido,
        total: pedido.total,
        estado: pedido.estado,
        tiempoEstimado: pedido.tiempo_estimado
      }));

      setComandas(comandasFormateadas);
    } catch (error) {
      console.error('Error obteniendo comandas:', error);
    } finally {
      setLoading(false);
    }
  }; 

  // Actualizar estado en Supabase
  const actualizarEstadoComanda = async (id, nuevoEstado) => {
    try {
      const { error } = await supabase
        .from('pedidos')
        .update({ estado: nuevoEstado })
        .eq('id', id);

      if (error) throw error;

      // Actualizar estado local
      setComandas(prev =>
        prev.map(comanda =>
          comanda.id === id
            ? { ...comanda, estado: nuevoEstado }
            : comanda
        )
      );
    } catch (error) {
      console.error('Error actualizando estado:', error);
    }
  };

  // Eliminar comanda de Supabase
  const eliminarComanda = async (id) => { 
    try {
      // Al eliminar el pedido, los archivos_pedido se eliminan por CASCADE
      const { error } = await supabase
        .from('pedidos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Actualizar estado local
      setComandas(prev => prev.filter(comanda => comanda.id !== id));
    } catch (error) {
      console.error('Error eliminando comanda:', error);
    }
  };

  // Calcular tiempo estimado
  const calcularTiempoEstimado = (archivos) => {
    let totalPaginas = 0;
    archivos.forEach(archivo => {
      totalPaginas += (archivo.numPages || 0) * (archivo.copies || 1);
    });
    
    const minutos = Math.max(30, Math.ceil(totalPaginas / 10));
    return `${Math.floor(minutos / 60)}h ${minutos % 60}min`;
  };

  // Filtrar por estado
  const getComandasPorEstado = (estado) => {
    return comandas.filter(comanda => comanda.estado === estado);
  };

  return (
    <ComandaContext.Provider value={{
      comandas,
      loading,
      userRole,
      crearComanda,
      obtenerComandas, 
      actualizarEstadoComanda,
      eliminarComanda,
      getComandasPorEstado
    }}>
      {children}
    </ComandaContext.Provider>
  );
}; 
