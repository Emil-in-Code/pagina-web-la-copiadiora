import { Link } from "react-router-dom"
import Navbar from "../widgets/navbar"
import Footer from "../widgets/footer"
import "../styles/Home.css"
import "../styles/global.css"
import CtaButton from "../components/CtaButton/CtaButton.jsx"

export default function Index() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero__flexbox">
          <div className="text__container">
            <h1 className="indexh1">Tu carrera, tu futurO,<br />tu tiempO.</h1>
            <p>
              Leer todo lo que te piden ya es complicado.<br />
              Que imprimirlo sea<br /> rápido, fácil y seguro
            </p>
            <div className ="cta__container">
              <CtaButton
                to="./Pedidos"
                text="Presupuestar gratis"
                id="presupuestar-btn"
                className="button-presupuesto"
              />
            </div> 
          </div>

          <div className="logo__container">
            <img src="/assets/logo-copiadora.png" alt="logo de la copiadora" className="logo" />
          </div>

          <div className="cta__container2">
            <CtaButton
              to="./Pedidos" 
              className="button-presupuesto2" 
              aria-label="Presupuestar fotocopias gratis"
              text="Presupuestar Ahora"
            />
          </div>
        </section>

        <section className="feature">
          <div className="gallery__container">
            <div className="gallery--item">
              <h2 className="title__feature">
                Pedilas donde quieras, cuando quieras.<br />
                a la hOra que quieras.
              </h2>
            </div>

            <div className="gallery--item">
              <img src="/assets/leyendo en la playa.jpg" alt="Persona leyendo en la playa" className="gallery__img" />
            </div>

            <div className="gallery--item">
              <img src="/assets/catedral.webp" alt="Persona leyendo en el escritorio desde un plano cenital" className="gallery__img" />
            </div>

            <div className="gallery--item">
              <img src="/assets/leyendo en kindle.jpg" alt="Persona leyendo en el kindle" className="gallery__img" />
            </div>

            <div className="gallery--item">
              <img src="/assets/leyendo en la habitacion.jpg" alt="Persona leyendo en su cama a la noche" className="gallery__img" />
            </div>

            <div className="gallery--item">
              <CtaButton
                to="/registrarme" 
                className="button-presupuesto--grid" 
                aria-label="Crear una cuenta"
                text= "Crear una cuenta"
              />
            </div>
          </div>
        </section>
      </main>

      <aside className="aside__wrapper">
        <div className="container-title">
          <h2 className="title__aside">¿Cómo hago mi pedido?</h2>
        </div>

        <div className="flex-container">
          <div className="container-item">
            <div className="subtitle__container">
              <h3 className="subtitle">1. Cargá tus archivos en pdf</h3>
            </div>
            <img src="/assets/pdf.svg" alt="cargar tus archivos" className="imagen-aside copias" />
          </div>

          <div className="container-item">
            <div className="subtitle__container">
              <h3 className="subtitle">2. Tus preferencias</h3>
            </div>
            <img src="/assets/preferenciaselector.png" alt="Seleccioná tus preferencias de impresión" className="imagen-aside preferencias" />
          </div>

          <div className="container-item">
            <div className="subtitle__container">
              <h3 className="subtitle">3. Manejá tus tiempos</h3>
            </div>
            <img src="/assets/tiempo de entrega.svg" alt="Elegí tu tiempo de entrega" className="imagen-aside recibir" />
          </div>

          <div className="container-item">
            <div className="subtitle__container">
              <h3 className="subtitle">4. Abonalo</h3>
            </div>
            <img src="/assets/tarjetasinfondo.png" alt="abonalo y listo" className="imagen-aside debit" />
          </div>

          <div className="container-item">
            <div className="subtitle__container">
              <h3 className="subtitle">5. recibilo</h3>
            </div>
            <img src="/assets/precios/delivery.svg" alt="abonalo y listo" className="imagen-aside box" />
          </div>

          <div className="container-item">
            <div className="subtitle__container">
              <h3 className="subtitle">6. Disfrutalo</h3>
            </div>
            <img src="/assets/orgiamiheart.png" alt="abonalo y listo" className="imagen-aside heart" />
          </div>
        </div>

        <div className="aside__cta">
          <CtaButton
            to="/registrarme" 
            className="button-presupuesto--grid" 
            aria-label="Crear una cuenta"
            text="Quiero mis copias"
          />
        </div>
      </aside>

      <Footer />
    </>
  )
}
