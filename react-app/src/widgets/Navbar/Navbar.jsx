import {Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient.js'
import { useNavbar } from './useNavbar.js'

const Navbar = () => {
  const navigate = useNavigate();
  const { user, navbarType, handleLogout } = useNavbar()
  const goToLogin = () => {
    navigate('/login');
  }
  const goToRegister = () => {
    navigate('/register');
  }

  const renderLinks = () => {
    switch (navbarType) {
      case 'guest':
        return (
          <>
            <li><Link to="/pedidos">Imprimir</Link></li>
           {/* <li><Link to="/precios">Precios</Link></li>*/}
            <li><Link to="/links-utiles">Links Útiles</Link></li>
            <li><Link to="/envios">Envíos</Link></li>
            <li>
              <button
                onClick= {goToRegister}
                className={styles.btnLogin}
                style={{
                  background: 'none',
                  border: '1px solid #FFce06',
                  color: '#FFce06',
                }}
              >
                Registrarme
              </button>
            </li>
            <li>
              <button
                onClick= {goToLogin}
                className={styles.btnLogin}
                style={{
                  background: '#FFce06',
                  border: '1px solid #FFce06',
                  color: '#000',
                }}
              >
                Login
              </button>
            </li>
          </>
        )

      case 'admin':
        return (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/precios">Precios</Link></li>
            <li><Link to="/envios">Envíos</Link></li>
            <li>
              <button
                onClick={handleLogout}
                className={styles.btnLogin}
                style={{
                  background: 'none',
                  border: '1px solid #FFce06',
                  color: '#FFce06',
                }}
              >
                Cerrar sesión
              </button>
            </li>
          </>
        )

      case 'client':
      default:
        return (
          <>
            <li><Link to="/envios">Envíos</Link></li>
            <li><Link to="/pedidos">Imprimir</Link></li>
            <li><Link to="/links-utiles">Links Útiles</Link></li>
            <li>
              <button
                onClick={handleLogout}
                className={styles.btnLogin}
                style={{
                  background: 'none',
                  border: '1px solid #FFce06',
                  color: '#FFce06',
                }}
              >
                Cerrar sesión
              </button>
            </li>
          </>
        )
    }
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main Navigation">
        <div className={styles.logoContainer}>
          <Link className={styles.logo} to="/">La Copiadora</Link>
        </div>

        {/* checkbox para el menú hamburguesa */}
        <input type="checkbox" className={styles.menuCheckbox} id="open-menu" />
        <label htmlFor="open-menu" className={styles.menuButton} role="button">
          ☰
        </label>

        {/* menú dinámico según tipo de usuario */}
        <ul className={styles.navLinks}>
          {renderLinks()}
        </ul>

        {/* saludo (solo si hay usuario logueado) */}
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: '#fff', fontSize: '15px' }}>
              ¡Hola! <strong style={{ color: '#FFce06' }}>{user.nombre}</strong>
            </span>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
