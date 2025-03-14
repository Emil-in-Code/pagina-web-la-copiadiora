
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input")

const expresiones = {
	username:  /^[a-zA-Z0-9À-ÿ]{1,40}$/, // Letras, números, sin espacios
	lastname:  /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras, espacios y acentos
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	contraseña: /^.{4,12}$/, // 4 a 12 digitos.
	whatsApp: /^\d{7,14}$/, // 7 a 14 numeros.
    birthdate: /^\d{4}-\d{2}-\d{2}$/,
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "username":
            
        break;

        case "lastname":
            
        break;

        case "email":
            
        break;

        case "whatsApp":
            
        break;

        case "birthdate":
            
        break;

    }
}

inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

})