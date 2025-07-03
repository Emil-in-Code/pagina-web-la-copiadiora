const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Buscar al usuario en la base de datos
  db.get('SELECT * FROM clientes WHERE email = ?', [email], async (err, row) => {
    if (err) {
      console.error('❌ Error al buscar usuario en DB:', err.message);
      return res.status(500).json({ error: 'Error en el servidor' });
    }

    if (!row) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    const coincide = await bcrypt.compare(password, row.password);

    if (!coincide) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Login exitoso: responder con datos del usuario
    const usuario = {
      id: row.id_usuario,
      nombre: row.nombre,
      apellido: row.apellido,
      email: row.email
    };

    console.log('✅ Login exitoso de:', usuario.email);
    res.status(200).json({ mensaje: 'Login exitoso', usuario });
  });
});

module.exports = router;

