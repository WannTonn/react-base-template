import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';
import { visualizer } from 'rollup-plugin-visualizer';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
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
  const { mode } = options;
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const isProd = env.VITE_ENV === 'prod';
  const baseConfig = {
    plugins: [
      react(),
      compression({
        threshold: 10240, // 设置压缩阈值
        deleteOriginalAssets: false, // 是否删除原文件
        skipIfLargerOrEqual: true, // 是否跳过大于阈值的文件
      }),
      // 用拆包插件来配置打包
      // https://github.com/sanyuan0704/vite-plugin-chunk-split/blob/master/README-CN.md
      // chunkSplitPlugin({
      //   strategy: 'default',
      //   customSplitting: {
      //     // `react` and `react-dom` 会被打包到一个名为`render-vendor`的 chunk 里面(包括它们的一些依赖，如 object-assign)
      //     'react-vendor': [/react/, /react-dom/],
      //     // 将组件库的代码打包
      //     'library': [/antd/],
      //   },
      // }),
    ],
    optimizeDeps: {},
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
    },
    build: {
      rollupOptions: {
        plugins: [visualizer({ open: true })],
        output: {
          chunkFileNames: 'js/[name]-[hash:8].js',
          entryFileNames: 'js/[name]-[hash:8].js',
          assetFileNames: '[ext]/[name]-[hash:8].[ext]',
          manualChunks: {
            // 将React相关库打包成单独的chunk
            'react-vendor': ['react', 'react-dom'],
            // 将组件库的代码打包
            library: ['antd'],
          },
        },
      },
    },
    server: {
      host: '0.0.0.0',
      open: true,
      port: 5173,
      proxy,
    },
  };
  return baseConfig;
});
