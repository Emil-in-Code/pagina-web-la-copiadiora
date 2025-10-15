import {Link} from 'react-router-dom'
import styles from './Navbar.module.css'
import React, { useState } from 'react';

const Navbar = () => {
 return (
   <header className={styles.header}>
    <nav className={styles.nav} aria-label="Main Navigation"> 

      <div className={styles.logoContainer}>
        <Link className={styles.logo} to="/">La Copiadora</Link>
      </div>
     
      <input
        type="checkbox" 
        className={styles.menuCheckbox} 
        id="open-menu"
      />
      <label
        htmlFor="open-menu" 
        className={styles.menuButton} 
        role="button"
      >
        ☰
      </label>

      <ul className={styles.navLinks}>
        <li><Link to="/envios">Envíos</Link></li>
        {/*<li><Link to="/precios">Precios</Link></li>*/}
        <li><Link to="/pedidos">Pedidos</Link></li>
        <li><Link to="/links-utiles">Links Útiles</Link></li>
        <li><Link to="/Register">Registrarme</Link></li>
      </ul>

      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
           <span style={{ color: '#fff', fontSize: '15px' }}>
             ¡Hola! <strong style={{ color: '#FFce06' }}>{user.nombre}</strong>
           </span>
           <button 
            onClick={handleLogout}
            className={styles.btnLogin}
            style={{ background: 'none', border: '1px solid #FFce06', color: '#FFce06' }}
              >
                Cerrar sesión
           </button>
        </div>
      ) : (
        <Link to="/login" className={styles.btnLogin}>
          Log-in
        </Link>

      )}
    </nav>
   </header>
 );
};

export default Navbar
