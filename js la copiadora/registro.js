const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputMail = document.getElementById("email");
const inputPassword = document.getElementById("password");
console.log(inputNombre,inputApellido,inputMail,inputPassword);

inputNombre.addEventListener("blur", function(e){
    const nombreValue = e.target.value;
    if (nombreValue.length === 0) {
        console.log("pone el nombre")
    }
      
})


const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*$/,
	lastname:  /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras, espacios y acentos
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	contraseña: /^.{4,12}$/, // 4 a 12 digitos.
	whatsApp: /^\d{7,14}$/, // 7 a 14 numeros.
    birthdate: /^\d{4}-\d{2}-\d{2}$/,
}

