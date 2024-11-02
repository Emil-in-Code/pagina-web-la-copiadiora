let precioPorHoja = 120; // Precio por hoja
let precioPorAnillado = 2500; // Precio por anillado
let cantidadPaginasTotal = 0; // Total de páginas acumuladas
let cantidadCopias = 1; // Cantidad de copias seleccionadas
let cantidadAnillados = 0; // Cantidad de anillados
let esDobleFaz = false; // Doble faz activado
let esColor = false; // Color activado

// Elementos del DOM para mostrar los precios
const cantidadValorCopias = document.getElementById("cantidad__valor--copias");
const cantidadValorAnillados = document.getElementById("cantidad__valor--anillados");
const checkboxDobleFaz = document.getElementById("doble_faz");
const checkboxColor = document.getElementById("color");

// Elementos para mostrar los precios
const precioCopiasElement = document.querySelector(".price__preview--section .p-precios:nth-of-type(1)");
const precioAnilladosElement = document.querySelector(".price__preview--section .p-precios:nth-of-type(2)");
const precioColorSimpleElement = document.querySelector(".price__preview--section .p-precios:nth-of-type(3)");
const precioColorDobleElement = document.querySelector(".price__preview--section .p-precios:nth-of-type(4)");
const precioFinalElement = document.querySelector(".price__preview--section .p-precios:nth-of-type(5)");

// Función para actualizar la cantidad total de páginas
function actualizarCantidadPaginas(paginas) {
  cantidadPaginasTotal += paginas; // Sumar las páginas del nuevo archivo
  calcularCostoTotal(); // Recalcular el costo total después de actualizar
}

// Función para calcular el costo total y actualizar la vista
function calcularCostoTotal() {
  // Cálculo del costo total por hojas
  let costoHojas = (cantidadPaginasTotal % 2 === 0) 
    ? (cantidadPaginasTotal / 2) * precioPorHoja // Si es par
    : ((cantidadPaginasTotal + 1) / 2) * precioPorHoja; // Si es impar, suma 1 antes de dividir
  
  // Ajuste por Doble faz
  if (esDobleFaz) {
    costoHojas /= 2; // Reduce el costo si es doble faz
  }

  // Multiplicar por la cantidad de copias
  costoHojas *= cantidadCopias;

  // Cálculo del precio por anillado
  let precioAnillados = cantidadAnillados * precioPorAnillado;

  // Cálculo del precio total final
  let precioFinal = costoHojas + precioAnillados;

  // Actualizar elementos de precio en la interfaz
  precioCopiasElement.innerText = `Precio copias: ${costoHojas.toLocaleString('es-ES')} Ars`;
  precioAnilladosElement.innerText = `Precio anillados: ${precioAnillados.toLocaleString('es-ES')} Ars`;
  precioColorSimpleElement.innerText = `Precio  color Simple Faz: ${esColor && !esDobleFaz ? (cantidadPaginasTotal * precioPorHoja).toLocaleString('es-ES') : '0'} Ars`;
  precioColorDobleElement.innerText = `Precio color Doble Faz: ${esColor && esDobleFaz ? (cantidadPaginasTotal * precioPorHoja).toLocaleString('es-ES') : '0'} Ars`;
  precioFinalElement.innerText = `Precio final: ${precioFinal.toLocaleString('es-ES')} Ars`;
}

// Función para cargar los archivos PDF y contar las páginas
document.getElementById("file-upload").addEventListener("change", async function (event) {
  const files = event.target.files; // Obtener todos los archivos subidos
  cantidadPaginasTotal = 0; // Reiniciar el total de páginas al cargar nuevos archivos

  for (const file of files) {
    if (file && file.type === "application/pdf") {
      const fileReader = new FileReader();

      fileReader.onload = async function () {
        const typedarray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        
        // Sumar las páginas de cada archivo
        let paginasArchivo = pdf.numPages;
        
        // Actualizar la cantidad total de páginas usando la nueva función
        actualizarCantidadPaginas(paginasArchivo);
      };

      fileReader.readAsArrayBuffer(file);
    } else {
      alert("Por favor, sube archivos PDF válidos.");
    }
  }
});

// Listeners para opciones de doble faz y color
checkboxDobleFaz.addEventListener("change", () => {
  esDobleFaz = checkboxDobleFaz.checked;
  calcularCostoTotal();
});

checkboxColor.addEventListener("change", () => {
  esColor = checkboxColor.checked;
  calcularCostoTotal();
});

// Listeners para botones de cantidad de copias
document.getElementById("incremento").addEventListener("click", () => {
  cantidadCopias++;
  cantidadValorCopias.innerText = cantidadCopias;
  calcularCostoTotal();
});

document.getElementById("decremento").addEventListener("click", () => {
  if (cantidadCopias > 1) {
    cantidadCopias--;
    cantidadValorCopias.innerText = cantidadCopias;
    calcularCostoTotal();
  }
});

// Listeners para cantidad de anillados
document.getElementById("incremento--anillados").addEventListener("click", () => {
  cantidadAnillados++;
  cantidadValorAnillados.innerText = cantidadAnillados;
  calcularCostoTotal();
});

document.getElementById("decremento--anillados").addEventListener("click", () => {
  if (cantidadAnillados > 0) {
    cantidadAnillados--;
    cantidadValorAnillados.innerText = cantidadAnillados;
    calcularCostoTotal();
  }
});
