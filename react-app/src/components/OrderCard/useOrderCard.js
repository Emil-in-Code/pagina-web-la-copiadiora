import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
//import PDFWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
// pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
//pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
//
//console.log("PDF Worker URL generado en PedidoCard:", PDFWorker);

const pricePerPage = 140;
const bindingPrice = 3000;
const priceColor = 300;
const priceColorD = 350;

export default function useOrderCard({ 
  file, 
  onRemove,
  onSubtotalChange,
  onPageChange,
  onConfigChange,//nuevo,sacar si no sirve
  globalDoubleSided,
  globalBindings,
  globalColor
  }) {

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
    setDoubleSided(globalDoubleSided);
  }, [globalDoubleSided]);

  useEffect(() => {
    setColor(globalColor);
  }, [globalColor]);

  useEffect(() => {
    if (globalBindings) {
      setBindings(1);
    } else {
      setBindings(0);
    }
  }, [globalBindings]);

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
    const maxPages = doubleSided ? 800 : 400;
    const totalSheets = numPages * copies;

    if (bindings > 0 && totalSheets > maxPages && !globalBindings) {
      setBindings(0);
    }
  }, [doubleSided, numPages, copies, globalBindings]);



  // Notificar cambios de subtotal al componente padre
  useEffect(() => {
    if (onSubtotalChange) {
      onSubtotalChange(subtotal);
    }
  }, [subtotal, onSubtotalChange]);

  //nuevo si no funciona se sacar
  useEffect(() => {
    if (onConfigChange){
      onConfigChange({
        copies,
        bindings,
        doubleSided,
        color,
        numPages,
        subtotal
      });
    }
  },[copies, bindings, doubleSided, color, numPages, subtotal, onConfigChange]);

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
      alert("demasiadas hojas para 1 solo anillado,prueba en doble faz")
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
  
  return {
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
    handleRemove,
    handleLoadSuccess,
    formatFileSize
  };

}
