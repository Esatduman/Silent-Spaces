import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath} from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Silent-Spaces",
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@assets', replacement: fileURLToPath(new URL('./src/assets/', import.meta.url)) }
    ]
  }
})
