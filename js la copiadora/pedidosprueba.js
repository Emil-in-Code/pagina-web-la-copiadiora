let precioPorHoja = 130;
let precioAnillado = 3000;
let numPagesPDF = 0;
let pdfDocs = []; // Ahora manejamos varios PDFs
let descuento = 0;

document.getElementById("cantidad").addEventListener("input", calcularPrecio);
document.getElementById("cantidad-anillados").addEventListener("input", calcularPrecio);
document.getElementById("archivo").addEventListener("change", leerPDF);
document.getElementById("doble_faz").addEventListener("change", calcularPrecio);
document.getElementById("descuento");

function leerPDF() {
    const input = document.getElementById("archivo");
    const archivos = input.files;

    if (archivos.length === 0) {
        alert("Selecciona al menos un PDF.");
        return;
    }

    pdfDocs = []; // Limpiar cualquier PDF previo
    for (let archivo of archivos) {
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
}

function procesarPDF(arrayBuffer, callback) {
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    loadingTask.promise.then(pdf => {
        numPagesPDF = pdf.numPages;
        pdfDocs.push(pdf); // Guardamos el PDF procesado
        document.getElementById("numero-de-paginas").innerHTML = `Tu PDF tiene ${numPagesPDF} páginas`;

        // Mostrar la portada
        mostrarPortada(pdf, pdfDocs.length); // Pasamos el índice para manejar múltiples previsualizaciones
        if (callback) callback();
    }).catch(error => {
        console.error("Error al procesar el PDF:", error);
        alert("Hubo un error al procesar el archivo PDF.");
    });
}

function mostrarPortada(pdf, index) {
    const previewContainer = document.getElementById("pdfPreviews");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Determinar el tamaño de la previsualización basado en la cantidad de PDFs
    let totalDocs = pdfDocs.length;
    let desiredWidth = Math.max(110, 110 - totalDocs * 10);  // Reducir el tamaño según el número de PDFs
    let desiredHeight = 180;

    pdf.getPage(1).then(page => {
        let viewport = page.getViewport({ scale: 1 });
        let scale = Math.min(desiredWidth / viewport.width, desiredHeight / viewport.height);
        viewport = page.getViewport({ scale });
        canvas.width = desiredWidth;
        canvas.height = desiredHeight;
        context.clearRect(0, 0, canvas.width, canvas.height);
        let renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);

        // Crear un contenedor para cada previsualización
        let previewDiv = document.createElement("div");
        previewDiv.classList.add("pdf-preview");
        previewDiv.appendChild(canvas);
        
        // Agregar el contenedor al área de previsualizaciones
        previewContainer.appendChild(previewDiv);
    });
}

function preferencias() {
    let inputCantidad = document.getElementById("cantidad").value;
    let numero = parseFloat(inputCantidad);

    if (isNaN(numero) || numero <= 0) {
        alert("Por favor selecciona al menos 1 juego para imprimir");
        return { juegos: 1, anillados: 0 };
    }

    let cantidadJuegos = numero;
    let inputCantidadAnillos = document.getElementById("cantidad-anillados").value;
    let numeroDeAnillados = parseFloat(inputCantidadAnillos);

    if (isNaN(numeroDeAnillados) || numeroDeAnillados < 0) {
        numeroDeAnillados = 0;
    }

    return { juegos: cantidadJuegos, anillados: numeroDeAnillados };
}



function calcularPrecio() {
    if (pdfDocs.length === 0) {
        alert("Primero selecciona al menos un PDF.");
        return;
    }

    let totalCalculo = 0;
    let juegos, anillados;
    ({ juegos, anillados } = preferencias());

    pdfDocs.forEach(pdf => {
        let paginas = pdf.numPages;
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
            calculoArchivo = paginas * precioPorHoja;
        }

        let costoJuegos = (juegos - 1) * calculoArchivo;
        let costoAnillados = anillados * precioAnillado;
        totalCalculo += calculoArchivo + costoJuegos + costoAnillados;
    });

    document.getElementById("numero-de-paginas").innerHTML = `Total de páginas: ${pdfDocs.reduce((acc, pdf) => acc + pdf.numPages, 0)}`;
    document.getElementById("subtotal").innerHTML = `Subtotal: ${totalCalculo.toLocaleString('es-ES')} Ars.`;
}


function calcularDescuento() {
    let paginas = pdf.numPages;
    let total = paginas * precioPorPagina;
    let descuento = 0;

    if (paginas <20) {
        alert("A partir de las 21 hojas tenés descuentos")
    }else if(paginas >= 21 && paginas <= 40) {
        descuento = total * 0.1; // descuento del 10%

    document.getElementById("descuento").innerHTML = `Descuento: ${descuento.toLocaleString('es-ES')} Ars.`;
    }
}