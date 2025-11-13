import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    https: false,
    // strictPort: false, // ← ELIMINA ESTA LÍNEA o cámbiala a false
  }
})