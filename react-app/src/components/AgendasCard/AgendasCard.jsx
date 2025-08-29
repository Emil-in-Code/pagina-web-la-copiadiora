 import styles from "../AgendasCard/AgendasCard.module.css"

export default function AgendasCard ({
  imgSrc,
  imgAlt,
  title,
  subtitle,
  description,
  price,
  imgClassName,
  children,
}){
  return(

    <div className={styles["container-wrapper"]}>
      <div className={styles["container-img"]}>
        <img
          src={imgSrc}
          alt={imgAlt}
          className={imgClassName}
        />
      </div>
      <div className={styles["text-container"]}>
        <h3 className={styles["title"]}>{title}</h3>
        <h4 className={styles["subtitle"]}>{subtitle}</h4>
        <p className={styles["description"]}>{description}</p>
      </div>
      <div className={styles["buy-section"]}>
         <p className={styles["price"]}>{price}</p>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}
