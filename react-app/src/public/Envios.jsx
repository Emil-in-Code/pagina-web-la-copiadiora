import React from 'react'
import "../../public/css/global.css";
import "../../public/css/envios.css";
import Navbar from "../widgets/navbar";
import Footer from "../widgets/footer"

export default function Envios() {
  return (
    <div className="body">

      <Navbar /> 

      <div className="title__container">
        <h2 className="title">TUS APUNTES Y LIBROS DIRECTO A TU PUERTA</h2>
        <p className="subtitle">
          que la distancia no sea una perdida de tiempo, Recibí tu pedido en un abrir y cerrar de ojos.
          <br />Sí, así de fácil y rápido te la hacemos.
        </p>
        <a href="https://wa.me/message/EOKHJIUZOJSKF1" className="btn-whatsapp">Wasapeame</a>
        <h3 className="list__title">Te alcanzamos las copias a:</h3>
      </div>

      <div className="cards-container">
        {[
          { zona: "Casco urbano Platense", precios: ["32 a 72 - $1.500", "1 a 131 - $1.500"] },
          { zona: "Los Hornos/San Carlos", precios: ["131 a 137 - $1.500", "137 a 143 - $2.000", "143 a 149 - $2.500"] },
          { zona: "RINGUELET/ TOLOSA", precios: ["32 a 526 - $1.500"] },
          { zona: "VILLA ELVIRA/ Altos de San L.", precios: ["131 a 137 - $1.500"], special: true },
          { zona: "City Bell", precios: ["131 a 137 - $1.500", "131 a 137 - $1.500", "131 a 137 - $1.500"] },
          { zona: "Olmos", precios: ["131 a 137 - $1.500", "131 a 137 - $1.500", "131 a 137 - $1.500"] },
          { zona: "Abasto", precios: ["131 a 137 - $1.500", "131 a 137 - $1.500", "131 a 137 - $1.500"] },
          { zona: "Villa Elisa", precios: ["131 a 137 - $1.500", "131 a 137 - $1.500", "131 a 137 - $1.500"] },
          { zona: "Ensenada", precios: ["131 a 137 - $1.500", "131 a 137 - $1.500", "131 a 137 - $1.500"] },
          { zona: "Berisso", precios: ["131 a 137 - $1.500", "131 a 137 - $1.500", "131 a 137 - $1.500"] },
          { zona: "Punta Lara", precios: ["131 a 137 - $1.500", "131 a 137 - $1.500", "131 a 137 - $1.500"] },
        ].map(({ zona, precios, special }) => (
          <div className="card" key={zona}>
            <div className="card--title">
              <h4 className={special ? 'special-title' : ''}>
                {zona.split('/').map((z, i) => (
                  <React.Fragment key={i}>
                    {z}
                    {i === 0 && zona.includes('/') && <br />}
                  </React.Fragment>
                ))}
              </h4>
            </div>
            <div className="card--body">
              <ul>
                {precios.map((linea, i) => (
                  <li key={i}>{linea}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div className="card">
          <div className="card--title">
            <h4>Días de lluvia</h4>
          </div>
          <div className="card--body">
            <p className="parrafo-final-envios">Se cobra un adicional de $400 ARS por riesgo de calle</p>
          </div>
        </div>
      </div>

      <Footer /> 
    </div>
  );
}