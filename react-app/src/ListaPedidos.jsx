import React, { useState } from 'react';
import PedidoCard from './PedidoCard';
import styles from './ListaPedidos.module.css'; 

export default function ListaPedidos() {
  const [files, setFiles] = useState([]);
  const [subtotals, setSubtotals] = useState({});

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

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, i) => i !== indexToRemove);
    setFiles(updatedFiles);
  

    const updatedSubtotals = {};
    updatedFiles.forEach((_, newIndex) => {
      updatedSubtotals[newIndex] = subtotals[newIndex >= indexToRemove ? newIndex + 1 : newIndex] || 0;
    });
    setSubtotals(updatedSubtotals);
 };
  const totalAmount = Object.values(subtotals).reduce((sum, value) => sum + value, 0);
  
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

      <div className = {styles.cardsContainer}>
        {files.map((file, index) => (
          <PedidoCard
            key={index}
            file={file}
            onRemove={() => handleRemoveFile(index)}
            onSubtotalChange={(subtotal) => handleSubtotalChange(index, subtotal)}
          />
        ))}
      </div>

      {files.length > 0 && (
        <div className= {styles.totalContainer}>
          <h3 className= {styles.totalLabel}>Total del pedido:</h3>
          <p className= {styles.totalCashLabel}>${totalAmount.toLocaleString('es-AR')}</p>
        </div>
      )}
    </div>
  );
}
