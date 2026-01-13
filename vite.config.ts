import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl'; // <--- Importalo

export default defineConfig({
  base: './', 
  plugins: [
    basicSsl() // <--- Attivalo qui
  ],
  server: {
    host: true, // Questo equivale a --host
    https: true as any // Forza HTTPS
  }
});