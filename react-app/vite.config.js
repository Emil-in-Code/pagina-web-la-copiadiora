import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  base: '/react-build/',
  build: {
    outDir: '../public/react-build',
    assetsDir: 'assets',
    emptyOutDir: false,
    manifest: true,   // <--- Importante para el backend
    rollupOptions: {
      input: {
        public: resolve(__dirname, 'src/main-public.jsx'),
        admin: resolve(__dirname, 'src/main-admin.jsx'),
        navbar: resolve(__dirname, 'src/widgets/mountNavbar.jsx'),
        footer: resolve(__dirname, 'src/widgets/mountFooter.jsx')
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === 'navbar' || chunk.name === 'footer') {
            return `widgets/${chunk.name}.js`   // sin hash
          }
          if (chunk.name === 'admin') {
            return `admin/[name]-[hash].js`
          }
          return `public/[name]-[hash].js`
        },
        chunkFileNames: 'public/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
})

