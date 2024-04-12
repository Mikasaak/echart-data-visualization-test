import { defineConfig } from 'vite'
import {fileURLToPath, URL} from 'node:url';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias: {
      // 键必须以斜线开始和结束
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },

  }
})
