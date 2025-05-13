const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Ruta para registro
app.post('/registro', (req, res) => {
  const { nombre,apellido, email, password } = req.body;
  console.log('Registro recibido:', { nombre,apellido, email, password });
  res.json({ mensaje: 'Registro exitoso' });
});

// Ruta para login
app.post('/inicioSesion', (req, res) => {
  const { email, password } = req.body;
  console.log('Inicio de sesión recibido:', { email, password });
  res.json({ mensaje: 'Inicio de sesión exitoso' });
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


