import React, { useState } from 'react';
import styles from './OrderList.module.css';
import PedidoCard from './OrderCard.jsx';
import useOrderList from './useOrderList.js';
import FileButton from '../FileBtn/FileBtn.jsx';
import { useComandas } from '../../admin/context/ComandaContext.jsx'

export default function OrderList() {
  const { crearComanda } = useComandas(); 
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    handleConfigChange,
    prepararDatosPedido,
    limpiarPedido,

    totalPages,
    totalWithBinding,
    porcentaje,
    descuento,
    totalFinal
  } = useOrderList();

  //funcion para hacer pedido (guarda en supabase)
  const handleHacerPedido = async () => {
    if (files.length === 0) {
      alert('no hay archivos en el pedido');
      return;
    }
    
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      const datosPedido = prepararDatosPedido();

      //Datos para el pedido (prueba)
      const pedidoCompleto = {
        usuario: 'Usuario de Prueba',
        entrega: 'retiro',
        direccion: '',
        telefono: '2213642438',
        archivos: datosPedido.archivos,
        total: datosPedido.totalConDescuento > 0
          ? datosPedido.totalConDescuento
          : datosPedido.totalSinDescuento,
        globalDoubleSided: globalDoubleSided,
        globalColor: globalColor,
        globalBindings: globalBindings
      };

      //sube a supabase
      const comandaId = await crearComanda(pedidoCompleto);

      alert(`¡Pedido creado exitosamente! ID: ${comandaId}`);
      limpiarPedido();
    } catch (error) {
      console.error('Error al crear pedido', error);
      alert('Hubo un erro al crear tu pedido, por favor intentá de nuevo');
    } finally{
      setIsSubmitting(false);
    }
  };

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
            onConfigChange={(config) => handleConfigChange(index, config)}
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

          {/*Botón de testeo para pedido*/}
          <div className={styles.btnContainer} style={{ marginTop: '2rem'}}>
            <button 
              onClick={handleHacerPedido}
              style={{
                padding: '1rem',
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: isSubmitting ? '#cccccc' : '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '7px',
                cursor:  isSubmitting ? 'not-allowed' : 'pointer',
                width: 'fit-content',
                opacity: isSubmitting ? 0.6 : 1,
              }}
            >
              {isSubmitting ? 'Subiendo archivos...' : 'Finalizar pedido'} 
            </button>
          </div>
        </>
      )}
    </div>
  );
}
