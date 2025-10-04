import React, { useState } from 'react';
import Comanda from "../components/Comanda/Comanda.jsx";
import DetalleModal from "../components/DetalleModal/DetalleModal.jsx";
import { useComandas } from '../context/ComandaContext.jsx';
import styles from "../styles/Dashboard.module.css";

const DashboardPedidos = () => {
  const { getComandasPorEstado } = useComandas();
  const [comandaDetalle, setComandaDetalle] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  const comandasPendientes = getComandasPorEstado('pendiente');
  const comandasRealizando = getComandasPorEstado('realizando');
  const comandasFinalizadas = getComandasPorEstado('finalizado');

  const handleVerDetalle = (comandaData) => {
    setComandaDetalle(comandaData);
    setMostrarDetalle(true);
  };

  const handleDescargarZip = async (comandaData) => {
    try {
      // Aquí implementarías la lógica de descarga del ZIP
      await descargarZipComanda(comandaData);
    } catch (error) {
      console.error('Error al descargar ZIP:', error);
      alert('Error al descargar los archivos');
    }
  };

  const descargarZipComanda = async (comandaData) => {
    // Esta función necesitaría implementarse según tu backend
    // Por ahora, simulamos la descarga
    console.log('Descargando ZIP para comanda:', comandaData.id);
    
    // Ejemplo de implementación con archivos locales:
    // const JSZip = require('jszip'); // Necesitarías instalar jszip
    // const zip = new JSZip();
    // 
    // comandaData.archivos.forEach((archivo, index) => {
    //   zip.file(`${archivo.name}`, archivo.file);
    // });
    // 
    // const content = await zip.generateAsync({type:"blob"});
    // const url = window.URL.createObjectURL(content);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = `Pedido_${comandaData.id}.zip`;
    // a.click();
  };

  const renderColumna = (titulo, comandas, className) => (
    <div className={`${styles["columna"]} ${className}`}>
      <h2 className={styles["columna-titulo"]}>{titulo}</h2>
      <div className={styles["comandas-container"]}>
        {comandas.map(comanda => (
          <Comanda
            key={comanda.id}
            comandaData={comanda}
            onVerDetalle={handleVerDetalle}
            onDescargarZip={handleDescargarZip}
          />
        ))}
        {comandas.length === 0 && (
          <div className={styles["empty-state"]}>
            <p>No hay pedidos {titulo.toLowerCase()}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles["dashboard-container"]}>
      <div className={styles["contenedor"]}>
        <h1 className={styles["title"]}>Panel de Administración</h1>
        <div className={styles["stats"]}>
          <span className={styles["stat"]}>
            📋 Pendientes: {comandasPendientes.length}
          </span>
          <span className={styles["stat"]}>
            🔄 En proceso: {comandasRealizando.length}
          </span>
          <span className={styles["stat"]}>
            ✅ Finalizados: {comandasFinalizadas.length}
          </span>
        </div>
      </div>
        
      <div className={styles["kanban-board"]}>
        {renderColumna("", comandasPendientes, styles["pendientes"])}
        {renderColumna("", comandasRealizando, styles["realizando"])}
        {renderColumna("", comandasFinalizadas, styles["finalizados"])}
      </div>

      {mostrarDetalle && (
        <DetalleModal
          comanda={comandaDetalle}
          onClose={() => setMostrarDetalle(false)}
        />
      )}
    </div>
  );
};

export default DashboardPedidos;
