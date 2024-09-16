// laCopiadoraDefinitivo.js

// Función para decrementar la cantidad
function decrement(productId) {
    let quantityInput = document.getElementById('quantity-' + productId);
    let currentValue = parseInt(quantityInput.value, 10);

    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        updateCost(productId); // Actualiza el costo basado en la nueva cantidad
    }
}

// Función para incrementar la cantidad
function increment(productId) {
    let quantityInput = document.getElementById('quantity-' + productId);
    let currentValue = parseInt(quantityInput.value, 10);

    quantityInput.value = 
