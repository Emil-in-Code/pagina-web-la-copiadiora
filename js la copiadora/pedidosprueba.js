let precioPorHoja = 120;
let precioAnillado = 2500;
let cantidadPaginas =325;

let sectionPricePreview = document.getElementById ("price__preview--section");

let parrafoSubTotal = document.getElementById("subtotal")

let botonIncremento= document.getElementById ("incremento-decremento") 

function seleccionDeCantidad (){
    
    botonIncremento.addEventListener ("click", incrementoDecremento);

    if(incrementoDecremento ===1 ){
        precio()
    }else {
        console.log("elegi un pdf")
    }
}

function mostrarsubtotal (subtotal){
    let pricePreviewSection
}


function precio(){
   

    // Determinar si la cantidad de hojas es par o impar
    let tipoCantidadPaginas = (cantidadPaginas % 2 === 0) ? 'par' : 'impar';

    let calculoArchivo;

    switch (tipoCantidadPaginas) {
      case 'par':
        // Si la cantidad de hojas es par
        calculoArchivo = (cantidadPaginas / 2) * precioPorHoja * seleccionDeCantidad();
        break;
      case 'impar':
        // Si la cantidad de hojas es impar
        calculoArchivo = ((cantidadPaginas + 1) / 2) * precioPorHoja * seleccionDeCantidad();
        break;
      default:
        // En caso de un valor inesperado, aunque no es necesario aquí
        console.log('Error: Tipo de cantidad de hojas desconocido');
        break;
    }

    console.log(`El costo total es: ${calculoArchivo.toLocaleString('es-ES')} Ars.`);

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
    
}