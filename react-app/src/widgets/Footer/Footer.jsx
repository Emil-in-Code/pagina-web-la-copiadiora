import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../Footer/Footer.module.css'

const Footer = () => {
  return (
    <div className={styles["footer"]}>
      <div className ={styles["socialLinks"]}>
       <Link to="https://wa.me/message/EOKHJIUZOJSKF1">
        📱
       </Link>
       <Link to="https://instagram.com/lacopiadora44">
        📷
       </Link>
       <Link to="https://lacopiadora44@gmail.com">
        ✉️
       </Link>
      </div>
       <p className={styles["paragraph"]}>La Copiadora - 44 e/ 4 y 5 La Plata</p>
    </div>
  )
}

export default Footer

/*      <ul className ={styles["contact-container"]}>
        <li>
          <Link  to="https://wa.me/message/EOKHJIUZOJSKF1">
            <img src="/assets/WP icon.png" className={styles["social-media"]} alt="whatsapp" />
          </Link>
        </li>
        <li>
          <Link to="https://instagram.com/lacopiadora44">
            <img src="/assets/INSTAGRAM ICON.png" className={styles["social-media"]} alt="instagr am" />
          </Link>
        </li>
        <li>
          <Link to="https://facebook.com/lacopiadora44">
             <img src="/assets/Fb icon.png" className={styles["social-media"]} alt="facebook" />
          </Link>
        </li>
        <li>
          <Link to="https://lacopiadora44@gmail.com">
            <img src="/assets/gmail icon.png" className={styles["social-media"]} alt="gmail" />
          </Link>
        </li>
      </ul>*/
