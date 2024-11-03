// Precios base
let precioPorHoja = 120;
let precioPorAnillado = 2500;
let precioColorSimpleFaz = 200;
let precioColorDobleFaz = 250;

// Valores iniciales
let cantidadPaginas = 0;
let cantidadCopias = 1;
let cantidadAnillados = 0;
let esDobleFaz = false;
let esColor = false;

// Elementos del DOM
const cantidadValorCopias = document.getElementById("cantidad__valor--copias");
const cantidadValorAnillados = document.getElementById("cantidad__valor--anillados");
const checkboxDobleFaz = document.getElementById("doble_faz");
const checkboxColor = document.getElementById("color");

// Elementos para mostrar los precios
const precioCopias = document.querySelector(".price__preview--section .p-precios:nth-of-type(1)");
const precioAnillados = document.querySelector(".price__preview--section .p-precios:nth-of-type(2)");
const precioColorSimple = document.querySelector(".price__preview--section .p-precios:nth-of-type(3)");
const precioColorDoble = document.querySelector(".price__preview--section .p-precios:nth-of-type(4)");
const precioFinal = document.querySelector(".price__preview--section .p-precios:nth-of-type(5)");

// Función para calcular el costo total y actualizar la vista
function calcularCostoTotal() {
  let calculoArchivo = cantidadPaginas * precioPorHoja;

  // Ajuste por Doble faz
  if (esDobleFaz) {
    calculoArchivo /= 2;
  }

  // Ajuste por Color
  let precioColorTotal = esColor ? (esDobleFaz ? precioColorDobleFaz : precioColorSimpleFaz) * cantidadPaginas : 0;
  calculoArchivo += precioColorTotal;

  // Multiplicar por el número de copias
  calculoArchivo *= cantidadCopias;

  // Cálculo del precio por anillado
  let precioAnillados = cantidadAnillados * precioPorAnillado;
  let precioFinal = calculoArchivo + precioAnillados;

  // Actualizar elementos de precio en la interfaz
  precioCopias.innerText = `Precio copias: ${calculoArchivo.toLocaleString('es-ES')} Ars`;
  precioAnillados.innerText = `Precio anillados: ${precioAnillados.toLocaleString('es-ES')} Ars`;
  precioColorSimple.innerText = `Precio color Simple Faz: ${esColor && !esDobleFaz ? precioColorTotal.toLocaleString('es-ES') : '0'} Ars`;
  precioColorDoble.innerText = `Precio color Doble Faz: ${esColor && esDobleFaz ? precioColorTotal.toLocaleString('es-ES') : '0'} Ars`;
  precioFinal.innerText = `Precio final: ${precioFinal.toLocaleString('es-ES')} Ars`;
}

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

// Función para cargar el archivo PDF y contar las páginas
document.getElementById("file-upload").addEventListener("change", async function (event) {
  const file = event.target.files[0];
  if (file && file.type === "application/pdf") {
    const fileReader = new FileReader();

    fileReader.onload = async function () {
      const typedarray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedarray).promise;
      cantidadPaginas = pdf.numPages;

      // Actualizar los cálculos después de obtener la cantidad de páginas
      calcularCostoTotal();
    };

    fileReader.readAsArrayBuffer(file);
  } else {
    alert("Por favor, sube un archivo PDF válido.");
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
