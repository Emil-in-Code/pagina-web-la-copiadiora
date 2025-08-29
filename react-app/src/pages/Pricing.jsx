import Navbar from '../widgets/navbar'
import Footer from '../widgets/footer'
import styles from "../styles/pricing.module.css"
import CtaButton from "../components/CtaButton/CtaButton.jsx"
import InfoCard from "../components/InfoCard/InfoCard.jsx"
import infoCardstyles from "../components/InfoCard/InfoCard.module.css"
import AgendasCard from "../components/AgendasCard/AgendasCard.jsx"
import AgendasCardstyles from "../components/AgendasCard/AgendasCard.module.css"

export default function Pricing(){
  return (
    <>
      <Navbar />

      <main className={styles["main"]}>
        <h1 className={styles["h1precios"]}>Precios sin descuentos.</h1>
        <p className={styles["p-h1"]}>Para obtener todos nuestros beneficios deberás
          <a className={styles["enlace-registrarse"]} to="Register.html">registrarte</a>
        </p>

        {/*Tarjeta de Copias color*/}
        <section className={styles["pricing__cards--section"]}>
            
          <InfoCard
            imgSrc="/assets/precios/copiascolor.svg"
            imgAlt="Copias o impresiones a Color"
            title="Copias a color"
            text={"Papel A4 de 75gr \n$300 simple faz\n $350 doble faz"}
          >
            <CtaButton
              to="./Pedidos.jsx"
              text="Hacer pedido"
              className={styles["btn-tarjetas"]}
            />
          </InfoCard>

          {/*Tarjeta de Anillados*/}

          <InfoCard
            imgSrc="/assets/precios/anillado.svg"
            imgAlt="Anillados"
            title="Anillados"
            text={"En A4 con tapas y anillos de plástico.\n$3.000 \nSe anilla en el acto."}
          ></InfoCard>
           
          {/*Tarjeta de Copias en B/N*/}

          <InfoCard
            imgSrc="/assets/precios/blanco y negro.png"
            imgAlt="Copias o impresiones en blanco y negro"
            title="Copias en B&N"
            text={"En papel A4 de 75gr \n$150 \n\n"}
          >
            <CtaButton
              to="./Pedidos.jsx"
              text="Hacer pedido"
              className={styles["btn-tarjetas"]}
            />
          </InfoCard>

          {/*Tarjeta de artículos de libreria*/} 

          <InfoCard
            imgSrc="/assets/precios/libreria.svg"
            imgAlt="Artículos de librería"
            title="Art. de libreria"
            text={"Cuadernos, folios, Lapiceras...\n\n"}
          >
            <CtaButton
              to="#"
              text="Ver artículos"
              className={styles["btn-tarjetas"]}
            />
          </InfoCard>


          {/*Tarjeta de agendas docentes*/}

          <InfoCard
            imgSrc="/assets/precios/Agendas.svg"
            imgAlt="Agendas docentes"
            title="Agendas"
            text={"Para inicial,\n primaria y secundaria\n\n"}
          >
            <CtaButton
              to="#"
              text="Ver Agendas"
              className={styles["btn-tarjetas"]}
            />
          </InfoCard>


          {/*Tarjeta de Delivery*/}
          <InfoCard
            imgSrc="/assets/precios/delivery.svg"
            imgAlt="Delivery"
            title={"Delivery\n"}
            text={"Llegamos en el día y al mejor precio \n\n"}
          >
            <CtaButton
              to="./Envios.jsx"
              text="Ver Zonas"
              className={styles["btn-tarjetas"]}
            />
          </InfoCard>          


          {/*Tarjeta libros usados*/}
          <InfoCard
            imgSrc="/assets/precios/libros opcion1.svg"
            imgAlt="Libros usados"
            title="Libros usados"
            text={"En excelentes condiciones\n\n"}
          >
            <CtaButton
              to="./Envios.jsx"
              text="Ver Libros"
              className={styles["btn-tarjetas"]}
            />
          </InfoCard>         

          {/*Tarjeta de plastificados*/}
          <InfoCard
            imgSrc="/assets/precios/plastificad.svg"
            imgAlt="plastificados"
            title="plastificados"
            text={"En calor\ntamaño carnet y A4\n"}
          ></InfoCard>          

          {/*Tarjeta material sad*/}

          <InfoCard
            imgSrc="/assets/precios/sad.svg"
            imgAlt="Material de secretaría de asuntos docentes"
            title="S.A.D"
            text={"Declaraciones juradas,\nobleas,inscripciones y más...\n"}
          >
            <CtaButton
              href="https://wa.me/message/EOKHJIUZOJSKF1" 
              text="consultar"
              className={styles["btn-tarjetas"]}
            />
          </InfoCard>         

        </section>

        {/*SECCIÓN AGENDAS*/}

        <section className={styles["agendas-section"]}>

          <div className={styles["wrap-titles"]}>
            <h2 className={styles["title-section"]}>Agendas</h2>
            <p className={styles["description-section"]}>Tenemos la agenda que estás buscando.</p>
          </div>
          <div className={styles["agendas-wrapper"]}>

            {/*agenda incial */}
            <AgendasCard
              imgSrc="/assets/agenda inicial.jpg"
              imgAlt="Agenda de nivel incial"
              title="Agenda Docente"
              subtitle="Nivel inicial"
            description={"Cronograma mensual\ncalendario, lista de alumnos\n designaciones y suplencias,\nlicencias, entrevistas y más..."}
              price="$25.000"
              imgClassName={styles["imagen-agenda"]}
            >
              <CtaButton
                href="https://wa.me/message/EOKHJIUZOJSKF1"
                text="Comprar"
                className={styles["presupuestar-btn"]}
              />
            </AgendasCard>
            {/*agenda primaria */}
            <AgendasCard
              imgSrc="/assets/agenda primaria.jpg"
              imgAlt="Agenda de nivel primaria"
              title="Agenda Docente"
              subtitle="Nivel Primaria"
              description={"Cronograma mensual\ncalendario, lista de alumnos\n designaciones y suplencias,\nlicencias, entrevistas y más..."}
              price="$25.000"
              imgClassName={styles["imagen-agenda"]}            >
              <CtaButton
                href="https://wa.me/message/EOKHJIUZOJSKF1"
                text="Comprar"
                className={styles["presupuestar-btn"]}
              />
            </AgendasCard>
           
            {/*agenda secundaria*/}
            <AgendasCard
              imgSrc="/assets/agenda secundaria.jpg"
              imgAlt="Agenda de nivel secundaria"
              title="Agenda Docente"
              subtitle="Nivel secundaria"
              description={"Cronograma mensual\ncalendario, lista de alumnos\n designaciones y suplencias,\nlicencias, entrevistas y más..."}
              price="$25.000"
              imgClassName={styles["imagen-agenda"]}            >
              <CtaButton
                href="https://wa.me/message/EOKHJIUZOJSKF1"
                text="Comprar"
                className={styles["presupuestar-btn"]}
              />
            </AgendasCard>          
          </div> 
        </section>

        {/*SECCIÓN LIBRERÍA*/}

        <section className="gallery__libreria">
          
          <h2 className="h2libreria">Artículos de librería</h2>

          <InfoCard
            imgSrc="/assets/precios/sacapuntas.jpeg"
            imgAlt="sacapuntas"
            title="Sacapuntas"
            text={"Maped, tipo igloo de plástico\n\n$1900"}
          >
          </InfoCard>         
          <InfoCard
            imgSrc="/assets/precios/folios.jpeg"
            imgAlt="folio plástico A4"
            title="Folios A4"
            text={"Folios de plástico de 100 micrones\n\n$500 c/u"}
          >
          </InfoCard>         
          <InfoCard
            imgSrc="/assets/precios/sobre madera.jpeg"
            imgAlt="sobre de papel madera"
            title="Sobres A4"
            text={"Manila color natural\n\n$1900"}
          >
          </InfoCard>         
          <InfoCard
            imgSrc="/assets/precios/folios.jpeg"
            imgAlt="folio plástico A4"
            title="Folios A4"
            text={"Folios de plástico de 100 micrones\n\n$500 c/u"}
          >
          </InfoCard>          
          <div className="container__libreria">

          
            <div className="libreria--item">
              <img src="/assets/precios/folios.jpeg" alt="folios"/>
            </div>
          
            <div className="libreria--item">
              <img src="/assets/precios/sobre madera.jpeg" alt="sobre de papel madera"/>
            </div>
          
            <div className="libreria--item">
              <img src="/assets/precios/lapicera.jpeg" alt="lapiceras"/>
            </div>
          
            <div className="libreria--item">
              <img src="/assets/precios/resaltador.jpeg" alt="resaltadores"/>
            </div>
          
            <div className="libreria--item">
              <img src="/assets/precios/postit.jpeg" alt="post it"/>
            </div>
          </div>
          
        </section>

        {/*
        --SECCIÓN LIBROS USADOS

        <section class="gallery">

          <h2 class="gallery--h2">Libros usados</h2>
          <p class="gallery--p">Más de 3 mil títulos</p>

          <div class="container__libros">

            <div class="libros--item">
              <img src="assets/features/libros usados/autoras/la llorona serrano.jpeg" alt="La LLorona de Marcela Serrano">
            </div>

            <div class="libros--item">
              <img src="assets/features/libros usados/autoras/maria dueñas.jpeg"  alt="La Templanza de Maria Dueñas">
            </div>

            <div class="libros--item">
              <img src="assets/features/libros usados/autoras/ultimos fuegos.jpeg" alt="Ùltimos fuegos de Alejandra Costamagna">
            </div>

            <div class="libros--item">
              <img src="assets/features/libros usados/autoras/nosotras que nos queremos tanto.jpeg"  alt="Nosotras que nos queremos tanto de Marcela Serrano">
            </div>

            <div class="libros--item">
              <img src="assets/features/libros usados/autoras/waslala.jpeg" alt="Waslala de Gioconda Belli">
            </div>

            <div class="libros--item">
              <img src="assets/features/libros usados/autoras/tuya.jpeg" alt="Tuya de Claudia Piñeiro">
            </div>

            <div class="libros--item">
              <img src="assets/features/libros usados/literatura/el libro fantasma dolina.jpeg" alt="El libro fantasma Dolina">
            </div>

            <div class="libros--item">
              <img src="assets/features/libros usados/historia y ciencias/el discurso social.jpeg" alt="El discurso social de Marc Angenot">
            </div>

            <div class="libros--item">
              <img src="assets/features/libros usados/literatura/la odisea.jpeg" alt="La Odisea">
            </div>

            <div class="libros--item">
              <img src="assets/features/libros usados/literatura/las fuerzas morales.jpeg" alt="Las fuerzas morales de José Ingenieros">
            </div>

          </div>
          <div class="libros--cta">
            <p>Consultá por tu título</p>
            <ul>
              <li class="button-presupuesto"><a href="https://wa.memessage/EOKHJIUZOJSKF1">Comprar por wp</a></li>
            </ul>
          </div>


        </section>*/}
      </main>  

      <Footer />
    </>
  )
}
