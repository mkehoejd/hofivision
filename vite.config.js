import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';

export default defineConfig({
  root: './src',
  plugins: [
    react(),
    electron([
      {
        entry: '../electron/main.js', // ← correct relative to vite root: 'src'
      },
    ]),
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  server: {
    port: 5173
  }
});