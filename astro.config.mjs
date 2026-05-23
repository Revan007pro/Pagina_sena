// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  build: {
    format: 'file'
  },
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  base: '/',
  trailingSlash: 'ignore',
});
