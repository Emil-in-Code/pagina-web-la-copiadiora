import React, { useState } from 'react';
import styles from './DetalleModal.module.css';
import useZipDownload from '../Zip/useZipDownload.js'
import { supabase } from '../../../lib/supabaseClient.js'

const DetalleModal = ({ comanda, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!comanda) return null;

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-AR');
  };
   
  const handleDescargarArchivos = async () => {
    try {
      setIsDownloading(true);

      if (!comanda.archivos || comanda.archivos.length === 0) {
        alert('no hay archivos para descargar');
        return;
      }

      for (const archivo of comanda.archivos) {
        const { data, error } = await supabase.storage
        .from('pedidos-pdf')
        .download(archivo.ruta_storage);

        if (error){
          console.error('Error descargando archivo individual', error);
          throw error;
        }

        //crear link de descarga
        const url = URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = archivo.nombre_archivo;
        document.body.appendChild(a);
        URL.revokeObjectURL(url);

        await new Promise(resolve => setTimeout(resolve, 300));
      }

      alert(`✅ Descargados ${comanda.archivos.length} archivo(s)`);
    } catch (error) {
      console.error('Error al descargar archivos:', error);
      alert('❌ Error al descargar archivos. Intentá nuevamente.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Detalle del Pedido {comanda.id.substring(0,8)}</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.content}>                  
          <div className={styles.infoSection}>
            <h3>Información del Cliente</h3>
            <p><strong>Usuario:</strong> {comanda.usuario}</p>
            <p><strong>Entrega:</strong> {comanda.entrega}</p>
            {comanda.direccion && (                 
              <p><strong>Dirección:</strong> {comanda.direccion}</p>
            )}
            {comanda.telefono && (
              <p><strong>Teléfono:</strong> {comanda.telefono}</p>
            )}
            <p><strong>Fecha:</strong> {formatFecha(comanda.fecha)}</p>
            <p><strong>Estado:</strong> {comanda.estado}</p>
          </div>

          <div className={styles.archivosSection}>
            <h3>Archivos ({comanda.archivos.length})</h3>
            <div className={styles.archivosList}>
              {comanda.archivos.map((archivo, index) => (
                <div key={index} className={styles.archivoItem}>
                  <div className={styles.archivoInfo}>
                    <h4>{archivo.nombre_archivo}</h4>
                    <div className={styles.archivoDetalles}>
                      <span>📄 {archivo.num_pages} páginas</span>
                      <span>📊 {archivo.copies} juego{archivo.copies !== 1 ? 's' : ''}</span>
                      <span>{archivo.color ? '🎨 Color' : '⚫ B/N'}</span>
                      {archivo.double_sided && <span>📑 Doble faz</span>}
                      {archivo.bindings > 0 && (
                        <span>📎 {archivo.bindings} anillado{archivo.bindings !== 1 ? 's' : ''}</span>
                      )}
                    </div>
                  </div>
                  <div className={styles.archivoSubtotal}>
                    ${archivo.subtotal?.toLocaleString('es-AR') || '0'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.totalSection}>
            <div className={styles.totalRow}>
              <span>Total del Pedido:</span>
              <strong>${comanda.total.toLocaleString('es-AR')}</strong>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            onClick={handleDescargarArchivos}
            disabled={isDownloading} 
            className={styles.downloadBtn}
          >
            {isDownloading ? 'Descargando...' : ' 📥 Descargar'}
          </button>
          <button className={styles.closeModalBtn} onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleModal;
