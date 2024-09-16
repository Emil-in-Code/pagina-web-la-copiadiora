//Función para leer el PDF y calcular el costo
function calculateCost(productId) {
  let fileInput = document.getElementById("file" + productId);
  let file = fileInput.files[0];

  if (file && file.type === "application/pdf") {
      let fileReader = new FileReader();
      
      fileReader.onload = function() {
          let typedarray = new Uint8Array(this.result);

          // Usar pdf.js para cargar el PDF
          pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
              let numPages = pdf.numPages;
              let cost = 0;

              if (numPages % 2 === 0) {
                  cost = (numPages / 2) * 100;
              } else {
                  cost = ((numPages + 1) / 2) * 100;
              }

              // Mostrar el resultado o usarlo según tus necesidades
              console.log("Cantidad de páginas en Producto " + productId + ": " + numPages);
              console.log("Costo calculado: $" + cost);

              // Mostrar el costo en la página
              document.getElementById("cost-" + productId).innerText = "Costo: $" + cost;
          });
      };

      fileReader.readAsArrayBuffer(file);
  } else {
      alert("Por favor, carga un archivo PDF válido para el Producto " + productId + ".");
      fileInput.value = ""; // Resetear el input si el archivo no es un PDF
  }
}

// Función que se ejecuta al hacer clic en "Presupuestar gratis"
function presupuestar() {
  // Calcular el costo para cada producto
  calculateCost(1);
  calculateCost(2);
  // Añade más llamadas a calculateCost(productId) si tienes más productos
}

// Asociar la función al botón de presupuestar
document.getElementById("boton__presupuesto").addEventListener("click", presupuestar);

// Manejar la carga de archivos y calcular el costo
function handleFileUpload(productId) {
  var fileInput = document.getElementById("file-" + productId);
  fileInput.addEventListener('change', function() {
      // Opcional: Puedes calcular el costo inmediatamente al cargar un archivo
      // calculateCost(productId);
  });
}

// Inicializar el manejo de archivos para cada producto
document.addEventListener('DOMContentLoaded', function() {
  handleFileUpload(1);
  handleFileUpload(2);
  // Si tienes más productos, repite esta línea para cada uno
});*/






