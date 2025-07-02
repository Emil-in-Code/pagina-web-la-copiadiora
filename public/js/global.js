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
      const span = document.getElementById('usuario-navbar');
      if (span) {
          span.textContent = `👤 ${usuario.nombre} ${usuario.apellido}`;
      }
    }
  });
