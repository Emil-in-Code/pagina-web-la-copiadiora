import { useState } from 'react';
import JSZip from 'jszip';

export default function useZipDownload() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const descargarZipComanda = async (comandaData) => {
    setIsDownloading(true);
    setError(null);

    try {
      const zip = new JSZip();
      
      // Crear carpeta con el ID del pedido
      const folder = zip.folder(`Pedido_${comandaData.id}`);
      
      // Verificar que hay archivos
      if (!comandaData.archivos || comandaData.archivos.length === 0) {
        throw new Error('No hay archivos para descargar');
      }
      
      // Añadir cada archivo al ZIP
      for (let i = 0; i < comandaData.archivos.length; i++) {
        const archivo = comandaData.archivos[i];
        
        if (archivo.file) {
          // Leer el archivo como ArrayBuffer
          const arrayBuffer = await archivo.file.arrayBuffer();
          
          // Añadir al ZIP con nombre único
          const fileName = `${i + 1}_${archivo.name}`;
          folder.file(fileName, arrayBuffer);
          
          // Crear archivo de especificaciones
          const especificaciones = `
            Archivo: ${archivo.name}
            Páginas: ${archivo.numPages}
            Juegos: ${archivo.copies}
            Color: ${archivo.color ? 'Sí' : 'No'}
            Doble faz: ${archivo.doubleSided ? 'Sí' : 'No'}
            Anillados: ${archivo.bindings}
            Subtotal: $${archivo.subtotal?.toLocaleString('es-AR') || '0'}
          `.trim();
          
          folder.file(`${i + 1}_especificaciones.txt`, especificaciones);
        }
      }
      
      // Crear archivo resumen del pedido
      const resumen = `
      RESUMEN DEL PEDIDO #${comandaData.id}

      Cliente: ${comandaData.usuario}
      Entrega: ${comandaData.entrega}
      ${comandaData.direccion ? `Dirección: ${comandaData.direccion}` : ''}
      ${comandaData.telefono ? `Teléfono: ${comandaData.telefono}` : ''}
      Estado: ${comandaData.estado}
      Fecha: ${new Date(comandaData.fecha).toLocaleString('es-AR')}

      Total de archivos: ${comandaData.archivos.length}
      TOTAL: $${comandaData.total.toLocaleString('es-AR')}
            `.trim();
      
      folder.file('RESUMEN_PEDIDO.txt', resumen);
      
      // Generar el ZIP
      const content = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 6
        }
      });
      
      // Crear enlace de descarga
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Pedido_${comandaData.id}.zip`;
      document.body.appendChild(a);
      a.click();
      
      // Limpiar
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
      
      console.log('ZIP descargado exitosamente');
      return true;
      
    } catch (err) {
      console.error('Error al crear ZIP:', err);
      setError(err.message || 'Error al descargar archivos');
      return false;
    } finally {
      setIsDownloading(false);
    }
  };

  // Función alternativa: descargar solo los PDFs (sin carpeta ni extras)
  const descargarZipSimple = async (comandaData) => {
    setIsDownloading(true);
    setError(null);

    try {
      const zip = new JSZip();
      
      for (let i = 0; i < comandaData.archivos.length; i++) {
        const archivo = comandaData.archivos[i];
        
        if (archivo.file) {
          const arrayBuffer = await archivo.file.arrayBuffer();
          const fileName = `${i + 1}_${archivo.name}`;
          zip.file(fileName, arrayBuffer);
        }
      }
      
      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Pedido_${comandaData.id}_archivos.zip`;
      document.body.appendChild(a);
      a.click();
      
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
      
      return true;
      
    } catch (err) {
      console.error('Error al crear ZIP:', err);
      setError(err.message || 'Error al descargar archivos');
      return false;
    } finally {
      setIsDownloading(false);
    }
  };

  // Reset error
  const clearError = () => setError(null);

  return {
    descargarZipComanda,
    descargarZipSimple,
    isDownloading,
    error,
    clearError
  };
}
