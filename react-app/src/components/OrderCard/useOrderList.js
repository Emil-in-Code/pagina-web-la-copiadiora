import { useState } from 'react';



export default function useOrderList() {

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

    if (total >= 104130) {
      porcentaje = 40;
    } else if (total >= 65130) {
      porcentaje = 35;
    } else if (total >= 39130) {
      porcentaje = 30;
    } else if (total >= 26130) {
      porcentaje = 25;
    } else if (total >= 13130) {
      porcentaje = 20;
    } else if (total >= 5330) {
      porcentaje = 15;
    } else if (total >= 2730) {
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

  const totalWithBinding = globalBindings
    ? totalAmount + bindingPrice
    : totalAmount;

  const { porcentaje, descuento, totalFinal } = calcularDescuento(totalWithBinding) 

  return {
    files,
    subtotals,
    globalDoubleSided,
    globalColor,
    globalBindings,
    pagesPerFile,

    setGlobalColor,
    setGlobalBindings,
    setGlobalDoubleSided,

    handleFileUpload,
    handleSubtotalChange,
    handlePagesChange,
    handleRemoveFile,
    calcularDescuento,

    totalAmount,
    totalPages,
    totalWithBinding,
    porcentaje,
    descuento,
    totalFinal,
    bindingPrice
  };
}
