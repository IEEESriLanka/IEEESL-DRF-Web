import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: This base path must match your repository name exactly.
  // Based on your link: https://github.ieee.lk/IEEESL-DRF-Web/
  base: '/IEEESL-DRF-Web/',
})