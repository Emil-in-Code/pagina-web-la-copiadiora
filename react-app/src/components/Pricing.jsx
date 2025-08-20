import Navbar from '../widgets/navbar'
import Footer from '../widgets/footer'
import "../styles/precios.css"

export default function Princing(){
  return (
    <>
      <Navbar />

      <main className="main">
        <h1 className="h1precios">Precios sin descuentos.</h1>
        <p className="p-h1">Para obtener todos nuestros beneficios deberás <a className="enlace-registrarse" to="Register.html">registrarte</a></p>

        {/*Tarjeta de Copias color*/}
        <section className="pricing__cards--section">

          <div className="card-container">

            <div className="card__fondo--amarillo">
              <img src="/assets/precios/copiascolor.svg" alt="Copias o impresiones a Color" className="imagenes"/>
            </div>

            <div className="container-contenido">
              <h2 className="contenido--title">COPIAS A COLOR</h2>
              <p className="contenido--text">Papel A4 de 75 gr.<br/>
              $150 simple faz<br/>
              $200 doble faz</p>
            </div>

            <div>
              <button className="btn-copiascolor">Hacer pedido</button>
            </div>

          </div>  

          {/*Tarjeta de Anillados*/}
          <div className="card-container">
            <div className="card__fondo--amarillo">
              <img src="/assets/precios/anillado.svg" alt="Anillados" className="imagenes"/>
            </div>

            <div className="conteiner-contenido">
              <h2 className="contenido--title">ANILLADOS</h2>
              <p className="contenido--text">En A4<br/> con tapas y anillos de plástico.<br/>
              $2.000<br/>
              Se hacen en el acto.</p>
            </div>
          </div>

          {/*Tarjeta de Copias en B/N*/}
          <div className="card-container">
            <div className="card__fondo--amarillo">
              <img src="/assets/precios/blanco y negro.png" alt="Copias o impresiones en Blanco y Negro" className="imagenes"/>
            </div>
            <div className="conteiner-contenido">
              <h2 className="contenido--title">COPIAS<br/>EN B/N</h2>
              <p className="contenido--text">Papel A4 de 75 gr.<br/>$100</p>
            </div>

            <div>
              <button className="btn-tarjetas">Hacer pedido</button>
            </div>

          </div>

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
              <button className="btn-tarjetas">Ver Artículos</button>
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
          <h2 className="h2agendas">Agendas Docentes</h2>
            <p className="p-agendas">Las agendas son únicamente para uso docente.<br/>
             contienen:<br/> cursos, asistencias, calificaciones,  designaciones, licencias<br/>
             y todo lo que vas a necesitar para organizar tu carrera.
            </p>

         {/*agenda incial */}
          <div className="container-agenda">  
            <h3 className="h3agendas">INICIAL</h3>
            <img src="/assets/agenda inicial.jpg" alt="agenda de incial"/> 
          </div>

         {/*agenda primaria */}
          <div className="container-agenda">
            <h3 className="h3agendas">PRIMARIA</h3>
            <img src="/assets/agenda primaria.jpg" alt="agenda primaria"/>
          </div>

          {/*agenda secundaria*/}
          <div className="container-agenda">
            <h3 className="h3agendas">SECUNDARIA</h3>
            <img src="/assets/agenda secundaria.jpg" alt="agenda secundaria"/>
          </div>

          <div>
            <ul>
              <li className="button-presupuesto"><a href="https://wa.me/message/EOKHJIUZOJSKF1">Comprar agendas</a></li>
            </ul>
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
