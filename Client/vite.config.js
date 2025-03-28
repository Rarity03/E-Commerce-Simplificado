import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Extrae el host de la URL de la variable de entorno
//const apiUrl = import.meta.env.VITE_API_URL ? new URL(import.meta.env.VITE_API_URL).hostname : 'localhost';

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "localhost:5173",
      "backend-e-commerse.onrender.com"
    ],
    
  }
})
