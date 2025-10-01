import React from 'react';
import { Document, Page } from 'react-pdf';
import styles from './OrderCard.module.css';
import useOrderCard from './useOrderCard.js';

export default function OrderCard ({
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
  } = useOrderCard ({
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
            <span className={styles.optionText}>Color:</span> 
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
            <span className= {styles.optionText}>Doble faz:</span>
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
          <div className={styles.numberWrapper}>
            <span className={styles.optionText}>Juegos:</span>
            <div className={styles.customNumber}>
              <button 
                type="button" 
                onClick={() => setCopies(Math.max(1, copies - 1))}
                className={styles.numberBtn}
              >
                –
              </button>
              <input 
                type="number"
                min="1"
                max="100"
                value={copies}
                onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
                className={styles.quantityInput}
              />
              <button 
                type="button" 
                onClick={() => setCopies(Math.min(100, copies + 1))}
                className={styles.numberBtn}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.numberWrapper}>
            <span className={styles.optionText}>Anillados:</span>
            <div className={styles.customNumber}>
              <button 
                type="button" 
                onClick={() => setBindings(Math.max(0, bindings - 1))}
                className={styles.numberBtn}
              >
                –
              </button>
              <input
                type="number"
                min="0"
                max="100"
                value={bindings}
                onChange={(e) => setBindings(Math.max(0, parseInt(e.target.value) || 0))}
                className={styles.quantityInput}
              />
              <button 
                type="button" 
                onClick={() => setBindings(Math.min(100, bindings + 1))}
                className={styles.numberBtn}
              >
                +
              </button>
            </div>
          </div>
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
