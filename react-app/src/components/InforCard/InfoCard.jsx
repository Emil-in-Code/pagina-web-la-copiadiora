
export default function InfoCard({ 
  imgSrc, 
  imgAlt, 
  title, 
  text, 
  children, 
  className = "" 
}) {
  return (
    <div className={`card-container ${className}`}>
      <div className="card__fondo--amarillo">
        <img src={imgSrc} alt={imgAlt} className="imagenes"/>
      </div>

      <div className="container-contenido">
        <h2 className="contenido--title">{title}</h2>
        <p className="contenido--text">{text}</p>
      </div>

      {children && <div>{children}</div>}
    </div>
  );
}
