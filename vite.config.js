import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    globals: true,
    collectConverageFrom: ['src/**/*.jsx', 'src/**/*.js'],
    setupFiles: 'src/spec/setupTests.js',
    testMatch: ['./src/spec/*.spec.jsx'],
    environment: 'jsdom',
    converage: {
      all: true,
      exclude: ['*.config.js', '*.cjs', '**/main.jsx'],
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.pdsdiary.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
