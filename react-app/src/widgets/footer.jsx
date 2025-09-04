import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className = "footer-container">
      <div className ="logo-container">
         <Link className="nav__logo" to="/">La Copiadora</Link>
      </div>

      <ul className = "contact-container">
        <li><Link className= "social-media" to="https://wa.me/message/EOKHJIUZOJSKF1">WhatsApp</Link></li>
        <li><Link className= "social-media" to="https://instagram.com/lacopiadora44">Instagram</Link></li>
        <li><Link className="social-media" to="https://facebook.com/lacopiadora44">Facebook</Link></li>
        <li><Link className="social-media" to="https://lacopiadora44@gmail.com">Email</Link></li>
      </ul>
    </div>
  )
}

export default Footer
