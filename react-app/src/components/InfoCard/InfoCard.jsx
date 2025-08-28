import styles from "../InfoCard/InfoCard.module.css";

export default function InfoCard({
  imgSrc,
  imgAlt,
  title,
  text,
  children,
  containerClass, 
  imageClass,     
  titleClass,
  textClass      
}) {
  return (
    <div className={`${styles["card-container"]} ${containerClass}`}>
      <div className={styles["card__fondo--amarillo"]}>
        <img
          src={imgSrc}
          alt={imgAlt}
          className={`${styles.imagenes} ${imageClass}`} 
        />
      </div>

      <div className={styles["info-container"]}>
        <h2 className={`${styles["contenido--title"]} ${titleClass}`}> 
          {title}
        </h2>
        <p className={`${styles["contenido--text"]} ${textClass}`}> 
          {text}
        </p>
      </div>

      {children && <div>{children}</div>}
    </div>
  );
}
