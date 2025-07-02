const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const path = require ('path');

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname,'../public')));

// Rutas
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
//const pedidosRoute = require('./routes/pedidos');
//

app.use('/api/login',loginRoute);
app.use('/api/register',registerRoute);
//app.use('/api/pedidos',pedidosRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal en el servidor'});
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});
