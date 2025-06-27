const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// 🔐 Lista simulada de usuarios ya registrados
const usuarios = [
  {
    email: 'juan@example.com',
    password: '$2b$10$CLiFzR8l4sKZlg8BLzGuUeKoUXCmBoRdrFKchqFohRf1WDPTUVyq2', // hash de 'Hola123'
  },
  {
    email: 'laura@correo.com',
    password: '$2b$10$dpjB/XzQOJ6cE7lh2uw8BeSz7D1CJuyMI2Nkj7A.8HzYHZm6Eda56', // hash de 'ClaveSegura1'
  }
];

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  const usuario = usuarios.find(u => u.email === email);

  if (!usuario) {
    return res.status(400).json({ error: 'Usuario no encontrado' });
  }

  const coincide = await bcrypt.compare(password, usuario.password);

  if (!coincide) {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  res.json({ mensaje: 'Login exitoso 💥' });
});

module.exports = router;

