import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <header className={["header__container"]}>
      <div className={["logo__container--nav"]}>
        <Link className={["nav__logo"]} to="/">La Copiadora</Link>
      </div>
      
      <input type="checkbox" className={["header__checkbox"]} id="open-menu" />
      <label htmlFor="open-menu" className={["header__open-nav-button"]} role="button">☰</label>

      <nav className={["nav"]} aria-label="Main Navigation"> 
        <div className={["header__nav"]}>
          <ul className={["header__nav--list"]}>
            <li><Link to="/envios">Envíos</Link></li>
            <li><Link to="/precios">Precios</Link></li>
            <li><Link to="/pedidos">Pedidos</Link></li>
            <li><Link to="/links-utiles">Links Útiles</Link></li>
            <li><Link to="/Register">Registrarme</Link></li>
            <li><Link to="/Dashboard">Admin</Link></li>
            <li><Link to="/login">Log-in</Link></li>
            <li id="usuario-navbar" className={["nav__item usuario-navbar oculto"]} style={{position: 'relative'}}>
              <span id="nombre-usuario">👤</span>
              <ul id="dropdown-menu" className={[ ]}"dropdown-menu oculto">
                <li><Link to="#" id="logout-link">Cerrar sesión</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
