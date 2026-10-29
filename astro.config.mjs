import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Spanish-first: the default locale lives at the root, English under /en.
export default defineConfig({
  site: 'https://andressanchez.dev',
  output: 'static',
  vite: { plugins: [tailwindcss()] },
});
