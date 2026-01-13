import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
  base: '/quest-vr-app/', 
  plugins: [
    basicSsl()
  ],
  server: {
    host: true, // same as npm run dev --host
    https: true as any // Forza HTTPS
  }
});