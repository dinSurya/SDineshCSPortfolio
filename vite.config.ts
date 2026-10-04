import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from https://dinsurya.github.io/SDineshCSPortfolio/ on GitHub Pages.
export default defineConfig({
  base: '/SDineshCSPortfolio/',
  plugins: [react(), tailwindcss()],
})
