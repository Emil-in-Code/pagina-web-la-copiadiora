import Navbar from "../widgets/navbar.jsx"
import Footer from "../widgets/Footer/Footer.jsx"
import "../styles/register.css"
import "../styles/global.css"
import { useState } from 'react'

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  // Expresiones regulares
  const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*$/, // solo letras y espacios
    lastname: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // letras y espacios
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/, // dominio >= 2 chars
    password: /^(?=.*[A-Z])(?=.*\d).{4,12}$/, // 4-12 chars, al menos 1 mayús y 1 número
  };

  // Validación en vivo mientras el usuario escribe
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    let errorMsg = "";

    if (!value.trim()) {
      errorMsg = `El campo ${name} es obligatorio`;
    } else {
      if (name === "nombre" && !expresiones.nombre.test(value)) {
        errorMsg = "El nombre solo admite letras";
      }
      if (name === "apellido" && !expresiones.lastname.test(value)) {
        errorMsg = "El apellido solo admite letras";
      }
      if (name === "email" && !expresiones.email.test(value)) {
        errorMsg = "Usá un formato válido de email";
      }
      if (name === "password" && !expresiones.password.test(value)) {
        errorMsg = "La contraseña debe tener 4-12 caracteres, una MAYUS y un número";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  // Validación final al enviar
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (!expresiones.nombre.test(formData.nombre)) {
      newErrors.nombre = "El nombre solo admite letras";
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es obligatorio";
    } else if (!expresiones.lastname.test(formData.apellido)) {
      newErrors.apellido = "El apellido solo admite letras";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!expresiones.email.test(formData.email)) {
      newErrors.email = "Usá un formato válido de email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraeña es obligatoria";
    } else if (!expresiones.password.test(formData.password)) {
      newErrors.password ="Debe tener 4-12 caracteres, una MAYUS y un número";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setMensaje({ texto: "❌ Revisá los campos en rojo", tipo: "error" });
      return;
    }

    // Si no hay errores → enviar datos
    console.log("✅ Datos válidos, enviar a backend:", formData);

    setMensaje({ texto: "✅ Registro exitoso", tipo: "exito" });

    // Ejemplo de conexión a Supabase (comentar/descomentar cuando lo uses):
    /*
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { nombre: formData.nombre, apellido: formData.apellido }
      }
    });

    if (error) {
      setMensaje({ texto: "❌ " + error.message, tipo: "error" });
    } else {
      setMensaje({ texto: "✅ Usuario creado correctamente", tipo: "exito" });
    }
    */

    // Limpiar formulario
    setFormData({ nombre: "", apellido: "", email: "", password: "" });
    setErrors({});
  };

  return (
    <>
      <Navbar />

      <main>
        <div className="container">
          <form className="formulario" onSubmit={handleSubmit}>
            <h2 className="h2-registro">Formulario de registro</h2>

            <label htmlFor="nombre" className="formulario__label">
              <em>Nombre:</em>
              <input
                
                id="nombre"
                className={`form-input ${
                  errors.nombre
                    ? "invalid"
                    : formData.nombre
                    ? "valid"
                    : ""
                }`}
                type="text"
                name="nombre"
                placeholder="Cosme"
                value={formData.nombre}
                onChange={handleChange}
              />
              <span className="error">{errors.nombre}</span>
            </label>

            <label htmlFor="apellido" className="formulario__label">
              <em>Apellido:</em>
              <input
                id="apellido"
                className={`form-input ${
                  errors.apellido
                    ? "invalid"
                    : formData.apellido
                    ? "valid"
                    : ""
                }`}
                type="text"
                name="apellido"
                placeholder="Fulanito"
                value={formData.apellido}
                onChange={handleChange}
              />
              <span className="error">{errors.apellido}</span>
            </label>

            <label htmlFor="email" className="formulario__label">
              <em>Mail:</em>
              <input
                id="email"
                className={`form-input ${
                  errors.email
                    ? "invalid"
                    : formData.email
                    ? "valid"
                    : ""
                }`}
                type="email"
                name="email"
                placeholder="lacopiadora44@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="error">{errors.email}</span>
            </label>

            <label htmlFor="password" className="formulario__label">
              <em>Contraseña:</em>
              <input
                id="password"
                className={`form-input ${
                  errors.password
                    ? "invalid"
                    : formData.password
                    ? "valid"
                    : ""
                }`}
                type="password"
                name="password"
                placeholder="Micontraseña1"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="error">{errors.password}</span>
            </label>

            <div className="form__group" id="grupo__submit">
              <input
                className="btn-submit"
                type="submit"
                value="Registrarse"
              />
            </div>

            {mensaje.texto && (
              <div className={`mensaje-estado ${mensaje.tipo}`}>
                {mensaje.texto}
              </div>
            )}
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

