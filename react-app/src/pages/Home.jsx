import { Link } from "react-router-dom"
import Navbar from "../widgets/navbar"
import Footer from "../widgets/footer"
import "../styles/Home.css"
import "../styles/global.css"
import CtaButton from "../components/CtaButton/CtaButton.jsx"
import InfoCard from "../components/InforCard/InfoCard.jsx"

export default function Index() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero__flexbox">
          <div className="text__container">
            <h1 className="indexh1">Tu caRRera, tu futuRO,<br />tu tiempO.</h1>
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
            <InfoCard
              imgSrc="/assets/pdf.svg"
              imgAlt="1.Carga tus pdf"
              title="1. Cargá tus archivos"
              text={"Solo aceptamos PDF"}
            ></InfoCard>  
            <InfoCard
              imgSrc="/assets/preferencias.png"
              imgAlt="2.Elegí tus preferencias de impresión"
              title="2. Preferencias"
              text={"Seleccioná tus preferencias de impresión"}
            ></InfoCard>          
            <InfoCard
              imgSrc="/assets/tiempo de entrega.svg"
              imgAlt="3.Te diremos en cuanto tiempo estará tu pedido"
              title="3.Tiempo"
              text={"Te diremos en cuánto tiempo estará tu pedido"}
            ></InfoCard>  
            <InfoCard
              imgSrc="/assets/tarjetasinfondo.png"
              imgAlt="4.Abonar con tarjeta de débito"
              title="4.Abonalo"
              text={"te enviaremos la confirmación por WhatsApp"}
            ></InfoCard>
            <InfoCard
              imgSrc="/assets/precios/delivery.svg"
              imgAlt="5.Recibilo en casa o retiralo por sucursal"
              title="5. Recibilo"
              text={"Recibilo en casa o retiralo en tienda"}
            ></InfoCard>
            <InfoCard
              imgSrc="/assets/orgiamiheart.png"
              imgAlt="6.Ya puedes disfrutar tu pedido"
              title="6.Disfrutalo"
              text={"Tu educación es la mejor inversión"}
            ></InfoCard>

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
