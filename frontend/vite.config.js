import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// local dev ke liye proxy configuration
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: true
      }
    }
  }
})
