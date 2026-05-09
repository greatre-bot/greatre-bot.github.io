import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 项目页通常需要把 base 改成 "/仓库名/"。
// 本项目默认读取 VITE_BASE_PATH；本地开发不设置时使用 "/"。
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH ?? '/',
});
