import Navbar from "../widgets/navbar.jsx"
import Footer from "../widgets/footer.jsx"
import "../styles/register.css"
import { useState } from 'react'

export default function Register(){
  const [formData, setForData] = useState ({
    nombre: "",
    apellido: "",
    mail:"",
    password:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Datos del form enviados', formData);
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
                className="form-input" 
                type="text" 
                name="nombre" 
                placeholder="Cosme" 
                required minlength="3"
                value={formData.nombre}
                onChange={handleChange}
              />
              <span></span>
            </label>

            <label htmlFor="apellido" className="formulario__label">
              <em>Apellido:</em>           
              <input 
                id="apellido"
                className="form-input" 
                type="text" 
                name="apellido" 
                placeholder="Fulanito" 
                required minlength="3"
                value={formData.apellido}
                onChange={handleChange}
              />
              <span></span>
            </label>

            <label htmlFor="email" className="formulario__label">
              <em>Mail:</em>          
              <input  
                className="form-input" 
                type="email" 
                name="email" 
                placeholder="lacopiadora44@gmail.com" 
                required minlength="3"
                value={formData.email}
                onChange={handleChange}
              />
              <span></span>
            </label> 

            <label htmlFor="password" className="formulario__label">
              <em>Contraseña:</em>          
              <input  
                className="form-input" 
                type="password" 
                name="password" 
                placeholder="Micontraseña1" 
                required minlength="3"
                value={formData.password}
                onChange={handleChange}
              />
              <span></span>            
            </label> 

            <div className="form__group" id="grupo__submit">
              <input 
              className="form-input" 
              type="submit" 
              value="Registrarse"/>
            </div>

            <div className="mensaje-estado"></div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
