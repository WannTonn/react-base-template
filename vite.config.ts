import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// https://vitejs.dev/config/
const proxy = {
  '^/proxyApi': {
    target: 'https://baidu.com',
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/proxyApi/, ''),
  },
};
export default defineConfig({
  plugins: [ react() ],
  optimizeDeps: {},
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
    },
  },
  server: {
    host: '0.0.0.0',
    open: true,
    port: 5173,
    proxy,
  },
});
