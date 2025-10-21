import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../../lib/supabaseClient.js'
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
  },[]);

  const crearComanda = async (pedidoData) => {

    try {
      setLoading(true);
      //obtener usuario actual(puede ser null para no registrados)
      const { data: {user}} = await supabase.auth.getUser();
      const esRegistrado = !!user;

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
        //subir archivos al storage y crear registro en archivos_pedidos
      for (const archivo of pedidoData.archivos) {
          const carpetaUsuario = esRegistrado ? user.id : 'anonimo';
          const rutaStorage = `${carpetaUsuario}/${pedidoId}/${archivo.file.name}`;

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

      //actualizar lista de comandas 
      await obtenerComandas();

      return pedidoId;
    }catch (error) {
      console.error('Error creando comanda:', error);
      throw error;
    }finally {
      setLoading(false);
    }
  };

  //obtener pedido desde supabase 
//
  const obtenerComandas = async () => {
    try {
      setLoading(true);

      const { data: { user } } = await supabase.auth.getUser();
    
      if (!user) {
        setComandas([]);
        return;
      }

      const { data: { profile } } = await supabase 
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      const esAdmin = profile?.role === 'admin';

      //Query base 
      let query = supabase 
        .from('pedidos')
        .select(`
          *,
          archivos_pedido (*)
        `)
        .order('created_at', { ascending: false });
    }
  }};
