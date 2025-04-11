const nombreField = document.getElementById("nombre");
const apellidoField = document.getElementById("apellido");
const mailField = document.getElementById("email");
const passwordField = document.getElementById("password");
console.log(nombreField);

const validateEmptyField = (e) => {
    const field = e.target;
    const fieldValue = e.target.value;
    if (fieldValue.length === 0) {
        field.classList.add("invalid");
        field.nextElementSibling.classList.add("error");
        field.nextElementSibling.innerText = ' ${field.name} is required';
        
    } else{
        field.classList.remove("invalid");
        field.nextElementSibling.classList.remove("error");
        field.nextElementSibling.innerText =""
    }
      
}

nombreField.addEventListener("blur", validateEmptyField);
apellidoField.addEventListener("blur", validateEmptyField);
mailField.addEventListener("blur", validateEmptyField);
passwordField.addEventListener("blur", validateEmptyField);

const expresiones = {
    inputNombre: /^[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*$/,
	lastname:  /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras, espacios y acentos
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	contraseña: /^.{4,12}$/, // 4 a 12 digitos.
	whatsApp: /^\d{7,14}$/, // 7 a 14 numeros.
    birthdate: /^\d{4}-\d{2}-\d{2}$/,
}

