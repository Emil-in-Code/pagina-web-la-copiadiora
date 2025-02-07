let precioPorHoja = 120;
let precioAnillado = 2500;
let numPagesPDF= 0;



let botonCalcular = document.getElementById("calcular").addEventListener("input", calcular);


function leerPDF(){
    const input = document.getElementById("archivo");
    const cantidadJuegos = parseInt(document.getElementById("cantidad").value) || 1;
    const archivo = input.files[0];

    if (archivo) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(archivo);

        reader.onload = function(event) {
            const arrayBuffer = event.target.result;
            procesarPDF(arrayBuffer, cantidadJuegos);
        };
        reader.onerror = function(){
            console.error("error al leer el archivo")
        };
    } else {
        alert("selecciona un pdf");
    }
}

function procesarPDF(arrayBuffer) {
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    loadingTask.promise.then(pdf => {
        console.log("Número de páginas:", pdf.numPages);
        numPagesPDF = pdf.numPages;  // Guardamos el número de páginas en la variable global
        alert(`El PDF tiene ${numPagesPDF} páginas.`);  // Solo mostramos el número de páginas
    }).catch(error => {
        console.error("Error al procesar el PDF:", error);
        alert("Hubo un error al procesar el archivo PDF.");
    });
}

// Llamamos a la función leerPDF cuando el archivo cambia
document.getElementById("archivo").addEventListener("change", leerPDF);

function precio(){
    document.getElementById ("subtotal").innerHTML=calculoArchivo;

    // Determinar si la cantidad de hojas es par o impar
    let tipoCantidadPaginas = (numPagesPDF % 2 === 0) ? 'par' : 'impar';

    let calculoArchivo;

    switch (tipoCantidadPaginas) {
      case 'par':
        // Si la cantidad de hojas es par
        calculoArchivo = (tipoCantidadPaginas / 2) * precioPorHoja //* cantidad();
        break;
      case 'impar':
        // Si la cantidad de hojas es impar
        calculoArchivo = ((tipoCantidadPaginas + 1) / 2) * precioPorHoja //* cantidad();
        break;
      default:
        // En caso de un valor inesperado, aunque no es necesario aquí
        console.log('Error: Tipo de cantidad de hojas desconocido');
        break;
    }

    console.log(`El costo total es: ${calculoArchivo.toLocaleString('es-ES')} Ars.`);

}

function cantidad (){
    let botonCantidad = document.getElementById ("cantidad");
}


/*const precioCopiaBLancoNegro = 120;
const precioAnillado = 2500;
let cantidadCopias = 0;

function seleccionDeCantidad (){
    let botonIncremento= document.getElementById ("incrementar-copias") 
    botonIncremento.addEventListener ("click", incrementarCopias);

    let botonDecremento = document.getElementById ("decrementar-copias")
    botonDecremento.addEventListener ("click", decrementarCopias);

}

function incrementarCopias() {
    cantidadCopias++; 
    let spanCantidadvalorCopias = document.getElementById("cantidad__valor--copias"); 
    spanCantidadvalorCopias.innerHTML = cantidadCopias;

}

function decrementarCopias() {
    
}*/