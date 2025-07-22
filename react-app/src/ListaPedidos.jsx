import React, { useState } from 'react';
import PedidoCard from './PedidoCard';
import styles from './ListaPedidos.module.css'; 

export default function ListaPedidos() {
  const [files, setFiles] = useState([]);
  const [subtotals, setSubtotals] = useState({});
  const [globalDoubleSided, setGlobalDoubleSided] = useState(false);
  const [globalColor, setGlobalColor] = useState(false);
  const [globalBindings, setGlobalBindings] = useState(false);
  const [pagesPerFile, setPagesPerFile] = useState({});

  const bindingPrice = 3000;

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleSubtotalChange = (index, newSubtotal) => {
    setSubtotals(prev => ({
      ...prev,
      [index]: newSubtotal
    }));
  };

  const handlePagesChange = (index, numPages) => {
    setPagesPerFile(prev => ({
      ...prev,
      [index]: numPages
    }))
  }

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, i) => i !== indexToRemove);
    setFiles(updatedFiles);
  

    const updatedSubtotals = {};
    const updatedPages = {};

    updatedFiles.forEach((_, newIndex) => {
      updatedSubtotals[newIndex] = subtotals[newIndex >= indexToRemove ? newIndex + 1 : newIndex] || 0;
      updatedPages[newIndex] = pagesPerFile[newIndex >= indexToRemove ? newIndex + 1 : newIndex] || 0;
    }); 

    setSubtotals(updatedSubtotals);
    setPagesPerFile(updatedPages);
 };
  

  const calcularDescuento = (total) => {
    let porcentaje = 0;

    if (totalAmount >= 104130) {
      porcentaje = 40;
    } else if (totalAmount >= 65130) {
      porcentaje = 35;
    } else if (totalAmount >= 39130) {
      porcentaje = 30;
    } else if (totalAmount >= 26130) {
      porcentaje = 25;
    } else if (totalAmount >= 13130) {
      porcentaje = 20;
    } else if (totalAmount >= 5330) {
      porcentaje = 15;
    } else if (totalAmount >= 2730) {
      porcentaje = 10;
    }

    const descuento = total * (porcentaje / 100);
    const totalFinal = total - descuento;

    return {
      porcentaje,
      descuento,
      totalFinal
    };
  };
  
  const totalAmount = Object.values(subtotals).reduce((sum,value) => sum + value, 0);
  const totalPages = Object.values(pagesPerFile).reduce((sum,value)=> sum + value, 0);

  if (globalBindings && totalPages > 800) {
    alert ("Excede la cantidad de páginas")
  }

  const totalWithBinding = globalBindings
    ? totalAmount + bindingPrice
    : totalAmount;

  const { porcentaje, descuento, totalFinal } = calcularDescuento(totalWithBinding) 

  return (
	<div className= {styles.filesContainer}>

    <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFileUpload}
        className={styles.fileInputHidden}
        id="fileInput"
    />

    <label htmlFor="fileInput" className= {styles.uploadBtn}>
       Seleccionar
    </label>

    {files.length > 0 && (
      <div className={styles.globalControls}>
        <label>
          <input
            type="checkbox"
            checked={globalDoubleSided}
            onChange={(e) => {
              const checked = e.target.checked;
              setGlobalDoubleSided(checked);
              if (!checked) setGlobalBindings(0);
            }}
          />
          Doble faz global
        </label>

        <label>
          <input
            type="checkbox"
            checked={globalColor}
            onChange={(e) => setGlobalColor(e.target.checked)}
          />
          color global
        </label>

        <label>
          <input
            type="checkbox"
            checked={globalBindings}
            onChange={(e) => setGlobalBindings(e.target.checked)}
            disabled={files.length === 0}
          />
          Anillar todo en 1
        </label>
      </div>
    )}

    <div className = {styles.cardsContainer}>
        {files.map((file, index) => (
          <PedidoCard
            key={index}
            file={file}
            onRemove={() => handleRemoveFile(index)}
            onSubtotalChange ={(subtotal) => handleSubtotalChange(index, subtotal)}
            globalDoubleSided = {globalDoubleSided}
            globalBindings = {false}
            globalColor = {globalColor}
            numPages = {pagesPerFile[index] || 0}
          />
        ))}
    </div>

    {files.length > 0 && (() => {
      const { porcentaje, descuento, totalFinal} = calcularDescuento(totalAmount);
      return (
        <>
           <div className= {styles.totalContainer}>
              <h3 className= {styles.totalLabel}>Total:</h3>
              <p className= {styles.totalCashLabel}>${totalWithBinding.toLocaleString('es-AR')}</p>
           </div>

          {porcentaje > 0 && (
            <div className={styles.descuentoContainer}>
              <h3 className= {styles.totalLabel}>{porcentaje}% off:</h3>
              <p className={styles.descuentoLabel}>
                 -${descuento.toLocaleString('es-AR')}
              </p>
            </div>
          )}
        
          {porcentaje > 0 && (
            <div className={styles.totalFinalContainer}>
              <h3 className= {styles.totalLabel}>Precio final:</h3>
              <p className={styles.totalFinalLabel}>
                ${totalFinal.toLocaleString('es-AR')} 
              </p>
            </div>
          )}
        </>
      );
    })()}
  </div>
  );
}
