const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rutas
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const pedidosRoute = require('./routes/pedidos');

app.use(loginRoute);
app.use(registerRoute);
app.use(pedidosRoute);

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
