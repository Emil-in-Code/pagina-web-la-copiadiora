
// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.log('no te conectaste a la puta base', err.message);
  } else {
  console.log('conectado a la base');
  }
});


db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    direccion TEXT
    )
  `);
});

module.exports = db;
