import { defineConfig } from 'vite';

export default defineConfig({
  // Keep all app source (HTML/CSS/JS) inside the interfaces layer.
  root: 'src/interfaces/web',
  build: {
    outDir: '../../../dist',
    emptyOutDir: true
  },
  server: {
    port: 5173,
    open: true
  }
});
