import "../styles/global.css";
import "../styles/links.css";

export default function LinksUtiles() {
  return (
    <>
         <Navbar />

    <div className="body">
      {/* MODAL AVISO */}
      <dialog open>
        <div className="modal__content">
          <h2 className="modal__title">Estás por salir</h2>
          <p className="modal__text">
            Estos links son útiles pero hacen que <br />
            abandones nuestra página y todas las interacciones y datos que
            brindes<br />
            por fuera de La Copiadora<br />
            son de tu responsabilidad absoluta.
          </p>
          <form method="dialog">
            <button className="modal__btn">X</button>
          </form>
        </div>
      </dialog>

      <main className="main">
        <h1 className="h1precios">
          En este apartado encontrarás todo lo necesario para organizar tus
          materias, tus tiempos y apalancar tus estudios con tecnología.
        </h1>

        <section className="links-utiles">
          {cards.map((card, index) => (
            <div className="tarjeta" key={index}>
              <div className="fondo__imagen">
                <img
                  src={card.img}
                  alt={card.alt}
                  className={card.className}
                />
              </div>
              <div className="contenido">
                <h2 className="h2links">{card.title}</h2>
                <p className="ptarjetas">{card.text}</p>
              </div>
              <div>
                <a href={card.url} target="_blank" rel="noopener noreferrer">
                  <button className="btn-links">ir a la web</button>
                </a>
              </div>
            </div>
          ))}
        </section>

        <h2 className="h2main-links">
          Solo recuerda, no existen atajos para llegar a lugares que valen la
          pena.
        </h2>
      </main>
    </div>

    </>  
  );
}

// Datos de cada tarjeta
const cards = [
  {
    img: "/assets/features/links img/ilovepdf.png",
    alt: "i love pdf",
    className: "imagen__ilovepdf",
    title: "Todo para tus pdf",
    text: "Uní páginas, desbloqueá\nconvertí a pdf\ncomprimí, etc.",
    url: "https://www.ilovepdf.com/es",
  },
  {
    img: "/assets/features/links img/notion.png",
    alt: "notion",
    className: "imagen__notion",
    title: "Todo para organizarte",
    text: "Gestión de proyectos\nentre varios\nmiembros",
    url: "https://www.notion.so/3659ea50e864418a832fbee16a6533ff?v=060dbe90b3a9465db7a55a7573ba217b",
  },
  {
    img: "/assets/features/links img/airtable.png",
    alt: "airtable",
    className: "imagen__airtable",
    title: "Excel con poderes",
    text: "Organiza tus\nflujos\nde trabajo",
    url: "https://airtable.com/",
  },
  {
    img: "/assets/features/links img/chatgpt.png",
    alt: "chat gpt",
    className: "imagen__chatgpt",
    title: "Chat\nGPT",
    text: "¿En verdad querés\noptimizarte\nsin esto?",
    url: "https://chatgpt.com/c/66e468fd-55d4-8003-9809-e64785b526a6",
  },
  {
    img: "/assets/features/links img/trello.png",
    alt: "trello",
    className: "imagen__trello",
    title: "Gestor de proyectos",
    text: "Con tableros y tarjetas\npara\ncada materia",
    url: "https://trello.com/es",
  },
  {
    img: "/assets/features/links img/grammarly.png",
    alt: "grammarly",
    className: "imagen__grammarly",
    title: "Gestor de Gramática",
    text: "Mejora tu gramática\ny ortografía\nen tus tp.",
    url: "https://www.grammarly.com/",
  },
  {
    img: "/assets/features/links img/Tichai.png",
    alt: "tichai",
    className: "imagen__tichai",
    title: "Gestor de exámenes",
    text: "Mejora y organiza tu\nrendimiento\nacadémico.",
    url: "https://www.tichacademy.com/sign-in?callbackUrl=%2F",
  },
];
