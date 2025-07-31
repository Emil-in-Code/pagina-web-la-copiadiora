import { Link } from "react-router-dom"
import Navbar from "../widgets/navbar"
import Footer from "../widgets/footer"
import "./Index.css"
import "./global.css"

export default function Index() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero__flexbox">
          <div className="text__container">
            <h1 className="indexh1">Tu carrera, tu futuro,<br />tu tiempo.</h1>
            <p>
              Leer todo lo que te piden ya es complicado.<br />
              Que imprimirlo sea<br /> rápido, fácil y seguro
            </p>
            <div className="cta__container">
              <Link to="/pedidos" id="presupuestar-btn" className="button-presupuesto" aria-label="Presupuestar fotocopias gratis">
                Presupuestar Gratis
              </Link>
            </div>
          </div>

          <div className="logo__container">
            <img src="/assets/features/features/Logo-copiadora.png" alt="logo de la copiadora" className="logo" />
          </div>

          <div className="cta__container2">
            <Link to="/pedidos" className="button-presupuesto2" aria-label="Presupuestar fotocopias gratis">
              Presupuestar Ahora
            </Link>
          </div>
        </section>

        <section className="feature">
          <div className="gallery__container">
            <div className="gallery--item">
              <h2 className="title__feature">
                Pedilas donde quieras, cuando quieras.<br />
                a la hora que quieras.
              </h2>
            </div>

            <div className="gallery--item">
              <img src="/assets/features/leyendo en la playa.jpg" alt="Persona leyendo en la playa" className="gallery__img" />
            </div>

            <div className="gallery--item">
              <img src="/assets/features/catedral.webp" alt="Persona leyendo en el escritorio desde un plano cenital" className="gallery__img" />
            </div>

            <div className="gallery--item">
              <img src="/assets/features/leyendo en kindle.jpg" alt="Persona leyendo en el kindle" className="gallery__img" />
            </div>

            <div className="gallery--item">
              <img src="/assets/features/leyendo en la habitacion.jpg" alt="Persona leyendo en su cama a la noche" className="gallery__img" />
            </div>

            <div className="gallery--item">
              <Link to="/registrarme" className="button-presupuesto--grid" aria-label="Crear una cuenta">
                Crear una cuenta
              </Link>
            </div>
          </div>
        </section>
      </main>

      <aside className="aside__wrapper">
        <div className="container-title">
          <h2 className="title__aside">¿CÓmo hago mi pedido?</h2>
        </div>

        <div className="flex-container">
          <div className="container-item">
            <div className="subtitle__container">
              <h3 className="subtitle">1. Cargá tus archivos en pdf</h3>
            </div>
            <img src="/assets/features/pdf.svg" alt="cargar tus archivos" className="imagen-aside copias" />
          </div>

          <div className="container-item">
            <div className="subtitle__container">
              <h3 className="subtitle">2. Tus preferencias</h3>
            </div>
            <img src="/assets/features/preferenciaselector.png" alt="Seleccioná tus preferencias de impresión" className="imagen-aside preferencias" />
          </div>

          <div className="container-item">
            <div className="subtitle__container">
              <h3 className="subtitle">3. Manejá tus tiempos</h3>
            </div>
            <img src="/assets/features/tiempo de entrega.svg" alt="Elegí tu tiempo de entrega" className="imagen-aside recibir" />
          </div>

          <div className="container-item">
            <div className="subtitle__container">
              <h3 className="subtitle">4. Abonalo</h3>
            </div>
            <img src="/assets/features/tarjetasinfondo.png" alt="abonalo y listo" className="imagen-aside debit" />
          </div>

          <div className="container-item">
            <div className="subtitle__container">
              <h3 className="subtitle">5. recibilo</h3>
            </div>
            <img src="/assets/features/precios/delivery.svg" alt="abonalo y listo" className="imagen-aside box" />
          </div>

          <div className="container-item">
            <div className="subtitle__container">
              <h3 className="subtitle">6. Disfrutalo</h3>
            </div>
            <img src="/assets/features/orgiamiheart.png" alt="abonalo y listo" className="imagen-aside heart" />
          </div>
        </div>

        <div className="aside__cta">
          <Link to="/registrarme" className="button-presupuesto--grid" aria-label="Crear una cuenta">
            Quiero mis copias
          </Link>
        </div>
      </aside>

      <Footer />
    </>
  )
}
