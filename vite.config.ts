import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [vuePlugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        port: 3000,
    },
})
