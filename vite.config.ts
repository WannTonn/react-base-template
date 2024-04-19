import { defineConfig, loadEnv } from 'vite';
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
export default defineConfig((options) => {
  const {mode} = options;
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const isProd = env.VITE_ENV === 'prod';
  const EnvBuild = !isProd ? {
    esbuild: {
      drop: ['console', 'debugger']
    }
  } : {
   /*  minify: 'terser',
    terserOptions: {
      mangle: false,
      keep_classnames: false,
      keep_fnames: false,
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    } */
  };
  const baseConfig = {
    plugins: [ react() ],
    optimizeDeps: {},
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
    },
    build: EnvBuild,
    server: {
      host: '0.0.0.0',
      open: true,
      port: 5173,
      proxy,
    },
  }
  return baseConfig;
});
