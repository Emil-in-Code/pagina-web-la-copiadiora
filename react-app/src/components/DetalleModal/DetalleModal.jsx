import React from 'react';
import styles from './DetalleModal.module.css';

const DetalleModal = ({ comanda, onClose }) => {
  if (!comanda) return null;

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-AR');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Detalle del Pedido {comanda.id}</h2>
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
                    <h4>{archivo.name}</h4>
                    <div className={styles.archivoDetalles}>
                      <span>📄 {archivo.numPages} páginas</span>
                      <span>📊 {archivo.copies} juego{archivo.copies !== 1 ? 's' : ''}</span>
                      <span>{archivo.color ? '🎨 Color' : '⚫ B/N'}</span>
                      {archivo.doubleSided && <span>📑 Doble faz</span>}
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
          <button className={styles.downloadBtn}>
            📥 Descargar ZIP
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
