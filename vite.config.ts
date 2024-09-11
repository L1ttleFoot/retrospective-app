import { defineConfig } from 'vite'
import svgr from "vite-plugin-svgr";
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    base: '',
    plugins: [svgr(),react()],
    server: {    
        open: true,
        port: 3000, 
    },
    build: {
        outDir:path.resolve(__dirname, './build'),
        emptyOutDir: true
    },

    resolve:{
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@store': path.resolve(__dirname, './src/store'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@components': path.resolve(__dirname, './src/components'),
        }
    }
})