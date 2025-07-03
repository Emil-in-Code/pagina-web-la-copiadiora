const formLogin = document.getElementById("formLogin");
const emailLogin = document.getElementById("emailLogin");
const passwordLogin = document.getElementById("passwordLogin");
const mensajeLogin = document.getElementById("mensajeLogin");

const expresiones = {
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  password: /^(?=.*[A-Z])(?=.*\d).{4,12}$/
};

let timeout;

const mostrarMensaje = (texto, tipo) => {
  clearTimeout(timeout);
  mensajeLogin.innerText = texto;
  mensajeLogin.className = "mensaje-estado " + tipo;
  mensajeLogin.style.display = "block";

  timeout = setTimeout(() => {
    mensajeLogin.style.display = "none";
  }, 4000);
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

setupSingleValidation(emailLogin, expresiones.email, "Usá el formato email");
setupSingleValidation(passwordLogin, expresiones.password, "Debe tener mayúscula, número y entre 4 y 12 caracteres");


formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailValido = expresiones.email.test(emailLogin.value.trim());
  const passwordValido = expresiones.password.test(passwordLogin.value.trim());

  if (!emailValido) {
    mostrarMensaje("❌ El email no tiene un formato válido", "error");
    emailLogin.classList.add("invalid");
    return;
  }

  if (!passwordValido) {
    mostrarMensaje("❌ La contraseña debe tener mayúscula, número y 4-12 caracteres", "error");
    passwordLogin.classList.add("invalid");
    return;
  }

  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: emailLogin.value.trim(),
      password: passwordLogin.value.trim()
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.mensaje) {
        mostrarMensaje("✅ " + data.mensaje, "exito");
        console.log("✔️ Login OK:", data);
        localStorage.setItem("usuario", JSON.stringify(data.usuario));

        window.location.href = "/pedidos.html"
      } else {
        mostrarMensaje("❌ " + data.error, "error");
        console.warn("⚠️ Error login:", data);
      }
    })
    .catch(err => {
      console.error("❌ Error en fetch login:", err);
      mostrarMensaje("❌ Error en el servidor", "error");
    });
});

