 import styles from "../AgendasCard/AgendasCard.module.css"


export default function AgendaCard ({
   imgsrc,
   imgAlt,
   title,
   text,
   children,
 
})
{
  return(

    <div className={$styles["container-wrapper"]}>
      <div className={$styles["cotainer-img"]}>
        <img
          src={imgSrc}
          alt={imgAlt}
          className={$styles["imagen"]}
        />
      </div>
      <div className={$styles["text-container"]"}>
        <h3 className={$styles["title"]}>{title}</h3>
        <h4 className={$styles["subtitle"]}>{text}</h4>
        <p className={$styles["description"]}>{text}</p>
      </div>
      <div className={$styles["buy-section"]}>
         <p className={$styles["price"]}>{text}</p>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}
