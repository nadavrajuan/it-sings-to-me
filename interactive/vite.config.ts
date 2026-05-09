import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/it-sings-to-me/',
  publicDir: resolve(__dirname, '../public'),
  resolve: {
    alias: {
      '@looli/shared': resolve(__dirname, '../shared'),
    },
  },
});
