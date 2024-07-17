import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  base: '/expense-tracker-vite-react-firebase',
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})
