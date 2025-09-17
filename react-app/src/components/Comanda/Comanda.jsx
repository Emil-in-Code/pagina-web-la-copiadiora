import styles from "./Comanda.module.css"

export default function Comanda ({
  title,
  subtitle,
  price,
  details,
  action,
  time,
})
{
  return (
    <div className={styles["comanda-container"]}>
      <div className={styles["container-title"]}>
        <h2 className={styles["title"]}>Pedido 1</h2>
      </div>

      <div className={styles["info-container"]}>
        <div className={styles["container-row1"]}>
          <h3 className={styles["subtitle"]}> 
           Color
          </h3>
          <p className={styles["price"]}> 
            $20.000
          </p>
        </div>
        <p className={styles["details"]}> 
          Detalle
        </p>

        <p className={styles["action"]}> 
          Realizar
        </p>

        <p className={styles["time"]}> 
          Retira en 3hs
        </p>
      </div>

    </div>
  );
}

