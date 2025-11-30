import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This base path matches your repository name: https://github.ieee.lk/IEEESL-DRF-Web/
  // If you later move this to relief.ieee.lk, you should change this to '/'
  base: '/IEEESL-DRF-Web/',
})
