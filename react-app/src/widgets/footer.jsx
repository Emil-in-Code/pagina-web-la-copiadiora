import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className = "footer-container">
      <div className ="logo-container">
         <Link className="nav__logo" to="/">La Copiadora</Link>
      </div>

      <ul className = "contact-container">
        <li>
          <Link  to="https://wa.me/message/EOKHJIUZOJSKF1">
            <img src="/assets/WP icon.png" className="social-media" alt="whatsapp" />
          </Link>
        </li>
        <li>
          <Link to="https://instagram.com/lacopiadora44">
            <img src="/assets/INSTAGRAM ICON.png" className="social-media" alt="instagr am" />
          </Link>
        </li>
        <li>
          <Link to="https://facebook.com/lacopiadora44">
             <img src="/assets/Fb icon.png" className="social-media" alt="facebook" />
          </Link>
        </li>
        <li>
          <Link to="https://lacopiadora44@gmail.com">
            <img src="/assets/gmail icon.png" className="social-media" alt="gmail" />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Footer
