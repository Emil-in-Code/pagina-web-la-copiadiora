let precioPorHoja = 120;
let precioAnillado = 2500;
let numPagesPDF = 0;
let pdfDoc = null; 


function leerPDF() {
    const input = document.getElementById("archivo");
    const archivo = input.files[0];

    if (!archivo) {
        alert("Selecciona un PDF primero.");
        return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(archivo);

    reader.onload = function(event) {
        const arrayBuffer = event.target.result;
        procesarPDF(arrayBuffer, calcularPrecio);
    };

    reader.onerror = function() {
        console.error("Error al leer el archivo");
    };
}

function procesarPDF(arrayBuffer, callback) {
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    loadingTask.promise.then(pdf => {
        numPagesPDF = pdf.numPages;
        //alert(`El PDF tiene ${numPagesPDF} páginas.`);
        if (callback) callback(); // Llama al cálculo del precio después de obtener el número de páginas
    }).catch(error => {
        console.error("Error al procesar el PDF:", error);
        alert("Hubo un error al procesar el archivo PDF.");
    });
}

function preferencias() {
    let inputCantidad = document.getElementById("cantidad").value;
    let numero = parseFloat(inputCantidad);
  
    if (isNaN(numero) || numero <= 0) {
        alert("Por favor selecciona al menos 1 juego para imprimir");
        return { juegos: 0, anillados: 0 }; // Si no es válido, retornamos 0 para ambos
    }
    
    let cantidadJuegos = numero; 

    // Obtener la cantidad de anillados, puede estar vacío o 0
    let inputCantidadAnillos = document.getElementById("cantidad-anillados").value;
    let numeroDeAnillados = parseFloat(inputCantidadAnillos);

    // Si no se ingresa un número válido, asumimos que es 0
    if (isNaN(numeroDeAnillados)) {
        numeroDeAnillados = 0;
    }

    // Retornamos los valores de juegos y anillados (aunque anillados puede ser 0)
    return { juegos: cantidadJuegos, anillados: numeroDeAnillados };
}

/*function preferencias(){
    let inputCantidad = document.getElementById("cantidad").value;
    let numero = parseFloat(inputCantidad);
  
    if (isNaN(numero) || numero <= 0) {
        alert("por favor selecciona al menos 1 juego para imprimir");
        return 0;
    }
    
    let cantidadJuegos = numero; 
    return cantidadJuegos * 1; 

    let inputCantidadAnillos = document.getElementById("cantidad-anillados").value;
    let numeroDeAnillados = parseFloat(inputCantidadAnillos);

    if(isNaN(numeroDeAnillados)){
        numeroDeAnillados = 0;
    }

    return { juegos: cantidadJuegos, anillados: numeroDeAnillados };

}*/

function calcularPrecio() {
    if (numPagesPDF === 0) {
        alert("Primero selecciona un PDF válido.");
        return;
    }

    let paginas = numPagesPDF;
    let calculoArchivo;

    let esDobleFaz = document.getElementById("doble_faz").checked;

    if (esDobleFaz) {
        if (paginas === 1) {
            calculoArchivo = precioPorHoja;
        } else if (paginas % 2 === 0) {
            calculoArchivo = (paginas / 2) * precioPorHoja;
        } else {
            calculoArchivo = ((paginas + 1) / 2) * precioPorHoja;
        }
    } else {
        calculoArchivo = paginas * precioPorHoja; // Cada página se cuenta de forma independiente
    }

    let cantidadJuegos = preferencias();

    let { juegos, anillados } = preferencias();

    let costoAnillados = anillados > 0 ? anillados * precioAnillado : 0;

    let subtotalConPreferencias = calculoArchivo + (juegos * precioPorHoja) + costoAnillados;

    document.getElementById("numero-de-paginas").innerHTML = `Tu pdf tiene ${numPagesPDF} páginas`


    document.getElementById("subtotal").innerHTML = `subtotal: ${subtotalConPreferencias.toLocaleString('es-ES')} Ars.`;


    console.log(`el subtotal es: ${calculoArchivo.toLocaleString('es-ES')} Ars.`);
}

document.getElementById("cantidad").addEventListener("input", calcularPrecio);

// Evento para leer PDF cuando se selecciona un archivo
document.getElementById("archivo").addEventListener("change", leerPDF);

document.getElementById("doble_faz").addEventListener("change", calcularPrecio);

/* if (paginas % 2 === 0) {
        calculoArchivo = (paginas / 2) * precioPorHoja;
    } else {
        calculoArchivo = ((paginas + 1) / 2) * precioPorHoja;
    } */