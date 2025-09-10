import React from 'react';
import { Document, Page } from 'react-pdf';
import styles from './PedidoCard.module.css';
import usePedidoCard from './usePedidoCard.js';

export default function PedidoCard ({
  file,
  onRemove,
  onSubtotalChange,
  onPageChange,
  globalDoubleSided,
  globalBindings,
  globalColor
}) {

  const {
    numPages,
    copies,
    bindings,
    subtotal,
    doubleSided,
    color,
    fileUrl,
    showWarning,
    setCopies,
    setBindings,
    setDoubleSided,
    setColor,
    handleLoadSuccess,
    handleRemove,
    formatFileSize
  } = usePedidoCard ({
    file,
    onRemove,
    onSubtotalChange,
    onPageChange,
    globalDoubleSided,
    globalBindings,
    globalColor
  });


 return ( 
    <div className= {styles.card}>
      {/* Botón de eliminar */}
      <div className= {styles.removeContainer}>
        <button 
          onClick={handleRemove} 
          className={styles.removebtn}
          title="Eliminar archivo"
        >
          ✕
        </button>
      </div>

      {/* Preview del PDF */}
      <div className= {styles.previewPdf}>
        <Document file={fileUrl} onLoadSuccess={handleLoadSuccess}>
          <Page pageNumber={1} width={260} />
        </Document>
      </div>

      {/* Información del archivo */}
      <div className="file-info" style = {{ marginBottom: '1rem' }}>
        <h4 style={{ 
          margin: '0 0 0.5rem 0', 
          fontSize: '10px',
          fontWeight: 'bold',
          color:'#000'
        }}>
          {file.name.length > 20 ? file.name.slice(0, 20) + '...' : file.name}
        </h4>
        <p style={{ margin: '0', fontSize: '10px', color: '#e1e1e1' }}>
          {formatFileSize(file.size)} • {numPages} pages
        </p>
      </div>

      {/* Controles */}
      <div className={styles.containerControlers}>

        <div className={styles.row}>
          <div className={styles.switchToggle}>
            <span className={styles.label}>Color:</span> 
            <input 
              type="checkbox"
              id={`color-switch-${file.name}`} // ID único por archivo
              checked={color}
              onChange={() => setColor(prev => !prev)}
              className={styles.switchCheckbox}
            />
            <label htmlFor={`color-switch-${file.name}`} className={styles.switchLabel}></label>
          </div>
        

          <div className={styles.switchToggle}>
            <span className= {styles.label}>Doble faz:</span>
            <input 
              type="checkbox"
              id={`switch-${file.name}`} // ID único por archivo
              checked={doubleSided}
              onChange={() => setDoubleSided(prev => !prev)}
              className={styles.switchCheckbox}
            />
            <label htmlFor={`switch-${file.name}`} className={styles.switchLabel}></label>
          </div>
        </div>

        <div className={styles.row}>
          <label className={styles.label}>
            Juegos: 
            <input 
              type="number"
              min="1"
              max="100"
              value={copies}
              onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
              className={styles.inputNumero}
            />
          </label>

          <label className={styles.label}>
            Anillados:
            <input
              type="number"
              min="0"
              max="100"
              value={bindings}
              onChange={(e) => setBindings(Math.max(0, parseInt(e.target.value) || 0))}
              className={styles.inputNumero}
            /> 
          </label>
        </div>
      </div>

      {/* Subtotal */}
      <div className= {styles.subtotal}>
        <p className= {styles.subtotalLabel}>
          Subtotal:
        </p>
        <p className= {styles.subtotalCash}>
          ${subtotal.toLocaleString('es-AR')}
        </p>
      </div>
  
      {showWarning && (
        <div className={styles.warningBox}>
          <p className={styles.warningText}>
           ⚠️Se necesitan al menos 2 anillados para esta cantidad de hojas. 
           Si solo deseas 1 anillado, se anillará al máximo y el resto quedará sin anillar.
          </p>
        </div>
      )}

    </div>
  );
}
