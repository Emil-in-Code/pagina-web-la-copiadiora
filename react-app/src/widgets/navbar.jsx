// src/widgets/navbar.jsx

import React from 'react'

const Navbar = () => {
  return (
    <header className="header__container">
      <div className="logo__container--nav">
        <a className="nav__logo" href="index.html">La Copiadora</a>
      </div>
      
      <input type="checkbox" className="header__checkbox" id="open-menu" />
      <label htmlFor="open-menu" className="header__open-nav-button" role="button">☰</label>

      <nav className="nav" aria-label="Main Navigation">
        <div className="header__nav">
          <ul className="header__nav--list">
            <li><a className="nav__item" href="laCopiadoraStore.html" target="_blank">Store</a></li>
            <li><a className="nav__item" href="envios.html">Envíos</a></li>
            <li><a className="nav__item" href="pricing.html">Precios</a></li>
            <li><a className="nav__item" href="/react/pedidos">Pedidos</a></li>
            <li><a className="nav__item" href="linksutiles.html">Links Útiles</a></li>
            <li><a className="nav__item" href="Register.html">Registrarme</a></li>
            <li><a className="nav__item nav__item--button" href="login.html">Log-in</a></li>
            <li id="usuario-navbar" className="nav__item usuario-navbar oculto" style={{position: 'relative'}}>
              <span id="nombre-usuario">👤</span>
              <ul id="dropdown-menu" className="dropdown-menu oculto">
                <li><a href="#" id="logout-link">Cerrar sesión</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
