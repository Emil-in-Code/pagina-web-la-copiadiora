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
            <h1 className={homeStyles["heroTitle"]}>
              Tu caRRera,<br/>
              tu futuRO,<br />
              tu tiempO.</h1>
            <p>
              Leer todo lo que te piden <br />ya es complicado.<br />
              Que imprimirlo sea<br /> rápido, fácil y seguro
            </p>

            <CtaButton
              to="./Pedidos"
              text="Presupuestar gratis"
              className={homeStyles["presupuestar-btn"]}
            />

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
              <img 
               src="../../public/assets/catedral.webp"
               alt="hacé tu pedido en la plaza"
              />
              <div className={homeStyles["galleryOverlay"]}>Desde la plaza </div>
            </div>

            <div className={homeStyles["galleryItem"]}>
              <img 
               src="../../public/assets/leyendo en kindle.jpg"
               alt="desde tu tablet"
              />
              <div className={homeStyles["galleryOverlay"]}> 🏛️Desde la facu</div>
            </div>

            <div className={homeStyles["galleryItem"]}>
              <img 
               src="../../public/assets/leyendo en la habitacion.jpg"
               alt="Desde tu cama"
              />
              <div className={homeStyles["galleryOverlay"]}> 🛏️Desde tu cama</div>
            </div>

            <div className={homeStyles["galleryItem"]}>
              <img 
               src="../../public/assets/leyendo en la playa.jpg"
               alt="Estudiante"
              />
              <div className={homeStyles["galleryOverlay"]}>🧉O Mientras te cebás ese en la playa</div>
            </div>

            <CtaButton
              to="/registrarme" 
              className={homeStyles["presupuestar-btn"]} 
              aria-label="Crear una cuenta"
              text= "Crear una cuenta"
            />
            
          </div>
        </section>
      
        <section className={homeStyles["process"]}>
          <h2>¿Cómo hago mi pedido?</h2>
          <div className={homeStyles["processGrid"]}>
            <div className={homeStyles["processCard"]}>
              <div className={homeStyles["processNumber"]}>1</div>
              <div className={homeStyles["processIcon"]}>📂</div>
              <h3>Cargá tus archivos</h3>
              <p>Subí tus pdf desde cualquier dispositivo</p>
            </div> 

            <div className={homeStyles["processCard"]}>
              <div className={homeStyles["processNumber"]}>2</div>
              <img 
               src="../../public/assets/preferenciasimp.svg"
               alt="preferencias de impresión"
               className={homeStyles["processIcon"]}
              />
              <h3>Preferencias</h3>
              <p>Seleccioná tus preferencias de impresión</p>
            </div> 

            <div className={homeStyles["processCard"]}>
              <div className={homeStyles["processNumber"]}>3</div>
              <div className={homeStyles["processIcon"]}>💳</div>
              <h3>Aboná</h3>
              <p>Tu pedido te estará esperando</p>
            </div>

            <div className={homeStyles["CtaContainer"]}>
              <CtaButton
                to="/registrarme" 
                className={homeStyles["presupuestar-btn"]} 
                aria-label="Crear una cuenta"
                text="Registrarme"
              />
              <CtaButton
                to="/pedidos" 
                className={homeStyles["presupuestar-btn2"]} 
                aria-label="Crear una cuenta"
                text="Imprimir"
              />
            </div>

          </div>
        </section>
       <Footer />
      </main>
    </>
  )
}
