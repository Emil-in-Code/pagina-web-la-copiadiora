let precioPorHoja = 120;
let precioAnillado = 2500;
let numPagesPDF = 0;
let pdfDoc = null; 
let cantidad = 0;


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

function preferencias(){
    let inputCantidad = document.getElementById("cantidad").value;
    let numero = parseFloat(inputCantidad);
    let catidadJuegos = numero * 2;
    
   
}

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
    /*if (paginas === 1) {
        calculoArchivo = precioPorHoja;  
    } else if (paginas % 2 === 0) {
        calculoArchivo = (paginas / 2) * precioPorHoja; 
    } else {
        calculoArchivo = ((paginas + 1) / 2) *   precioPorHoja;
        
    }

    if (esDobleFaz && paginas > 1) {
        calculoArchivo *= 2;  
    } else if*/

    document.getElementById("numero-de-paginas").innerHTML = `Tu pdf tiene ${numPagesPDF} páginas`


    document.getElementById("subtotal").innerHTML = `subtotal: ${calculoArchivo.toLocaleString('es-ES')} Ars.`;


    console.log(`el subtotal es: ${calculoArchivo.toLocaleString('es-ES')} Ars.`);
}

// Evento para leer PDF cuando se selecciona un archivo
document.getElementById("archivo").addEventListener("change", leerPDF);

document.getElementById("doble_faz").addEventListener("change", calcularPrecio);

/* if (paginas % 2 === 0) {
        calculoArchivo = (paginas / 2) * precioPorHoja;
    } else {
        calculoArchivo = ((paginas + 1) / 2) * precioPorHoja;
    } */