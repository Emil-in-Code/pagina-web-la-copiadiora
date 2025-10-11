import React, { useState } from 'react';
import Comanda from "../components/Comanda/Comanda.jsx";
import DetalleModal from "../components/DetalleModal/DetalleModal.jsx";
import { useComandas } from '../context/ComandaContext.jsx';
import useZipDownload from '../components/Zip/useZipDownload.js'
import styles from "./Dashboard.module.css";
import Navbar from "../widgets/Navbar.module.css"

const DashboardPedidos = () => {
  const { getComandasPorEstado } = useComandas();
  const { descargarZipComanda, isDownloading, error } = useZipDownload();
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
    const success = await descargarZipComanda(comandaData);

    if(success){
      alert('zip descargado');
    } else {
      alert(`Error al descargar: ${error || 'Intenta nuevamente'}`);
    }
  }

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
    <>
      <Navbar />
      <main className={styles["dashboard-container"]}>
        <div className={styles["container-stats"]}>
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
      </main>
    </> 
  );
};

export default DashboardPedidos;
