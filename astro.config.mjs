import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL permite publicar primero en el dominio de Amplify y cambiarlo al
// dominio propio sin tocar el codigo.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://andressanchez.dev',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
