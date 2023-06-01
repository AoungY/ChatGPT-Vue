import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  // ...
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    proxy:{
      '/chatGPT': {
        target: 'http://localhost:8089/api/v1/chat',
        // target: 'http://43.139.56.64:9997/api/v1/chat',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/chatGPT/, '')
      }
    },

  }
})


