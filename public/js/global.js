//navbar global

fetch('/components/navbar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navbar').innerHTML = html;

    // Oculta el link actual
    const rutaActual = window.location.pathname.toLowerCase();
    document.querySelectorAll('#navbar a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && rutaActual.includes(href.toLowerCase())) {
          link.closest('li').style.display = 'none';
      }
    });

    // Mostrar nombre de usuario si está guardado
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);

      const liUsuario = document.getElementById('usuario-navbar');
      const spanNombre = document.getElementById('nombre-usuario');
      const dropdown = document.getElementById('dropdown-menu');
      const logoutLink = document.getElementById('logout-link');

      if (liUsuario && spanNombre && dropdown && logoutLink) {
        liUsuario.classList.remove('oculto');
        spanNombre.textContent = `👤 ${usuario.nombre}`;

        //toggle del dropdown
        spanNombre.addEventListener('click',() => {
          dropdown.classList.toggle('oculto');
        });

        //cierre de sesión 
        logoutLink.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('usuario');
          window.location.href = 'login.html';
        });

        //ocultar links

        const registerLink = document.querySelector('a[href="Register.html"]');
        const loginLink = document.querySelector('a[href="login.html"]');
        if (registerLink) registerLink.closest('li').classList.add('oculto');
        if (loginLink) loginLink.closest('li').classList.add('oculto');
        

      }
    }
      
   
  });

//footer global

fetch('/components/footer.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer').innerHTML = html;
  });
