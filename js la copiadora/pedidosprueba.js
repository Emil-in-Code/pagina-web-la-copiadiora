let precioPorHoja = 130;
let precioAnillado = 3000;
let numPagesPDF = 0;
let pdfDocs = []; // Ahora manejamos varios PDFs
let subtotal = 0; // Declarar subtotal aquí
let descuento = 0;
let total = 0;
let porcentajeDescuento = 0;

document.getElementById("cantidad").addEventListener("input", calcularPrecio);
document.getElementById("cantidad-anillados").addEventListener("input", calcularPrecio);
document.getElementById("archivo").addEventListener("change", leerPDF);
document.getElementById("doble_faz").addEventListener("change", calcularPrecio);
document.getElementById("subtotal").innerHTML = "Subtotal:";
document.getElementById("descuento").innerHTML = "Descuento:";
document.getElementById("precio-final").innerHTML = "Precio final:";

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

function mostrarPortada(pdf, _index) {
    const previewContainer = document.getElementById("pdfPreviews");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    pdf.getPage(1).then(page => {
        let viewport = page.getViewport({ scale: 0.5 }); 
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        let renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        page.render(renderContext).promise.then(() => {
            let previewDiv = document.createElement("div");
            previewDiv.classList.add("pdf-preview");
            previewDiv.appendChild(canvas);
            previewContainer.appendChild(previewDiv);
        });
    }).catch(error => {
        console.error("Error al renderizar la portada del PDF:", error);
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
            if (paginas % 2 !== 0) paginas += 1; // Si es impar, sumo 1
            calculoArchivo = (paginas / 2) * precioPorHoja;
        } else {
            calculoArchivo = paginas * precioPorHoja;
        }

        /*if (esDobleFaz) {
            calculoArchivo = Math.ceil(paginas / 2) * precioPorHoja; // Se usa Math.ceil() en lugar de sumar 1 manualmente
        } else {
            calculoArchivo = paginas * precioPorHoja;
        }*/

        let costoJuegos = (juegos - 1) * calculoArchivo;
        totalCalculo += calculoArchivo + costoJuegos;
    });

    let costoAnillados = anillados * precioAnillado; 
    totalCalculo += costoAnillados;


    subtotal = totalCalculo; // Actualizar el subtotal
    document.getElementById("numero-de-paginas").innerHTML = `Total de páginas: ${pdfDocs.reduce((acc, pdf) => acc + pdf.numPages, 0)}`;
    document.getElementById("subtotal").innerHTML = `Subtotal: ${subtotal.toLocaleString('es-ES')} Ars.`;

    calcularDescuento(); // Llamar a calcularDescuento después de actualizar el subtotal
}

function calcularDescuento() {
    if (subtotal >= 104130) {
        porcentajeDescuento = 40 + " off"; // 40% de descuento
        descuento = subtotal * 0.4;
    } else if (subtotal >= 65130) {
        porcentajeDescuento = 35 + " off"; // 35% de descuento
        descuento = subtotal * 0.35;
    } else if (subtotal >= 39130) {
        porcentajeDescuento = 30 + " off"; // 30% de descuento
        descuento = subtotal * 0.3;
    } else if (subtotal >= 26130) {
        porcentajeDescuento = 25 + " off"; // 25% de descuento
        descuento = subtotal * 0.25;
    } else if (subtotal >= 13130) {
        porcentajeDescuento = 20 + " off"; // 20% de descuento
        descuento = subtotal * 0.2;
    } else if (subtotal >= 5330) {
        porcentajeDescuento = 15 + " off"; // 15% de descuento
        descuento = subtotal * 0.15;
    } else if (subtotal >= 2730) {
        porcentajeDescuento = 10 + " off"; // 10% de descuento
        descuento = subtotal * 0.1;
    } else {
        porcentajeDescuento = 0; 
        total = total;

    }

    total = subtotal - descuento;

    document.getElementById("descuento").innerHTML = `Descuento: ${descuento.toLocaleString('es-ES')} Ars. (${porcentajeDescuento} %)`;
    document.getElementById("precio-final").innerHTML = `Total: ${total.toLocaleString('es-ES')} Ars.`;
}

// Llamar a la función para que se actualicen los valores al cargar la página
calcularDescuento();
console.log(`Descuento aplicado: ${descuento} Ars. (${porcentajeDescuento}%)`);
console.log(`Total a pagar: ${total}`);
