const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const registerValidator = require('../validators/registerValidator');
const db = require('../db');

router.post('/', registerValidator, async (req, res) => {
  const { nombre, apellido, email, password, direccion } = req.body;

  try{
    const saltRounds = 10;
    const passwordHasheada = await bcrypt.hash(password, saltRounds);
    
    db.run(
      'INSERT INTO clientes (nombre, apellido, email, password, direccion) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellido, email, passwordHasheada, direccion || ''],
      function (err) {
        if(err) {
          console.log('eror al guardar en la database', err.message);
          if (err.message.includes('UNIQUE constraint failed')){
             return res.status(409).json({error: 'El mail ya está registrado'});
          }
          
          return res.status(500).json({ error:'error al registrar usuario'});
        }
        
        console.log('usuario guardado con ID:', this.lastID);
        res.status(201).json({ mensjae: 'Registro exitoso'});
      }
    );
  } catch (error) {
     console.error('eror al encriptar contraseña:', error);
     res.status(500).json({ error: 'Error en el server'});
  }
});

module.exports = router;

/*console.log('Registro recibido:', {
      nombre,
      apellido,
      email,
      password: passwordHasheada,
});

res.json({ mensaje: 'Registro exitoso'}):

catch (error) {
    console.error('❌ Error al encriptar contraseña:', error);
    res.status(500).json({ error: 'Erro en el servidor'});
}*/

