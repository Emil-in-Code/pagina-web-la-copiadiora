import { Link } from "react-router-dom"
import Navbar from "../widgets/Navbar/Navbar.jsx"
import Footer from '../widgets/Footer/Footer.jsx';
import homeStyles from "../styles/Home.module.css"
import "../styles/global.css"
import CtaButton from "../components/CtaButton/CtaButton.jsx"
import InfoCard from "../components/InfoCard/InfoCard.jsx"

export default function Index() {
  return (
    <>
      <Navbar />

      <main>
        <section className={homeStyles['hero']}>

          <div className={homeStyles['heroContent']}>
            <h1 className={homeStyles["heroTitle"]}>Tu caRRera, tu futuRO,<br />tu tiempO.</h1>
            <p>
              Leer todo lo que te piden ya es complicado.<br />
              Que imprimirlo sea<br /> rápido, fácil y seguro
            </p>

            <div className={homeStyles["heroCta"]}>
              <CtaButton
                to="./Pedidos"
                text="Presupuestar gratis"
                className={homeStyles["presupuestar-btn"]}
              />
            </div> 
          </div>
          
          <div className={homeStyles["heroCard"]}>
            <div className={homeStyles["logo"]}>
              <img
               src="/assets/logo-copiadora.png"
               alt="logo de la copiadora"
               className={homeStyles["logo"]}
              />
            </div>

            <h2>Nuestros servicios</h2>
            <ul>
              <li>✓ Entrega en el día</li>
              <li>✓ Descuento por cantidad</li>
              <li>✓ Delivery</li>
              <li>✓ Impresiones a color</li>
            </ul>
          </div>
        </section>

        <section className={homeStyles["valueProp"]}>
          <h2>
            Pedilas donde quieras, cuando quieras.<br />
            a la hOra que quieras.
          </h2>
          <div className={homeStyles["gallery"]}>

            <div className={homeStyles["galleryItem"]}>
              <div className={homeStyles["galleryPlaceholeder"]}>🚕</div>
              <div className={homeStyles["galleryOverlay"]}>Desde el taxi</div>
            </div>

            <div className={homeStyles["galleryItem"]}>
              <div className={homeStyles["galleryPlaceholeder"]}>🏛️</div>
              <div className={homeStyles["galleryOverlay"]}>Desde la facu</div>
            </div>

            <div>
              <div className={homeStyles["galleryItem"]}>🛏️</div>
              <div className={homeStyles["galleryOverlay"]}>Desde tu cama</div>
            </div>

            <div>
              <div className={homeStyles["galleryItem"]}>🧉</div>
              <div className={homeStyles["galleryOverlay"]}>Mientras te cebás ese</div>
            </div>

            <div className={homeStyles["heroCta"]}>
              <CtaButton
                to="/registrarme" 
                className={homeStyles["button-presupuesto--grid"]} 
                aria-label="Crear una cuenta"
                text= "Crear una cuenta"
              />
            </div>
          </div>
        </section>
      
        <section className={homeStyles["process"]}>
          <h2>¿Cómo hago mi pedido?</h2>
          <div className={homeStyles["processGrid"]}>
            <div className={homeStyles["proccesCard"]}>
              <div className={homeStyles["processNumber"]}>1</div>
              <div className={homeStyles["processIcon"]}>📂</div>
              <h3>Cargá tus archivos</h3>
              <p>Subí tus pdf desde cualquier dispositivo</p>
            </div> 
            <div className={homeStyles["proccesCard"]}>
              <div className={homeStyles["processNumber"]}>2</div>
              <div className={homeStyles["processIcon"]}></div>
              <h3>Preferencias</h3>
              <p>Seleccioná tus preferencias de impresión</p>
            </div> 
            <div className={homeStyles["proccesCard"]}>
              <div className={homeStyles["processNumber"]}>3</div>
              <div className={homeStyles["processIcon"]}>💳</div>
              <h3>Aboná</h3>
              <p>Tu pedido te estará esperando</p>
            </div>

            <div className={homeStyles["aside__cta"]}>
              <CtaButton
                to="/registrarme" 
                className={homeStyles["button-presupuesto--grid"]} 
                aria-label="Crear una cuenta"
                text="Quiero mis copias"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
