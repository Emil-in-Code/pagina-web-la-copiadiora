import styles from "./Comanda.module.css"

import { useComandas } from '../../context/ComandaContext.jsx'; // Ajustar ruta según tu estructura

export default function Comanda ({ 
  comandaData,
  onVerDetalle,
  onCambiarEstado,
  onDescargarZip
}) {
  const { actualizarEstadoComanda } = useComandas();

  const {
    id,
    usuario,
    entrega,
    direccion,
    archivos,
    total,
    estado,
    tiempoEstimado
  } = comandaData;

  const handleEstadoChange = () => {
    let nuevoEstado;
    switch(estado) {
      case 'pendiente':
        nuevoEstado = 'realizando';
        break;
      case 'realizando':
        nuevoEstado = 'finalizado';
        break;
      default:
        return;
    }
    
    actualizarEstadoComanda(id, nuevoEstado);
    onCambiarEstado?.(id, nuevoEstado);
  };

  const getEstadoTexto = () => {
    switch(estado) {
      case 'pendiente': return 'Realizar';
      case 'realizando': return 'Finalizar';
      case 'finalizado': return 'Completado';
      default: return 'Pendiente';
    }
  };

  const getTipoTexto = () => {
    const tieneColor = archivos.some(archivo => archivo.color);
    const tieneBN = archivos.some(archivo => !archivo.color);
    
    if (tieneColor && tieneBN) return 'Color + B/N';
    if (tieneColor) return 'Color';
    return 'B/N';
  };

  const getTotalArchivos = () => {
    return archivos.length;
  };

  const getTotalJuegos = () => {
    return archivos.reduce((total, archivo) => total + (archivo.copies || 1), 0);
  };

  return (
    <div className={styles["comanda-container"]}>
      <div className={styles["container-title"]}>
        <h2 className={styles["title"]}>Pedido {id}</h2>
        {estado === 'realizando' && (
          <span className={styles["en-proceso"]}>🔄</span>
        )}
        {estado === 'finalizado' && (
          <span className={styles["completado"]}>✅</span>
        )}
      </div>

      <div className={styles["info-container"]}>
        <div className={styles["container-row1"]}>
          <h3 className={styles["subtitle"]}> 
            {getTipoTexto()}
          </h3>
          <p className={styles["price"]}> 
            ${total.toLocaleString('es-AR')}
          </p>
        </div>

        <div className={styles["usuario-info"]}>
          <p className={styles["usuario"]}>
            👤 {usuario}
          </p>
          <p className={styles["entrega"]}>
            📦 {entrega} {direccion && `- ${direccion}`}
          </p>
        </div>

        <div className={styles["archivos-info"]}>
          <p className={styles["archivo-count"]}>
            📄 {getTotalArchivos()} archivo{getTotalArchivos() !== 1 ? 's' : ''}
          </p>
          <p className={styles["juegos-count"]}>
            📊 {getTotalJuegos()} juego{getTotalJuegos() !== 1 ? 's' : ''}
          </p>
        </div>

        <div className={styles["container-row2"]}>
          <button 
            className={styles["details-btn"]} 
            onClick={() => onVerDetalle?.(comandaData)}
          > 
            📋 Detalle
          </button>

          {estado !== 'finalizado' && (
            <button 
              className={`${styles["action"]} ${styles[`action-${estado}`]}`}
              onClick={handleEstadoChange}
            > 
              {getEstadoTexto()}
            </button>
          )}

          {estado === 'finalizado' && (
            <button 
              className={styles["download-btn"]}
              onClick={() => onDescargarZip?.(comandaData)}
            >
              📥 Descargar
            </button>
          )}

          <p className={styles["time"]}> 
            ⏱️ {tiempoEstimado}
          </p>
        </div>
      </div>
    </div>
  );
}
