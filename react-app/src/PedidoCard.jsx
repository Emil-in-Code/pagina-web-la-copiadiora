import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from './pdf-worker';
import styles from './PedidoCard.module.css';
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const pricePerPage = 130;
const bindingPrice = 3000;
const priceColor = 300;
const priceColorD = 350;

export default function PedidoCard({ file, onRemove, onSubtotalChange, onPageChange, globalDoubleSided, globalBindings, globalColor}) {
  const [numPages, setNumPages] = useState(0);
  const [copies, setCopies] = useState(1);
  const [bindings, setBindings] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [doubleSided, setDoubleSided] = useState(false);
  const [color, setColor] = useState(false); 
  const [fileUrl, setFileUrl] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  
  useEffect(() => {
    setFileUrl(URL.createObjectURL(file));
  }, [file]);

  useEffect(() => {
    calculateSubtotal();

    const totalSheets = numPages * copies;
    const maxSheets = doubleSided ? 800 : 400;

    if (bindings === 1 && totalSheets > maxSheets) { 
      setShowWarning(true);
    } else { 
      setShowWarning(false);
    }
  }, [numPages, copies, bindings, doubleSided, color]);

  useEffect(()=> {
    setDoubleSided(globalDoubleSided);
  }, [globalDoubleSided]);

  useEffect(()=> {
    const maxPages = doubleSided ? 800 : 400;
    if (bindings && numPages > maxPages) {
      setBindings(0);
    }
  }, [doubleSided, numPages, bindings]);

  useEffect(() => {
    setBindings(globalBindings);
  }, [globalBindings]);

  useEffect(()=> {
    setColor(globalColor);
  }, [globalColor]);

  // Notificar cambios de subtotal al componente padre
  useEffect(() => {
    if (onSubtotalChange) {
      onSubtotalChange(subtotal);
    }
  }, [subtotal]);

  const calculateSubtotal = () => {
    if (!numPages) return;

    let baseCost;

    if (doubleSided) {
      if (numPages === 1) {
        baseCost = pricePerPage;
      } else if (numPages % 2 === 0) {
        baseCost = (numPages / 2) * pricePerPage;
      } else {
        baseCost = ((numPages + 1) / 2) * pricePerPage;
      }
    } else {
      baseCost = numPages * pricePerPage;
    }
    
    let colorCost;

    if (color) {
      if (doubleSided) {
        if (numPages === 1) {
          baseCost = priceColor;
        } else if (numPages % 2 === 0) {
         baseCost = (numPages /2) * priceColorD;
        } else {
         baseCost = ((numPages + 1) /2) * priceColorD;
        }
      } else {
         baseCost = numPages * priceColor;
      } 
    }
    
    const extraCopiesCost = (copies - 1) * baseCost;
    const totalBindingCost = bindings * bindingPrice;
    const total = baseCost + extraCopiesCost + totalBindingCost;

    setSubtotal(total);
  };

  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    
    if (onPageChange) {
      onPageChange(numPages);
    }
    const maxPages = doubleSided ? 800 : 400;
    if (bindings && numPages > maxPages) {
      alert("demasiadas hojas para 1 solo anillado")
      setBindings(0);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

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
