import {Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient.js'

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // obtener sesión activa al cargar
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) {
        setUser({
          nombre: data.user.user_metadata?.nombre || 'usuario',
          apellido: data.user.user_metadata?.apellido || '',
          email: data.user.email,
          role: data.user.user_metadata?.role||'cliente',
        });
      } else {
        setUser(null)
      }
    };
    getUser();

    // escuchar cambios de sesión (login / logout)
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          nombre: session.user.user_metadata?.nombre || 'usuario',
          apellido: session.user.user_metadata?.apellido || '',
          email: session.user.email,
          role: session.user.user_metadata?.role||'cliente',
        })
        navigate('../../pages/Pedidos.jsx')
      } else {
        setUser(null)
        navigate('/')
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    navigate('/')
  }
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
