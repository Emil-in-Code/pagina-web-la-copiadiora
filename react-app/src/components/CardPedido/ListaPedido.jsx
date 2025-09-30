import React from 'react';
import styles from './ListaPedidos.module.css';
import PedidoCard from './PedidoCard.jsx';
import useListaPedido from './useListaPedido.js';
import FileButton from '../FileBtn/FileBtn.jsx'

export default function ListaPedido() {
  const {
    files,
    subtotals,
    globalDoubleSided,
    globalColor,
    globalBindings,
    pagesPerFile,

    setGlobalDoubleSided,
    setGlobalColor,
    setGlobalBindings,

    handleFileUpload,
    handleSubtotalChange,
    handlePagesChange,
    handleRemoveFile,

    totalPages,
    totalWithBinding,
    porcentaje,
    descuento,
    totalFinal
  } = useListaPedido();

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
          
         
        <div className={styles.btnContainer}>
         <FileButton htmlFor="fileInput">
          Seleccionar
         </FileButton>
        </div>

      {files.length > 0 && (
        <div className={styles.globalControls}>
          <label>
            <input
              type="checkbox"
              checked={globalDoubleSided}
              onChange={(e) => {
              const checked = e.target.checked;
              setGlobalDoubleSided(checked);
              if (!checked) setGlobalBindings(false);
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
            Color global
          </label>

          <label>
            <input
              type="checkbox"
              checked={globalBindings}
              onChange={(e) => {
                const checked = e.target.checked;
                const maxPages = globalDoubleSided ? 800 : 400;

                if (totalPages > maxPages) {
                  alert ("Excede la cantidad, se debe anillar por separado");
                  setGlobalBindings(false);
                } else {
                  setGlobalBindings(checked);
                }
              }}
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
            onPageChange={(numPages) => handlePagesChange(index, numPages)}
            globalDoubleSided = {globalDoubleSided}
            globalBindings = {globalBindings}
            globalColor = {globalColor}
            numPages = {pagesPerFile[index] || 0}
          />
        ))}
      </div>

      {files.length > 0 && (
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
      )}
    </div>
  );
}
