import Navbar from '../widgets/navbar'
import Footer from '../widgets/footer'
import "../styles/precios.css"
import CtaButton from "../components/CtaButton/CtaButton.jsx"
import InfoCard from "../components/InforCard/InfoCard.jsx"

export default function Princing(){
  return (
    <>
      <Navbar />

      <main className="main">
        <h1 className="h1precios">Precios sin descuentos.</h1>
        <p className="p-h1">Para obtener todos nuestros beneficios deberás <a className="enlace-registrarse" to="Register.html">registrarte</a></p>

        {/*Tarjeta de Copias color*/}
        <section className="pricing__cards--section">
            
          <InfoCard
            imgSrc="/assets/precios/copiascolor.svg"
            imgAlt="Copias o impresiones a Color"
            title="Copias a color"
            text={"Papel A4 de 75gr \n$300 simple faz\n $350 doble faz"}
          >
            <CtaButton
              to="./Pedidos.jsx"
              text="Hacer pedido"
              className="btn-copiascolor"
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
              className="btn-tarjetas"
            />
          </InfoCard>

          {/*Tarjeta de artículos de libreria*/} 
          <div className="card-container">
            <div className="card__fondo--amarillo">
              <img src="/assets/precios/libreria.svg" alt="Arículos de Librería" className="imagenes-lapiz"/>
            </div>
            <div className="conteiner-contenido">
              <h2 className="contenido--title">Artículos de librería</h2>
              <p className="contenido--text">Cuadernos, folios, Lapiceras...</p>
            </div>

            <div>
              <CtaButton
                to="#"
                text="Hacer pedido"
                className="btn-tarjetas"
              />
            </div> 

          </div>

          {/*Tarjeta de agendas docentes*/}
          <div className="card-container">
            <div className="card__fondo--amarillo">
              <img src="/assets/precios/Agendas.svg" alt="Agendas docentes" className="imagenes-agenda"/>
            </div>
            <div className="conteiner-contenido">
              <h2 className="contenido--title">Agendas docentes</h2>
              <p className="contenido--text">Para inicial, primaria y secundaria</p>
            </div>

            <div>
              <button className="btn-tarjetas">Ver Agendas</button>
            </div>
          </div>

          {/*Tarjeta de Delivery*/}
          <div className="card-container">
            <div className="card__fondo--amarillo">
              <img src="/assets/precios/delivery.svg" alt="Delivery" className="imagenes"/>
            </div>
            <div className="conteiner-contenido">
              <h2 className="contenido--title">Delivery</h2>
              <p className="contenido--text">Llegamos en el día y al mejor precio</p>
            </div>

            <div>
              <button className="btn-delivery">Ver Zonas</button>
            </div>
          </div>

          {/*Tarjeta libros usados
          <div className="card-container">
            <div className="card__fondo--amarillo">
              <img src="/assets/precios/libros opcion1.svg" alt="Libros usados" className="imagenes">
            </div>
            <div className="conteiner-contenido">
              <h2 className="contenido--title">Libros<br/>usados</h2>
              <p className="contenido--text">En excelente estado</p>
            </div>

            <div>
              <button className="btn-librosusados">Ver Libros</button>
            </div>
          </div>*/}

          {/*Tarjeta de plastificados*/}
          <div className="card-container">
            <div className="card__fondo--amarillo">
              <img src="/assets/precios/plastificad.svg" alt="plastificados" className="imagenes"/>
            </div>
            <div className="conteiner-contenido">
              <h2 className="contenido--title">Plastificados</h2>
              <p className="contenido--text">En calor<br/>tamaño carnet y A4</p>
            </div>
          </div>

          {/*Tarjeta material sad*/}
          <div className="card-container">
            <div className="card__fondo--amarillo">
              <img src="/assets/precios/sad.svg" alt="Material secretaría de asuntos docentes" className="imagenes"/>
            </div>
            <div className="conteiner-contenido">
              <h2 className="contenido--title">S.A.D</h2>
              <p className="contenido--text">Declaraciones juradas,<br/>obleas Inscripciones y más... </p>
            </div>

            <div>
              <button className="btn-sad">Consultar</button>
            </div>
          </div>
        </section>

        {/*SECCIÓN AGENDAS*/}

        <section className="agendas-section">
          <h2 className="title-section">Agendas</h2>
          <p className="description-section">Tenemos la agenda que estás buscando.</p>

          <div className="agendas-wrapper">

            {/*agenda incial */}
            <div className="container-agenda">
              <img src="/assets/agenda inicial.jpg" alt="agenda de incial"/>
              <div className="text-container">
                <h3 className="title-agenda">Agenda docente</h3>
                <h4 className="subtitle-agenda">Nivel inicial</h4>
                <p className="description-agenda">Calendario y cronograma mensual,lista de alumnos <br/>
                designaciones y suplencias, licencias,<br/> entrevistas y más...
              </p> 
              </div>
              <div className="buy-section">
                <p className="price">$25.000</p>
                <a href="https://wa.me/message/EOKHJIUZOJSKF1" className="btn-whatsapp">Comprar</a> 
              </div>           
            </div>

            {/*agenda primaria */}
            <div className="container-agenda">
              <img src="/assets/agenda primaria.jpg" alt="agenda primaria"/>
              <div className="text-container">
                <h3 className="title-agenda">Agenda docente</h3>
                <h4 className="subtitle-agenda">Nivel Primario</h4>
                <p className="description-agenda">Calendario y cronograma mensual,lista de alumnos <br/>
                  designaciones y suplencias, licencias,<br/> entrevistas y más... 
                </p>
              </div>
              <div className="buy-section">
                <p className="price">$25.000</p>
                <a href="https://wa.me/message/EOKHJIUZOJSKF1" className="btn-whatsapp">Comprar</a> 
              </div> 
              
            </div>

            {/*agenda secundaria*/}
            <div className="container-agenda">
              <img src="/assets/agenda secundaria.jpg" alt="agenda secundaria"/>
              <div className="text-container">
                <h3 className="title-agenda">Agenda docente</h3>
                <h4 className="subtitle-agenda">Nivel Secundario</h4>
                <p className="description-agenda">Calendario y cronograma mensual,lista de alumnos <br/>
                  designaciones y suplencias, licencias, entrevistas y más... 
                </p>
              </div>
              <div className="buy-section">
                  <p className="price">$25.000</p>
                  <a href="https://wa.me/message/EOKHJIUZOJSKF1" className="btn-whatsapp">Comprar</a> 
              </div>
            </div> 
          </div> 

        </section>

        {/*SECCIÓN LIBRERÍA*/}

        <section className="gallery__libreria">
          
          <h2 className="h2libreria">Artículos de librería</h2>
          
          <div className="container__libreria">

            <div className="libreria--item">
              <img src="/assets/precios/sacapuntas.jpeg" alt="sacapuntas"/>
            </div>
          
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
