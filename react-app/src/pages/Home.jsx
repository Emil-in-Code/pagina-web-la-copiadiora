import { Link } from "react-router-dom"
import Navbar from "../widgets/navbar"
import Footer from "../widgets/footer"
import homeStyles from "../styles/Home.module.css"
import "../styles/global.css"
import CtaButton from "../components/CtaButton/CtaButton.jsx"
import InfoCard from "../components/InfoCard/InfoCard.jsx"

export default function Index() {
  return (
    <>
      <Navbar />

      <main>
        <section className={homeStyles['hero__flexbox']}>
          <div className={homeStyles['text__container']}>
            <h1 className={homeStyles["indexh1"]}>Tu caRRera, tu futuRO,<br />tu tiempO.</h1>
            <p>
              Leer todo lo que te piden ya es complicado.<br />
              Que imprimirlo sea<br /> rápido, fácil y seguro
            </p>
            <div className={homeStyles["cta__container"]}>
              <CtaButton
                to="./Pedidos"
                text="Presupuestar gratis"
                className={homeStyles["presupuestar-btn"]}
              />
            </div> 
          </div>

          <div className={homeStyles["logo__container"]}>
            <img src="/assets/logo-copiadora.png" alt="logo de la copiadora" className={homeStyles["logo"]} />
          </div>

          <div className={homeStyles["cta__container2"]}>
            <CtaButton
              to="./Pedidos" 
              className={homeStyles["button-presupuesto2"]} 
              aria-label="Presupuestar fotocopias gratis"
              text="Presupuestar Ahora"
            />
          </div>
        </section>

        <section className={homeStyles["feature"]}>
          <div className={homeStyles["gallery__container"]}>
            <div className={homeStyles["gallery--item"]}>
              <h2 className={homeStyles["title__feature"]}>
                Pedilas donde quieras, cuando quieras.<br />
                a la hOra que quieras.
              </h2>
            </div>

            <div className={homeStyles["gallery--item"]}>
              <img src="/assets/leyendo en la playa.jpg" alt="Persona leyendo en la playa" className={homeStyles["gallery__img"]} />
            </div>

            <div className={homeStyles["gallery--item"]}>
              <img src="/assets/catedral.webp" alt="Persona leyendo en el escritorio desde un plano cenital" className={homeStyles["gallery__img"]} />
            </div>

            <div className={homeStyles["gallery--item"]}>
              <img src="/assets/leyendo en kindle.jpg" alt="Persona leyendo en el kindle" className={homeStyles["gallery__img"]} />
            </div>

            <div className={homeStyles["gallery--item"]}>
              <img src="/assets/leyendo en la habitacion.jpg" alt="Persona leyendo en su cama a la noche" className={homeStyles["gallery__img"]} />
            </div>

            <div className={homeStyles["gallery--item"]}>
              <CtaButton
                to="/registrarme" 
                className={homeStyles["button-presupuesto--grid"]} 
                aria-label="Crear una cuenta"
                text= "Crear una cuenta"
              />
            </div>
          </div>
        </section>
      </main>

      <aside className={homeStyles["aside__wrapper"]}>
        
        <h2 className={homeStyles["title__aside"]}>¿Cómo hago mi pedido?</h2>

        <div className={homeStyles["flex-container"]}>
          <InfoCard
            imgSrc="/assets/pdf.svg"
            imgAlt="1.Carga tus pdf"
            title="1. Cargá tus archivos"
            text={"Solo aceptamos PDF"}
          />  
          <InfoCard
            imgSrc="/assets/Preferencias.svg"
            imgAlt="2.Elegí tus preferencias de impresión"
            title="2. Preferencias"
            text={"Seleccioná\ntus preferencias de impresión"}
            imageClass={homeStyles['card-image']}
          />          
          <InfoCard
            imgSrc="/assets/entrega.svg"
            imgAlt="3.Te diremos en cuanto tiempo estará tu pedido"
            title="3.Tiempo"
            text={"Te diremos en cuánto tiempo estará tu pedido"}
          />  
          <InfoCard
            imgSrc="/assets/tarjetasinfondo.png"
            imgAlt="4.Abonar con tarjeta de débito"
            title="4.Abonalo"
            text={"te enviaremos la confirmación por WhatsApp"}
          />
          <InfoCard
            imgSrc="/assets/precios/delivery.svg"
            imgAlt="5.Recibilo en casa o retiralo por sucursal"
            title="5. Recibilo"
            text={"Recibilo en casa o retiralo en tienda"}
          />
          <InfoCard
            imgSrc="/assets/orgiamiheart.png"
            imgAlt="6.Ya puedes disfrutar tu pedido"
            title="6.Disfrutalo"
            text={"Tu educación es la mejor inversión"}
          />

        </div>

        <div className={homeStyles["aside__cta"]}>
          <CtaButton
            to="/registrarme" 
            className={homeStyles["button-presupuesto--grid"]} 
            aria-label="Crear una cuenta"
            text="Quiero mis copias"
          />
        </div>
      </aside>

      <Footer />
    </>
  )
}
