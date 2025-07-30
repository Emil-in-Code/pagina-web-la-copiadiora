const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

// --- Paths base ---
const PUBLIC_DIR = path.resolve(__dirname, '../public')
const REACT_BUILD_DIR = path.join(PUBLIC_DIR, 'react-build')
const MANIFEST_PATH = path.join(REACT_BUILD_DIR, '.vite', 'manifest.json')

// --- Middlewares base ---
app.use(cors())
app.use(express.json())

// --- Cargar manifest.json (si existe) ---
let manifest = {}
try {
  manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
  console.log('✅ manifest.json cargado')
} catch (e) {
  console.warn('⚠️ No se encontró manifest.json. ¿Ya corriste `npm run build:react`?')
}

// Helper para obtener la entrada completa de Vite
function getEntry(name) {
  for (const [key, entry] of Object.entries(manifest)) {
    if (entry.name === name) {
      return entry
    }
  }
  return null
}

// Helper para obtener el archivo compilado de una entry de Vite (mantener para compatibilidad)
function entryFile(name) {
  const entry = getEntry(name)
  return entry?.file || null
}

// --- Rutas API ---
const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')
// const pedidosRoute = require('./routes/pedidos')

app.use('/api/login', loginRoute)
app.use('/api/register', registerRoute)
// app.use('/api/pedidos', pedidosRoute)

// --- Servir los bundles construidos de React (admin/public/widgets) ---
app.use('/react-build', express.static(REACT_BUILD_DIR, {
  immutable: true,
  maxAge: '1y'
}))

// --- SPA Admin (/admin) ---
app.get('/admin', (req, res) => {
  const adminJs = entryFile('admin')
  if (!adminJs) {
    return res
      .status(500)
      .send('<p>Falta build de React para el dashboard (entry "admin"). Ejecuta `npm run build:react`.</p>')
  }

  // Si querés meter aquí autenticación, agrega tu middleware antes.
  res.send(`<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>Panel - La Copiadora</title>
  </head>
  <body>
    <div id="admin-root"></div>
    <script type="module" src="/react-build/${adminJs}"></script>
  </body>
</html>`)
})

// --- Página pública en React (por ahora en /react/pedidos para no romper tu pedidos.html actual) ---
app.get('/pedidos', (req, res) => {
  const publicEntry = getEntry('public')
  if (!publicEntry) {
    return res
      .status(500)
      .send('<p>Falta build de React para la parte pública (entry "public"). Ejecuta `npm run build:react`.</p>')
  }

  // Generar tags de CSS
  const cssLinks = publicEntry.css ? 
    publicEntry.css.map(css => `<link rel="stylesheet" href="/react-build/${css}">`).join('\n    ') : ''

  res.send(`<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>Pedidos (React) - La Copiadora</title>
    ${cssLinks}
  </head>
  <body>
    <div id="public-root"></div>
    <script type="module" src="/react-build/${publicEntry.file}"></script>
  </body>
</html>`)
})

// --- Sitio estático (tu web oficial actual) ---
app.use(express.static(PUBLIC_DIR))

// 404 genérico para el sitio estático
app.use((req, res, next) => {
  if (req.method === 'GET' && req.accepts('html')) {
    return res.status(404).sendFile(path.join(PUBLIC_DIR, 'index.html'))
  }
  return next()
})

// --- Manejo de errores ---
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Algo salió mal en el servidor' })
})

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
})
