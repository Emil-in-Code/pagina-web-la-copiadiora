import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import workerSrc from './pdf-worker';

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

const precioPorHoja = 130;
const precioAnillado = 3000;

export default function PedidoCard({ archivo }) {
  const [numPages, setNumPages] = useState(0);
  const [juegos, setJuegos] = useState(1);
  const [anillados, setAnillados] = useState(0);
  const [subtotal,setSubtotal] = useState(0);
  const [dobleFaz, setDobleFaz] = useState(false);
  const [url, setUrl] = useState('');
  
  useEffect(() => {
    setUrl(URL.createObjectURL(archivo));

  }, [archivo]);

  useEffect(() => {
    calcularPrecio();
  }, [numPages, juegos, anillados, dobleFaz]);

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
    setNumPages (numPages);
  };

 
  return ( 
  <div style={{
     border: '1px solid #ccc',
     padding: '0.5rem',
     borderRadius: '10px',
     width: '220px'
    }}>
      
     
   
    <div style={{ maxHeight: '100px', overflow: 'hidden', borderRadius: '7px' }}>
      <Document file={url} onLoadSuccess={handleLoadSuccess}>
        <Page pageNumber={1} width={200} />
      </Document>
    </div>

  
    <h4>{archivo.name.slice(0,15)}...</h4>
    <p>{(archivo.size /1024).toFixed(2)}KB</p>
    <p>{numPages} páginas</p>

    <label>
      Juegos:
      <input type="number"
        min="1"
        value={juegos}
        onChange={(e) => setJuegos(parseInt(e.target.value) || 1)}
      />
    </label>  

    <label>
      Anillados:
      <input
        type="number"
        min="0"
        value={anillados}
        onChange={(e) => setAnillados(parseInt(e.target.value) || 0)}
      /> 
    </label>

    <label>
      <input
        type="checkbox"
        checked={dobleFaz}
        onChange={() => setDobleFaz(prev => !prev)}
      />
      ¿Doble faz?  
    </label>  

    <p><strong>Subtotal:</strong> {subtotal.toLocaleString('es-AR')} ARS;</p>
  </div>
  );
}
