let precioPorHoja = 120;
let precioAnillado
let cantidadHojas = 1;

let sectionPricePreview = document.getElementById ("price__preview--section");

let parrafoSubTotal = document.getElementById("subtotal")



function seleccionDeCantidad (){
    let botonIncremento= document.getElementById ("incremento-decremento") 
    botonIncremento.addEventListener ("click", incrementoDecremento);

}

function precio(){

    let calculoArchivo;

    
    if (cantidadHojas % 2 === 0) {
    // Si la cantidad de hojas es par
    calculoArchivo = cantidadHojas / 2 * precioPorHoja;
    parrafoSubTotal.innerHTML = "subtotal"
    } else {
    // Si la cantidad de hojas es impar
    calculoArchivo = (cantidadHojas + 1) / 2 * precioPorHoja;
    }

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