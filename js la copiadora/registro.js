
const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input")

const expresiones = {
    username: /^[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*$/,
	lastname:  /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras, espacios y acentos
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	contraseña: /^.{4,12}$/, // 4 a 12 digitos.
	whatsApp: /^\d{7,14}$/, // 7 a 14 numeros.
    birthdate: /^\d{4}-\d{2}-\d{2}$/,
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "username":
            if(expresiones.username.test())
        break;

        case "lastname":
            if(expresiones.lastname.test())
        break;

        case "email":
            if(expresiones.email.test())
        break;

        case "whatsApp":
            if(expresiones.whatsApp.test())
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