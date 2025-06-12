module.exports = (req, res, next) => {
  const { nombre, apellido, email, password } = req.body;

  const regex = {
    nombre: /^[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)*$/,
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=.*[A-Z])(?=.*\d).{4,12}$/
 };

  const errores = [];

  if (!regex.nombre.test(nombre)) {
    errores.push("Nombre inválido");
  }
  if (!regex.apellido.test(apellido)) {
    errores.push("Apellido inválido");
  }
  if (!regex.email.test(email)) {
    errores.push("Email inválido");
  }
  if (!regex.password.test(password)) {
    errores.push("Contraseña inválida: debe tener al menos una mayúscula, un número y entre 4 y 12 caracteres");
  }

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  next();
};
