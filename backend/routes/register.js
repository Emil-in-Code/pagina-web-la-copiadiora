const express = require('express');
const router = express.Router();
const registerValidator = require('../validators/registerValidator');

router.post('/registro', registerValidator, (req, res) => {
  const { nombre, apellido, email, password } = req.body;
  console.log('Registro recibido:', { nombre, apellido, email, password });
  res.json({ mensaje: 'Registro exitoso' });
});

module.exports = router;
