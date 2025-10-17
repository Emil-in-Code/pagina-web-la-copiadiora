import Navbar from "../widgets/Navbar/Navbar.jsx"
import Footer from "../widgets/Footer/Footer.jsx"
import "../styles/login.css"
import { useState } from 'react'
import { supabase } from "../lib/supabaseClient.js"

export default function Login() {
  const [ formData, setFormData] = useState({
    email:"",
    password:"",
  });

  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState({ texto: "", tipo: ""});


  const expresiones = {
    password: /^(?=.*[A-Z])(?=.*\d).{4,12}$/, // 4-12 chars, al menos 1 mayús y 1 número
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/, // dominio >= 2 chars
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ( {
      ...prevData,
      [name]: value,
    }));

    let errorMsg = "";

    if (!value.trim()) {
      errorMsg=`El campo ${name} es obligatorio`;
    } else {
      if (name === "email" && !expresiones.email.test(value)) {
        errorMsg = "Usá un mail válido";
      }
      if (name === "password" && !expresiones.password.test(value)) {
        errorMsg = "Usá entre 4 y 12 caracteres, una Mayus y un número"
      }
    }
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  //validación final al enviar
  const handleSubmit = async (event) => {
    event.preventDefault();
      
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "El mail es obligatorio";
    } else if(!expresiones.email.test(formData.email)) {
      newErrors.email = "Usá un formato válido de email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    } else if(!expresiones.password.test(formData.password)) {
      newErrors.password = " Usá entre 4 y 12 caracteres, una Mayus y un número";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setMensaje({ texto: "❌ Revisá los campos en rojo", tipo: "error"});
      return;
    }
    
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
    });

    if (error) {
      setMensaje({ 
        texto:"❌ " + error.message,
        tipo: "error"
      });
    }else {
      const user = data.user;
      setMensaje({ 
        texto: "✅ Bienvenido " + (user?.user_metadata?.nombre || ""), 
        tipo: "exito" 
      });
      console.log("Usuario logeado:", user);
    }
  } catch (err) {
    console.error(err);
    setMensaje({
      texto: "❌ Error al iniciar sesión", 
      tipo: "error" 
    });
  }

    setMensaje({ texto: "todo piola", tipo: "exito" });

    setFormData({ email:"", password: ""});
    setErrors({})
  };
  

  return (
    <>
      <Navbar />
      <main>
        <div className="container">
          <form className="formulario" onSubmit={handleSubmit}>
            <h2 className="h2-inicioSesion"> Iniciá Sesión </h2>
            <label htmlFor="email" className="formulario__label">
              <em> Email:</em>
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
              <em> Contraseña:</em>
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
                value="Iniciar"
              />
            </div>
          </form>
        </div>
        <Footer />
      </main>
    </>
  )
}
