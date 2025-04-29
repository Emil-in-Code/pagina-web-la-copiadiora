const form = document.getElementById("formulario");
const mailField = document.getElementById("email");
const passwordField = document.getElementById("password");


const expresiones = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    contraseña: /^(?=.*[A-Z])(?=.*\d).{4,12}$/, // entre 4 y 12 caracteres, al menos 1 mayúscula y 1 número
};

const setupSingleValidation = (input, regex, mensajeError) => {
    input.addEventListener("blur", () => {
        const value = input.value.trim();
        if (!regex.test(value)) {
            input.classList.add("invalid");
            input.nextElementSibling.classList.add("error");
            input.nextElementSibling.innerText = mensajeError;
        } else {
            input.classList.remove("invalid");
            input.nextElementSibling.classList.remove("error");
            input.nextElementSibling.innerText = "";
        }
    });
};

setupSingleValidation(mailField, expresiones.email, "Usá el formato email");
setupSingleValidation(passwordField, expresiones.contraseña, "La contraseña debe tener una MAYUS y un Número");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const validEmail = expresiones.email.test(mailField.value.trim());
    const validPassword = expresiones.contraseña.test(passwordField.value.trim());

    if (!validEmail) {
        mailField.classList.add("invalid");
        mailField.nextElementSibling.classList.add("error");
        mailField.nextElementSibling.innerText = "Usá el formato email";
    }

    if (!validPassword) {
        passwordField.classList.add("invalid");
        passwordField.nextElementSibling.classList.add("error");
        passwordField.nextElementSibling.innerText = "La contraseña debe tener una MAYUS y un Número";
    }

    if (validEmail && validPassword) {
        alert("Formulario enviado con éxito ✅");
        form.submit(); // o fetch/AJAX si estás haciendo algo más dinámico
    } else {
        alert("Revisá los campos marcados en rojo ❌");
    }
});