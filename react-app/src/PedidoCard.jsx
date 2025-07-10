import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from './pdf-worker';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const precioPorHoja = 130;
const precioAnillado = 3000;

export default function PedidoCard({ archivo, onRemove, onSubtotalChange }) {
  const [numPages, setNumPages] = useState(0);
  const [juegos, setJuegos] = useState(1);
  const [anillados, setAnillados] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [dobleFaz, setDobleFaz] = useState(false);
  const [url, setUrl] = useState('');

  
  useEffect(() => {
    setUrl(URL.createObjectURL(archivo));
  }, [archivo]);

  useEffect(() => {
    calcularPrecio();
  }, [numPages, juegos, anillados, dobleFaz]);

  // Notificar cambios de subtotal al componente padre
  useEffect(() => {
    if (onSubtotalChange) {
      onSubtotalChange(subtotal);
    }
  }, [subtotal, onSubtotalChange]);

  const calcularPrecio = () => {
    if (!numPages) return;

    let costoPorArchivo;

    if (dobleFaz) {
      if (numPages === 1) {
        costoPorArchivo = precioPorHoja;
      } else if (numPages % 2 === 0) {
        costoPorArchivo = (numPages / 2) * precioPorHoja;
      } else {
        costoPorArchivo = ((numPages + 1) / 2) * precioPorHoja;
      }
    } else {
      costoPorArchivo = numPages * precioPorHoja;
    }
    
    const costoJuegosExtra = (juegos - 1) * costoPorArchivo;
    const costoAnillado = anillados * precioAnillado;
    const total = costoPorArchivo + costoJuegosExtra + costoAnillado;

    setSubtotal(total);
  };

  const handleLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
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
    <div style={{
      border: '1px solid #ddd',
      padding: '1rem',
      borderRadius: '10px',
      width: '240px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backgroundColor: '#ffce'
    }}>
      {/* Botón de eliminar */}
      <div style={{ textAlign: 'right', marginBottom: '0.5rem', color:'#000' }}>
        <button 
          onClick={handleRemove}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#000',
            padding: '0'
          }}
          title="Eliminar archivo"
        >
          ✕
        </button>
      </div>

      {/* Preview del PDF */}
      <div style={{ 
        maxHeight: '120px', 
        overflow: 'hidden', 
        borderRadius: '7px',
        marginBottom: '1rem'
      }}>
        <Document file={url} onLoadSuccess={handleLoadSuccess}>
          <Page pageNumber={1} width={200} />
        </Document>
      </div>

      {/* Información del archivo */}
      <div style={{ marginBottom: '1rem' }}>
        <h4 style={{ 
          margin: '0 0 0.5rem 0', 
          fontSize: '14px',
          fontWeight: 'bold',
          color:'#000'
        }}>
          {archivo.name.length > 20 ? archivo.name.slice(0, 20) + '...' : archivo.name}
        </h4>
        <p style={{ margin: '0', fontSize: '12px', color: '#000' }}>
          {formatFileSize(archivo.size)} • {numPages} páginas
        </p>
      </div>

      {/* Controles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem',color: '#000' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '14px' }}>
          Juegos:
          <input 
            type="number"
            min="1"
            max="100"
            value={juegos}
            onChange={(e) => setJuegos(Math.max(1, parseInt(e.target.value) || 1))}
            style={{ width: '60px', padding: '0.25rem' }}
          />
        </label>  

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '14px' }}>
          Anillados:
          <input
            type="number"
            min="0"
            max="100"
            value={anillados}
            onChange={(e) => setAnillados(Math.max(0, parseInt(e.target.value) || 0))}
            style={{ width: '60px', padding: '0.25rem' }}
          /> 
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '14px' }}>
          <input
            type="checkbox"
            checked={dobleFaz}
            onChange={() => setDobleFaz(prev => !prev)}
          />
          Doble faz
        </label>  
      </div>

      {/* Subtotal */}
      <div style={{ 
        marginTop: '1rem', 
        padding: '0.75rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '5px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold', color: '#000' }}>
          Subtotal: ${subtotal.toLocaleString('es-AR')}
        </p>
      </div>
    </div>
  );
}
