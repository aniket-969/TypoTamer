import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible  from 'vite-plugin-env-compatible';

export default defineConfig({
  plugins: [react(), envCompatible()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        sw: 'firebase-messaging-sw-template.js' // Use the template file
      }
    }
  } 
});
