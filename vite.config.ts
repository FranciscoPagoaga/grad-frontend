import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
      '/rc' : 'http://127.0.0.1:5001'
    }
    
  },
  plugins: [react()],
})
