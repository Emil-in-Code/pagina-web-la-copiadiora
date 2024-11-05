// Variables globales
let precioCopiaBlancoNegro = 120; // Precio por copia en blanco y negro
let precioAnillado = 2500; // Precio por anillado
let totalCost = 0; // Costo total
let pageCount = 0; // Cantidad total de páginas

// Función para contar las páginas de un PDF
async function contarPaginas(pdfFile) {
    const pdf = await pdfjsLib.getDocument(pdfFile).promise;
    return pdf.numPages;
}

// Manejar la carga de archivos PDF
document.getElementById('file-upload').addEventListener('change', async function(event) {
    const files = event.target.files;
    const pageCounts = [];

    for (const file of files) {
        const count = await contarPaginas(file);
        pageCounts.push(count);
    }

    // Calcular el costo total
    calcularCosto(pageCounts);
});

// Función para calcular el costo total
function calcularCosto(pageCounts) {
    const cantidadCopias = parseInt(document.getElementById('cantidad__valor--copias').innerText, 10);
    const cantidadAnillados = parseInt(document.getElementById('cantidad__valor--anillados').innerText, 10);
    const dobleFaz = document.getElementById('doble_faz').checked;

    pageCounts.forEach(pages => {
        let copiesCost = pages * cantidadCopias * precioCopiaBlancoNegro;

        // Ajustar el conteo de páginas si se elige doble faz
        if (dobleFaz) {
            pages = Math.ceil(pages / 2); // Redondea hacia arriba para impar
        }

        totalCost += copiesCost;
    });

    // Agregar costo de anillados
    totalCost += cantidadAnillados * precioAnillado;

    // Actualizar el precio final en el HTML
    document.getElementById('precioFinal').innerText = `Precio final: $${totalCost}`;
}

// Incrementar y decrementar cantidades de copias
document.getElementById('incrementarCopias').addEventListener('click', function() {
    let cantidad = parseInt(document.getElementById('cantidad__valor--copias').innerText, 10);
    document.getElementById('cantidad__valor--copias').innerText = cantidad + 1;
    calcularCosto([pageCount]); // Recalcular el costo
});

document.getElementById('decrementarCopias').addEventListener('click', function() {
    let cantidad = parseInt(document.getElementById('cantidad__valor--copias').innerText, 10);
    if (cantidad > 1) {
        document.getElementById('cantidad__valor--copias').innerText = cantidad - 1;
        calcularCosto([pageCount]); // Recalcular el costo
    }
});

// Incrementar y decrementar cantidades de anillados
document.getElementById('incrementarAnillados').addEventListener('click', function() {
    let cantidad = parseInt(document.getElementById('cantidad__valor--anillados').innerText, 10);
    document.getElementById('cantidad__valor--anillados').innerText = cantidad + 1;
    calcularCosto([pageCount]); // Recalcular el costo
});

document.getElementById('decrementarAnillados').addEventListener('click', function() {
    let cantidad = parseInt(document.getElementById('cantidad__valor--anillados').innerText, 10);
    if (cantidad > 0) {
        document.getElementById('cantidad__valor--anillados').innerText = cantidad - 1;
        calcularCosto([pageCount]); // Recalcular el costo
    }
});
