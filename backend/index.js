const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta para registro
app.post('/registro', (req, res) => {
  const { nombre, email, contraseña } = req.body;
  console.log('Registro recibido:', { nombre, email, contraseña });
  res.json({ mensaje: 'Registro exitoso' });
});

// Ruta para login
app.post('/login', (req, res) => {
  const { email, contraseña } = req.body;
  console.log('Login recibido:', { email, contraseña });
  res.json({ mensaje: 'Login exitoso' });
});

// Ruta para pedidos
app.post('/pedido', (req, res) => {
  const { archivo, opciones } = req.body;
  console.log('Pedido recibido:', { archivo, opciones });
  res.json({ mensaje: 'Pedido recibido correctamente' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
