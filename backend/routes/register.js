const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const registerValidator = require('../validators/registerValidator');

router.post('/', registerValidator, async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  try{
    const saltRounds = 10;
    const passwordHasheada = await bcrypt.hash(password, saltRounds);

    console.log('Registro recibido:', {
      nombre,
      apellido,
      email,
      password: passwordHasheada,
    });

    res.json({ mensaje: 'Registro exitoso'});
  } catch (error) {
    console.error('❌ Error al encriptar contraseña:', error);
    res.status(500).json({ error: 'Erro en el servidor'});
  }
});

module.exports = router;[]


