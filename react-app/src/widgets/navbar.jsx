// src/widgets/navbar.jsx

import React from 'react'
import {link} from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="header__container">
      <div className="logo__container--nav">
        <a className="nav__logo" href="Index.jsx">La Copiadora</a>
      </div>
      
      <input type="checkbox" className="header__checkbox" id="open-menu" />
      <label htmlFor="open-menu" className="header__open-nav-button" role="button">☰</label>

      <nav className="nav" aria-label="Main Navigation"> 
        <div className="header__nav">
          <ul className="header__nav--list">
            <li><a className="nav__item" href="laCopiadoraStore.html" target="_blank">Store</a></li>
            <li><Link className="nav__item" to="/envios">Envíos</Link></li>
            <li><Link className="nav__item" to="/precios">Precios</Link></li>
            <li><Link className="nav__item" to="/pedidos">Pedidos</Link></li>
            <li><Link className="nav__item" to="links-utiles">Links Útiles</Link></li>
            <li><Link className="nav__item" href="Register.html">Registrarme</Link></li>
            <li><Link className="nav__item nav__item--button" href="login.html">Log-in</Link></li>
            <li id="usuario-navbar" className="nav__item usuario-navbar oculto" style={{position: 'relative'}}>
              <span id="nombre-usuario">👤</span>
              <ul id="dropdown-menu" className="dropdown-menu oculto">
                <li><Link href="#" id="logout-link">Cerrar sesión</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
