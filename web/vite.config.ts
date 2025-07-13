import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add this 'server' section
  server: {
    proxy: {
      // Proxy any request that starts with '/api'
      '/api': {
        // to your Deno server
        target: 'http://localhost:8000',
        // Necessary for virtual-hosted sites
        changeOrigin: true,
      },
    },
  },

})
